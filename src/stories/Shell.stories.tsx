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
  boxSizing: "border-box",
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

const stickyViewportStyle: CSSProperties = {
  height: "100vh",
  overflowY: "auto",
  overflowX: "hidden",
  background:
    "radial-gradient(circle at 10% 10%, rgba(14, 165, 233, 0.12), transparent 30%), linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)",
};

const stickyContentStyle: CSSProperties = {
  maxWidth: "72rem",
  margin: "0 auto",
  width: "100%",
  padding: "clamp(1rem, 2.8vw, 2rem)",
  boxSizing: "border-box",
  fontFamily: '"Inter", "Avenir Next", "Segoe UI", sans-serif',
  color: "#0f172a",
  lineHeight: 1.7,
};

const stickySectionStyle: CSSProperties = {
  border: "1px solid #cbd5e1",
  borderRadius: "0.9rem",
  background: "rgba(255, 255, 255, 0.82)",
  padding: "clamp(0.9rem, 2.3vw, 1.2rem)",
  marginBottom: "0.85rem",
};

const stickyParagraphStyle: CSSProperties = {
  margin: "0.55rem 0 0",
  color: "#334155",
  fontSize: "clamp(0.95rem, 1.3vw, 1rem)",
  maxWidth: "75ch",
};

const LOREM_SECTIONS = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
  "Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices.",
  "Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam.",
  "In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor.",
  "Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet.",
  "Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit.",
  "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante.",
  "Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi.",
];

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

export const StickyHeaderScroll: Story = {
  render: () => (
    <div style={stickyViewportStyle}>
      <style>{`.storybook-sticky-header{position:sticky;top:0;left:0;right:0;width:100%;z-index:40;}`}</style>
      <Header className="storybook-sticky-header" details={fullDetails} />
      <main style={stickyContentStyle}>
        <h1 style={shellHeadingStyle}>Sticky header behavior</h1>
        <p style={shellParagraphStyle}>
          Scroll this page to verify the header remains pinned while content moves underneath.
        </p>
        {LOREM_SECTIONS.map((paragraph, index) => (
          <section key={paragraph} style={stickySectionStyle}>
            <h2 style={{ margin: 0, fontSize: "1.1rem", fontFamily: '"Space Grotesk", system-ui, sans-serif' }}>
              Content Block {index + 1}
            </h2>
            <p style={stickyParagraphStyle}>{paragraph}</p>
          </section>
        ))}
      </main>
      <Footer details={fullDetails} />
    </div>
  ),
};
