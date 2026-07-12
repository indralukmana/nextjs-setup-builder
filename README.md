# Monis Setup Builder

Interactive workspace designer for [monis.rent](https://www.monis.rent) — visually compose a desk, chair, and accessories setup, preview it live, then request a Bali rental (mock checkout; no payment backend yet).

Built for the Desent Solutions challenge: a polished Next.js product surface with i18n, accessibility, and shareable setups.

## Features

- **Live SVG workspace preview** — layered desk / chair / monitors / accessories that update as you select products
- **Catalog + presets** — desks, chairs, monitors, lamp, plant, peripherals, webcam, whiteboard, power strip; one-click **Essentials**, **Focus**, and **Creator** presets (each shows weekly total)
- **Shareable setup URLs** — selection syncs to query params (`desk`, `chair`, `accessories`, `weeks`); opening a link restores that setup (URL wins over localStorage)
- **Share / copy link** — `navigator.share` when available, otherwise clipboard
- **Named saved setups** — up to 3 named setups in `localStorage` (`monis-saved-setups`)
- **Reset / clear** — reset restores defaults; clear empties the session setup (empty checkout CTA)
- **Duration on the builder** — 1 / 4 / 12 weeks on the sticky summary (synced to the URL)
- **Persisted builder state** — Zustand + `localStorage` (`monis-setup-builder`)
- **Checkout contact capture** — name, email, WhatsApp-friendly phone with zod validation; `POST /api/rental-requests` returns a request id (structured log, rate-limited)
- **Locale money** — `en` shows USD; `id` shows IDR via fixed display rate (`USD_TO_IDR = 16000` in [`src/lib/pricing.ts`](src/lib/pricing.ts)); catalog prices stay USD-week units
- **Bilingual UI** — English and Indonesian (`en`, `id`) via next-intl
- **Web vitals sink** — browser metrics → `POST /api/web-vitals` (validated, structured logs, rate-limited, optional webhook)

## Quick start

Prerequisites: [mise](https://mise.jdx.dev/) (pins Node 22 + pnpm 10).

```bash
mise install
pnpm install
cp .env.example .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) (redirects to `/en`).

First Playwright run may need browsers:

```bash
pnpm exec playwright install
```

## Explore the app

| Route               | What to try                                                        |
| ------------------- | ------------------------------------------------------------------ |
| `/en` or `/id`      | Marketing home — hero, how it works, jump into the builder         |
| `/en/setup-builder` | Presets, save/load setups, share link, duration, preview + summary |
| `/en/checkout`      | Contact form, Bali delivery note, mock rental request + request id |
| Storybook `:6006`   | Component gallery + axe a11y (`pnpm storybook`)                    |

### Shareable setup example

```text
http://localhost:3000/en/setup-builder?desk=desk-mechanical&chair=chair-task&accessories=monitor-24,lamp-led&weeks=12
```

| Param         | Meaning                                         |
| ------------- | ----------------------------------------------- |
| `desk`        | Product id (`desk-electric`, `desk-mechanical`) |
| `chair`       | Product id (`chair-ergonomic`, `chair-task`)    |
| `accessories` | Comma-separated accessory ids                   |
| `weeks`       | Rental length: `1`, `4`, or `12`                |

Invalid ids are sanitized to safe defaults. Changing selection rewrites the query (debounced).

### Product catalog (ids)

Defined in [`src/data/catalog.ts`](src/data/catalog.ts); display copy lives in [`messages/en.json`](messages/en.json) / [`messages/id.json`](messages/id.json) under `Catalog.products`.

| Category  | Ids                                                                                                                                                      |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Desk      | `desk-electric`, `desk-mechanical`                                                                                                                       |
| Chair     | `chair-ergonomic`, `chair-task`                                                                                                                          |
| Accessory | `monitor-24`, `monitor-27-4k`, `monitor-34`, `lamp-led`, `plant-desk`, `stand-laptop`, `kit-peripherals`, `webcam-hd`, `whiteboard-glass`, `power-strip` |

Presets: [`src/data/presets.ts`](src/data/presets.ts) (`essentials`, `focus`, `creator`).

### APIs

| Endpoint                    | Behavior                                                                                          |
| --------------------------- | ------------------------------------------------------------------------------------------------- |
| `POST /api/rental-requests` | Zod-validated contact + setup; returns `{ requestId }`; structured `console.info`; ~20 req/min/IP |
| `POST /api/web-vitals`      | Zod-validated metrics; structured log; ~60 req/min/IP; optional webhook                           |

## Project map

```text
src/
  app/
    [locale]/             # Home, setup-builder, checkout (App Router)
    api/rental-requests/   # Mock rental ingestion
    api/web-vitals/        # Metric ingestion
    og/                    # Dynamic OG image
  components/
    home/                  # Landing sections
    setup-builder/         # Catalog, preview, presets, URL sync, saved setups
    checkout/              # Summary + rental request panel
    analytics/             # Client web-vitals reporter
    seo/                   # JSON-LD helpers
    ui/                    # shadcn (Base UI) primitives
  data/                    # Catalog + presets (static for now)
  store/                   # Zustand setup-builder store
  lib/                     # Pricing, catalog-api, setup-url, rental-request, saved-setups, rate-limit
  i18n/
  hooks/
messages/                  # en.json, id.json
e2e/
.storybook/
```

### Where to look first

| Goal                          | Start here                                           |
| ----------------------------- | ---------------------------------------------------- |
| Change products / prices      | `src/data/catalog.ts`, `messages/*/Catalog`          |
| Add a preview SVG             | `src/components/setup-builder/preview-layers/`       |
| Builder selection logic       | `src/store/setup-builder-store.ts`                   |
| Share / restore URLs          | `src/lib/setup-url.ts`, `setup-url-sync.tsx`         |
| Saved setups                  | `src/lib/saved-setups.ts`, `saved-setups.tsx`        |
| Checkout form state           | `rental-request-panel.tsx`, `rental-form-reducer.ts` |
| Swap catalog for an API later | `src/lib/catalog-api.ts`                             |
| Agent / contributor rules     | [`AGENTS.md`](AGENTS.md)                             |

## Scripts

| Command                                  | Description                                                 |
| ---------------------------------------- | ----------------------------------------------------------- |
| `pnpm dev`                               | Next.js development server                                  |
| `pnpm build` / `pnpm start`              | Production build and server                                 |
| `pnpm analyze`                           | Production build with bundle analyzer                       |
| `pnpm check`                             | Format check, lint, typecheck, unit tests                   |
| `pnpm format` / `pnpm format:check`      | Oxfmt                                                       |
| `pnpm lint`                              | Oxlint                                                      |
| `pnpm typecheck`                         | `tsc --noEmit`                                              |
| `pnpm test:unit`                         | Vitest unit tests                                           |
| `pnpm test:coverage`                     | Unit tests with coverage                                    |
| `pnpm test:storybook` / `pnpm test:a11y` | Storybook component + axe a11y tests                        |
| `pnpm test:e2e`                          | Playwright (chromium + mobile Chrome)                       |
| `pnpm test:e2e:ui`                       | Playwright UI mode                                          |
| `pnpm test:lighthouse`                   | Lighthouse CI against local production                      |
| `pnpm storybook`                         | Storybook on [http://localhost:6006](http://localhost:6006) |
| `pnpm build-storybook`                   | Static Storybook build                                      |

## Stack

- **Next.js 16** (App Router) + **React 19** + React Compiler
- **Tailwind CSS 4** + **shadcn/ui** (Base UI)
- **next-intl** — locales `en`, `id`
- **Zustand** — persisted setup selection
- **zod** — env, rental contact, web-vitals payloads
- **Motion** — intentional UI motion (respects reduced motion)
- **Oxlint** + **Oxfmt**
- **Vitest** + **Storybook** (axe) + **Playwright**
- **Lefthook** — pre-commit / pre-push
- **mise** + **pnpm**

## Environment

Copy `.env.example` → `.env.local`. Validated in [`src/env.ts`](src/env.ts).

| Variable                 | Required | Purpose                                                           |
| ------------------------ | -------- | ----------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`   | Yes      | Canonical site URL (SEO, absolute links)                          |
| `WEB_VITALS_WEBHOOK_URL` | No       | If set, accepted metrics are also `POST`ed here (fire-and-forget) |

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# WEB_VITALS_WEBHOOK_URL=https://example.com/web-vitals
```

## Testing notes

- **Unit:** pricing, store, setup URL, rental/web-vitals schemas, saved setups, form reducer — `pnpm test:unit`
- **E2E:** home (en/id), setup-builder (URL, presets, share, saved setups), checkout (validation, submit, clear empty) — `pnpm test:e2e`
- **A11y:** Storybook stories fail on axe `error` severity — `pnpm test:a11y`
- CI workflow: [`.github/workflows/ci.yml`](.github/workflows/ci.yml)

## Git hooks

Lefthook installs on `pnpm install` (`prepare`):

- **pre-commit:** oxlint + oxfmt on staged files
- **pre-push:** typecheck + unit tests

Do not use `--no-verify` unless explicitly approved.

## Conventions

See [`AGENTS.md`](AGENTS.md) for naming, i18n (`@/i18n/navigation`), env access (`@/env`), and UI patterns. Feature name is always **setup-builder** (not “designer”).

## Out of scope (for now)

- Real payments (Stripe) or live email / WhatsApp delivery
- Production monis product photography (SVG illustrations stand in)
