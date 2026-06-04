import { supabaseAdmin } from '../lib/supabase-admin'
import { genai } from '../lib/gemini'
import { sendApprovalRequest } from './telegram'

const PRODUCT_IDS = [
  'gotero',
  'acondicionador',
  'tratamiento-profundo',
  'shampoo-graso',
  'shampoo-seco',
  'exfoliante-capilar',
  'tratamiento-folicular',
]

interface GeneratedBlogContent {
  title: string
  excerpt: string
  content: string
  category: string
  related_product_id: string
  product_recommendation_text: string
  image_prompt: string
  target_audience: 'female' | 'male' | 'both'
}

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  image_url: string
  category: string
  related_product_id: string
  product_recommendation_text: string
  target_audience: string
  status: string
  approval_token: string
  created_at: string
  published_at: string | null
  newsletter_sent_at: string | null
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60)
}

async function getRecentlyUsedProductIds(): Promise<string[]> {
  const { data, error } = await supabaseAdmin
    .from('blog_posts')
    .select('related_product_id')
    .order('created_at', { ascending: false })
    .limit(3)

  if (error) {
    console.error('Error fetching recent posts:', error.message)
    return []
  }

  return (data ?? []).map((row: { related_product_id: string }) => row.related_product_id)
}

async function generateContent(recentProductIds: string[]): Promise<GeneratedBlogContent> {
  const avoidList = recentProductIds.length > 0
    ? `Evita usar estos product IDs que ya se usaron recientemente: ${recentProductIds.join(', ')}.`
    : ''

  const prompt = `Eres el redactor de blog de Amapola, una marca española de productos para el cuidado del cabello.
Tu tono es cálido, profesional y orientado al bienestar capilar.

Genera una entrada de blog en español para el blog de Amapola. ${avoidList}

Los product IDs disponibles son: ${PRODUCT_IDS.join(', ')}

Responde ÚNICAMENTE con un objeto JSON válido con esta estructura exacta (sin markdown, sin explicaciones, solo el JSON):
{
  "title": "Título atractivo de la entrada",
  "excerpt": "Teaser de máximo 150 caracteres que enganche al lector",
  "content": "Contenido en Markdown de 350-450 palabras con 3-4 secciones usando encabezados ##. Tono educativo, cálido y profesional. En español.",
  "category": "Una de: Consejos|Rutinas|Ingredientes|Ciencia|Cuidado Masculino",
  "related_product_id": "uno de los product IDs listados arriba",
  "product_recommendation_text": "2-3 frases explicando por qué este producto encaja con el tema del artículo",
  "image_prompt": "Prompt en inglés para fotografía lifestyle de cuidado del cabello, iluminación de estudio cálida, tonos naturales, elegante",
  "target_audience": "female|male|both"
}`

  const response = await genai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: prompt,
  })

  const rawText = response.text ?? ''
  const jsonMatch = rawText.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    throw new Error('Gemini did not return valid JSON')
  }

  const parsed = JSON.parse(jsonMatch[0]) as GeneratedBlogContent

  if (!parsed.title || !parsed.excerpt || !parsed.content || !parsed.related_product_id) {
    throw new Error('Generated content is missing required fields')
  }

  if (!PRODUCT_IDS.includes(parsed.related_product_id)) {
    console.error(`Invalid product_id from Gemini: ${parsed.related_product_id}, using fallback`)
    const unused = PRODUCT_IDS.find(id => !recentProductIds.includes(id)) ?? PRODUCT_IDS[0]
    parsed.related_product_id = unused
  }

  return parsed
}

async function generateAndUploadImage(imagePrompt: string, slug: string): Promise<string> {
  try {
    const imageResponse = await genai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: imagePrompt,
      config: { numberOfImages: 1, outputMimeType: 'image/jpeg' },
    })

    const imageBytes = imageResponse.generatedImages?.[0]?.image?.imageBytes
    if (!imageBytes) {
      throw new Error('No image bytes returned from Imagen')
    }

    const imageBuffer = Buffer.from(imageBytes, 'base64')
    const filename = `${Date.now()}-${slug}.jpg`

    const { error: uploadError } = await supabaseAdmin.storage
      .from('blog-images')
      .upload(filename, imageBuffer, { contentType: 'image/jpeg', upsert: false })

    if (uploadError) {
      throw new Error(`Storage upload failed: ${uploadError.message}`)
    }

    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('blog-images')
      .getPublicUrl(filename)

    return publicUrl
  } catch (err) {
    console.error('Image generation/upload failed, using placeholder:', err)
    return `https://picsum.photos/seed/${slug}/800/450`
  }
}

export async function generateBlogPost(): Promise<BlogPost> {
  const recentProductIds = await getRecentlyUsedProductIds()
  const content = await generateContent(recentProductIds)

  const slug = slugify(content.title)
  const imageUrl = await generateAndUploadImage(content.image_prompt, slug)

  const { data: post, error } = await supabaseAdmin
    .from('blog_posts')
    .insert({
      title: content.title,
      excerpt: content.excerpt,
      content: content.content,
      image_url: imageUrl,
      category: content.category,
      related_product_id: content.related_product_id,
      product_recommendation_text: content.product_recommendation_text,
      target_audience: content.target_audience,
      status: 'pending_approval',
    })
    .select()
    .single()

  if (error || !post) {
    throw new Error(`Failed to insert blog post: ${error?.message ?? 'unknown error'}`)
  }

  await sendApprovalRequest({
    id: post.id,
    approval_token: post.approval_token,
    title: post.title,
    excerpt: post.excerpt,
    image_url: post.image_url,
    category: post.category,
  }).catch((err: unknown) => {
    console.error('Failed to send Telegram approval request:', err)
  })

  return post as BlogPost
}
