#!/usr/bin/env node
/**
 * Generates the material panel that sits at the top of every service card.
 *
 * WHY THESE EXIST
 * ---------------
 * The previous version of this site put a stock photo on every service card by
 * hotlinking Unsplash. Those hotlinks are gone (third-party image hosts break,
 * and they cost a DNS lookup plus a connection on every card). Real job
 * photography is the right replacement, but there is none yet — see
 * docs/PHOTO-SOP.md.
 *
 * Leaving the cards as bare text made the site look unfinished. So each service
 * gets an abstract panel in the brand palette whose pattern encodes the
 * material: courses for a wall, a running bond for pavers, spray arcs for
 * irrigation, slats for fencing. It reads as designed rather than missing, and
 * it is honest — nobody can mistake it for a photo of completed work.
 *
 * REPLACING ONE WITH A REAL PHOTO
 * -------------------------------
 * Drop a JPEG at public/images/services/<service-slug>.jpg. It wins
 * automatically: the components prefer .jpg and fall back to the generated
 * .svg. Nothing else to change.
 *
 *   node scripts/generate-service-art.mjs
 */

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const OUT = path.resolve(process.cwd(), 'public/images/services');

// Brand palette, mirrored from tailwind.config.ts.
const C = {
  brand900: '#002566',
  brand800: '#00348f',
  brand700: '#0042b8',
  brand600: '#0052e6',
  brand100: '#d9eaff',
  sky700: '#007ab8',
  sky500: '#1abeff',
  leaf700: '#1f6642',
  leaf600: '#257f52',
  leaf400: '#58b88e',
  leaf200: '#c5e7d8',
};

const W = 1200;
const H = 800;

/** Deterministic pseudo-random so regenerating never churns the files. */
function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

function shell(defs, body, from, to) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${from}"/>
      <stop offset="1" stop-color="${to}"/>
    </linearGradient>
    ${defs}
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  ${body}
  <rect width="${W}" height="${H}" fill="url(#bg)" opacity="0.12"/>
</svg>`;
}

// ── Pattern builders ─────────────────────────────────────────────────────────

/** Staggered block courses — retaining walls, seating walls. */
function courses({ rowH = 70, seed = 1, stroke = '#ffffff' } = {}) {
  const r = rng(seed);
  let out = '';
  for (let y = 0, i = 0; y < H; y += rowH, i++) {
    const offset = i % 2 ? 90 : 0;
    for (let x = -180; x < W + 180; x += 180) {
      const w = 180 - 8;
      const o = (0.05 + r() * 0.14).toFixed(3);
      out += `<rect x="${x + offset}" y="${y}" width="${w}" height="${rowH - 8}" rx="4" fill="${stroke}" opacity="${o}"/>`;
    }
  }
  return out;
}

/** Running-bond paving — patios, driveways. */
function runningBond({ unit = 120, seed = 2 } = {}) {
  const r = rng(seed);
  let out = '';
  for (let y = 0, i = 0; y < H; y += unit / 2, i++) {
    const offset = i % 2 ? unit / 2 : 0;
    for (let x = -unit; x < W + unit; x += unit) {
      const o = (0.05 + r() * 0.15).toFixed(3);
      out += `<rect x="${x + offset + 4}" y="${y + 4}" width="${unit - 8}" height="${unit / 2 - 8}" rx="3" fill="#ffffff" opacity="${o}"/>`;
    }
  }
  return out;
}

/** Irregular flagstone — walkways. */
function flagstones({ seed = 3 } = {}) {
  const r = rng(seed);
  let out = '';
  for (let y = 40; y < H; y += 130) {
    for (let x = 40; x < W; x += 150) {
      const jx = (r() - 0.5) * 30;
      const jy = (r() - 0.5) * 30;
      const w = 110 + r() * 40;
      const h = 90 + r() * 30;
      const o = (0.06 + r() * 0.16).toFixed(3);
      const rot = (r() - 0.5) * 12;
      out += `<rect x="${x + jx}" y="${y + jy}" width="${w}" height="${h}" rx="14" fill="#ffffff" opacity="${o}" transform="rotate(${rot.toFixed(1)} ${x + jx + w / 2} ${y + jy + h / 2})"/>`;
    }
  }
  return out;
}

/** Concentric rings — fire features, water features. */
function rings({ cx = W * 0.62, cy = H * 0.52, count = 9, gap = 62, seed = 4 } = {}) {
  const r = rng(seed);
  let out = '';
  for (let i = count; i > 0; i--) {
    const o = (0.05 + (count - i) * 0.02 + r() * 0.03).toFixed(3);
    out += `<circle cx="${cx}" cy="${cy}" r="${i * gap}" fill="none" stroke="#ffffff" stroke-width="${6 + (count - i)}" opacity="${o}"/>`;
  }
  return out;
}

/** Stepped diagonal — outdoor steps. */
function steps({ seed = 5 } = {}) {
  const r = rng(seed);
  let out = '';
  const n = 7;
  for (let i = 0; i < n; i++) {
    const x = (i * W) / n;
    const y = H - ((i + 1) * H) / n;
    const o = (0.07 + r() * 0.13).toFixed(3);
    out += `<rect x="${x}" y="${y}" width="${W / n + 2}" height="${H - y}" fill="#ffffff" opacity="${o}"/>`;
  }
  return out;
}

/** Spray arcs — irrigation. */
function sprayArcs({ seed = 6 } = {}) {
  const r = rng(seed);
  let out = '';
  const heads = [
    [W * 0.18, H * 0.86],
    [W * 0.52, H * 0.92],
    [W * 0.84, H * 0.82],
  ];
  for (const [cx, cy] of heads) {
    for (let i = 1; i <= 6; i++) {
      const rad = i * 52;
      const o = (0.06 + r() * 0.12).toFixed(3);
      out += `<path d="M ${cx - rad} ${cy} A ${rad} ${rad} 0 0 1 ${cx + rad} ${cy}" fill="none" stroke="#ffffff" stroke-width="7" opacity="${o}" stroke-linecap="round"/>`;
    }
    out += `<circle cx="${cx}" cy="${cy}" r="12" fill="#ffffff" opacity="0.28"/>`;
  }
  return out;
}

/** Vertical slats — fencing. */
function slats({ seed = 7 } = {}) {
  const r = rng(seed);
  let out = '';
  for (let x = 0; x < W; x += 58) {
    const o = (0.06 + r() * 0.16).toFixed(3);
    out += `<rect x="${x + 6}" y="60" width="42" height="${H - 120}" rx="6" fill="#ffffff" opacity="${o}"/>`;
  }
  out += `<rect x="0" y="150" width="${W}" height="16" fill="#ffffff" opacity="0.14"/>`;
  out += `<rect x="0" y="${H - 240}" width="${W}" height="16" fill="#ffffff" opacity="0.14"/>`;
  return out;
}

/** Mown stripes — lawn care, sod. */
function stripes({ seed = 8, band = 88 } = {}) {
  const r = rng(seed);
  let out = '';
  for (let y = 0, i = 0; y < H; y += band, i++) {
    const o = i % 2 ? (0.06 + r() * 0.06).toFixed(3) : (0.14 + r() * 0.08).toFixed(3);
    out += `<rect x="0" y="${y}" width="${W}" height="${band}" fill="#ffffff" opacity="${o}"/>`;
  }
  return out;
}

/** Organic planting masses — planting design. */
function planting({ seed = 9 } = {}) {
  const r = rng(seed);
  let out = '';
  for (let i = 0; i < 46; i++) {
    const cx = r() * W;
    const cy = r() * H;
    const rad = 26 + r() * 74;
    const o = (0.05 + r() * 0.14).toFixed(3);
    out += `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${rad.toFixed(0)}" fill="#ffffff" opacity="${o}"/>`;
  }
  return out;
}

