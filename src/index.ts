/**
 * ═══════════════════════════════════════════════════════════════
 *  @tutla/design — the Tutla design system
 *  Warm gold on near-black. Terminal hacker meets craftsman's workshop.
 *
 *  Merged from tutla.net and account.tutla.net into one library:
 *    • primitives           — base building blocks + styles
 *    • primitives/animations — motion hooks & components
 *    • components           — composed / non-native components
 *    • styles               — the token + animation stylesheets
 *    • tokens               — the same values as JS objects
 *    • tailwind-preset      — Tailwind theme extension
 *
 *  Load the stylesheet once at your app root:
 *      import "@tutla/design/styles";
 * ═══════════════════════════════════════════════════════════════
 */

// Primitives (includes animations)
export * from "./primitives";

// Primary components (includes node graph)
export * from "./components";

// Design tokens as JS
export {
  tokens,
  colors,
  projectAccents,
  space,
  radius,
  fontSize,
  fontWeight,
  fontFamily,
  motion,
  shadow,
  type ProjectAccent,
} from "./styles/tokens";

// Tailwind preset (default export re-exposed as a named export)
export { default as tailwindPreset } from "./tailwind-preset";
