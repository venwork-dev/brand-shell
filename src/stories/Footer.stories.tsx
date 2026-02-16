import type { Meta, StoryObj } from "@storybook/react";
import type { CSSProperties } from "react";

import { Footer, type FooterProps } from "../Footer";
import type { BrandDetails } from "../types";

const sharedDetails: BrandDetails = {
  name: "Brand Shell",
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
  parameters: {
    viewport: {
      defaultViewport: "iphonexr",
    },
  },
};

export const MobileStackedCtas: Story = {
  args: {
    socialIconSize: "2.2rem",
    ctaLayout: "stacked",
  },
  parameters: {
    viewport: {
      defaultViewport: "iphonexr",
    },
  },
};
