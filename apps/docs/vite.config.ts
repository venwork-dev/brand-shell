import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const docsRoot = fileURLToPath(new URL(".", import.meta.url));
const repoRoot = fileURLToPath(new URL("../..", import.meta.url));
const distRoot = fileURLToPath(new URL("../../dist", import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "brand-shell/schema", replacement: `${distRoot}/brand-shell.schema.json` },
      { find: "brand-shell/schema.json", replacement: `${distRoot}/brand-shell.schema.json` },
      { find: "brand-shell/web", replacement: `${distRoot}/web.mjs` },
      { find: "brand-shell/vue", replacement: `${distRoot}/vue.mjs` },
      { find: "brand-shell/svelte", replacement: `${distRoot}/svelte.mjs` },
      { find: "brand-shell/default.css", replacement: `${distRoot}/default.css` },
      { find: "brand-shell", replacement: `${distRoot}/index.mjs` },
    ],
  },
  server: {
    fs: {
      allow: [docsRoot, repoRoot],
    },
  },
});
