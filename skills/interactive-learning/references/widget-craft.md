# Widget craft

Rules for building the widget itself. They apply on top of `assets/base.html`, which already provides the theme, the layout and the `LX` library. Read the API summary at the top of its `LX:LIB` block before writing code.

## Honesty: exact, computed, schematic

Every widget carries one badge in its header, and the badge must be true:

| Badge | `data-kind` | Meaning | Rules |
|---|---|---|---|
| Exact | `exact` | Every plotted quantity comes from a closed-form expression of the stated model. | Show the formula and conventions in the meta line or a caption. Numeric axes allowed. |
| Computed | `computed` | Small, checkable numerics (e.g. `LX.eigSym` on a ≤ 200×200 matrix, RK4 of a few ODEs). | Self-test the numerics against known limits. Say what is computed in a caption. |
| Schematic | `schematic` | Only the qualitative shape is meaningful (e.g. a spectral function's peak structure, a phase diagram's topology). | Plots use `ticks: false`: **no numeric tick labels**. Label only named features with `P.tex` (e.g. \(U_c\), \(\pm U/2\)). Say in a caption which features are meaningful. |

The schematic rule matters: a cartoon with numbers on its axes reads as data. If a curve's shape is known but its numbers depend on a method or approximation, draw it schematic.

Never draw a feature you cannot justify. Each visible feature of the widget should correspond to something in the source (the user's knowledge base, or a standard textbook result).

## Interaction design

- **One knob per insight.** Each control should map to one relationship the lesson is about. Hide or fix everything else; add controls in later steps if needed.
- **Linked views.** Show the same state in two or three representations that update together (landscape + order parameter; band structure + winding curve + real-space density). Most insight is in the link.
- **Limit buttons.** `LX.limits(...)` with one button per regime the topic's literature names. Label them with the physics ("Atomic limit", "Critical point"), not the parameter values.
- **Ghost traces.** When the lesson asks "how did that change?", let the learner keep a copy (`P.ghost()`) and compare.
- **Readouts.** Show the two or three numbers the lesson talks about (gap, winding number, \(\Delta x\,\Delta k\)), with `LX.readout`. Not more.
- **Sensible ranges.** Slider ranges cover the interesting regimes and nothing else. Start the widget in a state that already shows something.
- **Direct manipulation where it is natural.** Drag a trial point on a landscape, drag a phasor, click a lattice site. Every draggable also works with arrow keys (`LX.drag` does this).
- **Time.** Animate only what evolves in time (`LX.player`). Always pair it with a scrub slider and start paused under reduced motion.

## Visual rules

- Colors only through the base CSS classes (`s1`–`s4` strokes, `f1`–`f4` fills, `a1`–`a3` areas, `sm`, `dash`, `thin`) or `var(--…)` tokens. Never a literal hex color in a component: both light and dark themes must work.
- Use the series colors consistently across linked views: the same quantity has the same color everywhere.
- Name axes with TeX (`xlabel`, `ylabel` in `LX.plot`). Use units or "dimensionless" in the caption.
- Captions say what the figure shows in one line. Put conventions in the header meta line.
- The page must work at 400 px width: figures stack, controls wrap. The test harness checks this.
- The page must be complete at rest: the first frame, before any interaction, already shows a meaningful state.

## Code rules

- Start from `assets/base.html`. Keep the three marked blocks (`LX:HEAD`, `LX:STYLE`, `LX:LIB`) unchanged; add page CSS after `/* LX:STYLE-END */` and code in the `PATTERN` script.
- One state object, one `update()` that redraws everything from it. Controls only change the state and call `update()`.
- Keep numerics small enough to run on every slider move (aim under ~16 ms). Precompute what does not depend on the control being moved.
- Give every control a stable `id` (lesson steps lock controls by id; slider wrappers are `<id>-wrap`).
- Add `LX.check(...)` self-tests for every physics fact the widget relies on: normalization, a closed form at a special point, a limit, a symmetry. They run at load and are reported by the test harness. Make anything random use a seeded generator.
- Do not load extra libraries unless the widget really needs one. Only the CDNs listed in the artifact rules are allowed.

## Delivery

- Publish the page as an Artifact when the session can (the file is already an Artifact fragment). Otherwise save it as an `.html` file wrapped in a doctype skeleton, as described at the top of `base.html`.
- Title: a short name of the thing (e.g. "SSH Edge States"), not a sentence.
- After delivering, continue in chat: ask for the learner's explanation, answer questions, suggest the next concept.
