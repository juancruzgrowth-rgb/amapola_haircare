import 'dotenv/config'
import express from 'express'
import blogRouter from './routes/blog.js'
import newsletterRouter from './routes/newsletter.js'
import quizRouter from './routes/quiz.js'
import telegramWebhookRouter from './routes/webhooks/telegram.js'

const app = express()

app.use(express.json())

app.use('/api/blog', blogRouter)
app.use('/api/newsletter', newsletterRouter)
app.use('/api/quiz', quizRouter)
app.use('/api/webhooks/telegram', telegramWebhookRouter)

app.get('/api/health', (_req, res) => res.json({ ok: true }))

const PORT = process.env.PORT || 3001

// Local dev only — Vercel uses the exported app as a serverless handler
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

export default app
