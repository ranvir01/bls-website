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

/**
 * What each service photograph actually shows.
 *
 * The card used to announce "<Service> by Blue Landscaping Services", which
 * is the heading read twice with a company name attached, and said nothing
 * about the picture. Every entry here was written from the picture. Nine of
 * the files are byte-identical to photos in public/images/work/ and reuse
 * the description already verified in data/work-photos.ts; the other three
 * were described by eye. Anything not listed falls back to the service name.
 *
 * Keep the entry and the file together: if a JPEG at
 * public/images/services/<slug>.jpg is swapped, rewrite its line here.
 *
 * Ten of these twelve are live. `hardscaping` and `landscaping` are category
 * slugs, and no page passes a category slug to <ServiceArt> — all four call
 * sites pass a service slug, so /services renders exactly fifteen cards and
 * none of them is a category. Their files (and services/irrigation.jpg, which
 * is the same generated render as services/sprinkler-installation.jpg) sit
 * unused. The two descriptions are kept because they were written from the
 * pictures and the resolver is slug-generic: the day a category card is
 * rendered, the art and its alt are already correct.
 */
export const SERVICE_ART_ALT: Record<string, string> = {
  // = work/hardscaping/23.jpg
  fencing:
    'Bluestone paver walk down a narrow side yard with a new cedar and wire-mesh gate, star jasmine climbing the trellis beside it',
  // = work/hardscaping/02.jpg
  hardscaping:
    'Curved grey block retaining wall holding a bark bed of sedge and hakone grass beside a gravel path, with a lace-leaf maple against a modern house',
  // = work/landscaping/01.jpg
  landscaping:
    'Cedar picket fence with a pergola-style top rail running along a back property line, taller solid cedar panels behind it',
  // = work/hardscaping/03.jpg
  'lawn-maintenance':
    'Fresh sod laid across a front yard up to the sidewalk, weeping Japanese maple in the corner and a stump ground out at the parking strip',
  // = work/hardscaping/26.jpg
  'outdoor-steps':
    'Wide cedar deck stairs with a matching handrail and cedar planter boxes, leading down from an existing deck',
  // = work/landscaping/48.jpg
  'paver-patios':
    'Paver patio and matching walkway wrapping a grey shingled house, with a circular seating area, a flower bed and a block retaining wall along the lawn',
  // = work/hardscaping/40.jpg
  'planting-design':
    'Front bed planted along a driveway with variegated carex, coneflower, salvia and low shrubs in fresh bark',
  // = work/hardscaping/39.jpg
  'retaining-walls':
    'Two-tier grey block retaining wall stepping down a back slope, graded and ready for topsoil',
  // = work/hardscaping/16.jpg
  walkways:
    'Flagstone stepping stones set in fresh bark down a narrow side yard beside a new deck frame, boulders lining the fence and a pop-up sprinkler head at the edge',
  'seating-walls':
    'Terraced grey block walls with cap stones holding bark beds of black mondo grass, small shrubs and grasses',
  'sod-installation':
    'Fresh sod laid across a fenced back yard up to a horizontal cedar fence and timber retaining edge',
  'water-features':
    'River-rock pondless waterfall and dry creek bed lined with boulders beside a shingled house',
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
