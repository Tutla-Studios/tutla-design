"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "./prefersReducedMotion";

/**
 * Scroll-reveal driver. Add `className="reveal"` (optionally with
 * `data-d="1..4"` for stagger) to any element, then call `useReveal()` once
 * near the root of the page. Elements fade + rise in as they enter the
 * viewport. Falls back to instantly-visible when motion is reduced or when a
 * transition-support probe fails.
 *
 * Requires `@tutla/design/styles` (or at least `animations.css`) to be loaded.
 */
export function useReveal(): void {
  useEffect(() => {
    const reduced = prefersReducedMotion();

    // Probe: if CSS transitions don't actually run, disable the animation so
    // content is never stuck invisible.
    const probe = document.createElement("div");
    probe.style.cssText =
      "position:fixed;left:-9999px;top:0;width:4px;height:4px;opacity:0;transition:opacity .18s linear;pointer-events:none;";
    document.body.appendChild(probe);
    void probe.offsetWidth;
    probe.style.opacity = "1";
    const probeTimer = window.setTimeout(() => {
      const moved = parseFloat(getComputedStyle(probe).opacity) > 0.05;
      probe.remove();
      if (!moved) document.documentElement.classList.add("no-reveal-anim");
    }, 200);

    const reveal = () => {
      if (reduced) {
        document.querySelectorAll(".reveal:not(.in)").forEach((e) => e.classList.add("in"));
        return;
      }
      const vh = window.innerHeight;
      document.querySelectorAll(".reveal:not(.in)").forEach((e) => {
        if (e.getBoundingClientRect().top < vh * 0.9) e.classList.add("in");
      });
    };

    const timers = [0, 60, 160, 350, 700].map((ms) => window.setTimeout(reveal, ms));
    window.addEventListener("scroll", reveal, { passive: true });
    window.addEventListener("resize", reveal);
    return () => {
      window.clearTimeout(probeTimer);
      timers.forEach((t) => window.clearTimeout(t));
      window.removeEventListener("scroll", reveal);
      window.removeEventListener("resize", reveal);
    };
  }, []);
}
