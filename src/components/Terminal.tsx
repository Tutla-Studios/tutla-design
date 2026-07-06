import React from "react";

export interface TerminalProps {
  title?: string;
  lines?: string[] | null;
  /** Pre-rendered HTML (e.g. with `.t-g` / `.t-b` syntax spans). Takes precedence over `lines`. */
  html?: string | null;
  style?: React.CSSProperties;
}

/**
 * Faux terminal window with traffic-light chrome and a monospace body.
 * Combine with the `.t-g` / `.t-b` / `.t-cursor` classes (in `animations.css`)
 * for syntax colouring inside `html`.
 */
export function Terminal({ title = "user@machiaos ~", lines = null, html = null, style = {} }: TerminalProps) {
  return (
    <div style={{
      background: "var(--ink-base)", border: "1px solid var(--border-2)", borderRadius: "var(--radius-lg)",
      overflow: "hidden", boxShadow: "var(--shadow-terminal)", fontFamily: "var(--font-mono)", ...style,
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: "7px", padding: "11px 16px",
        borderBottom: "1px solid var(--border-1)", background: "rgba(255,255,255,0.015)",
      }}>
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "rgba(239,68,68,0.7)" }} />
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "rgba(234,179,8,0.7)" }} />
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "rgba(34,197,94,0.7)" }} />
        <span style={{ marginLeft: 8, fontSize: "0.72rem", color: "var(--text-muted)" }}>{title}</span>
      </div>
      <pre
        style={{
          margin: 0, padding: "18px", fontSize: "0.74rem", lineHeight: 1.85,
          color: "rgba(216,197,153,0.82)", whiteSpace: "pre", overflowX: "auto",
        }}
        {...(html ? { dangerouslySetInnerHTML: { __html: html } } : {})}
      >
        {html ? undefined : (lines || []).join("\n")}
      </pre>
    </div>
  );
}
