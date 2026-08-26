import Image from 'next/image';

import { Photo } from '@/components/gallery/photo';
import { serviceHeroPhoto } from '@/data/media';
import type { CategorySlug } from '@/data/types';
import { isPhoto, serviceArt } from '@/lib/service-art';
import { cn } from '@/lib/utils';

/**
 * The image panel at the top of a service or category card.
 *
 * Resolution order, best first:
 *
 *  1. A local file at public/images/services/<slug>.jpg. Drop one in and it
 *     wins over everything — that is the override hatch.
 *  2. A photograph from the Imgur job library, matched to this service
 *     (data/media.ts). This is what fills the site today: real Blue
 *     Landscaping work rather than an abstract panel.
 *  3. The generated material panel, for a slug with no photography at all.
 *
 * Alt text follows provenance. A photograph gets a real description because it
 * carries information the card's heading does not; the generated panel is
 * decorative — the heading already names the service — so it takes an empty alt
 * and is hidden from assistive tech.
 */
export function ServiceArt({
  slug,
  name,
  category,
  className,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw',
  priority = false,
}: {
  slug: string;
  name: string;
  /** Needed to pick a fallback photograph from the right gallery. */
  category?: CategorySlug;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const local = serviceArt(slug);

  // A local photograph beats everything.
  if (local && isPhoto(local)) {
    return (
      <div className={cn('relative overflow-hidden bg-brand-800', className)}>
        <Image
          src={local}
          alt={`${name} by Blue Landscaping Services`}
          fill
          sizes={sizes}
          priority={priority}
          className="img-grade object-cover transition-transform duration-500"
        />
      </div>
    );
  }

  const remote = category ? serviceHeroPhoto(slug, category) : null;
  if (remote) {
    return (
      <Photo
        src={remote.src}
        alt={remote.alt}
        sizes={sizes}
        priority={priority}
        className={className}
        zoomOnHover
      />
    );
  }

  // Generated material panel — decorative.
  if (!local) return null;

  return (
    <div className={cn('relative overflow-hidden bg-brand-800', className)}>
      <Image
        src={local}
        alt=""
        aria-hidden
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-500"
      />
    </div>
  );
}
