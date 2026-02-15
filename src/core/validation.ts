import { normalizeBrandDetails, normalizeGmailHref, type NormalizedBrandDetails } from "./shell";
import { normalizeSafeHref } from "./links";
import type { BrandAction, BrandDetails, BrandNavLink, BrandTheme } from "./types";

const LINK_TARGETS = new Set<NonNullable<BrandNavLink["target"]>>(["_blank", "_self", "_parent", "_top"]);
const CTA_VARIANTS = new Set<NonNullable<BrandAction["variant"]>>(["primary", "secondary", "ghost"]);
const THEME_KEYS = new Set<keyof BrandTheme>([
  "primaryColor",
  "backgroundColor",
  "textColor",
  "fontFamily",
  "linkColor",
  "socialIconSize",
  "buttonTextColor",
]);

type ValidationErrorPath = string;

export interface BrandValidationResult<T> {
  valid: boolean;
  errors: string[];
  normalized: T | null;
}

export class BrandShellValidationError extends Error {
  readonly context: string;
  readonly errors: string[];

  constructor(context: string, errors: string[]) {
    super(formatValidationErrors(context, errors));
    this.name = "BrandShellValidationError";
    this.context = context;
    this.errors = errors;
  }
}

export function validateBrandDetails(details: unknown): BrandValidationResult<NormalizedBrandDetails> {
  const errors: string[] = [];

  if (!isRecord(details)) {
    errors.push("details must be an object.");
    return { valid: false, errors, normalized: null };
  }

  validateRequiredString(details.name, "details.name", errors);
  validateOptionalString(details.homeHref, "details.homeHref", errors);
  validateSafeHref(details.homeHref, "details.homeHref", errors);
  validateOptionalString(details.website, "details.website", errors);
  validateSafeHref(details.website, "details.website", errors);
  validateOptionalString(details.linkedin, "details.linkedin", errors);
  validateSafeHref(details.linkedin, "details.linkedin", errors);
  validateOptionalString(details.gmail, "details.gmail", errors);
  validateGmail(details.gmail, "details.gmail", errors);
  validateOptionalString(details.github, "details.github", errors);
  validateSafeHref(details.github, "details.github", errors);
  validateOptionalString(details.twitter, "details.twitter", errors);
  validateSafeHref(details.twitter, "details.twitter", errors);
  validateOptionalString(details.discord, "details.discord", errors);
  validateSafeHref(details.discord, "details.discord", errors);
  validateOptionalString(details.tagline, "details.tagline", errors);

  if (details.navLinks != null) {
    if (!Array.isArray(details.navLinks)) {
      errors.push("details.navLinks must be an array.");
    } else {
      details.navLinks.forEach((link, index) => validateNavLink(link, `details.navLinks[${index}]`, errors));
    }
  }

  if (details.primaryAction != null) {
    validateAction(details.primaryAction, "details.primaryAction", errors);
  }
  if (details.secondaryAction != null) {
    validateAction(details.secondaryAction, "details.secondaryAction", errors);
  }

  if (errors.length > 0) {
    return { valid: false, errors, normalized: null };
  }

  return {
    valid: true,
    errors: [],
    normalized: normalizeBrandDetails(details as unknown as BrandDetails),
  };
}

export function validateBrandTheme(theme: unknown): BrandValidationResult<BrandTheme | null> {
  if (theme == null) {
    return {
      valid: true,
      errors: [],
      normalized: null,
    };
  }

  const errors: string[] = [];

  if (!isRecord(theme)) {
    errors.push("theme must be an object when provided.");
    return { valid: false, errors, normalized: null };
  }

  for (const key of Object.keys(theme)) {
    if (!THEME_KEYS.has(key as keyof BrandTheme)) {
      errors.push(`theme.${key} is not a supported theme key.`);
      continue;
    }
    validateOptionalString(theme[key], `theme.${key}`, errors);
  }

  if (errors.length > 0) {
    return { valid: false, errors, normalized: null };
  }

  return {
    valid: true,
    errors: [],
    normalized: normalizeBrandTheme(theme as BrandTheme),
  };
}

