'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

import type { ImageAsset } from '@/data/types';
import { cn } from '@/lib/utils';

/**
 * Photographic work grid. Click opens a simple lightbox.
 * Used on the homepage and portfolio so the original job photos are visible again.
 */
export function WorkGallery({
  photos,
  heading,
  limit,
}: {
  photos: ImageAsset[];
  heading?: string;
  limit?: number;
}) {
  const items = limit ? photos.slice(0, limit) : photos;
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
      if (e.key === 'ArrowRight') setActive((i) => (i === null ? i : (i + 1) % items.length));
      if (e.key === 'ArrowLeft') {
        setActive((i) => (i === null ? i : (i - 1 + items.length) % items.length));
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [active, items.length]);

  if (!items.length) return null;

  return (
    <section>
      {heading && <h2 className="text-h2">{heading}</h2>}
      <ul className={cn('grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4', heading && 'mt-6')}>
        {items.map((photo, i) => (
          <li key={photo.src}>
            <button
              type="button"
              onClick={() => setActive(i)}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-lg bg-ink-200"
              aria-label={`Open photo: ${photo.alt}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="img-grade object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>

      {active !== null && items[active] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Close"
            onClick={() => setActive(null)}
          >
            <X className="h-6 w-6" />
          </button>
          <div
            className="relative h-[80vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={items[active].src}
              alt={items[active].alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
