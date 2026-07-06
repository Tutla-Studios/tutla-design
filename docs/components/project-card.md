---
title: "ProjectCard"
summary: "Rich, accent-themed project showcase card with tilt, code snippet, feature pills and links."
created: "2026-07-06"
updated: "2026-07-06"
isdoc: true
---

# ProjectCard

`Components` · import from `@tutla/design`

Rich, accent-themed project showcase card with tilt, code snippet, feature pills and links.

```ts
import { ProjectCard } from "@tutla/design";
```

## `ProjectCardProps` props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | yes |  |
| `tag` | `string` | yes |  |
| `accent` | `ProjectAccent` |  |  |
| `icon` | `React.ReactNode` |  |  |
| `logo` | `string \| null` |  |  |
| `desc` | `string` | yes |  |
| `features` | `string[]` |  |  |
| `snippet` | `string \| null` |  |  |
| `badge` | `string \| null` |  |  |
| `github` | `string \| null` |  |  |
| `wiki` | `string \| null` |  |  |
| `tilt` | `boolean` |  |  |
| `style` | `React.CSSProperties` |  |  |
