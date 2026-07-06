import { defineConfig } from "tsup";

/**
 * Optional bundle build for publishing to a registry that can't consume raw
 * TypeScript source. The primary distribution path is source-based (see the
 * "exports" map in package.json) which lets Next.js honour the "use client"
 * directives directly via `transpilePackages`.
 */
export default defineConfig({
  entry: [
    "src/index.ts",
    "src/primitives/index.ts",
    "src/primitives/animations/index.ts",
    "src/components/index.ts",
    "src/components/nodes/index.ts",
    "src/styles/tokens.ts",
    "src/tailwind-preset.ts",
  ],
  format: ["esm"],
  dts: true,
  splitting: true,
  treeshake: true,
  clean: true,
  external: ["react", "react-dom", "react-icons"],
});
