# JHSkills

Claude skills by Jakob Huhn.

## interactive-learning

Brilliant-style interactive lessons for established graduate- and PhD-level physics: quantum mechanics, quantum information and computing, condensed matter, many-body and statistical physics.

The skill makes Claude teach through self-contained HTML widgets in which the learner **predicts** what will happen, **manipulates** one parameter, **observes** linked figures, **explains** the result in their own words, and then meets the formalism and a transfer question.

```
skills/interactive-learning/
  SKILL.md                    entry point: scope, workflow, modes
  references/
    pedagogy.md               learning loop, writing predictions, sequencing, misconceptions
    widget-selection.md       concept shape → widget pattern, composition, topic examples
    widget-craft.md           exact / computed / schematic badges, interaction, visual and code rules
    math-rendering.md         MathJax 3.2.2 (SVG output) conventions
    knowledge-sources.md      using a user knowledge base, or model knowledge without one
  assets/base.html            page skeleton + the LX helper library
  patterns/                   16 working mini-lessons, one per concept shape
  examples/ssh-model.html     a full lesson combining several shapes
tests/                        render-and-check harness (Playwright + local MathJax)
```

### Patterns

Widgets are organised by the *shape* of the insight, not by topic:

| # | Shape | Example used |
|---|---|---|
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

### Knowledge

If you point Claude to your own notes (any format, e.g. a markdown "LLM wiki" or an Obsidian vault), the skill follows their notation and cites them. Without notes it uses model knowledge, restricted to textbook-level results, and says so on the page.

### Install

Copy or symlink `skills/interactive-learning` into your skills directory, e.g. `~/.claude/skills/interactive-learning` for Claude Code.

### Development

Every widget is an Artifact page fragment that shares three marked blocks (`LX:HEAD`, `LX:STYLE`, `LX:LIB`) with `assets/base.html`.

```sh
cd tests && npm install            # local MathJax 3.2.2 for offline rendering
node tests/sync-base.mjs           # copy the shared blocks from base.html into all widgets
node tests/sync-base.mjs --check   # fail if any widget is out of sync
node tests/run.mjs [filter] [--shots]
```

`run.mjs` renders every widget in headless Chromium, moves every slider, clicks the limit buttons, walks the lesson, and fails on console errors, failing physics self-tests (`LX.check`), missing MathJax output or horizontal overflow at 400 px. `--shots` writes light/dark, desktop/phone screenshots to `tests/screenshots/`.
