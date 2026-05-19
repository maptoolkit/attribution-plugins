#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');

const target = process.argv[2];
if (!target) {
  console.error('Usage: embed-logo.mjs <target-path>');
  process.exit(1);
}

const pngPath = resolve(repoRoot, 'assets/logo.png');
const png = readFileSync(pngPath);
const base64 = png.toString('base64');
const dataUri = `data:image/png;base64,${base64}`;

const out = `// AUTO-GENERATED. Run \`npm run build:logo\` to regenerate.
export const LOGO_DATA_URI = '${dataUri}';
`;

const targetAbs = resolve(process.cwd(), target);
mkdirSync(dirname(targetAbs), { recursive: true });
writeFileSync(targetAbs, out);

console.log(`Wrote ${target} (${base64.length} base64 chars)`);
