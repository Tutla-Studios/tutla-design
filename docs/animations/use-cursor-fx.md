---
title: "useCursorFX"
summary: "Custom cursor: a gold dot that tracks the pointer exactly plus a trailing ring that eases behind it and swells ('hot') over interactive elements (`a`, `button`, `.chip-item`)."
created: "2026-07-06"
updated: "2026-07-06"
isdoc: true
---

# useCursorFX

`Animations` · import from `@tutla/design`

Custom cursor: a gold dot that tracks the pointer exactly plus a trailing
ring that eases behind it and swells ("hot") over interactive elements
(`a`, `button`, `.chip-item`). Disabled on coarse pointers and under reduced
motion. Injects `.cursor-dot` / `.cursor-ring` elements — styles live in
`animations.css`.

```ts
import { useCursorFX } from "@tutla/design";
```
