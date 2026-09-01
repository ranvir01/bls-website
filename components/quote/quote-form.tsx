'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, Loader2, Phone } from 'lucide-react';
import { cloneElement, useCallback, useEffect, useRef, useState } from 'react';
import { useForm, type FieldPath } from 'react-hook-form';

import { PHONE, TEL_HREF } from '@/data/business';
import { trackEvent } from '@/lib/analytics';
import {
  BUDGET_OPTIONS,
  PROJECT_TYPES,
  SIZE_OPTIONS,
  STEP_FIELDS,
  STEP_SCHEMAS,
  STEP_TITLES,
  TIMELINE_OPTIONS,
  isInServiceArea,
  leadSchema,
  type LeadInput,
} from '@/lib/lead-schema';
import { ease } from '@/lib/motion';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'bls-quote-progress';
const TOTAL_STEPS = STEP_FIELDS.length;

/**
 * Phase 7 multi-step quote form.
 *
 * Design decisions that matter for conversion, not just for looks:
 *   - Step 1 is a single tap on a visual card, so the first interaction costs
 *     nothing. Asking for a name first is what kills completion rates.
 *   - Phone is required and asked BEFORE email. Phone leads convert far better
 *     in home services; email is optional and never blocks a submit.
 *   - Progress persists to sessionStorage, so a refresh or an accidental
 *     back-swipe on mobile does not lose the answers.
 *   - Each step validates only its own fields, so an error on step 5 never
 *     blocks navigation on step 2.
 */
