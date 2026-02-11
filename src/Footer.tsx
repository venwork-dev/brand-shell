import type { BrandDetails, BrandTheme } from "./types";
import { themeToStyle, detailsToNavLinks } from "./utils";

export interface FooterProps {
  details: BrandDetails;
  theme?: BrandTheme | null;
  className?: string;
}

export function Footer({ details, theme, className }: FooterProps) {
  const style = themeToStyle(theme);
  const navLinks = detailsToNavLinks(details);
  const combinedClassName = ["brand-shell-footer", className].filter(Boolean).join(" ");

  return (
    <footer className={combinedClassName} style={style} role="contentinfo">
      <div className="brand-shell-footer__inner">
        {navLinks.length > 0 && (
          <nav className="brand-shell-footer__nav" aria-label="Footer">
            <ul className="brand-shell-footer__list">
              {navLinks.map((link) => (
                <li key={link.href + link.label}>
                  <a href={link.href} className="brand-shell-footer__link" target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
        {details.tagline && <p className="brand-shell-footer__tagline">{details.tagline}</p>}
        <p className="brand-shell-footer__copy">&copy; {new Date().getFullYear()} {details.name}</p>
      </div>
    </footer>
  );
}
