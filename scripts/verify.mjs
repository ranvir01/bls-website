#!/usr/bin/env node
/**
 * Phase 11 acceptance checks that can be made statically.
 *
 * These run over the source, not the built site — they catch the classes of
 * regression that a link crawl cannot see, like a fabricated statistic creeping
 * back into a component or a second phone number appearing in copy.
 *
 * The crawl-based checks live in scripts/check-links.mjs.
 *
 *   node scripts/verify.mjs
 */

import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const SCAN_DIRS = ['app', 'components', 'data', 'lib'];
const EXT = new Set(['.ts', '.tsx']);

const failures = [];
const notes = [];

function fail(file, line, message) {
  failures.push(`${file}${line ? `:${line}` : ''} — ${message}`);
}

async function* walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.next') continue;
      yield* walk(full);
    } else if (EXT.has(path.extname(entry.name))) {
      yield full;
    }
  }
}

/**
 * Rules. Each has a pattern, a message, and an optional allowlist of files
 * where a match is legitimate (a rule's own definition, or a doc comment
 * describing what is banned).
 */
const RULES = [
  {
    id: 'stale-founding-claim',
    pattern: /\b(since|established|est\.?)\s*(19\d{2}|200[0-9]|201[01])\b/i,
    message: 'founding-year claim that contradicts 2012',
  },
  {
    id: 'years-in-business-claim',
    pattern: /\b(1[5-9]|2[0-9]|3[0-9])\+?\s*years?\s+(of\s+)?(experience|in business)\b/i,
    message: 'hardcoded years-in-business claim — use yearsInBusiness() from data/business.ts',
  },
  {
    id: 'second-phone-number',
    // Matched by normalized digits rather than by pattern shape, so
    // "(253) 217-0814", "253-217-0814" and "+12532170814" all read as the same
    // number and only a genuinely different one fails.
    match(text) {
      const CANONICAL = '2534297052';
      const found = text.match(/\+?1?[\s.\-(]*\d{3}[\s.\-)]*\d{3}[\s.\-]*\d{4}\b/g) ?? [];
      return found.some((raw) => {
        const digits = raw.replace(/\D/g, '').replace(/^1/, '');
        if (digits.length !== 10) return false;
        // 555-01xx is the reserved fictional range, fine as a form placeholder.
        if (/^\d{3}555 ?01\d{2}$/.test(digits)) return false;
        return digits !== CANONICAL;
      });
    },
    message: 'a phone number that is not the single sitewide number',
    allow: ['scripts/verify.mjs'],
  },
  {
    id: 'hotlinked-images',
    /*
     * Every photograph on this site is a file in public/images.
     *
     * The job library used to live on Imgur and was briefly re-linked from
     * there; it is now downloaded and self-hosted, which is better in every
     * way — next/image can actually optimise it, and a third party cannot
     * take the company's portfolio offline. This rule keeps it that way, and
     * it also catches the older failure mode: dropping a stock photograph on
     * a service page so the page looks finished.
     */
    pattern:
      /https?:\/\/(images\.unsplash\.com|images\.pexels\.com|i\.imgur\.com|(?:\w+\.)?pixabay\.com|(?:\w+\.)?shutterstock\.com|(?:\w+\.)?istockphoto\.com|(?:\w+\.)?gettyimages\.com)/i,
    message: 'third-party hotlinked image — every image must be a file in public/images',
    allow: ['docs/'],
  },
  {
    id: 'fabricated-rating',
    pattern: /\b(4\.[5-9]|5\.0)\s*(\/\s*5|stars?|star rating)\b/i,
    message: 'hardcoded star rating — ratings may only come from data/reviews.ts',
  },
  {
    id: 'fabricated-counts',
    pattern: /\b\d{2,},?\d*\+?\s*(happy\s+)?(customers|clients|projects completed|reviews)\b/i,
    message: 'hardcoded count claim — only render counts derived from real data',
  },
  {
    id: 'placeholder-copy',
    pattern: /\b(lorem ipsum|coming soon|TODO:|FIXME:|placeholder text)\b/i,
    message: 'placeholder or stub copy',
  },
  {
    id: 'dead-href',
    pattern: /href=["'](#|javascript:void\(0\))["']/i,
    message: 'dead href',
  },
  {
    id: 'twenty-four-hour-promise',
    pattern: /within 24 hours/i,
    message: '"within 24 hours" — the promise is same-day',
  },
  {
    id: 'ad-hoc-hex',
    // Hex colours in TSX components. Tokens live in tailwind.config.ts and
    // globals.css; email HTML in lib/ is exempt because email cannot use them.
    pattern: /#[0-9a-fA-F]{6}\b/,
    message: 'ad-hoc hex colour in a component — use a design token',
    only: (file) => file.startsWith('components/') || file.startsWith('app/'),
    allow: ['app/globals.css', 'app/layout.tsx', 'components/ui/chart.tsx'],
  },
];

/**
 * Photo provenance.
 *
 * WHY THIS CHECK EXISTS
 * ---------------------
 * The site tells visitors, in as many words, that every photograph on it is a
 * job this company did — /portfolio is headed "Projects we have actually built"
 * and the trust bar counts the photos and adds "no stock imagery anywhere".
 *
 * For a while that was not true. Twenty-eight files in public/images were
 * generated rather than photographed: a paver driveway in front of a brick
 * house that is not in Washington, four renders of sprinklers watering a park,
 * and — under a slider captioned "a few yards before we started and after we
 * finished" — seven "before" illustrations paired with seven "after" renders of
 * yards that do not exist. Every other check in this file passed the whole time,
 * because nothing here reads pixels.
 *
 * Nothing here can read them now either. Real and generated are
 * indistinguishable to a script once both have been through the same re-encode:
 * EXIF is stripped from all of it, and the aspect ratios that happened to give
 * these away are a coincidence, not a rule. Only a person looking at the
 * picture can tell.
 *
 * So this does not try to classify. It pins the inventory instead:
 * data/photo-provenance.json records every image the site can present as our
 * own work, with a source and two hashes. A new or altered file fails the build
 * until someone adds it — which is the moment a human is asked where it came
 * from. That is the check that was missing.
 *
 * WHY TWO HASHES
 * --------------
 * A sha1 of the bytes catches everything, which sounds ideal until a legitimate
 * re-encode arrives. Converting 53 mislabelled PNGs to real JPEG changed 53
 * hashes at once and the only available response was to re-stamp all 53 — which
 * is precisely the move this file exists to catch, performed by the person it
 * exists to stop.
 *
 * So each entry also carries a perceptual hash of the decoded pixels, which
 * survives re-encoding and does not survive a substitution. Measured on that
 * conversion: re-encoding the same photograph moved it by at most 6 bits of 64,
 * while two different photographs from this library differ by around 30. The
 * threshold below sits in the gap.
 *
 *   phash differs beyond the threshold  → a different picture. Fail.
 *   phash matches, sha1 differs         → same picture, re-encoded. Report it.
 *   not listed at all                   → fail, as before.
 */
const PROVENANCE = 'data/photo-provenance.json';
const PROVENANCE_DIRS = ['work', 'before-after', 'portfolio', 'services'];
const PROVENANCE_LOOSE = ['hero-home.jpg', 'hero-home-mobile.jpg', 'team.jpg'];
const IMAGE_EXT = /\.(jpe?g|png|webp|avif)$/i;
/** Bits of 64. Re-encoding measured at most 6; different photographs, about 30. */
const PHASH_TOLERANCE = 10;

/** Perceptual hash of the decoded pixels — survives a re-encode, not a swap. */
async function perceptualHash(file) {
  const raw = await sharp(file).greyscale().resize(9, 8, { fit: 'fill' }).raw().toBuffer();
  let bits = '';
  for (let y = 0; y < 8; y += 1) {
    for (let x = 0; x < 8; x += 1) bits += raw[y * 9 + x] < raw[y * 9 + x + 1] ? '1' : '0';
  }
  return BigInt(`0b${bits}`).toString(16).padStart(16, '0');
}

function hammingHex(a, b) {
  let x = BigInt(`0x${a}`) ^ BigInt(`0x${b}`);
  let n = 0;
  while (x) { n += Number(x & 1n); x >>= 1n; }
  return n;
}

async function* walkImages(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walkImages(full);
    else if (IMAGE_EXT.test(entry.name)) yield full;
  }
}

