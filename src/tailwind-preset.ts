/**
 * Tailwind preset for the Tutla design system.
 *
 * Merges the theme extensions used across tutla.net and account.tutla.net so
 * utilities like `bg-ink-surface`, `text-tan-400`, `shadow-lip`, `ease-spring`
 * and the `fade-in` / `slide-up` animations are available everywhere.
 *
 *   // tailwind.config.ts
 *   import tutlaPreset from "@tutla/design/tailwind-preset";
 *   export default { presets: [tutlaPreset], content: [...] };
 *
 * Typed loosely so consumers don't need `tailwindcss` installed to import it;
 * it satisfies the `presets: [...]` slot of a Tailwind config.
 */
const preset = {
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', "ui-monospace", '"SF Mono"', "Menlo", "Consolas", "monospace"],
        sans: ['"JetBrains Mono"', "ui-monospace", '"SF Mono"', "Menlo", "monospace"],
      },
      colors: {
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
        // Aliases kept for account.tutla.net compatibility.
        background: "#0a0805",
        surface: "#161208",
        surfaceHigh: "#221a10",
        subtle: "#9c9183",
        accent: {
          DEFAULT: "#cdb17f",
          light: "#d8c599",
          dark: "#91653d",
          dim: "rgba(205,177,127,0.12)",
        },
      },
      borderColor: {
        subtle: "rgba(205,177,127,0.13)",
        strong: "rgba(205,177,127,0.26)",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      boxShadow: {
        glow: "0 0 20px rgba(205,177,127,0.14)",
        "glow-md": "0 0 40px rgba(205,177,127,0.22)",
        "glow-input": "0 0 0 3px rgba(205,177,127,0.07)",
        lip: "0 5px 0 #91653d, 0 12px 22px rgba(205,177,127,0.26)",
        "lip-hover": "0 8px 0 #91653d, 0 18px 32px rgba(205,177,127,0.34)",
        card: "0 24px 50px rgba(0,0,0,0.5)",
        terminal: "0 30px 60px rgba(0,0,0,0.55)",
      },
      borderRadius: {
        pill: "999px",
        btn: "11px",
        card: "18px",
        icon: "16px",
      },
      animation: {
        "fade-in": "tutla-fade-in 0.4s ease forwards",
        "slide-up": "tutla-slide-up 0.5s cubic-bezier(0.22,1,0.36,1) forwards",
      },
      keyframes: {
        "tutla-fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "tutla-slide-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
};

export default preset;
