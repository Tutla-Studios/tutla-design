import React from "react";

export type PortSide = "in" | "out";
export type PortType = "event" | "string" | "number" | "boolean" | "any";

export interface PortProps {
  side?: PortSide;
  type?: PortType;
  label: string;
  id?: string;
  connected?: boolean;
  onPointerDown?: React.PointerEventHandler<HTMLSpanElement>;
  style?: React.CSSProperties;
}

const TYPE_COLOR: Record<PortType, string> = {
  event: "var(--text-gold-soft)",
  string: "var(--proj-cyan-text)",
  number: "var(--proj-orange-text)",
  boolean: "var(--proj-green-text)",
  any: "var(--text-muted)",
};

/** A typed input/output socket for a `Node`. The `id` is the anchor a `Wire` connects to. */
export function Port({ side = "in", type = "any", label, id, connected = false, onPointerDown, style = {} }: PortProps) {
  const color = TYPE_COLOR[type] || TYPE_COLOR.any;

  const handle = (
    <span
      data-port-id={id} data-port-side={side} data-port-type={type} onPointerDown={onPointerDown}
      style={{
        width: 12, height: 12, borderRadius: "50%",
        background: connected ? color : "var(--ink-surface)", border: `2px solid ${color}`,
        boxShadow: connected ? `0 0 10px ${color}` : "none", cursor: "crosshair", flex: "0 0 12px",
        transition: "background 150ms, box-shadow 150ms",
        marginLeft: side === "in" ? -18 : 0, marginRight: side === "out" ? -18 : 0,
      }}
    />
  );

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10, padding: "5px 14px", fontFamily: "var(--font-mono)",
      fontSize: "0.74rem", color: "var(--text-primary)", justifyContent: side === "in" ? "flex-start" : "flex-end", ...style,
    }}>
      {side === "in" ? handle : null}
      <span style={{ flex: 1, textAlign: side === "in" ? "left" : "right", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {label}
      </span>
      <span style={{ fontSize: "0.56rem", textTransform: "uppercase", letterSpacing: "0.16em", color, fontWeight: 700 }}>
        {type}
      </span>
      {side === "out" ? handle : null}
    </div>
  );
}
