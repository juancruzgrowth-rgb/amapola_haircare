import { Router } from 'express'
import { generateBlogPost } from '../services/blog-generator.js'
import { supabaseAdmin } from '../lib/supabase-admin.js'

const router = Router()

// POST /api/blog/generate — protected.
// Vercel Cron auto-attaches `Authorization: Bearer ${CRON_SECRET}` when CRON_SECRET is set.
// Manual triggers (curl/testing) use header `x-cron-secret: ${BLOG_CRON_SECRET}`.
router.post('/generate', async (req, res) => {
  const cronSecret = process.env.CRON_SECRET
  const manualSecret = process.env.BLOG_CRON_SECRET
  const fromVercelCron = !!cronSecret && req.headers.authorization === `Bearer ${cronSecret}`
  const fromManual = !!manualSecret && req.headers['x-cron-secret'] === manualSecret
  if (!fromVercelCron && !fromManual) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  try {
    const post = await generateBlogPost()
    res.json({ success: true, post_id: post.id })
  } catch (err) {
    console.error('Blog generation failed:', err)
    res.status(500).json({ error: 'Generation failed' })
  }
})

// GET /api/blog/posts
router.get('/posts', async (req, res) => {
  const limit = Number(req.query.limit) || 10
  const offset = Number(req.query.offset) || 0
  const { data, error } = await supabaseAdmin
    .from('blog_posts')
    .select('id, title, excerpt, image_url, category, published_at, target_audience')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1)
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

// GET /api/blog/posts/:id
router.get('/posts/:id', async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from('blog_posts')
    .select('*')
    .eq('id', req.params.id)
    .eq('status', 'published')
    .single()
  if (error || !data) return res.status(404).json({ error: 'Not found' })
  res.json(data)
})

export default router
