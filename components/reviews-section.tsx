import { Star } from 'lucide-react';

import type { Review } from '@/data/types';

/**
 * Reviews.
 *
 * Renders NOTHING when there are no reviews. That is the correct behaviour, not
 * a gap to fill later: the previous version of this site shipped ten invented
 * testimonials with stock avatars, and an empty section is strictly better than
 * a fabricated one — legally and for trust.
 *
 * Every review shown carries its source, because an unattributed review is
 * indistinguishable from a made-up one.
 */
export function ReviewsSection({
  reviews,
  heading = 'What customers say',
}: {
  reviews: Review[];
  heading?: string;
}) {
  if (!reviews.length) return null;

  return (
    <section aria-labelledby="reviews-heading">
      <h2 id="reviews-heading" className="text-h2">
        {heading}
      </h2>
      <ul className="mt-6 grid gap-5 sm:grid-cols-2">
        {reviews.map((review) => (
          <li
            key={`${review.author}-${review.publishedAt}`}
            className="rounded-sm border border-ink-200 bg-white p-6"
          >
            <Stars rating={review.rating} />
            <blockquote className="mt-3 text-body text-ink-800">
              <p>&ldquo;{review.text}&rdquo;</p>
            </blockquote>
            <footer className="mt-4 text-caption text-ink-500">
              <span className="font-semibold text-brand-900">{review.author}</span>
              {' · '}
              {review.sourceUrl ? (
                <a
                  href={review.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  via {review.source}
                </a>
              ) : (
                <span>via {review.source}</span>
              )}
            </footer>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <p className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={i < rating ? 'h-4 w-4 fill-leaf-600 text-leaf-600' : 'h-4 w-4 text-ink-200'}
        />
      ))}
    </p>
  );
}
