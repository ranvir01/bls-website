'use client';

import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion';
import { Camera, Check, Loader2, RefreshCw, Upload } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { AiConceptBadge, AiConceptNote } from '@/components/ai-concept-badge';
import { QuoteForm } from '@/components/quote/quote-form';
import { VisualizerComparables } from '@/components/visualizer/comparables';
import { ScopeTakeaway } from '@/components/visualizer/scope-takeaway';
import { YardCompare } from '@/components/visualizer/yard-compare';
import { catalogGroups, elementToggles, scopes, styles } from '@/data/buildable';
import { formatRange, type Estimate, type RenderSpec } from '@/data/pricing';
import { trackEvent } from '@/lib/analytics';
import { comparableJobs } from '@/lib/comparable-jobs';
import { ease } from '@/lib/motion';
import { formatScopeMessage } from '@/lib/visualizer-href';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

function catalogId(list: { id: string }[], raw: string | null): string {
  if (!raw) return '';
  return list.some((item) => item.id === raw) ? raw : '';
}

const MAX_UPLOAD_PX = 1600;

interface RenderResult {
  image: string | null;
  seed: number;
  spec: RenderSpec;
  estimate: Estimate;
  notices: string[];
  degraded: boolean;
  message?: string;
}

/**
 * The live yard redesign tool.
 *
 * The after-photo is optional and labeled AI. The written scope, cost range,
 * and real comparable jobs always run — including when no image key is set.
 * We do not pre-warm extra styles: that burned four API calls per click.
 */
