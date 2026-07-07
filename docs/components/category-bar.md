---
title: "CategoryBar"
summary: "Horizontal segmented filter — a row of pill buttons with one active."
created: "2026-07-07"
updated: "2026-07-07"
isdoc: true
---

# CategoryBar

`Components` · import from `@tutla/design`

Horizontal segmented filter — a row of pill buttons with one active.
(From account.tutla.net's `CategoryBar`, retokenised.)

```ts
import { CategoryBar } from "@tutla/design";
```

## `CategoryBarProps` props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `categories` | `string[]` | yes |  |
| `active` | `string` | yes |  |
| `onChange` | `(category: string) => void` | yes |  |
| `style` | `React.CSSProperties` |  |  |
| `className` | `string` |  |  |
