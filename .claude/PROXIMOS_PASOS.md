# Amapola — Próximos Pasos

> Última actualización: 2026-05-28 (sesión 4)
> Estado: Productos reales integrados desde PDF (6 productos con info completa). Página de detalle de producto implementada. Logos SVG (quiz, footer, favicon) en producción. Animación de flores en hero con iconos Lucide en color terracota. Pendiente: activar blog en Supabase, imágenes reales de productos, chatbot.

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

### 4. Insertar los 3 blog posts iniciales en Supabase ⚡ NUEVO

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

### Lo que está implementado (Fase 3.1 + Sesión 4 ✅)

| Feature | Estado | Archivos clave |
|---|---|---|
| Logo grande en quiz (paso inicial) | ✅ | `src/App.tsx` — usa `public/logo-quiz.svg` |
| Logo footer | ✅ | `src/App.tsx` — usa `public/logo-footer.svg` |
| Favicon personalizado | ✅ | `index.html` → `/favicon.svg` — `public/favicon.svg` |
| Sección newsletter en la web | ✅ | `src/App.tsx` — `NewsletterSection` component |
| Quiz conectado al backend | ✅ | `src/App.tsx` → `POST /api/quiz/submit` |
| Tabla quiz_responses en Supabase | ✅ migración lista, ❌ **no pusheada aún** | `supabase/migrations/004_create_quiz_responses.sql` |
| PDF con branding oficial (5 páginas) | ✅ | `server/services/pdf.tsx` (colores `#3D6044`, `#A75754`, `#F7F5F0`) |
| Rutina personalizada con Gemini | ✅ | `server/services/recommendations.ts` |
| Email con PDF adjunto vía Resend | ✅ | `server/services/email-quiz.ts` |
| Route `POST /api/quiz/submit` | ✅ | `server/routes/quiz.ts` |
| Skill `amapola-newsletter` | ✅ | `.claude/skills/amapola-newsletter/SKILL.md` |
| 3 blog posts iniciales (seed.sql) | ✅ listo, ❌ **no insertado en DB aún** | `supabase/seed.sql` — ver paso 4 |
| Blog navegable (home → detalle) | ✅ | Cards de home ahora abren el post directamente |
| Categorías de productos | ✅ | limpieza / hidratación-nutrición / tratamiento / crecimiento |
| Productos reales (6 productos) | ✅ | `src/constants.ts` — extraídos del PDF de fichas de producto |
| Página de detalle de producto | ✅ | `src/App.tsx` — `ProductDetailPage` component, routing via `activePage` |
| Tarjetas de producto con descripción | ✅ | `src/App.tsx` — `ProductCard` muestra snippet + "Ver detalle →" |
| Animación flores hero (Lucide icons) | ✅ | `src/App.tsx` — `Flower`/`Flower2` en color `#b35151` con rotación |
| Logo navbar | ✅ | Reemplazado por SVG — `public/logo-navbar.svg` |
| Cambios visuales homepage | ✅ | Logo navbar, hero image, historia, reels, iconos quiz |
| Carrito: formulario checkout | ✅ | `src/App.tsx` — `CartPage` con nombre, teléfono, email |
| Carrito: opciones de entrega | ✅ | Envío a domicilio (solo BCN, +5€) · Recogida en domicilio (gratis) |
| Carrito: opciones de pago | ✅ | Bizum obligatorio en envío · Bizum o en mano en recogida |
| Carrito: pedido detallado por WhatsApp | ✅ | Mensaje incluye productos, datos, entrega, pago y total |

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

### Fase 3.6 — E-commerce Stripe (pospuesta)

**Estado actual (sesión 3):** el carrito gestiona pedidos vía WhatsApp con Bizum manual o pago en mano. Funciona para el volumen actual sin pasarela online.

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

### Notas del desarrollador
- Necesito mejorar todas las imagenes y quitarle la marca de agua de gemini
- Cambiar el logotipo del navbar y mejorar el del footer
- Terminar la implementacion del quiz haciendo las acciones que pide claude.
- Crear una skill para que genere los PDF con el branding de la marca y siempre de una misma forma
- Ajustar skill o prompt para que gemini genere siempre imagenes que tengan un patron de acorde al branding. Generar imagenes y que aparezcan productos de amapola.
- Cambiar lo del chekout del carrito, eliminar pagar por stripe o bizum de momento, y generar un boton que envie el pedido por whatsapp. Aclarar que no se hacen envios fuera de Barcelona de momento.
-  Terminar el chatbot con informacion de los productos y de la marca y de la fundadora. Crear base de conocimiento.
- Pedir a kleo todos los testimonios que tiene con sus nombres y si les puede pedir sus fotos de perfil, sino pondremos ficticias pero que no parezcan irreales
- Insertar todos los productos, con sus descripciones y en la categoria correspondiente
- Pedir a kleo de crear el meta developer para que se reproduzcan los reels en su web en automatico en esa seccion de red social
- Probar newsletter, blog y quiz si se generan correctamente
- Analizar mediante una skill UI/UX de la web y mediante otra skill posibles baches de seguridad.
- Armar una guia para el propio sistema de adaptacion de logos, y ver si funciona. Si funciona bien adaptarlo a una skill. Ver tambien en que tamaño se debe crear cada logo original. 
- ver formulario de compra, quitar algunos campos innecesarios y agregar algunos, como piso y puerta. y ver que el mensaje que se envia sea mejorado y que salga el producto cuando este la info en la base de datos de productos.
- ver logo no se ve bien en mobile 