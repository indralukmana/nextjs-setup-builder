<!-- BEGIN:nextjs-agent-rules -->

# Next.js: ALWAYS read docs before coding

Before any Next.js work, read the relevant docs in `node_modules/next/dist/docs/`. Do not rely on outdated knowledge. The docs are authoritative for this version.

Prefer App Router, Server Components by default, and the project conventions below.
<!-- END:nextjs-agent-rules -->

# Monis project conventions

## Toolchain

- Use **pnpm** only (never npm/yarn for this repo).
- Use **mise** for Node and pnpm versions (`mise.toml`).
- Run `mise install && pnpm install` after clone.

## Naming

- Files and folders: `kebab-case` (`product-card.tsx`, `setup-builder/`).
- React component exports: `PascalCase`.
- Feature name is always `setup-builder` (not designer).
- Keep Next.js special files as-is (`page.tsx`, `layout.tsx`, `proxy.ts`).

## Routes and i18n

- App routes live under `src/app/[locale]/`.
- Use `@/i18n/navigation` (`Link`, `useRouter`, `redirect`) — not raw `next/link` for app navigation.
- Messages: `messages/en.json`, `messages/id.json`.
- Locale middleware: `src/proxy.ts` (Next.js 16 proxy convention).

## Env

- Read env only via `@/env` (zod).
- Document new vars in `.env.example`.

## UI

- Prefer shadcn components in `src/components/ui` (Base UI primitives).
- Add components with `pnpm dlx shadcn@latest add <name>`.
- Base UI uses `render` (not Radix `asChild`). For link-styled actions, prefer `Link` + `buttonVariants()` for real anchor semantics.
- Feature UI under `src/components/home`, `setup-builder`, `checkout`, `layout`.

## State

- Setup selection lives in `src/store/setup-builder-store.ts` with persist (`monis-setup-builder`).
- Do not duplicate selection state in checkout.
- Avoid returning new arrays/objects from Zustand selectors (causes infinite loops).

## Lint / format

- **Oxlint** and **Oxfmt** only — no ESLint, Prettier, or Biome.
- Scripts: `pnpm lint`, `pnpm format`, `pnpm check`.

## Testing

- Unit: `src/**/*.test.ts` via Vitest (`pnpm test:unit`).
- Stories: colocated `*.stories.tsx` (CSF3).
- Storybook a11y: `@storybook/addon-a11y` with `parameters.a11y.test = "error"` (WCAG 2 A/AA). Run via `pnpm test:storybook` / `pnpm test:a11y`.
- E2E: `e2e/*.spec.ts` via Playwright; prefer role-based locators.
- React Compiler is enabled — avoid unnecessary hand-rolled memo.

## Git hooks

- Lefthook is required (`lefthook.yml`).
- Never use `--no-verify` unless explicitly approved.
- Local overrides go in gitignored `lefthook-local.yml`.
