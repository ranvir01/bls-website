/**
 * Single source of truth for every business fact on the site.
 *
 * HONESTY RULE (Phase 0): nothing in this file may be aspirational. If a number
 * is not verifiable, it does not belong here and must not be rendered anywhere.
 * Founded 2012 — there is no "since 1998", "since 2008", or "25 years" claim
 * anywhere in this codebase, and none may be reintroduced.
 */

export const FOUNDED_YEAR = 2012;

/**
 * ONE phone number sitewide. This constant feeds the header, footer, every
 * tel: link, the JSON-LD, and the contact page. Changing it here changes it
 * everywhere — never hardcode a number in a component.
 */
export const PHONE = {
  /** E.164, for tel: hrefs and schema */
  e164: '+12534297052',
  /** Human-readable, for display */
  display: '(253) 429-7052',
  /** Digits only, for analytics labels */
  raw: '2534297052',
} as const;

export const business = {
  name: 'Blue Landscaping Services',
  legalName: 'Blue Landscaping Services LLC',
  shortName: 'Blue Landscaping',
  foundedYear: FOUNDED_YEAR,
  owner: 'Jose Oliva',

  phone: PHONE,
  email: 'blue_landscaping@yahoo.com',

  /** Accepted on-site. Shown in the hero and footer so homeowners know before they call. */
  paymentMethods: ['Zelle', 'Venmo', 'PayPal', 'Cash', 'Visa', 'Mastercard'] as const,

  address: {
    street: '11703 SE 229th Pl',
    city: 'Kent',
    state: 'WA',
    stateName: 'Washington',
    zip: '98031',
    country: 'US',
  },

  /** Approximate coordinates for 11703 SE 229th Pl, Kent WA 98031 */
  geo: {
    latitude: 47.3757,
    longitude: -122.1734,
  },

  license: {
    /** Washington State Department of Labor & Industries contractor registration */
    number: 'BLUELLS880K2',
    authority: 'Washington State Department of Labor & Industries',
    /**
     * L&I's contractor verification search. Deliberately the search page
     * rather than a Detail.aspx deep link: that link is built from a UBI we do
     * not publish, and a dead outbound link on a contractor site reads as an
     * abandoned business. Searching "BLUELLS880K2" here returns the record.
     */
    lookupUrl: 'https://secure.lni.wa.gov/verify/',
    bondAmount: 12000,
    insuranceAmount: 1000000,
  },

  hours: [
    { day: 'Monday', opens: '07:00', closes: '18:00' },
    { day: 'Tuesday', opens: '07:00', closes: '18:00' },
    { day: 'Wednesday', opens: '07:00', closes: '18:00' },
    { day: 'Thursday', opens: '07:00', closes: '18:00' },
    { day: 'Friday', opens: '07:00', closes: '18:00' },
    { day: 'Saturday', opens: '08:00', closes: '16:00' },
    { day: 'Sunday', opens: null, closes: null },
  ],

  /**
   * External profiles. These feed `sameAs` in the Organization JSON-LD, which
   * is how Google ties this site to the Business Profile — a real local-search
   * signal, not decoration. Structured data only; nothing renders them as
   * links, so a share-style URL is fine here.
   *
   * Add Yelp, Houzz, Angi and the rest as those profiles are created.
   */
  profiles: [
    {
      label: 'Google Business Profile',
      // Short link as supplied. Replacing it with the canonical
      // google.com/maps/place/... URL is a small improvement — see docs/GO-LIVE.md.
      url: 'https://share.google/udIRuWuNg13lXgC5t',
    },
  ] as { label: string; url: string }[],
} as const;

/** Google Business Profile URL, when one is listed. */
export const googleProfileUrl =
  business.profiles.find((p) => /google/i.test(p.label))?.url ?? null;

export const SITE_URL = 'https://bluelandscapingservices.com';

/** Years in business, computed — never hardcoded, never rounded up. */
export function yearsInBusiness(now: Date = new Date()): number {
  return now.getFullYear() - FOUNDED_YEAR;
}

/** `tel:` href for any click-to-call element. */
export const TEL_HREF = `tel:${PHONE.e164}`;
/** `sms:` href for the text-us action. */
export const SMS_HREF = `sms:${PHONE.e164}`;

export const formattedAddress = `${business.address.street}, ${business.address.city}, ${business.address.state} ${business.address.zip}`;
