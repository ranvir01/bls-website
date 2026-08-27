import type { Review } from './types';

/**
 * Genuine customer reviews.
 *
 * EMPTY ON PURPOSE. The previous version of this site carried ten fabricated
 * testimonials with stock-photo avatars and invented names ("David Chen",
 * "Emily Rodriguez", …). Those are gone and must never return.
 *
 * Every entry added here must be a real review a real customer left on a real
 * platform, copied verbatim, with `source` naming that platform. The reviews
 * section and the AggregateRating schema both render only from this array, so
 * an empty list means the section is hidden and no rating is claimed — which
 * is the correct, legal behaviour until real reviews exist.
 *
 * Collect them with the post-job SMS flow described in docs/REVIEW-ENGINE.md.
 *
 * Google is the ask until we have a confirmed Yelp (or Houzz, Angi) URL for
 * this Kent company. Do not copy reviews from another "Blue" landscaper.
 */
export const reviews: Review[] = [];

export function reviewsForCity(citySlug: string): Review[] {
  return reviews.filter((r) => r.citySlug === citySlug);
}

export function reviewsForService(serviceSlug: string): Review[] {
  return reviews.filter((r) => r.serviceSlug === serviceSlug);
}

export function averageRating(): number | null {
  if (!reviews.length) return null;
  return reviews.reduce((a, r) => a + r.rating, 0) / reviews.length;
}
