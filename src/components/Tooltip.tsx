"use client";

import React, { useState, useRef, useEffect } from "react";

export type TooltipSide = "top" | "bottom" | "left" | "right";
export type TooltipState = "default" | "success" | "warning" | "error" | "info";

export interface TooltipProps {
  children: React.ReactElement;
  content: React.ReactNode;
  side?: TooltipSide;
  delay?: number;
  state?: TooltipState;
  style?: React.CSSProperties;
  /** Applied to the tooltip bubble element. */
  className?: string;
}

/** Fixed-positioned tooltip that follows its trigger on scroll/resize. Hover + focus aware. */
export function Tooltip({ children, content, side = "top", delay = 120, state = "default", style = {}, className }: TooltipProps) {
  const triggerRef = useRef<HTMLElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const place = () => {
    const t = triggerRef.current;
    const tip = tipRef.current;
    if (!t || !tip) return;
    const r = t.getBoundingClientRect();
    const tw = tip.offsetWidth;
    const th = tip.offsetHeight;
    let x = 0, y = 0;
    const gap = 10;
    if (side === "top") { x = r.left + r.width / 2 - tw / 2; y = r.top - th - gap; }
    if (side === "bottom") { x = r.left + r.width / 2 - tw / 2; y = r.bottom + gap; }
    if (side === "left") { x = r.left - tw - gap; y = r.top + r.height / 2 - th / 2; }
    if (side === "right") { x = r.right + gap; y = r.top + r.height / 2 - th / 2; }
    setPos({ x: Math.max(8, x), y: Math.max(8, y) });
  };

  useEffect(() => {
    if (!shown) return;
    place();
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown]);

  const open = () => { if (timer.current) clearTimeout(timer.current); timer.current = setTimeout(() => setShown(true), delay); };
  const close = () => { if (timer.current) clearTimeout(timer.current); setShown(false); };

  const child = React.Children.only(children);
  const trigger = React.cloneElement(child, {
    ref: (node: HTMLElement) => {
      (triggerRef as React.MutableRefObject<HTMLElement | null>).current = node;
      const r = (child as React.RefAttributes<HTMLElement>).ref;
      if (typeof r === "function") r(node);
      else if (r && typeof r === "object") (r as React.MutableRefObject<HTMLElement | null>).current = node;
    },
    onMouseEnter: (e: React.MouseEvent) => { open(); (child.props as React.HTMLAttributes<HTMLElement>).onMouseEnter?.(e as React.MouseEvent<HTMLElement>); },
    onMouseLeave: (e: React.MouseEvent) => { close(); (child.props as React.HTMLAttributes<HTMLElement>).onMouseLeave?.(e as React.MouseEvent<HTMLElement>); },
    onFocus: (e: React.FocusEvent) => { open(); (child.props as React.HTMLAttributes<HTMLElement>).onFocus?.(e as React.FocusEvent<HTMLElement>); },
    onBlur: (e: React.FocusEvent) => { close(); (child.props as React.HTMLAttributes<HTMLElement>).onBlur?.(e as React.FocusEvent<HTMLElement>); },
  } as Partial<React.HTMLAttributes<HTMLElement>>);

  const stateMap: Record<TooltipState, { border: string; text: string }> = {
    default: { border: "var(--border-2)", text: "var(--text-primary)" },
    success: { border: "var(--state-success-border)", text: "var(--state-success-text)" },
    warning: { border: "var(--state-warning-border)", text: "var(--state-warning-text)" },
    error: { border: "var(--state-error-border)", text: "var(--state-error-text)" },
    info: { border: "var(--state-info-border)", text: "var(--state-info-text)" },
  };
  const s = stateMap[state] || stateMap.default;

  return (
    <>
      {trigger}
      {shown ? (
        <div
          ref={tipRef} role="tooltip"
          className={className}
          style={{
            position: "fixed", left: pos.x, top: pos.y, zIndex: 9999, pointerEvents: "none",
            background: "rgba(10,8,5,0.94)", border: `1px solid ${s.border}`, color: s.text,
            fontFamily: "var(--font-mono)", fontSize: "0.72rem", fontWeight: 500,
            letterSpacing: "-0.005em", lineHeight: 1.5, padding: "7px 10px", borderRadius: "var(--radius-sm)",
            boxShadow: "0 12px 28px rgba(0,0,0,0.55)", backdropFilter: "blur(6px)", maxWidth: 280, ...style,
          }}
        >
          {content}
        </div>
      ) : null}
    </>
  );
}
