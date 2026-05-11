# Integraciones Externas — Convenciones

## Supabase

**Dos clientes — NO intercambiarlos jamás**:
- `src/lib/supabase.ts` → `createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)` — browser, anon key, para el frontend React
- `server/lib/supabase-admin.ts` → `createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)` — server Express ÚNICAMENTE. Si este archivo se importa en cualquier archivo de `src/`, es un bug de seguridad grave.

**Patrón de uso en Express routes**:
```typescript
import { supabaseAdmin } from '../lib/supabase-admin'
const { data, error } = await supabaseAdmin.from('leads').insert({...})
if (error) throw new Error(`DB error: ${error.message}`)
```

**Tipos**: regenerar tras cada migración:
```bash
npx supabase gen types typescript --local > src/types/database.ts
```

**Migraciones**: en `supabase/migrations/` vía `npx supabase migration new [nombre]`. Nombres descriptivos: `create_leads_table`, `add_rls_products`. Nunca modificar una migración ya aplicada — crear una nueva.

## Stripe (pagos España)

- **Por qué Stripe**: único gateway que soporta Bizum nativo en España + maneja PSD2/SCA automáticamente. Comisión: 2.9% + €0.30.
- Frontend: `src/lib/stripe.ts` inicializa con `VITE_STRIPE_PUBLISHABLE_KEY`. Solo para UI (Payment Element).
- Backend: `server/lib/stripe.ts` con `STRIPE_SECRET_KEY`. Toda operación real (crear PaymentIntent, refunds) desde aquí.
- **Webhook**: `POST /api/webhooks/stripe` — siempre validar firma con `stripe.webhooks.constructEvent(payload, sig, STRIPE_WEBHOOK_SECRET)`. Rechazar si la firma no es válida.
- Nunca confiar en el payload del cliente para confirmar un pago — solo el webhook es la fuente de verdad.

## Resend (email transaccional)

- Cliente en `server/lib/resend.ts` usando `RESEND_API_KEY`.
- Templates en `server/services/email/templates/` como funciones que retornan HTML string.
- Emails a enviar: (1) bienvenida + PDF post-quiz, (2) confirmación de orden, (3) actualización de estado de envío.
- Adjuntar el PDF como `Buffer` — Resend soporta `attachments: [{ filename, content }]`.
- Nunca loggear el HTML del email si contiene datos del usuario.
- Plan gratuito: 3,000 emails/mes — suficiente para early stage.

## Gemini API

- Cliente en `src/lib/gemini.ts` usando `GEMINI_API_KEY` (ya configurado en el repo).
- Usar para: generar contenido de recomendaciones personalizado en el PDF, respuestas del bot (Fase 3).
- Los prompts deben incluir contexto de la marca Amapola: tono cálido, profesional, orientado al bienestar del cabello.
- Respuestas siempre en español (especificar en el prompt).
- No usar Gemini para lógica de negocio — solo para generación de texto.

## Twilio / WhatsApp (Fase 3)

- Cliente singleton en `server/lib/twilio.ts`.
- Todas las funciones de envío en `server/services/notifications.ts`.
- Fallos de envío NO bloquean el flujo principal (try/catch, loggear, continuar).
- Webhooks de Twilio: validar firma con `twilio.validateRequest()` antes de procesar.
- Formato del número: `whatsapp:+34XXXXXXXXX`.
