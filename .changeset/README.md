# Changesets

This directory stores release notes and version bump intents.

## Add a changeset in a PR

```bash
bun run changeset
```

Choose the bump type:

- `patch` for bug fixes and non-breaking improvements
- `minor` for backward-compatible features
- `major` for breaking contract/API changes

Docs-only changes do not need a changeset.
