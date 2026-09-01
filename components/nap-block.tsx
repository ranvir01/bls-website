import { Clock, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';

import { GOOGLE_PROFILE_URL, PHONE, TEL_HREF, business, formattedAddress } from '@/data/business';

/**
 * Name / Address / Phone block.
 *
 * Local-search ranking depends on this text matching the Google Business
 * Profile character for character, so every field reads from data/business.ts
 * rather than being typed per page. One edit there updates every surface.
 */
export function NapBlock({ heading = 'Blue Landscaping Services' }: { heading?: string }) {
  return (
    <section className="rounded-sm border border-ink-200 bg-white p-6">
      <h2 className="text-h3">{heading}</h2>

      <address className="mt-4 space-y-3 not-italic">
        <p className="flex items-start gap-2.5 text-body text-ink-800">
          <MapPin className="mt-1 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
          <span>
            {formattedAddress}
            {GOOGLE_PROFILE_URL && (
              <>
                <br />
                <a
                  href={GOOGLE_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-caption text-brand-600 underline underline-offset-2"
                >
                  Open in Google Maps
                </a>
              </>
            )}
          </span>
        </p>
        <p className="flex items-start gap-2.5">
          <Phone className="mt-1 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
          <a href={TEL_HREF} className="text-body font-semibold text-brand-900 hover:text-brand-600">
            {PHONE.display}
          </a>
        </p>
        <p className="flex items-start gap-2.5">
          <Mail className="mt-1 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
          <a
            href={`mailto:${business.email}`}
            className="break-all text-body text-ink-800 hover:text-brand-600"
          >
            {business.email}
          </a>
        </p>
      </address>

      <div className="mt-5 border-t border-ink-200 pt-4">
        <p className="flex items-start gap-2.5 text-caption text-ink-500">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
          <span>
            Open seven days
            <br />
            7am – 6pm
          </span>
        </p>
        <p className="mt-3 flex items-start gap-2.5 text-caption text-ink-500">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
          <span>
            WA Contractor License{' '}
            <a
              href={business.license.lookupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ink-800 underline underline-offset-2"
            >
              {business.license.number}
            </a>
            {' · '}
            <a
              href={business.license.publicRecordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ink-800 underline underline-offset-2"
            >
              Public record
            </a>
            <br />
            $12,000 bond · $1M liability
          </span>
        </p>
      </div>
    </section>
  );
}
