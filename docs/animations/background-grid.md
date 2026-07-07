---
title: "BackgroundGrid"
summary: "Fixed, faint gold grid that fades out toward the bottom (radial mask)."
created: "2026-07-07"
updated: "2026-07-07"
isdoc: true
---

# BackgroundGrid

`Animations` · import from `@tutla/design`

Fixed, faint gold grid that fades out toward the bottom (radial mask).
Purely decorative and non-interactive. Sits at z-index 0 — keep page content
at z-index >= 1. Styling lives in `animations.css` under `.bg-grid`.

```ts
import { BackgroundGrid } from "@tutla/design";
```

## `BackgroundGridProps` props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `style` | `React.CSSProperties` |  |  |
| `className` | `string` |  |  |
