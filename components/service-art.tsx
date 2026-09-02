import Image from 'next/image';

import { SERVICE_ART_ALT, isPhoto, serviceArt } from '@/lib/service-art';
import { cn } from '@/lib/utils';

/**
 * The image panel at the top of a service or category card.
 *
 * Renders a real photograph when one exists at
 * public/images/services/<slug>.jpg, and the generated material panel
 * otherwise. Renders nothing at all if neither is present, so a new service
 * slug never produces a broken image.
 *
 * The generated panels are decorative — the card's heading already names the
 * service — so they take an empty alt and are hidden from assistive tech.
 * A real photo gets a descriptive alt, because it carries information the
 * text does not.
 */
export function ServiceArt({
  slug,
  name,
  className,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw',
  priority = false,
}: {
  slug: string;
  name: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const src = serviceArt(slug);
  if (!src) return null;

  const photo = isPhoto(src);

  return (
    <div className={cn('relative overflow-hidden bg-brand-800', className)}>
      <Image
        src={src}
        alt={photo ? (SERVICE_ART_ALT[slug] ?? name) : ''}
        aria-hidden={photo ? undefined : true}
        fill
        sizes={sizes}
        priority={priority}
        className={cn('object-cover transition-transform duration-500', photo && 'img-grade')}
      />
    </div>
  );
}
