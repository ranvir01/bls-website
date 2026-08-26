import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { CtaBand, FaqList, ProcessSteps, SectionHeader, TrustBar } from '@/components/blocks';
import { ConceptToBuiltGallery } from '@/components/portfolio/concept-to-built';
import { Hero } from '@/components/home/hero';
import { JsonLd } from '@/components/json-ld';
import { OwnerShowcase } from '@/components/home/owner-showcase';
import { ProjectGallery } from '@/components/gallery/project-gallery';
import { Reveal } from '@/components/motion/reveal';
import { ReviewsSection } from '@/components/reviews-section';
import { ServicesShowcase } from '@/components/home/services-showcase';
import { VisualizerTeaser } from '@/components/visualizer/visualizer-teaser';
import { homeFaqs, howItWorks, whyUs } from '@/data/content/home';
import { getCategoryContent } from '@/data/content/categories';
import { conceptToBuiltProjects } from '@/data/projects';
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

/**
 * Homepage.
 *
 * Section order is deliberate and was set by the owner:
 *
 *   hero → who you are hiring → what we build → work we have done → …
 *
 * That is also what the research says converts for home services. A homeowner
 * arriving here is deciding whether to let strangers dig next to their house.
 * They want to see a face, then see the work, then read the details — in that
 * order. Credentials and process come after the proof, not before it.
 */
export default function HomePage() {
  const showcaseCategories = categories.map((category) => ({
    slug: category.slug,
    name: category.name,
    lead: getCategoryContent(category.slug)?.quickAnswer.split('. ')[0] + '.' || category.blurb,
    services: servicesInCategory(category.slug).map((service) => ({
      slug: service.slug,
      name: service.name,
      blurb: service.blurb,
      href: servicePath(service.slug),
    })),
  }));

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

      {/* ── Who you are hiring ─────────────────────────────────────────────── */}
      <OwnerShowcase />

      {/* ── What we build, with the job photography ────────────────────────── */}
      <ServicesShowcase categories={showcaseCategories} />

      {/* ── Work we have done ──────────────────────────────────────────────── */}
      <section className="border-y border-ink-200 bg-white">
        <div className="shell section">
          <ProjectGallery
            limit={6}
            showFilters={false}
            heading="Work we have done"
            lead="Real projects across Kent, Renton, Auburn and Greater Seattle. Tap any photograph to see it full size."
          />
          <Link
            href="/portfolio"
            className="mt-10 inline-flex min-h-[44px] items-center gap-1.5 text-body font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-600"
          >
            See the full portfolio
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ── Why homeowners pick us ─────────────────────────────────────────── */}
      <section className="bg-ink-50">
        <div className="shell section">
          <SectionHeader
            eyebrow="Why us"
            title="Why homeowners pick us"
            lead="One company draws it and builds it. That shows up in the price, the schedule and the finish."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {whyUs.map((item) => (
              <Reveal key={item.title} className="border-l-2 border-brand-100 pl-6">
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
            className="mt-8 inline-flex min-h-[44px] items-center gap-1.5 text-body font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-600"
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
              <h3 className="eyebrow text-brand-600">
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
