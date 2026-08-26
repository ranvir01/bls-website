'use client';

import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

import type { NavColumn } from '@/lib/nav';
import { cn } from '@/lib/utils';

const OPEN_DELAY_MS = 100;
const CLOSE_DELAY_MS = 300;

/**
 * Desktop mega-menu.
 *
 * Crawlability: the panel's links are ALWAYS present in the server-rendered
 * HTML. Closing the menu applies `visibility: hidden`, which removes the links
 * from the tab order and the accessibility tree while leaving them in the DOM
 * for crawlers. Mounting links only on open — the usual approach — hides the
 * entire internal-linking surface from search engines, which is the opposite
 * of what these menus are for.
 *
 * Interaction: 100ms intent delay before opening so a cursor crossing the bar
 * does not flash panels, 300ms grace on leave so a diagonal path to the panel
 * does not close it. Escape closes and returns focus to the trigger.
 */
export function MegaMenu({
  label,
  href,
  columns,
  footer,
  /**
   * Whether the header is currently solid. Over a photographic hero the
   * trigger has to be white — hardcoding ink-800 rendered "Services" and
   * "Service Areas" as dark text on a dark image, effectively invisible.
   */
  solid = true,
}: {
  label: string;
  href: string;
  columns: NavColumn[];
  footer?: React.ReactNode;
  solid?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const openTimer = useRef<ReturnType<typeof setTimeout>>();
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);

  const clearTimers = useCallback(() => {
    clearTimeout(openTimer.current);
    clearTimeout(closeTimer.current);
  }, []);

  const scheduleOpen = useCallback(() => {
    clearTimers();
    openTimer.current = setTimeout(() => setOpen(true), OPEN_DELAY_MS);
  }, [clearTimers]);

  const scheduleClose = useCallback(() => {
    clearTimers();
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  }, [clearTimers]);

  useEffect(() => clearTimers, [clearTimers]);

  // Escape closes from anywhere inside the menu and restores focus.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // Close when focus leaves the whole menu (keyboard tab-out).
  const onBlurCapture = useCallback((e: React.FocusEvent) => {
    if (!wrapperRef.current?.contains(e.relatedTarget as Node)) {
      setOpen(false);
    }
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="static"
      onMouseEnter={scheduleOpen}
      onMouseLeave={scheduleClose}
      onFocusCapture={() => setOpen(true)}
      onBlurCapture={onBlurCapture}
    >
      <Link
        ref={triggerRef}
        href={href}
        aria-expanded={open}
        aria-controls={panelId}
        className={cn(
          'inline-flex items-center gap-1 px-3 py-2 text-caption font-medium transition-colors',
          solid ? 'text-ink-800 hover:text-brand-600' : 'text-white/90 hover:text-white',
        )}
      >
        {label}
        <ChevronDown
          aria-hidden="true"
          className={cn('h-3.5 w-3.5 transition-transform duration-200', open && 'rotate-180')}
        />
      </Link>

      <div
        id={panelId}
        className={cn(
          'absolute left-0 right-0 top-full border-b border-ink-200 bg-ink-50 shadow-card',
          'transition-[opacity,transform] duration-200 ease-out',
          open
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-1 opacity-0',
        )}
      >
        <div className="shell grid gap-x-8 gap-y-6 py-8 md:grid-cols-2 lg:grid-cols-4">
          {columns.map((col) => (
            // A column with more than six links flows into two, so one long
            // category (hardscaping has eight) does not make the whole panel
            // twice the height of the viewport.
            <div key={col.heading} className={cn(col.links.length > 6 && 'lg:col-span-2')}>
              {col.href ? (
                <Link
                  href={col.href}
                  className="mb-3 block text-caption font-semibold uppercase tracking-wide text-brand-600 hover:underline"
                >
                  {col.heading}
                </Link>
              ) : (
                <p className="mb-3 text-caption font-semibold uppercase tracking-wide text-brand-600">
                  {col.heading}
                </p>
              )}
              <ul className={cn('space-y-1.5', col.links.length > 6 && 'lg:columns-2 lg:gap-8 lg:space-y-0')}>
                {col.links.map((link) => (
                  <li key={link.href} className="break-inside-avoid pb-1.5">
                    <Link
                      href={link.href}
                      className="group block rounded-sm px-2 py-1.5 -mx-2 transition-colors hover:bg-brand-50/60"
                    >
                      <span className="block text-body text-brand-900 group-hover:text-brand-600">
                        {link.label}
                      </span>
                      {link.description && (
                        <span className="block text-caption text-ink-500">{link.description}</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {footer}
        </div>
      </div>
    </div>
  );
}
