import type { ServiceCityContent } from '@/data/types';

const content: ServiceCityContent = {
  citySlug: 'renton',
  serviceSlug: 'sprinkler-installation',
  h1: 'Sprinkler Installation in Renton, WA',
  metaTitle: 'Sprinkler Installation in Renton, WA',
  metaDescription:
    'Irrigation systems installed on Renton grade. Zones banded by elevation, check valves on sloped runs, aquifer protection and district backflow handled.',
  quickAnswer:
    'Renton lots carry real grade, and grade decides whether a sprinkler system here works. Every foot of rise costs just under half a psi, and every head below its valve drains the lateral out through itself after each cycle. We band zones by elevation, spec check valves, and set the backflow assembly your purveyor requires.',
  body: [
    'Elevation is the first number we write down on a Renton walkthrough. Pressure drops about 0.43 psi for every foot water has to climb, so a Kennydale or Talbot Hill yard that rises twenty feet from the meter to the top bed has given up close to nine psi before a nozzle opens. It shows up as an arc that will not quite reach the corner, and adding heads to that zone makes it worse rather than better. The answer is banding zones by elevation and keeping zone flow well under measured capacity.',
    'The second question is what happens when a zone shuts off. On a slope, every head sitting below its valve keeps draining the lateral out through itself, which leaves a permanent soft patch at the bottom of the run and a dry one at the top. Any zone with meaningful fall gets spring-loaded check valves in the head bodies. In the older Highlands blocks, some of that 1940s defense housing still runs on a small, corroded service line, and a yard like that can read perfectly acceptable on static pressure and dismally on flow. We measure both, gauge and timed bucket, before a layout is drawn.',
    'Renton adds one overlay that touches trenching. Much of the city sits above the Cedar Valley aquifer that supplies its drinking water, and the mapped Aquifer Protection Area zones carry genuine conditions on excavation and on documenting imported fill. Worth checking on the parcel early, along with whether the address is actually inside the city at all. Fairwood, Skyway and East Renton Highlands carry Renton mail while sitting in unincorporated King County, and they are served by different water districts, which determines whose cross-connection program your assembly answers to.',
  ],
  localAngle:
    'Grade is the variable here. A Renton yard with fifteen or twenty feet of rise between the meter and the far bed loses enough pressure to strand a zone, and every head below its valve will empty the line out through itself unless the bodies carry check valves.',
  faqs: [
    {
      question: 'My mail says Renton. Which district handles my backflow test?',
      answer:
        'Depends on the parcel, not the mailing address. The City of Renton utility serves much of the incorporated city, while Fairwood, Benson Hill fringes, East Renton Highlands and Skyway fall to neighboring water districts and unincorporated King County. Each runs its own cross-connection control program under the state rule, and each sends its own annual test notice. We look the parcel up before pricing so the assembly, the paperwork and the first certified test go to the right place.',
    },
    {
      question: 'Why does the bottom of my sloped lawn stay soggy in July?',
      answer:
        'Almost always low-head drainage. When the valve closes, everything left in that lateral runs downhill and exits through the lowest head on the line, twice a day, all summer. You get a swamp at the bottom and dry turf at the top from a system that is technically working. Retrofitting check-valve heads or check-valve stems on the low end of the zone solves it, and on a new install we spec them from the start on any run with real fall.',
    },
    {
      question: 'Do I need a permit to install sprinklers in Renton?',
      answer:
        'Not for the piping and heads. Nowhere in King County requires a building permit for a residential irrigation system. The backflow assembly is the regulated part: it falls under state cross-connection control rules, has to be an approved model set at the right height and orientation, and needs a certified test at installation and every year after. Separately, if the parcel is inside the stricter Aquifer Protection Area zone, excavation depth and imported fill can carry conditions, so we check the mapping rather than guessing.',
    },
    {
      question: 'Does a hillside system cost more than a flat lot?',
      answer:
        'Usually a little, and it is about zone count rather than difficulty. Slope means elevation banding, which means more valves carrying fewer heads each, plus check-valve heads and often a pressure-regulating body on the low zones. In the 2026 Puget Sound market a residential zone typically runs roughly $850 to $1,400 installed, so a Kennydale or Talbot Hill yard that needs seven zones instead of five lands proportionally higher. Treat that as a market range for planning; the real number comes off a site walkthrough.',
    },
  ],
};

export default content;