async function checkPhotoProvenance() {
  let manifest;
  try {
    manifest = JSON.parse(await readFile(path.join(ROOT, PROVENANCE), 'utf8'));
  } catch (e) {
    fail(PROVENANCE, null, `cannot be read (${e.message}). Every image the site shows as our own work has to be listed here.`);
    return;
  }

  const base = path.join(ROOT, 'public', 'images');
  const found = [];
  for (const dir of PROVENANCE_DIRS) {
    for await (const file of walkImages(path.join(base, dir))) {
      found.push(path.relative(base, file));
    }
  }
  for (const name of PROVENANCE_LOOSE) {
    try {
      await readFile(path.join(base, name));
      found.push(name);
    } catch {
      /* optional */
    }
  }

  let ownPhotos = 0;
  let notOurWork = 0;
  const reencoded = [];

  for (const rel of found.sort()) {
    const entry = manifest[rel];
    if (!entry) {
      fail(
        PROVENANCE,
        null,
        `public/images/${rel} is not listed. Add it with source "own-photo" if it is a photograph of our own job, or "not-our-work" if it is stock, a render, or anything else — and do not reference it.`,
      );
      continue;
    }

    const sha1 = createHash('sha1').update(await readFile(path.join(base, rel))).digest('hex').slice(0, 16);
    if (sha1 !== entry.sha1) {
      // Bytes moved. The perceptual hash decides whether that matters.
      let phash;
      try {
        phash = await perceptualHash(path.join(base, rel));
      } catch (e) {
        fail(PROVENANCE, null, `public/images/${rel} changed and could not be decoded to compare (${e.message}).`);
        continue;
      }
      const drift = entry.phash ? hammingHex(phash, entry.phash) : Infinity;
      if (drift > PHASH_TOLERANCE) {
        fail(
          PROVENANCE,
          null,
          `public/images/${rel} is a different picture from the one that was vetted (${drift} bits of 64 apart, tolerance ${PHASH_TOLERANCE}). If the replacement is genuinely our own work, say so and update both hashes; otherwise put the original back.`,
        );
      } else {
        reencoded.push(`${rel} (${drift} bits)`);
      }
    }

    if (entry.source === 'own-photo') ownPhotos += 1;
    else notOurWork += 1;
  }

  const orphans = Object.keys(manifest).filter((rel) => !found.includes(rel));
  for (const rel of orphans) {
    notes.push(`provenance lists public/images/${rel}, which is no longer on disk — drop the entry.`);
  }

  notes.push(`photo provenance: ${ownPhotos} of our own, ${notOurWork} marked not-our-work and referenced by nothing`);
  if (reencoded.length) {
    notes.push(
      `${reencoded.length} image(s) re-encoded since vetting — same picture, new bytes. Refresh their sha1 in ${PROVENANCE}: ${reencoded.slice(0, 4).join(', ')}${reencoded.length > 4 ? ', …' : ''}`,
    );
  }
}

