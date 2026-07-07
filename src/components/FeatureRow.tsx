"use client";

import React from "react";

export interface FeatureRowProps {
  icon?: React.ReactNode;
  title: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

/** Horizontal feature line: leading icon, bold title, muted description. Warms on hover. */
export function FeatureRow({ icon = null, title, children, style = {}, className, ...rest }: FeatureRowProps) {
  return (
    <div
      className={className}
      style={{
        display: "flex", alignItems: "flex-start", gap: 14, borderRadius: "var(--radius-lg)", padding: 16,
        background: "rgba(255,255,255,0.025)", border: "1px solid var(--border-1)",
        transition: "background 300ms, border-color 300ms", cursor: "default", fontFamily: "var(--font-mono)", ...style,
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border-2)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.025)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border-1)"; }}
      {...rest}
    >
      {icon ? (
        <span style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2, display: "inline-flex", fontSize: "1.2rem" }}>
          {icon}
        </span>
      ) : null}
      <div style={{ minWidth: 0 }}>
        <p style={{ fontSize: "0.86rem", fontWeight: 700, margin: "0 0 3px", color: "var(--text-strong)", letterSpacing: "-0.005em" }}>
          {title}
        </p>
        <p style={{ fontSize: "0.76rem", lineHeight: 1.55, color: "var(--text-muted)", margin: 0 }}>{children}</p>
      </div>
    </div>
  );
}
