---
title: "Note"
summary: "Compact inline note / caption in a tinted box."
created: "2026-07-06"
updated: "2026-07-06"
isdoc: true
---

# Note

`Primitives` · import from `@tutla/design`

Compact inline note / caption in a tinted box. Lighter-weight than `Message`.
(From account.tutla.net's `Note`, retokenised with tone variants.)

```ts
import { Note } from "@tutla/design";
```

## `NoteProps` props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |
| `tone` | `"gold" \| "success" \| "warning" \| "error" \| "info"` |  | Tone of the note. |
| `style` | `React.CSSProperties` |  |  |
