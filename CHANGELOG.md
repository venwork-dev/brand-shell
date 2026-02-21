# brand-shell

## 0.13.0

### Minor Changes

- eb56f86: Export `validateBrandDetails` and `validateBrandTheme` from `brand-shell/vue` and `brand-shell/web`.

  Previously these were only available from the `brand-shell` root, which is the React bundle. Non-React consumers (Vue, Svelte, web components) that imported validation functions from the root would cause Vite to load the React adapter and fail with a `react/jsx-runtime` error.

  **Migration for Vue/Svelte/web-component apps:**

  ```diff
  - import { validateBrandDetails, validateBrandTheme } from 'brand-shell'
  + import { validateBrandDetails, validateBrandTheme } from 'brand-shell/vue'   // Vue
  + import { validateBrandDetails, validateBrandTheme } from 'brand-shell/web'   // Svelte / vanilla
  ```

## 0.12.0

### Minor Changes

- 179f91f: architecture change to build artifacts and app build

## 0.11.0

### Minor Changes

- 07864c4: Expand release PR pack canary coverage to React, Vue, and Svelte npm starter apps.

## 0.10.0

### Minor Changes

- d2a9b0b: Reduce release cycle time by skipping full CI verification on Changesets-generated release PRs and relying on a targeted pack+starter canary gate.

## 0.9.0

### Minor Changes

- 8bac0ad: change the order of tarball installation and build

## 0.8.0

### Minor Changes

- cf46336: Replace dist-tag promotion with a deterministic release PR gate that packs the publish artifact and builds the starter app before publishing.

## 0.7.0

### Minor Changes

- a817136: user npm token for publish

## 0.6.0

### Minor Changes

- 269584e: Add two-stage npm release automation: publish to dist-tag next, validate via a starter app canary, then promote to latest.

## 0.5.0

### Minor Changes

- 02d7d5e: Switch npm release workflow to Trusted Publishing (OIDC) by removing token-based npm auth from GitHub Actions release job.

## 0.4.0

### Minor Changes

- 04f08f0: Refresh npm-facing docs by simplifying README, adding CONTRIBUTING guidance, and improving the docs webapp install quickstart.

## 0.3.0

### Minor Changes

- 6be1ffe: resubmit release version

## 0.2.0

### Minor Changes

- 3f52a07: Add release automation and enforce commit/changeset policy checks in CI.
- d6a5eaf: ci and release worklow refactor
- c3c583a: add release automation and commit policy checks

### Patch Changes

- 3f52a07: add min required bump version
