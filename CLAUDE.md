# Handoff for Claude — Blue Landscaping Services

Continue from branch `cursor/restore-original-feel-c0c8` (or `main` if that PR is merged). Do not start from the old pre-rebuild site.

Read this before changing anything.

## What just happened

A prior rebuild upgraded the site for real: design tokens, mega-menu, `/quote` lead pipeline, yard visualizer, taxonomy-driven city/service SEO, honest business data, no Unsplash/Imgur hotlinks, no fake 4.8-star testimonials.

It also went too far visually. The original feel disappeared: wrong palette, abstract SVG service panels, empty portfolio, headline that dropped “Expert Landscaping & Hardscaping in Seattle,” and copy that read like a machine.

The owner asked to restore the **old look and real photos** while **keeping the upgrades**. That restore is done. Your job is next steps, not another redesign.

## What was restored (do not undo)

**Brand / SEO**
- Homepage H1: **Expert Landscaping & Hardscaping in Seattle** (Seattle highlighted). Keep those keywords.
- Subhead names retaining walls, custom paver patios, professional irrigation, Pacific Northwest.
- Default title: `Expert Landscaping & Hardscaping in Seattle | Blue Landscaping Services`.
- Category/service H1s include Seattle + Kent, not Kent-only.
- Blue / teal / green tokens (`brand` / `sky` / `leaf` in `tailwind.config.ts`), Montserrat + Quicksand, soft corners.

**Photos (self-hosted, not Imgur)**
- `public/images/work/` — original job galleries (hardscaping, irrigation, landscaping)
- `public/images/portfolio/` — named project photos
- `public/images/before-after/` — before/after pairs
- `public/images/services/<slug>.jpg` — service card photos (JPEG wins over SVG)
- `public/images/team.jpg` — crew photo on About
- Catalog: `data/work-photos.ts`
- Named jobs: `data/projects.ts`
- Resolver: `lib/service-art.ts` — drop a JPEG at `public/images/services/<slug>.jpg` and it is used automatically
- ~~Tiny Imgur thumbs were filtered from galleries (width ≥ 800)~~ — **superseded.**
  That filter was applied by file size without anyone looking at the pictures, and
  it hid 48 real jobs. Every one has since been opened, described and verified, and
  they are back in `data/work-photos.ts`. They are 417–640px because that is the
  only size the originals survive at; `components/work-gallery.tsx` caps how far
  the lightbox enlarges them. **Do not re-apply a width filter** — judge a photo by
  whether it is real and legible, not by its pixel count. `data/photo-provenance.json`
  is the record of what is genuine; `scripts/verify.mjs` enforces it.

**Phone (single source of truth)**
- Display: `(253) 429-7052`
- E.164: `+12534297052`
- Only in `data/business.ts`
- `scripts/verify.mjs` fails the build if a second number appears
- Never restore `(253) 217-0814` or `206-854-8929`

**Honesty rules (`scripts/verify.mjs`)**
- Founded **2012** — not 1998, not “25 years,” not “3,600 projects”
- No hardcoded star ratings
- `data/reviews.ts` is empty until real reviews exist — that is correct
- No Unsplash / Pexels / Imgur hotlinks
- No fabricated testimonials

**Upgrades you must keep**
- `/quote` and `/api/lead`
- Yard visualizer
- Mega-menu and footer of all services/cities
- City + service×city SEO pages, cost tables
- License `BLUELLS880K2`
- `/portfolio` uses `useSearchParams` and **must stay wrapped in `<Suspense>`** or `next build` fails

**Voice**
- Short sentences, contractions, how the owner would say it on the phone
- Do not bring back “we collapse that / one company draws it and builds it” on every page

## Business facts

- Name: Blue Landscaping Services LLC
- Owner: Jose Oliva
- Shop: 11703 SE 229th Pl, Kent, WA 98031
- Email: blue_landscaping@yahoo.com
- License: BLUELLS880K2 (WA L&I)
- Google Business Profile: https://share.google/udIRuWuNg13lXgC5t
- Payments: Zelle, Venmo, PayPal, Cash, Visa, Mastercard

## Do this next, in order

1. **Walk the site locally** (`npm run dev`). Confirm hero, photos, phone, portfolio, about team photo. Do not start a second visual redesign.

2. **Add real reviews only.** Copy verbatim Google/Yelp/Facebook reviews into `data/reviews.ts` with `source`, `sourceUrl`, and date. If you cannot verify a review, leave the array empty.

3. **Photo pass only.** If a service card shows the wrong kind of job, swap `public/images/services/<slug>.jpg`. Do not delete the restored library. New job photos follow `docs/PHOTO-SOP.md`.

4. **Copy pass for leftover AI tone.** Highest traffic first: homepage leftovers, `/about`, `/process`, retaining walls, paver patios, sprinkler installation, Kent / Auburn / Renton / Seattle neighborhood pages. Keep local facts (till, hardpan, 4-ft wall permits, backflow). Cut repeated “in-house / no subs” sermons.

5. **Local SEO, not a new brand.** Tighten `{service} in {city}` pages that already exist in `data/taxonomy.ts`. Do not add cities or services without content files. Do not restore “since 1998.”

6. **Go-live.** Follow `docs/GO-LIVE.md` (SMTP/Twilio for `/api/lead`, GBP NAP match). Do not submit live quote forms while testing.

7. **Verify before you finish:**
   - `npm run typecheck`
   - `npm run lint`
   - `node scripts/verify.mjs`
   - `npm run build`
   - Click: home → a service page → portfolio → a project → about → contact
   - Phone must still be (253) 429-7052
   - Photos must still load

## Do not

- Restyle to stone/moss, Fraunces, sharp 2px corners, or text-only service cards
- Empty `data/projects.ts` or remove `public/images/work`, `portfolio`, or `before-after`
- Hotlink Imgur / Unsplash / Pexels
- Invent reviews, ratings, project counts, or founding years
- Change the phone number except via `data/business.ts`
- Submit the quote form to production during tests

The structure is the upgrade. The photos, Seattle headline, blue identity, and real jobs are the brand. Protect both.
