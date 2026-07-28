import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/data/business';

/**
 * Phase 9 robots policy.
 *
 * AI crawlers are explicitly allowed. Blocking them is the default posture of
 * most contractor sites and it is the wrong call here: answer engines are a
 * growing share of "who does retaining walls in Kent" queries, and being
 * absent from them is a pure loss with no upside.
 *
 * Only /api/ and the internal styleguide are disallowed.
 */
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Bytespider',
  'CCBot',
  'meta-externalagent',
];

const SEARCH_CRAWLERS = ['Googlebot', 'Bingbot', 'DuckDuckBot', 'Applebot', 'Slurp'];

const DISALLOW = ['/api/', '/styleguide'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: DISALLOW },
      ...[...SEARCH_CRAWLERS, ...AI_CRAWLERS].map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: DISALLOW,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
