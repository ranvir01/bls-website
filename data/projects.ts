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
    serviceSlug: 'walkways',
    citySlug: 'kent',
    after: photo(
      '/images/portfolio/front-yard-renovation.jpg',
      'Front yard renovation with new walkways and planting in Greater Seattle',
      1400,
      1050,
    ),
    caption:
      'Complete front yard transformation with concrete walkways, custom planting, and lighting for curb appeal.',
    assetType: 'photo',
    scope: ['Walkways', 'Planting design', 'Landscape lighting'],
    materials: ['Concrete walkway pavers', 'Mixed planting', 'Low-voltage lighting'],
    timeline: 'Built by our crew',
    challenge: 'A tired front yard that needed a cleaner approach to the house and better curb appeal.',
    solution:
      'We rebuilt the walkways, replanted the beds, and added lighting so the entry reads clearly day and night.',
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
      'Rectangular stepping stone pathway along a driveway in Greater Seattle',
      1400,
      1867,
    ),
    caption:
      'Rectangular stepping stones in dark crushed rock along the driveway — a clean path that also keeps soil off the drive.',
    assetType: 'photo',
    scope: ['Stepping stones', 'Crushed-rock joints', 'Driveway edge'],
    materials: ['Concrete stepping slabs', 'Dark crushed rock'],
    timeline: 'Built by our crew',
    challenge: 'A muddy strip between the lawn and the driveway every time it rained.',
    solution: 'We set stepping stones in crushed rock so people have a dry path and the soil stays put.',
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
    serviceSlug: 'planting-design',
    citySlug: 'kent',
    after: photo(
      '/images/portfolio/custom-entry-design.jpg',
      'Custom front entry with hardscape and planting in Greater Seattle',
      1400,
      1050,
    ),
    caption: 'Hardscape and planting combined for a clearer, more welcoming walk to the front door.',
    assetType: 'photo',
    scope: ['Entry hardscape', 'Planting beds', 'Walkway'],
    materials: ['Paver and stone work', 'Evergreen structure plants'],
    timeline: 'Built by our crew',
    challenge: 'A front entry that did not match the house and did not tell you where to walk.',
    solution: 'We rebuilt the approach with hardscape and planting so the path to the door is obvious.',
  },
  {
    slug: 'stone-retaining-wall',
    title: 'Stone Retaining Wall',
    serviceSlug: 'retaining-walls',
    citySlug: 'kent',
    after: photo(
      '/images/portfolio/stone-retaining-wall.jpg',
      'Stone retaining wall with drainage in Greater Seattle',
      1400,
      1867,
    ),
    caption: 'A stone retaining wall with the drainage behind it done properly, so it holds the slope.',
    assetType: 'photo',
    scope: ['Retaining wall', 'Drain rock and drain line', 'Caps'],
    materials: ['Segmental or natural stone', 'Drain rock', 'Perforated drain pipe'],
    timeline: 'Built by our crew',
    challenge: 'A slope eating the usable yard, or an older wall that had started to lean.',
    solution: 'We rebuilt it with compacted base, drain rock, and a drain line to daylight — the part that keeps it standing.',
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
      'Modern drought-tolerant planting design in Greater Seattle',
      1400,
      1867,
    ),
    caption: 'Clean lines, mulch, and plants that actually live through a Puget Sound winter and a dry August.',
    assetType: 'photo',
    scope: ['Planting plan', 'Bed prep', 'Mulch'],
    materials: ['Zone 8b plants', 'Bark or gravel mulch'],
    timeline: 'Built by our crew',
    challenge: 'Beds full of plants that look good at the nursery and then sulk through a wet winter.',
    solution: 'We replanted with species that handle this climate, on a layout that stays tidy without weekly fuss.',
  },
  {
    slug: 'modern-gate',
    title: 'Modern Gate Installation',
    serviceSlug: 'fencing',
    citySlug: 'kent',
    after: photo(
      '/images/portfolio/modern-gate.jpg',
      'Custom horizontal-slat gate and fencing in Greater Seattle',
      1400,
      1050,
    ),
    caption: 'A custom gate with horizontal wood slats, set in fencing that matches the rest of the yard.',
    assetType: 'photo',
    scope: ['Custom gate', 'Fence run', 'Post setting'],
    materials: ['Cedar', 'Hardware', 'Concrete-set posts'],
    timeline: 'Built by our crew',
    challenge: 'An entry that needed privacy and a finished look, not a builder-grade gate.',
    solution: 'We built a horizontal-slat gate and matching fence with posts set properly in concrete.',
  },
  {
    slug: 'deck-stairs',
    title: 'Custom Deck Stairs',
    serviceSlug: 'outdoor-steps',
    citySlug: 'kent',
    after: photo(
      '/images/portfolio/deck-stairs.jpg',
      'Custom outdoor stairs with non-slip treads in Greater Seattle',
      1400,
      1050,
    ),
    caption: 'Outdoor stairs with a solid tread and railing, so the grade change is actually usable.',
    assetType: 'photo',
    scope: ['Outdoor steps', 'Landing', 'Railing'],
    materials: ['Structural stringers', 'Non-slip treads', 'Railing'],
    timeline: 'Built by our crew',
    challenge: 'A grade change that was awkward or unsafe to walk.',
    solution: 'We built stairs with a consistent rise and a railing, tied into the hardscape around them.',
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
