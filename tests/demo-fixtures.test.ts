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
];

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
  for (const fixture of fixtures) {
    it(`${fixture.name} build contains rendered app output and shared shell styles`, () => {
      const distDir = path.join(rootDir, fixture.distDir);
      const indexPath = path.join(distDir, "index.html");
      const assetsDir = path.join(distDir, "assets");

      if (!existsSync(indexPath)) {
        throw new Error(`Missing ${indexPath}. Run 'bun run demo:build:all' first.`);
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
});
