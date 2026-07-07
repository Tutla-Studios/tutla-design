---
title: "Button"
summary: "The one button primitive."
created: "2026-07-07"
updated: "2026-07-07"
isdoc: true
---

# Button

`Primitives` · import from `@tutla/design`

The one button primitive. Renders an `<a>` when given `href`, otherwise a
native `<button>`. Merges the accent (gold lip), ghost (outlined) and danger
treatments from tutla.net and account.tutla.net.

```tsx
<Button variant="accent" href="/start">Get started</Button>
<Button variant="ghost" onClick={save}>Save</Button>
```

```ts
import { Button } from "@tutla/design";
```

## AccentButton

Gold, lipped call-to-action. Alias of `<Button variant="accent">`.

```ts
import { AccentButton } from "@tutla/design";
```

## GhostButton

Outlined, low-emphasis button. Alias of `<Button variant="ghost">`.

```ts
import { GhostButton } from "@tutla/design";
```

## Types

- `ButtonVariant` = `"accent" \| "ghost" \| "danger"`
- `ButtonSize` = `"sm" \| "md"`
- `ButtonProps` = `AnchorProps \| NativeButtonProps`
