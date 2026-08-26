'use client';

import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import { ProjectCard } from '@/components/portfolio/project-grid';
import { cityBySlug, serviceBySlug } from '@/data/taxonomy';
import type { Project } from '@/data/types';
import { ease } from '@/lib/motion';
import { cn } from '@/lib/utils';

/**
 * Filterable portfolio.
 *
 * Filter state lives in the URL, not in component state, so a filtered view is
 * shareable, bookmarkable and crawlable. Cards use `layoutId` so filtering
 * reflows them smoothly instead of snapping.
 */
export function PortfolioBrowser({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const reduced = useReducedMotion();

  const activeService = params.get('service') ?? '';
  const activeCity = params.get('city') ?? '';

  // Only offer filters that would actually return something.
  const serviceOptions = useMemo(() => {
    const slugs = Array.from(new Set(projects.map((p) => p.serviceSlug)));
    return slugs
      .map((slug) => serviceBySlug.get(slug))
      .filter((s): s is NonNullable<typeof s> => Boolean(s));
  }, [projects]);

  const cityOptions = useMemo(() => {
    const slugs = Array.from(new Set(projects.map((p) => p.citySlug)));
    return slugs
      .map((slug) => cityBySlug.get(slug))
      .filter((c): c is NonNullable<typeof c> => Boolean(c));
  }, [projects]);

  const filtered = useMemo(
    () =>
      projects.filter(
        (p) =>
          (!activeService || p.serviceSlug === activeService) &&
          (!activeCity || p.citySlug === activeCity),
      ),
    [projects, activeService, activeCity],
  );

  const setFilter = useCallback(
    (key: 'service' | 'city', value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value) next.set(key, value);
      else next.delete(key);

      const qs = next.toString();
      router.replace(qs ? `/portfolio?${qs}` : '/portfolio', { scroll: false });
    },
    [params, router],
  );

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="space-y-4">
        <FilterRow
          label="Service"
          value={activeService}
          options={serviceOptions.map((s) => ({ value: s.slug, label: s.name }))}
          onChange={(v) => setFilter('service', v)}
        />
        <FilterRow
          label="City"
          value={activeCity}
          options={cityOptions.map((c) => ({ value: c.slug, label: c.name }))}
          onChange={(v) => setFilter('city', v)}
        />
      </div>

      <p className="mt-6 text-caption text-ink-500" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-8 rounded-sm border border-ink-200 bg-white p-6 text-body text-ink-500">
          Nothing matches that combination yet. Clear a filter to see everything.
        </p>
      ) : (
        <>
        {/* The cards are h3. Without an h2 between them and the page's h1 the
            outline skips a level, which is exactly the kind of thing a screen
            reader user navigates by. Visually redundant, so sr-only. */}
        <h2 className="sr-only">Completed projects</h2>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <m.li
              key={project.slug}
              layout={!reduced}
              layoutId={reduced ? undefined : project.slug}
              transition={{ duration: reduced ? 0 : 0.3, ease: ease.out }}
            >
              <ProjectCard project={project} />
            </m.li>
          ))}
        </ul>
        </>
      )}
    </LazyMotion>
  );
}

function FilterRow({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  if (options.length < 2) return null;

  return (
    <fieldset className="flex flex-wrap items-center gap-2">
      <legend className="sr-only">Filter by {label.toLowerCase()}</legend>
      <span aria-hidden="true" className="mr-1 eyebrow text-ink-500">
        {label}
      </span>
      <Chip active={!value} onClick={() => onChange('')}>
        All
      </Chip>
      {options.map((option) => (
        <Chip key={option.value} active={value === option.value} onClick={() => onChange(option.value)}>
          {option.label}
        </Chip>
      ))}
    </fieldset>
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
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        // 44px, not 40. Below that these are a coin-flip to tap on a phone,
        // and they are the only way to filter this page.
        'min-h-[44px] rounded-sm border px-3.5 text-caption transition-colors',
        active
          ? 'border-brand-600 bg-brand-50/60 font-semibold text-brand-900'
          : 'border-ink-200 bg-white text-ink-800 hover:border-ink-500',
      )}
    >
      {children}
    </button>
  );
}
