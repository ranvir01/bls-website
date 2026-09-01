import { scopes, styles } from '@/data/buildable';
import { formatRange, type Estimate } from '@/data/pricing';

/**
 * Deep links into the yard visualizer.
 *
 * Money pages pass a scope so a Kent patio page opens on paver patio, not a
 * blank tool. Only catalog IDs are accepted — unknown query values are ignored.
 */
export function scopeIdForService(serviceSlug: string | undefined): string | undefined {
  if (!serviceSlug) return undefined;
  return scopes.find((scope) => scope.serviceSlugs.includes(serviceSlug))?.id;
}

export function visualizerHref(opts?: { scope?: string; style?: string }): string {
  const params = new URLSearchParams();
  const scope = opts?.scope && scopes.some((s) => s.id === opts.scope) ? opts.scope : undefined;
  const style = opts?.style && styles.some((s) => s.id === opts.style) ? opts.style : undefined;
  if (scope) params.set('scope', scope);
  if (style) params.set('style', style);
  const query = params.toString();
  return query ? `/visualizer?${query}` : '/visualizer';
}

/** Short note a homeowner can copy, text, or drop into the quote form. */
export function formatScopeMessage({
  scopeLabel,
  styleLabel,
  widthFt,
  estimate,
  comparableTitle,
}: {
  scopeLabel: string;
  styleLabel?: string;
  widthFt?: string;
  estimate: Estimate;
  comparableTitle?: string;
}): string {
  const bits = [scopeLabel];
  if (styleLabel) bits.push(styleLabel);
  if (widthFt) bits.push(`~${widthFt} ft house width`);

  const lines = [
    `Visualizer: ${bits.join(', ')}.`,
    `Range ${formatRange(estimate.totalLow, estimate.totalHigh)}.`,
  ];

  if (comparableTitle) {
    lines.push(`Like the “${comparableTitle}” job.`);
  }

  lines.push('Not a quote — needs a site walk.');
  return lines.join(' ');
}
