---
title: "Navbar"
summary: "Fixed top navigation."
created: "2026-07-07"
updated: "2026-07-07"
isdoc: true
---

# Navbar

`Components` · import from `@tutla/design`

Fixed top navigation. Transparent at the top of the page, frosts on scroll.
Collapses to a hamburger drawer below 768px. Fully data-driven — pass your
own `links`, `social` icons and an `action` (e.g. a sign-in `Button`).

```ts
import { Navbar } from "@tutla/design";
```

## `NavLink` props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `label` | `string` | yes |  |
| `href` | `string` | yes |  |
| `external` | `boolean` |  |  |

## `SocialLink` props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `href` | `string` | yes |  |
| `icon` | `React.ReactNode` | yes |  |

## `NavbarProps` props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `brand` | `string` |  |  |
| `brandSuffix` | `string` |  |  |
| `links` | `NavLink[]` |  |  |
| `social` | `SocialLink[]` |  |  |
| `action` | `React.ReactNode` |  |  |
| `style` | `React.CSSProperties` |  |  |
| `className` | `string` |  |  |
