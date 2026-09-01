'use client';

import { Check, Copy, MessageSquare, Phone } from 'lucide-react';
import { useCallback, useState } from 'react';

import { PHONE, SMS_HREF, TEL_HREF } from '@/data/business';
import { trackEvent } from '@/lib/analytics';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * Ways to leave with the scope that do not require submitting a form.
 *
 * Call and text are the conversion path when someone will not fill five
 * steps. Copy is for pasting into Nextdoor, a spouse text, or an email.
 */
export function ScopeTakeaway({ message }: { message: string }) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      trackEvent('visualizer_share', { method: 'copy' });
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [message]);

  const smsHref = `${SMS_HREF}?body=${encodeURIComponent(message)}`;

  return (
    <div>
      <p className="text-caption text-ink-500">Take this with you — no form required.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <a
          href={TEL_HREF}
          onClick={() => trackEvent('click_to_call', { location: 'visualizer_scope' })}
          className={buttonVariants({ variant: 'outline', size: 'sm' })}
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call {PHONE.display}
        </a>
        <a
          href={smsHref}
          onClick={() => trackEvent('click_to_text', { location: 'visualizer_scope' })}
          className={buttonVariants({ variant: 'outline', size: 'sm' })}
        >
          <MessageSquare className="h-4 w-4" aria-hidden="true" />
          Text this scope
        </a>
        <button
          type="button"
          onClick={() => void copy()}
          className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}
        >
          {copied ? (
            <Check className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Copy className="h-4 w-4" aria-hidden="true" />
          )}
          {copied ? 'Copied' : 'Copy scope'}
        </button>
      </div>
    </div>
  );
}
