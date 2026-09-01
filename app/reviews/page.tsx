import type { Metadata } from 'next';
import Link from 'next/link';
import { Star } from 'lucide-react';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { CtaBand } from '@/components/blocks';
import { JsonLd } from '@/components/json-ld';
import { ReviewsSection } from '@/components/reviews-section';
import { Button } from '@/components/ui/button';
import { GOOGLE_PROFILE_URL, PHONE, TEL_HREF } from '@/data/business';
import { averageRating, reviews } from '@/data/reviews';
import { buildMetadata, graph, localBusinessSchema, reviewSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Reviews — Kent Landscaping & Hardscaping Contractor',
  description:
    'Customer reviews for Blue Landscaping Services, a licensed hardscaping and landscaping contractor in Kent, WA. Every review shown is real and attributed to its source.',
  path: '/reviews',
});

export default function ReviewsPage() {
  const average = averageRating();

  return (
    <>
      <JsonLd data={graph([localBusinessSchema(), reviewSchema(reviews)])} />

      <Breadcrumbs crumbs={[{ name: 'Reviews', path: '/reviews' }]} />

      <div className="shell pb-16 pt-8">
        <header className="max-w-3xl">
          <p className="eyebrow text-brand-600">Reviews</p>
          <h1 className="mt-2 text-h1">What customers say</h1>

          {average !== null ? (
            <p className="mt-5 flex items-center gap-3 text-body-lg text-ink-800">
              <span className="flex" aria-hidden="true">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={
                      i < Math.round(average) ? 'h-5 w-5 fill-leaf-600 text-leaf-600' : 'h-5 w-5 text-ink-200'
                    }
                  />
                ))}
              </span>
              <span>
                <strong>{average.toFixed(1)}</strong> from {reviews.length}{' '}
                {reviews.length === 1 ? 'review' : 'reviews'}
              </span>
            </p>
          ) : (
            <p className="mt-5 text-body-lg text-ink-500">
              Every review on this page is a real review left by a real customer on a real platform,
              shown with its source. We do not write them ourselves and we do not buy them.
            </p>
          )}
        </header>

        <div className="mt-12">
          {reviews.length > 0 ? (
            <ReviewsSection reviews={reviews} heading="All reviews" />
          ) : (
            /* Honest empty state. The previous version of this site carried ten
               fabricated testimonials with stock-photo avatars; showing nothing
               is both legal and more credible than replacing them. */
            <div className="rounded-sm border border-ink-200 bg-white p-8">
              <h2 className="text-h3">No reviews published here yet</h2>
              <div className="mt-4 max-w-prose space-y-4 text-body text-ink-500">
                <p>
                  We would rather show you nothing than show you something we wrote. This page fills
                  up as customers leave genuine reviews, and every one will carry the platform it
                  came from so you can go and read it in context. Nothing gets copied here without
                  a link back to where it was written.
                </p>
                <p>
                  In the meantime, the three things actually worth checking are the ones you can
                  verify yourself: our Google Business Profile, our Washington contractor
                  registration with L&amp;I, and a conversation with us about recent jobs near you.
                  We will give you the honest version of all three.
                </p>
                {GOOGLE_PROFILE_URL && (
                  <p>
                    If we have worked on your yard, leaving a review on our Google profile is the
                    single most useful thing you can do for us. It is also the place we will never
                    be able to edit, which is exactly why it is worth reading.
                  </p>
                )}
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                {GOOGLE_PROFILE_URL && (
                  <Button asChild>
                    <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer">
                      <Star className="h-4 w-4" aria-hidden="true" />
                      Find us on Google
                    </a>
                  </Button>
                )}
                <Button asChild variant={GOOGLE_PROFILE_URL ? 'outline' : 'primary'}>
                  <a href={TEL_HREF}>Call {PHONE.display}</a>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/about">How we work</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <CtaBand />
    </>
  );
}
