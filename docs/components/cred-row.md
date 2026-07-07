---
title: "CredRow"
summary: "Labelled read-only value with an optional copy button that confirms inline."
created: "2026-07-07"
updated: "2026-07-07"
isdoc: true
---

# CredRow

`Components` · import from `@tutla/design`

Labelled read-only value with an optional copy button that confirms inline.
Ideal for API keys, client ids and other credentials. (From account.tutla.net,
retokenised.)

```ts
import { CredRow } from "@tutla/design";
```

## `CredRowProps` props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `label` | `string` | yes |  |
| `value` | `string` | yes |  |
| `mono` | `boolean` |  | Render the value in a monospace/broken layout (ids, secrets, tokens). |
| `copy` | `boolean` |  | Show a copy-to-clipboard button. |
| `style` | `React.CSSProperties` |  |  |
| `className` | `string` |  |  |
