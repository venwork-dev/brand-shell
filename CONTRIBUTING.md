# Contributing

Thanks for contributing to Brand Shell.

## Prerequisites

- Bun `1.3.x`
- Node.js `24.x` (for CI parity)

## Local Setup

```bash
bun install --frozen-lockfile
```

## Common Commands

```bash
bun run build
bun run test
bun run test:smoke
bun run check
bun run storybook
bun run docs:dev
```

Consumer demo helpers:

```bash
bun run demo:setup
bun run demo:build:all
bun run demo:dev:react
bun run demo:dev:next
bun run demo:dev:tanstack
bun run demo:dev:vue
bun run demo:dev:svelte
```

## Commit and Version Policy

This repo enforces Conventional Commits and Changesets in CI.

- Every PR must include at least one `.changeset/*.md` file for `brand-shell`.
- Minimum bump is `patch`.
- `feat(...)` commits require at least `minor`.
- `fix(...)`, `perf(...)`, and `refactor(...)` require at least `patch`.
- `BREAKING CHANGE:` or `type!:` requires `major`.

Create a changeset:

```bash
bun run changeset
```

## Release Flow

Release is automated through GitHub Actions.

1. Merge feature PRs into `main`.
2. Release workflow creates/updates a bot release PR with version bumps.
3. Merge the release PR.
4. Release workflow publishes to npm.

## CI Workflows

- `/Users/mounikathota/brand-shell/.github/workflows/ci.yml`: PR checks (commit policy, reusable verify, conditional Chromatic)
- `/Users/mounikathota/brand-shell/.github/workflows/verify.yml`: reusable quality/docs/consumer matrix gate
- `/Users/mounikathota/brand-shell/.github/workflows/release.yml`: main-branch release PR + npm publish

## NPM Publish Notes

- Use repository secret `NPM_TOKEN`.
- Token must support publish and bypass 2FA for automation.
- Release workflow verifies `npm whoami` before publish.

## Pull Request Checklist

- Keep API and schema changes intentional and documented.
- Add/update tests when behavior changes.
- Add a changeset matching intended SemVer impact.
- Ensure `bun run check` passes locally before requesting review.
