export type { BrandAction, BrandDetails, BrandNavLink, BrandTheme, CustomSocialLink } from "./types";
export { buildShellViewModel, buildShellViewModelFromNormalized, normalizeBrandDetails, normalizeCtaLinks, normalizeEmailHref, normalizeNavLinks } from "./shell";
export type { LinkTarget, NormalizedBrandDetails, ShellActionLink, ShellNavLink, ShellViewModel } from "./shell";
export { shouldValidateInDev } from "./dev";
export { detailsToSocialLinks } from "./social";
export type { SocialLink, SocialPlatform } from "./social";
export { themeToCssVariables } from "./theme";
export type { ThemeVariables } from "./theme";
export {
  BrandShellValidationError,
  assertValidBrandDetails,
  assertValidBrandTheme,
  formatValidationErrors,
  normalizeBrandTheme,
  validateBrandDetails,
  validateBrandTheme,
} from "./validation";
export type { BrandValidationResult } from "./validation";
