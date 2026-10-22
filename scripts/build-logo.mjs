/**
 * Rasterise the site mark (MM, gold on the page background) to a square PNG.
 * Google's Organization logo wants a crawlable square image of at least 112px.
 * The favicon is only 16/32px, so this file is the JSON-LD logo.
 *
 * Run: node scripts/build-logo.mjs
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const font = readFileSync(path.join(process.cwd(), 'assets/Spectral-Light.ttf')).toString('base64');
const size = 512;
const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @font-face {
        font-family: 'Spectral';
        src: url('data:font/ttf;base64,${font}') format('truetype');
        font-weight: 300;
      }
    </style>
  </defs>
  <rect width="${size}" height="${size}" fill="#13110e"/>
  <rect x="48" y="48" width="416" height="416" fill="none" stroke="#c8a35a" stroke-width="8"/>
  <text x="256" y="300" text-anchor="middle" font-family="Spectral, Georgia, serif" font-size="210" font-weight="300" fill="#c8a35a">MM</text>
</svg>`;

const out = path.join(process.cwd(), 'public/logo.png');
await sharp(Buffer.from(svg)).png().toFile(out);
const meta = await sharp(out).metadata();
console.log(`wrote ${out} ${meta.width}x${meta.height} ${meta.format}`);
