"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "./prefersReducedMotion";

/**
 * Cycling typewriter effect. Types each string, pauses, deletes, then advances
 * to the next — looping forever. Returns the currently-visible substring so you
 * can render it next to a `.cursor-blink`. Under reduced motion it simply shows
 * the first string.
 *
 *   const typed = useTypewriter(["for Linux.", "for Discord."]);
 */
export function useTypewriter(texts: string[], speed = 80): string {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setDisplayed(texts[0] ?? "");
      return;
    }
    const cur = texts[idx] ?? "";
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && charIdx < cur.length) t = setTimeout(() => setCharIdx((c) => c + 1), speed);
    else if (!deleting && charIdx === cur.length) t = setTimeout(() => setDeleting(true), 1800);
    else if (deleting && charIdx > 0) t = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    else {
      setDeleting(false);
      setIdx((i) => (i + 1) % texts.length);
    }
    setDisplayed(cur.slice(0, charIdx));
    return () => clearTimeout(t);
  }, [charIdx, deleting, idx, texts, speed]);

  return displayed;
}
