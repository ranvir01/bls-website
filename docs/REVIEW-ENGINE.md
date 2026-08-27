# Review engine

Reviews outrank links for the Google local pack. This is the highest-leverage
non-code work available, and it runs in parallel with everything else.

`data/reviews.ts` is empty on purpose. The reviews section and the
`AggregateRating` schema both render only from that array, so an empty list
means the section is hidden and no rating is claimed. That is correct and legal
until real reviews exist. **Never** add an invented entry — the previous version
of this site carried ten fabricated testimonials with stock-photo avatars, and
that is exactly what this is replacing.

## The routine

**24 hours after the final walkthrough**, text the customer. Not the same day —
let them live with it for a night.

Keep it short and human:

> Hi {name} — Jose from Blue Landscaping. Hope the {patio/wall} is working out.
> If you have a minute, a quick Google review really helps us out: {link}
> Either way, thanks for having us out.

Send the **direct review link**, not "search for us on Google". Get it from your
Google Business Profile under *Ask for reviews*. Every extra step loses people.

Until Yelp, Houzz, or Angi listings are confirmed as **this** Kent company,
do not ask for those platforms and do not paste their URLs into the site.
Other businesses named Blue are not us. Google is the review engine.

**Never script the praise.** Do not suggest what to write, do not offer an
incentive, do not send a template they can paste. People spot canned wording
immediately, and so does Google.

## Targets

- **5–8 new reviews per month.** At that rate the gap with the established
  competitors in this market closes inside a year.
- **Respond to every review within 24 hours** — positive and negative. Response
  rate is a ranking signal and, more importantly, prospects read the responses.
- On a bad review: reply once, factually, offer to fix it, and take the rest
  offline. Never argue in the thread.

## Publishing a review on the site

Add it to `data/reviews.ts`:

```ts
{
  author: 'First L.',           // as they left it — never invent or embellish
  rating: 5,
  text: '...',                  // verbatim, no editing
  source: 'Google',             // required — an unattributed review reads as fake
  sourceUrl: 'https://...',     // link to the actual review where possible
  publishedAt: '2026-08-14',
  citySlug: 'covington',        // optional, surfaces it on that city page
  serviceSlug: 'retaining-walls',
}
```

Once one entry exists, the reviews page, the homepage section, the city pages
and the `AggregateRating` structured data all activate automatically.

## What not to do

- Do not buy reviews.
- Do not offer discounts in exchange for reviews. It violates Google's policy
  and, in the US, FTC rules on endorsements.
- Do not gate — asking only happy customers for a public review while routing
  unhappy ones to a private form is also against policy.
- Do not paste reviews from another platform onto the site without saying which
  platform they came from.
