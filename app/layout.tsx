import type { Metadata, Viewport } from 'next';
import { Montserrat, Quicksand } from 'next/font/google';
import Script from 'next/script';

import './globals.css';

import { JsonLd } from '@/components/json-ld';
import { MobileActionBar } from '@/components/nav/mobile-action-bar';
import { SiteFooter } from '@/components/nav/site-footer';
import { SiteHeader } from '@/components/nav/site-header';
import { SITE_URL } from '@/data/business';
import { GA_MEASUREMENT_ID } from '@/lib/analytics';
import { graph, organizationSchema, websiteSchema } from '@/lib/seo';

/**
 * The original type pairing, restored. Montserrat carries the headings;
 * Quicksand's rounded terminals keep the body approachable rather than
 * corporate, which is the tone the business actually has.
 *
 * Self-hosted by next/font, so there is no third-party font request, no FOUT
 * and no layout shift.
 */
const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  preload: true,
});

/** Body/UI face. Only the display face is preloaded. */
const quicksand = Quicksand({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-quicksand',
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s | Blue Landscaping Services',
    default: 'Expert Landscaping & Hardscaping in Seattle | Blue Landscaping Services',
  },
  description:
    'Expert landscaping and hardscaping in Seattle and Kent, WA. Retaining walls, custom paver patios, and professional irrigation systems. Licensed, bonded, insured. Free consultation.',
  applicationName: 'Blue Landscaping Services',
  authors: [{ name: 'Blue Landscaping Services' }],
  /*
   * No formatDetection key on purpose.
   *
   * It used to read `{ telephone: true, address: true }`, which reads as
   * "please do detect these" and emitted the exact opposite:
   *
   *   <meta name="format-detection" content="telephone=no, address=no">
   *
   * Next writes this tag for whichever keys are present and treats it as an
   * opt-out list, so naming a key at all suppresses detection. On a contractor
   * site whose primary call to action is a phone call, that is the wrong
   * default. Omitting the key emits no tag and leaves native detection on,
   * which is what the original line was trying to say.
   */
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  /*
   * No icons block: app/icon.png and app/apple-icon.png are picked up by Next
   * automatically and served content-hashed.
   *
   * This used to declare `/favicon.ico`, which had never existed — so every
   * page on the site asked the browser for a file that 404'd, and the apple
   * entry pointed at the 480x284 wordmark, which is neither square nor legible
   * at 180px. The icon is the skyline mark from that wordmark, cropped square;
   * the lettering is unreadable below about 64px and only muddies it.
   */
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Never cap zoom at 1 — pinch-zoom is an accessibility requirement.
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#0052e6',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${quicksand.variable}`}>
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        {/* Sitewide structured data. Page-level schema is added per route. */}
        <JsonLd data={graph([organizationSchema(), websiteSchema()])} />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-brand-900 focus:px-4 focus:py-2.5 focus:text-white"
        >
          Skip to content
        </a>

        <SiteHeader />

        {/* tabIndex={-1} lets the skip link actually move focus here. Without
            it activating the link only sets location.hash, and
            document.activeElement stays on <body>. Programmatic focus on a
            non-interactive element does not trigger :focus-visible, so no
            ring appears. */}
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>

        <SiteFooter />
        <MobileActionBar />

        {/* GA4 loads after hydration so it never competes with LCP. Renders
            nothing at all when the measurement ID is not configured. */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}',{send_page_view:true});`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
