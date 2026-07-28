import type { CategoryContent } from '@/data/types';

/**
 * The three category hub pages. Each one exists to rank for the broad category
 * term and to funnel to the specific service pages beneath it.
 */
export const categoryContent: Record<string, CategoryContent> = {
  hardscaping: {
    slug: 'hardscaping',
    name: 'Hardscaping',
    h1: 'Hardscaping in Kent & Greater Seattle',
    metaTitle: 'Hardscaping Contractor in Kent & Greater Seattle',
    metaDescription:
      'Licensed hardscaping contractor in Kent, WA. Retaining walls, paver patios, walkways, driveways, fire features and steps built in-house across South King County.',
    quickAnswer:
      'Blue Landscaping Services builds retaining walls, paver patios, walkways, driveways, outdoor steps, seating walls, fire features and water features across South King County. All hardscape work is self-performed by our own crew under Washington contractor license BLUELLS880K2 — no subcontractors on the build.',
    intro: [
      'Hardscaping is the part of a yard that has to survive Puget Sound winters. A patio that was never compacted properly will telegraph every rut by its second February. A wall built without drain rock and a drain line behind it becomes a hydrostatic pressure problem, not a landscape feature. Most of the repair work we get called into is the result of one of those two shortcuts.',
      'We build the base the way it should be built: excavate to competent soil, lay and compact crushed rock in lifts, and give water somewhere to go before it finds its own route. That is unglamorous and it is most of the cost, and it is the entire reason a install still looks right after ten winters.',
      'Design and construction both happen in-house. You are not paying a separate design fee, waiting on a landscape architect, and then handing the drawings to whichever crew bid lowest. The people who draw it are the people who build it, which means what gets drawn is something we already know how to construct at that price.',
    ],
    faqs: [
      {
        question: 'What is the difference between hardscaping and landscaping?',
        answer:
          'Hardscaping covers the built, non-living elements — walls, patios, walkways, driveways, steps and fire features. Landscaping covers the living material and the ground plane: planting, lawns, sod and irrigation. Most projects need both, and we self-perform the hardscape while coordinating the planting around it.',
      },
      {
        question: 'Do you need a permit for hardscaping in King County?',
        answer:
          'Patios and walkways at grade generally do not require a permit. Retaining walls become a permit-and-engineering matter above 4 feet of exposed height in essentially every Western Washington jurisdiction, and several cities trigger lower when a wall carries a surcharge or is tiered. Larger impervious-surface additions can trigger drainage review. We confirm with the city before we dig.',
      },
      {
        question: 'How long does a hardscape project take?',
        answer:
          'A straightforward paver patio is typically three to six working days. A retaining wall runs four days to two weeks depending on height, length and how much excavation the site needs. Weather adds time between November and March — we do not set pavers on saturated base, because it does not hold.',
      },
      {
        question: 'What time of year is best for hardscaping in the Pacific Northwest?',
        answer:
          'Late spring through early fall gives the most reliable working conditions, and that is when the schedule fills. Hardscape can be built year-round here as long as the base can be compacted dry, so winter projects are possible and often scheduled sooner. Booking a summer build in the preceding winter is the usual way to get the date you want.',
      },
    ],
  },

  irrigation: {
    slug: 'irrigation',
    name: 'Irrigation',
    h1: 'Irrigation Systems in Kent & Greater Seattle',
    metaTitle: 'Sprinkler & Irrigation Contractor in Kent, WA',
    metaDescription:
      'Sprinkler installation, repair and winterization in Kent and South King County. Zoned systems with backflow prevention, installed and serviced by a licensed WA contractor.',
    quickAnswer:
      'Blue Landscaping Services installs, repairs and winterizes residential sprinkler systems across South King County. New systems are zoned by sun exposure and plant type, include a code-required backflow assembly, and are pressure-tested before backfill. Fall blowouts run September through November, before the first hard freeze.',
    intro: [
      'People assume a region this wet does not need irrigation. Then July arrives, six weeks pass without meaningful rain, and the lawn that looked perfect in May goes dormant and brown. Puget Sound summers are genuinely dry — the rain is concentrated in the winter half of the year — and anything planted in the last two seasons will not survive that stretch on its own.',
      'A system that works is a system that is zoned correctly. Full-sun turf, shaded beds and new plantings all want different amounts of water on different schedules, and putting them on one valve guarantees that something is being drowned while something else is dying. We separate them, then set a controller schedule you can actually leave alone.',
      'Washington requires backflow prevention on any irrigation system tied into potable supply, and in most local jurisdictions the assembly has to be tested by a certified tester after install and annually after that. We install to code and hand you the paperwork rather than leaving you to find out at the first city notice.',
    ],
    faqs: [
      {
        question: 'When should sprinklers be winterized in the Seattle area?',
        answer:
          'Aim for October, and treat the first week of November as the outside limit. Puget Sound lowlands usually see the first hard freeze between late November and mid-December, but early cold snaps happen. A blowout costs a fraction of what a cracked backflow assembly or a split mainline costs to repair.',
      },
      {
        question: 'How much does a sprinkler system cost in King County?',
        answer:
          'Most residential installs land between $3,000 and $8,000 depending on the number of zones, the yard size, and whether the lawn is already established — retrofitting an existing lawn costs more than installing before sod goes down. A typical quarter-acre suburban lot runs four to six zones.',
      },
      {
        question: 'Do I need a backflow preventer on my irrigation system?',
        answer:
          'Yes. Washington plumbing code requires backflow prevention on irrigation systems connected to potable water, and most cities require an annual test by a certified tester. It protects the drinking water supply from anything sitting in the irrigation lines, and it is not an optional add-on.',
      },
      {
        question: 'Can you repair a system you did not install?',
        answer:
          'Yes, and a large share of our irrigation work is exactly that. Broken heads, cut lateral lines from other trades, dead zones, stuck valves and controller faults are all routine. We diagnose first and tell you what is actually wrong before we start replacing parts.',
      },
    ],
  },

  landscaping: {
    slug: 'landscaping',
    name: 'Landscaping',
    h1: 'Landscaping in Kent & Greater Seattle',
    metaTitle: 'Landscaping Contractor in Kent & South King County',
    metaDescription:
      'Fencing, lawn maintenance, planting design and sod installation in Kent, WA and across South King County. Zone 8b plant selection from a licensed local contractor.',
    quickAnswer:
      'Blue Landscaping Services handles fencing, scheduled lawn maintenance, planting design and sod installation throughout South King County. Planting plans use USDA zone 8b material that survives wet winters and dry Augusts here, and lawn installs start with grading and soil amendment rather than sod laid over compacted subgrade.',
    intro: [
      'Most failed planting in this region fails for the same reason: something was chosen for how it looked at the nursery rather than for whether it tolerates a winter with its roots in saturated soil. Zone 8b is generous on paper — the winters are mild — but the combination of heavy clay, months of rain, and then a genuinely dry August is a narrower window than the hardiness map suggests.',
      'We plant what survives that. Sword fern, salal, evergreen huckleberry, vine maple, hydrangea, hebe, carex, red twig dogwood, rhododendron and the dwarf conifers do well here with very little intervention once established. That is not a limitation; it is what a yard looks like when it still looks good in year five without constant replacement.',
      'The same thinking applies to lawns. Sod rolled over compacted construction subgrade will look excellent for a month and then thin out, because the roots cannot get anywhere. Grading, decompaction and a real amended topsoil layer are what determine whether a lawn establishes, and they are what we do before any sod arrives.',
    ],
    faqs: [
      {
        question: 'What plants actually survive in the Puget Sound region?',
        answer:
          'Sword fern, salal, evergreen huckleberry, kinnikinnick, vine maple, Japanese maple, hydrangea, hebe, carex, red twig dogwood, rhododendron, lavender and the dwarf conifers all handle our wet winters and dry late summers well. Anything that objects to sitting in damp soil from November through April is a poor bet regardless of its hardiness rating.',
      },
      {
        question: 'When is the best time to install sod in Western Washington?',
        answer:
          'Spring and early fall. Both give warm enough soil to root and enough natural moisture to establish without heroic watering. Mid-summer installs work but need daily irrigation for the first two to three weeks. Sod laid in the depth of winter roots slowly and is vulnerable to standing water.',
      },
      {
        question: 'Do you offer ongoing lawn maintenance?',
        answer:
          'Yes — scheduled mowing, edging, pruning, bed maintenance and seasonal cleanups on a recurring visit schedule. Most residential properties are a weekly or biweekly visit through the growing season, dropping to monthly over winter.',
      },
      {
        question: 'What kind of fencing do you install?',
        answer:
          'Cedar privacy fence, horizontal cedar, black aluminum and split rail. Cedar is the regional default because it handles the moisture, and how long it lasts comes down mostly to whether the posts were set properly. We set posts in concrete below frost depth with the grade sloped away from them.',
      },
    ],
  },
};

export function getCategoryContent(slug: string): CategoryContent | undefined {
  return categoryContent[slug];
}
