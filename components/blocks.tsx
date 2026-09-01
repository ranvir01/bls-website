import Link from 'next/link';
import { ArrowRight, Check, Phone, ShieldCheck } from 'lucide-react';

import { PHONE, TEL_HREF, GOOGLE_PROFILE_URL, business } from '@/data/business';
import { allWorkPhotos } from '@/data/work-photos';
import { projects } from '@/data/projects';
import type { CostRow, Faq } from '@/data/types';
import { cn } from '@/lib/utils';

import { Reveal } from './motion/reveal';
import { Button } from './ui/button';

/**
 * Shared page blocks.
 *
 * Server components throughout — none of these need interactivity, so none of
 * them cost client JavaScript. Anything here that does need state lives in its
 * own 'use client' file instead.
 */

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = 'left',
  as: Heading = 'h2',
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
}) {
  return (
    <div className={cn('max-w-prose', align === 'center' && 'mx-auto text-center')}>
      {eyebrow && <p className="mb-3 eyebrow text-brand-600">{eyebrow}</p>}
      <Heading className={Heading === 'h1' ? 'text-h1' : 'text-h2'}>{title}</Heading>
      {lead && <p className="mt-4 text-body-lg text-ink-500">{lead}</p>}
    </div>
  );
}

/**
 * The Quick Answer block. 40–60 words, present on every service, location and
 * blog page. This is the unit AI search engines extract and cite, so it is
 * rendered high in the document and marked up as a standalone paragraph rather
 * than being buried in prose.
 */
export function QuickAnswer({ children }: { children: string }) {
  return (
    <div className="quick-answer my-8">
      <p className="mb-1 eyebrow text-brand-600">
        Quick answer
      </p>
      <p>{children}</p>
    </div>
  );
}

