import type { CSSProperties } from "react";
import type { BrandTheme } from "./types";

const THEME_VAR_PREFIX = "brand";

export function themeToStyle(theme?: BrandTheme | null): CSSProperties {
  if (!theme) return {};
  const style: Record<string, string> = {};
  if (theme.primaryColor != null) style[`--${THEME_VAR_PREFIX}-primary`] = theme.primaryColor;
  if (theme.backgroundColor != null) style[`--${THEME_VAR_PREFIX}-bg`] = theme.backgroundColor;
  if (theme.textColor != null) style[`--${THEME_VAR_PREFIX}-text`] = theme.textColor;
  if (theme.fontFamily != null) style[`--${THEME_VAR_PREFIX}-font`] = theme.fontFamily;
  if (theme.linkColor != null) style[`--${THEME_VAR_PREFIX}-link`] = theme.linkColor;
  return style as CSSProperties;
}

export interface NavLink {
  href: string;
  label: string;
}

export function detailsToNavLinks(details: { linkedin?: string; gmail?: string; github?: string; twitter?: string; website?: string }): NavLink[] {
  const links: NavLink[] = [];
  if (details.website) links.push({ href: details.website, label: "Website" });
  if (details.linkedin) links.push({ href: details.linkedin, label: "LinkedIn" });
  if (details.gmail) links.push({ href: details.gmail.startsWith("mailto:") ? details.gmail : `mailto:${details.gmail}`, label: "Email" });
  if (details.github) links.push({ href: details.github, label: "GitHub" });
  if (details.twitter) links.push({ href: details.twitter, label: "Twitter" });
  return links;
}