export function QuoteForm({
  className,
  defaultProjectType,
  renderId,
  compact = false,
}: {
  className?: string;
  defaultProjectType?: string;
  renderId?: string;
  compact?: boolean;
}) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  /**
   * Whether the server got the lead out to anyone.
   *
   * The route answers 200 as soon as a valid lead reaches it, because a lead
   * that arrived must never be thrown away over a mail outage. But if every
   * delivery channel failed, the submission exists only in a server log, and
   * telling the customer "an estimator will call you shortly" would be a lie.
   * On that path the panel says so and asks them to ring.
   */
  const [delivered, setDelivered] = useState(true);
  const [serverError, setServerError] = useState<string | null>(null);
  const [restored, setRestored] = useState(false);
  const startedRef = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  /**
   * Set by goNext/goBack, consumed by the focus effect below. The step can
   * also change on mount when sessionStorage restores a half-finished form,
   * and grabbing focus on page load for that is a hijack, not a courtesy.
   */
  const navigatedRef = useRef(false);
  const pathname = usePathname();
  const reduced = useReducedMotion();

  const form = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    mode: 'onTouched',
    // Once a field has errored, revalidate as the user types rather than
    // waiting for another blur — otherwise a corrected field keeps showing its
    // old error message.
    reValidateMode: 'onChange',
    defaultValues: {
      projectType: defaultProjectType ?? undefined,
      city: '',
      zip: '',
      name: '',
      phone: '',
      email: '',
      details: '',
      company: '',
    },
  });

  const { register, handleSubmit, setValue, watch, formState, getValues, setError, clearErrors } =
    form;
  const values = watch();

  // ── Persist and restore progress ──────────────────────────────────────────
  //
  // Restore runs EXACTLY ONCE, guarded by a ref rather than by a dependency
  // array. react-hook-form's `setValue` is not reliably referentially stable
  // across renders, so listing it as a dependency let this effect re-run
  // mid-session — reading back the step persisted on the *previous* render and
  // resetting the user to the step they had just left. The visible symptom was
  // a form that refused to advance past a step whose validation had failed
  // once, because the extra renders from setError made the re-run more likely.
  const restoreRan = useRef(false);

  useEffect(() => {
    if (restoreRan.current) return;
    restoreRan.current = true;

    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as { values: Partial<LeadInput>; step: number };
        for (const [key, value] of Object.entries(parsed.values)) {
          if (value !== undefined && value !== '') {
            setValue(key as FieldPath<LeadInput>, value as never);
          }
        }
        if (typeof parsed.step === 'number') setStep(Math.min(parsed.step, TOTAL_STEPS - 1));
      }
    } catch {
      // A corrupt or unavailable sessionStorage must never break the form.
    }
    setRestored(true);
  }, [setValue]);

  useEffect(() => {
    if (!restored || submitted) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ values, step }));
    } catch {
      /* private mode / quota — non-fatal */
    }
  }, [values, step, restored, submitted]);

  // ── Analytics ─────────────────────────────────────────────────────────────
  const markStarted = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent('quote_form_start', { path: pathname });
  }, [pathname]);

  // ── Navigation ────────────────────────────────────────────────────────────
  const goNext = useCallback(() => {
    markStarted();
    const fields = STEP_FIELDS[step] as FieldPath<LeadInput>[];

    // Parse this step's slice of the schema against the current values. Doing
    // it here rather than via RHF's `trigger` is deliberate: once a step has
    // failed validation, RHF's error map trails the input by a render, so a
    // user who fixed the field still could not advance on the next click.
    const result = STEP_SCHEMAS[step].safeParse(getValues());

    if (!result.success) {
      for (const issue of result.error.issues) {
        const field = issue.path[0] as FieldPath<LeadInput>;
        setError(field, { type: 'manual', message: issue.message });
      }

      // Bring the first problem into view and focus it. Without this the user
      // can be looking at a button that just did nothing, with the reason
      // rendered off-screen above or below the fold.
      const firstField = result.error.issues[0]?.path[0];
      if (typeof firstField === 'string') {
        requestAnimationFrame(() => {
          const el = document.getElementById(firstField);
          el?.scrollIntoView({ block: 'center', behavior: 'smooth' });
          el?.focus({ preventScroll: true });
        });
      }
      return;
    }

    clearErrors(fields);
    trackEvent('quote_form_step', { step: step + 1, path: pathname });
    navigatedRef.current = true;
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  }, [clearErrors, getValues, markStarted, pathname, setError, step]);

  const goBack = useCallback(() => {
    navigatedRef.current = true;
    setDirection(-1);
    setStep((s) => Math.max(0, s - 1));
  }, []);

  // Move focus to the new step heading so keyboard and screen-reader users are
  // not stranded after a step change. This used to be gated on `step > 0`,
  // which meant Back from step 2 to step 1 unmounted the Back button under the
  // focus and dropped it on <body>; the next Tab then skipped every card on
  // the step. Every navigation focuses the heading now; the ref keeps a
  // sessionStorage restore on mount from doing the same.
  useEffect(() => {
    if (!navigatedRef.current) return;
    navigatedRef.current = false;
    headingRef.current?.focus();
  }, [step]);

  // ── Submit ────────────────────────────────────────────────────────────────
  const onSubmit = handleSubmit(async (data) => {
    setSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, sourcePath: pathname, renderId }),
      });

      const json = await res.json();

      if (!res.ok) {
        setServerError(json.error ?? 'Something went wrong. Please call us instead.');
        return;
      }

      trackEvent('quote_form_submit', { path: pathname, project_type: data.projectType });
      setDelivered(json.delivered !== false);
      setSubmitted(true);
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        /* non-fatal */
      }
    } catch {
      setServerError('We could not reach the server. Please call us instead.');
    } finally {
      setSubmitting(false);
    }
  });

  const progress = ((step + 1) / TOTAL_STEPS) * 100;
  const outOfArea = values.zip?.length === 5 && !isInServiceArea(values.zip);

  /*
   * The confirmation's live region is mounted from the first render and stays
   * put across the form → panel swap. A region that enters the DOM already
   * holding its text is not reliably announced: screen readers announce
   * changes to live regions, and a region born full has not changed. Keeping
   * it as the first child of the fragment means React reuses the node.
   */
  const announcement = submitted ? confirmationText(values.name, delivered) : '';

  return (
    <LazyMotion features={domAnimation} strict>
      <div role="status" aria-live="polite" className="sr-only">
        {announcement}
      </div>

      {submitted ? (
        <SuccessPanel name={values.name} delivered={delivered} className={className} />
      ) : (
      <form
        onSubmit={onSubmit}
        onChange={markStarted}
        noValidate
        className={cn('rounded-sm border border-ink-200 bg-white p-5 shadow-card sm:p-7', className)}
      >
        {/* Honeypot. Hidden from sight and from assistive tech; bots fill it. */}
        <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
          <label htmlFor="company-field">Company</label>
          <input id="company-field" type="text" tabIndex={-1} autoComplete="off" {...register('company')} />
        </div>

        <div className="mb-6">
          <div className="mb-2 flex items-baseline justify-between">
            <p className="eyebrow text-brand-600">
              Step {step + 1} of {TOTAL_STEPS}
            </p>
            <p className="text-caption text-ink-500">Takes about a minute</p>
          </div>
          <div
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={TOTAL_STEPS}
            aria-valuenow={step + 1}
            aria-label="Quote request progress"
            className="h-1 w-full overflow-hidden rounded-sm bg-ink-200"
          >
            <m.div
              className="h-full bg-brand-600"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: reduced ? 0 : 0.3, ease: ease.out }}
            />
          </div>
        </div>

        <h2
          ref={headingRef}
          tabIndex={-1}
          className={cn('text-h3 outline-none', compact && 'text-body-lg font-semibold')}
        >
          {STEP_TITLES[step]}
        </h2>

        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <m.div
            key={step}
            custom={direction}
            initial={reduced ? { opacity: 0 } : { opacity: 0, x: direction * 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, x: direction * -24 }}
            transition={{ duration: reduced ? 0.01 : 0.25, ease: ease.out }}
            className="mt-5"
          >
            {step === 0 && (
              <CardGroup
                legend={STEP_TITLES[0]}
                options={PROJECT_TYPES}
                value={values.projectType}
                onSelect={(id) => {
                  setValue('projectType', id, { shouldValidate: true });
                  markStarted();
                }}
                error={formState.errors.projectType?.message}
              />
            )}

            {step === 1 && (
              <div className="space-y-5">
                <CardGroup
                  legend="Project size (optional)"
                  note="Optional — a rough size helps us prep the estimate."
                  options={SIZE_OPTIONS}
                  value={values.projectSize}
                  onSelect={(id) => setValue('projectSize', id, { shouldValidate: true })}
                  error={formState.errors.projectSize?.message}
                />
                <Field label="Anything we should know? (optional)" htmlFor="details">
                  <textarea
                    id="details"
                    rows={3}
                    placeholder="Slope, drainage problems, access, a deadline…"
                    className="w-full rounded-sm border border-ink-200 bg-white px-3 py-2.5 text-body text-brand-900 placeholder:text-ink-500 focus:border-brand-600"
                    {...register('details')}
                  />
                </Field>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-2">
                <p className="text-caption text-ink-500">Required unless it says optional.</p>
                <Field label="City" htmlFor="city" required error={formState.errors.city?.message}>
                  <input
                    id="city"
                    type="text"
                    autoComplete="address-level2"
                    placeholder="Kent"
                    className="w-full rounded-sm border border-ink-200 bg-white px-3 py-2.5 text-body text-brand-900 placeholder:text-ink-500 focus:border-brand-600"
                    {...register('city')}
                  />
                </Field>
                <Field
                  label="ZIP code"
                  htmlFor="zip"
                  required
                  error={formState.errors.zip?.message}
                  describedBy={outOfArea ? 'zip-area-note' : undefined}
                >
                  <input
                    id="zip"
                    type="text"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    maxLength={5}
                    placeholder="98031"
                    className="w-full rounded-sm border border-ink-200 bg-white px-3 py-2.5 text-body text-brand-900 placeholder:text-ink-500 focus:border-brand-600"
                    {...register('zip')}
                  />
                </Field>
                {/* Out of area is a note, never a block — the lead is still worth
                    having. The live region is always mounted on this step and
                    only its contents come and go, so the note is announced
                    when it appears and is tied to the ZIP field while shown.
                    The margin sits on the inner <p>, not the region, so the
                    empty region takes no space. */}
                <div id="zip-area-note" role="status" aria-live="polite" className="!mt-0">
                  {outOfArea && (
                    <p className="mt-4 rounded-sm border border-warn/30 bg-warn/5 px-3 py-2.5 text-caption text-ink-800">
                      That looks like it may be outside our usual service area. Send it anyway —
                      if we cannot get out there, we will tell you straight and point you
                      somewhere good.
                    </p>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <ChipGroup
                  legend="Timeline (optional)"
                  options={TIMELINE_OPTIONS}
                  value={values.timeline}
                  onSelect={(id) => setValue('timeline', id)}
                />
                <ChipGroup
                  legend="Budget range (optional)"
                  options={BUDGET_OPTIONS}
                  value={values.budget}
                  onSelect={(id) => setValue('budget', id)}
                />
              </div>
            )}

            {step === 4 && (
              <div className="space-y-2">
                <p className="text-caption text-ink-500">Required unless it says optional.</p>
                <Field label="Your name" htmlFor="name" required error={formState.errors.name?.message}>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    className="w-full rounded-sm border border-ink-200 bg-white px-3 py-2.5 text-body text-brand-900 focus:border-brand-600"
                    {...register('name')}
                  />
                </Field>
                <Field label="Phone" htmlFor="phone" required error={formState.errors.phone?.message}>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="(253) 555-0123"
                    className="w-full rounded-sm border border-ink-200 bg-white px-3 py-2.5 text-body text-brand-900 placeholder:text-ink-500 focus:border-brand-600"
                    {...register('phone')}
                  />
                </Field>
                <Field label="Email (optional)" htmlFor="email" error={formState.errors.email?.message}>
                  <input
                    id="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    className="w-full rounded-sm border border-ink-200 bg-white px-3 py-2.5 text-body text-brand-900 focus:border-brand-600"
                    {...register('email')}
                  />
                </Field>
                <p className="text-caption text-ink-500">
                  We call to confirm the details and book a free on-site walkthrough. No spam, no
                  list-selling.
                </p>
              </div>
            )}
          </m.div>
        </AnimatePresence>

        {serverError && (
          <p role="alert" aria-live="assertive" className="mt-4 rounded-sm border border-error/30 bg-error/5 px-3 py-2.5 text-caption text-brand-900">
            {serverError}{' '}
            <a href={TEL_HREF} className="font-semibold underline">
              Call {PHONE.display}
            </a>
          </p>
        )}

        <div className="mt-7 flex items-center gap-3">
          {step > 0 && (
            <button
              type="button"
              onClick={goBack}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-sm border border-ink-200 px-4 text-body font-medium text-ink-800 transition-colors hover:border-ink-500"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back
            </button>
          )}

          {step < TOTAL_STEPS - 1 ? (
            <button
              type="button"
              onClick={goNext}
              className={cn(buttonVariants({ variant: 'primary', size: 'md' }), 'flex-1')}
            >
              Continue
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className={cn(buttonVariants({ variant: 'primary', size: 'md' }), 'flex-1')}
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Sending…
                </>
              ) : (
                'Send my request'
              )}
            </button>
          )}
        </div>
      </form>
      )}
    </LazyMotion>
  );
}

