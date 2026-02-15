import { describe, expect, it } from "vitest";

import { themeToCssVariables } from "./theme";

describe("themeToCssVariables", () => {
  it("returns empty object when no theme is provided", () => {
    expect(themeToCssVariables()).toEqual({});
  });

  it("maps explicit theme values to CSS variables", () => {
    expect(
      themeToCssVariables({
        primaryColor: "#2563eb",
        backgroundColor: "#0f172a",
        textColor: "#f8fafc",
        fontFamily: "Inter, sans-serif",
        linkColor: "#94a3b8",
        socialIconSize: "2rem",
        buttonTextColor: "#ffffff",
      }),
    ).toEqual({
      "--brand-primary": "#2563eb",
      "--brand-bg": "#0f172a",
      "--brand-text": "#f8fafc",
      "--brand-font": "Inter, sans-serif",
      "--brand-link": "#94a3b8",
      "--brand-social-size": "2rem",
      "--brand-button-text": "#ffffff",
    });
  });

  it("picks accessible dark text for bright primary colors", () => {
    expect(themeToCssVariables({ primaryColor: "#0ea5e9" })["--brand-button-text"]).toBe("#0f172a");
  });

  it("picks accessible light text for darker primary colors", () => {
    expect(themeToCssVariables({ primaryColor: "#2563eb" })["--brand-button-text"]).toBe("#f8fafc");
  });
});
