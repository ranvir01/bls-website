/**
 * Programmatic service x city content registry.
 *
 * Key format is `{citySlug}--{serviceSlug}`. These 24 pages target the
 * lowest-competition, highest-intent queries in the market; each one carries
 * genuinely city-specific copy, which is the only thing that separates them
 * from doorway pages.
 */

import type { ServiceCityContent } from '@/data/types';

import auburnPaverPatios from './auburn--paver-patios';
import auburnRetainingWalls from './auburn--retaining-walls';
import auburnSprinklerInstallation from './auburn--sprinkler-installation';
import covingtonPaverPatios from './covington--paver-patios';
import covingtonRetainingWalls from './covington--retaining-walls';
import covingtonSprinklerInstallation from './covington--sprinkler-installation';
import desMoinesPaverPatios from './des-moines--paver-patios';
import desMoinesRetainingWalls from './des-moines--retaining-walls';
import desMoinesSprinklerInstallation from './des-moines--sprinkler-installation';
import federalWayPaverPatios from './federal-way--paver-patios';
import federalWayRetainingWalls from './federal-way--retaining-walls';
import federalWaySprinklerInstallation from './federal-way--sprinkler-installation';
import kentPaverPatios from './kent--paver-patios';
import kentRetainingWalls from './kent--retaining-walls';
import kentSprinklerInstallation from './kent--sprinkler-installation';
import mapleValleyPaverPatios from './maple-valley--paver-patios';
import mapleValleyRetainingWalls from './maple-valley--retaining-walls';
import mapleValleySprinklerInstallation from './maple-valley--sprinkler-installation';
import rentonPaverPatios from './renton--paver-patios';
import rentonRetainingWalls from './renton--retaining-walls';
import rentonSprinklerInstallation from './renton--sprinkler-installation';
import tukwilaPaverPatios from './tukwila--paver-patios';
import tukwilaRetainingWalls from './tukwila--retaining-walls';
import tukwilaSprinklerInstallation from './tukwila--sprinkler-installation';

export const serviceCityContent: Record<string, ServiceCityContent> = {
  'kent--retaining-walls': kentRetainingWalls,
  'kent--paver-patios': kentPaverPatios,
  'kent--sprinkler-installation': kentSprinklerInstallation,
  'auburn--retaining-walls': auburnRetainingWalls,
  'auburn--paver-patios': auburnPaverPatios,
  'auburn--sprinkler-installation': auburnSprinklerInstallation,
  'renton--retaining-walls': rentonRetainingWalls,
  'renton--paver-patios': rentonPaverPatios,
  'renton--sprinkler-installation': rentonSprinklerInstallation,
  'covington--retaining-walls': covingtonRetainingWalls,
  'covington--paver-patios': covingtonPaverPatios,
  'covington--sprinkler-installation': covingtonSprinklerInstallation,
  'maple-valley--retaining-walls': mapleValleyRetainingWalls,
  'maple-valley--paver-patios': mapleValleyPaverPatios,
  'maple-valley--sprinkler-installation': mapleValleySprinklerInstallation,
  'federal-way--retaining-walls': federalWayRetainingWalls,
  'federal-way--paver-patios': federalWayPaverPatios,
  'federal-way--sprinkler-installation': federalWaySprinklerInstallation,
  'des-moines--retaining-walls': desMoinesRetainingWalls,
  'des-moines--paver-patios': desMoinesPaverPatios,
  'des-moines--sprinkler-installation': desMoinesSprinklerInstallation,
  'tukwila--retaining-walls': tukwilaRetainingWalls,
  'tukwila--paver-patios': tukwilaPaverPatios,
  'tukwila--sprinkler-installation': tukwilaSprinklerInstallation,
};

export function serviceCityKey(citySlug: string, serviceSlug: string): string {
  return `${citySlug}--${serviceSlug}`;
}

export function getServiceCityContent(
  citySlug: string,
  serviceSlug: string,
): ServiceCityContent | undefined {
  return serviceCityContent[serviceCityKey(citySlug, serviceSlug)];
}

/** Other money-service pages available in the same city, for cross-linking. */
export function siblingServiceCities(
  citySlug: string,
  excludeServiceSlug: string,
): ServiceCityContent[] {
  return Object.values(serviceCityContent).filter(
    (c) => c.citySlug === citySlug && c.serviceSlug !== excludeServiceSlug,
  );
}