export function Prose({ paragraphs, className }: { paragraphs: string[]; className?: string }) {
  return (
    <div className={cn('max-w-prose space-y-4 text-body-lg text-ink-800', className)}>
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

export function CheckList({ items, columns = 1 }: { items: string[]; columns?: 1 | 2 }) {
  return (
    <ul className={cn('grid gap-3', columns === 2 && 'sm:grid-cols-2')}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-body text-ink-800">
          {/* leaf, not brand. Green is the semantic colour now — this tick
              means "included", and it is the one place the landscaping half of
              the name gets to show. */}
          <Check className="mt-1 h-4 w-4 shrink-0 text-leaf-600" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Cost table. Highly extractable by AI engines and by far the most-read block
 * on a service page — homeowners scroll straight to it.
 */
export function CostTable({
  rows,
  note,
  caption,
}: {
  rows: CostRow[];
  note?: string;
  caption?: string;
}) {
  if (!rows.length) return null;

  return (
    <div>
      {/* Wide tables scroll inside their own container so the page body never
          scrolls horizontally on a 360px phone. */}
      <div className="overflow-x-auto rounded-sm border border-ink-200 bg-white">
        <table className="w-full min-w-[34rem] border-collapse text-left">
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead>
            <tr className="border-b border-ink-200 bg-ink-50">
              <th scope="col" className="px-4 py-3 eyebrow text-ink-500">
                Item
              </th>
              <th scope="col" className="px-4 py-3 eyebrow text-ink-500">
                Typical range
              </th>
              <th scope="col" className="px-4 py-3 eyebrow text-ink-500">
                Unit
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.item} className="border-b border-ink-200 last:border-0">
                <th scope="row" className="px-4 py-3 text-body font-medium text-brand-900">
                  {row.item}
                  {row.notes && <span className="mt-0.5 block text-caption font-normal text-ink-500">{row.notes}</span>}
                </th>
                <td className="nums whitespace-nowrap px-4 py-3 text-body font-semibold text-brand-800">
                  {row.range}
                </td>
                <td className="px-4 py-3 text-caption text-ink-500">{row.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && <p className="mt-3 max-w-prose text-caption text-ink-500">{note}</p>}
    </div>
  );
}

/**
 * FAQ list with deep-linkable anchors.
 *
 * Rendered with <details>/<summary> rather than a JS accordion so every answer
 * is in the initial HTML and readable with JavaScript disabled — which is the
 * whole point of pairing this with FAQPage schema.
 */
export function FaqList({ faqs, title = 'Frequently asked questions' }: { faqs: Faq[]; title?: string }) {
  if (!faqs.length) return null;

  return (
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-h2">
        {title}
      </h2>
      <div className="mt-6 divide-y divide-ink-200 border-y border-ink-200">
        {faqs.map((faq) => {
          const id = slugifyQuestion(faq.question);
          return (
            <details key={faq.question} id={id} className="group py-4">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-body-lg font-medium text-brand-900 marker:hidden">
                {faq.question}
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-2.5 w-2.5 shrink-0 rotate-45 border-b-2 border-r-2 border-ink-500 transition-transform duration-200 group-open:-rotate-135"
                />
              </summary>
              <p className="mt-3 max-w-prose text-body text-ink-800">{faq.answer}</p>
            </details>
          );
        })}
      </div>
    </section>
  );
}

export function slugifyQuestion(q: string): string {
  return (
    'faq-' +
    q
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .slice(0, 60)
  );
}

/**
 * Trust bar. Every claim here is verifiable, and the one that matters most is
 * a link.
 *
 * With zero published reviews, a credential a stranger can check in one tap is
 * worth more than any number of testimonials — and it is the thing a competitor
 * with five hundred reviews cannot copy off you. So the licence number is an
 * outbound link to L&I rather than inert text, and each item leads with a
 * countable fact instead of an adjective.
 */
export function TrustBar() {
  const items: { label: string; detail: string; href?: string }[] = [
    {
      label: `WA Lic. ${business.license.number}`,
      detail: 'Check it with L&I',
      href: business.license.lookupUrl,
    },
    {
      label: `$${business.license.bondAmount.toLocaleString('en-US')} bond · $1M liability`,
      detail: 'Bonded and insured',
    },
    ...(GOOGLE_PROFILE_URL
      ? [
          {
            label: 'Find us on Google',
            detail: 'Map pin, hours, reviews we cannot edit',
            href: GOOGLE_PROFILE_URL,
          },
        ]
      : []),
    {
      label: `${allWorkPhotos.length + projects.length} photos of our own work`,
      detail: 'No stock imagery anywhere',
      href: '/portfolio',
    },
  ];

  return (
    <section aria-label="Credentials" className="border-b border-ink-200 bg-white">
      <div className="shell grid grid-cols-2 gap-x-6 gap-y-5 py-8 lg:grid-cols-4">
        {items.map((item) => {
          const body = (
            <>
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-leaf-600" aria-hidden="true" />
              <span>
                <span className="block text-caption font-semibold text-brand-900">{item.label}</span>
                <span className="block text-caption text-ink-500">{item.detail}</span>
              </span>
            </>
          );

          if (!item.href) {
            return (
              <div key={item.label} className="flex items-start gap-3">
                {body}
              </div>
            );
          }

          const className =
            '-m-1 flex min-h-[44px] items-start gap-3 rounded-lg p-1 transition-colors hover:bg-brand-50';
          const external = item.href.startsWith('http');

          return external ? (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {body}
            </a>
          ) : (
            <Link key={item.label} href={item.href} className={className}>
              {body}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function CtaBand({
  title = 'Ready for a free consultation?',
  body = 'Call or send the quote form. We walk the yard, talk through the work, and send a written number.',
  primaryHref = '/quote',
  primaryLabel = 'Free Consultation',
}: {
  title?: string;
  body?: string;
  primaryHref?: string;
  primaryLabel?: string;
}) {
  return (
    <section className="bg-brand-900 text-brand-50">
      <div className="shell section-tight">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-h2 text-white">{title}</h2>
          <p className="mx-auto mt-4 max-w-prose text-body-lg text-brand-50/80">{body}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {/* This band is brand-900, so the primary takes the dark-surface
                step of the green and the phone number takes the filled ghost.
                leaf-600, the fill used on light pages, is 2.91:1 here —
                legible label, invisible button. */}
            <Button asChild variant="onDark" size="lg" className="w-full sm:w-auto">
              <Link href={primaryHref}>
                {primaryLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="ghostDark" size="lg" className="w-full sm:w-auto">
              <a href={TEL_HREF}>
                <Phone className="h-4 w-4" aria-hidden="true" />
                {PHONE.display}
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** A titled group of internal links. The internal-linking web is built of these. */
export function LinkCluster({
  title,
  links,
  columns = 2,
}: {
  title: string;
  links: { label: string; href: string }[];
  columns?: 2 | 3;
}) {
  if (!links.length) return null;

  return (
    <section>
      <h2 className="text-h3">{title}</h2>
      <ul
        className={cn(
          'mt-4 grid gap-x-6 gap-y-2',
          columns === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3',
        )}
      >
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-1.5 text-body text-ink-800 transition-colors hover:text-brand-600"
            >
              <span className="underline decoration-ink-200 underline-offset-4 group-hover:decoration-brand-600">
                {link.label}
              </span>
              <ArrowRight
                className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ProcessSteps({ steps }: { steps: { title: string; description: string }[] }) {
  if (!steps.length) return null;

  return (
    <ol className="grid gap-6 sm:grid-cols-2">
      {steps.map((step, i) => (
        <li key={step.title} className="border-l-2 border-brand-50 pl-5">
          <span className="eyebrow text-brand-600">Step {i + 1}</span>
          <h3 className="mt-1 text-body-lg font-semibold text-brand-900">{step.title}</h3>
          <p className="mt-1.5 text-body text-ink-500">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
