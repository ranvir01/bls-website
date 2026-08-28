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
      "It's a free visit and there's no obligation. We walk the yard, look at the grade, and figure out where the water goes when it rains. The person who shows up is the one who'll run your job.",
  },
  {
    title: 'You get a real number',
    description:
      "We draw it and price it. The quote names the materials, the phases and a schedule. There's no design fee. Sit on the number as long as you want.",
  },
  {
    title: 'We build it',
    description:
      "We dig it, set the base, run the drainage and do the finish work. Most of the days on site go into the part that ends up buried. Once the pavers are down, nobody can see whether the base was done right. So that's where we spend the time.",
  },
  {
    title: 'We walk it with you',
    description:
      "We walk the finished job with you. Anything that isn't right gets fixed before we pull off the site. You get the paperwork too, including the backflow test certificate on irrigation work.",
  },
];

export const whyUs = [
  {
    title: 'You call the same number later',
    body: "Same shop in Kent since 2012, same phone number. If something needs looking at a year from now, the person who answers is the person who built it. Nobody has moved on, folded, or handed your file to whoever bought the customer list.",
  },
  {
    title: 'What a cheap bid skips',
    body: "A cheap bid has to save the money somewhere, and it's almost always underground. Shallow excavation. Base that never got compacted properly. No drain rock behind the wall. None of that shows up the week the job finishes. It shows up a few winters later, when the wall starts leaning.",
  },
  {
    title: 'Licensed, bonded and insured',
    body: "Washington contractor license BLUELLS880K2, a $12,000 bond and $1M in liability coverage. You don't have to take our word for any of it. Type the number into the L&I verify page and you'll see the license status, the bond and the insurance. Takes a minute. Do it for every bid you get, not just ours.",
  },
  {
    title: 'Built for Puget Sound weather',
    body: "Wet winters, clay and till underneath, then a dry August. That changes what we build. We set base depth for ground that stays wet half the year. Drainage gets figured out before anything else starts. Plants have to sit through a soaked February and then a month without rain.",
  },
];

export const homeFaqs: Faq[] = [
  {
    question: 'How much does a typical project cost?',
    answer:
      "Paver patios usually run $18 to $32 a square foot installed. A segmental retaining wall under 4 feet runs $45 to $70 per face square foot. Most residential jobs land between $8,000 and $40,000. Every service page here has its own cost table. You can work out a real number before anyone comes to the house.",
  },
  {
    question: 'Do you charge for estimates?',
    answer:
      "No. The site visit is free and so is the written quote. There's no design fee either. You get the whole number in writing before you decide anything.",
  },
  {
    question: 'What areas do you serve?',
    answer:
      "We work out of Kent. South King County is our home ground: Kent, Auburn, Renton, Covington, Maple Valley, Federal Way, Des Moines, Tukwila, Burien and SeaTac. We take work on the Eastside and in Seattle too. If you're outside all that, call anyway. We'll tell you straight.",
  },
  {
    question: 'How long does a project take?',
    answer:
      "A straightforward paver patio takes three to six working days. A retaining wall runs four days to two weeks, depending on the height and how much digging it needs. Irrigation installs are two to three days. Winter adds time. We won't build on saturated base.",
  },
  {
    question: 'Are you licensed and insured?',
    answer:
      "Yes. Washington contractor registration BLUELLS880K2, a $12,000 bond and $1M general liability. Click the license number down in the footer and it takes you straight to the L&I verification page.",
  },
  {
    question: 'Do you do the work yourselves or sub it out?',
    answer:
      "Hardscape is all our own crew: walls, patios, walkways and steps. We bring in a specialty trade only where the law requires it. Anything past low-voltage needs a licensed electrician, so we hire one for that.",
  },
  {
    question: 'When is the best time of year to start?',
    answer:
      "Late spring through early fall has the most reliable weather. That's also when the calendar fills up. Hardscape can go in year-round here, as long as we can get the base compacted dry. Winter jobs work fine and they usually get scheduled sooner.",
  },
  {
    question: 'Will my project need a permit?',
    answer:
      "Patios and walkways at grade usually don't. A retaining wall over 4 feet needs engineering and a permit almost everywhere in Western Washington. Some cities trigger lower than that for tiered or surcharged walls. We check with your city before we dig, and we handle the paperwork.",
  },
  {
    question: 'Can you fix work another contractor did badly?',
    answer:
      "Often, yes. A good share of our work is exactly that. Settling pavers, leaning walls, irrigation that never worked right. We'll tell you honestly whether it's a repair or whether the whole thing has to come out and be rebuilt. Sometimes it's the second one.",
  },
  {
    question: 'Can I see what my yard would look like first?',
    answer:
      "Yes. Upload a photo on the yard visualizer. You get a written scope from materials we install, a cost range, and photos of jobs we actually built in that category. If rendering is on, you also get an AI after-photo of your own house, labeled as a concept.",
  },
  {
    question: 'Where can I check you besides this website?',
    answer:
      "Google Business Profile, the Washington L&I contractor search for license BLUELLS880K2, and the public license record. We do not invent reviews. The Reviews page has the links.",
  },
  {
    question: 'How fast will you get back to me?',
    answer:
      "Same day on almost everything. A quote request off this site texts and emails the owner within seconds. During working hours you'll usually hear back inside the hour.",
  },
];
