import 'dotenv/config'
import express from 'express'
import blogRouter from './routes/blog'
import newsletterRouter from './routes/newsletter'
import telegramWebhookRouter from './routes/webhooks/telegram'

const app = express()

app.use(express.json())

app.use('/api/blog', blogRouter)
app.use('/api/newsletter', newsletterRouter)
app.use('/api/webhooks/telegram', telegramWebhookRouter)

app.get('/api/health', (_req, res) => res.json({ ok: true }))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
