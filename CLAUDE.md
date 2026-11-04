# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

SynapCart web portal: a Next.js App Router site deployed to **Cloudflare Workers** with OpenNext (`@opennextjs/cloudflare`). Production is `https://synapcart.emreaydin.dev` and staging is `https://staging.synapcart.emreaydin.dev`. It serves:
- the landing page, with App Store and Google Play badges;
- the legal pages linked from both store listings;
- the account-deletion page (the stores' web deletion URL);
- the password-reset page that the backend's email links to;
- `/.well-known/assetlinks.json` (Android App Links) and `/.well-known/apple-app-site-association` (iOS Universal Links for `/reset-password`). The repos are grouped as submodules in the `synapcart` umbrella repo, next to `synapcart_backend` and `synapcart_mobile`.

## Commands

```bash
npm install
cp .env.example .env.local   # NEXT_PUBLIC_API_URL is required: next.config.ts throws without it
npm run dev      # http://localhost:3000 — try /reset-password?token=test123 and /delete-account
npm run build
npm run lint     # ESLint 9 flat config (next core-web-vitals + typescript)
npm run preview  # OpenNext build + wrangler dev (workerd), like production
npm run deploy / npm run deploy:staging
```

There are no automated tests. Check changes with `npm run lint && npm run build`, then screenshot the pages with the preinstalled Playwright at phone (390px) and desktop widths against a local backend on port 8001.

## Versions

`package.json` pins **Next.js 16** and **React 19**; use APIs that match those versions.

## Architecture

- **Env:** `NEXT_PUBLIC_API_URL` is the backend origin: local `http://localhost:8001`, production `https://api.synapcart.emreaydin.dev`, staging `https://staging-api.synapcart.emreaydin.dev`. `NEXT_PUBLIC_SITE_URL` (default `https://synapcart.emreaydin.dev`) feeds `metadataBase`, canonical URLs, `robots.ts` and `sitemap.ts`. Both are inlined at build time: production values come from the committed `.env.production`, and the `deploy:staging` script overrides them inline.
- **Cloudflare:** `wrangler.jsonc` defines the Worker (`.open-next/worker.js`), the assets binding, the custom domains and `env.staging`; `open-next.config.ts` holds the adapter config. Static files in `public/` are served by Workers Static Assets, so their headers live in `public/_headers`, not `next.config.ts`. The `.well-known` files must keep `Content-Type: application/json`. `global_fetch_strictly_public` blocks the `/api` rewrite from reaching a localhost backend under `npm run preview`; drop the flag locally if you need that.
- `next.config.ts` rewrites `/api/:path*` to the backend, so client code calls relative `/api/v1/...` paths and avoids CORS. It also sets security headers and serves `assetlinks.json` as JSON.
- **Routes** (`app/`): `/` landing, `/privacy`, `/terms`, `/support`, `/delete-account`, `/reset-password`, `not-found.tsx`, `robots.ts`, `sitemap.ts`. `icon.png`, `apple-icon.png`, `favicon.ico` and `opengraph-image.png` are generated from `synapcart/design/logo_foreground.png`.
- **Paths that other repos depend on, which must not change:**
  - `/reset-password?token=`: built by the backend's `buildResetUrl` (`src/lib/security.ts`). The page POSTs `{token, new_password}` to `/api/v1/auth/reset-password`. An invalid or expired link switches to a "request a new link" form (`/auth/forgot-password`), and success opens the app through `synapcart://login`, falling back to `/`. On iOS the AASA file claims `/reset-password?token=`, so with the app installed the link opens the app's reset screen directly.
  - `/delete-account` and `/delete-account?token=`: built by the backend's `buildDeleteUrl`. Without a token, the page shows the in-app steps and an email form (`POST /auth/delete-request`). With a token, it asks for confirmation and POSTs `/auth/delete-confirm`.
  - `/privacy`, `/terms` and `/support`: linked from both apps' Register and Profile screens (Android `BuildConfig.WEB_URL`, iOS `WEB_URL` in the xcconfig).
- `lib/site.ts` holds the site constants: support email, data controller, Play and App Store URLs (the App Store id also drives the Smart App Banner in `layout.tsx` once it is no longer the zero placeholder), and the plan limits shown on the landing page. `components/StoreBadges.tsx` renders both badges, App Store first. Values marked OWNER are placeholders until the owner confirms them. Keep the plan limits in sync with the backend's `src/services/plan.ts` and both apps' paywall copy. Legal copy covers both stores (Apple EULA, refunds via reportaproblem.apple.com, cancelling on iOS).
- `lib/api.ts` `postJson` handles network errors, non-JSON bodies, 429 and 5xx, and throws the backend's `detail` string.
- `public/.well-known/assetlinks.json` holds a placeholder fingerprint (replace it with the Play app-signing SHA-256), and `apple-app-site-association` holds a `REPLACE_WITH_TEAM_ID` placeholder (replace it with the Apple Team ID).

## Styling

Plain CSS: design tokens and shared classes (`.btn`, `.card`, `.input`, `.alert`, `.container`) live in `app/globals.css` as CSS variables mirroring the mobile `SynapColors`. Component styles are CSS modules. The site is dark-only. Plus Jakarta Sans is bundled through `next/font/local` (`app/fonts`, OFL), so builds don't fetch Google Fonts. Because `globals.css` loads after the component modules, shared classes must not set properties that modules override; `.container` uses `padding-inline` for this reason.

User-facing text is Turkish (`lang="tr"`).
