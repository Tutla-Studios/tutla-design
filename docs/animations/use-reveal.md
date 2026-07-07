---
title: "useReveal"
summary: "Scroll-reveal driver."
created: "2026-07-07"
updated: "2026-07-07"
isdoc: true
---

# useReveal

`Animations` · import from `@tutla/design`

Scroll-reveal driver. Add `className="reveal"` (optionally with
`data-d="1..4"` for stagger) to any element, then call `useReveal()` once
near the root of the page. Elements fade + rise in as they enter the
viewport. Falls back to instantly-visible when motion is reduced or when a
transition-support probe fails.

Requires `@tutla/design/styles` (or at least `animations.css`) to be loaded.

```ts
import { useReveal } from "@tutla/design";
```
