import { Router } from 'express'
import { z } from 'zod'
import { createHmac } from 'crypto'
import { supabaseAdmin } from '../lib/supabase-admin.js'

const router = Router()

const subscribeSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
})

router.post('/subscribe', async (req, res) => {
  const parsed = subscribeSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Invalid input' })
  const { email, name } = parsed.data
  const { error } = await supabaseAdmin
    .from('newsletter_subscribers')
    .upsert({ email, name, active: true }, { onConflict: 'email' })
  if (error) return res.status(500).json({ error: error.message })
  res.json({ success: true })
})

router.get('/unsubscribe', async (req, res) => {
  const { email, token } = req.query as { email: string; token: string }
  if (!email || !token) return res.status(400).send('Missing params')
  const expected = createHmac('sha256', process.env.RESEND_API_KEY!).update(email).digest('hex')
  if (token !== expected) return res.status(403).send('Invalid token')
  await supabaseAdmin
    .from('newsletter_subscribers')
    .update({ active: false })
    .eq('email', email)
  res.send('<html><body style="font-family:sans-serif;text-align:center;padding:40px"><h2>Te has dado de baja correctamente.</h2><p>Ya no recibirás más emails de Amapola.</p></body></html>')
})

export default router
