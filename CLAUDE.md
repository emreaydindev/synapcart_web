# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

SynapCart web portal: a Next.js App Router site deployed on Vercel. Its only real feature today is the password-reset page that the backend's reset email links to. `app/page.tsx` is still the create-next-app placeholder. The repos are grouped as submodules in the `synapcart` umbrella repo, next to `synapcart_backend` and `synapcart_mobile`.

## Commands

```bash
npm install
npm run dev      # http://localhost:3000 — try /reset-password?token=test123
npm run build
npm run lint     # ESLint 9 flat config (next core-web-vitals + typescript)
```

There are no tests.

## Versions

`package.json` pins **Next.js 16** and **React 19**. The README says "Next.js 14", which is out of date, so use APIs that match the installed versions.

## Architecture

- `NEXT_PUBLIC_API_URL` (in `.env.local`, or the Vercel environment) is the backend origin, for example `http://localhost:8001` locally or the Render URL in production.
- `next.config.ts` rewrites `/api/:path*` to `${NEXT_PUBLIC_API_URL}/api/:path*`, so client code calls relative `/api/v1/...` paths and avoids CORS.
- `app/reset-password/page.tsx` is a client component wrapped in `Suspense` because it uses `useSearchParams`. It reads `?token=` and POSTs `{ token, new_password }` to `/api/v1/auth/reset-password`, and the backend replies with a `{ detail }` error or a `{ message }` on success. The backend builds the reset link as `{APP_FRONTEND_URL}/reset-password?token=...`, so this route path must not change.
- Styling uses plain CSS (`globals.css`, CSS modules) with a dark/neon theme that matches the mobile app. User-facing text is in Turkish.
