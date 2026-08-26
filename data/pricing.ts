/**
 * Phase 6C — the render → scope → estimate bridge.
 *
 * Turns a generated design's structured spec into a written scope sheet with a
 * cost RANGE. Never a fixed price: these are typical installed ranges for the
 * Puget Sound market, and the actual number comes from the site walkthrough.
 *
 * Ranges are deliberately wide enough to be honest. Quoting tight from a photo
 * is how a contractor ends up walking a number back, which costs more trust
 * than the lead was worth.
 */

export type ElementType =
  | 'paver_patio'
  | 'retaining_wall'
  | 'seating_wall'
  | 'walkway'
  | 'driveway'
  | 'fire_bowl'
  | 'fire_pit'
  | 'fire_table'
  | 'water_feature'
  | 'steps'
  | 'fence'
  | 'lighting'
  | 'planting'
  | 'sod'
  | 'artificial_turf'
  | 'irrigation';

export interface SpecElement {
  type: ElementType;
  material?: string;
  approxSqFt?: number;
  approxLinFt?: number;
  count?: number;
  fuel?: 'gas' | 'wood';
}

/** The structured spec emitted alongside every render. */
export interface RenderSpec {
  elements: SpecElement[];
  plantCount: number;
  lightingCount: number;
  styleId: string;
  scopeId: string;
  seed: number;
  /** The one known dimension the user supplied, if any — drives quantities. */
  referenceWidthFt?: number;
  wallOver4ft?: boolean;
}

interface PriceRule {
  label: string;
  /** Unit cost range, installed. */
  low: number;
  high: number;
  unit: 'sqft' | 'linft' | 'each' | 'zone' | 'lump';
  /** Minimum job value — mobilization makes tiny jobs cost more per unit. */
  minimum?: number;
}

/**
 * 2026 Puget Sound installed ranges. Review these annually — stale pricing on a
 * public page is worse than no pricing.
 */
export const PRICING: Record<ElementType, PriceRule> = {
  paver_patio: { label: 'Paver patio', low: 18, high: 32, unit: 'sqft', minimum: 4500 },
  retaining_wall: { label: 'Segmental retaining wall', low: 45, high: 70, unit: 'sqft', minimum: 4000 },
  seating_wall: { label: 'Seating wall', low: 120, high: 190, unit: 'linft', minimum: 2500 },
  walkway: { label: 'Walkway', low: 20, high: 38, unit: 'sqft', minimum: 2200 },
  driveway: { label: 'Paver driveway', low: 26, high: 45, unit: 'sqft', minimum: 12000 },
  fire_bowl: { label: 'Gas fire bowl', low: 2200, high: 5500, unit: 'each' },
  fire_pit: { label: 'Wood-burning fire pit', low: 1400, high: 3400, unit: 'each' },
  fire_table: { label: 'Seat-wall fire table', low: 3800, high: 8500, unit: 'each' },
  water_feature: { label: 'Pondless water feature', low: 3200, high: 8000, unit: 'each' },
  steps: { label: 'Outdoor steps', low: 350, high: 750, unit: 'each' },
  fence: { label: 'Cedar fence', low: 38, high: 72, unit: 'linft', minimum: 2000 },
  lighting: { label: 'Low-voltage lighting', low: 180, high: 340, unit: 'each', minimum: 1200 },
  planting: { label: 'Planting', low: 45, high: 120, unit: 'each', minimum: 1500 },
  sod: { label: 'Sod installation', low: 2.4, high: 4.5, unit: 'sqft', minimum: 1800 },
  artificial_turf: { label: 'Artificial turf', low: 14, high: 24, unit: 'sqft', minimum: 4000 },
  irrigation: { label: 'Irrigation zone', low: 700, high: 1400, unit: 'zone', minimum: 3000 },
};

export interface LineItem {
  label: string;
  detail: string;
  low: number;
  high: number;
}

export interface Estimate {
  lineItems: LineItem[];
  totalLow: number;
  totalHigh: number;
  timeline: string;
  notes: string[];
}

function quantityFor(el: SpecElement, rule: PriceRule): { qty: number; detail: string } {
  switch (rule.unit) {
    case 'sqft':
      return { qty: el.approxSqFt ?? 0, detail: `${el.approxSqFt ?? 0} sq ft` };
    case 'linft':
      return { qty: el.approxLinFt ?? 0, detail: `${el.approxLinFt ?? 0} linear ft` };
    case 'zone':
      return { qty: el.count ?? 1, detail: `${el.count ?? 1} zone${(el.count ?? 1) === 1 ? '' : 's'}` };
    default:
      return { qty: el.count ?? 1, detail: `${el.count ?? 1}` };
  }
}

