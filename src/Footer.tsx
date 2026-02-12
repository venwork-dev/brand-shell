import type { BrandAction, BrandDetails, BrandTheme } from "./types";
import { themeToStyle, detailsToSocialLinks } from "./utils";
import type { SocialPlatform } from "./utils";
import type { IconProps } from "./icons";
import {
  DiscordIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  MessageCircleIcon,
  TwitterIcon,
} from "./icons";

export interface FooterProps {
  details: BrandDetails;
  theme?: BrandTheme | null;
  className?: string;
}

export function Footer({ details, theme, className }: FooterProps) {
  const style = themeToStyle(theme);
  const navLinks = details.navLinks ?? [];
  const socialLinks = detailsToSocialLinks(details);
  const ctaLinks = [details.secondaryAction, details.primaryAction].filter(
    (action): action is BrandAction => Boolean(action),
  );
  const combinedClassName = ["brand-shell-footer", className].filter(Boolean).join(" ");

  return (
    <footer className={combinedClassName} style={style} role="contentinfo">
      <div className="brand-shell-footer__inner">
        <div className="brand-shell-footer__top">
          <div className="brand-shell-footer__brand">
            <p className="brand-shell-footer__name">{details.name}</p>
            {details.tagline && <p className="brand-shell-footer__tagline">{details.tagline}</p>}
          </div>
          {navLinks.length > 0 && (
            <nav className="brand-shell-footer__nav" aria-label="Footer">
              <ul className="brand-shell-footer__list">
                {navLinks.map((link) => {
                  const target = link.target ?? "_self";
                  const rel = link.rel ?? (target === "_blank" ? "noopener noreferrer" : undefined);
                  return (
                    <li key={link.href + link.label}>
                      <a
                        href={link.href}
                        className="brand-shell-footer__link"
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
            <div className="brand-shell-footer__ctas">
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
            <div className="brand-shell-footer__social" aria-label="Social links">
              {socialLinks.map((link) => {
                const Icon = SOCIAL_ICON_COMPONENTS[link.platform];
                return (
                  <a
                    key={link.href + link.platform}
                    href={link.href}
                    className="brand-shell-footer__social-link"
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
        <p className="brand-shell-footer__copy">&copy; {new Date().getFullYear()} {details.name}</p>
      </div>
    </footer>
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
