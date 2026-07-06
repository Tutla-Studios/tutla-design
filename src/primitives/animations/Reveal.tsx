import React from "react";

export interface RevealProps {
  children?: React.ReactNode;
  /** Stagger step 1–4, mapped to the `data-d` transition delays. */
  delay?: 1 | 2 | 3 | 4;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Convenience wrapper that renders an element with the `reveal` class (and an
 * optional stagger). Call `useReveal()` once near the page root to drive it.
 *
 *   useReveal();
 *   <Reveal delay={2}>…</Reveal>
 */
export function Reveal({ children, delay, as = "div", className, style }: RevealProps) {
  const Tag = as as React.ElementType;
  return (
    <Tag
      className={["reveal", className].filter(Boolean).join(" ")}
      data-d={delay ? String(delay) : undefined}
      style={style}
    >
      {children}
    </Tag>
  );
}
