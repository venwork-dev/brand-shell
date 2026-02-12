import type { Meta, StoryObj } from "@storybook/react";

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

type HeaderStoryProps = HeaderProps & { socialIconSize?: string };

const meta = {
  title: "Brand Shell/Header",
  component: Header,
  tags: ["autodocs"],
  args: {
    details: sampleDetails,
    theme: null,
    socialIconSize: "2.5rem",
  },
  argTypes: {
    socialIconSize: {
      control: { type: "text" },
      description: "CSS size for circular social buttons (e.g. 2.25rem).",
    },
  },
  render: ({ socialIconSize, theme, ...rest }) => (
    <Header
      {...rest}
      theme={{
        ...(theme ?? {}),
        socialIconSize,
      }}
    />
  ),
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
      linkColor: "#0891b2",
      fontFamily: '"Playfair Display", serif',
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
