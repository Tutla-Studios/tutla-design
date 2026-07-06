# @tutla/design
The primary desing system for all (most) tutla projects. Everything is built on a single set of design tokens, so the website, the account dashboard and any future app share one visual language.



```bash
npm install @tutla/design
```

Then load the stylesheet **once** at your app root (it defines the CSS custom properties every component reads):

```ts
// app/layout.tsx  (or pages/_app.tsx)
import "@tutla/design/styles";
```

Because the package ships TypeScript source with `"use client"` directives intact, add it to `transpilePackages` so Next.js compiles it in-app:

```ts
// next.config.ts
export default { transpilePackages: ["@tutla/design"] };
```

---

## Architecture

The library is divided exactly along the four layers of the system:

```
@tutla/design
├── primitives/            base components with base styles
│   └── animations/        motion hooks & components (separate folder)
├── components/            primary components = primitives + animations
│   │                      + non-native elements (rich text editor, …)
│   └── nodes/             node-graph building blocks
├── styles/                the style system — all spacing/colours/type/motion
│   ├── tokens.css         ← single source of truth (CSS variables)
│   ├── base.css           document defaults, scrollbar, selection
│   └── animations.css     keyframes + animation classes
├── tokens                 the same token values as JS objects
└── tailwind-preset        Tailwind theme extension
```

### 1. Style system (`styles/`)

All colour, spacing, radius, typography and motion values live as CSS custom properties in **`tokens.css`** — the one place to change the look of everything.

| Import | What you get |
| --- | --- |
| `@tutla/design/styles` | tokens **+** base document styles **+** every animation class |
| `@tutla/design/styles/tokens.css` | just the `:root` variables |
| `@tutla/design/styles/animations.css` | just keyframes + animation classes |
| `@tutla/design/tokens` | the same values as JS objects (`colors`, `space`, `radius`, …) |
| `@tutla/design/tailwind-preset` | Tailwind theme extension (`tan-*`, `ink-*`, `shadow-lip`, `ease-spring`, …) |

```ts
// tailwind.config.ts
import tutlaPreset from "@tutla/design/tailwind-preset";
export default { presets: [tutlaPreset], content: ["./app/**/*.{ts,tsx}"] };
```

```ts
import { colors, space, radius } from "@tutla/design/tokens";
```

### 2. Primitives (`primitives/`)

Self-contained base building blocks, styled straight from the tokens.

`Button` (`AccentButton` / `GhostButton` aliases) · `Badge` · `Chip` · `Eyebrow` · `IconTile` · `Logo` · `Panel` · `SectionLabel` · `Note` · `Input` · `Textarea` · `Select` · `Code` · `Kbd` · `Blockquote`

```tsx
import { Button, Input, Badge } from "@tutla/design/primitives";

<Button variant="accent" href="/start">Get started</Button>
<Button variant="ghost" onClick={save}>Save</Button>
<Input label="Email" state="error" hint="Required" />
<Badge variant="outline" accent="green">stable</Badge>
```

### 3. Animations (`primitives/animations/`)

Motion, in its own folder as required. Every hook is reduced-motion aware.

**Hooks:** `useReveal` · `useTilt` · `useMagnetic` · `useTypewriter` · `useCursorFX`
**Components:** `Reveal` · `CursorFX` · `CursorBlink` · `BackgroundGrid` · `ParticleCanvas`

```tsx
import { useReveal, Reveal, CursorFX, BackgroundGrid } from "@tutla/design/animations";

function Page() {
  useReveal();               // drives every .reveal element
  return (
    <>
      <BackgroundGrid />
      <CursorFX />
      <Reveal delay={2}><h1>Hello</h1></Reveal>
    </>
  );
}
```

### 4. Primary components (`components/`)

Composites built from primitives + animations, plus elements with no native HTML equivalent.

`RichTextEditor` · `DatePicker` · `ColorPicker` · `Accordion` · `Message` · `Tooltip` · `ContextMenu` · `Table` · `Terminal` · `CredRow` · `CategoryBar` · `FeatureCard` · `FeatureRow` · `ProjectCard` · `Navbar` · `CTABanner` · node graph (`Node` · `Port` · `Wire`)

```tsx
import { RichTextEditor, ProjectCard, Navbar } from "@tutla/design/components";

<RichTextEditor label="Body" onChange={setHtml} />
<ProjectCard name="machiaOS" tag="Linux" accent="cyan" desc="…" features={["Wayland"]} />
```

---

## Import paths

| Path | Contents |
| --- | --- |
| `@tutla/design` | everything (primitives, animations, components, tokens, preset) |
| `@tutla/design/primitives` | base components + animations |
| `@tutla/design/animations` | motion hooks & components |
| `@tutla/design/components` | primary components + node graph |
| `@tutla/design/nodes` | node-graph components |
| `@tutla/design/tokens` | JS token objects |
| `@tutla/design/tailwind-preset` | Tailwind preset |
| `@tutla/design/styles` | full stylesheet |

## Development

```bash
npm run typecheck   # tsc --noEmit
npm run build       # optional bundle build (tsup → dist/) for non-TS consumers
```

Icons in examples (`react-icons`, `lucide-react`) are **not** bundled — pass any icon node you like as `icon` / `children`.

## Developer's Note

*These components were extracted from the websites using AI so expect a lot of it, too lazy to filter through it*

And once your done adding a component, update the README.