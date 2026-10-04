// Copy the shared blocks of assets/base.html (LX:HEAD, LX:STYLE, LX:LIB) into every
// pattern and example, so each widget stays a self-contained page.
//   node tests/sync-base.mjs          rewrite files in place
//   node tests/sync-base.mjs --check  exit 1 if any file is out of sync
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const skill = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../skills/interactive-learning");
const base = fs.readFileSync(path.join(skill, "assets/base.html"), "utf8");
const blocks = [
  ["<!-- LX:HEAD-BEGIN -->", "<!-- LX:HEAD-END -->"],
  ["/* LX:STYLE-BEGIN */", "/* LX:STYLE-END */"],
  ["/* LX:LIB-BEGIN */", "/* LX:LIB-END */"],
];
const grab = (src, [a, b]) => {
  const i = src.indexOf(a), j = src.indexOf(b);
  if (i < 0 || j < i) return null;
  return [i, j + b.length];
};
const check = process.argv.includes("--check");
let stale = 0;
for (const dir of ["patterns", "examples"]) {
  const d = path.join(skill, dir);
  if (!fs.existsSync(d)) continue;
  for (const f of fs.readdirSync(d).filter(f => f.endsWith(".html"))) {
    const file = path.join(d, f);
    let src = fs.readFileSync(file, "utf8");
    const before = src;
    for (const m of blocks) {
      const [bi, bj] = grab(base, m);
      const r = grab(src, m);
      if (!r) { console.error(`${dir}/${f}: missing ${m[0]}`); process.exitCode = 1; continue; }
      src = src.slice(0, r[0]) + base.slice(bi, bj) + src.slice(r[1]);
    }
    if (src !== before) {
      stale++;
      if (check) console.log(`out of sync: ${dir}/${f}`);
      else { fs.writeFileSync(file, src); console.log(`synced ${dir}/${f}`); }
    }
  }
}
if (check && stale) process.exit(1);
