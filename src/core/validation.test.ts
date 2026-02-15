import { describe, expect, it } from "vitest";

import {
  BrandShellValidationError,
  assertValidBrandDetails,
  assertValidBrandTheme,
  normalizeBrandTheme,
  validateBrandDetails,
  validateBrandTheme,
} from "./validation";

describe("validateBrandDetails", () => {
  it("returns normalized details when valid", () => {
    const result = validateBrandDetails({
      name: "Brand Shell",
      gmail: "hello@example.com",
      navLinks: [{ label: "Docs", href: "/docs" }],
      primaryAction: { label: "Contact", href: "mailto:hello@example.com", target: "_blank" },
    });

    expect(result.valid).toBe(true);
    expect(result.normalized?.gmail).toBe("mailto:hello@example.com");
    expect(result.normalized?.navLinks[0]).toMatchObject({
      label: "Docs",
      href: "/docs",
      ariaLabel: "Docs",
      target: "_self",
    });
    expect(result.normalized?.primaryAction).toMatchObject({
      target: "_blank",
      rel: "noopener noreferrer",
      ariaLabel: "Contact",
    });
  });

  it("returns clear errors for invalid payloads", () => {
    const result = validateBrandDetails({
      name: "",
      navLinks: [{ label: "Docs" }],
      primaryAction: { label: "Contact", href: "/contact", target: "_new" },
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("details.name must be a non-empty string.");
    expect(result.errors).toContain("details.navLinks[0].href must be a non-empty string.");
    expect(result.errors).toContain("details.primaryAction.target must be one of: _blank, _self, _parent, _top.");
  });
});

describe("validateBrandTheme", () => {
  it("normalizes theme string values", () => {
    const result = validateBrandTheme({
      primaryColor: "  #0ea5e9  ",
      textColor: "#f8fafc",
    });

    expect(result.valid).toBe(true);
    expect(result.normalized).toEqual({
      primaryColor: "#0ea5e9",
      textColor: "#f8fafc",
    });
  });

  it("returns clear errors for unsupported keys and invalid values", () => {
    const result = validateBrandTheme({
      primaryColor: "",
      accent: "#fff",
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("theme.primaryColor must be a non-empty string when provided.");
    expect(result.errors).toContain("theme.accent is not a supported theme key.");
  });
});

describe("assertValidBrandDetails/assertValidBrandTheme", () => {
  it("throws a typed validation error with formatted messages", () => {
    expect(() => assertValidBrandDetails({ name: "" }, "React Header")).toThrow(BrandShellValidationError);
    expect(() => assertValidBrandTheme({ primaryColor: "" }, "React Header")).toThrow(
      "React Header validation failed:",
    );
  });
});

describe("normalizeBrandTheme", () => {
  it("returns null when no usable values exist", () => {
    expect(normalizeBrandTheme({ primaryColor: "   " })).toBeNull();
  });
});
