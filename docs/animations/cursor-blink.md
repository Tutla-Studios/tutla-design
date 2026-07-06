---
title: "CursorBlink"
summary: "A blinking terminal caret."
created: "2026-07-06"
updated: "2026-07-06"
isdoc: true
---

# CursorBlink

`Animations` · import from `@tutla/design`

A blinking terminal caret. Render inline right after text (e.g. a
`useTypewriter` value) for the classic hacker prompt look. Styling lives in
`animations.css` under `.cursor-blink`.

```ts
import { CursorBlink } from "@tutla/design";
```

## `CursorBlinkProps` props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `style` | `React.CSSProperties` |  |  |
| `className` | `string` |  |  |
