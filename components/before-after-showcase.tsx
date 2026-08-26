import { BeforeAfter } from '@/components/before-after';
import { beforeAfterPairs } from '@/data/work-photos';

/** Homepage / portfolio strip of the original before-and-after pairs. */
export function BeforeAfterShowcase({ limit = 3 }: { limit?: number }) {
  const pairs = beforeAfterPairs.slice(0, limit);
  if (!pairs.length) return null;

  return (
    <div className="grid gap-8 md:grid-cols-3">
      {pairs.map((pair, i) => (
        <BeforeAfter
          key={pair.after.src}
          before={pair.before}
          after={pair.after}
          caption={`Before and after ${i + 1} — a Blue Landscaping job in Greater Seattle.`}
        />
      ))}
    </div>
  );
}
