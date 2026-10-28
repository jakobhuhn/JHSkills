#!/usr/bin/env node
// Convert interactive-learning pages between their full and slim forms.
//
//   node scripts/lx.mjs expand <page.html> [out.html]   slim → full (ready to publish or open in a browser)
//   node scripts/lx.mjs slim   <page.html> [out.html]   full → slim (what the model reads and writes)
//   node scripts/lx.mjs check  <page.html>              exit 1 if the page's shared blocks differ from base.html
//
// A full page carries three shared blocks copied from assets/base.html:
//   <!-- LX:HEAD-BEGIN --> … <!-- LX:HEAD-END -->     fonts + MathJax setup
//   /* LX:STYLE-BEGIN */ … /* LX:STYLE-END */        theme, layout, question styles
//   /* LX:LIB-BEGIN */ … /* LX:LIB-END */            the LX helper library
// A slim page replaces each block by a one-line marker, alone on its line (mentions elsewhere, e.g.
// inside a comment, are ignored):
//   <!-- LX:HEAD -->      /* LX:STYLE */      /* LX:LIB */
// Everything else (header comment, page CSS, <main>, PATTERN script) is identical in both forms.
// Without an output path, expand writes <name>.full.html next to the input and slim writes <name>.slim.html;
// pass "-" to print to stdout. No dependencies.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const BLOCKS = [
  { marker: "<!-- LX:HEAD -->", begin: "<!-- LX:HEAD-BEGIN -->", end: "<!-- LX:HEAD-END -->" },
  { marker: "/* LX:STYLE */", begin: "/* LX:STYLE-BEGIN */", end: "/* LX:STYLE-END */" },
  { marker: "/* LX:LIB */", begin: "/* LX:LIB-BEGIN */", end: "/* LX:LIB-END */" },
];
const skillDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const basePath = path.join(skillDir, "assets/base.html");

function span(src, b) {
  const i = src.indexOf(b.begin), j = src.indexOf(b.end, i);
  return i < 0 || j < 0 ? null : [i, j + b.end.length];
}
export function baseBlocks(base = fs.readFileSync(basePath, "utf8")) {
  return BLOCKS.map(b => { const r = span(base, b); if (!r) throw new Error(`base.html lacks ${b.begin}`); return base.slice(r[0], r[1]); });
}
const esc = t => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const markerRe = b => new RegExp(`^[ \\t]*${esc(b.marker)}[ \\t]*$`, "m");
export const isSlim = src => BLOCKS.some(b => markerRe(b).test(src) && !src.includes(b.begin));

/* full → slim: each shared block becomes its marker */
export function slim(src) {
  let out = src;
  for (const b of BLOCKS) {
    const r = span(out, b);
    if (r) { if (markerRe(b).test(out.slice(0, r[0]) + out.slice(r[1]))) throw new Error(`page already has a ${b.marker} line besides its block`); out = out.slice(0, r[0]) + b.marker + out.slice(r[1]); }
  }
  return out;
}
/* slim → full: each marker becomes the current block from base.html; a full page is re-synced */
export function expand(src, blocks = baseBlocks()) {
  let out = slim(src).replace(/^<!-- GENERATED from [^\n]*-->\n/, "");
  BLOCKS.forEach((b, k) => {
    const m = markerRe(b).exec(out);
    if (!m) throw new Error(`page lacks a ${b.marker} line`);
    if (markerRe(b).test(out.slice(m.index + m[0].length))) throw new Error(`page has more than one ${b.marker} line`);
    out = out.slice(0, m.index) + m[0].replace(b.marker, blocks[k]) + out.slice(m.index + m[0].length);
  });
  return out;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [cmd, inFile, outArg] = process.argv.slice(2);
  if (!cmd || !inFile || !["expand", "slim", "check"].includes(cmd)) {
    console.error("usage: node scripts/lx.mjs expand|slim|check <page.html> [out.html | -]"); process.exit(2);
  }
  const src = fs.readFileSync(inFile, "utf8");
  if (cmd === "check") {
    if (isSlim(src)) { console.log(`${inFile}: slim page (nothing to check)`); process.exit(0); }
    const ok = expand(src) === src;
    console.log(`${inFile}: ${ok ? "in sync with base.html" : "OUT OF SYNC with base.html (run: node scripts/lx.mjs expand " + inFile + " " + inFile + ")"}`);
    process.exit(ok ? 0 : 1);
  }
  const out = cmd === "expand" ? expand(src) : slim(src);
  const target = outArg ?? inFile.replace(/(\.slim|\.full)?\.html$/, cmd === "expand" ? ".full.html" : ".slim.html");
  if (target === "-") process.stdout.write(out);
  else { fs.writeFileSync(target, out); console.error(`${cmd}: ${inFile} → ${target} (${(out.length / 1024).toFixed(0)} KB)`); }
}
