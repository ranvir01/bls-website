import { existsSync } from 'node:fs';
import path from 'node:path';

/**
 * Resolves the image for a service or category card.
 *
 * A real photograph always wins. The generated material panel
 * (scripts/generate-service-art.mjs) is only the fallback, so the way to
 * upgrade any card is to drop a JPEG next to its SVG — no code change.
 *
 * The filesystem check runs at build time: every page that calls this is a
 * server component and statically generated, so this never reaches the browser
 * and costs nothing at runtime.
 */

const DIR = path.join(process.cwd(), 'public', 'images', 'services');

/** Photo formats we will pick up, in preference order. */
const PHOTO_EXTS = ['.jpg', '.jpeg', '.webp', '.avif', '.png'];

export function serviceArt(slug: string): string | null {
  for (const ext of PHOTO_EXTS) {
    if (existsSync(path.join(DIR, `${slug}${ext}`))) {
      return `/images/services/${slug}${ext}`;
    }
  }
  if (existsSync(path.join(DIR, `${slug}.svg`))) {
    return `/images/services/${slug}.svg`;
  }
  return null;
}

/** True when the resolved art is a real photograph rather than a generated panel. */
export function isPhoto(src: string | null): boolean {
  return Boolean(src && !src.endsWith('.svg'));
}
