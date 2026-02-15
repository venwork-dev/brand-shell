import type { CSSProperties } from "react";
import type { BrandDetails, BrandTheme } from "./types";

const THEME_VAR_PREFIX = "brand";
const DARK_TEXT = "#0f172a";
const LIGHT_TEXT = "#f8fafc";

export function themeToStyle(theme?: BrandTheme | null): CSSProperties {
  if (!theme) return {};
  const style: Record<string, string> = {};
  if (theme.primaryColor != null) style[`--${THEME_VAR_PREFIX}-primary`] = theme.primaryColor;
  if (theme.backgroundColor != null) style[`--${THEME_VAR_PREFIX}-bg`] = theme.backgroundColor;
  if (theme.textColor != null) style[`--${THEME_VAR_PREFIX}-text`] = theme.textColor;
  if (theme.fontFamily != null) style[`--${THEME_VAR_PREFIX}-font`] = theme.fontFamily;
  if (theme.linkColor != null) style[`--${THEME_VAR_PREFIX}-link`] = theme.linkColor;
  if (theme.socialIconSize != null) style[`--${THEME_VAR_PREFIX}-social-size`] = theme.socialIconSize;
  if (theme.buttonTextColor != null) {
    style[`--${THEME_VAR_PREFIX}-button-text`] = theme.buttonTextColor;
  } else if (theme.primaryColor != null) {
    const buttonTextColor = getAccessibleTextColor(theme.primaryColor);
    if (buttonTextColor) style[`--${THEME_VAR_PREFIX}-button-text`] = buttonTextColor;
  }
  return style as CSSProperties;
}

function getAccessibleTextColor(backgroundColor: string): string | undefined {
  const rgb = parseHexColor(backgroundColor);
  if (!rgb) return undefined;

  const contrastWithDark = contrastRatio(rgb, { r: 15, g: 23, b: 42 });
  const contrastWithLight = contrastRatio(rgb, { r: 248, g: 250, b: 252 });

  return contrastWithDark > contrastWithLight ? DARK_TEXT : LIGHT_TEXT;
}

function parseHexColor(color: string): { r: number; g: number; b: number } | undefined {
  const trimmed = color.trim();
  const match = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(trimmed);
  if (!match) return undefined;

  const value = match[1];
  if (value.length === 3) {
    return {
      r: Number.parseInt(value[0] + value[0], 16),
      g: Number.parseInt(value[1] + value[1], 16),
      b: Number.parseInt(value[2] + value[2], 16),
    };
  }

  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
  };
}

function contrastRatio(
  first: { r: number; g: number; b: number },
  second: { r: number; g: number; b: number },
): number {
  const firstLuminance = relativeLuminance(first);
  const secondLuminance = relativeLuminance(second);
  const lighter = Math.max(firstLuminance, secondLuminance);
  const darker = Math.min(firstLuminance, secondLuminance);
  return (lighter + 0.05) / (darker + 0.05);
}

function relativeLuminance(color: { r: number; g: number; b: number }): number {
  const transform = (channel: number) => {
    const normalized = channel / 255;
    if (normalized <= 0.03928) return normalized / 12.92;
    return ((normalized + 0.055) / 1.055) ** 2.4;
  };

  const r = transform(color.r);
  const g = transform(color.g);
  const b = transform(color.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

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
