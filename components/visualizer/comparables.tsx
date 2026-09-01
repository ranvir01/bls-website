import Link from 'next/link';

import { ProjectCard } from '@/components/portfolio/project-grid';
import { comparableJobs } from '@/lib/comparable-jobs';

/**
 * Real jobs that match the selected visualizer scope.
 *
 * These are photographs, not AI. They are the honest preview of what this
 * crew builds, and they work whether or not an image provider is configured.
 */
export function VisualizerComparables({
  scopeId,
  compact = false,
}: {
  scopeId: string;
  compact?: boolean;
}) {
  const jobs = comparableJobs(scopeId, compact ? 2 : 3);
  if (!jobs.length) return null;

  return (
    <section>
      <h3 className={compact ? 'text-body font-semibold text-brand-900' : 'text-h3'}>
        Jobs we actually built like this
      </h3>
      <p className="mt-2 max-w-prose text-caption text-ink-500">
        Photographs of our work, not a mockup. That is the honest look at what
        we install around Kent and Greater Seattle.
      </p>
      <ul className={`mt-4 grid gap-4 ${compact ? 'grid-cols-1' : 'sm:grid-cols-3'}`}>
        {jobs.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
      <p className="mt-3">
        <Link
          href="/portfolio"
          className="text-caption font-semibold text-brand-600 underline underline-offset-4"
        >
          See the rest of the work
        </Link>
      </p>
    </section>
  );
}
