import React from "react";

export interface EyebrowProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  variant?: "default" | "gold" | "amber";
  style?: React.CSSProperties;
  className?: string;
}

/** Small uppercase kicker/label shown above section headings. */
export function Eyebrow({ children, icon = null, variant = "default", style = {}, className }: EyebrowProps) {
  const variants: Record<string, React.CSSProperties> = {
    default: { color: "var(--text-muted)", border: "1px solid var(--border-1)", background: "rgba(255,255,255,0.015)" },
    gold: { color: "var(--text-gold-soft)", border: "1px solid var(--border-2)", background: "var(--gold-glow)" },
    amber: { color: "var(--amber-text)", border: "1px solid var(--amber-border)", background: "var(--amber-bg)" },
  };
  return (
    <div
      className={className}
      style={{
        display: "inline-flex", alignItems: "center", gap: "8px",
        fontFamily: "var(--font-mono)", fontSize: "0.66rem", fontWeight: 700,
        textTransform: "uppercase", letterSpacing: "0.18em",
        padding: "7px 13px", borderRadius: "var(--radius-pill)",
        ...(variants[variant] || variants.default), ...style,
      }}
    >
      {icon}
      {children}
    </div>
  );
}
