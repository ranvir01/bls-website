import type { ServiceCityContent } from '@/data/types';

const content: ServiceCityContent = {
  citySlug: 'covington',
  serviceSlug: 'sprinkler-installation',
  h1: 'Sprinkler Installation in Covington, WA',
  metaTitle: 'Sprinkler Installation in Covington, WA',
  metaDescription:
    'Sprinkler systems installed in Covington for hardpan ground. Short-cycle scheduling, trenched mainlines on Timberlane lots, water district backflow handled.',
  quickAnswer:
    'Covington sits on hardpan, so a sprinkler system here is designed around how slowly the ground accepts water rather than how much the lawn wants. Zones run short cycles with soak time between them. Trenching is slower through till than through valley soil, and Covington Water District requires a tested backflow assembly on every irrigation connection.',
  body: [
    'Covington lawns are big, mostly flat, and sitting on ground that will not take water quickly. Once the top foot is wet, the till under this plateau accepts well under a third of an inch an hour. That is why so many yards out here run an existing system for forty minutes a zone and still brown out in August: water applied faster than the soil can absorb it slides to the low corner and evaporates off the surface. Every zone we program in Covington is split into short passes with soak time in between, and nozzles are chosen for a low precipitation rate rather than a fast finish.',
    'The digging is slower than a valley job and we price it that way. A vibratory plow will not pull pipe through cemented till, so Covington installs are trenched, and Timberlane and Pipe Lake lot sizes mean genuinely long mainline runs to reach the back fence. One thing here should be measured rather than assumed. Bands of recessional outwash sand and gravel run through this same landscape, which is what the pits along Kent-Kangley are working, and the boundary between free-draining gravel and concrete-hard till can cross a single property line. A yard with till under the front lawn and gravel behind the shop needs those separated onto different valves, or one of them is always wrong.',
    'Covington Water District serves nearly the whole city and requires an approved backflow assembly on an irrigation connection, tested by a certified tester at installation and again every twelve months. The district will also quote a dedicated irrigation meter, which on a half-acre lawn often pays for itself by keeping summer watering off the sewer volume charge. Because Covington sits at the front edge of the foothill rain gradient and runs measurably wetter than Kent, the true watering season here is short. A weather-based controller earns its keep in May and September.',
  ],
  localAngle:
    'Hardpan sets the schedule in Covington. The till here accepts water far more slowly than valley soil does, so the difference between a system that carries a lawn through August and one that browns out is soak-cycle programming and low-precipitation nozzles, not longer run times.',
  faqs: [
    {
      question: 'What does Covington Water District require on a new sprinkler system?',
      answer:
        'An approved backflow assembly at the point of connection, installed at the correct height and orientation for the model, plus an initial test by a Washington-certified backflow assembly tester with results reported to the district. After that it is an annual test, and the district follows up when a report does not arrive. We install to district spec, schedule the first test and hand you the paperwork so the yearly notice is not a surprise.',
    },
    {
      question: 'Is a separate irrigation meter worth it here?',
      answer:
        'On a large Covington lawn, usually yes. Water that goes through your house meter is generally billed for sewer volume as well, and irrigation water never reaches the sewer. A dedicated irrigation meter takes that charge off the summer bill. There is an up-front connection cost from the district, so it pays back faster on a half-acre of turf than on a small front lawn. We can price the system both ways at estimate time.',
    },
    {
      question: 'My existing system runs an hour a zone and I still have dry patches.',
      answer:
        'That is the classic hardpan symptom, and more run time makes it worse. On till, water applied past the intake rate runs off instead of soaking in, so the far end of the zone gets surface wetting and nothing below it. Two things fix it: split the zone into three short cycles with twenty or thirty minutes between them, and check that every head on the valve has a matched precipitation nozzle. Mixed rotors and sprays on one zone guarantee dry arcs no matter how long it runs.',
    },
    {
      question: 'How long does an install take on a half-acre Covington lot?',
      answer:
        'A four to six zone system is normally two to four days on site. Larger Covington properties with long mainline runs, drip zones for the beds and till that has to be trenched rather than plowed push toward four to seven days, with the certified backflow test scheduled inside the following week. Cost in the 2026 Puget Sound market typically lands around $850 to $1,400 per zone installed, which is a planning range rather than a quote.',
    },
  ],
};

export default content;
