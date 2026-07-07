---
title: "ContextMenu"
summary: "Right-click menu that flips to stay on-screen."
created: "2026-07-07"
updated: "2026-07-07"
isdoc: true
---

# ContextMenu

`Components` · import from `@tutla/design`

Right-click menu that flips to stay on-screen. Supports labels, separators, shortcuts and danger items.

```ts
import { ContextMenu } from "@tutla/design";
```

## `ContextMenuItem` props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` |  |  |
| `type` | `"separator" \| "label"` |  |  |
| `label` | `string` |  |  |
| `icon` | `React.ReactNode` |  |  |
| `shortcut` | `string` |  |  |
| `onSelect` | `() => void` |  |  |
| `danger` | `boolean` |  |  |
| `disabled` | `boolean` |  |  |

## `ContextMenuProps` props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | `ContextMenuItem[]` |  |  |
| `children` | `React.ReactNode` | yes |  |
| `style` | `React.CSSProperties` |  |  |
| `className` | `string` |  | Applied to the popup menu element. |
