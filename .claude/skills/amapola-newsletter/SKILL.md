---
name: amapola-newsletter
description: Genera newsletters HTML para Amapola Haircare aplicando la guía de branding oficial (paleta oliva/terracota/crema, tipografía Cormorant Garamond + Inter, tono cálido y natural). Úsala cuando el usuario pida "generar newsletter", "crear email para suscriptores", "diseñar email Amapola" o cuando convierta un blog post en formato email.
---

# Amapola Newsletter — Skill

Esta skill produce un newsletter HTML completo, listo para enviar vía Resend, alineado con la guía de branding de Amapola.

## Identidad de marca (no negociable)

**Paleta cromática oficial** (proporción 60% neutros · 30% oliva · 10% terracota):

| Rol | Hex | Uso |
| --- | --- | --- |
| Oliva principal | `#3D6044` | Títulos, header, links, detalles clave |
| Terracota acento | `#A75754` | CTAs, badges, resaltados |
| Crema suave | `#F7F5F0` | Fondo principal del body |
| Arena cálida | `#D9D2C8` | Separadores, fondos secundarios |
| Verde salvia | `#BFC3AE` | Acentos sutiles, hover states |
| Texto | `#2B2B2B` | Cuerpo del mensaje |
| Texto suave | `#5A5A5A` | Captions, footer |

**Tipografías** (en email usar fallbacks web-safe — los emails no respetan @font-face fiable):
- Display: `Georgia, 'Times New Roman', serif` (proxy de Cormorant Garamond)
- Texto: `Helvetica, Arial, sans-serif` (proxy de Inter)

**ADN de marca:** Natural · Elegante · Delicada · Premium. Líneas finas y orgánicas. Espacios en blanco generosos.

## Reglas de copy

1. **Idioma**: español neutro (no usar voseo argentino ni vosotros español muy marcado).
2. **Tono**: cálido pero profesional. Como una experta amiga que sabe del tema.
3. **Persona**: hablar a la lectora en 2ª persona singular ("tu cabello", "para ti").
4. **Párrafos**: cortos, 2-3 frases máximo. Aire visual.
5. **Emojis**: máximo 1 por sección. Preferir 🌿 ✨ 🌸. Nunca en títulos.
6. **No exagerar**: nada de "increíble", "el mejor", "100% efectivo". Evitar superlativos.
7. **Saludo**: si hay `recipient.name`, "Hola, {name}". Si no, solo "Hola".
8. **Despedida**: cálida sin ser melosa. "Con cariño, el equipo de Amapola" o "Hasta pronto 🌿".

## Estructura obligatoria del email

Todo newsletter debe tener estas secciones en este orden:

1. **Header** — fondo oliva, marca "AMAPOLA" en serif espaciado.
2. **Hero image** (opcional pero recomendado) — imagen lifestyle con luz suave.
3. **Eyebrow** — categoría/tema en minúsculas espaciadas, color terracota.
4. **Título** — Georgia 26-30px, color oliva, máximo 2 líneas.
5. **Cuerpo** — saludo + 2-3 párrafos breves del contenido.
6. **CTA primario** — botón terracota con texto en mayúsculas espaciadas. Siempre 1 acción clara (leer artículo / ver producto / hacer quiz).
7. **Product card** (obligatoria si aplica) — 1 producto Amapola recomendado: imagen 100x100, nombre, precio, copy de 2-3 frases, link "Ver producto".
8. **CTA secundario** (opcional) — link al blog o quiz.
9. **Footer** — copyright + redes (@amapolahaircare) + link de unsubscribe.

## Reglas técnicas (HTML email)

- **Tablas, no flexbox**. Los clientes de email (especialmente Outlook) no soportan flex/grid bien.
- **Estilos inline**, no CSS externo ni `<style>` en `<head>`.
- **Width máximo 600px** para el contenedor principal.
- **Imágenes**: usar `<img width="X" style="display:block">` para evitar gaps en Outlook.
- **Links**: nunca usar JavaScript. Solo `href` directo.
- **Alt text** en todas las imágenes.
- **Variables de entorno** disponibles: `APP_URL`, `RESEND_FROM_EMAIL`.
- **Unsubscribe** obligatorio — usar HMAC del email con `RESEND_API_KEY` (ver patrón en `server/services/newsletter.ts`).

## Catálogo de productos Amapola

Para recomendaciones, usar uno de estos IDs (ya consistente con backend):

| ID | Nombre | Precio | Categoría |
| --- | --- | --- | --- |
| `gotero` | Gotero Capilar | 19,50 € | tratamiento diario |
| `acondicionador` | Acondicionador | 16,50 € | hidratación |
| `tratamiento-profundo` | Tratamiento Profundo | 24,90 € | mascarilla semanal |
| `shampoo-graso` | Champú Pelo Graso | 18,90 € | limpieza |
| `shampoo-seco` | Champú Pelo Seco | 18,90 € | limpieza |
| `exfoliante-capilar` | Exfoliante Capilar | 21,90 € | limpieza profunda |
| `tratamiento-folicular` | Tratamiento Folicular | 22,90 € | anti-caída |

## Plantilla HTML de referencia

