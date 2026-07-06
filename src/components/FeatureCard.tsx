"use client";

import React from "react";
import { useTilt } from "../primitives/animations/useTilt";

export interface FeatureCardProps {
  icon?: React.ReactNode;
  title: string;
  desc: string;
  small?: boolean;
  tilt?: boolean;
  style?: React.CSSProperties;
}

/** Feature tile with an icon, title and description. 3D pointer-tilt with layered depth. */
export function FeatureCard({ icon = null, title, desc, small = false, tilt = true, style = {} }: FeatureCardProps) {
  const ref = useTilt<HTMLDivElement>({ max: 10, enabled: tilt });

  return (
    <div
      ref={ref}
      style={{
        padding: small ? "17px" : "20px", borderRadius: "var(--radius-lg)",
        background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-1)",
        fontFamily: "var(--font-mono)", willChange: "transform",
        transition: "background 300ms, border-color 300ms", ...style,
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(205,177,127,0.05)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border-2)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border-1)"; }}
    >
      {icon ? (
        <span style={{ display: "inline-grid", marginBottom: 12, color: "var(--accent)", fontSize: small ? 18 : 21 }} data-depth="18">
          {icon}
        </span>
      ) : null}
      <h4 style={{ margin: 0, fontWeight: 700, fontSize: small ? "0.85rem" : "0.92rem", marginBottom: 7, color: "#fff" }} data-depth="8">{title}</h4>
      <p style={{ margin: 0, fontSize: "0.78rem", lineHeight: 1.7, color: "var(--text-muted)" }} data-depth="4">{desc}</p>
    </div>
  );
}
