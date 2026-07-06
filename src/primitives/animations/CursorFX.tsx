"use client";

import { useCursorFX } from "./useCursorFX";

export interface CursorFXProps {
  enabled?: boolean;
}

/** Declarative mount for the custom cursor. Drop `<CursorFX />` in your layout. */
export function CursorFX({ enabled = true }: CursorFXProps) {
  useCursorFX(enabled);
  return null;
}
