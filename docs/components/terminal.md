---
title: "Terminal"
summary: "Faux terminal window with traffic-light chrome and a monospace body."
created: "2026-07-06"
updated: "2026-07-06"
isdoc: true
---

# Terminal

`Components` · import from `@tutla/design`

Faux terminal window with traffic-light chrome and a monospace body.
Combine with the `.t-g` / `.t-b` / `.t-cursor` classes (in `animations.css`)
for syntax colouring inside `html`.

```ts
import { Terminal } from "@tutla/design";
```

## `TerminalProps` props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `title` | `string` |  |  |
| `lines` | `string[] \| null` |  |  |
| `html` | `string \| null` |  | Pre-rendered HTML (e.g. with `.t-g` / `.t-b` syntax spans). Takes precedence over `lines`. |
| `style` | `React.CSSProperties` |  |  |
