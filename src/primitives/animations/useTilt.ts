"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "./prefersReducedMotion";

export interface UseTiltOptions {
  /** Max rotation in degrees. */
  max?: number;
  /** Scale applied while hovering. */
  scale?: number;
  enabled?: boolean;
}

/**
 * 3D pointer-tilt for a card. Attach the returned ref to the element. Any
 * descendant carrying a `data-depth="<px>"` attribute parallax-shifts by that
 * amount, giving a layered feel. No-ops under reduced motion.
 *
 *   const ref = useTilt({ max: 9 });
 *   <div ref={ref} style={{ transformStyle: "preserve-3d" }}>…</div>
 */
export function useTilt<T extends HTMLElement = HTMLDivElement>({
  max = 12,
  scale = 1.0,
  enabled = true,
}: UseTiltOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled || prefersReducedMotion()) return;

    let raf = 0;
    el.style.transformStyle = "preserve-3d";

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `rotateY(${px * max}deg) rotateX(${-py * max}deg) scale(${scale})`;
        el.querySelectorAll<HTMLElement>("[data-depth]").forEach((c) => {
          const d = parseFloat(c.dataset.depth ?? "0");
          c.style.transform = `translate(${px * d}px, ${py * d}px)`;
        });
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = "rotateY(0) rotateX(0) scale(1)";
      el.querySelectorAll<HTMLElement>("[data-depth]").forEach((c) => {
        c.style.transform = "translate(0,0)";
      });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [max, scale, enabled]);

  return ref;
}
