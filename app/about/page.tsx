import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { CtaBand, LinkCluster, QuickAnswer, TrustBar } from '@/components/blocks';
import { JsonLd } from '@/components/json-ld';
import { NapBlock } from '@/components/nap-block';
import { Reveal } from '@/components/motion/reveal';
import { business, yearsInBusiness } from '@/data/business';
import { teamPhoto } from '@/data/work-photos';
import { categories, cities, cityPath } from '@/data/taxonomy';
import { buildMetadata, graph, localBusinessSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'About Blue Landscaping Services — Kent, WA',
  description:
    'Licensed, family-run hardscaping and landscaping contractor in Kent, WA, founded in 2012. Washington registration BLUELLS880K2, a $12,000 bond and $1M liability cover.',
  path: '/about',
});

export default function AboutPage() {
  const years = yearsInBusiness();

  return (
    <>
      <JsonLd data={graph([localBusinessSchema({ areaServed: cities.map((c) => c.name) })])} />

      <Breadcrumbs crumbs={[{ name: 'About', path: '/about' }]} />

      <div className="shell pb-16 pt-8">
        <header className="max-w-3xl">
          <p className="text-caption font-semibold uppercase tracking-wide text-brand-600">About us</p>
          <h1 className="mt-2 text-h1">A family crew in Kent that builds yards across Greater Seattle</h1>
          <QuickAnswer>
            {`Blue Landscaping Services is a licensed, family-run hardscaping and landscaping contractor based at ${business.address.street} in Kent, WA. Founded in ${business.foundedYear} by ${business.owner}. We design and build retaining walls, paver patios, and irrigation under Washington contractor registration ${business.license.number}.`}
          </QuickAnswer>
        </header>
      </div>

      <TrustBar />

      <div className="shell grid gap-12 pb-16 pt-16 lg:grid-cols-12 lg:gap-16">
        <div className="min-w-0 space-y-12 lg:col-span-8">
          <Reveal as="section">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-ink-200">
              <Image
                src={teamPhoto.src}
                alt={teamPhoto.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="img-grade object-cover object-top"
              />
            </div>
            <p className="mt-3 text-caption text-ink-500">
              {business.owner} and the Blue Landscaping Services crew.
            </p>
          </Reveal>

          <Reveal as="section">
            <h2 className="text-h2">How we work</h2>
            <div className="mt-5 max-w-prose space-y-4 text-body-lg text-ink-800">
              <p>
                Most yards around here get handed off. Designer to contractor, then to whoever bid
                lowest. By the time somebody is actually digging, the drawing and the price have
                both drifted.
              </p>
              <p>
                We draw it, we price it, we build it. No separate design fee. One phone number if
                something isn&rsquo;t right.
              </p>
              <p>
                {`We've worked that way since ${business.foundedYear}${years >= 5 ? `. That's ${years} years of watching what survives a Puget Sound winter and what doesn't` : ''}. Here's what it taught us. Almost every hardscape failure in this region comes back to base prep or drainage. You can't see either one the day the job finishes.`}
              </p>
            </div>
          </Reveal>

          <Reveal as="section">
            <h2 className="text-h2">What we will not do</h2>
            <div className="mt-5 max-w-prose space-y-4 text-body-lg text-ink-800">
              <p>
                We won&rsquo;t skip the base to hit a number. When another bid comes in a lot
                cheaper on the same scope, the difference is usually excavation depth, compaction,
                or the drain rock behind a wall. You can&rsquo;t inspect any of that once the job
                is done.
              </p>
              <p>
                The photos on this site are our own jobs. No stock imagery. Nobody else&rsquo;s
                yard.
              </p>
              <p>
                We won&rsquo;t quote a wall over 4 feet without engineering. Western Washington
                jurisdictions require it. The crews that build without it are why we get so much
                repair work.
              </p>
            </div>
          </Reveal>

          <Reveal as="section">
            <h2 className="text-h2">Licensing and insurance</h2>
            <div className="mt-5 max-w-prose space-y-4 text-body-lg text-ink-800">
              <p>
                We hold Washington contractor registration{' '}
                <a
                  href={business.license.lookupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand-600 underline underline-offset-4"
                >
                  {business.license.number}
                </a>
                , a $12,000 contractor bond, and $1,000,000 in general liability coverage. Check
                all of it yourself with the Department of Labor &amp; Industries. Do it for us. Do
                it for whoever else is bidding your job.
              </p>
              <p>
                Hire an unregistered contractor in Washington and there&rsquo;s no bond to claim
                against and no lien protection. The lookup takes about thirty seconds. It&rsquo;s
                the most useful thirty seconds you&rsquo;ll spend before you sign anything.
              </p>
            </div>
          </Reveal>

          <Reveal as="section">
            <LinkCluster
              title="What we build"
              links={categories.map((c) => ({ label: c.name, href: `/services/${c.slug}` }))}
            />
          </Reveal>
        </div>

        <aside className="space-y-8 lg:col-span-4">
          <div className="lg:sticky lg:top-28 lg:space-y-8">
            <NapBlock />
            <div className="rounded-sm border border-ink-200 bg-white p-6">
              <h2 className="text-h3">Home turf</h2>
              <p className="mt-3 text-body text-ink-500">
                We work out of Kent. These cities are closest to the shop, so we can get out for a
                walkthrough fastest.
              </p>
              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5">
                {cities
                  .filter((c) => c.tier === 'primary')
                  .map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={cityPath(c.slug)}
                        className="text-caption text-ink-800 underline decoration-ink-200 underline-offset-4 hover:text-brand-600"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>

      <CtaBand />
    </>
  );
}
