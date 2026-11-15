# starter

React + TypeScript starter on [Vite+](https://viteplus.dev) (Vite, Rolldown, Vitest, Oxlint, Oxfmt).

## Scripts

| Command         | What it does                             |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Start the dev server                     |
| `npm run build` | Production build                         |
| `npm run check` | Format check, lint and type check        |
| `npm run fix`   | Same as `check`, auto-fixing what it can |
| `npm test`      | Run tests with Vitest                    |

## Adding shadcn/ui components

shadcn/ui is already initialized (`components.json`). Add components with the CLI, then run
`npm run fix`, because the generated files don't match the project's Oxfmt style and `npm run check`
(and CI) would fail:

```bash
npx shadcn@latest add button
npm run fix
```

## Dependency updates

Dependabot updates everything except the Vite+ toolchain (`vite-plus`, the `vite` alias, `vitest`),
because Dependabot cannot keep the `overrides` pins in sync.

To upgrade Vite+, install the current lockfile first (the migrator reads it), then run the
latest migrator. It re-pins `vite-plus` and the `vite` → `@voidzero-dev/vite-plus-core`
alias together:

```bash
npm ci
npx --package=vite-plus@latest vp migrate --no-interactive
npm run check && npm test && npm run build
```

Afterwards, make sure no `devEngines` block was added to `package.json`.
