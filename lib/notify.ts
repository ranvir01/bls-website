import nodemailer from 'nodemailer';

import { PHONE, business, formattedAddress } from '@/data/business';
import {
  BUDGET_OPTIONS,
  SIZE_OPTIONS,
  TIMELINE_OPTIONS,
  type LeadInput,
  isInServiceArea,
  labelFor,
  projectTypeLabel,
} from '@/lib/lead-schema';
import type { Estimate } from '@/data/pricing';
import { formatRange } from '@/data/pricing';

/**
 * Phase 7 speed-to-lead pipeline.
 *
 * The single highest-ROI mechanism in the build: the owner gets an SMS and an
 * email within seconds of a submit, containing everything needed to call back
 * informed. Nothing here blocks the user's response — the route awaits these
 * but treats a delivery failure as non-fatal, because a lead that reached the
 * server must never be lost to a mail outage.
 */

const REQUIRED_SMTP = ['EMAIL_HOST', 'EMAIL_USER', 'EMAIL_PASSWORD'] as const;

export function emailConfigured(): boolean {
  return REQUIRED_SMTP.every((k) => Boolean(process.env[k]));
}

export function smsConfigured(): boolean {
  return Boolean(
    process.env.TWILIO_ACCOUNT_SID &&
      process.env.TWILIO_AUTH_TOKEN &&
      process.env.TWILIO_PHONE_NUMBER &&
      process.env.OWNER_PHONE_NUMBER,
  );
}

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter | null {
  if (!emailConfigured()) return null;
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT ?? 587),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: { user: process.env.EMAIL_USER!, pass: process.env.EMAIL_PASSWORD! },
  });

  return transporter;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatPhone(raw: string): string {
  const d = raw.replace(/\D/g, '').replace(/^1/, '');
  return d.length === 10 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : raw;
}

export interface LeadContext {
  lead: LeadInput;
  leadId: string;
  estimate?: Estimate;
  /** Public URL of the render that produced this lead, if any. */
  renderUrl?: string;
  receivedAt: string;
}

// ── Owner notification ───────────────────────────────────────────────────────

function ownerSubject({ lead }: LeadContext): string {
  const area = isInServiceArea(lead.zip) ? '' : ' [OUT OF AREA]';
  return `New lead: ${lead.name} — ${projectTypeLabel(lead.projectType)} in ${lead.city}${area}`;
}

