import path from "node:path";
import { fileURLToPath } from "node:url";

const distRoot = fileURLToPath(new URL("../../dist", import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    externalDir: true,
  },
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      "brand-shell$": path.join(distRoot, "index.mjs"),
      "brand-shell/default.css$": path.join(distRoot, "default.css"),
      "brand-shell/web$": path.join(distRoot, "web.mjs"),
      "brand-shell/vue$": path.join(distRoot, "vue.mjs"),
      "brand-shell/svelte$": path.join(distRoot, "svelte.mjs"),
    };
    return config;
  },
};

export default nextConfig;
