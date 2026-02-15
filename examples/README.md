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

2. For any demo, install dependencies and run dev server:

```bash
cd examples/<demo-folder>
bun install
bun run dev
```

## Demos

- `examples/react-vite`
- `examples/vue-vite`
- `examples/svelte-vite`
