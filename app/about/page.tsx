import type { Metadata } from 'next';
import Link from 'next/link';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { CtaBand, LinkCluster, QuickAnswer, TrustBar } from '@/components/blocks';
import { JsonLd } from '@/components/json-ld';
import { NapBlock } from '@/components/nap-block';
import { Reveal } from '@/components/motion/reveal';
import { business, yearsInBusiness } from '@/data/business';
import { categories, cities, cityPath } from '@/data/taxonomy';
import { buildMetadata, graph, localBusinessSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'About Blue Landscaping Services — Kent, WA',
  description:
    'Blue Landscaping Services is a licensed, family-run hardscaping and landscaping contractor in Kent, WA, founded in 2012. In-house design, self-performed install, WA license BLUELLS880K2.',
  path: '/about',
});

export default function AboutPage() {
  const years = yearsInBusiness();

  return (
    <>
      <JsonLd data={graph([localBusinessSchema({ path: '/about', areaServed: cities.map((c) => c.name) })])} />

      <Breadcrumbs crumbs={[{ name: 'About', path: '/about' }]} />

      <div className="shell pb-16 pt-8">
        <header className="max-w-3xl">
          <p className="text-caption font-semibold uppercase tracking-wide text-moss-700">About us</p>
          <h1 className="mt-2 text-h1">A Kent contractor that designs and builds its own work</h1>
          <QuickAnswer>
            {`Blue Landscaping Services is a licensed, family-run hardscaping and landscaping contractor based at ${business.address.street} in Kent, WA. Founded in ${business.foundedYear}, owned by ${business.owner}, and operating under Washington contractor registration ${business.license.number} with a $12,000 bond and $1M liability coverage.`}
          </QuickAnswer>
        </header>
      </div>

      <TrustBar />

      <div className="shell grid gap-12 pb-16 pt-16 lg:grid-cols-12 lg:gap-16">
        <div className="space-y-12 lg:col-span-8">
          <Reveal as="section">
            <h2 className="text-h2">How we work, and why it is set up this way</h2>
            <div className="mt-5 max-w-prose space-y-4 text-body-lg text-stone-800">
              <p>
                Most landscape projects in this market pass through at least three companies: a
                designer who draws it, a general contractor who prices it, and whichever crew bid
                lowest on the day. Every handoff is a place where the drawing and the build drift
                apart, and the homeowner is the one who finds out.
              </p>
              <p>
                We collapse that. Design happens in-house, pricing happens in-house, and the
                hardscape gets built by our own crew. That means what gets drawn is something we
                already know how to construct at the price we quoted, there is no separate design
                fee, and there is nobody to point at if something is not right.
              </p>
              <p>
                {`We have been doing it that way since ${business.foundedYear}${years >= 5 ? `, which is ${years} years of watching what survives Puget Sound winters and what does not` : ''}. The short version of what we learned: almost every hardscape failure in this region traces back to base preparation or drainage, and both of those are invisible the day the job finishes.`}
              </p>
            </div>
          </Reveal>

          <Reveal as="section">
            <h2 className="text-h2">What we will not do</h2>
            <div className="mt-5 max-w-prose space-y-4 text-body-lg text-stone-800">
              <p>
                We will not skip the base to hit a number. If a competing bid is meaningfully
                cheaper on the same scope, the difference is almost always excavation depth,
                compaction, or the drain rock and drain line behind a wall — the three things you
                cannot inspect afterwards and the three things that determine whether the work is
                still flat in ten years.
              </p>
              <p>
                We will not publish other companies&rsquo; photographs, stock imagery, or invented
                reviews. Our portfolio page is empty until our own before-and-after photography is
                shot, and the reviews section stays hidden until real customers have left real
                reviews. That is a slower way to build a website and a faster way to be trusted.
              </p>
              <p>
                We will not quote a wall over 4 feet without engineering. Western Washington
                jurisdictions require it, and the ones that build without it are the reason so much
                of our repair work exists.
              </p>
            </div>
          </Reveal>

          <Reveal as="section">
            <h2 className="text-h2">Licensing and insurance</h2>
            <div className="mt-5 max-w-prose space-y-4 text-body-lg text-stone-800">
              <p>
                We hold Washington contractor registration{' '}
                <a
                  href={business.license.lookupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-moss-700 underline underline-offset-4"
                >
                  {business.license.number}
                </a>
                , a $12,000 contractor bond, and $1,000,000 in general liability coverage. You can
                verify all of it directly with the Department of Labor &amp; Industries, and you
                should — for us and for anyone else you are considering.
              </p>
              <p>
                Hiring an unregistered contractor in Washington means no bond to claim against and
                no lien protection. It takes about thirty seconds to check, and it is the single
                most useful thing a homeowner can do before signing anything.
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
            <div className="rounded-sm border border-stone-200 bg-white p-6">
              <h2 className="text-h3">Home turf</h2>
              <p className="mt-3 text-body text-stone-500">
                We work out of Kent. These are the cities closest to the shop, and where we can get
                out for a walkthrough fastest.
              </p>
              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5">
                {cities
                  .filter((c) => c.tier === 'primary')
                  .map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={cityPath(c.slug)}
                        className="text-caption text-stone-800 underline decoration-stone-200 underline-offset-4 hover:text-moss-700"
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
