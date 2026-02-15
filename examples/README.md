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
bun run demo:dev:vue
bun run demo:dev:svelte
```

4. Build all demos from repo root:

```bash
bun run demo:build:all
```

You can still run demos directly from each demo folder:

```bash
cd examples/<demo-folder>
bun install
bun run dev
```

## Demos

- `examples/react-vite`
- `examples/vue-vite`
- `examples/svelte-vite`
