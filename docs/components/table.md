---
title: "Table"
summary: "Data table with a bordered shell and optional caption."
created: "2026-07-06"
updated: "2026-07-06"
isdoc: true
---

# Table

`Components` · import from `@tutla/design`

Data table with a bordered shell and optional caption. Pass `columns` + `rows`
for a declarative table (with per-column `render`), or `children` for full control.

```ts
import { Table } from "@tutla/design";
```

## `TableColumn` props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `key` | `string` | yes |  |
| `label` | `string` | yes |  |
| `align` | `"left" \| "center" \| "right"` |  |  |
| `width` | `string` |  |  |
| `strong` | `boolean` |  |  |
| `nowrap` | `boolean` |  |  |
| `render` | `(row: Record<string, unknown>, index: number) => React.ReactNode` |  |  |

## `TableProps` props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `columns` | `TableColumn[] \| null` |  |  |
| `rows` | `Record<string, unknown>[] \| null` |  |  |
| `children` | `React.ReactNode` |  |  |
| `dense` | `boolean` |  |  |
| `caption` | `string \| null` |  |  |
| `style` | `React.CSSProperties` |  |  |
