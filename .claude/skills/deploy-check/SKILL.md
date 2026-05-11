---
name: deploy-check
description: Pre-deployment validation for Amapola. Runs TypeScript check, production build, verifies env vars, checks Supabase migration status, and scans for security issues. Run before any production deploy.
---

Ejecutar checklist de pre-deploy para Amapola: $ARGUMENTS

## Paso 1 — TypeScript

```bash
npm run lint
```
Si falla: DETENER. Mostrar errores completos. No continuar hasta resolver.

## Paso 2 — Build de producción

```bash
npm run build
```
Si falla: DETENER. Mostrar errores completos.

## Paso 3 — Variables de entorno documentadas

Verificar que estas variables están en `.env.example` (sin valores reales):

Frontend (prefijo VITE_):
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_STRIPE_PUBLISHABLE_KEY`
- `GEMINI_API_KEY`

Server-only (sin prefijo VITE_):
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `APP_URL`

Si alguna falta: advertir. No bloquear el deploy.

## Paso 4 — Migraciones Supabase

```bash
npx supabase migration list
```
Si hay migraciones locales no aplicadas en producción: ADVERTIR con la lista. No bloquear pero documentar.

## Paso 5 — Tipos generados actualizados

Verificar que `src/types/database.ts` fue regenerado después de la última migración. Si hay dudas:
```bash
npx supabase gen types typescript --local > src/types/database.ts
```
Luego correr `npm run lint` de nuevo.

## Paso 6 — Seguridad rápida

```bash
# service_role key no debe aparecer en src/ (solo en server/)
grep -rn "SERVICE_ROLE" src/

# console.log con datos de usuario en services
grep -rn "console.log" server/services/

# Secrets hardcodeados
grep -rn "sk_live\|sk_test\|rk_live" src/ server/
```

Cualquier resultado de `SERVICE_ROLE` en `src/` es **bloqueante**.
Resultados de `console.log` en services: advertir (aceptable solo para logging de errores estructurado).
Secrets hardcodeados: **bloqueante**.

## Reporte Final

```
DEPLOY CHECK — Amapola Haircare
================================
[ ] TypeScript:           PASS / FAIL
[ ] Build producción:     PASS / FAIL
[ ] Env vars doc.:        OK / WARNINGS
[ ] Migraciones sync:     OK / PENDIENTES
[ ] Tipos generados:      OK / DESACTUALIZADO
[ ] Seguridad:            CLEAN / ISSUES

Estado: LISTO PARA DEPLOY / BLOQUEADO
```

Si hay FAIL o BLOQUEADO: no continuar con el deploy hasta resolver.
