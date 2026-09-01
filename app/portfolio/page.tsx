import type { Metadata } from 'next';
import { Suspense } from 'react';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { CtaBand, SectionHeader } from '@/components/blocks';
import { BeforeAfterShowcase } from '@/components/before-after-showcase';
import { JsonLd } from '@/components/json-ld';
import { PortfolioBrowser } from '@/components/portfolio/portfolio-browser';
import { ProjectGrid } from '@/components/portfolio/project-grid';
import { VisualizerTeaser } from '@/components/visualizer/visualizer-teaser';
import { WorkGallery } from '@/components/work-gallery';
import { portfolioProjects } from '@/data/projects';
import { allWorkPhotos, beforeAfterPairs } from '@/data/work-photos';
import { withoutProjectPhotos } from '@/lib/photo-identity';
import { buildMetadata, graph, localBusinessSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Portfolio — Landscaping & Hardscaping Projects in Seattle',
  description:
    'Real retaining wall, paver patio, walkway and irrigation projects by Blue Landscaping Services across Kent, Auburn, Renton and Greater Seattle.',
  path: '/portfolio',
});

export default function PortfolioPage() {
  const projects = portfolioProjects();
  // Twelve of the projects' photos are also in the job gallery under another
  // filename. Each picture appears once on this page: as its project.
  const gallery = withoutProjectPhotos(allWorkPhotos, projects);

  return (
    <>
      <JsonLd data={graph([localBusinessSchema()])} />

      <Breadcrumbs crumbs={[{ name: 'Portfolio', path: '/portfolio' }]} />

      <div className="shell pb-16 pt-8">
        <header className="max-w-3xl">
          <p className="text-caption font-semibold uppercase tracking-wide text-brand-600">
            Completed work
          </p>
          <h1 className="mt-2 text-h1">Projects we have actually built</h1>
          <p className="mt-5 text-body-lg text-ink-500">
            These are photos from our jobs around Greater Seattle — retaining walls, patios,
            walkways, irrigation, and planting. Design concepts from the visualizer are labeled
            separately and never mixed in here.
          </p>
        </header>

        <div className="mt-12">
          {projects.length > 0 ? (
            /*
             * The browser reads its filters from useSearchParams, which
             * cannot be resolved at build time, so what gets prerendered
             * here is the fallback. It used to be a "Loading…" line, which
             * meant the static HTML of the portfolio hub carried zero links
             * to its project pages — anything that does not run JavaScript
             * saw an index with nothing in it. The fallback is now the full
             * grid; hydration swaps in the same cards with the filter row
             * above them.
             *
             * The Suspense boundary itself is load-bearing: without it
             * useSearchParams fails `next build`.
             */
            <Suspense
              fallback={
                <>
                  <h2 className="sr-only">Completed projects</h2>
                  <ProjectGrid projects={projects} />
                </>
              }
            >
              <PortfolioBrowser projects={projects} />
            </Suspense>
          ) : (
            <VisualizerTeaser
              headline="Design your own yard right now"
              body="The visualizer uses the materials we install, so what it draws is what we can build."
            />
          )}
        </div>

        {beforeAfterPairs.length > 0 && (
          <div className="mt-16">
            <SectionHeader
              eyebrow="Before & after"
              title="Slide to compare"
              lead="A few yards before we started and after we finished."
            />
            <div className="mt-8">
              <BeforeAfterShowcase limit={6} />
            </div>
          </div>
        )}

        <div className="mt-16">
          <SectionHeader
            eyebrow="More photos"
            title="From the job"
            lead="Hardscaping, irrigation, and landscaping. Click any photo to open it."
          />
          <div className="mt-8">
            <WorkGallery photos={gallery} />
          </div>
        </div>
      </div>

      <CtaBand
        title="Want this in your yard?"
        body="Free consultation. We will walk the site and send a written number for the work you actually want."
        primaryLabel="Free Consultation"
      />
    </>
  );
}
