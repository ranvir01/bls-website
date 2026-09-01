import type { Metadata } from 'next';
import dynamicImport from 'next/dynamic';
import { Suspense } from 'react';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { CtaBand, FaqList, QuickAnswer } from '@/components/blocks';
import { JsonLd } from '@/components/json-ld';
import { business } from '@/data/business';
import type { Faq } from '@/data/types';
import { buildMetadata, faqSchema, graph, howToSchema, localBusinessSchema } from '@/lib/seo';

/**
 * The visualizer is a heavy client component, so it is dynamically imported and
 * kept off every other route's bundle. The explanatory copy and the FAQ around
 * it are server-rendered — this page targets real search intent ("see what my
 * yard could look like", "landscape design visualizer Seattle") and has to be
 * fully readable with JavaScript disabled.
 */
const Visualizer = dynamicImport(
  () => import('@/components/visualizer/visualizer').then((m) => m.Visualizer),
  {
    loading: () => (
      <div className="shimmer aspect-[4/3] w-full rounded-sm border border-ink-200" aria-hidden="true" />
    ),
  },
);

export const metadata: Metadata = buildMetadata({
  title: 'Yard Design Visualizer — See What We Would Build',
  description:
    'Upload a photo of your Kent or Greater Seattle yard. Get a written scope from materials Blue Landscaping actually installs, a cost range, and real jobs like yours. AI after-photos of your own house when rendering is on — labeled, catalog-only, free.',
  path: '/visualizer',
});

const faqs: Faq[] = [
  {
    question: 'Is this a real design or just a picture?',
    answer:
      'It is a buildable scope. Every material the tool can draw comes from a fixed catalog of what we install and source locally — Mutual Materials, Allan Block, Basalite, Belgard, Techo-Bloc, cedar, and zone 8b planting. It cannot generate a pool, a pergola, or a wall we would need to engineer, because those are not on the list. If an after-photo of your house is on, it is labeled AI. Either way you also see photographs of jobs we actually built in that category.',
  },
  {
    question: 'How accurate is the cost range?',
    answer:
      'It is a real range for the Puget Sound market, derived from the elements in your design and the size you gave us. It is not a quote. Excavation depth, access and how much spoil has to be hauled away are the three things most likely to move the number, and none of them are visible in a photo.',
  },
  {
    question: 'Will the finished job look exactly like the render?',
    answer:
      'The materials and the scope will match, because we build from the same catalog the render draws from. The exact layout gets confirmed at the on-site walkthrough, where grading, drainage, permits and plant availability all get factored in. We claim buildability, not a pixel match.',
  },
  {
    question: 'Is this like iScape or SketchUp?',
    answer:
      'No. Those are designer apps you buy and learn. This page is a free lead tool on your phone: upload a photo, pick what we actually install, and get a scope you can quote. We do not embed iScape, SketchUp, or Home Depot Project Color — they are not constrained to this crew’s catalog, and they do not convert to a walkthrough in Kent.',
  },
  {
    question: 'Do you keep my photo?',
    answer:
      'No. Your photo stays in your browser session and is not stored anywhere unless you choose to send us the design. If you do send it, it goes to the estimator so they can see the site before they call.',
  },
  {
    question: 'What if I want a wall taller than the tool will draw?',
    answer:
      'The tool caps walls at 4 feet, because that is the height where Western Washington jurisdictions start requiring engineering and a permit. We build taller walls regularly — it just needs an engineer, a permit and a few more weeks. Mention it and we will scope it properly.',
  },
  {
    question: 'Is there a catch? Do I have to book anything?',
    answer:
      'No. You can walk away with the scope, the range, and the real job photos. Call or text the written scope, copy it, or leave a name and a number if you want an estimator to walk the site. That is the whole exchange.',
  },
];

const howToSteps = [
  {
    name: 'Upload a photo of your yard',
    text: 'Take a picture from far enough back to get the whole area in frame. The photo stays in your browser unless you send the design.',
  },
  {
    name: 'Pick a scope and a style',
    text: 'Choose what you are thinking about — patio, wall, full backyard — and a style from the catalog of materials Blue Landscaping actually installs.',
  },
  {
    name: 'Review the written scope and real jobs',
    text: 'You get a cost range for this market and photographs of jobs this crew built in that category. An AI after-photo of your own house only appears when rendering is on, and it is labeled.',
  },
  {
    name: 'Call, text, or send the scope',
    text: 'Copy the scope, text it to Jose, or leave a name and number for a free on-site walkthrough. No account and no design fee.',
  },
];

export default function VisualizerPage() {
  return (
    <>
      <JsonLd
        data={graph([
          localBusinessSchema({ path: '/visualizer' }),
          faqSchema(faqs),
          howToSchema({
            name: 'See what Blue Landscaping would build in your yard',
            description:
              'Upload a yard photo, pick a buildable scope, and get a written cost range plus real jobs from this Kent crew.',
            path: '/visualizer',
            steps: howToSteps,
          }),
          {
            '@type': 'WebApplication',
            name: 'Blue Landscaping Yard Design Visualizer',
            applicationCategory: 'DesignApplication',
            operatingSystem: 'Web',
            url: 'https://bluelandscapingservices.com/visualizer',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            provider: { '@id': 'https://bluelandscapingservices.com/#organization' },
          },
        ])}
      />

      <Breadcrumbs crumbs={[{ name: 'Yard Visualizer', path: '/visualizer' }]} />

      <div className="shell pb-16 pt-8">
        <header className="max-w-3xl">
          <p className="eyebrow text-leaf-600">
            Free tool
          </p>
          <h1 className="mt-2 text-h1">See what we would build in your yard</h1>
          <QuickAnswer>
            {`Upload a photo, pick a scope and a style, and get a written plan drawn only from materials Blue Landscaping installs around Kent and Greater Seattle — plus real jobs like yours. Free, no account. Washington license ${business.license.number}.`}
          </QuickAnswer>
        </header>

        <div className="mt-12">
          <Suspense
            fallback={
              <div className="shimmer aspect-[4/3] w-full rounded-sm border border-ink-200" aria-hidden="true" />
            }
          >
            <Visualizer />
          </Suspense>
        </div>
      </div>

      <section className="border-y border-ink-200 bg-white">
        <div className="shell section-tight grid gap-10 md:grid-cols-3">
          <div>
            <h2 className="text-h3">Only what we can build</h2>
            <p className="mt-3 text-body text-ink-500">
              The tool can only draw materials we install and stock locally. No pools, no fantasy
              pergolas, no 8-foot walls that would need an engineer first.
            </p>
          </div>
          <div>
            <h2 className="text-h3">No design fee</h2>
            <p className="mt-3 text-body text-ink-500">
              Play with options here, then book a free visit if you like what you see. The written
              quote is still the number that matters.
            </p>
          </div>
          <div>
            <h2 className="text-h3">Built for this climate</h2>
            <p className="mt-3 text-body text-ink-500">
              Planting is restricted to USDA zone 8b material that survives wet winters and a dry
              August here. Walls render at 4 ft or under, which is the height Western Washington
              cities start requiring engineering.
            </p>
          </div>
        </div>
      </section>

      <div className="shell section">
        <FaqList faqs={faqs} title="Questions about the visualizer" />
      </div>

      <CtaBand
        title="Prefer to skip straight to a real quote?"
        body="Free on-site walkthrough, a written scope, and a range you can plan around."
      />
    </>
  );
}
