<script setup>
import { BrandFooter, BrandHeader } from "brand-shell/vue";
import "brand-shell/default.css";

import contract from "../../shared/brand-contract.json";

const { details, theme } = contract;
</script>

<template>
  <div class="demo-app">
    <BrandHeader :details="details" :theme="theme" />
    <main class="demo-main demo-layout-main">
      <h1>Vue Demo</h1>
      <p>
        This app uses <code>brand-shell/vue</code> and the shared contract from
        <code>examples/shared/brand-contract.json</code>.
      </p>
    </main>
    <BrandFooter :details="details" :theme="theme" />
  </div>
</template>
