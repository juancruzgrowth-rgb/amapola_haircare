import { Router } from 'express'
import { supabaseAdmin } from '../../lib/supabase-admin.js'
import { answerCallbackQuery, sendMessage } from '../../services/telegram.js'
import { sendBlogNewsletter } from '../../services/newsletter.js'

const router = Router()

router.post('/', async (req, res) => {
  // Validate Telegram's secret token before doing anything.
  // Telegram sends the value configured at setWebhook in this header.
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET
  if (!secret || req.headers['x-telegram-bot-api-secret-token'] !== secret) {
    return res.sendStatus(401)
  }

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
