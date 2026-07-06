import React from "react";

export type IconTileAccent = "gold" | "violet" | "indigo" | "green" | "red" | "cyan" | "orange";

export interface IconTileProps {
  children?: React.ReactNode;
  size?: number;
  accent?: IconTileAccent;
  radius?: string;
  style?: React.CSSProperties;
}

/** Square, bordered tile that frames an icon. Accent-tinted border + colour. */
export function IconTile({
  children,
  size = 56,
  accent = "gold",
  radius = "var(--radius-icon)",
  style = {},
}: IconTileProps) {
  const accentMap: Record<IconTileAccent, { border: string; color: string }> = {
    gold: { border: "var(--border-2)", color: "var(--accent)" },
    violet: { border: "var(--proj-violet-border)", color: "var(--proj-violet-text)" },
    indigo: { border: "var(--proj-indigo-border)", color: "var(--proj-indigo-text)" },
    green: { border: "var(--proj-green-border)", color: "var(--proj-green-text)" },
    red: { border: "var(--proj-red-border)", color: "var(--proj-red-text)" },
    cyan: { border: "var(--proj-cyan-border)", color: "var(--proj-cyan-text)" },
    orange: { border: "var(--proj-orange-border)", color: "var(--proj-orange-text)" },
  };
  const a = accentMap[accent] || accentMap.gold;

  return (
    <div
      style={{
        width: size, height: size,
        display: "grid", placeItems: "center",
        background: "rgba(255,255,255,0.04)",
        border: `1px solid ${a.border}`,
        borderRadius: radius,
        color: a.color,
        flexShrink: 0,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
