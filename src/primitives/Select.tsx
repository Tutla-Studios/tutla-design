"use client";

import React, { useState } from "react";
import type { FieldState } from "./Input";

export type SelectOption = string | number | { value: string | number; label: string; disabled?: boolean };

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  options?: SelectOption[];
  label?: string | null;
  hint?: string | null;
  placeholder?: string | null;
  state?: FieldState;
  style?: React.CSSProperties;
  selectStyle?: React.CSSProperties;
}

const STATE_MAP: Record<FieldState, { border: string; focus: string; hint: string }> = {
  default: { border: "var(--border-2)", focus: "var(--accent)", hint: "var(--text-muted)" },
  success: { border: "var(--state-success-border)", focus: "var(--state-success-hover)", hint: "var(--state-success-text)" },
  warning: { border: "var(--state-warning-border)", focus: "var(--state-warning-hover)", hint: "var(--state-warning-text)" },
  error: { border: "var(--state-error-border)", focus: "var(--state-error-hover)", hint: "var(--state-error-text)" },
};

/** Native `<select>` styled to match the system, with a custom caret. */
export function Select({
  value, defaultValue, onChange, options = [], label = null, hint = null,
  placeholder = null, state = "default", disabled = false, id,
  style = {}, selectStyle = {}, ...rest
}: SelectProps) {
  const [focus, setFocus] = useState(false);
  const s = STATE_MAP[state] || STATE_MAP.default;
  const borderColor = disabled ? "rgba(205,177,127,0.10)" : focus ? s.focus : s.border;

  const norm = (options || []).map((o) =>
    typeof o === "string" || typeof o === "number"
      ? { value: o, label: String(o), disabled: false }
      : o
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, fontFamily: "var(--font-mono)", ...style }}>
      {label ? (
        <label htmlFor={id} style={{ fontSize: "0.66rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--text-muted)" }}>
          {label}
        </label>
      ) : null}
      <div style={{
        position: "relative",
        background: disabled ? "rgba(255,255,255,0.008)" : "var(--ink-surface)",
        border: `1px solid ${borderColor}`, borderRadius: "var(--radius-md)",
        boxShadow: focus && !disabled ? `0 0 0 3px ${state === "default" ? "var(--gold-glow)" : `var(--state-${state}-glow)`}` : "none",
        transition: "border-color 180ms, box-shadow 180ms", opacity: disabled ? 0.55 : 1,
      }}>
        <select
          id={id} value={value} defaultValue={defaultValue} onChange={onChange} disabled={disabled}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{
            width: "100%", background: "transparent", border: "none", outline: "none",
            color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontSize: "0.85rem",
            fontWeight: 500, padding: "10px 36px 10px 13px", letterSpacing: "-0.005em",
            cursor: disabled ? "not-allowed" : "pointer", appearance: "none", ...selectStyle,
          }}
          {...rest}
        >
          {placeholder ? <option value="" disabled hidden>{placeholder}</option> : null}
          {norm.map((o) => (
            <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>
          ))}
        </select>
        <span aria-hidden style={{
          position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
          color: "var(--text-gold-soft)", pointerEvents: "none", fontSize: "0.85rem", lineHeight: 1,
        }}>
          ▾
        </span>
      </div>
      {hint ? <div style={{ fontSize: "0.72rem", color: s.hint, letterSpacing: "-0.005em" }}>{hint}</div> : null}
    </div>
  );
}
