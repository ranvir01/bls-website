'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import { PHONE, TEL_HREF } from '@/data/business';

/**
 * Branded error boundary.
 *
 * Always offers the phone number: if the site is broken, the lead should still
 * be reachable by the channel that does not depend on the site working.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[app] unhandled error', error);
  }, [error]);

  return (
    <div className="shell py-24 lg:py-32">
      <div className="max-w-prose">
        <p className="text-caption font-semibold uppercase tracking-wide text-clay-600">Error</p>
        <h1 className="mt-2 text-h1">Something went wrong on our end</h1>
        <p className="mt-5 text-body-lg text-stone-500">
          This is our problem, not yours. Try again, or just call — we answer the phone.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-[48px] items-center justify-center rounded-sm bg-clay-600 px-6 text-body font-semibold text-white transition-colors hover:bg-clay-600/90"
          >
            Try again
          </button>
          <a
            href={TEL_HREF}
            className="inline-flex min-h-[48px] items-center justify-center rounded-sm border border-stone-200 px-6 text-body font-semibold text-stone-950 transition-colors hover:border-moss-700"
          >
            Call {PHONE.display}
          </a>
          <Link
            href="/"
            className="inline-flex min-h-[48px] items-center justify-center rounded-sm border border-stone-200 px-6 text-body font-semibold text-stone-950 transition-colors hover:border-moss-700"
          >
            Homepage
          </Link>
        </div>

        {error.digest && (
          <p className="mt-6 text-caption text-stone-500">Reference: {error.digest}</p>
        )}
      </div>
    </div>
  );
}
