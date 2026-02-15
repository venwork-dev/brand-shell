<script setup>
import { onMounted, ref } from "vue";
import { applyBrandShellProps, registerBrandShellElements } from "brand-shell/web";
import "brand-shell/default.css";

import contract from "../../shared/brand-contract.json";

registerBrandShellElements();

const headerEl = ref(null);
const footerEl = ref(null);

onMounted(() => {
  applyBrandShellProps(headerEl.value, {
    details: contract.details,
    theme: contract.theme,
  });
  applyBrandShellProps(footerEl.value, {
    details: contract.details,
    theme: contract.theme,
  });
});
</script>

<template>
  <div class="app">
    <brand-header ref="headerEl" />
    <main class="content">
      <h1>Vue Demo</h1>
      <p>
        This app uses <code>brand-shell/web</code> and the shared contract from
        <code>examples/shared/brand-contract.json</code>.
      </p>
    </main>
    <brand-footer ref="footerEl" />
  </div>
</template>

<style scoped>
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
