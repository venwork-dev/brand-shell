import type { BrandDetails } from "./types";

export type SocialPlatform = "website" | "linkedin" | "email" | "github" | "twitter" | "discord";

export interface SocialLink {
  platform: SocialPlatform;
  href: string;
  label: string;
}

export function detailsToSocialLinks(details: BrandDetails): SocialLink[] {
  const links: SocialLink[] = [];
  if (details.website) links.push({ platform: "website", href: details.website, label: "Website" });
  if (details.linkedin) links.push({ platform: "linkedin", href: details.linkedin, label: "LinkedIn" });
  if (details.gmail) {
    const mailHref = details.gmail.startsWith("mailto:") ? details.gmail : `mailto:${details.gmail}`;
    links.push({ platform: "email", href: mailHref, label: "Email" });
  }
  if (details.github) links.push({ platform: "github", href: details.github, label: "GitHub" });
  if (details.twitter) links.push({ platform: "twitter", href: details.twitter, label: "Twitter" });
  if (details.discord) links.push({ platform: "discord", href: details.discord, label: "Discord" });
  return links;
}
