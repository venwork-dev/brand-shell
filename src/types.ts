/**
 * Schema for header/footer content. Caller passes these; package does not store them.
 */
export interface BrandDetails {
  /** Display name (e.g. in header and footer) */
  name: string;
  /** Optional home URL (header name links here when set) */
  homeHref?: string;
  /** LinkedIn profile URL */
  linkedin?: string;
  /** Email address (e.g. mailto: or plain) */
  gmail?: string;
  /** GitHub profile URL */
  github?: string;
  /** Twitter/X profile URL */
  twitter?: string;
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
}
