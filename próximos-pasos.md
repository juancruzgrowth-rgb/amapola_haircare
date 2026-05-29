# Amapola Haircare — Próximos Pasos

> Última actualización: 2026-05-29
> Estado: Fase 1 casi lista — backend del quiz está implementado, falta conectar con Supabase real.

---

## Estado Actual

| Área | Estado |
|------|--------|
| Quiz (frontend) | ✅ Implementado en App.tsx |
| Backend Express (quiz → PDF → email) | ✅ Implementado |
| Generación de PDF con branding | ✅ Implementado |
| Email con Resend | ✅ Implementado |
| Recomendaciones con Gemini | ✅ Implementado |
| **Supabase — crear proyecto y conectar** | ⬜ PENDIENTE |
| **Variables de entorno configuradas** | ⬜ PENDIENTE |
| **Resend — cuenta y dominio** | ⬜ PENDIENTE |
| **Gemini API key** | ⬜ PENDIENTE |
| E-commerce (Stripe + órdenes) | ⬜ Fase 2 |

---

## PASO 1 — Crear el proyecto en Supabase

> Duración estimada: 10 minutos. No necesitas saber programar.

### 1.1 Crear cuenta y proyecto

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta gratuita (con GitHub o email).
2. Haz clic en **"New project"**.
3. Elige una organización (o crea una nueva: "Amapola").
4. Rellena:
   - **Name**: `amapola-haircare`
   - **Database Password**: elige una contraseña segura y **guárdala** (la necesitarás).
   - **Region**: `West EU (Ireland)` — es el más cercano a España.
5. Haz clic en **"Create new project"**. Tarda ~2 minutos en crearse.

### 1.2 Obtener las credenciales

Una vez creado el proyecto:

1. En el panel izquierdo, ve a **Settings → API**.
2. Copia estos tres valores y pégalos en tu `.env`:

| Variable | Dónde encontrarla |
|----------|-------------------|
| `VITE_SUPABASE_URL` | "Project URL" (ej: `https://xxxx.supabase.co`) |
| `SUPABASE_URL` | El mismo valor que el anterior |
| `VITE_SUPABASE_ANON_KEY` | "anon public" bajo "Project API keys" |
| `SUPABASE_SERVICE_ROLE_KEY` | "service_role" bajo "Project API keys" — **nunca exponerla al frontend** |

---

## PASO 2 — Crear el archivo .env

1. En la carpeta raíz del proyecto (donde está el `package.json`), copia el archivo `.env.example`:
   ```bash
   cp .env.example .env
   ```
2. Abre `.env` y pega los valores de Supabase que copiaste en el paso anterior.
3. El archivo `.env` debe quedar así (con tus valores reales):
   ```
   VITE_SUPABASE_URL="https://tuproyecto.supabase.co"
   VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI..."
   SUPABASE_URL="https://tuproyecto.supabase.co"
   SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI..."
   ```

---

## PASO 3 — Crear las tablas en Supabase (ejecutar migraciones)

Tienes 4 archivos de migración en `supabase/migrations/`. Hay que ejecutarlos en orden.

### Opción A — Desde el panel web de Supabase (más fácil, recomendado)

1. En Supabase, ve a **SQL Editor** (icono de base de datos en el panel izquierdo).
2. Haz clic en **"New query"**.
3. Copia el contenido del archivo `supabase/migrations/001_create_leads.sql` y pégalo en el editor.
4. Haz clic en **"Run"** (botón verde).
5. Repite para `002_create_blog_posts.sql`, `003_create_newsletter_subscribers.sql`, `004_create_quiz_responses.sql` **en ese orden**.

### Opción B — Via terminal con Supabase CLI (requiere Docker instalado)

```bash
# Instalar Supabase CLI
npm install -g supabase

# Desde la carpeta del proyecto
npx supabase login
npx supabase link --project-ref TU_PROJECT_REF  # El ID del proyecto, está en Settings → General
npx supabase db push
```

