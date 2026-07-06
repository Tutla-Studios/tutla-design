import React from "react";

export interface NoteProps {
  children?: React.ReactNode;
  /** Tone of the note. */
  tone?: "gold" | "success" | "warning" | "error" | "info";
  style?: React.CSSProperties;
}

const TONE: Record<NonNullable<NoteProps["tone"]>, { text: string; border: string; bg: string }> = {
  gold: { text: "var(--text-gold-soft)", border: "var(--border-2)", bg: "rgba(205,177,127,0.06)" },
  success: { text: "var(--state-success-text)", border: "var(--state-success-border)", bg: "var(--state-success-bg)" },
  warning: { text: "var(--state-warning-text)", border: "var(--state-warning-border)", bg: "var(--state-warning-bg)" },
  error: { text: "var(--state-error-text)", border: "var(--state-error-border)", bg: "var(--state-error-bg)" },
  info: { text: "var(--state-info-text)", border: "var(--state-info-border)", bg: "var(--state-info-bg)" },
};

/**
 * Compact inline note / caption in a tinted box. Lighter-weight than `Message`.
 * (From account.tutla.net's `Note`, retokenised with tone variants.)
 */
export function Note({ children, tone = "gold", style = {} }: NoteProps) {
  const t = TONE[tone] || TONE.gold;
  return (
    <div
      style={{
        background: t.bg, border: `1px solid ${t.border}`,
        borderRadius: "var(--radius-sm)", padding: "8px 10px",
        fontSize: "0.72rem", color: t.text, lineHeight: 1.5,
        fontFamily: "var(--font-mono)", ...style,
      }}
    >
      {children}
    </div>
  );
}
