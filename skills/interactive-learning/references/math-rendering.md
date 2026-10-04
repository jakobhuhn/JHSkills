# Math rendering

All math is LaTeX rendered by **MathJax 3.2.2 with SVG output**. The setup lives in the `LX:HEAD` block of `assets/base.html`; do not change it per widget.

## Setup (already in base.html)

```html
<script>
window.MathJax = {
  tex: {
    inlineMath: [["\\(", "\\)"]], displayMath: [["\\[", "\\]"]],
    macros: { ket: …, bra: …, braket: …, expval: …, Tr: …, dd: …, ii: …, ee: … }
  },
  svg: { fontCache: "global" },
  startup: { pageReady() { /* typeset the page, then fire "lx:mathjax" */ } }
};
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-svg.js" async></script>
```

If cdnjs is unavailable, the equivalent URL is `https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-svg.js`.

## Delimiters

- Inline: `\( … \)`. Display: `\[ … \]`. Dollar signs are **not** delimiters, so prices and shell snippets are safe.
- In JavaScript strings, escape backslashes: `"energy \\(E_k\\)"`, `"\\frac{1}{2}"`.

## Macros available

| Macro | Renders |
|---|---|
| `\ket{\psi}` | \(\lvert\psi\rangle\) |
| `\bra{\psi}` | \(\langle\psi\rvert\) |
| `\braket{\phi}{\psi}` | \(\langle\phi\vert\psi\rangle\) |
| `\expval{A}` | \(\langle A\rangle\) |
| `\Tr` | upright Tr |
| `\dd`, `\ii`, `\ee` | upright d, i, e |

Add a topic-specific macro by extending `tex.macros` in a copy of the widget only if it is used many times in that widget.

## Dynamic content

MathJax typesets the page once at load. Anything inserted later must be typeset explicitly:

- `LX.typeset(el)` queues typesetting of one element. It is safe to call before MathJax has loaded (the element is typeset when it is ready) and it skips elements that were removed in the meantime.
- The `LX` helpers already call it: slider labels, segmented labels, figure captions, `P.tex(...)` labels and every lesson step.
- Do **not** typeset in a per-frame loop. Readouts that change on every slider move (`LX.readout(...).set(...)`) take plain text; put the TeX in the readout's fixed label.

## Math inside figures

- SVG `<text>` cannot hold MathJax. Use `P.tex(x, y, "E_F", { anchor: "sw" })` for TeX labels at data coordinates; they live in an HTML overlay that scales with the figure.
- For labels that change on every frame, prefer plain Unicode in SVG text (`P.text(x, y, "Δ = 0.42")`).
- Axis names: pass TeX to `LX.plot(..., { xlabel: "k", ylabel: "E(k)" })` (no delimiters needed there).

## Offline behaviour

Without network access MathJax does not load and TeX stays visible as raw source. The widgets still work. The test harness (`tests/run.mjs`) serves a local MathJax copy for this reason.
