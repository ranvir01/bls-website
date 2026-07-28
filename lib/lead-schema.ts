import { z } from 'zod';

import { cities, services } from '@/data/taxonomy';

/**
 * The single lead contract, shared by the client form and the server route.
 *
 * Validating the same schema on both sides means the API can never be tricked
 * by a crafted POST that skips the UI, and the form can never send a shape the
 * server rejects.
 */

const serviceSlugs = services.map((s) => s.slug);
const citySlugs = cities.map((c) => c.slug);

export const PROJECT_TYPES = [
  { id: 'paver-patios', label: 'Patio', description: 'Paver patio or outdoor living area' },
  { id: 'retaining-walls', label: 'Retaining wall', description: 'Hold a slope, gain flat yard' },
  { id: 'sprinkler-installation', label: 'Irrigation', description: 'New system, repair or winterizing' },
  { id: 'planting-design', label: 'Full redesign', description: 'Whole-yard design and build' },
  { id: 'lawn-maintenance', label: 'Maintenance', description: 'Recurring mowing and cleanups' },
  { id: 'other', label: 'Something else', description: 'Tell us what you have in mind' },
] as const;

export const SIZE_OPTIONS = [
  { id: 'small', label: 'Under 200 sq ft', description: 'A small patio or a short wall' },
  { id: 'medium', label: '200–600 sq ft', description: 'A typical backyard patio' },
  { id: 'large', label: '600–1,200 sq ft', description: 'A large patio or several elements' },
  { id: 'xlarge', label: 'Over 1,200 sq ft', description: 'A full property renovation' },
  { id: 'unsure', label: 'Not sure yet', description: "We'll figure it out on site" },
] as const;

export const TIMELINE_OPTIONS = [
  { id: 'asap', label: 'As soon as possible' },
  { id: '1-3-months', label: 'In the next 1–3 months' },
  { id: '3-6-months', label: 'In 3–6 months' },
  { id: 'planning', label: 'Just planning for now' },
] as const;

export const BUDGET_OPTIONS = [
  { id: 'under-5k', label: 'Under $5,000' },
  { id: '5k-15k', label: '$5,000 – $15,000' },
  { id: '15k-30k', label: '$15,000 – $30,000' },
  { id: '30k-plus', label: '$30,000+' },
  { id: 'unsure', label: 'Not sure yet' },
] as const;

/** US phone: 10 digits, optionally with a leading 1 and any punctuation. */
const phoneSchema = z
  .string()
  .trim()
  .min(1, 'Phone number is required')
  .refine((v) => {
    const digits = v.replace(/\D/g, '');
    return digits.length === 10 || (digits.length === 11 && digits.startsWith('1'));
  }, 'Enter a 10-digit US phone number');

export const leadSchema = z.object({
  // Step 1
  projectType: z.enum(
    PROJECT_TYPES.map((p) => p.id) as [string, ...string[]],
    { errorMap: () => ({ message: 'Pick what you need' }) },
  ),

  // Step 2
  projectSize: z.enum(SIZE_OPTIONS.map((s) => s.id) as [string, ...string[]]).optional(),
  /** Optional free text for anything the cards do not cover. */
  details: z.string().trim().max(2000).optional(),

  // Step 3
  city: z.string().trim().min(2, 'City is required').max(80),
  zip: z
    .string()
    .trim()
    .regex(/^\d{5}$/, 'Enter a 5-digit ZIP code'),

  // Step 4 — both optional, single tap
  timeline: z.enum(TIMELINE_OPTIONS.map((t) => t.id) as [string, ...string[]]).optional(),
  budget: z.enum(BUDGET_OPTIONS.map((b) => b.id) as [string, ...string[]]).optional(),

  // Step 5 — phone before email, deliberately: phone leads convert far better
  // in home services, and asking for email first depresses phone completion.
  name: z.string().trim().min(2, 'Name is required').max(120),
  phone: phoneSchema,
  email: z.string().trim().email('Enter a valid email').max(200).optional().or(z.literal('')),

  // Attribution
  sourcePath: z.string().max(300).optional(),
  /** Set when the lead came out of the visualizer, links lead ↔ render. */
  renderId: z.string().max(100).optional(),

  /** Honeypot. Real users never fill this — it is visually and a11y hidden. */
  company: z.string().max(0, 'Rejected').optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

/** Per-step field groups, so the form can validate one step at a time. */
export const STEP_FIELDS: (keyof LeadInput)[][] = [
  ['projectType'],
  ['projectSize', 'details'],
  ['city', 'zip'],
  ['timeline', 'budget'],
  ['name', 'phone', 'email'],
];

export const STEP_TITLES = [
  'What do you need?',
  'How big is the project?',
  'Where is the property?',
  'When are you looking to start?',
  'How should we reach you?',
];

/** ZIP prefixes we actively serve. Used for a helpful message, not a blocker. */
const SERVICE_AREA_ZIP_PREFIXES = ['980', '981', '984'];

export function isInServiceArea(zip: string): boolean {
  return SERVICE_AREA_ZIP_PREFIXES.some((p) => zip.startsWith(p));
}

export function projectTypeLabel(id: string): string {
  return PROJECT_TYPES.find((p) => p.id === id)?.label ?? id;
}

export function labelFor(
  options: readonly { id: string; label: string }[],
  id: string | undefined,
): string | undefined {
  if (!id) return undefined;
  return options.find((o) => o.id === id)?.label;
}

export { serviceSlugs, citySlugs };
