import React from "react";

export interface CursorBlinkProps {
  style?: React.CSSProperties;
  className?: string;
}

/**
 * A blinking terminal caret. Render inline right after text (e.g. a
 * `useTypewriter` value) for the classic hacker prompt look. Styling lives in
 * `animations.css` under `.cursor-blink`.
 */
export function CursorBlink({ style, className }: CursorBlinkProps) {
  return (
    <span
      aria-hidden="true"
      className={["cursor-blink", className].filter(Boolean).join(" ")}
      style={style}
    >
      &nbsp;
    </span>
  );
}
