import { detailsToSocialLinks, themeToCssVariables } from "../core";
import type { BrandAction, BrandDetails, BrandNavLink, BrandTheme, SocialPlatform } from "../core";

export type { BrandAction, BrandDetails, BrandNavLink, BrandTheme } from "../core";

const SVG_NS = "http://www.w3.org/2000/svg";

const HTMLElementBase: typeof HTMLElement =
  typeof HTMLElement === "undefined" ? (class {} as unknown as typeof HTMLElement) : HTMLElement;

export interface RegisterBrandShellElementsOptions {
  headerTagName?: string;
  footerTagName?: string;
}

export interface BrandShellElementProps {
  details: BrandDetails;
  theme?: BrandTheme | null;
  shellClass?: string | null;
}

export type BrandShellElementLike = HTMLElement & {
  details?: BrandDetails | null;
  theme?: BrandTheme | null;
  shellClass?: string | null;
};

export interface SerializedBrandShellAttributes {
  details: string;
  theme?: string;
  "shell-class"?: string;
}

interface ParsedAttributes {
  details: BrandDetails | null;
  theme: BrandTheme | null;
  shellClass: string | null;
}

abstract class BaseBrandShellElement extends HTMLElementBase {
  static get observedAttributes() {
    return ["details", "theme", "shell-class"];
  }

  private _details: BrandDetails | null = null;
  private _theme: BrandTheme | null = null;
  private _shellClass: string | null = null;

  get details(): BrandDetails | null {
    return this._details;
  }

  set details(value: BrandDetails | null) {
    this._details = value;
    this.render();
  }

  get theme(): BrandTheme | null {
    return this._theme;
  }

  set theme(value: BrandTheme | null) {
    this._theme = value;
    this.render();
  }

  get shellClass(): string | null {
    return this._shellClass;
  }

  set shellClass(value: string | null) {
    this._shellClass = value;
    this.render();
  }

  connectedCallback() {
    this.upgradeProperty("details");
    this.upgradeProperty("theme");
    this.upgradeProperty("shellClass");

    const attrs = parseAttributes(this);
    if (this._details == null) this._details = attrs.details;
    if (this._theme == null) this._theme = attrs.theme;
    if (this._shellClass == null) this._shellClass = attrs.shellClass;

    if (this.style.display !== "block") this.style.display = "block";
    this.render();
  }

  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null) {
    if (name === "details") {
      this._details = parseJsonAttribute<BrandDetails>(newValue);
    } else if (name === "theme") {
      this._theme = parseJsonAttribute<BrandTheme>(newValue);
    } else if (name === "shell-class") {
      this._shellClass = normalizeClassName(newValue);
    }
    this.render();
  }

  protected abstract build(details: BrandDetails, theme: BrandTheme | null, shellClass: string | null): HTMLElement;

  private render() {
    if (!isValidDetails(this._details)) {
      this.replaceChildren();
      return;
    }

    const element = this.build(this._details, this._theme, this._shellClass);
    this.replaceChildren(element);
  }

  private upgradeProperty(propertyName: "details" | "theme" | "shellClass") {
    if (Object.prototype.hasOwnProperty.call(this, propertyName)) {
      const value = (this as unknown as Record<string, unknown>)[propertyName];
      delete (this as unknown as Record<string, unknown>)[propertyName];
      (this as unknown as Record<string, unknown>)[propertyName] = value;
    }
  }
}

export class BrandHeaderElement extends BaseBrandShellElement {
  protected build(details: BrandDetails, theme: BrandTheme | null, shellClass: string | null): HTMLElement {
    return createHeader(details, theme, shellClass);
  }
}

export class BrandFooterElement extends BaseBrandShellElement {
  protected build(details: BrandDetails, theme: BrandTheme | null, shellClass: string | null): HTMLElement {
    return createFooter(details, theme, shellClass);
  }
}

export function registerBrandShellElements(options: RegisterBrandShellElementsOptions = {}) {
  if (typeof customElements === "undefined") {
    throw new Error("Custom elements are not available in this environment.");
  }

  const headerTagName = options.headerTagName ?? "brand-header";
  const footerTagName = options.footerTagName ?? "brand-footer";

  if (!customElements.get(headerTagName)) {
    const HeaderConstructor =
      headerTagName === "brand-header" ? BrandHeaderElement : class extends BrandHeaderElement {};
    customElements.define(headerTagName, HeaderConstructor);
  }
  if (!customElements.get(footerTagName)) {
    const FooterConstructor =
      footerTagName === "brand-footer" ? BrandFooterElement : class extends BrandFooterElement {};
    customElements.define(footerTagName, FooterConstructor);
  }

  return { headerTagName, footerTagName };
}

