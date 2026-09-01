import type { Metadata } from 'next';
import Link from 'next/link';
import { ExternalLink, Star } from 'lucide-react';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { CtaBand } from '@/components/blocks';
import { JsonLd } from '@/components/json-ld';
import { ReviewsSection } from '@/components/reviews-section';
import { VerifyListings } from '@/components/verify-listings';
import { Button } from '@/components/ui/button';
import { GOOGLE_PROFILE_URL, PHONE, TEL_HREF, business } from '@/data/business';
import { averageRating, reviews } from '@/data/reviews';
import { buildMetadata, graph, localBusinessSchema, reviewSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Reviews — Kent Landscaping & Hardscaping Contractor',
  description:
    'Customer reviews for Blue Landscaping Services in Kent, WA. Every review on this page is a real review from a real platform. Check our Google listing and WA license BLUELLS880K2 yourself.',
  path: '/reviews',
});

export default function ReviewsPage() {
  const average = averageRating();

  return (
    <>
      <JsonLd data={graph([localBusinessSchema({ path: '/reviews' }), reviewSchema(reviews)])} />

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
              Every review on this page is copied from a real platform, with a link back so you can
              read it in context. We do not write them and we do not buy them.
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
            <div className="rounded-lg border border-ink-200 bg-white p-8">
              <h2 className="text-h3">Nothing published here yet</h2>
              <div className="mt-4 max-w-prose space-y-4 text-body text-ink-500">
                <p>
                  We would rather show you nothing than show you something we wrote. This page fills
                  up as customers leave genuine reviews, and every one will carry the platform it
                  came from so you can go and read it in context.
                </p>
                <p>
                  The useful checks are the ones you can do yourself: our Google listing, the
                  Washington contractor registration, photos of jobs we actually built, or a call
                  about work near you.
                </p>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {GOOGLE_PROFILE_URL && (
                  <Button asChild>
                    <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer">
                      Find us on Google
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </Button>
                )}
                <Button asChild variant="outline">
                  <a href={business.license.lookupUrl} target="_blank" rel="noopener noreferrer">
                    Verify {business.license.number}
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/portfolio">See the work</Link>
                </Button>
                <Button asChild variant="outline">
                  <a href={TEL_HREF}>Call {PHONE.display}</a>
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-10">
          <VerifyListings />
        </div>

        {GOOGLE_PROFILE_URL && (
          <aside className="mt-10 max-w-3xl rounded-lg border border-ink-200 bg-ink-50 p-6">
            <h2 className="text-h3">Finished a job with us?</h2>
            <p className="mt-3 max-w-prose text-body text-ink-500">
              A Google review helps the next homeowner more than anything we could write. Search
              Blue Landscaping Services in Kent, or open the listing from here. It is also the
              place we cannot edit, which is why it is worth reading.
            </p>
            <p className="mt-4">
              <a
                href={GOOGLE_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-1.5 text-body font-semibold text-brand-600 underline underline-offset-4"
              >
                Leave a Google review
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </p>
          </aside>
        )}
      </div>

      <CtaBand />
    </>
  );
}
