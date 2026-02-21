---
"brand-shell": minor
---

Export `validateBrandDetails` and `validateBrandTheme` from `brand-shell/vue` and `brand-shell/web`.

Previously these were only available from the `brand-shell` root, which is the React bundle. Non-React consumers (Vue, Svelte, web components) that imported validation functions from the root would cause Vite to load the React adapter and fail with a `react/jsx-runtime` error.

**Migration for Vue/Svelte/web-component apps:**

```diff
- import { validateBrandDetails, validateBrandTheme } from 'brand-shell'
+ import { validateBrandDetails, validateBrandTheme } from 'brand-shell/vue'   // Vue
+ import { validateBrandDetails, validateBrandTheme } from 'brand-shell/web'   // Svelte / vanilla
```
