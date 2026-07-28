# Go-live checklist

Everything in this file needs a human. Everything not in this file is already
done in the codebase.

Ordered by impact. The first three items are worth more than all the rest
combined.

---

## 1. Confirm the phone number — 2 minutes, blocking

`data/business.ts` uses **(253) 217-0814**. That was the number appearing 16
times across the old site; the other candidate, 206-854-8929, appeared zero
times, so this is the right default — but it has not been confirmed with the
owner.

If it is wrong, change `PHONE` in `data/business.ts`. That one edit updates the
header, footer, every `tel:` link, the JSON-LD, the contact page, the email
templates and the SMS templates. Nothing else needs touching.

The same number must then be used on the Google Business Profile, character for
character. A mismatch between the site and GBP actively costs local ranking.

## 2. Wire up lead delivery — 20 minutes, blocking

**Until this is done, form submissions reach nobody.** The API validates them,
logs them, and returns success to the customer — which is worse than a broken
form, because the customer believes it went through.

In **Netlify → Site configuration → Environment variables**:

| Variable | Value |
|---|---|
| `EMAIL_HOST` | e.g. `smtp.gmail.com` |
| `EMAIL_PORT` | `587` |
| `EMAIL_USER` | the sending address |
| `EMAIL_PASSWORD` | **Gmail App Password**, not the account password |
| `EMAIL_TO` | where leads should land |

Then send a test through `/quote` and confirm it arrives.

**SMS (do this too — it is the difference between a lead and a sale):**

| Variable | Value |
|---|---|
| `TWILIO_ACCOUNT_SID` | from twilio.com |
| `TWILIO_AUTH_TOKEN` | from twilio.com |
| `TWILIO_PHONE_NUMBER` | the Twilio number, E.164 (`+1253…`) |
| `OWNER_PHONE_NUMBER` | the owner's mobile, E.164 |

A Twilio number is about $1.15/month plus under a cent per message. The site
already texts the owner within seconds of a submit and auto-replies to the
customer; it just needs credentials.

## 3. Create the Google Business Profile — 2 hours

There is currently no profile. That means the business does not appear in the
map pack at all, which is where most "landscaper near me" searches end.

Full instructions in `docs/BACKLINKS.md`. This is the single highest-return item
on the entire list.

---

## 4. Deploy

The branch is `claude/website-deploy-cleanup-3qe2sy`. Merge it to `main` and
Netlify will build and deploy automatically.

Before merging, check the Netlify build settings match `netlify.toml`:

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

## 8. Photography — the thing that actually closes the gap

`/portfolio` is empty, and it says so honestly rather than showing stock images
or other companies' work.

`docs/PHOTO-SOP.md` is a field procedure: six fixed camera positions before the
job, the same six after, plus detail and crew shots. Follow it on every job from
the next one onward. Twenty real before/afters beat two hundred fake ones and
are the strongest trust asset this business can own.

Adding a project is one entry in `data/projects.ts` — the project page,
portfolio filters, sitemap, internal links and homepage section all pick it up
automatically.

## 9. Reviews

`/reviews` is empty and says so. `docs/REVIEW-ENGINE.md` has the routine: a text
24 hours after the final walkthrough with a direct Google review link, targeting
5–8 per month, responding to every one within 24 hours.

Adding one entry to `data/reviews.ts` activates the reviews page, the homepage
section, the city-page sections and the `AggregateRating` structured data.

## 10. The L&I verification link

The footer, the about page and every NAP block link the licence number to
`https://secure.lni.wa.gov/verify/` — L&I's contractor verification search.
Searching `BLUELLS880K2` there returns the record.

A direct `Detail.aspx` deep link would be one click better, but it is built
from the business UBI and could not be verified from the build environment
(outbound access to `secure.lni.wa.gov` is blocked there). If you look up the
record and copy the resulting URL, paste it into `license.lookupUrl` in
`data/business.ts` and every link on the site updates.

## 11. Repository housekeeping

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
