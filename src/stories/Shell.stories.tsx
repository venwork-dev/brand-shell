import type { Meta, StoryObj } from "@storybook/react";

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
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header details={fullDetails} />
      <main
        style={{
          flex: 1,
          padding: "2rem",
          maxWidth: "72rem",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <h1 style={{ margin: "0 0 1rem 0", fontSize: "1.75rem" }}>
          Page content
        </h1>
        <p style={{ margin: 0, color: "var(--brand-link, #94a3b8)" }}>
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
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header
        details={fullDetails}
        theme={{
          primaryColor: "#0ea5e9",
          backgroundColor: "#f8fafc",
          textColor: "#0f172a",
          linkColor: "#64748b",
          fontFamily: '"Inter", system-ui, sans-serif',
          socialIconSize: "2rem",
        }}
      />
      <main
        style={{
          flex: 1,
          padding: "2rem",
          maxWidth: "72rem",
          margin: "0 auto",
          width: "100%",
          background: "#f1f5f9",
          color: "#0f172a",
        }}
      >
        <h1 style={{ margin: "0 0 1rem 0", fontSize: "1.75rem" }}>
          Light theme example
        </h1>
        <p style={{ margin: 0 }}>
          Pass a custom theme to adapt the shell to light backgrounds.
        </p>
      </main>
      <Footer
        details={fullDetails}
        theme={{
          primaryColor: "#0ea5e9",
          backgroundColor: "#f8fafc",
          textColor: "#0f172a",
          linkColor: "#64748b",
          socialIconSize: "2rem",
        }}
      />
    </div>
  ),
};
