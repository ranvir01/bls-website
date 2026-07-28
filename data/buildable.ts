/**
 * Phase 6A — the buildability constraint layer.
 *
 * The visualizer never accepts free-text prompts. Every image prompt is
 * assembled server-side from this catalog, which contains ONLY what Blue
 * Landscaping actually installs and can source locally.
 *
 * This is what turns the tool from a novelty into a quote you can sign: the
 * render can never show something the crew cannot build, so the conversation
 * that follows it starts from a real scope instead of a walk-back.
 */

export interface BuildableOption {
  id: string;
  label: string;
  /** Fragment injected into the image prompt. Written as visual description. */
  prompt: string;
  /** Maps to a service slug so a render can link straight to the service page. */
  serviceSlug?: string;
}

export interface BuildableGroup {
  id: string;
  label: string;
  options: BuildableOption[];
}

// ── Materials and systems BLS installs ───────────────────────────────────────

export const wallSystems: BuildableOption[] = [
  {
    id: 'mutual-roman-stack',
    label: 'Mutual Materials Roman Stack',
    prompt: 'tumbled tan and gray segmental Roman Stack retaining wall block, irregular coursing',
    serviceSlug: 'retaining-walls',
  },
  {
    id: 'allan-block-split-face',
    label: 'Allan Block split-face',
    prompt: 'gray split-face segmental retaining wall block with a clean batter, uniform coursing',
    serviceSlug: 'retaining-walls',
  },
  {
    id: 'basalite-charcoal',
    label: 'Basalite charcoal block',
    prompt: 'charcoal segmental concrete wall block with a textured face and a cap course',
    serviceSlug: 'retaining-walls',
  },
  {
    id: 'dry-stack-basalt',
    label: 'Dry-stack basalt',
    prompt: 'dry-stacked dark basalt stone wall, natural irregular faces, tight joints',
    serviceSlug: 'retaining-walls',
  },
  {
    id: 'veneered-concrete',
    label: 'Poured concrete with stone veneer',
    prompt: 'poured concrete wall faced with cut stone veneer and a flat cap',
    serviceSlug: 'retaining-walls',
  },
];

export const paverLines: BuildableOption[] = [
  {
    id: 'mutual-holland-charcoal',
    label: 'Mutual Materials Holland — charcoal',
    prompt: 'charcoal Holland-style rectangular concrete pavers in a running bond pattern',
    serviceSlug: 'paver-patios',
  },
  {
    id: 'mutual-holland-natural',
    label: 'Mutual Materials Holland — natural gray',
    prompt: 'natural gray Holland-style rectangular concrete pavers in a herringbone pattern',
    serviceSlug: 'paver-patios',
  },
  {
    id: 'mutual-roman-tan',
    label: 'Mutual Materials Roman — tan blend',
    prompt: 'tumbled tan-blend Roman paver in a random modular pattern with a soldier border',
    serviceSlug: 'paver-patios',
  },
  {
    id: 'boardwalk-plank',
    label: 'Boardwalk plank paver',
    prompt: 'long plank-format concrete pavers laid in a linear stacked pattern, contemporary',
    serviceSlug: 'paver-patios',
  },
  {
    id: 'belgard-permeable',
    label: 'Belgard permeable paver',
    prompt: 'permeable interlocking concrete pavers with open gravel-filled joints',
    serviceSlug: 'paver-patios',
  },
  {
    id: 'techo-bloc-blu',
    label: 'Techo-Bloc smooth-face',
    prompt: 'smooth-faced modern concrete slab pavers in a large-format grid, crisp joints',
    serviceSlug: 'paver-patios',
  },
];

