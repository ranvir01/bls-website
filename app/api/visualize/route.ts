import { NextResponse } from 'next/server';
import { z } from 'zod';

import { buildEstimate } from '@/data/pricing';
import { scopes, styles } from '@/data/buildable';
import { clientIp, rateLimit } from '@/lib/rate-limit';
import { assemblePrompt, deriveSpec, generationConfigured } from '@/lib/visualizer-prompt';

/**
 * Yard visualizer generation endpoint.
 *
 * The image API key never leaves the server, and the prompt is assembled here
 * from the buildable catalog — the client sends option IDs, never prose.
 *
 * Graceful degradation is a hard requirement: if generation is unavailable or
 * fails, this still returns the derived scope and estimate, because that is the
 * part that actually converts. The user must never hit a dead end.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * 3 generations per hour, 10 per day. Toggles cost less than a fresh render.
 *
 * Toggles and the background style warm-ups get their own buckets, hourly AND
 * daily. The daily bucket used to be shared, and since every Generate click
 * fans out into one primary plus three warm-up requests, "10 a day" was really
 * two and a half — the third click 429'd on its warm-ups and the fourth on
 * the render itself. The warm-up allowance is sized at four per render.
 */
const HOURLY_LIMIT = 3;
const DAILY_LIMIT = 10;
const TOGGLE_HOURLY_LIMIT = 12;
const TOGGLE_DAILY_LIMIT = 40;

const requestSchema = z.object({
  scopeId: z.enum(scopes.map((s) => s.id) as [string, ...string[]]),
  styleId: z.enum(styles.map((s) => s.id) as [string, ...string[]]),
  optionIds: z.array(z.string().max(60)).max(12).default([]),
  toggleIds: z.array(z.string().max(60)).max(8).default([]),
  referenceWidthFt: z.number().min(4).max(400).optional(),
  seed: z.number().int().min(0).max(2 ** 31).optional(),
  /** Data URL of the user's resized yard photo, used as the img2img base. */
  photo: z.string().max(12_000_000).optional(),
  /** True when this is an element toggle on an existing render, not a new one. */
  isToggle: z.boolean().default(false),
});

export async function POST(req: Request) {
  const ip = clientIp(req.headers);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid selection' }, { status: 400 });
  }

  const input = parsed.data;

  // Toggles within a session are cheaper and get a higher allowance, so a user
  // exploring options is not punished for engaging with the tool.
  const hourly = rateLimit(
    `viz:h:${ip}${input.isToggle ? ':t' : ''}`,
    input.isToggle ? TOGGLE_HOURLY_LIMIT : HOURLY_LIMIT,
    60 * 60 * 1000,
  );
  const daily = rateLimit(
    `viz:d:${ip}${input.isToggle ? ':t' : ''}`,
    input.isToggle ? TOGGLE_DAILY_LIMIT : DAILY_LIMIT,
    24 * 60 * 60 * 1000,
  );

  if (!hourly.ok || !daily.ok) {
    return NextResponse.json(
      {
        error: 'rate_limited',
        message:
          'You have hit the free generation limit. Send us the design you already have and we will take it from there.',
      },
      { status: 429 },
    );
  }

  const seed = input.seed ?? Math.floor(Math.random() * 2 ** 31);
  const assembled = assemblePrompt({ ...input, seed });
  const spec = deriveSpec({ ...input, seed });
  const estimate = buildEstimate(spec);

  // No provider configured, or none reachable → still return everything that
  // does not need one. The scope sheet is the gated asset anyway.
  if (!generationConfigured()) {
    return NextResponse.json({
      ok: true,
      degraded: true,
      reason: 'generation_unavailable',
      message:
        'Live rendering is not switched on yet. Here is the scope and cost range from your selections — send it over and we will sketch it properly.',
      image: null,
      seed,
      spec,
      estimate,
      notices: assembled.notices,
    });
  }

  try {
    const image = await generate(assembled.prompt, assembled.negativePrompt, seed, input.photo);

    return NextResponse.json({
      ok: true,
      degraded: false,
      image,
      seed,
      spec,
      estimate,
      notices: assembled.notices,
    });
  } catch (err) {
    console.error('[visualize] generation failed', err);

    return NextResponse.json({
      ok: true,
      degraded: true,
      reason: 'generation_failed',
      message:
        'The renderer did not come back this time. Your scope and cost range are below — send them over and we will pick it up from there.',
      image: null,
      seed,
      spec,
      estimate,
      notices: assembled.notices,
    });
  }
}

/**
 * Call the configured image provider.
 *
 * Deliberately provider-agnostic: point IMAGE_API_URL at any endpoint that
 * accepts a JSON body with a prompt and returns either a URL or base64 image
 * data. See docs/DEPLOYMENT.md for the exact shape and worked examples.
 */
async function generate(
  prompt: string,
  negativePrompt: string,
  seed: number,
  photo?: string,
): Promise<string> {
  const url = process.env.IMAGE_API_URL!;
  const key = process.env.IMAGE_API_KEY!;
  const model = process.env.IMAGE_API_MODEL;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60_000);

  try {
    const res = await fetch(url, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        ...(model ? { model } : {}),
        prompt,
        negative_prompt: negativePrompt,
        seed,
        // Passing the yard photo turns this into img2img, which is what keeps
        // the user's actual house in the frame rather than inventing one.
        ...(photo ? { image: photo, strength: 0.72 } : {}),
        width: 1024,
        height: 768,
        n: 1,
      }),
    });

    if (!res.ok) {
      throw new Error(`provider responded ${res.status}`);
    }

    const json = (await res.json()) as {
      data?: { url?: string; b64_json?: string }[];
      images?: string[];
      output?: string[];
    };

    const fromData = json.data?.[0];
    if (fromData?.url) return fromData.url;
    if (fromData?.b64_json) return `data:image/png;base64,${fromData.b64_json}`;
    if (json.images?.[0]) return normalize(json.images[0]);
    if (json.output?.[0]) return normalize(json.output[0]);

    throw new Error('provider returned no image');
  } finally {
    clearTimeout(timeout);
  }
}

function normalize(value: string): string {
  return value.startsWith('http') || value.startsWith('data:')
    ? value
    : `data:image/png;base64,${value}`;
}
