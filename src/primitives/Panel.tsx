import React from "react";

export interface PanelProps {
  children?: React.ReactNode;
  /** Tint the border with the gold accent. */
  accent?: boolean;
  style?: React.CSSProperties;
}

/**
 * Base surface container — a raised, bordered card. The default building block
 * for grouping content. (Merged from account.tutla.net's `Panel`, retokenised.)
 */
export function Panel({ children, accent = false, style = {} }: PanelProps) {
  return (
    <div
      style={{
        background: "var(--ink-surface)",
        borderRadius: "var(--radius-lg)",
        padding: "20px",
        border: `1px solid ${accent ? "var(--border-2)" : "var(--border-1)"}`,
        fontFamily: "var(--font-mono)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
