import 'dotenv/config'
import { GoogleGenAI } from '@google/genai'

const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })

async function main() {
  const pager = await genai.models.list()
  for await (const m of pager) {
    if (
      m.name?.includes('imagen') ||
      m.name?.includes('image') ||
      m.name?.includes('flash')
    ) {
      console.log(m.name, '|', m.supportedActions?.join(', '))
    }
  }
}

main()
