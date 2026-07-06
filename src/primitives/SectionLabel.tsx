import React from "react";

export interface SectionLabelProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * Uppercase gold section heading with a short leading rule. Used to break up
 * dense panels. (From account.tutla.net, retokenised.)
 */
export function SectionLabel({ children, style = {} }: SectionLabelProps) {
  return (
    <div
      style={{
        fontSize: "0.66rem", fontWeight: 700, color: "var(--accent)",
        textTransform: "uppercase", letterSpacing: "0.1em",
        marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px",
        fontFamily: "var(--font-mono)", ...style,
      }}
    >
      <span aria-hidden style={{ height: 1, width: 16, background: "var(--border-2)" }} />
      {children}
    </div>
  );
}
