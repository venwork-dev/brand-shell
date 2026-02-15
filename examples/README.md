# Demo Consumers

Minimal framework demos that all use the same shared data contract.

## Shared contract

The shared details/theme contract lives in:

- `examples/shared/brand-contract.json`

## Prerequisites

1. Build the library from repo root so `dist/` is up to date:

```bash
bun run build
```

2. Install demo dependencies once:

```bash
bun run demo:setup
```

3. Run any demo from repo root:

```bash
bun run demo:dev:react
bun run demo:dev:next
bun run demo:dev:tanstack
bun run demo:dev:vue
bun run demo:dev:svelte
```

4. Build all demos from repo root:

```bash
bun run demo:build:all
```

5. Run smoke checks for all demo builds:

```bash
bun run test:smoke
```

You can still run demos directly from each demo folder:

```bash
cd examples/<demo-folder>
bun install
bun run dev
```

## Demos

- `examples/react-vite` uses `brand-shell` (React components)
- `examples/next-app` uses Next.js App Router + `brand-shell` (React components)
- `examples/tanstack-vite` uses TanStack Router + `brand-shell` (React components)
- `examples/vue-vite` uses `brand-shell/vue` (Vue adapter)
- `examples/svelte-vite` uses `brand-shell/svelte` (Svelte action adapter)
