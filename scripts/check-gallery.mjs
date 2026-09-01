#!/usr/bin/env node
/**
 * Gallery, hero and lightbox checks, run against a built site.
 *
 * These are the things that were wrong and that nothing else here would notice:
 *
 *   - The hero shipped two crops to phones. <picture> pointed one <source> at a
 *     raw file so it never reached the optimizer, and `priority` on the inner
 *     next/image emitted a preload with no media attribute, so the desktop crop
 *     was fetched as well. So: exactly one hero request per breakpoint, through
 *     /_next/image, under budget, and the right crop for the viewport.
 *
 *   - Seventeen of the fifty-eight gallery entries pointed at a photograph that
 *     was already in the grid, and all fifty-eight shared one alt string. The
 *     link checker only asserts that an alt attribute exists, which is why it
 *     passed. So: no repeated src, no repeated alt, no template text — and,
 *     since twelve project photos turned out to be gallery files under a
 *     second name, no repeated photograph either, judged by perceptual hash.
 *
 *   - The lightbox was <div role="dialog" aria-modal="true"> with no focus
 *     management at all. So: focus enters, stays in, and comes back to the
 *     thumbnail that opened it.
 *
 *   - Five service cards resolved to generated stock because a .jpg outranks an
 *     .svg in lib/service-art.ts. So: those pages must not reference them.
 *
 * Static checks live in scripts/verify.mjs; crawl checks in check-links.mjs;
 * layout and contrast in audit-ui.mjs. This one needs a real browser and a
 * running server:
 *
 *   npx next build && npx next start &
 *   node scripts/check-gallery.mjs --base=http://localhost:3000
 */

import { readFileSync } from 'node:fs';
import { chromium } from 'playwright';
const args = process.argv.slice(2);
const BASE = (args.find((a) => a.startsWith('--base=')) ?? '--base=http://localhost:3000').split('=')[1].replace(/\/$/, '');
/** Set PLAYWRIGHT_CHROMIUM_PATH when the bundled build does not match. */
const EXE = process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined;
let failures = 0;
const ok  = m => console.log('  ✓ ' + m);
const bad = m => { failures++; console.log('  ✗ ' + m); };

/**
 * Same photograph, different file. Twelve of the project photos in
 * public/images/portfolio/ are byte-for-byte (one of them re-encoded) copies
 * of a job-gallery file, and the src/alt checks below compare paths, so they
 * passed while /portfolio showed the same picture twice. The provenance
 * manifest carries a perceptual hash of every file's pixels; two hashes within
 * six bits are one photograph (lib/photo-identity.ts, same number).
 */
