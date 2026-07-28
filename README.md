# Blue Landscaping Services

Marketing and lead-generation site for **Blue Landscaping Services LLC** — a
licensed hardscaping, irrigation and landscaping contractor in Kent, WA serving
Greater Seattle and South King County.

Next.js 14 App Router · TypeScript · Tailwind · Radix · Framer Motion · Netlify

---

## Quick start

```bash
npm ci
cp .env.example .env.local     # fill in what you need — everything degrades gracefully
npm run dev
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (type errors and lint errors fail it) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run check:links` | Crawl a running server for dead links, empty pages, orphans, missing alt text |
| `npm run check:all` | typecheck → lint → build → acceptance checks |
| `npm run optimize:images` | Resize and compress everything in `public/images` |

Full verification:

```bash
npm run build && npm start &
npm run check:links
```

---

## How the site is put together

### One source of truth per thing

| File | Owns |
|---|---|
| `data/business.ts` | NAP, phone, licence, hours, founding year. **Every** phone number and address on the site reads from here |
| `data/taxonomy.ts` | Which services and which cities exist. Navigation, footer, sitemap and the link checker all derive from it |
| `data/types.ts` | The content contracts every page renders against |
| `lib/routes.ts` | The route manifest — `app/sitemap.ts` is generated from it |
| `lib/seo.ts` | Metadata and JSON-LD builders. The brand suffix is appended in exactly one place |
| `lib/motion.ts` | Animation tokens |
| `tailwind.config.ts` + `app/globals.css` | Design tokens |

This is why navigation parity and sitemap parity are structural rather than
maintained by hand: a service cannot appear in the menu and be missing from the
footer, because both render from the same array.

### Adding a page

**A service:** add a `ServiceRef` to `data/taxonomy.ts`, then a content file at
`data/content/services/<slug>.ts` and an import in that directory's `index.ts`.
The page, nav entry, footer link, sitemap entry and internal links appear
automatically.

**A city:** the same, with `data/content/cities/<slug>.ts`.

**A service × city page:** add the pair to `serviceCityPairs` in the taxonomy and
create `data/content/service-cities/<city>--<service>.ts`.

### Content directories

```
data/content/
  services/         15 service pages
  cities/           21 location pages
  service-cities/   24 programmatic service × city pages
  blog/              6 long-form guides
  categories.ts      3 category hubs
  home.ts            homepage copy
```

---

## Rules this codebase enforces

These are checked by `scripts/verify.mjs` and `scripts/check-links.mjs`, and
they fail the build. They are not style preferences.

**Nothing fabricated.** No invented review counts, star ratings, project counts,
or years in business. `data/projects.ts` and `data/reviews.ts` are empty arrays
and every component reading them renders *nothing* rather than a placeholder.
The site is founded 2012 — there is no "since 1998" or "25 years" claim anywhere
and none may be reintroduced.

**One phone number sitewide.** It lives in `data/business.ts`. A second number
anywhere in the source fails the verify script.

**No stubs.** No "coming soon", no lorem ipsum, no `href="#"`, no page that
renders a heading with no body. If a page cannot be finished, its link is
removed rather than left pointing at a shell.

**Every page server-rendered.** AI crawlers do not execute JavaScript. The link
checker fails any page whose visible text falls below a minimum threshold, which
is the check that catches an empty-shell page before it ships.

**AI imagery is labelled.** `assetType` on every image asset gates where it can
appear. A `'concept-render'` may never enter `/portfolio` and must always carry
the visible badge. Only real photos — and AI-cleaned versions of real photos —
are portfolio-eligible. See `docs/PHOTO-SOP.md`.

**Self-hosted imagery only.** No Unsplash, Pexels or Imgur hotlinks.

**Design tokens only.** An ad-hoc hex value in a component fails verify. See
`/styleguide` (noindex) for every token and primitive.

---

## The yard visualizer

`/visualizer` generates a photorealistic redesign from a homeowner's photo, then
turns it into a written scope with a cost range.

The important part is `data/buildable.ts` — a constrained catalog of only what
this contractor installs and can source locally. Users never write free text;
the server assembles every prompt from that catalog. The generator cannot
produce a pool, a pergola, tropical planting, or a wall over 4 ft, which is what
turns the tool from a novelty into a quote you can sign.

Without an image provider configured it runs in degraded mode: the scope and
cost range still build, the lead is still captured, and it says so plainly.

---

## Operations

| Doc | Covers |
|---|---|
| `docs/DEPLOYMENT.md` | Every environment variable and what happens when it is missing |
| `docs/PHOTO-SOP.md` | Before/after capture procedure — the highest-value non-code work |
| `docs/REVIEW-ENGINE.md` | Getting real reviews, and how to publish them |
| `docs/BACKLINKS.md` | Off-site authority: GBP, chambers, citations, sponsorships |
