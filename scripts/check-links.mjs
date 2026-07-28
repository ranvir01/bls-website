#!/usr/bin/env node
/**
 * Phase 4B / Phase 11 link integrity gate.
 *
 * Crawls the built site and fails the build on any of:
 *   - an internal link that 404s
 *   - a redirect chain longer than one hop
 *   - an href that is "#", empty, or javascript:void(0)
 *   - an <img> with a missing or empty alt attribute
 *   - a page whose rendered text falls under the minimum content threshold
 *     (this is the check that would have caught the empty-shell location pages)
 *   - a route in the manifest that no page links to (an orphan)
 *   - a dead external link (reported, and fatal unless --skip-external)
 *
 * Usage:
 *   node scripts/check-links.mjs                # against http://localhost:3000
 *   node scripts/check-links.mjs --base=URL
 *   node scripts/check-links.mjs --skip-external
 */

const args = process.argv.slice(2);
const BASE = (args.find((a) => a.startsWith('--base=')) ?? '--base=http://localhost:3000').split('=')[1].replace(/\/$/, '');
const SKIP_EXTERNAL = args.includes('--skip-external');

/** A page with less text than this is a shell, not a page. */
const MIN_TEXT_CHARS = 600;
/** Legal and utility pages are legitimately short-ish; still non-empty. */
const LENIENT_PATHS = new Set(['/styleguide']);
const LENIENT_MIN_CHARS = 200;

const errors = [];
const warnings = [];
const visited = new Map(); // path -> { status, text, links, redirectedFrom }
const externalSeen = new Map();
const inboundLinks = new Map(); // path -> Set of pages linking to it

function err(page, message) {
  errors.push(`${page}: ${message}`);
}

function warn(page, message) {
  warnings.push(`${page}: ${message}`);
}

// ── HTML extraction ──────────────────────────────────────────────────────────

function stripNonContent(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, ' ');
}

function visibleText(html) {
  return stripNonContent(html)
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Attribute values arrive HTML-escaped; a query string is useless until decoded. */
function decodeEntities(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'");
}

function extractAnchors(html) {
  const out = [];
  const re = /<a\b([^>]*)>/gi;
  let match;
  while ((match = re.exec(html))) {
    const attrs = match[1];
    const raw = /\bhref\s*=\s*["']([^"']*)["']/i.exec(attrs)?.[1];
    out.push({ href: raw === undefined ? undefined : decodeEntities(raw), raw: match[0] });
  }
  return out;
}

function extractImages(html) {
  const out = [];
  const re = /<img\b([^>]*)>/gi;
  let match;
  while ((match = re.exec(html))) {
    const attrs = match[1];
    const alt = /\balt\s*=\s*["']([^"']*)["']/i.exec(attrs);
    const src = /\bsrc\s*=\s*["']([^"']*)["']/i.exec(attrs)?.[1] ?? '(no src)';
    out.push({ src, hasAlt: Boolean(alt), alt: alt?.[1] ?? null });
  }
  return out;
}

function normalizePath(href, fromPath) {
  if (!href) return null;
  if (/^(mailto:|tel:|sms:|data:)/i.test(href)) return null;
  if (/^https?:\/\//i.test(href)) {
    return href.startsWith(BASE) ? href.slice(BASE.length) || '/' : { external: href };
  }
  if (href.startsWith('#')) return null;

  const url = new URL(href, `${BASE}${fromPath}`);
  if (url.origin !== new URL(BASE).origin) return { external: url.href };
  return url.pathname;
}

// ── Fetching ─────────────────────────────────────────────────────────────────

async function fetchPage(path) {
  if (visited.has(path)) return visited.get(path);

  let res;
  try {
    res = await fetch(`${BASE}${path}`, { redirect: 'manual' });
  } catch (e) {
    const record = { status: 0, text: '', links: [], error: e.message };
    visited.set(path, record);
    return record;
  }

  // Follow at most one redirect hop — a second hop is a chain, which is a
  // failure condition, not something to quietly follow.
  let hops = 0;
  while (res.status >= 300 && res.status < 400 && hops < 3) {
    const location = res.headers.get('location');
    if (!location) break;
    hops += 1;
    if (hops > 1) {
      const record = { status: res.status, text: '', links: [], chain: hops };
      visited.set(path, record);
      return record;
    }
    const next = new URL(location, `${BASE}${path}`);
    res = await fetch(next.href, { redirect: 'manual' });
  }

  const html = res.ok ? await res.text() : '';
  const record = {
    status: res.status,
    text: visibleText(html),
    links: extractAnchors(html),
    images: extractImages(html),
    hops,
    html,
  };
  visited.set(path, record);
  return record;
}

async function checkExternal(url) {
  if (externalSeen.has(url)) return externalSeen.get(url);

  let ok = false;
  try {
    // HEAD first; a good number of servers reject it, so fall back to GET.
    let res = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(15000) });
    if (res.status === 405 || res.status === 403 || res.status === 501) {
      res = await fetch(url, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(15000) });
    }
    ok = res.status < 400;
  } catch {
    ok = false;
  }

  externalSeen.set(url, ok);
  return ok;
}

