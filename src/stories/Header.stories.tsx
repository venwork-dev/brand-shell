import type { Meta, StoryObj } from "@storybook/react";
import type { CSSProperties } from "react";

import { Header, type HeaderProps } from "../Header";
import type { BrandDetails } from "../types";

const sampleDetails: BrandDetails = {
  name: "Brand Shell",
  homeHref: "https://brand-shell.dev",
  website: "https://brand-shell.dev",
  linkedin: "https://linkedin.com/in/example",
  gmail: "hello@brand-shell.dev",
  github: "https://github.com/example",
  twitter: "https://twitter.com/example",
  discord: "https://discord.gg/brandshell",
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
    rel: "noopener noreferrer",
  },
};

type HeaderStoryProps = HeaderProps & {
  socialIconSize?: string;
  ctaLayout?: "inline" | "stacked";
};

const headerCanvasStyle: CSSProperties = {
  minHeight: "100vh",
  background:
    "radial-gradient(circle at 14% 10%, rgba(45, 212, 191, 0.16), transparent 28%), linear-gradient(180deg, #020617 0%, #0f172a 100%)",
};

const meta = {
  title: "Brand Shell/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    details: sampleDetails,
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
      <div style={headerCanvasStyle}>
        <Header {...rest} theme={mergedTheme} />
      </div>
    );
  },
} satisfies Meta<HeaderStoryProps>;

export default meta;

type Story = StoryObj<HeaderStoryProps>;

export const Default: Story = {};

export const CustomTheme: Story = {
  args: {
    theme: {
      primaryColor: "#0ea5e9",
      backgroundColor: "#f8fafc",
      textColor: "#0f172a",
      linkColor: "#0f766e",
      fontFamily: '"Space Grotesk", "Avenir Next", "Segoe UI", sans-serif',
    },
    socialIconSize: "2rem",
  },
};

export const MinimalDetails: Story = {
  args: {
    details: {
      name: "Minimal Brand",
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
