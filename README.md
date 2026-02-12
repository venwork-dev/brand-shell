## Brand Shell

Reusable header and footer components that ship with a premium default theme, typed props, and Storybook-based docs. Drop the package into any React app (Vite, Next.js, etc.) to keep your brand chrome consistent across projects.

### Installation

```bash
npm install brand-shell
# or
pnpm add brand-shell
# or
bun add brand-shell
```

### Basic usage

```tsx
import { Header, Footer, type BrandDetails, type BrandTheme } from "brand-shell";
import "brand-shell/dist/default.css";

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
| `--brand-button-text` | `#0f172a` | Primary button text color |

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
npm run storybook
```

The stories showcase default, themed, and minimal configurations and expose controls for nav links, CTA buttons, and theme tokens.
