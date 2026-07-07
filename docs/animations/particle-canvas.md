---
title: "ParticleCanvas"
summary: "Fixed full-viewport constellation of drifting gold particles that connect with faint lines and gently repel from the pointer."
created: "2026-07-07"
updated: "2026-07-07"
isdoc: true
---

# ParticleCanvas

`Animations` · import from `@tutla/design`

Fixed full-viewport constellation of drifting gold particles that connect
with faint lines and gently repel from the pointer. Decorative background —
renders nothing under reduced motion. Keep at z-index 0.

```ts
import { ParticleCanvas } from "@tutla/design";
```

## `ParticleCanvasProps` props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `density` | `number` |  | Multiplier on the auto-computed particle count. |
| `className` | `string` |  |  |
| `style` | `React.CSSProperties` |  |  |