const PROVENANCE = JSON.parse(readFileSync(new URL('../data/photo-provenance.json', import.meta.url), 'utf8'));
const SAME_PHOTO_BITS = 6;
const phashOf = src => PROVENANCE[src.replace(/^\/images\//, '')]?.phash;
const hamming = (a, b) => {
  let bits = 0;
  for (let i = 0; i < a.length; i += 1) {
    let x = parseInt(a[i], 16) ^ parseInt(b[i], 16);
    while (x) { bits += x & 1; x >>= 1; }
  }
  return bits;
};
/** Pairs of paths on one page that hold the same photograph. */
const samePhotoPairs = srcs => {
  const pairs = [];
  for (let i = 0; i < srcs.length; i += 1) {
    const a = phashOf(srcs[i]);
    if (!a) continue;
    for (let j = i + 1; j < srcs.length; j += 1) {
      if (srcs[i] === srcs[j]) continue;
      const b = phashOf(srcs[j]);
      if (b && hamming(a, b) <= SAME_PHOTO_BITS) pairs.push(`${srcs[i]} = ${srcs[j]}`);
    }
  }
  return pairs;
};

const browser = await chromium.launch(EXE ? { executablePath: EXE } : {});

// ── 1. hero: one request per breakpoint, through the optimizer ───────────────
console.log('\n== hero delivery ==');
for (const [label, vp, expect] of [
  ['mobile  390x844', { width: 390, height: 844 }, 'hero-home-mobile'],
  ['desktop 1280x800', { width: 1280, height: 800 }, 'hero-home.jpg'],
]) {
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  const reqs = [];
  page.on('response', async r => {
    const u = decodeURIComponent(r.url());
    if (!/hero-home/.test(u)) return;
    let bytes = 0;
    try { bytes = (await r.body()).length; } catch {}
    reqs.push({ url: r.url(), decoded: u, bytes, type: r.headers()['content-type'] });
  });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  if (reqs.length === 1) ok(`${label}: exactly 1 hero request`);
  else bad(`${label}: ${reqs.length} hero requests — ${reqs.map(r => r.decoded.split('url=')[1] ?? r.decoded).join(', ')}`);

  for (const r of reqs) {
    r.url.includes('/_next/image')
      ? ok(`${label}: went through the optimizer`)
      : bad(`${label}: bypassed the optimizer — ${r.url}`);
    r.decoded.includes(expect)
      ? ok(`${label}: served the ${expect} crop`)
      : bad(`${label}: wrong crop — ${r.decoded}`);
    const kb = (r.bytes / 1024).toFixed(0);
    if (label.startsWith('mobile')) {
      r.bytes < 120 * 1024 ? ok(`mobile: ${kb} kB (< 120 kB)`) : bad(`mobile: ${kb} kB, over budget`);
    } else ok(`desktop: ${kb} kB, ${r.type}`);
  }
  await ctx.close();
}

// ── 2. portfolio: no repeated photo, no repeated alt ─────────────────────────
console.log('\n== /portfolio gallery ==');
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + '/portfolio', { waitUntil: 'networkidle' });

  const imgs = await page.$$eval('ul img', els => els.map(e => ({
    src: decodeURIComponent(new URL(e.currentSrc || e.src, location.href).searchParams.get('url') || e.src),
    alt: e.alt,
  })));

  const srcs = imgs.map(i => i.src);
  const dupSrc = srcs.filter((s, i) => srcs.indexOf(s) !== i);
  dupSrc.length === 0 ? ok(`${srcs.length} gallery photos, none repeated`)
                      : bad(`repeated photo(s): ${[...new Set(dupSrc)].join(', ')}`);

  const twins = samePhotoPairs(srcs);
  twins.length === 0 ? ok('no photograph appears under two filenames')
                     : bad(`same photograph twice: ${twins.join('; ')}`);

  const alts = imgs.map(i => i.alt);
  const dupAlt = alts.filter((a, i) => alts.indexOf(a) !== i);
  dupAlt.length === 0 ? ok('every alt string is unique')
                      : bad(`repeated alt(s): ${[...new Set(dupAlt)].map(a => JSON.stringify(a.slice(0,50))).join(', ')}`);

  const template = alts.filter(a => /completed work in Greater Seattle/.test(a));
  template.length === 0 ? ok('the old template alt is gone')
                        : bad(`${template.length} photos still use the template alt`);

  const short = alts.filter(a => a.length < 25);
  short.length === 0 ? ok('no stub alt text') : bad(`${short.length} alts under 25 chars`);

  const banda = await page.getByText('Slide to compare').count();
  banda === 0 ? ok('empty before/after section is hidden, not an orphaned header')
              : bad('"Slide to compare" header still rendered with no slider');

  // The grid collapses past 40 tiles. Expanding must reveal the rest and must
  // not reintroduce a repeat — the concatenated arrays are where repeats came
  // from last time, and only the tail is collapsed away.
  const more = page.getByRole('button', { name: /Show all \d+ photos/ });
  if (await more.count()) {
    const label = await more.first().innerText();
    await more.first().click();
    await page.waitForTimeout(400);
    const after = await page.$$eval('ul button[aria-label^="Open photo"] img', els => els.map(e => ({
      src: decodeURIComponent(new URL(e.currentSrc || e.src, location.href).searchParams.get('url') || e.src),
      alt: e.alt,
    })));
    const s2 = after.map(i => i.src), a2 = after.map(i => i.alt);
    const promised = parseInt(label.match(/\d+/)[0], 10);
    after.length === promised ? ok(`"${label}" revealed exactly ${promised}`)
                              : bad(`"${label}" revealed ${after.length}`);
    s2.filter((s, i) => s2.indexOf(s) !== i).length === 0
      ? ok('expanded grid has no repeated photo')
      : bad('expanding reintroduced a duplicate photo');
    a2.filter((a, i) => a2.indexOf(a) !== i).length === 0
      ? ok('expanded grid has no repeated alt')
      : bad('expanding reintroduced a duplicate alt');
    // Project cards plus every gallery tile: the collapsed tail is where the
    // project twins used to sit.
    const whole = await page.$$eval('ul img', els => els.map(e =>
      decodeURIComponent(new URL(e.currentSrc || e.src, location.href).searchParams.get('url') || e.src)));
    const twins2 = samePhotoPairs(whole);
    twins2.length === 0 ? ok(`${whole.length} photos on the page, each photograph once`)
                        : bad(`same photograph twice after expanding: ${twins2.join('; ')}`);
  } else {
    ok('gallery short enough that no expander is needed');
  }
  await ctx.close();
}

