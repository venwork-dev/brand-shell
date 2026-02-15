## Brand Shell

Reusable header and footer components that ship with a premium default theme, typed props, and Storybook-based docs. Drop the package into React, Vue, or Svelte apps to keep your brand chrome consistent across projects.

### Installation

```bash
bun add brand-shell
```

### Basic usage

```tsx
import { Header, Footer, type BrandDetails, type BrandTheme } from "brand-shell";
import "brand-shell/default.css";

const details: BrandDetails = {
  name: "Mounika Thota",
  homeHref: "/",
  navLinks: [
    { label: "Blog", href: "/blog" },
    { label: "Docs", href: "/docs" },
  ],
  primaryAction: { label: "Hire Me", href: "mailto:hello@example.com" },
  secondaryAction: { label: "Resume", href: "/resume.pdf", target: "_blank" },
  linkedin: "https://linkedin.com/in/example",
  github: "https://github.com/example",
  twitter: "https://twitter.com/example",
  gmail: "hello@example.com",
  tagline: "Design-system quality shell for every project.",
};

const theme: BrandTheme = {
  primaryColor: "#0ea5e9",
  backgroundColor: "#0f172a",
  textColor: "#f8fafc",
  fontFamily: '"Inter", system-ui, sans-serif',
  socialIconSize: "2.25rem",
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header details={details} theme={theme} />
      {children}
      <Footer details={details} theme={theme} />
    </>
  );
}
```

### Framework-agnostic core helpers

The package now exports pure TypeScript helpers you can reuse in other framework adapters:

```ts
import {
  buildShellViewModel,
  validateBrandDetails,
  validateBrandTheme,
} from "brand-shell";
```

`buildShellViewModel` normalizes nav links and CTA behavior (target/rel/variants) so framework adapters share the same rules.

Validation + normalization are also exported for external integrations. The adapters run these checks in development mode.

```ts
const detailsCheck = validateBrandDetails(input.details);
const themeCheck = validateBrandTheme(input.theme);

if (!detailsCheck.valid || !themeCheck.valid) {
  throw new Error([...detailsCheck.errors, ...themeCheck.errors].join("\n"));
}

const normalizedDetails = detailsCheck.normalized;
const normalizedTheme = themeCheck.normalized;
```

### JSON schema

You can validate payloads in any runtime using the published schema:

```ts
import schema from "brand-shell/schema";
// also available as: brand-shell/schema.json
```

This repo validates the schema with Ajv in unit tests (`src/core/schema.test.ts`) to catch contract regressions before release.

### Web Components adapter

You can also use framework-agnostic custom elements:

```ts
import { applyBrandShellProps, registerBrandShellElements } from "brand-shell/web";
import "brand-shell/default.css";

registerBrandShellElements();
```

```html
<brand-header id="app-header"></brand-header>
<brand-footer id="app-footer"></brand-footer>
```

```ts
const details = {
  name: "Brand Shell",
  homeHref: "/",
  navLinks: [{ label: "Docs", href: "/docs" }],
  primaryAction: { label: "Contact", href: "mailto:hello@example.com" },
  linkedin: "https://linkedin.com/in/example",
};

const theme = {
  primaryColor: "#0ea5e9",
  backgroundColor: "#0f172a",
  textColor: "#f8fafc",
};

const header = document.getElementById("app-header");
const footer = document.getElementById("app-footer");

if (header && footer) {
  applyBrandShellProps(header, { details, theme });
  applyBrandShellProps(footer, { details, theme });
}
```

### Vue adapter

Use framework-native Vue components:

```vue
<script setup>
import { BrandFooter, BrandHeader } from "brand-shell/vue";
import "brand-shell/default.css";

const details = { name: "Brand Shell" };
const theme = { primaryColor: "#0ea5e9" };
</script>

<template>
  <BrandHeader :details="details" :theme="theme" />
  <BrandFooter :details="details" :theme="theme" />
</template>
```

### Svelte adapter

