import provenance from '@/data/photo-provenance.json';
import type { ImageAsset, Project } from '@/data/types';

/**
 * "Is this the same photograph?" — answered from data/photo-provenance.json.
 *
 * Twelve of the fourteen named projects use a picture that is also in the job
 * gallery, under a different filename in public/images/portfolio/. On
 * /portfolio that put the same photograph on screen twice: once as a project
 * card, then again forty tiles down as "From the job". The gallery's own
 * dedupe compares paths, so it never saw it — and one of the twelve is not
 * even byte-identical, just the same shot re-encoded.
 *
 * The provenance manifest already records a perceptual hash of every file's
 * decoded pixels, so the comparison is done there instead of by path or by
 * checksum. Two hashes within RE_ENCODE_TOLERANCE bits are one photograph.
 * scripts/verify.mjs measured a re-encode at up to 6 bits and two different
 * photographs from this library at 10 or more; the tolerance sits on the
 * re-encode side of that gap.
 *
 * The JSON is only ever imported from server components, so it never reaches
 * the browser.
 */
const RE_ENCODE_TOLERANCE = 6;

const PHASH: Record<string, { phash?: string } | undefined> = provenance;

function phashOf(src: string): string | undefined {
  return PHASH[src.replace(/^\/images\//, '')]?.phash;
}

function hamming(a: string, b: string): number {
  let bits = 0;
  for (let i = 0; i < a.length; i += 1) {
    let x = parseInt(a[i], 16) ^ parseInt(b[i], 16);
    while (x) {
      bits += x & 1;
      x >>= 1;
    }
  }
  return bits;
}

/** True when the two paths hold the same photograph, re-encoded or not. */
export function samePhotograph(a: string, b: string): boolean {
  if (a === b) return true;
  const ha = phashOf(a);
  const hb = phashOf(b);
  if (!ha || !hb) return false;
  return hamming(ha, hb) <= RE_ENCODE_TOLERANCE;
}

/**
 * The gallery minus any photograph the page already shows as a named project.
 * A visitor should meet each picture once per page.
 */
export function withoutProjectPhotos(gallery: ImageAsset[], shown: Project[]): ImageAsset[] {
  if (!shown.length) return gallery;
  return gallery.filter((photo) => !shown.some((p) => samePhotograph(photo.src, p.after.src)));
}

/**
 * How many distinct photographs the site actually holds.
 *
 * The trust bar advertises this number next to "No stock imagery anywhere",
 * so it has to be a count of pictures, not of files. Adding the two arrays
 * gave 94 while the library holds 82: twelve of the fourteen projects store
 * their photo a second time under public/images/portfolio/, and a visitor
 * who counted would find twelve of them twice.
 */
export function countDistinctPhotographs(gallery: ImageAsset[], shown: Project[]): number {
  const extra = shown.filter((p) => !gallery.some((photo) => samePhotograph(photo.src, p.after.src)));
  return gallery.length + extra.length;
}
