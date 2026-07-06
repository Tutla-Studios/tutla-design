"use client";

import React, { useState } from "react";

export interface CredRowProps {
  label: string;
  value: string;
  /** Render the value in a monospace/broken layout (ids, secrets, tokens). */
  mono?: boolean;
  /** Show a copy-to-clipboard button. */
  copy?: boolean;
  style?: React.CSSProperties;
}

/**
 * Labelled read-only value with an optional copy button that confirms inline.
 * Ideal for API keys, client ids and other credentials. (From account.tutla.net,
 * retokenised.)
 */
export function CredRow({ label, value, mono, copy: copyable, style = {} }: CredRowProps) {
  const [copied, setCopied] = useState(false);
  const doCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, fontFamily: "var(--font-mono)", ...style }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: "0.66rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.16em", marginBottom: 3 }}>
          {label}
        </div>
        <div style={{ fontSize: "0.78rem", color: "var(--text-body)", fontFamily: mono ? "var(--font-mono)" : "inherit", wordBreak: "break-all" }}>
          {value}
        </div>
      </div>
      {copyable && (
        <button
          onClick={doCopy}
          style={{
            background: copied ? "var(--state-success-bg)" : "var(--ink-surface)",
            border: `1px solid ${copied ? "var(--state-success-border)" : "var(--border-2)"}`,
            borderRadius: "var(--radius-sm)", padding: "4px 10px", fontSize: "0.7rem",
            color: copied ? "var(--state-success-text)" : "var(--text-muted)",
            cursor: "pointer", flexShrink: 0, transition: "all 0.15s", fontFamily: "var(--font-mono)", fontWeight: 700,
          }}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      )}
    </div>
  );
}
