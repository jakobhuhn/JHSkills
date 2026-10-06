# Widget craft

Rules for building the widgets inside a page. They apply on top of `assets/base.html`, which already provides the theme, the article layout and the `LX` library. Read the API summary at the top of its `LX:LIB` block before writing code.

## Honesty: exact, computed, schematic

Every widget card carries one badge (`LX.widget(mount, { badge })`), and the badge must be true:

| Badge | `data-kind` | Meaning | Rules |
|---|---|---|---|
| Exact | `exact` | Every plotted quantity comes from a closed-form expression of the stated model. | Show the formula and conventions in the meta line or a caption. Numeric axes allowed. |
| Computed | `computed` | Small, checkable numerics (e.g. `LX.eigSym` on a ≤ 200×200 matrix, RK4 of a few ODEs). | Self-test the numerics against known limits. Say what is computed in a caption. |
| Schematic | `schematic` | Only the qualitative shape is meaningful (e.g. a spectral function's peak structure, a phase diagram's topology). | Plots use `ticks: false`: **no numeric tick labels**. Label only named features with `P.tex` (e.g. \(U_c\), \(\pm U/2\)). Say in a caption which features are meaningful. |

Exact vs computed: closed forms evaluated directly are exact. Anything that needs numerical quadrature, root finding, diagonalisation or ODE integration is computed, even when the underlying equation is exact; say in a caption what is computed and self-test its accuracy.

The schematic rule matters: a cartoon with numbers on its axes reads as data. If a curve's shape is known but its numbers depend on a method or approximation, draw it schematic.

