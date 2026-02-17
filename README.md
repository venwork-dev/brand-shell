# Brand Shell

Reusable, validated header and footer UI with one shared contract across React, Next.js, TanStack Router, Vue, Svelte, and Web Components.

## Install

```bash
bun add brand-shell
```

## Quick Start (React)

```tsx
import { Footer, Header, type BrandDetails, type BrandTheme } from "brand-shell";
import "brand-shell/default.css";

const details: BrandDetails = {
  name: "Brand Shell",
  homeHref: "/",
  navLinks: [
    { label: "Docs", href: "/docs" },
    { label: "Blog", href: "/blog" },
  ],
  primaryAction: { label: "Contact", href: "mailto:hello@example.com" },
  secondaryAction: { label: "GitHub", href: "https://github.com/example", target: "_blank" },
  github: "https://github.com/example",
  linkedin: "https://linkedin.com/in/example",
  tagline: "Build once. Reuse everywhere.",
};

const theme: BrandTheme = {
  primaryColor: "#2563eb",
  backgroundColor: "#0f172a",
  textColor: "#f8fafc",
};

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header details={details} theme={theme} />
      {children}
      <Footer details={details} theme={theme} />
    </>
  );
}
```

## Framework Adapters

- React/Next/TanStack: `import { Header, Footer } from "brand-shell"`
- Vue: `import { BrandHeader, BrandFooter } from "brand-shell/vue"`
- Svelte: `import { brandShell } from "brand-shell/svelte"`
- Web Components: `import { registerBrandShellElements, applyBrandShellProps } from "brand-shell/web"`

All adapters use the same `BrandDetails` + `BrandTheme` contract.

## Validation + Schema

Use runtime validators and exported JSON Schema before rendering external payloads.

```ts
import { validateBrandDetails, validateBrandTheme } from "brand-shell";
import schema from "brand-shell/schema";
```

## Security Defaults

- Unsafe link protocols are rejected during normalization.
- `target="_blank"` links are hardened with `noopener noreferrer`.
- Renderers use text/attributes only (no raw HTML rendering path).

## Docs and Examples

- Dev docs web app: `apps/docs`
- Storybook: [Chromatic live preview](https://6992723e39539a58d711f188-ceiwmlxyrh.chromatic.com/)
- Consumer demos: `examples/react-vite`, `examples/next-app`, `examples/tanstack-vite`, `examples/vue-vite`, `examples/svelte-vite`

## Package Surface

- Main: `brand-shell`
- Adapters: `brand-shell/web`, `brand-shell/vue`, `brand-shell/svelte`
- Schema: `brand-shell/schema` (or `brand-shell/schema.json`)
- Styles: `brand-shell/default.css`

## Versioning

SemVer is managed with Changesets.

See [CONTRIBUTING.md](CONTRIBUTING.md) for development, commit policy, and release flow.
