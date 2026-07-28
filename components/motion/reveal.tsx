'use client';

import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

import {
  dur,
  ease,
  reducedVariants,
  revealVariants,
  staggerDelay,
  viewportOnce,
} from '@/lib/motion';
import { cn } from '@/lib/utils';

/**
 * Scroll reveal.
 *
 * Fires once, never on scroll-up, never re-triggers. Uses LazyMotion with the
 * `domAnimation` feature bundle so we ship the ~15kb subset of Framer Motion
 * rather than the full library (Phase 3 bundle budget).
 *
 * The child content is always present in the server-rendered HTML — this only
 * animates opacity and transform from a CSS-visible state, so it can never
 * hide content from a crawler or delay LCP.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'section' | 'li' | 'article' | 'header';
}) {
  const reduced = useReducedMotion();
  const MotionTag = m[Tag];

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionTag
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={reduced ? reducedVariants : revealVariants}
        transition={reduced ? undefined : { delay, duration: dur.base, ease: ease.out }}
      >
        {children}
      </MotionTag>
    </LazyMotion>
  );
}

/**
 * Staggered group. Children animate in sequence with the stagger capped by
 * `staggerDelay`, so a long grid finishes in 400ms rather than crawling.
 */
export function StaggerGroup({
  children,
  className,
  as: Tag = 'div',
}: {
  children: ReactNode[];
  className?: string;
  as?: 'div' | 'ul' | 'ol';
}) {
  const reduced = useReducedMotion();
  const MotionTag = Tag === 'div' ? m.div : Tag === 'ul' ? m.ul : m.ol;
  const ChildTag = Tag === 'div' ? m.div : m.li;

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionTag className={className} initial="hidden" whileInView="visible" viewport={viewportOnce}>
        {children.map((child, i) => (
          <ChildTag
            key={i}
            variants={reduced ? reducedVariants : revealVariants}
            transition={reduced ? undefined : { delay: staggerDelay(i), duration: dur.base, ease: ease.out }}
          >
            {child}
          </ChildTag>
        ))}
      </MotionTag>
    </LazyMotion>
  );
}

/**
 * Card hover lift. Transform-only, so it never triggers layout.
 * Applied as a wrapper rather than a class so the reduced-motion check is
 * enforced in one place.
 */
export function HoverLift({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        className={cn('h-full', className)}
        whileHover={reduced ? undefined : { y: -4 }}
        transition={{ duration: 0.15, ease: ease.out }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
