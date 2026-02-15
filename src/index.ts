export { Header } from "./Header";
export { Footer } from "./Footer";
export type { BrandDetails, BrandTheme, BrandNavLink, BrandAction } from "./types";
export {
  BrandShellValidationError,
  assertValidBrandDetails,
  assertValidBrandTheme,
  buildShellViewModel,
  detailsToSocialLinks,
  formatValidationErrors,
  normalizeBrandDetails,
  normalizeBrandTheme,
  normalizeCtaLinks,
  normalizeGmailHref,
  normalizeNavLinks,
  shouldValidateInDev,
  themeToCssVariables,
  validateBrandDetails,
  validateBrandTheme,
} from "./core";
export type {
  BrandValidationResult,
  LinkTarget,
  NormalizedBrandDetails,
  ShellActionLink,
  ShellNavLink,
  ShellViewModel,
  SocialLink,
  SocialPlatform,
  ThemeVariables,
} from "./core";
