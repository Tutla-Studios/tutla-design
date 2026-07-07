---
title: "Input"
summary: "Text input with label, hint, prefix/suffix slots and success/warning/error states."
created: "2026-07-07"
updated: "2026-07-07"
isdoc: true
---

# Input

`Primitives` · import from `@tutla/design`

Text input with label, hint, prefix/suffix slots and success/warning/error states.

```ts
import { Input } from "@tutla/design";
```

## `InputProps` props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `label` | `string \| null` |  |  |
| `hint` | `string \| null` |  |  |
| `prefix` | `React.ReactNode` |  |  |
| `suffix` | `React.ReactNode` |  |  |
| `state` | `FieldState` |  |  |
| `style` | `React.CSSProperties` |  |  |
| `inputStyle` | `React.CSSProperties` |  |  |

## Types

- `FieldState` = `"default" \| "success" \| "warning" \| "error"`
