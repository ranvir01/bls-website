'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

import type { ImageAsset } from '@/data/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

/**
 * Two columns on phones, three from md, four from lg.
 *
 * The old value jumped straight from 50vw to 25vw and so under-declared the
 * whole 768–1023px band, where a tile is a third of the row. Shared with the
 * lightbox on purpose — see PreviewBackdrop.
 */
const GRID_SIZES = '(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw';

/** The lightbox's own ceiling — max-w-5xl. */
const LIGHTBOX_MAX = 1024;

/**
 * How wide to let a photo be shown in the lightbox.
 *
 * Not every photo in this library is 1400px. A good number of the owner's older
 * job photos survive only as ~417px web thumbnails, and stretching one of those
 * across a 1024px lightbox is a 2.5x upscale — a soft, blocky mess that looks
 * like a broken image rather than a small one. Capping the display at twice the
 * file's real width keeps the enlargement honest: a small photo still opens
 * bigger than its thumbnail, but never so big that the upscaling is the first
 * thing you notice.
 *
 * It also stops the optimizer being asked for a 1024px variant of a 417px
 * source, which costs bytes to deliver no extra detail.
 */
function lightboxWidth(photo: ImageAsset) {
  return Math.min(LIGHTBOX_MAX, photo.width * 2);
}

/**
 * Photographic work grid with a lightbox.
 *
 * WHY RADIX AND NOT A HAND-ROLLED OVERLAY
 * ---------------------------------------
 * The previous version was a plain <div role="dialog" aria-modal="true"> with
 * no focus management of any kind. Opening it left the keyboard focus back on
 * the page behind, so Tab walked the header and footer while a screen reader
 * was told a modal had taken over, and Escape was the only way out because
 * nothing had focus to act on. `aria-modal` is a promise about behaviour, and
 * that markup did not keep it.
 *
 * Radix Dialog is already a dependency and already used exactly this way in
 * components/nav/mobile-drawer.tsx, so the focus trap, the return of focus to
 * the thumbnail that opened the lightbox, Escape, the body scroll lock and
 * aria-hidden on everything behind all come from there rather than from a
 * second hand-written implementation.
 *
 * Previous/Next are real buttons. Arrow keys still work, but a gallery of
 * forty-odd photos cannot be navigable only by a shortcut nothing announces.
 */
/**
 * How many tiles to show before the "see the rest" button.
 *
 * The full library is eighty photographs. All eighty in one grid is twenty rows
 * of scrolling before the page's closing call to action, and it costs eighty
 * lazy-loaded requests on a page most visitors skim. Two rows short of half is
 * enough to prove the work is real; the rest are one click away.
 */
const COLLAPSE_AFTER = 40;

export function WorkGallery({
  photos,
  heading,
  limit,
}: {
  photos: ImageAsset[];
  heading?: string;
  limit?: number;
}) {
  const all = limit ? photos.slice(0, limit) : photos;
  const [expanded, setExpanded] = useState(false);
  const collapsible = all.length > COLLAPSE_AFTER;
  const items = collapsible && !expanded ? all.slice(0, COLLAPSE_AFTER) : all;
  const [active, setActive] = useState<number | null>(null);

  /**
   * The thumbnail that opened the lightbox.
   *
   * Radix normally returns focus to Dialog.Trigger on close, but there is no
   * single trigger here — any one of forty-odd thumbnails can open it, and the
   * dialog is driven by `open` rather than by a trigger element. Without this,
   * closing dropped focus onto <body> and a keyboard user landed back at the
   * top of the document instead of the photo they had just been looking at.
   */
  const openedBy = useRef<HTMLButtonElement | null>(null);

  /** Reset per photo, so stepping through the gallery re-runs the fade. */
  const [loaded, setLoaded] = useState(false);

  const step = useCallback(
    (delta: number) => {
      setLoaded(false);
      setActive((i) => (i === null ? i : (i + delta + items.length) % items.length));
    },
    [items.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, step]);

  if (!items.length) return null;

  const current = active === null ? null : items[active];

  return (
    <section>
      {heading && <h2 className="text-h2">{heading}</h2>}
      <ul className={cn('grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4', heading && 'mt-6')}>
        {items.map((photo, i) => (
          <li key={photo.src}>
            <button
              type="button"
              onClick={(e) => {
                openedBy.current = e.currentTarget;
                setLoaded(false);
                setActive(i);
              }}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-lg bg-ink-200"
              aria-label={`Open photo: ${photo.alt}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={GRID_SIZES}
                className="img-grade object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>

      {collapsible && !expanded && (
        <div className="mt-8 flex justify-center">
          <Button type="button" variant="outline" onClick={() => setExpanded(true)}>
            Show all {all.length} photos
          </Button>
        </div>
      )}

      <Dialog.Root
        open={active !== null}
        onOpenChange={(open) => {
          if (!open) setActive(null);
        }}
      >
        <Dialog.Portal>
          {/* 95%, not 85%. The site header is near-white and fixed, so at 85%
              it read through the scrim as a legible strip across the top of the
              lightbox while the dark gallery behind it vanished — the page
              looked half-dismissed rather than covered. */}
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/95" />
          <Dialog.Content
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 focus:outline-none"
            onCloseAutoFocus={(e) => {
              e.preventDefault();
              openedBy.current?.focus();
            }}
          >
            {current && (
              <>
                <Dialog.Title className="sr-only">{current.alt}</Dialog.Title>

                <Dialog.Close asChild>
                  <button
                    type="button"
                    aria-label="Close photo viewer"
                    className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/60 text-white transition-colors hover:bg-black/80"
                  >
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </Dialog.Close>

                <div
                  className="relative h-[75vh] w-full max-w-5xl"
                  style={{ maxWidth: lightboxWidth(current) }}
                >
                  {/*
                    The thumbnail, blurred, underneath the real thing.

                    The full-size image is a different optimizer URL from the
                    grid tile, so opening a photo the optimizer has not
                    transcoded yet measured 2.6s of empty black rectangle with
                    nothing on screen but the counter. Requesting the grid's
                    exact `sizes` string here means this one is already in the
                    browser cache and paints immediately, so the lightbox always
                    shows the right photo and simply gets sharper.
                  */}
                  <Image
                    key={`preview-${current.src}`}
                    src={current.src}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes={GRID_SIZES}
                    className={cn(
                      'scale-105 object-contain blur-lg transition-opacity duration-300',
                      // Faded out once the real one is up, or its blur haloes
                      // around the sharp edges for as long as the photo is open.
                      loaded ? 'opacity-0' : 'opacity-100',
                    )}
                  />
                  <Image
                    key={current.src}
                    src={current.src}
                    alt={current.alt}
                    fill
                    sizes={`(max-width: ${lightboxWidth(current)}px) 100vw, ${lightboxWidth(current)}px`}
                    onLoad={() => setLoaded(true)}
                    className={cn(
                      'object-contain transition-opacity duration-300',
                      loaded ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </div>

                <div className="mt-4 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous photo"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/60 text-white transition-colors hover:bg-black/80"
                  >
                    <ChevronLeft className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Announced on change so the count is not sighted-only. */}
                  <p aria-live="polite" className="min-w-[6rem] text-center text-caption text-white">
                    {(active ?? 0) + 1} of {items.length}
                  </p>

                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next photo"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/60 text-white transition-colors hover:bg-black/80"
                  >
                    <ChevronRight className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <p className="mt-3 max-w-2xl px-4 text-center text-caption text-white/80">
                  {current.alt}
                </p>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
