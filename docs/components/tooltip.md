---
title: "Tooltip"
summary: "Fixed-positioned tooltip that follows its trigger on scroll/resize."
created: "2026-07-07"
updated: "2026-07-07"
isdoc: true
---

# Tooltip

`Components` · import from `@tutla/design`

Fixed-positioned tooltip that follows its trigger on scroll/resize. Hover + focus aware.

```ts
import { Tooltip } from "@tutla/design";
```

## `TooltipProps` props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactElement` | yes |  |
| `content` | `React.ReactNode` | yes |  |
| `side` | `TooltipSide` |  |  |
| `delay` | `number` |  |  |
| `state` | `TooltipState` |  |  |
| `style` | `React.CSSProperties` |  |  |
| `className` | `string` |  | Applied to the tooltip bubble element. |

## Types

- `TooltipSide` = `"top" \| "bottom" \| "left" \| "right"`
- `TooltipState` = `"default" \| "success" \| "warning" \| "error" \| "info"`