> El `PROJECT_REF` es la parte de la URL antes de `.supabase.co`, ej: `abcdefghijklmnop`.

### Verificar que las tablas se crearon

En Supabase ve a **Table Editor** (panel izquierdo). Deberías ver estas tablas:
- `leads`
- `blog_posts`
- `newsletter_subscribers`
- `quiz_responses`

Si las ves, el paso 3 está completo ✅

---

## PASO 4 — Configurar Resend (email)

> El backend ya está programado para enviar el PDF por email. Solo necesitas la API key.

1. Ve a [resend.com](https://resend.com) y crea una cuenta gratuita (3,000 emails/mes gratis).
2. En el panel, ve a **API Keys → Create API Key**.
3. Dale un nombre: `amapola-prod` y copia la key.
4. En tu `.env`, pega:
   ```
   RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxx"
   RESEND_FROM_EMAIL="quiz@tudominio.com"
   ```
5. **IMPORTANTE**: Para enviar emails desde tu propio dominio (`@amapola.com`), necesitas verificarlo en Resend → Domains. Si no tienes dominio aún, puedes usar `onboarding@resend.dev` solo para pruebas.

---

## PASO 5 — Configurar Gemini API (IA para recomendaciones)

> El PDF usa Gemini para generar recomendaciones personalizadas según las respuestas del quiz.

1. Ve a [aistudio.google.com](https://aistudio.google.com) e inicia sesión con tu cuenta de Google.
2. Haz clic en **"Get API key"** → **"Create API key"**.
3. Copia la key y pégala en tu `.env`:
   ```
   GEMINI_API_KEY="AIzaSyxxxxxxxxxxxxxxxxxx"
   ```

---

## PASO 6 — Probar el flujo completo

Una vez configuradas las variables de entorno:

```bash
# Terminal 1 — Frontend
npm run dev

# Terminal 2 — Backend Express
npm run server:dev
```

Luego ve a `http://localhost:3000`, completa el quiz y verifica:
1. ¿Llega un email con el PDF adjunto?
2. En Supabase → Table Editor → `leads`: ¿aparece el registro con tu email?
3. En Supabase → Table Editor → `quiz_responses`: ¿aparece la respuesta del quiz?
4. En Supabase → Storage → `quiz-pdfs`: ¿aparece el PDF generado?

Si todo eso funciona, **la Fase 1 está completa**.

---

## PASO 7 — Deploy a producción (Vercel)

Una vez validado en local:

1. Ejecutar `/deploy-check` para validar que todo está listo.
2. En [vercel.com](https://vercel.com), crear el proyecto e importar el repositorio de GitHub.
3. En Vercel → Settings → Environment Variables: añadir todas las variables del `.env`.
4. Hacer deploy.

---

## FASE 2 — E-commerce (cuando Fase 1 esté estable)

Cuando el quiz esté funcionando en producción, los próximos pasos son:

- [ ] Crear tablas `products`, `orders`, `order_items` en Supabase
- [ ] Instalar Stripe (`npm install stripe @stripe/stripe-js`)
- [ ] Implementar checkout con Stripe Payment Element (tarjeta + Bizum)
- [ ] Webhook de Stripe para confirmar pagos
- [ ] Página de confirmación de orden

---

## Preguntas Frecuentes

**¿Necesito instalar Docker para esto?**
No, si usas la Opción A (panel web de Supabase) para las migraciones. Docker solo es necesario si quieres correr Supabase en local.

**¿Qué pasa si me equivoco ejecutando una migración?**
Puedes ir a Supabase → SQL Editor y ejecutar `DROP TABLE nombre_tabla CASCADE;` para borrarla y empezar de nuevo. Esto solo borra datos, no el proyecto.

**¿Cuánto cuesta Supabase?**
El plan gratuito incluye 500MB de base de datos, 1GB de storage y 50,000 usuarios activos al mes — suficiente para lanzar.
