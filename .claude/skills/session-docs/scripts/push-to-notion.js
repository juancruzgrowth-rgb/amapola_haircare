#!/usr/bin/env node

/**
 * push-to-notion.js
 * Uploads a Markdown file as a new child page in the Amapola Notion space.
 *
 * Usage:
 *   node push-to-notion.js --file /path/to/doc.md
 *   node push-to-notion.js --test   (verifies credentials)
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env from the project root (4 levels up from scripts/)
function loadEnv() {
  const envPath = resolve(__dirname, '../../../../.env');
  try {
    const content = readFileSync(envPath, 'utf8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx === -1) continue;
      const key = trimmed.slice(0, idx).trim();
      const value = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // .env not found — rely on system env vars
  }
}

loadEnv();

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_AMAPOLA_PAGE_ID = process.env.NOTION_AMAPOLA_PAGE_ID;

if (!NOTION_API_KEY || !NOTION_AMAPOLA_PAGE_ID) {
  console.error('❌ Faltan variables de entorno:');
  if (!NOTION_API_KEY) console.error('   - NOTION_API_KEY no está configurada en .env');
  if (!NOTION_AMAPOLA_PAGE_ID) console.error('   - NOTION_AMAPOLA_PAGE_ID no está configurada en .env');
  console.error('\nVer la sección "Configuración inicial" en .claude/skills/session-docs/SKILL.md');
  process.exit(1);
}

const NOTION_VERSION = '2022-06-28';

async function notionRequest(method, path, body) {
  const res = await fetch(`https://api.notion.com/v1${path}`, {
    method,
    headers: {
      'Authorization': `Bearer ${NOTION_API_KEY}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Notion API error ${res.status}: ${err.message || JSON.stringify(err)}`);
  }
  return res.json();
}

// Test connectivity
async function testConnection() {
  console.log('🔌 Verificando conexión con Notion...');
  try {
    const page = await notionRequest('GET', `/pages/${NOTION_AMAPOLA_PAGE_ID}`);
    const title = page.properties?.title?.title?.[0]?.plain_text || '(sin título)';
    console.log(`✅ Conectado correctamente.`);
    console.log(`📄 Página madre: "${title}"`);
    console.log(`🆔 Page ID: ${NOTION_AMAPOLA_PAGE_ID}`);
  } catch (err) {
    console.error('❌ Error al conectar:', err.message);
    console.error('\nVerifica:');
    console.error('  1. Que NOTION_API_KEY sea válida (empieza con secret_)');
    console.error('  2. Que NOTION_AMAPOLA_PAGE_ID sea el ID correcto (32 caracteres)');
    console.error('  3. Que la integración tenga acceso a esa página en Notion');
    process.exit(1);
  }
}

// Convert markdown to Notion blocks (simplified but robust)
function markdownToBlocks(markdown) {
  const lines = markdown.split('\n');
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Headings
    if (line.startsWith('# ')) {
      blocks.push(heading(1, line.slice(2)));
      i++; continue;
    }
    if (line.startsWith('## ')) {
      blocks.push(heading(2, line.slice(3)));
      i++; continue;
    }
    if (line.startsWith('### ')) {
      blocks.push(heading(3, line.slice(4)));
      i++; continue;
    }

    // Horizontal rule
    if (line.trim() === '---') {
      blocks.push({ object: 'block', type: 'divider', divider: {} });
      i++; continue;
    }

    // Table rows (collect all consecutive table lines)
    if (line.trimStart().startsWith('|')) {
      const tableLines = [];
      while (i < lines.length && lines[i].trimStart().startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      const tableBlocks = parseTable(tableLines);
      blocks.push(...tableBlocks);
      continue;
    }

    // Bullet list
    if (line.match(/^[\s]*[-*] /)) {
      const content = line.replace(/^[\s]*[-*] /, '');
      blocks.push(bulletItem(content));
      i++; continue;
    }

    // Numbered list
    if (line.match(/^[\s]*\d+\. /)) {
      const content = line.replace(/^[\s]*\d+\. /, '');
      blocks.push(numberedItem(content));
      i++; continue;
    }

    // Code block
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim() || 'plain text';
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      blocks.push({
        object: 'block',
        type: 'code',
        code: {
          rich_text: [{ type: 'text', text: { content: codeLines.join('\n') } }],
          language: lang.toLowerCase().replace(/^(js|javascript)$/, 'javascript')
            .replace(/^(ts|typescript)$/, 'typescript')
            .replace(/^(sh|shell|bash|zsh)$/, 'bash') || 'plain text',
        },
      });
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      blocks.push(quote(line.slice(2)));
      i++; continue;
    }

    // Empty line → skip
    if (line.trim() === '') {
      i++; continue;
    }

    // Bold line that acts like a label (e.g., **Label:**)
    // Regular paragraph
    blocks.push(paragraph(line));
    i++;
  }

  return blocks;
}

function richText(text) {
  // Convert inline markdown (bold, italic, code) to Notion rich text
  const parts = [];
  const regex = /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(`(.+?)`)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', text: { content: text.slice(lastIndex, match.index) } });
    }
    if (match[1]) {
      parts.push({ type: 'text', text: { content: match[2] }, annotations: { bold: true } });
    } else if (match[3]) {
      parts.push({ type: 'text', text: { content: match[4] }, annotations: { italic: true } });
    } else if (match[5]) {
      parts.push({ type: 'text', text: { content: match[6] }, annotations: { code: true } });
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push({ type: 'text', text: { content: text.slice(lastIndex) } });
  }

  return parts.length > 0 ? parts : [{ type: 'text', text: { content: text } }];
}

function heading(level, text) {
  const type = `heading_${level}`;
  return { object: 'block', type, [type]: { rich_text: richText(text.trim()) } };
}

function paragraph(text) {
  return { object: 'block', type: 'paragraph', paragraph: { rich_text: richText(text.trim()) } };
}

function bulletItem(text) {
  return { object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: richText(text.trim()) } };
}

function numberedItem(text) {
  return { object: 'block', type: 'numbered_list_item', numbered_list_item: { rich_text: richText(text.trim()) } };
}

function quote(text) {
  return { object: 'block', type: 'quote', quote: { rich_text: richText(text.trim()) } };
}

function parseTable(lines) {
  // Filter out separator lines (---|---|---)
  const dataLines = lines.filter(l => !l.match(/^[\s|:-]+$/));
  if (dataLines.length === 0) return [];

  const rows = dataLines.map(l =>
    l.split('|').slice(1, -1).map(cell => cell.trim())
  );

  if (rows.length === 0) return [];

  const hasHeader = lines.some(l => l.match(/^[\s|:-]+$/));
  const blocks = [];

  blocks.push({
    object: 'block',
    type: 'table',
    table: {
      table_width: rows[0].length,
      has_column_header: hasHeader,
      has_row_header: false,
      children: rows.map(row => ({
        object: 'block',
        type: 'table_row',
        table_row: {
          cells: row.map(cell => richText(cell)),
        },
      })),
    },
  });

  return blocks;
}

// Extract title from first H1 in markdown
function extractTitle(markdown) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : 'Sesión sin título';
}

// Notion API has a limit of 100 blocks per request — chunk if needed
async function appendBlocksInChunks(pageId, blocks) {
  const CHUNK_SIZE = 100;
  for (let i = 0; i < blocks.length; i += CHUNK_SIZE) {
    const chunk = blocks.slice(i, i + CHUNK_SIZE);
    await notionRequest('PATCH', `/blocks/${pageId}/children`, { children: chunk });
  }
}

async function uploadDoc(filePath) {
  const markdown = readFileSync(filePath, 'utf8');
  const title = extractTitle(markdown);

  console.log(`📝 Creando página: "${title}"...`);

  // Create the child page
  const page = await notionRequest('POST', '/pages', {
    parent: { page_id: NOTION_AMAPOLA_PAGE_ID },
    properties: {
      title: {
        title: [{ type: 'text', text: { content: title } }],
      },
    },
  });

  const pageId = page.id;
  console.log(`✅ Página creada (ID: ${pageId})`);

  // Convert markdown to blocks and upload
  const blocks = markdownToBlocks(markdown);
  console.log(`📤 Subiendo ${blocks.length} bloques de contenido...`);
  await appendBlocksInChunks(pageId, blocks);

  const pageUrl = page.url;
  console.log(`\n🎉 ¡Listo! Documentación subida a Notion:`);
  console.log(`   ${pageUrl}`);
}

// CLI
const args = process.argv.slice(2);

if (args.includes('--test')) {
  await testConnection();
} else {
  const fileIdx = args.indexOf('--file');
  if (fileIdx === -1 || !args[fileIdx + 1]) {
    console.error('Uso: node push-to-notion.js --file /ruta/al/archivo.md');
    console.error('     node push-to-notion.js --test');
    process.exit(1);
  }
  const filePath = resolve(args[fileIdx + 1]);
  await uploadDoc(filePath);
}
