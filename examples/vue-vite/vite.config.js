import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const examplesRoot = fileURLToPath(new URL("..", import.meta.url));
const packageRoot = fileURLToPath(new URL("../..", import.meta.url));
const distRoot = fileURLToPath(new URL("../../dist", import.meta.url));

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag === "brand-header" || tag === "brand-footer",
        },
      },
    }),
  ],
  resolve: {
    alias: [
      { find: "brand-shell/web", replacement: `${distRoot}/web.mjs` },
      { find: "brand-shell/default.css", replacement: `${distRoot}/default.css` },
      { find: "brand-shell", replacement: `${distRoot}/index.mjs` },
    ],
  },
  server: {
    fs: {
      allow: [examplesRoot, packageRoot],
    },
  },
});
