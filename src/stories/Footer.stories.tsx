import type { Meta, StoryObj } from "@storybook/react";

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
};

type FooterStoryProps = FooterProps & { socialIconSize?: string };

const meta = {
  title: "Brand Shell/Footer",
  component: Footer,
  tags: ["autodocs"],
  args: {
    details: sharedDetails,
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
    <Footer
      {...rest}
      theme={{
        ...(theme ?? {}),
        socialIconSize,
      }}
    />
  ),
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
