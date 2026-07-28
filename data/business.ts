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
  e164: '+12532170814',
  /** Human-readable, for display */
  display: '(253) 217-0814',
  /** Digits only, for analytics labels */
  raw: '2532170814',
} as const;

export const business = {
  name: 'Blue Landscaping Services',
  legalName: 'Blue Landscaping Services LLC',
  shortName: 'Blue Landscaping',
  foundedYear: FOUNDED_YEAR,
  owner: 'Jose Oliva',

  phone: PHONE,
  email: 'blue_landscaping@yahoo.com',

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
    lookupUrl:
      'https://secure.lni.wa.gov/verify/Detail.aspx?UBI=&LIC=BLUELLS880K2&SAW=',
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
   * Social / external profiles. Every entry here is rendered as an outbound
   * link and is checked by the link checker — only add a URL once it resolves.
   */
  profiles: [] as { label: string; url: string }[],
} as const;

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
