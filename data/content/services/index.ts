/**
 * Service page content registry.
 *
 * Explicit imports rather than a glob so the build fails loudly if a content
 * file is missing, instead of silently shipping a page with no body — which is
 * exactly the empty-shell bug Phase 4 exists to eliminate.
 */

import type { ServiceContent } from '@/data/types';

import driveways from './driveways';
import fencing from './fencing';
import fireFeatures from './fire-features';
import irrigationMaintenance from './irrigation-maintenance';
import lawnMaintenance from './lawn-maintenance';
import outdoorSteps from './outdoor-steps';
import paverPatios from './paver-patios';
import plantingDesign from './planting-design';
import retainingWalls from './retaining-walls';
import seatingWalls from './seating-walls';
import sodInstallation from './sod-installation';
import sprinklerInstallation from './sprinkler-installation';
import sprinklerRepair from './sprinkler-repair';
import walkways from './walkways';
import waterFeatures from './water-features';

export const serviceContent: Record<string, ServiceContent> = {
  'retaining-walls': retainingWalls,
  'paver-patios': paverPatios,
  walkways,
  driveways,
  'fire-features': fireFeatures,
  'outdoor-steps': outdoorSteps,
  'seating-walls': seatingWalls,
  'water-features': waterFeatures,
  'sprinkler-installation': sprinklerInstallation,
  'sprinkler-repair': sprinklerRepair,
  'irrigation-maintenance': irrigationMaintenance,
  fencing,
  'lawn-maintenance': lawnMaintenance,
  'planting-design': plantingDesign,
  'sod-installation': sodInstallation,
};

export function getServiceContent(slug: string): ServiceContent | undefined {
  return serviceContent[slug];
}
