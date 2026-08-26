import type { Metadata } from 'next';
import Link from 'next/link';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { CtaBand } from '@/components/blocks';
import { JsonLd } from '@/components/json-ld';
import { Reveal } from '@/components/motion/reveal';
import { blogPosts } from '@/data/content/blog';
import { buildMetadata, graph, localBusinessSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Guides — Costs, Permits & PNW Landscaping Advice',
  description:
    'Straight answers on retaining wall costs, paver patio pricing, permits in Kent, sprinkler winterizing and drainage for Western Washington yards.',
  path: '/blog',
});

export default function BlogIndexPage() {
  return (
    <>
      <JsonLd data={graph([localBusinessSchema({ path: '/blog' })])} />

      <Breadcrumbs crumbs={[{ name: 'Guides', path: '/blog' }]} />

      <div className="shell pb-16 pt-8">
        <header className="max-w-3xl">
          <p className="eyebrow text-brand-600">Guides</p>
          <h1 className="mt-2 text-h1">Real numbers and straight answers</h1>
          <p className="mt-5 text-body-lg text-ink-500">
            What things actually cost in King County, which permits you actually need, and what
            actually works in Puget Sound soil. Written by the crew that does the work.
          </p>
        </header>

        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {blogPosts.map((post, i) => (
            <Reveal as="li" key={post.slug} delay={Math.min(i * 0.05, 0.2)}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-sm border border-ink-200 bg-white p-6 transition-shadow hover:shadow-card"
              >
                <p className="text-caption text-ink-500">
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                  {' · '}
                  {post.readingMinutes} min read
                </p>
                <h2 className="mt-2 text-h3 group-hover:text-brand-600">{post.title}</h2>
                <p className="mt-3 flex-1 text-body text-ink-500">{post.excerpt}</p>
                <span className="mt-4 text-caption font-semibold text-brand-600 underline underline-offset-4">
                  Read the guide
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>

      <CtaBand />
    </>
  );
}

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
