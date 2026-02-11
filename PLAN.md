# Reusable Header & Footer Package — Brainstorm & Plan

## Product overview

**What it is** — A small, installable React package that provides a **Header** and **Footer** component. Each project passes in its own content (name, links like LinkedIn and Gmail) and optional branding (colors, fonts). The package renders a standard, conventional layout and ships a premium default look so projects get a great result with minimal setup—or full control when they want it.

**Who it's for** — Developers (or teams) with multiple sites—e.g. portfolio, app landing, Next.js app—who want one shared "shell" for header and footer: same structure and contract everywhere, no copy-paste, and the option to tweak branding per project by passing a theme instead of writing CSS.

**What it does** — Defines a **typed schema** for what goes in the header/footer (linkedin, gmail, name, github, etc.). Renders **standard** header (name + nav links) and footer (links, optional tagline). Offers a **premium default theme** (import one CSS file) and a **theme prop** so callers can change brand color, font, and text color without custom CSS. Supports full override via `className` or omitting the default CSS. Works in any React app (Vite, Next.js, etc.); in Next.js, use in `layout.tsx` for server-rendered header and footer.

**Design intent** — The default should feel so polished that using it, people **rethink** whether they need to style it themselves. Standard, familiar layout; branding that adapts when the caller passes different colors or fonts. One package, many projects, consistent structure and optional premium look.

---

## Goal

- **One package** with a **standard** header and footer (familiar layout: logo/name, nav links, footer with links and maybe copyright).
- **Premium default UX** — So polished and promising that consumers **rethink** whether they need their own CSS. Default should feel like a design-system quality outcome.
- **Theme from the caller** — If they pass a different color, font, or font color, the header and footer **accept it and apply it** to the branding (no custom CSS required).
- **Install in any project**; full override still possible (className / own CSS) when they do want to take over.

---

## 1. What the package should own vs what projects own

| Package owns                                                     | Projects own                                         |
| ---------------------------------------------------------------- | ---------------------------------------------------- |
| **Standard** header/footer structure (conventional layout)       | The actual detail values (caller passes them in)      |
| **Schema** of details (linkedin, gmail, name, etc.)               | Option to use default theme or replace with own CSS  |
| **Premium default UX** (default.css) — so good they rethink CSS  | Optional **theme** (colors, fonts) to adapt branding |
| **Theme API** — accept colors, fonts, font colors and apply them  | Full override via className / own CSS when desired   |

So: **caller passes details; package defines the shape (typed). Package ships optional default styling; projects can use it or bring their own.**

---

## 2. Premium default UX — so promising they rethink their own CSS

**The default theme should feel premium.** Goal: when someone uses it, they think "this already looks great" and **reconsider** whether writing their own CSS is worth it. Polished typography, clear hierarchy, thoughtful spacing, and a standard layout they can trust.

- **Standard header and footer** — Conventional structure: header with site/name and nav (e.g. Home, About, LinkedIn, Email); footer with same or subset of links, optional tagline or copyright. No experimental or confusing layout; familiar and scannable.
- **Use the default**: Import the package CSS once. Header and Footer render with this high-quality default. No config needed for a great first impression.
- **Customize without writing CSS**: Pass a **theme** prop (see section below) — e.g. brand color, font, font color — and the package applies it. Branding adapts; they still get the premium layout and behavior.
- **Override when they want**: `className`, CSS variables, or skip the default CSS entirely. Full control remains available.

So: **default = premium, standard layout; theme prop = adapt colors/fonts without custom CSS; optional = full override.**

---

## 3. Details: caller passes them in; package defines the schema

**Caller always passes the details.** The package does not store your name, links, or email. Each repo provides its own config when rendering Header/Footer.

**Package defines the "shape"** so callers know exactly what to pass and get type safety. For example:

- **linkedin** — URL (e.g. `https://linkedin.com/in/...`)
- **gmail** or **email** — email address (or `mailto:` link)
- **name** — display name
- **github**, **twitter**, **website**, etc. — optional links

The package exports a TypeScript type (e.g. `BrandDetails` or `HeaderFooterDetails`) and the components accept a single prop, e.g. `details={...}`. Each project defines its config once (in env, a config file, or inline) and passes it into `<Header details={myDetails} />` and `<Footer details={myDetails} />`. Same schema everywhere; each repo controls the actual values.

---

## 4. Theme prop: colors, fonts, font colors (no custom CSS needed)

