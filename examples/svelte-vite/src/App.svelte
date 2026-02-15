<script>
  import { onMount } from "svelte";
  import { applyBrandShellProps, registerBrandShellElements } from "brand-shell/web";
  import "brand-shell/default.css";

  import contract from "../../shared/brand-contract.json";

  registerBrandShellElements();

  let headerEl;
  let footerEl;

  onMount(() => {
    applyBrandShellProps(headerEl, {
      details: contract.details,
      theme: contract.theme,
    });
    applyBrandShellProps(footerEl, {
      details: contract.details,
      theme: contract.theme,
    });
  });
</script>

<div class="app">
  <brand-header bind:this={headerEl}></brand-header>
  <main class="content">
    <h1>Svelte Demo</h1>
    <p>
      This app uses <code>brand-shell/web</code> and the shared contract from
      <code>examples/shared/brand-contract.json</code>.
    </p>
  </main>
  <brand-footer bind:this={footerEl}></brand-footer>
</div>

<style>
  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .content {
    flex: 1;
    max-width: 72rem;
    width: 100%;
    margin: 0 auto;
    padding: 2rem 1rem;
    box-sizing: border-box;
  }

  h1 {
    margin-top: 0;
  }
</style>