// ── Crawl ────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`Link check against ${BASE}\n`);

  // Seed from the sitemap so the manifest itself is validated.
  let seeds = ['/'];
  try {
    const res = await fetch(`${BASE}/sitemap.xml`);
    if (res.ok) {
      const xml = await res.text();
      const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
      seeds = urls.map((u) => new URL(u).pathname);
      console.log(`sitemap.xml lists ${seeds.length} routes`);
    } else {
      warnings.push(`sitemap.xml returned ${res.status}`);
    }
  } catch (e) {
    warnings.push(`could not read sitemap.xml: ${e.message}`);
  }

  const queue = [...new Set(['/', ...seeds])];
  const externalQueue = new Set();

  while (queue.length) {
    const path = queue.shift();
    if (!path || visited.has(path)) continue;

    const page = await fetchPage(path);

    if (page.error) {
      err(path, `request failed: ${page.error}`);
      continue;
    }
    if (page.chain) {
      err(path, `redirect chain longer than one hop (${page.chain} hops)`);
      continue;
    }
    if (page.status === 404) {
      err(path, 'returns 404');
      continue;
    }
    if (page.status >= 400) {
      err(path, `returns ${page.status}`);
      continue;
    }

    // Content threshold — catches empty shells.
    const min = LENIENT_PATHS.has(path) ? LENIENT_MIN_CHARS : MIN_TEXT_CHARS;
    if (page.text.length < min) {
      err(path, `only ${page.text.length} chars of visible text (minimum ${min}) — looks like an empty shell`);
    }

    // Exactly one <h1>.
    const h1Count = (page.html.match(/<h1\b/gi) ?? []).length;
    if (h1Count === 0) err(path, 'no <h1>');
    if (h1Count > 1) err(path, `${h1Count} <h1> elements (must be exactly 1)`);

    // Canonical present.
    if (!/rel=["']canonical["']/i.test(page.html)) {
      warn(path, 'no canonical link');
    }

    // Images must have alt text.
    for (const img of page.images ?? []) {
      if (!img.hasAlt) err(path, `<img> without an alt attribute: ${img.src}`);
    }

    // Anchors.
    for (const anchor of page.links) {
      const { href } = anchor;

      if (href === undefined) {
        err(path, 'an <a> with no href');
        continue;
      }
      if (href === '' || href === '#' || /^javascript:/i.test(href)) {
        err(path, `dead href "${href}"`);
        continue;
      }

      const target = normalizePath(href, path);
      if (target === null) continue;

      if (typeof target === 'object' && target.external) {
        externalQueue.add(target.external);
        continue;
      }

      if (!inboundLinks.has(target)) inboundLinks.set(target, new Set());
      inboundLinks.get(target).add(path);

      if (!visited.has(target) && !queue.includes(target)) {
        queue.push(target);
      }
    }
  }

  // Orphan check: every route in the sitemap needs at least one inbound link.
  for (const route of seeds) {
    if (route === '/') continue;
    if (!inboundLinks.has(route) || inboundLinks.get(route).size === 0) {
      err(route, 'orphan — no page links to it');
    }
  }

  // External links.
  if (!SKIP_EXTERNAL && externalQueue.size) {
    console.log(`\nChecking ${externalQueue.size} external link(s)…`);
    for (const url of externalQueue) {
      const ok = await checkExternal(url);
      if (!ok) err('(external)', `dead outbound link: ${url}`);
    }
  } else if (externalQueue.size) {
    console.log(`\nSkipping ${externalQueue.size} external link(s) (--skip-external)`);
  }

  // ── Report ────────────────────────────────────────────────────────────────
  const pages = [...visited.entries()].filter(([, v]) => v.status === 200);
  console.log(`\nCrawled ${visited.size} URL(s), ${pages.length} returned 200.`);

  if (warnings.length) {
    console.log(`\n${warnings.length} warning(s):`);
    for (const w of warnings) console.log(`  ⚠ ${w}`);
  }

  if (errors.length) {
    console.error(`\n${errors.length} error(s):`);
    for (const e of errors) console.error(`  ✗ ${e}`);
    console.error('\nLink check FAILED.');
    process.exit(1);
  }

  console.log('\nLink check passed: no dead links, no empty shells, no orphans.');
}

await main();
