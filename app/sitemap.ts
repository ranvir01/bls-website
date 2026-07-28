import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/data/business';
import { indexableRoutes } from '@/lib/routes';

/**
 * Generated from the route manifest, never hand-written.
 *
 * This is what makes sitemap parity (Phase 4B) structural: a page cannot exist
 * without appearing here, and an entry cannot appear here without a page behind
 * it, because both read from lib/routes.ts.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return indexableRoutes().map((route) => ({
    url: `${SITE_URL}${route.path === '/' ? '' : route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
