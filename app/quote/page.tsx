import type { Metadata } from 'next';
import { Clock, MessageSquare, ShieldCheck } from 'lucide-react';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { JsonLd } from '@/components/json-ld';
import { NapBlock } from '@/components/nap-block';
import { QuoteForm } from '@/components/quote/quote-form';
import { buildMetadata, graph, localBusinessSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Free Landscaping & Hardscaping Quote — Kent & Seattle',
  description:
    'Tell us about your project and a Blue Landscaping estimator will call you the same day. Free on-site walkthrough, written scope and a real cost range. Kent, WA and Greater Seattle.',
  path: '/quote',
});

/**
 * Full-page quote form.
 *
 * Exists separately from the modal so paid traffic has a landing page with no
 * navigation competing for the click, and so the form has a shareable URL.
 */
export default function QuotePage() {
  return (
    <>
      <JsonLd data={graph([localBusinessSchema()])} />

      <Breadcrumbs crumbs={[{ name: 'Get a Quote', path: '/quote' }]} />

      <div className="shell grid gap-12 pb-20 pt-8 lg:grid-cols-12 lg:gap-16">
        <div className="min-w-0 lg:col-span-5">
          <h1 className="text-h1">Get a real number, not a ballpark</h1>
          <p className="mt-5 max-w-prose text-body-lg text-ink-500">
            Five quick questions. We call the same day to confirm the details and book a free
            on-site walkthrough — then you get a written scope with materials named and a cost range
            you can plan around.
          </p>

          <ul className="mt-9 space-y-5">
            <Benefit icon={Clock} title="Same-day callback">
              Your request texts and emails the owner the moment you send it. During working hours
              the call usually comes within the hour.
            </Benefit>
            <Benefit icon={MessageSquare} title="No sales pitch">
              You talk to the person who runs the job, not a commissioned closer. If your project is
              not a good fit for us, we will say so.
            </Benefit>
            <Benefit icon={ShieldCheck} title="Licensed, bonded, insured">
              WA contractor license BLUELLS880K2, $12,000 bond, $1M liability. Verify it with L&amp;I
              before you let anyone dig.
            </Benefit>
          </ul>

          <div className="mt-10 max-w-md">
            <NapBlock heading="Prefer to call?" />
          </div>
        </div>

        <div className="min-w-0 lg:col-span-7">
          <QuoteForm />
        </div>
      </div>
    </>
  );
}

function Benefit({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Clock;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
      <div>
        <h2 className="text-body-lg font-semibold text-brand-900">{title}</h2>
        <p className="mt-1 text-body text-ink-500">{children}</p>
      </div>
    </li>
  );
}
