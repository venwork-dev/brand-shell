import { detailsToSocialLinks, type SocialLink } from "./social";
import type { BrandAction, BrandDetails, BrandNavLink, CustomSocialLink } from "./types";
import { normalizeRel, normalizeSafeHref } from "./links";

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
  return navLinks.flatMap((link) => {
    const href = normalizeSafeHref(link.href);
    if (!href) return [];

    const { target, rel } = normalizeLinkTargetRel(link.target, link.rel);
    return {
      ...link,
      href,
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
    homeHref: normalizeSafeHref(details.homeHref),
    email: normalizeEmailHref(details.email),
    website: normalizeSafeHref(details.website),
    linkedin: normalizeSafeHref(details.linkedin),
    github: normalizeSafeHref(details.github),
    twitter: normalizeSafeHref(details.twitter),
    discord: normalizeSafeHref(details.discord),
    navLinks: normalizeNavLinks(details.navLinks),
    primaryAction: normalizedPrimaryAction,
    secondaryAction: normalizedSecondaryAction,
    customSocialLinks: normalizeCustomSocialLinks(details.customSocialLinks),
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

export function buildShellViewModelFromNormalized(normalized: NormalizedBrandDetails): ShellViewModel {
  return {
    navLinks: normalized.navLinks,
    ctaLinks: normalizeCtaLinks(normalized.primaryAction, normalized.secondaryAction),
    socialLinks: detailsToSocialLinks(normalized),
  };
}

export function buildShellViewModel(details: BrandDetails): ShellViewModel {
  return buildShellViewModelFromNormalized(normalizeBrandDetails(details));
}

export function normalizeEmailHref(email?: string): string | undefined {
  if (typeof email !== "string") return undefined;
  const trimmed = email.trim();
  if (trimmed.length === 0) return undefined;
  if (trimmed.toLowerCase().startsWith("mailto:")) {
    const address = trimmed.slice(7).trim();
    if (address.length === 0) return undefined;
    return normalizeSafeHref(`mailto:${address}`);
  }
  return normalizeSafeHref(`mailto:${trimmed}`);
}

function normalizeCustomSocialLinks(links?: CustomSocialLink[]): CustomSocialLink[] | undefined {
  if (!links || links.length === 0) return undefined;
  const normalized: CustomSocialLink[] = [];
  for (const link of links) {
    const href = normalizeSafeHref(link.href);
    if (!href) continue;
    normalized.push({ ...link, href });
  }
  return normalized.length > 0 ? normalized : undefined;
}

function normalizeAction(action?: BrandAction): NormalizedActionLink | undefined {
  if (!action) return undefined;

  const href = normalizeSafeHref(action.href);
  if (!href) return undefined;

  const { target, rel } = normalizeLinkTargetRel(action.target, action.rel);
  return {
    ...action,
    href,
    target,
    rel,
    ariaLabel: action.ariaLabel ?? action.label,
  };
}

export function normalizeLinkTargetRel(target?: BrandNavLink["target"], rel?: string) {
  const normalizedTarget: LinkTarget = target ?? "_self";
  const normalizedRel = normalizeRel(normalizedTarget, rel);
  return {
    target: normalizedTarget,
    rel: normalizedRel,
  };
}
