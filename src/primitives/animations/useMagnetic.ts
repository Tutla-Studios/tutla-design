"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "./prefersReducedMotion";

export interface UseMagneticOptions {
  /** Pull strength as a fraction of pointer distance from centre. */
  strength?: number;
  enabled?: boolean;
}

/**
 * Magnetic hover: the element drifts toward the pointer while hovered and
 * springs back on leave. Attach the returned ref. No-ops under reduced motion.
 * Powers the magnetic buttons in the system.
 */
export function useMagnetic<T extends HTMLElement = HTMLAnchorElement>({
  strength = 0.22,
  enabled = true,
}: UseMagneticOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled || prefersReducedMotion()) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * strength;
      const dy = (e.clientY - (r.top + r.height / 2)) * strength;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = "translate(0,0)";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [strength, enabled]);

  return ref;
}
