"use client";

import React, { useState } from "react";

export type MessageState = "success" | "warning" | "error" | "info";

export interface MessageProps {
  state?: MessageState;
  title?: string | null;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  style?: React.CSSProperties;
}

/** Inline alert / callout with icon, title, body, actions and optional dismiss. */
export function Message({
  state = "info", title = null, children, icon = null, actions = null,
  dismissible = false, onDismiss, style = {},
}: MessageProps) {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  const palette: Record<MessageState, { text: string; border: string; bg: string; glow: string }> = {
    success: { text: "var(--state-success-text)", border: "var(--state-success-border)", bg: "var(--state-success-bg)", glow: "var(--state-success-glow)" },
    warning: { text: "var(--state-warning-text)", border: "var(--state-warning-border)", bg: "var(--state-warning-bg)", glow: "var(--state-warning-glow)" },
    error: { text: "var(--state-error-text)", border: "var(--state-error-border)", bg: "var(--state-error-bg)", glow: "var(--state-error-glow)" },
    info: { text: "var(--state-info-text)", border: "var(--state-info-border)", bg: "var(--state-info-bg)", glow: "var(--state-info-glow)" },
  };
  const p = palette[state] || palette.info;

  return (
    <div
      role={state === "error" ? "alert" : "status"}
      style={{
        display: "flex", gap: 14, alignItems: "flex-start", background: p.bg,
        border: `1px solid ${p.border}`, borderRadius: "var(--radius-lg)", padding: "14px 16px",
        fontFamily: "var(--font-mono)", boxShadow: `inset 0 0 80px ${p.glow}`, ...style,
      }}
    >
      {icon ? (
        <div style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 30, height: 30, flex: "0 0 30px", borderRadius: "var(--radius-sm)",
          border: `1px solid ${p.border}`, background: "rgba(255,255,255,0.02)", color: p.text, fontSize: "0.9rem",
        }}>
          {icon}
        </div>
      ) : null}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 4 }}>
        {title ? <div style={{ color: p.text, fontWeight: 700, fontSize: "0.84rem", letterSpacing: "-0.005em" }}>{title}</div> : null}
        {children ? <div style={{ color: "var(--text-body)", fontSize: "0.78rem", lineHeight: 1.6, letterSpacing: "-0.005em" }}>{children}</div> : null}
        {actions ? <div style={{ display: "flex", gap: 10, marginTop: 8, flexWrap: "wrap" }}>{actions}</div> : null}
      </div>
      {dismissible ? (
        <button
          type="button" aria-label="Dismiss" onClick={() => { setOpen(false); onDismiss?.(); }}
          style={{
            background: "transparent", border: "none", cursor: "pointer", color: "var(--text-muted)",
            padding: 4, lineHeight: 1, fontFamily: "var(--font-mono)", fontSize: "0.9rem", transition: "color 150ms",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
        >
          ×
        </button>
      ) : null}
    </div>
  );
}
