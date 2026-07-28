# Deployment & configuration

Everything the site needs to run in production, and what it does when a given
piece is not configured.

## Environment variables

Set these in **Netlify → Site configuration → Environment variables**. Nothing
here belongs in the repo, and `.env*` is gitignored.

### Lead delivery — the single highest-value config

Without these, form submissions are validated and logged but **nobody is
notified**. The API returns `delivered: false` and logs the full lead to the
function log so it is recoverable, but do not run the site this way.

| Variable | Required | What it does |
|---|---|---|
| `EMAIL_HOST` | yes | SMTP host, e.g. `smtp.gmail.com` |
| `EMAIL_PORT` | no (587) | SMTP port |
| `EMAIL_SECURE` | no (false) | `true` for port 465 |
| `EMAIL_USER` | yes | SMTP username |
| `EMAIL_PASSWORD` | yes | SMTP password — for Gmail this must be an **App Password**, not the account password |
| `EMAIL_FROM` | no | From address; defaults to `EMAIL_USER` |
| `EMAIL_TO` | no | Where leads land; defaults to the business email in `data/business.ts` |

### SMS — speed-to-lead

| Variable | Required | What it does |
|---|---|---|
| `TWILIO_ACCOUNT_SID` | for SMS | Twilio account SID |
| `TWILIO_AUTH_TOKEN` | for SMS | Twilio auth token |
| `TWILIO_PHONE_NUMBER` | for SMS | The Twilio number messages are sent *from*, E.164 (`+1253...`) |
| `OWNER_PHONE_NUMBER` | for SMS | Where the lead alert goes, E.164 |

When these are absent, SMS is skipped silently and email still goes out.

### Analytics

| Variable | Required | What it does |
|---|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | no | GA4 ID, e.g. `G-XXXXXXXXXX`. When unset, **no analytics script loads at all** — no dangling tag, no console errors |

### Yard visualizer

| Variable | Required | What it does |
|---|---|---|
| `IMAGE_API_URL` | for rendering | Image-generation endpoint |
| `IMAGE_API_KEY` | for rendering | Bearer token for that endpoint |
| `IMAGE_API_MODEL` | no | Model identifier, if the provider needs one |

Without these the visualizer runs in **degraded mode**: it still takes the
photo, still assembles the scope, still produces the written cost range, and
still captures the lead. It just does not render an image, and it says so
plainly. This is deliberate — the scope sheet is the conversion asset, and the
user must never hit a dead end.

**Provider contract.** `POST` to `IMAGE_API_URL` with:

```json
{
  "model": "<IMAGE_API_MODEL, if set>",
  "prompt": "...",
  "negative_prompt": "...",
  "seed": 123456,
  "image": "data:image/jpeg;base64,...",
  "strength": 0.72,
  "width": 1024,
  "height": 768,
  "n": 1
}
```

The response is read flexibly — any of these shapes works:

- `{ "data": [{ "url": "https://..." }] }`
- `{ "data": [{ "b64_json": "..." }] }`
- `{ "images": ["https://..." | "<base64>"] }`
- `{ "output": ["https://..."] }`

If your provider needs a different request shape, `generate()` in
`app/api/visualize/route.ts` is the only function to change.

### CRM logging (optional)

| Variable | What it does |
|---|---|
| `LEAD_WEBHOOK_URL` | Every lead is POSTed here as JSON. Point it at a Google Apps Script bound to a Sheet, a Zapier catch hook, or an Airtable automation |

## Build

```
npm ci
npm run build
```

Netlify runs `npm run build:ci`, configured in `netlify.toml`.

**Type errors and lint errors fail the build.** The previous config suppressed
both, which is how broken imports reached production. Do not re-enable
`ignoreBuildErrors`.

## Verifying a deploy

```
npm run build
npm start &            # serves on :3000
npm run check:links    # crawls the built site
```

The link checker fails on internal 404s, redirect chains, `#` hrefs, images
without alt text, orphan routes, and any page whose visible text falls below the
minimum threshold — that last one is what catches an empty-shell page before it
ships. Add `--skip-external` to skip outbound link validation on a slow network.

## Rate limits

`lib/rate-limit.ts` is an in-memory fixed-window limiter, scoped to one server
instance. That is the right trade-off for casual form spam and runaway image
cost, and it is **not** a defence against a distributed attack. If the site ever
runs on more than one warm instance, swap the store for Upstash Redis — the
interface is two functions and nothing else changes.

Current limits:

- Leads: 8 per IP per hour
- Visualizer generations: 3 per IP per hour, 10 per day
- Visualizer element toggles: 12 per IP per hour (cheaper, so more generous)

## What is deliberately empty

`data/projects.ts` and `data/reviews.ts` are empty arrays. Every component that
reads them renders **nothing** rather than a placeholder. That is the correct
behaviour until real photographs and real reviews exist — see
`docs/PHOTO-SOP.md` and `docs/REVIEW-ENGINE.md`.
