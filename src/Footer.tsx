import type { ReactElement } from "react";
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

import type { LinkRenderProps } from "./Header";

export interface FooterProps {
  details: BrandDetails;
  theme?: BrandTheme | null;
  className?: string;
  renderLink?: (props: LinkRenderProps) => ReactElement;
}

export function Footer({ details, theme, className, renderLink }: FooterProps) {
  if (shouldValidateInDev()) {
    assertValidBrandDetails(details, "brand-shell/Footer details");
    assertValidBrandTheme(theme, "brand-shell/Footer theme");
  }

  const normalizedDetails = normalizeBrandDetails(details);
  const normalizedTheme = normalizeBrandTheme(theme);
  const ctaLayout = normalizedTheme?.ctaLayout === "stacked" ? "stacked" : "inline";
  const style = themeToStyle(normalizedTheme);
  const { navLinks, ctaLinks, socialLinks } = buildShellViewModelFromNormalized(normalizedDetails);
  const combinedClassName = ["brand-shell-footer", className].filter(Boolean).join(" ");

  const LinkEl = renderLink
    ? renderLink
    : ({ href, className: cls, "aria-label": ariaLabel, target, rel, children }: LinkRenderProps) => (
        <a href={href} className={cls} aria-label={ariaLabel} target={target} rel={rel}>{children}</a>
      );

  return (
    <footer className={combinedClassName} data-brand-cta-layout={ctaLayout} style={style} role="contentinfo">
      <div className="brand-shell-footer__inner">
        <div className="brand-shell-footer__top">
          <div className="brand-shell-footer__brand">
            {(() => {
              const logoContent = normalizedDetails.logoSrc ? (
                <img
                  src={normalizedDetails.logoSrc}
                  alt={normalizedDetails.logoAlt ?? normalizedDetails.name}
                  className="brand-shell-footer__logo"
                />
              ) : null;

              if (normalizedDetails.homeHref) {
                return (
                  <LinkEl
                    href={normalizedDetails.homeHref}
                    className="brand-shell-footer__name"
                    aria-label={`${normalizedDetails.name} home`}
                    target="_self"
                  >
                    {logoContent ?? normalizedDetails.name}
                  </LinkEl>
                );
              }

              return logoContent
                ? logoContent
                : <p className="brand-shell-footer__name">{normalizedDetails.name}</p>;
            })()}
            {normalizedDetails.tagline && <p className="brand-shell-footer__tagline">{normalizedDetails.tagline}</p>}
          </div>
          {navLinks.length > 0 && (
            <nav className="brand-shell-footer__nav" aria-label="Footer">
              <ul className="brand-shell-footer__list">
                {navLinks.map((link) => {
                  return (
                    <li key={link.href + link.label}>
                      <LinkEl
                        href={link.href}
                        className="brand-shell-footer__link"
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
            <div className="brand-shell-footer__ctas">
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
            <div className="brand-shell-footer__social" aria-label="Social links">
              {socialLinks.map((link) => {
                const Icon = SOCIAL_ICON_COMPONENTS[link.platform as SocialPlatform];
                const isMailto = link.href.startsWith("mailto:");
                return (
                  <a
                    key={link.href + link.platform}
                    href={link.href}
                    className="brand-shell-footer__social-link"
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
        <p className="brand-shell-footer__copy">&copy; {new Date().getFullYear()} {normalizedDetails.name}</p>
      </div>
    </footer>
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
