import type { BrandDetails, BrandTheme } from "./types";
import {
  assertValidBrandDetails,
  assertValidBrandTheme,
  buildShellViewModel,
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
  LinkedinIcon,
  MailIcon,
  MessageCircleIcon,
  TwitterIcon,
} from "./icons";

export interface HeaderProps {
  details: BrandDetails;
  theme?: BrandTheme | null;
  className?: string;
}

export function Header({ details, theme, className }: HeaderProps) {
  if (shouldValidateInDev()) {
    assertValidBrandDetails(details, "brand-shell/Header details");
    assertValidBrandTheme(theme, "brand-shell/Header theme");
  }

  const normalizedDetails = normalizeBrandDetails(details);
  const normalizedTheme = normalizeBrandTheme(theme);
  const style = themeToStyle(normalizedTheme);
  const { navLinks, ctaLinks, socialLinks } = buildShellViewModel(normalizedDetails);
  const combinedClassName = ["brand-shell-header", className].filter(Boolean).join(" ");
  const brandIdentity = normalizedDetails.homeHref ? (
    <a
      href={normalizedDetails.homeHref}
      className="brand-shell-header__name"
      aria-label={`${normalizedDetails.name} home`}
    >
      {normalizedDetails.name}
    </a>
  ) : (
    <span className="brand-shell-header__name">{normalizedDetails.name}</span>
  );

  return (
    <header className={combinedClassName} style={style} role="banner">
      <div className="brand-shell-header__inner">
        {brandIdentity}
        <div className="brand-shell-header__actions">
          {navLinks.length > 0 && (
            <nav className="brand-shell-header__nav" aria-label="Primary">
              <ul className="brand-shell-header__list">
                {navLinks.map((link) => {
                  return (
                    <li key={link.href + link.label}>
                      <a
                        href={link.href}
                        className="brand-shell-header__link"
                        aria-label={link.ariaLabel}
                        target={link.target}
                        rel={link.rel}
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}
          {ctaLinks.length > 0 && (
            <div className="brand-shell-header__ctas">
              {ctaLinks.map((action) => (
                <a
                  key={action.href + action.label}
                  href={action.href}
                  className={["brand-shell-button", `brand-shell-button--${action.variant}`].join(" ")}
                  aria-label={action.ariaLabel}
                  target={action.target}
                  rel={action.rel}
                >
                  {action.label}
                </a>
              ))}
            </div>
          )}
          {socialLinks.length > 0 && (
            <div className="brand-shell-header__social" aria-label="Social links">
              {socialLinks.map((link) => {
                const Icon = SOCIAL_ICON_COMPONENTS[link.platform];
                return (
                  <a
                    key={link.href + link.platform}
                    href={link.href}
                    className="brand-shell-header__social-link"
                    aria-label={link.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {Icon ? <Icon aria-hidden="true" /> : <span>{link.label[0]}</span>}
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
  website: MessageCircleIcon,
  linkedin: LinkedinIcon,
  email: MailIcon,
  github: GithubIcon,
  twitter: TwitterIcon,
  discord: DiscordIcon,
};
