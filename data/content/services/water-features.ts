import type { ServiceContent } from '@/data/types';

const content: ServiceContent = {
  slug: 'water-features',
  category: 'hardscaping',
  name: 'Water Features',
  h1: 'Water Features in Kent & Greater Seattle',
  metaTitle: 'Pondless Water Features in Kent & Seattle',
  metaDescription:
    'Pondless fountains, basalt column sets and disappearing waterfalls installed across Kent, Renton and Greater Seattle. No open water, real cost ranges.',
  quickAnswer:
    'A landscape water feature recirculates water through a hidden basin instead of an open pond. Pondless basalt column sets and disappearing fountains are the common choice in Puget Sound, and installed cost usually lands between $3,500 and $12,000. No building permit is required, but the pump needs a dedicated GFCI outdoor circuit.',
  intro: [
    'The sound is the point. On a lot in Tukwila that backs to a busy arterial, or a Capitol Hill yard boxed in by three neighbors, a few gallons per minute falling eighteen inches will cover a surprising amount of road noise. That is the practical reason most of our water feature calls start. The second reason is that a running feature is the one part of a winter garden that still moves when everything else has gone dormant and brown.',
    'Almost everything we install is pondless. Water leaves a bubbler or a spillway, runs over rock, then disappears through a gravel bed into a buried reservoir where the pump lives. There is no standing water, which matters if you have a toddler, and no open pond ecology to manage. A koi pond is a hobby with a maintenance calendar. A pondless basalt set is a feature you turn on with a switch and clean out twice a year.',
    'Basalt is the local answer. Columns quarried in Washington and Oregon come out of the ground with that hexagonal fracture, and a drilled three-column set at staggered heights looks like it belongs in a Northwest garden in a way an imported urn never will. We lay out the set in-house, core the columns, and our own crew digs the basin and rigs the stone. Final column placement gets decided on site with a machine and a sling, not from a plan.',
    'The part nobody thinks about is the electrical. A recirculating feature needs a dedicated GFCI-protected circuit in a weatherproof in-use cover, run by a licensed electrician under permit, and the run from the panel is often the longest single line on the estimate. Decide the outlet location before the basin goes in the ground. We also size the pump for the flow the feature actually wants, because an oversized pump turns a fountain into the sound of a garden hose.',
  ],
  included: [
    'Sound and sightline walkthrough to place the feature where you will actually hear and see it',
    'Feature layout and stone selection done in-house, including column heights and spill geometry',
    'Excavation of the basin cavity and the plumbing trench, with spoils removed from the site',
    'Rigid pondless reservoir or lined and vaulted basin sized to the feature flow and evaporation rate',
    'Pump sizing to the head height and spill width, with flexible PVC, a ball valve and a union for service',
    'Column coring and stone setting with a mini excavator and slings, shimmed and plumbed',
    'Decorative rock, cobble and drain rock over the basin, with an accessible pump vault lid',
    'Autofill line where a hose bib is within reach, plus an overflow routed away from foundations',
    'Low-voltage lighting aimed into the spill, and a start-up with flow tuning and a maintenance walkthrough',
  ],
  materials: [
    'Quarried Washington and Oregon basalt columns, drilled and cored',
    'Aquascape AquaBasin and Atlantic Water Gardens rigid pondless reservoirs',
    'Aquascape and Oase energy-efficient solids-handling pumps',
    'Blue Thumb spillway bowls and cast concrete urn fountains',
    'Firmly welded 45-mil EPDM liner with geotextile underlayment for custom stream beds',
    'Flexible PVC, ball valves and unions for serviceable plumbing',
    'Washed river cobble, Mutual Materials decorative rock and clean drain rock',
    'Kichler and FX Luminaire low-voltage underwater and accent fixtures',
  ],
  process: [
    {
      title: 'Listen before you dig',
      description:
        'We stand in the spot you sit most often, whether that is a kitchen window in Covington or a patio corner in Ballard, and work backward from there. Distance, spill height and background noise all change what the feature needs to be. A tall three-column set forty feet away does nothing; a small bubbler twelve feet from a chair does everything.',
    },
    {
      title: 'Size the basin and the pump',
      description:
        'Reservoir volume is set by how much water the stream and the rock hold in transit, plus enough reserve for a hot August week of evaporation. Pump selection follows head height and spill width, not price. We spec these together so the feature runs at full spill without a starved basin, and we oversize the reservoir rather than the pump.',
    },
    {
      title: 'Excavate and set the reservoir',
      description:
        'The crew digs the basin cavity and the electrical and plumbing trenches. In dense till we over-excavate slightly and bed the reservoir on compacted sand so it sits dead level and does not rack. A groundwater check happens here, because a basin set in a seasonally high water table needs anchoring and its own perimeter drain.',
    },
    {
      title: 'Plumb and wire',
      description:
        'Flexible PVC runs from the pump vault to the feature with a ball valve for flow trim and a union so the pump comes out in one piece for service. The licensed electrician sets the dedicated GFCI circuit and the in-use weatherproof cover on the permitted run. Low-voltage cable is sleeved at the same time so nothing gets trenched twice.',
    },
    {
      title: 'Set the stone',
      description:
        'Columns come off the truck on slings and get walked into place with a mini excavator. Each one is cored, shimmed and plumbed, then the spill lip is dressed so water sheets down the face instead of running off one corner. This is the slow part. We set, run water, look at it, and move stone until the pattern is right.',
    },
    {
      title: 'Rock in, fill and tune',
      description:
        'Drain rock and cobble go over the reservoir grate, hiding the mechanicals while keeping the pump vault reachable. The basin fills, the pump runs, and we tune the valve until the spill sounds the way you want it. Splash is checked at full flow so no water is quietly leaving the system onto the lawn.',
    },
    {
      title: 'Light it and hand over the maintenance',
      description:
        'Fixtures are aimed after dark, usually grazing up the column face rather than pointing at it. Then we show you the shutoff, the autofill, how to pull and rinse the pump, and what the fall and spring routine looks like. Everything is labeled at the vault so a future service call takes minutes.',
    },
  ],
  timeline:
    'A single bubbling column or urn fountain is usually a 1 to 2 day install; a three-column basalt set takes 2 to 4 days, and a pondless disappearing waterfall with a stream bed runs 4 to 7 days, plus scheduling around the electrician.',
  costRows: [
    {
      item: 'Single drilled basalt column with pondless basin',
      range: '$3,500-$5,800',
      unit: 'installed',
      notes: 'Assumes a hose bib and existing outdoor circuit nearby',
    },
    {
      item: 'Three-column basalt set, 3 to 5 ft columns',
      range: '$6,000-$11,000',
      unit: 'installed',
    },
    {
      item: 'Spillway bowl or cast urn fountain',
      range: '$2,200-$4,800',
      unit: 'installed',
    },
    {
      item: 'Pondless disappearing waterfall, 6 to 12 ft stream',
      range: '$8,000-$18,000',
      unit: 'installed',
      notes: 'Driven by stream length, drop and boulder size',
    },
    {
      item: 'Dedicated GFCI circuit by a licensed electrician',
      range: '$600-$1,600',
      unit: 'per circuit',
      notes: 'Depends on distance from the panel and trenching',
    },
    {
      item: 'Underwater and accent lighting package',
      range: '$450-$1,400',
      unit: 'per feature',
    },
  ],
  costNote:
    'The ranges above are typical installed figures for the Puget Sound market in 2026 rather than a quote, since stone size, machine access and the distance to your electrical panel move the number more than anything else, all of which we confirm during a site walkthrough.',
  pnwConsiderations: [
    {
      title: 'Where the overflow goes in February',
      body: 'A pondless basin is an open gravel void, so during a week of steady rain it collects far more than the feature circulates. Every basin we set gets an overflow routed downhill to daylight or into a drywell, never toward a foundation, a crawlspace vent or a neighbor at the low corner. On flat Kent valley lots we raise the surrounding grade slightly and pitch the cobble field so surface water sheds away from the vault lid.',
    },
    {
      title: 'Digging a basin in glacial till',
      body: 'A pondless reservoir wants a 2 to 3 foot excavation, and in Alderwood and Everett series soils that means hitting cemented hardpan partway down. Till holds an excavation wall beautifully but breaks slow, so the dig takes longer than the same hole in valley loam. The upside is that a basin bedded on till does not settle. Where we find perched water sitting on the hardpan, the reservoir gets anchored and given its own perimeter drain so it cannot float.',
    },
    {
      title: 'Running or shut down through the cold snaps',
      body: 'Puget Sound winters are mild enough that most pondless features run year round, and moving water rarely freezes solid here. The two things that break are a pump left running with the basin low, and a shallow bowl fountain that holds standing water and cracks when it freezes. We recommend running columns and pondless streams through winter, and pulling, draining and storing bowl-style fountains before the first hard freeze in December.',
    },
    {
      title: 'Permits, backflow and critical areas',
      body: 'A recirculating water feature needs no building permit anywhere in King County because it holds no impounded water of consequence and connects to no sewer. The electrical circuit does need a permit and a licensed electrician. If you add an autofill from a potable line, that connection requires backflow protection under Washington cross-connection rules. Parcels inside a mapped wetland, stream or shoreline buffer in cities like Maple Valley or Mercer Island get checked against the critical areas map before we price the work.',
    },
  ],
  faqs: [
    {
      question: 'What is the difference between a pondless feature and a pond?',
      answer:
        'A pond holds open water and needs filtration, aeration, algae management and often fish care. A pondless feature moves the same water over rock and then hides it in a gravel-filled reservoir underground. Nothing is exposed, so there is no drowning hazard, no mosquito habitat and no seasonal pond cleaning. The tradeoff is that you cannot keep fish or aquatic plants in a pondless system.',
    },
    {
      question: 'How much does a water feature add to the power bill?',
      answer:
        'Less than most people expect. A modern solids-handling pump sized for a single basalt column draws roughly 40 to 90 watts, which at Puget Sound Energy residential rates runs a few dollars a month if you leave it on continuously. A large disappearing waterfall with a bigger pump is more like $10 to $20 a month. Putting the circuit on a timer for evening hours cuts that further.',
    },
    {
      question: 'Do I have to shut it off for the winter?',
      answer:
        'Basalt columns and pondless streams generally run all winter here without trouble, and the moving water plus a reasonable reservoir volume keeps them from icing up in a typical Seattle cold snap. Bowl fountains, urns and anything holding shallow standing water should be drained, dried and covered before December. If you do shut a pondless feature down, pull the pump and store it somewhere it will not freeze dry.',
    },
    {
      question: 'How much maintenance does it actually need?',
      answer:
        'Plan on two real sessions a year. In fall you pull leaf litter off the rock and out of the vault before big-leaf maple and alder drop, and in spring you lift the pump, rinse the intake screen and top the reservoir. Beyond that it is topping off water during dry August stretches, which an autofill handles automatically, and an occasional algae treatment if the feature sits in full sun.',
    },
    {
      question: 'Can a water feature go on a small city lot?',
      answer:
        'Yes, and small lots are often where it pays off most. A single 3-foot column with a 100-gallon basin takes a footprint under four feet square and fits against a fence line in Ballard or West Seattle without eating usable yard. On tight sites the constraint is usually access for the excavator and the stone, and where that is impossible we hand-dig and use smaller drilled boulders instead of full columns.',
    },
    {
      question: 'What plants work around a water feature here?',
      answer:
        'Zone 8b natives read best against basalt and take the splash zone well. We plant sword fern and evergreen huckleberry in the shaded side, carex and kinnikinnick in the rock edge, and a vine maple or Japanese maple set back where the canopy frames the columns without dropping leaves straight into the basin. Red twig dogwood behind the feature gives you color in the months the garden is bare.',
    },
  ],
  relatedServices: ['planting-design', 'paver-patios', 'seating-walls'],
  keywords: [
    'water feature installation Kent WA',
    'pondless waterfall Seattle',
    'basalt column fountain installer',
    'disappearing fountain cost Puget Sound',
    'backyard water feature Renton',
    'pondless water feature King County',
    'garden fountain contractor Bellevue',
  ],
};

export default content;
