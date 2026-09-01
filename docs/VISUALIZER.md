# Yard visualizer — product rules

The tool exists to book jobs, not to win a rendering contest.

## Is an AI after-photo a good idea?

Yes, with four constraints:

1. **Keep the house.** The upload is img2img. Inventing a different house
   burns trust the moment they look out the window.
2. **Only materials we install.** Prompts come from `data/buildable.ts`. No
   free text, no pools, no 8-foot walls.
3. **Label it AI.** `AiConceptBadge` on every generated frame.
4. **Never promise a render that is not on.** If `IMAGE_API_KEY` is missing,
   the UI says so and still delivers a written scope, a cost range, and real
   comparable jobs.

A fake photoreal “after” of someone else’s yard, or a 30-second promise that
lands on “rendering is not switched on,” is worse than no tool.

## Can it run almost free?

Yes. One Google AI Studio key is enough.

Set `IMAGE_API_KEY` (Gemini / Nano Banana, model `gemini-2.5-flash-image`).
Do not set `IMAGE_API_URL` unless you are pointing at a different provider.
The free tier plus the existing 3/hour and 10/day per-IP caps keep cost near
zero. We do **not** pre-warm extra styles — that used to fire four paid
renders per click.

Generic providers still work: set `IMAGE_PROVIDER=generic` plus
`IMAGE_API_URL` and `IMAGE_API_KEY`. See `docs/DEPLOYMENT.md`.

## What about iScape, SketchUp, Home Depot Project Color?

They are the wrong product for this site.

- **iScape** is a paid designer app. There is no free embed that converts to
  this crew, and it is not constrained to Mutual Materials / Allan Block /
  zone 8b planting.
- **SketchUp** is a drafting tool. Homeowners will not learn it to request a
  patio quote.
- **Project Color** is paint, not hardscape.

Those tools are what a designer uses at a desk. This page is what a Kent
homeowner uses on a phone in the backyard. The free thing that always works
here is the comparable-job strip: real photos of jobs we built, plus a
written scope from the same catalog.

## What the user gets

| State | After-photo of their yard | Scope + range | Real comparable jobs |
|---|---|---|---|
| `IMAGE_API_KEY` set | Yes, labeled AI | Yes | Yes |
| No key (today) | No, and the UI says so | Yes | Yes |

The conversion asset is the scope sheet and the call, not the pixels.

## Deep links and sending the scope

Money pages can open the tool on a catalog scope:

`/visualizer?scope=paver-patio`

Unknown query values are ignored. After generate, the homeowner can copy the
written scope, text it to Jose, or send the quote form with that note prefilled.
None of those paths invent an after-photo of their house.
