/**
 * gen-docs.ts — auto-generate wiki docs for @tutla/design.
 *
 * Walks the source tree, parses every exported component / hook / type via the
 * TypeScript compiler API, and emits one markdown page per module plus a nested
 * `sidebar.json` — the same shape used by wiki.tutla.net's content folders.
 *
 * Run:  node scripts/gen-docs.ts       (Node >= 23, native TS type-stripping)
 *   or:  npm run docs
 */

import * as ts from "typescript";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "src");
const OUT = path.join(ROOT, "docs");
const ROUTE = "/tutla-design"; // URL prefix used inside sidebar.json
const TODAY = new Date().toISOString().slice(0, 10);

/** A logical group of docs -> a directory in the source tree. */
interface Group {
  label: string; // sidebar heading + folder name
  slug: string; // url/folder segment
  dir: string; // absolute source dir
  recurse?: boolean; // include nested dirs?
}

const GROUPS: Group[] = [
  { label: "Primitives", slug: "primitives", dir: path.join(SRC, "primitives") },
  { label: "Animations", slug: "animations", dir: path.join(SRC, "primitives", "animations") },
  { label: "Components", slug: "components", dir: path.join(SRC, "components") },
  { label: "Nodes", slug: "nodes", dir: path.join(SRC, "components", "nodes") },
];

// ── AST helpers ────────────────────────────────────────────────────────────

/** Raw JSDoc block text (description + any @example / indented code) above a node. */
function jsDocText(node: ts.Node, src: ts.SourceFile): string {
  const ranges = ts.getLeadingCommentRanges(src.getFullText(), node.getFullStart()) ?? [];
  const block = ranges
    .filter((r) => r.kind === ts.SyntaxKind.MultiLineCommentTrivia)
    .map((r) => src.getFullText().slice(r.pos, r.end))
    .filter((t) => t.startsWith("/**"))
    .pop();
  if (!block) return "";
  return block
    .replace(/^\/\*\*/, "")
    .replace(/\*\/$/, "")
    .split("\n")
    .map((l) => l.replace(/^\s*\*? ?/, "").replace(/\s+$/, ""))
    .join("\n")
    .replace(/^\n+|\n+$/g, "");
}

/** Turn a JSDoc body into markdown: prose lines stay prose, indented runs
 *  become fenced tsx code blocks (that's how examples are written in-repo). */