/** The sentence the live region speaks once the lead is in. */
function confirmationText(name: string | undefined, delivered: boolean): string {
  const first = name?.split(' ')[0];
  const thanks = first ? `Thanks, ${first} — we have it.` : 'Thanks — we have it.';
  return delivered
    ? `${thanks} An estimator will call you shortly to confirm the details and book your free on-site walkthrough.`
    : `${thanks} Your details are saved, but our notifications are not getting through right now. Please give us a ring so we know you are waiting.`;
}

// ── Sub-components ───────────────────────────────────────────────────────────

function CardGroup({
  legend,
  note,
  options,
  value,
  onSelect,
  error,
}: {
  /** Read by screen readers as the group's name, so it is the question, not the field id. */
  legend: string;
  /** Optional visible line above the cards — used to say a group can be skipped. */
  note?: string;
  options: readonly { id: string; label: string; description?: string }[];
  value?: string;
  onSelect: (id: string) => void;
  error?: string;
}) {
  return (
    <fieldset>
      <legend className="sr-only">{legend}</legend>
      {note && <p className="mb-2.5 text-caption text-ink-500">{note}</p>}
      <div className="grid gap-2.5 sm:grid-cols-2">
        {options.map((option) => {
          const selected = value === option.id;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect(option.id)}
              className={cn(
                'min-h-[64px] rounded-sm border p-4 text-left transition-colors',
                selected
                  ? 'border-brand-600 bg-brand-50/50 ring-1 ring-brand-600'
                  : 'border-ink-200 bg-white hover:border-ink-500',
              )}
            >
              <span className="flex items-start justify-between gap-2">
                <span className="text-body font-medium text-brand-900">{option.label}</span>
                {selected && <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />}
              </span>
              {option.description && (
                <span className="mt-0.5 block text-caption text-ink-500">{option.description}</span>
              )}
            </button>
          );
        })}
      </div>
      {error && (
        <p role="alert" aria-live="polite" className="mt-2 text-caption text-error">
          {error}
        </p>
      )}
    </fieldset>
  );
}

