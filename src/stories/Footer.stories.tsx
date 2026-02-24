import type { Meta, StoryObj } from "@storybook/react";
import type { CSSProperties } from "react";

import { Footer, type FooterProps } from "../Footer";
import type { BrandDetails } from "../types";

const sharedDetails: BrandDetails = {
  name: "Brand Shell",
  website: "https://brand-shell.dev",
  linkedin: "https://linkedin.com/in/example",
  email: "hello@brand-shell.dev",
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
    label: "Contact",
    href: "mailto:hello@brand-shell.dev",
  },
  secondaryAction: {
    label: "Subscribe",
    href: "https://brand-shell.dev/newsletter",
  },
};

type FooterStoryProps = FooterProps & {
  socialIconSize?: string;
  ctaLayout?: "inline" | "stacked";
};

const footerShellStyle: CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  background:
    "radial-gradient(circle at 80% 0%, rgba(59, 130, 246, 0.14), transparent 26%), linear-gradient(180deg, #0b1323 0%, #111827 100%)",
};

const footerContentStyle: CSSProperties = {
  flex: 1,
  padding: "clamp(1rem, 3vw, 1.8rem)",
  color: "#bfdbfe",
  fontFamily: '"Space Grotesk", "Inter", system-ui, sans-serif',
};

const meta = {
  title: "Brand Shell/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    details: sharedDetails,
    theme: null,
    socialIconSize: "2.5rem",
    ctaLayout: "inline",
  },
  argTypes: {
    socialIconSize: {
      control: { type: "text" },
      description: "CSS size for circular social buttons (e.g. 2.25rem).",
    },
    ctaLayout: {
      options: ["inline", "stacked"],
      control: { type: "radio" },
      description: "Mobile CTA layout (inline = side-by-side, stacked = full-width rows).",
    },
  },
  render: ({ socialIconSize, ctaLayout, theme, ...rest }) => {
    const mergedTheme = {
      ...(theme ?? {}),
      socialIconSize,
      ctaLayout,
    };
    return (
      <div style={footerShellStyle}>
        <main style={footerContentStyle}>Footer sits after page content and remains readable on mobile layouts.</main>
        <Footer {...rest} theme={mergedTheme} />
      </div>
    );
  },
} satisfies Meta<FooterStoryProps>;

export default meta;

type Story = StoryObj<FooterStoryProps>;

export const Default: Story = {};

export const CustomTheme: Story = {
  args: {
    theme: {
      primaryColor: "#f97316",
      backgroundColor: "#0f172a",
      textColor: "#fde68a",
      linkColor: "#fb923c",
      fontFamily: '"Space Grotesk", system-ui, sans-serif',
    },
    socialIconSize: "2.25rem",
  },
};

export const Minimal: Story = {
  args: {
    details: {
      name: "Minimal Brand",
      tagline: undefined,
    },
  },
};

export const MobilePreview: Story = {
  args: {
    socialIconSize: "2.2rem",
    ctaLayout: "inline",
  },
  globals: {
    viewport: { value: "mobile2", isRotated: false },
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile2",
    },
  },
};

export const MobileStackedCtas: Story = {
  args: {
    socialIconSize: "2.2rem",
    ctaLayout: "stacked",
  },
  globals: {
    viewport: { value: "mobile2", isRotated: false },
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile2",
    },
  },
};

// Inline SVG logo — no network dependency, works in Chromatic
const svgLogoSrc =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 32'%3E%3Crect width='120' height='32' rx='6' fill='%230ea5e9'/%3E%3Ctext x='10' y='22' font-family='system-ui%2C sans-serif' font-size='14' font-weight='700' fill='%23fff'%3EBrandShell%3C/text%3E%3C/svg%3E";

export const WithLogo: Story = {
  args: {
    details: {
      ...sharedDetails,
      logoSrc: svgLogoSrc,
      logoAlt: "Brand Shell",
    },
  },
};

export const WithLogoAndCustomHeight: Story = {
  args: {
    details: {
      ...sharedDetails,
      logoSrc: svgLogoSrc,
      logoAlt: "Brand Shell",
    },
    theme: {
      logoHeight: "1.75rem",
    },
  },
};
