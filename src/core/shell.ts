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

export type NormalizedActionLink = Omit<ShellActionLink, "variant"> & Pick<BrandAction, "variant">;

export interface NormalizedBrandDetails extends Omit<BrandDetails, "navLinks" | "primaryAction" | "secondaryAction"> {
  navLinks: ShellNavLink[];
  primaryAction?: NormalizedActionLink;
  secondaryAction?: NormalizedActionLink;
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

export function normalizeBrandDetails(details: BrandDetails): NormalizedBrandDetails {
  const normalizedPrimaryAction = normalizeAction(details.primaryAction);
  const normalizedSecondaryAction = normalizeAction(details.secondaryAction);

  return {
    ...details,
    gmail: normalizeGmailHref(details.gmail),
    navLinks: normalizeNavLinks(details.navLinks),
    primaryAction: normalizedPrimaryAction,
    secondaryAction: normalizedSecondaryAction,
  };
}

export function normalizeCtaLinks(
  primaryAction?: BrandAction,
  secondaryAction?: BrandAction,
): ShellActionLink[] {
  const normalizedPrimaryAction = normalizeAction(primaryAction);
  const normalizedSecondaryAction = normalizeAction(secondaryAction);
  const actions = [normalizedSecondaryAction, normalizedPrimaryAction].filter(
    (action): action is NonNullable<typeof action> => Boolean(action),
  );

  return actions.map((action, index) => {
    const variant =
      action.variant ?? (action === normalizedPrimaryAction || index === actions.length - 1 ? "primary" : "secondary");

    return {
      ...action,
      variant,
    };
  });
}

export function buildShellViewModel(details: BrandDetails): ShellViewModel {
  const normalizedDetails = normalizeBrandDetails(details);

  return {
    navLinks: normalizedDetails.navLinks,
    ctaLinks: normalizeCtaLinks(normalizedDetails.primaryAction, normalizedDetails.secondaryAction),
    socialLinks: detailsToSocialLinks(normalizedDetails),
  };
}

export function normalizeGmailHref(gmail?: string): string | undefined {
  if (typeof gmail !== "string") return undefined;
  const trimmed = gmail.trim();
  if (trimmed.length === 0) return undefined;
  return trimmed.startsWith("mailto:") ? trimmed : `mailto:${trimmed}`;
}

function normalizeAction(action?: BrandAction): NormalizedActionLink | undefined {
  if (!action) return undefined;

  const { target, rel } = normalizeLinkTargetRel(action.target, action.rel);
  return {
    ...action,
    target,
    rel,
    ariaLabel: action.ariaLabel ?? action.label,
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
