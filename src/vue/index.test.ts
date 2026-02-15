import { beforeEach, describe, expect, it } from "vitest";
import { createApp, defineComponent, h, nextTick, reactive } from "vue";

import { BrandFooter, BrandHeader } from "./index";

describe("vue adapter smoke", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("renders and updates header/footer from typed props", async () => {
    const mountPoint = document.createElement("div");
    document.body.append(mountPoint);

    const state = reactive({
      details: {
        name: "Vue Brand",
        navLinks: [{ label: "Docs", href: "/docs" }],
        primaryAction: { label: "Contact", href: "mailto:hello@example.com" },
      },
      theme: {
        primaryColor: "#0ea5e9",
        backgroundColor: "#0f172a",
        textColor: "#f8fafc",
      },
    });

    const app = createApp(
      defineComponent({
        setup() {
          return () =>
            h("div", [
              h(BrandHeader, {
                details: state.details,
                theme: state.theme,
                shellClass: "vue-integration",
              }),
              h(BrandFooter, {
                details: state.details,
                theme: state.theme,
              }),
            ]);
        },
      }),
    );

    app.mount(mountPoint);
    await nextTick();

    const headerRoot = mountPoint.querySelector<HTMLElement>("header.brand-shell-header.vue-integration");
    const footerRoot = mountPoint.querySelector<HTMLElement>("footer.brand-shell-footer");

    expect(headerRoot).not.toBeNull();
    expect(headerRoot?.style.getPropertyValue("--brand-primary")).toBe("#0ea5e9");
    expect(headerRoot?.querySelector(".brand-shell-header__name")?.textContent).toBe("Vue Brand");
    expect(headerRoot?.querySelector(".brand-shell-header__link")?.getAttribute("href")).toBe("/docs");
    expect(footerRoot).not.toBeNull();
    expect(footerRoot?.querySelector(".brand-shell-footer__name")?.textContent).toBe("Vue Brand");

    state.details = {
      ...state.details,
      name: "Updated Vue Brand",
    };
    state.theme = {
      ...state.theme,
      primaryColor: "#22c55e",
    };
    await nextTick();

    const updatedHeaderRoot = mountPoint.querySelector<HTMLElement>("header.brand-shell-header.vue-integration");
    expect(updatedHeaderRoot?.style.getPropertyValue("--brand-primary")).toBe("#22c55e");
    expect(updatedHeaderRoot?.querySelector(".brand-shell-header__name")?.textContent).toBe("Updated Vue Brand");

    app.unmount();
  });
});
