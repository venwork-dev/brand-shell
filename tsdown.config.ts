import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    web: "src/web/index.ts",
    vue: "src/vue/index.ts",
    svelte: "src/svelte/index.ts",
  },
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "vue", "svelte"],
});
