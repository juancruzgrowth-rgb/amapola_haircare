# Amapola — Próximos Pasos

> Última actualización: 2026-06-08 (sesión 8 — fin)
> Estado: Home muestra las imágenes reales de los últimos posts del blog (fetch a `/api/blog/posts`), carrito persistido en localStorage (no se pierde al recargar), y mensaje de pedido por WhatsApp con formato adaptado al dispositivo (mobile con emojis, escritorio en texto plano porque su fuente no renderiza emojis/bullets).

---

## Acciones que tiene que hacer Kleo / el desarrollador

### 1. ✅ Variables de entorno en Vercel — cargadas en sesión 7

Variables ya cargadas en Vercel (Production):
`APP_URL`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `GEMINI_API_KEY`, `BLOG_CRON_SECRET`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_OWNER_CHAT_ID`

Pendientes (no críticas aún): `VITE_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`

---

### 2. Redeploy en Vercel

Después de cargar las env vars, hacer redeploy para que tomen efecto:

```bash
vercel --prod
```

O desde el panel: vercel.com → amapola-haircare → Deployments → último deploy → Redeploy.

---

## Contexto para la próxima sesión con Claude

### Lo que está implementado (Sesiones 1–7 ✅)

| Feature | Estado | Archivos clave |
|---|---|---|
| Logo navbar (desktop) | ✅ | `public/logo-navbar.svg` |
| Logo navbar (mobile) | ✅ sesión 7 | `public/logo-navbar-mobile.svg` |
| Logo mobile en inicio del quiz | ✅ sesión 7 | `src/App.tsx` línea 1162 — `QuizPage` step 0 |
| Logo quiz (desktop) | ✅ | `public/logo-quiz.svg` |
| Logo footer | ✅ | `public/logo-footer.svg` |
| Favicon personalizado | ✅ | `public/favicon.svg` |
| Proxy Vite `/api` → Express | ✅ sesión 7 | `vite.config.ts` |
| Blog: listado + detalle | ✅ | `src/App.tsx`, `src/components/blog/` |
| Blog: markdown rendering | ✅ sesión 7 | `src/components/blog/BlogDetailPage.tsx` — `parseInline()` + `renderContent()` |
| Blog: 3 posts seed en Supabase | ✅ sesión 7 | `supabase/seed.sql` — IDs `b1000000-...001/002/003` |
| Blog: imágenes sin texto (NO_TEXT_RULE) | ✅ sesión 7 | `scripts/generate-seed-images.ts`, `server/services/blog-generator.ts` |
| Blog: generador automático con Gemini | ✅ sesión 7 | `server/services/blog-generator.ts` — usa `gemini-2.5-flash-image` + foto producto referencia |
| Servidor: export para Vercel serverless | ✅ sesión 7 | `server/index.ts` — `export default app` + `if VERCEL !== 1` |
| Quiz conectado al backend | ✅ | `src/App.tsx` → `POST /api/quiz/submit` |
| Tabla quiz_responses Supabase | ✅ migración lista | `supabase/migrations/004_create_quiz_responses.sql` |
| PDF con branding oficial (5 páginas) | ✅ | `server/services/pdf.tsx` |
| Rutina personalizada con Gemini | ✅ (fallback si quota 0) | `server/services/recommendations.ts` |
| Email con PDF adjunto vía Resend | ✅ | `server/services/email-quiz.ts` |
| Route `POST /api/quiz/submit` | ✅ | `server/routes/quiz.ts` |
| 6 productos reales con detalle | ✅ | `src/constants.ts` |
| Carrito: checkout WhatsApp | ✅ | `src/App.tsx` — `CartPage` |
| Carrito: persistencia localStorage | ✅ sesión 8 | `src/App.tsx` — key `amapola_cart` (no se pierde al recargar) |
| Carrito: opciones de entrega y pago | ✅ | Envío BCN +5€ · Recogida gratis · Bizum · En mano |
| WhatsApp: mensaje adaptado al dispositivo | ✅ sesión 8 | `src/App.tsx` — `buildWhatsAppMessage()` (mobile=emojis, escritorio=texto plano) |
| Home: últimos posts con imágenes reales | ✅ sesión 8 | `src/App.tsx` — `Home` fetch `/api/blog/posts?limit=3` + fallback estático |
| Reseñas con galería circular 3D | ✅ | `src/App.tsx` — `CircularGallery` |
| Sección newsletter | ✅ | `src/App.tsx` — `NewsletterSection` |
| Skill `amapola-newsletter` | ✅ | `.claude/skills/amapola-newsletter/SKILL.md` |
| Skill `session-docs` → Notion | ✅ sesión 7 | `.claude/skills/session-docs/` |
| Fotos originales en repo | ✅ | `productos/` (27 imágenes) |
| Guía de branding en repo | ✅ | `img-logotipos/images/guia-branding-amapola.pdf` |
| Sección Instagram | ⏸ oculta | Activar cuando Kleo tenga Meta Developer |

### Guía de branding (para referencia rápida)

| Color | Hex | Uso |
|---|---|---|
| Oliva principal | `#5D6044` | Títulos, headers, botones primarios |
| Terracota acento | `#A75754` | CTAs, badges, highlights |
| Crema suave | `#F7F5F0` | Fondos principales |
| Arena cálida | `#D9D2C8` | Fondos secundarios, separadores |
| Verde salvia | `#BFC3AE` | Acentos sutiles |

