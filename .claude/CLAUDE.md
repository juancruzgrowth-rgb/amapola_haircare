# Amapola Haircare — Constitución del Proyecto

## North Star
E-commerce de productos para el cuidado del cabello (emprendimiento unipersonal, Barcelona, España). El sistema captura leads via quiz capilar, genera un PDF de rutina personalizada, lo envía por email automáticamente, y permite comprar productos online con pagos en España.

## Tipo
E-commerce Web + Automatizaciones — proyecto de cliente (agencia)

## Stack
- **Frontend**: React 19 + Vite 6 + TypeScript
- **Styling**: Tailwind CSS + Framer Motion + shadcn-style components custom
- **Backend**: Express (API routes server-side)
- **Base de datos**: Supabase (PostgreSQL) — reemplaza better-sqlite3
- **AI**: Gemini API (@google/generative-ai)
- **Pagos**: Stripe (soporta tarjeta + Bizum, maneja PSD2/SCA automático — correcto para España)
- **Email**: Resend (transaccional + PDF adjunto)
- **Deploy**: Vercel

## Comandos Clave
```bash
npm run dev          # Vite dev server en puerto 3000
npm run build        # Build de producción
npm run lint         # TypeScript type checking — correr después de cada serie de cambios
npm run preview      # Preview del build local
npm run clean        # Eliminar dist/

# Supabase local (requiere Docker)
npx supabase start   # Levantar Supabase local
npx supabase stop    # Detener
npx supabase db push # Aplicar migraciones pendientes
npx supabase migration list  # Ver estado
npx supabase gen types typescript --local > src/types/database.ts  # Regenerar tipos
```

## Estructura de Carpetas

```
src/
├── components/
│   ├── ui/              # Componentes base ya construidos (ShinyButton, DisplayCards, etc.)
│   ├── quiz/            # Componentes del quiz capilar (ya implementado en App.tsx — extraer)
│   ├── store/           # Componentes de la tienda (ProductCard, CartDrawer, etc.)
│   └── shared/          # Componentes reutilizables
├── lib/
│   ├── supabase.ts      # Cliente Supabase singleton (browser)
│   ├── stripe.ts        # Stripe client (frontend)
│   ├── gemini.ts        # Gemini client
│   └── utils.ts         # cn() y helpers — ya existe
├── services/            # Lógica de negocio — toda query a DB va aquí
│   ├── leads.ts
│   ├── products.ts
│   ├── orders.ts
│   └── quiz.ts
├── types/
│   ├── database.ts      # Tipos generados por Supabase (supabase gen types)
│   └── index.ts         # Tipos del dominio
├── constants.ts         # Constantes del negocio — productos placeholder por ahora
├── App.tsx              # Router principal (grande — refactorizar por fases)
└── main.tsx

server/                  # Express backend
├── index.ts             # Entry point
├── routes/
│   ├── quiz.ts          # POST /api/quiz/submit
│   ├── products.ts      # GET /api/products
│   ├── orders.ts        # POST /api/orders, GET /api/orders/:id
│   └── webhooks/
│       └── stripe.ts    # POST /api/webhooks/stripe
├── services/            # Lógica server-side
│   ├── pdf.ts           # Generación de PDF dinámico con @react-pdf/renderer
│   ├── email.ts         # Envío via Resend
│   └── recommendations.ts  # Lógica de rutina según quiz
└── lib/
    ├── supabase-admin.ts  # Cliente Supabase con service_role (SOLO server)
    └── stripe.ts          # Stripe SDK server-side

supabase/
├── migrations/          # Migraciones SQL — versionadas en git
└── seed.sql             # Datos de prueba [TEST] — productos placeholder ficticios
```

## Patrones Clave

**API routes**: Express en `server/routes/`. Validar input siempre (zod). Status codes correctos.

**Queries a DB**: siempre via `services/` — nunca llamar al cliente Supabase desde componentes directamente.

**Supabase clients — dos instancias distintas**:
- `src/lib/supabase.ts` → cliente browser (anon key, para el frontend)
- `server/lib/supabase-admin.ts` → service_role key, SOLO en Express. NUNCA importar en frontend.

**Tipos**: regenerar `src/types/database.ts` tras cada migración.

**Precios**: siempre en centavos (integer). Conversión a euros solo en la capa de presentación.

**Productos actuales**: son placeholders ficticios. No invertir tiempo en imágenes/contenido hasta que el cliente los provea.

## Variables de Entorno
Ver `.env.example` para la lista completa. Las que tienen prefijo `VITE_` son accesibles en el frontend. Las sin prefijo son exclusivamente server-side.

## Roadmap de Fases
- **FASE 1** (actual): Backend Express + Supabase + Lead Capture (quiz → PDF → email)
- **FASE 2**: E-commerce completo (Stripe + checkout + gestión de órdenes)
- **FASE 3**: Automatizaciones (WhatsApp bot, Instagram DMs, email marketing, contenido, logística)

## Agentes Disponibles
- `dev` — features del frontend React/Vite
- `backend` — Express routes, Supabase schema, services

## Skills Disponibles
- `/deploy-check` — validaciones pre-deploy
