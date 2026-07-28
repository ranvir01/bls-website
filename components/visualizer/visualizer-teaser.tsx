import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

/**
 * Inline entry point to the yard visualizer.
 *
 * Every headline here carries the design-build message deliberately: the render
 * is not a mood board, it is a proposal from the crew that will build it. That
 * framing is the whole reason the tool converts rather than just entertaining.
 */
export function VisualizerTeaser({
  headline = 'Design your yard. Same crew builds it.',
  body = 'Upload a photo, pick a style, and see your yard rebuilt with materials we actually install and stock locally. Free, instant, no account.',
  cta = 'See your yard redesigned',
}: {
  headline?: string;
  body?: string;
  cta?: string;
}) {
  return (
    <section className="overflow-hidden rounded-sm border border-moss-700/25 bg-moss-100/40">
      <div className="grid gap-6 p-7 md:grid-cols-[1fr_auto] md:items-center md:gap-10 md:p-10">
        <div>
          <p className="inline-flex items-center gap-1.5 text-caption font-semibold uppercase tracking-wide text-clay-600">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Yard visualizer
          </p>
          <h2 className="mt-2 text-h3 md:text-h2">{headline}</h2>
          <p className="mt-3 max-w-prose text-body-lg text-stone-800">{body}</p>
        </div>
        <Link
          href="/visualizer"
          className="inline-flex min-h-[48px] items-center justify-center gap-2 self-start rounded-sm bg-clay-600 px-7 text-body font-semibold text-white transition-colors hover:bg-clay-600/90 md:self-center"
        >
          {cta}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
