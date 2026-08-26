import type { BlogPost } from '@/data/types';

const post: BlogPost = {
  slug: 'when-to-winterize-sprinklers-pnw',
  title: 'When to Winterize Sprinklers in the Pacific Northwest',
  metaTitle: 'When to Winterize Sprinklers in the Pacific Northwest',
  metaDescription:
    'Real Puget Sound blowout timing by elevation, the 28-degree threshold that actually matters, blowout PSI limits by pipe material, and 2026 cost ranges.',
  publishedAt: '2026-07-28',
  quickAnswer:
    'Blow out a Puget Sound sprinkler system between mid-October and mid-November, ahead of the first night near 28 degrees. Sea-Tac usually sees its first freezing night in early November, but the plateau above the Green River valley runs two to three weeks earlier. Use high air volume at low pressure: 50 psi on polyethylene, 80 psi on PVC.',
  excerpt:
    'Puget Sound sprinkler winterization is a scheduling problem more than a weather problem. Here is the real blowout window by elevation, what actually freezes first, and the pressure limits that keep a blowout from doing its own damage.',
  blocks: [
    {
      type: 'p',
      text: 'There is one date on the irrigation calendar that costs real money if you miss it, and it is not the one most people watch. Homeowners wait for a frost warning to show up on the ten-day forecast, then start calling. By that point every tow-behind compressor in South King County is booked a week and a half out and the cold is already sitting on top of the region. Winterizing a sprinkler system around Puget Sound is a scheduling problem more than a weather problem, and the schedule starts earlier than our mild reputation suggests.',
    },
    { type: 'h2', text: 'The window is mid-October to mid-November' },
    {
      type: 'p',
      text: 'Sea-Tac normally logs its first 32 degree night somewhere in the first half of November. A genuine hard freeze, meaning 28 degrees or colder held for several hours, tends to arrive later in November or into December. Those are averages, and averages are not what split brass. What splits brass is the November that decides to behave like January, which happens here often enough that we start booking blowouts the first week of October. The goal is to have plateau systems empty by roughly Halloween and shoreline systems empty by mid-November.',
    },
    {
      type: 'table',
      caption: 'Blowout timing by elevation and marine exposure, Puget Sound lowlands',
      head: ['Area', 'Typical first freezing night', 'Book the blowout for'],
      rows: [
        [
          'Shoreline: Des Moines, Burien, West Seattle, Magnolia, Ballard',
          'Mid to late November',
          'November 1 to November 20',
        ],
        [
          'Valley floor: Kent, Auburn, Renton, Tukwila',
          'Early to mid November',
          'October 20 to November 10',
        ],
        [
          'Plateau: Covington, Federal Way, west Maple Valley',
          'Late October to early November',
          'October 15 to November 1',
        ],
        [
          'Foothill benches: Issaquah, Sammamish, east Maple Valley',
          'Mid to late October',
          'October 10 to October 28',
        ],
        [
          'Any lot with an above-grade backflow assembly',
          'Not the deciding factor',
          'The earliest date you can get on the calendar',
        ],
      ],
    },
    {
      type: 'p',
      text: 'Elevation is only half the story. The Green River valley floor is a cold-air drainage basin, so on a clear calm night in late October a thermometer in a Kent backyard can read three or four degrees lower than one on the Covington plateau six hundred feet above it. Valley lots also carry a high winter water table that keeps valve boxes wet. Both facts push the valley blowout earlier than a topographic map alone would suggest.',
    },
    {
      type: 'callout',
      title: '28 degrees is the number, not 32',
      text: 'A light frost with the air at 33 degrees does almost nothing to a properly buried lateral. Eight to twelve inches of Puget Sound soil is real insulation and it holds heat for days. The part that fails is the backflow assembly standing above grade at the point of connection, because a pressure vacuum breaker bonnet is thin, full of standing water, and fully exposed to wind. Two or three hours in the high twenties is enough to split one. Watch the overnight low, not the frost advisory.',
    },
    { type: 'h2', text: 'What actually freezes, in the order it fails' },
    {
      type: 'ol',
      items: [
        'The backflow assembly. A Febco 765 pressure vacuum breaker or a Watts 007 double check sits above grade, holds water, and has the least material between that water and the air. It breaks first and it is the most expensive single component on the system.',
        'Exposed risers and the copper at the point of connection. Anything between the meter and the first buried fitting is on its own once the temperature drops.',
        'Spray head canisters at the high point of a zone. A four-inch pop-up body holds a few ounces of water in the barrel. When that freezes the body splits along the seam, and you find out in April.',
        'Valve manifolds sitting in flooded boxes. On the Kent and Auburn valley floor a box set without a gravel sump fills with groundwater by November. Freezing rarely cracks the valve body, but it corrodes solenoid leads and destroys any splice that was not made waterproof.',
        'Buried mainline and laterals, last and least often. The exceptions are the runs that never got real cover: a lateral crossing under a paver driveway, a line threaded through a rockery, or a pipe backfilled at four inches because the trench hit hardpan and nobody wanted to argue with it.',
      ],
    },
    { type: 'h2', text: 'A blowout is about volume, not pressure' },
    {
      type: 'p',
      text: 'This is the most misunderstood thing about winterization. Pressure does not push water out of a hundred feet of lateral. Air volume does, measured in cubic feet per minute. A tow-behind rotary screw compressor moving 185 CFM at 50 psi will lift standing water up through every head on a zone and leave the pipe misting. A small compressor at 120 psi makes an impressive amount of noise, clears the first twenty feet, and cooks a rotor gear drive while the far end of the line stays full.',
    },
    {
      type: 'table',
      caption: 'Blowout limits by component, and the number that actually matters',
      head: ['Component', 'Limit', 'Why'],
      rows: [
        [
          'Flexible polyethylene lateral',
          '50 psi maximum',
          'The common lateral material here; insert fittings let go above this',
        ],
        [
          'Class 200 and Schedule 40 PVC mainline',
          '80 psi maximum',
          'Rigid pipe tolerates more, but glued joints and fittings set the ceiling',
        ],
        [
          'Inline dripline and micro tubing',
          '25 to 30 psi maximum',
          'Pull the Y-filter screen and drain the pressure regulator by hand',
        ],
        [
          'Backflow assembly body',
          'Never force air through it',
          'Isolate it, then drain it through the test cocks',
        ],
        [
          'Airflow for a residential system',
          '20 to 50 CFM',
          'Volume is what clears the pipe; a shop compressor delivers 4 to 6',
        ],
        [
          'Time on any single dry rotor',
          'About one minute',
          'The gear drive is lubricated by the water passing through it',
        ],
      ],
    },
    { type: 'h3', text: 'The sequence we run' },
    {
      type: 'ol',
      items: [
        'Close the isolation valve upstream of the backflow assembly and relieve the pressure downstream of it.',
        'Connect at the blowout port on the downstream side of the assembly, never through the assembly. Air forced backward through a check assembly wrecks the poppet and the relief.',
        'Open one zone at the controller before introducing any air, so the compressor is never pushing against a closed system.',
        'Work zone by zone in short bursts, starting with the zone farthest from the compressor. Watch the heads. When the spray thins to a dry mist, that zone is done.',
        'Make a second pass on every zone. Water settles back into low spots after the first pass, and the second pass is where most people would have stopped too early.',
        'Finish with the drip zones. Pull the filter screen, drain the pressure regulator, and open the flush end of the dripline by hand.',
      ],
    },
    { type: 'h2', text: 'The half hour after the compressor leaves' },
    {
      type: 'p',
      text: 'The blowout is most of the job and not all of it. Plenty of systems still fail after a competent blowout, because the last few steps got skipped while everyone was coiling hose in the driveway.',
    },
    {
      type: 'ul',
      items: [
        'Shut the isolation valve, then crack both test cocks on the backflow assembly to roughly 45 degrees. A half-open ball valve is exactly where water hides and where a body cracks.',
        'Fit an insulated cover over the assembly. A rigid foam enclosure or a wrapped insulation blanket both work. A plastic bag that traps condensation against the brass does not.',
        'Set the controller to OFF rather than pulling the plug. Off keeps the clock and the programs in memory; unplugged means reprogramming from scratch in April on plenty of older units.',
        'Leave the rain sensor connected and put a fresh backup battery in the controller so it wakes up on the right date.',
        'Disconnect every garden hose from the sillcocks. A hose left threaded onto a frost-free sillcock defeats it completely, because the valve seat can no longer drain past the hose.',
        'Tape a note inside the controller door with the date, the pressure used, and anything that looked wrong. That note is worth an hour of diagnosis at spring start-up.',
      ],
    },
    { type: 'h2', text: 'What the blowout costs, and what skipping it costs' },
    {
      type: 'table',
      caption: 'Typical installed and service ranges, Puget Sound market, 2026',
      head: ['Item', 'Typical range', 'Unit'],
      rows: [
        ['Fall blowout, systems up to 8 zones', '$95-$185', 'per visit'],
        ['Each zone beyond eight', '$10-$18', 'per zone'],
        ['Insulated backflow enclosure fitted', '$45-$110', 'installed'],
        ['Full-year plan: start-up, certified backflow test and blowout', '$275-$450', 'per year'],
        ['Spring repair: split PVB bonnet and poppet rebuild', '$180-$450', 'per assembly'],
        ['Spring repair: backflow assembly replaced outright', '$650-$1,500', 'installed'],
        ['Spring repair: cracked lateral located, excavated and spliced', '$350-$900', 'per repair'],
        ['Spring repair: mainline break under a patio or driveway', '$900-$2,600', 'per repair'],
      ],
    },
    {
      type: 'p',
      text: 'Those are typical service ranges for the Puget Sound market in 2026, not quotes. The arithmetic is still hard to argue with. A single blowout costs less than the cheapest freeze repair on the list, and a freeze almost never breaks only one thing. When an assembly splits above grade with the supply still open, water keeps running until somebody notices, and the bill stops being about irrigation.',
    },
    { type: 'h2', text: 'If the cold got here first' },
    {
      type: 'ol',
      items: [
        'Shut the isolation valve at the point of connection right away, before anything thaws and starts running.',
        'Leave the system alone. Do not charge it to hunt for leaks while the ground is still frozen, because a split you pressurize becomes a flood.',
        'Get the blowout done on the next dry day above freezing. Clearing the system after one cold snap still protects it from the next one, and there is usually more than one.',
        'Book the repair for spring start-up rather than February. Diagnosing a split lateral costs far less when the system can be run and watched and the ground is workable.',
        'Photograph any visible damage before anything gets repaired, in case there is an insurance conversation later.',
      ],
    },
    {
      type: 'callout',
      title: 'The crew that built it is the crew that empties it',
      text: 'Blue Landscaping Services designs irrigation in-house and installs it with our own people out of a Kent shop, so the person who set your head heights in June is the one clearing the lines in October. We tow a 185 CFM compressor, blow out zone by zone at pressures matched to your pipe material, and close the backflow assembly properly before we leave. Call (253) 429-7052 to get on the fall schedule. October fills first.',
    },
  ],
  faqs: [
    {
      question: 'My controller is a smart Wi-Fi model with a rain sensor. Does it winterize itself?',
      answer:
        'No, and this trips up more people every year. A weather-based controller decides when to water. It has no valve on the supply line and no way to remove water from pipe. Setting seasonal adjust to zero, or letting the rain sensor hold everything off all winter, leaves the mainline and the backflow assembly fully charged and pressurized. The controller is the brain, not the shutoff.',
    },
    {
      question: 'My system has automatic drain valves at the low points. Do I still need a blowout?',
      answer:
        'Treat them as a backup, not a plan. Automatic drains only work if the pipe was laid with continuous fall toward them, which almost nothing on a flat valley lot in Kent or Auburn actually has. They also silt up with grit and stop seating. Even when they function, they drain the mainline and leave water sitting in head canisters, lateral bellies and the assembly above grade.',
    },
    {
      question: 'How much water is actually sitting in the system?',
      answer:
        'More than people expect. One-inch pipe holds roughly four hundredths of a gallon per foot, so a six-zone yard with four hundred feet of lateral is carrying about 16 gallons before you count the mainline, the valve manifolds and the heads. Gravity moves very little of that on level ground. It stays where it is until air pushes it out.',
    },
    {
      question: 'What else on the property needs attention at the same time?',
      answer:
        'Pull hose-end timers off the sillcocks, drain them and store them indoors, since the plastic bodies crack readily. Shut the interior stop valve for any hose bib that has one. Drain a dedicated line to an outdoor sink, kitchen or fridge. Pondless water features can usually keep running through a normal winter, but the pump should be pulled or the basin dropped below the freeze line if the unit sits in an exposed spot.',
    },
    {
      question: 'Will homeowners insurance pay for a frozen irrigation line?',
      answer:
        'Usually not for the irrigation system itself. Washington policies commonly exclude damage to underground pipes and often exclude freeze damage where the system was not properly maintained or drained. Resulting water damage to a structure is sometimes covered, sometimes not. Read the actual policy language and ask your agent before you assume anything, because the maintenance exclusion is the clause that decides most of these claims.',
    },
  ],
  relatedServices: ['irrigation-maintenance', 'sprinkler-repair', 'sprinkler-installation'],
  relatedCities: ['kent', 'auburn', 'renton', 'covington', 'maple-valley'],
  readingMinutes: 6,
};

export default post;
