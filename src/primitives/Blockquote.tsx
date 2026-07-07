import React from "react";

export interface BlockquoteProps {
  children?: React.ReactNode;
  cite?: string | null;
  style?: React.CSSProperties;
  className?: string;
}

/** Pull-quote with a gold left rule and optional citation footer. */
export function Blockquote({ children, cite = null, style = {}, className }: BlockquoteProps) {
  return (
    <blockquote
      className={className}
      style={{
        margin: 0, padding: "14px 18px", borderLeft: "3px solid var(--accent)",
        background: "rgba(205,177,127,0.04)", borderRadius: "0 var(--radius-md) var(--radius-md) 0",
        fontFamily: "var(--font-mono)", color: "var(--text-primary)",
        fontSize: "0.92rem", lineHeight: 1.7, fontStyle: "italic", letterSpacing: "-0.005em",
        ...style,
      }}
    >
      <div>{children}</div>
      {cite ? (
        <footer style={{
          marginTop: 8, fontStyle: "normal", fontSize: "0.7rem", color: "var(--text-muted)",
          textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 700,
        }}>
          — {cite}
        </footer>
      ) : null}
    </blockquote>
  );
}