function jsDocToMarkdown(text: string): string {
  if (!text) return "";
  const lines = text.split("\n");
  const out: string[] = [];
  let code: string[] = [];
  const flush = () => {
    if (!code.length) return;
    while (code.length && !code[0].trim()) code.shift();
    while (code.length && !code[code.length - 1].trim()) code.pop();
    const indent = Math.min(...code.filter((l) => l.trim()).map((l) => l.match(/^ */)![0].length));
    out.push("```tsx", ...code.map((l) => l.slice(indent)), "```");
    code = [];
  };
  for (const line of lines) {
    const isCode = /^\s{2,}\S/.test(line);
    if (isCode) code.push(line);
    else {
      flush();
      out.push(line.replace(/^@example\s*/i, "").trim());
    }
  }
  flush();
  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

interface PropRow {
  name: string;
  type: string;
  optional: boolean;
  doc: string;
}

interface TypeDoc {
  name: string;
  kind: "interface" | "type";
  doc: string;
  props: PropRow[];
  aliasText?: string; // for non-object type aliases (unions, etc.)
}

interface ExportDoc {
  name: string;
  kind: "component" | "hook" | "function";
  doc: string;
}

interface ModuleDoc {
  title: string; // primary export / display name
  slug: string;
  exports: ExportDoc[];
  types: TypeDoc[];
}

function memberRows(members: ts.NodeArray<ts.TypeElement>, src: ts.SourceFile): PropRow[] {
  const rows: PropRow[] = [];
  for (const m of members) {
    if (!ts.isPropertySignature(m) || !m.name) continue;
    rows.push({
      name: m.name.getText(src),
      type: m.type ? m.type.getText(src).replace(/\s+/g, " ") : "unknown",
      optional: !!m.questionToken,
      doc: jsDocText(m, src).replace(/\n+/g, " ").trim(),
    });
  }
  return rows;
}

function parseModule(file: string): ModuleDoc | null {
  const text = fs.readFileSync(file, "utf8");
  const src = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const exports: ExportDoc[] = [];
  const types: TypeDoc[] = [];

  const isExported = (n: ts.Node) =>
    !!(ts.getCombinedModifierFlags(n as ts.Declaration) & ts.ModifierFlags.Export);

  const visit = (node: ts.Node) => {
    if (ts.isFunctionDeclaration(node) && node.name && isExported(node)) {
      const name = node.name.text;
      const kind = /^use[A-Z]/.test(name)
        ? "hook"
        : /^[A-Z]/.test(name)
          ? "component"
          : "function";
      exports.push({ name, kind, doc: jsDocText(node, src) });
    } else if (ts.isVariableStatement(node) && isExported(node)) {
      for (const d of node.declarationList.declarations) {
        if (!ts.isIdentifier(d.name)) continue;
        if (d.initializer && (ts.isArrowFunction(d.initializer) || ts.isFunctionExpression(d.initializer))) {
          const name = d.name.text;
          exports.push({
            name,
            kind: /^use[A-Z]/.test(name) ? "hook" : /^[A-Z]/.test(name) ? "component" : "function",
            doc: jsDocText(node, src),
          });
        }
      }
    } else if (ts.isInterfaceDeclaration(node) && isExported(node)) {
      types.push({
        name: node.name.text,
        kind: "interface",
        doc: jsDocText(node, src),
        props: memberRows(node.members, src),
      });
    } else if (ts.isTypeAliasDeclaration(node) && isExported(node)) {
      const isObj = ts.isTypeLiteralNode(node.type);
      types.push({
        name: node.name.text,
        kind: "type",
        doc: jsDocText(node, src),
        props: isObj ? memberRows((node.type as ts.TypeLiteralNode).members, src) : [],
        aliasText: isObj ? undefined : node.type.getText(src).replace(/\s+/g, " "),
      });
    }
  };
  ts.forEachChild(src, visit);

  if (!exports.length) return null;

  const base = path.basename(file).replace(/\.(tsx?|ts)$/, "");
  const primary =
    exports.find((e) => e.name.toLowerCase() === base.toLowerCase())?.name ?? exports[0].name;
  const slug = primary.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

  return { title: primary, slug, exports, types };
}

// ── Markdown rendering ─────────────────────────────────────────────────────

function md(escape: string): string {
  return escape.replace(/\|/g, "\\|");
}

function renderModule(m: ModuleDoc, groupLabel: string): string {
  const primary = m.exports.find((e) => e.name === m.title) ?? m.exports[0];
  const firstPara = primary.doc.split(/\n\s*\n/)[0].replace(/\n/g, " ").trim();
  const sentence = firstPara.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? firstPara;
  const summary =
    (sentence || `${m.title} — part of the Tutla design system.`).replace(/"/g, "'").slice(0, 200);

  const lines: string[] = [];
  lines.push("---");
  lines.push(`title: "${m.title}"`);
  lines.push(`summary: "${summary}"`);
  lines.push(`created: "${TODAY}"`);
  lines.push(`updated: "${TODAY}"`);
  lines.push("isdoc: true");
  lines.push("---");
  lines.push("");
  lines.push(`# ${m.title}`);
  lines.push("");
  lines.push(`\`${groupLabel}\` · import from \`@tutla/design\``);
  lines.push("");

  for (const e of m.exports) {
    if (e.name !== m.title) lines.push(`## ${e.name}`, "");
    const body = jsDocToMarkdown(e.doc);
    if (body) lines.push(body, "");
    lines.push(
      `\`\`\`ts\nimport { ${e.name} } from "@tutla/design";\n\`\`\``,
      "",
    );
  }

  const propTypes = m.types.filter((t) => t.props.length);
  const aliasTypes = m.types.filter((t) => !t.props.length);

  for (const t of propTypes) {
    lines.push(`## \`${t.name}\` props`, "");
    if (t.doc) lines.push(jsDocToMarkdown(t.doc), "");
    lines.push("| Prop | Type | Required | Description |");
    lines.push("| --- | --- | --- | --- |");
    for (const p of t.props) {
      lines.push(
        `| \`${p.name}\` | \`${md(p.type)}\` | ${p.optional ? "" : "yes"} | ${md(p.doc)} |`,
      );
    }
    lines.push("");
  }

  if (aliasTypes.length) {
    lines.push("## Types", "");
    for (const t of aliasTypes) {
      lines.push(`- \`${t.name}\`${t.aliasText ? ` = \`${md(t.aliasText)}\`` : ""}${t.doc ? ` — ${t.doc.split("\n")[0]}` : ""}`);
    }
    lines.push("");
  }

  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trimEnd() + "\n";
}

// ── CSS animations page ────────────────────────────────────────────────────

function renderAnimationsCss(): string {
  const css = fs.readFileSync(path.join(SRC, "styles", "animations.css"), "utf8");
  const keyframes = [...css.matchAll(/@keyframes\s+([\w-]+)/g)].map((m) => m[1]);
  const classes = [...new Set([...css.matchAll(/^\.([\w-]+)/gm)].map((m) => m[1]))];

  const lines: string[] = [];
  lines.push("---");
  lines.push(`title: "CSS Animations"`);
  lines.push(`summary: "Keyframes and utility classes from styles/animations.css."`);
  lines.push(`created: "${TODAY}"`);
  lines.push(`updated: "${TODAY}"`);
  lines.push("isdoc: true");
  lines.push("---");
  lines.push("");
  lines.push("# CSS Animations", "");
  lines.push('Load once at your app root: `import "@tutla/design/styles";`', "");
  lines.push("## Keyframes", "");
  for (const k of keyframes) lines.push(`- \`@keyframes ${k}\``);
  lines.push("");
  lines.push("## Utility classes", "");
  for (const c of classes) lines.push(`- \`.${c}\``);
  lines.push("");
  return lines.join("\n") + "\n";
}

// ── Main ───────────────────────────────────────────────────────────────────

function sourceFiles(dir: string, recurse: boolean): string[] {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isFile() && /\.tsx?$/.test(d.name) && d.name !== "index.ts")
    .map((d) => path.join(dir, d.name));
}

function main() {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  const sidebar: Record<string, Record<string, string>> = {};
  let count = 0;

  for (const g of GROUPS) {
    const outDir = path.join(OUT, g.slug);
    fs.mkdirSync(outDir, { recursive: true });
    const section: Record<string, string> = {};

    for (const file of sourceFiles(g.dir, false)) {
      const mod = parseModule(file);
      if (!mod) continue;
      fs.writeFileSync(path.join(outDir, `${mod.slug}.md`), renderModule(mod, g.label));
      section[mod.title] = `${ROUTE}/${g.slug}/${mod.slug}`;
      count++;
    }

    if (Object.keys(section).length) {
      sidebar[g.label] = Object.fromEntries(
        Object.entries(section).sort(([a], [b]) => a.localeCompare(b)),
      );
    }
  }

  // Styles group: generated CSS-animation reference
  const stylesDir = path.join(OUT, "styles");
  fs.mkdirSync(stylesDir, { recursive: true });
  fs.writeFileSync(path.join(stylesDir, "animations.md"), renderAnimationsCss());
  sidebar["Styles"] = { "CSS Animations": `${ROUTE}/styles/animations` };
  count++;

  // Landing page
  const index = [
    "---",
    `title: "Tutla Design"`,
    `summary: "Warm gold on near-black. Primitives, animations and composite React components."`,
    `created: "${TODAY}"`,
    `updated: "${TODAY}"`,
    "isdoc: true",
    "---",
    "",
    "# Tutla Design System",
    "",
    "Warm gold on near-black — terminal hacker meets craftsman's workshop.",
    "React primitives, motion hooks and composite components.",
    "",
    "```ts",
    'import { Button, Accordion } from "@tutla/design";',
    'import "@tutla/design/styles";',
    "```",
    "",
    "## Sections",
    "",
    ...Object.entries(sidebar).map(([label, items]) => `- **${label}** — ${Object.keys(items).join(", ")}`),
    "",
    "> Auto-generated by `scripts/gen-docs.ts`.",
    "",
  ].join("\n");
  fs.writeFileSync(path.join(OUT, "index.md"), index);

  fs.writeFileSync(path.join(OUT, "sidebar.json"), JSON.stringify(sidebar, null, 4) + "\n");

  console.log(`Generated ${count} pages + sidebar.json into ${path.relative(ROOT, OUT)}/`);
}

main();
