import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { CtaBand, QuickAnswer } from '@/components/blocks';
import { JsonLd } from '@/components/json-ld';
import { Reveal } from '@/components/motion/reveal';
import { ServiceArt } from '@/components/service-art';
import { VisualizerTeaser } from '@/components/visualizer/visualizer-teaser';
import { getCategoryContent } from '@/data/content/categories';
import { getServiceContent } from '@/data/content/services';
import { categories, cities, servicePath, services, servicesInCategory } from '@/data/taxonomy';
import { buildMetadata, graph, localBusinessSchema, serviceSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Expert Landscaping, Hardscaping & Irrigation in Seattle',
  description:
    'Every service Blue Landscaping Services offers in Kent and Greater Seattle: retaining walls, paver patios, walkways, driveways, irrigation, fencing, lawn care and planting.',
  path: '/services',
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={graph([
          localBusinessSchema(),
          ...categories.map((c) =>
            serviceSchema({
              name: c.name,
              description: c.blurb,
              path: `/services/${c.slug}`,
              areaServed: cities.map((city) => city.name),
            }),
          ),
        ])}
      />

      <Breadcrumbs crumbs={[{ name: 'Services', path: '/services' }]} />

      <div className="shell pb-16 pt-8">
        <header>
          <p className="eyebrow text-brand-600">
            What we build
          </p>
          <h1 className="mt-2 max-w-4xl text-h1">Expert Landscaping, Hardscaping &amp; Irrigation in Seattle</h1>
          <QuickAnswer>
            {`Blue Landscaping Services offers ${services.length} services across three categories: hardscaping, irrigation and landscaping. Our own crew builds the hardscape, under Washington license BLUELLS880K2. Every service page below publishes its installed cost range and a real timeline.`}
          </QuickAnswer>
        </header>

        <div className="mt-14 space-y-16">
          {categories.map((category) => {
            const content = getCategoryContent(category.slug);
            const children = servicesInCategory(category.slug);

            return (
              <Reveal as="section" key={category.slug}>
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="text-h2">{category.name}</h2>
                  <Link
                    href={`/services/${category.slug}`}
                    className="inline-flex min-h-[44px] items-center gap-1.5 text-caption font-semibold text-brand-600 underline underline-offset-4"
                  >
                    All {category.name.toLowerCase()}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
                <p className="mt-2 max-w-prose text-body-lg text-ink-500">
                  {content?.quickAnswer.split('. ')[0] ?? category.blurb}.
                </p>

                <ul className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {children.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={servicePath(service.slug)}
                        className="group flex h-full flex-col overflow-hidden rounded-lg border border-ink-200 bg-white transition-shadow hover:shadow-card"
                      >
                        <ServiceArt
                          slug={service.slug}
                          name={service.name}
                          className="aspect-[16/10] w-full"
                        />
                        <div className="flex flex-1 flex-col p-5">
                          <h3 className="text-body-lg font-semibold text-brand-900 group-hover:text-brand-600">
                            {service.name}
                          </h3>
                          <p className="mt-2 flex-1 text-body text-ink-500">{service.blurb}</p>
                          <StartingPrice slug={service.slug} />
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-16">
          <VisualizerTeaser />
        </div>
      </div>

      <CtaBand />
    </>
  );
}

/**
 * Shows the low end of a service's first published cost row. Renders nothing
 * when that service has no cost table, rather than printing an empty "From".
 */
function StartingPrice({ slug }: { slug: string }) {
  const detail = getServiceContent(slug);
  const first = detail?.costRows[0];
  if (!first) return null;

  const low = first.range.split(/[–-]/)[0].trim();

  return (
    <p className="mt-3 text-caption font-semibold text-leaf-600">
      From {low} <span className="font-normal text-ink-500">{first.unit}</span>
    </p>
  );
}
