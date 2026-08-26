import type { ServiceContent } from '@/data/types';

const content: ServiceContent = {
  slug: 'lawn-maintenance',
  category: 'landscaping',
  name: 'Lawn Maintenance',
  h1: 'Lawn Maintenance in Kent & Greater Seattle',
  metaTitle: 'Lawn Maintenance & Mowing in Kent, WA',
  metaDescription:
    'Scheduled mowing, edging, bed care, pruning and seasonal cleanups for South King County yards. Real per-visit and monthly pricing, plus how we handle moss.',
  quickAnswer:
    'Lawn maintenance is scheduled mowing, edging, blowing, bed weeding and seasonal pruning on a set route. Around Kent and South King County, weekly visits on a typical suburban lot run $60 to $95 each, and most lawns here need cutting from March through November plus occasional winter mows during mild stretches.',
  intro: [
    'Grass in the Puget Sound lowlands barely stops. Perennial ryegrass and fine fescue, which is what almost every lawn between Tukwila and Auburn is made of, keep putting on growth any week the soil hovers near 45 degrees. That is why a yard that got its last cut in October looks shaggy by the middle of January. Our route reflects that reality: weekly from roughly March into November, then a lighter every-three-weeks pass through the dark months to keep the leaf load down and the turf from matting.',
    'The other reality is moss. Native soils here run acidic, most lots have a north side under Douglas fir or big-leaf maple, and winter shade plus compacted ground is exactly what moss wants. Killing it with iron sulfate is a two-week fix. Actually shifting the balance takes lime on a schedule, aeration to break the compaction sitting on top of the till, overseeding into the holes, and honest advice about the corners where turf is never going to win and a bed of sword fern and salal would look better anyway.',
    'What a visit includes is fixed and written down, because vague scope is where maintenance relationships fall apart. Mow at the height we agreed. Edge hard surfaces every visit and bed lines on alternating visits. Blow drives, walks and patios clean, not into the street. Pull what is coming up in the beds while it is small. Haul the clippings unless you want them mulched back in. The same crew comes to your property, so the person cutting knows where the sprinkler heads and the dog gate are.',
  ],
  included: [
    'Mowing at a set height with sharpened blades and alternating direction to keep the turf from laying over',
    'String trimming around fences, posts, beds and structures, plus hard-edging drives and walkways',
    'Blowing all hard surfaces clean and returning debris to turf or collecting it, never blowing into the street',
    'Bed weeding on every visit while weeds are small, including gravel strips and paver joints',
    'Seasonal shrub and perennial pruning at the right time of year for each plant, not all at once in July',
    'Leaf management from October through December, including gutters-adjacent turf and bed clearing',
    'Yard waste hauled off or loaded into your city cart, your choice, with no dumping on site',
    'A quick visual check of visible sprinkler heads, and a heads-up when we spot a leak, dry zone or dead spot',
    'A seasonal turf program option covering lime, fertilizer, aeration and overseeding on a calendar',
  ],
  materials: [
    'Dolomitic and pelletized calcitic lime for correcting the low soil pH typical of western Washington',
    'Slow-release granular fertilizer in a 21-7-14 style analysis, timed to spring and fall growth flushes',
    'Ferrous sulfate moss control applied in late winter, before overseeding rather than after',
    'Barenbrug and Mountain View Seeds perennial ryegrass and fine fescue blends bred for the maritime Northwest',
    'Cedar Grove compost as a light topdressing after core aeration',
    'Medium fir bark and arborist wood chips for annual bed mulch refresh',
    'Commercial Toro, Exmark and Stihl equipment, with blades sharpened on a schedule rather than when they get dull',
  ],
  process: [
    {
      title: 'Property audit before the first cut',
      description:
        'We walk the whole lot once with you: mow height, where the beds actually end, sprinkler head locations, gate codes, dog schedule, which shrubs you care about and which ones you have wanted gone for years. Turf trouble spots get noted here. So do the things maintenance cannot fix, like a soggy low corner that needs drainage or a bed that is really a slope failure waiting to happen.',
    },
    {
      title: 'Set the schedule and the scope in writing',
      description:
        'You get a written scope listing exactly what happens on a visit, at what frequency, and what falls outside it. Weekly is standard through the growing season for most South King County lots. Every other week works on smaller lawns or where you cut in between. Winter drops to a monthly or three-week rotation focused on leaves, debris and the occasional mow when growth picks up in a mild February.',
    },
    {
      title: 'The recurring visit',
      description:
        'Crews run a consistent order so nothing gets skipped: mow, trim, edge, beds, blow, load. Cutting height stays between 2.5 and 3.5 inches for our climate, which shades out weed seed and keeps roots deeper going into August. Blades are sharp, because a torn grass blade browns at the tip and is the real reason a freshly mowed lawn sometimes looks worse the next day.',
    },
    {
      title: 'Seasonal pruning at the right window',
      description:
        'Rhododendron gets cut right after bloom, not in fall when next year buds are already set. Hydrangea depends on the species, so we identify it before anyone touches it. Lavender gets a light shape in late summer and never a cut into old wood. Red twig dogwood gets a hard renewal in late winter to keep the stems bright. Shearing everything into meatballs in one July pass is not pruning.',
    },
    {
      title: 'Turf program through the year',
      description:
        'Lime goes down in fall or late winter to push soil pH back toward 6.2. Fertilizer follows the two growth flushes rather than a random summer application. Core aeration and overseeding land in September or early October when soil is still warm and rain is returning, which is the single most effective thing you can do for a compacted Northwest lawn.',
    },
    {
      title: 'Spring and fall cleanups',
      description:
        'Fall is the big one: leaf removal in stages as maple, alder and birch drop at different times, bed cutback, and clearing anything that will smother turf under a wet mat all winter. Spring is a reset before the growing season, with dead material pulled, edges recut, mulch refreshed and the first fertilizer down.',
    },
    {
      title: 'Reporting and adjustment',
      description:
        'If something changed on the property, you hear it from us rather than discovering it in May. Sprinkler leak, girdling root, a shrub going down with root rot, a fence post that finally let go. We adjust the route as the season turns, because a lawn in mid-August with watering limits in effect needs a different cut than the same lawn in April.',
    },
  ],
  timeline:
    'A weekly visit on a typical quarter-acre South King County lot takes a crew 25 to 45 minutes; core aeration with overseeding on a 5,000 sq ft lawn is a half day, and a full fall cleanup on a mature landscaped property runs 4 to 9 crew hours depending on how many trees are dropping.',
  costRows: [
    {
      item: 'Weekly mow, trim, edge and blow, lot up to 1/4 acre',
      range: '$60-$95',
      unit: 'per visit',
      notes: 'Assumes an ongoing weekly schedule, not a one-off cut',
    },
    {
      item: 'Every-other-week service on the same size lot',
      range: '$80-$130',
      unit: 'per visit',
    },
    {
      item: 'Full-service monthly maintenance, weekly visits plus bed care',
      range: '$280-$520',
      unit: 'per month',
    },
    {
      item: 'Core aeration with overseeding, 5,000 sq ft lawn',
      range: '$280-$525',
      unit: 'per service',
    },
    {
      item: 'Lime or granular fertilizer application',
      range: '$95-$185',
      unit: 'per application',
    },
    {
      item: 'Spring or fall cleanup with debris haul-off',
      range: '$380-$1,100',
      unit: 'per cleanup',
      notes: 'Driven by tree count, bed area and volume of material removed',
    },
  ],
  costNote:
    'The figures above are typical installed and serviced ranges for the Puget Sound market in 2026 rather than a quote, since lot size, slope, bed square footage, gate access and how many trees drop on the property all move the price, and a short site walkthrough is what produces your actual number.',
  pnwConsiderations: [
    {
      title: 'Mowing a lawn that never really goes dormant',
      body: 'Cool-season turf in the Puget Sound lowlands keeps growing through most of the winter, so a lawn cut last in October is usually overdue by late January. We keep a reduced winter rotation rather than shutting off entirely. The bigger winter risk is traffic: rolling a mower across saturated soil in December compacts it and leaves ruts that show up as thin stripes in April. On soggy weeks we skip the mow, clear debris by hand and blower, and come back when the ground supports weight.',
    },
    {
      title: 'Moss is a soil and light problem, not a weed problem',
      body: 'Native soils across King County commonly test between pH 5.0 and 5.8, well below the 6.0 to 6.5 turf actually wants, and shade from firs and big-leaf maple plus compaction over glacial till finishes the job. Iron sulfate burns the moss black in a week but it comes back unless the underlying conditions change. The real program is lime on a schedule, annual core aeration to open the compacted layer, overseeding with fescue blends that tolerate shade, and conceding the darkest corners to a planted bed instead.',
    },
    {
      title: 'August is the stress month, not February',
      body: 'Six to eight weeks with almost no measurable rain arrive most years between mid-July and early September, right when watering guidance tightens across Seattle Public Utilities and the South King County water districts. We raise the cut height going into that stretch so the canopy shades its own root zone, back the mowing frequency down as growth slows, and skip fertilizer entirely during the heat. A lawn allowed to go tan for a few weeks in August is not dead, and forcing green through a drought does more harm than the browning.',
    },
    {
      title: 'What needs permission, and what the yard waste rules are',
      body: 'Routine maintenance needs no permit anywhere in King County, with one real exception: properties inside a mapped wetland, stream or steep-slope buffer in cities like Maple Valley, Covington and Renton have restrictions on cutting vegetation inside the buffer, and we check the critical areas map before touching those edges. Outdoor burning of yard debris is prohibited in the urban growth area, so everything leaves as green waste to a commercial composter or goes into your city cart, and we never pile debris behind the shed.',
    },
  ],
  faqs: [
    {
      question: 'Do you mow year round in Seattle?',
      answer:
        'We mow on a reduced schedule rather than stopping. Cool-season grass here keeps growing whenever soil temperature stays near 45 degrees, so a lawn left uncut from October to March is a matted mess by spring. Winter visits are typically every three to four weeks and focus on leaf and debris removal, with a mow whenever growth justifies it and the ground is firm enough to drive on.',
    },
    {
      question: 'How short should my lawn be cut?',
      answer:
        'Between 2.5 and 3.5 inches for almost every lawn in this region, and toward the taller end from July through September. Longer blades shade the soil, hold moisture through the dry stretch, crowd out weed seed and support deeper roots. Scalping to two inches in June is one of the most common self-inflicted lawn problems we see in South King County yards.',
    },
    {
      question: 'Why is my lawn mostly moss?',
      answer:
        'Three causes stack up here: acidic soil, winter shade, and compacted ground over glacial till that drains poorly. Moss is not out-competing your grass; it is filling ground the grass already gave up. A ferrous sulfate application clears the moss, but without lime, annual aeration and overseeding, it returns within a season. In deep shade under conifers, a planted bed is the more honest answer than turf.',
    },
    {
      question: 'What is included in a visit, and what costs extra?',
      answer:
        'A standard visit is mow, string trim, hard edge, bed weeding and full blow-down with debris hauled. Outside that scope and quoted separately: aeration and overseeding, lime and fertilizer applications, mulch refresh, large pruning, hedge shearing over about eight feet, blackberry and ivy removal, and the two big seasonal cleanups. You get the scope in writing before the first visit so there are no surprise line items.',
    },
    {
      question: 'When is the best time to aerate and overseed here?',
      answer:
        'September through mid-October, without much competition. Soil is still warm from summer, the fall rains are returning, weed pressure has dropped, and new seedlings get a full cool season to establish before the following summer. Early spring, roughly mid-March to late April, is a workable second window. Aerating in the middle of an August dry spell mostly just punches holes in concrete.',
    },
    {
      question: 'Do I need a contract, and can I cancel?',
      answer:
        'We work on a rolling seasonal schedule, not a long lock-in. You get a written scope and per-visit or monthly pricing, and you can change frequency or stop with reasonable notice. Most clients run weekly from March into November and switch to the winter rotation automatically. Call the office at (253) 429-7052 and we will adjust the route rather than argue about a term.',
    },
  ],
  relatedServices: ['sod-installation', 'irrigation-maintenance', 'planting-design'],
  keywords: [
    'lawn maintenance Kent WA',
    'lawn mowing service South King County',
    'yard maintenance Renton WA',
    'lawn care company Seattle',
    'moss control lawn Puget Sound',
    'aeration and overseeding Auburn WA',
    'fall cleanup service Federal Way',
  ],
};

export default content;
