/**
 * Phase 10 — conversion event tracking.
 *
 * A single typed surface over gtag. Components call `trackEvent` and never
 * touch `window.dataLayer` directly, so the event vocabulary stays closed and
 * a typo becomes a compile error rather than a silently missing conversion.
 *
 * Safe to call during SSR and safe to call when GA is not configured — both
 * are no-ops rather than throws.
 */

export type AnalyticsEvent =
  | 'quote_form_start'
  | 'quote_form_step'
  | 'quote_form_submit'
  | 'click_to_call'
  | 'click_to_text'
  | 'visualizer_start'
  | 'visualizer_generate'
  | 'visualizer_toggle'
  | 'visualizer_lead_submit'
  | 'portfolio_view'
  | 'service_page_view'
  | 'estimate_calculated';

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: AnalyticsEvent, params: Params = {}): void {
  if (typeof window === 'undefined') return;

  const clean = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined),
  );

  if (typeof window.gtag === 'function') {
    window.gtag('event', event, clean);
    return;
  }

  // GTM-only setups read from the dataLayer instead of gtag.
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event, ...clean });
  }
}

/** GA4 measurement ID, or undefined when analytics is not configured. */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
