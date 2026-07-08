# AGENTS.md

## Cursor Cloud specific instructions

This repo is a single **Next.js 14 (App Router)** marketing/lead-gen website for "Blue Landscaping Services". It uses **npm** (`package-lock.json`), TypeScript, Tailwind, and shadcn/Radix UI. There is no database, backend service, or auth — all content is static TypeScript under `data/`.

### Services / commands
There is one service (the Next.js app). Standard scripts live in `package.json`:
- Dev server: `npm run dev` (http://localhost:3000)
- Production build: `npm run build`; serve build with `npm start`
- Lint: `npm run lint`

### Non-obvious notes
- **`npm run lint` currently prints an ESLint error and does no real linting.** The repo pins `eslint@^9` but Next 14's `next lint` passes ESLint-8-only options (`useEslintrc`, `extensions`, etc.), so ESLint 9 rejects them. This is a pre-existing repo issue, not an environment problem. The command still exits 0. Note that `next.config.mjs` sets `eslint.ignoreDuringBuilds: true` and `typescript.ignoreBuildErrors: true`, so builds do not fail on lint/type errors.
- **`postinstall`** re-installs `typescript`/`tailwindcss`/`postcss`/`autoprefixer`/type packages with `--no-save`; this runs automatically on `npm install`. `.npmrc` sets `legacy-peer-deps=true`.
- **Forms are wired to external services**, so do NOT actually submit them during testing unless intended:
  - The global "Get a Quote" modal (`components/quote-modal.tsx`) POSTs to a live **Formspree** endpoint.
  - Footer / locality contact forms POST to the local `/api/send-email` route, which uses **Nodemailer/SMTP**. Without `EMAIL_*` env vars it validates input (returns 400 on missing/invalid fields) but fails at actual send. To exercise real email delivery set `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASSWORD`, `EMAIL_FROM`, `EMAIL_TO`.
  - The `/contact` page's own form is not wired to a backend (simulated submit); `/api/send-sms` is a stub with no UI caller.
- External images load from Unsplash/Pexels/Imgur CDNs; without internet the site still runs but some images break.
- Deployment target is **Netlify** (`netlify.toml`, `netlify-build.sh`); Netlify pins Node 18.17.0, but the app builds and runs fine on the Node 22 in this environment.
