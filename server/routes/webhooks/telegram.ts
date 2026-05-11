import { Router } from 'express'
import { supabaseAdmin } from '../../lib/supabase-admin'
import { answerCallbackQuery, sendMessage } from '../../services/telegram'
import { sendBlogNewsletter } from '../../services/newsletter'

const router = Router()

router.post('/', async (req, res) => {
  // Always respond 200 immediately to Telegram
  res.sendStatus(200)

  const body = req.body
  if (!body.callback_query) return

  const { id: callbackQueryId, data: callbackData } = body.callback_query
  if (!callbackData) return

  if (callbackData.startsWith('approve_')) {
    const token = callbackData.replace('approve_', '')
    const { data: post, error } = await supabaseAdmin
      .from('blog_posts')
      .update({ status: 'published', published_at: new Date().toISOString() })
      .eq('approval_token', token)
      .select()
      .single()

    if (error || !post) {
      await answerCallbackQuery(callbackQueryId, '❌ Error al publicar')
      return
    }
    await answerCallbackQuery(callbackQueryId, '✅ Entrada publicada')
    await sendMessage(`✅ Entrada publicada: "${post.title}"`)
    // Send newsletter async (don't await to avoid timeout)
    sendBlogNewsletter(post).catch(console.error)

  } else if (callbackData.startsWith('reject_')) {
    const token = callbackData.replace('reject_', '')
    await supabaseAdmin
      .from('blog_posts')
      .update({ status: 'rejected' })
      .eq('approval_token', token)
    await answerCallbackQuery(callbackQueryId, '❌ Entrada rechazada')
    await sendMessage('❌ La entrada de blog fue rechazada y no se publicará.')
  }
})

export default router
