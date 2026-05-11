# E-commerce — Reglas de Dominio

IMPORTANT: El flujo de checkout y la gestión de órdenes son áreas críticas. Cualquier cambio en `server/services/` relacionado con órdenes o pagos requiere confirmación explícita antes de ejecutar.

## Entidades Principales

**leads**: capturados desde el quiz. Campos: `id`, `name`, `email`, `created_at`, `source` (ej: `quiz`).
- Un email = un lead. Si ya existe, actualizar `updated_at` y la respuesta del quiz, no duplicar.

**quiz_responses**: respuestas del quiz capilar vinculadas a un lead.
- Campos: tipo de cabello, porosidad, condición del cuero cabelludo, preocupación principal, frecuencia de lavado, tratamientos químicos, presupuesto, objetivos.
- Esta data alimenta la lógica de recomendación de rutina y productos.

**products**: catálogo. `price` siempre en **centavos** (integer). Nunca float para dinero.
- `is_active: false` oculta sin borrar. `slug` inmutable una vez publicado.
- Los 6 productos actuales en `constants.ts` son **ficticios/placeholder** — se migrarán a Supabase cuando el cliente provea datos reales.

**orders** / **order_items**: inmutables post-creación.
- `order_items` guarda snapshot: `product_name`, `unit_price`, `quantity` al momento de compra. No referenciar precio actual.
- Estados: `pending → confirmed → processing → shipped → delivered` | `cancelled` | `refunded`
- Las transiciones de estado solo via `server/services/orders.ts`. Nunca actualizar `status` directamente desde una route sin pasar por el servicio.
- Toda transición de `pending → confirmed` requiere pago confirmado via webhook de Stripe.

## PDF Dinámico de Rutina

El PDF se genera server-side en `server/services/pdf.ts` usando `@react-pdf/renderer`.

**Lógica de recomendación** (en `server/services/recommendations.ts`):
- Input: `QuizAnswers` (tipo de cabello + porosidad + preocupación principal)
- Output: rutina de 3-5 pasos con productos de Amapola recomendados
- Los productos recomendados son los de Amapola — no recomendar productos de otras marcas
- Incluir: frecuencia sugerida, orden de aplicación, tips específicos para el tipo de cabello

**Contenido del PDF**:
- Branding Amapola (colores: #B35151, #3A5F47, #C2845E)
- Nombre de la clienta personalizado
- Sección "Tu diagnóstico capilar" con resumen de respuestas
- Sección "Tu rutina recomendada" con productos y pasos
- CTA a la tienda con URL de `APP_URL`
- Footer con redes sociales

## Carrito

- Persistir en `localStorage` para usuarios anónimos en esta fase.
- Al hacer checkout: validar stock contra Supabase antes de crear la orden.
- Si hay discrepancia de stock: notificar al usuario, actualizar el carrito.

## Checkout y Pagos (Stripe — España)

- Usar **Stripe Payment Element** para soportar tarjeta + Bizum en un solo componente.
- PSD2/SCA (Strong Customer Authentication) es obligatorio en España — Stripe lo maneja automáticamente con Payment Intents.
- Flujo: crear `PaymentIntent` en servidor → confirmar en cliente → webhook confirma pago → crear orden.
- **NUNCA** crear la orden antes de recibir el webhook `payment_intent.succeeded`.
- Siempre validar la firma del webhook Stripe en `server/routes/webhooks/stripe.ts`.

## Supabase RLS — Base

- `products`: SELECT público (anon puede leer productos activos). Write solo service_role.
- `leads` / `quiz_responses`: INSERT via service_role (desde el servidor Express). Nunca desde el cliente browser.
- `orders` / `order_items`: INSERT y UPDATE solo service_role. SELECT del usuario autenticado solo sus órdenes.
- RLS habilitado en todas las tablas. Sin excepción.
