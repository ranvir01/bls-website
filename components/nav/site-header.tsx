'use client';

import { LazyMotion, domAnimation, m, useMotionValueEvent, useScroll } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone } from 'lucide-react';
import { useState } from 'react';

import { PHONE, TEL_HREF } from '@/data/business';
import { trackEvent } from '@/lib/analytics';
import { spring } from '@/lib/motion';
import { locationColumns, servicesColumns } from '@/lib/nav';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import { MegaMenu } from './mega-menu';
import { MobileDrawer } from './mobile-drawer';

const SCROLL_THRESHOLD = 80;

/**
 * Site header.
 *
 * Transparent over a hero on load, solid on scroll past 80px. The transition is
 * a spring rather than a linear fade — a linear background fade on a sticky
 * header is one of the most recognisably template-ish details on the web.
 *
 * `useMotionValueEvent` reads the scroll value off the animation frame loop, so
 * this does not add a scroll listener that runs React state updates on every
 * pixel.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  // Only the homepage and other hero pages start transparent; content pages
  // need a solid bar from the top or the logo lands on body text.
  const overHero = pathname === '/' || pathname === '/visualizer';

  useMotionValueEvent(scrollY, 'change', (y) => {
    const next = y > SCROLL_THRESHOLD;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  const solid = scrolled || !overHero;

  return (
    <LazyMotion features={domAnimation} strict>
      <m.header
        className={cn(
          'fixed inset-x-0 top-0 z-40',
          solid
            ? 'border-b border-ink-200 bg-ink-50/95 backdrop-blur-md'
            : // Transparent, but never truly bare. A hero photo is not a
              // controlled backdrop — the mobile crop puts bright green siding
              // directly behind the logo — so a short top-down scrim keeps the
              // mark and the nav legible whatever the picture is doing.
              'border-b border-transparent bg-gradient-to-b from-black/65 via-black/30 to-transparent',
        )}
        initial={false}
        animate={{ y: 0 }}
        transition={spring.soft}
      >
        <div className="shell flex h-16 items-center justify-between gap-4 lg:h-20">
          <Link
            href="/"
            className="flex min-h-[44px] shrink-0 items-center gap-2.5"
            aria-label="Blue Landscaping Services — home"
          >
            {/* The logo file is a 480×284 wordmark, not a square icon. It used
                to be boxed into h-9 w-9, which letterboxed the whole lockup —
                skyline, laurels and both words — into a 36×21 smudge, and then
                the company name was set again in text right beside it. The
                wordmark is the name, so it carries the header on its own at a
                size where it can be read. The link's aria-label supplies the
                accessible name. */}
            <Image
              src="/images/logo.png"
              alt=""
              width={480}
              height={284}
              priority
              className={cn(
                'h-11 w-auto lg:h-14',
                // The skyline in the mark is dark navy. Over the hero photo it
                // needs a shadow to separate; on the solid bar it does not.
                !solid && 'drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)]',
              )}
            />
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Main" className="hidden items-center lg:flex">
            <MegaMenu label="Services" href="/services" columns={servicesColumns} solid={solid} />
            <MegaMenu label="Service Areas" href="/locations" columns={locationColumns} solid={solid} />
            {[
              { label: 'Portfolio', href: '/portfolio' },
              { label: 'Visualizer', href: '/visualizer' },
              { label: 'About', href: '/about' },
              { label: 'Reviews', href: '/reviews' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-3 py-2 text-caption font-medium transition-colors hover:text-brand-600',
                  solid ? 'text-ink-800' : 'text-white/90 hover:text-white',
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Click-to-call is always visible, on every breakpoint. */}
            <a
              href={TEL_HREF}
              onClick={() => trackEvent('click_to_call', { location: 'header' })}
              className={cn(
                'hidden items-center gap-2 rounded-sm px-3 py-2 text-caption font-semibold transition-colors md:inline-flex',
                solid ? 'text-brand-900 hover:text-brand-600' : 'text-white hover:text-brand-50',
              )}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {PHONE.display}
            </a>

            <a
              href={TEL_HREF}
              aria-label={`Call ${PHONE.display}`}
              onClick={() => trackEvent('click_to_call', { location: 'header_icon' })}
              className={cn(
                'inline-flex h-11 w-11 items-center justify-center rounded-sm transition-colors md:hidden',
                solid ? 'text-brand-900 hover:bg-ink-200/60' : 'text-white hover:bg-white/10',
              )}
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
            </a>

            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/quote">Get Free Quote</Link>
            </Button>

            <div className="lg:hidden">
              <MobileDrawer />
            </div>
          </div>
        </div>
      </m.header>
    </LazyMotion>
  );
}
