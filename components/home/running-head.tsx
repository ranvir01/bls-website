import { cn } from '@/lib/utils';

/**
 * The numbered hairline above each homepage section.
 *
 * A small thing that does a specific job: it tells someone scrolling a very
 * long page where they are in it, and it gives the page a spine that repeated
 * `<h2>`s alone do not. Sequential numbering also happens to be something a
 * template cannot produce, because it requires knowing the actual structure of
 * this particular page — which is the point. The device is borrowed from
 * editorial layout and from how architecture practices index built work.
 *
 * The number is decorative for a screen reader — the heading underneath
 * already names the section — so it is hidden from the accessibility tree
 * rather than read out as "zero two".
 */
export function RunningHead({
  index,
  label,
  tone = 'light',
  className,
}: {
  /** 1-based. Rendered zero-padded. */
  index: number;
  label: string;
  tone?: 'light' | 'dark';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'border-t pt-4',
        tone === 'dark' ? 'border-white/20' : 'border-ink-200',
        className,
      )}
    >
      <p className={cn('eyebrow', tone === 'dark' ? 'text-sky-300' : 'text-ink-500')}>
        <span className="nums" aria-hidden="true">
          {String(index).padStart(2, '0')}
        </span>
        <span aria-hidden="true"> — </span>
        {label}
      </p>
    </div>
  );
}
