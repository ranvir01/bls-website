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

import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

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
    pattern: /https?:\/\/(images\.unsplash\.com|images\.pexels\.com|i\.imgur\.com)/i,
    message: 'third-party hotlinked image — all imagery must be self-hosted',
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
