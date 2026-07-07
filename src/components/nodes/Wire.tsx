"use client";

import React, { useLayoutEffect, useState, useRef } from "react";

export type WireType = "event" | "string" | "number" | "boolean" | "any";

export interface WirePoint {
  x: number;
  y: number;
}

export interface WireProps {
  /** A `Port` id (string) or an explicit point. */
  from: string | WirePoint;
  to: string | WirePoint;
  type?: WireType;
  containerRef: React.RefObject<HTMLElement | null>;
  selected?: boolean;
  animated?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const STROKE: Record<WireType, string> = {
  event: "var(--text-gold-soft)",
  string: "var(--proj-cyan-text)",
  number: "var(--proj-orange-text)",
  boolean: "var(--proj-green-text)",
  any: "var(--grey-muted-1)",
};

/**
 * Animated bezier connection between two `Port`s (by id) or two points, drawn as
 * an SVG overlay inside `containerRef`. Recomputes on resize via `ResizeObserver`.
 */
export function Wire({ from, to, type = "any", containerRef, selected = false, animated = true, style = {}, className }: WireProps) {
  const [d, setD] = useState("");
  const ranOnce = useRef(false);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    let raf = 0;
    const compute = () => {
      const c = containerRef?.current;
      if (!c) return;
      const cr = c.getBoundingClientRect();

      const resolve = (anchor: string | WirePoint): WirePoint | null => {
        if (anchor && typeof anchor === "object" && "x" in anchor) return anchor as WirePoint;
        const el = c.querySelector(`[data-port-id="${anchor}"]`);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2 - cr.left, y: r.top + r.height / 2 - cr.top };
      };

      const a = resolve(from);
      const b = resolve(to);
      if (!a || !b) return;
      const dx = Math.max(60, Math.abs(b.x - a.x) * 0.5);
      const c1 = { x: a.x + dx, y: a.y };
      const c2 = { x: b.x - dx, y: b.y };
      setD(`M ${a.x},${a.y} C ${c1.x},${c1.y} ${c2.x},${c2.y} ${b.x},${b.y}`);
      ranOnce.current = true;
    };

    compute();
    const obs = new ResizeObserver(() => { cancelAnimationFrame(raf); raf = requestAnimationFrame(compute); });
    if (containerRef?.current) obs.observe(containerRef.current);
    window.addEventListener("resize", compute);
    return () => { obs.disconnect(); window.removeEventListener("resize", compute); cancelAnimationFrame(raf); };
  }, [from, to, containerRef]);

  const color = STROKE[type] || STROKE.any;
  if (!d) return null;

  return (
    <svg className={className} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible", ...style }}>
      <path d={d} fill="none" stroke={color} strokeOpacity={selected ? 0.6 : 0.32} strokeWidth={selected ? 8 : 6} style={{ filter: "blur(4px)" }} />
      <path
        d={d} fill="none" stroke={color} strokeWidth={selected ? 2.4 : 1.8} strokeLinecap="round"
        strokeDasharray={animated ? "6 6" : undefined}
        style={animated ? { animation: "tutla-wire-flow 0.9s linear infinite" } : undefined}
      />
    </svg>
  );
}
