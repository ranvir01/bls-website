/**
 * A next/image loader for Imgur-hosted photography.
 *
 * THE PROBLEM
 * -----------
 * The job photography lives on Imgur. The obvious options are both bad:
 *
 *   - `unoptimized` — every visitor downloads the full-size original for a
 *     240px thumbnail. The previous site did this and it is why the galleries
 *     were slow.
 *   - the default next/image loader — routes every photo through the Netlify
 *     image optimizer, which has to fetch each one from Imgur on a cache miss.
 *     That is a third-party host in the critical path of a page render, and a
 *     rate limit or a bad minute at Imgur turns into broken images on the site.
 *
 * THE FIX
 * -------
 * Imgur already serves resized variants. Append a letter to the image id and
 * you get a different size back from their CDN:
 *
 *   t → 160px   m → 320px   l → 640px   h → 1024px   (none) → original
 *
 * Each fits the image inside a square of that dimension, preserving aspect.
 * So this loader maps the width next/image asks for onto the smallest variant
 * that still covers it. The browser gets a real `srcset`, the bytes come
 * straight off Imgur's CDN, and nothing sits in between that can fail.
 *
 * Density: next/image asks for widths from `deviceSizes`/`imageSizes`, already
 * accounting for DPR, so no extra multiplier belongs here.
 */

/** Ordered smallest-first. `''` is the original and is the last resort. */
const VARIANTS: { max: number; suffix: string }[] = [
  { max: 160, suffix: 't' },
  { max: 320, suffix: 'm' },
  { max: 640, suffix: 'l' },
  { max: 1024, suffix: 'h' },
];

/** `https://i.imgur.com/<id>.<ext>`, capturing id and extension. */
const IMGUR = /^https:\/\/i\.imgur\.com\/([A-Za-z0-9]+)\.(jpg|jpeg|png|gif|webp)$/;

export function isImgur(src: string): boolean {
  return IMGUR.test(src);
}

/**
 * next/image loader. Non-Imgur sources pass through untouched so the same
 * component can render a local file and a remote photo side by side.
 */
export function imgurLoader({ src, width }: { src: string; width: number }): string {
  const match = IMGUR.exec(src);
  if (!match) return src;

  const [, id, ext] = match;

  // Clamp at `h` rather than falling through to the original.
  //
  // next/image asks for every width in `deviceSizes`, which runs to 1920. An
  // earlier version returned the un-suffixed URL for anything over 1024, so
  // three of the fifteen srcset candidates were the untouched upload — and
  // they are precisely the ones every desktop browser picks. Across 136 job
  // photos that is tens of megabytes of straight-from-the-phone JPEG.
  //
  // `h` is 1024px on the long edge. On the largest surface it is used for —
  // the lightbox, at `sizes="100vw"` — that is still a sharp image, and it is
  // the difference between a gallery that opens instantly and one that does
  // not open at all on a phone.
  const variant = VARIANTS.find((v) => width <= v.max) ?? VARIANTS[VARIANTS.length - 1];
  return `https://i.imgur.com/${id}${variant.suffix}.${ext}`;
}

/**
 * A tiny blurred placeholder, generated rather than fetched.
 *
 * next/image wants a base64 data URI for `blurDataURL`, and we cannot generate
 * a real one at build time without downloading 130 photos. A flat brand-tinted
 * SVG is enough: it holds the space, it is under 200 bytes, and it means no
 * gallery cell ever flashes white before its photo lands.
 */
export const BLUR_TINT = {
  /** On a light page, under a photo card. */
  card: '#0f2f5c',
  /** Inside the lightbox, where the surround is near-black. */
  lightbox: '#0b1220',
} as const;

export function brandBlur(tint: string = BLUR_TINT.card): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 5"><rect width="8" height="5" fill="${tint}"/></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}
