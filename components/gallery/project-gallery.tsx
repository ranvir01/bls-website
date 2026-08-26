'use client';

import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Lightbox, type LightboxItem } from '@/components/gallery/lightbox';
import { Photo } from '@/components/gallery/photo';
import { featuredProjects, projectTags } from '@/data/media';
import { servicePath } from '@/data/taxonomy';
import { cn } from '@/lib/utils';

/**
 * The titled project gallery.
 *
 * Filtering is client-side over a fixed fourteen-item array, so it is instant
 * and there is nothing to fetch. Both controls are optional and additive: the
 * search box matches title, description and tags; the tag chips narrow further.
 *
 * The grid is uniform rather than masonry on purpose. Masonry looks good with
 * a curated set of consistent photographs and looks chaotic with phone photos
 * shot over ten years in different aspect ratios, which is what this is. A
 * fixed 4:3 frame with `object-cover` gives the page a spine, and the lightbox
 * shows each photo whole with `object-contain` for anyone who wants detail.
 */
export function ProjectGallery({
  limit,
  showFilters = true,
  heading,
  lead,
}: {
  /** Cap the number of cards — used for the homepage teaser. */
  limit?: number;
  showFilters?: boolean;
  heading?: string;
  lead?: string;
}) {
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState<string | null>(null);
  const [index, setIndex] = useState<number | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = featuredProjects.filter((p) => {
      const matchesTag = tag ? p.tags.includes(tag) : true;
      if (!matchesTag) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
    return limit ? filtered.slice(0, limit) : filtered;
  }, [query, tag, limit]);

  const lightboxItems: LightboxItem[] = visible.map((p) => ({
    src: p.src,
    alt: p.title,
    title: p.title,
    caption: p.description,
  }));

  return (
    <div>
      {(heading || lead) && (
        <div className="max-w-prose">
          {heading && <h2 className="text-h2">{heading}</h2>}
          {lead && <p className="mt-4 text-body-lg text-ink-500">{lead}</p>}
        </div>
      )}

      {showFilters && (
        <div className="mt-8 space-y-4">
          <div className="relative max-w-md">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects"
              aria-label="Search projects"
              className="h-12 w-full rounded-lg border border-ink-200 bg-white pl-10 pr-4 text-body text-ink-900 placeholder:text-ink-400 focus-visible:border-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/30"
            />
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by type of work">
            <Chip active={tag === null} onClick={() => setTag(null)}>
              All work
            </Chip>
            {projectTags.map((t) => (
              <Chip key={t} active={tag === t} onClick={() => setTag(tag === t ? null : t)}>
                {t}
              </Chip>
            ))}
          </div>
        </div>
      )}

      {visible.length === 0 ? (
        <p className="mt-10 rounded-lg border border-ink-200 bg-white p-8 text-body text-ink-500">
          Nothing matches that. Clear the search, or{' '}
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setTag(null);
            }}
            className="font-semibold text-brand-700 underline underline-offset-4"
          >
            show every project
          </button>
          .
        </p>
      ) : (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, i) => (
            <li key={project.title}>
              <article className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-card transition-shadow duration-300 hover:shadow-lifted">
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  className="relative block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-600"
                  aria-label={`View ${project.title} full size`}
                >
                  <Photo
                    src={project.src}
                    alt={project.title}
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw"
                    className="aspect-[4/3] w-full"
                    zoomOnHover
                  />
                </button>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-body-lg font-semibold text-brand-900">{project.title}</h3>
                  <p className="mt-2 flex-1 text-caption leading-relaxed text-ink-500">
                    {project.description}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-700"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={servicePath(project.serviceSlug)}
                    className="mt-4 inline-flex min-h-[44px] items-center gap-1.5 text-caption font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-600"
                  >
                    How we build this
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}

      <Lightbox
        items={lightboxItems}
        index={index}
        onIndexChange={setIndex}
        onClose={() => setIndex(null)}
      />
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'inline-flex min-h-[44px] items-center rounded-full border px-4 text-caption font-semibold transition-colors',
        active
          ? 'border-brand-700 bg-brand-700 text-white'
          : 'border-ink-200 bg-white text-ink-800 hover:border-brand-600 hover:text-brand-700',
      )}
    >
      {children}
    </button>
  );
}
