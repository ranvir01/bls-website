import type { ServiceCityContent } from '@/data/types';

const content: ServiceCityContent = {
  citySlug: 'des-moines',
  serviceSlug: 'sprinkler-installation',
  h1: 'Sprinkler Installation in Des Moines, WA',
  metaTitle: 'Sprinkler Installation in Des Moines, WA',
  metaDescription:
    'Bluff-aware sprinkler installation in Des Moines, WA. Drip at the crest, check valves on falling zones, tight platted lots, Highline Water District backflow.',
  quickAnswer:
    'On a Des Moines bluff lot, irrigation water is a slope question. Rain and sprinkler water alike move down through outwash sand until they reach Lawton Clay and turn sideways at the bluff face, so we hold spray back from the crest, run edge beds on drip, spec check valves, and schedule off live weather.',
  body: [
    "West of Marine View Drive, an irrigation plan is partly a drainage plan. The stratigraphy under that side of the city runs a till cap over advance outwash sand over Lawton Clay. Water that soaks in keeps travelling down through the sand until it meets clay it can't pass. Then it moves sideways and daylights at the face. Adding a few hundred gallons a night to the crest of that slope through July and August is not a neutral act. So on bluff-top lots we keep the spray zones back from the edge. Beds near the crest go on low-flow dripline. And a weather-based controller skips cycles instead of running a fixed clock.",
    'The original 1889 plat pattern makes the layout here finer than in most of our service area. Twenty-five and fifty foot lots, some combined over the years and some not. That gives you narrow side yards, a lot of edges and short throws. Usually it means more zones carrying fewer heads instead of two big rotor zones. Bed zones matter more in Des Moines too. Kinnikinnick, salal, hebe and lavender on an exposed Woodmont or Redondo corner want deep, infrequent drip while they establish, and very little after that. Put them on a valve with a lawn schedule and they suffer for it.',
    "Highline Water District serves most of the city. So the irrigation meter and the backflow assembly get permitted and tested through the district, not through City Hall, and the annual test notice comes from them. Every zone that falls toward the water gets check valves in the head bodies. On this grade, a lateral that empties after each cycle sends its contents straight to the lowest point on the property. That's exactly where nobody wants extra water. Streets on the older plats are narrow, so we stage material on the lot instead of at the curb.",
  ],
  localAngle:
    'On the bluff side of Des Moines, summer irrigation feeds the same groundwater that perches on Lawton Clay and comes out at the slope face. So here, setback from the crest, drip in the edge beds and weather-based scheduling are slope decisions. Anywhere else they would just be efficiency upgrades.',
  faqs: [
    {
      question: 'Can I have a sprinkler system on a bluff-top lot at all?',
      answer:
        "Yes. Most Des Moines bluff properties have some form of watering. The design just has to respect where the water ends up. We hold turf spray back from the crest. Edge beds go on dripline with pressure regulation and a filter, so application stays low and controlled. Check valves keep laterals from draining toward the slope between cycles. The controller gets a rain sensor or a live weather feed. One thing to flag. If your lot sits in a mapped landslide or erosion hazard area and the scope involves grading, that's a geotechnical conversation before it's a landscape one.",
    },
    {
      question: 'Who handles the backflow test in Des Moines?',
      answer:
        'Highline Water District serves water across most of the city, so cross-connection control runs through them. The assembly has to be an approved model, set at the correct height and orientation. A Washington-certified backflow assembly tester has to test it when it goes in, then every twelve months after. We install to district requirements, get the first test done and file the report. Your annual notice shows up with no surprises attached.',
    },
    {
      question: 'What should I plant on drip out on a windy, salty corner?',
      answer:
        "Tough, low evergreen material that'll take southwest wind carrying spray off the Sound. Kinnikinnick as groundcover. Salal and evergreen huckleberry for structure. Hebe for form. Lavender where the sun and the drainage are both sharp. Carex for movement, and dwarf conifers on the most exposed corners. All of that goes on a dripline zone at a low emitter rate, never on lawn heads. After the second summer the run time drops way off. Those plants stop needing much.",
    },
    {
      question: 'Does a small Des Moines lot cost less than a big suburban one?',
      answer:
        'Not always in proportion. Small original platted lots give you a lot of edges, odd shapes and short throws. Head count per square foot goes up. You can end up with four or five zones on a yard that looks like it should need three. Typical 2026 Puget Sound installed cost runs roughly $850 to $1,400 per zone. A dripline bed zone is around $500 to $1,100. Those are planning ranges. On the narrow streets here, access and staging move the labor side as much as area does.',
    },
  ],
};

export default content;
