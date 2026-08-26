import type { Faq, ProcessStep } from '@/data/types';

/**
 * Homepage copy.
 *
 * Voice: how the owner would say it on the phone. Short sentences. Contractions.
 * Plain words. No balanced "not X but Y" constructions, no em-dash asides, no
 * three-part lists that all end on the same beat — that cadence is what makes
 * marketing copy read as machine-written, and homeowners notice.
 */

export const howItWorks: ProcessStep[] = [
  {
    title: 'We come look at it',
    description:
      "Free visit, no obligation. We walk the yard, check the grade, and find out where the water goes. You talk to the person who'll run the job, not a salesman.",
  },
  {
    title: 'You get a real number',
    description:
      "We draw it and price it ourselves. The quote names the materials, the phases and a schedule. There's no design fee, because design isn't a separate company here.",
  },
  {
    title: 'Our crew builds it',
    description:
      "Our own people do the digging, the base, the drainage and the finish work. Nobody subs out the hardscape. That's the part you can't inspect later, so it's the part we don't hand off.",
  },
  {
    title: 'We walk it with you',
    description:
      "We go over the finished job together and fix anything that isn't right before we leave. You get the paperwork, including the backflow test certificate on irrigation work.",
  },
];

export const whyUs = [
  {
    title: 'One company, start to finish',
    body: "Most yards go through a designer, a general contractor and whichever crew bid lowest. Every handoff is somewhere the drawing and the build drift apart, and you're the one who finds out. We do both, so the plan is always something we already know how to build for the price we quoted.",
  },
  {
    title: 'No subs on hardscape',
    body: "The crew that shows up is ours. That matters most for the parts nobody sees afterward: how deep we dug, how well the base got compacted, whether there's drain rock and a drain line behind the wall. Those are the first things a cheap bid cuts.",
  },
  {
    title: 'Licensed, bonded and insured',
    body: 'Washington contractor license BLUELLS880K2, a $12,000 bond and $1M in liability coverage. You can check all of it with L&I in about thirty seconds. Do it for us and for anyone else you get a bid from.',
  },
  {
    title: 'Built for our weather',
    body: "Wet winters, glacial till, clay, and then a genuinely dry August. That changes real decisions: how deep the base goes, where the drain line runs, which plants are worth putting in the ground. Work specified for somewhere else doesn't last here.",
  },
];

export const homeFaqs: Faq[] = [
  {
    question: 'How much does a typical project cost?',
    answer:
      'Paver patios usually run $18 to $32 a square foot installed. A segmental retaining wall under 4 feet runs $45 to $70 per face square foot. Most residential jobs land between $8,000 and $40,000. Every service page here publishes its own cost table, so you can get a real number before anyone visits.',
  },
  {
    question: 'Do you charge for estimates?',
    answer:
      "No. The site visit and the written quote are both free, and there's no design fee either. Design happens in-house as part of the build. That's the main difference between us and firms that farm it out.",
  },
  {
    question: 'What areas do you serve?',
    answer:
      'We work out of Kent and cover South King County closely: Kent, Auburn, Renton, Covington, Maple Valley, Federal Way, Des Moines, Tukwila, Burien and SeaTac. We also take work on the Eastside and in Seattle. Outside that, ask anyway and we will tell you straight.',
  },
  {
    question: 'How long does a project take?',
    answer:
      'A straightforward paver patio takes three to six working days. A retaining wall runs four days to two weeks depending on height and how much digging it needs. Irrigation installs are two to three days. Winter adds time, because we will not build on saturated base.',
  },
  {
    question: 'Are you licensed and insured?',
    answer:
      'Yes. Washington contractor registration BLUELLS880K2, a $12,000 bond and $1M general liability. The license number in the footer links straight to the L&I verification page.',
  },
  {
    question: 'Do you do the work yourselves or sub it out?',
    answer:
      'Hardscape is all our own crew. We bring in specialty trades only where the law requires it, like a licensed electrician for anything past low-voltage. Walls, patios, walkways and steps are ours.',
  },
  {
    question: 'When is the best time of year to start?',
    answer:
      'Late spring through early fall gives the most reliable weather, and that is when the calendar fills up. Hardscape can go in year-round here as long as the base can be compacted dry, so winter jobs are possible and usually get scheduled sooner.',
  },
  {
    question: 'Will my project need a permit?',
    answer:
      'Patios and walkways at grade usually do not. Retaining walls over 4 feet need engineering and a permit almost everywhere in Western Washington, and some cities trigger lower for tiered or surcharged walls. We check with your city before we dig and handle the paperwork.',
  },
  {
    question: 'Can you fix work another contractor did badly?',
    answer:
      'Often, and a good share of our work is exactly that. Settling pavers, leaning walls, irrigation that never worked right. We will tell you honestly whether it is a repair or whether it has to come out and be rebuilt. Sometimes it is the second one.',
  },
  {
    question: 'How fast will you get back to me?',
    answer:
      'Same day on almost everything. A quote request texts and emails the owner within seconds, so during working hours the call usually comes back inside the hour.',
  },
];
