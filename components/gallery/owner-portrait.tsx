'use client';

import { Maximize2 } from 'lucide-react';
import { useState } from 'react';

import { Lightbox } from '@/components/gallery/lightbox';
import { Photo } from '@/components/gallery/photo';
import { business } from '@/data/business';
import { OWNER_PHOTO } from '@/data/media';

/**
 * The team photograph, with a click-to-enlarge.
 *
 * Small on purpose. On the About page the surrounding copy is doing the
 * explaining, so the picture only has to put faces to it — a full-bleed
 * portrait here would push the actual substance below the fold.
 */
export function OwnerPortrait() {
  const [open, setOpen] = useState(false);

  return (
    <div className="grid items-center gap-8 md:grid-cols-[minmax(0,22rem)_1fr] md:gap-12">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block w-full overflow-hidden rounded-xl border border-ink-200 shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
        aria-label="View the full team photograph"
      >
        <Photo
          src={OWNER_PHOTO.src}
          alt={OWNER_PHOTO.alt}
          sizes="(max-width: 768px) 92vw, 22rem"
          className="aspect-[4/3] w-full"
          zoomOnHover
        />
        <span className="pointer-events-none absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-ink-900/50 text-white backdrop-blur-sm transition-colors group-hover:border-white/80">
          <Maximize2 className="h-4 w-4" aria-hidden="true" />
        </span>
      </button>

      <div>
        <p className="eyebrow text-brand-600">
          The people doing the work
        </p>
        <h2 className="mt-3 text-h2">{business.owner} and the crew</h2>
        <p className="mt-4 max-w-prose text-body-lg text-ink-800">
          Not a call centre and not a franchise. {business.owner} owns the company, quotes the
          jobs and runs the crew that builds them. The number in the header reaches him, and the
          person who walks your yard is the person whose name is on the licence.
        </p>
      </div>

      <Lightbox
        items={[{ src: OWNER_PHOTO.src, alt: OWNER_PHOTO.alt, title: 'Blue Landscaping Services' }]}
        index={open ? 0 : null}
        onIndexChange={() => {}}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
