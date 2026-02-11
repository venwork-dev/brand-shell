import type { BrandDetails, BrandTheme } from "./types";
import { themeToStyle, detailsToNavLinks } from "./utils";

export interface HeaderProps {
  details: BrandDetails;
  theme?: BrandTheme | null;
  className?: string;
}

export function Header({ details, theme, className }: HeaderProps) {
  const style = themeToStyle(theme);
  const navLinks = detailsToNavLinks(details);
  const combinedClassName = ["brand-shell-header", className].filter(Boolean).join(" ");

  return (
    <header className={combinedClassName} style={style} role="banner">
      <div className="brand-shell-header__inner">
        <a href={details.homeHref ?? "#"} className="brand-shell-header__name" aria-label={`${details.name} home`}>
          {details.name}
        </a>
        {navLinks.length > 0 && (
          <nav className="brand-shell-header__nav" aria-label="Main">
            <ul className="brand-shell-header__list">
              {navLinks.map((link) => (
                <li key={link.href + link.label}>
                  <a href={link.href} className="brand-shell-header__link" target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
