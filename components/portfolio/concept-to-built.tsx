import Image from 'next/image';
import Link from 'next/link';

import { AiConceptBadge } from '@/components/ai-concept-badge';
import type { Project } from '@/data/types';
import { cityBySlug, serviceBySlug } from '@/data/taxonomy';

/**
 * Phase 6E — "From concept to built".
 *
 * The AI render on the left, the real finished photograph on the right, both
 * labeled. This is the most persuasive asset a contractor can own: verifiable
 * evidence that what the visualizer shows is what the crew actually delivers.
 *
 * The plumbing ships now and the section renders nothing until the first real
 * pair exists — projects carry `originatedFromRender` so a completed job can be
 * linked back to the render that generated the lead.
 */
export function ConceptToBuiltGallery({ projects }: { projects: Project[] }) {
  if (!projects.length) return null;

  return (
    <section className="border-y border-ink-200 bg-white">
      <div className="shell section">
        <div className="max-w-prose">
          <p className="text-caption font-semibold uppercase tracking-wide text-brand-600">Proof</p>
          <h2 className="mt-2 text-h2">From concept to built</h2>
          <p className="mt-4 text-body-lg text-ink-500">
            The design the visualizer produced, next to the finished job — same yard, same camera
            position. This is what &ldquo;a design we build&rdquo; means in practice.
          </p>
        </div>

        <ul className="mt-12 space-y-14">
          {projects.map((project) => {
            const service = serviceBySlug.get(project.serviceSlug);
            const city = cityBySlug.get(project.citySlug);

            return (
              <li key={project.slug}>
                <div className="grid gap-4 md:grid-cols-2">
                  <figure className="relative">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-ink-200 bg-ink-200">
                      <Image
                        src={project.before.src}
                        alt={project.before.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="img-grade object-cover"
                      />
                      <div className="absolute inset-x-3 bottom-3">
                        <AiConceptBadge />
                      </div>
                    </div>
                    <figcaption className="mt-2 text-caption font-semibold uppercase tracking-wide text-ink-500">
                      The concept
                    </figcaption>
                  </figure>

                  <figure>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-ink-200 bg-ink-200">
                      <Image
                        src={project.after.src}
                        alt={project.after.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="img-grade object-cover"
                      />
                      <span className="absolute bottom-3 right-3 rounded-sm bg-brand-600 px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white">
                        Built — real photo
                      </span>
                    </div>
                    <figcaption className="mt-2 text-caption font-semibold uppercase tracking-wide text-ink-500">
                      The finished job
                    </figcaption>
                  </figure>
                </div>

                <div className="mt-5 flex flex-wrap items-baseline justify-between gap-3">
                  <div>
                    <h3 className="text-h3">
                      <Link href={`/portfolio/${project.slug}`} className="hover:text-brand-600">
                        {project.title}
                      </Link>
                    </h3>
                    <p className="mt-1 text-caption text-ink-500">
                      {[service?.name, city?.name, project.timeline].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="text-body font-medium text-brand-600 underline underline-offset-4"
                  >
                    See the scope
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
