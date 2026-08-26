'use client';

import Link from 'next/link';
import { Maximize2, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

import { Lightbox } from '@/components/gallery/lightbox';
import { Photo } from '@/components/gallery/photo';
import { Button } from '@/components/ui/button';
import { PHONE, TEL_HREF, business, yearsInBusiness } from '@/data/business';
import { OWNER_PHOTO, beforeAfterPairs } from '@/data/media';
import { BeforeAfter } from '@/components/before-after';
import { RunningHead } from '@/components/home/running-head';
import { trackEvent } from '@/lib/analytics';

/**
 * The people, immediately after the hero.
 *
 * This section is here because of what a homeowner is actually deciding. They
 * are about to let strangers dig a four-foot trench next to their house. Every
 * competitor's site says "quality" and "experience"; almost none of them show
 * a face. A photograph of the crew, a name, a licence number they can check,
 * and a working phone number answer the real question faster than any amount
 * of copy about craftsmanship.
 *
 * The before/after pair underneath is the second half of the same argument:
 * this is the problem you have, and this is what it looks like when we leave.
 */
export function OwnerShowcase() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [pairIndex, setPairIndex] = useState(0);
  const years = yearsInBusiness();
  const pair = beforeAfterPairs[pairIndex];

  return (
    <section className="bg-white">
      <div className="shell section-lg">
        <RunningHead index={1} label="Who you are hiring" className="mb-12" />
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* The photograph */}
          <div className="min-w-0">
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="group relative block w-full overflow-hidden rounded-xl border border-ink-200 shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
              aria-label="View the full team photograph"
            >
              <Photo
                src={OWNER_PHOTO.src}
                alt={OWNER_PHOTO.alt}
                sizes="(max-width: 1024px) 92vw, 46vw"
                className="aspect-[4/3] w-full"
                zoomOnHover
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-ink-900/85 via-ink-900/25 to-transparent p-5">
                <span className="text-left">
                  <span className="block text-body-lg font-semibold text-white">
                    {business.owner}
                  </span>
                  <span className="block text-caption text-white/75">
                    Owner · Blue Landscaping Services
                  </span>
                </span>
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/40 bg-ink-900/50 text-white backdrop-blur-sm transition-colors group-hover:border-white/80">
                  <Maximize2 className="h-4 w-4" aria-hidden="true" />
                </span>
              </span>
            </button>
          </div>

          {/* The argument */}
          <div className="min-w-0">
            <h2 className="text-h2">
              A family crew out of Kent, on the tools since {business.foundedYear}
            </h2>

            <div className="mt-5 max-w-prose space-y-4 text-body-lg text-ink-800">
              <p>
                {business.owner} runs this company and runs the jobs. When you call the number on
                this page, that is who picks up, and the person who walks your yard is the person
                whose crew builds it.
              </p>
              <p>
                {years > 0 ? `${years} years` : 'Years'} of retaining walls, patios, walkways and
                irrigation across South King County and Greater Seattle. No sales team, no
                commissioned closer, and nobody subcontracted on the hardscape — the part of the
                job you cannot inspect once the backfill goes in.
              </p>
            </div>

            <div className="mt-7 flex items-start gap-3 rounded-lg border border-ink-200 bg-ink-50 p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
              <p className="text-caption text-ink-800">
                Washington contractor registration{' '}
                <a
                  href={business.license.lookupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand-700 underline underline-offset-2"
                >
                  {business.license.number}
                </a>
                , a ${business.license.bondAmount.toLocaleString('en-US')} bond and $1M liability
                cover. Check it with L&amp;I before you let anyone dig — for us and for whoever
                else quoted you.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a
                  href={TEL_HREF}
                  onClick={() => trackEvent('click_to_call', { location: 'owner_showcase' })}
                >
                  Call {PHONE.display}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">More about us</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Before / after */}
        {pair && (
          <div className="mt-16 border-t border-ink-200 pt-12 lg:mt-20 lg:pt-16">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow text-brand-600">
                  Before and after
                </p>
                <h3 className="mt-2 text-h3">Drag the handle</h3>
              </div>

              {beforeAfterPairs.length > 1 && (
                <div className="flex flex-wrap gap-2" role="group" aria-label="Choose a project">
                  {beforeAfterPairs.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setPairIndex(i)}
                      aria-current={i === pairIndex}
                      className={[
                        'inline-flex h-11 min-w-[2.75rem] items-center justify-center rounded-lg border px-3 text-caption font-semibold tabular-nums transition-colors',
                        i === pairIndex
                          ? 'border-brand-600 bg-brand-600 text-white'
                          : 'border-ink-200 bg-white text-ink-800 hover:border-brand-600 hover:text-brand-700',
                      ].join(' ')}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <BeforeAfter
              key={pairIndex}
              className="mt-6"
              aspect={4 / 3}
              before={{
                src: pair.before,
                alt: `Project ${pairIndex + 1} before Blue Landscaping Services started work`,
                width: 1600,
                height: 1200,
                assetType: 'photo',
              }}
              after={{
                src: pair.after,
                alt: `The same yard after Blue Landscaping Services completed the work`,
                width: 1600,
                height: 1200,
                assetType: 'photo',
              }}
              caption={`Real job ${pairIndex + 1} of ${beforeAfterPairs.length}. Drag, or use the arrow keys once the handle has focus.`}
            />
          </div>
        )}
      </div>

      <Lightbox
        items={[{ src: OWNER_PHOTO.src, alt: OWNER_PHOTO.alt, title: 'Blue Landscaping Services' }]}
        index={lightboxOpen ? 0 : null}
        onIndexChange={() => {}}
        onClose={() => setLightboxOpen(false)}
      />
    </section>
  );
}
