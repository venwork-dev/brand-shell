/**
 * Schema for header/footer content. Caller passes these; package does not store them.
 */
export interface BrandNavLink {
  /** Visible label (e.g. Blog, Docs, About) */
  label: string;
  /** Destination URL or path */
  href: string;
  /** Optional custom aria-label for accessibility */
  ariaLabel?: string;
  /** Optional target attribute (defaults to _self) */
  target?: "_blank" | "_self" | "_parent" | "_top";
  /** Optional rel attribute (e.g. noopener) */
  rel?: string;
}

export interface BrandAction {
  /** Visible label on the CTA button */
  label: string;
  /** URL the CTA points to */
  href: string;
  /** Optional aria-label override */
  ariaLabel?: string;
  /** Optional target attribute */
  target?: "_blank" | "_self" | "_parent" | "_top";
  /** Optional rel attribute */
  rel?: string;
  /** Style variant hint */
  variant?: "primary" | "secondary" | "ghost";
}

export interface BrandDetails {
  /** Display name (e.g. in header and footer) */
  name: string;
  /** Optional home URL (header name links here when set) */
  homeHref?: string;
  /** Primary nav links shown in the header/footer text nav */
  navLinks?: BrandNavLink[];
  /** Optional highlighted CTA button */
  primaryAction?: BrandAction;
  /** Optional secondary CTA button */
  secondaryAction?: BrandAction;
  /** LinkedIn profile URL */
  linkedin?: string;
  /** Email address (e.g. mailto: or plain) */
  gmail?: string;
  /** GitHub profile URL */
  github?: string;
  /** Twitter/X profile URL */
  twitter?: string;
  /** Discord community or profile URL */
  discord?: string;
  /** Personal or site website URL */
  website?: string;
  /** Optional tagline (e.g. in footer) */
  tagline?: string;
}

/**
 * Optional theme to adapt branding without custom CSS.
 * Applied as CSS custom properties on the component root.
 */
export interface BrandTheme {
  /** Accent/link hover and active state color */
  primaryColor?: string;
  /** Header/footer background color */
  backgroundColor?: string;
  /** Main text color (name, nav labels) */
  textColor?: string;
  /** Font stack for header/footer */
  fontFamily?: string;
  /** Link default color (defaults from primaryColor if omitted) */
  linkColor?: string;
  /** Size for social icon buttons (e.g. 2rem, 32px) */
  socialIconSize?: string;
  /** Optional override for primary CTA text color */
  buttonTextColor?: string;
  /** Mobile CTA arrangement: side-by-side (`inline`) or one-per-row (`stacked`) */
  ctaLayout?: "inline" | "stacked";
}
