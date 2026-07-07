---
title: "Wire"
summary: "Animated bezier connection between two `Port`s (by id) or two points, drawn as an SVG overlay inside `containerRef`."
created: "2026-07-07"
updated: "2026-07-07"
isdoc: true
---

# Wire

`Nodes` · import from `@tutla/design`

Animated bezier connection between two `Port`s (by id) or two points, drawn as
an SVG overlay inside `containerRef`. Recomputes on resize via `ResizeObserver`.

```ts
import { Wire } from "@tutla/design";
```

## `WirePoint` props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `x` | `number` | yes |  |
| `y` | `number` | yes |  |

## `WireProps` props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `from` | `string \| WirePoint` | yes | A `Port` id (string) or an explicit point. |
| `to` | `string \| WirePoint` | yes |  |
| `type` | `WireType` |  |  |
| `containerRef` | `React.RefObject<HTMLElement \| null>` | yes |  |
| `selected` | `boolean` |  |  |
| `animated` | `boolean` |  |  |
| `style` | `React.CSSProperties` |  |  |
| `className` | `string` |  |  |

## Types

- `WireType` = `"event" \| "string" \| "number" \| "boolean" \| "any"`
