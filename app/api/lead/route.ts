import { NextResponse } from 'next/server';

import { buildEstimate, type RenderSpec } from '@/data/pricing';
import { leadSchema } from '@/lib/lead-schema';
import { logLead, notifyLead, type LeadContext } from '@/lib/notify';
import { clientIp, rateLimit } from '@/lib/rate-limit';

/**
 * The single lead intake endpoint.
 *
 * Every conversion on the site — the quote form, the contact page, the
 * visualizer gate — posts here. One route means one validation path, one spam
 * defence and one notification pipeline.
 *
 * Delivery failures are logged but do not fail the request: once a valid lead
 * reaches this handler it must never be lost to an SMTP hiccup, because the
 * customer has already been told it went through.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_HOUR = 8;

function leadId(): string {
  return `L-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`.toUpperCase();
}

export async function POST(req: Request) {
  const ip = clientIp(req.headers);
  const limit = rateLimit(`lead:${ip}`, MAX_PER_HOUR, WINDOW_MS);

  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Too many requests. Please call us instead.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil((limit.resetAt - Date.now()) / 1000)) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);

  if (!parsed.success) {
    // The honeypot lives in the same schema. A bot that filled it gets a 200
    // with no side effects — telling it that it failed just teaches it to retry.
    const honeypotTripped = parsed.error.issues.some((i) => i.path[0] === 'company');
    if (honeypotTripped) {
      return NextResponse.json({ ok: true, leadId: leadId() });
    }

    return NextResponse.json(
      {
        error: 'Please check the highlighted fields',
        issues: parsed.error.issues.map((i) => ({ field: i.path.join('.'), message: i.message })),
      },
      { status: 400 },
    );
  }

  const lead = parsed.data;

  // A render spec may ride along from the visualizer gate, which turns the
  // notification into a scope sheet rather than a name and a number.
  const rawSpec = (body as { spec?: RenderSpec }).spec;
  const estimate = rawSpec ? buildEstimate(rawSpec) : undefined;

  const ctx: LeadContext = {
    lead,
    leadId: leadId(),
    estimate,
    renderUrl: (body as { renderUrl?: string }).renderUrl,
    receivedAt: new Date().toISOString(),
  };

  const [notify] = await Promise.all([notifyLead(ctx), logLead(ctx)]);

  if (notify.errors.length) {
    console.error('[lead] delivery issues', { leadId: ctx.leadId, errors: notify.errors });
  }

  // If nothing at all got out, the owner will never see this lead. Surface it
  // loudly in the logs and tell the user to call — losing it silently is worse
  // than admitting the problem.
  const delivered = notify.ownerEmail || notify.ownerSms;
  if (!delivered) {
    console.error('[lead] NOT DELIVERED — captured only in logs', { leadId: ctx.leadId, lead });
  }

  return NextResponse.json({
    ok: true,
    leadId: ctx.leadId,
    delivered,
    estimate: estimate ?? null,
  });
}
