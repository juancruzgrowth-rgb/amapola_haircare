// Transpiles server/services/pdf.tsx -> server/services/pdf.js
// Needed because @vercel/node only compiles .ts (not .tsx). esbuild handles JSX.
// Single-file transpile (bundle: false): relative/package imports are kept intact
// so @vercel/node traces and includes them normally.
import { build } from 'esbuild'

await build({
  entryPoints: ['server/services/pdf.tsx'],
  outfile: 'server/services/pdf.js',
  bundle: false,
  format: 'esm',
  platform: 'node',
  target: 'node24',
  jsx: 'transform',
})

console.log('✓ Transpiled server/services/pdf.tsx -> pdf.js')
