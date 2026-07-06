"use client";

import React, { useState, useRef, useEffect } from "react";

export interface ContextMenuItem {
  id?: string;
  type?: "separator" | "label";
  label?: string;
  icon?: React.ReactNode;
  shortcut?: string;
  onSelect?: () => void;
  danger?: boolean;
  disabled?: boolean;
}

export interface ContextMenuProps {
  items?: ContextMenuItem[];
  children: React.ReactNode;
  style?: React.CSSProperties;
}

/** Right-click menu that flips to stay on-screen. Supports labels, separators, shortcuts and danger items. */
export function ContextMenu({ items = [], children, style = {} }: ContextMenuProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!pos) return;
    const close = () => setPos(null);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setPos(null); };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", close); document.removeEventListener("keydown", onKey); };
  }, [pos]);

  useEffect(() => {
    if (!pos || !menuRef.current) return;
    const m = menuRef.current;
    const r = m.getBoundingClientRect();
    let { x, y } = pos;
    if (x + r.width > window.innerWidth - 8) x = window.innerWidth - r.width - 8;
    if (y + r.height > window.innerHeight - 8) y = window.innerHeight - r.height - 8;
    if (x !== pos.x || y !== pos.y) setPos({ x, y });
  }, [pos]);

  const onContext = (e: React.MouseEvent) => {
    e.preventDefault();
    setPos({ x: e.clientX, y: e.clientY });
  };

  const select = (it: ContextMenuItem) => {
    if (it.disabled) return;
    setPos(null);
    it.onSelect?.();
  };

  return (
    <>
      <div ref={wrapRef} onContextMenu={onContext} style={{ display: "contents" }}>
        {children}
      </div>
      {pos ? (
        <div
          ref={menuRef} role="menu" onMouseDown={(e) => e.stopPropagation()}
          style={{
            position: "fixed", left: pos.x, top: pos.y, zIndex: 9999, minWidth: 220, maxWidth: 320,
            background: "rgba(10,8,5,0.94)", border: "1px solid var(--border-2)", borderRadius: "var(--radius-md)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
            fontFamily: "var(--font-mono)", padding: 6, ...style,
          }}
        >
          {items.map((it, i) => {
            if (it.type === "separator") {
              return <div key={`sep-${i}`} style={{ height: 1, background: "var(--border-1)", margin: "6px 4px" }} />;
            }
            if (it.type === "label") {
              return (
                <div key={`lbl-${i}`} style={{
                  padding: "8px 10px 4px", fontSize: "0.58rem", fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--text-muted)",
                }}>
                  {it.label}
                </div>
              );
            }
            const danger = !!it.danger;
            return (
              <button
                key={it.id || i} role="menuitem" type="button" disabled={it.disabled} onClick={() => select(it)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 10, background: "transparent",
                  border: "none", padding: "8px 10px", borderRadius: "var(--radius-sm)",
                  cursor: it.disabled ? "not-allowed" : "pointer",
                  color: it.disabled ? "rgba(244,239,224,0.32)" : danger ? "var(--state-error-text)" : "var(--text-primary)",
                  fontFamily: "var(--font-mono)", fontSize: "0.8rem", fontWeight: 500,
                  textAlign: "left", transition: "background 120ms, color 120ms",
                }}
                onMouseEnter={(e) => {
                  if (it.disabled) return;
                  (e.currentTarget as HTMLElement).style.background = danger ? "var(--state-error-bg)" : "rgba(205,177,127,0.10)";
                }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                {it.icon ? (
                  <span style={{ width: 16, display: "inline-flex", justifyContent: "center", color: danger ? "var(--state-error-text)" : "var(--tan-500)" }}>
                    {it.icon}
                  </span>
                ) : <span style={{ width: 16 }} />}
                <span style={{ flex: 1 }}>{it.label}</span>
                {it.shortcut ? (
                  <span style={{ fontSize: "0.66rem", color: "var(--text-muted)", letterSpacing: "0.06em", marginLeft: 12 }}>
                    {it.shortcut}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </>
  );
}