// ── Per-service art direction ────────────────────────────────────────────────

const ART = {
  'retaining-walls': [courses({ seed: 11 }), C.brand800, C.brand600],
  'seating-walls': [courses({ rowH: 56, seed: 12 }), C.brand700, C.sky700],
  'paver-patios': [runningBond({ seed: 13 }), C.brand700, C.brand500 ?? C.brand600],
  driveways: [runningBond({ unit: 170, seed: 14 }), C.brand900, C.brand700],
  walkways: [flagstones({ seed: 15 }), C.sky700, C.brand700],
  'fire-features': [rings({ seed: 16, count: 8 }), C.brand900, C.brand700],
  'water-features': [rings({ cx: W * 0.5, cy: H * 0.55, count: 10, gap: 54, seed: 17 }), C.sky700, C.brand600],
  'outdoor-steps': [steps({ seed: 18 }), C.brand800, C.sky700],
  'sprinkler-installation': [sprayArcs({ seed: 19 }), C.sky700, C.brand600],
  'sprinkler-repair': [sprayArcs({ seed: 20 }), C.brand700, C.sky500],
  'irrigation-maintenance': [sprayArcs({ seed: 21 }), C.brand800, C.sky700],
  fencing: [slats({ seed: 22 }), C.leaf700, C.brand700],
  'lawn-maintenance': [stripes({ seed: 23 }), C.leaf700, C.leaf600],
  'sod-installation': [stripes({ seed: 24, band: 64 }), C.leaf600, C.leaf400],
  'planting-design': [planting({ seed: 25 }), C.leaf700, C.sky700],
};

/** Category headers get a wider, calmer treatment. */
const CATEGORY_ART = {
  hardscaping: [courses({ rowH: 84, seed: 31 }), C.brand900, C.brand700],
  irrigation: [sprayArcs({ seed: 32 }), C.brand800, C.sky700],
  landscaping: [stripes({ seed: 33, band: 100 }), C.leaf700, C.leaf600],
};

await mkdir(OUT, { recursive: true });

let count = 0;
for (const [slug, [body, from, to]] of Object.entries({ ...ART, ...CATEGORY_ART })) {
  const svg = shell('', body, from, to);
  await writeFile(path.join(OUT, `${slug}.svg`), svg, 'utf8');
  count += 1;
}

console.log(`generated ${count} service panels in public/images/services/`);
console.log('drop a <slug>.jpg alongside any of them to override it with a real photo');
