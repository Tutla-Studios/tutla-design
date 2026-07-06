"use client";

import React from "react";
import { useMagnetic } from "./animations/useMagnetic";

export type ButtonVariant = "accent" | "ghost" | "danger";
export type ButtonSize = "sm" | "md";

interface CommonProps {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Magnetic pointer-follow. Defaults on for links, off for actions. */
  magnetic?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

type AnchorProps = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | keyof CommonProps> & {
    href: string;
    external?: boolean;
  };

type NativeButtonProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

export type ButtonProps = AnchorProps | NativeButtonProps;

const SIZES: Record<ButtonSize, { pad: string; fs: string }> = {
  sm: { pad: "9px 16px", fs: "0.78rem" },
  md: { pad: "12px 20px", fs: "0.9rem" },
};

const ACCENT_SHADOW = "0 5px 0 var(--tan-700), 0 12px 22px rgba(205,177,127,0.26)";
const ACCENT_SHADOW_HOVER = "0 8px 0 var(--tan-700), 0 18px 32px rgba(205,177,127,0.34)";

function variantStyle(variant: ButtonVariant, disabled: boolean): React.CSSProperties {
  if (variant === "accent") {
    return disabled
      ? { background: "rgba(205,177,127,0.18)", color: "rgba(36,26,13,0.55)", boxShadow: "0 2px 0 rgba(145,101,61,0.4)", filter: "saturate(0.55)", border: "1px solid transparent" }
      : { background: "var(--accent)", color: "var(--on-accent)", boxShadow: ACCENT_SHADOW, border: "1px solid transparent" };
  }
  if (variant === "danger") {
    return disabled
      ? { background: "rgba(239,68,68,0.06)", color: "rgba(252,165,165,0.4)", borderColor: "rgba(239,68,68,0.12)", boxShadow: "0 2px 0 rgba(0,0,0,0.35)", border: "1px solid rgba(239,68,68,0.12)" }
      : { background: "var(--state-error-bg)", color: "var(--state-error-text)", border: "1px solid var(--state-error-border)", boxShadow: "var(--lip-ghost)" };
  }
  // ghost
  return disabled
    ? { background: "rgba(255,255,255,0.012)", color: "rgba(244,239,224,0.32)", borderColor: "rgba(205,177,127,0.10)", boxShadow: "0 2px 0 rgba(0,0,0,0.35)", border: "1px solid rgba(205,177,127,0.10)" }
    : { background: "var(--ink-surface)", color: "var(--tan-100)", borderColor: "var(--border-2)", boxShadow: "var(--lip-ghost)", border: "1px solid var(--border-2)" };
}

/**
 * The one button primitive. Renders an `<a>` when given `href`, otherwise a
 * native `<button>`. Merges the accent (gold lip), ghost (outlined) and danger
 * treatments from tutla.net and account.tutla.net.
 *
 *   <Button variant="accent" href="/start">Get started</Button>
 *   <Button variant="ghost" onClick={save}>Save</Button>
 */
export function Button(props: ButtonProps) {
  const {
    children,
    variant = "accent",
    size = "md",
    disabled = false,
    style = {},
    className,
  } = props;

  const isLink = "href" in props && typeof props.href === "string";
  const magnetic = props.magnetic ?? isLink;
  const magRef = useMagnetic<HTMLElement>({ enabled: magnetic && !disabled });

  const { pad, fs } = SIZES[size];
  const vStyle = variantStyle(variant, disabled);

  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontFamily: "var(--font-mono)",
    fontWeight: 700,
    fontSize: fs,
    padding: pad,
    borderRadius: "var(--radius-btn)",
    textDecoration: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    willChange: "transform",
    transition: "box-shadow 180ms, transform 60ms, background 180ms, border-color 180ms",
    ...vStyle,
    ...style,
  };

  const pressPx = variant === "accent" ? "0 5px" : "0 4px";

  const hoverIn = (e: React.MouseEvent) => {
    if (disabled) return;
    const el = e.currentTarget as HTMLElement;
    if (variant === "accent") el.style.boxShadow = ACCENT_SHADOW_HOVER;
    else {
      el.style.background = variant === "danger" ? "rgba(239,68,68,0.14)" : "var(--ink-surface2)";
      el.style.borderColor = variant === "danger" ? "var(--state-error-hover)" : "var(--accent)";
    }
  };
  const hoverOut = (e: React.MouseEvent) => {
    if (disabled) return;
    const el = e.currentTarget as HTMLElement;
    const v = variantStyle(variant, false);
    el.style.boxShadow = (v.boxShadow as string) ?? "none";
    if (v.background) el.style.background = v.background as string;
    if (v.borderColor) el.style.borderColor = v.borderColor as string;
  };
  const pressDown = (e: React.MouseEvent) => { if (!disabled) (e.currentTarget as HTMLElement).style.translate = pressPx; };
  const pressUp = (e: React.MouseEvent) => { if (!disabled) (e.currentTarget as HTMLElement).style.translate = "0 0"; };

  if (isLink) {
    const { href, external, magnetic: _m, variant: _v, size: _s, disabled: _d, style: _st, className: _c, children: _ch, ...rest } =
      props as AnchorProps;
    return (
      <a
        ref={magRef as React.Ref<HTMLAnchorElement>}
        href={disabled ? undefined : href}
        aria-disabled={disabled || undefined}
        target={external && !disabled ? "_blank" : undefined}
        rel={external && !disabled ? "noopener noreferrer" : undefined}
        className={className}
        style={{ ...base, ...(disabled ? { pointerEvents: "none" } : null) }}
        onMouseEnter={hoverIn}
        onMouseLeave={hoverOut}
        onMouseDown={pressDown}
        onMouseUp={pressUp}
        {...rest}
      >
        {children}
      </a>
    );
  }

  const { magnetic: _m2, variant: _v2, size: _s2, disabled: _d2, style: _st2, className: _c2, children: _ch2, ...btnRest } =
    props as NativeButtonProps;
  return (
    <button
      ref={magRef as React.Ref<HTMLButtonElement>}
      type={(btnRest as React.ButtonHTMLAttributes<HTMLButtonElement>).type ?? "button"}
      disabled={disabled}
      className={className}
      style={base}
      onMouseEnter={hoverIn}
      onMouseLeave={hoverOut}
      onMouseDown={pressDown}
      onMouseUp={pressUp}
      {...btnRest}
    >
      {children}
    </button>
  );
}

/** Gold, lipped call-to-action. Alias of `<Button variant="accent">`. */
export function AccentButton(props: Omit<ButtonProps, "variant">) {
  return <Button {...(props as ButtonProps)} variant="accent" />;
}

/** Outlined, low-emphasis button. Alias of `<Button variant="ghost">`. */
export function GhostButton(props: Omit<ButtonProps, "variant">) {
  return <Button {...(props as ButtonProps)} variant="ghost" />;
}
