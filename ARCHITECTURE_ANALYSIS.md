# brand-shell — Architectural Analysis

> Authored: 2026-02-20
> Scope: Full codebase review as a senior principal engineer

---

## Overview

brand-shell is a framework-agnostic UI component library (v0.11.0) that ships a `Header` and `Footer` with a single shared contract across React, Vue 3.5+, Svelte 5, Web Components, Next.js App Router, and TanStack Router. ESM-only, built with tsdown, zero runtime dependencies.

---

## Layer Model

```
src/core/          ← Pure TypeScript: types, validation, normalization, theming
    ↓
src/               ← React components (direct implementation using core)
    ↓
src/web/           ← Web Components (custom elements, standalone)
    ↓
src/vue/           ← Vue 3.5+ wrappers around Web Components
src/svelte/        ← Svelte 5 action (use:brandShell) wrapping Web Components
```

Vue and Svelte adapters do NOT re-implement logic — they delegate to the Web Components layer.
Only React has its own direct implementation.

---

## What the Library Gets Right

- **Layer separation is sound.** Core is pure TypeScript with zero DOM coupling — testable in isolation and framework-portable.
- **Security posture is good.** URL sanitization (`normalizeSafeHref`), automatic `rel="noopener noreferrer"` enforcement, dev-only validation that throws early.
- **Theming model is elegant.** Per-instance CSS variable injection via inline styles means two Header components on the same page can have different themes. WCAG contrast auto-calculation for button text is a nice touch.
- **Package boundary is clean.** One npm package, four entry points, one CSS import, zero runtime deps.
- **Dev/prod guard.** Validation is a dev-only cost (`shouldValidateInDev`), production builds skip it entirely.

---

## Configuration Flow: Consumer to Component

```
Consumer provides BrandDetails + BrandTheme
          │
          ▼
Dev-mode validation (validateBrandDetails / validateBrandTheme)
  → throws BrandShellValidationError with path-prefixed messages
          │
          ▼
normalizeBrandDetails  →  NormalizedBrandDetails
  ∙ homeHref/website/social: normalizeSafeHref (strips unsafe, keeps safe)
  ∙ gmail: normalizeGmailHref (ensures mailto: prefix)
  ∙ navLinks: target defaults to _self, rel auto-enforced for _blank
  ∙ actions: variant resolved, rel enforced

normalizeBrandTheme  →  BrandTheme | null
  ∙ trims whitespace, strips empty strings, strips unknown keys
          │
          ▼
buildShellViewModel  →  { navLinks, ctaLinks, socialLinks }
  ∙ CTAs: ordered secondary → primary, variant defaulted
  ∙ socialLinks: ordered by platform precedence
          │
          ▼
themeToCssVariables  →  CSS custom properties
  ∙ button text color auto-calculated from hex primaryColor if needed
          │
          ▼
Render (React JSX / Web Component DOM / delegated to WC via Vue/Svelte)
  ∙ CSS vars applied inline on root element
  ∙ data-brand-cta-layout attribute set from theme.ctaLayout
  ∙ BEM class structure: .brand-shell-header / .brand-shell-footer
```

---

## Architectural Weaknesses

### 1. [HIGH] React `"."` export leaks into non-React projects — **Root cause of Vue Vite error**

**The problem:**
`package.json` has legacy `"main"` and `"module"` fields both pointing to `dist/index.mjs` — the React adapter:

```json
"main": "./dist/index.mjs",
"module": "./dist/index.mjs",
```

`dist/index.mjs` contains on line 2:
```js
import { jsx, jsxs } from "react/jsx-runtime";
```

When a Vue app (without React installed) imports `brand-shell/vue`, Vite's dep optimizer scans the package. It reads `"main"` / `"module"` / the `"."` export condition — all of which resolve to `dist/index.mjs`. Encountering the React import, Vite tries to resolve it as an optional peer dep. Since React is not installed, it throws:

```
Uncaught Error: Could not resolve "react/jsx-runtime" imported by "brand-shell". Is it installed?
  at optional-peer-dep:__vite-optional-peer-dep:react/jsx-runtime:brand-shell:false
```

**Consumer workaround (immediate):**
Add to the Vue app's `vite.config.ts`:
```ts
optimizeDeps: {
  exclude: ['brand-shell']
}
```

**Library fix (proper):** Remove `"main"` and `"module"` legacy fields from `package.json`. The package is `"type": "module"` and has a complete `exports` map — modern bundlers (Vite, webpack 5, Rollup) all use `exports` and never fall back to `"main"`/`"module"`. Removing them prevents Vite from reading the React entry point when a Vue consumer installs the package.

**Breaking change:** No.

---

### 2. [HIGH] No router-aware link rendering

Every nav link and CTA is a plain `<a>` tag. In any SPA (React Router, Next.js, TanStack Router, Vue Router), these cause full page navigations. There is no render prop, slot, or hook to substitute a router's `<Link>` component.

