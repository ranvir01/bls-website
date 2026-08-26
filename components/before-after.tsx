'use client';

import Image from 'next/image';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

import type { ImageAsset } from '@/data/types';
import { cn } from '@/lib/utils';

import { AiConceptBadge } from './ai-concept-badge';

/**
 * Draggable before/after comparison slider.
 *
 * Input parity is the point: mouse drag, touch drag, click-to-position, and
 * full keyboard control (arrows ±5%, shift+arrows ±10%, Home/End). The handle
 * is a real `role="slider"` so assistive tech announces the position rather
 * than reporting an undifferentiated image pair.
 *
 * Both layers use next/image with a matched aspect ratio. Neither is `priority`
 * — a comparison slider is never the LCP element on a well-built page.
 */
export function BeforeAfter({
  before,
  after,
  caption,
  className,
  /** Shows the AI badge over the "after" layer when it is a render. */
  showConceptBadge = false,
  initial = 50,
  aspect: aspectOverride,
}: {
  before: ImageAsset;
  after: ImageAsset;
  caption?: string;
  className?: string;
  showConceptBadge?: boolean;
  initial?: number;
  /**
   * Frame aspect ratio, when the pair's intrinsic size is not known — which is
   * the case for every photo hosted remotely. Both layers are `object-cover`,
   * so the frame decides the shape and the photos fill it.
   */
  aspect?: number;
}) {
  const [position, setPosition] = useState(initial);
  const [dragging, setDragging] = useState(false);
  // A remote host is not ours to guarantee. If either layer fails to load, the
  // frame keeps its shape and its colour rather than showing the browser's
  // broken-image glyph with the alt text sprawled across the slider.
  const [broken, setBroken] = useState<{ before: boolean; after: boolean }>({
    before: false,
    after: false,
  });
  const [nudged, setNudged] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const labelId = useId();

  const setFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  // Pointer events cover mouse, touch and pen with one code path.
  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
      setDragging(true);
      setNudged(true);
      setFromClientX(e.clientX);
    },
    [setFromClientX],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging) return;
      setFromClientX(e.clientX);
    },
    [dragging, setFromClientX],
  );

  const endDrag = useCallback(() => setDragging(false), []);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 5;
    let next: number | null = null;

    if (e.key === 'ArrowLeft') next = -step;
    else if (e.key === 'ArrowRight') next = step;
    else if (e.key === 'Home') {
      setPosition(0);
      e.preventDefault();
      return;
    } else if (e.key === 'End') {
      setPosition(100);
      e.preventDefault();
      return;
    }

    if (next !== null) {
      e.preventDefault();
      setNudged(true);
      setPosition((p) => Math.min(100, Math.max(0, p + next!)));
    }
  }, []);

  // One auto-nudge on first view to signal the control is interactive.
  useEffect(() => {
    if (nudged || reduced) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const t1 = setTimeout(() => setPosition(initial + 8), 500);
        const t2 = setTimeout(() => setPosition(initial), 1000);
        return () => {
          clearTimeout(t1);
          clearTimeout(t2);
        };
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [initial, nudged, reduced]);

  const aspect = aspectOverride ?? before.width / before.height;

  return (
    <figure className={cn('w-full', className)}>
      <div
        ref={containerRef}
        className="relative w-full select-none overflow-hidden rounded-lg border border-ink-200 bg-brand-800"
        style={{ aspectRatio: String(aspect) }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {/* After layer — the full-width base */}
        {!broken.after && (
          <Image
            src={after.src}
            alt={after.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1100px"
            onError={() => setBroken((b) => ({ ...b, after: true }))}
            className="img-grade object-cover"
            draggable={false}
          />
        )}

        {/* Before layer — clipped to the handle position */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          {!broken.before && (
            <Image
              src={before.src}
              alt={before.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1100px"
              onError={() => setBroken((b) => ({ ...b, before: true }))}
              className="img-grade object-cover"
              draggable={false}
            />
          )}
        </div>

        <span className="pointer-events-none absolute left-3 top-3 rounded-sm bg-brand-900/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
          Before
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-sm bg-brand-900/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
          After
        </span>

        {showConceptBadge && (
          <div className="pointer-events-none absolute inset-x-3 bottom-3 flex justify-end">
            <AiConceptBadge />
          </div>
        )}

        {/* Divider + handle */}
        <div
          className={cn(
            'absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(16,18,15,0.25)]',
            !dragging && !reduced && 'transition-[left] duration-300 ease-out',
          )}
          style={{ left: `${position}%` }}
        >
          <button
            type="button"
            role="slider"
            aria-label="Comparison position"
            aria-labelledby={labelId}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(position)}
            aria-valuetext={`${Math.round(position)}% before, ${100 - Math.round(position)}% after`}
            aria-orientation="horizontal"
            onKeyDown={onKeyDown}
            className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-ink-200 bg-white shadow-card"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-ink-800" aria-hidden="true" fill="currentColor">
              <path d="M9.5 7 5 12l4.5 5V7Zm5 0v10l4.5-5-4.5-5Z" />
            </svg>
          </button>
        </div>
      </div>

      {caption && (
        <figcaption id={labelId} className="mt-3 text-caption text-ink-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
