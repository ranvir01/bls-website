'use client';

import { useState } from 'react';

import { Lightbox } from '@/components/gallery/lightbox';
import { Photo } from '@/components/gallery/photo';
import { featuredProjects, galleries } from '@/data/media';
import type { CategorySlug } from '@/data/types';

/**
 * Job photography on a service page.
 *
 * Ordering is deliberate: any titled project matched to THIS service goes
 * first, because those are the ones we can caption honestly, and the rest of
 * the discipline's gallery follows. Twelve is enough to prove the work without
 * turning a service page into a scroll marathon — the full library is one link
 * away on /portfolio.
 */
export function ServiceGallery({
  serviceSlug,
  serviceName,
  category,
  limit = 12,
}: {
  serviceSlug: string;
  serviceName: string;
  category: CategorySlug;
  limit?: number;
}) {
  const [index, setIndex] = useState<number | null>(null);

  const titled = featuredProjects
    .filter((p) => p.serviceSlug === serviceSlug)
    .map((p) => ({
      src: p.src,
      alt: `${p.title} by Blue Landscaping Services`,
      title: p.title,
      caption: p.description,
    }));

  const rest = (galleries[category] ?? [])
    .filter((p) => !titled.some((t) => t.src === p.src))
    .map((p) => ({ src: p.src, alt: p.alt }));

  const items = [...titled, ...rest].slice(0, limit);
  if (!items.length) return null;

  return (
    <section aria-labelledby="service-gallery-heading">
      <h2 id="service-gallery-heading" className="text-h2">
        {serviceName} we have built
      </h2>
      <p className="mt-3 max-w-prose text-body text-ink-500">
        Photographs from real Blue Landscaping jobs. Tap any one to see it full size.
      </p>

      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((item, i) => (
          <li key={item.src}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group block w-full overflow-hidden rounded-lg bg-white shadow-subtle transition-shadow duration-300 hover:shadow-card"
              aria-label={`View photograph ${i + 1} of ${items.length} full size`}
            >
              <Photo
                src={item.src}
                alt={item.alt}
                sizes="(max-width: 640px) 46vw, 30vw"
                className="aspect-[4/3] w-full"
                zoomOnHover
              />
            </button>
          </li>
        ))}
      </ul>

      <Lightbox items={items} index={index} onIndexChange={setIndex} onClose={() => setIndex(null)} />
    </section>
  );
}
