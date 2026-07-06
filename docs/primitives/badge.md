---
title: "Badge"
summary: "Tiny uppercase pill label."
created: "2026-07-06"
updated: "2026-07-06"
isdoc: true
---

# Badge

`Primitives` · import from `@tutla/design`

Tiny uppercase pill label. Solid gold, or an accent-tinted outline.

```ts
import { Badge } from "@tutla/design";
```

## `BadgeProps` props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |
| `variant` | `"gold" \| "outline"` |  |  |
| `accent` | `ProjectAccent \| null` |  | Project accent for the outline variant (violet, green, red, …). |
| `style` | `React.CSSProperties` |  |  |
