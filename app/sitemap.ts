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
  // lastmod used to be `new Date()` on every entry — the build timestamp,
  // identical to the millisecond on all 96 URLs, re-announced on every deploy
  // including CSS-only ones. Google uses lastmod only when it is consistently
  // accurate, so that trained it to ignore the one crawl hint the sitemap
  // offers. Now an entry carries a date only when its content records one;
  // the rest omit the field, which is the honest answer.
  return indexableRoutes().map((route) => ({
    url: `${SITE_URL}${route.path === '/' ? '' : route.path}`,
    ...(route.lastModified ? { lastModified: route.lastModified } : {}),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
