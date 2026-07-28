# Photo capture SOP

**Twenty real before/afters beat two hundred stock images, and they are the
single strongest trust asset this business can build.** Nothing on this website
can substitute for them. The portfolio page is empty until they exist, on
purpose.

This is a field procedure. It lives in the repo so it actually gets followed.

## Before every job — 6 shots, fixed positions

1. Stand at the six positions that between them cover the whole work area.
   Typical set: two from the house looking out, two from the far corners looking
   back, one along the length of the work, one from the access point.
2. **Mark each position.** A strip of tape on the patio, a chalk mark on the
   fence post, or a note like "left foot on the third paver from the gate". You
   will be back here in two weeks and you must stand in the same spot.
3. Phone level — use the built-in level or grid. Not tilted up or down.
4. Mid-morning or overcast. Direct midday sun blows out the highlights on
   concrete and makes everything look worse than it is.
5. Landscape orientation, full resolution, no filters.

## Also capture, on every job

- **3 detail shots** — the paver edge restraint, the wall cap, the drain rock
  and drain line before backfill. The drainage shot in particular is the one
  that proves the part nobody else photographs.
- **1 wide context shot** — the work in relation to the house.
- **1 crew-at-work shot** — people working. This is the shot that makes a
  portfolio look like a real company instead of a catalogue.

## After completion — reshoot the same 6

Same positions. Same time of day. Same orientation. A before/after pair only
works if the frame matches; if the camera moved, the viewer reads it as two
unrelated photos rather than a transformation.

## Photo release

Add a clause to the contract:

> Client grants Blue Landscaping Services LLC permission to photograph the
> completed work and to use those photographs in marketing materials, including
> its website and social media. No client name or street address will be
> published.

Get it signed before the job starts, not after.

## File naming

```
{city}-{service}-{yyyy-mm}-{before|after}-{n}.jpg
```

Examples:

```
covington-retaining-walls-2026-08-before-1.jpg
covington-retaining-walls-2026-08-after-1.jpg
kent-paver-patios-2026-09-detail-2.jpg
```

## Adding a project to the site

1. Drop the images in `public/images/projects/`.
2. Run `npm run optimize:images` — this resizes and compresses in place. A raw
   phone photo is 4000px and 5MB, which is fatal for page speed.
3. Append an entry to `data/projects.ts` following the `Project` type in
   `data/types.ts`.
4. Set `assetType`:
   - `'photo'` — untouched job-site photo
   - `'enhanced-photo'` — real photo, AI-cleaned (sky replacement, colour grade,
     removing a parked truck or a hose). Still real work, still
     portfolio-eligible. Standard industry practice.
   - `'concept-to-built'` — a render paired with the real finished photo of the
     same build. The strongest asset on the site.
   - **Never `'concept-render'`.** Renders never enter the portfolio.

Everything else is automatic: the project page, portfolio filters, sitemap,
internal links from the matching service and city pages, and the homepage
featured section all pick it up.

## The target

Every job photographed, no exceptions. Even the small ones. Especially the
repairs — a leaning wall rebuilt properly is a more persuasive story than
another patio.