export function applyBrandShellProps(
  element: BrandShellElementLike | null | undefined,
  props: BrandShellElementProps,
) {
  if (!element) return;
  element.details = props.details;
  element.theme = props.theme ?? null;
  element.shellClass = props.shellClass ?? null;
}

export function serializeBrandShellAttributes(props: BrandShellElementProps): SerializedBrandShellAttributes {
  const attributes: SerializedBrandShellAttributes = {
    details: JSON.stringify(props.details),
  };

  if (props.theme) {
    attributes.theme = JSON.stringify(props.theme);
  }

  const shellClass = normalizeClassName(props.shellClass ?? null);
  if (shellClass) {
    attributes["shell-class"] = shellClass;
  }

  return attributes;
}

function parseAttributes(element: Element): ParsedAttributes {
  return {
    details: parseJsonAttribute<BrandDetails>(element.getAttribute("details")),
    theme: parseJsonAttribute<BrandTheme>(element.getAttribute("theme")),
    shellClass: normalizeClassName(element.getAttribute("shell-class")),
  };
}

function parseJsonAttribute<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function normalizeClassName(value: string | null): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function isValidDetails(details: BrandDetails | null): details is BrandDetails {
  return Boolean(details && typeof details.name === "string" && details.name.trim().length > 0);
}

function createHeader(details: BrandDetails, theme: BrandTheme | null, shellClass: string | null): HTMLElement {
  const header = document.createElement("header");
  header.className = joinClassNames("brand-shell-header", shellClass);
  header.setAttribute("role", "banner");
  applyThemeVariables(header, theme);

  const inner = document.createElement("div");
  inner.className = "brand-shell-header__inner";

  const identity = details.homeHref ? createAnchor(details.homeHref, "brand-shell-header__name", details.name) : createSpan("brand-shell-header__name", details.name);
  if (details.homeHref && identity instanceof HTMLAnchorElement) {
    identity.setAttribute("aria-label", `${details.name} home`);
  }
  inner.append(identity);

  const actions = document.createElement("div");
  actions.className = "brand-shell-header__actions";

  const navLinks = details.navLinks ?? [];
  if (navLinks.length > 0) {
    actions.append(createNav(navLinks, "brand-shell-header", "Primary"));
  }

  const ctaLinks = [details.secondaryAction, details.primaryAction].filter((action): action is BrandAction => Boolean(action));
  if (ctaLinks.length > 0) {
    actions.append(createCtas(ctaLinks, details.primaryAction, "brand-shell-header__ctas"));
  }

  const socialLinks = detailsToSocialLinks(details);
  if (socialLinks.length > 0) {
    actions.append(createSocialLinks(socialLinks, "brand-shell-header__social", "brand-shell-header__social-link"));
  }

  inner.append(actions);
  header.append(inner);
  return header;
}

function createFooter(details: BrandDetails, theme: BrandTheme | null, shellClass: string | null): HTMLElement {
  const footer = document.createElement("footer");
  footer.className = joinClassNames("brand-shell-footer", shellClass);
  footer.setAttribute("role", "contentinfo");
  applyThemeVariables(footer, theme);

  const inner = document.createElement("div");
  inner.className = "brand-shell-footer__inner";

  const top = document.createElement("div");
  top.className = "brand-shell-footer__top";

  const brand = document.createElement("div");
  brand.className = "brand-shell-footer__brand";
  brand.append(createParagraph("brand-shell-footer__name", details.name));
  if (details.tagline) {
    brand.append(createParagraph("brand-shell-footer__tagline", details.tagline));
  }
  top.append(brand);

  const navLinks = details.navLinks ?? [];
  if (navLinks.length > 0) {
    top.append(createNav(navLinks, "brand-shell-footer", "Footer"));
  }

  const ctaLinks = [details.secondaryAction, details.primaryAction].filter((action): action is BrandAction => Boolean(action));
  if (ctaLinks.length > 0) {
    top.append(createCtas(ctaLinks, details.primaryAction, "brand-shell-footer__ctas"));
  }

  const socialLinks = detailsToSocialLinks(details);
  if (socialLinks.length > 0) {
    top.append(createSocialLinks(socialLinks, "brand-shell-footer__social", "brand-shell-footer__social-link"));
  }

  const copy = createParagraph("brand-shell-footer__copy", `© ${new Date().getFullYear()} ${details.name}`);

  inner.append(top, copy);
  footer.append(inner);
  return footer;
}

