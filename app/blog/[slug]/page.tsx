import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { CtaBand, FaqList, LinkCluster, QuickAnswer } from '@/components/blocks';
import { JsonLd } from '@/components/json-ld';
import { blogPosts, getPost } from '@/data/content/blog';
import type { BlogBlock } from '@/data/types';
import { cityBySlug, cityPath, serviceBySlug, servicePath } from '@/data/taxonomy';
import {
  articleSchema,
  breadcrumbSchema,
  buildMetadata,
  faqSchema,
  graph,
  localBusinessSchema,
} from '@/lib/seo';

interface Params {
  params: { slug: string };
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};

  return buildMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/blog/${post.slug}`,
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
  });
}

export default function BlogPostPage({ params }: Params) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const path = `/blog/${post.slug}`;

  const serviceLinks = post.relatedServices
    .map((slug) => serviceBySlug.get(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
    .map((s) => ({ label: s.name, href: servicePath(s.slug) }));

  const cityLinks = post.relatedCities
    .map((slug) => cityBySlug.get(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c))
    .map((c) => ({ label: `Landscaping in ${c.name}`, href: cityPath(c.slug) }));

  const others = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const crumbs = [
    { name: 'Guides', path: '/blog' },
    { name: post.title, path },
  ];

  return (
    <>
      <JsonLd
        data={graph([
          articleSchema({
            title: post.title,
            description: post.metaDescription,
            path,
            publishedAt: post.publishedAt,
            updatedAt: post.updatedAt,
          }),
          localBusinessSchema({ path }),
          faqSchema(post.faqs),
          breadcrumbSchema([{ name: 'Home', path: '/' }, ...crumbs]),
        ])}
      />

      <Breadcrumbs crumbs={crumbs} />

      <article className="shell pb-16 pt-8">
        <header className="max-w-prose">
          <p className="text-caption text-ink-500">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            {' · '}
            {post.readingMinutes} min read
          </p>
          <h1 className="mt-3 text-h1">{post.title}</h1>
          <QuickAnswer>{post.quickAnswer}</QuickAnswer>
        </header>

        <div className="mt-10 min-w-0 max-w-prose">
          {post.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        <div className="mt-16 max-w-prose">
          <FaqList faqs={post.faqs} />
        </div>

        <div className="mt-16 grid gap-10 border-t border-ink-200 pt-12 md:grid-cols-3">
          <LinkCluster title="Related services" links={serviceLinks} />
          <LinkCluster title="Where we work" links={cityLinks} />
          <LinkCluster
            title="More guides"
            links={others.map((p) => ({ label: p.title, href: `/blog/${p.slug}` }))}
          />
        </div>
      </article>

      <CtaBand />
    </>
  );
}

/**
 * Renders one structured content block.
 *
 * Posts are typed data rather than MDX, which keeps every article fully
 * server-rendered with no client-side markdown parser and no runtime cost.
 */
function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case 'h2':
      return <h2 className="mt-12 text-h2">{block.text}</h2>;

    case 'h3':
      return <h3 className="mt-8 text-h3">{block.text}</h3>;

    case 'p':
      return <p className="mt-4 text-body-lg text-ink-800">{block.text}</p>;

    case 'ul':
      return (
        <ul className="mt-4 list-disc space-y-2 pl-6 text-body-lg text-ink-800 marker:text-brand-600">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );

    case 'ol':
      return (
        <ol className="mt-4 list-decimal space-y-2 pl-6 text-body-lg text-ink-800 marker:text-brand-600">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      );

    case 'callout':
      return (
        <aside className="mt-8 border-l-2 border-leaf-600 bg-white py-4 pl-5 pr-4">
          <p className="eyebrow text-leaf-600">
            {block.title}
          </p>
          <p className="mt-2 text-body text-ink-800">{block.text}</p>
        </aside>
      );

    case 'table':
      return (
        <div className="mt-8">
          {/* Wide tables scroll in their own container — the page body must
              never scroll horizontally on a 360px screen. */}
          <div className="overflow-x-auto rounded-sm border border-ink-200 bg-white">
            <table className="w-full min-w-[32rem] border-collapse text-left">
              {block.caption && (
                <caption className="border-b border-ink-200 px-4 py-3 text-left text-caption text-ink-500">
                  {block.caption}
                </caption>
              )}
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50">
                  {block.head.map((cell) => (
                    <th
                      key={cell}
                      scope="col"
                      className="px-4 py-3 eyebrow text-ink-500"
                    >
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, i) => (
                  <tr key={i} className="border-b border-ink-200 last:border-0">
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={
                          j === 0
                            ? 'px-4 py-3 text-body font-medium text-brand-900'
                            : 'px-4 py-3 text-body text-ink-800'
                        }
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
  }
}

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export const dynamicParams = false;
