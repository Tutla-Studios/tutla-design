---
title: "Reveal"
summary: "Convenience wrapper that renders an element with the `reveal` class (and an optional stagger)."
created: "2026-07-06"
updated: "2026-07-06"
isdoc: true
---

# Reveal

`Animations` · import from `@tutla/design`

Convenience wrapper that renders an element with the `reveal` class (and an
optional stagger). Call `useReveal()` once near the page root to drive it.

```tsx
useReveal();
<Reveal delay={2}>…</Reveal>
```

```ts
import { Reveal } from "@tutla/design";
```

## `RevealProps` props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |
| `delay` | `1 \| 2 \| 3 \| 4` |  | Stagger step 1–4, mapped to the `data-d` transition delays. |
| `as` | `keyof React.JSX.IntrinsicElements` |  |  |
| `className` | `string` |  |  |
| `style` | `React.CSSProperties` |  |  |
