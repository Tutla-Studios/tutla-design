"use client";

import React, { useState, useRef } from "react";
import type { FieldState } from "../primitives/Input";

export interface ColorPickerProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  label?: string | null;
  hint?: string | null;
  presets?: string[] | null;
  state?: FieldState;
  disabled?: boolean;
  id?: string;
  style?: React.CSSProperties;
}

const STATE_MAP: Record<FieldState, { border: string; focus: string; hint: string }> = {
  default: { border: "var(--border-2)", focus: "var(--accent)", hint: "var(--text-muted)" },
  success: { border: "var(--state-success-border)", focus: "var(--state-success-hover)", hint: "var(--state-success-text)" },
  warning: { border: "var(--state-warning-border)", focus: "var(--state-warning-hover)", hint: "var(--state-warning-text)" },
  error: { border: "var(--state-error-border)", focus: "var(--state-error-hover)", hint: "var(--state-error-text)" },
};

/** Colour swatch + hex readout that opens the native picker, with optional preset chips. */
export function ColorPicker({
  value, defaultValue = "#cdb17f", onChange, label = null, hint = null,
  presets = null, state = "default", disabled = false, id, style = {},
}: ColorPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focus, setFocus] = useState(false);
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = typeof value === "string";
  const current = isControlled ? value! : internal;

  const setValue = (v: string) => {
    if (!isControlled) setInternal(v);
    onChange?.(v);
  };

  const s = STATE_MAP[state] || STATE_MAP.default;
  const borderColor = disabled ? "rgba(205,177,127,0.10)" : focus ? s.focus : s.border;
  const openPicker = () => { if (disabled) return; inputRef.current?.click(); };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, fontFamily: "var(--font-mono)", ...style }}>
      {label ? (
        <label htmlFor={id} style={{ fontSize: "0.66rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--text-muted)" }}>
          {label}
        </label>
      ) : null}
      <div style={{ display: "flex", gap: 10, alignItems: "stretch", flexWrap: "wrap" }}>
        <div
          role="button" tabIndex={disabled ? -1 : 0} onClick={openPicker}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openPicker(); } }}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{
            display: "flex", alignItems: "center", gap: 12,
            background: disabled ? "rgba(255,255,255,0.008)" : "var(--ink-surface)",
            border: `1px solid ${borderColor}`, borderRadius: "var(--radius-md)", padding: "8px 10px 8px 8px",
            boxShadow: focus && !disabled ? `0 0 0 3px ${state === "default" ? "var(--gold-glow)" : `var(--state-${state}-glow)`}` : "none",
            transition: "border-color 180ms, box-shadow 180ms", opacity: disabled ? 0.55 : 1,
            cursor: disabled ? "not-allowed" : "pointer", flex: "1 1 200px", minWidth: 200, position: "relative",
          }}
        >
          <div style={{
            width: 30, height: 30, borderRadius: "var(--radius-sm)", background: current,
            border: "1px solid var(--border-2)", boxShadow: "inset 0 0 0 2px rgba(0,0,0,0.25)", flex: "0 0 30px",
          }} />
          <span style={{ color: "var(--text-primary)", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "-0.005em", textTransform: "uppercase" }}>
            {current}
          </span>
          <span style={{ flex: 1 }} />
          <span aria-hidden style={{ color: "var(--text-gold-soft)", fontSize: "0.78rem" }}>↕</span>
          <input
            ref={inputRef} id={id} type="color" value={current} disabled={disabled}
            onChange={(e) => setValue(e.target.value)}
            style={{ position: "absolute", opacity: 0, pointerEvents: "none", width: 1, height: 1 }}
          />
        </div>
        {presets && presets.length ? (
          <div style={{
            display: "flex", alignItems: "center", gap: 6, padding: "8px 10px",
            background: disabled ? "rgba(255,255,255,0.008)" : "var(--ink-surface)",
            border: "1px solid var(--border-1)", borderRadius: "var(--radius-md)", opacity: disabled ? 0.55 : 1,
          }}>
            {presets.map((p) => (
              <button key={p} type="button" title={p} disabled={disabled} onClick={() => setValue(p)}
                style={{
                  width: 22, height: 22, borderRadius: "var(--radius-sm)", background: p,
                  border: `1px solid ${current.toLowerCase() === p.toLowerCase() ? "var(--accent)" : "var(--border-2)"}`,
                  boxShadow: current.toLowerCase() === p.toLowerCase() ? "0 0 0 2px var(--gold-glow)" : "none",
                  cursor: disabled ? "not-allowed" : "pointer", padding: 0,
                  transition: "border-color 150ms, box-shadow 150ms",
                }}
              />
            ))}
          </div>
        ) : null}
      </div>
      {hint ? <div style={{ fontSize: "0.72rem", color: s.hint, letterSpacing: "-0.005em" }}>{hint}</div> : null}
    </div>
  );
}
