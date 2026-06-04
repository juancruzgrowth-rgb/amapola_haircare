/**
 * One-shot script: generates brand-aligned images for the 3 seed blog posts
 * using real Amapola product photos as visual reference.
 *
 * Run: npm run generate:seed-images
 */
import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { createClient } from '@supabase/supabase-js'
import { GoogleGenAI } from '@google/genai'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })

const PRODUCTOS_DIR = path.join(process.cwd(), 'productos')

/**
 * ABSOLUTE RULE — never negotiable, never override this constraint in any prompt.
 * Every image generated for this brand must be 100% text-free.
 * If a product container appears: the label must be completely blank — no letters,
 * no numbers, no symbols, no brand name, no decorative script of any kind.
 * This rule is non-negotiable regardless of the scene or topic requested.
 */
const NO_TEXT_RULE = `
ABSOLUTE CONSTRAINT — THIS OVERRIDES EVERYTHING ELSE:
Zero text anywhere in the image. Not one single character, letter, number, symbol, or glyph.
This applies to: product labels, bottle caps, packaging stickers, backgrounds, surfaces,
reflections, shadows, ingredient sachets, tags, price tags, handwriting, watermarks — EVERYWHERE.
If any product bottle or container appears, its label area must be completely blank white or plain
colored with zero text. Do not render any text element under any circumstances.
Violating this rule makes the image unusable. Always double-check before finalizing.
`.trim()

const BRAND_STYLE_INSTRUCTION = `
${NO_TEXT_RULE}

Using the color palette, lighting mood, and brand aesthetic from the reference product photo,
create an editorial haircare photograph with the following additional rules:
- Focus: natural ingredients, hair textures, botanicals, lifestyle details
- If product bottles appear: labels must be completely blank (solid color, zero text)
- Warm natural light, cream and beige tones, terracotta and forest green accents
- Minimalist clean composition, professional product photography style
- 16:9 horizontal format for blog header
- High-end Spanish beauty brand aesthetic, soft focus
`.trim()

const SEED_POSTS = [
  {
    id: 'b1000000-0000-0000-0000-000000000001',
    referenceImage: 'acondicionador-shampoo.png',
    topic: 'Close-up of a healthy strand of wavy hair, water droplets on hair, cuticle detail, soft natural light on dark background with cream accents',
  },
  {
    id: 'b2000000-0000-0000-0000-000000000002',
    referenceImage: 'tratamiento-profundo.png',
    topic: 'Hair mask texture in a ceramic bowl, argan oil serum drops on marble surface, dried botanicals, warm ambient light',
  },
  {
    id: 'b3000000-0000-0000-0000-000000000003',
    referenceImage: 'gotero-tratamiento.png',
    topic: 'Fresh rosemary sprigs, castor seeds, dried herbs and botanicals flat lay on cream linen surface, natural daylight',
  },
]

function readImageAsBase64(filename: string): { data: string; mimeType: string } {
  const filePath = path.join(PRODUCTOS_DIR, filename)
  const data = fs.readFileSync(filePath).toString('base64')
  const mimeType = filename.endsWith('.jpg') || filename.endsWith('.jpeg') ? 'image/jpeg' : 'image/png'
  return { data, mimeType }
}

async function ensureBucketExists(): Promise<void> {
  const { data: buckets } = await supabase.storage.listBuckets()
  const exists = buckets?.some(b => b.name === 'blog-images')
  if (!exists) {
    const { error } = await supabase.storage.createBucket('blog-images', { public: true })
    if (error) throw new Error(`Failed to create bucket: ${error.message}`)
    console.log('Created public bucket: blog-images')
  }
}

async function generateAndUploadImage(
  postId: string,
  referenceImage: string,
  topic: string
): Promise<string> {
  console.log(`\nGenerating image for post ${postId}...`)
  console.log(`Reference: ${referenceImage}`)

  const { data: imageData, mimeType: imageMimeType } = readImageAsBase64(referenceImage)

  const response = await genai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: [
      {
        role: 'user',
        parts: [
          { inlineData: { mimeType: imageMimeType, data: imageData } },
          { text: `${BRAND_STYLE_INSTRUCTION}\n\nScene to create: ${topic}` },
        ],
      },
    ],
    config: { responseModalities: ['IMAGE'] },
  })

  const imagePart = response.candidates?.[0]?.content?.parts?.find(
    (p: { inlineData?: { data?: string; mimeType?: string } }) => p.inlineData?.data
  )
  if (!imagePart?.inlineData?.data) throw new Error('No image returned from Gemini')

  const outMimeType = imagePart.inlineData.mimeType ?? 'image/png'
  const ext = outMimeType.includes('jpeg') ? 'jpg' : 'png'
  const imageBuffer = Buffer.from(imagePart.inlineData.data, 'base64')
  const filename = `seed-${postId}.${ext}`

  const { error: uploadError } = await supabase.storage
    .from('blog-images')
    .upload(filename, imageBuffer, { contentType: outMimeType, upsert: true })

  if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`)

  const { data: { publicUrl } } = supabase.storage
    .from('blog-images')
    .getPublicUrl(filename)

  console.log(`Uploaded: ${publicUrl}`)
  return publicUrl
}

async function updatePostImageUrl(postId: string, imageUrl: string): Promise<void> {
  const { error } = await supabase
    .from('blog_posts')
    .update({ image_url: imageUrl })
    .eq('id', postId)

  if (error) throw new Error(`DB update failed for ${postId}: ${error.message}`)
  console.log(`Updated image_url for post ${postId}`)
}

async function main() {
  console.log('=== Amapola — Seed Image Generator (with brand reference) ===')
  await ensureBucketExists()

  for (const post of SEED_POSTS) {
    const imageUrl = await generateAndUploadImage(post.id, post.referenceImage, post.topic)
    await updatePostImageUrl(post.id, imageUrl)
  }

  console.log('\nDone. All 3 seed posts now have brand-aligned images.')
}

main().catch(err => {
  console.error('Script failed:', err)
  process.exit(1)
})
