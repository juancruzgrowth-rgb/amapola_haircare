const TELEGRAM_API_BASE = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`
const OWNER_CHAT_ID = process.env.TELEGRAM_OWNER_CHAT_ID

interface ApprovalRequestPost {
  id: string
  approval_token: string
  title: string
  excerpt: string
  image_url: string
  category: string
}

async function telegramFetch(method: string, body: Record<string, unknown>): Promise<void> {
  const response = await fetch(`${TELEGRAM_API_BASE}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Telegram API error (${method}): ${response.status} ${errorText}`)
  }
}

export async function sendApprovalRequest(post: ApprovalRequestPost): Promise<void> {
  if (!process.env.TELEGRAM_BOT_TOKEN || !OWNER_CHAT_ID) {
    throw new Error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_OWNER_CHAT_ID')
  }

  const caption = `🌸 *Nueva entrada de blog lista*\n\n*${post.title}*\n📂 ${post.category}\n\n${post.excerpt}\n\n¿Publicar esta entrada?`

  const replyMarkup = {
    inline_keyboard: [[
      { text: 'Aprobar ✅', callback_data: `approve_${post.approval_token}` },
      { text: 'Rechazar ❌', callback_data: `reject_${post.approval_token}` },
    ]],
  }

  await telegramFetch('sendPhoto', {
    chat_id: OWNER_CHAT_ID,
    photo: post.image_url,
    caption,
    parse_mode: 'Markdown',
    reply_markup: replyMarkup,
  })
}

export async function answerCallbackQuery(callbackQueryId: string, text: string): Promise<void> {
  if (!process.env.TELEGRAM_BOT_TOKEN) {
    throw new Error('Missing TELEGRAM_BOT_TOKEN')
  }

  await telegramFetch('answerCallbackQuery', {
    callback_query_id: callbackQueryId,
    text,
  })
}

export async function sendMessage(text: string): Promise<void> {
  if (!process.env.TELEGRAM_BOT_TOKEN || !OWNER_CHAT_ID) {
    throw new Error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_OWNER_CHAT_ID')
  }

  await telegramFetch('sendMessage', {
    chat_id: OWNER_CHAT_ID,
    text,
  })
}
