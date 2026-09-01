import type { Metadata } from 'next';
import Link from 'next/link';

import { PHONE, TEL_HREF } from '@/data/business';
import { categories, cities, cityPath } from '@/data/taxonomy';
import { Button } from '@/components/ui/button';
import { buildMetadata } from '@/lib/seo';

/*
 * Without its own metadata this page inherited the root layout's — so a
 * dead URL served the homepage title, description and canonical, and told
 * search engines to index it.
 *
 * `robots: null` on purpose. Next writes <meta name="robots" content="noindex">
 * into every 404 response itself (app-render's NonIndex), so the robots block
 * buildMetadata produces for noindex pages made this the one page with two
 * robots tags. null keeps the root layout's index/follow from inheriting and
 * leaves Next's tag as the only one.
 */
export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Page not found',
    description:
      'That page has moved or no longer exists. Every service and city is one click away.',
    path: '/404',
    noindex: true,
  }),
  robots: null,
};

/**
 * Branded 404.
 *
 * A dead end is a lost lead, so this offers real routes onward rather than an
 * apology — every service category and every primary city is one click away.
 */
export default function NotFound() {
  return (
    <div className="shell py-24 lg:py-32">
      <div className="max-w-prose">
        <p className="eyebrow text-leaf-600">404</p>
        <h1 className="mt-2 text-h1">That page is not here</h1>
        <p className="mt-5 text-body-lg text-ink-500">
          The link may be out of date — we reorganised this site, and some older URLs moved. Here is
          everything, one click away.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/">Back to the homepage</Link>
          </Button>
          <Button asChild variant="outline">
            <a href={TEL_HREF}>Call {PHONE.display}</a>
          </Button>
        </div>
      </div>

      <div className="mt-16 grid gap-10 md:grid-cols-2">
        <nav aria-labelledby="nf-services">
          <h2 id="nf-services" className="text-h3">
            Services
          </h2>
          <ul className="mt-4 space-y-2">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/services/${c.slug}`}
                  className="text-body text-ink-800 underline decoration-ink-200 underline-offset-4 hover:text-brand-600"
                >
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/services"
                className="text-body text-ink-800 underline decoration-ink-200 underline-offset-4 hover:text-brand-600"
              >
                All services
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-labelledby="nf-areas">
          <h2 id="nf-areas" className="text-h3">
            Service areas
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
            {cities
              .filter((c) => c.tier === 'primary')
              .map((c) => (
                <li key={c.slug}>
                  <Link
                    href={cityPath(c.slug)}
                    className="text-body text-ink-800 underline decoration-ink-200 underline-offset-4 hover:text-brand-600"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            <li>
              <Link
                href="/locations"
                className="text-body text-ink-800 underline decoration-ink-200 underline-offset-4 hover:text-brand-600"
              >
                All areas
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
