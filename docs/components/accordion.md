---
title: "Accordion"
summary: "Collapsible sections with animated height."
created: "2026-07-07"
updated: "2026-07-07"
isdoc: true
---

# Accordion

`Components` · import from `@tutla/design`

Collapsible sections with animated height. `single` closes siblings, `multi` allows many open.

```ts
import { Accordion } from "@tutla/design";
```

## AccordionItem

```ts
import { AccordionItem } from "@tutla/design";
```

## `AccordionItemData` props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | yes |  |
| `title` | `string` | yes |  |
| `content` | `React.ReactNode` | yes |  |
| `defaultOpen` | `boolean` |  |  |
| `icon` | `React.ReactNode` |  |  |

## `AccordionProps` props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | `AccordionItemData[] \| null` |  |  |
| `children` | `React.ReactNode` |  |  |
| `mode` | `"single" \| "multi"` |  |  |
| `style` | `React.CSSProperties` |  |  |
| `className` | `string` |  |  |

## `AccordionItemProps` props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `title` | `string` | yes |  |
| `icon` | `React.ReactNode` |  |  |
| `children` | `React.ReactNode` |  |  |
| `defaultOpen` | `boolean` |  |  |
| `isOpen` | `boolean` |  |  |
| `onToggle` | `() => void` |  |  |
| `style` | `React.CSSProperties` |  |  |
| `className` | `string` |  |  |
