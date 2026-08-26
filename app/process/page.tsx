import type { Metadata } from 'next';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { CtaBand, FaqList, QuickAnswer } from '@/components/blocks';
import { JsonLd } from '@/components/json-ld';
import { Reveal } from '@/components/motion/reveal';
import { howItWorks } from '@/data/content/home';
import type { Faq } from '@/data/types';
import { buildMetadata, faqSchema, graph, localBusinessSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Our Process — Consultation to Final Walkthrough',
  description:
    'How a Blue Landscaping project runs: free on-site walkthrough, in-house design and written scope, self-performed build, and a final walkthrough together.',
  path: '/process',
});

const detail: { title: string; body: string[] }[] = [
  {
    title: 'Free on-site walkthrough',
    body: [
      'We come out and look at the actual site. That means walking the grade, finding out where water currently goes and where it will go once we change the surface, checking access for equipment, and noting anything buried that will complicate excavation.',
      'You talk to the person who will run the job, not a commissioned salesperson. If what you want is not a good fit — wrong season, wrong scope for the budget, or a job better suited to a different trade — we will say so on the visit rather than after the deposit.',
    ],
  },
  {
    title: 'In-house design and a written scope',
    body: [
      'We draw the design ourselves and price it ourselves. You get a written scope that names the actual materials, sets out the phases, gives a realistic schedule, and states a cost range rather than a number pulled tight enough to need walking back later.',
      'There is no separate design fee, because design is not a separate company. If you want to see options before committing, the yard visualizer on this site will generate them instantly from the same material catalog we build from.',
    ],
  },
  {
    title: 'Permits and engineering, where they apply',
    body: [
      'Retaining walls over 4 feet of exposed height need engineering and a permit in essentially every Western Washington jurisdiction, and several cities trigger lower for tiered walls or walls carrying a surcharge. Larger impervious-surface additions can trigger drainage review.',
      'We confirm the requirement with your city before anyone digs, and we handle the submission. It adds time — usually two to four weeks — and we build that into the schedule rather than discovering it halfway through.',
    ],
  },
  {
    title: 'Our crew builds it',
    body: [
      'Hardscape construction is self-performed. Excavation, base preparation, compaction in lifts, drainage, and the finish work are all done by our own people. We coordinate specialty trades only where the law requires it, such as a licensed electrician for anything beyond low-voltage.',
      'The unglamorous parts get the most attention, because they are what determines the outcome. A patio is only as flat in year ten as its base was compacted in week one.',
    ],
  },
  {
    title: 'Final walkthrough together',
    body: [
      'We walk the finished job with you, fix anything that is not right before we leave, and show you what maintenance it actually needs — which for most hardscape is very little, and for irrigation is one fall blowout a year.',
      'You get the paperwork: the scope as built, any permit sign-offs, and on irrigation work the backflow assembly test certificate your city will ask for annually.',
    ],
  },
];

const faqs: Faq[] = [
  {
    question: 'How long does it take to get on the schedule?',
    answer:
      'It depends heavily on the season. Spring and summer book out furthest — often four to eight weeks for a hardscape build. Late fall and winter are usually much quicker. Booking a summer project the preceding winter is the reliable way to get the date you want.',
  },
  {
    question: 'Do you take a deposit?',
    answer:
      'Yes, on materials, with the balance structured against progress rather than paid up front. Washington law limits what a contractor can require before work starts, and any contractor asking for the full amount before breaking ground is a warning sign regardless of who they are.',
  },
  {
    question: 'What happens if the weather turns mid-project?',
    answer:
      'We stop before we compromise the work. Base cannot be compacted properly when it is saturated, and pavers set on soft base will move. Between November and March this adds days to most schedules, and we tell you that up front rather than presenting it as a surprise delay.',
  },
  {
    question: 'What if I want to change something during the build?',
    answer:
      'Talk to the crew lead on site. Small adjustments are usually easy while we are still there and cost far less than they would as a return trip. Anything that changes scope materially gets written up and priced before we proceed, so nothing shows up on the final invoice that you have not agreed to.',
  },
];

export default function ProcessPage() {
  return (
    <>
      <JsonLd data={graph([localBusinessSchema({ path: '/process' }), faqSchema(faqs)])} />

      <Breadcrumbs crumbs={[{ name: 'Our Process', path: '/process' }]} />

      <div className="shell pb-16 pt-8">
        <header className="max-w-3xl">
          <p className="text-caption font-semibold uppercase tracking-wide text-brand-600">
            How we work
          </p>
          <h1 className="mt-2 text-h1">From first call to final walkthrough</h1>
          <QuickAnswer>
            {`A Blue Landscaping project runs in ${howItWorks.length} steps: a free on-site walkthrough, in-house design with a written scope and cost range, permitting where required, a self-performed build by our own crew, and a final walkthrough together. No design fee, and no subcontractors on hardscape.`}
          </QuickAnswer>
        </header>

        <ol className="mt-14 space-y-14">
          {detail.map((step, i) => (
            <Reveal as="li" key={step.title}>
              <div className="grid gap-6 md:grid-cols-[auto_1fr] md:gap-10">
                <span
                  aria-hidden="true"
                  className="font-display text-display leading-none text-brand-50"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h2 className="text-h2">{step.title}</h2>
                  <div className="mt-4 max-w-prose space-y-4 text-body-lg text-ink-800">
                    {step.body.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="mt-16">
          <FaqList faqs={faqs} title="Questions about how we work" />
        </div>
      </div>

      <CtaBand />
    </>
  );
}
