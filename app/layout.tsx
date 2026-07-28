import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter } from 'next/font/google';
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
 * Display face. Fraunces is a variable serif with an optical-size axis — it
 * holds up at display sizes where most serifs get spindly, and a serif is the
 * single cheapest way to not look like every other landscaping site in the
 * market, all of which use geometric sans.
 *
 * Self-hosted by next/font, so there is no third-party font request, no FOUT
 * and no layout shift.
 */
const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  preload: true,
});

/** Body/UI face. Variable weight; only the display face is preloaded. */
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
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
  themeColor: '#F7F7F4',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        {/* Sitewide structured data. Page-level schema is added per route. */}
        <JsonLd data={graph([organizationSchema(), websiteSchema()])} />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-stone-950 focus:px-4 focus:py-2.5 focus:text-white"
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
