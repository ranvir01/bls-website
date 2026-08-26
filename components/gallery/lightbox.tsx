'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import { BLUR_TINT, brandBlur, imgurLoader, isImgur } from '@/lib/imgur';

export interface LightboxItem {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
}

/**
 * Full-screen photo viewer.
 *
 * Built on Radix Dialog rather than a lightbox package. Dialog is already in the
 * bundle for the quote modal and the mobile drawer, and it brings the four
 * things that are actually hard: a real focus trap, scroll lock, Escape, and
 * correct aria wiring. What is left — arrow keys, swipe, and a counter — is
 * about sixty lines, and doing it here means the viewer matches the rest of the
 * site instead of arriving with its own opinions about type and colour.
 *
 * Navigation wraps in both directions. At the end of a 46-photo gallery,
 * pressing Right to get back to the start is what people expect; making them
 * press Left forty-five times is not a design decision, it is an oversight.
 */
export function Lightbox({
  items,
  index,
  onIndexChange,
  onClose,
}: {
  items: LightboxItem[];
  /** Null closes the viewer. */
  index: number | null;
  onIndexChange: (next: number) => void;
  onClose: () => void;
}) {
  const open = index !== null;
  const current = open ? items[index] : undefined;

  const go = useCallback(
    (delta: number) => {
      if (index === null || items.length === 0) return;
      onIndexChange((index + delta + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, go]);

  // Touch swipe. A 48px threshold is far enough that a slightly diagonal tap
  // does not page the gallery, and short enough to feel responsive.
  const [touchX, setTouchX] = useState<number | null>(null);

  if (!current) return null;

  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink-900/95 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          className="fixed inset-0 z-50 flex flex-col outline-none"
          onTouchStart={(e) => setTouchX(e.touches[0]?.clientX ?? null)}
          onTouchEnd={(e) => {
            if (touchX === null) return;
            const dx = (e.changedTouches[0]?.clientX ?? touchX) - touchX;
            if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
            setTouchX(null);
          }}
        >
          <Dialog.Title className="sr-only">
            {current.title ?? current.alt}
          </Dialog.Title>
          <Dialog.Description className="sr-only">
            Photo {(index ?? 0) + 1} of {items.length}. Use the left and right arrow keys to move
            between photos, or press Escape to close.
          </Dialog.Description>

          {/* Top bar */}
          <div className="flex items-center justify-between gap-4 px-4 py-3 text-white sm:px-6">
            <span className="text-caption tabular-nums text-white/70">
              {(index ?? 0) + 1} / {items.length}
            </span>
            <Dialog.Close
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close photo viewer"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </Dialog.Close>
          </div>

          {/* Stage */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16">
            <div className="relative h-full w-full">
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                loader={isImgur(current.src) ? imgurLoader : undefined}
                placeholder="blur"
                blurDataURL={brandBlur(BLUR_TINT.lightbox)}
                className="object-contain"
              />
            </div>

            {items.length > 1 && (
              <>
                <NavButton side="left" onClick={() => go(-1)} />
                <NavButton side="right" onClick={() => go(1)} />
              </>
            )}
          </div>

          {/* Caption */}
          {(current.title || current.caption) && (
            <div className="mx-auto w-full max-w-3xl px-6 pb-8 pt-4 text-center">
              {current.title && (
                <p className="text-body-lg font-semibold text-white">{current.title}</p>
              )}
              {current.caption && (
                <p className="mt-1.5 text-caption leading-relaxed text-white/70">{current.caption}</p>
              )}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function NavButton({ side, onClick }: { side: 'left' | 'right'; onClick: () => void }) {
  const Icon = side === 'left' ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === 'left' ? 'Previous photo' : 'Next photo'}
      className={[
        'absolute top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center',
        'rounded-full border border-white/25 bg-ink-900/60 text-white backdrop-blur-sm',
        'transition-colors hover:border-white/60 hover:bg-ink-900/80',
        side === 'left' ? 'left-2 sm:left-4' : 'right-2 sm:right-4',
      ].join(' ')}
    >
      <Icon className="h-6 w-6" aria-hidden="true" />
    </button>
  );
}
