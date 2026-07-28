import type { Project } from './types';

/**
 * Completed projects.
 *
 * EMPTY ON PURPOSE. Phase 0 forbids presenting any image as completed Blue
 * Landscaping work unless it is a real photo of a real job. Until real
 * before/after photography exists, this array stays empty and every component
 * that reads it renders nothing — no placeholders, no stock photos, no
 * invented case studies.
 *
 * TO ADD A REAL PROJECT
 * ---------------------
 * 1. Follow the capture SOP in docs/PHOTO-SOP.md (6 fixed positions before,
 *    the same 6 after).
 * 2. Drop the images in /public/images/projects/ named
 *    {city}-{service}-{yyyy-mm}-{before|after}-{n}.jpg
 * 3. Append an entry below. `assetType` must be 'photo' or 'enhanced-photo'.
 *    A 'concept-render' may NEVER be added here — the portfolio is real work
 *    only, and the link checker will fail the build if a render appears.
 * 4. The project page, the portfolio filters, the sitemap and the internal
 *    links all pick it up automatically. Nothing else needs editing.
 */
export const projects: Project[] = [];

/** Only provenance-clean assets are portfolio-eligible. */
export const PORTFOLIO_ELIGIBLE = ['photo', 'enhanced-photo', 'concept-to-built'] as const;

export function portfolioProjects(): Project[] {
  return projects.filter((p) =>
    (PORTFOLIO_ELIGIBLE as readonly string[]).includes(p.assetType),
  );
}

export function projectsForService(serviceSlug: string): Project[] {
  return portfolioProjects().filter((p) => p.serviceSlug === serviceSlug);
}

export function projectsForCity(citySlug: string): Project[] {
  return portfolioProjects().filter((p) => p.citySlug === citySlug);
}

/** Phase 6E: render/real pairs, the strongest proof asset on the site. */
export function conceptToBuiltProjects(): Project[] {
  return projects.filter((p) => p.assetType === 'concept-to-built');
}