// ── 3. lightbox keyboard round-trip ──────────────────────────────────────────
console.log('\n== lightbox focus management ==');
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + '/portfolio', { waitUntil: 'networkidle' });

  const thumb = page.locator('ul button[aria-label^="Open photo"]').first();
  await thumb.focus();
  const before = await page.evaluate(() => document.activeElement?.getAttribute('aria-label'));
  await page.keyboard.press('Enter');
  await page.waitForSelector('[role="dialog"]', { state: 'visible' });

  const inside = await page.evaluate(() =>
    !!document.querySelector('[role="dialog"]')?.contains(document.activeElement));
  inside ? ok('focus moved into the dialog on open') : bad('focus stayed on the page behind the dialog');

  const counter = page.getByText(/^\d+ of \d+$/);
  (await counter.count()) ? ok(`counter shown: "${await counter.first().innerText()}"`)
                          : bad('no photo counter');

  const first = await counter.first().innerText();
  await page.getByLabel('Next photo').click();
  await page.waitForTimeout(250);
  const second = await counter.first().innerText();
  second !== first ? ok(`Next advanced: ${first} → ${second}`) : bad('Next did not advance');

  await page.getByLabel('Previous photo').click();
  await page.waitForTimeout(250);
  (await counter.first().innerText()) === first ? ok('Previous went back') : bad('Previous did not go back');

  for (let i = 0; i < 12; i++) await page.keyboard.press('Tab');
  const trapped = await page.evaluate(() =>
    !!document.querySelector('[role="dialog"]')?.contains(document.activeElement));
  trapped ? ok('focus is trapped after 12 tabs') : bad('focus escaped the dialog');

  await page.keyboard.press('Escape');
  await page.waitForSelector('[role="dialog"]', { state: 'detached' });
  // Focus restore can legitimately land a frame or two after the dialog
  // detaches, so poll briefly rather than sampling once — otherwise this
  // measures the test's timing rather than the page's behaviour.
  const restored = await page
    .waitForFunction(
      (want) => document.activeElement?.getAttribute('aria-label') === want,
      before,
      { timeout: 2000 },
    )
    .then(() => before)
    .catch(() => page.evaluate(() => document.activeElement?.getAttribute('aria-label')));
  restored === before ? ok('focus returned to the thumbnail that opened it')
                      : bad(`focus went to ${JSON.stringify(restored)}, expected ${JSON.stringify(before)}`);
  await ctx.close();
}

// ── 4. service cards no longer show the generated stock ──────────────────────
console.log('\n== service card art ==');
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  for (const p of ['/services/hardscaping/driveways', '/services/irrigation/sprinkler-installation']) {
    await page.goto(BASE + p, { waitUntil: 'networkidle' });
    const srcs = await page.$$eval('img', els => els.map(e => decodeURIComponent(e.src)));
    const stock = srcs.filter(s => /services\/(driveways|irrigation|irrigation-maintenance|sprinkler-installation|sprinkler-repair)\.jpg/.test(s));
    stock.length === 0 ? ok(`${p}: no generated stock`) : bad(`${p}: still shows ${stock.join(', ')}`);
  }
  await ctx.close();
}

await browser.close();
console.log(failures ? `\nFAILED — ${failures} check(s)\n` : '\nAll change-specific checks passed.\n');
process.exit(failures ? 1 : 0);
