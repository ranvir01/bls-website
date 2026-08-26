import type { Metadata } from 'next';
import Link from 'next/link';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { CtaBand, QuickAnswer } from '@/components/blocks';
import { JsonLd } from '@/components/json-ld';
import { Reveal } from '@/components/motion/reveal';
import { NapBlock } from '@/components/nap-block';
import { cityContent } from '@/data/content/cities';
import { cities, cityPath, regions } from '@/data/taxonomy';
import { buildMetadata, graph, localBusinessSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Service Areas — Kent, South King County & Greater Seattle',
  description:
    'Blue Landscaping Services covers Kent, Auburn, Renton, Covington, Maple Valley, the Eastside and Seattle. Find local hardscaping, irrigation and landscaping details for your city.',
  path: '/locations',
});

export default function LocationsPage() {
  const live = cities.filter((c) => cityContent[c.slug]);

  return (
    <>
      <JsonLd
        data={graph([localBusinessSchema({ path: '/locations', areaServed: live.map((c) => c.name) })])}
      />

      <Breadcrumbs crumbs={[{ name: 'Service Areas', path: '/locations' }]} />

      <div className="shell pb-16 pt-8">
        <header>
          <p className="text-caption font-semibold uppercase tracking-wide text-brand-600">
            Where we work
          </p>
          <h1 className="mt-2 max-w-4xl text-h1">Service areas across Greater Seattle</h1>
          <QuickAnswer>
            {`Blue Landscaping Services works out of Kent, WA and covers ${live.length} communities across South King County, the Eastside and Seattle. South King County is our home turf — most of those jobs are inside a 25-minute drive, which is why we can get out for a walkthrough quickly.`}
          </QuickAnswer>
        </header>

        <div className="mt-12 space-y-14">
          {regions.map((region) => {
            const inRegion = live.filter((c) => c.region === region);
            if (!inRegion.length) return null;

            return (
              <Reveal as="section" key={region}>
                <h2 className="text-h2">{region}</h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {inRegion.map((city) => {
                    const content = cityContent[city.slug];
                    return (
                      <li key={city.slug}>
                        <Link
                          href={cityPath(city.slug)}
                          className="group flex h-full flex-col rounded-sm border border-ink-200 bg-white p-5 transition-shadow hover:shadow-card"
                        >
                          <h3 className="text-body-lg font-semibold text-brand-900 group-hover:text-brand-600">
                            {city.name}
                          </h3>
                          <p className="mt-1 text-caption text-ink-500">
                            {content.driveTimeFromKent} from our Kent shop
                          </p>
                          <p className="mt-3 flex-1 text-body text-ink-500">
                            {content.quickAnswer.split('. ').slice(0, 2).join('. ')}.
                          </p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-16 max-w-md">
          <NapBlock heading="Based in Kent, WA" />
        </div>
      </div>

      <CtaBand />
    </>
  );
}
