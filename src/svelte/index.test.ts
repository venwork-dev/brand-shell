import { beforeEach, describe, expect, it } from "vitest";

import { brandShell, registerBrandShellSvelteElements } from "./index";

describe("svelte adapter smoke", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("applies and updates brand shell data with the svelte action", () => {
    registerBrandShellSvelteElements();

    const header = document.createElement("brand-header");
    document.body.append(header);

    const action = brandShell(header, {
      details: {
        name: "Svelte Brand",
        navLinks: [{ label: "Docs", href: "/docs" }],
      },
      theme: {
        primaryColor: "#f97316",
      },
    });

    let root = header.querySelector<HTMLElement>("header.brand-shell-header");
    expect(root).not.toBeNull();
    expect(root?.style.getPropertyValue("--brand-primary")).toBe("#f97316");
    expect(root?.querySelector(".brand-shell-header__name")?.textContent).toBe("Svelte Brand");
    expect(root?.querySelector(".brand-shell-header__link")?.getAttribute("href")).toBe("/docs");

    action?.update?.({
      details: {
        name: "Svelte Brand Updated",
      },
      theme: {
        primaryColor: "#14b8a6",
      },
      shellClass: "svelte-integration",
    });

    root = header.querySelector<HTMLElement>("header.brand-shell-header.svelte-integration");
    expect(root).not.toBeNull();
    expect(root?.style.getPropertyValue("--brand-primary")).toBe("#14b8a6");
    expect(root?.querySelector(".brand-shell-header__name")?.textContent).toBe("Svelte Brand Updated");
  });
});
