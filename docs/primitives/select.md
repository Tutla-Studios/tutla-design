---
title: "Select"
summary: "Native `<select>` styled to match the system, with a custom caret."
created: "2026-07-07"
updated: "2026-07-07"
isdoc: true
---

# Select

`Primitives` · import from `@tutla/design`

Native `<select>` styled to match the system, with a custom caret.

```ts
import { Select } from "@tutla/design";
```

## `SelectProps` props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `options` | `SelectOption[]` |  |  |
| `label` | `string \| null` |  |  |
| `hint` | `string \| null` |  |  |
| `placeholder` | `string \| null` |  |  |
| `state` | `FieldState` |  |  |
| `style` | `React.CSSProperties` |  |  |
| `selectStyle` | `React.CSSProperties` |  |  |

## Types

- `SelectOption` = `string \| number \| { value: string \| number; label: string; disabled?: boolean }`