export function assertValidBrandDetails(details: unknown, context = "BrandDetails"): asserts details is BrandDetails {
  const result = validateBrandDetails(details);
  if (!result.valid) {
    throw new BrandShellValidationError(context, result.errors);
  }
}

export function assertValidBrandTheme(theme: unknown, context = "BrandTheme"): asserts theme is BrandTheme | null | undefined {
  const result = validateBrandTheme(theme);
  if (!result.valid) {
    throw new BrandShellValidationError(context, result.errors);
  }
}

export function normalizeBrandTheme(theme?: BrandTheme | null): BrandTheme | null {
  if (!theme) return null;

  const normalized: BrandTheme = {};
  for (const key of THEME_KEYS) {
    const value = theme[key];
    if (typeof value !== "string") continue;
    const trimmed = value.trim();
    if (trimmed.length > 0) {
      normalized[key] = trimmed;
    }
  }

  return Object.keys(normalized).length > 0 ? normalized : null;
}

export function formatValidationErrors(context: string, errors: string[]): string {
  return `${context} validation failed:\n${errors.map((error) => `- ${error}`).join("\n")}`;
}

function validateNavLink(link: unknown, path: ValidationErrorPath, errors: string[]) {
  if (!isRecord(link)) {
    errors.push(`${path} must be an object.`);
    return;
  }

  validateRequiredString(link.label, `${path}.label`, errors);
  validateRequiredString(link.href, `${path}.href`, errors);
  validateSafeHref(link.href, `${path}.href`, errors);
  validateOptionalString(link.ariaLabel, `${path}.ariaLabel`, errors);
  validateOptionalString(link.rel, `${path}.rel`, errors);
  validateTarget(link.target, `${path}.target`, errors);
}

function validateAction(action: unknown, path: ValidationErrorPath, errors: string[]) {
  if (!isRecord(action)) {
    errors.push(`${path} must be an object.`);
    return;
  }

  validateRequiredString(action.label, `${path}.label`, errors);
  validateRequiredString(action.href, `${path}.href`, errors);
  validateSafeHref(action.href, `${path}.href`, errors);
  validateOptionalString(action.ariaLabel, `${path}.ariaLabel`, errors);
  validateOptionalString(action.rel, `${path}.rel`, errors);
  validateTarget(action.target, `${path}.target`, errors);

  if (action.variant != null) {
    if (typeof action.variant !== "string" || !CTA_VARIANTS.has(action.variant as NonNullable<BrandAction["variant"]>)) {
      errors.push(`${path}.variant must be one of: primary, secondary, ghost.`);
    }
  }
}

function validateTarget(target: unknown, path: ValidationErrorPath, errors: string[]) {
  if (target == null) return;
  if (typeof target !== "string" || !LINK_TARGETS.has(target as NonNullable<BrandNavLink["target"]>)) {
    errors.push(`${path} must be one of: _blank, _self, _parent, _top.`);
  }
}

function validateRequiredString(value: unknown, path: ValidationErrorPath, errors: string[]) {
  if (typeof value !== "string" || value.trim().length === 0) {
    errors.push(`${path} must be a non-empty string.`);
  }
}

function validateOptionalString(value: unknown, path: ValidationErrorPath, errors: string[]) {
  if (value == null) return;
  if (typeof value !== "string" || value.trim().length === 0) {
    errors.push(`${path} must be a non-empty string when provided.`);
  }
}

function validateSafeHref(value: unknown, path: ValidationErrorPath, errors: string[]) {
  if (value == null) return;
  if (typeof value !== "string" || value.trim().length === 0) return;
  if (!normalizeSafeHref(value)) {
    errors.push(`${path} must use a safe URL/path (http, https, mailto, tel, or relative path).`);
  }
}

function validateGmail(value: unknown, path: ValidationErrorPath, errors: string[]) {
  if (value == null) return;
  if (typeof value !== "string" || value.trim().length === 0) return;
  if (!normalizeGmailHref(value)) {
    errors.push(`${path} must be a valid email or mailto URL.`);
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