Esta es la base. Adaptar el bloque de contenido (`{{TITLE}}`, `{{BODY}}`, `{{PRODUCT_*}}`) según el tema.

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{{TITLE}}</title>
</head>
<body style="margin:0;padding:0;background-color:#F7F5F0;font-family:Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F7F5F0;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" border="0"
          style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">

          <!-- Header -->
          <tr>
            <td style="background-color:#3D6044;padding:32px 40px;text-align:center;">
              <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:28px;color:#F7F5F0;letter-spacing:4px;">
                AMAPOLA
              </p>
              <p style="margin:8px 0 0;font-size:11px;color:#D9D2C8;letter-spacing:2px;text-transform:uppercase;">
                Haircare
              </p>
            </td>
          </tr>

          <!-- Hero image -->
          <tr>
            <td>
              <img src="{{HERO_IMAGE_URL}}" alt="{{HERO_ALT}}" width="600"
                style="display:block;width:100%;max-width:600px;height:auto;" />
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:44px 40px 32px;">
              <p style="margin:0 0 8px;font-size:11px;color:#A75754;text-transform:uppercase;letter-spacing:2px;">
                {{CATEGORY}}
              </p>
              <h1 style="margin:0 0 20px;font-family:Georgia,'Times New Roman',serif;font-size:28px;color:#3D6044;line-height:1.25;font-weight:normal;">
                {{TITLE}}
              </h1>
              <p style="margin:0 0 16px;font-size:15px;color:#2B2B2B;line-height:1.7;">
                {{GREETING}},
              </p>
              <p style="margin:0 0 24px;font-size:15px;color:#2B2B2B;line-height:1.7;">
                {{BODY_PARAGRAPH_1}}
              </p>
              <p style="margin:0 0 28px;font-size:15px;color:#2B2B2B;line-height:1.7;">
                {{BODY_PARAGRAPH_2}}
              </p>

              <!-- CTA primario -->
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background-color:#A75754;border-radius:4px;">
                    <a href="{{CTA_URL}}"
                      style="display:inline-block;padding:14px 32px;font-size:13px;color:#ffffff;text-decoration:none;font-weight:bold;letter-spacing:2px;text-transform:uppercase;">
                      {{CTA_LABEL}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Product recommendation -->
          <tr>
            <td style="padding:0 40px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                style="background-color:#F7F5F0;border-left:3px solid #A75754;padding:20px 24px;">
                <tr>
                  <td width="100" valign="top" style="padding-right:16px;">
                    <img src="{{PRODUCT_IMAGE}}" alt="{{PRODUCT_NAME}}" width="100" height="100"
                      style="border-radius:6px;object-fit:cover;display:block;" />
                  </td>
                  <td valign="top">
                    <p style="margin:0 0 4px;font-family:Georgia,'Times New Roman',serif;font-size:18px;color:#3D6044;">
                      {{PRODUCT_NAME}}
                    </p>
                    <p style="margin:0 0 10px;font-size:13px;color:#A75754;font-weight:bold;">
                      {{PRODUCT_PRICE}}
                    </p>
                    <p style="margin:0 0 12px;font-size:13px;color:#2B2B2B;line-height:1.6;">
                      {{PRODUCT_COPY}}
                    </p>
                    <a href="{{PRODUCT_URL}}"
                      style="display:inline-block;font-size:12px;color:#3D6044;text-decoration:none;border:1px solid #3D6044;padding:6px 14px;border-radius:4px;">
                      Ver producto
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;text-align:center;border-top:1px solid #D9D2C8;">
              <p style="margin:0 0 8px;font-size:11px;color:#5A5A5A;">
                © {{YEAR}} Amapola Haircare · Barcelona, España
              </p>
              <p style="margin:0 0 8px;font-size:11px;color:#5A5A5A;">
                Instagram · TikTok &nbsp;@amapolahaircare
              </p>
              <p style="margin:0;font-size:11px;color:#5A5A5A;">
                <a href="{{UNSUBSCRIBE_URL}}" style="color:#5A5A5A;text-decoration:underline;">
                  Darse de baja
                </a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

## Output format

Cuando se invoque esta skill:

1. Pedir/identificar: tema del newsletter, producto destacado (opcional), audiencia (general/female/male), URL de imagen hero (opcional).
2. Generar:
   - **Subject line**: máximo 60 caracteres, sin emoji al inicio, sin SCREAMING CAPS.
   - **Preheader** (texto invisible que aparece en inbox preview): 40-90 caracteres, complemento del subject.
   - **HTML completo** siguiendo la plantilla.
3. Devolver los 3 elementos claramente separados.

## Anti-patrones (NO hacer)

- ❌ No usar la paleta vieja del frontend (`#B35151`, `#3A5F47`, `#C2845E`) — usar la oficial de la guía.
- ❌ No mezclar serif y sans en el mismo párrafo.
- ❌ No usar más de 1 CTA primario por email.
- ❌ No incluir productos de otras marcas. Solo catálogo Amapola.
- ❌ No prometer resultados garantizados ni hablar de productos como "milagrosos".
- ❌ No usar palabras spam: GRATIS!!!, OFERTA, ÚLTIMA OPORTUNIDAD.
- ❌ No olvidar el unsubscribe — es obligatorio legal en UE.
