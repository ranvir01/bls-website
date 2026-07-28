import type { Metadata } from 'next';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { PHONE, business, formattedAddress } from '@/data/business';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Service',
  description:
    'Terms governing use of the Blue Landscaping Services website, including the yard visualizer tool and published cost ranges.',
  path: '/terms-of-service',
});

const UPDATED = 'July 28, 2026';

export default function TermsPage() {
  return (
    <>
      <Breadcrumbs crumbs={[{ name: 'Terms of Service', path: '/terms-of-service' }]} />

      <article className="shell max-w-prose pb-16 pt-8">
        <h1 className="text-h1">Terms of Service</h1>
        <p className="mt-3 text-caption text-stone-500">Last updated {UPDATED}</p>

        <div className="mt-8 space-y-6 text-body-lg text-stone-800">
          <p>
            These terms govern your use of this website, operated by {business.legalName}. By using
            the site you accept them.
          </p>

          <Section title="Cost ranges published on this site">
            <p>
              Every price on this site is a typical installed range for the Puget Sound market. It
              is not a quote, not an offer, and not a guarantee of price. Actual cost depends on
              site conditions we cannot see from a web page — excavation depth, access, soil, spoil
              removal, drainage and permitting among them.
            </p>
            <p>
              A binding number comes from a written proposal following an on-site walkthrough, and
              nothing on this site substitutes for one.
            </p>
          </Section>

          <Section title="The yard visualizer">
            <p>
              The visualizer produces AI-generated design concepts. Every image it produces is
              labelled as a design concept and is not a photograph of completed work. We restrict
              the generator to materials and plant species we actually install, so what it shows is
              buildable — but we do not warrant that a finished installation will match a generated
              image exactly.
            </p>
            <p>
              Final layout is confirmed at the on-site walkthrough, where grading, drainage,
              permitting requirements and plant availability all affect the outcome. Quantities and
              cost ranges derived from a generated design are estimates only.
            </p>
            <p>
              Use of the tool is subject to rate limits. You may not use automated means to generate
              images at scale, and you may not use generated output to represent work as your own or
              as another company&rsquo;s.
            </p>
          </Section>

          <Section title="Contractor licensing">
            <p>
              {business.legalName} holds Washington contractor registration{' '}
              {business.license.number}, a $12,000 bond and $1,000,000 general liability coverage.
              Registration status can be verified with the Washington State Department of Labor
              &amp; Industries, and we encourage you to do so.
            </p>
          </Section>

          <Section title="Content and intellectual property">
            <p>
              Text, photographs, designs and code on this site belong to {business.legalName} unless
              stated otherwise. You may not reproduce substantial portions of it commercially
              without permission. Photographs of completed work are our own; we do not publish other
              companies&rsquo; project photography.
            </p>
          </Section>

          <Section title="Accuracy of information">
            <p>
              We take reasonable care to keep permitting requirements, cost ranges and technical
              guidance on this site accurate, but codes and prices change. Anything on this site
              concerning permits, engineering thresholds or code requirements should be confirmed
              with the relevant jurisdiction before you rely on it. Guidance published here is
              general and is not engineering advice for a specific site.
            </p>
          </Section>

          <Section title="Limitation of liability">
            <p>
              This site is provided as is. To the extent permitted by Washington law, we are not
              liable for indirect or consequential losses arising from use of the site or reliance
              on information published here. Nothing in these terms limits liability that cannot
              lawfully be limited, and nothing here affects your rights under any signed contract
              for work performed.
            </p>
          </Section>

          <Section title="Governing law">
            <p>
              These terms are governed by the laws of the State of Washington, and any dispute is
              subject to the jurisdiction of the courts of King County, Washington.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              {business.legalName}
              <br />
              {formattedAddress}
              <br />
              {PHONE.display}
              <br />
              {business.email}
            </p>
          </Section>
        </div>
      </article>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mt-10 text-h3">{title}</h2>
      <div className="mt-3 space-y-4">{children}</div>
    </section>
  );
}
