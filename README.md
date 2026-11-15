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

## Building a single HTML file

To ship the app as one self-contained `index.html` (JS, compiled Tailwind CSS and fonts all
inlined; opens straight from disk via `file://`, e.g. for a report), add
[`vite-plugin-singlefile`](https://github.com/richardtallent/vite-plugin-singlefile):

```bash
npm install -D vite-plugin-singlefile
```

```ts title="vite.config.ts"
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  // ...
  plugins: lazyPlugins(() => [react(), tailwindcss(), viteSingleFile()]),
});
```

`npm run build` then emits a single `dist/index.html` (~520 kB with React, Base UI and the Geist
font; the font alone is ~100 kB, drop it from `src/index.css` to shrink the file).

Notes:

- The page still needs JavaScript, so it won't work as an email body; send it as an attachment or link.
- Production errors are minified (e.g. `Base UI error #31`). Reproduce with `npm run dev` to see the
  full message.

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
