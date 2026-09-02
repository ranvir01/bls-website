/**
 * Phase 9 metadata + JSON-LD builders.
 *
 * Every page's <title>, description, canonical and structured data are produced
 * here so they cannot drift. The brand suffix is appended in exactly one place,
 * which is what stops the double-appended-brand bug from coming back.
 */

import type { Metadata } from 'next';

import { SITE_URL, business, formattedAddress } from '@/data/business';
import { cities } from '@/data/taxonomy';
import type { Faq, Review } from '@/data/types';

export const BRAND = business.name;

/**
 * One @id for the business, everywhere.
 *
 * It used to be `${page}#localbusiness`, which told a crawler the site was 94
 * different contractors that happened to share a phone number — and meant the
 * AggregateRating node (which always pointed at the homepage form) would have
 * described a second, address-less business on every page but `/`.
 */
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const LOCAL_BUSINESS_ID = `${SITE_URL}/#localbusiness`;

/** Absolute URL for any site-relative path. */
export function absoluteUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Build page metadata. `title` must NOT include the brand — this appends it
 * once. Passing an already-branded title is the bug this function exists to
 * prevent, so it strips a trailing brand if one slips through.
 */
export function buildMetadata({
  title,
  description,
  path,
  image = '/images/og-default.jpg',
  imageWidth = 1200,
  imageHeight = 630,
  noindex = false,
  publishedTime,
  modifiedTime,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  /**
   * Real pixel size of `image`. The defaults describe og-default.jpg only;
   * a page that passes its own photo passes its own dimensions, or the
   * scrapers are told a 1400x1867 portrait is a 1200x630 landscape and crop
   * it accordingly.
   */
  imageWidth?: number;
  imageHeight?: number;
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
}): Metadata {
  const bare = title.replace(new RegExp(`\\s*\\|\\s*${BRAND}\\s*$`), '').trim();
  const full = `${bare} | ${BRAND}`;
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image);

  return {
    // `absolute` bypasses the root layout's `%s | Brand` template. Returning a
    // plain string here would let the template append the brand a second time,
    // which is the double-brand bug this function exists to prevent — and which
    // the previous site shipped on every page.
    title: { absolute: full },
    description,
    // A canonical on a noindex page is a contradiction (it nominates a URL
    // for the index while asking to be left out), and the 404 route would
    // otherwise inherit the homepage's `/` from the root layout.
    alternates: { canonical: noindex ? null : url },
    robots: noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    openGraph: {
      type: publishedTime ? 'article' : 'website',
      locale: 'en_US',
      siteName: BRAND,
      url,
      title: full,
      description,
      images: [{ url: ogImage, width: imageWidth, height: imageHeight, alt: bare }],
      ...(publishedTime ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: full,
      description,
      images: [ogImage],
    },
  };
}

// ── JSON-LD builders ─────────────────────────────────────────────────────────

const DAY_MAP: Record<string, string> = {
  Monday: 'Mo',
  Tuesday: 'Tu',
  Wednesday: 'We',
  Thursday: 'Th',
  Friday: 'Fr',
  Saturday: 'Sa',
  Sunday: 'Su',
};

