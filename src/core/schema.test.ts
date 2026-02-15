import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import Ajv2020 from "ajv/dist/2020";
import { describe, expect, it } from "vitest";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(dirname, "../..");
const schemaPath = path.join(rootDir, "schemas/brand-shell.schema.json");
const fixturePath = path.join(rootDir, "examples/shared/brand-contract.json");

const schema = JSON.parse(readFileSync(schemaPath, "utf8")) as object;
const fixture = JSON.parse(readFileSync(fixturePath, "utf8")) as object;

describe("brand-shell JSON schema (Ajv)", () => {
  it("compiles successfully", () => {
    const ajv = new Ajv2020({ allErrors: true, strict: false });
    const validate = ajv.compile(schema);
    expect(typeof validate).toBe("function");
  });

  it("accepts shared contract fixture", () => {
    const ajv = new Ajv2020({ allErrors: true, strict: false });
    const validate = ajv.compile(schema);

    const valid = validate(fixture);
    expect(valid, JSON.stringify(validate.errors, null, 2)).toBe(true);
  });

  it("rejects invalid payloads with actionable errors", () => {
    const ajv = new Ajv2020({ allErrors: true, strict: false });
    const validate = ajv.compile(schema);

    const invalidPayload = {
      details: {
        name: "Brand Shell",
        navLinks: [{ label: "Docs", href: "/docs", target: "_new-tab" }],
        unknownField: "unexpected",
      },
      theme: {
        primaryColor: "",
        customToken: "#fff",
      },
    };

    const valid = validate(invalidPayload);
    expect(valid).toBe(false);

    const errorText = (validate.errors ?? [])
      .map((error) => `${error.instancePath || "/"} ${error.message}`)
      .join("\n");

    expect(errorText).toContain("must be equal to one of the allowed values");
    expect(errorText).toContain("must NOT have additional properties");
    expect(errorText).toContain("must NOT have fewer than 1 characters");
  });
});
