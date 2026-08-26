import type { Metadata } from 'next';
import { Clock, MessageSquare, Phone } from 'lucide-react';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { CtaBand, QuickAnswer } from '@/components/blocks';
import { JsonLd } from '@/components/json-ld';
import { NapBlock } from '@/components/nap-block';
import { QuoteForm } from '@/components/quote/quote-form';
import { PHONE, SMS_HREF, TEL_HREF, business, formattedAddress } from '@/data/business';
import { cities, cityPath, regions } from '@/data/taxonomy';
import { buildMetadata, graph, localBusinessSchema } from '@/lib/seo';
import Link from 'next/link';

export const metadata: Metadata = buildMetadata({
  title: 'Contact Us',
  description:
    'Call, text or send a request to Blue Landscaping Services in Kent, WA. Same-day response on most enquiries. Serving South King County, the Eastside and Seattle.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={graph([localBusinessSchema({ path: '/contact', areaServed: cities.map((c) => c.name) })])}
      />

      <Breadcrumbs crumbs={[{ name: 'Contact', path: '/contact' }]} />

      <div className="shell pb-16 pt-8">
        <header className="max-w-3xl">
          <p className="text-caption font-semibold uppercase tracking-wide text-brand-600">Contact</p>
          <h1 className="mt-2 text-h1">Get in touch</h1>
          <QuickAnswer>
            {`Blue Landscaping Services is at ${formattedAddress}. Call or text ${PHONE.display}, or send a request through the form below. We respond the same day on almost every enquiry during working hours, and the on-site walkthrough is free.`}
          </QuickAnswer>
        </header>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <a
            href={TEL_HREF}
            className="flex min-h-[88px] flex-col justify-center gap-1 rounded-sm border border-ink-200 bg-white p-5 transition-colors hover:border-brand-600"
          >
            <span className="flex items-center gap-2 text-caption font-semibold uppercase tracking-wide text-brand-600">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call
            </span>
            <span className="text-body-lg font-semibold text-brand-900">{PHONE.display}</span>
          </a>
          <a
            href={SMS_HREF}
            className="flex min-h-[88px] flex-col justify-center gap-1 rounded-sm border border-ink-200 bg-white p-5 transition-colors hover:border-brand-600"
          >
            <span className="flex items-center gap-2 text-caption font-semibold uppercase tracking-wide text-brand-600">
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              Text
            </span>
            <span className="text-body-lg font-semibold text-brand-900">{PHONE.display}</span>
          </a>
          <div className="flex min-h-[88px] flex-col justify-center gap-1 rounded-sm border border-ink-200 bg-white p-5">
            <span className="flex items-center gap-2 text-caption font-semibold uppercase tracking-wide text-brand-600">
              <Clock className="h-4 w-4" aria-hidden="true" />
              Response time
            </span>
            <span className="text-body-lg font-semibold text-brand-900">Same day</span>
          </div>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-7">
            <h2 className="text-h2">Send us the details</h2>
            <p className="mt-3 max-w-prose text-body-lg text-ink-500">
              Five quick questions. It goes straight to the owner&rsquo;s phone.
            </p>
            <div className="mt-6">
              <QuoteForm />
            </div>
          </div>

          <aside className="min-w-0 space-y-8 lg:col-span-5">
            <NapBlock />

            <section className="rounded-sm border border-ink-200 bg-white p-6">
              <h2 className="text-h3">Where we work</h2>
              <div className="mt-4 space-y-4">
                {regions.map((region) => (
                  <div key={region}>
                    <h3 className="text-caption font-semibold uppercase tracking-wide text-brand-600">
                      {region}
                    </h3>
                    <p className="mt-1.5 text-caption text-ink-500">
                      {cities
                        .filter((c) => c.region === region)
                        .map((c) => c.name)
                        .join(', ')}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                href="/locations"
                className="mt-5 inline-flex min-h-[44px] items-center text-caption font-semibold text-brand-600 underline underline-offset-4"
              >
                See all service areas
              </Link>
            </section>

            <section className="rounded-sm border border-ink-200 bg-white p-6">
              <h2 className="text-h3">Find us</h2>
              <p className="mt-2 text-body text-ink-500">{formattedAddress}</p>
              {/* Lazy-loaded so it never costs the page an LCP or a main-thread
                  stall; the address above is the real content. */}
              <div className="mt-4 overflow-hidden rounded-sm border border-ink-200">
                <iframe
                  title={`Map showing ${business.name} in Kent, Washington`}
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${business.geo.longitude - 0.02}%2C${business.geo.latitude - 0.012}%2C${business.geo.longitude + 0.02}%2C${business.geo.latitude + 0.012}&layer=mapnik&marker=${business.geo.latitude}%2C${business.geo.longitude}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-64 w-full border-0"
                />
              </div>
            </section>
          </aside>
        </div>
      </div>

      <CtaBand />
    </>
  );
}
