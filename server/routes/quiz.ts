import { Router } from 'express'
import { z } from 'zod'
import { supabaseAdmin } from '../lib/supabase-admin.js'
import { generateRecommendations, QuizAnswers } from '../services/recommendations.js'
import { renderQuizPDF } from '../services/pdf.js'
import { sendQuizRoutineEmail } from '../services/email-quiz.js'

const router = Router()

const submitSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  hair_type: z.string().optional(),
  hair_porosity: z.string().optional(),
  scalp_condition: z.string().optional(),
  main_concern: z.string().optional(),
  wash_frequency: z.string().optional(),
  chemical_treatments: z.string().optional(),
  budget_range: z.string().optional(),
  goals: z.string().optional(),
})

router.post('/submit', async (req, res) => {
  const parsed = submitSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid input', details: parsed.error.flatten() })
  }

  const { name, email, ...answers } = parsed.data
  const quizAnswers: QuizAnswers = { name, email, ...answers }

  try {
    const { data: lead, error: leadError } = await supabaseAdmin
      .from('leads')
      .upsert(
        { name, email, source: 'quiz', updated_at: new Date().toISOString() },
        { onConflict: 'email' },
      )
      .select()
      .single()

    if (leadError || !lead) {
      throw new Error(`DB error upserting lead: ${leadError?.message ?? 'unknown'}`)
    }

    const { data: quizRow, error: quizError } = await supabaseAdmin
      .from('quiz_responses')
      .insert({
        lead_id: lead.id,
        hair_type: answers.hair_type,
        hair_porosity: answers.hair_porosity,
        scalp_condition: answers.scalp_condition,
        main_concern: answers.main_concern,
        wash_frequency: answers.wash_frequency,
        chemical_treatments: answers.chemical_treatments,
        budget_range: answers.budget_range,
        goals: answers.goals,
      })
      .select()
      .single()

    if (quizError || !quizRow) {
      throw new Error(`DB error inserting quiz_response: ${quizError?.message ?? 'unknown'}`)
    }

    res.json({ success: true, lead_id: lead.id })

    ;(async () => {
      try {
        const routine = await generateRecommendations(quizAnswers)
        const pdfBuffer = await renderQuizPDF(name, quizAnswers, routine)

        const filename = `${lead.id}-${Date.now()}.pdf`
        const { error: uploadError } = await supabaseAdmin.storage
          .from('quiz-pdfs')
          .upload(filename, pdfBuffer, { contentType: 'application/pdf', upsert: false })

        let pdfUrl: string | null = null
        if (uploadError) {
          console.error('PDF upload failed:', uploadError.message)
        } else {
          const { data: urlData } = supabaseAdmin.storage.from('quiz-pdfs').getPublicUrl(filename)
          pdfUrl = urlData.publicUrl
          await supabaseAdmin
            .from('quiz_responses')
            .update({ pdf_url: pdfUrl })
            .eq('id', quizRow.id)
        }

        await sendQuizRoutineEmail({ email, name }, pdfBuffer, routine)
      } catch (err) {
        console.error('Quiz async pipeline failed:', err)
      }
    })()
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'unknown error'
    console.error('Quiz submit failed:', msg)
    return res.status(500).json({ error: msg })
  }
})

export default router
