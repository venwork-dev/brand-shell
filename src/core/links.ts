const ABSOLUTE_SCHEME_PATTERN = /^([a-zA-Z][a-zA-Z\d+.-]*):/;
const UNSAFE_CHAR_PATTERN = /[\u0000-\u001f\u007f]/;
const ALLOWED_PROTOCOLS = new Set(["http:", "https:", "mailto:", "tel:"]);
const REQUIRED_BLANK_REL_TOKENS = ["noopener", "noreferrer"];

export function normalizeSafeHref(href: unknown): string | undefined {
  if (typeof href !== "string") return undefined;
  const trimmed = href.trim();
  if (trimmed.length === 0) return undefined;
  if (UNSAFE_CHAR_PATTERN.test(trimmed)) return undefined;
  if (trimmed.startsWith("//")) return undefined;

  const schemeMatch = trimmed.match(ABSOLUTE_SCHEME_PATTERN);
  if (!schemeMatch) {
    return trimmed;
  }

  const protocol = `${schemeMatch[1]?.toLowerCase()}:`;
  if (!ALLOWED_PROTOCOLS.has(protocol)) {
    return undefined;
  }

  return trimmed;
}

export function isSafeHref(href: unknown): boolean {
  return normalizeSafeHref(href) != null;
}

export function normalizeRel(target: "_blank" | "_self" | "_parent" | "_top", rel?: string): string | undefined {
  const normalizedRel = typeof rel === "string" ? rel.trim() : "";
  if (target !== "_blank") {
    return normalizedRel.length > 0 ? normalizedRel : undefined;
  }

  const tokens = normalizedRel.length > 0 ? normalizedRel.split(/\s+/).filter(Boolean) : [];
  const tokenSet = new Set(tokens.map((token) => token.toLowerCase()));

  for (const requiredToken of REQUIRED_BLANK_REL_TOKENS) {
    if (!tokenSet.has(requiredToken)) {
      tokens.push(requiredToken);
    }
  }

  return tokens.join(" ");
}
