---
title: "useTypewriter"
summary: "Cycling typewriter effect."
created: "2026-07-06"
updated: "2026-07-06"
isdoc: true
---

# useTypewriter

`Animations` · import from `@tutla/design`

Cycling typewriter effect. Types each string, pauses, deletes, then advances
to the next — looping forever. Returns the currently-visible substring so you
can render it next to a `.cursor-blink`. Under reduced motion it simply shows
the first string.

```tsx
const typed = useTypewriter(["for Linux.", "for Discord."]);
```

```ts
import { useTypewriter } from "@tutla/design";
```
