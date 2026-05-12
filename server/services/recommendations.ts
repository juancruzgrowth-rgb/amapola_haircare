import { genai } from '../lib/gemini'

export interface QuizAnswers {
  name?: string
  email?: string
  hair_type?: string
  hair_porosity?: string
  scalp_condition?: string
  main_concern?: string
  wash_frequency?: string
  chemical_treatments?: string
  budget_range?: string
  goals?: string
}

export interface RoutineStep {
  order: number
  productId: string
  productName: string
  productPrice: string
  instructions: string
  frequency: string
}

export interface Routine {
  intro: string
  diagnosis: string
  steps: RoutineStep[]
  tips: string[]
  outro: string
}

const PRODUCT_CATALOG: Record<string, { name: string; price: string }> = {
  'gotero': { name: 'Gotero Capilar', price: '19,50 €' },
  'acondicionador': { name: 'Acondicionador', price: '16,50 €' },
  'tratamiento-profundo': { name: 'Tratamiento Profundo', price: '24,90 €' },
  'shampoo-graso': { name: 'Champú Pelo Graso', price: '18,90 €' },
  'shampoo-seco': { name: 'Champú Pelo Seco', price: '18,90 €' },
  'exfoliante-capilar': { name: 'Exfoliante Capilar', price: '21,90 €' },
  'tratamiento-folicular': { name: 'Tratamiento Folicular', price: '22,90 €' },
}

function pickShampoo(scalp?: string): string {
  if (scalp === 'graso') return 'shampoo-graso'
  return 'shampoo-seco'
}

function buildBaseSteps(answers: QuizAnswers): RoutineStep[] {
  const steps: RoutineStep[] = []
  const shampoo = pickShampoo(answers.scalp_condition)

  steps.push({
    order: 1,
    productId: shampoo,
    productName: PRODUCT_CATALOG[shampoo].name,
    productPrice: PRODUCT_CATALOG[shampoo].price,
    instructions:
      answers.scalp_condition === 'graso'
        ? 'Aplica sobre cuero cabelludo húmedo, masajea con yemas de los dedos durante 1 minuto y aclara con agua tibia.'
        : 'Masajea suavemente sobre cuero cabelludo y largos. Enjuaga con agua tibia evitando agua muy caliente.',
    frequency:
      answers.wash_frequency === 'diaria'
        ? '3-4 veces por semana'
        : answers.scalp_condition === 'graso'
          ? '3 veces por semana'
          : '2 veces por semana',
  })

  steps.push({
    order: 2,
    productId: 'acondicionador',
    productName: PRODUCT_CATALOG['acondicionador'].name,
    productPrice: PRODUCT_CATALOG['acondicionador'].price,
    instructions:
      'Aplica sólo en medios y puntas tras el champú. Deja actuar 2-3 minutos y aclara con agua fría para sellar la cutícula.',
    frequency: 'Después de cada lavado',
  })

  if (answers.main_concern === 'caida') {
    steps.push({
      order: 3,
      productId: 'tratamiento-folicular',
      productName: PRODUCT_CATALOG['tratamiento-folicular'].name,
      productPrice: PRODUCT_CATALOG['tratamiento-folicular'].price,
      instructions:
        'Aplica con gotero directamente sobre cuero cabelludo seco o húmedo. Masajea 2 minutos para activar circulación. No aclarar.',
      frequency: '3-4 veces por semana, preferentemente por la noche',
    })
  } else if (
    answers.main_concern === 'sequedad' ||
    answers.hair_porosity === 'alta' ||
    answers.chemical_treatments === 'si'
  ) {
    steps.push({
      order: 3,
      productId: 'tratamiento-profundo',
      productName: PRODUCT_CATALOG['tratamiento-profundo'].name,
      productPrice: PRODUCT_CATALOG['tratamiento-profundo'].price,
      instructions:
        'Aplica una capa generosa en medios y puntas tras el champú. Deja actuar 10-15 minutos (puedes envolver en toalla caliente). Aclara con abundante agua.',
      frequency: 'Una vez por semana',
    })
  }

  steps.push({
    order: steps.length + 1,
    productId: 'gotero',
    productName: PRODUCT_CATALOG['gotero'].name,
    productPrice: PRODUCT_CATALOG['gotero'].price,
    instructions:
      answers.hair_type === 'rizado' || answers.hair_type === 'coily'
        ? 'Aplica 4-6 gotas en medios y puntas sobre cabello húmedo. También puedes refrescar las puntas en seco.'
        : 'Aplica 2-3 gotas en medios y puntas sobre cabello húmedo o seco. Evita la raíz si tienes cuero cabelludo graso.',
    frequency: 'Diariamente',
  })

  if (answers.scalp_condition === 'graso' || answers.main_concern === 'caida') {
    steps.push({
      order: steps.length + 1,
      productId: 'exfoliante-capilar',
      productName: PRODUCT_CATALOG['exfoliante-capilar'].name,
      productPrice: PRODUCT_CATALOG['exfoliante-capilar'].price,
      instructions:
        'Aplica sobre cuero cabelludo húmedo, masajea con movimientos circulares 1-2 minutos y aclara muy bien.',
      frequency: 'Cada 15 días',
    })
  }

  return steps
}

