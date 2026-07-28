/**
 * Phase 4B route manifest.
 *
 * The single enumeration of every URL this site can produce. `app/sitemap.ts`
 * and the build-time link checker both read from here, which is how sitemap
 * parity is structurally guaranteed rather than maintained by hand.
 *
 * If a page exists, it is in this list. If it is in this list, it must render.
 */

import { blogPosts } from '@/data/content/blog';
import { cityContent } from '@/data/content/cities';
import { serviceCityContent } from '@/data/content/service-cities';
import { projects } from '@/data/projects';
import { categories, cities, services, serviceCityPairs } from '@/data/taxonomy';

export interface RouteEntry {
  path: string;
  /** Sitemap priority, 0–1. */
  priority: number;
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  /** Excluded from sitemap and from robots indexing. */
  noindex?: boolean;
}

const STATIC_ROUTES: RouteEntry[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/locations', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/portfolio', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/visualizer', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/process', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/reviews', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'yearly' },
  { path: '/quote', priority: 0.8, changeFrequency: 'yearly' },
  { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/privacy-policy', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/terms-of-service', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/styleguide', priority: 0.1, changeFrequency: 'monthly', noindex: true },
];

/** Every route, including all dynamic params. */
export function allRoutes(): RouteEntry[] {
  return [
    ...STATIC_ROUTES,

    ...categories.map((c) => ({
      path: `/services/${c.slug}`,
      priority: 0.85,
      changeFrequency: 'monthly' as const,
    })),

    ...services.map((s) => ({
      path: `/services/${s.category}/${s.slug}`,
      priority: 0.9,
      changeFrequency: 'monthly' as const,
    })),

    ...cities
      .filter((c) => cityContent[c.slug])
      .map((c) => ({
        path: `/locations/${c.slug}`,
        priority: c.tier === 'primary' ? 0.9 : 0.75,
        changeFrequency: 'monthly' as const,
      })),

    ...serviceCityPairs
      .filter((p) => serviceCityContent[`${p.citySlug}--${p.serviceSlug}`])
      .map((p) => ({
        path: `/locations/${p.citySlug}/${p.serviceSlug}`,
        priority: 0.8,
        changeFrequency: 'monthly' as const,
      })),

    ...blogPosts.map((p) => ({
      path: `/blog/${p.slug}`,
      priority: 0.7,
      changeFrequency: 'yearly' as const,
    })),

    ...projects.map((p) => ({
      path: `/portfolio/${p.slug}`,
      priority: 0.6,
      changeFrequency: 'yearly' as const,
    })),
  ];
}

/** Routes eligible for the sitemap (everything indexable). */
export function indexableRoutes(): RouteEntry[] {
  return allRoutes().filter((r) => !r.noindex);
}

/** Flat list of paths, for the link checker to assert against. */
export function allPaths(): string[] {
  return allRoutes().map((r) => r.path);
}
