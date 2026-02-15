import { describe, expect, it } from "vitest";

import { detailsToSocialLinks } from "./social";

describe("detailsToSocialLinks", () => {
  it("normalizes plain gmail addresses to mailto links", () => {
    const links = detailsToSocialLinks({
      name: "Brand",
      gmail: "hello@example.com",
    });

    expect(links).toEqual([{ platform: "email", href: "mailto:hello@example.com", label: "Email" }]);
  });

  it("preserves platform ordering and respects optional links", () => {
    const links = detailsToSocialLinks({
      name: "Brand",
      website: "https://brand.dev",
      linkedin: "https://linkedin.com/in/brand",
      gmail: "mailto:hello@example.com",
      github: "https://github.com/brand",
      twitter: "https://x.com/brand",
      discord: "https://discord.gg/brand",
    });

    expect(links.map((link) => link.platform)).toEqual([
      "website",
      "linkedin",
      "email",
      "github",
      "twitter",
      "discord",
    ]);
  });
});
