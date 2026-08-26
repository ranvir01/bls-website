/**
 * Content contracts for the whole site.
 *
 * Every page renders from one of these shapes. Content lives in typed data
 * files; templates never invent copy. If a field is optional and absent, the
 * corresponding section must render nothing (Phase 4 empty-state rule) — never
 * a placeholder, never invented filler.
 */

export type CategorySlug = 'hardscaping' | 'irrigation' | 'landscaping';

export type CityTier = 'primary' | 'secondary' | 'seattle';

/** Phase 5 asset provenance. Governs where an image is allowed to appear. */
export type AssetType =
  /** Real, unretouched job-site photo. Portfolio-eligible. */
  | 'photo'
  /** Real project photo, AI-cleaned (sky, grade, removed clutter). Portfolio-eligible. */
  | 'enhanced-photo'
  /** AI-generated design visualization. NEVER portfolio-eligible. Requires visible badge. */
  | 'concept-render'
  /** A render paired with the real finished photo of the same build. Portfolio-eligible. */
  | 'concept-to-built';

export interface Faq {
  question: string;
  answer: string;
}

export interface CostRow {
  item: string;
  range: string;
  unit: string;
  notes?: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
  assetType: AssetType;
}

/** A single service page (`/services/[category]/[service]`). */
export interface ServiceContent {
  slug: string;
  category: CategorySlug;
  /** Short label used in navigation and breadcrumbs. */
  name: string;
  /** Full H1, always "{Service} in Kent & Greater Seattle" shaped. */
  h1: string;
  /** <title>, without the brand suffix — the template appends it. */
  metaTitle: string;
  metaDescription: string;
  /**
   * 40–60 words. This is the block AI engines extract and cite, so it must
   * answer the page's core question completely and standalone.
   */
  quickAnswer: string;
  /** Lead paragraphs, rendered as prose. 2–4 entries. */
  intro: string[];
  included: string[];
  materials: string[];
  process: ProcessStep[];
  timeline: string;
  costRows: CostRow[];
  costNote: string;
  /** PNW-specific: drainage, clay soil, freeze-thaw, permits. */
  pnwConsiderations: { title: string; body: string }[];
  faqs: Faq[];
  /** Slugs of sibling services to cross-link. */
  relatedServices: string[];
  /** Search intent keywords, used for internal metadata only. */
  keywords: string[];
}

/** A service category hub (`/services/[category]`). */
export interface CategoryContent {
  slug: CategorySlug;
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  quickAnswer: string;
  intro: string[];
  faqs: Faq[];
}

/** A location page (`/locations/[city]`). */
export interface CityContent {
  slug: string;
  /** "Kent", "Maple Valley", "West Seattle" */
  name: string;
  tier: CityTier;
  /** County or district label used for grouping in nav. */
  region: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  quickAnswer: string;
  /** 250+ words of genuinely local copy, split into paragraphs. */
  body: string[];
  neighborhoods: string[];
  /** Local soil / drainage / grade conditions crews actually hit here. */
  siteConditions: string;
  /** Permit notes for this jurisdiction. */
  permitNotes: string;
  /** Drive time from the Kent shop, e.g. "about 15 minutes". */
  driveTimeFromKent: string;
  /** Service slugs offered in this city. */
  services: string[];
  /** Slugs of 3 neighboring cities to cross-link. */
  nearbyCities: string[];
  faqs: Faq[];
  zips: string[];
}

/** A programmatic service×city page (`/locations/[city]/[service]`). */
export interface ServiceCityContent {
  citySlug: string;
  serviceSlug: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  quickAnswer: string;
  /** Unique local copy — never spun boilerplate. 2–3 paragraphs. */
  body: string[];
  /** What is specifically different about doing this service in this city. */
  localAngle: string;
  faqs: Faq[];
}

/**
 * A real completed project. `assetType` gates where it may appear:
 * only 'photo', 'enhanced-photo', and 'concept-to-built' reach /portfolio.
 */
export interface Project {
  slug: string;
  title: string;
  serviceSlug: string;
  citySlug: string;
  /** Present when we have a matching before frame. After-only jobs skip the slider. */
  before?: ImageAsset;
  after: ImageAsset;
  caption: string;
  /** ISO date, YYYY-MM-DD. Omit when the original job date was not recorded. */
  completedAt?: string;
  assetType: AssetType;
  scope: string[];
  materials: string[];
  timeline: string;
  challenge: string;
  solution: string;
  /** Only present when a real, attributable client quote exists. */
  clientQuote?: { text: string; attribution: string };
  /** Phase 6E: links a completed build back to the render that generated the lead. */
  originatedFromRender?: string;
  gallery?: ImageAsset[];
}

/** A genuine, attributable customer review. No invented entries, ever. */
export interface Review {
  author: string;
  rating: number;
  text: string;
  /** Where the review was left — "Google", "Yelp", etc. Required for attribution. */
  source: string;
  sourceUrl?: string;
  /** ISO date, YYYY-MM-DD. */
  publishedAt: string;
  citySlug?: string;
  serviceSlug?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  /** ISO date, YYYY-MM-DD. */
  publishedAt: string;
  updatedAt?: string;
  /** 40–60 word extractable answer, same contract as service pages. */
  quickAnswer: string;
  excerpt: string;
  /**
   * Body as structured blocks so posts stay server-rendered and typed —
   * no MDX runtime, no client-side markdown parsing.
   */
  blocks: BlogBlock[];
  faqs: Faq[];
  relatedServices: string[];
  relatedCities: string[];
  readingMinutes: number;
}

export type BlogBlock =
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'callout'; title: string; text: string }
  | { type: 'table'; caption?: string; head: string[]; rows: string[][] };