Never draw a feature you cannot justify. Each visible feature of the widget should correspond to something in the source (the user's knowledge base, or a standard textbook result).

## Interaction design

- **One knob per insight.** Each control should map to one relationship the text is about. Fix everything else, or use a second widget later in the text.
- **Every control visibly does something.** A control that does nothing in the current mode is disabled or hidden in that mode. The test harness fails a page whose enabled slider or button changes nothing.
- **No duplicate controls.** One way to do one thing: either a step slider or Back/Forward buttons, not both.
- **Explain the widget on the widget.** Every widget has a "What you are looking at" block (`LX.guide`) with one line per figure and per control: what it shows and what to look for. Legends (`LX.legend`) name every curve that is not obvious.
- **Linked views.** Show the same state in two or three representations that update together (landscape + order parameter; band structure + winding curve + real-space density). Most insight is in the link.
- **Limit buttons.** `LX.limits(...)` with one button per regime the topic's literature names. Label them with the physics ("Atomic limit", "Critical point"), not the parameter values.
- **Ghost traces.** When the text asks "how did that change?", let the learner keep a copy (`P.ghost()`) with a clearly visible button, and give the copy a legend entry and a way to clear it.
- **Readouts.** Show the two or three numbers the text talks about (gap, winding number, \(\Delta x\,\Delta k\)), with `LX.readout`. Not more.
- **Sensible ranges.** Slider ranges cover the interesting regimes and nothing else. Start the widget in a state that already shows something.
- **Direct manipulation where it is natural.** Drag a trial point on a landscape, drag a phasor, drag the width of a wavepacket, click to drop a ball into a flow. This often replaces several sliders and makes the relationship obvious. Every draggable also works with arrow keys (`LX.drag` does this). Say in the guide that something is draggable or clickable.
- **Durations mean something.** When the physics is "a pulse of length \(	au\) does X", let the learner choose \(	au\) and run the evolution for exactly \(	au\), then stop. Do not show an endless oscillation and ask them to read off the right moment.
- **Time.** Animate only what evolves in time (`LX.player`). Pair a continuous evolution with a scrub slider and start paused under reduced motion.
- **Gate results, not controls.** `LX.gate(el)` hides a result until an `LX.ask` with `reveal: [el]` is answered; it only ever opens. Never disable a control that the learner has used.

## Layout

Arrange each widget freely; there is no fixed figure-and-sidebar grid. `LX.widget(mount, { layout })` gives five arrangements, all collapsing to one column on narrow screens:

| Layout | Use it for |
|---|---|
| `stack` | one wide figure with a controls strip below |
| `split` | two equal linked views, controls below or in one column |
| `grid2` | three figures plus controls in the fourth cell (never leave a quadrant empty) |
| `aside` | one main figure (or a column of figures) with controls beside it; `left: true` puts the controls first |
| `hero` | one large figure plus a column of small figures and controls |

`.lx-col` stacks several items in one cell; `.lx-span2` spans both columns; `.lx-float` puts a small button row over the corner of a figure. `assets/layouts.html` shows each recipe with code.

Rules: no empty grid cells; the most important view is the largest; controls sit next to what they change; at most three figures per widget (use a second widget otherwise).

## Visual rules

- Colors only through the base CSS classes (`s1`–`s4` strokes, `f1`–`f4` fills, `a1`–`a3` areas, `sm`, `dash`, `thin`) or `var(--…)` tokens. Never a literal hex color in a component: both light and dark themes must work.
- Use the series colors consistently across linked views: the same quantity has the same color everywhere.
- Name axes with TeX (`xlabel`, `ylabel` in `LX.plot`). Use units or "dimensionless" in the caption.
- Captions say what the figure shows in one line. Put conventions in the header meta line.
- Unstable, metastable or reference branches are dashed (`dash`) or faint (`faint`); break a path at jumps instead of drawing a vertical connector line.
- Draggable handles are created once, in the plot's `handles` layer (which `clearAll` never clears), and moved on redraw. Recreating them breaks pointer capture and leaves copies. Clamp them to the plot range.
- TeX labels that stay on the plot are created once with `P.tex(..., { keep: true })` and moved with `P.placeTex`; `clearAll` removes only the other labels.
- The page must work at 400 px width: figures stack, controls wrap. The test harness checks this.
- The page must be complete at rest: the first frame, before any interaction, already shows a meaningful state.

## Code rules

- Start from `assets/base.html`. Keep the three marked blocks (`LX:HEAD`, `LX:STYLE`, `LX:LIB`) unchanged; add page CSS after `/* LX:STYLE-END */` and code in the `PATTERN` script.
- One state object per widget, one `update()` that redraws everything from it (`P.clearAll()` first). Controls only change the state and call `update()`. Widgets on the same page may share state when they are linked views of one system.
- Keep numerics small enough to run on every slider move (aim under ~16 ms). Precompute what does not depend on the control being moved; keep load-time precomputation under ~200 ms.
- Choose units that make the key scale 1 (energies in units of \(T_c\), hopping \(t = 1\), lengths in lattice constants) and fix dimensionless couplings at a value where the effect is clearly visible; say so in the conventions line.
- Display math must fit about 360 px (the text column on a phone). Break long equations with `aligned` or `split`; wide ones scroll horizontally as a fallback.
- Give every control a stable `id` (slider wrappers are `<id>-wrap`); questions of type `set` read the widget state through them.
- Add `LX.check(...)` self-tests for every physics fact the widget relies on: normalization, a closed form at a special point, a limit, a symmetry. They run at load and are reported by the test harness. Make anything random use a seeded generator.
- Library helpers worth knowing beyond plots and sliders: `LX.rng(seed)` (seeded random numbers), `LX.C.exp`/`LX.C.sqrt` (complex), `LX.plot(..., { frame: false })` (bare drawing area for 3D views and diagrams), `P.clearAll()`, `LX.legend`, `LX.guide`, and an ask's `onAnswer(correct, value)` hook.
- Do not load extra libraries unless the widget really needs one. Only the CDNs listed in the artifact rules are allowed.

## Delivery

- Publish the page as an Artifact when the session can (the file is already an Artifact fragment). Otherwise save it as an `.html` file wrapped in a doctype skeleton, as described at the top of `base.html`.
- Run `tests/run.mjs` on the page when the repo is available. It answers every question, checks that every gate opens, and checks that every control changes something.
- Title: a short name of the thing (e.g. "SSH Edge States"), not a sentence.
- After delivering, continue in chat: ask for the learner's explanation, answer questions, suggest the next concept.
