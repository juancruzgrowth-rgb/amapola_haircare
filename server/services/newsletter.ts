import { createHmac } from 'crypto'
import { Resend } from 'resend'
import { supabaseAdmin } from '../lib/supabase-admin'

const resend = new Resend(process.env.RESEND_API_KEY)

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
  published_at: string | null
}

interface ProductInfo {
  name: string
  price: string
  image: string
}

const PRODUCT_INFO: Record<string, ProductInfo> = {
  'gotero': {
    name: 'Gotero Capilar',
    price: '19,50 €',
    image: '/gotero.png',
  },
  'acondicionador': {
    name: 'Acondicionador',
    price: '16,50 €',
    image: 'https://picsum.photos/seed/conditioner/400/400',
  },
  'tratamiento-profundo': {
    name: 'Tratamiento Profundo',
    price: '24,90 €',
    image: 'https://picsum.photos/seed/deeptreatment/400/400',
  },
  'shampoo-graso': {
    name: 'Champú Pelo Graso',
    price: '18,90 €',
    image: 'https://picsum.photos/seed/shampoo-graso/400/400',
  },
  'shampoo-seco': {
    name: 'Champú Pelo Seco',
    price: '18,90 €',
    image: 'https://picsum.photos/seed/shampoo-seco/400/400',
  },
  'exfoliante-capilar': {
    name: 'Exfoliante Capilar',
    price: '21,90 €',
    image: 'https://picsum.photos/seed/exfoliante/400/400',
  },
  'tratamiento-folicular': {
    name: 'Tratamiento Folicular',
    price: '22,90 €',
    image: 'https://picsum.photos/seed/folicular/400/400',
  },
}

export function buildUnsubscribeToken(email: string): string {
  return createHmac('sha256', process.env.RESEND_API_KEY!)
    .update(email)
    .digest('hex')
}

interface Recipient {
  email: string
  name: string | null
}

