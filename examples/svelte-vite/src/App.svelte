<script>
  import { brandShell } from "brand-shell/svelte";
  import "brand-shell/default.css";

  import contract from "../../shared/brand-contract.json";

  const shellProps = {
    details: contract.details,
    theme: contract.theme,
  };
</script>

<div class="app">
  <brand-header use:brandShell={shellProps}></brand-header>
  <main class="content">
    <h1>Svelte Demo</h1>
    <p>
      This app uses <code>brand-shell/svelte</code> and the shared contract from
      <code>examples/shared/brand-contract.json</code>.
    </p>
  </main>
  <brand-footer use:brandShell={shellProps}></brand-footer>
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
