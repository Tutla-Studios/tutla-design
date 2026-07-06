"use client";

import React, { useEffect, useRef } from "react";
import { prefersReducedMotion } from "./prefersReducedMotion";

export interface ParticleCanvasProps {
  /** Multiplier on the auto-computed particle count. */
  density?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Fixed full-viewport constellation of drifting gold particles that connect
 * with faint lines and gently repel from the pointer. Decorative background —
 * renders nothing under reduced motion. Keep at z-index 0.
 */
export function ParticleCanvas({ density = 1, className, style }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0, dpr = 1;
    let parts: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    let raf = 0;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = window.innerWidth * dpr;
      h = canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      const count = Math.floor(((window.innerWidth * window.innerHeight) / 26000) * density);
      parts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.16 * dpr,
        vy: (Math.random() - 0.5) * 0.16 * dpr,
        r: (Math.random() * 1.6 + 0.6) * dpr,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX * dpr;
      mouse.y = e.clientY * dpr;
    };
    window.addEventListener("mousemove", onMove);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        const mdx = p.x - mouse.x, mdy = p.y - mouse.y;
        const md = Math.hypot(mdx, mdy);
        if (md < 130 * dpr && md > 0) {
          const f = (130 * dpr - md) / (130 * dpr);
          p.x += (mdx / md) * f * 1.4;
          p.y += (mdy / md) * f * 1.4;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(205,177,127,0.55)";
        ctx.fill();
      }
      const maxd = 116 * dpr;
      for (let a = 0; a < parts.length; a++) {
        for (let b = a + 1; b < parts.length; b++) {
          const dx = parts[a].x - parts[b].x, dy = parts[a].y - parts[b].y;
          const d = Math.hypot(dx, dy);
          if (d < maxd) {
            ctx.strokeStyle = `rgba(205,177,127,${0.14 * (1 - d / maxd)})`;
            ctx.lineWidth = dpr * 0.6;
            ctx.beginPath();
            ctx.moveTo(parts[a].x, parts[a].y);
            ctx.lineTo(parts[b].x, parts[b].y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [density]);

  if (prefersReducedMotion()) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", ...style }}
    />
  );
}
