import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { CtaBand, FaqList, LinkCluster, Prose, QuickAnswer } from '@/components/blocks';
import { JsonLd } from '@/components/json-ld';
import { Reveal } from '@/components/motion/reveal';
import { ServiceArt } from '@/components/service-art';
import { getCategoryContent } from '@/data/content/categories';
import { getServiceContent } from '@/data/content/services';
import { categories, cities, cityPath, servicePath, servicesInCategory } from '@/data/taxonomy';
import type { CategorySlug } from '@/data/types';
import {
  buildMetadata,
  faqSchema,
  graph,
  localBusinessSchema,
  serviceSchema,
} from '@/lib/seo';

interface Params {
  params: { category: string };
}

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const content = getCategoryContent(params.category);
  if (!content) return {};

  return buildMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: `/services/${content.slug}`,
  });
}

export default function CategoryPage({ params }: Params) {
  const content = getCategoryContent(params.category);
  if (!content) notFound();

  const path = `/services/${content.slug}`;
  const children = servicesInCategory(content.slug as CategorySlug);
  const crumbs = [
    { name: 'Services', path: '/services' },
    { name: content.name, path },
  ];

  return (
    <>
      <JsonLd
        data={graph([
          serviceSchema({
            name: content.name,
            description: content.metaDescription,
            path,
            areaServed: cities.map((c) => c.name),
          }),
          localBusinessSchema(),
          faqSchema(content.faqs),
        ])}
      />

      <Breadcrumbs crumbs={crumbs} />

      <article className="shell pb-16 pt-8">
        <header>
          <p className="eyebrow text-brand-600">Services</p>
          <h1 className="mt-2 max-w-4xl text-h1">{content.h1}</h1>
          <QuickAnswer>{content.quickAnswer}</QuickAnswer>
        </header>

        <Reveal className="mt-10">
          <Prose paragraphs={content.intro} />
        </Reveal>

        <section className="mt-14">
          <h2 className="text-h2">Everything we build under {content.name.toLowerCase()}</h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {children.map((service) => {
              const detail = getServiceContent(service.slug);
              return (
                <li key={service.slug}>
                  <Link
                    href={servicePath(service.slug)}
                    className="group flex h-full flex-col overflow-hidden rounded-lg border border-ink-200 bg-white transition-shadow hover:shadow-card"
                  >
                    <ServiceArt
                      slug={service.slug}
                      name={service.name}
                      className="aspect-[16/9] w-full"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-body-lg font-semibold text-brand-900 group-hover:text-brand-600">
                        {service.name}
                      </h3>
                      <p className="mt-2 flex-1 text-body text-ink-500">
                        {detail?.quickAnswer.split('. ').slice(0, 2).join('. ') ?? service.blurb}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-caption font-semibold text-brand-600">
                        Details &amp; cost
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <div className="mt-16">
          <FaqList faqs={content.faqs} title={`${content.name}: common questions`} />
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          <LinkCluster
            title="Other service categories"
            links={categories
              .filter((c) => c.slug !== content.slug)
              .map((c) => ({ label: c.name, href: `/services/${c.slug}` }))}
          />
          <LinkCluster
            title="Where we work"
            links={cities
              .filter((c) => c.tier === 'primary')
              .map((c) => ({ label: c.name, href: cityPath(c.slug) }))}
            columns={2}
          />
        </div>
      </article>

      <CtaBand />
    </>
  );
}

export const dynamicParams = false;
