import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { BeforeAfter } from '@/components/before-after';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { CheckList, CtaBand, LinkCluster } from '@/components/blocks';
import { JsonLd } from '@/components/json-ld';
import { ProjectGrid } from '@/components/portfolio/project-grid';
import { portfolioProjects, projects } from '@/data/projects';
import { cityBySlug, cityPath, serviceBySlug, servicePath } from '@/data/taxonomy';
import { breadcrumbSchema, buildMetadata, graph, localBusinessSchema } from '@/lib/seo';

interface Params {
  params: { project: string };
}

export function generateStaticParams() {
  return portfolioProjects().map((p) => ({ project: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const project = projects.find((p) => p.slug === params.project);
  if (!project) return {};

  const service = serviceBySlug.get(project.serviceSlug);
  const city = cityBySlug.get(project.citySlug);

  return buildMetadata({
    title: project.title,
    description: `${service?.name ?? 'Project'} completed in ${city?.name ?? 'the Puget Sound region'}. ${project.caption}`,
    path: `/portfolio/${project.slug}`,
    image: project.after.src,
  });
}

export default function ProjectPage({ params }: Params) {
  const project = projects.find((p) => p.slug === params.project);
  if (!project) notFound();

  // A concept render must never be presented as completed work, even if
  // someone adds one to the projects array by mistake.
  if (project.assetType === 'concept-render') notFound();

  const service = serviceBySlug.get(project.serviceSlug);
  const city = cityBySlug.get(project.citySlug);
  const path = `/portfolio/${project.slug}`;

  const similar = portfolioProjects()
    .filter((p) => p.slug !== project.slug && p.serviceSlug === project.serviceSlug)
    .slice(0, 2);

  const crumbs = [
    { name: 'Portfolio', path: '/portfolio' },
    { name: project.title, path },
  ];

  return (
    <>
      <JsonLd
        data={graph([
          localBusinessSchema({ path, areaServed: city ? [city.name] : undefined }),
          breadcrumbSchema([{ name: 'Home', path: '/' }, ...crumbs]),
        ])}
      />

      <Breadcrumbs crumbs={crumbs} />

      <article className="shell pb-16 pt-8">
        <header className="max-w-3xl">
          <p className="eyebrow text-brand-600">
            {[service?.name, city?.name].filter(Boolean).join(' · ')}
          </p>
          <h1 className="mt-2 text-h1">{project.title}</h1>
          <p className="mt-4 text-body-lg text-ink-500">{project.caption}</p>
        </header>

        <div className="mt-10">
          <BeforeAfter
            before={project.before}
            after={project.after}
            caption={`${project.title} — ${project.timeline}`}
          />
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <div className="min-w-0 space-y-12 lg:col-span-8">
            <section>
              <h2 className="text-h2">The problem</h2>
              <p className="mt-4 max-w-prose text-body-lg text-ink-800">{project.challenge}</p>
            </section>

            <section>
              <h2 className="text-h2">What we did</h2>
              <p className="mt-4 max-w-prose text-body-lg text-ink-800">{project.solution}</p>
              <div className="mt-6">
                <CheckList items={project.scope} columns={2} />
              </div>
            </section>

            {project.clientQuote && (
              <blockquote className="border-l-2 border-leaf-600 bg-white py-5 pl-6 pr-5">
                <p className="text-body-lg text-ink-800">
                  &ldquo;{project.clientQuote.text}&rdquo;
                </p>
                <footer className="mt-3 text-caption text-ink-500">
                  — {project.clientQuote.attribution}
                </footer>
              </blockquote>
            )}
          </div>

          <aside className="lg:col-span-4">
            <dl className="space-y-4 rounded-sm border border-ink-200 bg-white p-6">
              <Row label="Service">
                {service ? (
                  <Link href={servicePath(service.slug)} className="text-brand-600 underline underline-offset-4">
                    {service.name}
                  </Link>
                ) : (
                  '—'
                )}
              </Row>
              <Row label="Location">
                {city ? (
                  <Link href={cityPath(city.slug)} className="text-brand-600 underline underline-offset-4">
                    {city.name}, WA
                  </Link>
                ) : (
                  '—'
                )}
              </Row>
              <Row label="Timeline">{project.timeline}</Row>
              <Row label="Completed">{formatMonth(project.completedAt)}</Row>
              <Row label="Materials">
                <ul className="space-y-1">
                  {project.materials.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </Row>
            </dl>
          </aside>
        </div>

        <div className="mt-16">
          <ProjectGrid projects={similar} heading="Similar projects" />
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          <LinkCluster
            title="Explore"
            links={[
              ...(service ? [{ label: `${service.name} — details & cost`, href: servicePath(service.slug) }] : []),
              ...(city ? [{ label: `Landscaping in ${city.name}`, href: cityPath(city.slug) }] : []),
              { label: 'All projects', href: '/portfolio' },
            ]}
          />
        </div>
      </article>

      <CtaBand />
    </>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="eyebrow text-ink-500">{label}</dt>
      <dd className="mt-1 text-body text-brand-900">{children}</dd>
    </div>
  );
}

function formatMonth(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
}

export const dynamicParams = false;
