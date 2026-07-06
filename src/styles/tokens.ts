/**
 * TUTLA DESIGN SYSTEM — tokens as JS objects.
 *
 * Mirrors `tokens.css`. Prefer the CSS custom properties (e.g.
 * `var(--accent)`) inside component styles; use these objects when you
 * need token values in JS (charts, canvas, dynamic inline styles, tests).
 */

export const colors = {
  tan: {
    50: "#faf8f2",
    100: "#f4efe0",
    200: "#e7ddc1",
    300: "#d8c599",
    400: "#cdb17f",
    500: "#bb9254",
    600: "#ae7e48",
    700: "#91653d",
    800: "#755237",
    900: "#5f442f",
    950: "#332217",
  },
  ink: {
    base: "#0a0805",
    deep: "#020100",
    surface: "#161208",
    surface2: "#221a10",
  },
  line: {
    border1: "rgba(205, 177, 127, 0.13)",
    border2: "rgba(205, 177, 127, 0.26)",
    goldGlow: "rgba(205, 177, 127, 0.22)",
    grid: "rgba(205, 177, 127, 0.045)",
  },
  text: {
    strong: "#ffffff",
    primary: "#f4efe0",
    body: "#9c9183",
    muted: "#6f6557",
    gold: "#cdb17f",
    goldSoft: "#d8c599",
    onAccent: "#241a0d",
  },
  terminal: {
    green: "#7bb36a",
    blue: "#6f93c9",
    code: "rgba(134, 239, 172, 0.7)",
  },
  amber: {
    text: "#f0cd6a",
    border: "rgba(234, 179, 8, 0.32)",
    bg: "rgba(234, 179, 8, 0.09)",
  },
} as const;

/** Per-project accent ramps (violet, indigo, green, red, cyan, orange). */
export const projectAccents = {
  violet: { text: "#c4b5fd", border: "rgba(139, 92, 246, 0.22)", hover: "rgba(167, 139, 250, 0.5)", glow: "rgba(76, 29, 149, 0.20)" },
  indigo: { text: "#a5b4fc", border: "rgba(99, 102, 241, 0.22)", hover: "rgba(129, 140, 248, 0.5)", glow: "rgba(49, 46, 129, 0.20)" },
  green:  { text: "#86efac", border: "rgba(34, 197, 94, 0.22)",  hover: "rgba(74, 222, 128, 0.5)", glow: "rgba(20, 83, 45, 0.20)" },
  red:    { text: "#fca5a5", border: "rgba(239, 68, 68, 0.22)",  hover: "rgba(248, 113, 113, 0.5)", glow: "rgba(127, 29, 29, 0.20)" },
  cyan:   { text: "#67e8f9", border: "rgba(6, 182, 212, 0.22)",  hover: "rgba(34, 211, 238, 0.5)", glow: "rgba(22, 78, 99, 0.20)" },
  orange: { text: "#fdba74", border: "rgba(249, 115, 22, 0.22)", hover: "rgba(251, 146, 60, 0.5)", glow: "rgba(124, 45, 18, 0.20)" },
} as const;

export type ProjectAccent = keyof typeof projectAccents;

export const space = {
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  7: "32px",
  8: "40px",
  9: "48px",
  10: "60px",
  12: "72px",
  16: "96px",
} as const;

export const radius = {
  pill: "999px",
  sm: "6px",
  md: "9px",
  btn: "11px",
  lg: "13px",
  card: "18px",
  xl: "20px",
  icon: "16px",
} as const;

export const fontSize = {
  hero: "clamp(2.6rem, 7vw, 5rem)",
  section: "clamp(2.2rem, 4.6vw, 3.2rem)",
  h2: "clamp(1.7rem, 3.6vw, 2.6rem)",
  h3: "clamp(1.2rem, 2.4vw, 1.7rem)",
  cardTitle: "1.1rem",
  featureTitle: "0.92rem",
  lead: "clamp(1rem, 1.4vw, 1.16rem)",
  body: "0.88rem",
  sm: "0.84rem",
  ui: "0.8rem",
  xs: "0.74rem",
  eyebrow: "0.66rem",
  micro: "0.58rem",
  code: "0.72rem",
} as const;

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  black: 800,
} as const;

export const fontFamily = {
  mono: '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace',
} as const;

export const motion = {
  easeSpring: "cubic-bezier(0.22, 1, 0.36, 1)",
  durFast: "180ms",
  durBase: "300ms",
  durReveal: "700ms",
  revealStagger: "0.07s",
} as const;

export const shadow = {
  lipGold: "0 5px 0 #91653d, 0 12px 22px rgba(205,177,127,0.26)",
  lipGoldHover: "0 8px 0 #91653d, 0 18px 32px rgba(205,177,127,0.34)",
  lipGhost: "0 5px 0 rgba(0,0,0,0.45)",
  card: "0 24px 50px rgba(0,0,0,0.5)",
  float: "0 30px 70px rgba(0,0,0,0.45)",
  terminal: "0 30px 60px rgba(0,0,0,0.55)",
  logo: "0 4px 14px rgba(205,177,127,0.3)",
} as const;

export const tokens = {
  colors,
  projectAccents,
  space,
  radius,
  fontSize,
  fontWeight,
  fontFamily,
  motion,
  shadow,
} as const;

export default tokens;