export function Visualizer() {
  const searchParams = useSearchParams();
  const [photo, setPhoto] = useState<string | null>(null);
  const [scopeId, setScopeId] = useState(() => catalogId(scopes, searchParams.get('scope')));
  const [styleId, setStyleId] = useState(() => catalogId(styles, searchParams.get('style')));
  const [optionIds, setOptionIds] = useState<string[]>([]);
  const [toggleIds, setToggleIds] = useState<string[]>([]);
  const [referenceWidth, setReferenceWidth] = useState<string>('');

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gateOpen] = useState(false);
  /** null = still asking the API; false = honest degraded mode. */
  const [generationLive, setGenerationLive] = useState<boolean | null>(null);

  /** Cache of results keyed by style, so switching styles is instant. */
  const [results, setResults] = useState<Record<string, RenderResult>>({});
  const seedRef = useRef<number | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const reduced = useReducedMotion();

  const scope = useMemo(() => scopes.find((s) => s.id === scopeId), [scopeId]);
  const current = styleId ? results[styleId] : undefined;
  const hasAnyResult = Object.keys(results).length > 0;
  const compareJob = useMemo(() => (scopeId ? comparableJobs(scopeId, 1)[0] : undefined), [scopeId]);
  const scopeMessage = useMemo(() => {
    if (!current || !scope) return '';
    return formatScopeMessage({
      scopeLabel: scope.label,
      styleLabel: styles.find((s) => s.id === styleId)?.label,
      widthFt: referenceWidth || undefined,
      estimate: current.estimate,
      comparableTitle: compareJob?.title,
    });
  }, [compareJob?.title, current, referenceWidth, scope, styleId]);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/visualize')
      .then((res) => res.json())
      .then((json: { generation?: boolean }) => {
        if (!cancelled) setGenerationLive(Boolean(json.generation));
      })
      .catch(() => {
        if (!cancelled) setGenerationLive(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // ── Photo intake ──────────────────────────────────────────────────────────
  const onPickFile = useCallback(async (file: File) => {
    setError(null);
    try {
      const resized = await resizeImage(file, MAX_UPLOAD_PX);
      setPhoto(resized);
      trackEvent('visualizer_start');
    } catch {
      setError('We could not read that image. Try a JPEG or PNG straight from your camera roll.');
    }
  }, []);

  // ── Generation ────────────────────────────────────────────────────────────
  const callApi = useCallback(
    async (targetStyle: string, isToggle: boolean, overrides?: { toggleIds?: string[] }) => {
      const res = await fetch('/api/visualize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scopeId,
          styleId: targetStyle,
          optionIds,
          toggleIds: overrides?.toggleIds ?? toggleIds,
          referenceWidthFt: referenceWidth ? Number(referenceWidth) : undefined,
          seed: seedRef.current ?? undefined,
          photo: photo ?? undefined,
          isToggle,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message ?? json.error ?? 'Generation failed');

      seedRef.current = json.seed;
      return json as RenderResult;
    },
    [optionIds, photo, referenceWidth, scopeId, toggleIds],
  );

  const generate = useCallback(async () => {
    if (!scopeId || !styleId) return;

    setBusy(true);
    setError(null);
    trackEvent('visualizer_generate', { scope: scopeId, style: styleId });

    try {
      const primary = await callApi(styleId, false);
      setResults({ [styleId]: primary });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  }, [callApi, scopeId, styleId]);

  const switchStyle = useCallback(
    async (id: string) => {
      setStyleId(id);
      if (results[id] || !hasAnyResult) return;

      // Style does not change the estimate. When rendering is off, reuse it.
      if (generationLive === false) {
        const existing = Object.values(results)[0];
        if (existing) setResults((prev) => ({ ...prev, [id]: existing }));
        return;
      }

      setBusy(true);
      try {
        const result = await callApi(id, true);
        setResults((prev) => ({ ...prev, [id]: result }));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Could not switch style.');
      } finally {
        setBusy(false);
      }
    },
    [callApi, generationLive, hasAnyResult, results],
  );

  const applyToggle = useCallback(
    async (id: string) => {
      const next = toggleIds.includes(id) ? toggleIds.filter((t) => t !== id) : [...toggleIds, id];
      setToggleIds(next);

      if (!hasAnyResult) return;

      setBusy(true);
      trackEvent('visualizer_toggle', { toggle: id });

      try {
        const result = await callApi(styleId, true, { toggleIds: next });
        // Toggles invalidate the warm cache — the other styles no longer match
        // the current element set.
        setResults({ [styleId]: result });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Could not update the design.');
      } finally {
        setBusy(false);
      }
    },
    [callApi, hasAnyResult, styleId, toggleIds],
  );

  const canGenerate = Boolean(scopeId && styleId) && !busy;

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        {/* ── Controls ───────────────────────────────────────────────────── */}
        <div className="min-w-0 space-y-8 lg:col-span-5">
          {generationLive === false && (
            <p className="rounded-sm border border-ink-200 bg-white px-4 py-3 text-caption text-ink-800">
              Photoreal after-photos of your own house are off right now. Upload
              a photo anyway — you still get a written scope, a cost range, and
              real jobs we built like this.
            </p>
          )}
          <Step n={1} title="Add a photo of your yard">
            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              capture="environment"
              className="sr-only"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void onPickFile(file);
              }}
            />
            {photo ? (
              <div className="space-y-3">
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-ink-200">
                  {/* User-supplied data URL — next/image cannot optimize it. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo} alt="Your yard" className="h-full w-full object-cover" />
                </div>
                <button
                  type="button"
                  onClick={() => fileInput.current?.click()}
                  className="text-caption font-medium text-brand-600 underline underline-offset-4"
                >
                  Use a different photo
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInput.current?.click()}
                className="flex min-h-[140px] w-full flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-ink-500 bg-white p-6 text-center transition-colors hover:border-brand-600"
              >
                <span className="flex gap-2 text-brand-600">
                  <Camera className="h-5 w-5" aria-hidden="true" />
                  <Upload className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-body font-medium text-brand-900">
                  Take a photo or choose one
                </span>
                <span className="text-caption text-ink-500">
                  Stand back far enough to get the whole area in frame
                </span>
              </button>
            )}
            <p className="mt-2 text-caption text-ink-500">
              Your photo stays in this session and is not stored unless you send us the design.
            </p>
          </Step>

          <Step n={2} title="What are you thinking about?">
            <div className="grid gap-2.5 sm:grid-cols-2">
              {scopes.map((s) => (
                <SelectCard
                  key={s.id}
                  selected={scopeId === s.id}
                  title={s.label}
                  description={s.description}
                  onClick={() => {
                    setScopeId(s.id);
                    setOptionIds([]);
                    setResults({});
                  }}
                />
              ))}
            </div>
          </Step>

          <Step n={3} title="Pick a style">
            <div className="flex flex-wrap gap-2">
              {styles.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={styleId === s.id}
                  onClick={() => void switchStyle(s.id)}
                  className={cn(
                    'min-h-[44px] rounded-sm border px-4 text-body transition-colors',
                    styleId === s.id
                      ? 'border-brand-600 bg-brand-50/50 font-medium ring-1 ring-brand-600'
                      : 'border-ink-200 bg-white hover:border-ink-500',
                    results[s.id] && styleId !== s.id && 'border-sky-600',
                  )}
                >
                  {s.label}
                  {results[s.id] && styleId !== s.id && (
                    <span className="ml-1.5 text-caption text-brand-600">ready</span>
                  )}
                </button>
              ))}
            </div>
          </Step>

          {scope && (
            <Step n={4} title="Materials (optional)">
              <div className="space-y-5">
                {scope.groups.map((groupId) => {
                  const group = catalogGroups[groupId];
                  if (!group) return null;
                  return (
                    <fieldset key={group.id}>
                      <legend className="mb-2 eyebrow text-ink-500">
                        {group.label}
                      </legend>
                      <div className="flex flex-wrap gap-2">
                        {group.options.map((option) => {
                          const selected = optionIds.includes(option.id);
                          return (
                            <button
                              key={option.id}
                              type="button"
                              aria-pressed={selected}
                              onClick={() =>
                                setOptionIds((prev) => {
                                  // One choice per group — picking a paver
                                  // replaces the previous paver.
                                  const withoutGroup = prev.filter(
                                    (id) => !group.options.some((o) => o.id === id),
                                  );
                                  return selected ? withoutGroup : [...withoutGroup, option.id];
                                })
                              }
                              className={cn(
                                'min-h-[40px] rounded-sm border px-3 text-caption transition-colors',
                                selected
                                  ? 'border-brand-600 bg-brand-50/50 font-medium'
                                  : 'border-ink-200 bg-white hover:border-ink-500',
                              )}
                            >
                              {option.label}
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>
                  );
                })}
              </div>
            </Step>
          )}

          <Step n={5} title="One measurement makes the estimate real">
            <label htmlFor="ref-width" className="mb-1.5 block text-caption text-ink-500">
              Roughly how wide is the back of your house, in feet?
            </label>
            <input
              id="ref-width"
              type="number"
              inputMode="numeric"
              min={4}
              max={400}
              value={referenceWidth}
              onChange={(e) => setReferenceWidth(e.target.value)}
              placeholder="32"
              className="w-full max-w-[10rem] rounded-sm border border-ink-200 bg-white px-3 py-2.5 text-body focus:border-brand-600"
            />
            <p className="mt-2 text-caption text-ink-500">
              A rough number is fine. It is what lets us size the quantities instead of guessing.
            </p>
          </Step>

          <button
            type="button"
            onClick={() => void generate()}
            disabled={!canGenerate}
            className={cn(buttonVariants({ variant: 'primary', size: 'lg', full: true }), 'disabled:cursor-not-allowed')}
          >
            {busy ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Designing…
              </>
            ) : hasAnyResult ? (
              <>
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                Try another version
              </>
            ) : generationLive ? (
              'See your yard redesigned'
            ) : (
              'See the scope and real jobs like this'
            )}
          </button>

          {error && (
            <p role="alert" className="rounded-sm border border-error/30 bg-error/5 px-3 py-2.5 text-caption">
              {error}
            </p>
          )}
        </div>

        {/* ── Result ─────────────────────────────────────────────────────── */}
        <div className="min-w-0 lg:col-span-7">
          <div className="lg:sticky lg:top-28">
            <div aria-live="polite" aria-atomic="false">
              <AnimatePresence mode="wait">
                {busy && !current && (
                  <m.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduced ? 0.01 : 0.2, ease: ease.out }}
                    className="shimmer aspect-[4/3] w-full rounded-sm border border-ink-200"
                  >
                    <span className="sr-only">Generating your design</span>
                  </m.div>
                )}

                {!busy && !current && (
                  <m.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex min-h-[280px] w-full flex-col items-center justify-center rounded-sm border border-dashed border-ink-200 bg-white p-8 text-center"
                  >
                    <p className="text-body-lg font-medium text-brand-900">
                      {scopeId ? 'Real jobs in this category' : 'Your design appears here'}
                    </p>
                    <p className="mt-2 max-w-sm text-body text-ink-500">
                      {generationLive
                        ? 'Pick a scope and a style, then hit the button. An after-photo of your own yard takes about thirty seconds and is labeled AI.'
                        : 'Pick a scope and a style. You will get a written scope, a cost range, and photographs of jobs we actually built — not a mockup of someone else’s house.'}
                    </p>
                    {scopeId ? (
                      <div className="mt-6 w-full max-w-xl text-left">
                        <VisualizerComparables scopeId={scopeId} compact />
                      </div>
                    ) : null}
                  </m.div>
                )}

                {current && (
                  <m.div
                    key={`result-${styleId}-${current.seed}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduced ? 0.01 : 0.25, ease: ease.out }}
                    className="space-y-5"
                  >
                    {(() => {
                      const afterSrc = current.image ?? compareJob?.after.src;
                      const canCompare = Boolean(photo && afterSrc);
                      if (canCompare && afterSrc) {
                        return (
                          <YardCompare
                            beforeSrc={photo!}
                            afterSrc={afterSrc}
                            afterKind={current.image ? 'ai' : 'job'}
                            afterAlt={
                              current.image
                                ? 'AI-generated design concept for your yard'
                                : (compareJob?.after.alt ?? 'A job we built')
                            }
                            caption={
                              current.image
                                ? 'Drag to compare your photo with an AI concept of the same yard. It is a design we can build, not a photo of finished work.'
                                : `Drag to compare your yard with “${compareJob?.title ?? 'a job we built'}” — a real install, not a mockup of your house.`
                            }
                          />
                        );
                      }
                      if (current.image) {
                        return (
                          <figure className="relative">
                            <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-ink-200 bg-ink-200">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={current.image}
                                alt="AI-generated design concept for your yard"
                                className={cn('h-full w-full object-cover', !gateOpen && 'blur-[1.5px]')}
                              />
                              <div className="absolute inset-x-3 bottom-3">
                                <AiConceptBadge />
                              </div>
                            </div>
                          </figure>
                        );
                      }
                      return null;
                    })()}

                    {!current.image && current.message ? (
                      <p className="rounded-sm border border-ink-200 bg-white px-4 py-3 text-caption text-ink-800">
                        {current.message}
                      </p>
                    ) : null}

                    <AiConceptNote />

                    {scopeId ? <VisualizerComparables scopeId={scopeId} /> : null}

                    {current.notices.map((notice) => (
                      <p
                        key={notice}
                        className="rounded-sm border border-ink-200 bg-white px-4 py-3 text-caption text-ink-800"
                      >
                        {notice}
                      </p>
                    ))}

                    {/* Element toggles */}
                    <fieldset>
                      <legend className="mb-2 eyebrow text-ink-500">
                        Change something
                      </legend>
                      <div className="flex flex-wrap gap-2">
                        {elementToggles.map((toggle) => {
                          const on = toggleIds.includes(toggle.id);
                          return (
                            <button
                              key={toggle.id}
                              type="button"
                              aria-pressed={on}
                              disabled={busy}
                              onClick={() => void applyToggle(toggle.id)}
                              className={cn(
                                'inline-flex min-h-[40px] items-center gap-1.5 rounded-sm border px-3 text-caption transition-colors disabled:opacity-60',
                                on
                                  ? 'border-brand-600 bg-brand-50/50 font-medium'
                                  : 'border-ink-200 bg-white hover:border-ink-500',
                              )}
                            >
                              {on && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
                              {toggle.label}
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>

                    <ScopeSheet estimate={current.estimate} gated={Boolean(current.image) && !gateOpen} />

                    {scopeMessage ? <ScopeTakeaway message={scopeMessage} /> : null}

                    {!gateOpen ? (
                      <div className="rounded-sm border border-brand-600/30 bg-brand-50/40 p-6">
                        <h3 className="text-h3">
                          {current.image
                            ? 'Get the full-resolution design + written scope and cost range'
                            : 'Want this built? Send the scope to an estimator'}
                        </h3>
                        <p className="mt-2 max-w-prose text-body text-ink-800">
                          {current.image
                            ? 'We will send the un-watermarked render along with a written scope sheet, and an estimator will call to confirm the site details.'
                            : 'The numbers above are a range for this market, not a quote. Leave a name and a number and we will walk the site. Or call or text the scope — no form required.'}
                        </p>
                        <div className="mt-5">
                          <QuoteForm
                            renderId={String(current.seed)}
                            compact
                            defaultProjectType={quoteTypeForScope(scopeId)}
                            defaultDetails={scopeMessage || undefined}
                          />
                        </div>
                      </div>
                    ) : null}
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}

// ── Sub-components ───────────────────────────────────────────────────────────

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 flex items-center gap-2.5 text-body-lg font-semibold text-brand-900">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-[12px] font-bold text-white">
          {n}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function SelectCard({
  selected,
  title,
  description,
  onClick,
}: {
  selected: boolean;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        'min-h-[64px] rounded-sm border p-4 text-left transition-colors',
        selected
          ? 'border-brand-600 bg-brand-50/50 ring-1 ring-brand-600'
          : 'border-ink-200 bg-white hover:border-ink-500',
      )}
    >
      <span className="block text-body font-medium text-brand-900">{title}</span>
      <span className="mt-0.5 block text-caption text-ink-500">{description}</span>
    </button>
  );
}

function ScopeSheet({ estimate, gated }: { estimate: Estimate; gated: boolean }) {
  return (
    <section className="rounded-sm border border-ink-200 bg-white p-5">
      <h3 className="text-h3">Scope &amp; cost range</h3>
      <ul className="mt-4 divide-y divide-ink-200">
        {estimate.lineItems.map((item) => (
          <li key={item.label} className="flex items-baseline justify-between gap-4 py-2.5">
            <span>
              <span className="block text-body text-brand-900">{item.label}</span>
              <span className="block text-caption text-ink-500">{item.detail}</span>
            </span>
            <span
              className={cn(
                'shrink-0 whitespace-nowrap text-body font-semibold text-brand-600',
                gated && 'select-none blur-[5px]',
              )}
              aria-hidden={gated}
            >
              {formatRange(item.low, item.high)}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-ink-200 pt-4">
        <span className="text-body font-semibold text-brand-900">Total range</span>
        <span
          className={cn(
            'whitespace-nowrap text-body-lg font-bold text-brand-900',
            gated && 'select-none blur-[6px]',
          )}
          aria-hidden={gated}
        >
          {formatRange(estimate.totalLow, estimate.totalHigh)}
        </span>
      </div>

      <p className="mt-3 text-caption text-ink-500">{estimate.timeline}</p>
      <ul className="mt-3 space-y-1.5">
        {estimate.notes.map((note) => (
          <li key={note} className="text-caption text-ink-500">
            {note}
          </li>
        ))}
      </ul>
    </section>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function quoteTypeForScope(scopeId: string): string {
  const map: Record<string, string> = {
    'paver-patio': 'paver-patios',
    'retaining-wall': 'retaining-walls',
    'full-backyard': 'planting-design',
    'front-curb-appeal': 'planting-design',
    'fire-and-seating': 'paver-patios',
    'irrigation-lawn': 'sprinkler-installation',
  };
  return map[scopeId] ?? 'other';
}

/**
 * Resize on the client before upload. A modern phone photo is 4000px and
 * several megabytes; sending that over a backyard LTE connection is the single
 * slowest step in the whole flow, and the model does not need the resolution.
 *
 * `createImageBitmap` applies EXIF orientation automatically, which is what
 * stops portrait photos arriving sideways.
 */
async function resizeImage(file: File, maxDimension: number): Promise<string> {
  const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });

  const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('canvas unavailable');

  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  return canvas.toDataURL('image/jpeg', 0.85);
}
