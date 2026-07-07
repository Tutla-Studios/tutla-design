"use client";

import React, { useState } from "react";
import type { FieldState } from "../primitives/Input";

export interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string | null;
  hint?: string | null;
  state?: FieldState;
  style?: React.CSSProperties;
}

const STATE_MAP: Record<FieldState, { border: string; focus: string; hint: string }> = {
  default: { border: "var(--border-2)", focus: "var(--accent)", hint: "var(--text-muted)" },
  success: { border: "var(--state-success-border)", focus: "var(--state-success-hover)", hint: "var(--state-success-text)" },
  warning: { border: "var(--state-warning-border)", focus: "var(--state-warning-hover)", hint: "var(--state-warning-text)" },
  error: { border: "var(--state-error-border)", focus: "var(--state-error-hover)", hint: "var(--state-error-text)" },
};

/** Styled native date input (`colorScheme: dark`) with the shared field chrome. */
export function DatePicker({
  value, defaultValue, onChange, label = null, hint = null, min, max,
  state = "default", disabled = false, id, style = {}, className, ...rest
}: DatePickerProps) {
  const [focus, setFocus] = useState(false);
  const s = STATE_MAP[state] || STATE_MAP.default;
  const borderColor = disabled ? "rgba(205,177,127,0.10)" : focus ? s.focus : s.border;

  return (
    <div className={className} style={{ display: "flex", flexDirection: "column", gap: 6, fontFamily: "var(--font-mono)", ...style }}>
      {label ? (
        <label htmlFor={id} style={{ fontSize: "0.66rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--text-muted)" }}>
          {label}
        </label>
      ) : null}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        background: disabled ? "rgba(255,255,255,0.008)" : "var(--ink-surface)",
        border: `1px solid ${borderColor}`, borderRadius: "var(--radius-md)", padding: "10px 13px",
        boxShadow: focus && !disabled ? `0 0 0 3px ${state === "default" ? "var(--gold-glow)" : `var(--state-${state}-glow)`}` : "none",
        transition: "border-color 180ms, box-shadow 180ms", opacity: disabled ? 0.55 : 1,
      }}>
        <span aria-hidden style={{ color: "var(--tan-500)", fontSize: "0.85rem", display: "inline-flex" }}>▤</span>
        <input
          id={id} type="date" value={value as string} defaultValue={defaultValue as string}
          onChange={onChange} min={min as string} max={max as string} disabled={disabled}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{
            flex: 1, minWidth: 0, background: "transparent", border: "none", outline: "none",
            color: "var(--text-primary)", caretColor: "var(--accent)", colorScheme: "dark",
            fontFamily: "var(--font-mono)", fontSize: "0.85rem", fontWeight: 500, letterSpacing: "-0.005em",
          }}
          {...rest}
        />
      </div>
      {hint ? <div style={{ fontSize: "0.72rem", color: s.hint, letterSpacing: "-0.005em" }}>{hint}</div> : null}
    </div>
  );
}
