# Off-site authority playbook

This is the work the codebase cannot do. Everything here is an account to
create, a form to fill, or a relationship to build — but it is where a large
share of local ranking actually comes from, so it belongs in the repo where it
will be seen.

Link signals carry the most weight for local *organic* results; Google Business
Profile and reviews matter more for the Local Pack. Five to ten quality **local**
links outperform fifty generic directory links, because Google weighs the
geographic relevance of the linking domain.

---

## Tier 1 — do these first, highest return per hour

### Google Business Profile — start here

Roughly a third of Local Pack ranking weight. There is currently no profile,
which means the business is invisible in the map results that most "landscaper
near me" searches return.

- Claim / create at business.google.com
- Category: **Landscaper**. Secondary: *Landscape designer*, *Paving
  contractor*, *Lawn sprinkler system contractor*, *Fence contractor*
- NAP must match `data/business.ts` **character for character**:
  Blue Landscaping Services · 11703 SE 229th Pl, Kent, WA 98031 · (253) 429-7052
- Service area: list the primary cities from the taxonomy
- Add every service as a GBP service item
- Upload the real job photos as they are shot (see `docs/PHOTO-SOP.md`)
- Post weekly — even a short update. Activity is a signal
- **Time: ~2 hours. Do it before anything else on this page.**

### Chambers of Commerce

A Chamber link sends a stronger local signal than a link from a random
high-authority site, because the linking domain is geographically relevant.

- Kent Chamber of Commerce (home city — highest value)
- Renton, Auburn, Covington chambers
- ~$200–500/year each. Start with Kent.

### License and trust profiles

- **WA L&I verification page** — already linked from the site footer and in the
  JSON-LD. Confirm the record is current and the bond is active.
- **Better Business Bureau** — profile plus accreditation.

### Contractor-specific citations

The double signal of *what you do* plus *where you do it*:

- Houzz — build out a full profile with real project photos
- Angi
- Thumbtack
- Nextdoor — high intent in this market specifically
- Yelp
- Apple Business Connect — feeds Apple Maps, frequently neglected by competitors

### Manufacturer contractor locators

Ask suppliers and distributors to list the business on their "Where to Buy" or
"Preferred Contractor" pages:

- **Mutual Materials** — Seattle-based, so the highest-value link on this list
- Belgard
- Techo-Bloc
- Basalite
- Allan Block

All five are named in `data/buildable.ts` and on the service pages, so the
relationship is real rather than manufactured.

---

## Tier 2 — 30 to 60 days

**Local sponsorships.** These organisations almost always link back to their
sponsors. Budget $250–1,000 each.

- Kent Little League
- Kent Cornucopia Days
- Auburn Good Ol' Days
- A Covington 5K
- A school PTA in the primary service area

**Local media.** Pitch a seasonal expert angle — storm drainage in October,
freeze damage to irrigation in December, what to do about a saturated yard in
February. Local papers send both trust and referral traffic.

- Kent Reporter
- Auburn Reporter
- Renton Reporter
- South Seattle Emerald

**Supplier and partner cross-links.** The nursery, the excavation sub, the stone
yard, and local landscape architects who do not self-perform hardscape — that
last group is a genuine referral source, not just a link.

**Realtor and property manager partnerships.** Curb-appeal content they will
link to before listings.

---

## Tier 3 — linkable assets

This is where the rework pays off.

**The yard visualizer.** A genuinely free tool is the most naturally linkable
thing a contractor can own. Pitch it to PNW home and garden blogs, r/Seattle and
r/SeattleWA (carefully — read the rules, do not spam), Nextdoor, and local
realtor newsletters.

**The cost guides.** `/blog/retaining-wall-cost-seattle` and
`/blog/paver-patio-cost-king-county` publish real King County installed ranges.
Almost nobody in this market publishes real numbers, and local blogs and
realtors link to the ones who do.

**The drainage guide.** `/blog/drainage-solutions-sloped-yards-western-washington`
is genuinely useful and genuinely local — garden clubs and master gardener
groups are the natural audience.

---

## Sequencing

| Weeks | Focus |
|---|---|
| 1–2 | Google Business Profile, L&I and BBB, Kent Chamber |
| 3–4 | Houzz, Angi, Thumbtack, Nextdoor, Yelp, Apple Business Connect |
| 5–8 | Manufacturer locators, remaining chambers, first sponsorship |
| 9–12 | Local media pitches, visualizer outreach, partner cross-links |

Run the review engine (`docs/REVIEW-ENGINE.md`) in parallel from week one. For
the map pack it outranks links.
