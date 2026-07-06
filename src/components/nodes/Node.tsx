"use client";

import React from "react";

export type NodeState = "running" | "success" | "warning" | "error" | null;
export type NodeAccent = "violet" | "indigo" | "green" | "red" | "cyan" | "orange";

export interface NodeProps {
  title: string;
  subtitle?: string | null;
  accent?: NodeAccent;
  selected?: boolean;
  state?: NodeState;
  children?: React.ReactNode;
  headerActions?: React.ReactNode;
  x?: number | null;
  y?: number | null;
  width?: number;
  style?: React.CSSProperties;
  onClick?: () => void;
}

/** Node-graph card: accent header, status pip, optional absolute positioning. Compose with `Port` and `Wire`. */
export function Node({
  title, subtitle = null, accent = "indigo", selected = false, state = null,
  children, headerActions = null, x = null, y = null, width = 240, style = {}, onClick,
}: NodeProps) {
  const textVar = `var(--proj-${accent}-text)`;
  const borderVar = `var(--proj-${accent}-border)`;
  const glowVar = `var(--proj-${accent}-glow)`;

  const statePipMap: Record<NonNullable<NodeState>, string> = {
    running: "var(--state-info-text)",
    success: "var(--state-success-text)",
    warning: "var(--state-warning-text)",
    error: "var(--state-error-text)",
  };
  const statePip = state ? statePipMap[state] : null;
  const positioned = x !== null || y !== null;

  return (
    <div
      onClick={onClick}
      style={{
        position: positioned ? "absolute" : "relative",
        left: positioned && x !== null ? x : undefined,
        top: positioned && y !== null ? y : undefined,
        width, background: "var(--ink-surface)",
        border: `1px solid ${selected ? "var(--accent)" : borderVar}`,
        borderRadius: "var(--radius-lg)",
        boxShadow: selected
          ? `0 0 0 3px var(--gold-glow), 0 18px 40px rgba(0,0,0,0.55), inset 0 0 70px ${glowVar}`
          : `0 12px 28px rgba(0,0,0,0.5), inset 0 0 70px ${glowVar}`,
        fontFamily: "var(--font-mono)", overflow: "visible",
        transition: "box-shadow 200ms, border-color 200ms", ...style,
      }}
    >
      <div style={{
        display: "flex", alignItems: "center", gap: 8, padding: "10px 12px",
        borderBottom: `1px solid ${borderVar}`, background: "rgba(255,255,255,0.025)",
        borderTopLeftRadius: "var(--radius-lg)", borderTopRightRadius: "var(--radius-lg)",
      }}>
        {statePip ? (
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: statePip, boxShadow: `0 0 8px ${statePip}`, flex: "0 0 8px" }} />
        ) : null}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: textVar, fontWeight: 700, fontSize: "0.78rem", letterSpacing: "-0.005em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {title}
          </div>
          {subtitle ? (
            <div style={{ color: "var(--text-muted)", fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.16em", marginTop: 2 }}>
              {subtitle}
            </div>
          ) : null}
        </div>
        {headerActions ? <div style={{ display: "inline-flex", gap: 6 }}>{headerActions}</div> : null}
      </div>
      <div style={{ padding: "12px 0" }}>{children}</div>
    </div>
  );
}
