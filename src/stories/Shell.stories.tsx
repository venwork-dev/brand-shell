import type { Meta, StoryObj } from "@storybook/react";
import type { CSSProperties } from "react";

import { Header, Footer } from "../index";
import type { BrandDetails } from "../types";

const fullDetails: BrandDetails = {
  name: "Brand Shell",
  homeHref: "https://brand-shell.dev",
  website: "https://brand-shell.dev",
  linkedin: "https://linkedin.com/in/example",
  gmail: "hello@brand-shell.dev",
  github: "https://github.com/example",
  twitter: "https://twitter.com/example",
  discord: "https://discord.gg/brandshell",
  tagline: "Reusable header & footer components for every project.",
  navLinks: [
    { label: "Blog", href: "https://brand-shell.dev/blog" },
    { label: "Docs", href: "https://brand-shell.dev/docs" },
    { label: "About", href: "https://brand-shell.dev/about" },
  ],
  primaryAction: {
    label: "Hire Me",
    href: "mailto:hello@brand-shell.dev",
  },
  secondaryAction: {
    label: "View Resume",
    href: "https://brand-shell.dev/resume.pdf",
    target: "_blank",
  },
};

const shellRootStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
};

const shellMainStyle: CSSProperties = {
  flex: 1,
  padding: "clamp(1.25rem, 2.8vw, 2.25rem)",
  maxWidth: "72rem",
  margin: "0 auto",
  width: "100%",
  fontFamily: '"Inter", "Avenir Next", "Segoe UI", sans-serif',
  lineHeight: 1.7,
};

const shellHeadingStyle: CSSProperties = {
  margin: "0 0 0.9rem 0",
  fontSize: "clamp(1.55rem, 3.1vw, 2.05rem)",
  letterSpacing: "-0.025em",
  lineHeight: 1.15,
  fontFamily: '"Space Grotesk", "Avenir Next", "Segoe UI", sans-serif',
};

const shellParagraphStyle: CSSProperties = {
  margin: 0,
  maxWidth: "65ch",
  color: "#334155",
  fontSize: "clamp(1rem, 1.45vw, 1.06rem)",
};

const meta = {
  title: "Brand Shell/Shell",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const FullLayout: Story = {
  render: () => (
    <div style={shellRootStyle}>
      <Header details={fullDetails} />
      <main style={shellMainStyle}>
        <h1 style={shellHeadingStyle}>Page content</h1>
        <p style={shellParagraphStyle}>
          This story shows Header + main + Footer together—the typical layout for
          a site using brand-shell.
        </p>
      </main>
      <Footer details={fullDetails} />
    </div>
  ),
};

export const LightTheme: Story = {
  render: () => (
    <div style={shellRootStyle}>
      <Header
        details={fullDetails}
        theme={{
          primaryColor: "#0ea5e9",
          backgroundColor: "#f8fafc",
          textColor: "#0f172a",
          linkColor: "#334155",
          fontFamily: '"Inter", system-ui, sans-serif',
          socialIconSize: "2rem",
        }}
      />
      <main
        style={{
          ...shellMainStyle,
          background: "#f1f5f9",
          color: "#0f172a",
        }}
      >
        <h1 style={shellHeadingStyle}>Light theme example</h1>
        <p style={{ ...shellParagraphStyle, color: "#334155" }}>
          Pass a custom theme to adapt the shell to light backgrounds.
        </p>
      </main>
      <Footer
        details={fullDetails}
        theme={{
          primaryColor: "#0ea5e9",
          backgroundColor: "#f8fafc",
          textColor: "#0f172a",
          linkColor: "#334155",
          socialIconSize: "2rem",
        }}
      />
    </div>
  ),
};

export const MobileLayout: Story = {
  parameters: {
    viewport: {
      defaultViewport: "iphonexr",
    },
  },
  render: () => (
    <div style={shellRootStyle}>
      <Header details={fullDetails} theme={{ socialIconSize: "2.2rem", ctaLayout: "inline" }} />
      <main style={{ ...shellMainStyle, padding: "1rem 0.9rem" }}>
        <h1 style={shellHeadingStyle}>Mobile shell flow</h1>
        <p style={shellParagraphStyle}>Header and footer stay compact without losing navigation, actions, or social links.</p>
      </main>
      <Footer details={fullDetails} theme={{ socialIconSize: "2.2rem", ctaLayout: "inline" }} />
    </div>
  ),
};
