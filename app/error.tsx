'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
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
        <p className="text-caption font-semibold uppercase tracking-wide text-leaf-600">Error</p>
        <h1 className="mt-2 text-h1">Something went wrong on our end</h1>
        <p className="mt-5 text-body-lg text-ink-500">
          This is our problem, not yours. Try again, or just call — we answer the phone.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button type="button" onClick={reset}>
            Try again
          </Button>
          <Button asChild variant="outline">
            <a href={TEL_HREF}>Call {PHONE.display}</a>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Homepage</Link>
          </Button>
        </div>

        {error.digest && (
          <p className="mt-6 text-caption text-ink-500">Reference: {error.digest}</p>
        )}
      </div>
    </div>
  );
}
