import type { Metadata } from 'next';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { PHONE, business, formattedAddress } from '@/data/business';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description:
    'How Blue Landscaping Services collects, uses and protects the information you submit through this website.',
  path: '/privacy-policy',
});

const UPDATED = 'July 28, 2026';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Breadcrumbs crumbs={[{ name: 'Privacy Policy', path: '/privacy-policy' }]} />

      <article className="shell max-w-prose pb-16 pt-8">
        <h1 className="text-h1">Privacy Policy</h1>
        <p className="mt-3 text-caption text-stone-500">Last updated {UPDATED}</p>

        <div className="mt-8 space-y-6 text-body-lg text-stone-800">
          <p>
            {business.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) operates this website. This
            policy explains what we collect, why, and what we do with it. It is written to be read
            rather than to be impenetrable.
          </p>

          <Section title="What we collect">
            <p>
              When you submit the quote form, the contact form, or the visualizer lead form, we
              collect the information you type: your name, phone number, optional email address,
              city and ZIP code, and whatever you tell us about the project. If you upload a photo
              to the yard visualizer, that photo is included only if you choose to submit the
              design.
            </p>
            <p>
              We also collect standard analytics through Google Analytics 4 — pages viewed, roughly
              where in the world the visit came from, and which link or search brought you here.
              This is aggregate and is not used to identify you personally.
            </p>
          </Section>

          <Section title="Photos you upload to the visualizer">
            <p>
              A photo you upload to the yard visualizer is resized in your browser and sent to our
              server to generate a design. It is held only for the duration of that request and is
              not stored, unless you submit the lead form attached to the design — in which case it
              is sent to our estimator along with your enquiry, so they can see the site before
              calling you.
            </p>
          </Section>

          <Section title="How we use it">
            <p>
              To respond to your enquiry. That means calling or texting the number you gave us,
              emailing you if you provided an address, and preparing a quote. We do not sell your
              information, we do not rent it, and we do not share it with other contractors or lead
              brokers.
            </p>
            <p>
              We use third-party services to make this work: an email provider to deliver
              notifications, an SMS provider to text you and to alert our owner, and Google
              Analytics to understand site traffic. Each of those receives only what it needs to
              perform its function.
            </p>
          </Section>

          <Section title="Text messages">
            <p>
              If you give us your phone number, we may text you about your enquiry and your project.
              Reply STOP to any message to opt out of further texts; that will not affect our
              ability to call you about work in progress. Message and data rates may apply.
            </p>
          </Section>

          <Section title="Cookies">
            <p>
              This site uses cookies set by Google Analytics to measure traffic. The quote form uses
              your browser&rsquo;s sessionStorage to remember your progress if you refresh the page
              — that data stays on your device and is cleared when you submit or close the tab.
            </p>
          </Section>

          <Section title="How long we keep it">
            <p>
              We keep enquiry records for as long as we have an active or reasonably foreseeable
              business relationship, and as long as needed for tax, warranty and legal
              record-keeping. You can ask us to delete your information at any time.
            </p>
          </Section>

          <Section title="Your choices">
            <p>
              You can ask us what we hold about you, ask us to correct it, or ask us to delete it.
              Call {PHONE.display} or email {business.email} and we will handle it. Washington
              residents have additional rights under state law, and we will honour those requests on
              the same basis.
            </p>
          </Section>

          <Section title="Children">
            <p>
              This site is not directed at children under 13 and we do not knowingly collect their
              information.
            </p>
          </Section>

          <Section title="Changes">
            <p>
              If we change this policy we will update the date at the top of this page. Material
              changes will be reflected here before they take effect.
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
