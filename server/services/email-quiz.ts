import { Resend } from 'resend'
import { Routine } from './recommendations.js'

const resend = new Resend(process.env.RESEND_API_KEY)

interface QuizEmailRecipient {
  email: string
  name: string
}

const colors = {
  oliva: '#3D6044',
  terracota: '#A75754',
  crema: '#F7F5F0',
  arena: '#D9D2C8',
  textoSuave: '#5A5A5A',
}

function buildQuizEmailHtml(recipient: QuizEmailRecipient, routine: Routine): string {
  const appUrl = process.env.APP_URL ?? 'https://amapola.com'
  const firstStep = routine.steps[0]

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tu rutina capilar Amapola</title>
</head>
<body style="margin:0;padding:0;background-color:${colors.crema};font-family:Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${colors.crema};">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" border="0"
          style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">

          <tr>
            <td style="background-color:${colors.oliva};padding:32px 40px;text-align:center;">
              <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:28px;color:${colors.crema};letter-spacing:4px;font-weight:normal;">
                AMAPOLA
              </p>
              <p style="margin:8px 0 0;font-family:Helvetica,Arial,sans-serif;font-size:11px;color:${colors.arena};letter-spacing:2px;text-transform:uppercase;">
                Haircare
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:44px 40px 32px;">
              <p style="margin:0 0 8px;font-family:Helvetica,Arial,sans-serif;font-size:11px;color:${colors.terracota};text-transform:uppercase;letter-spacing:2px;">
                Tu rutina personalizada
              </p>
              <h1 style="margin:0 0 20px;font-family:Georgia,'Times New Roman',serif;font-size:30px;color:${colors.oliva};line-height:1.25;font-weight:normal;">
                Hola, ${recipient.name}
              </h1>
              <p style="margin:0 0 18px;font-family:Helvetica,Arial,sans-serif;font-size:15px;color:#3a3a3a;line-height:1.7;">
                Gracias por confiar en Amapola. Hemos preparado un PDF con la rutina capilar diseñada especialmente para ti, según las respuestas de tu quiz.
              </p>
              <p style="margin:0 0 28px;font-family:Helvetica,Arial,sans-serif;font-size:15px;color:#3a3a3a;line-height:1.7;">
                Encontrarás adjunto tu plan paso a paso, los productos recomendados y consejos específicos para tu tipo de cabello.
              </p>

              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background-color:${colors.terracota};border-radius:4px;">
                    <a href="${appUrl}"
                      style="display:inline-block;padding:14px 32px;font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#ffffff;text-decoration:none;font-weight:bold;letter-spacing:2px;text-transform:uppercase;">
                      Visitar la tienda
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${firstStep ? `
          <tr>
            <td style="padding:0 40px 32px;">
              <div style="background-color:${colors.crema};border-left:3px solid ${colors.terracota};padding:20px 24px;">
                <p style="margin:0 0 6px;font-family:Helvetica,Arial,sans-serif;font-size:10px;color:${colors.terracota};text-transform:uppercase;letter-spacing:2px;">
                  Paso 1 de tu rutina
                </p>
                <p style="margin:0 0 4px;font-family:Georgia,'Times New Roman',serif;font-size:20px;color:${colors.oliva};">
                  ${firstStep.productName}
                </p>
                <p style="margin:0 0 10px;font-family:Helvetica,Arial,sans-serif;font-size:13px;color:${colors.terracota};font-weight:bold;">
                  ${firstStep.frequency}
                </p>
                <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#3a3a3a;line-height:1.6;">
                  ${firstStep.instructions}
                </p>
              </div>
            </td>
          </tr>` : ''}

          <tr>
            <td style="padding:24px 40px;text-align:center;border-top:1px solid ${colors.arena};">
              <p style="margin:0 0 8px;font-family:Helvetica,Arial,sans-serif;font-size:11px;color:${colors.textoSuave};">
                © ${new Date().getFullYear()} Amapola Haircare · Barcelona, España
              </p>
              <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:11px;color:${colors.textoSuave};">
                Instagram · TikTok &nbsp;@amapolahaircare
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export async function sendQuizRoutineEmail(
  recipient: QuizEmailRecipient,
  pdfBuffer: Buffer,
  routine: Routine,
): Promise<void> {
  const html = buildQuizEmailHtml(recipient, routine)
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: recipient.email,
    subject: `${recipient.name}, tu rutina capilar Amapola está lista`,
    html,
    attachments: [
      {
        filename: 'tu-rutina-amapola.pdf',
        content: pdfBuffer,
      },
    ],
  })

  if (error) {
    console.error(`Failed to send quiz email to ${recipient.email}:`, error)
    throw new Error(`Email send failed: ${error.message}`)
  }
}
