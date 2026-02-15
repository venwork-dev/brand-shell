import { defineComponent, h, onMounted, ref, watch, type PropType } from "vue";

import type { BrandDetails, BrandTheme } from "../core";
import { applyBrandShellProps, registerBrandShellElements, type BrandShellElementLike } from "../web";

export type { BrandDetails, BrandTheme } from "../core";

export interface BrandShellVueProps {
  details: BrandDetails;
  theme?: BrandTheme | null;
  shellClass?: string | null;
}

function ensureBrandShellElementsRegistered() {
  if (typeof customElements !== "undefined") {
    registerBrandShellElements();
  }
}

function createBrandShellVueComponent(
  tagName: "brand-header" | "brand-footer",
  componentName: "BrandHeader" | "BrandFooter",
) {
  return defineComponent({
    name: componentName,
    props: {
      details: {
        type: Object as PropType<BrandDetails>,
        required: true,
      },
      theme: {
        type: Object as PropType<BrandTheme | null>,
        default: null,
      },
      shellClass: {
        type: String as PropType<string | null>,
        default: null,
      },
    },
    setup(props) {
      ensureBrandShellElementsRegistered();

      const elementRef = ref<BrandShellElementLike | null>(null);

      const syncProps = () => {
        applyBrandShellProps(elementRef.value, {
          details: props.details,
          theme: props.theme ?? null,
          shellClass: props.shellClass ?? null,
        });
      };

      onMounted(() => {
        syncProps();
      });

      watch(
        () => [props.details, props.theme, props.shellClass],
        () => {
          syncProps();
        },
        { deep: true },
      );

      return () =>
        h(tagName, {
          ref: elementRef,
        });
    },
  });
}

export const BrandHeader = createBrandShellVueComponent("brand-header", "BrandHeader");
export const BrandFooter = createBrandShellVueComponent("brand-footer", "BrandFooter");

export function registerBrandShellVueElements() {
  return registerBrandShellElements();
}
