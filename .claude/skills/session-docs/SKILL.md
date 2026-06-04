---
name: session-docs
description: Documenta sesiones de trabajo del proyecto Amapola y sube la documentación a Notion. Genera documentación detallada en lenguaje no técnico (para personas sin conocimientos de programación), explicando qué se construyó, por qué, cómo funciona y su impacto en el negocio. La documentación está pensada para crear contenido en YouTube, reels y redes sociales. Usar SIEMPRE al final de cualquier sesión de trabajo, cuando el usuario pida "documenta la sesión", "documenta lo que hicimos", "actualiza la documentación", "genera el reporte", "sube a Notion", o cuando se quiera registrar el progreso del proyecto. También usar para documentar sesiones pasadas retroactivamente.
---

## Qué hace esta skill

Genera documentación clara y detallada de lo que se construyó en la sesión de trabajo, luego la sube automáticamente como una nueva página en Notion dentro del espacio del proyecto Amapola.

La documentación está escrita para personas sin conocimientos técnicos — perfecta para:
- Videos de YouTube mostrando el proceso de construcción
- Reels y stories de Instagram/TikTok
- Explicar el progreso a la fundadora o clientes
- Tener un registro histórico del proyecto

---

## Paso a paso

### 1. Recopilar contexto de la sesión

Reunir todo lo que se hizo. Fuentes principales:

**Sesión actual (recién terminada):**
- Revisar el historial de la conversación: ¿qué se pidió? ¿qué se construyó? ¿qué decisiones se tomaron?
- `git log --oneline -10` — ver commits recientes
- `git diff HEAD~[N]..HEAD --name-only` — ver archivos modificados

**Documentación retroactiva (sesiones pasadas):**
- `git log --format="%H %s %ad" --date=short` — historia completa
- Agrupar commits por fecha para reconstruir sesiones lógicas
- Leer `.claude/PROXIMOS_PASOS.md` para contexto del estado actual

### 2. Escribir la documentación

Usar el template de la sección "Template de documentación" de abajo.

Reglas de tono:
- **Sin jerga técnica**: si hay que mencionar algo técnico, explicarlo en paréntesis con una analogía
- **Orientado al negocio**: siempre conectar lo técnico con el valor para Amapola
- **Narrativo**: contar la historia de qué problema se resolvió y cómo
- **Específico**: mencionar herramientas con breves explicaciones de qué son

Guardar el resultado en un archivo temporal: `/tmp/session-docs-[fecha].md`

### 3. Subir a Notion

Con el archivo generado, correr:

```bash
node "/Users/jcizaurralde/Documents/Nova proyectos/Amapola/.claude/skills/session-docs/scripts/push-to-notion.js" \
  --file "/tmp/session-docs-[fecha].md"
```

El script lee `NOTION_API_KEY` y `NOTION_AMAPOLA_PAGE_ID` del archivo `.env` del proyecto. Si no están configuradas, ver la sección "Configuración inicial" al final de esta skill.

---

## Template de documentación

Usar este template como base para cada sesión. Adaptar las secciones según lo que se hizo — no todas las sesiones tendrán los mismos tipos de contenido.

