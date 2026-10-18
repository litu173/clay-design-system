// Builds the CDN bundle: dist/clay.min.css, dist/clay.min.js, dist/tokens.json, tailwind.js
// Run: node scripts/build.mjs   (no dependencies; uses esbuild for JS if it is installed)
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
const root = fileURLToPath(new URL('..', import.meta.url));
const read = (p) => readFileSync(root + p, 'utf8');

// CSS: strip comments (keep /*! banner), collapse whitespace. Never touch spaces before ":" (descendant selectors).
const css = read('dist/clay.css');
const banner = css.match(/^\/\*![\s\S]*?\*\//)[0].split('\n').slice(0, 2).join('\n') + '\n */';
const minCss = banner + '\n' + css
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\s+/g, ' ')
  .replace(/\s*([{};,>])\s*/g, '$1')
  .replace(/:\s+/g, ':')
  .replace(/;}/g, '}')
  .trim();
writeFileSync(root + 'dist/clay.min.css', minCss);

// JS: esbuild when available, otherwise ship the readable file
let minJs = read('dist/clay.js');
try {
  const { transformSync } = await import('esbuild');
  minJs = transformSync(minJs, { minify: true, legalComments: 'inline', target: 'es2018' }).code;
} catch { console.warn('esbuild not found — clay.min.js is unminified (npm i -D esbuild to minify)'); }
writeFileSync(root + 'dist/clay.min.js', minJs);

// Static tokens: platform presets + brand themes
const Clay = require(root + 'dist/clay.js');
writeFileSync(root + 'dist/tokens.json', JSON.stringify({ name: 'Clay', version: Clay.version, platforms: Clay.OS, themes: Clay.THEMES, fonts: Clay.FONTS }, null, 2) + '\n');

console.log(`clay.min.css ${(minCss.length / 1024).toFixed(1)}kb · clay.min.js ${(minJs.length / 1024).toFixed(1)}kb · tokens.json written`);