Use a Svelte action on the custom element tags:

```svelte
<script>
  import { brandShell } from "brand-shell/svelte";
  import "brand-shell/default.css";

  const shellProps = {
    details: { name: "Brand Shell" },
    theme: { primaryColor: "#0ea5e9" },
  };
</script>

<brand-header use:brandShell={shellProps}></brand-header>
<brand-footer use:brandShell={shellProps}></brand-footer>
```

### Props reference

#### `BrandDetails`

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` | Required brand name shown in header/footer |
| `homeHref` | `string` | Optional link applied to the header name/logo |
| `navLinks` | `BrandNavLink[]` | Optional text links (e.g. Blog, Docs, About) |
| `primaryAction` | `BrandAction` | Highlighted CTA button (e.g. Hire me) |
| `secondaryAction` | `BrandAction` | Optional secondary CTA button |
| `linkedin`, `github`, `twitter`, `discord`, `website` | `string` | Social/profile URLs rendered as icon buttons |
| `gmail` | `string` | Email address or `mailto:` link |
| `tagline` | `string` | Short line shown in the footer |

#### `BrandNavLink`

| Field | Type | Description |
| --- | --- | --- |
| `label` | `string` | Visible text |
| `href` | `string` | Destination |
| `ariaLabel` | `string` | Optional accessible label override |
| `target` | `_blank \| _self \| _parent \| _top` | Optional target |
| `rel` | `string` | Optional rel attribute |

#### `BrandAction`

| Field | Type | Description |
| --- | --- | --- |
| `label` | `string` | CTA text |
| `href` | `string` | Destination URL |
| `ariaLabel` | `string` | Optional accessible label |
| `target` | `_blank \| _self \| _parent \| _top` | Optional target |
| `rel` | `string` | Optional rel |
| `variant` | `"primary" \| "secondary" \| "ghost"` | Optional style hint (defaults to primary for the last CTA) |

#### `BrandTheme`

| Field | Type | Description |
| --- | --- | --- |
| `primaryColor` | `string` | Accent color for links/buttons |
| `backgroundColor` | `string` | Header/footer background |
| `textColor` | `string` | Primary text color |
| `fontFamily` | `string` | Font stack |
| `linkColor` | `string` | Optional base link color |
| `socialIconSize` | `string` | Size of the circular social buttons (defaults to `2.5rem`) |
| `buttonTextColor` | `string` | Optional primary CTA text color override |

### Theming via CSS variables

`styles/default.css` exposes CSS custom properties you can override globally:

| Variable | Defaults to | Purpose |
| --- | --- | --- |
| `--brand-primary` | `#2563eb` | Accent + CTA background |
| `--brand-bg` | `#0f172a` | Header/footer background |
| `--brand-text` | `#f1f5f9` | Base text color |
| `--brand-font` | `"Inter", system-ui` | Font stack |
| `--brand-link` | `#94a3b8` | Link color |
| `--brand-social-size` | `2.5rem` | Icon button size |
| `--brand-button-text` | `#f8fafc` | Primary button text color |

Set them once in your consuming app:

```css
:root {
  --brand-primary: #ec4899;
  --brand-font: "Space Grotesk", system-ui, sans-serif;
  --brand-social-size: 2rem;
}
```

### Storybook

Run Storybook locally to explore examples and tweak controls:

```bash
bun run storybook
```

The stories showcase default, themed, and minimal configurations and expose controls for nav links, CTA buttons, and theme tokens.

### Framework demo consumers

Minimal demo apps for React, Vue, and Svelte are available under `examples/` and all share
`examples/shared/brand-contract.json`.

- `examples/react-vite`
- `examples/vue-vite`
- `examples/svelte-vite`

Quick commands from repo root:

```bash
bun run demo:setup
bun run demo:dev:react
bun run demo:dev:vue
bun run demo:dev:svelte
bun run demo:build:all
bun run test:smoke
```

See `examples/README.md` for details.
