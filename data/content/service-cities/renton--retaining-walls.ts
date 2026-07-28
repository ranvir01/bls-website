import type { ServiceCityContent } from '@/data/types';

const content: ServiceCityContent = {
  citySlug: 'renton',
  serviceSlug: 'retaining-walls',
  h1: 'Retaining Walls in Renton, WA',
  metaTitle: 'Retaining Wall Contractor in Renton, WA',
  metaDescription:
    'Terraced retaining walls in Renton for Kennydale bluffs, Talbot Hill and Highlands lots. Coal mine and aquifer overlays checked before pricing. In-house design.',
  quickAnswer:
    'Renton has more usable grade than anywhere else in South King County, so most yards here start with a wall rather than a patio. We terrace Kennydale, Talbot Hill, Benson Hill and the Highlands in geogrid-reinforced block, and we check the coal mine and aquifer overlays on the parcel before quoting anything.',
  body: [
    'Renton is a wall town. The Cedar River cuts through the middle and the land climbs away on every side, so the opening question here is almost never about block color. It is how far the lot falls and where the water is already going. A typical Kennydale or Talbot Hill back yard drops six to ten feet from the house to the fence and becomes usable only once it is cut into two benches: an Allan Block wall with geogrid tied into the hillside, block steps down, and a level pad at the bottom.',
    'The overlays are what separate Renton from its neighbors. Parts of the city sit above abandoned workings from the Renton and Talbot Hill coal mines, and the city maps coal mine hazard areas where certain excavation can require a special study before anything is dug. Separately, the Cedar Valley aquifer that supplies city drinking water is protected by mapped Aquifer Protection Area zones, and the stricter zone limits how deep you excavate and asks where imported fill came from. Neither usually stops a back-yard wall. Both are worth knowing before a price exists, which is why we pull the parcel map first.',
    'Then there is the jurisdiction trap. Fairwood, East Renton Highlands and Skyway all carry Renton mailing addresses while sitting in unincorporated King County, so those walls are permitted by King County rather than the city, with different thresholds and a different queue. Beyond that, the neighborhoods behave differently in the ground. Highlands lots from the wartime Boeing and PACCAR housing era were built fast on flat pads with almost no drainage, so water has to be given somewhere to go. Kennydale is a bluff, frequently inside mapped landslide or erosion hazard area, with driveways steep enough that machine access decides the schedule. Down by the river, Maplewood sits on soft old delta deposits from before the Black River was cut off in 1916.',
  ],
  localAngle:
    'Renton is the only city we work in where a routine back-yard wall can hit two overlays at once: mapped coal mine hazard area above the old workings, and an Aquifer Protection Area zone that limits excavation depth and asks where the imported fill came from. Confirming which jurisdiction even issues the permit comes first, since a Fairwood or Skyway address is King County, not the city.',
  faqs: [
    {
      question: 'Does a coal mine hazard area stop me from building a retaining wall?',
      answer:
        'Usually not. For a short garden wall it typically changes nothing at all. Where it bites is deeper excavation or a taller engineered wall inside a mapped area, which the city can condition on a geotechnical study addressing subsidence risk on top of the structural engineering. The mapping is public, so we look at the parcel at the start of the conversation rather than discovering it during plan review.',
    },
    {
      question: 'Why do so many old Renton rockeries lean out?',
      answer:
        'Because they were dry-stacked straight onto native till with no drain rock, no filter fabric and very little batter. The Alderwood hardpan under most of the elevated ground here sheds winter water sideways into the back of the wall, and saturated soil weighs close to double what drained soil weighs. The rock walks out an inch a season until the caps no longer line up. The fix is a proper bench, a real drain zone, and engineered block or fresh quarried basalt.',
    },
    {
      question: 'Can you build a wall on a Kennydale slope?',
      answer:
        'Yes, with the extra steps that ground requires. Steep bluff parcels are often inside mapped landslide or erosion hazard areas, which means a geotechnical engineer joins the structural work, and the equipment has to come down a driveway that may already be at its grade limit. The result is worth the process. Two terraces and a stair run turn an unusable pitch into the best part of the property, with Japanese maple and dwarf conifers set so they never block the water view.',
    },
    {
      question: 'How does the wall drainage work on a flat Highlands lot?',
      answer:
        'Carefully, because there is no convenient downhill. Highlands pads were graded flat in the 1940s with essentially no drainage infrastructure, so the perforated line behind the wall has to be routed to a catch basin network or a tightline that reaches a legal discharge point. Dropping a drain outlet into equally saturated ground twenty feet away accomplishes nothing. On those lots the drainage run is often the larger half of the job, and we price it that way.',
    },
  ],
};

export default content;
