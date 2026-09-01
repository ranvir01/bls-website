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
    /** Unified Business Identifier — public on the L&I and SOS records. */
    ubi: '603206072',
    authority: 'Washington State Department of Labor & Industries',
    /** Official Corporations & Charities Filing System search. No deep link. */
    sosSearchUrl: 'https://ccfs.sos.wa.gov/#/BusinessSearch',
    /**
     * L&I's contractor verification search. Deliberately the search page
     * rather than a Detail.aspx deep link — those URLs rotate, and a dead
     * outbound link on a contractor site reads as an abandoned business.
     * Searching BLUELLS880K2 or UBI 603206072 here returns the record.
     */
    lookupUrl: 'https://secure.lni.wa.gov/verify/',
    /**
     * Third-party copy of the same L&I record, with a stable deep link.
     * Official verification is still lookupUrl. Scraped pages can lag the
     * state (phone and dates) — keep PHONE in this file as the number to use,
     * and update the L&I / SOS records to match it.
     */
    publicRecordUrl: 'https://opengovwa.com/labor-industries-contractor/BLUELLS880K2',
    bondAmount: 12000,
    insuranceAmount: 1000000,
  },

  /**
   * Open seven days, the same hours every day. Confirmed by the owner.
   *
   * These must match the Google Business Profile exactly — Google cross-checks
   * hours between the profile and the site, and a mismatch is a live local-SEO
   * penalty as well as a customer standing in a driveway on a Sunday.
   */
  hours: [
    { day: 'Monday', opens: '07:00', closes: '18:00' },
    { day: 'Tuesday', opens: '07:00', closes: '18:00' },
    { day: 'Wednesday', opens: '07:00', closes: '18:00' },
    { day: 'Thursday', opens: '07:00', closes: '18:00' },
    { day: 'Friday', opens: '07:00', closes: '18:00' },
    { day: 'Saturday', opens: '07:00', closes: '18:00' },
    { day: 'Sunday', opens: '07:00', closes: '18:00' },
  ],

  /**
   * External profiles. These feed `sameAs` in the Organization JSON-LD, which
   * is how Google ties this site to the Business Profile — a real local-search
   * signal, not decoration. Structured data only; nothing renders them as
   * links, so a share-style URL is fine here.
   *
   * Add Yelp, Houzz, Angi, Apple Business Connect and the rest only after we
   * have a real listing URL. Other companies named "Blue Landscapes" are not
   * this company — do not copy their profiles.
   */
  profiles: [
    {
      label: 'Google Business Profile',
      // Short link as supplied by the owner. Replacing it with the canonical
      // google.com/maps/place/... URL is a small improvement — see docs/GO-LIVE.md.
      url: 'https://share.google/rqx6Hs2RgAzSXmHuz',
    },
    {
      label: 'WA L&I contractor record',
      url: 'https://opengovwa.com/labor-industries-contractor/BLUELLS880K2',
    },
    {
      label: 'National Contractor Index',
      url: 'https://nationalcontractorindex.com/contractors/blue-landscaping-services-llc/',
    },
  ] as { label: string; url: string }[],
} as const;

/**
 * The Google Business Profile, as a link the site can actually render.
 *
 * For a local contractor the Google profile is where the reviews live and
 * where the map pin is, so burying it in `sameAs` and never linking to it
 * wastes the strongest trust signal available. Null-safe: every consumer must
 * handle the profile not existing rather than rendering a dead link.
 */
export const GOOGLE_PROFILE_URL: string | null =
  business.profiles.find((p) => p.label === 'Google Business Profile')?.url ?? null;

/**
 * Formspree, where the leads actually land.
 *
 * This is the form the business has always used — the previous site posted the
 * quote modal and the contact form straight to it. The rebuild replaced it with
 * an SMTP-and-Twilio pipeline, which is better in every way except the one that
 * matters: SMTP and Twilio need credentials in the Netlify environment, and
 * until those exist every channel fails and the lead reaches nobody. Formspree
 * needs no configuration at all. It is the floor under the other two.
 *
 * Override with FORMSPREE_ENDPOINT if the form ID ever changes; there is no
 * reason to redeploy for that.
 */
export const FORMSPREE_ENDPOINT =
  process.env.FORMSPREE_ENDPOINT ?? 'https://formspree.io/f/xzzdagdw';

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
