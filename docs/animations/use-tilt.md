---
title: "useTilt"
summary: "3D pointer-tilt for a card."
created: "2026-07-07"
updated: "2026-07-07"
isdoc: true
---

# useTilt

`Animations` · import from `@tutla/design`

3D pointer-tilt for a card. Attach the returned ref to the element. Any
descendant carrying a `data-depth="<px>"` attribute parallax-shifts by that
amount, giving a layered feel. No-ops under reduced motion.

```tsx
const ref = useTilt({ max: 9 });
<div ref={ref} style={{ transformStyle: "preserve-3d" }}>…</div>
```

```ts
import { useTilt } from "@tutla/design";
```

## `UseTiltOptions` props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `max` | `number` |  | Max rotation in degrees. |
| `scale` | `number` |  | Scale applied while hovering. |
| `enabled` | `boolean` |  |  |
