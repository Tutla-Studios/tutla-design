---
title: "Message"
summary: "Inline alert / callout with icon, title, body, actions and optional dismiss."
created: "2026-07-07"
updated: "2026-07-07"
isdoc: true
---

# Message

`Components` · import from `@tutla/design`

Inline alert / callout with icon, title, body, actions and optional dismiss.

```ts
import { Message } from "@tutla/design";
```

## `MessageProps` props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `state` | `MessageState` |  |  |
| `title` | `string \| null` |  |  |
| `children` | `React.ReactNode` |  |  |
| `icon` | `React.ReactNode` |  |  |
| `actions` | `React.ReactNode` |  |  |
| `dismissible` | `boolean` |  |  |
| `onDismiss` | `() => void` |  |  |
| `style` | `React.CSSProperties` |  |  |
| `className` | `string` |  |  |

## Types

- `MessageState` = `"success" \| "warning" \| "error" \| "info"`
