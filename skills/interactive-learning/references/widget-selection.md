# Widget selection

How to go from "the learner is stuck on X" to the right widgets for the text. Choose by **the shape of the insight**, not by the topic. A topic usually needs one to three shapes.

## Step 1: write the insight map

Before choosing anything, list in your planning:

1. The quantities involved (parameters the learner could control; observables they could see).
2. Which depend on which: "gap depends on \(v - w\)", "winding changes only when the gap closes", "edge state decay length depends on \(w/v\)".
3. The **2–3 relationships that carry the insight**. These become the widget. Everything else is prose.

Then ask for each relationship: *what kind of change is it?* That is its concept shape.

## Step 2: match shapes to patterns

| # | Concept shape | Recognise it when… | Widget type | Pattern file |
|---|---|---|---|---|
| 01 | Phase transition | something changes qualitatively at a parameter value; minima split, a symmetry breaks | landscape that reshapes + order-parameter curve; first-order vs continuous; hysteresis | `patterns/01-phase-transition.html` |
| 02 | Dynamics | something evolves in time | play/pause/scrub timeline, trajectory, linked state view | `patterns/02-dynamics.html` |
| 03 | 3D geometry | the object lives in 3D (or a 2D projection hides something) | drag-to-rotate view + linked projections and readouts | `patterns/03-geometry-3d.html` |
| 04 | Optimisation / extremum | a principle selects a minimum, maximum or saddle | draggable trial point on a landscape, slope arrow, "find the minimum" | `patterns/04-optimisation.html` |
| 05 | Spectral flow | eigenvalues move with a parameter; levels cross or repel | eigenvalues vs parameter with cursor + eigenvector inspector | `patterns/05-spectral-flow.html` |
| 06 | Superposition / interference | amplitudes add, then get squared | phasors added head to tail → intensity | `patterns/06-interference.html` |
| 07 | Dual representations | the same object in two bases or spaces | linked side-by-side views driven by one control | `patterns/07-dual-representations.html` |
| 08 | Topology / invariants | an integer that changes only at singular events | closed curve around a singular point, live invariant counter | `patterns/08-topology-winding.html` |
| 09 | Measurement / statistics | probabilities emerge from repeated sampling | shot sampler, histogram converging to the prediction | `patterns/09-measurement-statistics.html` |
| 10 | Self-consistency / fixed points | a solution feeds back into itself | cobweb diagram + iteration stepper | `patterns/10-self-consistency.html` |
| 11 | Flows | a vector field drives a state (RG, dynamical systems) | clickable flow field, trajectories, fixed points, separatrices | `patterns/11-flows.html` |
| 12 | Spatial structure / locality | properties vary across a lattice; a length scale matters | clickable lattice, correlation decay, length-scale readout | `patterns/12-spatial-structure.html` |
| 13 | Scaling / limits | behaviour depends on size or scale; asymptotics matter | size families, rescaled axes, data collapse | `patterns/13-scaling-collapse.html` |
| 14 | Approximation order | a series or expansion converges, or does not | order stepper, truncated vs exact, error plot | `patterns/14-approximation-order.html` |
| 15 | Composition / circuits | operations are built step by step and order matters | gate stepper with state readout per step | `patterns/15-circuits.html` |
| 16 | Symmetry | an operation leaves something invariant or forces degeneracy | apply-the-operation buttons; what changes, what stays | `patterns/16-symmetry.html` |

Each pattern file is a single widget with a "What you are looking at" block, and no questions. Its header comment says when to use it, the widget anatomy, the layout and why, the teaching moments (questions a text could ask around it), how to adapt it and the physics it implements. Read that header first. The widget code is in the `PATTERN` script at the end of the file; the marked `LX:` blocks are the shared library, identical in every file, so skip them. Some patterns also have page-specific CSS after `/* LX:STYLE-END */`; copy it along with the code you reuse.

Adapt the view to what the learner must *see*, not just the equation's form. Example: a self-consistency equation with a trivial root, \(\Delta = \Delta\, I(\Delta, T)\), drawn as a cobweb hugs the diagonal at weak coupling and the crossing is invisible. Divide out the trivial root and plot \(I(\Delta, T)\) against 1 instead; keep the cobweb for the iteration story only.

## Step 3: compose

When a topic needs several shapes, put them on one page as **linked views of one state**, not as separate widgets:

- One state object; every figure is a view of it; every control changes it.
- Arrange widgets in the order the text visits them; the text between them says what to look at next.
- Share colors: a quantity has the same color in every view.
- When the text moves to a new aspect, it may offer a button or limit that sets the shared state for the next view, but it never takes control away.

`examples/ssh-chapter.html` shows a full Chapter built from several shapes: spectral flow (bands and the finite-chain spectrum), topology (winding of \(d(k)\)), spatial structure (edge-state densities) and a phase transition (gap closing at \(v = w\)), embedded in text with questions. `examples/bcs-gap-explainer.html` shows the short form: one confusion, one widget.

For arranging a single widget (controls beside a figure, 2×2 with controls in a cell, …) see `assets/layouts.html`. For the question formats see `patterns/00-question-formats.html`.

## Topic → shape examples

These are starting points, not rules. Always do Step 1 first.

**Quantum mechanics and quantum information**
- Rabi oscillations, Ramsey, spin echo → 02 (+ 03 for the Bloch picture)
- Qubit states, gates as rotations, Berry phase → 03 (+ 08 for the phase as a solid angle)
- Uncertainty, wavepackets, Fourier pairs → 07
- Born rule, tomography, basis choice → 09 (+ 03)
- Bell states, entangling gates, teleportation → 15 (+ 09 for the measurement statistics)
- Decoherence, \(T_1/T_2\) → 02 (+ 03 for the shrinking Bloch vector)
- Variational quantum eigensolver, variational principle → 04
- Adiabatic theorem, Landau–Zener → 05 + 02

**Condensed matter**
- Band structure, tight-binding, Peierls instability → 05 (+ 01 for the instability)
- Topological insulators, SSH, Chern number → 08 + 05 + 12
- Fermi surfaces, Brillouin zones → 03 (+ 05)
- Bloch oscillations, wavepacket dynamics in a band → 02 + 07
- Localisation, correlation lengths, screening → 12
- Superconducting gap equation (BCS), mean-field magnetism → 10 + 01 (for BCS plot \(I(\Delta,T)\) vs 1, see Step 2; \(\Delta^2\) vs \(T\) shows the square-root onset as a straight line)
- Landau theory, spontaneous symmetry breaking → 01 (+ 16)
- Degeneracies, selection rules, Kramers → 16 (+ 05)

**Many-body and statistical physics**
- Mean-field theory, Hartree–Fock, DMFT self-consistency loop → 10
- Renormalisation group, universality, BKT → 11 + 13
- Critical exponents, finite-size scaling → 13 (+ 01)
- Perturbation theory, asymptotic series, resummation → 14
- Mott transition in a Hubbard dimer or DMFT (qualitative) → 01 + 05, schematic badge for the DMFT spectral function
- Quantum phase transitions, transverse-field Ising → 01 + 05 + 12

## When nothing fits

Build a new widget from `assets/base.html`, following `widget-craft.md`. Reuse the closest pattern's structure: a state object, one `update()`, linked figures, limit buttons, a guide block, self-tests.
