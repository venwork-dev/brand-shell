import type { BrandDetails, BrandTheme, BrandAction } from "./types";
import { detailsToSocialLinks } from "./core/social";
import type { SocialPlatform } from "./core/social";
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
  const style = themeToStyle(theme);
  const navLinks = details.navLinks ?? [];
  const socialLinks = detailsToSocialLinks(details);
  const ctaLinks = [details.secondaryAction, details.primaryAction].filter(
    (action): action is BrandAction => Boolean(action),
  );
  const combinedClassName = ["brand-shell-header", className].filter(Boolean).join(" ");
  const brandIdentity = details.homeHref ? (
    <a href={details.homeHref} className="brand-shell-header__name" aria-label={`${details.name} home`}>
      {details.name}
    </a>
  ) : (
    <span className="brand-shell-header__name">{details.name}</span>
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
                  const target = link.target ?? "_self";
                  const rel = link.rel ?? (target === "_blank" ? "noopener noreferrer" : undefined);
                  return (
                    <li key={link.href + link.label}>
                      <a
                        href={link.href}
                        className="brand-shell-header__link"
                        aria-label={link.ariaLabel ?? link.label}
                        target={target}
                        rel={rel}
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
              {ctaLinks.map((action, index) => (
                <a
                  key={action.href + action.label}
                  href={action.href}
                  className={["brand-shell-button", getCtaClassName(action, details.primaryAction, index === ctaLinks.length - 1)].join(
                    " ",
                  )}
                  aria-label={action.ariaLabel ?? action.label}
                  target={action.target ?? "_self"}
                  rel={action.rel ?? (action.target === "_blank" ? "noopener noreferrer" : undefined)}
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

function getCtaClassName(action: BrandAction, primaryAction?: BrandAction, isLast?: boolean) {
  const variant = action.variant ?? (action === primaryAction || isLast ? "primary" : "secondary");
  return `brand-shell-button--${variant}`;
}
