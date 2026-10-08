# JHSkills

Claude skills by Jakob Huhn.

## interactive-learning

Brilliant-style interactive lessons for established graduate- and PhD-level physics: quantum mechanics, quantum information and computing, condensed matter, many-body and statistical physics.

The skill makes Claude write self-contained interactive pages: a text with math, structured like a good textbook section, with embedded widgets (linked figures with controls) and questions in several formats.
- The text opens with a puzzle that challenges a prior belief.
- It lets the reader explore the model before explaining it.
- It builds the idea in short segments, then formalises it.
- It resolves the opening puzzle, and ends with denser practice and a transfer question.

The structure and its sources (Muller's misconception research behind Veritasium, Mayer's multimedia principles, the testing effect and others) are in `references/writing.md`.

```
skills/interactive-learning/
  SKILL.md                    entry point: scope, workflow, modes (Explainer, Chapter)
  references/
    writing.md                structure of the text, with sources; question formats
    pedagogy.md               teaching toolbox, the three hard rules, sequencing, misconceptions
    widget-selection.md       concept shape → widget pattern, composition, topic examples
    widget-craft.md           badges, interaction, layouts, visual and code rules
    math-rendering.md         MathJax 3.2.2 (SVG output) conventions
    knowledge-sources.md      using a user knowledge base, or model knowledge without one
  assets/base.html            page skeleton (article + widgets) + the LX helper library
  assets/layouts.html         five widget layout recipes
  patterns/                   21 widgets, one per concept shape, + 00 question formats
  examples/ssh-chapter.html   a full Chapter: text, math, four linked widgets, questions
  examples/bcs-gap-explainer.html  a short Explainer: one confusion, one widget
tests/                        render-and-check harness (Playwright + local MathJax)
```

### Patterns

Widgets are organised by the *shape* of the insight, not by topic. Each pattern is one widget with a "What you are looking at" block and no questions; questions belong in the text.

| # | Shape | Example used |
|---|---|---|
| 00 | Question formats | choice, number, set, sketch, explain, and gated results |
| 01 | Phase transition | Landau free energy, continuous and first order |
| 02 | Dynamics | Rabi oscillations |
| 03 | 3D geometry | Bloch sphere |
| 04 | Optimisation / extremum | Variational ground state |
| 05 | Spectral flow | Avoided crossing |
| 06 | Superposition / interference | N-slit phasor sum |
| 07 | Dual representations | Wavepacket in x and k |
| 08 | Topology / invariants | Winding number |
| 09 | Measurement / statistics | Born-rule sampling |
| 10 | Self-consistency | Mean-field cobweb |
| 11 | Flows | Kosterlitz–Thouless RG flow |
| 12 | Spatial structure / locality | Correlation length in the Ising chain |
| 13 | Scaling / limits | Finite-size scaling collapse |
| 14 | Approximation order | Perturbation series and its radius of convergence |
| 15 | Composition / circuits | Bell-state circuit |
| 16 | Symmetry | Parity in a double well |
| 17 | Fields on a plane | Cat-qubit CNOT: two Wigner functions in time |
| 18 | Response / spectra | Damped oscillator: χ(ω), poles, impulse response |
| 19 | Thermal occupation | Fermions and bosons in a harmonic trap |
| 20 | Entanglement / reduced states | Two qubits: Schmidt spectrum and reduced Bloch vector |
| 21 | Scattering / tunnelling | Single and double barrier transmission |

### Knowledge

If you point Claude to your own notes (any format, e.g. a markdown "LLM wiki" or an Obsidian vault), the skill follows their notation and cites them. Without notes it uses model knowledge, restricted to textbook-level results, and says so on the page.

### Install

Copy or symlink `skills/interactive-learning` into your skills directory, e.g. `~/.claude/skills/interactive-learning` for Claude Code.

### Development

Every page is an Artifact page fragment that shares three marked blocks (`LX:HEAD`, `LX:STYLE`, `LX:LIB`) with `assets/base.html`.

```sh
cd tests && npm install            # local MathJax 3.2.2 for offline rendering
node tests/sync-base.mjs           # copy the shared blocks from base.html into all widgets
node tests/sync-base.mjs --check   # fail if any widget is out of sync
node tests/run.mjs [filter] [--shots]
```

`run.mjs` renders every page in headless Chromium. It fails on any of these:
- console errors;
- failing physics self-tests (`LX.check`);
- missing MathJax output or raw TeX;
- a question that cannot be answered, or a gate that stays closed;
- a slider or button that changes nothing;
- horizontal overflow at 400 px. `--shots` writes light/dark, desktop/phone screenshots to `tests/screenshots/`.
