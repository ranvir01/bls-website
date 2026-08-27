import { portfolioProjects } from '@/data/projects';
import type { Project } from '@/data/types';

/**
 * Map visualizer scopes onto real portfolio services.
 *
 * The after-photo is optional and labeled AI. These jobs are the thing a
 * homeowner can trust today: photographs of work this crew actually built.
 */
const SCOPE_SERVICES: Record<string, string[]> = {
  'paver-patio': ['paver-patios'],
  'retaining-wall': ['retaining-walls'],
  'full-backyard': ['paver-patios', 'planting-design', 'fencing', 'fire-features'],
  'front-curb-appeal': ['walkways', 'planting-design', 'sod-installation', 'driveways'],
  'fire-and-seating': ['fire-features', 'paver-patios'],
  'irrigation-lawn': ['sprinkler-installation', 'sod-installation'],
};

export function comparableJobs(scopeId: string, limit = 3): Project[] {
  const preferred = SCOPE_SERVICES[scopeId] ?? [];
  const all = portfolioProjects();
  const picked: Project[] = [];
  const seen = new Set<string>();

  for (const slug of preferred) {
    for (const project of all) {
      if (project.serviceSlug !== slug || seen.has(project.slug)) continue;
      seen.add(project.slug);
      picked.push(project);
      if (picked.length >= limit) return picked;
    }
  }

  for (const project of all) {
    if (seen.has(project.slug)) continue;
    seen.add(project.slug);
    picked.push(project);
    if (picked.length >= limit) break;
  }

  return picked;
}
