/**
 * Phase 9 metadata + JSON-LD builders.
 *
 * Every page's <title>, description, canonical and structured data are produced
 * here so they cannot drift. The brand suffix is appended in exactly one place,
 * which is what stops the double-appended-brand bug from coming back.
 */

import type { Metadata } from 'next';

import { GOOGLE_PROFILE_URL, SITE_URL, business, formattedAddress } from '@/data/business';
import type { Faq, Review } from '@/data/types';

export const BRAND = business.name;

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
  noindex = false,
  publishedTime,
  modifiedTime,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
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
    alternates: { canonical: url },
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
      images: [{ url: ogImage, width: 1200, height: 630, alt: bare }],
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
    '@id': `${SITE_URL}/#organization`,
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
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en-US',
  };
}

/**
 * GeneralContractor (a LocalBusiness subtype). Used on home and every location
 * page, with `areaServed` narrowed to that city.
 *
 * AggregateRating is deliberately absent: it may only be emitted from genuine,
 * attributable reviews, so it is added by `reviewSchema` and nowhere else.
 */
export function localBusinessSchema({
  areaServed,
  path = '/',
}: {
  areaServed?: string[];
  path?: string;
} = {}) {
  return {
    '@type': 'GeneralContractor',
    '@id': `${absoluteUrl(path)}#localbusiness`,
    name: business.legalName,
    image: absoluteUrl('/images/logo.png'),
    url: absoluteUrl(path),
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
    paymentAccepted: business.paymentMethods.join(', '),
    ...(GOOGLE_PROFILE_URL ? { hasMap: GOOGLE_PROFILE_URL } : {}),
    ...(business.profiles.length ? { sameAs: business.profiles.map((p) => p.url) } : {}),
    ...(areaServed?.length
      ? {
          areaServed: areaServed.map((name) => ({
            '@type': 'City',
            name,
            containedInPlace: { '@type': 'State', name: 'Washington' },
          })),
        }
      : {}),
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Contractor License',
      identifier: business.license.number,
      url: business.license.lookupUrl,
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
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: areaServed.map((city) => ({ '@type': 'City', name: city })),
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

export function howToSchema({
  name,
  description,
  path,
  steps,
}: {
  name: string;
  description: string;
  path: string;
  steps: { name: string; text: string }[];
}) {
  return {
    '@type': 'HowTo',
    name,
    description,
    url: absoluteUrl(path),
    step: steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.name,
      text: step.text,
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
    '@id': `${SITE_URL}/#localbusiness`,
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
}: {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  updatedAt?: string;
}) {
  return {
    '@type': 'Article',
    '@id': `${absoluteUrl(path)}#article`,
    headline: title,
    description,
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
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
