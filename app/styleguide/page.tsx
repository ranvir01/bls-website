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
import { Button } from '@/components/ui/button';
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
        <p className="eyebrow text-leaf-600">Internal</p>
        <h1 className="mt-2 text-h1">Design system</h1>
        <p className="mt-4 max-w-prose text-body-lg text-ink-500">
          Every token and primitive on the site. This page is noindex and disallowed in robots.txt.
          Components consume tokens only — an ad-hoc hex value in a component is a bug.
        </p>
      </header>

      <Section title="Colour">
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {[
            ['brand-900', 'bg-brand-900', 'Primary text, dark sections'],
            ['ink-800', 'bg-ink-800', 'Body copy'],
            ['ink-500', 'bg-ink-500', 'Secondary text'],
            ['ink-200', 'bg-ink-200', 'Borders, rules'],
            ['ink-50', 'bg-ink-50', 'Page background'],
            ['brand-600', 'bg-brand-600', 'Brand, links, focus ring'],
            ['sky-600', 'bg-sky-600', 'Brand secondary'],
            ['brand-50', 'bg-brand-50', 'Tints, dark-section text'],
            ['leaf-600', 'bg-leaf-600', 'CTAs, accents'],
            ['leaf-400', 'bg-leaf-400', 'Accent secondary'],
          ].map(([name, cls, use]) => (
            <div key={name}>
              <div className={`h-16 rounded-sm border border-ink-200 ${cls}`} />
              <p className="mt-2 text-caption font-semibold text-brand-900">{name}</p>
              <p className="text-caption text-ink-500">{use}</p>
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
          <p className="text-body-lg text-ink-800">Body large — 1.125rem / 1.6</p>
          <p className="text-body text-ink-800">Body — 1rem / 1.65</p>
          <p className="text-caption uppercase tracking-wide text-ink-500">
            Caption — 0.875rem, uppercase, tracked
          </p>
        </div>
      </Section>

      <Section title="Buttons">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Button>Primary</Button>
            <Button variant="brand">Brand</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button disabled>Disabled</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3 rounded-sm bg-brand-900 p-4">
            <Button variant="onDark">On dark</Button>
            <Button variant="onHero">On hero</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
          <p className="text-caption text-ink-500">
            Every CTA on the site renders through this component. Sizes are floored at 44px (48px
            default) so no caller has to remember the touch-target rule.
          </p>
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
          <div className="relative inline-block rounded-sm bg-ink-800 p-8">
            <AiConceptBadge />
          </div>
          <AiConceptNote />
          <p className="text-caption text-ink-500">
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
      <h2 className="mb-6 border-b border-ink-200 pb-2 text-h3">{title}</h2>
      {children}
    </section>
  );
}
