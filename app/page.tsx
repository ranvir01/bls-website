import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { CtaBand, FaqList, ProcessSteps, SectionHeader, TrustBar } from '@/components/blocks';
import { ConceptToBuiltGallery } from '@/components/portfolio/concept-to-built';
import { Hero } from '@/components/home/hero';
import { JsonLd } from '@/components/json-ld';
import { Reveal } from '@/components/motion/reveal';
import { ProjectGrid } from '@/components/portfolio/project-grid';
import { ReviewsSection } from '@/components/reviews-section';
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
          title="Three things, done properly"
          lead="Hardscaping, irrigation and landscaping — all self-performed, all specified for this climate."
        />

        <div className="mt-12 space-y-12">
          {categories.map((category) => {
            const content = getCategoryContent(category.slug);
            const children = servicesInCategory(category.slug);

            return (
              <Reveal as="section" key={category.slug}>
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-stone-200 pb-3">
                  <h3 className="text-h3">{category.name}</h3>
                  <Link
                    href={`/services/${category.slug}`}
                    className="inline-flex min-h-[44px] items-center gap-1.5 text-caption font-semibold text-moss-700 underline underline-offset-4"
                  >
                    All {category.name.toLowerCase()}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
                <p className="mt-3 max-w-prose text-body text-stone-500">
                  {content?.quickAnswer.split('. ')[0]}.
                </p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {children.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={servicePath(service.slug)}
                        className="group flex h-full flex-col rounded-sm border border-stone-200 bg-white p-4 transition-shadow hover:shadow-card"
                      >
                        <span className="text-body font-semibold text-stone-950 group-hover:text-moss-700">
                          {service.name}
                        </span>
                        <span className="mt-1.5 text-caption text-stone-500">{service.blurb}</span>
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
        <section className="border-y border-stone-200 bg-white">
          <div className="shell section">
            <ProjectGrid projects={featured} heading="Recent work" />
            <Link
              href="/portfolio"
              className="mt-8 inline-flex min-h-[44px] items-center gap-1.5 text-body font-medium text-moss-700 underline underline-offset-4"
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
            title="Designed and built by the same crew"
            lead="The single structural difference between us and most of the market — and it shows up in the price, the schedule and the finish."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {whyUs.map((item) => (
              <Reveal key={item.title} className="border-l-2 border-moss-100 pl-6">
                <h3 className="text-body-lg font-semibold text-stone-950">{item.title}</h3>
                <p className="mt-2 text-body text-stone-500">{item.body}</p>
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
      <section className="border-y border-stone-200 bg-white">
        <div className="shell section">
          <SectionHeader
            eyebrow="How it works"
            title="Four steps, no surprises"
            lead="From the first phone call to the final walkthrough."
          />
          <div className="mt-12">
            <ProcessSteps steps={howItWorks} />
          </div>
          <Link
            href="/process"
            className="mt-8 inline-flex min-h-[44px] items-center gap-1.5 text-body font-medium text-moss-700 underline underline-offset-4"
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
          lead="Based in Kent. South King County is home turf — most of those jobs are inside a 25-minute drive."
        />
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {regions.map((region) => (
            <div key={region}>
              <h3 className="text-caption font-semibold uppercase tracking-wide text-moss-700">
                {region}
              </h3>
              <ul className="mt-3 space-y-1.5">
                {cities
                  .filter((c) => c.region === region)
                  .map((city) => (
                    <li key={city.slug}>
                      <Link
                        href={cityPath(city.slug)}
                        className="text-body text-stone-800 underline decoration-stone-200 underline-offset-4 transition-colors hover:text-moss-700 hover:decoration-moss-700"
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
        <section className="border-y border-stone-200 bg-white">
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
