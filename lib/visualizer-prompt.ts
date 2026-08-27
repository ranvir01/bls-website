import {
  MAX_WALL_HEIGHT_FT,
  NEGATIVE_PROMPT,
  STYLE_ANCHOR,
  catalogGroups,
  elementToggles,
  findOption,
  getScope,
  getStyle,
} from '@/data/buildable';
import type { RenderSpec, SpecElement } from '@/data/pricing';

/**
 * Server-only prompt assembly.
 *
 * Users never write free text. Every fragment of every prompt comes out of
 * data/buildable.ts, which contains only what Blue Landscaping installs and can
 * source locally. That constraint is the whole reason the tool produces a
 * quote-able design rather than a wish.
 *
 * This module must never be imported from a client component — it encodes the
 * negative prompt and the generation strategy, neither of which should be
 * visible or editable in the browser.
 */

export interface VisualizeRequest {
  scopeId: string;
  styleId: string;
  /** Catalog option ids chosen for the relevant groups. */
  optionIds: string[];
  /** Element toggle ids applied on top of a base render. */
  toggleIds: string[];
  /** One known dimension, which makes the quantity estimate real. */
  referenceWidthFt?: number;
  /** Stable per-session seed so "regenerate" varies rather than restarts. */
  seed: number;
}

export interface AssembledPrompt {
  prompt: string;
  negativePrompt: string;
  /** Surfaced to the user when their scope implies a wall over 4 ft. */
  notices: string[];
}

/**
 * Build the final image prompt. Order matters: subject, then scope, then
 * materials, then style, then the shared visual anchor.
 */
export function assemblePrompt(req: VisualizeRequest): AssembledPrompt {
  const scope = getScope(req.scopeId);
  const style = getStyle(req.styleId);
  const notices: string[] = [];

  if (!scope) throw new Error(`Unknown scope: ${req.scopeId}`);
  if (!style) throw new Error(`Unknown style: ${req.styleId}`);

  const parts: string[] = [
    'Photorealistic architectural rendering of a residential backyard renovation.',
    scope.prompt + '.',
  ];

  // Only options belonging to a group this scope actually uses are honoured —
  // a client cannot smuggle in a paver choice on an irrigation-only scope.
  const allowedGroupIds = new Set(scope.groups);
  const allowedOptionIds = new Set(
    scope.groups.flatMap((g) => catalogGroups[g]?.options.map((o) => o.id) ?? []),
  );

  for (const id of req.optionIds) {
    if (!allowedOptionIds.has(id)) continue;
    const option = findOption(id);
    if (option) parts.push(option.prompt + '.');
  }

  for (const id of req.toggleIds) {
    const toggle = elementToggles.find((t) => t.id === id);
    if (toggle) parts.push(toggle.prompt + '.');
  }

  // Hard cap on wall height, stated positively in the prompt so the model
  // renders to it rather than being told only what to avoid.
  if (allowedGroupIds.has('walls')) {
    parts.push(
      `All retaining walls no taller than ${MAX_WALL_HEIGHT_FT} feet, with visible gravel drainage at the base.`,
    );
    notices.push(
      `Walls over ${MAX_WALL_HEIGHT_FT} ft need engineering and a permit — we handle that, it just adds time. This design is shown at ${MAX_WALL_HEIGHT_FT} ft.`,
    );
  }

  parts.push(
    'Planting is USDA zone 8b Pacific Northwest hardy material only: sword fern, salal, evergreen huckleberry, kinnikinnick, vine maple, Japanese maple, dwarf conifers, hydrangea, hebe, carex, red twig dogwood, rhododendron, lavender.',
  );
  parts.push(style.prompt + '.');
  parts.push(STYLE_ANCHOR);

  return {
    prompt: parts.join(' '),
    negativePrompt: NEGATIVE_PROMPT,
    notices,
  };
}

/**
 * Derive an approximate bill of quantities from the selections.
 *
 * These are rough by design. A single known dimension from the user — "roughly
 * how wide is the back of the house?" — is what turns a guess into something
 * worth putting in an estimate, which is why the form asks for exactly one.
 */
