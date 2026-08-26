import type { BlogPost } from '@/data/types';

const post: BlogPost = {
  slug: 'drainage-solutions-sloped-yards-western-washington',
  title: 'Drainage Solutions for Sloped Yards in Western Washington',
  metaTitle: 'Drainage Solutions for Sloped Yards in Western Washington',
  metaDescription:
    'How to fix a wet hillside yard west of the Cascades: telling surface water from perched groundwater, tightlines, interceptor drains, 2026 King County cost ranges and what the rules allow.',
  publishedAt: '2026-07-28',
  quickAnswer:
    'Sloped yards in western Washington need three fixes, in order: roof water tightlined away from the slope, a grade that sheds water without concentrating it, and an interceptor drain cut across the hill above the wet area to catch water perched on glacial till. Dry wells rarely work on till. Discharge onto a neighboring lot is not legal.',
  excerpt:
    'A wet hillside is almost always two different problems wearing one symptom. Here is how to separate surface water from perched groundwater, what each fix runs in King County, and where the rules draw the line.',
  blocks: [
    {
      type: 'p',
      text: 'Rain is not really the problem in this part of the state. Intensity here is mild by national standards: a two-year, twenty-four hour storm in the King County lowlands is around two inches, and even a hundred-year event lands near four. What we get instead is duration. Thirty-eight to forty-five inches falls on the valley floor between October and April, and the foothill edge from Maple Valley out toward North Bend takes four to six feet of it. Soil that never gets a chance to dry out behaves differently from soil that does, and a slope turns that slow saturation into movement.',
    },
    { type: 'h2', text: 'Two kinds of water, two different fixes' },
    {
      type: 'p',
      text: 'Surface water runs across the ground during and just after a storm. It comes off roofs, driveways, compacted lawn and the neighboring lot uphill, and it is a grading problem before it is a piping problem. Subsurface water is the harder one. Rain soaks through the upper foot or two of loam, hits dense glacial till it cannot pass through, and turns sideways, traveling downhill along that contact until something intercepts it or it surfaces as a seep. Those two conditions produce identical looking wet spots and need completely different work. Fixing the wrong one is the most common way money disappears into a hillside. Telling them apart takes a site visit between November and February, in the rain, with the downspouts running. A dry yard in July tells you almost nothing.',
    },
    {
      type: 'ul',
      items: [
        'Water shows up within an hour of rain starting and is gone within a day. That is surface flow, and grading owns it.',
        'The soft spot is still soft midweek during a dry stretch in March. That is groundwater, and no amount of regrading will touch it.',
        'A line of seeps, rushes or horsetail appears at roughly the same elevation across the slope. You are looking straight at the till contact where perched water comes out sideways.',
        'The soggy area sits directly below a downspout, a driveway edge, or a patio the neighbor built last summer. Somebody concentrated flow uphill of you.',
        'Standing water on the flat with a slope above it that never puddles. The slope is behaving; the toe is where water runs out of anywhere to go.',
        'Moss overtaking lawn on a north exposure. That is shade and compaction, and it is often not a drainage failure at all.',
      ],
    },
    { type: 'h2', text: 'The fixes, roughly in order of payoff' },
    { type: 'h3', text: 'Roof water leaves first' },
    {
      type: 'p',
      text: 'One inch of rain on a 1,500 square foot roof produces about 935 gallons. Dropped at the foundation through a splash block on a slope, that water is a firehose aimed at the exact soil you need to keep strong. Tightlining means a solid 4-inch line, SDR-35 rather than flexible corrugated where it matters, trenched from each downspout to a real outlet with continuous fall. On lots with workable infiltration, a downspout dispersion trench built to the county standard detail spreads that flow instead of concentrating it. This is the cheapest volume you will ever remove from a drainage problem, and it frequently solves the entire complaint on its own.',
    },
    { type: 'h3', text: 'Then the grade' },
    {
      type: 'p',
      text: 'Moving dirt is cheaper per gallon handled than any pipe on the market. The target is straightforward: positive fall away from the house, roughly six inches of drop across the first ten feet, then a route that carries water broadly rather than in a single channel. A shallow vegetated swale can move a surprising amount of water across a slope while looking like part of the landscape. This is also where new hardscape gets people in trouble. A patio cut into a hillside without a drain at the uphill edge becomes a catch basin with furniture on it, and the water it collects has to go somewhere.',
    },
    { type: 'h3', text: 'Then an interceptor drain across the hill' },
    {
      type: 'p',
      text: 'For perched groundwater, the fix is a curtain drain running across the slope above the wet zone, not inside it. The trench goes down to the till contact, usually three to five feet, so it captures water traveling along that boundary before it reaches your lawn, patio or foundation. Build it as a 4-inch perforated line bedded in washed angular drain rock, with the whole stone envelope wrapped in non-woven geotextile and a minimum of one percent fall to the outlet. Depth is what makes this expensive and depth is also what makes it work. A shallow trench dug in the middle of the wet area is the version that fails.',
    },
    { type: 'h3', text: 'Then conveyance, and an outlet that is actually legal' },
    {
      type: 'p',
      text: 'Collected water needs a route and a destination. That is solid pipe rather than perforated once you leave the collection zone, catch basins with sediment sumps at low points, and cleanouts at every bend and every hundred feet or so, because a system you cannot flush is a system with an expiration date. The destination is the part people leave until last and should decide first. Daylight on your own property, an approved connection to the municipal storm system, a dispersion or infiltration facility where soils genuinely accept water, or a sump and pump when the site has no gravity outlet at all. Dry wells are worth building on true glacial outwash. On till they fill up in the first sustained storm and stay full.',
    },
    {
      type: 'table',
      caption: 'Typical installed drainage costs, King County market, 2026',
      head: ['Fix', 'Installed range', 'Unit', 'Notes'],
      rows: [
        [
          'Downspout tightline to a legal outlet',
          '$18-$35',
          'per linear ft',
          'Solid 4-inch line, trenched, bedded and backfilled',
        ],
        [
          'Downspout dispersion trench',
          '$700-$1,600',
          'per downspout',
          'Standard detached-home detail where soils will accept water',
        ],
        [
          'Shallow French drain, 18-24 in deep',
          '$35-$65',
          'per linear ft',
          'Handles surface and shallow seepage only',
        ],
        [
          'Interceptor drain to the till contact, 3-5 ft',
          '$65-$130',
          'per linear ft',
          'Depth, spoil haul-off and hand digging near roots drive the number',
        ],
        [
          'Catch basin set and tied into a line',
          '$350-$750',
          'each',
          '12-inch grate basin with a sediment sump below the outlet',
        ],
        [
          'Solid conveyance line across the property',
          '$22-$45',
          'per linear ft',
          'Add for root cutting, hardscape saw cuts and buried debris',
        ],
        [
          'Regrade with a vegetated swale',
          '$25-$55',
          'per linear ft',
          'Shaping, topsoil and planting included',
        ],
        [
          'Rain garden with underdrain, 120-200 sq ft',
          '$2,800-$7,500',
          'each',
          'Underdrained, because native till will not infiltrate on its own',
        ],
        [
          'Dry well or infiltration gallery',
          '$1,400-$4,500',
          'each',
          'Only worth the money on genuine outwash soils',
        ],
        [
          'Sump basin, pump and discharge line',
          '$1,800-$4,500',
          'each',
          'For sites with no gravity outlet anywhere on the parcel',
        ],
        [
          'Yard regrade for positive drainage',
          '$3-$8',
          'per sq ft',
          'Cut, fill, topsoil and seed or sod',
        ],
        [
          'Permeable paver conversion',
          '$28-$45',
          'per sq ft',
          'Open-graded section, no fines anywhere in the build',
        ],
      ],
    },
    { type: 'h2', text: 'Where the law draws the line' },
    {
      type: 'p',
      text: 'Washington follows the common enemy doctrine, which lets a landowner defend property against surface water, with two limits that matter enormously on a hillside. You may not artificially collect water and discharge it onto adjoining land in quantities or in a manner different from natural flow, and you have to exercise due care so that changing the flow does not needlessly damage the property below. In plain terms, moving your water into a pipe and aiming it at the yard downhill converts a natural nuisance into a liability with your name on it. Beyond that, King County and its cities administer surface water design manuals that govern how much new impervious area triggers formal review, and mapped steep slopes, typically forty percent and steeper, along with wetland and stream buffers, carry critical-area rules of their own.',
    },
    {
      type: 'callout',
      title: 'Confirm with your city before anyone trenches',
      text: 'A private yard drain that stays on your parcel and daylights on your own ground often needs no standalone permit. Connecting to a public storm main, working in the right-of-way, exceeding a land-disturbance threshold, or digging inside a mapped critical area all do. Kent, Renton, Auburn and Maple Valley each run their own review with their own numbers. Call the permit desk with your scope before scheduling work, and treat any contractor guidance, including ours, as a starting point rather than as the ruling.',
    },
    { type: 'h2', text: 'Planting that helps, and one habit that hurts' },
    {
      type: 'p',
      text: 'Plant selection does real hydraulic work on a slope. At a wet toe, red twig dogwood, sword fern, salal, evergreen huckleberry and carex all take a winter with soaked roots and still look like something in July. Hydrangea and rhododendron want moisture without standing water, so they belong on the shoulder rather than the low point. The dry crown of a bank is where lavender, hebe and kinnikinnick go, and kinnikinnick knits a surface together better than almost anything else available in Zone 8b. Vine maple and Japanese maple add vertical structure without the root plate of a conifer. The habit to avoid is running a drain line under a laurel hedge or within reach of a western red cedar. Roots find pipe joints, and a 4-inch line packed solid with root hair is an excavation, not a service call.',
    },
    { type: 'h2', text: 'A sequence that saves money' },
    {
      type: 'ol',
      items: [
        'Walk the property during real rain and photograph where water enters, not only where it collects.',
        'Redirect the roof. It is the single largest input on most lots and the least expensive to move.',
        'Correct the grade next, including the uphill edge of any existing patio or driveway.',
        'Only then trench. Drains installed before the first two steps are frequently sized for a problem that no longer exists.',
        'Establish the outlet before breaking ground. Daylight, dispersion, an approved storm connection or a pump. If nobody can name the destination, the design is unfinished.',
        'Verify the permit path with the jurisdiction, and get the answer in writing when the work touches a slope, a buffer or a public line.',
      ],
    },
    {
      type: 'callout',
      title: 'Diagnose in the rain, then dig',
      text: 'The person who reads your slope with the downspouts running is the person who sets the one percent fall on the pipe. Ranges above are typical installed figures for the Puget Sound market in 2026, not quotes. Blue Landscaping Services runs excavation, drainage and hardscape out of a Kent shop, licensed, bonded and insured in Washington, registration BLUELLS880K2. Call (253) 429-7052 to get on the schedule for a wet-weather site visit.',
    },
  ],
  faqs: [
    {
      question: 'Will a French drain dry out my crawlspace?',
      answer:
        'On its own, usually not. A crawlspace takes water at the footing, and a drain trenched through the lawn twenty feet away is intercepting something else entirely. What dries a crawlspace is a footing drain at the base of the foundation wall, tied to a working outlet, plus a sealed ground vapor barrier and roof water moved well away from the house. Those are different depths and different systems from a yard drain, and they are priced separately.',
    },
    {
      question: 'Can I tie yard drainage into my sewer line?',
      answer:
        'No. Connecting stormwater to the sanitary sewer is prohibited throughout King County service areas, because storm flow overwhelms treatment capacity and causes overflows during exactly the weather that generates it. Older homes occasionally have legacy connections that predate enforcement. If one turns up during excavation, the correct response is to disconnect and reroute it, not to extend it with new pipe.',
    },
    {
      question: 'My last French drain worked for two years and then quit. What happened?',
      answer:
        'Fines, almost every time. Silt migrates into the stone envelope when there is no non-woven fabric separating it from native soil, or when the installer used minus rock or pea gravel instead of washed angular stone. Sock-wrapped pipe blinds off quickly in silty till for the same reason. Without cleanouts you cannot flush it either. A blinded envelope does not recover, so the honest fix is rebuilding the trench rather than jetting it.',
    },
    {
      question: 'How much maintenance does a yard drainage system need?',
      answer:
        'Less than people fear, but not zero. Pull accumulated sediment out of catch basin sumps each fall before leaf drop, keep the outlet clear of bark, leaves and settled soil, and flush the mainline from a cleanout every few years. A properly built, fabric-wrapped system in till should run twenty to thirty years. Early failures trace almost entirely to root intrusion and to installers who left no access points.',
    },
    {
      question: 'Does drainage work have to wait for summer?',
      answer:
        'Not at all, and there is an argument for the opposite. Wet-season work lets the crew see exactly where water is moving and confirm the fix functions before backfill closes it up. The tradeoffs are real: trenches slump in saturated ground, spoil is heavy and messy to haul, and lawn restoration will not knit until spring. Compaction-dependent work like base under hardscape is what genuinely wants a dry window.',
    },
  ],
  relatedServices: ['retaining-walls', 'planting-design', 'paver-patios'],
  relatedCities: ['maple-valley', 'issaquah', 'renton', 'newcastle', 'west-seattle'],
  readingMinutes: 6,
};

export default post;
