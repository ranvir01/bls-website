import { Clock, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';

import { PHONE, TEL_HREF, business, formattedAddress } from '@/data/business';

/**
 * Name / Address / Phone block.
 *
 * Local-search ranking depends on this text matching the Google Business
 * Profile character for character, so every field reads from data/business.ts
 * rather than being typed per page. One edit there updates every surface.
 */
export function NapBlock({ heading = 'Blue Landscaping Services' }: { heading?: string }) {
  return (
    <section className="rounded-sm border border-stone-200 bg-white p-6">
      <h2 className="text-h3">{heading}</h2>

      <address className="mt-4 space-y-3 not-italic">
        <p className="flex items-start gap-2.5 text-body text-stone-800">
          <MapPin className="mt-1 h-4 w-4 shrink-0 text-moss-700" aria-hidden="true" />
          <span>{formattedAddress}</span>
        </p>
        <p className="flex items-start gap-2.5">
          <Phone className="mt-1 h-4 w-4 shrink-0 text-moss-700" aria-hidden="true" />
          <a href={TEL_HREF} className="text-body font-semibold text-stone-950 hover:text-moss-700">
            {PHONE.display}
          </a>
        </p>
        <p className="flex items-start gap-2.5">
          <Mail className="mt-1 h-4 w-4 shrink-0 text-moss-700" aria-hidden="true" />
          <a
            href={`mailto:${business.email}`}
            className="break-all text-body text-stone-800 hover:text-moss-700"
          >
            {business.email}
          </a>
        </p>
      </address>

      <div className="mt-5 border-t border-stone-200 pt-4">
        <p className="flex items-start gap-2.5 text-caption text-stone-500">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-moss-700" aria-hidden="true" />
          <span>
            Mon–Fri 7am–6pm · Sat 8am–4pm
            <br />
            Closed Sunday
          </span>
        </p>
        <p className="mt-3 flex items-start gap-2.5 text-caption text-stone-500">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-moss-700" aria-hidden="true" />
          <span>
            WA Contractor License{' '}
            <a
              href={business.license.lookupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-stone-800 underline underline-offset-2"
            >
              {business.license.number}
            </a>
            <br />
            $12,000 bond · $1M liability
          </span>
        </p>
      </div>
    </section>
  );
}
