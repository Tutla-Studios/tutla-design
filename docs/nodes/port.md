---
title: "Port"
summary: "A typed input/output socket for a `Node`."
created: "2026-07-06"
updated: "2026-07-06"
isdoc: true
---

# Port

`Nodes` · import from `@tutla/design`

A typed input/output socket for a `Node`. The `id` is the anchor a `Wire` connects to.

```ts
import { Port } from "@tutla/design";
```

## `PortProps` props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `side` | `PortSide` |  |  |
| `type` | `PortType` |  |  |
| `label` | `string` | yes |  |
| `id` | `string` |  |  |
| `connected` | `boolean` |  |  |
| `onPointerDown` | `React.PointerEventHandler<HTMLSpanElement>` |  |  |
| `style` | `React.CSSProperties` |  |  |

## Types

- `PortSide` = `"in" \| "out"`
- `PortType` = `"event" \| "string" \| "number" \| "boolean" \| "any"`
