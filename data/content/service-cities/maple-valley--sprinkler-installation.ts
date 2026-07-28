import type { ServiceCityContent } from '@/data/types';

const content: ServiceCityContent = {
  citySlug: 'maple-valley',
  serviceSlug: 'sprinkler-installation',
  h1: 'Sprinkler Installation in Maple Valley, WA',
  metaTitle: 'Sprinkler Installation in Maple Valley, WA',
  metaDescription:
    'Irrigation installed in Maple Valley around septic drainfields, NGPE tracts and fir shade. Well fed or district fed, zoned honestly, backflow certified.',
  quickAnswer:
    'Two things get located before we trench a sprinkler system in Maple Valley: the septic drainfield with its reserve area, and the Native Growth Protection Easement recorded across most plats built after 1995. Half-acre lots under second-growth fir also mean shade zones and sun zones run on completely different schedules.',
  body: [
    'The first hour on a Maple Valley job goes to finding what you cannot see. Plenty of the older properties around Lake Wilderness, Cherokee Bay and out toward Hobart are on septic, and a trencher does not care whether it is crossing the drainfield or the reserve area held next to it. We locate the tank, the field and the reserve, keep the mainline clear of both, and keep spray heads off them, because a drainfield kept saturated through the summer stops treating. On the plats built between 1995 and 2008, the back of the lot is frequently a Native Growth Protection Easement recorded on the face of the plat, and that tract is off limits for trenching no matter what the layout would prefer.',
    'Watering here is also a light problem. Second-growth Douglas fir shades most of these yards for a good part of the day, and shaded turf under conifers wants roughly half the water of the sunny strip along the driveway, minus whatever the fir roots take back first. Those never belong on the same valve. Foothill rainfall of 55 to 65 inches a year does nothing for you in late July, but it does shorten the season at both ends, which is exactly the case for a weather-based controller.',
    'Some properties out here are fed by a private well rather than by Covington Water District, and that changes the design arithmetic completely. Pump capacity and recovery rate, not street pressure, decide how many heads a zone can carry, so we run a timed drawdown test before drawing anything and usually end up with more zones running fewer heads. Half-acre Maple Valley lots commonly land at seven to ten zones, which at typical 2026 Puget Sound rates of roughly $850 to $1,400 per zone puts a full system in the $6,000 to $13,000 range. That is a market range for planning, not a quote.',
  ],
  localAngle:
    'Two site features exist on Maple Valley lots that most of South King County does not have: a septic drainfield with a protected reserve area, and a Native Growth Protection Easement recorded across the back of the plat. Both are located and drawn before any trench line is set.',
  faqs: [
    {
      question: 'Can you run a sprinkler system off my well?',
      answer:
        'Often yes, with a real test first. A well system is limited by pump output and the recovery rate of the well rather than by a city main, so we run a timed drawdown before designing anything. The usual outcome is more zones with fewer heads on each, sometimes a cycle spread across two start times so the well can recover between them. Cross-connection protection still applies, and if the well ever serves more than your own household the rules tighten further.',
    },
    {
      question: 'Can you trench across my septic drainfield?',
      answer:
        'No, and we will not design a layout that asks to. Trenching through a drainfield damages the distribution lines and compacts the soil doing the treating, and the reserve area next to it is legally protected for a future replacement field. We route the mainline around both, keep spray from soaking either one, and if that leaves an awkward corner of lawn, it gets its own valve rather than a pipe run through the field.',
    },
    {
      question: 'Does a yard with this much rain even need irrigation?',
      answer:
        'From October through May, no. From roughly the first week of July into mid-September, absolutely. The dry stretch here is as real as it is anywhere in the Puget Sound lowlands, and the wet-season rainfall does not bank. What the foothill climate does change is the shoulder season. A weather-based controller with a rain sensor will simply skip weeks in May and September that a fixed schedule would waste.',
    },
    {
      question: 'How do you water a yard that is half fir shade and half open sun?',
      answer:
        'By splitting them onto separate valves and accepting that they are different climates. The open lawn along a south-facing driveway can need twice the run time of turf under a fir canopy, and running both on one program either scorches one or grows moss in the other. Beds of sword fern, salal, evergreen huckleberry and vine maple go on their own dripline zone at a low emitter rate, then get dialed back hard after the second summer once they are rooted.',
    },
  ],
};

export default content;
