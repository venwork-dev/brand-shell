const { execSync } = require("node:child_process");

const ALLOWED_ROOT_FILES = new Set(["package.json", "README.md", "LICENSE"]);
const DIST_PREFIX = "dist/";
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
  (file) => !file.startsWith(DIST_PREFIX) && !ALLOWED_ROOT_FILES.has(file),
);

if (disallowedFiles.length > 0) {
  throw new Error(
    `Pack check failed. Disallowed published files:\n${disallowedFiles
      .map((file) => `- ${file}`)
      .join("\n")}`,
  );
}

const sizeMatch = /Unpacked size:\s+([\d.]+)KB/.exec(output);
if (!sizeMatch) {
  throw new Error("Pack check failed. Could not determine unpacked package size.");
}

const unpackedSizeKb = Number(sizeMatch[1]);
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
