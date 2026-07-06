import React from "react";

export interface CTABannerProps {
  variant?: "wiki" | "discord";
  icon?: React.ReactNode;
  title: string;
  desc: string;
  action?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Wide call-to-action banner with a corner glow, icon, copy and an action slot. */
export function CTABanner({ variant = "wiki", icon = null, title, desc, action = null, style = {} }: CTABannerProps) {
  const themes = {
    wiki: {
      border: "var(--border-2)",
      glow: "radial-gradient(ellipse 60% 80% at 0% 0%, var(--gold-glow), transparent 60%)",
      iconBg: "rgba(205,177,127,0.10)", iconColor: "var(--accent)", iconBorder: "var(--border-2)",
    },
    discord: {
      border: "rgba(99,102,241,0.30)",
      glow: "radial-gradient(ellipse 60% 80% at 0% 0%, rgba(99,102,241,0.18), transparent 60%)",
      iconBg: "rgba(99,102,241,0.12)", iconColor: "#a5b4fc", iconBorder: "rgba(99,102,241,0.30)",
    },
  };
  const t = themes[variant] || themes.wiki;

  return (
    <div style={{
      position: "relative", overflow: "hidden", display: "flex", alignItems: "center", gap: "22px",
      flexWrap: "wrap", padding: "30px 34px", borderRadius: "var(--radius-xl)", border: `1px solid ${t.border}`,
      background: `${t.glow}, var(--ink-surface)`, fontFamily: "var(--font-mono)", ...style,
    }}>
      {icon ? (
        <div style={{
          width: 54, height: 54, borderRadius: "var(--radius-icon)", flexShrink: 0, display: "grid",
          placeItems: "center", background: t.iconBg, color: t.iconColor, border: `1px solid ${t.iconBorder}`, fontSize: 26,
        }}>{icon}</div>
      ) : null}
      <div style={{ flex: 1, minWidth: 200 }}>
        <h3 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 800, letterSpacing: "-0.02em", color: "#fff" }}>{title}</h3>
        <p style={{ margin: "7px 0 0", fontSize: "0.86rem", lineHeight: 1.6, color: "var(--text-body)" }}>{desc}</p>
      </div>
      {action ? <div style={{ flexShrink: 0 }}>{action}</div> : null}
    </div>
  );
}
