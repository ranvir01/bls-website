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
 * Slugs whose JPEG in public/images/services/ must not be used, and why.
 *
 * A .jpg outranks a .svg below, so any file sitting at that path silently wins
 * the card. These six must not, for two different reasons — which is why this
 * is a map of reasons rather than a bare list. There is a real difference
 * between "this picture is invented" and "this picture is ours but shows the
 * wrong job", and a future maintainer needs to know which they are looking at.
 *
 * Take a slug off this map the moment a real photograph of that service exists.
 * The file is all it takes; no other change.
 */
const UNUSABLE_SERVICE_ART: Record<string, string> = {
  // Generated stock, not photographs of anything this company built.
  driveways: 'generated stock: a paver driveway in front of a brick house that is not in Washington',
  irrigation: 'generated stock: a render of sprinklers watering a park lawn',
  'irrigation-maintenance': 'generated stock: a render of sprinklers watering a park lawn',
  'sprinkler-installation': 'generated stock: a render of sprinklers watering a park lawn',
  'sprinkler-repair': 'generated stock: a render of sprinklers watering a park lawn',

  // A real photograph of our own work — of the wrong subject. The file is the
  // outdoor kitchen, byte-identical to portfolio/outdoor-kitchen.jpg, and the
  // card's alt is generated from the slug, so it announced an outdoor kitchen
  // as "Fire Features" to anyone who could not see it. The only photograph in
  // the library that does contain a fire pit is work/hardscaping/21.jpg, where
  // the ring is a small background element beside a woodpile and does not read
  // as a fire feature at card size. The panel is the honest answer until
  // someone photographs one.
  'fire-features': 'real photo, wrong subject: it is the outdoor kitchen, not a fire feature',
};

export function serviceArt(slug: string): string | null {
  if (!(slug in UNUSABLE_SERVICE_ART)) {
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
