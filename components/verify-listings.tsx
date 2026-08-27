import { ExternalLink } from 'lucide-react';

import { GOOGLE_PROFILE_URL, business } from '@/data/business';

/**
 * Public places a stranger can check this crew without taking our word for it.
 *
 * Only verified URLs belong here. Do not add Yelp, Houzz, Angi, Thumbtack, or
 * Nextdoor until we have a real listing URL — a placeholder profile is worse
 * than a missing one, and other companies named "Blue" are not this company.
 */
export function VerifyListings() {
  const listings = [
    GOOGLE_PROFILE_URL
      ? {
          label: 'Google Business Profile',
          detail: 'The map pin, hours, and reviews we cannot edit.',
          href: GOOGLE_PROFILE_URL,
        }
      : null,
    {
      label: `WA license ${business.license.number}`,
      detail: 'Official Labor & Industries contractor search.',
      href: business.license.lookupUrl,
    },
    {
      label: 'Public L&I record',
      detail: 'A third-party copy of the same registration, with a stable link.',
      href: business.license.publicRecordUrl,
    },
    ...business.profiles
      .filter((profile) => {
        if (profile.url === GOOGLE_PROFILE_URL) return false;
        if (profile.url === business.license.lookupUrl) return false;
        if (profile.url === business.license.publicRecordUrl) return false;
        return true;
      })
      .map((profile) => ({
        label: profile.label,
        detail: 'A public identity page for this license.',
        href: profile.url,
      })),
  ].filter((item): item is { label: string; detail: string; href: string } => Boolean(item));

  return (
    <section className="rounded-lg border border-ink-200 bg-white p-8">
      <h2 className="text-h3">Find us and verify us</h2>
      <p className="mt-3 max-w-prose text-body text-ink-500">
        These are the public records for Blue Landscaping Services LLC in Kent.
        We do not invent reviews, and we do not link a directory we have not
        confirmed. Yelp, Houzz, Angi, and Nextdoor get added the day we have a
        real URL — not before.
      </p>
      <ul className="mt-6 divide-y divide-ink-200">
        {listings.map((listing) => (
          <li key={listing.href} className="py-4 first:pt-0 last:pb-0">
            <a
              href={listing.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-[44px] items-start justify-between gap-4"
            >
              <span>
                <span className="block text-body font-semibold text-brand-900 group-hover:text-brand-600">
                  {listing.label}
                </span>
                <span className="mt-1 block text-caption text-ink-500">{listing.detail}</span>
              </span>
              <ExternalLink
                className="mt-1 h-4 w-4 shrink-0 text-ink-500 group-hover:text-brand-600"
                aria-hidden="true"
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
