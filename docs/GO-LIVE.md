# Go-live checklist

Everything in this file needs a human. Everything not in this file is already
done in the codebase.

Ordered by impact. The first three items are worth more than all the rest
combined.

---

## 1. ~~Phone number~~ — DONE

**(253) 429-7052** is the single number sitewide, driven by the `PHONE`
constant in `data/business.ts`. It must match the Google Business Profile
character for character; if the GBP still shows the old number, update it there.

## 2. ~~Wire up lead delivery~~ — DONE, no longer blocking

Leads go to **Formspree**, at `https://formspree.io/f/xzzdagdw` — the form this
business has always used. It needs no configuration, no credentials and no
environment variables. Every submission from `/quote`, the contact page and the
visualizer gate lands in that inbox.

This was broken for a while and is worth understanding so it does not happen
again. The rebuild replaced Formspree with an SMTP-plus-Twilio pipeline, which
is genuinely better — a formatted email and an SMS to the owner within seconds.
But both need credentials in the Netlify environment, and until those exist
every channel fails. The route still answered 200, so the customer was told
"an estimator will call you shortly" while the lead existed only as a line in a
server log. A silently broken form is worse than a visibly broken one.

Formspree is now the floor under the other two: it goes out on every submission
whether or not anything else is configured. `FORMSPREE_ENDPOINT` overrides the
form ID if it ever changes.

The quote form also reads `delivered` off the response now. In the case where
every channel fails, the confirmation panel says so and asks the customer to
ring, instead of promising a callback nobody is coming.

### Optional upgrades

Neither of these is required. Both make the response faster.

**Email** — a formatted lead sheet in the inbox, with the scope and any draft
estimate laid out, rather than Formspree's field list. In **Netlify → Site
configuration → Environment variables**:

| Variable | Value |
|---|---|
| `EMAIL_HOST` | e.g. `smtp.gmail.com` |
| `EMAIL_PORT` | `587` |
| `EMAIL_USER` | the sending address |
| `EMAIL_PASSWORD` | **Gmail App Password**, not the account password |
| `EMAIL_TO` | where leads should land |

**SMS** — the real upgrade. A text to the owner within seconds of a submit, and
an auto-reply to the customer. Speed of first contact decides most of these
jobs.

| Variable | Value |
|---|---|
| `TWILIO_ACCOUNT_SID` | from twilio.com |
| `TWILIO_AUTH_TOKEN` | from twilio.com |
| `TWILIO_PHONE_NUMBER` | the Twilio number, E.164 (`+1253…`) |
| `OWNER_PHONE_NUMBER` | the owner's mobile, E.164 |

A Twilio number is about $1.15/month plus under a cent per message. The code is
already written; it only needs the credentials.

After adding either, send a test through `/quote` and confirm it arrives.

## 3. ~~Create the Google Business Profile~~ — DONE, two follow-ups

The profile exists. Its URL is in `data/business.ts` and feeds `sameAs` on the
Organization JSON-LD, which is how Google ties this site to that profile.

1. **Swap in the canonical URL.** What is stored is the `share.google/...` short
   link. Open the profile, copy the full `google.com/maps/place/...` URL and
   replace `profiles[0].url`. Google resolves the short link, but the canonical
   one is unambiguous.
2. **Check NAP agreement.** Name, address and phone on the profile must match
   `data/business.ts` exactly: Blue Landscaping Services, 11703 SE 229th Pl,
   Kent, WA 98031, **(253) 429-7052**. A mismatch costs local ranking.

Then work `docs/BACKLINKS.md` from the top.

## 4. Deploy — already merged to `main`

The work is on `main` and pushed. The build is verified: a clean `npm ci` from
the lockfile plus the exact Netlify build command succeeds from a bare checkout,
so an install or compile failure is ruled out.

If the site still shows an old version, the cause is on the Netlify side:

1. **Is the site connected to this repo?** Site configuration → Build & deploy →
   Continuous deployment. Production branch must be `main`.
2. **Is auto-publishing paused?** The Deploys tab has a toggle that silently
   keeps the previous deploy live.
3. **Did a build fail?** A failed build leaves the old version up, which looks
   exactly like nothing happening.

Build settings must match `netlify.toml`:

- Build command: `npm run build:ci`
- Publish directory: `.next`
- Node version: 20

**One thing to watch.** The old `netlify.toml` contained a catch-all rewrite
(`from = "/*" to = "/" status = 200`) that served the homepage's HTML at every
URL. That is almost certainly why the old location pages looked empty to Google.
It is gone. If anything similar is configured in the Netlify UI (Site
configuration → Redirects), remove it there too — UI rules can override the
file.

## 5. Point the domain

`SITE_URL` in `data/business.ts` is set to `https://bluelandscapingservices.com`.
Every canonical URL, the sitemap, the OG tags and the JSON-LD derive from it.

If the live domain is different, change that constant **before** deploying —
otherwise every canonical on the site points at a domain you do not control.

## 6. Analytics

Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Netlify. Without it, no analytics script
loads at all (deliberate — better than a dangling tag).

The old hardcoded `G-5F1P40ZMK3` was removed from the source. If that property
is still the right one, put it in the env var.

Then, in GA4:

