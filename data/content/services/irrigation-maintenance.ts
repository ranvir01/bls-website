import type { ServiceContent } from '@/data/types';

const content: ServiceContent = {
  slug: 'irrigation-maintenance',
  category: 'irrigation',
  name: 'Irrigation Maintenance',
  h1: 'Irrigation Maintenance in Kent & Greater Seattle',
  metaTitle: 'Irrigation Maintenance & Blowouts, Kent WA',
  metaDescription:
    'Spring start-ups, mid-season audits, certified annual backflow tests and fall blowouts for sprinkler systems in Kent, Covington, Renton and Greater Seattle.',
  quickAnswer:
    'Irrigation maintenance is the seasonal service that keeps a sprinkler system alive: spring start-up and coverage check, in-season programming, the annual certified backflow test, and a compressed-air blowout before the first hard freeze. Around Puget Sound expect roughly $95 to $235 per visit, or $275 to $450 for a full-year plan.',
  intro: [
    'The irrigation year in this region has four dates on it. Somewhere in April the system comes back online and gets walked head by head. Between June and mid-September it does the only real work it will do all year, and the schedule needs adjusting at least twice inside that window. Your water purveyor sends a backflow test notice, usually keyed to the month the assembly was installed. Then, before the first hard freeze, the whole system gets emptied with compressed air. Miss the last one and you are buying parts in March.',
    'A blowout is about air volume, not air pressure. We tow a rotary screw compressor that moves enough cubic feet per minute to actually push standing water out of a hundred feet of lateral and lift it through the heads, while holding pressure down where the pipe material is happy: roughly 50 psi on polyethylene, no more than 80 on PVC. That combination is why a pancake compressor from the garage never gets a system dry. It has the pressure and none of the volume, so it makes a lot of noise and leaves water sitting exactly where it will freeze.',
    'Spring start-up is not just opening a valve. Doing that fast is how mainlines get water hammered apart. We charge slowly with a downstream zone cracked open, bleed the air, then run every station and stand in the yard watching it. Winter mowing knocks arcs off. Frost heave tilts heads. Moles reroute laterals. Thatch swallows spray bodies. About a third of the systems we start up need at least one nozzle swapped or one head reset before the first watering week is out, and finding that in April costs a great deal less than finding it in August.',
    'Then there is programming, which is where most water gets wasted here. A controller left on a June schedule through September underwaters, and left on a September schedule in June it drowns things. We set run times against actual evapotranspiration for the month, split them into cycle-and-soak on till and clay so the water infiltrates instead of running downhill, and separate turf from the sword fern, salal and hydrangea beds that want far less once established. Systems we maintain get reprogrammed at start-up, again in July, and shut down in October.',
  ],
  included: [
    'Spring start-up with a slow mainline charge, backflow reopened in sequence, and every station run and observed',
    'Arc, radius and head-height correction after winter settling, frost heave and mower damage',
    'Nozzle cleaning, filter and screen rinse, and replacement of heads that did not survive the winter',
    'Controller programming by hydrozone for the current month, with cycle-and-soak splits on heavy soil',
    'Rain sensor and weather-feed verification, plus backup battery replacement in the controller',
    'Annual backflow assembly test by a Washington-certified tester, with the report filed to your water purveyor',
    'Mid-season audit using catch cups on problem zones, dry-spot diagnosis and run-time adjustment at peak demand',
    'Fall blowout zone by zone with a tow-behind compressor at pressures matched to the pipe material',
    'Assembly winterization: isolation valve closed, test cocks cracked open, insulated cover fitted and controller set to off',
  ],
  materials: [
    '185 CFM tow-behind rotary screw compressor with a regulated blowout fitting',
    'Hunter and Rain Bird replacement nozzles, filter screens and pressure-regulating stems',
    'Febco 765 and Watts 007 rebuild parts, bonnets, poppets and test cocks',
    'Insulated backflow enclosures and closed-cell pipe wrap for above-grade assemblies',
    'Hunter Hydrawise and Rain Bird ESP-TM2 controller modules, rain sensors and backup batteries',
    'Certified differential pressure gauge kit, calibrated annually for backflow testing',
    'Valve box gravel, replacement lids and DBR/Y gel splice connectors for faults found in service',
  ],
  process: [
    {
      title: 'April: bring it back up slowly',
      description:
        'The isolation valve opens a quarter turn with a downstream zone already running, so the mainline fills without slamming. Air bleeds out through the heads. Once the system is charged and holding, the backflow test cocks get closed in order and the assembly is checked for weeping. Rushing this step is the single most common way a homeowner blows a fitting on the first warm Saturday of the year.',
    },
    {
      title: 'April: walk every head in the yard',
      description:
        'We run each station and follow the water. Heads sunk into thatch come up on swing joints, tilted rotors get reset plumb, clogged nozzles get pulled and rinsed, and anything a mower took off over the winter is replaced. Arcs get squared away so the siding, the fence and the driveway stay dry. This walk is where the season is either set up properly or quietly lost.',
    },
    {
      title: 'Program for the month you are actually in',
      description:
        'Run times are set against current evapotranspiration, not a default schedule. On glacial till and compacted lawn we split a zone into two or three shorter cycles with soak time between, because the soil will not accept more than about a third of an inch an hour without shedding it. Beds on drip get long infrequent runs. Everything gets written on a card inside the controller door.',
    },
    {
      title: 'Certify the backflow assembly',
      description:
        'A certified tester runs a calibrated differential gauge on the assembly, checks both checks and the relief or air inlet, and completes the state report form. Passing reports go straight to your water district so the notice on your desk gets closed out. If the assembly fails, we quote the rebuild the same day, because most districts give a short correction window before they escalate.',
    },
    {
      title: 'July: audit while it is under real load',
      description:
        'Midsummer is the only honest time to test coverage, because that is when the system is being asked for everything. Catch cups go out on any zone with a suspect dry patch, we measure what is actually landing, and run times are corrected against the result. Pressure is checked at the far head, since a neighborhood under peak demand behaves differently than the same street in May.',
    },
    {
      title: 'Late October: empty the whole system',
      description:
        'The compressor connects at the blowout port, the water supply is shut and the mainline drained, then each zone is opened one at a time and blown until the heads mist rather than spray. Two passes per zone, short bursts, never running a dry zone long enough to cook the gears in a rotor. Drip zones get their filters pulled and drained by hand.',
    },
    {
      title: 'Close the assembly and leave notes',
      description:
        'The isolation valve is shut, test cocks are cracked at 45 degrees so nothing traps water, the assembly gets an insulated cover, and the controller goes to off rather than being unplugged so the program survives. Then we leave you a short note on what we found and what should be handled at start-up, so spring begins with information instead of surprises.',
    },
  ],
  timeline:
    'A spring start-up on a six-zone system takes 45 to 90 minutes, a fall blowout runs 30 to 60 minutes, the annual backflow test adds about 20 minutes, and a full mid-season audit with catch cups takes 1 to 2 hours.',
  costRows: [
    {
      item: 'Fall blowout, systems up to 8 zones',
      range: '$95-$185',
      unit: 'per visit',
      notes: 'Roughly $10 to $18 per additional zone beyond eight',
    },
    {
      item: 'Spring start-up with full zone inspection',
      range: '$125-$235',
      unit: 'per visit',
    },
    {
      item: 'Annual certified backflow test and report filing',
      range: '$85-$150',
      unit: 'per assembly',
    },
    {
      item: 'Full-year plan: start-up, backflow test and blowout',
      range: '$275-$450',
      unit: 'per year',
      notes: 'Priced by zone count and number of assemblies on the property',
    },
    {
      item: 'Mid-season coverage audit with catch cups',
      range: '$150-$310',
      unit: 'per visit',
    },
    {
      item: 'Wi-Fi controller upgrade fitted to an existing system',
      range: '$400-$875',
      unit: 'installed',
    },
  ],
  costNote:
    'These are typical service ranges for the Puget Sound market in 2026 rather than a quote, because zone count, the number of backflow assemblies on the property and how much the system has been neglected all change the visit length, and we confirm the figure after a walkthrough of the yard and the controller.',
  pnwConsiderations: [
    {
      title: 'The freeze that catches everyone',
      body: 'A Seattle winter averages mild, which is exactly why systems get left charged. What breaks pipe here is not a long cold season but a Fraser outflow event in December or January that holds us in the mid-twenties for four or five straight days. Water in an above-grade pressure vacuum breaker expands and splits the bonnet, and shallow laterals burst at the fittings. We aim to have every maintained system blown out between mid-October and mid-November, well ahead of that window.',
    },
    {
      title: 'Wet ground and a system that is switched off',
      body: 'Six months of steady rain does its own damage. Valve boxes on the Kent and Auburn valley floor fill with groundwater and sit there, corroding solenoid leads and rotting splices that were never made waterproof. Heads at the low end of a sloped zone in Renton or Newcastle keep weeping through winter if they have no check valves. Start-up is when we find all of it, which is why the April visit tends to pay for itself before the season begins.',
    },
    {
      title: 'Watering glacial till without wasting it',
      body: 'Alderwood and Everett series soils sit over cemented hardpan, and years of mowing compact the top few inches on top of that. Water applied faster than roughly a third of an inch per hour runs off downhill instead of soaking in, which is how a lawn can be watered for forty minutes and still be dry two inches down. Every schedule we set on till uses cycle-and-soak, and we push run times to pre-dawn so almost nothing is lost to evaporation or afternoon wind.',
    },
    {
      title: 'The annual test is a legal requirement, not a suggestion',
      body: 'Under WAC 246-290-490, Washington water purveyors have to keep a cross-connection control program, and that means the backflow assembly on your irrigation system must be tested every twelve months by a state-certified backflow assembly tester with the report filed. Kent, Covington Water District, Soos Creek, Highline and Water District 111 all mail notices with a deadline on them. Ignoring one can end in a water shutoff. Routine maintenance itself needs no permit, and replacing an assembly does.',
    },
  ],
  faqs: [
    {
      question: 'When should the blowout actually happen?',
      answer:
        'Mid-October through mid-November is the right window for the Puget Sound lowlands. Waiting for the forecast to show a freeze is a gamble, because the compressors are booked solid the week everybody panics. Doing it in September is also a mistake, since a warm dry October is common here and the lawn and new plantings will still want water. Watch the ten-day forecast and get it done before the first night in the low thirties.',
    },
    {
      question: 'Can I do the blowout myself with my shop compressor?',
      answer:
        'Almost certainly not, and the attempt is what breaks things. A typical portable compressor delivers 4 to 6 CFM, while clearing a residential zone properly needs something in the range of 20 to 50 CFM at low pressure. Homeowners compensate by cranking the pressure up, which blows out seals, cracks fittings and cooks rotor gears running dry. The other risk is skipping the backflow assembly entirely, which is the most expensive part to replace.',
    },
    {
      question: 'Do I really have to test the backflow every single year?',
      answer:
        'Yes. Washington cross-connection rules require an annual test by a certified assembly tester on every irrigation backflow assembly, and your water purveyor tracks the due date. The test is quick and inexpensive, and the report gets filed for you. Skipping it generates escalating notices from the district and, eventually, the authority to shut off water service to the property until the assembly is certified.',
    },
    {
      question: 'How often should sprinklers actually run in a Seattle summer?',
      answer:
        'Far less often than most controllers are set to, but for longer each time. Established lawn here wants roughly one to one and a half inches of water a week during July and August, delivered in two or three deep sessions rather than daily shallow ones. Daily short cycles train roots to stay in the top inch of soil, which makes the lawn less able to handle a hot week, not more.',
    },
    {
      question: 'What happens at start-up that I could not do myself?',
      answer:
        'You can open the valve. What you probably will not do is charge the mainline slowly enough to avoid water hammer, check the assembly for weeping under pressure, run all eight zones while actually watching each head, measure output on the zones that browned last year, and reprogram against current evapotranspiration. The visit is mostly diagnosis. The valve turning takes two minutes of it.',
    },
    {
      question: 'Do I still need maintenance if I have a smart controller?',
      answer:
        'A weather-based controller manages scheduling well and will save water, but it has no idea that a nozzle is clogged, a head is buried in thatch, a rhododendron has grown into the spray pattern or a solenoid is about to fail. It also cannot blow the system out or test your backflow assembly. Smart controllers reduce the programming work at each visit. They do not replace the visit.',
    },
  ],
  relatedServices: ['sprinkler-repair', 'sprinkler-installation', 'planting-design'],
  keywords: [
    'sprinkler blowout Kent WA',
    'irrigation winterization Seattle',
    'sprinkler system start up Renton',
    'backflow testing Covington WA',
    'irrigation maintenance plan King County',
    'sprinkler winterization cost Puget Sound',
    'annual backflow test Auburn WA',
  ],
};

export default content;
