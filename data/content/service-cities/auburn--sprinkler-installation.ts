import type { ServiceCityContent } from '@/data/types';

const content: ServiceCityContent = {
  citySlug: 'auburn',
  serviceSlug: 'sprinkler-installation',
  h1: 'Sprinkler Installation in Auburn, WA',
  metaTitle: 'Sprinkler System Installation in Auburn, WA',
  metaDescription:
    'Irrigation installed across Auburn, from valley alluvium to Lea Hill till and Lakeland Hills outwash gravel. Zoned by soil, backflow tested and filed.',
  quickAnswer:
    'Sprinkler installation in Auburn depends on which Auburn you live in. Valley-floor lots hold moisture in deep alluvial silt and want infrequent, deep soaks. Lakeland Hills outwash gravel drains within hours and wants the opposite. We test pressure and flow at the meter first, then draw zones around soil rather than square footage.',
  body: [
    'The Auburn valley floor turns hot and dry in July even though the same ground stayed soggy until May. Deep alluvial silt over the old Osceola Mudflow deposits holds moisture well, so a properly zoned system down there generally runs less often than homeowners expect, with longer soaks that push water past the top two inches instead of training grass roots to live at the surface. Frequent light watering is the single most common mistake we correct on existing valley systems.',
    'Lea Hill and West Hill behave like the rest of the plateau. Alderwood till, hardpan close under the topsoil, a low intake rate, and trenching instead of plowing because a vibratory plow will not pull pipe through cemented ground. Lakeland Hills is the outlier in this city. It sits on gravelly outwash on a graded plateau and gives water up within hours of a soaking. A Lakeland lawn running the valley program will be straw-colored by the third week of July, so those zones get shorter, more frequent runs and nozzles chosen for a higher precipitation rate.',
    'Two Auburn specifics are worth settling before a trencher shows up. The city maintains Groundwater Protection Zones around its municipal water sources, and work inside them can carry conditions on excavation and on where imported material came from, which is a call to the permit counter rather than an assumption. Second, plats built from the mid-1980s onward often sit on engineered fill with utilities at inconsistent depth, so we pothole by hand around anything the locate paint does not explain. Auburn addresses also fall to more than one water purveyor, and the backflow assembly reports to whichever one holds your meter.',
  ],
  localAngle:
    'Auburn is the one city on our list where the two halves need opposite watering programs in the same week: valley alluvium holds moisture and wants deep, infrequent soaks, while the outwash gravel under Lakeland Hills drains within hours and needs short, frequent cycles.',
  faqs: [
    {
      question: 'Does a Pierce County side address in Lakeland Hills change anything?',
      answer:
        'For the irrigation system itself, no. No building permit is required for a residential sprinkler system in King or Pierce County. What can change is which utility serves water at that address, and that decides whose cross-connection program your backflow assembly falls under and who sends the annual test notice. We confirm the purveyor before we tap the line rather than after.',
    },
    {
      question: 'Why is my Auburn lawn soaking wet in winter and dead in August?',
      answer:
        'Those are the same soil doing two jobs badly. Valley silt over mudflow deposits drains slowly, so winter rain sits near the surface with the water table only a few feet down. Then the dry stretch arrives, the top layer bakes, and roots that never had to grow deep have nothing to draw on. Drainage fixes the first half. An irrigation program built on longer, less frequent cycles fixes the second.',
    },
    {
      question: 'Can you install a system on a lot that was mass-graded with fill?',
      answer:
        'Yes, and most of Lakeland Hills and the newer Lea Hill plats are exactly that. The practical difference is that we cannot assume standard depths. Utilities in engineered fill turn up shallower or deeper than the drawing suggests, so a public locate ticket goes in first and we hand-pothole around gas services and unmarked private runs to detached garages and hot tubs. It adds time, and we say so at the walkthrough.',
    },
    {
      question: 'What does a sprinkler system cost on a typical Auburn lot?',
      answer:
        'A complete five-zone system on an average Auburn city lot typically falls between roughly $4,800 and $8,400 installed in the 2026 Puget Sound market, with the backflow assembly, purveyor paperwork and first certified test adding about $750 to $1,700 on top depending on whether it is a pressure vacuum breaker or a vaulted double check. Those are market ranges for planning. Measured pressure, meter size and the distance from the point of connection to the far corner move a real number more than lot area does.',
    },
  ],
};

export default content;
