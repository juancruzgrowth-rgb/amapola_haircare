# Amapola — Próximos Pasos

> Última actualización: 2026-05-29 (sesión 6)
> Estado: Logos navbar y quiz actualizados (versión corregida). Hero mobile con más altura. Botón CTA reviews con más separación. Focus de inputs mejorado (solo borde fino). Mensaje WhatsApp reformateado con bullets y negrita. Imágenes shampoo y exfoliante actualizadas. Fotos de productos y guía de branding subidas al repo.

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
GEMINI_API_KEY=...                   # ⚠️ la key actual (formato AQ.) tiene quota 0 — crear nueva en aistudio.google.com (debe empezar con AIzaSy)
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

### 4. Insertar los 3 blog posts iniciales en Supabase

Los posts están escritos en español con imágenes relevantes (Unsplash, temática capilar).
El seed está en `supabase/seed.sql`. Hay dos formas de insertarlos:

**Opción A — Supabase dashboard (más rápido, sin Docker):**
- Ir a https://supabase.com → proyecto → SQL Editor
- Copiar y ejecutar el contenido completo de `supabase/seed.sql`
- Los posts aparecen de inmediato en `/blog` con status `published`

**Opción B — Supabase local:**
```bash
npx supabase start
psql $(npx supabase db url) < supabase/seed.sql
```

Posts incluidos:
1. "Cómo Determinar tu Tipo de Porosidad Capilar" — category: Educación
2. "Rutina Capilar para Cabello Seco: Guía Paso a Paso" — category: Rutinas
3. "Los Mejores Ingredientes Naturales para el Crecimiento Capilar" — category: Ingredientes

Navegación: home → card del blog → detalle del post ✅ (ya funciona una vez con datos en DB)

> Nota: el generador automático con Gemini + aprobación Telegram sigue activo para posts futuros.
> El seed es solo para los 3 posts de lanzamiento.

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

### Lo que está implementado (Sesiones 1–6 ✅)

| Feature | Estado | Archivos clave |
|---|---|---|
| Logo navbar | ✅ actualizado sesión 6 | `public/logo-navbar.svg` |
| Logo quiz (paso inicial) | ✅ actualizado sesión 6 | `public/logo-quiz.svg` |
| Logo footer | ✅ | `public/logo-footer.svg` |
| Favicon personalizado | ✅ | `public/favicon.svg` |
| Hero mobile height | ✅ ampliado sesión 6 (500px) | `src/App.tsx` línea ~729 |
| Botón CTA bajo reviews | ✅ más separación sesión 6 | `src/App.tsx` — `mt-16` |
| Focus de inputs | ✅ solo borde fino sesión 6 | `src/App.tsx` + `src/index.css` |
| Mensaje WhatsApp | ✅ bullets + negrita sesión 6 | `src/App.tsx` — `buildWhatsAppMessage()` |
| Imágenes de productos | ✅ fotos reales sesión 6 | `public/` — shampoo-dry-2, productos-9, etc. |
| Fotos originales en repo | ✅ subidas sesión 6 | `productos/` (27 imágenes) |
| Guía de branding en repo | ✅ subida sesión 6 | `img-logotipos/images/guia-branding-amapola.pdf` |
| Sección newsletter | ✅ | `src/App.tsx` — `NewsletterSection` |
| Quiz conectado al backend | ✅ | `src/App.tsx` → `POST /api/quiz/submit` |
| Tabla quiz_responses Supabase | ✅ migración lista, ❌ no pusheada aún | `supabase/migrations/004_create_quiz_responses.sql` |
| PDF con branding oficial (5 páginas) | ✅ | `server/services/pdf.tsx` — sin precios, colores `#5D6044`/`#A75754`/`#F7F5F0` |
| Rutina personalizada con Gemini | ✅ (fallback si quota 0) | `server/services/recommendations.ts` |
| Email con PDF adjunto vía Resend | ✅ | `server/services/email-quiz.ts` |
| Route `POST /api/quiz/submit` | ✅ | `server/routes/quiz.ts` |
| Skill `amapola-newsletter` | ✅ | `.claude/skills/amapola-newsletter/SKILL.md` |
| 3 blog posts (seed.sql) | ✅ listo, ❌ no insertado en DB aún | `supabase/seed.sql` |
| Blog navegable (home → detalle) | ✅ | `src/App.tsx` |
| 6 productos reales con detalle | ✅ | `src/constants.ts` |
| Página de detalle de producto | ✅ | `src/App.tsx` — `ProductDetailPage` |
| Carrito: checkout WhatsApp | ✅ | `src/App.tsx` — `CartPage` |
| Carrito: opciones de entrega | ✅ | Envío BCN +5€ · Recogida gratis |
| Carrito: opciones de pago | ✅ | Bizum · En mano |
| Reseñas con galería circular 3D | ✅ | `src/App.tsx` — `CircularGallery` |
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
- `/deploy-check` — validaciones pre-deploy

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

### Fase 3.6 — E-commerce Stripe (pospuesta)

**Estado actual:** el carrito gestiona pedidos vía WhatsApp con Bizum manual o pago en mano. Funciona para el volumen actual sin pasarela online.

**Cuándo retomar:** cuando el volumen de pedidos justifique automatizar cobros, o cuando Kleo quiera eliminar la fricción del Bizum manual.

**Pasos cuando se retome:**
1. `npm install stripe @stripe/react-stripe-js @stripe/stripe-js`
2. Migración Supabase para `orders` y `order_items` (schema en reglas de dominio).
3. `POST /api/checkout` → crea `PaymentIntent` → devuelve `client_secret`.
4. `POST /api/webhooks/stripe` → en `payment_intent.succeeded` → crea orden + email confirmación.
5. Reemplazar flujo WhatsApp por `<PaymentElement>` (tarjeta + Bizum nativo, SCA automático).

**Regla crítica:** NUNCA crear la orden antes de recibir el webhook.

**Variables necesarias (ya en `.env.example`):**
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Fase 3.7 — Ads
- Meta Ads: lookalike de leads del quiz + retargeting visitantes
- Google Ads: búsqueda por intención ("cuidado cabello rizado natural Spain")

---

## Notas del desarrollador (pendiente)

- Terminar la implementacion del quiz: aplicar migraciones Supabase, configurar env vars, probar end-to-end (ver pasos 1–3 arriba)
- Insertar 3 blog posts en Supabase (ver paso 4 arriba)
- **Gemini API key**: la actual (formato `AQ.`) tiene quota 0 — crear nueva en aistudio.google.com, debe empezar con `AIzaSy`
- Pedir a Kleo testimonios reales con nombres y fotos de perfil (o usar fotos ficticias realistas)
- Pedir a Kleo crear cuenta Meta Developer para activar la sección de reels de Instagram
- Probar newsletter, blog y quiz end-to-end con datos reales
- Ver logo navbar en mobile — puede necesitar ajuste de tamaño
- Revisar formulario de compra: evaluar si quitar campos innecesarios o ajustar layout
- Terminar chatbot con base de conocimiento (productos, marca, fundadora) — Fase 3.3
- Mejorar imágenes de blog (actualmente Unsplash genérico — reemplazar con fotos propias de Kleo)
- Analizar UI/UX y seguridad de la web mediante skills dedicadas
