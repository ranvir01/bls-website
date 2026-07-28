/**
 * Blog post registry. Posts are typed data, not MDX, so every article is
 * server-rendered with its full text in the initial HTML.
 */

import type { BlogPost } from '@/data/types';

import bestMaterials from './best-retaining-wall-materials-clay-soil';
import drainage from './drainage-solutions-sloped-yards-western-washington';
import paverCost from './paver-patio-cost-king-county';
import permit from './retaining-wall-permit-kent-wa';
import wallCost from './retaining-wall-cost-seattle';
import winterize from './when-to-winterize-sprinklers-pnw';

/** Newest first — this is the order the index page renders. */
export const blogPosts: BlogPost[] = [
  wallCost,
  paverCost,
  permit,
  bestMaterials,
  drainage,
  winterize,
];

export const blogBySlug = new Map(blogPosts.map((p) => [p.slug, p]));

export function getPost(slug: string): BlogPost | undefined {
  return blogBySlug.get(slug);
}

export function postsForService(serviceSlug: string, limit = 2): BlogPost[] {
  return blogPosts.filter((p) => p.relatedServices.includes(serviceSlug)).slice(0, limit);
}

export function postsForCity(citySlug: string, limit = 2): BlogPost[] {
  return blogPosts.filter((p) => p.relatedCities.includes(citySlug)).slice(0, limit);
}
