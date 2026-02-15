import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/demo-fixtures.test.ts"],
    environment: "node",
  },
});
