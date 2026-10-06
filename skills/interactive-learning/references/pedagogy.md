# Pedagogy

How to turn a piece of established physics into a page that changes what the learner can *do*, not just what they have read. The learner is a graduate student or researcher: fluent in linear algebra, calculus and quantum mechanics, short on time, and often stuck on intuition rather than on formalism.

This file is a **toolbox**: techniques, and when each one helps. `writing.md` says how to arrange them into a text. Its sources are the evidence behind the choices here.

## The few hard rules

1. **Never take access away.** Once a control, figure or result has been usable or visible, it stays so. Hide a result until a question is answered (`LX.gate`) if seeing it would give the answer away, but never re-lock anything.
2. **Never show a feature you cannot justify** (see the badge rules in `widget-craft.md`).
3. **Challenge at least one belief.** Every Chapter or Explainer contains at least one moment where a plausible expectation fails: usually the hook (`writing.md`, part 1).

Everything else below is a choice.

## Toolbox

| Tool | What it is | Use it when | Avoid it when |
|---|---|---|---|
| **Free exploration** | An ungated widget plus 2–4 concrete "try this" suggestions. | The reader first meets a model and needs to get a feel for its parameters. | The reader would wander without seeing the point: then give contrasting cases instead. |
| **Contrasting cases** | Two settings that differ in one parameter and behave visibly differently ("set \(v < w\), then \(v > w\)"). | Before telling: they make the reader notice the feature the formalism will explain. | The difference is too subtle to see without guidance. |
| **Prediction** | The reader commits to an outcome before seeing it. | The outcome contradicts a common intuition, or the reader is now familiar enough with the model to reason about it. | It is the reader's first contact with the model: they have nothing to predict from. |
| **Worked example** | The text walks through one case completely, with the widget set accordingly. | A procedure or derivation is new and has several steps. | The reader has already done it once: then ask them to do the next case themselves. |
| **Limits** | Jump the widget to a named regime (`LX.limits`): atomic limit, critical point, weak coupling. | Always useful. Experts reason from limits and interpolate between them. | — |
| **Retrieval question** | A question that recalls something from earlier in the text without looking. | Towards the end, to consolidate. | Right after the material: then it tests reading, not memory. |
| **Explanation** | The reader writes the mechanism in their own words, then compares with a model answer. | After a key result, and at the end. | For facts and definitions. |
| **Transfer** | A question the widgets do not answer directly. | At the end of a Chapter. | — |

Mixing matters more than any single tool. A typical Chapter goes from exploration and contrasting cases, through a few predictions and worked examples, to retrieval, explanation and transfer at the end. **Questions become denser towards the end.** Early on, the reader is still building the model and needs freedom more than tests.

## Writing a good question

- Ask about the **next observable consequence**, not about vocabulary. "What happens to the gap as \(v \to w\)?", not "What is this transition called?".
- Build distractors from the **real misconceptions** of the topic, the ones a smart student actually holds.
- **Pick the format to fit the thought** (table in `writing.md`):
  - `choice` for one misconception;
  - `number` for a scale;
  - `sketch` for a functional shape;
  - `set` for "produce this state";
  - `explain` for a mechanism.
- Feedback teaches in both branches: the reason when right, and what to look at in the widget when wrong. Never just "Correct!".
- If seeing a figure would answer the question, gate that figure and reveal it with the answer. Leave the controls alone.

## Sequencing

- **Concrete before abstract.** Start in a limit where the answer is obvious (a fully dimerised chain, \(U = 0\), a single spin), then move away from it.
- **One idea per segment.** If a paragraph–widget–question segment needs two new ideas, split it.
- **Fade guidance.** Early segments set the widget into the right state for the reader. Later ones say "set it up yourself so that…".
- **Small systems first, then scaling.** Two sites, then four, then the size dependence. Many-body physics cannot be pictured directly; a minimal toy model that keeps the key mechanism almost always can.
- **Intuition before formalism.** Derive after the reader has seen the behaviour, and link each symbol to a control they used.

## Misconceptions to target

Each topic has a few predictable wrong mental models. Name them while planning and use them for the hook and for `choice` distractors. Examples:

- "A gap closing always means a phase transition." (Only if it cannot be avoided; symmetry decides.)
- "Entanglement is just correlation."
- "Measurement in any basis gives the same statistics."
- "Mean-field exponents are exact."
- "Degenerate levels can always be split by a small perturbation." (Not if a symmetry protects them.)
- "Higher order in perturbation theory is always better."
- "Driving twice as long rotates the state twice as far, so it ends up twice as far away." (On the Bloch sphere, a 2π pulse returns the spin to where it started.)

## When not to build a widget

Interactivity is for **relationships that change with a parameter**. Use prose, an equation or a static figure when:

- the point is a chain of algebraic steps (derive it; perhaps follow it with a widget that checks the result);
- the content is a definition or a classification with no continuous structure;
- nothing the learner can vary changes anything they can see.

A good text uses one to four widgets, not one per paragraph.

## Widget density

Widgets can be sparse or dense. A sparse widget has one control and one figure, and suits a single relationship. A dense one has several linked views and suits a model the reader will explore for a while. Vary the density across a Chapter. When a widget needs more than three or four controls, check whether direct manipulation (dragging on the figure) can replace some of them, or whether it should be two widgets.
