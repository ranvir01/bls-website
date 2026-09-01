/**
 * Art-directed hero delivery.
 *
 * The homepage hero ships two different photographs, not two sizes of one: the
 * desktop frame is a 1920x1440 wide shot of a whole front yard, and the mobile
 * frame is a 900x1200 portrait of the flagstone path from the right-hand third
 * of it. A centre-crop of the wide shot puts the maple in frame and loses the
 * path, so the two crops have to stay and `<picture>` has to do the choosing.
 *
 * THE PROBLEM THIS SOLVES
 * -----------------------
 * The obvious way to write that is a <picture> wrapping a next/image, which is
 * what this hero used to be. It has two faults, and phones pay for both:
 *
 *   1. A <source srcSet="/images/hero-home-mobile.jpg"> is a raw file path. It
 *      never reaches the optimizer, so the crop that phones actually display
 *      was the one served unresized and un-transcoded — 236 kB of baseline
 *      JPEG where ~50 kB of AVIF would do.
 *   2. `priority` on the inner <Image> emits <link rel="preload"> with no media
 *      attribute, naming the *desktop* crop. The preload scanner obeys it
 *      regardless of viewport, so a phone fetched the desktop crop it would
 *      never paint, on top of the mobile crop it would.
 *
 * next/image cannot express per-breakpoint art direction — one <img> element,
 * one srcSet — so the fix is to keep <picture> and build the srcSets by hand,
 * pointing them at the optimizer instead of at the raw files.
 *
 * `/_next/image?url=…&w=…&q=…` is the same URL a custom next/image loader is
 * required to return, so it is a supported contract rather than an internal
 * detail. `w` must be a value declared in next.config.mjs — the optimizer
 * rejects anything else — which is why the widths below are drawn from
 * `deviceSizes` and not picked freely.
 */

/** Mirrors images.deviceSizes in next.config.mjs. */
const DEVICE_SIZES = [360, 414, 640, 828, 1080, 1200, 1920] as const;

/**
 * Below next/image's default of 75, deliberately.
 *
 * The hero is rendered at brightness(0.7) under a black gradient scrim, so the
 * highlight detail that a higher quality preserves is being crushed by CSS
 * before anyone sees it. At 75 the mobile crop came to 163 kB; at 60 it is
 * comfortably inside budget and indistinguishable through the scrim. Nothing
 * else on the site uses a custom quality — this one earns it.
 */
const QUALITY = 60;

export function nextImageUrl(src: string, width: number, quality = QUALITY) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
}

/** A `w`-descriptor srcSet across the declared device sizes within a range. */
export function optimizedSrcSet(src: string, { min = 0, max = Infinity } = {}) {
  return DEVICE_SIZES.filter((w) => w >= min && w <= max)
    .map((w) => `${nextImageUrl(src, w)} ${w}w`)
    .join(', ');
}

/** The breakpoint the hero swaps crops at — matches Tailwind's `md`. */
export const HERO_MOBILE_MEDIA = '(max-width: 767px)';
export const HERO_DESKTOP_MEDIA = '(min-width: 768px)';

export const heroArt = {
  mobile: {
    src: '/images/hero-home-mobile.jpg',
    media: HERO_MOBILE_MEDIA,
    // The source file is 900px wide; asking the optimizer for 1080 or more
    // would upscale it for nothing.
    srcSet: optimizedSrcSet('/images/hero-home-mobile.jpg', { max: 828 }),
  },
  desktop: {
    src: '/images/hero-home.jpg',
    media: HERO_DESKTOP_MEDIA,
    // Starts at 828 so a 768px tablet at 1x is covered, not just retina.
    srcSet: optimizedSrcSet('/images/hero-home.jpg', { min: 828 }),
  },
  /** Non-srcSet fallback for anything that ignores <source>. */
  fallback: nextImageUrl('/images/hero-home.jpg', 1200),
  // Only what is in the frame. The maple and the porch it once mentioned are
  // cropped out of the mobile picture entirely.
  alt: 'Flagstone path set through fresh bark beds and low groundcover in a Seattle-area front yard',
} as const;
