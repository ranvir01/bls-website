---
name: Content update
about: A copy change, a price change, a new project photo, or a new review
title: 'Content: '
labels: content
---

## What needs changing

<!-- Which page, and what it should say instead. -->

## Where it lives

Content is typed data, not hardcoded in components:

| Change | File |
|---|---|
| Phone, address, hours, licence | `data/business.ts` |
| A service page | `data/content/services/<slug>.ts` |
| A city page | `data/content/cities/<slug>.ts` |
| A service × city page | `data/content/service-cities/<city>--<service>.ts` |
| A blog post | `data/content/blog/<slug>.ts` |
| Homepage copy and FAQ | `data/content/home.ts` |
| A completed project | `data/projects.ts` (see `docs/PHOTO-SOP.md`) |
| A customer review | `data/reviews.ts` (see `docs/REVIEW-ENGINE.md`) |
| Visualizer materials | `data/buildable.ts` |
| Cost ranges used by the estimator | `data/pricing.ts` |

## Reminder

Anything published has to be true. No invented reviews, ratings, project counts
or years in business — `scripts/verify.mjs` fails the build on several of these
automatically, but it cannot catch a plausible-sounding false claim.
