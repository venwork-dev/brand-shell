import type { Meta, StoryObj } from "@storybook/react";

import { Footer } from "../Footer";
import type { BrandDetails } from "../types";

const sharedDetails: BrandDetails = {
  name: "Brand Shell",
  website: "https://brand-shell.dev",
  linkedin: "https://linkedin.com/in/example",
  gmail: "hello@brand-shell.dev",
  github: "https://github.com/example",
  twitter: "https://twitter.com/example",
  tagline: "Reusable header & footer components for every project.",
};

const meta = {
  title: "Brand Shell/Footer",
  component: Footer,
  tags: ["autodocs"],
  args: {
    details: sharedDetails,
    theme: null,
  },
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

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
