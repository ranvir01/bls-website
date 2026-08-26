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
                A lot of yards around here get handed from a designer to a contractor to whoever
                bid lowest. By the time someone is digging, the drawing and the price have already
                drifted.
              </p>
              <p>
                We skip that. We draw it, we price it, and our crew builds it. No separate design
                fee, and nobody else to call if something is not right.
              </p>
              <p>
                {`We have been doing it that way since ${business.foundedYear}${years >= 5 ? `, which is ${years} years of watching what survives Puget Sound winters and what does not` : ''}. The short version of what we learned: almost every hardscape failure in this region traces back to base preparation or drainage, and both of those are invisible the day the job finishes.`}
              </p>
            </div>
          </Reveal>

          <Reveal as="section">
            <h2 className="text-h2">What we will not do</h2>
            <div className="mt-5 max-w-prose space-y-4 text-body-lg text-ink-800">
              <p>
                We will not skip the base to hit a number. If a competing bid is a lot cheaper on
                the same scope, the difference is almost always excavation depth, compaction, or
                the drain rock behind a wall — the three things you cannot inspect afterwards.
              </p>
              <p>
                We put our own job photos on this site. The portfolio is real work we built, not
                stock imagery and not someone else&rsquo;s yard.
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
            <div className="rounded-sm border border-ink-200 bg-white p-6">
              <h2 className="text-h3">Home turf</h2>
              <p className="mt-3 text-body text-ink-500">
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
