"use client";

import React, { useState, useEffect } from "react";

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface SocialLink {
  href: string;
  icon: React.ReactNode;
}

export interface NavbarProps {
  brand?: string;
  brandSuffix?: string;
  links?: NavLink[];
  social?: SocialLink[];
  action?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Fixed top navigation. Transparent at the top of the page, frosts on scroll.
 * Collapses to a hamburger drawer below 768px. Fully data-driven — pass your
 * own `links`, `social` icons and an `action` (e.g. a sign-in `Button`).
 */
export function Navbar({
  brand = "tutla", brandSuffix = ".net", links = [], social = [], action = null, style = {}, className,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setMobileOpen(false);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const frosted = scrolled || mobileOpen;

  return (
    <nav
      className={className}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, fontFamily: "var(--font-mono)",
        transition: "background 300ms, backdrop-filter 300ms, border-color 300ms",
        background: frosted ? "var(--nav-frost)" : "transparent",
        backdropFilter: frosted ? "var(--blur-nav)" : "none",
        WebkitBackdropFilter: frosted ? "var(--blur-nav)" : "none",
        borderBottom: frosted ? "1px solid var(--border-1)" : "1px solid transparent",
        ...style,
      }}
    >
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "18px var(--container-pad)", display: "flex", alignItems: "center", gap: "32px" }}>
        <a href="#" style={{ display: "flex", alignItems: "center", gap: "9px", textDecoration: "none", color: "var(--tan-100)", flexShrink: 0 }}>
          <span style={{ fontWeight: 800, fontSize: "1.18rem", letterSpacing: "-0.02em" }}>{brand}</span>
          <span style={{ fontSize: "0.82rem", marginLeft: -2, color: "var(--text-muted)" }}>{brandSuffix}</span>
        </a>

        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginLeft: "auto" }}>
            {links.map((l) => (
              <a key={l.label} href={l.href} target={l.external ? "_blank" : undefined} rel={l.external ? "noopener noreferrer" : undefined}
                className="tutla-nav-lnk"
                style={{
                  position: "relative", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase",
                  letterSpacing: "0.16em", padding: "10px 14px", borderRadius: 8, textDecoration: "none",
                  color: "var(--text-body)", transition: "color 200ms",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--tan-100)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-body)"; }}>
                {l.label}
              </a>
            ))}
          </div>
        )}

        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginLeft: "4px", paddingLeft: "14px", borderLeft: "1px solid var(--border-1)" }}>
            {social.map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                style={{ display: "grid", placeItems: "center", width: 38, height: 38, borderRadius: 9, color: "var(--text-body)", textDecoration: "none", transition: "all 200ms" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--tan-100)"; (e.currentTarget as HTMLElement).style.background = "var(--ink-surface)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-body)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                {s.icon}
              </a>
            ))}
            {action ? <span style={{ marginLeft: 8 }}>{action}</span> : null}
          </div>
        )}

        {isMobile && (
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
            {action ? <span>{action}</span> : null}
            <button
              type="button" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              style={{
                background: "transparent", border: `1px solid ${mobileOpen ? "var(--border-2)" : "var(--border-1)"}`,
                borderRadius: 8, width: 36, height: 36, display: "grid", placeItems: "center",
                cursor: "pointer", color: "var(--text-body)", transition: "background 200ms, border-color 200ms", padding: 0, flexShrink: 0,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--ink-surface)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border-2)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.borderColor = mobileOpen ? "var(--border-2)" : "var(--border-1)"; }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                {mobileOpen ? (
                  <>
                    <line x1="3" y1="3" x2="13" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="13" y1="3" x2="3" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </>
                ) : (
                  <>
                    <line x1="2" y1="4.5" x2="14" y2="4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="2" y1="11.5" x2="14" y2="11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </button>
          </div>
        )}
      </div>

      {isMobile && (
        <div style={{ maxHeight: mobileOpen ? "600px" : "0", overflow: "hidden", transition: "max-height 320ms cubic-bezier(0.4,0,0.2,1)" }}>
          <div style={{
            borderTop: "1px solid var(--border-1)",
            padding: mobileOpen ? "8px var(--container-pad) 20px" : "0 var(--container-pad)",
            display: "flex", flexDirection: "column",
          }}>
            {links.map((l) => (
              <a key={l.label} href={l.href} target={l.external ? "_blank" : undefined} rel={l.external ? "noopener noreferrer" : undefined}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontSize: "0.78rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.14em",
                  padding: "13px 0", textDecoration: "none", color: "var(--text-body)",
                  borderBottom: "1px solid var(--border-1)", display: "flex", alignItems: "center",
                  justifyContent: "space-between", transition: "color 200ms",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--tan-100)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-body)"; }}
              >
                {l.label}
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{l.external ? "↗" : "›"}</span>
              </a>
            ))}
            {social.length > 0 && (
              <div style={{ display: "flex", gap: 8, paddingTop: 16 }}>
                {social.map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    style={{
                      display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 9,
                      color: "var(--text-body)", textDecoration: "none", border: "1px solid var(--border-1)",
                      transition: "color 200ms, border-color 200ms, background 200ms",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--tan-100)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border-2)"; (e.currentTarget as HTMLElement).style.background = "var(--ink-surface)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-body)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border-1)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                    {s.icon}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
