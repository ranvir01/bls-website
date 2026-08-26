'use client';

import { AnimatePresence, LazyMotion, domAnimation, m, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageSquare, Phone, PencilRuler } from 'lucide-react';
import { useState } from 'react';

import { SMS_HREF, TEL_HREF } from '@/data/business';
import { trackEvent } from '@/lib/analytics';
import { ease } from '@/lib/motion';

const APPEAR_AFTER_PX = 400;

/**
 * Sticky mobile action bar.
 *
 * Below 768px this is the primary conversion surface — it sits in the thumb
 * zone and follows the user down every page. It appears after 400px of scroll
 * so it never competes with the hero CTA.
 *
 * It hides whenever a modal is open. That is driven by a `:has()` rule in
 * globals.css keyed on the `data-state="open"` attribute Radix actually sets,
 * so the two components need no shared state. Without it the bar shows through
 * the drawer's translucent scrim.
 *
 * It also hides on the pages whose whole job is the conversion it points at.
 * Beyond being redundant there, a bar fixed over the bottom 57px of the
 * viewport can sit on top of the form's own Continue and Submit buttons — a
 * thumb aiming for Continue hits Call instead.
 */

/** Routes where the bar would compete with, and occlude, the page's own form. */
const SUPPRESSED_ROUTES = ['/quote', '/contact', '/visualizer'];
export function MobileActionBar() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();
  const reduced = useReducedMotion();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, 'change', (y) => {
    const next = y > APPEAR_AFTER_PX;
    setVisible((prev) => (prev === next ? prev : next));
  });

  const suppressed = SUPPRESSED_ROUTES.includes(pathname);

  return (
    <LazyMotion features={domAnimation} strict>
      <AnimatePresence>
        {visible && !suppressed && (
          <m.div
            role="group"
            aria-label="Quick actions"
            className="mobile-action-bar fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 border-t border-ink-200 bg-ink-50/95 backdrop-blur-md safe-bottom md:hidden"
            initial={reduced ? { opacity: 0 } : { y: '100%' }}
            animate={reduced ? { opacity: 1 } : { y: 0 }}
            exit={reduced ? { opacity: 0 } : { y: '100%' }}
            transition={{ duration: reduced ? 0.01 : 0.28, ease: ease.out }}
          >
            <a
              href={TEL_HREF}
              onClick={() => trackEvent('click_to_call', { location: 'action_bar' })}
              className="flex min-h-[56px] flex-col items-center justify-center gap-0.5 border-r border-ink-200 text-brand-900 transition-colors active:bg-ink-200/60"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              <span className="text-[11px] font-semibold uppercase tracking-wide">Call</span>
            </a>

            <a
              href={SMS_HREF}
              onClick={() => trackEvent('click_to_text', { location: 'action_bar' })}
              className="flex min-h-[56px] flex-col items-center justify-center gap-0.5 border-r border-ink-200 text-brand-900 transition-colors active:bg-ink-200/60"
            >
              <MessageSquare className="h-5 w-5" aria-hidden="true" />
              <span className="text-[11px] font-semibold uppercase tracking-wide">Text</span>
            </a>

            <Link
              href="/quote"
              className="flex min-h-[56px] flex-col items-center justify-center gap-0.5 bg-leaf-600 text-white transition-colors active:bg-leaf-700"
            >
              <PencilRuler className="h-5 w-5" aria-hidden="true" />
              <span className="text-[11px] font-semibold uppercase tracking-wide">Free Quote</span>
            </Link>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
