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

/**
 * Slugs whose JPEG in public/images/services/ is NOT a photograph of our work.
 *
 * Five files there are generated stock rather than job photos: a paver driveway
 * in front of a brick house that is not in Washington, and four near-identical
 * renders of sprinklers watering a park lawn. They were resolving ahead of the
 * generated material panels purely because a .jpg outranks a .svg here, which
 * put invented imagery on the driveway and irrigation cards of a site that
 * tells visitors every photo is our own work.
 *
 * They stay listed rather than simply deleted so that dropping the file back in
 * does not quietly restore them. Take a slug off this list the moment a real
 * photograph of that service exists — the file is all it takes, no other change.
 */
const NOT_OUR_WORK = new Set([
  'driveways',
  'irrigation',
  'irrigation-maintenance',
  'sprinkler-installation',
  'sprinkler-repair',
]);

export function serviceArt(slug: string): string | null {
  if (!NOT_OUR_WORK.has(slug)) {
    for (const ext of PHOTO_EXTS) {
      if (existsSync(path.join(DIR, `${slug}${ext}`))) {
        return `/images/services/${slug}${ext}`;
      }
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
