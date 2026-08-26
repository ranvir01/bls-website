'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

import { Lightbox } from '@/components/gallery/lightbox';
import { Photo } from '@/components/gallery/photo';
import type { GalleryPhoto } from '@/data/media';
import { galleries } from '@/data/media';
import type { CategorySlug } from '@/data/types';

/**
 * What we build, shown rather than listed.
 *
 * Each category gets a horizontal strip of real job photographs above its
 * service links. The strip is CSS scroll-snap, not a carousel library: it is
 * native, it works before hydration, it is keyboard and screen-reader
 * accessible for free, and it costs nothing in the bundle. On a phone it is
 * the gesture people already use; on a desktop the overflow is visible enough
 * to invite the drag.
 *
 * Photographs open in the shared lightbox. That is the whole point of putting
 * 113 job photos on a page — someone deciding on a fifteen-thousand-dollar
 * patio wants to look closely at the joints.
 */
export function ServicesShowcase({
  categories,
}: {
  categories: {
    slug: CategorySlug;
    name: string;
    lead: string;
    services: { slug: string; name: string; blurb: string; href: string }[];
  }[];
}) {
  const [open, setOpen] = useState<{ category: CategorySlug; index: number } | null>(null);
  const activeItems: GalleryPhoto[] = open ? galleries[open.category] : [];

  return (
    <section className="bg-ink-50">
      <div className="shell section">
        <div className="max-w-prose">
          <p className="eyebrow text-brand-600">
            What we build
          </p>
          <h2 className="mt-3 text-h2">Hardscaping, irrigation and landscaping</h2>
          <p className="mt-4 text-body-lg text-ink-500">
            Every photograph below is a Blue Landscaping job. Tap any of them to look closely.
          </p>
        </div>

        <div className="mt-12 space-y-16">
          {categories.map((category) => {
            const photos = galleries[category.slug] ?? [];

            return (
              <div key={category.slug}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <h3 className="text-h3">{category.name}</h3>
                  <Link
                    href={`/services/${category.slug}`}
                    className="inline-flex min-h-[44px] items-center gap-1.5 text-caption font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-600"
                  >
                    All {category.name.toLowerCase()} services
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
                <p className="mt-2 max-w-prose text-body text-ink-500">{category.lead}</p>

                {/* Photo strip */}
                {photos.length > 0 && (
                  <div
                    className="scrollbar-slim -mx-5 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 lg:-mx-10 lg:px-10"
                    role="group"
                    aria-label={`${category.name} photographs`}
                  >
                    {photos.slice(0, 14).map((photo, i) => (
                      <button
                        key={photo.src}
                        type="button"
                        onClick={() => setOpen({ category: category.slug, index: i })}
                        className="group relative w-[15rem] shrink-0 snap-start overflow-hidden rounded-lg bg-white shadow-subtle transition-shadow duration-300 hover:shadow-card sm:w-[17rem]"
                      >
                        <Photo
                          src={photo.src}
                          alt={photo.alt}
                          sizes="(max-width: 640px) 60vw, 17rem"
                          className="aspect-[4/3] w-full"
                          zoomOnHover
                        />
                      </button>
                    ))}

                    {photos.length > 14 && (
                      <Link
                        href="/portfolio#every-photo"
                        className="flex w-[15rem] shrink-0 snap-start flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-brand-200 bg-white p-6 text-center transition-colors hover:border-brand-600 sm:w-[17rem]"
                      >
                        <span className="text-h3 tabular-nums text-brand-700">
                          +{photos.length - 14}
                        </span>
                        <span className="text-caption font-semibold text-ink-800">
                          more {category.name.toLowerCase()} photos
                        </span>
                        <span className="text-caption text-brand-600 underline underline-offset-4">
                          See them all
                        </span>
                      </Link>
                    )}
                  </div>
                )}

                {/* Service links */}
                <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  {category.services.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={service.href}
                        className="group flex h-full min-h-[44px] flex-col justify-center rounded-lg border border-ink-200 bg-white p-4 transition-colors hover:border-brand-600"
                      >
                        <span className="flex items-center justify-between gap-2 text-body font-semibold text-brand-900 group-hover:text-brand-700">
                          {service.name}
                          <ArrowRight
                            className="h-4 w-4 shrink-0 text-brand-600 opacity-0 transition-opacity group-hover:opacity-100"
                            aria-hidden="true"
                          />
                        </span>
                        <span className="mt-1 text-caption text-ink-500">{service.blurb}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <Lightbox
        items={activeItems}
        index={open?.index ?? null}
        onIndexChange={(next) => setOpen((prev) => (prev ? { ...prev, index: next } : prev))}
        onClose={() => setOpen(null)}
      />
    </section>
  );
}
