import React from "react";

export interface BackgroundGridProps {
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Fixed, faint gold grid that fades out toward the bottom (radial mask).
 * Purely decorative and non-interactive. Sits at z-index 0 — keep page content
 * at z-index >= 1. Styling lives in `animations.css` under `.bg-grid`.
 */
export function BackgroundGrid({ style, className }: BackgroundGridProps) {
  return (
    <div
      className={["bg-grid", className].filter(Boolean).join(" ")}
      aria-hidden="true"
      style={style}
    />
  );
}
