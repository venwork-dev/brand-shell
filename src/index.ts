export { Header } from "./Header";
export type { HeaderProps, LinkRenderProps } from "./Header";
export { Footer } from "./Footer";
export type { FooterProps } from "./Footer";
export type { BrandDetails, BrandTheme, BrandNavLink, BrandAction } from "./types";
export {
  BrandShellValidationError,
  assertValidBrandDetails,
  assertValidBrandTheme,
  buildShellViewModel,
  buildShellViewModelFromNormalized,
  detailsToSocialLinks,
  formatValidationErrors,
  normalizeBrandDetails,
  normalizeBrandTheme,
  normalizeCtaLinks,
  normalizeEmailHref,
  normalizeNavLinks,
  shouldValidateInDev,
  themeToCssVariables,
  validateBrandDetails,
  validateBrandTheme,
} from "./core";
export type {
  BrandValidationResult,
  CustomSocialLink,
  LinkTarget,
  NormalizedBrandDetails,
  ShellActionLink,
  ShellNavLink,
  ShellViewModel,
  SocialLink,
  SocialPlatform,
  ThemeVariables,
} from "./core";