/**
 * A file marked not-our-work must not be reachable from the site.
 *
 * The data layer is the only way a work photo gets onto a page, so a literal
 * path match across the source is enough — with one deliberate exception for
 * lib/service-art.ts, which resolves service card art by filesystem lookup and
 * therefore has to name these slugs in order to skip them.
 */
async function checkNotOurWorkUnreferenced(sourceFiles) {
  let manifest;
  try {
    manifest = JSON.parse(await readFile(path.join(ROOT, PROVENANCE), 'utf8'));
  } catch {
    return;
  }
  const banned = Object.entries(manifest)
    .filter(([, v]) => v.source === 'not-our-work')
    .map(([rel]) => `/images/${rel}`);
  if (!banned.length) return;

  for (const file of sourceFiles) {
    if (file === 'lib/service-art.ts') continue;
    const source = await readFile(path.join(ROOT, file), 'utf8');
    for (const rel of banned) {
      if (source.includes(rel)) {
        fail(file, null, `references ${rel}, which data/photo-provenance.json marks as not our work. It cannot appear on a site that says every photo is a job we did.`);
      }
    }
  }
}

/**
 * Cost notes must not converge on one sentence.
 *
 * Every service page carries a `costNote` under its price table. All fifteen
 * had drifted into the same paragraph wearing fifteen hats: thirteen said
 * "Puget Sound market", thirteen ended at a "walkthrough", eleven managed
 * "typical installed range" and "site walkthrough" and "in 2026" all at once,
 * and every one of them opened with a variant of "These are typical installed
 * ranges … rather than a quote".
 *
 * None of it was false, which is why nothing caught it. It was just the same
 * disclaimer fifteen times, and worse, redundant — the table's own column
 * header already reads "Typical range", so restating that in prose underneath
 * bought nothing and displaced the sentence that could have said what actually
 * drives the price for that trade.
 *
 * The check is deliberately narrow: three or more notes opening with an
 * identical six words is templating, not coincidence. Two is allowed, because
 * a pair of genuinely parallel services can legitimately read alike.
 */
