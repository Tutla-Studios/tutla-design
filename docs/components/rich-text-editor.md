---
title: "RichTextEditor"
summary: "Lightweight WYSIWYG editor built on `contentEditable` — bold/italic/underline, code blocks, lists, links and clear-formatting."
created: "2026-07-06"
updated: "2026-07-06"
isdoc: true
---

# RichTextEditor

`Components` · import from `@tutla/design`

Lightweight WYSIWYG editor built on `contentEditable` — bold/italic/underline,
code blocks, lists, links and clear-formatting. Emits HTML via `onChange`.
A "primary" component: no native HTML equivalent.

```ts
import { RichTextEditor } from "@tutla/design";
```

## `RichTextEditorProps` props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `defaultValue` | `string` |  |  |
| `onChange` | `(html: string) => void` |  |  |
| `label` | `string \| null` |  |  |
| `placeholder` | `string` |  |  |
| `minHeight` | `number` |  |  |
| `state` | `FieldState` |  |  |
| `disabled` | `boolean` |  |  |
| `id` | `string` |  |  |
| `style` | `React.CSSProperties` |  |  |
