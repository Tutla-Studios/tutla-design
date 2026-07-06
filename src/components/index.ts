/**
 * TUTLA DESIGN SYSTEM — primary components
 *
 * Higher-level, composed components: primitives + animations, plus non-native
 * elements (rich text editor, colour picker, node graph, …). These build on
 * `../primitives` and expect `@tutla/design/styles` to be loaded.
 */

// Forms & editors
export { RichTextEditor, type RichTextEditorProps } from "./RichTextEditor";
export { DatePicker, type DatePickerProps } from "./DatePicker";
export { ColorPicker, type ColorPickerProps } from "./ColorPicker";
export { Accordion, AccordionItem, type AccordionProps, type AccordionItemProps, type AccordionItemData } from "./Accordion";

// Feedback & overlays
export { Message, type MessageProps, type MessageState } from "./Message";
export { Tooltip, type TooltipProps, type TooltipSide, type TooltipState } from "./Tooltip";
export { ContextMenu, type ContextMenuProps, type ContextMenuItem } from "./ContextMenu";

// Data & display
export { Table, type TableProps, type TableColumn } from "./Table";
export { Terminal, type TerminalProps } from "./Terminal";
export { CredRow, type CredRowProps } from "./CredRow";
export { CategoryBar, type CategoryBarProps } from "./CategoryBar";

// Cards
export { FeatureCard, type FeatureCardProps } from "./FeatureCard";
export { FeatureRow, type FeatureRowProps } from "./FeatureRow";
export { ProjectCard, type ProjectCardProps } from "./ProjectCard";

// Layout
export { Navbar, type NavbarProps, type NavLink, type SocialLink } from "./Navbar";
export { CTABanner, type CTABannerProps } from "./CTABanner";

// Node graph
export * from "./nodes";
