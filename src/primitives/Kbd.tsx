import React from "react";

export interface KbdProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Keyboard key cap with a subtle bottom lip. */
export function Kbd({ children, style = {} }: KbdProps) {
  return (
    <kbd
      style={{
        fontFamily: "var(--font-mono)", fontSize: "0.7rem", fontWeight: 700,
        color: "var(--text-primary)", background: "var(--ink-surface2)",
        border: "1px solid var(--border-2)", borderRadius: "var(--radius-sm)",
        padding: "2px 7px", boxShadow: "0 2px 0 rgba(0,0,0,0.5)",
        display: "inline-block", minWidth: 18, textAlign: "center", letterSpacing: 0,
        ...style,
      }}
    >
      {children}
    </kbd>
  );
}
