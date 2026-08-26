import { Sparkles } from 'lucide-react';

import { cn } from '@/lib/utils';

/**
 * Phase 5 / 6D — the mandatory label on every AI-generated design concept.
 *
 * This is a component requirement, not a copy suggestion. Any image whose
 * `assetType` is 'concept-render' must render this badge, visibly and
 * permanently. It never appears in /portfolio, because renders never appear in
 * /portfolio.
 *
 * The wording claims buildability and declines to claim it is a photo — which
 * is both true and a stronger sell than a bare disclaimer, because it signals
 * construction knowledge rather than legal throat-clearing.
 */
export function AiConceptBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-sm bg-brand-900/85 px-2.5 py-1.5 text-[11px] font-medium leading-tight text-white backdrop-blur-sm',
        className,
      )}
    >
      <Sparkles className="h-3.5 w-3.5 shrink-0 text-leaf-400" aria-hidden="true" />
      AI design concept — a design we build, not a photo of completed work
    </span>
  );
}

/** The longer framing, used under a render rather than on top of it. */
export function AiConceptNote({ className }: { className?: string }) {
  return (
    <p className={cn('text-caption text-ink-500', className)}>
      Everything shown here is built from materials we install and stock locally. Final layout is
      confirmed at your free on-site walkthrough — grading, drainage, permits and plant availability
      can shift the details.
    </p>
  );
}
