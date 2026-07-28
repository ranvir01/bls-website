import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

import { JsonLd } from '@/components/json-ld';
import { breadcrumbSchema, graph } from '@/lib/seo';

export interface Crumb {
  name: string;
  path: string;
}

/**
 * Visible breadcrumb trail plus matching BreadcrumbList JSON-LD.
 *
 * Emitting both from one component is deliberate: a visible trail that does not
 * match its structured data is a rich-results warning, and keeping them in
 * separate components is how they drift apart.
 *
 * Present on every page except the homepage.
 */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const full: Crumb[] = [{ name: 'Home', path: '/' }, ...crumbs];

  return (
    <>
      <JsonLd data={graph([breadcrumbSchema(full)])} />
      <nav aria-label="Breadcrumb" className="shell pt-24 lg:pt-28">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-caption text-stone-500">
          {full.map((crumb, i) => {
            const isLast = i === full.length - 1;
            return (
              <li key={crumb.path} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
                {isLast ? (
                  <span aria-current="page" className="text-stone-800">
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.path} className="transition-colors hover:text-moss-700 hover:underline">
                    {crumb.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
