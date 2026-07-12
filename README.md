# Monis Setup Builder

Interactive workspace designer for [monis.rent](https://www.monis.rent) — visually build a desk, chair, and accessories setup, then rent it for your Bali workspace.

## Setup

Prerequisites: [mise](https://mise.en.dev/) installed.

```bash
mise install
pnpm install
cp .env.example .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) (redirects to `/en`).

## Scripts

| Command                                  | Description                               |
| ---------------------------------------- | ----------------------------------------- |
| `pnpm dev`                               | Next.js development server                |
| `pnpm build` / `pnpm start`              | Production build and server               |
| `pnpm check`                             | Format check, lint, typecheck, unit tests |
| `pnpm test:unit`                         | Vitest unit tests                         |
| `pnpm test:storybook` / `pnpm test:a11y` | Storybook component + axe a11y tests      |
| `pnpm test:e2e`                          | Playwright end-to-end smoke tests         |
| `pnpm storybook`                         | Storybook UI on port 6006                 |
| `pnpm build-storybook`                   | Static Storybook build                    |

## Stack

- Next.js 16 (App Router) + React 19 + React Compiler
- Tailwind CSS + shadcn/ui (Base UI)
- next-intl (`en`, `id`)
- Zustand (persisted setup selection)
- Oxlint + Oxfmt
- Vitest + Storybook + Playwright
- Lefthook (pre-commit / pre-push)
- mise + pnpm

## Locales

Routes are prefixed: `/en`, `/id`, `/en/setup-builder`, `/en/checkout`.

## Environment

Copy `.env.example` to `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Validated in `src/env.ts` with zod.

## Git hooks

Lefthook installs on `pnpm install` (`prepare`):

- **pre-commit:** oxlint + oxfmt on staged files
- **pre-push:** typecheck + unit tests

Do not use `--no-verify` unless explicitly approved.
