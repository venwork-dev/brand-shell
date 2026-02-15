<script>
  import { brandShell } from "brand-shell/svelte";
  import "brand-shell/default.css";

  import contract from "../../shared/brand-contract.json";

  const shellProps = {
    details: contract.details,
    theme: contract.theme,
  };
</script>

<div class="demo-app">
  <brand-header use:brandShell={shellProps}></brand-header>
  <main class="demo-main demo-layout-main">
    <h1>Svelte Demo</h1>
    <p>
      This app uses <code>brand-shell/svelte</code> and the shared contract from
      <code>examples/shared/brand-contract.json</code>.
    </p>
  </main>
  <brand-footer use:brandShell={shellProps}></brand-footer>
</div>
