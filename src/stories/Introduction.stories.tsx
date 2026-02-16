import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Brand Shell/Introduction",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Brand Shell provides reusable Header and Footer primitives with one typed contract, mobile-ready defaults, and multi-framework adapters.",
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const CAPABILITIES = [
  {
    title: "Single Typed Contract",
    description: "Use the same BrandDetails + BrandTheme payloads across React, Next.js, TanStack Router, Vue, Svelte, and Web Components.",
  },
  {
    title: "Mobile-Ready Layout",
    description: "Header/footer ship responsive by default, including configurable mobile CTA arrangement (inline or stacked).",
  },
  {
    title: "Validation + Security",
    description: "Built-in normalization and validators enforce safe links, consistent targets/rel, and schema-backed payload checks.",
  },
  {
    title: "Storybook QA Surface",
    description: "Dedicated mobile, sticky-header, and theme scenarios make visual QA and acceptance checks faster before shipping.",
  },
];

const START_HERE = [
  "Introduction",
  "Header -> Default, Mobile Preview, Mobile Stacked Ctas",
  "Footer -> Default, Mobile Preview, Mobile Stacked Ctas",
  "Shell -> Full Layout, Mobile Layout, StickyHeaderScroll",
];

const QUICK_START_CODE = `import { Header, Footer, validateBrandDetails, validateBrandTheme } from "brand-shell";
import "brand-shell/default.css";

const details = {
  name: "Brand Shell",
  navLinks: [
    { label: "Docs", href: "/docs" },
    { label: "About", href: "/about" }
  ],
  primaryAction: { label: "Contact", href: "mailto:hello@example.com" },
  secondaryAction: { label: "Pricing", href: "/pricing" }
};

const theme = {
  primaryColor: "#2563eb",
  ctaLayout: "inline" // or "stacked"
};

const detailsCheck = validateBrandDetails(details);
const themeCheck = validateBrandTheme(theme);

if (!detailsCheck.valid || !themeCheck.valid) {
  throw new Error([...detailsCheck.errors, ...themeCheck.errors].join("\\n"));
}

export function Layout({ children }) {
  return (
    <>
      <Header details={details} theme={theme} />
      {children}
      <Footer details={details} theme={theme} />
    </>
  );
}`;

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at 10% 0%, rgba(45, 212, 191, 0.16), transparent 26%), radial-gradient(circle at 100% 0%, rgba(37, 99, 235, 0.12), transparent 22%), linear-gradient(180deg, #020617 0%, #0b1220 100%)",
    color: "#e2e8f0",
    padding: "clamp(1rem, 3vw, 2rem)",
    boxSizing: "border-box",
  } as React.CSSProperties,
  wrapper: {
    width: "min(980px, 100%)",
    margin: "0 auto",
    fontFamily: '"Manrope", "Inter", "Segoe UI", sans-serif',
  } as React.CSSProperties,
  hero: {
    border: "1px solid rgba(148, 163, 184, 0.28)",
    borderRadius: "1rem",
    padding: "clamp(1rem, 2.5vw, 1.5rem)",
    background: "linear-gradient(145deg, rgba(15, 23, 42, 0.88), rgba(30, 64, 175, 0.2))",
  } as React.CSSProperties,
  badge: {
    display: "inline-block",
    fontSize: "0.74rem",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: "#99f6e4",
    marginBottom: "0.7rem",
    fontWeight: 700,
  } as React.CSSProperties,
  title: {
    margin: 0,
    fontFamily: '"Space Grotesk", "Inter", sans-serif',
    fontWeight: 700,
    letterSpacing: "-0.03em",
    fontSize: "clamp(1.6rem, 3.4vw, 2.25rem)",
  } as React.CSSProperties,
  subtitle: {
    margin: "0.7rem 0 0",
    maxWidth: "72ch",
    color: "#cbd5e1",
    lineHeight: 1.55,
    fontSize: "clamp(0.95rem, 1.5vw, 1.02rem)",
  } as React.CSSProperties,
  section: {
    marginTop: "1rem",
    border: "1px solid rgba(148, 163, 184, 0.2)",
    borderRadius: "0.9rem",
    background: "rgba(15, 23, 42, 0.7)",
    padding: "clamp(0.9rem, 2.4vw, 1.2rem)",
  } as React.CSSProperties,
  sectionTitle: {
    margin: 0,
    fontSize: "0.78rem",
    textTransform: "uppercase" as const,
    letterSpacing: "0.06em",
    color: "#99f6e4",
    fontWeight: 700,
  } as React.CSSProperties,
  capabilityGrid: {
    marginTop: "0.85rem",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
    gap: "0.7rem",
  } as React.CSSProperties,
  card: {
    border: "1px solid rgba(148, 163, 184, 0.25)",
    borderRadius: "0.8rem",
    padding: "0.8rem",
    background: "rgba(2, 6, 23, 0.56)",
  } as React.CSSProperties,
  cardTitle: {
    margin: 0,
    fontFamily: '"Space Grotesk", "Inter", sans-serif',
    fontSize: "1rem",
    color: "#f8fafc",
  } as React.CSSProperties,
  cardBody: {
    margin: "0.48rem 0 0",
    color: "#bfdbfe",
    fontSize: "0.9rem",
    lineHeight: 1.45,
  } as React.CSSProperties,
  checklist: {
    margin: "0.8rem 0 0",
    paddingLeft: "1rem",
    display: "grid",
    gap: "0.45rem",
    color: "#cbd5e1",
  } as React.CSSProperties,
  codeBlock: {
    marginTop: "0.8rem",
    borderRadius: "0.8rem",
    border: "1px solid rgba(148, 163, 184, 0.28)",
    background: "#020617",
    padding: "0.9rem",
    overflowX: "auto",
    color: "#e2e8f0",
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    fontSize: "0.78rem",
    lineHeight: 1.5,
  } as React.CSSProperties,
  footer: {
    marginTop: "1rem",
    color: "#94a3b8",
    fontSize: "0.88rem",
  } as React.CSSProperties,
};

export const ReadMe: Story = {
  render: () => (
    <div style={styles.page}>
      <div style={styles.wrapper}>
        <header style={styles.hero}>
          <span style={styles.badge}>Brand Shell Storybook</span>
          <h1 style={styles.title}>Build once. Reuse everywhere.</h1>
          <p style={styles.subtitle}>
            Use this Storybook as the integration contract guide: validate responsive behavior, CTA layout modes, and
            shell consistency before wiring consumer apps.
          </p>
        </header>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>What You Get</h2>
          <div style={styles.capabilityGrid}>
            {CAPABILITIES.map((item) => (
              <article key={item.title} style={styles.card}>
                <h3 style={styles.cardTitle}>{item.title}</h3>
                <p style={styles.cardBody}>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Start Here</h2>
          <ul style={styles.checklist}>
            {START_HERE.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Quick Start</h2>
          <pre style={styles.codeBlock}>
            <code>{QUICK_START_CODE}</code>
          </pre>
        </section>

        <p style={styles.footer}>
          Tip: use <strong>Mobile Preview</strong>, <strong>Mobile Stacked Ctas</strong>, and <strong>StickyHeaderScroll</strong> as
          your baseline visual QA set before release.
        </p>
      </div>
    </div>
  ),
};
