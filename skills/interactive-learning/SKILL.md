---
name: interactive-learning
description: Teach established graduate- and PhD-level physics (quantum mechanics, quantum information and computing, condensed matter, many-body and statistical physics) with Brilliant-style interactive widgets in which the learner predicts, manipulates, observes and explains. Use when someone wants to understand, learn, build intuition for, or "see" a physics concept, asks for an interactive explanation, explorable, simulation-style figure or visual lesson, or is stuck on how quantities depend on each other. Works with or without a user-provided knowledge base.
---

# Interactive learning

Turn a piece of established physics into an interactive lesson: a self-contained HTML page with linked figures, a few controls, and lesson steps that make the learner **predict before they see**. The skill decides how to teach and which widget to build; the physics comes from the user's knowledge base if they provide one, otherwise from model knowledge.

## Scope

- **For:** established, textbook-level results at graduate and PhD level.
- **Not for:** open research questions, contested interpretations, recent results. If asked for one, say once that the skill is built for established results and is less reliable here; continue only if the user wants to, and mark the page "Outside textbook scope: unreviewed".
- **No heavy numerics.** Widgets use exact formulas, small checkable computations, or schematic shapes. If a concept really needs large-scale numerics, say so and offer a schematic widget instead.

## Files

| File | Read when |
|---|---|
| `references/pedagogy.md` | Always, before planning the lesson. The learning loop and how to write predictions. |
| `references/widget-selection.md` | Always, to choose patterns. Concept shape → pattern table, composition, topic examples. |
| `references/widget-craft.md` | Before building. Exact / computed / schematic badges, interaction and visual rules, code rules. |
| `references/math-rendering.md` | When writing TeX (MathJax 3.2.2, SVG output) or putting math into figures. |
| `references/knowledge-sources.md` | When the user provides notes or a knowledge base, or when citing sources. |
| `assets/base.html` | Starting point for every widget: theme, layout, MathJax setup, the `LX` helper library. |
| `patterns/NN-*.html` | The 1–3 patterns you selected. Each is a working mini-lesson for one concept shape; its header comment says how to adapt it. |
| `examples/ssh-model.html` | When composing several shapes on one page. |

## Workflow

1. **Check scope.** Established result? If not, see Scope above.
2. **Find the knowledge.** If the user provided a knowledge base or notes, read the relevant parts and adopt their notation (`references/knowledge-sources.md`). Otherwise use model knowledge and standard textbook conventions.
3. **Diagnose.** Ask 1–3 short questions about what the learner knows and where they are stuck, unless the conversation already tells you. Skip what they clearly know.
4. **Write the insight map.** List what changes with respect to what, and choose the 2–3 relationships that carry the insight. Decide which need a widget and which are better as prose or a derivation in chat.
5. **Select patterns.** Match each chosen relationship to a concept shape using `references/widget-selection.md`. Read those pattern files' header comments and `PATTERN` scripts.
6. **Plan the lesson.** 4–6 steps for an explorable, 6–10 for a full lesson. For each step: the state it sets, the prediction (built around a real misconception), what gets unlocked, what the feedback says. End with an explain step and a transfer question.
7. **Build.** Copy `assets/base.html`. Keep the `LX:` blocks unchanged. Adapt the selected patterns into one page with linked views of one state. Set the badge honestly (exact / computed / schematic), the conventions line and the source line. Add `LX.check` self-tests for every physics fact the widget relies on.
8. **Check.** Before delivering, verify: limits behave as the physics says; self-tests pass; schematic plots have no numeric ticks; every TeX string renders; the page works at phone width. If the repo's `tests/run.mjs` harness is available, run it on the file.
9. **Deliver.** Publish the fragment as an Artifact when the session supports it. Otherwise give the user a standalone `.html` file: the fragment wrapped in a doctype skeleton (see the comment at the top of `base.html`). Keep the unwrapped fragment for testing. Give it a short name as title.
10. **Follow up in chat.** Ask the learner to explain what they saw in their own words, correct any gap, pose the transfer question, and suggest the next concept.

## Modes

- **Explorable** (default): one widget for one confusing point, 4–6 steps. Use it in the middle of a conversation when the learner is stuck.
- **Lesson:** a longer sequence on one page, 6–10 steps, several linked views. Use it when the learner asks to learn a topic.

Choosing: a question about one relationship ("why does the gap close like a square root?") → Explorable. A request to learn or review a topic ("teach me BCS theory") → Lesson. "Make me something interactive" about one confusion → Explorable, extended to a Lesson only if the confusion spans several relationships. When unsure, build the Explorable and offer to extend it.

## Non-negotiables

- Every revealing step has a prediction first, and the controls that would give it away are locked until the learner answers.
- The badge is true. Schematic means no numeric tick labels.
- Physics shown is either exact for the stated model, a small checked computation, or explicitly schematic. Never draw a feature you cannot justify.
- Sources: the user's notes, or "model knowledge" plus textbook references you are sure of. No invented citations.
- Colors only through theme tokens; the page works in light and dark mode and at 400 px width.
