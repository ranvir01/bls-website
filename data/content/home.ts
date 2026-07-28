import type { Faq, ProcessStep } from '@/data/types';

/**
 * Homepage-specific copy. Kept out of components so the marketing text can be
 * edited without touching JSX.
 */

export const howItWorks: ProcessStep[] = [
  {
    title: 'Free on-site walkthrough',
    description:
      'We come out, look at the grade, check where water goes, and talk through what you actually want. No charge, no obligation, and no salesperson — you talk to the person who will run the job.',
  },
  {
    title: 'In-house design and a written scope',
    description:
      'We draw it ourselves and price it ourselves. You get a written scope with materials named, a cost range, and a realistic schedule. There is no separate design fee, because design is not a separate company.',
  },
  {
    title: 'Our crew builds it',
    description:
      'Hardscape work is self-performed — no subcontractors on the wall or the patio. Excavation, base, drainage and finish are all done by people who answer to us.',
  },
  {
    title: 'Final walkthrough together',
    description:
      'We walk the finished job with you, correct anything that is not right, and show you how to look after it. You get the paperwork, including the backflow test certificate on irrigation work.',
  },
];

export const whyUs = [
  {
    title: 'Design and build under one roof',
    body: 'Most contractors either outsource design, charge a separate design fee, or send you to a landscape architect before anyone talks about construction. We collapse that into one step, which is faster and cheaper for you and means nothing gets drawn that we cannot build.',
  },
  {
    title: 'No subs on hardscape',
    body: 'The crew that shows up is our crew. That matters most on the parts you cannot see afterwards — excavation depth, base compaction, drain rock and drain line. Those are the first things a low bid cuts and the only things that determine whether the work survives ten winters.',
  },
  {
    title: 'Licensed, bonded and insured',
    body: 'Washington contractor license BLUELLS880K2, a $12,000 bond and $1M general liability. You can verify all of it with L&I in about thirty seconds, and you should — for any contractor, not just us.',
  },
  {
    title: 'Built for this climate specifically',
    body: 'Everything we install is specified for wet winters, glacial till and clay, and a genuinely dry August. That drives real decisions: how deep the base goes, where the drain line runs, and which plants are worth putting in the ground.',
  },
];

export const homeFaqs: Faq[] = [
  {
    question: 'How much does a typical project cost?',
    answer:
      'A paver patio usually runs $18–$32 per square foot installed, and a segmental retaining wall under 4 ft runs $45–$70 per face square foot. Most residential projects land between $8,000 and $40,000. Every service page on this site publishes its own cost table, so you can get a real number before anyone visits.',
  },
  {
    question: 'Do you charge for estimates?',
    answer:
      'No. The on-site walkthrough and the written scope are free. We do not charge a design fee either — design happens in-house as part of the build, which is the main structural difference between us and firms that outsource it.',
  },
  {
    question: 'What areas do you serve?',
    answer:
      'We work out of Kent and cover South King County closely — Kent, Auburn, Renton, Covington, Maple Valley, Federal Way, Des Moines, Tukwila, Burien and SeaTac. We also take work on the Eastside and in Seattle. If you are outside that, ask anyway and we will tell you straight.',
  },
  {
    question: 'How long does a project take?',
    answer:
      'A straightforward paver patio is three to six working days. A retaining wall is four days to two weeks depending on height and excavation. Irrigation installs are two to three days. Weather adds time in winter — we do not build on saturated base, because it does not hold.',
  },
  {
    question: 'Are you licensed and insured?',
    answer:
      'Yes. Washington contractor registration BLUELLS880K2, a $12,000 bond and $1M general liability. The license number links straight to the L&I verification page from the footer of every page on this site.',
  },
  {
    question: 'Do you do the work yourselves or subcontract it?',
    answer:
      'Hardscape construction is entirely self-performed by our own crew. We coordinate specialty trades where the law requires it — a licensed electrician for anything beyond low-voltage, for instance — but walls, patios, walkways and steps are built by us.',
  },
  {
    question: 'What is the best time of year to start a project?',
    answer:
      'Late spring through early fall gives the most reliable conditions, and that is when the calendar fills. Hardscape can be built year-round here as long as the base can be compacted dry, so winter projects are possible and usually get scheduled sooner.',
  },
  {
    question: 'Do you need a permit for my project?',
    answer:
      'Patios and walkways at grade generally do not. Retaining walls over 4 ft need engineering and a permit in essentially every Western Washington jurisdiction, and some cities trigger lower for tiered or surcharged walls. We confirm with your city before we dig and handle the paperwork.',
  },
  {
    question: 'Can you fix work another contractor did badly?',
    answer:
      'Often, yes, and a fair amount of our work is exactly that. Settling pavers, leaning walls and irrigation that never worked properly are all common. We will tell you honestly whether it is a repair or whether it needs to come out and be rebuilt — sometimes it is the second one.',
  },
  {
    question: 'How quickly will you get back to me?',
    answer:
      'Same day on almost every request. A quote form submission sends a text and an email to the owner within seconds, so the callback usually happens within the hour during working hours.',
  },
];