**Impact:** Any serious SPA consumer must intercept `click` events globally or accept full-page reloads.
**Fix:** Additive — expose a `renderLink` render prop (React) / `link-component` slot (Vue) / slot (Web Component).
**Breaking change:** No.

---

### 3. [HIGH] Svelte is an action, not a component

Vue exports `<BrandHeader>` / `<BrandFooter>` as proper Vue components. Svelte exports a single `brandShell` action applied to bare `<brand-header>` custom element tags the consumer writes manually.

This is inconsistent with how Svelte libraries work. Consumers expect `.svelte` component exports.

**Fix:** Ship `.svelte` component wrappers alongside the action.
**Breaking change:** Minor (additive; action can remain for backwards compat).

---

### 4. [MEDIUM] Closed social platform system

`SocialPlatform` is a closed union: `website | linkedin | gmail | github | twitter | discord`. No escape hatch for Bluesky, Mastodon, YouTube, Instagram, or custom platforms. Social icon ordering is also hardcoded in `social.ts` and cannot be changed.

**Fix:** Accept a `customSocialLinks?: { platform: string; href: string; icon: string }[]` in `BrandDetails`.
**Breaking change:** No.

---

### 5. [MEDIUM] `gmail` field name is a semantic mistake

The field represents any email contact but is named `gmail`. Users with non-Gmail addresses get confused. This name is in the JSON schema, types, and validation.

**Fix:** Rename to `email`. Deprecate `gmail` with an alias.
**Breaking change:** Yes (minor semver bump, deprecation path available).

---

### 6. [MEDIUM] No i18n / RTL support

CSS uses physical properties (`left`, `right`, `margin-left`) rather than logical properties (`inline-start`, `inline-end`). RTL layouts are broken without consumer-side overrides.

**Fix:** Migrate CSS to logical properties.
**Breaking change:** No.

---

### 7. [LOW] Double normalization in React components

`Header.tsx` and `Footer.tsx` call `normalizeBrandDetails` explicitly, then `buildShellViewModel` calls it again internally. Idempotent but wasteful on every render.

**Fix:** Have components pass raw details to `buildShellViewModel` and let it do the single normalization pass.
**Breaking change:** No.

---

### 8. [LOW] Contrast auto-calculation only works for hex colors

`getAccessibleTextColor` in `theme.ts` silently returns `undefined` for `oklch()`, `hsl()`, `rgb()`, or named CSS colors. Consumers using modern color syntax get no automatic button text contrast. This is undocumented.

**Fix:** Document the limitation; extend parsing to support `rgb()` and `hsl()` as a minimum.
**Breaking change:** No.

---

### 9. [LOW] Layout tokens not exposed in `BrandTheme`

Several `--brand-*` CSS variables have no `BrandTheme` prop equivalent:
- `--brand-radius`
- `--brand-header-height`
- `--brand-footer-padding`
- `--brand-button-secondary`

Consumers must drop into raw CSS to change these, which is inconsistent with the theme prop pattern.

**Fix:** Add to `BrandTheme` and `themeToCssVariables`.
**Breaking change:** No.

---

### 10. [LOW] `website` social platform uses a speech bubble icon

`MessageCircleIcon` (Lucide speech bubble) is used for a generic website URL. A globe icon is the universal convention.

**Fix:** Swap to a globe/external-link SVG in both React and Web Component layers.
**Breaking change:** No (visual only).

---

### 11. [LOW] Social links always open `_blank`

`target="_blank" rel="noopener noreferrer"` is hardcoded for all social icons. Not configurable. `mailto:` links don't meaningfully use `target` but still get it.

**Fix:** Respect per-link `target`/`rel` if provided, otherwise default to `_blank` for social.
**Breaking change:** No.

---

## Severity & Effort Summary

| # | Issue | Severity | Breaking | Effort |
|---|-------|----------|----------|--------|
| 1 | React `"."` export leaks into Vue/Svelte apps | **High** | No | XS |
| 2 | No router-aware link rendering | **High** | No | M |
| 3 | Svelte action vs. component | **High** | Minor | S |
| 4 | Closed social platform system | Medium | No | M |
| 5 | `gmail` field naming | Medium | Yes | S |
| 6 | No RTL / i18n | Medium | No | M |
| 7 | Double normalization in React | Low | No | XS |
| 8 | Contrast only works for hex | Low | No | S |
| 9 | Layout tokens not in `BrandTheme` | Low | No | S |
| 10 | `website` icon semantics | Low | No | XS |
| 11 | Social links always `_blank` | Low | No | XS |

---

## Recommended Fix Priority

1. **Issue #1** — Remove `"main"` and `"module"` from `package.json`. One-line fix, unblocks all Vue/Svelte consumers. Zero risk.
2. **Issue #2** — Router link render prop. Highest consumer impact for SPA use cases.
3. **Issue #3** — Svelte component exports alongside the existing action.
4. **Issue #4** — Extensible social links. Common consumer request.
5. **Issue #5** — Rename `gmail` → `email` with deprecation alias.
