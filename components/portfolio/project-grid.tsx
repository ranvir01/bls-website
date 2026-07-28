import Image from 'next/image';
import Link from 'next/link';

import type { Project } from '@/data/types';
import { cityBySlug, serviceBySlug } from '@/data/taxonomy';

/**
 * Project grid.
 *
 * Phase 4 empty-state rule: with no projects it renders NOTHING — not a
 * placeholder, not a "coming soon", not a stock photo. Every consumer of this
 * component can therefore drop it in unconditionally and trust that the
 * section simply disappears until real photography exists.
 */
export function ProjectGrid({
  projects,
  heading,
  emptyFallback = null,
}: {
  projects: Project[];
  heading?: string;
  emptyFallback?: React.ReactNode;
}) {
  if (!projects.length) return <>{emptyFallback}</>;

  return (
    <section>
      {heading && <h2 className="text-h2">{heading}</h2>}
      <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const service = serviceBySlug.get(project.serviceSlug);
  const city = cityBySlug.get(project.citySlug);

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group block overflow-hidden rounded-sm border border-stone-200 bg-white transition-shadow hover:shadow-card"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
        <Image
          src={project.after.src}
          alt={project.after.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="img-grade object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        />
      </div>
      <div className="p-5">
        <h3 className="text-body-lg font-semibold text-stone-950 group-hover:text-moss-700">
          {project.title}
        </h3>
        <p className="mt-1 text-caption text-stone-500">
          {[service?.name, city?.name].filter(Boolean).join(' · ')}
        </p>
      </div>
    </Link>
  );
}
