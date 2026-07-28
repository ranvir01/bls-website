'use client';

import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { Camera, Check, Loader2, RefreshCw, Upload } from 'lucide-react';
import { useCallback, useMemo, useRef, useState } from 'react';

import { AiConceptBadge, AiConceptNote } from '@/components/ai-concept-badge';
import { QuoteForm } from '@/components/quote/quote-form';
import { catalogGroups, elementToggles, scopes, styles } from '@/data/buildable';
import { formatRange, type Estimate, type RenderSpec } from '@/data/pricing';
import { trackEvent } from '@/lib/analytics';
import { ease } from '@/lib/motion';
import { cn } from '@/lib/utils';

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
 * Speed is the feature. Three things make it feel instant:
 *   1. The photo appears the moment it is picked, resized client-side before
 *      any upload — the user never waits on a 12MP phone shot.
 *   2. On first submit, several style variants are fired concurrently. The
 *      first to land is shown; the rest are cached, so switching styles
 *      afterwards costs zero wait.
 *   3. Element toggles regenerate against the same seed, so the yard stays
 *      stable and only the toggled element changes.
 *
 * The render is free and instant. The written scope and cost range are the
 * gated asset — that is the conversion event.
 */
export function Visualizer() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [scopeId, setScopeId] = useState<string>('');
  const [styleId, setStyleId] = useState<string>('');
  const [optionIds, setOptionIds] = useState<string[]>([]);
  const [toggleIds, setToggleIds] = useState<string[]>([]);
  const [referenceWidth, setReferenceWidth] = useState<string>('');

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gateOpen, setGateOpen] = useState(false);

  /** Cache of results keyed by style, so switching styles is instant. */
  const [results, setResults] = useState<Record<string, RenderResult>>({});
  const seedRef = useRef<number | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const reduced = useReducedMotion();

  const scope = useMemo(() => scopes.find((s) => s.id === scopeId), [scopeId]);
  const current = styleId ? results[styleId] : undefined;
  const hasAnyResult = Object.keys(results).length > 0;

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
      // Show the chosen style the moment it lands.
      const primary = await callApi(styleId, false);
      setResults({ [styleId]: primary });

      // Then warm the other styles in the background so switching is free.
      const others = styles.filter((s) => s.id !== styleId).slice(0, 3);
      void Promise.allSettled(
        others.map(async (s) => {
          try {
            const result = await callApi(s.id, true);
            setResults((prev) => ({ ...prev, [s.id]: result }));
          } catch {
            /* a warm-up failure is invisible — the user can still switch,
               it just costs one round trip when they do. */
          }
        }),
      );
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
    [callApi, hasAnyResult, results],
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
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-stone-200">
                  {/* User-supplied data URL — next/image cannot optimize it. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo} alt="Your yard" className="h-full w-full object-cover" />
                </div>
                <button
                  type="button"
                  onClick={() => fileInput.current?.click()}
                  className="text-caption font-medium text-moss-700 underline underline-offset-4"
                >
                  Use a different photo
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInput.current?.click()}
                className="flex min-h-[140px] w-full flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-stone-500 bg-white p-6 text-center transition-colors hover:border-moss-700"
              >
                <span className="flex gap-2 text-moss-700">
                  <Camera className="h-5 w-5" aria-hidden="true" />
                  <Upload className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-body font-medium text-stone-950">
                  Take a photo or choose one
                </span>
                <span className="text-caption text-stone-500">
                  Stand back far enough to get the whole area in frame
                </span>
              </button>
            )}
            <p className="mt-2 text-caption text-stone-500">
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
                      ? 'border-moss-700 bg-moss-100/50 font-medium ring-1 ring-moss-700'
                      : 'border-stone-200 bg-white hover:border-stone-500',
                    results[s.id] && styleId !== s.id && 'border-moss-500',
                  )}
                >
                  {s.label}
                  {results[s.id] && styleId !== s.id && (
                    <span className="ml-1.5 text-caption text-moss-700">ready</span>
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
                      <legend className="mb-2 text-caption font-semibold uppercase tracking-wide text-stone-500">
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
                                  ? 'border-moss-700 bg-moss-100/50 font-medium'
                                  : 'border-stone-200 bg-white hover:border-stone-500',
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
            <label htmlFor="ref-width" className="mb-1.5 block text-caption text-stone-500">
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
              className="w-full max-w-[10rem] rounded-sm border border-stone-200 bg-white px-3 py-2.5 text-body focus:border-moss-700"
            />
            <p className="mt-2 text-caption text-stone-500">
              A rough number is fine. It is what lets us size the quantities instead of guessing.
            </p>
          </Step>

          <button
            type="button"
            onClick={() => void generate()}
            disabled={!canGenerate}
            className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-sm bg-clay-600 px-7 text-body font-semibold text-white transition-colors hover:bg-clay-600/90 disabled:cursor-not-allowed disabled:opacity-60"
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
            ) : (
              'See your yard redesigned'
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
                    className="shimmer aspect-[4/3] w-full rounded-sm border border-stone-200"
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
                    className="flex aspect-[4/3] w-full flex-col items-center justify-center rounded-sm border border-dashed border-stone-200 bg-white p-8 text-center"
                  >
                    <p className="text-body-lg font-medium text-stone-950">
                      Your design appears here
                    </p>
                    <p className="mt-2 max-w-sm text-body text-stone-500">
                      Pick a scope and a style, then hit the button. It takes about thirty seconds.
                    </p>
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
                    {current.image ? (
                      <figure className="relative">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-stone-200 bg-stone-200">
                          {/* Provider output: either a remote URL or a data URL,
                              neither of which next/image can optimize. */}
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
                    ) : (
                      <div className="rounded-sm border border-warn/30 bg-warn/5 p-6">
                        <p className="text-body font-medium text-stone-950">
                          {current.message ?? 'Rendering is unavailable right now.'}
                        </p>
                        <p className="mt-2 text-body text-stone-500">
                          Your scope and cost range are below — that is the part that matters, and
                          it is built from the same selections.
                        </p>
                      </div>
                    )}

                    <AiConceptNote />

                    {current.notices.map((notice) => (
                      <p
                        key={notice}
                        className="rounded-sm border border-stone-200 bg-white px-4 py-3 text-caption text-stone-800"
                      >
                        {notice}
                      </p>
                    ))}

                    {/* Element toggles */}
                    <fieldset>
                      <legend className="mb-2 text-caption font-semibold uppercase tracking-wide text-stone-500">
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
                                  ? 'border-moss-700 bg-moss-100/50 font-medium'
                                  : 'border-stone-200 bg-white hover:border-stone-500',
                              )}
                            >
                              {on && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
                              {toggle.label}
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>

                    <ScopeSheet estimate={current.estimate} gated={!gateOpen} />

                    {!gateOpen ? (
                      <div className="rounded-sm border border-moss-700/30 bg-moss-100/40 p-6">
                        <h3 className="text-h3">
                          Get the full-resolution design + written scope and cost range
                        </h3>
                        <p className="mt-2 max-w-prose text-body text-stone-800">
                          We will send the un-watermarked render along with a written scope sheet,
                          and an estimator will call to confirm the site details.
                        </p>
                        <div className="mt-5">
                          <QuoteForm
                            renderId={String(current.seed)}
                            compact
                            defaultProjectType={quoteTypeForScope(scopeId)}
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
      <h2 className="mb-3 flex items-center gap-2.5 text-body-lg font-semibold text-stone-950">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-moss-700 text-[12px] font-bold text-white">
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
          ? 'border-moss-700 bg-moss-100/50 ring-1 ring-moss-700'
          : 'border-stone-200 bg-white hover:border-stone-500',
      )}
    >
      <span className="block text-body font-medium text-stone-950">{title}</span>
      <span className="mt-0.5 block text-caption text-stone-500">{description}</span>
    </button>
  );
}