export function deriveSpec(req: VisualizeRequest): RenderSpec {
  const scope = getScope(req.scopeId);
  if (!scope) throw new Error(`Unknown scope: ${req.scopeId}`);

  // With no reference, assume a typical suburban rear elevation.
  const widthFt = req.referenceWidthFt ?? 32;
  const depthFt = Math.round(widthFt * 0.55);
  const patioSqFt = Math.round(widthFt * depthFt * 0.7);

  const elements: SpecElement[] = [];
  const materialFor = (groupId: string): string | undefined => {
    const group = catalogGroups[groupId];
    if (!group) return undefined;
    const chosen = req.optionIds.find((id) => group.options.some((o) => o.id === id));
    return group.options.find((o) => o.id === chosen)?.label;
  };

  switch (scope.id) {
    case 'paver-patio':
      elements.push({ type: 'paver_patio', material: materialFor('pavers'), approxSqFt: patioSqFt });
      break;

    case 'retaining-wall':
      elements.push({
        type: 'retaining_wall',
        material: materialFor('walls'),
        // Face area: assume a run roughly the width of the yard at ~3.5 ft.
        approxSqFt: Math.round(widthFt * 3.5),
      });
      break;

    case 'full-backyard':
      elements.push({ type: 'paver_patio', material: materialFor('pavers'), approxSqFt: patioSqFt });
      elements.push({ type: 'sod', approxSqFt: Math.round(widthFt * depthFt * 0.8) });
      elements.push({ type: 'fence', material: materialFor('fencing'), approxLinFt: Math.round(widthFt * 2.2) });
      break;

    case 'front-curb-appeal':
      elements.push({ type: 'walkway', material: materialFor('paths'), approxSqFt: Math.round(widthFt * 1.6 * 4) });
      elements.push({ type: 'sod', approxSqFt: Math.round(widthFt * 18) });
      break;

    case 'fire-and-seating':
      elements.push({ type: 'paver_patio', material: materialFor('pavers'), approxSqFt: patioSqFt });
      elements.push({ type: 'seating_wall', material: materialFor('walls'), approxLinFt: Math.round(widthFt * 0.75) });
      elements.push({ type: 'fire_bowl', fuel: 'gas', count: 1 });
      break;

    case 'irrigation-lawn':
      elements.push({ type: 'irrigation', count: Math.max(3, Math.round(widthFt / 8)) });
      elements.push({ type: 'sod', approxSqFt: Math.round(widthFt * depthFt) });
      break;
  }

  // Toggles add real line items, not just pixels.
  for (const id of req.toggleIds) {
    switch (id) {
      case 'add-fire':
        if (!elements.some((e) => e.type === 'fire_bowl')) {
          elements.push({ type: 'fire_bowl', fuel: 'gas', count: 1 });
        }
        break;
      case 'add-seating-wall':
        if (!elements.some((e) => e.type === 'seating_wall')) {
          elements.push({ type: 'seating_wall', approxLinFt: Math.round(widthFt * 0.6) });
        }
        break;
      case 'add-privacy-fence':
        if (!elements.some((e) => e.type === 'fence')) {
          elements.push({ type: 'fence', material: materialFor('fencing'), approxLinFt: Math.round(widthFt * 2) });
        }
        break;
      case 'add-water-feature':
        elements.push({ type: 'water_feature', count: 1 });
        break;
    }
  }

  const hasLighting = req.toggleIds.includes('add-lighting') || req.optionIds.some((id) =>
    catalogGroups.lighting.options.some((o) => o.id === id),
  );

  const morePlanting = req.toggleIds.includes('more-planting');
  const basePlants = Math.round(widthFt * 0.8);

  return {
    elements,
    plantCount: morePlanting ? Math.round(basePlants * 1.6) : basePlants,
    lightingCount: hasLighting ? Math.max(6, Math.round(widthFt / 4)) : 0,
    styleId: req.styleId,
    scopeId: req.scopeId,
    seed: req.seed,
    referenceWidthFt: req.referenceWidthFt,
    wallOver4ft: false,
  };
}

/**
 * True when an image-generation provider can run.
 *
 * One Google AI Studio key is enough (`IMAGE_API_KEY` only → Gemini
 * 2.5 Flash Image). A generic endpoint still needs IMAGE_API_URL as well.
 */
export function generationConfigured(): boolean {
  if (!process.env.IMAGE_API_KEY) return false;
  if (usesGeminiProvider()) return true;
  return Boolean(process.env.IMAGE_API_URL);
}

/**
 * Gemini is the almost-free default: key only, or a generativelanguage URL.
 * Set IMAGE_PROVIDER=generic (or openai / replicate) to force the Bearer JSON
 * adapter, which then requires IMAGE_API_URL.
 */
export function usesGeminiProvider(): boolean {
  const provider = (process.env.IMAGE_PROVIDER || '').toLowerCase();
  if (provider === 'generic' || provider === 'openai' || provider === 'replicate') {
    return false;
  }
  if (provider === 'gemini' || provider === 'google') return true;
  const url = process.env.IMAGE_API_URL || '';
  if (url.includes('generativelanguage.googleapis.com')) return true;
  return !process.env.IMAGE_API_URL;
}
