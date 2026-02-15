import { describe, expect, it } from "vitest";

import { buildShellViewModel, normalizeCtaLinks, normalizeNavLinks } from "./shell";

describe("normalizeNavLinks", () => {
  it("fills default target/aria label and infers rel for external links", () => {
    const links = normalizeNavLinks([
      { label: "Docs", href: "/docs" },
      { label: "GitHub", href: "https://github.com/org/repo", target: "_blank" },
    ]);

    expect(links).toEqual([
      {
        label: "Docs",
        href: "/docs",
        ariaLabel: "Docs",
        target: "_self",
        rel: undefined,
      },
      {
        label: "GitHub",
        href: "https://github.com/org/repo",
        ariaLabel: "GitHub",
        target: "_blank",
        rel: "noopener noreferrer",
      },
    ]);
  });
});

describe("normalizeCtaLinks", () => {
  it("keeps secondary->primary order and resolves default variants", () => {
    const ctas = normalizeCtaLinks(
      { label: "Hire Me", href: "mailto:hello@example.com" },
      { label: "Read Case Studies", href: "/work" },
    );

    expect(ctas.map((cta) => cta.label)).toEqual(["Read Case Studies", "Hire Me"]);
    expect(ctas.map((cta) => cta.variant)).toEqual(["secondary", "primary"]);
    expect(ctas.map((cta) => cta.target)).toEqual(["_self", "_self"]);
  });

  it("preserves explicit variants and rel values", () => {
    const ctas = normalizeCtaLinks(
      { label: "Launch", href: "https://example.com", target: "_blank", variant: "ghost" },
      { label: "Contact", href: "mailto:hello@example.com", rel: "author" },
    );

    expect(ctas).toEqual([
      {
        label: "Contact",
        href: "mailto:hello@example.com",
        ariaLabel: "Contact",
        target: "_self",
        rel: "author",
        variant: "secondary",
      },
      {
        label: "Launch",
        href: "https://example.com",
        ariaLabel: "Launch",
        target: "_blank",
        rel: "noopener noreferrer",
        variant: "ghost",
      },
    ]);
  });
});

describe("buildShellViewModel", () => {
  it("builds normalized nav/cta/social data from details", () => {
    const view = buildShellViewModel({
      name: "Brand Shell",
      navLinks: [{ label: "Docs", href: "/docs" }],
      primaryAction: { label: "Contact", href: "mailto:hello@example.com" },
      gmail: "hello@example.com",
    });

    expect(view.navLinks[0]?.ariaLabel).toBe("Docs");
    expect(view.ctaLinks[0]?.variant).toBe("primary");
    expect(view.socialLinks[0]).toEqual({
      platform: "email",
      href: "mailto:hello@example.com",
      label: "Email",
    });
  });
});
