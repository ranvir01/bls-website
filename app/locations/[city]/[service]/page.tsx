import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { CostTable, CtaBand, FaqList, LinkCluster, Prose, QuickAnswer } from '@/components/blocks';
import { JsonLd } from '@/components/json-ld';
import { Reveal } from '@/components/motion/reveal';
import { NapBlock } from '@/components/nap-block';
import { QuoteForm } from '@/components/quote/quote-form';
import { getCityContent } from '@/data/content/cities';
import { getServiceContent } from '@/data/content/services';
import { getServiceCityContent, serviceCityContent, siblingServiceCities } from '@/data/content/service-cities';
import {
  cityBySlug,
  cityPath,
  serviceBySlug,
  servicePath,
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
  params: { city: string; service: string };
}

export function generateStaticParams() {
  return Object.values(serviceCityContent).map((c) => ({
    city: c.citySlug,
    service: c.serviceSlug,
  }));
}

export function generateMetadata({ params }: Params): Metadata {
  const content = getServiceCityContent(params.city, params.service);
  if (!content) return {};

  return buildMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: serviceCityPath(content.citySlug, content.serviceSlug),
  });
}

/**
 * Programmatic service × city page.
 *
 * These are the highest-intent, lowest-competition queries in the market. The
 * only thing separating them from doorway pages is that each carries genuinely
 * city-specific copy plus the parent service's real cost table — so the page
 * answers the query completely rather than bouncing the visitor onward.
 */
export default function ServiceCityPage({ params }: Params) {
  const content = getServiceCityContent(params.city, params.service);
  const city = cityBySlug.get(params.city);
  const service = serviceBySlug.get(params.service);
  if (!content || !city || !service) notFound();

  const serviceDetail = getServiceContent(service.slug);
  const cityDetail = getCityContent(city.slug);
  const path = serviceCityPath(city.slug, service.slug);

  const siblings = siblingServiceCities(city.slug, service.slug).map((sc) => ({
    label: `${serviceBySlug.get(sc.serviceSlug)?.name ?? sc.serviceSlug} in ${city.name}`,
    href: serviceCityPath(sc.citySlug, sc.serviceSlug),
  }));

  const crumbs = [
    { name: 'Service Areas', path: '/locations' },
    { name: city.name, path: cityPath(city.slug) },
    { name: service.name, path },
  ];

  return (
    <>
      <JsonLd
        data={graph([
          serviceSchema({
            name: `${service.name} in ${city.name}, WA`,
            description: content.metaDescription,
            path,
            areaServed: [city.name],
          }),
          localBusinessSchema({ path, areaServed: [city.name] }),
          faqSchema(content.faqs),
          breadcrumbSchema([{ name: 'Home', path: '/' }, ...crumbs]),
        ])}
      />

      <Breadcrumbs crumbs={crumbs} />

      <article>
        <header className="shell pt-8">
          <p className="text-caption font-semibold uppercase tracking-wide text-moss-700">
            {city.region}
          </p>
          <h1 className="mt-2 max-w-4xl text-h1">{content.h1}</h1>
          <QuickAnswer>{content.quickAnswer}</QuickAnswer>
        </header>

        <div className="shell grid gap-12 pb-16 pt-10 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 space-y-14 lg:col-span-7 xl:col-span-8">
            <Reveal>
              <Prose paragraphs={content.body} />
            </Reveal>

            <Reveal as="section">
              <div className="border-l-2 border-clay-600 bg-white py-5 pl-6 pr-5">
                <h2 className="text-h3">What&rsquo;s different about {city.name}</h2>
                <p className="mt-3 max-w-prose text-body-lg text-stone-800">{content.localAngle}</p>
              </div>
            </Reveal>

            {/* The parent service's real cost table. Reusing it here is
                deliberate — pricing does not change by city, and sending the
                visitor away to find it would waste the highest-intent page on
                the site. */}
            {serviceDetail && (
              <Reveal as="section">
                <h2 className="text-h2">{service.name} cost in {city.name}</h2>
                <div className="mt-6">
                  <CostTable
                    rows={serviceDetail.costRows}
                    note={serviceDetail.costNote}
                    caption={`Typical installed ranges for ${service.name.toLowerCase()} in ${city.name}`}
                  />
                </div>
              </Reveal>
            )}

            {cityDetail && (
              <Reveal as="section">
                <h2 className="text-h2">Permits in {city.name}</h2>
                <p className="mt-4 max-w-prose text-body text-stone-800">{cityDetail.permitNotes}</p>
              </Reveal>
            )}

            <Reveal as="section">
              <FaqList faqs={content.faqs} title={`${service.name} in ${city.name}: questions`} />
            </Reveal>
          </div>

          <aside className="min-w-0 space-y-8 lg:col-span-5 xl:col-span-4">
            <div className="lg:sticky lg:top-28 lg:space-y-8">
              <QuoteForm defaultProjectType={service.slug} />
              <NapBlock />
            </div>
          </aside>
        </div>

        <section className="border-t border-stone-200 bg-white">
          <div className="shell section-tight grid gap-10 md:grid-cols-3">
            <LinkCluster
              title="More on this service"
              links={[
                { label: `${service.name} — full details`, href: servicePath(service.slug) },
                { label: `All services in ${city.name}`, href: cityPath(city.slug) },
              ]}
            />
            {siblings.length > 0 && <LinkCluster title={`Also in ${city.name}`} links={siblings} />}
            {cityDetail && (
              <LinkCluster
                title="Nearby areas"
                links={cityDetail.nearbyCities
                  .map((slug) => cityBySlug.get(slug))
                  .filter((c): c is NonNullable<typeof c> => Boolean(c))
                  .map((c) => ({ label: c.name, href: cityPath(c.slug) }))}
              />
            )}
          </div>
        </section>
      </article>

      <CtaBand
        title={`${service.name} in ${city.name} — get a real number`}
        body="Free on-site walkthrough, a written scope, and a range you can plan around."
      />
    </>
  );
}

export const dynamicParams = false;