export const fireFeatures: BuildableOption[] = [
  {
    id: 'gas-fire-bowl',
    label: 'Gas fire bowl',
    prompt: 'round concrete gas fire bowl with a low flame and lava rock',
    serviceSlug: 'fire-features',
  },
  {
    id: 'wood-fire-pit',
    label: 'Wood-burning fire pit',
    prompt: 'circular wood-burning fire pit ring built from wall block with a stone cap',
    serviceSlug: 'fire-features',
  },
  {
    id: 'seatwall-fire-table',
    label: 'Seat-wall integrated fire table',
    prompt: 'rectangular gas fire table integrated into a low seating wall of matching block',
    serviceSlug: 'fire-features',
  },
];

export const fencing: BuildableOption[] = [
  { id: 'cedar-privacy', label: 'Cedar privacy fence', prompt: 'six foot vertical cedar privacy fence with a top cap rail', serviceSlug: 'fencing' },
  { id: 'horizontal-cedar', label: 'Horizontal cedar', prompt: 'modern horizontal cedar slat fence with even reveals', serviceSlug: 'fencing' },
  { id: 'black-aluminum', label: 'Black aluminum', prompt: 'black powder-coated aluminum picket fence, slim profile', serviceSlug: 'fencing' },
  { id: 'split-rail', label: 'Split rail', prompt: 'two-rail cedar split rail fence at a property edge', serviceSlug: 'fencing' },
];

export const pathTypes: BuildableOption[] = [
  { id: 'flagstone', label: 'Flagstone', prompt: 'irregular flagstone walkway with moss-filled joints', serviceSlug: 'walkways' },
  { id: 'stepping-gravel', label: 'Stepping stone in gravel', prompt: 'square stepping stones set in crushed gravel', serviceSlug: 'walkways' },
  { id: 'poured-concrete', label: 'Poured concrete', prompt: 'broom-finished poured concrete walkway with clean control joints', serviceSlug: 'walkways' },
  { id: 'paver-band', label: 'Paver with soldier band', prompt: 'concrete paver walkway with a contrasting soldier-course border', serviceSlug: 'walkways' },
];

export const lighting: BuildableOption[] = [
  { id: 'path-lights', label: 'Low-voltage path lighting', prompt: 'low-voltage path lights casting warm pools along the walkway edge' },
  { id: 'uplights', label: 'Tree uplighting', prompt: 'warm uplighting at the base of specimen trees' },
  { id: 'hardscape-lights', label: 'Hardscape wall lights', prompt: 'recessed hardscape lights under the wall cap washing the block face' },
];

/**
 * USDA zone 8b Puget Sound hardy planting only. Anything not on this list does
 * not go in a render, because we will not plant it.
 */
export const planting: BuildableOption[] = [
  { id: 'natives', label: 'PNW natives', prompt: 'sword fern, salal, evergreen huckleberry and kinnikinnick massed in layered beds', serviceSlug: 'planting-design' },
  { id: 'japanese-maple', label: 'Japanese maple feature', prompt: 'a single Japanese maple as a focal specimen with a clean mulch bed', serviceSlug: 'planting-design' },
  { id: 'vine-maple-conifer', label: 'Vine maple + dwarf conifers', prompt: 'vine maple with dwarf conifers and low carex grasses', serviceSlug: 'planting-design' },
  { id: 'hydrangea-rhody', label: 'Hydrangea & rhododendron', prompt: 'hydrangea and rhododendron shrub border against the fence line', serviceSlug: 'planting-design' },
  { id: 'lavender-hebe', label: 'Lavender & hebe', prompt: 'lavender and hebe in a sunny gravel-mulched border', serviceSlug: 'planting-design' },
  { id: 'red-twig', label: 'Red twig dogwood screen', prompt: 'red twig dogwood used as an informal screen along a property edge', serviceSlug: 'planting-design' },
];

export const turf: BuildableOption[] = [
  { id: 'sod', label: 'New sod lawn', prompt: 'freshly laid sod lawn with a crisp edge against the hardscape', serviceSlug: 'sod-installation' },
  { id: 'hydroseed', label: 'Hydroseed lawn', prompt: 'establishing hydroseeded lawn, even green coverage', serviceSlug: 'sod-installation' },
  { id: 'artificial-turf', label: 'Artificial turf', prompt: 'artificial turf panel with a clean paver border', serviceSlug: 'sod-installation' },
];

