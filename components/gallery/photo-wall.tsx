'use client';

import { useMemo, useState } from 'react';

import { Lightbox } from '@/components/gallery/lightbox';
import { Photo } from '@/components/gallery/photo';
import { allGalleryPhotos, galleries } from '@/data/media';
import type { CategorySlug } from '@/data/types';
import { cn } from '@/lib/utils';

const TABS: { key: 'all' | CategorySlug; label: string }[] = [
  { key: 'all', label: 'Everything' },
  { key: 'hardscaping', label: 'Hardscaping' },
  { key: 'irrigation', label: 'Irrigation' },
  { key: 'landscaping', label: 'Landscaping' },
];

/**
 * The full photo library, 113 job shots, filtered by category.
 *
 * Rendered in batches. Putting a hundred-plus image elements into the document
 * at once is fine for the network — they lazy-load — but it is not fine for
 * layout and paint on a mid-range phone, and it makes the tab switch feel
 * sticky. Thirty at a time with an explicit "show more" keeps every interaction
 * under a frame budget and, unlike infinite scroll, leaves the footer reachable.
 */
const BATCH = 30;

export function PhotoWall() {
  const [tab, setTab] = useState<'all' | CategorySlug>('all');
  const [shown, setShown] = useState(BATCH);
  const [index, setIndex] = useState<number | null>(null);

  const photos = useMemo(
    () => (tab === 'all' ? allGalleryPhotos : galleries[tab]),
    [tab],
  );

  const visible = photos.slice(0, shown);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter photographs">
        {TABS.map((t) => {
          const count = t.key === 'all' ? allGalleryPhotos.length : galleries[t.key].length;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => {
                setTab(t.key);
                setShown(BATCH);
              }}
              aria-pressed={tab === t.key}
              className={cn(
                'inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 text-caption font-semibold transition-colors',
                tab === t.key
                  ? 'border-brand-700 bg-brand-700 text-white'
                  : 'border-ink-200 bg-white text-ink-800 hover:border-brand-600 hover:text-brand-700',
              )}
            >
              {t.label}
              <span
                className={cn(
                  'tabular-nums',
                  tab === t.key ? 'text-white/70' : 'text-ink-400',
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((photo, i) => (
          <li key={photo.src}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group block w-full overflow-hidden rounded-lg bg-white shadow-subtle transition-shadow duration-300 hover:shadow-card"
              aria-label={`View photograph ${i + 1} of ${photos.length} full size`}
            >
              <Photo
                src={photo.src}
                alt={photo.alt}
                sizes="(max-width: 640px) 46vw, (max-width: 1024px) 31vw, 23vw"
                className="aspect-square w-full"
                zoomOnHover
              />
            </button>
          </li>
        ))}
      </ul>

      {shown < photos.length && (
        <div className="mt-8 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => setShown((n) => n + BATCH)}
            className="inline-flex min-h-[48px] items-center rounded-lg border border-ink-200 bg-white px-6 text-body font-semibold text-brand-900 transition-colors hover:border-brand-600 hover:text-brand-700"
          >
            Show {Math.min(BATCH, photos.length - shown)} more
          </button>
          <p className="text-caption text-ink-500">
            Showing {shown} of {photos.length}
          </p>
        </div>
      )}

      <Lightbox
        items={visible}
        index={index}
        onIndexChange={setIndex}
        onClose={() => setIndex(null)}
      />
    </div>
  );
}
