'use client';

import { useCallback, useRef, useState } from 'react';

import { AiConceptBadge } from '@/components/ai-concept-badge';
import { cn } from '@/lib/utils';

/**
 * Slider between the homeowner's upload and either an AI concept or a real job.
 *
 * Data URLs cannot go through next/image, so this is a raw <img> sibling of
 * `BeforeAfter` — same interaction, honest labels. The right side is never
 * implied to be their house unless it is a labeled AI render of that photo.
 */
export function YardCompare({
  beforeSrc,
  afterSrc,
  afterKind,
  afterAlt,
  caption,
}: {
  beforeSrc: string;
  afterSrc: string;
  afterKind: 'ai' | 'job';
  afterAlt: string;
  caption: string;
}) {
  const [position, setPosition] = useState(52);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const setFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
      setDragging(true);
      setFromClientX(e.clientX);
    },
    [setFromClientX],
  );

  return (
    <figure>
      <div
        ref={containerRef}
        className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-sm border border-ink-200 bg-ink-200"
        onPointerDown={onPointerDown}
        onPointerMove={(e) => dragging && setFromClientX(e.clientX)}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={afterSrc} alt={afterAlt} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={beforeSrc}
            alt="Your yard today"
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
        </div>

        <span className="pointer-events-none absolute left-3 top-3 rounded-sm bg-brand-900/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
          Your yard
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-sm bg-brand-900/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
          {afterKind === 'ai' ? 'AI concept' : 'A job we built'}
        </span>

        {afterKind === 'ai' && (
          <div className="pointer-events-none absolute inset-x-3 bottom-3 flex justify-end">
            <AiConceptBadge />
          </div>
        )}

        <div className="absolute inset-y-0 w-0.5 bg-white" style={{ left: `${position}%` }}>
          <button
            type="button"
            role="slider"
            aria-label="Comparison position"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(position)}
            aria-orientation="horizontal"
            className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-ink-200 bg-white"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-ink-800" aria-hidden="true" fill="currentColor">
              <path d="M9.5 7 5 12l4.5 5V7Zm5 0v10l4.5-5-4.5-5Z" />
            </svg>
          </button>
        </div>
      </div>
      <figcaption className={cn('mt-3 text-caption text-ink-500')}>{caption}</figcaption>
    </figure>
  );
}
