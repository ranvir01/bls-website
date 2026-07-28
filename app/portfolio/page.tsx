import type { Metadata } from 'next';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { CtaBand } from '@/components/blocks';
import { JsonLd } from '@/components/json-ld';
import { PortfolioBrowser } from '@/components/portfolio/portfolio-browser';
import { VisualizerTeaser } from '@/components/visualizer/visualizer-teaser';
import { portfolioProjects } from '@/data/projects';
import { buildMetadata, graph, localBusinessSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Portfolio — Completed Hardscape & Landscape Projects',
  description:
    'Real completed retaining wall, paver patio, walkway and irrigation projects by Blue Landscaping Services across Kent, Auburn, Renton and Greater Seattle.',
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
          <p className="text-caption font-semibold uppercase tracking-wide text-moss-700">
            Completed work
          </p>
          <h1 className="mt-2 text-h1">Projects we have actually built</h1>
          <p className="mt-5 text-body-lg text-stone-500">
            Every photograph here is a real Blue Landscaping job. No stock imagery, no AI renders —
            design concepts from the visualizer live on their own page and are always labeled as
            such.
          </p>
        </header>

        <div className="mt-12">
          {projects.length > 0 ? (
            <PortfolioBrowser projects={projects} />
          ) : (
            /* Honest empty state. Better than inventing a portfolio, and it
               points at the thing that IS available today. */
            <div className="rounded-sm border border-stone-200 bg-white p-8">
              <h2 className="text-h3">Photography is being shot now</h2>
              <p className="mt-3 max-w-prose text-body text-stone-500">
                We are photographing current jobs to a fixed before/after standard rather than
                filling this page with stock images or other companies&rsquo; work. Until real pairs
                are up here, the fastest way to see what we build is to ask — we will walk you
                through recent jobs on the phone, or show you one in person near you.
              </p>
              <div className="mt-6">
                <VisualizerTeaser
                  headline="Or design your own yard right now"
                  body="The visualizer uses the exact materials we install, so what it draws is what we can build."
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <CtaBand />
    </>
  );
}
