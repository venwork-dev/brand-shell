import type { BrandDetails, BrandTheme } from "./types";
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

export interface HeaderProps {
  details: BrandDetails;
  theme?: BrandTheme | null;
  className?: string;
}

export function Header({ details, theme, className }: HeaderProps) {
  const style = themeToStyle(theme);
  const navLinks = details.navLinks ?? [];
  const socialLinks = detailsToSocialLinks(details);
  const combinedClassName = ["brand-shell-header", className].filter(Boolean).join(" ");

  return (
    <header className={combinedClassName} style={style} role="banner">
      <div className="brand-shell-header__inner">
        <a href={details.homeHref ?? "#"} className="brand-shell-header__name" aria-label={`${details.name} home`}>
          {details.name}
        </a>
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
