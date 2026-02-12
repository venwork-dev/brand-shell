import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Brand Shell/Introduction",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Reusable Header and Footer components for React apps. Use the same brand shell across portfolio sites, landing pages, and Next.js apps.",
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const styles = {
  wrapper: {
    maxWidth: 640,
    fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
    color: "#0f172a",
    lineHeight: 1.6,
  } as React.CSSProperties,
  hero: {
    marginBottom: "2.5rem",
  } as React.CSSProperties,
  title: {
    margin: 0,
    fontSize: "2rem",
    fontWeight: 700,
    letterSpacing: "-0.025em",
    background: "linear-gradient(135deg, #0f172a 0%, #475569 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  } as React.CSSProperties,
  tagline: {
    margin: "0.5rem 0 0",
    fontSize: "1.125rem",
    color: "#64748b",
    fontWeight: 400,
  } as React.CSSProperties,
  section: {
    marginBottom: "2rem",
  } as React.CSSProperties,
  sectionTitle: {
    margin: "0 0 1rem",
    fontSize: "0.75rem",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    color: "#64748b",
  } as React.CSSProperties,
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "0.75rem",
  } as React.CSSProperties,
  chip: {
    padding: "0.625rem 1rem",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    fontSize: "0.875rem",
    color: "#334155",
  } as React.CSSProperties,
  codeBlock: {
    padding: "1.25rem 1.5rem",
    background: "#0f172a",
    borderRadius: 12,
    overflow: "auto",
    fontSize: "0.8125rem",
    lineHeight: 1.6,
    color: "#e2e8f0",
    fontFamily: "ui-monospace, 'SF Mono', Menlo, Monaco, monospace",
  } as React.CSSProperties,
  codeComment: { color: "#94a3b8" } as React.CSSProperties,
  codeKeyword: { color: "#c084fc" } as React.CSSProperties,
  codeString: { color: "#86efac" } as React.CSSProperties,
  footer: {
    marginTop: "2rem",
    paddingTop: "1.5rem",
    borderTop: "1px solid #e2e8f0",
    fontSize: "0.875rem",
    color: "#64748b",
  } as React.CSSProperties,
};

export const ReadMe: Story = {
  render: () => (
    <div style={styles.wrapper}>
      <header style={styles.hero}>
        <h1 style={styles.title}>Brand Shell</h1>
        <p style={styles.tagline}>
          Header and Footer components with a premium default theme. Same contract, every project.
        </p>
      </header>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Features</h2>
        <div style={styles.grid}>
          {[
            "Typed schema",
            "Nav links",
            "Social icons",
            "CTA buttons",
            "Theme prop",
            "Premium default",
          ].map((label) => (
            <div key={label} style={styles.chip}>
              {label}
            </div>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Quick start</h2>
        <pre style={styles.codeBlock}>
          <code>
            <span style={styles.codeKeyword}>import</span>{" "}
            {"{ Header, Footer }"} <span style={styles.codeKeyword}>from</span>{" "}
            <span style={styles.codeString}>"brand-shell"</span>;{"\n"}
            <span style={styles.codeKeyword}>import</span>{" "}
            <span style={styles.codeString}>"brand-shell/dist/default.css"</span>;{"\n\n"}
            <span style={styles.codeKeyword}>const</span> details = {"{"}{"\n"}
            {"  "}name: <span style={styles.codeString}>"Your Name"</span>,{"\n"}
            {"  "}homeHref: <span style={styles.codeString}>"/"</span>,{"\n"}
            {"  "}navLinks: [{"\n"}
            {"    "}{"{"} label: <span style={styles.codeString}>"Blog"</span>, href: <span style={styles.codeString}>"/blog"</span> {"}"},{"\n"}
            {"    "}{"{"} label: <span style={styles.codeString}>"About"</span>, href: <span style={styles.codeString}>"/about"</span> {"}"},{"\n"}
            {"  "}],{"\n"}
            {"  "}primaryAction: {"{"} label: <span style={styles.codeString}>"Contact"</span>, href: <span style={styles.codeString}>"mailto:hi@example.com"</span> {"}"},{"\n"}
            {"  "}linkedin: <span style={styles.codeString}>"https://linkedin.com/in/you"</span>,{"\n"}
            {"  "}github: <span style={styles.codeString}>"https://github.com/you"</span>,{"\n"}
            {"  "}tagline: <span style={styles.codeString}>"Your tagline here."</span>,{"\n"}
            {"}"};{"\n\n"}
            <span style={styles.codeKeyword}>export function</span> Layout{"("}{"{"} children {"}"}{")"} {"{"}{"\n"}
            {"  "}return {"("}{"\n"}
            {"    "}{"<>"}{"\n"}
            {"      "}{"<Header details={details} />"}{"\n"}
            {"      "}{"{"}children{"}"}{"\n"}
            {"      "}{"<Footer details={details} />"}{"\n"}
            {"    "}{"</>"}{"\n"}
            {"  "}{")"};{"\n"}
            {"}"}
          </code>
        </pre>
      </section>

      <p style={styles.footer}>
        Explore <strong>Header</strong>, <strong>Footer</strong>, and <strong>Shell</strong> in the sidebar.
      </p>
    </div>
  ),
};