const COST_NOTE_OPENING_WORDS = 6;
const COST_NOTE_MAX_SHARING = 2;

async function checkCostNoteVariety() {
  const dir = path.join(ROOT, 'data', 'content', 'services');
  let names;
  try {
    names = (await readdir(dir)).filter((n) => n.endsWith('.ts'));
  } catch {
    return;
  }

  const openings = new Map();
  for (const name of names) {
    const source = await readFile(path.join(dir, name), 'utf8');
    const match = source.match(/costNote:\s*\n?\s*'((?:[^'\\]|\\.)*)'/);
    if (!match) continue;
    const key = match[1]
      .toLowerCase()
      .split(/\s+/)
      .slice(0, COST_NOTE_OPENING_WORDS)
      .join(' ');
    if (!openings.has(key)) openings.set(key, []);
    openings.get(key).push(name.replace('.ts', ''));
  }

  for (const [opening, slugs] of openings) {
    if (slugs.length > COST_NOTE_MAX_SHARING) {
      fail(
        'data/content/services',
        null,
        `${slugs.length} cost notes open with the same ${COST_NOTE_OPENING_WORDS} words ("${opening}…"): ${slugs.join(', ')}. Say what drives the price for each trade instead — the table header already says these are ranges.`,
      );
    }
  }

  notes.push(`cost notes: ${openings.size} distinct openings across ${names.length} service files`);
}

async function main() {
  const files = [];
  for (const dir of SCAN_DIRS) {
    for await (const file of walk(path.join(ROOT, dir))) {
      files.push(path.relative(ROOT, file));
    }
  }

  for (const file of files) {
    const source = await readFile(path.join(ROOT, file), 'utf8');
    const lines = source.split('\n');

    for (const rule of RULES) {
      if (rule.allow?.includes(file)) continue;
      if (rule.only && !rule.only(file)) continue;

      lines.forEach((text, i) => {
        // Skip lines that are clearly documenting the ban rather than breaking it.
        const trimmed = text.trim();
        if (trimmed.startsWith('*') || trimmed.startsWith('//')) return;

        const hit = rule.match ? rule.match(text) : rule.pattern.test(text);
        if (hit) {
          fail(file, i + 1, `${rule.message} → ${trimmed.slice(0, 100)}`);
        }
      });
    }
  }

  notes.push(`scanned ${files.length} source files`);

  await checkPhotoProvenance();
  await checkNotOurWorkUnreferenced(files);
  await checkCostNoteVariety();

  if (failures.length) {
    console.error(`\n${failures.length} acceptance failure(s):\n`);
    for (const f of failures) console.error(`  ✗ ${f}`);
    console.error('');
    process.exit(1);
  }

  for (const n of notes) console.log(`  ${n}`);
  console.log('\nAcceptance checks passed: no fabricated claims, no hotlinked images, no placeholders.');
}

await main();
