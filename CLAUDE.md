# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

SynapCart web portal: a Next.js App Router site deployed on Vercel. It serves the landing page, the legal pages the Play Store listing links to, the account-deletion page (Play's required web deletion URL), the password-reset page that the backend's email links to, and `/.well-known/assetlinks.json` for the app's verified links. The repos are grouped as submodules in the `synapcart` umbrella repo, next to `synapcart_backend` and `synapcart_mobile`.

## Commands

```bash
npm install
cp .env.example .env.local   # NEXT_PUBLIC_API_URL is required: next.config.ts throws without it
npm run dev      # http://localhost:3000 — try /reset-password?token=test123 and /delete-account
npm run build
npm run lint     # ESLint 9 flat config (next core-web-vitals + typescript)
```

There are no automated tests. Check changes with `npm run lint && npm run build`, then screenshot the pages with the preinstalled Playwright at phone (390px) and desktop widths against a local backend on port 8001.

## Versions

`package.json` pins **Next.js 16** and **React 19**; use APIs that match those versions.

## Architecture

- **Env:** `NEXT_PUBLIC_API_URL` is the backend origin (local `http://localhost:8001`, production Render). `NEXT_PUBLIC_SITE_URL` (default `https://synapcart.app`) feeds `metadataBase`, canonical URLs, `robots.ts` and `sitemap.ts`.
- `next.config.ts` rewrites `/api/:path*` to the backend, so client code calls relative `/api/v1/...` paths and avoids CORS. It also sets security headers and serves `assetlinks.json` as JSON.
- **Routes** (`app/`): `/` landing, `/privacy`, `/terms`, `/support`, `/delete-account`, `/reset-password`, `not-found.tsx`, `robots.ts`, `sitemap.ts`. `icon.png`, `apple-icon.png`, `favicon.ico` and `opengraph-image.png` are generated from `synapcart/design/logo_foreground.png`.
- **Paths that other repos depend on, which must not change:**
  - `/reset-password?token=`: built by the backend's `build_reset_url`. The page POSTs `{token, new_password}` to `/api/v1/auth/reset-password`. An invalid or expired link switches to a "request a new link" form (`/auth/forgot-password`), and success opens the app through `synapcart://login`, falling back to `/`.
  - `/delete-account` and `/delete-account?token=`: built by the backend's `build_delete_url`. Without a token, the page shows the in-app steps and an email form (`POST /auth/delete-request`). With a token, it asks for confirmation and POSTs `/auth/delete-confirm`.
  - `/privacy`, `/terms` and `/support`: linked from the app's Register and Profile screens (`BuildConfig.WEB_URL`).
- `lib/site.ts` holds the site constants (support email, data controller, Play URL, plan limits shown on the landing page). Values marked OWNER are placeholders until the owner confirms them. Keep the plan limits in sync with the backend's `app/services/plan_service.py` and the app's paywall table.
- `lib/api.ts` `postJson` handles network errors, non-JSON bodies, 429 and 5xx, and throws the backend's `detail` string.
- `public/.well-known/assetlinks.json` holds a placeholder fingerprint. Replace it with the Play app-signing SHA-256 before verifying links.

## Styling

Plain CSS: design tokens and shared classes (`.btn`, `.card`, `.input`, `.alert`, `.container`) live in `app/globals.css` as CSS variables mirroring the mobile `SynapColors`. Component styles are CSS modules. The site is dark-only. Plus Jakarta Sans is bundled through `next/font/local` (`app/fonts`, OFL), so builds don't fetch Google Fonts. Because `globals.css` loads after the component modules, shared classes must not set properties that modules override; `.container` uses `padding-inline` for this reason.

User-facing text is Turkish (`lang="tr"`).
