import type { Action } from "svelte/action";

import type { BrandDetails, BrandTheme } from "../core";
import {
  applyBrandShellProps,
  registerBrandShellElements,
  type BrandShellElementLike,
  type BrandShellElementProps,
} from "../web";

export type { BrandDetails, BrandTheme } from "../core";

export type BrandShellSvelteProps = BrandShellElementProps;

function syncProps(node: BrandShellElementLike, props: BrandShellSvelteProps) {
  applyBrandShellProps(node, {
    details: props.details,
    theme: props.theme ?? null,
    shellClass: props.shellClass ?? null,
  });
}

export const brandShell: Action<HTMLElement, BrandShellSvelteProps> = (node, props) => {
  registerBrandShellElements();
  syncProps(node as BrandShellElementLike, props);

  return {
    update(nextProps) {
      syncProps(node as BrandShellElementLike, nextProps);
    },
  };
};

export function registerBrandShellSvelteElements() {
  return registerBrandShellElements();
}
