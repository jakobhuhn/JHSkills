// Render-and-check harness for interactive-learning widgets.
//
//   node tests/run.mjs [name-substring | path/to/widget.html ...] [--shots]
//
// For every widget (skills/interactive-learning/{assets,patterns,examples}/*.html):
//   - wraps the Artifact-style fragment in the publish skeleton (doctype, meta)
//   - serves MathJax 3.2.2 from tests/node_modules (CDNs are often blocked in CI/sandboxes)
//   - fails on console errors / page errors / failing LX.check self-tests
//   - requires MathJax SVG output, no horizontal overflow at 400 px
//   - answers every inline question (LX.ask) and requires every gate to open, no locked controls
//   - requires every enabled slider and button inside a widget to change what the widget shows
//     (mark a container data-lx-idle to exempt a control that legitimately does nothing at times)
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

const args = process.argv.slice(2);
const shots = args.includes("--shots");
const filters = args.filter(a => !a.startsWith("--"));
const files = ["assets", "patterns", "examples"].flatMap(d => {
  const dir = path.join(skill, d);
  return fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => f.endsWith(".html")).map(f => path.join(dir, f)) : [];
}).filter(f => !filters.length || filters.some(q => f.includes(q)))
  .concat(filters.filter(q => q.endsWith(".html") && fs.existsSync(q)).map(q => path.resolve(q)))  // explicit paths, e.g. a widget built elsewhere
  .filter((f, i, a) => a.indexOf(f) === i).sort();

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
        // any MathJax 3.2.2 file (tex-svg.js and extensions it autoloads, e.g. [tex]/boldsymbol) from the local copy
        const mj = u.match(/mathjax(?:@|\/)3\.2\.2\/es5\/(.+\.js)$/);
        if (mj) {
          const local = path.join(here, "node_modules/mathjax/es5", mj[1]);
          if (fs.existsSync(local)) return route.fulfill({ body: fs.readFileSync(local), contentType: "application/javascript" });
        }
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
        // 1. answer every inline question once; every gate must open
        const askIssues = await page.evaluate(async () => {
          const out = [];
          const tick = () => new Promise(r => setTimeout(r, 40));
          for (const a of document.querySelectorAll(".lx-ask")) {
            const t = a.dataset.type;
            if (t === "choice") a.querySelector(".lx-opt")?.click();
            else if (t === "number") { const i = a.querySelector("input"); i.value = "1"; a.querySelector(".lx-btn")?.click(); }
            else a.querySelector(".lx-btn")?.click();
            await tick();
            if (!a.dataset.answered) out.push(`question (${t}) could not be answered: ${a.querySelector(".lx-q")?.textContent.slice(0, 50)}`);
          }
          const left = document.querySelectorAll(".lx-gated").length;
          if (left) out.push(`${left} gate(s) still closed after answering every question`);
          if (document.querySelector(".lx-locked")) out.push("found .lx-locked: controls must not be locked");
          return out;
        });
        problems.push(...askIssues);
        // 2. every enabled slider and button inside a widget must change what the widget shows
        const ctlIssues = await page.evaluate(async () => {
          const out = [];
          const wait = () => new Promise(r => setTimeout(r, 60));
          const sig = w => { const c = w.cloneNode(true); c.querySelectorAll(".lx-slider, .lx-guide, .lx-ask").forEach(e => e.remove()); return c.innerHTML; };
          const fire = (el, ev = "input") => el.dispatchEvent(new Event(ev, { bubbles: true }));
          const label = el => (el.closest(".lx-slider")?.querySelector(".lx-lab")?.textContent || el.textContent || el.id || "").trim().slice(0, 40);
          for (const w of document.querySelectorAll(".lx-widget")) {
            for (const r of w.querySelectorAll("input[type=range]")) {
              if (r.disabled || r.closest(".lx-ask")) continue;
              const v = r.value; r.value = r.min; fire(r); await wait(); const a = sig(w);
              r.value = r.max; fire(r); await wait(); const b = sig(w);
              if (a === b && !r.closest("[data-lx-idle]")) out.push(`slider changes nothing: ${label(r)}`);
              r.value = v; fire(r);
            }
            for (const s of w.querySelectorAll(".lx-seg input")) { if (!s.disabled) { s.checked = true; fire(s, "change"); await wait(); } }
            for (const btn of w.querySelectorAll("button")) {
              if (btn.disabled || btn.closest(".lx-ask") || btn.closest("[data-lx-idle]")) continue;
              let a = sig(w); btn.click(); await wait();
              if (sig(w) === a) {
                for (const r of w.querySelectorAll("input[type=range]:not(:disabled)")) { r.value = r.min; fire(r); }
                await wait(); a = sig(w); if (!btn.disabled) btn.click(); await wait();
                if (sig(w) === a) out.push(`button changes nothing: ${label(btn)}`);
              }
            }
          }
          return out;
        });
        problems.push(...ctlIssues);
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
console.log(failed ? `\n${failed} of ${files.length} pages failed` : `\nall ${files.length} pages passed`);
process.exit(failed ? 1 : 0);
