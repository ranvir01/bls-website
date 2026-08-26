import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { CtaBand, FaqList, ProcessSteps, SectionHeader, TrustBar } from '@/components/blocks';
import { ConceptToBuiltGallery } from '@/components/portfolio/concept-to-built';
import { Hero } from '@/components/home/hero';
import { JsonLd } from '@/components/json-ld';
import { Reveal } from '@/components/motion/reveal';
import { ProjectGrid } from '@/components/portfolio/project-grid';
import { ReviewsSection } from '@/components/reviews-section';
import { ServiceArt } from '@/components/service-art';
import { VisualizerTeaser } from '@/components/visualizer/visualizer-teaser';
import { homeFaqs, howItWorks, whyUs } from '@/data/content/home';
import { getCategoryContent } from '@/data/content/categories';
import { conceptToBuiltProjects, portfolioProjects } from '@/data/projects';
import { reviews } from '@/data/reviews';
import {
  categories,
  cities,
  cityPath,
  regions,
  servicePath,
  servicesInCategory,
} from '@/data/taxonomy';
import { faqSchema, graph, localBusinessSchema, reviewSchema } from '@/lib/seo';

export default function HomePage() {
  const featured = portfolioProjects().slice(0, 3);

  return (
    <>
      <JsonLd
        data={graph([
          localBusinessSchema({ path: '/', areaServed: cities.map((c) => c.name) }),
          faqSchema(homeFaqs),
          reviewSchema(reviews),
        ])}
      />

      <Hero />
      <TrustBar />

      {/* ── Services ───────────────────────────────────────────────────────── */}
      <section className="shell section">
        <SectionHeader
          eyebrow="What we build"
          title="What we build"
          lead="Hardscaping, irrigation and landscaping. All of it built by our own crew, all of it specified for this climate."
        />

        <div className="mt-12 space-y-12">
          {categories.map((category) => {
            const content = getCategoryContent(category.slug);
            const children = servicesInCategory(category.slug);

            return (
              <Reveal as="section" key={category.slug}>
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-ink-200 pb-3">
                  <h3 className="text-h3">{category.name}</h3>
                  <Link
                    href={`/services/${category.slug}`}
                    className="inline-flex min-h-[44px] items-center gap-1.5 text-caption font-semibold text-brand-600 underline underline-offset-4"
                  >
                    All {category.name.toLowerCase()}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
                <p className="mt-3 max-w-prose text-body text-ink-500">
                  {content?.quickAnswer.split('. ')[0]}.
                </p>
                <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {children.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={servicePath(service.slug)}
                        className="group flex h-full flex-col overflow-hidden rounded-lg border border-ink-200 bg-white transition-shadow hover:shadow-card"
                      >
                        <ServiceArt
                          slug={service.slug}
                          name={service.name}
                          className="aspect-[16/10] w-full [&_img]:group-hover:scale-105"
                        />
                        <span className="flex flex-1 flex-col p-4">
                          <span className="text-body font-semibold text-brand-900 group-hover:text-brand-600">
                            {service.name}
                          </span>
                          <span className="mt-1.5 text-caption text-ink-500">{service.blurb}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── Featured work — hidden entirely until real photos exist ─────────── */}
      {featured.length > 0 && (
        <section className="border-y border-ink-200 bg-white">
          <div className="shell section">
            <ProjectGrid projects={featured} heading="Recent work" />
            <Link
              href="/portfolio"
              className="mt-8 inline-flex min-h-[44px] items-center gap-1.5 text-body font-medium text-brand-600 underline underline-offset-4"
            >
              See the full portfolio
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      )}

      {/* ── Designed and built by the same crew ────────────────────────────── */}
      <section className="bg-white">
        <div className="shell section">
          <SectionHeader
            eyebrow="Why us"
            title="Why homeowners pick us"
            lead="One company draws it and builds it. That shows up in the price, the schedule and the finish."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {whyUs.map((item) => (
              <Reveal key={item.title} className="border-l-2 border-brand-50 pl-6">
                <h3 className="text-body-lg font-semibold text-brand-900">{item.title}</h3>
                <p className="mt-2 text-body text-ink-500">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Visualizer entry point ─────────────────────────────────────────── */}
      <section className="shell section-tight">
        <VisualizerTeaser />
      </section>

      {/* ── Concept-to-built proof, once the first pair exists ─────────────── */}
      <ConceptToBuiltGallery projects={conceptToBuiltProjects()} />

      {/* ── Process ────────────────────────────────────────────────────────── */}
      <section className="border-y border-ink-200 bg-white">
        <div className="shell section">
          <SectionHeader
            eyebrow="How it works"
            title="How a job runs"
            lead="From the first phone call to the day we hand it over."
          />
          <div className="mt-12">
            <ProcessSteps steps={howItWorks} />
          </div>
          <Link
            href="/process"
            className="mt-8 inline-flex min-h-[44px] items-center gap-1.5 text-body font-medium text-brand-600 underline underline-offset-4"
          >
            More about how we work
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ── Service areas ──────────────────────────────────────────────────── */}
      <section className="shell section">
        <SectionHeader
          eyebrow="Service areas"
          title="Where we work"
          lead="We are based in Kent. Most South King County jobs are inside a 25-minute drive."
        />
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {regions.map((region) => (
            <div key={region}>
              <h3 className="text-caption font-semibold uppercase tracking-wide text-brand-600">
                {region}
              </h3>
              <ul className="mt-3 space-y-1.5">
                {cities
                  .filter((c) => c.region === region)
                  .map((city) => (
                    <li key={city.slug}>
                      <Link
                        href={cityPath(city.slug)}
                        className="text-body text-ink-800 underline decoration-ink-200 underline-offset-4 transition-colors hover:text-brand-600 hover:decoration-brand-600"
                      >
                        {city.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Reviews — renders nothing until real reviews exist ──────────────── */}
      {reviews.length > 0 && (
        <section className="border-y border-ink-200 bg-white">
          <div className="shell section">
            <ReviewsSection reviews={reviews.slice(0, 4)} heading="What customers say" />
          </div>
        </section>
      )}

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="shell section">
        <FaqList faqs={homeFaqs} />
      </section>

      <CtaBand />
    </>
  );
}
