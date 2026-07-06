/**
 * TUTLA DESIGN SYSTEM — primitives
 *
 * Base, single-purpose building blocks styled straight from the design tokens.
 * Everything here is self-contained (inline styles referencing CSS custom
 * properties) — load `@tutla/design/styles` so the tokens exist.
 *
 * Motion hooks/components live in `./animations` and are re-exported here for
 * convenience.
 */

// Actions
export {
  Button,
  AccentButton,
  GhostButton,
  type ButtonProps,
  type ButtonVariant,
  type ButtonSize,
} from "./Button";

// Display
export { Badge, type BadgeProps } from "./Badge";
export { Chip, type ChipProps } from "./Chip";
export { Eyebrow, type EyebrowProps } from "./Eyebrow";
export { IconTile, type IconTileProps, type IconTileAccent } from "./IconTile";
export { Logo, type LogoProps } from "./Logo";

// Surfaces & labels
export { Panel, type PanelProps } from "./Panel";
export { SectionLabel, type SectionLabelProps } from "./SectionLabel";
export { Note, type NoteProps } from "./Note";

// Form inputs
export { Input, type InputProps, type FieldState } from "./Input";
export { Textarea, type TextareaProps } from "./Textarea";
export { Select, type SelectProps, type SelectOption } from "./Select";

// Text / markdown atoms
export { Code, type CodeProps } from "./Code";
export { Kbd, type KbdProps } from "./Kbd";
export { Blockquote, type BlockquoteProps } from "./Blockquote";

// Animations (hooks + declarative components)
export * from "./animations";
