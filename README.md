# Monis Setup Builder

Interactive workspace designer for [monis.rent](https://www.monis.rent) — visually compose a desk, chair, and accessories setup, preview it live, then request a Bali rental (mock checkout; no payment backend yet).

Built for the Desent Solutions challenge: a polished Next.js product surface with i18n, accessibility, and shareable setups.

## Features

- **Live SVG workspace preview** — layered desk / chair / monitors / accessories that update as you select products
- **Catalog + presets** — desks, chairs, monitors, lamp, plant, peripherals, webcam, whiteboard, power strip; one-click **Essentials**, **Focus**, and **Creator** presets
- **Shareable setup URLs** — selection syncs to query params (`desk`, `chair`, `accessories`, `weeks`); opening a link restores that setup (URL wins over localStorage)
- **Persisted builder state** — Zustand + `localStorage` (`monis-setup-builder`)
- **Checkout contact capture** — name, email, WhatsApp-friendly phone with zod validation; mock “request sent” success (no Stripe / messaging)
- **Bilingual UI** — English and Indonesian (`en`, `id`) via next-intl
- **Web vitals sink** — browser metrics → `POST /api/web-vitals` (validated, structured logs, optional webhook)

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
| `/en/setup-builder` | Pick products, apply a preset, watch the preview + sticky summary  |
| `/en/checkout`      | Confirm setup, fill contact fields, submit the mock rental request |
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

## Project map

```text
src/
  app/
    [locale]/          # Home, setup-builder, checkout (App Router)
    api/web-vitals/    # Metric ingestion
    og/                # Dynamic OG image
  components/
    home/              # Landing sections
    setup-builder/     # Catalog, preview layers, presets, URL sync
    checkout/          # Summary + rental form
    analytics/         # Client web-vitals reporter
    seo/               # JSON-LD helpers
    ui/                # shadcn (Base UI) primitives
  data/                # Catalog + presets (static for now)
  store/               # Zustand setup-builder store
  lib/                 # Pricing, catalog-api seam, setup-url, rental-request, web-vitals
  i18n/                # next-intl routing + navigation
  hooks/
messages/              # en.json, id.json
e2e/                   # Playwright smoke tests
.storybook/            # Storybook + vitest a11y project
```

### Where to look first

| Goal                          | Start here                                     |
| ----------------------------- | ---------------------------------------------- |
| Change products / prices      | `src/data/catalog.ts`, `messages/*/Catalog`    |
| Add a preview SVG             | `src/components/setup-builder/preview-layers/` |
| Builder selection logic       | `src/store/setup-builder-store.ts`             |
| Share / restore URLs          | `src/lib/setup-url.ts`, `setup-url-sync.tsx`   |
| Checkout validation           | `src/lib/rental-request.ts`, `rental-form.tsx` |
| Swap catalog for an API later | `src/lib/catalog-api.ts`                       |
| Agent / contributor rules     | [`AGENTS.md`](AGENTS.md)                       |

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

- **Unit:** pricing, store sanitize, setup URL parse/serialize, rental + web-vitals schemas — `pnpm test:unit`
- **E2E:** home, setup-builder (including shareable URL + presets), checkout validation/submit — `pnpm test:e2e`
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
- Publishing / deploy configuration beyond local + CI checks
