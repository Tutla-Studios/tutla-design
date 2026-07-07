import React from "react";

export interface TableColumn {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
  width?: string;
  strong?: boolean;
  nowrap?: boolean;
  render?: (row: Record<string, unknown>, index: number) => React.ReactNode;
}

export interface TableProps {
  columns?: TableColumn[] | null;
  rows?: Record<string, unknown>[] | null;
  children?: React.ReactNode;
  dense?: boolean;
  caption?: string | null;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Data table with a bordered shell and optional caption. Pass `columns` + `rows`
 * for a declarative table (with per-column `render`), or `children` for full control.
 */
export function Table({ columns = null, rows = null, children = null, dense = false, caption = null, style = {}, className }: TableProps) {
  const pad = dense ? "10px 14px" : "13px 16px";

  return (
    <div className={className} style={{
      border: "1px solid var(--border-1)", borderRadius: "var(--radius-lg)", overflow: "hidden",
      background: "var(--ink-base)", fontFamily: "var(--font-mono)", ...style,
    }}>
      {caption ? (
        <div style={{
          padding: "13px 16px", borderBottom: "1px solid var(--border-1)", fontSize: "0.66rem",
          fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--text-muted)",
        }}>
          {caption}
        </div>
      ) : null}
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-mono)" }}>
        {columns && rows ? (
          <>
            <thead>
              <tr>
                {columns.map((c) => (
                  <th key={c.key} style={{
                    textAlign: c.align || "left", padding: pad, fontSize: "0.62rem", textTransform: "uppercase",
                    letterSpacing: "0.16em", fontWeight: 700, color: "var(--text-muted)",
                    borderBottom: "1px solid var(--border-1)", background: "rgba(255,255,255,0.015)",
                    width: c.width, whiteSpace: "nowrap",
                  }}>
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={(r.id as string | number) ?? i}>
                  {columns.map((c) => (
                    <td key={c.key} style={{
                      padding: pad, fontSize: "0.78rem", lineHeight: 1.55,
                      color: c.strong ? "var(--text-strong)" : "var(--text-body)", fontWeight: c.strong ? 700 : 400,
                      borderTop: i === 0 ? "none" : "1px solid var(--border-1)",
                      textAlign: c.align || "left", whiteSpace: c.nowrap ? "nowrap" : "normal",
                    }}>
                      {c.render ? c.render(r, i) : String(r[c.key] ?? "")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </>
        ) : children}
      </table>
    </div>
  );
}