// ── User-facing selections ───────────────────────────────────────────────────

export interface ScopeOption {
  id: string;
  label: string;
  description: string;
  /** Prompt fragment describing the overall intervention. */
  prompt: string;
  /** Which catalog groups are relevant for this scope. */
  groups: string[];
  /** Service slugs this scope maps to, for the estimate bridge. */
  serviceSlugs: string[];
}

export const scopes: ScopeOption[] = [
  {
    id: 'paver-patio',
    label: 'Paver patio',
    description: 'A defined outdoor room off the house',
    prompt: 'a new paver patio replacing the existing lawn area directly behind the house, with a defined border and a clean transition to the remaining lawn',
    groups: ['pavers', 'planting', 'lighting'],
    serviceSlugs: ['paver-patios'],
  },
  {
    id: 'retaining-wall',
    label: 'Retaining wall',
    description: 'Hold a slope and gain usable yard',
    prompt: 'a segmental retaining wall terracing the existing slope into level usable yard, with visible gravel drainage at the base and planted terraces',
    groups: ['walls', 'planting', 'lighting'],
    serviceSlugs: ['retaining-walls'],
  },
  {
    id: 'full-backyard',
    label: 'Full backyard',
    description: 'Patio, planting, lawn and lighting together',
    prompt: 'a complete backyard renovation with a paver patio, layered planting beds, a defined lawn area and a fence line',
    groups: ['pavers', 'walls', 'fire', 'planting', 'turf', 'fencing', 'lighting'],
    serviceSlugs: ['paver-patios', 'planting-design', 'sod-installation'],
  },
  {
    id: 'front-curb-appeal',
    label: 'Front yard curb appeal',
    description: 'Walkway, planting and lighting at the street',
    prompt: 'a front yard refresh with a new walkway from the driveway to the entry, layered foundation planting, a crisp lawn edge and path lighting',
    groups: ['paths', 'planting', 'turf', 'lighting'],
    serviceSlugs: ['walkways', 'planting-design'],
  },
  {
    id: 'fire-and-seating',
    label: 'Fire feature + seating',
    description: 'A gathering area that gets used in October',
    prompt: 'a paver patio with a low seating wall wrapping a fire feature, warm lighting and planting behind the seating',
    groups: ['pavers', 'fire', 'walls', 'planting', 'lighting'],
    serviceSlugs: ['fire-features', 'seating-walls', 'paver-patios'],
  },
  {
    id: 'irrigation-lawn',
    label: 'Irrigation + lawn',
    description: 'A lawn that survives August',
    prompt: 'a level renovated lawn with a crisp edge, healthy even turf and tidy planted borders',
    groups: ['turf', 'planting'],
    serviceSlugs: ['sprinkler-installation', 'sod-installation'],
  },
];

export interface StyleOption {
  id: string;
  label: string;
  prompt: string;
}

export const styles: StyleOption[] = [
  {
    id: 'pnw-modern',
    label: 'PNW Modern',
    prompt: 'clean contemporary Pacific Northwest style, large-format hardscape, restrained plant palette, dark and natural material tones, strong horizontal lines',
  },
  {
    id: 'craftsman',
    label: 'Craftsman',
    prompt: 'craftsman style, tumbled and textured materials, warm tan and gray tones, layered traditional planting, tapered proportions',
  },
  {
    id: 'naturalistic-native',
    label: 'Naturalistic Native',
    prompt: 'naturalistic Pacific Northwest native style, informal drifts of ferns and salal, moss, weathered basalt, soft irregular edges',
  },
  {
    id: 'clean-contemporary',
    label: 'Clean Contemporary',
    prompt: 'minimal contemporary style, monochrome hardscape, geometric planting blocks, gravel mulch, very restrained detailing',
  },
  {
    id: 'cottage',
    label: 'Cottage',
    prompt: 'relaxed cottage style, mixed flowering shrubs, hydrangea and lavender, informal path edges, abundant layered planting',
  },
];

