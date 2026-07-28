#!/usr/bin/env node
/**
 * One-shot image optimizer for /public/images.
 *
 * Source photos come off a phone at 4000px and 5MB, which is fatal for LCP even
 * with a CDN in front. This resizes to sane maximums and writes AVIF + WebP
 * alongside a compressed JPEG fallback, so next/image can serve whichever the
 * browser prefers.
 *
 * Run after adding any new photo:  node scripts/optimize-images.mjs
 * Requires sharp:                  npm i -D sharp
 */

import { readdir, stat, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.error('sharp is not installed. Run: npm i -D sharp');
  process.exit(1);
}

const ROOT = path.resolve(process.cwd(), 'public/images');

/** Per-role sizing. Hero art is the only thing that needs to be large. */
const PROFILES = [
  { match: /hero/i, width: 2400, quality: 74 },
  { match: /logo/i, width: 480, quality: 90 },
  { match: /.*/, width: 1600, quality: 78 },
];

const SOURCE_EXT = new Set(['.jpg', '.jpeg', '.png']);
/** Files under this are stubs or already-tiny assets — skip them. */
const MIN_BYTES = 1024;

function profileFor(name) {
  return PROFILES.find((p) => p.match.test(name)) ?? PROFILES.at(-1);
}

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

async function optimize(file) {
  const ext = path.extname(file).toLowerCase();
  if (!SOURCE_EXT.has(ext)) return null;

  const { size } = await stat(file);
  if (size < MIN_BYTES) {
    return { file, skipped: 'stub or already tiny' };
  }

  const base = file.slice(0, -ext.length);
  const name = path.basename(file);
  const profile = profileFor(name);
  const isPng = ext === '.png';

  const input = sharp(file, { failOn: 'none' });
  const meta = await input.metadata();
  const width = Math.min(profile.width, meta.width ?? profile.width);

  const resized = () => sharp(file, { failOn: 'none' }).resize({ width, withoutEnlargement: true });

  await resized().avif({ quality: profile.quality - 6 }).toFile(`${base}.avif`);
  await resized().webp({ quality: profile.quality }).toFile(`${base}.webp`);

  // Rewrite the original in place so nothing 5MB can survive in the repo.
  const tmp = `${base}.opt${ext}`;
  if (isPng) {
    await resized().png({ compressionLevel: 9, palette: true }).toFile(tmp);
  } else {
    await resized().jpeg({ quality: profile.quality, mozjpeg: true, progressive: true }).toFile(tmp);
  }

  const { size: newSize } = await stat(tmp);
  const { rename, unlink } = await import('node:fs/promises');

  if (newSize < size) {
    await rename(tmp, file);
  } else {
    await unlink(tmp);
  }

  const finalSize = (await stat(file)).size;

  return {
    file: path.relative(process.cwd(), file),
    from: size,
    to: finalSize,
    width,
  };
}

function kb(n) {
  return `${Math.round(n / 1024)}kb`;
}

if (!existsSync(ROOT)) {
  await mkdir(ROOT, { recursive: true });
  console.log('No images to optimize.');
  process.exit(0);
}

let savedBytes = 0;
let processed = 0;

for await (const file of walk(ROOT)) {
  try {
    const result = await optimize(file);
    if (!result) continue;
    if (result.skipped) {
      console.log(`skip  ${path.relative(process.cwd(), result.file)} (${result.skipped})`);
      continue;
    }
    processed += 1;
    savedBytes += result.from - result.to;
    console.log(`ok    ${result.file}  ${kb(result.from)} → ${kb(result.to)}  (w=${result.width}, +avif +webp)`);
  } catch (err) {
    console.warn(`fail  ${path.relative(process.cwd(), file)}: ${err.message}`);
  }
}

console.log(`\n${processed} image(s) optimized, ${kb(savedBytes)} saved.`);
