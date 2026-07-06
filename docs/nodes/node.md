---
title: "Node"
summary: "Node-graph card: accent header, status pip, optional absolute positioning."
created: "2026-07-06"
updated: "2026-07-06"
isdoc: true
---

# Node

`Nodes` · import from `@tutla/design`

Node-graph card: accent header, status pip, optional absolute positioning. Compose with `Port` and `Wire`.

```ts
import { Node } from "@tutla/design";
```

## `NodeProps` props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `title` | `string` | yes |  |
| `subtitle` | `string \| null` |  |  |
| `accent` | `NodeAccent` |  |  |
| `selected` | `boolean` |  |  |
| `state` | `NodeState` |  |  |
| `children` | `React.ReactNode` |  |  |
| `headerActions` | `React.ReactNode` |  |  |
| `x` | `number \| null` |  |  |
| `y` | `number \| null` |  |  |
| `width` | `number` |  |  |
| `style` | `React.CSSProperties` |  |  |
| `onClick` | `() => void` |  |  |

## Types

- `NodeState` = `"running" \| "success" \| "warning" \| "error" \| null`
- `NodeAccent` = `"violet" \| "indigo" \| "green" \| "red" \| "cyan" \| "orange"`
