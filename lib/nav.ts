/**
 * Navigation model, derived entirely from data/taxonomy.ts.
 *
 * The desktop mega-menus, the mobile drawer and the footer all render from
 * these same structures. That is what makes navigation parity (Phase 4B) a
 * structural property rather than something to remember to update: a service
 * or city cannot appear in one surface and be missing from another.
 */

import {
  categories,
  cities,
  regions,
  services,
  categoryPath,
  cityPath,
  servicePath,
  servicesInCategory,
  citiesInRegion,
} from '@/data/taxonomy';

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  icon?: string;
}

export interface NavColumn {
  heading: string;
  href?: string;
  links: NavLink[];
}

/** Services mega-menu: one column per category. */
export const servicesColumns: NavColumn[] = categories.map((c) => ({
  heading: c.name,
  href: categoryPath(c.slug),
  links: servicesInCategory(c.slug).map((s) => ({
    label: s.name,
    href: servicePath(s.slug),
    description: s.blurb,
    icon: s.icon,
  })),
}));

/** Service areas mega-menu: one column per region. */
export const locationColumns: NavColumn[] = regions.map((region) => ({
  heading: region,
  links: citiesInRegion(region).map((c) => ({
    label: c.name,
    href: cityPath(c.slug),
  })),
}));

/** Top-level nav, in order. */
export const primaryNav: NavLink[] = [
  { label: 'Services', href: '/services' },
  { label: 'Service Areas', href: '/locations' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Yard Visualizer', href: '/visualizer' },
  { label: 'About', href: '/about' },
  { label: 'Reviews', href: '/reviews' },
];

/** Footer "Company" column. */
export const companyLinks: NavLink[] = [
  { label: 'About', href: '/about' },
  { label: 'Our Process', href: '/process' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Yard Visualizer', href: '/visualizer' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
  { label: 'Get a Quote', href: '/quote' },
];

export const legalLinks: NavLink[] = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
];

/** Every service, flat — used by the footer. */
export const allServiceLinks: NavLink[] = services.map((s) => ({
  label: s.name,
  href: servicePath(s.slug),
}));

/** Every city, flat — used by the footer. */
export const allCityLinks: NavLink[] = cities.map((c) => ({
  label: c.name,
  href: cityPath(c.slug),
}));
