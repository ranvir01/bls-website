import type { Metadata } from 'next';

import { AiConceptBadge, AiConceptNote } from '@/components/ai-concept-badge';
import {
  CheckList,
  CostTable,
  CtaBand,
  FaqList,
  LinkCluster,
  ProcessSteps,
  QuickAnswer,
  SectionHeader,
  TrustBar,
} from '@/components/blocks';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Styleguide (internal)',
  description: 'Internal design system reference.',
  path: '/styleguide',
  noindex: true,
});

/**
 * Internal design-system reference. Noindex, and disallowed in robots.
 *
 * Its job is to keep future work consistent: anyone adding a component can see
 * every token and every existing primitive on one page, which is what stops the
 * palette drifting back into ad-hoc hex values.
 */
export default function StyleguidePage() {
  return (
    <div className="shell space-y-16 py-24 lg:py-32">
      <header>
        <p className="text-caption font-semibold uppercase tracking-wide text-clay-600">Internal</p>
        <h1 className="mt-2 text-h1">Design system</h1>
        <p className="mt-4 max-w-prose text-body-lg text-stone-500">
          Every token and primitive on the site. This page is noindex and disallowed in robots.txt.
          Components consume tokens only — an ad-hoc hex value in a component is a bug.
        </p>
      </header>

      <Section title="Colour">
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {[
            ['stone-950', 'bg-stone-950', 'Primary text, dark sections'],
            ['stone-800', 'bg-stone-800', 'Body copy'],
            ['stone-500', 'bg-stone-500', 'Secondary text'],
            ['stone-200', 'bg-stone-200', 'Borders, rules'],
            ['stone-50', 'bg-stone-50', 'Page background'],
            ['moss-700', 'bg-moss-700', 'Brand, links, focus ring'],
            ['moss-500', 'bg-moss-500', 'Brand secondary'],
            ['moss-100', 'bg-moss-100', 'Tints, dark-section text'],
            ['clay-600', 'bg-clay-600', 'CTAs, accents'],
            ['clay-400', 'bg-clay-400', 'Accent secondary'],
          ].map(([name, cls, use]) => (
            <div key={name}>
              <div className={`h-16 rounded-sm border border-stone-200 ${cls}`} />
              <p className="mt-2 text-caption font-semibold text-stone-950">{name}</p>
              <p className="text-caption text-stone-500">{use}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Type scale">
        <div className="space-y-5">
          <p className="text-display">Display — clamp(2.75rem, 6vw, 5rem)</p>
          <p className="text-h1">Heading 1 — clamp(2.25rem, 4.5vw, 3.5rem)</p>
          <p className="text-h2">Heading 2 — clamp(1.75rem, 3vw, 2.5rem)</p>
          <p className="text-h3">Heading 3 — 1.5rem</p>
          <p className="text-body-lg text-stone-800">Body large — 1.125rem / 1.6</p>
          <p className="text-body text-stone-800">Body — 1rem / 1.65</p>
          <p className="text-caption uppercase tracking-wide text-stone-500">
            Caption — 0.875rem, uppercase, tracked
          </p>
        </div>
      </Section>

      <Section title="Buttons">
        <div className="flex flex-wrap gap-3">
          <button className="inline-flex min-h-[48px] items-center rounded-sm bg-clay-600 px-6 text-body font-semibold text-white">
            Primary
          </button>
          <button className="inline-flex min-h-[48px] items-center rounded-sm border border-stone-200 bg-white px-6 text-body font-semibold text-stone-950">
            Secondary
          </button>
          <button className="inline-flex min-h-[48px] items-center rounded-sm bg-moss-700 px-6 text-body font-semibold text-white">
            Brand
          </button>
          <button
            disabled
            className="inline-flex min-h-[48px] items-center rounded-sm bg-clay-600 px-6 text-body font-semibold text-white opacity-60"
          >
            Disabled
          </button>
        </div>
      </Section>

      <Section title="Quick answer">
        <QuickAnswer>
          The 40–60 word extractable summary that opens every service, location and blog page. This
          is the unit AI search engines lift and cite, so it has to answer the page&rsquo;s core
          question completely and stand alone.
        </QuickAnswer>
      </Section>

      <Section title="Trust bar">
        <TrustBar />
      </Section>

      <Section title="Cost table">
        <CostTable
          rows={[
            { item: 'Paver patio, standard base', range: '$18–$32', unit: 'per sq ft' },
            { item: 'Segmental wall, under 4 ft', range: '$45–$70', unit: 'per face sq ft' },
            { item: 'Seating wall with cap', range: '$120–$190', unit: 'per linear ft' },
          ]}
          note="Typical installed ranges for the Puget Sound market, not a quote."
        />
      </Section>

      <Section title="Check list">
        <CheckList
          items={['Excavation to competent soil', 'Base compacted in lifts', 'Drain rock and drain line', 'Polymeric sand joints']}
          columns={2}
        />
      </Section>

      <Section title="Process steps">
        <ProcessSteps
          steps={[
            { title: 'Walkthrough', description: 'Free on-site visit with the person who runs the job.' },
            { title: 'Design & scope', description: 'Drawn and priced in-house, no separate design fee.' },
          ]}
        />
      </Section>

      <Section title="Link cluster">
        <LinkCluster
          title="Related services"
          links={[
            { label: 'Retaining Walls', href: '/services/hardscaping/retaining-walls' },
            { label: 'Paver Patios', href: '/services/hardscaping/paver-patios' },
          ]}
        />
      </Section>

      <Section title="FAQ">
        <FaqList
          faqs={[
            {
              question: 'How is the FAQ rendered?',
              answer:
                'As native details/summary elements, so every answer is in the initial HTML and readable with JavaScript disabled. That is what makes pairing it with FAQPage schema honest.',
            },
          ]}
          title="Example"
        />
      </Section>

      <Section title="AI concept labelling">
        <div className="space-y-4">
          <div className="relative inline-block rounded-sm bg-stone-800 p-8">
            <AiConceptBadge />
          </div>
          <AiConceptNote />
          <p className="text-caption text-stone-500">
            Mandatory on every image with assetType &lsquo;concept-render&rsquo;. Renders never
            appear in /portfolio.
          </p>
        </div>
      </Section>

      <Section title="Section header">
        <SectionHeader eyebrow="Eyebrow" title="Section heading" lead="Supporting lead paragraph." />
      </Section>

      <CtaBand />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-6 border-b border-stone-200 pb-2 text-h3">{title}</h2>
      {children}
    </section>
  );
}
