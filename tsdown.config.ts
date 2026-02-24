import { defineConfig } from "tsdown";
import type { Plugin } from "rolldown";

/**
 * Rolldown plugin that prepends "use client" to the React entry chunk
 * (index.mjs) so Next.js App Router treats it as a Client Component boundary.
 * All other chunks (web, vue, svelte) are left untouched.
 */
function useClientPlugin(): Plugin {
  return {
    name: "brand-shell:use-client",
    renderChunk(code, chunk) {
      if (chunk.fileName === "index.mjs") {
        return { code: `"use client";\n${code}` };
      }
    },
  };
}

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
  plugins: [useClientPlugin()],
});
