---
title: "ColorPicker"
summary: "Colour swatch + hex readout that opens the native picker, with optional preset chips."
created: "2026-07-07"
updated: "2026-07-07"
isdoc: true
---

# ColorPicker

`Components` · import from `@tutla/design`

Colour swatch + hex readout that opens the native picker, with optional preset chips.

```ts
import { ColorPicker } from "@tutla/design";
```

## `ColorPickerProps` props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | `string` |  |  |
| `defaultValue` | `string` |  |  |
| `onChange` | `(value: string) => void` |  |  |
| `label` | `string \| null` |  |  |
| `hint` | `string \| null` |  |  |
| `presets` | `string[] \| null` |  |  |
| `state` | `FieldState` |  |  |
| `disabled` | `boolean` |  |  |
| `id` | `string` |  |  |
| `style` | `React.CSSProperties` |  |  |
| `className` | `string` |  |  |
