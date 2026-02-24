import type { ReactElement, ReactNode } from "react";
import type { BrandDetails, BrandTheme } from "./types";
import {
  assertValidBrandDetails,
  assertValidBrandTheme,
  buildShellViewModelFromNormalized,
  normalizeBrandDetails,
  normalizeBrandTheme,
  shouldValidateInDev,
} from "./core";
import type { SocialPlatform } from "./core";
import type { IconProps } from "./icons";
import { themeToStyle } from "./react/theme";
import {
  DiscordIcon,
  GithubIcon,
  GlobeIcon,
  LinkedinIcon,
  MailIcon,
  TwitterIcon,
} from "./icons";

export interface LinkRenderProps {
  href: string;
  className: string;
  "aria-label": string;
  target: string;
  rel?: string;
  children: ReactNode;
}

export interface HeaderProps {
  details: BrandDetails;
  theme?: BrandTheme | null;
  className?: string;
  renderLink?: (props: LinkRenderProps) => ReactElement;
}

export function Header({ details, theme, className, renderLink }: HeaderProps) {
  if (shouldValidateInDev()) {
    assertValidBrandDetails(details, "brand-shell/Header details");
    assertValidBrandTheme(theme, "brand-shell/Header theme");
  }

  const normalizedDetails = normalizeBrandDetails(details);
  const normalizedTheme = normalizeBrandTheme(theme);
  const ctaLayout = normalizedTheme?.ctaLayout === "stacked" ? "stacked" : "inline";
  const style = themeToStyle(normalizedTheme);
  const { navLinks, ctaLinks, socialLinks } = buildShellViewModelFromNormalized(normalizedDetails);
  const combinedClassName = ["brand-shell-header", className].filter(Boolean).join(" ");

  const LinkEl = renderLink
    ? renderLink
    : ({ href, className: cls, "aria-label": ariaLabel, target, rel, children }: LinkRenderProps) => (
        <a href={href} className={cls} aria-label={ariaLabel} target={target} rel={rel}>{children}</a>
      );

  const logoContent = normalizedDetails.logoSrc ? (
    <img
      src={normalizedDetails.logoSrc}
      alt={normalizedDetails.logoAlt ?? normalizedDetails.name}
      className="brand-shell-header__logo"
    />
  ) : (
    normalizedDetails.name
  );

  const brandIdentity = normalizedDetails.homeHref ? (
    <LinkEl
      href={normalizedDetails.homeHref}
      className="brand-shell-header__name"
      aria-label={`${normalizedDetails.name} home`}
      target="_self"
    >
      {logoContent}
    </LinkEl>
  ) : (
    <span className="brand-shell-header__name">{logoContent}</span>
  );

  return (
    <header className={combinedClassName} data-brand-cta-layout={ctaLayout} style={style} role="banner">
      <a href="#main-content" className="brand-shell-skip-nav">Skip to main content</a>
      <div className="brand-shell-header__inner">
        {brandIdentity}
        <div className="brand-shell-header__actions">
          {navLinks.length > 0 && (
            <nav className="brand-shell-header__nav" aria-label="Primary">
              <ul className="brand-shell-header__list">
                {navLinks.map((link) => {
                  return (
                    <li key={link.href + link.label}>
                      <LinkEl
                        href={link.href}
                        className="brand-shell-header__link"
                        aria-label={link.ariaLabel}
                        target={link.target}
                        rel={link.rel}
                      >
                        {link.label}
                      </LinkEl>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}
          {ctaLinks.length > 0 && (
            <div className="brand-shell-header__ctas">
              {ctaLinks.map((action) => (
                <LinkEl
                  key={action.href + action.label}
                  href={action.href}
                  className={["brand-shell-button", `brand-shell-button--${action.variant}`].join(" ")}
                  aria-label={action.ariaLabel}
                  target={action.target}
                  rel={action.rel}
                >
                  {action.label}
                </LinkEl>
              ))}
            </div>
          )}
          {socialLinks.length > 0 && (
            <div className="brand-shell-header__social" aria-label="Social links">
              {socialLinks.map((link) => {
                const Icon = SOCIAL_ICON_COMPONENTS[link.platform as SocialPlatform];
                const isMailto = link.href.startsWith("mailto:");
                return (
                  <a
                    key={link.href + link.platform}
                    href={link.href}
                    className="brand-shell-header__social-link"
                    aria-label={link.label}
                    {...(!isMailto && { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    {Icon ? (
                      <Icon aria-hidden="true" />
                    ) : link.iconSvg ? (
                      <span dangerouslySetInnerHTML={{ __html: link.iconSvg }} aria-hidden="true" />
                    ) : (
                      <span>{link.label[0]}</span>
                    )}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

const SOCIAL_ICON_COMPONENTS: Record<SocialPlatform, (props: IconProps) => JSX.Element> = {
  website: GlobeIcon,
  linkedin: LinkedinIcon,
  email: MailIcon,
  github: GithubIcon,
  twitter: TwitterIcon,
  discord: DiscordIcon,
};
