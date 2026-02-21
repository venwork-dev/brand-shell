import type { BrandDetails } from "./types";

export type SocialPlatform = "website" | "linkedin" | "email" | "github" | "twitter" | "discord";

export interface SocialLink {
  platform: SocialPlatform | string;
  href: string;
  label: string;
  iconSvg?: string;
}

export function detailsToSocialLinks(details: BrandDetails): SocialLink[] {
  const links: SocialLink[] = [];
  if (details.website) links.push({ platform: "website", href: details.website, label: "Website" });
  if (details.linkedin) links.push({ platform: "linkedin", href: details.linkedin, label: "LinkedIn" });
  if (details.email) links.push({ platform: "email", href: details.email, label: "Email" });
  if (details.github) links.push({ platform: "github", href: details.github, label: "GitHub" });
  if (details.twitter) links.push({ platform: "twitter", href: details.twitter, label: "Twitter" });
  if (details.discord) links.push({ platform: "discord", href: details.discord, label: "Discord" });
  if (details.customSocialLinks) {
    for (const custom of details.customSocialLinks) {
      links.push({ platform: custom.platform, href: custom.href, label: custom.label, iconSvg: custom.iconSvg });
    }
  }
  return links;
}
