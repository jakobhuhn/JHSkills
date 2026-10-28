// Keep every page's shared blocks (LX:HEAD, LX:STYLE, LX:LIB) identical to assets/base.html,
// and regenerate the slim copies the model reads (skills/interactive-learning/slim/).
//   node tests/sync-base.mjs          rewrite full pages in place, rewrite slim/
//   node tests/sync-base.mjs --check  exit 1 if any full page or slim copy is stale
// The full pages under assets/, patterns/ and examples/ are the source of truth; edit those.
// slim/ is generated: the same files with the three blocks replaced by one-line markers
// (see scripts/lx.mjs), about a quarter of the size, for reading and as the authoring form.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { expand, slim, baseBlocks } from "../skills/interactive-learning/scripts/lx.mjs";

const skill = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../skills/interactive-learning");
const check = process.argv.includes("--check");
const blocks = baseBlocks();
const note = rel => `<!-- GENERATED from ${rel} by tests/sync-base.mjs; edit that file, then run the script. -->\n`;
let stale = 0;
const want = new Set();
for (const dir of ["assets", "patterns", "examples"]) {
  const d = path.join(skill, dir);
  if (!fs.existsSync(d)) continue;
  for (const f of fs.readdirSync(d).filter(f => f.endsWith(".html")).sort()) {
    const rel = `${dir}/${f}`, file = path.join(d, f);
    const before = fs.readFileSync(file, "utf8");
    let full;
    try { full = expand(before, blocks); } catch (e) { console.error(`${rel}: ${e.message}`); process.exitCode = 1; continue; }
    if (full !== before) {
      stale++;
      if (check) console.log(`out of sync: ${rel}`);
      else { fs.writeFileSync(file, full); console.log(`synced ${rel}`); }
    }
    const slimFile = path.join(skill, "slim", rel), slimSrc = note(rel) + slim(full);
    want.add(slimFile);
    if (!fs.existsSync(slimFile) || fs.readFileSync(slimFile, "utf8") !== slimSrc) {
      stale++;
      if (check) console.log(`stale slim copy: slim/${rel}`);
      else { fs.mkdirSync(path.dirname(slimFile), { recursive: true }); fs.writeFileSync(slimFile, slimSrc); console.log(`wrote slim/${rel} (${(slimSrc.length / 1024).toFixed(0)} KB)`); }
    }
  }
}
/* remove slim copies whose source is gone */
const slimRoot = path.join(skill, "slim");
if (fs.existsSync(slimRoot)) for (const dir of fs.readdirSync(slimRoot)) {
  const d = path.join(slimRoot, dir); if (!fs.statSync(d).isDirectory()) continue;
  for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (!want.has(p)) { stale++; if (check) console.log(`orphan: slim/${dir}/${f}`); else { fs.unlinkSync(p); console.log(`removed slim/${dir}/${f}`); } } }
}
/* the LX API summary (the comment at the top of the LIB block) as a reference file, so the model never reads base.html */
const lib = blocks[2], a = lib.indexOf("/* LX \u2014"), z = lib.indexOf("*/", a);
if (a < 0 || z < 0) { console.error("base.html: LIB block has no API summary comment"); process.exitCode = 1; }
else {
  const body = lib.slice(a + 2, z).split("\n").map(l => l.replace(/^   /, "")).join("\n").trim();
  const api = `<!-- GENERATED from assets/base.html (the comment at the top of its LX:LIB block) by tests/sync-base.mjs; edit base.html, then run the script. -->\n# LX helper library\n\nThe \`LX\` object every page gets from the shared \`LX:LIB\` block. One line per helper; read the call sites in the slim patterns for usage.\n\n\`\`\`\n${body}\n\`\`\`\n`;
  const apiFile = path.join(skill, "references/lx-api.md");
  if (!fs.existsSync(apiFile) || fs.readFileSync(apiFile, "utf8") !== api) {
    stale++;
    if (check) console.log("stale: references/lx-api.md");
    else { fs.writeFileSync(apiFile, api); console.log("wrote references/lx-api.md"); }
  }
}
if (!stale) console.log(check ? "all pages and slim copies up to date" : "nothing to do");
if (check && stale) process.exit(1);