function ownerHtml(ctx: LeadContext): string {
  const { lead, leadId, estimate, renderUrl, receivedAt } = ctx;

  const rows: [string, string | undefined][] = [
    ['Name', lead.name],
    ['Phone', formatPhone(lead.phone)],
    ['Email', lead.email || '—'],
    ['City', lead.city],
    ['ZIP', `${lead.zip}${isInServiceArea(lead.zip) ? '' : ' (outside usual service area)'}`],
    ['Project', projectTypeLabel(lead.projectType)],
    ['Size', labelFor(SIZE_OPTIONS, lead.projectSize) ?? '—'],
    ['Timeline', labelFor(TIMELINE_OPTIONS, lead.timeline) ?? '—'],
    ['Budget', labelFor(BUDGET_OPTIONS, lead.budget) ?? '—'],
    ['Came from', lead.sourcePath || '—'],
    ['Lead ID', leadId],
    ['Received', receivedAt],
  ];

  const tableRows = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #D8DAD3;font-weight:600;color:#2A2E28;white-space:nowrap;">${escapeHtml(label)}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #D8DAD3;color:#10120F;">${escapeHtml(value ?? '—')}</td>
      </tr>`,
    )
    .join('');

  const estimateBlock = estimate
    ? `
      <h2 style="font-size:16px;color:#3A5A40;margin:24px 0 8px;">Draft estimate</h2>
      <table style="border-collapse:collapse;width:100%;font-size:14px;">
        ${estimate.lineItems
          .map(
            (i) => `<tr>
              <td style="padding:6px 12px;border-bottom:1px solid #D8DAD3;">${escapeHtml(i.label)}<br><span style="color:#6E7468;font-size:12px;">${escapeHtml(i.detail)}</span></td>
              <td style="padding:6px 12px;border-bottom:1px solid #D8DAD3;text-align:right;white-space:nowrap;">${escapeHtml(formatRange(i.low, i.high))}</td>
            </tr>`,
          )
          .join('')}
        <tr>
          <td style="padding:10px 12px;font-weight:700;">Total range</td>
          <td style="padding:10px 12px;text-align:right;font-weight:700;white-space:nowrap;">${escapeHtml(formatRange(estimate.totalLow, estimate.totalHigh))}</td>
        </tr>
      </table>
      <p style="font-size:13px;color:#6E7468;margin:8px 0 0;">${escapeHtml(estimate.timeline)}</p>`
    : '';

  const renderBlock = renderUrl
    ? `<p style="margin:20px 0;"><a href="${escapeHtml(renderUrl)}" style="color:#A65D3A;font-weight:600;">View the design they generated →</a></p>
       <img src="${escapeHtml(renderUrl)}" alt="Generated design concept" style="max-width:100%;border:1px solid #D8DAD3;border-radius:3px;">`
    : '';

  const detailsBlock = lead.details
    ? `<h2 style="font-size:16px;color:#3A5A40;margin:24px 0 8px;">What they wrote</h2>
       <p style="white-space:pre-wrap;color:#10120F;">${escapeHtml(lead.details)}</p>`
    : '';

  return `<!doctype html>
<html><body style="margin:0;padding:24px;background:#F7F7F4;font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#10120F;">
  <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #D8DAD3;border-radius:4px;padding:24px;">
    <p style="margin:0 0 4px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#A65D3A;font-weight:700;">Call within the hour</p>
    <h1 style="font-size:22px;margin:0 0 16px;color:#10120F;">${escapeHtml(lead.name)} — ${escapeHtml(projectTypeLabel(lead.projectType))}</h1>
    <p style="margin:0 0 20px;">
      <a href="tel:${escapeHtml(lead.phone.replace(/\D/g, ''))}" style="display:inline-block;background:#A65D3A;color:#fff;padding:12px 20px;border-radius:3px;text-decoration:none;font-weight:600;">Call ${escapeHtml(formatPhone(lead.phone))}</a>
    </p>
    <table style="border-collapse:collapse;width:100%;font-size:14px;">${tableRows}</table>
    ${detailsBlock}
    ${estimateBlock}
    ${renderBlock}
  </div>
</body></html>`;
}

function ownerSms(ctx: LeadContext): string {
  const { lead, estimate, renderUrl } = ctx;
  const parts = [
    `NEW LEAD — ${lead.name}`,
    formatPhone(lead.phone),
    `${projectTypeLabel(lead.projectType)} · ${lead.city} ${lead.zip}`,
  ];

  const size = labelFor(SIZE_OPTIONS, lead.projectSize);
  if (size) parts.push(`Size: ${size}`);

  const when = labelFor(TIMELINE_OPTIONS, lead.timeline);
  if (when) parts.push(`Timeline: ${when}`);

  if (estimate) parts.push(`Draft: ${formatRange(estimate.totalLow, estimate.totalHigh)}`);
  if (renderUrl) parts.push(`Render: ${renderUrl}`);
  if (!isInServiceArea(lead.zip)) parts.push('NOTE: outside usual service area');

  return parts.join('\n');
}

// ── Customer auto-reply ──────────────────────────────────────────────────────

function customerHtml(ctx: LeadContext): string {
  const { lead, renderUrl } = ctx;

  return `<!doctype html>
<html><body style="margin:0;padding:24px;background:#F7F7F4;font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#10120F;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #D8DAD3;border-radius:4px;padding:28px;">
    <h1 style="font-size:20px;margin:0 0 12px;">Thanks, ${escapeHtml(lead.name.split(' ')[0])} — we have your request.</h1>
    <p style="line-height:1.6;margin:0 0 14px;">A Blue Landscaping estimator will call you shortly at ${escapeHtml(formatPhone(lead.phone))} to confirm the details and book your free on-site walkthrough.</p>
    <p style="line-height:1.6;margin:0 0 14px;">If it is easier to reach us first, call or text ${escapeHtml(PHONE.display)}.</p>
    ${renderUrl ? `<p style="margin:20px 0;"><img src="${escapeHtml(renderUrl)}" alt="Your design concept" style="max-width:100%;border:1px solid #D8DAD3;border-radius:3px;"><br><span style="font-size:12px;color:#6E7468;">AI design concept — a design we build, not a photo of completed work.</span></p>` : ''}
    <hr style="border:0;border-top:1px solid #D8DAD3;margin:22px 0;">
    <p style="font-size:13px;color:#6E7468;line-height:1.6;margin:0;">
      ${escapeHtml(business.legalName)}<br>
      ${escapeHtml(formattedAddress)}<br>
      WA Contractor License ${escapeHtml(business.license.number)} · Licensed, bonded &amp; insured
    </p>
  </div>
</body></html>`;
}

// ── Senders ──────────────────────────────────────────────────────────────────

async function sendSms(to: string, body: string): Promise<void> {
  const sid = process.env.TWILIO_ACCOUNT_SID!;
  const token = process.env.TWILIO_AUTH_TOKEN!;
  const from = process.env.TWILIO_PHONE_NUMBER!;

  // Twilio's REST API over fetch — avoids pulling the SDK into the bundle for
  // one endpoint.
  const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ To: to, From: from, Body: body }),
  });

  if (!res.ok) {
    throw new Error(`Twilio responded ${res.status}: ${await res.text()}`);
  }
}

export interface NotifyResult {
  ownerEmail: boolean;
  ownerSms: boolean;
  customerEmail: boolean;
  customerSms: boolean;
  errors: string[];
}

/**
 * Fan out every notification concurrently. Each channel is independent — a
 * Twilio outage must not stop the owner's email from going out.
 */
export async function notifyLead(ctx: LeadContext): Promise<NotifyResult> {
  const errors: string[] = [];
  const result: NotifyResult = {
    ownerEmail: false,
    ownerSms: false,
    customerEmail: false,
    customerSms: false,
    errors,
  };

  const mailer = getTransporter();
  const ownerAddress = process.env.EMAIL_TO ?? business.email;
  const fromAddress = process.env.EMAIL_FROM ?? process.env.EMAIL_USER ?? business.email;

  const tasks: Promise<void>[] = [];

  if (mailer) {
    tasks.push(
      mailer
        .sendMail({
          from: { name: business.name, address: fromAddress },
          to: ownerAddress,
          replyTo: ctx.lead.email || undefined,
          subject: ownerSubject(ctx),
          html: ownerHtml(ctx),
          headers: { 'X-Priority': '1', Importance: 'high' },
        })
        .then(() => {
          result.ownerEmail = true;
        })
        .catch((e) => {
          errors.push(`owner email: ${e.message}`);
        }),
    );

    if (ctx.lead.email) {
      tasks.push(
        mailer
          .sendMail({
            from: { name: business.name, address: fromAddress },
            to: ctx.lead.email,
            subject: `We got your request — ${business.name}`,
            html: customerHtml(ctx),
          })
          .then(() => {
            result.customerEmail = true;
          })
          .catch((e) => {
            errors.push(`customer email: ${e.message}`);
          }),
      );
    }
  } else {
    errors.push('email not configured (EMAIL_HOST / EMAIL_USER / EMAIL_PASSWORD)');
  }

  if (smsConfigured()) {
    tasks.push(
      sendSms(process.env.OWNER_PHONE_NUMBER!, ownerSms(ctx))
        .then(() => {
          result.ownerSms = true;
        })
        .catch((e) => {
          errors.push(`owner sms: ${e.message}`);
        }),
    );

    tasks.push(
      sendSms(
        ctx.lead.phone,
        `Thanks ${ctx.lead.name.split(' ')[0]} — a Blue Landscaping estimator will call you shortly. Questions? Call or text ${PHONE.display}.`,
      )
        .then(() => {
          result.customerSms = true;
        })
        .catch((e) => {
          errors.push(`customer sms: ${e.message}`);
        }),
    );
  } else {
    errors.push('sms not configured (TWILIO_* / OWNER_PHONE_NUMBER)');
  }

  await Promise.all(tasks);
  return result;
}

/**
 * Lightweight CRM append. Posts the lead to whatever webhook is configured —
 * a Google Apps Script bound to a Sheet, a Zapier catch hook, or an Airtable
 * automation all accept this shape. No-op when unset.
 */
export async function logLead(ctx: LeadContext): Promise<boolean> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return false;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        leadId: ctx.leadId,
        receivedAt: ctx.receivedAt,
        ...ctx.lead,
        estimateLow: ctx.estimate?.totalLow,
        estimateHigh: ctx.estimate?.totalHigh,
        renderUrl: ctx.renderUrl,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