**Header and Footer accept an optional `theme` prop.** When the caller passes different colors or fonts, the package applies them to the branding so the look adapts without the consumer writing any CSS.

**Suggested theme shape (typed):**

- **primaryColor** (or **accentColor**) — Used for link hover, active state, or accent elements. Header/footer use it for branding.
- **backgroundColor** — Optional; header/footer background. If omitted, default from default.css.
- **textColor** — Main text color (e.g. name, nav labels).
- **fontFamily** — Font stack for the header/footer (e.g. `"Inter", sans-serif`).
- **linkColor** — Optional; link default color (can derive from primaryColor if not set).

**Implementation:** The package renders Header/Footer with a wrapper (or on the root element) that sets **CSS custom properties** from the `theme` prop (e.g. `--brand-primary`, `--brand-font`, `--brand-text-color`). The default.css is written to use these variables. So: caller passes `theme={{ primaryColor: "#6366f1", fontFamily: "Georgia, serif" }}`; the component sets those as variables; the default theme responds. No inline styles needed everywhere—just one place that applies the variables.

**Example:**

```tsx
<Header
  details={details}
  theme={{
    primaryColor: "#0ea5e9",
    textColor: "#1e293b",
    fontFamily: "Inter, system-ui, sans-serif",
  }}
/>
```

If `theme` is omitted, the default theme uses its own built-in variables (neutral, modern). Standard header and footer layout; branding adapts when theme is passed.

---

## 5. Distribution (how to install across projects)

- **Local monorepo package** — No publish step. Use npm/pnpm/yarn workspaces; each app does `import { Header, Footer } from "@your-scope/brand-shell"`. Good for only your machines, a few repos.
- **Private npm package** — Publish to npm (private) or GitHub Packages. Each project: `npm i @your-scope/brand-shell`. Good for many machines, CI, or sharing with teammates.
- **Git dependency** — `"@your-scope/brand-shell": "github:youruser/brand-shell"`. No npm account needed; version by tag/commit.

For "across my projects" and "next projects," **monorepo** is simplest to start; **private npm** or **Git** when you want to use it from any repo without a monorepo.

---

## 6. Tech choices (Vite, Next.js, React)

- **React components** (no framework-specific APIs) so the same package works in Vite + React, Next.js (App Router or Pages), and other React setups.
- **Build output**: ESM (and optionally CJS) so Next.js and Vite can consume it.
- No Next-specific code inside the package keeps it framework-agnostic.

---

## 7. How this helps in Next.js (server layout, server header/footer)

In Next.js (App Router), `layout.tsx` is a **Server Component** by default. That's where you typically put the shell: header, main content area, footer.

**How the package fits:**

- **Header and Footer are plain React components.** They don't use `"use client"` and don't depend on browser APIs. So when you use them in `layout.tsx`, they are rendered on the **server** like any other Server Component. You get server-rendered header/footer: same HTML, good SEO, no extra client JS for static content.
- **Details come from the caller.** In Next.js you can pass `details` from server-only data (e.g. env, CMS, or a server-only config). No need to expose secrets to the client if you don't want to.
- **Default theme is just CSS.** Importing the package's default CSS in your root layout doesn't force client components; the styles apply to the server-rendered markup. So "default modern UX" works the same in Next.js as in Vite.
- **If you add client behavior later** (e.g. mobile menu toggle, open/close): the package can export a small client subcomponent, or the consuming app wraps the interactive part in a Client Component. The rest (logo, links, footer text) can stay server-rendered.

So in Next.js: **same package, same API; use `<Header details={...} />` and `<Footer details={...} />` in `layout.tsx` and you get server-rendered header and footer with optional default styling or your own CSS.**

---

## 8. Suggested package layout (high level)

```
brand-shell/
├── package.json         (name: @your-scope/brand-shell, main/module/exports)
├── src/
│   ├── Header.tsx       (accepts details + theme + className; semantic markup)
│   ├── Footer.tsx
│   ├── types.ts         (BrandDetails + BrandTheme: primaryColor, fontFamily, textColor, etc.)
│   └── index.ts         (re-exports Header, Footer, BrandDetails, BrandTheme)
├── styles/
│   └── default.css      (modern default theme, uses CSS variables)
├── .storybook/          (Storybook config; dev-only, not published)
├── src/stories/         (Header.stories.tsx, Footer.stories.tsx)
└── dist/                (built ESM; default.css copied to dist)
```

