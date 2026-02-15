import { describe, expect, it } from "vitest";

import {
  buildShellViewModel,
  normalizeBrandDetails,
  normalizeCtaLinks,
  normalizeGmailHref,
  normalizeNavLinks,
} from "./shell";

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

  it("drops unsafe links", () => {
    const links = normalizeNavLinks([
      { label: "Unsafe", href: "javascript:alert(1)" },
      { label: "Docs", href: "/docs" },
    ]);

    expect(links).toEqual([
      {
        label: "Docs",
        href: "/docs",
        ariaLabel: "Docs",
        target: "_self",
        rel: undefined,
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

  it("enforces noopener/noreferrer for _blank links even when custom rel is provided", () => {
    const ctas = normalizeCtaLinks({
      label: "Launch",
      href: "https://example.com",
      target: "_blank",
      rel: "author noreferrer",
    });

    expect(ctas[0]).toMatchObject({
      target: "_blank",
      rel: "author noreferrer noopener",
    });
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

describe("normalizeBrandDetails", () => {
  it("applies default arrays + target/rel normalization + mailto normalization", () => {
    const details = normalizeBrandDetails({
      name: "Brand Shell",
      gmail: "hello@example.com",
      primaryAction: { label: "Contact", href: "mailto:hello@example.com", target: "_blank" },
    });

    expect(details.navLinks).toEqual([]);
    expect(details.gmail).toBe("mailto:hello@example.com");
    expect(details.primaryAction).toEqual({
      label: "Contact",
      href: "mailto:hello@example.com",
      ariaLabel: "Contact",
      target: "_blank",
      rel: "noopener noreferrer",
    });
  });

  it("strips unsafe href fields from details", () => {
    const details = normalizeBrandDetails({
      name: "Brand Shell",
      homeHref: "javascript:alert(1)",
      website: "vbscript:msgbox(1)",
      navLinks: [
        { label: "Unsafe", href: "javascript:alert(1)" },
        { label: "Docs", href: "/docs" },
      ],
      primaryAction: { label: "Unsafe CTA", href: "data:text/plain,hello" },
    });

    expect(details.homeHref).toBeUndefined();
    expect(details.website).toBeUndefined();
    expect(details.navLinks).toHaveLength(1);
    expect(details.navLinks[0]?.href).toBe("/docs");
    expect(details.primaryAction).toBeUndefined();
  });
});

describe("normalizeGmailHref", () => {
  it("normalizes plain email and preserves mailto values", () => {
    expect(normalizeGmailHref("hello@example.com")).toBe("mailto:hello@example.com");
    expect(normalizeGmailHref("mailto:hello@example.com")).toBe("mailto:hello@example.com");
  });
});
