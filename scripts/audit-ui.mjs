#!/usr/bin/env node
/**
 * Browser-driven UI audit.
 *
 * Checks the things a static crawl cannot see: horizontal overflow at real
 * phone widths, touch targets under 44px, contrast-relevant focus visibility,
 * and heading order. Run against a running server.
 *
 *   node scripts/audit-ui.mjs --base=http://localhost:3000
 *
 * Screenshots land in .audit/ for eyeballing.
 */

import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const args = process.argv.slice(2);
const BASE = (args.find((a) => a.startsWith('--base=')) ?? '--base=http://localhost:3000')
  .split('=')[1]
  .replace(/\/$/, '');
const SHOOT = args.includes('--screenshots');

const WIDTHS = [360, 390, 414, 768, 1280, 1920];

const PAGES = [
  '/',
  '/services',
  '/services/hardscaping',
  '/services/hardscaping/retaining-walls',
  '/locations',
  '/locations/kent',
  '/locations/kent/paver-patios',
  '/visualizer',
  '/quote',
  '/portfolio',
  '/about',
  '/blog',
  '/contact',
  '/reviews',
];

const problems = [];

function report(page, width, message) {
  problems.push(`${page} @${width}px — ${message}`);
}

const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined,
});

if (SHOOT) await mkdir('.audit', { recursive: true });

