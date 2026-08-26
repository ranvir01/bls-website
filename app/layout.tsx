import type { Metadata, Viewport } from 'next';
import { Figtree, Montserrat } from 'next/font/google';
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
 * Montserrat for headings, Figtree for everything else.
 *
 * Montserrat stays because the display face is the half of a pairing that
 * carries brand recognition, and it is what this company has always looked
 * like.
 *
 * Quicksand was the body face and has been swapped, for one concrete reason
 * rather than taste: it ships no italic at any weight, so every <em> across
 * 107,000 words of cost and permit content rendered as a browser-synthesised
 * oblique. Its low x-height and near-circular bowls also blur a/o/e/c at 16px,
 * which is the size most of this site is read at. Figtree keeps the warm
 * geometric character — the reason Quicksand was chosen — and adds true
 * italics, a taller x-height and a variable weight axis.
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
const figtree = Figtree({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-figtree',
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s | Blue Landscaping Services',
    default: 'Landscaping & Hardscaping in Kent, WA | Blue Landscaping Services',
  },
  description:
    'Licensed hardscaping, irrigation and landscaping contractor in Kent, WA. Retaining walls, paver patios and sprinkler systems across South King County. Free on-site quotes.',
  applicationName: 'Blue Landscaping Services',
  authors: [{ name: 'Blue Landscaping Services' }],
  formatDetection: { telephone: true, address: true },
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/images/logo.png',
  },
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
    <html lang="en" className={`${montserrat.variable} ${figtree.variable}`}>
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

        <main id="main" className="flex-1">
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
