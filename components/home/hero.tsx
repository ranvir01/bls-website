'use client';

import { LazyMotion, domAnimation, m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { useRef } from 'react';

import { PHONE, TEL_HREF, business } from '@/data/business';
import { trackEvent } from '@/lib/analytics';
import { ease, heroWord } from '@/lib/motion';
import { Button } from '@/components/ui/button';

const HEADLINE = 'Retaining walls, patios and irrigation built to last a Puget Sound winter.';

/**
 * Homepage hero.
 *
 * LCP discipline: the headline is real server-rendered text and the image is
 * `priority` with `fetchPriority="high"`. The word-rise animation starts from a
 * CSS-visible state and only touches transform and opacity — with JavaScript
 * off, or before hydration, the full headline is already painted. Nothing here
 * can delay the largest contentful paint.
 *
 * Art direction: a 3:2 landscape crop letterboxes badly on a phone, so a
 * portrait crop is served under 768px via a <picture> source rather than
 * scaling the same file down.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Transform-only parallax across the first viewport.
  const y = useTransform(scrollYProgress, [0, 1], ['0px', '-60px']);

  const words = HEADLINE.split(' ');

  return (
    <LazyMotion features={domAnimation} strict>
      <section ref={ref} className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-brand-900">
        <m.div className="absolute inset-0 -z-10" style={reduced ? undefined : { y }}>
          <picture>
            <source media="(max-width: 767px)" srcSet="/images/hero-home-mobile.jpg" />
            <Image
              src="/images/hero-home.jpg"
              alt="A completed Blue Landscaping Services hardscape installation in the Puget Sound region"
              fill
              priority
              fetchPriority="high"
              sizes="100vw"
              className="img-grade object-cover"
            />
          </picture>
          {/* Gradient scrim so the headline holds 4.5:1 contrast over any crop. */}
          {/* Two layers, deliberately. A neutral black gradient does the
              legibility work without tinting the greens in the photo, and a
              light brand wash underneath ties it to the palette. A single
              heavy navy gradient drowns the image — which is exactly what the
              previous revision did. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-brand-900/55 via-brand-900/15 to-transparent"
          />
        </m.div>

        <div className="shell pb-16 pt-32 md:pb-24 md:pt-40">
          <div className="max-w-3xl">
            <m.p
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: ease.out }}
              className="text-caption font-semibold uppercase tracking-wide text-brand-50"
            >
              Kent, WA · Licensed &amp; insured · Since {business.foundedYear}
            </m.p>

            <h1 className="mt-4 text-display text-white">
              {words.map((word, i) => (
                <m.span
                  key={`${word}-${i}`}
                  custom={i}
                  variants={reduced ? undefined : heroWord}
                  initial={reduced ? false : 'hidden'}
                  animate="visible"
                  className="inline-block whitespace-pre"
                >
                  {word}{' '}
                </m.span>
              ))}
            </h1>

            <m.p
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5, ease: ease.out }}
              className="mt-6 max-w-prose text-body-lg text-ink-200"
            >
              We draw the plan and we build it. Same crew start to finish, no subs on the
              hardscape. Kent, Auburn, Renton and the rest of Greater Seattle.
            </m.p>

            <m.div
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5, ease: ease.out }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <Button asChild size="lg">
                <Link href="/quote">
                  Get your free quote
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="onHero" size="lg">
                <a href={TEL_HREF} onClick={() => trackEvent('click_to_call', { location: 'hero' })}>
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {PHONE.display}
                </a>
              </Button>
            </m.div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
