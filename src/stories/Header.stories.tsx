import type { Meta, StoryObj } from "@storybook/react";
import type { CSSProperties } from "react";

import { Header, type HeaderProps } from "../Header";
import type { BrandDetails } from "../types";

const sampleDetails: BrandDetails = {
  name: "Brand Shell",
  homeHref: "https://brand-shell.dev",
  website: "https://brand-shell.dev",
  linkedin: "https://linkedin.com/in/example",
  email: "hello@brand-shell.dev",
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
  stickyHeader?: boolean;
};

const headerCanvasStyle: CSSProperties = {
  minHeight: "100vh",
  background:
    "radial-gradient(circle at 14% 10%, rgba(45, 212, 191, 0.16), transparent 28%), linear-gradient(180deg, #020617 0%, #0f172a 100%)",
};

const stickyScrollStyle: CSSProperties = {
  minHeight: "140vh",
  padding: "clamp(1rem, 2.8vw, 1.4rem)",
  color: "#cbd5e1",
  fontFamily: '"Inter", "Avenir Next", "Segoe UI", sans-serif',
  lineHeight: 1.65,
};

const stickyBlocks = [
  "Scroll this story to validate sticky header behavior in the same mobile/desktop story context.",
  "Sticky behavior is a layout concern: product apps can apply it via className or parent CSS.",
  "Use this toggle to verify that sticky + CTA modes + social row still align correctly.",
];

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
    stickyHeader: false,
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
    stickyHeader: {
      control: { type: "boolean" },
      description: "Applies sticky positioning in the story wrapper for scroll behavior preview.",
    },
  },
  render: ({ socialIconSize, ctaLayout, stickyHeader, theme, ...rest }) => {
    const mergedTheme = {
      ...(theme ?? {}),
      socialIconSize,
      ctaLayout,
    };
    const headerClassName = [rest.className, stickyHeader ? "storybook-sticky-header" : null].filter(Boolean).join(" ");
    return (
      <div style={headerCanvasStyle}>
        {stickyHeader ? (
          <style>{`.storybook-sticky-header{position:sticky;top:0;left:0;right:0;z-index:40;}`}</style>
        ) : null}
        <Header {...rest} className={headerClassName || undefined} theme={mergedTheme} />
        {stickyHeader ? (
          <main style={stickyScrollStyle}>
            {stickyBlocks.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </main>
        ) : null}
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
    stickyHeader: true,
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
    stickyHeader: true,
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
      ...sampleDetails,
      logoSrc: svgLogoSrc,
      logoAlt: "Brand Shell",
    },
  },
};

export const WithLogoAndCustomHeight: Story = {
  args: {
    details: {
      ...sampleDetails,
      logoSrc: svgLogoSrc,
      logoAlt: "Brand Shell",
    },
    theme: {
      logoHeight: "1.75rem",
    },
  },
};

export const SkipNavFocused: Story = {
  parameters: {
    docs: {
      description: {
        story: "Tab once after load to reveal the skip navigation link. Pressing Enter jumps focus to `#main-content`.",
      },
    },
  },
};

export const MobileHamburger: Story = {
  globals: {
    viewport: { value: "mobile2", isRotated: false },
  },
  parameters: {
    viewport: { defaultViewport: "mobile2" },
    docs: {
      description: {
        story: "At ≤640px the hamburger toggle appears. Click it to open/close the nav drawer. Press Escape or click outside to close.",
      },
    },
  },
  args: {
    stickyHeader: true,
  },
};