function buildNewsletterHtml(post: BlogPost, recipient: Recipient): string {
  const appUrl = process.env.APP_URL ?? 'https://amapola.com'
  const product = PRODUCT_INFO[post.related_product_id]
  const unsubscribeToken = buildUnsubscribeToken(recipient.email)
  const unsubscribeUrl = `${appUrl}/api/newsletter/unsubscribe?email=${encodeURIComponent(recipient.email)}&token=${unsubscribeToken}`
  const articleUrl = `${appUrl}/blog/${post.id}`
  const greeting = recipient.name ? `Hola, ${recipient.name}` : 'Hola'

  const productSection = product
    ? `
    <tr>
      <td style="padding: 32px 40px; background-color: #faf7f4; border-top: 1px solid #e8e0d8;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="100" valign="top" style="padding-right: 20px;">
              <img src="${product.image}" alt="${product.name}" width="100" height="100"
                style="border-radius: 8px; object-fit: cover; display: block;" />
            </td>
            <td valign="top">
              <p style="margin: 0 0 4px; font-family: Georgia, serif; font-size: 16px; color: #3A5F47; font-weight: bold;">
                ${product.name}
              </p>
              <p style="margin: 0 0 8px; font-family: Arial, sans-serif; font-size: 14px; color: #B35151; font-weight: bold;">
                ${product.price}
              </p>
              <p style="margin: 0 0 12px; font-family: Arial, sans-serif; font-size: 13px; color: #555555; line-height: 1.5;">
                ${post.product_recommendation_text}
              </p>
              <a href="${appUrl}?product=${post.related_product_id}"
                style="display: inline-block; font-family: Arial, sans-serif; font-size: 13px; color: #3A5F47; text-decoration: none; border: 1px solid #3A5F47; padding: 6px 14px; border-radius: 4px;">
                Ver producto
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>`
    : ''

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${post.title}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f0eb; font-family: Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f5f0eb;">
    <tr>
      <td align="center" style="padding: 32px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" border="0"
          style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background-color: #B35151; padding: 28px 40px; text-align: center;">
              <p style="margin: 0; font-family: Georgia, serif; font-size: 28px; color: #ffffff; letter-spacing: 3px; font-weight: normal;">
                AMAPOLA
              </p>
              <p style="margin: 6px 0 0; font-family: Arial, sans-serif; font-size: 12px; color: rgba(255,255,255,0.8); letter-spacing: 1px; text-transform: uppercase;">
                Cuidado Capilar
              </p>
            </td>
          </tr>

          <!-- Hero image -->
          <tr>
            <td style="padding: 0;">
              <img src="${post.image_url}" alt="${post.title}" width="600"
                style="display: block; width: 100%; max-width: 600px; height: auto;" />
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 40px 32px;">
              <p style="margin: 0 0 8px; font-family: Arial, sans-serif; font-size: 12px; color: #C2845E; text-transform: uppercase; letter-spacing: 1px;">
                ${post.category}
              </p>
              <h1 style="margin: 0 0 16px; font-family: Georgia, serif; font-size: 26px; color: #3A5F47; line-height: 1.3; font-weight: normal;">
                ${post.title}
              </h1>
              <p style="margin: 0 0 8px; font-family: Arial, sans-serif; font-size: 14px; color: #666666;">
                ${greeting},
              </p>
              <p style="margin: 0 0 24px; font-family: Arial, sans-serif; font-size: 15px; color: #444444; line-height: 1.7;">
                ${post.excerpt}
              </p>
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background-color: #B35151; border-radius: 6px;">
                    <a href="${articleUrl}"
                      style="display: inline-block; padding: 14px 28px; font-family: Arial, sans-serif; font-size: 15px; color: #ffffff; text-decoration: none; font-weight: bold;">
                      Leer artículo completo &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Product recommendation -->
          ${productSection}

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; text-align: center; border-top: 1px solid #e8e0d8;">
              <p style="margin: 0 0 8px; font-family: Arial, sans-serif; font-size: 12px; color: #999999;">
                &copy; ${new Date().getFullYear()} Amapola Haircare &middot; Barcelona, España
              </p>
              <p style="margin: 0; font-family: Arial, sans-serif; font-size: 12px; color: #999999;">
                <a href="${unsubscribeUrl}" style="color: #999999; text-decoration: underline;">
                  Darse de baja
                </a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function sendBlogNewsletter(post: BlogPost): Promise<void> {
  const [leadsResult, subscribersResult] = await Promise.all([
    supabaseAdmin.from('leads').select('email, name').not('email', 'is', null),
    supabaseAdmin.from('newsletter_subscribers').select('email, name').eq('active', true),
  ])

  if (leadsResult.error) {
    console.error('Error fetching leads:', leadsResult.error.message)
  }
  if (subscribersResult.error) {
    console.error('Error fetching newsletter subscribers:', subscribersResult.error.message)
  }

  const leadsRecipients: Recipient[] = (leadsResult.data ?? []).map(
    (r: { email: string; name: string | null }) => ({ email: r.email, name: r.name }),
  )
  const subscriberRecipients: Recipient[] = (subscribersResult.data ?? []).map(
    (r: { email: string; name: string | null }) => ({ email: r.email, name: r.name }),
  )

  const emailMap = new Map<string, Recipient>()
  for (const r of [...leadsRecipients, ...subscriberRecipients]) {
    if (!emailMap.has(r.email)) {
      emailMap.set(r.email, r)
    }
  }

  const recipients = Array.from(emailMap.values())

  if (recipients.length === 0) {
    console.error('No recipients found for newsletter')
    return
  }

  const BATCH_SIZE = 50
  const subject = `${post.title} — Blog de Amapola`

  for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
    const batch = recipients.slice(i, i + BATCH_SIZE)

    await Promise.all(
      batch.map(async (recipient) => {
        const html = buildNewsletterHtml(post, recipient)
        const { error } = await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL!,
          to: recipient.email,
          subject,
          html,
        })
        if (error) {
          console.error(`Failed to send newsletter to ${recipient.email}:`, error)
        }
      }),
    )

    if (i + BATCH_SIZE < recipients.length) {
      await delay(1000)
    }
  }

  const { error: updateError } = await supabaseAdmin
    .from('blog_posts')
    .update({ newsletter_sent_at: new Date().toISOString() })
    .eq('id', post.id)

  if (updateError) {
    console.error('Failed to update newsletter_sent_at:', updateError.message)
  }
}
