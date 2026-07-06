---
title: "useMagnetic"
summary: "Magnetic hover: the element drifts toward the pointer while hovered and springs back on leave."
created: "2026-07-06"
updated: "2026-07-06"
isdoc: true
---

# useMagnetic

`Animations` · import from `@tutla/design`

Magnetic hover: the element drifts toward the pointer while hovered and
springs back on leave. Attach the returned ref. No-ops under reduced motion.
Powers the magnetic buttons in the system.

```ts
import { useMagnetic } from "@tutla/design";
```

## `UseMagneticOptions` props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `strength` | `number` |  | Pull strength as a fraction of pointer distance from centre. |
| `enabled` | `boolean` |  |  |