for (const width of WIDTHS) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    deviceScaleFactor: 1,
    isMobile: width < 768,
    hasTouch: width < 768,
  });
  const page = await context.newPage();

  for (const path of PAGES) {
    const res = await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle', timeout: 45000 });
    if (!res || res.status() >= 400) {
      report(path, width, `returned ${res?.status() ?? 'no response'}`);
      continue;
    }

    /*
     * 'networkidle' is not "the page has settled".
     *
     * It fires when the network has been quiet for 500ms, which on a cold image
     * optimizer happens while images are still being transcoded and before web
     * fonts have swapped. Measuring there produced failures that did not
     * reproduce: an 8px horizontal overflow on the homepage hero, and pages
     * reported with zero <h1> that plainly have one. Both went away on a warm
     * cache, which is the signature of a race rather than a defect — and a
     * flaky gate is worse than no gate, because it trains people to re-run it
     * until it passes.
     *
     * So wait for what is actually being measured. Note the loading="lazy"
     * exclusion: a lazy image below the fold has not been fetched, so its
     * .complete is false and stays false until someone scrolls — waiting on
     * every image would never resolve and would just trade a flake for a
     * timeout. Eager images are the ones holding up layout anyway.
     */
    await page
      .waitForFunction(
        () => document.fonts.status === 'loaded'
          && [...document.images].every((img) => img.loading === 'lazy' || img.complete),
        null,
        { timeout: 15000 },
      )
      .catch(() => report(path, width, 'eager images or fonts did not settle within 15s'));

    /*
     * Did the page actually hydrate?
     *
     * When React's error boundary catches a client exception it replaces the
     * whole tree with "Application error: a client-side exception has occurred".
     * Every later check then measures that placeholder, and what gets reported
     * is "0 <h1> elements" — which sends you looking at headings on a page
     * whose real problem is that none of its JavaScript ran.
     *
     * The usual cause when running locally is mundane and worth naming: `next
     * build` was re-run underneath a live `next start`, so the served HTML
     * references chunk hashes that no longer exist on disk and every chunk
     * 404s. Restart the server after a build. In production the same signature
     * means a genuinely broken deploy.
     */
    const crashed = await page.evaluate(() =>
      document.body.innerText.includes('Application error: a client-side exception'),
    );
    if (crashed) {
      report(path, width, 'page did not hydrate — React error boundary is showing. If you just rebuilt, restart `next start`; its chunk hashes are stale. Skipping the rest of the checks for this page.');
      continue;
    }

    // ── Horizontal overflow ───────────────────────────────────────────────
    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      const scrollW = Math.max(doc.scrollWidth, document.body.scrollWidth);
      if (scrollW <= doc.clientWidth + 1) return null;

      // Find which elements actually stick out, so the report is actionable.
      const culprits = [];
      for (const el of document.querySelectorAll('body *')) {
        const r = el.getBoundingClientRect();
        if (r.width === 0) continue;
        if (r.right > doc.clientWidth + 1 || r.left < -1) {
          const style = getComputedStyle(el);
          // An element inside its own scroll container is fine — that is the
          // intended pattern for wide tables.
          let parent = el.parentElement;
          let contained = false;
          while (parent && parent !== document.body) {
            const ps = getComputedStyle(parent);
            if (ps.overflowX === 'auto' || ps.overflowX === 'scroll' || ps.overflowX === 'hidden') {
              contained = true;
              break;
            }
            parent = parent.parentElement;
          }
          if (contained || style.position === 'fixed') continue;
          culprits.push(
            `${el.tagName.toLowerCase()}.${String(el.className).split(' ').slice(0, 3).join('.')} (right: ${Math.round(r.right)})`,
          );
          if (culprits.length >= 3) break;
        }
      }
      return { scrollW, clientW: doc.clientWidth, culprits };
    });

    if (overflow) {
      report(
        path,
        width,
        `horizontal scroll: ${overflow.scrollW}px content in ${overflow.clientW}px viewport — ${overflow.culprits.join('; ') || 'no single culprit identified'}`,
      );
    }

    // ── Touch targets (mobile only) ───────────────────────────────────────
    if (width < 768) {
      const small = await page.evaluate(() => {
        const out = [];
        const targets = document.querySelectorAll('a, button, [role="button"], input, select, textarea');
        for (const el of targets) {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) continue;

          const style = getComputedStyle(el);
          if (style.visibility === 'hidden' || style.display === 'none') continue;

          // Deliberately off-screen: the spam honeypot and anything positioned
          // outside the viewport. These are not tappable by definition.
          if (r.right < 0 || r.bottom < 0 || r.left > window.innerWidth) continue;

          // Screen-reader-only affordances (the skip link) are 1x1 until
          // focused, at which point they get full size. Not a tap target.
          if (r.width <= 2 && r.height <= 2) continue;
          if (el.closest('[aria-hidden="true"]')) continue;

          // Inline links inside prose are exempt — the rule targets controls.
          const inProse = el.closest('p, li, figcaption, address, dd, blockquote');
          if (el.tagName === 'A' && inProse) continue;

          if (r.height < 44 || r.width < 24) {
            out.push(
              `${el.tagName.toLowerCase()} "${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 30)}" ${Math.round(r.width)}x${Math.round(r.height)}`,
            );
          }
          if (out.length >= 5) break;
        }
        return out;
      });

      for (const s of small) report(path, width, `touch target under 44px: ${s}`);
    }

    // ── Controls trapped under the fixed action bar ───────────────────────
    //
    // The sticky mobile action bar is fixed at the bottom. If the document
    // cannot scroll past it, whatever sits in that last strip is permanently
    // un-tappable — a tap lands on "Call" instead. This scrolls to the very
    // bottom and checks that nothing interactive is left underneath.
    if (width < 768) {
      const trapped = await page.evaluate(() => {
        // Two details this check got wrong before, both of which produced
        // false positives:
        //   - documentElement, not body: with `overflow-x: clip` on body the
        //     two scrollHeights differ and body's stops short of the bottom.
        //   - behavior 'instant': the site sets `scroll-behavior: smooth`, so
        //     a plain scrollTo animates. On a 10,000px page it was still
        //     mid-flight when the measurement ran.
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' });
        return new Promise((resolve) => {
          setTimeout(() => {
            const bar = document.querySelector('.mobile-action-bar');
            if (!bar) return resolve([]);
            const barTop = bar.getBoundingClientRect().top;

            const out = [];
            for (const el of document.querySelectorAll('a, button, input, select, textarea')) {
              if (el.closest('.mobile-action-bar')) continue;
              const r = el.getBoundingClientRect();
              if (r.width === 0 || r.height === 0) continue;
              if (r.right < 0 || r.left > window.innerWidth) continue;
              if (r.width <= 2 && r.height <= 2) continue;
              // Its midpoint is behind the bar and the page cannot scroll further.
              const mid = r.top + r.height / 2;
              if (mid > barTop && r.top < window.innerHeight) {
                out.push(
                  `${el.tagName.toLowerCase()} "${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 30)}"`,
                );
              }
              if (out.length >= 3) break;
            }
            resolve(out);
          }, 700);
        });
      });

      for (const t of trapped) {
        report(path, width, `control trapped under the fixed action bar at page bottom: ${t}`);
      }

      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    }

    // ── Text contrast on solid CTAs ───────────────────────────────────────
    //
    // This exists because of a real bug that a full visual pass missed: the
    // custom type scale (text-body, text-caption) looks like a text *colour*
    // to tailwind-merge, so it silently dropped `text-white` from every button
    // variant. Every CTA on the site inherited ink-800 instead — dark slate on
    // leaf-600, about 2:1. It read as a deliberate dark-on-green treatment.
    //
    // Only elements with their own opaque background are checked: anything
    // sitting on a photo or a translucent scrim cannot be measured this way,
    // and a guess there would be a false positive.
    if (width === 1280) {
      const lowContrast = await page.evaluate(() => {
        const parse = (s) => (s.match(/[\d.]+/g) || []).map(Number);
        const lum = ([r, g, b]) => {
          const f = (c) => {
            c /= 255;
            return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
          };
          return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
        };
        const ratio = (a, b) => {
          const [hi, lo] = lum(a) >= lum(b) ? [lum(a), lum(b)] : [lum(b), lum(a)];
          return (hi + 0.05) / (lo + 0.05);
        };

        const out = [];
        for (const el of document.querySelectorAll('a, button')) {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) continue;
          const s = getComputedStyle(el);
          const bg = parse(s.backgroundColor);
          // Skip transparent and translucent backgrounds — not measurable here.
          if (bg.length < 3 || (bg.length === 4 && bg[3] < 1)) continue;
          const fg = parse(s.color);
          if (fg.length < 3) continue;

          const size = parseFloat(s.fontSize);
          const bold = Number(s.fontWeight) >= 700;
          // WCAG "large text": 24px, or 18.66px when bold.
          const min = size >= 24 || (bold && size >= 18.66) ? 3 : 4.5;
          const got = ratio(fg.slice(0, 3), bg.slice(0, 3));
          if (got < min) {
            out.push(
              `${(el.textContent || '').trim().slice(0, 30)} — ${got.toFixed(2)}:1 (needs ${min}:1), ${s.color} on ${s.backgroundColor}`,
            );
          }
          if (out.length >= 4) break;
        }
        return out;
      });

      for (const c of lowContrast) report(path, width, `low text contrast: ${c}`);

      // ── WCAG 1.4.11: the button's SHAPE, not its label ──────────────────
      //
      // This is the check that was missing when the green CTA shipped. White
      // on leaf-600 is 4.96:1, so a label-only audit passed it — while the
      // same green against the navy band was 2.91:1, meaning the button's
      // outline was invisible and only the floating text told you a control
      // was there. The owner's report was "can't even see it", and he was
      // describing a real, measurable failure.
      //
      // So: for every filled control, find the nearest ancestor that actually
      // paints a background and require 3:1 between the two.
      const invisibleShapes = await page.evaluate(() => {
        const parse = (s) => (s.match(/[\d.]+/g) || []).map(Number);
        const lum = ([r, g, b]) => {
          const f = (c) => {
            c /= 255;
            return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
          };
          return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
        };
        const ratio = (a, b) => {
          const [hi, lo] = lum(a) >= lum(b) ? [lum(a), lum(b)] : [lum(b), lum(a)];
          return (hi + 0.05) / (lo + 0.05);
        };
        const opaque = (c) => {
          const v = parse(c);
          return v.length >= 3 && (v.length < 4 || v[3] === 1) ? v.slice(0, 3) : null;
        };

        // A Set: four identical cards are one problem, not four.
        const out = new Set();
        for (const el of document.querySelectorAll('a, button')) {
          const r = el.getBoundingClientRect();
          if (r.width < 40 || r.height < 28) continue;

          const s = getComputedStyle(el);
          const fill = opaque(s.backgroundColor);
          // Only filled controls. A control relying on a border or a
          // translucent scrim is composited against a photo or a gradient,
          // which cannot be measured from computed styles alone.
          if (!fill) continue;
          // A visible border is a second cue and satisfies the SC on its own.
          if (parseFloat(s.borderTopWidth) >= 1 && opaque(s.borderTopColor)) continue;
          // An image button's own background is never seen — the photograph
          // covers it, and the photograph's edge is what identifies the
          // control. Measuring the fill underneath reports a card as invisible
          // while a picture is sitting on top of it. Only skip when the image
          // genuinely covers the box; a small icon does not count.
          const img = el.querySelector('img');
          if (img) {
            const ir = img.getBoundingClientRect();
            if (ir.width >= r.width * 0.9 && ir.height >= r.height * 0.9) continue;
          }

          let parent = el.parentElement;
          let behind = null;
          let unmeasurable = false;
          while (parent) {
            const ps = getComputedStyle(parent);
            // A gradient or a photograph between the control and the first
            // opaque colour means the real backdrop is not in the computed
            // styles. Walking past it would measure the button against a
            // <body> white it never actually touches. Skip, do not guess.
            if (ps.backgroundImage && ps.backgroundImage !== 'none') {
              unmeasurable = true;
              break;
            }
            const c = opaque(ps.backgroundColor);
            if (c) {
              behind = c;
              break;
            }
            parent = parent.parentElement;
          }
          if (unmeasurable || !behind) continue;

          const got = ratio(fill, behind);
          if (got < 3) {
            out.add(
              `${(el.textContent || '').trim().slice(0, 28) || '<no label>'} — fill ${s.backgroundColor} on ${getComputedStyle(parent).backgroundColor} is ${got.toFixed(2)}:1 (needs 3:1)`,
            );
          }
          if (out.size >= 4) break;
        }
        return [...out];
      });

      for (const c of invisibleShapes) {
        report(path, width, `control invisible against its background (WCAG 1.4.11): ${c}`);
      }
    }

    // ── Heading order ─────────────────────────────────────────────────────
    const headings = await page.evaluate(() => {
      const hs = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) =>
        Number(h.tagName[1]),
      );
      const h1s = hs.filter((n) => n === 1).length;
      let skip = null;
      for (let i = 1; i < hs.length; i++) {
        if (hs[i] - hs[i - 1] > 1) {
          skip = `h${hs[i - 1]} → h${hs[i]}`;
          break;
        }
      }
      return { h1s, skip };
    });

    if (width === 1280) {
      if (headings.h1s !== 1) report(path, width, `${headings.h1s} <h1> elements (must be 1)`);
      if (headings.skip) report(path, width, `heading level skipped: ${headings.skip}`);
    }

    if (SHOOT && (width === 390 || width === 1280)) {
      const name = path === '/' ? 'home' : path.replace(/\//g, '_').replace(/^_/, '');
      await page.screenshot({
        path: `.audit/${name}-${width}.png`,
        fullPage: false,
      });
    }
  }

  await context.close();
  console.log(`checked ${PAGES.length} pages @ ${width}px`);
}

await browser.close();

if (problems.length) {
  console.error(`\n${problems.length} UI issue(s):\n`);
  for (const p of problems) console.error(`  ✗ ${p}`);
  process.exit(1);
}

console.log('\nUI audit passed: no horizontal scroll, no undersized touch targets, heading order clean.');
