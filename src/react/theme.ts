import type { CSSProperties } from "react";
import type { BrandTheme } from "../core/types";
import { themeToCssVariables } from "../core/theme";

export function themeToStyle(theme?: BrandTheme | null): CSSProperties {
  return themeToCssVariables(theme) as CSSProperties;
}
