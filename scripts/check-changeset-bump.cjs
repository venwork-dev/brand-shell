const { execSync } = require("node:child_process");
const { existsSync, readFileSync } = require("node:fs");
const path = require("node:path");

const BUMP_RANK = {
  none: 0,
  patch: 1,
  minor: 2,
  major: 3,
};

const [from, to] = process.argv.slice(2);

if (!from || !to) {
  console.error("Usage: node scripts/check-changeset-bump.cjs <from-sha> <to-sha>");
  process.exit(1);
}

const commitText = execSync(`git log --format=%s%n%b%x1e ${from}..${to}`, {
  encoding: "utf8",
}).trim();

const commits = commitText
  .split("\x1e")
  .map((entry) => entry.trim())
  .filter(Boolean);

let requiredRank = BUMP_RANK.none;
let requiredReason = "no version-impacting commit intent found";

for (const entry of commits) {
  const [subject, ...bodyLines] = entry.split("\n");
  const body = bodyLines.join("\n");
  const isBreaking = /BREAKING CHANGE:/i.test(body) || /^[a-z]+(?:\([^)]+\))?!:/.test(subject);

  if (isBreaking) {
    requiredRank = BUMP_RANK.major;
    requiredReason = `breaking change found in commit subject/body: "${subject}"`;
    break;
  }

  const typeMatch = /^([a-z]+)(?:\([^)]+\))?:/.exec(subject);
  if (!typeMatch) continue;

  const type = typeMatch[1];
  if (type === "feat" && requiredRank < BUMP_RANK.minor) {
    requiredRank = BUMP_RANK.minor;
    requiredReason = `feature commit found: "${subject}"`;
    continue;
  }
  if ((type === "fix" || type === "perf" || type === "refactor") && requiredRank < BUMP_RANK.patch) {
    requiredRank = BUMP_RANK.patch;
    requiredReason = `${type} commit found: "${subject}"`;
  }
}

if (requiredRank === BUMP_RANK.none) {
  console.log("No feat/fix/perf/refactor/breaking commit intent detected; no bump enforcement required.");
  process.exit(0);
}

const changedFiles = execSync(`git diff --name-only ${from}..${to}`, {
  encoding: "utf8",
})
  .trim()
  .split("\n")
  .map((file) => file.trim())
  .filter(Boolean);

const changesetFiles = changedFiles.filter((file) => file.startsWith(".changeset/") && file.endsWith(".md"));
const changesetFilesForBump = changesetFiles.filter((file) => path.basename(file) !== "README.md");

if (changesetFilesForBump.length === 0) {
  console.error(
    `Changeset required (${requiredReason}) but no changeset files were changed in this PR. Run: bun run changeset`,
  );
  process.exit(1);
}

let actualRank = BUMP_RANK.none;
let actualLabel = "none";

for (const file of changesetFilesForBump) {
  const fullPath = path.join(process.cwd(), file);
  if (!existsSync(fullPath)) {
    continue;
  }
  const content = readFileSync(fullPath, "utf8");
  const frontmatterMatch = /^---\n([\s\S]*?)\n---/m.exec(content);
  if (!frontmatterMatch) continue;

  const frontmatter = frontmatterMatch[1];
  const pkgMatch = /["']?brand-shell["']?\s*:\s*(patch|minor|major)\b/i.exec(frontmatter);
  if (!pkgMatch) continue;

  const bump = pkgMatch[1].toLowerCase();
  const rank = BUMP_RANK[bump];
  if (rank > actualRank) {
    actualRank = rank;
    actualLabel = bump;
  }
}

if (actualRank < requiredRank) {
  const requiredLabel = Object.keys(BUMP_RANK).find((label) => BUMP_RANK[label] === requiredRank) || "unknown";
  console.error(
    `Changeset bump too low. Required at least "${requiredLabel}" (${requiredReason}), found "${actualLabel}".`,
  );
  process.exit(1);
}

console.log(`Changeset bump policy passed. Required <= "${actualLabel}" (${requiredReason}).`);
