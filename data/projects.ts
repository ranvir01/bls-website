import type { ImageAsset, Project } from './types';

function photo(
  src: string,
  alt: string,
  width: number,
  height: number,
): ImageAsset {
  return { src, alt, width, height, assetType: 'photo' };
}

/**
 * Completed work restored from the original site.
 *
 * These are the company's own job photos (previously hosted on Imgur, now
 * self-hosted). Named entries keep the original titles. We do not invent
 * neighborhoods, review quotes, or completion dates we do not have.
 */
export const projects: Project[] = [
  {
    slug: 'front-yard-renovation',
    title: 'Front Yard Renovation',
    serviceSlug: 'planting-design',
    citySlug: 'kent',
    after: photo(
      '/images/portfolio/front-yard-renovation.jpg',
      'Rebuilt front rockery bed replanted with roses, hosta and perennials in fresh bark, below the porch of a green craftsman',
      1400,
      1050,
    ),
    caption:
      'Front rockery bed rebuilt and replanted with roses, hosta and perennials in fresh bark, so the house reads well from the sidewalk.',
    assetType: 'photo',
    scope: ['Rockery bed rebuild', 'Planting design', 'Bark mulch'],
    materials: ['Basalt boulders', 'Roses, hosta and mixed perennials', 'Fine bark'],
    timeline: 'Built by our crew',
    challenge: 'A tired front bed that had gone to weeds and did nothing for the house behind it.',
    solution:
      'We reset the rockery, brought in fresh soil and bark, and replanted it so there is something in flower from spring through fall.',
  },
  {
    slug: 'modern-patio-design',
    title: 'Modern Patio Design',
    serviceSlug: 'paver-patios',
    citySlug: 'kent',
    after: photo(
      '/images/portfolio/modern-patio-design.jpg',
      'Custom paver patio and outdoor living space in Greater Seattle',
      1400,
      1050,
    ),
    caption: 'Custom patio with room to sit, eat, and use the yard — not just look at it.',
    assetType: 'photo',
    scope: ['Paver patio', 'Outdoor living layout', 'Integrated planting'],
    materials: ['Concrete pavers', 'Compacted crushed-rock base', 'Edge restraint'],
    timeline: 'Built by our crew',
    challenge: 'An unused backyard that needed a real outdoor living space, not a leftover patch of lawn.',
    solution:
      'We laid a compacted-base paver patio and planned the furniture layout so the space works for everyday use.',
  },
  {
    slug: 'backyard-patio-irrigation',
    title: 'Backyard Patio & Irrigation',
    serviceSlug: 'paver-patios',
    citySlug: 'kent',
    after: photo(
      '/images/portfolio/backyard-patio-irrigation.jpg',
      'Backyard patio with integrated irrigation in Greater Seattle',
      1400,
      1050,
    ),
    caption: 'Patio and irrigation installed together so the beds around it stay watered without soaking the pavers.',
    assetType: 'photo',
    scope: ['Paver patio', 'Irrigation zones', 'Planting beds'],
    materials: ['Concrete pavers', 'Zoned sprinkler system', 'Backflow assembly'],
    timeline: 'Built by our crew',
    challenge: 'A backyard that needed both a usable patio and a way to water the new planting without waste.',
    solution:
      'We built the patio and ran irrigation in the same job so the water stays in the beds, not on the pavers.',
  },
  {
    slug: 'stepping-stone-pathway',
    title: 'Modern Stepping Stone Pathway',
    serviceSlug: 'walkways',
    citySlug: 'kent',
    after: photo(
      '/images/portfolio/stepping-stone-pathway.jpg',
      'Flagstone stepping stones set in fresh bark down a narrow side yard, beside a new deck frame and a horizontal cedar fence',
      1400,
      1867,
    ),
    caption:
      'Flagstone stepping stones set in fresh bark down a narrow side yard — a dry route to the back that also keeps the mud off the deck.',
    assetType: 'photo',
    scope: ['Flagstone stepping stones', 'Bark bed', 'Side-yard access'],
    materials: ['Irregular flagstone', 'Fine bark', 'Boulders along the fence'],
    timeline: 'Built by our crew',
    challenge: 'A muddy side yard that everyone had to walk through to reach the back.',
    solution: 'We set flagstone in bark so there is a level, dry route along the fence in every season.',
  },
  {
    slug: 'sod-and-lighting',
    title: 'Sod Installation & Landscape Lighting',
    serviceSlug: 'sod-installation',
    citySlug: 'kent',
    after: photo(
      '/images/portfolio/sod-and-lighting.jpg',
      'New sod lawn with landscape lighting in Greater Seattle',
      1400,
      1867,
    ),
    caption: 'Fresh sod on a graded, amended base, with lighting that shows the yard off after dark.',
    assetType: 'photo',
    scope: ['Grading and soil prep', 'Sod installation', 'Landscape lighting'],
    materials: ['Premium sod', 'Amended topsoil', 'Low-voltage fixtures'],
    timeline: 'Built by our crew',
    challenge: 'A thin, patchy lawn and a front yard that disappeared at night.',
    solution: 'We fixed the grade, laid new sod, and added lighting so the lawn takes and the house has curb appeal after dark.',
  },
  {
    slug: 'custom-entry-design',
    title: 'Custom Entry Design',
    serviceSlug: 'walkways',
    citySlug: 'kent',
    after: photo(
      '/images/portfolio/custom-entry-design.jpg',
      'Curved flagstone walkway from a back porch across new sod to a cedar fence and raised garden bed',
      1400,
      1050,
    ),
    caption:
      'A curved flagstone walk from the back porch across new sod, with a cedar fence and a raised bed to finish the yard.',
    assetType: 'photo',
    scope: ['Flagstone walkway', 'Sod', 'Raised garden bed'],
    materials: ['Flagstone', 'Sod', 'Cedar fence and raised bed'],
    timeline: 'Built by our crew',
    challenge: 'A back yard with no clear path from the porch and nowhere to grow anything.',
    solution: 'We set a curved flagstone walk in new sod and built a cedar raised bed along the fence.',
  },
  {
    slug: 'stone-retaining-wall',
    title: 'Stone Retaining Wall',
    serviceSlug: 'retaining-walls',
    citySlug: 'kent',
    after: photo(
      '/images/portfolio/stone-retaining-wall.jpg',
      'Two-tier grey segmental block retaining wall stepping down a back slope, graded and ready for topsoil',
      1400,
      1867,
    ),
    caption:
      'A two-tier segmental block wall stepping down the back slope, with the drainage behind it done properly so it holds.',
    assetType: 'photo',
    scope: ['Two-tier retaining wall', 'Drain rock and drain line', 'Cap course'],
    materials: ['Segmental concrete block', 'Drain rock', 'Perforated drain pipe'],
    timeline: 'Built by our crew',
    challenge: 'A back slope that was eating the usable yard.',
    solution: 'We built it in two tiers on a compacted base, with drain rock and a drain line to daylight — the part that keeps it standing.',
  },
  {
    slug: 'irrigation-system',
    title: 'Professional Irrigation System',
    serviceSlug: 'sprinkler-installation',
    citySlug: 'kent',
    after: photo(
      '/images/portfolio/irrigation-system.jpg',
      'Residential sprinkler system installed in Greater Seattle',
      1400,
      1867,
    ),
    caption:
      'Zoned sprinklers with a backflow assembly, set up so turf, beds, and new plants are not all on the same clock.',
    assetType: 'photo',
    scope: ['Sprinkler layout', 'Zoning', 'Backflow assembly'],
    materials: ['Spray and rotor heads', 'Controller', 'Code-required backflow preventer'],
    timeline: 'Built by our crew',
    challenge: 'A yard that browns out in August because winter rain is not enough to carry plants through a dry stretch.',
    solution: 'We installed a zoned system with backflow protection and a controller you can actually leave alone.',
  },
  {
    slug: 'driveway-pathway',
    title: 'Contemporary Driveway Pathway',
    serviceSlug: 'driveways',
    citySlug: 'kent',
    after: photo(
      '/images/portfolio/driveway-pathway.jpg',
      'Stepping stone pathway along a residential driveway in Greater Seattle',
      1400,
      1866,
    ),
    caption: 'Stepping stones and crushed rock along the drive, with a lawn and plantings that finish the front of the house.',
    assetType: 'photo',
    scope: ['Driveway-edge path', 'Drainage rock', 'Lawn and planting'],
    materials: ['Concrete slabs', 'Crushed rock', 'Sod'],
    timeline: 'Built by our crew',
    challenge: 'People walking in the mud beside the driveway, and a front yard that looked unfinished.',
    solution: 'A solid path next to the drive, with lawn and planting to match.',
  },
  {
    slug: 'modern-planting-design',
    title: 'Modern Planting Design',
    serviceSlug: 'planting-design',
    citySlug: 'kent',
    after: photo(
      '/images/portfolio/modern-planting-design.jpg',
      'Grey composite deck with a built-in bench along its edge, looking across a planted gravel bed to a small block fire-pit ring and tall firs',
      1400,
      1867,
    ),
    caption:
      'A composite deck with a built-in bench, edged by a gravel bed planted with irises, rhododendrons and boulders that hold up through a wet winter.',
    assetType: 'photo',
    scope: ['Composite deck and bench', 'Gravel bed', 'Planting plan'],
    materials: ['Composite decking', 'Gravel', 'Zone 8b shrubs and perennials', 'Boulders'],
    timeline: 'Built by our crew',
    challenge: 'A back yard with a view and nowhere to sit in it.',
    solution: 'We built the deck and bench, then planted the gravel bed around it with species that handle this climate and stay tidy without weekly fuss.',
  },
  {
    slug: 'modern-gate',
    title: 'Modern Gate Installation',
    serviceSlug: 'fencing',
    citySlug: 'kent',
    after: photo(
      '/images/portfolio/modern-gate.jpg',
      'Custom cedar gate with black wire-mesh infill on a bluestone side-yard walk, star jasmine climbing the trellis beside it',
      1400,
      1050,
    ),
    caption: 'A cedar-framed gate with black wire-mesh infill, opening onto a bluestone walk down the side yard.',
    assetType: 'photo',
    scope: ['Custom gate', 'Bluestone side-yard walk', 'Post setting'],
    materials: ['Cedar', 'Black wire mesh', 'Bluestone pavers', 'Concrete-set posts'],
    timeline: 'Built by our crew',
    challenge: 'A side-yard entry that needed a proper gate and a finished look, not a builder-grade one.',
    solution: 'We built a cedar-framed mesh gate to match the fence, set the posts in concrete, and laid bluestone through the gap.',
  },
  {
    slug: 'deck-stairs',
    title: 'Custom Deck Stairs',
    serviceSlug: 'outdoor-steps',
    citySlug: 'kent',
    after: photo(
      '/images/portfolio/deck-stairs.jpg',
      'Wide cedar deck stairs with a matching handrail and cedar planter boxes, leading down from an existing deck',
      1400,
      1050,
    ),
    caption: 'Wide cedar stairs with a matching handrail and planter boxes, so getting down from the deck is easy and looks finished.',
    assetType: 'photo',
    scope: ['Deck stairs', 'Handrail', 'Planter boxes'],
    materials: ['Structural stringers', 'Cedar treads', 'Cedar handrail'],
    timeline: 'Built by our crew',
    challenge: 'A deck with a drop at the edge that was awkward to get down from.',
    solution: 'We built wide stairs with a consistent rise and a handrail, in cedar to match the deck.',
  },
  {
    slug: 'outdoor-kitchen',
    title: 'Luxury Outdoor Kitchen',
    serviceSlug: 'fire-features',
    citySlug: 'kent',
    after: photo(
      '/images/portfolio/outdoor-kitchen.jpg',
      'Custom outdoor kitchen with stone work in Greater Seattle',
      1400,
      1050,
    ),
    caption: 'Outdoor kitchen with stone work and lighting, built as part of a larger hardscape.',
    assetType: 'photo',
    scope: ['Outdoor kitchen', 'Stone facing', 'Lighting'],
    materials: ['Stone veneer', 'Counter surface', 'Low-voltage lighting'],
    timeline: 'Built by our crew',
    challenge: 'A patio that needed a place to cook and gather, not just sit.',
    solution: 'We built the kitchen into the hardscape so it looks like it belongs there, not like an add-on.',
  },
  {
    slug: 'custom-planting-bed',
    title: 'Custom Planting Design',
    serviceSlug: 'planting-design',
    citySlug: 'kent',
    after: photo(
      '/images/portfolio/custom-planting-bed.jpg',
      'Custom planting bed with year-round structure in Greater Seattle',
      1400,
      1050,
    ),
    caption: 'Planting beds laid out for year-round structure, using plants that hold up in this climate.',
    assetType: 'photo',
    scope: ['Bed layout', 'Planting', 'Mulch'],
    materials: ['Evergreen structure plants', 'Seasonal color', 'Mulch'],
    timeline: 'Built by our crew',
    challenge: 'Empty or overgrown beds with no structure in winter.',
    solution: 'We rebuilt the beds around plants that stay good-looking after November, not just in June.',
  },
];

export const PORTFOLIO_ELIGIBLE = ['photo', 'enhanced-photo', 'concept-to-built'] as const;

export function portfolioProjects(): Project[] {
  return projects.filter((p) => (PORTFOLIO_ELIGIBLE as readonly string[]).includes(p.assetType));
}

export function projectsForService(serviceSlug: string): Project[] {
  return portfolioProjects().filter((p) => p.serviceSlug === serviceSlug);
}

export function projectsForCity(citySlug: string): Project[] {
  return portfolioProjects().filter((p) => p.citySlug === citySlug);
}

export function conceptToBuiltProjects(): Project[] {
  return projects.filter((p) => p.assetType === 'concept-to-built');
}
