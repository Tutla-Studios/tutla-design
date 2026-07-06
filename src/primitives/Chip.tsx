"use client";

import React from "react";

export interface ChipProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Rounded tag that lifts and warms on hover. Great for tech/keyword lists. */
export function Chip({ children, icon = null, style = {} }: ChipProps) {
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", gap: "8px",
        fontFamily: "var(--font-mono)", fontSize: "0.8rem",
        color: "var(--text-body)", padding: "8px 14px",
        borderRadius: "var(--radius-pill)", border: "1px solid var(--border-1)",
        background: "rgba(255,255,255,0.018)", cursor: "default",
        transition: "transform 300ms var(--ease-spring), color 200ms, border-color 200ms, background 200ms",
        ...style,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-3px)";
        el.style.borderColor = "var(--border-2)";
        el.style.background = "rgba(205,177,127,0.06)";
        el.style.color = "var(--text-primary)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(0)";
        el.style.borderColor = "var(--border-1)";
        el.style.background = "rgba(255,255,255,0.018)";
        el.style.color = "var(--text-body)";
      }}
    >
      {icon ? <span style={{ color: "var(--tan-500)", display: "inline-flex" }}>{icon}</span> : null}
      {children}
    </span>
  );
}
