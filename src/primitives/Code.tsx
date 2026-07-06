import React from "react";

export interface CodeProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Inline code span — gold-tinted, bordered, non-wrapping. */
export function Code({ children, style = {} }: CodeProps) {
  return (
    <code
      style={{
        fontFamily: "var(--font-mono)", fontSize: "0.86em",
        color: "var(--text-gold-soft)", background: "rgba(205,177,127,0.08)",
        border: "1px solid var(--border-1)", borderRadius: "var(--radius-sm)",
        padding: "1px 6px", letterSpacing: "-0.005em", whiteSpace: "nowrap",
        ...style,
      }}
    >
      {children}
    </code>
  );
}
