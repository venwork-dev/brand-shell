import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

type DemoFixture = {
  distDir: string;
  heading: string;
  name: string;
  rootId: string;
};

const fixtures: DemoFixture[] = [
  {
    name: "react",
    distDir: "examples/react-vite/dist",
    heading: "React Demo",
    rootId: "root",
  },
  {
    name: "vue",
    distDir: "examples/vue-vite/dist",
    heading: "Vue Demo",
    rootId: "app",
  },
  {
    name: "svelte",
    distDir: "examples/svelte-vite/dist",
    heading: "Svelte Demo",
    rootId: "app",
  },
  {
    name: "tanstack",
    distDir: "examples/tanstack-vite/dist",
    heading: "TanStack Demo",
    rootId: "root",
  },
];

const consumerFilter = process.env.DEMO_SMOKE_CONSUMER?.trim();
const supportedConsumers = [...fixtures.map((fixture) => fixture.name), "next"];

if (consumerFilter && !supportedConsumers.includes(consumerFilter)) {
  throw new Error(
    `Unsupported DEMO_SMOKE_CONSUMER='${consumerFilter}'. Supported values: ${supportedConsumers.join(", ")}`,
  );
}

const fixturesToTest = consumerFilter
  ? fixtures.filter((fixture) => fixture.name === consumerFilter)
  : fixtures;
const shouldCheckNextBuild = !consumerFilter || consumerFilter === "next";

function readAssets(assetsDir: string, extension: ".css" | ".js"): string {
  const files = readdirSync(assetsDir).filter((file: string) => file.endsWith(extension));
  if (files.length === 0) {
    throw new Error(`Expected at least one ${extension} asset in ${assetsDir}`);
  }

  return files
    .map((file: string) => readFileSync(path.join(assetsDir, file), "utf8"))
    .join("\n");
}

describe("demo fixtures smoke", () => {
  for (const fixture of fixturesToTest) {
    it(`${fixture.name} build contains rendered app output and shared shell styles`, () => {
      const distDir = path.join(rootDir, fixture.distDir);
      const indexPath = path.join(distDir, "index.html");
      const assetsDir = path.join(distDir, "assets");

      if (!existsSync(indexPath)) {
        throw new Error(`Missing ${indexPath}. Run 'bun run demo:build:${fixture.name}' first.`);
      }

      const indexHtml = readFileSync(indexPath, "utf8");
      expect(indexHtml).toContain(`id="${fixture.rootId}"`);
      expect(indexHtml).toMatch(/assets\/.*\.js/);
      expect(indexHtml).toMatch(/assets\/.*\.css/);

      const jsBundle = readAssets(assetsDir, ".js");
      const cssBundle = readAssets(assetsDir, ".css");

      expect(jsBundle).toContain(fixture.heading);
      expect(cssBundle).toContain(".brand-shell-header");
      expect(cssBundle).toContain(".brand-shell-footer");
    });
  }

  if (shouldCheckNextBuild) {
    it("next build output contains app route manifests", () => {
      const nextRoot = path.join(rootDir, "examples/next-app/.next");
      const buildIdPath = path.join(nextRoot, "BUILD_ID");
      const appPathsManifestPath = path.join(nextRoot, "server", "app-paths-manifest.json");

      if (!existsSync(buildIdPath)) {
        throw new Error(`Missing ${buildIdPath}. Run 'bun run demo:build:next' first.`);
      }
      if (!existsSync(appPathsManifestPath)) {
        throw new Error(`Missing ${appPathsManifestPath}. Run 'bun run demo:build:next' first.`);
      }

      const manifest = JSON.parse(readFileSync(appPathsManifestPath, "utf8")) as Record<string, string>;
      expect(Object.keys(manifest)).toContain("/page");
    });
  }
});
