"use client";

import React, { useState, useRef, useEffect, useId } from "react";

export interface AccordionItemData {
  id: string;
  title: string;
  content: React.ReactNode;
  defaultOpen?: boolean;
  icon?: React.ReactNode;
}

export interface AccordionProps {
  items?: AccordionItemData[] | null;
  children?: React.ReactNode;
  mode?: "single" | "multi";
  style?: React.CSSProperties;
  className?: string;
}

/** Collapsible sections with animated height. `single` closes siblings, `multi` allows many open. */
export function Accordion({ items = null, children, mode = "single", style = {}, className }: AccordionProps) {
  const initial = (items || []).filter((i) => i.defaultOpen).map((i) => i.id);
  const [open, setOpen] = useState(new Set(initial));

  const toggle = (id: string) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); return next; }
      if (mode === "single") next.clear();
      next.add(id);
      return next;
    });
  };

  return (
    <div className={className} style={{ display: "flex", flexDirection: "column", gap: 8, fontFamily: "var(--font-mono)", ...style }}>
      {items
        ? items.map((it) => (
            <AccordionItem key={it.id} title={it.title} icon={it.icon} isOpen={open.has(it.id)} onToggle={() => toggle(it.id)}>
              {it.content}
            </AccordionItem>
          ))
        : children}
    </div>
  );
}

export interface AccordionItemProps {
  title: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
  style?: React.CSSProperties;
  className?: string;
}

export function AccordionItem({ title, icon = null, children, defaultOpen = false, isOpen: controlled, onToggle, style = {}, className }: AccordionItemProps) {
  const uid = useId();
  const [uOpen, setUOpen] = useState(defaultOpen);
  const isControlled = typeof controlled === "boolean";
  const open = isControlled ? controlled : uOpen;
  const bodyRef = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(0);

  useEffect(() => {
    if (!bodyRef.current) return;
    setH(bodyRef.current.scrollHeight);
  }, [open, children]);

  const handleToggle = () => {
    if (isControlled) onToggle?.();
    else setUOpen((v) => !v);
  };

  return (
    <div className={className} style={{
      borderWidth: 1, borderStyle: "solid",
      borderColor: open ? "var(--border-2)" : "var(--border-1)",
      borderRadius: "var(--radius-lg)",
      background: open ? "rgba(205,177,127,0.04)" : "rgba(255,255,255,0.012)",
      overflow: "hidden",
      transition: "border-color 200ms, background 200ms",
      ...style,
    }}>
      <button
        type="button" aria-expanded={open} aria-controls={`acc-${uid}`} onClick={handleToggle}
        style={{
          width: "100%", display: "flex", alignItems: "center", gap: 12,
          background: "transparent", border: "none", textAlign: "left", padding: "14px 16px", cursor: "pointer",
          color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "0.86rem",
        }}
      >
        {icon ? <span style={{ color: "var(--tan-500)", display: "inline-flex" }}>{icon}</span> : null}
        <span style={{ flex: 1 }}>{title}</span>
        <span aria-hidden style={{
          color: "var(--text-gold-soft)", fontSize: "0.85rem", display: "inline-block",
          transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 240ms var(--ease-spring)",
        }}>
          ›
        </span>
      </button>
      <div id={`acc-${uid}`} role="region" style={{ height: open ? h : 0, overflow: "hidden", transition: "height 280ms var(--ease-spring)" }}>
        <div ref={bodyRef} style={{ padding: "0 16px 16px 16px", color: "var(--text-body)", fontSize: "0.82rem", lineHeight: 1.7 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
