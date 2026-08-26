'use client';

import { LazyMotion, domAnimation, m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CreditCard, Phone, Shield } from 'lucide-react';
import { useRef } from 'react';

import { PHONE, TEL_HREF, business } from '@/data/business';
import { trackEvent } from '@/lib/analytics';
import { ease, heroWord } from '@/lib/motion';
import { Button } from '@/components/ui/button';

const HEADLINE = 'Expert Landscaping & Hardscaping in Seattle';

/**
 * Homepage hero.
 *
 * Restores the original keyword headline ("Expert Landscaping & Hardscaping in
 * Seattle") and the license / payment badges, on top of the photographic hero.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0px', '-60px']);
  const words = HEADLINE.split(' ');

  return (
    <LazyMotion features={domAnimation} strict>
      <section
        ref={ref}
        className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-brand-900"
      >
        <m.div className="absolute inset-0 -z-10" style={reduced ? undefined : { y }}>
          <picture>
            <source media="(max-width: 767px)" srcSet="/images/hero-home-mobile.jpg" />
            <Image
              src="/images/hero-home.jpg"
              alt="Landscaped Seattle property with custom stonework and retaining walls by Blue Landscaping Services"
              fill
              priority
              fetchPriority="high"
              sizes="100vw"
              className="img-grade object-cover object-center brightness-[0.7] saturate-[1.05]"
            />
          </picture>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black/40 md:bg-gradient-to-r md:from-black/80 md:via-black/50 md:to-black/20"
          />
        </m.div>

        <div className="shell w-full py-28 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <m.p
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: ease.out }}
              className="text-caption font-semibold uppercase tracking-wide text-sky-200"
            >
              Kent, WA · Licensed &amp; insured · Serving Greater Seattle since {business.foundedYear}
            </m.p>

            <h1 className="mt-4 text-display text-white">
              {words.map((word, i) => {
                const isSeattle = word.replace(/[^A-Za-z]/g, '') === 'Seattle';
                return (
                  <m.span
                    key={`${word}-${i}`}
                    custom={i}
                    variants={reduced ? undefined : heroWord}
                    initial={reduced ? false : 'hidden'}
                    animate="visible"
                    className={`inline-block whitespace-pre ${isSeattle ? 'text-sky-300' : ''}`}
                  >
                    {word}{' '}
                  </m.span>
                );
              })}
            </h1>

            <m.p
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5, ease: ease.out }}
              className="mx-auto mt-6 max-w-2xl text-body-lg text-white/90"
            >
              Transform your outdoor space with retaining walls, custom paver patios, and
              professional irrigation systems built for the Pacific Northwest.
            </m.p>

            <m.div
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5, ease: ease.out }}
              className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-white/90"
            >
              <span className="inline-flex items-center gap-1.5 text-caption font-medium">
                <Shield className="h-4 w-4 text-sky-300" aria-hidden="true" />
                License {business.license.number}
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:inline-block" aria-hidden="true" />
              <span className="inline-flex items-center gap-1.5 text-caption font-medium">
                <CreditCard className="h-4 w-4 text-leaf-300" aria-hidden="true" />
                {business.paymentMethods.join(' · ')}
              </span>
            </m.div>

            <m.div
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5, ease: ease.out }}
              className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
            >
              <Button asChild size="lg" variant="onPhoto">
                <Link href="/quote">
                  Free Consultation
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