- Mark `quote_form_submit`, `click_to_call`, `click_to_text` and
  `visualizer_lead_submit` as **key events**. All four already fire.
- Add a custom channel group for AI referrals with source matching regex
  `chatgpt\.com|perplexity\.ai|claude\.ai|gemini\.google\.com|copilot\.microsoft\.com`,
  placed **above** the default Referral rule.

Also verify the site in **Google Search Console** and **Bing Webmaster Tools**,
and submit `https://<domain>/sitemap.xml`.

## 7. The yard visualizer

The tool is fully built: the constraint catalog, the prompt assembly, the scope
sheet, the cost estimate, the lead gate, rate limiting and the graceful
degradation path all work today. Right now it runs in **degraded mode** — it
produces the scope and the cost range but no image, and tells the user so.

To turn on rendering, set `IMAGE_API_URL`, `IMAGE_API_KEY` and optionally
`IMAGE_API_MODEL`. The expected request and response shapes are in
`docs/DEPLOYMENT.md`; any provider that takes a prompt and returns a URL or
base64 image will work, and only `generate()` in `app/api/visualize/route.ts`
needs changing if yours differs.

Budget note: rate limits are 3 generations/hour and 10/day per IP, so cost is
bounded.

## 8. Imagery — what is on the cards right now

Every service and category card has a panel on it, but those panels are
**generated artwork, not photographs**. Each one is an abstract pattern in the
brand palette that matches the material: block courses for walls, a running
bond for pavers, spray arcs for irrigation, slats for fencing. They exist so the
cards do not look unfinished, and they are deliberately not photographic so
nobody can mistake one for a picture of your work.

The old site put stock photos on these cards by hotlinking Unsplash. Those
hotlinks are gone: third-party image hosts break, they cost a DNS lookup and a
connection on every card, and none of it was your work anyway. I could not
download replacement stock from the build environment either — outbound access
to image hosts is blocked there.

**To replace any panel with a real photo**, drop a JPEG at
`public/images/services/<service-slug>.jpg`. It wins automatically; the code
prefers a photo and falls back to the generated panel. Slugs are listed in
`data/taxonomy.ts`. Run `npm run optimize:images` afterwards.

Regenerate the panels any time with `node scripts/generate-service-art.mjs`.

## 9. Photography — the thing that actually closes the gap

`/portfolio` is empty, and it says so honestly rather than showing stock images
or other companies' work.

`docs/PHOTO-SOP.md` is a field procedure: six fixed camera positions before the
job, the same six after, plus detail and crew shots. Follow it on every job from
the next one onward. Twenty real before/afters beat two hundred fake ones and
are the strongest trust asset this business can own.

Adding a project is one entry in `data/projects.ts` — the project page,
portfolio filters, sitemap, internal links and homepage section all pick it up
automatically.

## 10. Reviews

`/reviews` is empty and says so. `docs/REVIEW-ENGINE.md` has the routine: a text
24 hours after the final walkthrough with a direct Google review link, targeting
5–8 per month, responding to every one within 24 hours.

Adding one entry to `data/reviews.ts` activates the reviews page, the homepage
section, the city-page sections and the `AggregateRating` structured data.

## 11. The L&I verification link

The footer, the about page and every NAP block link the licence number to
`https://secure.lni.wa.gov/verify/` — L&I's contractor verification search.
Searching `BLUELLS880K2` there returns the record.

A direct `Detail.aspx` deep link would be one click better, but it is built
from the business UBI and could not be verified from the build environment
(outbound access to `secure.lni.wa.gov` is blocked there). If you look up the
record and copy the resulting URL, paste it into `license.lookupUrl` in
`data/business.ts` and every link on the site updates.

## 12. Repository housekeeping

- **PR #1** (`cursor/setup-dev-environment-c0c8`, open draft) documents the
  broken `next lint` caused by ESLint 9. That is now fixed — ESLint is pinned to
  8.57 and lint passes. The PR is obsolete; close it.
- **Branch `cursor/portfolio-readme-f86b`** points at the same commit as `main`.
  It is fully merged and safe to delete.
- Consider enabling branch protection on `main` requiring the CI check to pass.
  The workflow in `.github/workflows/ci.yml` runs typecheck, lint, the
  acceptance checks, the build, the link crawl and the browser UI audit.

---

## What is already done

For reference, so nothing gets redone:

- Every fabricated testimonial, rating and founding-year claim removed
- One phone number sitewide, driven by a single constant
- 82 routes, all statically generated, all with full text in the initial HTML
- Complete JSON-LD: Organization, WebSite, GeneralContractor, Service, FAQPage,
  BreadcrumbList, Article
- `sitemap.xml`, `robots.ts` (AI crawlers allowed), `llms.txt`
- 301s from every legacy URL pattern, verified by the link checker
- Multi-step quote form, lead API with honeypot and rate limiting, email + SMS
  fan-out
- Yard visualizer with the buildability constraint layer and estimate bridge
- Design token system, mega-menu navigation, mobile drawer, sticky action bar
- Hero image 5.0MB → 566kb; image optimization re-enabled
- CI that fails on dead links, empty pages, orphans, fabricated claims,
  horizontal overflow and undersized touch targets
