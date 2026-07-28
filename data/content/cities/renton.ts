import type { CityContent } from '@/data/types';

const content: CityContent = {
  slug: 'renton',
  name: 'Renton',
  tier: 'primary',
  region: 'South King County',
  h1: 'Landscaping & Hardscaping in Renton, WA',
  metaTitle: 'Renton Landscaping, Retaining Walls & Irrigation',
  metaDescription:
    'Renton hardscaping and landscaping: terraced retaining walls, steps, patios and sprinkler systems for Highlands, Kennydale, Talbot Hill and Benson Hill lots. About 15 minutes from Kent.',
  quickAnswer:
    'Renton has more real grade than anywhere else in South King County, so most projects here start with a wall or a set of steps rather than a patio. We work the Highlands, Kennydale, Talbot Hill, Benson Hill and Maplewood, roughly fifteen minutes from our Kent shop. Coal mine and aquifer overlays affect permitting.',
  body: [
    'Renton has more usable relief than most of South King County, and it shows up in every estimate. The Cedar River cuts through the middle of it on its way to Lake Washington, and the land climbs away on every side: the Highlands plateau to the northeast, Talbot Hill as a steep ridge south of downtown, Kennydale perched on a bluff above the lake with I-405 carved into the slope below it. Because of that, the first question on a Renton walkthrough is almost never about materials. It is about how much the lot falls, and where the water is already going.',
    'The housing stock is unusually layered for a suburb. The Highlands began as wartime defense housing built fast in the early 1940s for Boeing and PACCAR workers, and a good amount of that footprint is still there behind newer siding, on flat pads with almost no original drainage. Kennydale is mostly 1950s and 60s ramblers with a steady stream of view-driven remodels, which is where we see the most demand for terraced walls and a level patio carved out of a slope that wants to be a hillside. Benson Hill came into the city in the 2008 annexation and brought 1970s and 80s subdivisions with it. Maplewood Heights and the Tiffany Park area are newer, tighter plats where the builder graded pads and the retained side yards are already thirty years old.',
    'Renton also carries two regulatory overlays a national franchise will not know about. Parts of the city sit above abandoned coal workings from the Renton and Talbot Hill mines, and the city maintains mapped coal mine hazard areas that can require a special study before certain excavation. Separately, the Cedar Valley aquifer that supplies the city drinking water is protected by mapped Aquifer Protection Area zones, and inside the stricter zone there are real constraints on excavation depth and on documenting where imported fill came from. Neither is an obstacle to a normal back yard. Both are things we check on the parcel map before pricing rather than after digging.',
    'Practically, the work here is grade work. A Renton back yard that drops eight feet from the house to the fence becomes usable when it is cut into two benches: an engineered block wall with geogrid tied into the hillside, block or slab steps down to the lower terrace, and a paver patio on the flat you just created. Kennydale bluff lots add view constraints and equipment access down a driveway that was already steep in 1962. Downtown and Maplewood lots near the river sit on old floodplain deposits and need drainage thought through before anything gets poured.',
    'One crew handles the whole build. We draw the wall section and the grading plan in-house, and the same people who priced it excavate it and set the block, so nothing gets lost between a designer and a subcontractor. Planting follows the exposure rather than a catalog: Japanese maple and dwarf conifers where a Kennydale view lot wants structure without bulk, sword fern and evergreen huckleberry on the shaded north side of a Highlands lot, lavender and hebe on the dry south face of a Talbot Hill terrace.',
  ],
  neighborhoods: [
    'Renton Highlands',
    'Kennydale',
    'Talbot Hill',
    'Benson Hill',
    'Maplewood Heights',
    'Tiffany Park',
    'Earlington',
  ],
  siteConditions:
    'Most of the elevated ground in Renton is Vashon glacial till, Alderwood series, with a dense hardpan under a shallow topsoil layer, which produces perched winter water and the sideways seepage that undermines older rockeries. The Highlands plateau is relatively flat on top but drops off sharply at its edges toward May Creek and the Cedar River. Kennydale is a bluff, with slopes steep enough that the city critical area maps flag erosion and landslide hazard across large sections. Down in the valley bottom, around downtown and Maplewood, the ground is river alluvium and old delta deposits from before the Black River was cut off in 1916, so it is soft, fine and shallow to water. Layer on the mapped coal mine hazard areas above the historic workings, and Renton becomes a city where the right answer genuinely changes parcel by parcel.',
  permitNotes:
    'The first thing to establish is whether the address is actually in the city. Fairwood, East Renton Highlands and Skyway all use Renton mailing addresses but are unincorporated King County, so those permits go through King County Permitting rather than the City of Renton, with different thresholds and a different review queue. Inside city limits, retaining walls over 4 feet from the bottom of the footing to the top need a permit with stamped engineering, and the city can require review below that height where the wall is tiered, surcharged, or sits in a mapped critical area. Renton regulates steep slope, landslide and erosion hazard areas, coal mine hazard areas, and Aquifer Protection Area Zones through its critical areas code, and work in the stricter aquifer zone can carry fill source documentation requirements and limits on how deep you excavate. Adding impervious surface past the drainage review threshold can also pull a patio or driveway into stormwater review. We confirm the applicable thresholds with the correct jurisdiction at permit time.',
  driveTimeFromKent: 'about 15 minutes',
  services: [
    'retaining-walls',
    'outdoor-steps',
    'seating-walls',
    'paver-patios',
    'walkways',
    'driveways',
    'fire-features',
    'water-features',
    'sprinkler-installation',
    'sprinkler-repair',
    'irrigation-maintenance',
    'fencing',
    'planting-design',
    'sod-installation',
    'lawn-maintenance',
  ],
  nearbyCities: ['kent', 'tukwila', 'newcastle'],
  faqs: [
    {
      question: 'My address says Renton, but is my property actually in the city?',
      answer:
        'Not necessarily. Fairwood, East Renton Highlands and Skyway carry Renton addresses while sitting in unincorporated King County. That changes who issues the permit, which drainage manual applies and how long review takes. We look the parcel up before quoting, because a wall priced against the wrong jurisdiction is a problem you discover at the worst possible moment.',
    },
    {
      question: 'What is a coal mine hazard area and does it affect my back yard?',
      answer:
        'Renton sits above abandoned coal workings from its mining era, and the city maps the areas where subsidence risk exists. For an ordinary patio or a short garden wall it usually changes nothing. For deeper excavation or a taller engineered wall inside a mapped area, the city can require a geotechnical study addressing the mine hazard. We check the map at the start rather than the end.',
    },
    {
      question: 'Can you build on a Kennydale slope?',
      answer:
        'Yes, and it is some of our favorite work, but slope jobs are honest about their constraints. Steep bluff lots are frequently inside mapped landslide or erosion hazard areas, equipment has to come down a driveway that may already be at grade limits, and the wall almost always needs engineering. The result is worth it: two flat terraces and a set of steps turns an unusable pitch into the best part of the property.',
    },
    {
      question: 'Why do so many old Renton rockeries lean?',
      answer:
        'Because they were dry-stacked on native till with no drain rock, no filter fabric and no batter. The hardpan sheds winter water sideways into the back of the wall, saturated soil weighs roughly double what drained soil weighs, and the rock walks out an inch at a time. Rebuilding means cutting a proper bench, installing the drainage assembly the original never had, and setting either engineered block or new quarried basalt.',
    },
    {
      question: 'How far is Renton from your Kent shop?',
      answer:
        'About fifteen minutes up Benson Road or SR 515 from East Hill, a little longer to Kennydale or the north end. Renton is core service area for us, so it is a normal scheduling day rather than a trip we have to batch with other work.',
    },
  ],
  zips: ['98055', '98056', '98057', '98058', '98059'],
};

export default content;