function ScopeSheet({ estimate, gated }: { estimate: Estimate; gated: boolean }) {
  return (
    <section className="rounded-sm border border-stone-200 bg-white p-5">
      <h3 className="text-h3">Scope &amp; cost range</h3>
      <ul className="mt-4 divide-y divide-stone-200">
        {estimate.lineItems.map((item) => (
          <li key={item.label} className="flex items-baseline justify-between gap-4 py-2.5">
            <span>
              <span className="block text-body text-stone-950">{item.label}</span>
              <span className="block text-caption text-stone-500">{item.detail}</span>
            </span>
            <span
              className={cn(
                'shrink-0 whitespace-nowrap text-body font-semibold text-moss-700',
                gated && 'select-none blur-[5px]',
              )}
              aria-hidden={gated}
            >
              {formatRange(item.low, item.high)}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-stone-200 pt-4">
        <span className="text-body font-semibold text-stone-950">Total range</span>
        <span
          className={cn(
            'whitespace-nowrap text-body-lg font-bold text-stone-950',
            gated && 'select-none blur-[6px]',
          )}
          aria-hidden={gated}
        >
          {formatRange(estimate.totalLow, estimate.totalHigh)}
        </span>
      </div>

      <p className="mt-3 text-caption text-stone-500">{estimate.timeline}</p>
      <ul className="mt-3 space-y-1.5">
        {estimate.notes.map((note) => (
          <li key={note} className="text-caption text-stone-500">
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