function createNav(links: BrandNavLink[], blockClass: "brand-shell-header" | "brand-shell-footer", ariaLabel: string): HTMLElement {
  const nav = document.createElement("nav");
  nav.className = `${blockClass}__nav`;
  nav.setAttribute("aria-label", ariaLabel);

  const list = document.createElement("ul");
  list.className = `${blockClass}__list`;

  for (const link of links) {
    const item = document.createElement("li");
    const anchor = createAnchor(link.href, `${blockClass}__link`, link.label);
    const target = link.target ?? "_self";
    const rel = link.rel ?? (target === "_blank" ? "noopener noreferrer" : undefined);
    anchor.target = target;
    if (rel) anchor.rel = rel;
    anchor.setAttribute("aria-label", link.ariaLabel ?? link.label);
    item.append(anchor);
    list.append(item);
  }

  nav.append(list);
  return nav;
}

function createCtas(actions: BrandAction[], primaryAction: BrandAction | undefined, containerClass: string): HTMLElement {
  const container = document.createElement("div");
  container.className = containerClass;

  actions.forEach((action, index) => {
    const anchor = createAnchor(action.href, "brand-shell-button", action.label);
    const variant = getCtaVariant(action, primaryAction, index === actions.length - 1);
    anchor.className = joinClassNames(anchor.className, `brand-shell-button--${variant}`);
    anchor.setAttribute("aria-label", action.ariaLabel ?? action.label);

    const target = action.target ?? "_self";
    const rel = action.rel ?? (target === "_blank" ? "noopener noreferrer" : undefined);
    anchor.target = target;
    if (rel) anchor.rel = rel;

    container.append(anchor);
  });

  return container;
}

function createSocialLinks(
  links: ReturnType<typeof detailsToSocialLinks>,
  containerClass: string,
  linkClass: string,
): HTMLElement {
  const container = document.createElement("div");
  container.className = containerClass;
  container.setAttribute("aria-label", "Social links");

  for (const link of links) {
    const anchor = createAnchor(link.href, linkClass, "");
    anchor.setAttribute("aria-label", link.label);
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";

    const icon = createSocialIcon(link.platform);
    if (icon) {
      anchor.append(icon);
    } else {
      anchor.append(createSpan("", link.label[0] ?? "?"));
    }

    container.append(anchor);
  }

  return container;
}

function createSocialIcon(platform: SocialPlatform): SVGSVGElement | null {
  switch (platform) {
    case "github":
      return createFilledIcon(
        "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
      );
    case "twitter":
      return createFilledIcon("M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z");
    case "linkedin":
      return createFilledIcon(
        "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
      );
    case "discord":
      return createFilledIcon(
        "M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z",
      );
    case "email":
      return createStrokedIcon(["m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"], { rx: "2" });
    case "website":
      return createStrokedIcon(["M7.9 20A9 9 0 1 0 4 16.1L2 22Z"]);
    default:
      return null;
  }
}

function createFilledIcon(pathData: string): SVGSVGElement {
  const svg = createBaseSvg();
  svg.setAttribute("fill", "currentColor");
  const path = document.createElementNS(SVG_NS, "path");
  path.setAttribute("d", pathData);
  svg.append(path);
  return svg;
}

function createStrokedIcon(pathData: string[], rectAttributes?: Record<string, string>): SVGSVGElement {
  const svg = createBaseSvg();
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");

  if (rectAttributes) {
    const rect = document.createElementNS(SVG_NS, "rect");
    rect.setAttribute("width", "20");
    rect.setAttribute("height", "16");
    rect.setAttribute("x", "2");
    rect.setAttribute("y", "4");
    for (const [attribute, value] of Object.entries(rectAttributes)) {
      rect.setAttribute(attribute, value);
    }
    svg.append(rect);
  }

  for (const d of pathData) {
    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", d);
    svg.append(path);
  }

  return svg;
}

function createBaseSvg(): SVGSVGElement {
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", "1em");
  svg.setAttribute("height", "1em");
  svg.setAttribute("aria-hidden", "true");
  return svg;
}

function getCtaVariant(action: BrandAction, primaryAction?: BrandAction, isLast?: boolean) {
  return action.variant ?? (action === primaryAction || isLast ? "primary" : "secondary");
}

function applyThemeVariables(element: HTMLElement, theme: BrandTheme | null) {
  const style = themeToCssVariables(theme);
  for (const [name, value] of Object.entries(style)) {
    element.style.setProperty(name, value);
  }
}

function joinClassNames(...classNames: Array<string | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

function createAnchor(href: string, className: string, text: string): HTMLAnchorElement {
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.className = className;
  anchor.textContent = text;
  return anchor;
}

function createParagraph(className: string, text: string): HTMLParagraphElement {
  const paragraph = document.createElement("p");
  paragraph.className = className;
  paragraph.textContent = text;
  return paragraph;
}

function createSpan(className: string, text: string): HTMLSpanElement {
  const span = document.createElement("span");
  span.className = className;
  span.textContent = text;
  return span;
}

declare global {
  interface HTMLElementTagNameMap {
    "brand-header": BrandHeaderElement;
    "brand-footer": BrandFooterElement;
  }
}
