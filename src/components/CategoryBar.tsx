"use client";

import React from "react";

export interface CategoryBarProps {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Horizontal segmented filter — a row of pill buttons with one active.
 * (From account.tutla.net's `CategoryBar`, retokenised.)
 */
export function CategoryBar({ categories, active, onChange, style = {}, className }: CategoryBarProps) {
  return (
    <div className={className} style={{ display: "flex", gap: 4, flexWrap: "wrap", fontFamily: "var(--font-mono)", ...style }}>
      {categories.map((cat) => {
        const isActive = active === cat;
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            style={{
              padding: "5px 12px", borderRadius: "var(--radius-sm)", fontSize: "0.7rem", fontWeight: 600,
              border: `1px solid ${isActive ? "var(--border-2)" : "var(--border-1)"}`,
              background: isActive ? "rgba(205,177,127,0.10)" : "var(--ink-base)",
              color: isActive ? "var(--accent)" : "var(--text-muted)",
              cursor: "pointer", fontFamily: "var(--font-mono)", transition: "all 0.15s",
            }}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
