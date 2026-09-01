import { NextResponse } from 'next/server';
import { z } from 'zod';

import { buildEstimate } from '@/data/pricing';
import { scopes, styles } from '@/data/buildable';
import { clientIp, rateLimit } from '@/lib/rate-limit';
import {
  assemblePrompt,
  deriveSpec,
  generationConfigured,
  usesGeminiProvider,
} from '@/lib/visualizer-prompt';

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

/** 3 generations per hour, 10 per day. Toggles cost less than a fresh render. */
const HOURLY_LIMIT = 3;
const DAILY_LIMIT = 10;
const TOGGLE_HOURLY_LIMIT = 12;

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

/** Lets the UI tell the truth before anyone hits generate. */
export async function GET() {
  const live = generationConfigured();
  return NextResponse.json({
    generation: live,
    provider: live ? (usesGeminiProvider() ? 'gemini' : 'generic') : 'none',
    message: live
      ? 'Photoreal after-photos are on. We keep your house in the frame and only draw materials we install.'
      : 'After-photos of your own yard need an image key. You still get a written scope, a cost range, and real jobs like yours.',
  });
}

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
  const daily = rateLimit(`viz:d:${ip}`, DAILY_LIMIT, 24 * 60 * 60 * 1000);

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
        'Photoreal after-photos of your own yard are off right now. The scope, cost range, and real jobs below are what we would actually build.',
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
 * Default: Gemini 2.5 Flash Image (Nano Banana) from IMAGE_API_KEY alone.
 * Generic: IMAGE_PROVIDER=generic plus IMAGE_API_URL that accepts the JSON
 * body below. See docs/DEPLOYMENT.md and docs/VISUALIZER.md.
 */
async function generate(
  prompt: string,
  negativePrompt: string,
  seed: number,
  photo?: string,
): Promise<string> {
  if (usesGeminiProvider()) {
    return generateGemini(prompt, negativePrompt, photo);
  }
  return generateGeneric(prompt, negativePrompt, seed, photo);
}

async function generateGemini(
  prompt: string,
  negativePrompt: string,
  photo?: string,
): Promise<string> {
  const key = process.env.IMAGE_API_KEY!;
  const model = process.env.IMAGE_API_MODEL || 'gemini-2.5-flash-image';
  const url =
    process.env.IMAGE_API_URL ||
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  const keepHouse = photo
    ? 'This is a real photograph of the homeowner’s yard. Keep the house, camera angle, roof, existing large trees, fences that are not being replaced, neighboring structures, and sky. Only change the landscaping described. Photorealistic. No people, no text, no watermark, no extra structures that were not requested.'
    : 'Photorealistic residential yard in the Pacific Northwest. No people, no text, no watermark.';

  const parts: { text?: string; inlineData?: { mimeType: string; data: string } }[] = [];

  if (photo) {
    const mime = photo.match(/^data:(image\/[\w.+-]+);base64,/)?.[1] ?? 'image/jpeg';
    const data = photo.replace(/^data:image\/[\w.+-]+;base64,/, '');
    parts.push({ inlineData: { mimeType: mime, data } });
  }
  parts.push({
    text: `${keepHouse}\n\n${prompt}\n\nDo not include: ${negativePrompt}`,
  });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60_000);

  try {
    const res = await fetch(url, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': key,
      },
      body: JSON.stringify({
        contents: [{ role: 'user', parts }],
        generationConfig: { responseModalities: ['TEXT', 'IMAGE'] },
      }),
    });

    if (!res.ok) {
      throw new Error(`gemini responded ${res.status}`);
    }

    const json = (await res.json()) as {
      candidates?: {
        content?: {
          parts?: {
            inlineData?: { data?: string; mimeType?: string };
            inline_data?: { data?: string; mime_type?: string };
          }[];
        };
      }[];
    };

    for (const part of json.candidates?.[0]?.content?.parts ?? []) {
      const data = part.inlineData?.data ?? part.inline_data?.data;
      if (!data) continue;
      const mime = part.inlineData?.mimeType ?? part.inline_data?.mime_type ?? 'image/png';
      return `data:${mime};base64,${data}`;
    }

    throw new Error('gemini returned no image');
  } finally {
    clearTimeout(timeout);
  }
}

async function generateGeneric(
  prompt: string,
  negativePrompt: string,
  seed: number,
  photo?: string,
): Promise<string> {
  const url = process.env.IMAGE_API_URL;
  const key = process.env.IMAGE_API_KEY!;
  const model = process.env.IMAGE_API_MODEL;
  if (!url) throw new Error('IMAGE_API_URL required for generic provider');

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
