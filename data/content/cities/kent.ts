import type { CityContent } from '@/data/types';

const content: CityContent = {
  slug: 'kent',
  name: 'Kent',
  tier: 'primary',
  region: 'South King County',
  h1: 'Landscaping & Hardscaping in Kent, WA',
  metaTitle: 'Landscaping & Hardscaping Contractor in Kent, WA',
  metaDescription:
    'Kent-based landscaping and hardscaping crew. Retaining walls, paver patios, drainage and irrigation for East Hill hardpan and Green River valley soil. Licensed, bonded, insured.',
  quickAnswer:
    "Blue Landscaping Services works out of a shop on Kent's East Hill, roughly ten minutes from most addresses in the city. We build retaining walls, paver patios, drainage and irrigation for both halves of Kent: glacial till and hardpan up on the hills, slow-draining alluvial soil down on the Green River valley floor.",
  body: [
    "Kent is two cities stacked on top of each other, and landscaping work here splits along the same line. The Green River valley floor sits at roughly 30 feet of elevation: flat, warehouse-heavy, with older residential pockets around Riverview and North Park. East Hill and West Hill climb three to five hundred feet above it. Our shop is on East Hill off 116th Avenue SE, so most of the city is a ten-minute drive and we are usually the crew that can swing back out the same week when a drain outlet plugs in November.",
    "The housing stock tells you what is in the ground before anyone digs. East Hill filled in through the 1960s, 70s and 80s with quarter-acre plats where the builder cut a flat pad and pushed the spoils toward the back of the lot. Decades later that pushed fill is what a homeowner is standing on when they ask why the yard drops six feet to the fence. Panther Lake came into the city with the 2010 annexation and still carries a lot of unincorporated-era drainage: roadside ditches, no tightlines, downspouts spilling straight onto turf. Scenic Hill above downtown is older and tighter, 1920s through 1940s houses on lots narrow enough that getting a mini excavator to the back yard is a real conversation.",
    "On the hill the crew hits Alderwood till. Eighteen to thirty-six inches of workable soil, then a dense hardpan a shovel bounces off. Water does not pass through it, it runs sideways across the top of it. That is why so many Kent back yards have one corner that stays soft from November through March, and why so many eighties rockeries are leaning out with nothing but native dirt behind them. Down on the valley floor the problem inverts: alluvial silt loam over old river deposits, a winter water table within a few feet of the surface, and a fine silt that will pump into soup under a plate compactor if you try to compact it wet.",
    "That difference changes how we build, not just how we talk. A patio on East Hill gets a standard compacted crushed base and a drain path cut through the hardpan to a real daylight point. The same patio in the valley gets separation fabric under a thicker base section so silt cannot migrate up into the rock, and finish grade gets an honest fall away from the house. Fence posts on the hill often want a rock auger. Fence posts on the flats want attention to how high the water sits in February.",
    "Design is drawn in-house and our own crew sets the block, so the person who worked out the grade on paper is the one holding the laser when the base goes in. Planting stays with species that take a Kent winter without sulking: sword fern and salal under whichever Douglas firs survived the subdivision, evergreen huckleberry along a north fence, vine maple and hydrangea where there is some light, kinnikinnick over a hot slope of exposed till. Irrigation on East Hill often ties into Soos Creek Water and Sewer District or King County Water District 111 rather than City of Kent water, and every system gets a backflow assembly and a test.",
  ],
  neighborhoods: [
    'East Hill',
    'Scenic Hill',
    'Panther Lake',
    'Lake Meridian',
    'West Hill / Midway',
    'Park Orchard',
    'Riverview',
  ],
  siteConditions:
    "Kent is split by about 400 feet of elevation. East Hill and West Hill sit on Vashon glacial till, typically Alderwood gravelly sandy loam, with a cemented hardpan layer starting somewhere between 18 and 36 inches down. That layer bears load well but is close to impermeable, so winter rain perches on top of it and travels laterally, which is where soggy corners and failed rockeries come from. The Green River valley floor is the opposite: deep alluvial silt loam laid down by the river, poorly drained, with a seasonal water table that can sit within three or four feet of the surface. Valley silt loses strength when it is saturated, so base sections there get separation fabric and more depth than a hill job needs. Both sides of the city have significant builder fill on lots platted in the 1970s and 80s, which we probe for before pricing any wall.",
  permitNotes:
    "Work inside the city goes through the City of Kent Permit Center downtown on West Gowe Street. Retaining walls over 4 feet measured from the bottom of the footing to the top of the wall need a permit and stamped structural engineering, and that threshold drops in practice as soon as a wall picks up a surcharge from a driveway, a slope, or a structure above it. Kent also runs its own surface water design manual adapted from King County's, so adding impervious surface past the review threshold can pull a patio or driveway into drainage review even when the hardscape itself is exempt. Grading volume, work in a mapped erosion or landslide hazard area, and anything near the Green River levees or a stream buffer such as Mill Creek or Garrison Creek all trigger their own review. Fences 6 feet and under in a side or rear yard generally do not need a permit, subject to corner and driveway sight-distance rules. Thresholds get revised, so we confirm scope with the city at permit time rather than guessing from the last job.",
  driveTimeFromKent: 'about 10 minutes',
  services: [
    'retaining-walls',
    'paver-patios',
    'walkways',
    'driveways',
    'outdoor-steps',
    'seating-walls',
    'fire-features',
    'water-features',
    'sprinkler-installation',
    'sprinkler-repair',
    'irrigation-maintenance',
    'fencing',
    'sod-installation',
    'planting-design',
    'lawn-maintenance',
  ],
  nearbyCities: ['renton', 'auburn', 'covington'],
  faqs: [
    {
      question: 'Do I need a permit for a retaining wall in Kent?',
      answer:
        'Usually not if the wall is under 4 feet from the bottom of the footing to the top and nothing surcharges it. Once you clear 4 feet, or the wall holds up a driveway or a slope, the City of Kent wants a building permit with stamped engineering. Mapped landslide and erosion hazard areas change the answer. We check the parcel before quoting and confirm with the Permit Center.',
    },
    {
      question: 'Why does one corner of my East Hill yard stay wet until spring?',
      answer:
        'Almost always hardpan. The glacial till under East Hill is nearly impermeable, so once the top 18 to 30 inches of soil saturates in November, the rest of the winter rain sits on that layer and creeps downhill until it finds a low spot in your lawn. The fix is not more topsoil. It is cutting a drain path through or across the perched water and giving it somewhere legal to exit.',
    },
    {
      question: 'Can you build a patio down on the valley floor?',
      answer:
        'Yes, and it is regular work for us in Riverview and the neighborhoods off Central Avenue. Valley silt needs a different base section than the hills: woven separation fabric, more crushed rock, and compaction managed around the weather rather than forced through it. Expect a valley patio to sit at the upper end of the typical Puget Sound installed range of roughly $28 to $45 per square foot. That is a market range, not a quote.',
    },
    {
      question: 'Who tests the backflow device on a Kent sprinkler system?',
      answer:
        'It depends which purveyor serves your address. Much of East Hill is on Soos Creek Water and Sewer District or King County Water District 111, while the valley and downtown are on City of Kent water. All of them require an approved backflow assembly on an irrigation connection and an annual test by a certified tester. We install the assembly to the district spec and tell you who your annual notice will come from.',
    },
    {
      question: 'How quickly can you get to a job in Kent?',
      answer:
        'The shop is on East Hill, so nothing in the city is more than about fifteen minutes away and most addresses are closer to ten. That matters less for scheduling a build and more for the callbacks: a blown sprinkler zone in July or a plugged drain outlet in a December storm is something we can look at without a two-week wait for a crew coming down from the north end.',
    },
  ],
  zips: ['98030', '98031', '98032', '98042'],
};

export default content;
