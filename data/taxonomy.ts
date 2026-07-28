/**
 * The route skeleton: which services and which cities exist.
 *
 * This file is the authority for what pages the site can produce. Navigation,
 * the footer, the sitemap, and the build-time link checker all derive from it,
 * which is how they are guaranteed to stay in sync (Phase 4B navigation and
 * sitemap parity). Adding a service or city here — and adding its content —
 * is the only supported way to add a page.
 */

import type { CategorySlug, CityTier } from './types';

export interface ServiceRef {
  slug: string;
  category: CategorySlug;
  name: string;
  /** One-line descriptor for mega-menu rows. */
  blurb: string;
  /** Lucide icon name, resolved by components/service-icon.tsx */
  icon: string;
}

export interface CityRef {
  slug: string;
  name: string;
  tier: CityTier;
  region: string;
}

export const categories: {
  slug: CategorySlug;
  name: string;
  blurb: string;
}[] = [
  {
    slug: 'hardscaping',
    name: 'Hardscaping',
    blurb: 'Walls, patios, walkways and fire features, built in-house.',
  },
  {
    slug: 'irrigation',
    name: 'Irrigation',
    blurb: 'Sprinkler systems installed, repaired and winterized.',
  },
  {
    slug: 'landscaping',
    name: 'Landscaping',
    blurb: 'Fencing, lawns, planting and sod for Puget Sound yards.',
  },
];

export const services: ServiceRef[] = [
  // ── Hardscaping ────────────────────────────────────────────────────────────
  {
    slug: 'retaining-walls',
    category: 'hardscaping',
    name: 'Retaining Walls',
    blurb: 'Segmental block and basalt walls that hold a slope for good.',
    icon: 'Layers',
  },
  {
    slug: 'paver-patios',
    category: 'hardscaping',
    name: 'Paver Patios',
    blurb: 'Compacted-base paver patios that stay flat through wet winters.',
    icon: 'Grid3x3',
  },
  {
    slug: 'walkways',
    category: 'hardscaping',
    name: 'Walkways & Pathways',
    blurb: 'Paver and flagstone paths from the drive to the door.',
    icon: 'Footprints',
  },
  {
    slug: 'driveways',
    category: 'hardscaping',
    name: 'Driveways',
    blurb: 'Paver driveways engineered for vehicle loads and PNW rain.',
    icon: 'Car',
  },
  {
    slug: 'fire-features',
    category: 'hardscaping',
    name: 'Fire Features',
    blurb: 'Gas fire bowls, wood pits and seat-wall fire tables.',
    icon: 'Flame',
  },
  {
    slug: 'outdoor-steps',
    category: 'hardscaping',
    name: 'Outdoor Steps',
    blurb: 'Block and slab steps that make a grade change usable.',
    icon: 'Stairs',
  },
  {
    slug: 'seating-walls',
    category: 'hardscaping',
    name: 'Seating Walls',
    blurb: 'Low walls that frame a patio and seat a crowd.',
    icon: 'Armchair',
  },
  {
    slug: 'water-features',
    category: 'hardscaping',
    name: 'Water Features',
    blurb: 'Pondless fountains and basalt columns, no permit needed.',
    icon: 'Droplets',
  },

  // ── Irrigation ─────────────────────────────────────────────────────────────
  {
    slug: 'sprinkler-installation',
    category: 'irrigation',
    name: 'Sprinkler Installation',
    blurb: 'Zoned systems with backflow prevention, permitted and tested.',
    icon: 'Sprout',
  },
  {
    slug: 'sprinkler-repair',
    category: 'irrigation',
    name: 'Sprinkler Repair',
    blurb: 'Broken heads, cut lines, dead zones and valve faults.',
    icon: 'Wrench',
  },
  {
    slug: 'irrigation-maintenance',
    category: 'irrigation',
    name: 'Irrigation Maintenance',
    blurb: 'Spring start-up and fall blowout so nothing freezes.',
    icon: 'CalendarCheck',
  },

  // ── Landscaping ────────────────────────────────────────────────────────────
  {
    slug: 'fencing',
    category: 'landscaping',
    name: 'Fencing',
    blurb: 'Cedar privacy, horizontal cedar, aluminum and split rail.',
    icon: 'Fence',
  },
  {
    slug: 'lawn-maintenance',
    category: 'landscaping',
    name: 'Lawn Maintenance',
    blurb: 'Scheduled mowing, edging, pruning and seasonal cleanups.',
    icon: 'Scissors',
  },
  {
    slug: 'planting-design',
    category: 'landscaping',
    name: 'Planting & Design',
    blurb: 'Zone 8b planting plans built around what actually survives here.',
    icon: 'Flower2',
  },
  {
    slug: 'sod-installation',
    category: 'landscaping',
    name: 'Sod Installation',
    blurb: 'Graded, amended and rolled sod that roots the first season.',
    icon: 'Squircle',
  },
];

