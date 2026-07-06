"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "./prefersReducedMotion";

/**
 * Custom cursor: a gold dot that tracks the pointer exactly plus a trailing
 * ring that eases behind it and swells ("hot") over interactive elements
 * (`a`, `button`, `.chip-item`). Disabled on coarse pointers and under reduced
 * motion. Injects `.cursor-dot` / `.cursor-ring` elements — styles live in
 * `animations.css`.
 */
export function useCursorFX(enabled = true): void {
  useEffect(() => {
    if (!enabled || prefersReducedMotion()) return;
    if (typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)").matches) return;

    const dot = document.createElement("div");
    const ring = document.createElement("div");
    dot.className = "cursor-dot";
    ring.className = "cursor-ring";
    document.body.append(dot, ring);

    let rx = 0, ry = 0, x = 0, y = 0, raf = 0;
    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.left = x + "px";
      dot.style.top = y + "px";
      ring.classList.toggle("hot", !!(e.target as Element).closest("a, button, .chip-item"));
    };
    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    loop();
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      dot.remove();
      ring.remove();
    };
  }, [enabled]);
}