/** Working-day estimate, used to phrase the timeline sentence. */
function estimateDays(spec: RenderSpec): number {
  let days = 1;
  for (const el of spec.elements) {
    switch (el.type) {
      case 'paver_patio':
      case 'walkway':
      case 'driveway':
        days += Math.ceil((el.approxSqFt ?? 0) / 180);
        break;
      case 'retaining_wall':
        days += Math.ceil((el.approxSqFt ?? 0) / 60);
        break;
      case 'seating_wall':
        days += Math.ceil((el.approxLinFt ?? 0) / 20);
        break;
      case 'fence':
        days += Math.ceil((el.approxLinFt ?? 0) / 60);
        break;
      case 'irrigation':
        days += (el.count ?? 1) >= 5 ? 3 : 2;
        break;
      case 'sod':
      case 'artificial_turf':
        days += Math.ceil((el.approxSqFt ?? 0) / 1200);
        break;
      default:
        days += 1;
    }
  }
  return Math.max(2, days);
}

/**
 * Build the written scope sheet. This is the gated asset — the render is free
 * and instant, this is what the contact details buy.
 */
export function buildEstimate(spec: RenderSpec): Estimate {
  const lineItems: LineItem[] = [];

  for (const el of spec.elements) {
    const rule = PRICING[el.type];
    if (!rule) continue;

    const { qty, detail } = quantityFor(el, rule);
    if (qty <= 0) continue;

    let low = rule.low * qty;
    let high = rule.high * qty;

    if (rule.minimum) {
      low = Math.max(low, rule.minimum);
      high = Math.max(high, rule.minimum * 1.35);
    }

    lineItems.push({
      label: rule.label,
      detail: el.material ? `${detail} — ${el.material}` : detail,
      low: Math.round(low / 50) * 50,
      high: Math.round(high / 50) * 50,
    });
  }

  if (spec.plantCount > 0) {
    const rule = PRICING.planting;
    lineItems.push({
      label: rule.label,
      detail: `approx. ${spec.plantCount} plants, zone 8b material`,
      low: Math.round(Math.max(rule.low * spec.plantCount, rule.minimum ?? 0) / 50) * 50,
      high: Math.round(Math.max(rule.high * spec.plantCount, (rule.minimum ?? 0) * 1.35) / 50) * 50,
    });
  }

  if (spec.lightingCount > 0) {
    const rule = PRICING.lighting;
    lineItems.push({
      label: rule.label,
      detail: `approx. ${spec.lightingCount} fixtures on a low-voltage transformer`,
      low: Math.round(Math.max(rule.low * spec.lightingCount, rule.minimum ?? 0) / 50) * 50,
      high: Math.round(Math.max(rule.high * spec.lightingCount, (rule.minimum ?? 0) * 1.35) / 50) * 50,
    });
  }

  const totalLow = lineItems.reduce((a, i) => a + i.low, 0);
  const totalHigh = lineItems.reduce((a, i) => a + i.high, 0);

  const days = estimateDays(spec);
  const timeline =
    days <= 5
      ? `Roughly ${days}–${days + 2} working days on site, weather permitting.`
      : `Roughly ${days}–${days + 4} working days on site, typically spread across ${Math.ceil(days / 5)}–${Math.ceil(days / 5) + 1} weeks.`;

  const notes = [
    'These are typical installed ranges for the Puget Sound market, not a quote. The number firms up at the free on-site walkthrough.',
    'Excavation depth, site access, and how much spoil has to be hauled off are the three things most likely to move the figure.',
    'Drainage behind walls and under paving is included in these ranges. It is not an upgrade.',
  ];

  if (spec.wallOver4ft) {
    notes.push(
      'A wall over 4 ft needs stamped engineering and a permit. Budget roughly $1,600–$4,200 for a straightforward residential wall, and up to about $10,000 where a geotechnical report, a surcharge from a driveway or a mapped steep slope is involved. We handle the whole package, and it adds about two to four weeks to the schedule.',
    );
  }

  if (!spec.referenceWidthFt) {
    notes.push(
      'Quantities are estimated from the photo. Giving us one known dimension tightens this range considerably.',
    );
  }

  return { lineItems, totalLow, totalHigh, timeline, notes };
}

export function formatUSD(n: number): string {
  return `$${n.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
}

export function formatRange(low: number, high: number): string {
  return `${formatUSD(low)}–${formatUSD(high)}`;
}
