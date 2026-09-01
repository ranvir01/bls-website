import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { CtaBand, FaqList, ProcessSteps, SectionHeader, TrustBar } from '@/components/blocks';
import { BeforeAfterShowcase } from '@/components/before-after-showcase';
import { ConceptToBuiltGallery } from '@/components/portfolio/concept-to-built';
import { Hero } from '@/components/home/hero';
import { JsonLd } from '@/components/json-ld';
import { Reveal } from '@/components/motion/reveal';
import { ProjectGrid } from '@/components/portfolio/project-grid';
import { ReviewsSection } from '@/components/reviews-section';
import { ServiceArt } from '@/components/service-art';
import { VisualizerTeaser } from '@/components/visualizer/visualizer-teaser';
import { WorkGallery } from '@/components/work-gallery';
import { homeFaqs, howItWorks, whyUs } from '@/data/content/home';
import { getCategoryContent } from '@/data/content/categories';
import { conceptToBuiltProjects, portfolioProjects } from '@/data/projects';
import { reviews } from '@/data/reviews';
import { featuredWorkPhotos } from '@/data/work-photos';
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
  const featured = portfolioProjects().slice(0, 6);

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
          eyebrow="Our services"
          title="Hardscaping, irrigation, and landscaping in Seattle"
          lead="Retaining walls, custom paver patios, walkways, and sprinkler systems — designed and built by our own crew for Puget Sound weather."
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

      <section className="shell section">
        <SectionHeader
          eyebrow="Before & after"
          title="See the difference"
          lead="Real yards we rebuilt. Drag the slider."
        />
        <div className="mt-10">
          <BeforeAfterShowcase limit={3} />
        </div>
      </section>

      <section className="border-y border-ink-200 bg-white">
        <div className="shell section">
          <SectionHeader
            eyebrow="Our work"
            title="Photos from the job"
            lead="Hardscaping, irrigation, and landscaping around Kent, Auburn, Renton, and Greater Seattle."
          />
          <div className="mt-10">
            <WorkGallery photos={featuredWorkPhotos} />
          </div>
          <Link
            href="/portfolio"
            className="mt-8 inline-flex min-h-[44px] items-center gap-1.5 text-body font-medium text-brand-600 underline underline-offset-4"
          >
            More photos
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="bg-white">
        <div className="shell section">
          <SectionHeader
            eyebrow="Why us"
            title="A Kent crew that works Greater Seattle"
            lead="You talk to the people who will be in your yard, from the first visit to the last cap."
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

      <section className="shell section-tight">
        <VisualizerTeaser />
      </section>

      <ConceptToBuiltGallery projects={conceptToBuiltProjects()} />

      <section className="border-y border-ink-200 bg-white">
        <div className="shell section">
          <SectionHeader
            eyebrow="How it works"
            title="From the first call to handover"
            lead="Free visit, a written number, then our crew builds it."
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

      <section className="shell section">
        <SectionHeader
          eyebrow="Service areas"
          title="Greater Seattle, based in Kent"
          lead="Most South King County jobs are inside a 25-minute drive. We also work the Eastside and Seattle neighborhoods."
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

      {reviews.length > 0 && (
        <section className="border-y border-ink-200 bg-white">
          <div className="shell section">
            <ReviewsSection reviews={reviews.slice(0, 4)} heading="What customers say" />
          </div>
        </section>
      )}

      <section className="shell section">
        <FaqList faqs={homeFaqs} />
      </section>

      <CtaBand
        title="Ready for a free consultation?"
        body="Call or send the quote form. We will walk the yard, talk through retaining walls, patios, or irrigation, and send a written number."
        primaryLabel="Free Consultation"
      />
    </>
  );
}
