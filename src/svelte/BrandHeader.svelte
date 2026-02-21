<script lang="ts">
  import { registerBrandShellElements, applyBrandShellProps } from 'brand-shell/web';
  import type { BrandDetails, BrandTheme } from 'brand-shell';
  import type { LinkFactoryOptions } from 'brand-shell/web';

  interface Props {
    details: BrandDetails;
    theme?: BrandTheme | null;
    shellClass?: string | null;
    linkFactory?: (options: LinkFactoryOptions) => HTMLAnchorElement;
  }

  let { details, theme = null, shellClass = null, linkFactory }: Props = $props();

  let element: HTMLElement | undefined = $state();

  $effect(() => {
    if (!element) return;
    registerBrandShellElements();
    applyBrandShellProps(element as any, { details, theme, shellClass, linkFactory });
  });
</script>

<brand-header bind:this={element}></brand-header>
