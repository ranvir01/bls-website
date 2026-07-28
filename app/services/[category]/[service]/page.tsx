import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/breadcrumbs';
import {
  CheckList,
  CostTable,
  CtaBand,
  FaqList,
  LinkCluster,
  ProcessSteps,
  Prose,
  QuickAnswer,
  SectionHeader,
} from '@/components/blocks';
import { JsonLd } from '@/components/json-ld';
import { Reveal } from '@/components/motion/reveal';
import { ProjectGrid } from '@/components/portfolio/project-grid';
import { QuoteForm } from '@/components/quote/quote-form';
import { VisualizerTeaser } from '@/components/visualizer/visualizer-teaser';
import { getServiceContent, serviceContent } from '@/data/content/services';
import { postsForService } from '@/data/content/blog';
import { projectsForService } from '@/data/projects';
import {
  categoryBySlug,
  cities,
  cityPath,
  serviceBySlug,
  servicePath,
  services,
  serviceCityPairs,
  serviceCityPath,
} from '@/data/taxonomy';
import {
  breadcrumbSchema,
  buildMetadata,
  faqSchema,
  graph,
  localBusinessSchema,
  serviceSchema,
} from '@/lib/seo';

interface Params {
  params: { category: string; service: string };
}

/** Every service page is statically generated at build time. */
export function generateStaticParams() {
  return services.map((s) => ({ category: s.category, service: s.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const content = getServiceContent(params.service);
  const ref = serviceBySlug.get(params.service);
  if (!content || !ref || ref.category !== params.category) return {};

  return buildMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: servicePath(content.slug),
  });
}

export default function ServicePage({ params }: Params) {
  const content = getServiceContent(params.service);
  const ref = serviceBySlug.get(params.service);

  // Guard the category too: /services/irrigation/paver-patios must 404 rather
  // than render the patio page at a second URL and split its ranking signal.
  if (!content || !ref || ref.category !== params.category) notFound();

  const category = categoryBySlug.get(ref.category)!;
  const path = servicePath(content.slug);

  const related = content.relatedServices
    .map((slug) => serviceBySlug.get(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
    .map((s) => ({ label: s.name, href: servicePath(s.slug) }));

  // Cities where this exact service has a dedicated page, then top primary
  // cities as a fallback, so every service page links out to 6 locations.
  const dedicatedCityLinks = serviceCityPairs
    .filter((p) => p.serviceSlug === content.slug)
    .slice(0, 6)
    .map((p) => ({
      label: `${ref.name} in ${cities.find((c) => c.slug === p.citySlug)?.name ?? p.citySlug}`,
      href: serviceCityPath(p.citySlug, p.serviceSlug),
    }));

  const cityLinks = dedicatedCityLinks.length
    ? dedicatedCityLinks
    : cities
        .filter((c) => c.tier === 'primary')
        .slice(0, 6)
        .map((c) => ({ label: c.name, href: cityPath(c.slug) }));

  const posts = postsForService(content.slug);
  const serviceProjects = projectsForService(content.slug);

  const crumbs = [
    { name: 'Services', path: '/services' },
    { name: category.name, path: `/services/${category.slug}` },
    { name: ref.name, path },
  ];

  return (
    <>
      <JsonLd
        data={graph([
          serviceSchema({
            name: ref.name,
            description: content.metaDescription,
            path,
            areaServed: cities.map((c) => c.name),
          }),
          localBusinessSchema({ path }),
          faqSchema(content.faqs),
          breadcrumbSchema([{ name: 'Home', path: '/' }, ...crumbs]),
        ])}
      />

      <Breadcrumbs crumbs={crumbs} />

      <article>
        <header className="shell pt-8">
          <p className="text-caption font-semibold uppercase tracking-wide text-moss-700">
            {category.name}
          </p>
          <h1 className="mt-2 max-w-4xl text-h1">{content.h1}</h1>
          <QuickAnswer>{content.quickAnswer}</QuickAnswer>
        </header>

        {/* Editorial 12-col split: prose left, sticky quote form right. Avoids
            the centered-everything look every competitor template has. */}
        <div className="shell grid gap-12 pb-16 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-14 lg:col-span-7 xl:col-span-8">
            <Reveal>
              <Prose paragraphs={content.intro} />
            </Reveal>

            <Reveal as="section">
              <h2 className="text-h2">What&rsquo;s included</h2>
              <div className="mt-6">
                <CheckList items={content.included} columns={2} />
              </div>
            </Reveal>

            <Reveal as="section">
              <h2 className="text-h2">Materials we use</h2>
              <div className="mt-6">
                <CheckList items={content.materials} columns={2} />
              </div>
            </Reveal>

            <Reveal as="section">
              <h2 className="text-h2">How the build runs</h2>
              <div className="mt-6">
                <ProcessSteps steps={content.process} />
              </div>
              <p className="mt-6 max-w-prose text-body text-stone-500">{content.timeline}</p>
            </Reveal>

            <Reveal as="section">
              <h2 className="text-h2">What it costs</h2>
              <p className="mt-3 max-w-prose text-body-lg text-stone-500">
                Real installed ranges for the Puget Sound market, published so you can plan before
                anyone visits.
              </p>
              <div className="mt-6">
                <CostTable
                  rows={content.costRows}
                  note={content.costNote}
                  caption={`Typical installed cost ranges for ${ref.name.toLowerCase()}`}
                />
              </div>
            </Reveal>

            <Reveal as="section">
              <h2 className="text-h2">Building this in the Pacific Northwest</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {content.pnwConsiderations.map((item) => (
                  <div key={item.title} className="rounded-sm border border-stone-200 bg-white p-5">
                    <h3 className="text-body-lg font-semibold text-stone-950">{item.title}</h3>
                    <p className="mt-2 text-body text-stone-500">{item.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Renders nothing until real project photography exists. */}
            <ProjectGrid
              projects={serviceProjects}
              heading={`Recent ${ref.name.toLowerCase()} projects`}
            />

            <Reveal as="section">
              <FaqList faqs={content.faqs} title={`${ref.name}: common questions`} />
            </Reveal>
          </div>

          <aside className="lg:col-span-5 xl:col-span-4">
            <div className="lg:sticky lg:top-28">
              <QuoteForm defaultProjectType={quoteTypeFor(content.slug)} />
            </div>
          </aside>
        </div>

        {ref.category === 'hardscaping' && (
          <div className="shell pb-16">
            <VisualizerTeaser
              headline="Not sure what you want? Design it here in 30 seconds."
              body="Upload a photo of your yard, pick a style, and see it rebuilt with the materials we actually install. Then we build it — same crew."
            />
          </div>
        )}

        {/* Internal linking web: every service page links to its category, its
            siblings, the cities it serves, related reading and the portfolio. */}
        <section className="border-t border-stone-200 bg-white">
          <div className="shell section-tight grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <LinkCluster
              title="Related services"
              links={[{ label: `All ${category.name.toLowerCase()}`, href: `/services/${category.slug}` }, ...related]}
              columns={2}
            />
            <LinkCluster title="Where we build it" links={cityLinks} columns={2} />
            {posts.length > 0 && (
              <LinkCluster
                title="Worth reading"
                links={posts.map((p) => ({ label: p.title, href: `/blog/${p.slug}` }))}
                columns={2}
              />
            )}
            <div>
              <h2 className="text-h3">See the work</h2>
              <p className="mt-3 text-body text-stone-500">
                Real projects, filterable by service and city.
              </p>
              <Link
                href={`/portfolio?service=${content.slug}`}
                className="mt-4 inline-flex text-body font-medium text-moss-700 underline underline-offset-4"
              >
                View {ref.name.toLowerCase()} projects
              </Link>
            </div>
          </div>
        </section>
      </article>

      <CtaBand
        title={`Get a real number for your ${ref.name.toLowerCase()}`}
        body="Free on-site walkthrough, a written scope, and a range you can plan around."
      />
    </>
  );
}

/**
 * Map a service slug onto the quote form's project-type options so the form
 * arrives pre-selected. Anything without a direct card falls through to
 * "Something else" rather than silently selecting the wrong option.
 */
function quoteTypeFor(slug: string): string {
  const direct = ['paver-patios', 'retaining-walls', 'sprinkler-installation', 'lawn-maintenance', 'planting-design'];
  if (direct.includes(slug)) return slug;
  if (slug === 'sprinkler-repair' || slug === 'irrigation-maintenance') return 'sprinkler-installation';
  if (slug === 'sod-installation') return 'planting-design';
  return 'other';
}

export const dynamicParams = false;

/** Exposed for the link checker's coverage assertion. */
export const __serviceCount = Object.keys(serviceContent).length;