```markdown
# [Emoji] Sesión [N] — [Título descriptivo y atractivo]

**Fecha:** [DD de mes de YYYY]
**Duración estimada:** [X horas]
**Estado del proyecto:** [🔧 En construcción · 🚀 MVP listo · ✅ Lanzado]

---

## ¿Qué logramos hoy?

[2-3 oraciones resumiendo el logro principal en lenguaje simple. Qué cambió, qué mejoró, qué se sumó. Sin tecnicismos. Enfocado en el impacto para el negocio de Kleo.]

---

## Lo que construimos

### [Emoji] [Nombre amigable del feature 1]

**¿Qué es?**
[1-2 oraciones explicando qué es esto para alguien que nunca programó. Ejemplo: "Es la pantalla donde las clientas responden preguntas sobre su tipo de cabello."]

**¿Por qué lo necesitamos?**
[Contexto de negocio: qué problema resuelve. Ejemplo: "Sin esto, Kleo tendría que responder manualmente cada consulta de WhatsApp sobre rutinas capilares."]

**¿Cómo funciona?** (paso a paso simple)
1. [Paso 1 — acción del usuario o del sistema]
2. [Paso 2]
3. [Resultado final]

**¿Cómo se ve?**
[Descripción de la interfaz o resultado: "Aparece como un formulario de 6 pasos con el logo de Amapola, fondo crema y botones en verde oliva."]

---

### [Emoji] [Nombre amigable del feature 2]

[Misma estructura]

---

## Tecnologías que usamos hoy

| Herramienta | ¿Qué es? | ¿Para qué la usamos? |
|---|---|---|
| [Nombre] | [Explicación en 1 línea, como si nunca la hubieran escuchado] | [Uso específico en este proyecto] |

---

## Decisiones que tomamos

[Lista con bullet points de decisiones importantes del día. Para cada una: qué se decidió y por qué. Sin tecnicismos.]

- **[Decisión]:** [Por qué se eligió esta opción y no otra. Siempre en términos de beneficio para el negocio.]

---

## Estado del proyecto hoy

**✅ Lo que ya funciona:**
- [Feature 1]
- [Feature 2]

**🔜 Lo que sigue:**
- [Próximo paso 1]
- [Próximo paso 2]

---

## Ideas para contenido 🎥

**Para el video de YouTube / reel:**
Puntos clave a mostrar:
1. [El momento más visual o impactante]
2. [El antes/después más llamativo]
3. [El feature más útil para el negocio]

**Hook sugerido para el video:**
> "[Frase gancho de apertura — provocativa, curiosa o que genere expectativa]"

**Caption para Instagram/TikTok:**
> "[Caption de máx. 150 caracteres con el tono cálido y emprendedor de Amapola. Incluir 2-3 hashtags relevantes.]"
```

---

## Configuración inicial de Notion (primera vez)

### Paso 1 — Crear la integración

1. Ir a **https://www.notion.so/my-integrations**
2. Clic en **"+ New integration"**
3. Nombre: `Amapola Claude Docs`
4. Seleccionar el workspace correcto
5. En "Capabilities": marcar ✅ Read content, ✅ Update content, ✅ Insert content
6. Guardar y copiar el **"Internal Integration Token"** (empieza con `secret_`)

### Paso 2 — Crear la página en Notion

1. En Notion, crear una página nueva
2. Título: `🌸 Amapola — Documentación del Proyecto`
3. Conectar la integración: abrir la página → menú `···` (arriba a la derecha) → **"Add connections"** → buscar `Amapola Claude Docs` → conectar
4. Copiar el **ID de la página** desde la URL:
   - URL: `https://notion.so/MiWorkspace/Amapola-Documentacion-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - El ID son los últimos 32 caracteres (sin guiones): `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Paso 3 — Agregar las variables al proyecto

Agregar al `.env` del proyecto:
```
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxx
NOTION_AMAPOLA_PAGE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Una vez configurado, correr el script para verificar que la conexión funciona:
```bash
node .claude/skills/session-docs/scripts/push-to-notion.js --test
```

---

## Sobre el audience

La documentación está escrita para tres audiencias simultáneamente:

1. **Kleo** (la fundadora): entiende su negocio perfectamente pero no el código — necesita saber qué tiene, para qué sirve y cuándo estará lista la siguiente pieza
2. **Emprendedores en redes**: siguen el proceso de construir un negocio digital — quieren inspirarse, aprender y ver el progreso
3. **Audiencia de YouTube**: más curiosa y técnica — quiere entender el proceso de construcción sin necesitar ser desarrolladora

La clave: si una amiga brillante que nunca programó pero sí tiene un negocio propio no lo entendería, reescribir.
