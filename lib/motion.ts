/**
 * Phase 3 animation tokens.
 *
 * Every animated component imports its timing from here. Hand-rolled durations
 * scattered across components are what make a site feel inconsistent, so this
 * is the only place a number should live.
 *
 * Hard rules enforced by the components that consume these:
 *   - transform and opacity only, never a layout-triggering property
 *   - nothing re-triggers on scroll-up
 *   - prefers-reduced-motion replaces every motion with an instant state change
 */

import type { Transition, Variants } from 'framer-motion';

export const ease = {
  /** Primary. Decisive, settles fast, reads expensive. */
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
};

export const spring = {
  soft: { type: 'spring', stiffness: 260, damping: 30 } as Transition,
  snappy: { type: 'spring', stiffness: 400, damping: 32 } as Transition,
};

export const dur = {
  fast: 0.2,
  base: 0.4,
  slow: 0.7,
} as const;

/** Cap total stagger so a 12-item grid never crawls. */
export const STAGGER_CHILD = 0.06;
export const STAGGER_MAX_TOTAL = 0.4;

/** Stagger delay for item `index`, clamped so long lists stay snappy. */
export function staggerDelay(index: number, step = STAGGER_CHILD): number {
  return Math.min(index * step, STAGGER_MAX_TOTAL);
}

// ── Shared variant sets ──────────────────────────────────────────────────────

export const revealVariants: Variants = {
  // 12px, not 24. A scroll reveal that travels a full line-height reads as
  // the element arriving from somewhere else; half that reads as it settling.
  // Long travel on every element in a long page is one of the named
  // fingerprints of generated UI.
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: dur.base, ease: ease.out },
  },
};

/**
 * The reduced-motion stand-in for revealVariants.
 *
 * It has to name EVERY property the full variant animates, including the ones
 * it does not want to move. That reads like redundancy and is not: the server
 * renders before `useReducedMotion()` can know the answer, so the HTML always
 * arrives stamped with the full `hidden` state — opacity 0 AND translateY(12px).
 * A reduced variant that mentions only opacity animates the opacity back and
 * leaves the transform exactly where the server put it, so every scroll-revealed
 * block on the site sat permanently 12px low for anyone with reduced motion on.
 *
 * Naming `y: 0` here is what undoes it.
 */
export const reducedVariants: Variants = {
  hidden: { opacity: 0, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.01 } },
};

export const staggerParent: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: STAGGER_CHILD },
  },
};

export const fadeUpChild: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: dur.base, ease: ease.out },
  },
};

/** Hero headline words rising in on mount. Total under 900ms including stagger. */
export const heroWord: Variants = {
  hidden: { opacity: 0, y: '0.4em' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: ease.out, delay: Math.min(i * 0.04, 0.36) },
  }),
};

/** Route-change crossfade. Deliberately short so it never delays LCP. */
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: dur.fast, ease: ease.out } },
  exit: { opacity: 0, transition: { duration: 0.12 } },
};

/** Shared viewport config: fire once, slightly before the element is on screen. */
export const viewportOnce = { once: true, margin: '-80px' } as const;
