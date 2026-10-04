// Render-and-check harness for interactive-learning widgets.
//
//   node tests/run.mjs [file-or-glob-substring ...] [--shots]
//
// For every widget (skills/interactive-learning/{assets,patterns,examples}/*.html):
//   - wraps the Artifact-style fragment in the publish skeleton (doctype, meta)
//   - serves MathJax 3.2.2 from tests/node_modules (CDNs are often blocked in CI/sandboxes)
//   - fails on console errors / page errors / failing LX.check self-tests
//   - requires MathJax SVG output, no horizontal overflow at 400 px
//   - moves every slider to min and max and clicks every limit button, then re-checks errors
//   - with --shots, writes light/dark × desktop/phone screenshots to tests/screenshots/
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const skill = path.join(root, "skills/interactive-learning");
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require("playwright")); }
catch { ({ chromium } = require(path.join(execSync("npm root -g").toString().trim(), "playwright"))); }

const mathjaxFile = path.join(here, "node_modules/mathjax/es5/tex-svg.js");
if (!fs.existsSync(mathjaxFile)) { console.error("Run `npm install` in tests/ first (needs mathjax@3.2.2)."); process.exit(2); }
const mathjax = fs.readFileSync(mathjaxFile);

const args = process.argv.slice(2);
const shots = args.includes("--shots");
const filters = args.filter(a => !a.startsWith("--"));
const files = ["assets", "patterns", "examples"].flatMap(d => {
  const dir = path.join(skill, d);
  return fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => f.endsWith(".html")).map(f => path.join(dir, f)) : [];
}).filter(f => !filters.length || filters.some(q => f.includes(q))).sort();

const wrap = src => `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"></head><body>${src}</body></html>`;
const shotDir = path.join(here, "screenshots");
if (shots) fs.mkdirSync(shotDir, { recursive: true });

const browser = await chromium.launch({ executablePath: fs.existsSync("/opt/pw-browsers/chromium") ? undefined : undefined });
let failed = 0;
for (const file of files) {
  const name = path.relative(skill, file);
  const problems = [];
  const html = wrap(fs.readFileSync(file, "utf8"));
  for (const scheme of shots ? ["light", "dark"] : ["light"]) {
    for (const width of [1180, 400]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, colorScheme: scheme });
      const errors = [];
      page.on("console", m => { if (m.type() === "error") errors.push("console: " + m.text()); });
      page.on("pageerror", e => errors.push("pageerror: " + e.message));
      await page.route("**/*", route => {
        const u = route.request().url();
        if (u.includes("mathjax") && u.endsWith("tex-svg.js")) return route.fulfill({ body: mathjax, contentType: "application/javascript" });
        if (u.startsWith("https://fonts.")) return route.fulfill({ body: "", contentType: "text/css" });
        if (u === "https://lx.test/") return route.fulfill({ body: html, contentType: "text/html" });
        return route.abort();
      });
      await page.goto("https://lx.test/");
      await page.waitForFunction(() => window.MathJax && window.MathJax.startup && window.MathJax.startup.promise, null, { timeout: 15000 }).catch(() => errors.push("MathJax never loaded"));
      await page.evaluate(() => window.MathJax.startup.promise).catch(() => {});
      await page.waitForTimeout(250);
      const tag = `${scheme}/${width}`;
      if (scheme === "light" && width === 1180) {
        const mj = await page.evaluate(() => document.querySelectorAll("mjx-container svg").length);
        if (!mj) problems.push("no MathJax SVG output");
        const raw = await page.evaluate(() => [...document.querySelectorAll("main *")].filter(e => !e.closest("mjx-container") && e.children.length === 0 && /\\\(|\\\[/.test(e.textContent)).map(e => e.textContent.slice(0, 60)));
        if (raw.length) problems.push("untypeset TeX: " + raw.slice(0, 3).join(" | "));
        // exercise controls
        await page.evaluate(async () => {
          const fire = el => el.dispatchEvent(new Event("input", { bubbles: true }));
          for (const r of document.querySelectorAll("input[type=range]:not(:disabled)")) {
            const v = r.value; r.value = r.min; fire(r); r.value = r.max; fire(r); r.value = v; fire(r);
          }
          for (const b of document.querySelectorAll(".lx-limit:not(:disabled)")) b.click();
          for (const r of document.querySelectorAll(".lx-seg input:not(:disabled)")) { r.checked = true; r.dispatchEvent(new Event("change", { bubbles: true })); }
          // walk the lesson: answer each prediction with the first option, then go next
          for (let k = 0; k < 20; k++) {
            const opt = document.querySelector(".lx-opt:not(:disabled)"); if (opt) opt.click();
            const ex = [...document.querySelectorAll(".lx-explain .lx-btn")][0]; if (ex) ex.click();
            const next = [...document.querySelectorAll(".lx-nav .lx-btn")].find(b => /Next/.test(b.textContent));
            if (!next || next.disabled) break; next.click();
            await new Promise(r => setTimeout(r, 30));
          }
        });
        await page.waitForTimeout(300);
        const tests = await page.evaluate(() => window.__lxTests || []);
        if (!tests.length) problems.push("no LX.check self-tests");
        for (const t of tests) if (!t.pass) problems.push(`self-test failed: ${t.name} ${t.detail}`);
        const passed = tests.filter(t => t.pass).length;
        problems.push(...[]);
        console.log(`  ${name}: ${passed}/${tests.length} self-tests`);
      }
      if (width === 400) {
        const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        if (over > 1) problems.push(`horizontal overflow ${over}px at 400px (${scheme})`);
      }
      if (shots) await page.screenshot({ path: path.join(shotDir, `${path.basename(file, ".html")}.${scheme}.${width}.png`), fullPage: true });
      problems.push(...errors.map(e => `[${tag}] ${e}`));
      await page.close();
    }
  }
  if (problems.length) { failed++; console.log(`FAIL ${name}\n    ` + [...new Set(problems)].join("\n    ")); }
  else console.log(`ok   ${name}`);
}
await browser.close();
console.log(failed ? `\n${failed} of ${files.length} widgets failed` : `\nall ${files.length} widgets passed`);
process.exit(failed ? 1 : 0);