function buildTips(answers: QuizAnswers): string[] {
  const tips: string[] = []

  if (answers.hair_type === 'rizado' || answers.hair_type === 'coily') {
    tips.push('Desenreda siempre con peine de púas anchas y sobre cabello húmedo con acondicionador.')
    tips.push('Seca con toalla de microfibra o camiseta de algodón — evita el frote con toalla normal.')
  }
  if (answers.hair_porosity === 'alta') {
    tips.push('Aclara siempre con agua fría al final — sella la cutícula y reduce el frizz.')
  }
  if (answers.hair_porosity === 'baja') {
    tips.push('Antes del tratamiento profundo, aplica calor (toalla caliente o gorro térmico) para abrir la cutícula.')
  }
  if (answers.chemical_treatments === 'si') {
    tips.push('Evita herramientas de calor sin protector térmico previo.')
  }
  if (answers.main_concern === 'frizz') {
    tips.push('No toques el cabello mientras se seca al aire — manipularlo activa el encrespamiento.')
  }
  if (tips.length === 0) {
    tips.push('Bebe agua suficiente cada día: la hidratación del cabello empieza desde dentro.')
    tips.push('Duerme con funda de seda o satén para reducir la fricción nocturna.')
  }

  return tips.slice(0, 4)
}

async function generatePersonalCopy(answers: QuizAnswers): Promise<{ intro: string; diagnosis: string; outro: string }> {
  const fallback = {
    intro: `Hola${answers.name ? ` ${answers.name}` : ''}, hemos diseñado esta rutina pensando en las necesidades reales de tu cabello. Cada paso ha sido elegido para acompañarte en un camino de cuidado natural, suave y constante.`,
    diagnosis: `Tu cabello ${answers.hair_type ?? 'natural'} con porosidad ${answers.hair_porosity ?? 'media'} y cuero cabelludo ${answers.scalp_condition ?? 'equilibrado'} necesita una rutina centrada en ${answers.main_concern ?? 'nutrición e hidratación'}.`,
    outro: 'Recuerda: los resultados de una rutina natural se notan con constancia. Dale a tu cabello al menos 4 semanas para adaptarse. Estamos aquí si necesitas guía.',
  }

  try {
    const prompt = `Eres la voz de Amapola, marca española de cuidado capilar natural. Tono cálido, profesional, elegante, en español neutro. Sin emojis. Sin exageraciones.

Información de la clienta:
- Nombre: ${answers.name ?? 'sin nombre'}
- Tipo de cabello: ${answers.hair_type ?? 'no especificado'}
- Porosidad: ${answers.hair_porosity ?? 'no especificada'}
- Cuero cabelludo: ${answers.scalp_condition ?? 'no especificado'}
- Preocupación principal: ${answers.main_concern ?? 'no especificada'}
- Tratamientos químicos: ${answers.chemical_treatments ?? 'no especificado'}

Devuelve ÚNICAMENTE un JSON válido sin markdown:
{
  "intro": "2-3 frases dirigiéndote a la clienta por su nombre (si lo tiene), presentando la rutina como un cuidado personalizado",
  "diagnosis": "2-3 frases resumiendo lo que su cabello necesita según sus respuestas",
  "outro": "1-2 frases motivadoras sobre la constancia y los resultados con productos naturales"
}`

    const response = await genai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    })

    const rawText = response.text ?? ''
    const jsonMatch = rawText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) return fallback

    const parsed = JSON.parse(jsonMatch[0])
    if (!parsed.intro || !parsed.diagnosis || !parsed.outro) return fallback
    return parsed
  } catch (err) {
    console.error('Gemini copy generation failed, using fallback:', err)
    return fallback
  }
}

export async function generateRecommendations(answers: QuizAnswers): Promise<Routine> {
  const [copy, steps, tips] = await Promise.all([
    generatePersonalCopy(answers),
    Promise.resolve(buildBaseSteps(answers)),
    Promise.resolve(buildTips(answers)),
  ])

  return {
    intro: copy.intro,
    diagnosis: copy.diagnosis,
    steps,
    tips,
    outro: copy.outro,
  }
}
