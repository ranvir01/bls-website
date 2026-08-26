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
    'How a Blue Landscaping project runs: free on-site walkthrough, a written scope with a real cost range, a self-performed build, and a final walkthrough together.',
  path: '/process',
});

const detail: { title: string; body: string[] }[] = [
  {
    title: 'Free on-site walkthrough',
    body: [
      'We come out and look at the actual site. We walk the grade. We find out where the water goes now, and where it\'ll go once we change the surface. We check what we can get equipment through. And we look for anything buried that will make the digging harder.',
      'You talk to the person who runs the job. Not a salesperson on commission. If what you want isn\'t a good fit, you\'ll hear it on the visit. Sometimes it\'s the wrong season. Sometimes the scope is too big for the budget, or the work really belongs to a different trade. We\'d rather tell you that day than after you\'ve put down a deposit.',
    ],
  },
  {
    title: 'A written scope with a cost range',
    body: [
      'You get a written scope. It names the actual materials. It lays out the phases and gives you a realistic schedule. The cost comes as a range. Pull a number too tight and you end up walking it back later.',
      'There\'s no separate design fee. If you want to see options before you commit to anything, use the yard visualizer on this site. It generates them instantly, off the same material catalog we build from.',
    ],
  },
  {
    title: 'Permits and engineering, where they apply',
    body: [
      'A retaining wall over 4 feet of exposed height needs engineering and a permit. That\'s true in essentially every Western Washington jurisdiction. Several cities trigger lower than that for tiered walls, or walls carrying a surcharge. Bigger additions of impervious surface can trigger drainage review too.',
      'We confirm what your city wants before anyone digs, and we handle the submission. It adds time. Usually two to four weeks. That goes into the schedule at the start, not halfway through the job.',
    ],
  },
  {
    title: 'Excavation, base, and finish work',
    body: [
      'Our own people do the hardscape. Excavation, base preparation, compaction in lifts, drainage, the finish work. We bring in a specialty trade only where the law says we have to, like a licensed electrician for anything beyond low-voltage.',
      'The unglamorous parts get the most attention. They\'re what decides how the job holds up. A patio is only as flat in year ten as its base was compacted in week one.',
    ],
  },
  {
    title: 'Final walkthrough together',
    body: [
      'We walk the finished job with you. Anything that isn\'t right, we fix it before we leave. Then we show you what maintenance it actually needs. For most hardscape that\'s very little. For irrigation it\'s one blowout every fall.',
      'You get the paperwork too. The scope as built, any permit sign-offs, and on irrigation work the backflow assembly test certificate. Your city will ask for that one every year.',
    ],
  },
];

const faqs: Faq[] = [
  {
    question: 'How long does it take to get on the schedule?',
    answer:
      'Depends a lot on the season. Spring and summer book out furthest, often four to eight weeks for a hardscape build. Late fall and winter are usually much quicker. Want a summer date? Book it the winter before. That\'s the reliable way to get the one you want.',
  },
  {
    question: 'Do you take a deposit?',
    answer:
      'Yes, a deposit on materials. The balance is tied to progress. You\'re not paying it up front. Washington law limits what a contractor can require before work starts. If anyone asks you for the full amount before they break ground, that\'s a warning sign. Doesn\'t matter who they are.',
  },
  {
    question: 'What happens if the weather turns mid-project?',
    answer:
      'We stop. Base can\'t be compacted properly when it\'s saturated, and pavers set on soft base will move. Between November and March that adds days to most schedules. We tell you up front so it isn\'t a surprise later.',
  },
  {
    question: 'What if I want to change something during the build?',
    answer:
      'Talk to the crew lead on site. Small adjustments are usually easy while we\'re still there, and they cost far less than a return trip. Anything that really changes the scope gets written up and priced before we carry on. Nothing lands on the final invoice that you haven\'t agreed to.',
  },
];

export default function ProcessPage() {
  return (
    <>
      <JsonLd data={graph([localBusinessSchema({ path: '/process' }), faqSchema(faqs)])} />

      <Breadcrumbs crumbs={[{ name: 'Our Process', path: '/process' }]} />

      <div className="shell pb-16 pt-8">
        <header className="max-w-3xl">
          <p className="eyebrow text-brand-600">
            How we work
          </p>
          <h1 className="mt-2 text-h1">From first call to final walkthrough</h1>
          <QuickAnswer>
            {`A Blue Landscaping project runs in ${howItWorks.length} steps: a free on-site walkthrough, a written scope with a real cost range, permitting where the work needs it, the build, and a final walkthrough together. There is no design fee, and most quotes go out the same day we come look.`}
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
