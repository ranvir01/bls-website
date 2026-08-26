'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { PHONE, TEL_HREF } from '@/data/business';
import { companyLinks, locationColumns, servicesColumns } from '@/lib/nav';
import { ease, spring } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import { Button } from '@/components/ui/button';

/**
 * Full-screen mobile navigation.
 *
 * Radix Dialog handles focus trapping, body scroll lock and the Escape key, so
 * none of that is hand-rolled here. The link set is identical to the desktop
 * nav — there are no mobile-only or desktop-only destinations (Phase 4B).
 *
 * Services and Service Areas are accordions so the drawer never needs more
 * than one screen of scrolling to reach any top-level item.
 */
export function MobileDrawer() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduced = useReducedMotion();

  // Close on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-brand-900 transition-colors hover:bg-ink-200/60"
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </Dialog.Trigger>

      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <LazyMotion features={domAnimation} strict>
              <Dialog.Overlay asChild forceMount>
                <m.div
                  className="fixed inset-0 z-50 bg-brand-900/40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.2 }}
                />
              </Dialog.Overlay>

              <Dialog.Content asChild forceMount aria-label="Site navigation">
                <m.div
                  className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-ink-50 shadow-lifted"
                  initial={{ x: reduced ? 0 : '100%', opacity: reduced ? 0 : 1 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: reduced ? 0 : '100%', opacity: reduced ? 0 : 1 }}
                  transition={reduced ? { duration: 0.01 } : spring.snappy}
                >
                  <Dialog.Title className="sr-only">Site navigation</Dialog.Title>

                  <div className="flex h-16 shrink-0 items-center justify-between border-b border-ink-200 px-5">
                    <span className="font-display text-lg text-brand-900">Menu</span>
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        aria-label="Close menu"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-brand-900 transition-colors hover:bg-ink-200/60"
                      >
                        <X className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </Dialog.Close>
                  </div>

                  <nav className="flex-1 overflow-y-auto overscroll-contain px-5 py-4">
                    <DrawerAccordion title="Services" columns={servicesColumns} reduced={!!reduced} />
                    <DrawerAccordion title="Service Areas" columns={locationColumns} reduced={!!reduced} />

                    <ul className="mt-2 space-y-0.5 border-t border-ink-200 pt-3">
                      {companyLinks.map((link, i) => (
                        <m.li
                          key={link.href}
                          initial={reduced ? false : { opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: Math.min(i * 0.03, 0.24), ease: ease.out, duration: 0.3 }}
                        >
                          <Link
                            href={link.href}
                            className="block min-h-[44px] rounded-sm px-2 py-2.5 text-body-lg text-brand-900 transition-colors hover:bg-brand-50/60"
                          >
                            {link.label}
                          </Link>
                        </m.li>
                      ))}
                    </ul>
                  </nav>

                  {/* Thumb-reachable primary actions, pinned to the bottom. */}
                  <div className="shrink-0 space-y-2 border-t border-ink-200 bg-ink-50 px-5 py-4 safe-bottom">
                    <Button asChild full>
                      <Link href="/quote">Get Free Quote</Link>
                    </Button>
                    <Button asChild variant="outline" full>
                      <a
                        href={TEL_HREF}
                        onClick={() => trackEvent('click_to_call', { location: 'mobile_drawer' })}
                      >
                        <Phone className="h-4 w-4" aria-hidden="true" />
                        Call {PHONE.display}
                      </a>
                    </Button>
                  </div>
                </m.div>
              </Dialog.Content>
            </LazyMotion>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

function DrawerAccordion({
  title,
  columns,
  reduced,
}: {
  title: string;
  columns: { heading: string; href?: string; links: { label: string; href: string }[] }[];
  reduced: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-ink-200">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex min-h-[48px] w-full items-center justify-between px-2 py-2.5 text-body-lg font-medium text-brand-900"
      >
        {title}
        <ChevronDown
          aria-hidden="true"
          className={cn('h-4 w-4 transition-transform duration-200', open && 'rotate-180')}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <m.div
            initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduced ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0.01 : 0.25, ease: ease.out }}
            className="overflow-hidden"
          >
            <div className="pb-3">
              {columns.map((col) => (
                <div key={col.heading} className="mb-3">
                  {col.href ? (
                    <Link
                      href={col.href}
                      className="mb-1 block px-2 eyebrow text-brand-600"
                    >
                      {col.heading}
                    </Link>
                  ) : (
                    <p className="mb-1 px-2 eyebrow text-brand-600">
                      {col.heading}
                    </p>
                  )}
                  <ul>
                    {col.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="block min-h-[44px] rounded-sm px-2 py-2 text-body text-ink-800 transition-colors hover:bg-brand-50/60"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
