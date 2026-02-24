const { execSync } = require("node:child_process");

const ALLOWED_ROOT_FILES = new Set(["package.json", "README.md", "LICENSE"]);
const ALLOWED_PREFIXES = ["dist/", "src/svelte/"];
const MAX_UNPACKED_SIZE_KB = 220;

const output = execSync("bun pm pack --dry-run --ignore-scripts", {
  encoding: "utf8",
});

const packedLines = output
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line.startsWith("packed "));

const files = packedLines
  .map((line) => {
    const match = /^packed\s+\S+\s+(.+)$/.exec(line);
    return match ? match[1] : null;
  })
  .filter((file) => Boolean(file));

const disallowedFiles = files.filter(
  (file) => !ALLOWED_PREFIXES.some((prefix) => file.startsWith(prefix)) && !ALLOWED_ROOT_FILES.has(file),
);

if (disallowedFiles.length > 0) {
  throw new Error(
    `Pack check failed. Disallowed published files:\n${disallowedFiles
      .map((file) => `- ${file}`)
      .join("\n")}`,
  );
}

const sizeMatch = /Unpacked size:\s+([\d.]+)(KB|MB)/.exec(output);
if (!sizeMatch) {
  throw new Error("Pack check failed. Could not determine unpacked package size.");
}

const rawSize = Number(sizeMatch[1]);
const unit = sizeMatch[2];
const unpackedSizeKb = unit === "MB" ? Math.round(rawSize * 1024) : rawSize;
if (!Number.isFinite(unpackedSizeKb)) {
  throw new Error("Pack check failed. Parsed unpacked package size is not a valid number.");
}

if (unpackedSizeKb > MAX_UNPACKED_SIZE_KB) {
  throw new Error(
    `Pack check failed. Unpacked package size ${unpackedSizeKb}KB exceeds ${MAX_UNPACKED_SIZE_KB}KB.`,
  );
}

process.stdout.write(
  `Pack check passed (${unpackedSizeKb}KB <= ${MAX_UNPACKED_SIZE_KB}KB, ${files.length} files).\n`,
);
