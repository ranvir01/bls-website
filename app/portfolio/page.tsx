import type { Metadata } from 'next';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { CtaBand } from '@/components/blocks';
import { JsonLd } from '@/components/json-ld';
import { PhotoWall } from '@/components/gallery/photo-wall';
import { PortfolioBrowser } from '@/components/portfolio/portfolio-browser';
import { ProjectGallery } from '@/components/gallery/project-gallery';
import { VisualizerTeaser } from '@/components/visualizer/visualizer-teaser';
import { allGalleryPhotos, beforeAfterPairs, featuredProjects } from '@/data/media';
import { portfolioProjects } from '@/data/projects';
import { buildMetadata, graph, localBusinessSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Portfolio — Completed Hardscape & Landscape Projects',
  description:
    'Real completed retaining wall, paver patio, walkway and irrigation projects by Blue Landscaping Services across Kent, Auburn, Renton and Greater Seattle.',
  path: '/portfolio',
});

const PHOTO_TOTAL =
  allGalleryPhotos.length + featuredProjects.length + beforeAfterPairs.length * 2;

export default function PortfolioPage() {
  /** Documented before/after case studies, once any exist in data/projects.ts. */
  const caseStudies = portfolioProjects();

  return (
    <>
      <JsonLd data={graph([localBusinessSchema({ path: '/portfolio' })])} />

      <Breadcrumbs crumbs={[{ name: 'Portfolio', path: '/portfolio' }]} />

      <div className="shell pb-16 pt-8">
        <header className="max-w-3xl">
          <p className="eyebrow text-brand-600">
            Completed work
          </p>
          <h1 className="mt-2 text-h1">Projects we have actually built</h1>
          <p className="mt-5 text-body-lg text-ink-500">
            {PHOTO_TOTAL} photographs of real Blue Landscaping jobs across Kent, Renton, Auburn and
            Greater Seattle. No stock imagery and no AI renders — design concepts from the
            visualizer live on their own page and are always labeled as such.
          </p>
        </header>
      </div>

      {/* Titled projects, with the filter */}
      <section className="shell pb-16">
        <ProjectGallery
          heading="Featured projects"
          lead="Filter by the kind of work, or search. Tap a photograph to see it full size."
        />
      </section>

      {/* Documented before/after case studies, when they exist */}
      {caseStudies.length > 0 && (
        <section className="border-y border-ink-200 bg-white">
          <div className="shell section">
            <h2 className="text-h2">Before and after, documented</h2>
            <div className="mt-8">
              <PortfolioBrowser projects={caseStudies} />
            </div>
          </div>
        </section>
      )}

      {/* The whole library */}
      <section id="every-photo" className="scroll-mt-24 bg-ink-50">
        <div className="shell section">
          <div className="max-w-prose">
            <h2 className="text-h2">Every photo</h2>
            <p className="mt-4 text-body-lg text-ink-500">
              The full library, straight off the jobs. Filter by the kind of work.
            </p>
          </div>
          <div className="mt-8">
            <PhotoWall />
          </div>
        </div>
      </section>

      <section className="shell section-tight">
        <VisualizerTeaser
          headline="Or design your own yard right now"
          body="The visualizer uses the exact materials we install, so what it draws is what we can build."
        />
      </section>

      <CtaBand />
    </>
  );
}
