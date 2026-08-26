'use client';

import Image from 'next/image';
import { useState } from 'react';

import { brandBlur, imgurLoader, isImgur } from '@/lib/imgur';
import { cn } from '@/lib/utils';

/**
 * One photograph from the job library.
 *
 * Four things this handles that a bare next/image does not:
 *
 *  1. Imgur sizing. Remote photos go through `imgurLoader`, which rewrites the
 *     URL to Imgur's own resized variant for whatever width is being asked for.
 *     Local files fall through to the normal optimizer.
 *  2. A held frame. `fill` inside a positioned box with an aspect ratio means
 *     the layout is final before a single byte of image arrives — no shift.
 *  3. A degrade path, in two steps rather than one. Imgur's size variants are
 *     a documented feature, but they are generated per upload and the previous
 *     site only ever linked the un-suffixed originals — so the originals are
 *     the URLs with a decade of proof behind them and the variants are not.
 *     On error the component drops the loader and retries the plain URL before
 *     giving up on the photo. One extra request in the rare bad case, against
 *     an entire gallery going blank if a variant turns out to be missing.
 *  4. Real failure. If the original fails too, the cell keeps its shape and
 *     fades to the brand colour instead of showing a broken-image glyph.
 */
export function Photo({
  src,
  alt,
  className,
  sizes = '(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw',
  priority = false,
  zoomOnHover = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  zoomOnHover?: boolean;
}) {
  const [stage, setStage] = useState<'sized' | 'original' | 'failed'>('sized');
  const remote = isImgur(src);

  // `unoptimized` on the retry: the point of the fallback is to take every
  // rewriting layer out of the path and request exactly the URL we were given.
  const useLoader = remote && stage === 'sized';

  return (
    <div className={cn('relative overflow-hidden bg-brand-800', className)}>
      {stage !== 'failed' && (
        <Image
          key={stage}
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          loader={useLoader ? imgurLoader : undefined}
          unoptimized={remote && stage === 'original'}
          placeholder="blur"
          blurDataURL={brandBlur()}
          onError={() => setStage((s) => (s === 'sized' && remote ? 'original' : 'failed'))}
          className={cn(
            'img-grade object-cover',
            zoomOnHover && 'transition-transform duration-500 ease-out group-hover:scale-[1.04]',
          )}
        />
      )}
    </div>
  );
}
