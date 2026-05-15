---
name: quiz-pdf
description: Genera o modifica el PDF de rutina capilar personalizada del quiz de Amapola. Úsala cuando el usuario pida "cambiar el PDF del quiz", "actualizar el diseño del PDF", "modificar la rutina capilar en PDF", "ajustar branding del PDF" o cualquier cambio en server/services/pdf.tsx.
---

# Amapola Quiz PDF — Skill

Esta skill gestiona el PDF de rutina capilar personalizada que se genera tras completar el quiz. El archivo vive en `server/services/pdf.tsx` y usa `@react-pdf/renderer`.

## Arquitectura del PDF

El PDF se genera server-side en Express. El flujo completo:

1. `POST /api/quiz/submit` recibe respuestas del quiz (validadas con Zod)
2. `server/services/recommendations.ts` genera la rutina con Gemini API
3. `server/services/pdf.tsx` → `renderQuizPDF(name, answers, routine)` → `Buffer`
4. El buffer se sube a Supabase Storage (`quiz-pdfs` bucket)
5. `server/services/email-quiz.ts` envía el PDF como adjunto via Resend

## Identidad de Marca (no negociable)

**Paleta cromática** (misma que branding general):

| Variable | Hex | Uso en PDF |
| --- | --- | --- |
| `oliva` | `#3D6044` | Títulos, números de paso, header, portada |
| `terracota` | `#A75754` | CTAs, badges, frecuencias, precio de productos |
| `crema` | `#F7F5F0` | Fondo principal de todas las páginas |
| `arena` | `#D9D2C8` | Cards de diagnóstico, separadores |
| `salvia` | `#BFC3AE` | Acentos sutiles, footer |
| `texto` | `#2B2B2B` | Párrafos principales |
| `textoSuave` | `#5A5A5A` | Captions, texto secundario, itálicas |

**Tipografías** (cargadas desde Google Fonts via `Font.register`):
- `Cormorant Garamond` (400 + 700) → títulos display, números, valores del diagnóstico
- `Inter` (400 + 600) → body, labels, precios, instrucciones

## Estructura de Páginas (4 páginas fijas)

### Página 1 — Portada
- Fondo: crema (#F7F5F0)
- Header: "AMAPOLA" (Cormorant Bold, oliva) + badge "HAIRCARE" (terracota)
- Centro: "Tu rutina capilar" + "personalizada" (itálica terracota) + nombre de la clienta en uppercase
- Footer: valores de marca ("Natural · Elegante · Delicada · Premium")

### Página 2 — Diagnóstico (`routine.intro` + `routine.diagnosis`)
- Header de página: AMAPOLA + "Rutina personalizada"
- Card arena con 4 filas: tipo de cabello, porosidad, cuero cabelludo, preocupación
- Párrafo de intro generado por Gemini
- Párrafo de diagnosis en itálica

### Página 3 — Rutina paso a paso (`routine.steps[]`)
- Cada step tiene: número circular (oliva), nombre del producto (oliva), precio (terracota), frecuencia (uppercase terracota), instrucciones
- Los steps son `wrap={false}` para no cortarse entre páginas

### Página 4 — Tips + CTA
- Página 4a (Tips): lista de bullets con `routine.tips[]` + `routine.outro`
- Página 4b (CTA): fondo oliva, texto crema, botón terracota con URL de la tienda, redes sociales

## Tipos Clave

```typescript
// De server/services/recommendations.ts
interface QuizAnswers {
  hair_type: 'liso' | 'ondulado' | 'rizado' | 'coily'
  hair_porosity: 'baja' | 'media' | 'alta' | 'no_se'
  scalp_condition: 'normal' | 'graso' | 'seco' | 'sensible'
  main_concern: 'caida' | 'sequedad' | 'frizz' | 'brillo'
  wash_frequency?: string
  chemical_treatments?: string
  budget?: string
  goals?: string[]
}

interface RoutineStep {
  order: number
  productName: string
  productPrice: string  // ej: "19.50 €"
  frequency: string     // ej: "2-3 veces por semana"
  instructions: string
}

interface Routine {
  intro: string         // párrafo de bienvenida personalizado (Gemini)
  diagnosis: string     // análisis del tipo de cabello (Gemini)
  steps: RoutineStep[]  // 3-5 pasos con productos Amapola
  tips: string[]        // 4-6 consejos específicos
  outro: string         // mensaje de cierre (Gemini)
}
```

## Reglas de Diseño

1. **Solo productos Amapola** — nunca recomendar marcas externas en el PDF.
2. **Fondo siempre crema** — no usar fondo blanco puro (#FFFFFF).
3. **Número de páginas**: portada (sin número) + pp. 02, 03, 04. La página CTA no lleva número.
4. **`wrap={false}`** en cada step para evitar cortes feos entre páginas.
5. **Espacios en blanco generosos** — padding 48pt en páginas internas, 64pt en portada y CTA.
6. **Tamaño**: A4 siempre.
7. **Sin imágenes de productos** — solo tipografía y color (las fuentes de Google Fonts pueden fallar con imágenes externas en producción).

## Cómo Hacer Cambios

### Modificar colores
Editar el objeto `colors` en `server/services/pdf.tsx` (líneas 21-29). Los colores se usan via `StyleSheet.create()` — no hay valores inline en el JSX.

### Agregar una página nueva
Añadir un `<Page>` adicional dentro del `<Document>` en el componente `QuizPDF`. Incluir siempre `<View style={styles.pageHeader}>` al principio.

### Cambiar la estructura del diagnóstico
Los labels de respuesta están en `ANSWER_LABELS` (línea 354). Agregar nuevos campos ahí si se amplía el quiz.

### Cambiar tipografías
Modificar las llamadas `Font.register()` al inicio del archivo. Los archivos `.ttf` deben ser URLs públicas accesibles desde el servidor en producción.

## Testing del PDF

```bash
# Levantar el servidor Express
npm run dev

# Hacer una petición de prueba al endpoint
curl -X POST http://localhost:3001/api/quiz/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@test.com",
    "answers": {
      "hair_type": "rizado",
      "hair_porosity": "alta",
      "scalp_condition": "seco",
      "main_concern": "sequedad"
    }
  }'
```

El PDF generado se sube a Supabase Storage. Para ver el resultado, revisar la URL en `quiz_responses.pdf_url` en la tabla de Supabase.

## Variables de Entorno Requeridas

```env
APP_URL="https://amapola.com"        # URL del CTA en la última página
GEMINI_API_KEY=""                     # Para generar intro/diagnosis/tips
SUPABASE_URL=""                       # Para subir el PDF
SUPABASE_SERVICE_ROLE_KEY=""          # Bucket quiz-pdfs
RESEND_API_KEY=""                     # Para enviar el email con PDF adjunto
RESEND_FROM_EMAIL=""                  # ej: hola@amapola.com
```
