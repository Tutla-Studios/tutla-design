import React from "react";
import type { ProjectAccent } from "../styles/tokens";

export interface BadgeProps {
  children?: React.ReactNode;
  variant?: "gold" | "outline";
  /** Project accent for the outline variant (violet, green, red, …). */
  accent?: ProjectAccent | null;
  style?: React.CSSProperties;
}

/** Tiny uppercase pill label. Solid gold, or an accent-tinted outline. */
export function Badge({ children, variant = "gold", accent = null, style = {} }: BadgeProps) {
  const base: React.CSSProperties = {
    display: "inline-block",
    fontFamily: "var(--font-mono)",
    fontSize: "0.58rem",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    padding: "4px 9px",
    borderRadius: "var(--radius-pill)",
  };
  if (variant === "gold") {
    return <span style={{ ...base, background: "var(--accent)", color: "var(--on-accent)", ...style }}>{children}</span>;
  }
  const text = accent ? `var(--proj-${accent}-text)` : "var(--text-gold-soft)";
  const border = accent ? `var(--proj-${accent}-border)` : "var(--border-2)";
  return (
    <span style={{ ...base, color: text, border: `1px solid ${border}`, background: "rgba(255,255,255,0.02)", fontWeight: 700, ...style }}>
      {children}
    </span>
  );
}
