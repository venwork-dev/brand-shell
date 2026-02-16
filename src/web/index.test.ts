import { beforeEach, describe, expect, it } from "vitest";

import { applyBrandShellProps, registerBrandShellElements, serializeBrandShellAttributes } from "./index";

describe("web adapter smoke", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("registers default custom elements idempotently", () => {
    const first = registerBrandShellElements();
    const second = registerBrandShellElements();

    expect(first).toEqual({ headerTagName: "brand-header", footerTagName: "brand-footer" });
    expect(second).toEqual({ headerTagName: "brand-header", footerTagName: "brand-footer" });
    expect(customElements.get("brand-header")).toBeDefined();
    expect(customElements.get("brand-footer")).toBeDefined();
  });

  it("renders header from JSON attributes with theme variables", () => {
    registerBrandShellElements();

    const details = {
      name: "Brand Shell",
      homeHref: "/",
      navLinks: [{ label: "Docs", href: "/docs" }],
      primaryAction: { label: "Contact", href: "mailto:hello@example.com" },
      gmail: "hello@example.com",
    };
    const theme = {
      primaryColor: "#0ea5e9",
      backgroundColor: "#0f172a",
      textColor: "#f8fafc",
      ctaLayout: "stacked",
    };

    const header = document.createElement("brand-header");
    header.setAttribute("details", JSON.stringify(details));
    header.setAttribute("theme", JSON.stringify(theme));
    document.body.append(header);

    const root = header.querySelector<HTMLElement>("header.brand-shell-header");
    expect(root).not.toBeNull();
    expect(root?.style.getPropertyValue("--brand-primary")).toBe("#0ea5e9");
    expect(root?.dataset.brandCtaLayout).toBe("stacked");
    expect(root?.querySelector(".brand-shell-header__name")?.textContent).toBe("Brand Shell");
    expect(root?.querySelector(".brand-shell-header__link")?.getAttribute("href")).toBe("/docs");
    expect(root?.querySelector('.brand-shell-header__social-link[aria-label="Email"]')?.getAttribute("href")).toBe(
      "mailto:hello@example.com",
    );
  });

  it("renders footer from property API and applies shell class", () => {
    registerBrandShellElements();

    const footer = document.createElement("brand-footer") as HTMLElement & {
      details?: unknown;
      theme?: unknown;
      shellClass?: unknown;
    };

    footer.details = {
      name: "Brand Shell",
      tagline: "Reusable shell",
      primaryAction: { label: "Hire", href: "mailto:hello@example.com" },
    };
    footer.theme = {
      backgroundColor: "#111827",
      textColor: "#f8fafc",
      ctaLayout: "inline",
    };
    footer.shellClass = "integration-test-shell";
    document.body.append(footer);

    const root = footer.querySelector<HTMLElement>("footer.brand-shell-footer.integration-test-shell");
    expect(root).not.toBeNull();
    expect(root?.style.getPropertyValue("--brand-bg")).toBe("#111827");
    expect(root?.dataset.brandCtaLayout).toBe("inline");
    expect(root?.querySelector(".brand-shell-footer__name")?.textContent).toBe("Brand Shell");
    expect(root?.querySelector(".brand-shell-footer__tagline")?.textContent).toBe("Reusable shell");
    expect(root?.querySelector(".brand-shell-button--primary")?.getAttribute("href")).toBe("mailto:hello@example.com");
  });

  it("applies typed props helper without manual JSON wiring", () => {
    registerBrandShellElements();

    const header = document.createElement("brand-header");
    applyBrandShellProps(header, {
      details: {
        name: "Typed Brand",
        navLinks: [{ label: "Docs", href: "/docs" }],
      },
      theme: {
        primaryColor: "#22c55e",
      },
      shellClass: "typed-integration",
    });
    document.body.append(header);

    const root = header.querySelector<HTMLElement>("header.brand-shell-header.typed-integration");
    expect(root).not.toBeNull();
    expect(root?.style.getPropertyValue("--brand-primary")).toBe("#22c55e");
    expect(root?.querySelector(".brand-shell-header__name")?.textContent).toBe("Typed Brand");
    expect(root?.querySelector(".brand-shell-header__link")?.getAttribute("href")).toBe("/docs");
  });

  it("serializes props to web component attributes", () => {
    const attrs = serializeBrandShellAttributes({
      details: { name: "Serialize Brand" },
      theme: { primaryColor: "#e11d48" },
      shellClass: "  shell-attrs  ",
    });

    expect(attrs.details).toContain("\"name\":\"Serialize Brand\"");
    expect(attrs.theme).toContain("\"primaryColor\":\"#e11d48\"");
    expect(attrs["shell-class"]).toBe("shell-attrs");
  });

  it("supports custom tag names", () => {
    const names = registerBrandShellElements({
      headerTagName: "brand-header-smoke",
      footerTagName: "brand-footer-smoke",
    });

    expect(customElements.get(names.headerTagName)).toBeDefined();
    expect(customElements.get(names.footerTagName)).toBeDefined();

    const header = document.createElement(names.headerTagName);
    header.setAttribute("details", JSON.stringify({ name: "Custom Brand" }));
    document.body.append(header);

    expect(header.querySelector("header.brand-shell-header")).not.toBeNull();
    expect(header.querySelector(".brand-shell-header__name")?.textContent).toBe("Custom Brand");
  });
});