/** Optional element toggles applied to an existing render. */
export const elementToggles: BuildableOption[] = [
  { id: 'add-fire', label: 'Add fire feature', prompt: 'add a gas fire bowl as a focal point on the patio', serviceSlug: 'fire-features' },
  { id: 'add-lighting', label: 'Add lighting', prompt: 'add warm low-voltage path and hardscape lighting', serviceSlug: 'walkways' },
  { id: 'add-seating-wall', label: 'Add seating wall', prompt: 'add a low seating wall along one edge of the patio', serviceSlug: 'seating-walls' },
  { id: 'add-privacy-fence', label: 'Add privacy fence', prompt: 'add a cedar privacy fence along the rear property line', serviceSlug: 'fencing' },
  { id: 'more-planting', label: 'More planting', prompt: 'increase the density and layering of the zone 8b planting beds', serviceSlug: 'planting-design' },
  { id: 'add-water-feature', label: 'Add water feature', prompt: 'add a pondless basalt column water feature beside the seating area', serviceSlug: 'water-features' },
];

export const catalogGroups: Record<string, BuildableGroup> = {
  walls: { id: 'walls', label: 'Wall system', options: wallSystems },
  pavers: { id: 'pavers', label: 'Paver', options: paverLines },
  fire: { id: 'fire', label: 'Fire feature', options: fireFeatures },
  fencing: { id: 'fencing', label: 'Fencing', options: fencing },
  paths: { id: 'paths', label: 'Path type', options: pathTypes },
  lighting: { id: 'lighting', label: 'Lighting', options: lighting },
  planting: { id: 'planting', label: 'Planting', options: planting },
  turf: { id: 'turf', label: 'Lawn', options: turf },
};

/**
 * Appended server-side to every single prompt. Never exposed to the client,
 * never editable by the user. This is the hard floor on what can be generated.
 */
export const NEGATIVE_PROMPT = [
  'swimming pool',
  'hot tub',
  'spa',
  'koi pond',
  'outdoor kitchen with plumbing',
  'pergola',
  'gazebo',
  'covered structure requiring a structural permit',
  'retaining wall taller than 4 feet',
  'mature specimen trees',
  'palm trees',
  'cacti',
  'succulent desert planting',
  'tropical planting',
  'bamboo',
  'banana plants',
  'recirculating waterfall requiring a permit',
  'anything requiring a licensed electrician or plumber',
  'people',
  'text',
  'watermark',
  'signage',
].join(', ');

/** Style anchor appended to every prompt so the whole site stays coherent. */
export const STYLE_ANCHOR =
  'shot on a 35mm lens, overcast Pacific Northwest daylight, soft diffused shadows, slightly desaturated greens, warm neutral stone tones, natural color grade, photorealistic architectural photography, no people, no text, no watermark';

/** Walls render at 4 ft maximum by default — above that needs engineering. */
export const MAX_WALL_HEIGHT_FT = 4;

export const WALL_HEIGHT_NOTE =
  'Walls over 4 ft need engineering and a permit — we handle that, it just adds time. This design is shown at 4 ft.';

export function getScope(id: string): ScopeOption | undefined {
  return scopes.find((s) => s.id === id);
}

export function getStyle(id: string): StyleOption | undefined {
  return styles.find((s) => s.id === id);
}

/** Look an option up across every catalog group. */
export function findOption(id: string): BuildableOption | undefined {
  for (const group of Object.values(catalogGroups)) {
    const hit = group.options.find((o) => o.id === id);
    if (hit) return hit;
  }
  return elementToggles.find((o) => o.id === id);
}
