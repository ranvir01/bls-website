/**
 * Location page content registry. Explicit imports — see the note in
 * data/content/services/index.ts for why.
 */

import type { CityContent } from '@/data/types';

import auburn from './auburn';
import ballard from './ballard';
import bellevue from './bellevue';
import burien from './burien';
import capitolHill from './capitol-hill';
import covington from './covington';
import desMoines from './des-moines';
import federalWay from './federal-way';
import issaquah from './issaquah';
import kent from './kent';
import kirkland from './kirkland';
import magnolia from './magnolia';
import mapleValley from './maple-valley';
import mercerIsland from './mercer-island';
import newcastle from './newcastle';
import redmond from './redmond';
import renton from './renton';
import sammamish from './sammamish';
import seatac from './seatac';
import tukwila from './tukwila';
import westSeattle from './west-seattle';

export const cityContent: Record<string, CityContent> = {
  kent,
  auburn,
  renton,
  covington,
  'maple-valley': mapleValley,
  'federal-way': federalWay,
  'des-moines': desMoines,
  tukwila,
  burien,
  seatac,
  bellevue,
  kirkland,
  redmond,
  issaquah,
  'mercer-island': mercerIsland,
  sammamish,
  newcastle,
  'west-seattle': westSeattle,
  magnolia,
  'capitol-hill': capitolHill,
  ballard,
};

export function getCityContent(slug: string): CityContent | undefined {
  return cityContent[slug];
}
