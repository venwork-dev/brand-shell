import { detailsToSocialLinks, type SocialLink } from "./social";
import type { BrandAction, BrandDetails, BrandNavLink } from "./types";

export type LinkTarget = NonNullable<BrandNavLink["target"]>;

export interface ShellNavLink extends BrandNavLink {
  ariaLabel: string;
  rel?: string;
  target: LinkTarget;
}

export interface ShellActionLink extends BrandAction {
  ariaLabel: string;
  rel?: string;
  target: LinkTarget;
  variant: NonNullable<BrandAction["variant"]>;
}

export interface ShellViewModel {
  navLinks: ShellNavLink[];
  ctaLinks: ShellActionLink[];
  socialLinks: SocialLink[];
}

export function normalizeNavLinks(navLinks: BrandNavLink[] = []): ShellNavLink[] {
  return navLinks.map((link) => {
    const { target, rel } = normalizeLinkTargetRel(link.target, link.rel);
    return {
      ...link,
      ariaLabel: link.ariaLabel ?? link.label,
      target,
      rel,
    };
  });
}

export function normalizeCtaLinks(
  primaryAction?: BrandAction,
  secondaryAction?: BrandAction,
): ShellActionLink[] {
  const actions = [secondaryAction, primaryAction].filter((action): action is BrandAction => Boolean(action));

  return actions.map((action, index) => {
    const { target, rel } = normalizeLinkTargetRel(action.target, action.rel);
    const variant = action.variant ?? (action === primaryAction || index === actions.length - 1 ? "primary" : "secondary");

    return {
      ...action,
      ariaLabel: action.ariaLabel ?? action.label,
      target,
      rel,
      variant,
    };
  });
}

export function buildShellViewModel(details: BrandDetails): ShellViewModel {
  return {
    navLinks: normalizeNavLinks(details.navLinks),
    ctaLinks: normalizeCtaLinks(details.primaryAction, details.secondaryAction),
    socialLinks: detailsToSocialLinks(details),
  };
}

function normalizeLinkTargetRel(target?: BrandNavLink["target"], rel?: string) {
  const normalizedTarget: LinkTarget = target ?? "_self";
  const normalizedRel = rel ?? (normalizedTarget === "_blank" ? "noopener noreferrer" : undefined);
  return {
    target: normalizedTarget,
    rel: normalizedRel,
  };
}