**Consuming project (e.g. Next.js `layout.tsx`):**

```tsx
import { Header, Footer, type BrandDetails, type BrandTheme } from "@your-scope/brand-shell";
import "@your-scope/brand-shell/dist/default.css"; // optional: premium default

const details: BrandDetails = {
  name: "Mounika",
  linkedin: "https://linkedin.com/in/...",
  gmail: "you@gmail.com",
  github: "https://github.com/...",
};

const theme: BrandTheme = {
  primaryColor: "#0ea5e9",
  textColor: "#1e293b",
  fontFamily: "Inter, system-ui, sans-serif",
};

export default function Layout({ children }) {
  return (
    <>
      <Header details={details} theme={theme} className="..." />
      {children}
      <Footer details={details} theme={theme} className="..." />
    </>
  );
}
```

No `theme`: default premium look. Pass `theme`: branding (colors, fonts) adapt. Skip default CSS + use `className`: full control.

---

## 9. Is there a real need? (validation)

**Yes, if:** you have (or plan to have) **multiple projects** that share the same "brand shell" and you want one place for the **contract** (what goes in header/footer: linkedin, gmail, name, etc.) and optional default look. You avoid copy-pasting markup and types, and upgrading the default theme or adding a link type happens in one package.

**Less critical if:** you only ever have one app. Then a local component in that repo is enough.

**Verdict:** With multiple sites (portfolio, apps, Next.js), the need is real for consistency and reuse. Keep the package small and the API simple so it doesn't become overhead.

---

## 10. Storybook: should we add it?

**Yes.** For a shared component package, Storybook is very useful:

- **Develop in isolation** — Build and tweak Header/Footer without running each consuming app.
- **Document usage** — Show how to pass `details`, which fields are optional, and how to use default vs custom CSS.
- **Make it look better** — See the default theme at a glance; try different `details` (minimal vs full links, long name, etc.) and spot layout/contrast issues.
- **Visual QA** — Catch regressions when you change styles or markup.

Stories to add: Default theme (full details), **theme prop** (different primaryColor, fontFamily, textColor so they see branding adapt), minimal details, with custom `className`, and "no default CSS" (unstyled). Optionally: dark/light if the default theme supports both.

**Cost:** One-time Storybook setup in the package repo (e.g. Storybook for React + Vite). For a 2-component package it's a small addition and matches how most design systems and shared UI packages are developed.

---

## 11. Making the default look better (premium UX)

To hit the bar "so promising they rethink their own CSS," the default theme should feel design-system quality. Concrete levers:

- **Typography** — One clear font stack (e.g. system-ui or a single webfont), consistent size scale (e.g. name slightly larger, links one step down), and enough line-height for readability.
- **Spacing** — Generous padding and gap between nav items / footer links so it doesn't feel cramped; consistent spacing tokens (CSS variables like `--brand-space-md`) so the default feels cohesive.
- **Contrast and hierarchy** — Header/footer background distinct from main content (e.g. subtle border or shade); link color that meets contrast guidelines; hover/focus states so it's clear what's interactive.
- **Layout** — Simple, responsive default: e.g. horizontal nav that stacks or collapses on small screens (if you add a mobile menu later, keep it minimal).
- **Restraint** — Neutral palette (e.g. grays + one accent for links), no heavy shadows or gradients unless you want that as the "signature" default. Easier for projects to override with their own brand.
- **Accessibility** — Semantic HTML (already in scope), visible focus styles, and optional skip-link in the header. Improves both a11y and perceived quality.

Using **CSS variables** for colors, spacing, and fonts in the default theme makes it easy to tune in one place and to document "override these to customize" in Storybook.

---

## 12. Summary

- **Need**: Real for multiple projects; one contract and premium default without copy-paste.
- **Default UX**: **Premium and promising** — standard header/footer, so good that consumers **rethink** using their own CSS. Standard layout: conventional, familiar.
- **Details**: Caller passes them in; package defines the **schema** (linkedin, gmail, name, etc.).
- **Theme**: Caller can pass **colors, fonts, font colors** via a `theme` prop; Header and Footer **accept and apply** them so branding changes without custom CSS. Omit theme for built-in default.
- **Styling**: Optional default.css; `theme` for quick branding; `className` / own CSS for full override.
- **Storybook**: Recommended — document default, theme variants, and overrides.
- **Next.js**: Use in `layout.tsx` as Server Components; same API, server-rendered.