function ChipGroup({
  legend,
  options,
  value,
  onSelect,
}: {
  legend: string;
  options: readonly { id: string; label: string }[];
  value?: string;
  onSelect: (id: string) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2.5 eyebrow text-ink-500">
        {legend}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = value === option.id;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect(option.id)}
              className={cn(
                'min-h-[44px] rounded-sm border px-4 text-body transition-colors',
                selected
                  ? 'border-brand-600 bg-brand-50/50 font-medium text-brand-900 ring-1 ring-brand-600'
                  : 'border-ink-200 bg-white text-ink-800 hover:border-ink-500',
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

/**
 * Label + control + error row.
 *
 * The control is cloned so the association can be made in one place: the
 * error paragraph gets an id, and the input gets aria-describedby pointing at
 * it, aria-invalid while it shows, and aria-required when the field is. Before
 * this the error was a bare sibling paragraph, so a screen reader landing on
 * the ZIP field had no way to hear "Enter a 5-digit ZIP code".
 *
 * The error row is always laid out, at the height of one caption line, even
 * while empty. Validation runs on blur, and a message appearing between the
 * input and the Continue button pushed the button 27px down the page in the
 * same instant the pointer was pressing it — so the first click after a typo
 * landed on the form instead of the button and did nothing.
 */
function Field({
  label,
  htmlFor,
  error,
  required = false,
  describedBy,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  /** Extra id(s) to describe the control by, e.g. an advisory note below it. */
  describedBy?: string;
  children: React.ReactElement;
}) {
  const errorId = `${htmlFor}-error`;
  const describedIds = [error ? errorId : null, describedBy ?? null].filter(Boolean).join(' ');

  const control = cloneElement(children, {
    'aria-describedby': describedIds || undefined,
    'aria-invalid': error ? true : undefined,
    'aria-required': required || undefined,
  });

  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-caption font-medium text-ink-800">
        {label}
      </label>
      {control}
      <div className="mt-1 min-h-[1.3125rem]">
        {error && (
          <p id={errorId} role="alert" aria-live="polite" className="text-caption text-error">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

function SuccessPanel({
  name,
  delivered = true,
  className,
}: {
  name?: string;
  delivered?: boolean;
  className?: string;
}) {
  const first = name?.split(' ')[0];
  const headingRef = useRef<HTMLHeadingElement>(null);

  // The form that had focus is gone; put it on the confirmation rather than
  // letting it fall to <body>, where the next Tab starts from the top of the
  // page. The live-region announcement is handled by the parent, which keeps
  // a region mounted from before the swap.
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div className={cn('rounded-sm border border-brand-600/30 bg-brand-50/40 p-7 text-center', className)}>
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-600">
        <Check className="h-6 w-6 text-white" aria-hidden="true" />
      </div>
      <h2 ref={headingRef} tabIndex={-1} className="text-h3 outline-none">
        {first ? `Thanks, ${first} — we have it.` : 'Thanks — we have it.'}
      </h2>
      {delivered ? (
        <p className="mx-auto mt-3 max-w-prose text-body text-ink-800">
          An estimator will call you shortly to confirm the details and book your free on-site
          walkthrough. If you would rather reach us now, we are on the phone.
        </p>
      ) : (
        <p className="mx-auto mt-3 max-w-prose text-body text-ink-800">
          Your details are saved, but our notifications are not getting through right now, so we
          cannot promise anyone has seen this yet. Please give us a ring so we know you are
          waiting.
        </p>
      )}
      <a
        href={TEL_HREF}
        onClick={() => trackEvent('click_to_call', { location: 'quote_success' })}
        className={cn(buttonVariants({ variant: 'primary', size: 'md' }), 'mt-5')}
      >
        <Phone className="h-4 w-4" aria-hidden="true" />
        {PHONE.display}
      </a>
    </div>
  );
}
