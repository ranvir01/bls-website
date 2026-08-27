import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';

/**
 * Inline entry point to the yard visualizer.
 *
 * The render uses the same material catalog we install. Keep the pitch short:
 * upload a photo, see options, then talk if you want it built.
 */
export function VisualizerTeaser({
  headline = 'See your yard before anyone digs',
  body = 'Upload a photo, pick a style, and see a written scope plus real jobs like yours — materials we actually install around Kent and Greater Seattle. Free, no account.',
  cta = 'Open the yard visualizer',
}: {
  headline?: string;
  body?: string;
  cta?: string;
}) {
  return (
    <section className="overflow-hidden rounded-sm border border-brand-600/25 bg-brand-50/40">
      <div className="grid gap-6 p-7 md:grid-cols-[1fr_auto] md:items-center md:gap-10 md:p-10">
        <div>
          <p className="inline-flex items-center gap-1.5 eyebrow text-leaf-600">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Yard visualizer
          </p>
          <h2 className="mt-2 text-h3 md:text-h2">{headline}</h2>
          <p className="mt-3 max-w-prose text-body-lg text-ink-800">{body}</p>
        </div>
        <Button asChild size="lg" className="self-start md:self-center">
          <Link href="/visualizer">
            {cta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
