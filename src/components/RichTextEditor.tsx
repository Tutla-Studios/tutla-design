"use client";

import React, { useRef, useState, useEffect } from "react";
import type { FieldState } from "../primitives/Input";

export interface RichTextEditorProps {
  defaultValue?: string;
  onChange?: (html: string) => void;
  label?: string | null;
  placeholder?: string;
  minHeight?: number;
  state?: FieldState;
  disabled?: boolean;
  id?: string;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Lightweight WYSIWYG editor built on `contentEditable` — bold/italic/underline,
 * code blocks, lists, links and clear-formatting. Emits HTML via `onChange`.
 * A "primary" component: no native HTML equivalent.
 */
export function RichTextEditor({
  defaultValue = "", onChange, label = null, placeholder = "Start writing…",
  minHeight = 160, state = "default", disabled = false, id, style = {}, className,
}: RichTextEditorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [focus, setFocus] = useState(false);
  const [isEmpty, setIsEmpty] = useState(!defaultValue);

  useEffect(() => {
    if (ref.current && defaultValue && ref.current.innerHTML !== defaultValue) {
      ref.current.innerHTML = defaultValue;
      setIsEmpty(!ref.current.textContent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stateMap: Record<FieldState, { border: string; focus: string }> = {
    default: { border: "var(--border-2)", focus: "var(--accent)" },
    success: { border: "var(--state-success-border)", focus: "var(--state-success-hover)" },
    warning: { border: "var(--state-warning-border)", focus: "var(--state-warning-hover)" },
    error: { border: "var(--state-error-border)", focus: "var(--state-error-hover)" },
  };
  const s = stateMap[state] || stateMap.default;
  const borderColor = disabled ? "rgba(205,177,127,0.10)" : focus ? s.focus : s.border;

  const exec = (cmd: string, arg?: string) => {
    if (disabled) return;
    document.execCommand(cmd, false, arg);
    ref.current?.focus();
    onChange?.(ref.current?.innerHTML || "");
    setIsEmpty(!ref.current?.textContent);
  };

  const tbBtn = (btnLabel: string, action: () => void, title?: string) => (
    <button
      type="button" title={title || btnLabel}
      onMouseDown={(e) => e.preventDefault()} onClick={action} disabled={disabled}
      style={{
        background: "transparent", border: "1px solid var(--border-1)",
        color: "var(--text-primary)", padding: "5px 9px", borderRadius: "var(--radius-sm)",
        fontFamily: "var(--font-mono)", fontSize: "0.74rem", fontWeight: 700,
        cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.4 : 1,
        transition: "background 150ms, border-color 150ms",
      }}
      onMouseEnter={(e) => { if (!disabled) { (e.currentTarget as HTMLElement).style.background = "var(--ink-surface2)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border-2)"; } }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border-1)"; }}
    >
      {btnLabel}
    </button>
  );

  return (
    <div className={className} style={{ display: "flex", flexDirection: "column", gap: 6, fontFamily: "var(--font-mono)", ...style }}>
      {label ? (
        <div style={{ fontSize: "0.66rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--text-muted)" }}>
          {label}
        </div>
      ) : null}
      <div style={{
        background: disabled ? "rgba(255,255,255,0.008)" : "var(--ink-surface)",
        border: `1px solid ${borderColor}`, borderRadius: "var(--radius-md)",
        boxShadow: focus && !disabled ? `0 0 0 3px ${state === "default" ? "var(--gold-glow)" : `var(--state-${state}-glow)`}` : "none",
        transition: "border-color 180ms, box-shadow 180ms", opacity: disabled ? 0.55 : 1, overflow: "hidden",
      }}>
        <div style={{
          display: "flex", gap: 6, padding: "8px 10px", borderBottom: "1px solid var(--border-1)",
          background: "rgba(255,255,255,0.015)", flexWrap: "wrap",
        }}>
          {tbBtn("B", () => exec("bold"), "Bold")}
          {tbBtn("I", () => exec("italic"), "Italic")}
          {tbBtn("U", () => exec("underline"), "Underline")}
          <div style={{ width: 1, background: "var(--border-1)", margin: "2px 4px" }} />
          {tbBtn("‹/›", () => exec("formatBlock", "<pre>"), "Code block")}
          {tbBtn("•", () => exec("insertUnorderedList"), "Bulleted list")}
          {tbBtn("1.", () => exec("insertOrderedList"), "Numbered list")}
          <div style={{ width: 1, background: "var(--border-1)", margin: "2px 4px" }} />
          {tbBtn("↗", () => { const url = window.prompt("Link to:", "https://"); if (url) exec("createLink", url); }, "Insert link")}
          {tbBtn("⌫", () => exec("removeFormat"), "Clear formatting")}
        </div>
        <div style={{ position: "relative" }}>
          <div
            ref={ref} id={id} contentEditable={!disabled} suppressContentEditableWarning
            onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
            onInput={(e) => {
              setIsEmpty(!(e.currentTarget as HTMLElement).textContent);
              onChange?.((e.currentTarget as HTMLElement).innerHTML);
            }}
            style={{
              minHeight, padding: "14px 16px", outline: "none",
              color: "var(--text-primary)", caretColor: "var(--accent)",
              fontFamily: "var(--font-mono)", fontSize: "0.85rem",
              fontWeight: 400, lineHeight: 1.7, letterSpacing: "-0.005em",
            }}
          />
          {isEmpty && !focus ? (
            <div style={{
              position: "absolute", top: 14, left: 16, color: "var(--text-muted)",
              pointerEvents: "none", fontFamily: "var(--font-mono)", fontSize: "0.85rem",
            }}>
              {placeholder}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
