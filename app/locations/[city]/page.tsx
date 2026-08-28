import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, MapPin, ShieldCheck } from 'lucide-react';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { CtaBand, FaqList, LinkCluster, Prose, QuickAnswer } from '@/components/blocks';
import { JsonLd } from '@/components/json-ld';
import { Reveal } from '@/components/motion/reveal';
import { NapBlock } from '@/components/nap-block';
import { ProjectGrid } from '@/components/portfolio/project-grid';
import { QuoteForm } from '@/components/quote/quote-form';
import { ReviewsSection } from '@/components/reviews-section';
import { VisualizerTeaser } from '@/components/visualizer/visualizer-teaser';
import { business } from '@/data/business';
import { cityContent, getCityContent } from '@/data/content/cities';
import { serviceCityContent } from '@/data/content/service-cities';
import { postsForCity } from '@/data/content/blog';
import { projectsForCity } from '@/data/projects';
import { reviewsForCity } from '@/data/reviews';
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
  reviewSchema,
} from '@/lib/seo';

interface Params {
  params: { city: string };
}

export function generateStaticParams() {
  return Object.keys(cityContent).map((city) => ({ city }));
}

export function generateMetadata({ params }: Params): Metadata {
  const content = getCityContent(params.city);
  if (!content) return {};

  return buildMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: cityPath(content.slug),
  });
}

export default function CityPage({ params }: Params) {
  const content = getCityContent(params.city);
  const ref = cityBySlug.get(params.city);
  if (!content || !ref) notFound();

  const path = cityPath(content.slug);

  const serviceLinks = content.services
    .map((slug) => serviceBySlug.get(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
    .map((s) => ({ label: s.name, href: servicePath(s.slug) }));

  const nearby = content.nearbyCities
    .map((slug) => cityBySlug.get(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c))
    .map((c) => ({ label: c.name, href: cityPath(c.slug) }));

  // Money-service pages that exist for this city.
  const focusPages = Object.values(serviceCityContent)
    .filter((sc) => sc.citySlug === content.slug)
    .map((sc) => ({
      label: `${serviceBySlug.get(sc.serviceSlug)?.name ?? sc.serviceSlug} in ${content.name}`,
      href: serviceCityPath(sc.citySlug, sc.serviceSlug),
    }));

  const posts = postsForCity(content.slug);
  const cityProjects = projectsForCity(content.slug);
  const cityReviews = reviewsForCity(content.slug);

  const crumbs = [
    { name: 'Service Areas', path: '/locations' },
    { name: content.name, path },
  ];

  return (
    <>
      <JsonLd
        data={graph([
          localBusinessSchema({ path, areaServed: [content.name] }),
          faqSchema(content.faqs),
          breadcrumbSchema([{ name: 'Home', path: '/' }, ...crumbs]),
          reviewSchema(cityReviews),
        ])}
      />

      <Breadcrumbs crumbs={crumbs} />

      <article>
        <header className="shell pt-8">
          <p className="eyebrow text-brand-600">
            {content.region}
          </p>
          <h1 className="mt-2 max-w-4xl text-h1">{content.h1}</h1>
          <QuickAnswer>{content.quickAnswer}</QuickAnswer>

          <dl className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="flex gap-3 rounded-sm border border-ink-200 bg-white p-4">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
              <div>
                <dt className="text-caption font-semibold text-brand-900">From our Kent shop</dt>
                <dd className="text-caption text-ink-500">{content.driveTimeFromKent}</dd>
              </div>
            </div>
            <div className="flex gap-3 rounded-sm border border-ink-200 bg-white p-4">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
              <div>
                <dt className="text-caption font-semibold text-brand-900">ZIP codes served</dt>
                <dd className="text-caption text-ink-500">{content.zips.join(', ')}</dd>
              </div>
            </div>
            <div className="flex gap-3 rounded-sm border border-ink-200 bg-white p-4">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
              <div>
                <dt className="text-caption font-semibold text-brand-900">Licensed in WA</dt>
                <dd className="text-caption text-ink-500">
                  <a
                    href={business.license.lookupUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-brand-600"
                  >
                    {business.license.number}
                  </a>
                  {' · '}
                  bonded &amp; insured
                </dd>
              </div>
            </div>
          </dl>
        </header>

        <div className="shell grid gap-12 pb-16 pt-12 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 space-y-14 lg:col-span-7 xl:col-span-8">
            <Reveal>
              <Prose paragraphs={content.body} />
            </Reveal>

            <Reveal as="section">
              <h2 className="text-h2">Ground conditions in {content.name}</h2>
              <p className="mt-4 max-w-prose text-body-lg text-ink-800">{content.siteConditions}</p>

              <h3 className="mt-8 text-h3">Permits</h3>
              <p className="mt-3 max-w-prose text-body text-ink-800">{content.permitNotes}</p>
            </Reveal>

            {content.neighborhoods.length > 0 && (
              <Reveal as="section">
                <h2 className="text-h2">Neighborhoods we work in</h2>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {content.neighborhoods.map((hood) => (
                    <li
                      key={hood}
                      className="rounded-sm border border-ink-200 bg-white px-3 py-1.5 text-caption text-ink-800"
                    >
                      {hood}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            <Reveal as="section">
              <LinkCluster title={`Services we offer in ${content.name}`} links={serviceLinks} columns={2} />
            </Reveal>

            {focusPages.length > 0 && (
              <Reveal as="section">
                <LinkCluster title={`Most requested in ${content.name}`} links={focusPages} columns={2} />
              </Reveal>
            )}

            <ProjectGrid projects={cityProjects} heading={`Projects in and around ${content.name}`} />

            <Reveal as="section">
              <VisualizerTeaser
                headline={`See what we'd build in ${content.name}`}
                body="Upload a photo of your yard. You get a written scope from materials we install, a cost range, and real jobs like yours."
              />
            </Reveal>

            <ReviewsSection reviews={cityReviews} heading={`What ${content.name} customers say`} />

            <Reveal as="section">
              <FaqList faqs={content.faqs} title={`${content.name}: common questions`} />
            </Reveal>
          </div>

          <aside className="min-w-0 space-y-8 lg:col-span-5 xl:col-span-4">
            <div className="lg:sticky lg:top-28 lg:space-y-8">
              <QuoteForm />
              <NapBlock />
            </div>
          </aside>
        </div>

        <section className="border-t border-ink-200 bg-white">
          <div className="shell section-tight grid gap-10 md:grid-cols-3">
            <LinkCluster title="Nearby areas" links={nearby} />
            {posts.length > 0 && (
              <LinkCluster
                title="Local guides"
                links={posts.map((p) => ({ label: p.title, href: `/blog/${p.slug}` }))}
              />
            )}
            <div>
              <h2 className="text-h3">See our work</h2>
              <p className="mt-3 text-body text-ink-500">
                Filter the portfolio by the projects closest to you.
              </p>
              <Link
                href={`/portfolio?city=${content.slug}`}
                className="mt-4 inline-flex min-h-[44px] items-center text-body font-medium text-brand-600 underline underline-offset-4"
              >
                Projects near {content.name}
              </Link>
            </div>
          </div>
        </section>
      </article>

      <CtaBand
        title={`Book a free walkthrough in ${content.name}`}
        body={`We are ${content.driveTimeFromKent.replace(/^about /i, '')} away. Same-day callbacks on most requests.`}
      />
    </>
  );
}

export const dynamicParams = false;
