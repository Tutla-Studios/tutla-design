/**
 * TUTLA DESIGN SYSTEM — animations
 *
 * Motion hooks and the declarative components that drive the CSS classes in
 * `styles/animations.css`. Every hook is reduced-motion aware.
 */

export { prefersReducedMotion } from "./prefersReducedMotion";

// Hooks
export { useReveal } from "./useReveal";
export { useTilt, type UseTiltOptions } from "./useTilt";
export { useMagnetic, type UseMagneticOptions } from "./useMagnetic";
export { useTypewriter } from "./useTypewriter";
export { useCursorFX } from "./useCursorFX";

// Components
export { Reveal, type RevealProps } from "./Reveal";
export { CursorFX, type CursorFXProps } from "./CursorFX";
export { CursorBlink, type CursorBlinkProps } from "./CursorBlink";
export { BackgroundGrid, type BackgroundGridProps } from "./BackgroundGrid";
export { ParticleCanvas, type ParticleCanvasProps } from "./ParticleCanvas";