export const cities: CityRef[] = [
  // ── Primary: South King County ─────────────────────────────────────────────
  { slug: 'kent', name: 'Kent', tier: 'primary', region: 'South King County' },
  { slug: 'auburn', name: 'Auburn', tier: 'primary', region: 'South King County' },
  { slug: 'renton', name: 'Renton', tier: 'primary', region: 'South King County' },
  { slug: 'covington', name: 'Covington', tier: 'primary', region: 'South King County' },
  { slug: 'maple-valley', name: 'Maple Valley', tier: 'primary', region: 'South King County' },
  { slug: 'federal-way', name: 'Federal Way', tier: 'primary', region: 'South King County' },
  { slug: 'des-moines', name: 'Des Moines', tier: 'primary', region: 'South King County' },
  { slug: 'tukwila', name: 'Tukwila', tier: 'primary', region: 'South King County' },
  { slug: 'burien', name: 'Burien', tier: 'primary', region: 'South King County' },
  { slug: 'seatac', name: 'SeaTac', tier: 'primary', region: 'South King County' },

  // ── Secondary: Eastside ────────────────────────────────────────────────────
  { slug: 'bellevue', name: 'Bellevue', tier: 'secondary', region: 'Eastside' },
  { slug: 'kirkland', name: 'Kirkland', tier: 'secondary', region: 'Eastside' },
  { slug: 'redmond', name: 'Redmond', tier: 'secondary', region: 'Eastside' },
  { slug: 'issaquah', name: 'Issaquah', tier: 'secondary', region: 'Eastside' },
  { slug: 'mercer-island', name: 'Mercer Island', tier: 'secondary', region: 'Eastside' },
  { slug: 'sammamish', name: 'Sammamish', tier: 'secondary', region: 'Eastside' },
  { slug: 'newcastle', name: 'Newcastle', tier: 'secondary', region: 'Eastside' },

  // ── Tertiary: Seattle neighborhoods ────────────────────────────────────────
  { slug: 'west-seattle', name: 'West Seattle', tier: 'seattle', region: 'Seattle' },
  { slug: 'magnolia', name: 'Magnolia', tier: 'seattle', region: 'Seattle' },
  { slug: 'capitol-hill', name: 'Capitol Hill', tier: 'seattle', region: 'Seattle' },
  { slug: 'ballard', name: 'Ballard', tier: 'seattle', region: 'Seattle' },
];

/**
 * The three highest-intent services, crossed with the eight South King County
 * cities closest to the shop. These 24 combinations are the lowest-competition,
 * highest-intent keywords in the market (Phase 4).
 */
export const moneyServiceSlugs = [
  'retaining-walls',
  'paver-patios',
  'sprinkler-installation',
] as const;

export const serviceCityCitySlugs = [
  'kent',
  'auburn',
  'renton',
  'covington',
  'maple-valley',
  'federal-way',
  'des-moines',
  'tukwila',
] as const;

/** Every (city, service) pair that must have a programmatic page. */
export const serviceCityPairs: { citySlug: string; serviceSlug: string }[] =
  serviceCityCitySlugs.flatMap((citySlug) =>
    moneyServiceSlugs.map((serviceSlug) => ({ citySlug, serviceSlug })),
  );

// ── Lookups ──────────────────────────────────────────────────────────────────

export const serviceBySlug = new Map(services.map((s) => [s.slug, s]));
export const cityBySlug = new Map(cities.map((c) => [c.slug, c]));
export const categoryBySlug = new Map(categories.map((c) => [c.slug, c]));

export function servicesInCategory(category: CategorySlug): ServiceRef[] {
  return services.filter((s) => s.category === category);
}

export function citiesInRegion(region: string): CityRef[] {
  return cities.filter((c) => c.region === region);
}

export const regions = Array.from(new Set(cities.map((c) => c.region)));

/** Canonical path for a service page. */
export function servicePath(slug: string): string {
  const service = serviceBySlug.get(slug);
  if (!service) throw new Error(`Unknown service slug: ${slug}`);
  return `/services/${service.category}/${service.slug}`;
}

/** Canonical path for a location page. */
export function cityPath(slug: string): string {
  return `/locations/${slug}`;
}

/** Canonical path for a programmatic service×city page. */
export function serviceCityPath(citySlug: string, serviceSlug: string): string {
  return `/locations/${citySlug}/${serviceSlug}`;
}

export function categoryPath(slug: CategorySlug): string {
  return `/services/${slug}`;
}
