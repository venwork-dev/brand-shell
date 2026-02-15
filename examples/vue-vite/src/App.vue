<script setup>
import { BrandFooter, BrandHeader } from "brand-shell/vue";
import "brand-shell/default.css";

import contract from "../../shared/brand-contract.json";

const { details, theme } = contract;
</script>

<template>
  <div class="app">
    <BrandHeader :details="details" :theme="theme" />
    <main class="content">
      <h1>Vue Demo</h1>
      <p>
        This app uses <code>brand-shell/vue</code> and the shared contract from
        <code>examples/shared/brand-contract.json</code>.
      </p>
    </main>
    <BrandFooter :details="details" :theme="theme" />
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
