"use client";

import React, { useState } from "react";
import type { FieldState } from "./Input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string | null;
  hint?: string | null;
  state?: FieldState;
  resize?: React.CSSProperties["resize"];
  style?: React.CSSProperties;
  textareaStyle?: React.CSSProperties;
}

const STATE_MAP: Record<FieldState, { border: string; focus: string; hint: string }> = {
  default: { border: "var(--border-2)", focus: "var(--accent)", hint: "var(--text-muted)" },
  success: { border: "var(--state-success-border)", focus: "var(--state-success-hover)", hint: "var(--state-success-text)" },
  warning: { border: "var(--state-warning-border)", focus: "var(--state-warning-hover)", hint: "var(--state-warning-text)" },
  error: { border: "var(--state-error-border)", focus: "var(--state-error-hover)", hint: "var(--state-error-text)" },
};

/** Multi-line text field. Same state model as `Input`. */
export function Textarea({
  value, defaultValue, onChange, placeholder = "", label = null, hint = null,
  rows = 5, state = "default", disabled = false, resize = "vertical",
  id, style = {}, textareaStyle = {}, className, ...rest
}: TextareaProps) {
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
      <textarea
        id={id} value={value} defaultValue={defaultValue} onChange={onChange}
        placeholder={placeholder} rows={rows} disabled={disabled}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{
          background: disabled ? "rgba(255,255,255,0.008)" : "var(--ink-surface)",
          color: "var(--text-primary)", caretColor: "var(--accent)",
          border: `1px solid ${borderColor}`, borderRadius: "var(--radius-md)", padding: "12px 13px",
          fontFamily: "var(--font-mono)", fontSize: "0.85rem", fontWeight: 500,
          lineHeight: 1.6, letterSpacing: "-0.005em", outline: "none", resize,
          boxShadow: focus && !disabled ? `0 0 0 3px ${state === "default" ? "var(--gold-glow)" : `var(--state-${state}-glow)`}` : "none",
          transition: "border-color 180ms, box-shadow 180ms", opacity: disabled ? 0.55 : 1,
          ...textareaStyle,
        }}
        {...rest}
      />
      {hint ? <div style={{ fontSize: "0.72rem", color: s.hint, letterSpacing: "-0.005em" }}>{hint}</div> : null}
    </div>
  );
}
