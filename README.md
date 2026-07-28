# solid-reusable

SolidJS **1.9** component system (prep for **2.0**). Headless via **Zag.js** (pluggable). **Tailwind CSS v4**. Distributed as a **shadcn-compatible registry**.

## Packages

| Package | Role |
|---|---|
| `@solid-reusable/core` | `cn`, shared types |
| `@solid-reusable/provider` | Headless provider interface |
| `@solid-reusable/provider-zag` | Zag provider meta (pluggable) |
| `@solid-reusable/ui` | Public comps (re-exports `@/registry/warsaw`) |
| `registry/warsaw` | Style source (`@/registry/warsaw/...`) |
| `apps/playground` | Vite demos + serves `/r/*.json` |

## Patterns

**Zag (stateful)** — call `createX()` **inside** a component (uses `useMachine`):

```tsx
import { createTooltip } from "@components/ui/tooltip"

const tooltip = createTooltip({ openDelay: 200 })

return (
  <tooltip.Root>
    <tooltip.Trigger>Hover</tooltip.Trigger>
    <tooltip.Content>Hi</tooltip.Content>
  </tooltip.Root>
)
```

Each Zag file is **hand-written** under `registry/warsaw/ui` (`useMachine` + `Dynamic` parts). Overlay `Content` includes `Show` + positioner.

**Plain (no state machine)** — normal export, **no** `createX`:

```tsx
import { Button, Badge, Card } from "@solid-reusable/ui"

<Button>Save</Button>
```

## Develop

```bash
pnpm install
pnpm build:registry
pnpm dev
```

Edit comps in `registry/warsaw/` by hand. Then `pnpm build:registry`.

### TS aliases

| Alias | Resolves to |
|---|---|
| `@/registry/*` | `registry/*` |
| `@components/*` | `registry/warsaw/*` |
| `@solid-reusable/*` | `packages/*/src` |

Root `tsconfig.json` + Vite `resolve.alias` stay in sync. `solid-js` / `@zag-js/solid` are workspace peer/dev deps; machine packages live on `@solid-reusable/ui`.

## Registry (shadcn CLI)

Playground serves registry at `http://localhost:5173/r/{name}.json`.

```bash
# list
pnpm dlx shadcn@latest list http://localhost:5173/r/registry.json

# add one
pnpm dlx shadcn@latest add http://localhost:5173/r/button.json
pnpm dlx shadcn@latest add http://localhost:5173/r/tooltip.json

# namespace (see components.json)
pnpm dlx shadcn@latest add @solid-reusable/dialog
```

Rebuild registry after component changes: `pnpm build:registry`.

## Solid 2.0 prep

- Peer: `solid-js ^1.9.0` (widen to `^1.9.0 \|\| ^2.0.0` when stable)
- Callback refs / no deprecated JSX APIs
- See `SOLID_VERSION_TARGET` in `@solid-reusable/core`

## Provider swap

UI compounds depend on `@solid-reusable/provider-zag` today. Future Kobalte (etc.) implements the same part surface; point UI factories at the new adapter.
