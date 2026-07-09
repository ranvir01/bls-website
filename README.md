# Blue Landscaping Services Website

Marketing and lead-generation site for **Blue Landscaping Services** (Seattle-area hardscaping, irrigation, lawn care).

**Live purpose:** convert visitors into quote requests via a global quote modal, sticky CTA, and localized service-area pages.

## Stack

- Next.js, React, TypeScript, Tailwind CSS
- React Hook Form + Zod
- Email / SMS API routes for lead routing
- Deployed on Netlify

## Highlights

- **25+ geo-targeted service-area pages** for local SEO
- Reusable **quote modal system** (global state, sticky button, validation)
- Content-driven architecture (services, localities, testimonials) via typed data files
- Built with AI-assisted tooling (Bolt.new scaffold, then customized in Cursor) with human ownership of UX, SEO, and conversion

## Quick start

```bash
npm install
npm run dev
```

## Note

This README replaces an older quote-modal-only doc. For component usage details, see comments in `src/components` related to the quote modal.