Tipografía: **Cormorant Garamond** (display) + **Inter** (texto). ADN: Natural · Elegante · Delicada · Premium.
Guía completa: `img-logotipos/images/guia-branding-amapola.pdf`

### Skills disponibles
- `/amapola-newsletter` — genera HTML email con branding oficial
- `/session-docs` — documenta la sesión y sube a Notion automáticamente
- `/deploy-check` — validaciones pre-deploy

---

## Roadmap — Pendiente

### Próximo: Automatizaciones de contenido y aprobación

**Bot de Telegram para aprobación de posts:**
- Kleo recibe en Telegram el borrador del post con botones "Publicar" / "Descartar"
- Al aprobar → el post se publica en el blog y se envía el newsletter
- Library: `grammy` o `node-telegram-bot-api`
- Archivos existentes (esqueleto): `server/services/telegram.ts`, `server/routes/webhooks/telegram.ts`

**Cron semanal de generación automática:**
- Vercel Cron llama `POST /api/blog/generate` cada semana
- Gemini genera un nuevo post → queda en status `pending_approval` esperando Telegram
- Variable: `BLOG_CRON_SECRET` ya en `.env` y en Vercel
- Ya configurado en `vercel.json`: `"crons": [{ "path": "/api/blog/generate", "schedule": "0 9 * * 1" }]`
- Pendiente: verificar que el endpoint `/api/blog/generate` requiere el header `x-cron-secret`

---

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

### Fase 3.6 — E-commerce Stripe (pospuesta)

**Estado actual:** el carrito gestiona pedidos vía WhatsApp con Bizum manual o pago en mano. Funciona para el volumen actual sin pasarela online.

**Cuándo retomar:** cuando el volumen de pedidos justifique automatizar cobros.

**Pasos cuando se retome:**
1. `npm install stripe @stripe/react-stripe-js @stripe/stripe-js`
2. Migración Supabase para `orders` y `order_items`.
3. `POST /api/checkout` → crea `PaymentIntent` → devuelve `client_secret`.
4. `POST /api/webhooks/stripe` → en `payment_intent.succeeded` → crea orden + email confirmación.
5. Reemplazar flujo WhatsApp por `<PaymentElement>` (tarjeta + Bizum nativo, SCA automático).

**Regla crítica:** NUNCA crear la orden antes de recibir el webhook.

```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Fase 3.7 — Ads
- Meta Ads: lookalike de leads del quiz + retargeting visitantes
- Google Ads: búsqueda por intención ("cuidado cabello rizado natural Spain")


### Notas del desarrollador:
- Hay que crear tabla de productos en db
- Hay que crear una base de conocimiento y crear el bot y tambien para respuestas automaticas en whatsapp e instagram
- Generar contenido en automatico
- Generar canal youtube
