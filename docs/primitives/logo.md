---
title: "Logo"
summary: "Image logo that gracefully falls back to an icon when the src is missing or fails to load."
created: "2026-07-07"
updated: "2026-07-07"
isdoc: true
---

# Logo

`Primitives` · import from `@tutla/design`

Image logo that gracefully falls back to an icon when the src is missing or fails to load.

```ts
import { Logo } from "@tutla/design";
```

## `LogoProps` props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `src` | `string \| null` |  |  |
| `alt` | `string` |  |  |
| `fallbackIcon` | `React.ReactNode` |  |  |
| `size` | `number` |  |  |
| `style` | `React.CSSProperties` |  |  |
| `className` | `string` |  |  |
