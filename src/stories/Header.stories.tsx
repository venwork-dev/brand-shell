import type { Meta, StoryObj } from "@storybook/react";

import { Header } from "../Header";
import type { BrandDetails } from "../types";

const sampleDetails: BrandDetails = {
  name: "Brand Shell",
  homeHref: "https://brand-shell.dev",
  website: "https://brand-shell.dev",
  linkedin: "https://linkedin.com/in/example",
  gmail: "hello@brand-shell.dev",
  github: "https://github.com/example",
  twitter: "https://twitter.com/example",
};

const meta = {
  title: "Brand Shell/Header",
  component: Header,
  tags: ["autodocs"],
  args: {
    details: sampleDetails,
    theme: null,
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

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
  },
};

export const MinimalDetails: Story = {
  args: {
    details: {
      name: "Minimal Brand",
    },
  },
};
