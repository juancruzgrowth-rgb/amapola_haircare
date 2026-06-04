# Amapola — Próximos Pasos

> Última actualización: 2026-06-04 (sesión 7)
> Estado: Blog funcionando con markdown correcto, imágenes generadas con IA usando fotos reales de producto, logo mobile en navbar, proxy Vite corregido, 3 posts seed insertados en Supabase.

---

## Acciones que tiene que hacer Kleo / el desarrollador

### 1. Verificar variables de entorno en `.env`

Asegurarse de que estén completas antes de correr el server:

```
APP_URL=https://tudominio.com   # o http://localhost:3000 para local
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
RESEND_API_KEY=...
RESEND_FROM_EMAIL=hola@amapola.com   # debe estar verificado en Resend
GEMINI_API_KEY=...                   # debe empezar con AIzaSy (billing activo en ai.dev/projects)
BLOG_CRON_SECRET=...
TELEGRAM_BOT_TOKEN=...
TELEGRAM_OWNER_CHAT_ID=...
NOTION_API_KEY=...                   # para skill session-docs
NOTION_AMAPOLA_PAGE_ID=...          # para skill session-docs
```

---

### 2. Deploy en Vercel

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
- Ir a vercel.com → proyecto → Settings → Environment Variables y cargar todas.

---

## Contexto para la próxima sesión con Claude

### Lo que está implementado (Sesiones 1–7 ✅)

| Feature | Estado | Archivos clave |
|---|---|---|
| Logo navbar (desktop) | ✅ | `public/logo-navbar.svg` |
| Logo navbar (mobile) | ✅ sesión 7 | `public/logo-navbar-mobile.svg` |
| Logo quiz | ✅ | `public/logo-quiz.svg` |
| Logo footer | ✅ | `public/logo-footer.svg` |
| Favicon personalizado | ✅ | `public/favicon.svg` |
| Proxy Vite `/api` → Express | ✅ sesión 7 | `vite.config.ts` |
| Blog: listado + detalle | ✅ | `src/App.tsx`, `src/components/blog/` |
| Blog: markdown rendering | ✅ sesión 7 | `src/components/blog/BlogDetailPage.tsx` — `parseInline()` + `renderContent()` |
| Blog: 3 posts seed en Supabase | ✅ sesión 7 | `supabase/seed.sql` — IDs `b1000000-...001/002/003` |
| Blog: imágenes con IA (referencia fotos reales) | ✅ sesión 7 | `scripts/generate-seed-images.ts` |
| Blog: generador automático con Gemini | ✅ implementado | `server/services/blog-generator.ts` |
| Quiz conectado al backend | ✅ | `src/App.tsx` → `POST /api/quiz/submit` |
| Tabla quiz_responses Supabase | ✅ migración lista | `supabase/migrations/004_create_quiz_responses.sql` |
| PDF con branding oficial (5 páginas) | ✅ | `server/services/pdf.tsx` |
| Rutina personalizada con Gemini | ✅ (fallback si quota 0) | `server/services/recommendations.ts` |
| Email con PDF adjunto vía Resend | ✅ | `server/services/email-quiz.ts` |
| Route `POST /api/quiz/submit` | ✅ | `server/routes/quiz.ts` |
| 6 productos reales con detalle | ✅ | `src/constants.ts` |
| Carrito: checkout WhatsApp | ✅ | `src/App.tsx` — `CartPage` |
| Carrito: opciones de entrega y pago | ✅ | Envío BCN +5€ · Recogida gratis · Bizum · En mano |
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
- Variable: `BLOG_CRON_SECRET` ya en `.env`

**Actualizar `blog-generator.ts` para imágenes:**
- Actualmente usa `generateImages` API (requiere plan Imagen especial)
- Debe migrar al mismo approach que el seed script: `gemini-2.5-flash-image` con fotos reales de producto como referencia multimodal

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
