"use client";

import React, { useState } from "react";

export interface LogoProps {
  src?: string | null;
  alt?: string;
  fallbackIcon?: React.ReactNode;
  size?: number;
  style?: React.CSSProperties;
}

/** Image logo that gracefully falls back to an icon when the src is missing or fails to load. */
export function Logo({
  src = null,
  alt = "",
  fallbackIcon = null,
  size = 28,
  style = {},
}: LogoProps) {
  const [errored, setErrored] = useState(false);
  const showFallback = !src || errored;

  if (showFallback) {
    return (
      <span
        aria-label={alt || undefined}
        style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: size, height: size,
          color: "var(--accent)", fontSize: size, lineHeight: 1,
          ...style,
        }}
      >
        {fallbackIcon}
      </span>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      onError={() => setErrored(true)}
      style={{ display: "block", objectFit: "contain", ...style }}
    />
  );
}
