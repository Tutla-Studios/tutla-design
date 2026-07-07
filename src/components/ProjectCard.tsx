"use client";

import React from "react";
import { useTilt } from "../primitives/animations/useTilt";
import type { ProjectAccent } from "../styles/tokens";

const ACCENTS: ProjectAccent[] = ["violet", "indigo", "green", "red", "cyan", "orange"];

export interface ProjectCardProps {
  name: string;
  tag: string;
  accent?: ProjectAccent;
  icon?: React.ReactNode;
  logo?: string | null;
  desc: string;
  features?: string[];
  snippet?: string | null;
  badge?: string | null;
  github?: string | null;
  wiki?: string | null;
  tilt?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

/** Rich, accent-themed project showcase card with tilt, code snippet, feature pills and links. */
export function ProjectCard({
  name, tag, accent = "violet", icon = null, logo = null, desc, features = [],
  snippet = null, badge = null, github = null, wiki = null, tilt = true, style = {}, className,
}: ProjectCardProps) {
  const ref = useTilt<HTMLElement>({ max: 9, enabled: tilt });
  const a: ProjectAccent = ACCENTS.includes(accent) ? accent : "violet";
  const text = `var(--proj-${a}-text)`;
  const border = `var(--proj-${a}-border)`;
  const hover = `var(--proj-${a}-hover)`;
  const glow = `var(--proj-${a}-glow)`;

  return (
    <article
      ref={ref}
      className={className ? `proj-card ${className}` : "proj-card"}
      style={{
        position: "relative", display: "flex", flexDirection: "column", gap: "13px",
        height: "100%", boxSizing: "border-box", padding: "24px", borderRadius: "var(--radius-card)",
        border: `1px solid ${border}`,
        background: `linear-gradient(160deg, ${glow}, transparent 60%), rgba(255,255,255,0.012)`,
        fontFamily: "var(--font-mono)", willChange: "transform",
        transition: "border-color 300ms, box-shadow 300ms",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = hover; (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-card)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = border; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
    >
      {badge ? (
        <span style={{
          position: "absolute", top: 16, right: 16, zIndex: 2, fontSize: "0.58rem", fontWeight: 800,
          textTransform: "uppercase", letterSpacing: "0.12em", padding: "4px 9px", borderRadius: "var(--radius-pill)",
          color: "var(--on-accent)", background: "var(--accent)",
        }} data-depth="22">{badge}</span>
      ) : null}

      <div style={{ display: "flex", alignItems: "center", gap: "13px" }} data-depth="14">
        <div style={{
          width: 42, height: 42, borderRadius: 12, flexShrink: 0, display: "grid", placeItems: "center",
          background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-1)",
        }}>
          {logo ? <img src={logo} alt="" width={22} height={22} style={{ objectFit: "contain" }} /> :
            <span style={{ color: "var(--accent)", display: "inline-flex" }}>{icon}</span>}
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.01em", color: "#fff" }}>{name}</h3>
          <span style={{
            display: "inline-block", marginTop: 5, fontSize: "0.58rem", fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "0.1em", padding: "3px 8px", borderRadius: "var(--radius-pill)", color: text,
            border: `1px solid ${border}`, background: "rgba(255,255,255,0.02)",
          }}>{tag}</span>
        </div>
      </div>

      <p style={{ margin: 0, fontSize: "0.84rem", lineHeight: 1.7, color: "var(--text-body)" }} data-depth="8">{desc}</p>

      {snippet ? (
        <pre style={{
          margin: 0, fontSize: "0.68rem", lineHeight: 1.7, borderRadius: 9, padding: 12, overflowX: "auto",
          whiteSpace: "pre", color: "var(--term-code)", background: "rgba(0,0,0,0.4)", border: "1px solid var(--border-1)",
        }} data-depth="10">{snippet}</pre>
      ) : null}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginTop: "auto" }} data-depth="6">
        {features.map((f) => (
          <span key={f} style={{
            fontSize: "0.64rem", padding: "4px 9px", borderRadius: "var(--radius-pill)",
            color: "var(--text-muted)", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-1)",
          }}>{f}</span>
        ))}
      </div>

      {github || wiki ? (
        <div style={{ display: "flex", gap: "16px", paddingTop: 4 }} data-depth="12">
          {github ? <a href={github} target="_blank" rel="noopener noreferrer" style={linkStyle("var(--text-body)")}>GitHub</a> : null}
          {wiki ? <a href={wiki} target="_blank" rel="noopener noreferrer" style={linkStyle("var(--text-muted)")}>Wiki</a> : null}
        </div>
      ) : null}
    </article>
  );
}

function linkStyle(color: string): React.CSSProperties {
  return { display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.74rem", fontWeight: 600, color, textDecoration: "none" };
}
