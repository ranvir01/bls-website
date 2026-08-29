import type { Metadata } from 'next';
import { Suspense } from 'react';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { CtaBand, SectionHeader } from '@/components/blocks';
import { BeforeAfterShowcase } from '@/components/before-after-showcase';
import { JsonLd } from '@/components/json-ld';
import { PortfolioBrowser } from '@/components/portfolio/portfolio-browser';
import { VisualizerTeaser } from '@/components/visualizer/visualizer-teaser';
import { WorkGallery } from '@/components/work-gallery';
import { portfolioProjects } from '@/data/projects';
import { allWorkPhotos, beforeAfterPairs } from '@/data/work-photos';
import { buildMetadata, graph, localBusinessSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Portfolio — Landscaping & Hardscaping Projects in Seattle',
  description:
    'Real retaining wall, paver patio, walkway and irrigation projects by Blue Landscaping Services across Kent, Auburn, Renton and Greater Seattle.',
  path: '/portfolio',
});

export default function PortfolioPage() {
  const projects = portfolioProjects();

  return (
    <>
      <JsonLd data={graph([localBusinessSchema({ path: '/portfolio' })])} />

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
            <Suspense fallback={<p className="text-body text-ink-500">Loading projects…</p>}>
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
            <WorkGallery photos={allWorkPhotos} />
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
