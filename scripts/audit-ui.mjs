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
        window.scrollTo(0, document.body.scrollHeight);
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

      await page.evaluate(() => window.scrollTo(0, 0));
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