function openingHoursSpec() {
  return business.hours
    .filter((h) => h.opens && h.closes)
    .map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${h.day}`,
      opens: h.opens,
      closes: h.closes,
    }));
}

export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: business.legalName,
    alternateName: business.name,
    url: SITE_URL,
    logo: absoluteUrl('/images/logo.png'),
    telephone: business.phone.e164,
    email: business.email,
    foundingDate: String(business.foundedYear),
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.zip,
      addressCountry: business.address.country,
    },
    ...(business.profiles.length ? { sameAs: business.profiles.map((p) => p.url) } : {}),
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: BRAND,
    publisher: { '@id': ORGANIZATION_ID },
    inLanguage: 'en-US',
  };
}

const CITY_TIER = new Map(cities.map((c) => [c.name, c.tier]));

/**
 * `areaServed` entries from a list of city names.
 *
 * The four Seattle entries in the taxonomy are neighbourhoods, not cities —
 * declaring "Ballard, Washington" as a City is a claim no gazetteer agrees
 * with, and the site's headline keyword, Seattle itself, never appeared at
 * all. A neighbourhood is emitted as a Place inside the City of Seattle, and
 * Seattle is added once whenever any of them is present.
 */
function areaServedNodes(names: string[]) {
  const state = { '@type': 'State', name: 'Washington' };
  const seattle = { '@type': 'City', name: 'Seattle', containedInPlace: state };
  const nodes: object[] = [];
  let hasNeighbourhood = false;

  for (const name of names) {
    if (CITY_TIER.get(name) === 'seattle') {
      hasNeighbourhood = true;
      nodes.push({ '@type': 'Place', name, containedInPlace: seattle });
    } else {
      nodes.push({ '@type': 'City', name, containedInPlace: state });
    }
  }

  if (hasNeighbourhood && !names.includes('Seattle')) nodes.push(seattle);
  return nodes;
}

/**
 * GeneralContractor (a LocalBusiness subtype). Used on home and every location
 * page, with `areaServed` narrowed to that city.
 *
 * The node has one stable @id on every page and points at the Organization
 * node from the root layout, so the two resolve to a single business rather
 * than two unrelated entities that happen to share a name.
 *
 * AggregateRating is deliberately absent: it may only be emitted from genuine,
 * attributable reviews, so it is added by `reviewSchema` and nowhere else.
 */
export function localBusinessSchema({ areaServed }: { areaServed?: string[] } = {}) {
  return {
    '@type': 'GeneralContractor',
    '@id': LOCAL_BUSINESS_ID,
    name: business.legalName,
    image: absoluteUrl('/images/logo.png'),
    url: SITE_URL,
    parentOrganization: { '@id': ORGANIZATION_ID },
    telephone: business.phone.e164,
    email: business.email,
    priceRange: '$$',
    foundingDate: String(business.foundedYear),
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.zip,
      addressCountry: business.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    openingHoursSpecification: openingHoursSpec(),
    ...(areaServed?.length ? { areaServed: areaServedNodes(areaServed) } : {}),
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Contractor License',
      identifier: business.license.number,
      recognizedBy: { '@type': 'Organization', name: business.license.authority },
    },
  };
}

export function serviceSchema({
  name,
  description,
  path,
  areaServed,
}: {
  name: string;
  description: string;
  path: string;
  areaServed: string[];
}) {
  return {
    '@type': 'Service',
    '@id': `${absoluteUrl(path)}#service`,
    name,
    description,
    serviceType: name,
    url: absoluteUrl(path),
    provider: { '@id': LOCAL_BUSINESS_ID },
    areaServed: areaServedNodes(areaServed),
  };
}

export function faqSchema(faqs: Faq[]) {
  if (!faqs.length) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

/**
 * Review + AggregateRating. Returns null for an empty list — an aggregate
 * rating with no underlying reviews is exactly the fabrication Phase 0 bans.
 */
export function reviewSchema(reviews: Review[]) {
  if (!reviews.length) return null;

  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);

  return {
    '@type': 'GeneralContractor',
    // Same @id as localBusinessSchema, so the rating merges into the node
    // that carries the address, phone and licence instead of standing alone.
    '@id': LOCAL_BUSINESS_ID,
    name: business.legalName,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: (sum / reviews.length).toFixed(1),
      reviewCount: reviews.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      datePublished: r.publishedAt,
      reviewBody: r.text,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
      ...(r.sourceUrl ? { url: r.sourceUrl } : {}),
    })),
  };
}

export function articleSchema({
  title,
  description,
  path,
  publishedAt,
  updatedAt,
  image = '/images/og-default.jpg',
}: {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  updatedAt?: string;
  /** Site-relative path of the article's lead photo. Google requires one. */
  image?: string;
}) {
  return {
    '@type': 'Article',
    '@id': `${absoluteUrl(path)}#article`,
    headline: title,
    description,
    image: absoluteUrl(image),
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    author: { '@id': ORGANIZATION_ID },
    publisher: { '@id': ORGANIZATION_ID },
    mainEntityOfPage: absoluteUrl(path),
  };
}

/** Wrap a set of schema nodes into one @graph document. */
export function graph(nodes: (object | null)[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.filter(Boolean),
  };
}

export { formattedAddress };
