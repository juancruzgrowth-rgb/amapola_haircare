# Amapola — Próximos Pasos

> Última actualización: 2026-05-12
> Estado: Fase 3.1 implementada y pusheada a GitHub. Pendiente de activar en producción.

---

## Acciones que tiene que hacer Kleo / el desarrollador

### 1. Aplicar migración de base de datos (OBLIGATORIO antes de probar el quiz)

La tabla `quiz_responses` y el bucket de storage `quiz-pdfs` están definidos en:
`supabase/migrations/004_create_quiz_responses.sql`

**Opción A — Supabase local (Docker):**
```bash
npx supabase start
npx supabase db push
```

**Opción B — Supabase remoto (dashboard):**
- Abrir https://supabase.com → proyecto → SQL Editor
- Copiar y ejecutar el contenido de `supabase/migrations/004_create_quiz_responses.sql`
- Crear bucket manualmente: Storage → New bucket → nombre: `quiz-pdfs` → Public ✓

Después de cualquier opción, regenerar los tipos TypeScript:
```bash
npx supabase gen types typescript --local > src/types/database.ts
# o si es remoto:
npx supabase gen types typescript --project-id [TU_PROJECT_ID] > src/types/database.ts
```

---

### 2. Verificar variables de entorno en `.env`

Asegurarse de que estén completas antes de correr el server:

```
APP_URL=https://tudominio.com   # o http://localhost:3000 para local
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
RESEND_API_KEY=...
RESEND_FROM_EMAIL=hola@amapola.com   # debe estar verificado en Resend
GEMINI_API_KEY=...
BLOG_CRON_SECRET=...
TELEGRAM_BOT_TOKEN=...
TELEGRAM_OWNER_CHAT_ID=...
```

---

### 3. Test end-to-end del quiz

Con Docker y `.env` listos, levantar frontend + backend:

```bash
# Terminal 1
npm run server:dev

# Terminal 2
npm run dev
```

Abrir http://localhost:3000 → hacer el quiz completo → enviar email real.
Verificar:
- Fila en tabla `leads` (Supabase dashboard)
- Fila en tabla `quiz_responses` con `pdf_url` rellenado
- Email recibido con PDF adjunto
- PDF tiene branding correcto (colores oliva/terracota, 5 páginas)

---

### 4. Disparar los 3 blog posts iniciales

Con el server corriendo (paso 3):

```bash
for i in 1 2 3; do
  curl -X POST http://localhost:3001/api/blog/generate \
    -H "x-cron-secret: $BLOG_CRON_SECRET"
  sleep 10
done
```

Cada post llega como mensaje en Telegram. Kleo aprueba cada uno desde su teléfono.
Una vez aprobados aparecen en la sección `/blog` y se envía el newsletter a la lista.

---

### 5. Deploy en Vercel

Una vez que todo funcione local:

```bash
# Si no está linkeado aún:
vercel link

# Deploy preview:
vercel

# Deploy producción:
vercel --prod
```

Asegurarse de que las env vars estén cargadas en Vercel:
```bash
vercel env add SUPABASE_URL production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
# ... repetir para cada variable
```

O más fácil: ir a vercel.com → proyecto → Settings → Environment Variables y cargar todas.

---

## Contexto para la próxima sesión con Claude

### Lo que está implementado (Fase 3.1 ✅)

| Feature | Estado | Archivos clave |
|---|---|---|
| Logo grande en quiz (paso inicial) | ✅ | `src/App.tsx` — usa `/public/logo-quiz.png` |
| Sección newsletter en la web | ✅ | `src/App.tsx` — `NewsletterSection` component |
| Quiz conectado al backend | ✅ | `src/App.tsx` → `POST /api/quiz/submit` |
| Tabla quiz_responses en Supabase | ✅ migración lista, ❌ **no pusheada aún** | `supabase/migrations/004_create_quiz_responses.sql` |
| PDF con branding oficial (5 páginas) | ✅ | `server/services/pdf.tsx` (colores `#3D6044`, `#A75754`, `#F7F5F0`) |
| Rutina personalizada con Gemini | ✅ | `server/services/recommendations.ts` |
| Email con PDF adjunto vía Resend | ✅ | `server/services/email-quiz.ts` |
| Route `POST /api/quiz/submit` | ✅ | `server/routes/quiz.ts` |
| Skill `amapola-newsletter` | ✅ | `.claude/skills/amapola-newsletter/SKILL.md` |
| 3 blog posts iniciales | ⏳ manual | Ver paso 4 arriba |
| Cambios visuales homepage | ✅ | Logo navbar, hero image, historia, reels, iconos quiz |

### Guía de branding (extraída de las imágenes — para referencia rápida)

| Color | Hex | Uso |
|---|---|---|
| Oliva principal | `#3D6044` | Títulos, headers, botones primarios |
| Terracota acento | `#A75754` | CTAs, badges, highlights |
| Crema suave | `#F7F5F0` | Fondos principales |
| Arena cálida | `#D9D2C8` | Fondos secundarios, separadores |
| Verde salvia | `#BFC3AE` | Acentos sutiles |

Tipografía: **Cormorant Garamond** (display) + **Inter** (texto). ADN: Natural · Elegante · Delicada · Premium.

### Skills disponibles
- `/amapola-newsletter` — genera HTML email con branding oficial

---

## Roadmap completo (pendiente)

### Fase 3.2 — CRM + follow-ups email
- Dashboard `/admin` protegido (tabla leads + quiz_responses + estados)
- Segmentación: leads nuevos / leads sin compra / clientes activos
- Secuencias email automáticas (3 emails post-quiz, 5 días entre cada uno)

### Fase 3.3 — RAG Chatbot
- Vector store (pgvector en Supabase o Pinecone)
- Base de conocimiento: guía branding + FAQ + catálogo + tono Kleo
- Chat widget en la web con handoff a Telegram cuando IA no está segura

### Fase 3.4 — Generador de contenido
- Pipeline semanal: ideas → guiones reels → captions + hashtags → aprobación Telegram
- 3 reels/semana IG + 3 videos/semana TikTok + 3 stories/día + 1 carrusel educativo/semana

### Fase 3.5 — Logística shipping
- Investigar: Sendcloud, Packlink, Correos Express, MRW
- Elegir proveedor → webhook de confirmación de pedido → generar etiqueta automáticamente

### Fase 3.6 — E-commerce Stripe
- Instalar Stripe SDK, crear PaymentIntents, webhook `payment_intent.succeeded`
- Tablas `orders` y `order_items` en Supabase
- Checkout con Stripe Payment Element (soporta Bizum en España)

### Fase 3.7 — Ads
- Meta Ads: lookalike de leads del quiz + retargeting visitantes
- Google Ads: búsqueda por intención ("cuidado cabello rizado natural Spain")
