# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
bun run dev              # Watch mode build
bun run build            # Production build (tsdown + CSS copy)
bun run typecheck        # TypeScript type checking
bun run check            # Full quality gate: lint + test + build + pack:check

# Testing
bun run test             # Run all vitest tests (unit + browser + storybook)
bun run test:smoke       # Smoke tests against built output
bun run storybook        # Storybook dev server (port 6006)

# Demo apps
bun run demo:setup       # Install example app dependencies
bun run demo:dev:react   # Run React example (also: vue, svelte, next, tanstack)

# Documentation
bun run docs:setup && bun run docs:dev

# Releases
bun run changeset        # Create a changeset before merging
```

**Running a single test:** Pass a filename filter to vitest:
```bash
bunx vitest run src/core/validation.test.ts
```

Commits must follow **Conventional Commits** (`feat:`, `fix:`, `chore:`, etc.) — enforced by commitlint. PRs also require a changeset file.

## Architecture

This is a **framework-agnostic UI component library** that ships a Header and Footer with a single shared contract across React, Vue, Svelte, Web Components, Next.js, and TanStack Router.

### Layer Model

```
src/core/          ← Pure TypeScript: types, validation, normalization, theming
    ↓
src/               ← React components (direct implementation using core)
    ↓
src/web/           ← Web Components (custom elements, standalone)
    ↓
src/vue/           ← Vue 3.5+ wrappers around Web Components
src/svelte/        ← Svelte 5 action (`use:brandShell`) wrapping Web Components
```

Vue and Svelte adapters do **not** re-implement logic — they delegate to the Web Components layer. Only React has its own direct implementation.

### Core (`src/core/`)

| File | Purpose |
|------|---------|
| `types.ts` | All TypeScript types: `BrandDetails`, `BrandTheme`, `BrandNavLink`, `BrandAction` |
| `validation.ts` | Runtime schema validation with detailed error messages |
| `shell.ts` | Normalizes raw props → `ShellViewModel` consumed by all adapters |
| `links.ts` | Safe URL validation (blocks `javascript:`, `data:`, etc.) |
| `theme.ts` | Converts `BrandTheme` → CSS custom properties |
| `social.ts` | Social platform detection and icon mapping |

### Package Exports

```
"."          → dist/index.mjs   (React)
"./web"      → dist/web.mjs     (Web Components)
"./vue"      → dist/vue.mjs     (Vue)
"./svelte"   → dist/svelte.mjs  (Svelte)
"./schema"   → dist/brand-shell.schema.json
"./default.css" → dist/default.css
```

Build is managed by **tsdown** with 4 entry points and ESM-only output. Framework peer deps (react, vue, svelte) are externalized.

### Test Projects (Vitest)

- **unit** — Node environment; tests in `src/core/`
- **web-smoke** — Playwright/Chromium browser tests for framework adapters
- **storybook** — Storybook component interaction tests

### Supporting Directories

- `apps/docs/` — Documentation site (Vite + React 19)
- `examples/` — Runnable demo apps (react-vite, vue-vite, svelte-vite, next-app, tanstack-vite)
- `starters/` — Canary npm consumer templates used in CI to verify published output
- `.storybook/` — Storybook config with Chromatic visual regression

### CI / Release Flow

1. PRs must have a changeset and conventional commit messages
2. Merge to `main` triggers a Release PR (auto-bumps versions)
3. Merging the Release PR publishes to npm via OIDC Trusted Publishing
