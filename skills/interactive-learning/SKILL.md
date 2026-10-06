---
name: interactive-learning
description: Teach established graduate- and PhD-level physics (quantum mechanics, quantum information and computing, condensed matter, many-body and statistical physics) with Brilliant-style interactive pages, written like a textbook section with embedded widgets and questions in which the learner explores, predicts, manipulates and explains. Use when someone wants to understand, learn, build intuition for, or "see" a physics concept, asks for an interactive explanation, explorable, simulation-style figure or visual lesson, or is stuck on how quantities depend on each other. Works with or without a user-provided knowledge base.
---

# Interactive learning

Turn a piece of established physics into an interactive page: a **text** with math, written like a good textbook section, that embeds a few widgets (linked figures with controls) and questions where committing to an answer helps. The skill decides how to teach, how to structure the text and which widgets to build. The physics comes from the user's knowledge base if they provide one, otherwise from model knowledge.

## Scope

- **For:** established, textbook-level results at graduate and PhD level.
- **Not for:** open research questions, contested interpretations, recent results. If asked for one, say once that the skill is built for established results and is less reliable here. Continue only if the user wants to, and mark the page "Outside textbook scope: unreviewed".
- **No heavy numerics.** Widgets use exact formulas, small checkable computations, or schematic shapes. If a concept really needs large-scale numerics, say so and offer a schematic widget instead.

## Files

| File | Read when |
|---|---|
| `references/writing.md` | Always, before writing. The structure of the text (hook → orient → explore → build → formalise → resolve → practise → close), why it works, the question formats. |
| `references/pedagogy.md` | Always, when planning. The toolbox (exploration, contrasting cases, prediction, worked examples, limits, retrieval, explanation, transfer) and the three hard rules. |
| `references/widget-selection.md` | Always, to choose widgets. Concept shape → pattern table, composition, topic examples. |
| `references/widget-craft.md` | Before building. Badges, interaction rules, layouts, visual and code rules. |
| `references/math-rendering.md` | When writing TeX (MathJax 3.2.2, SVG output) or putting math into figures. |
| `references/knowledge-sources.md` | When the user provides notes or a knowledge base, or when citing sources. |
| `assets/base.html` | Starting point for every page: theme, article layout, MathJax setup, the `LX` library. |
| `assets/layouts.html` | When arranging a widget: five layout recipes with code. |
| `patterns/NN-*.html` | The 1–4 patterns you selected. Each is one working widget for one concept shape; its header comment says how to adapt it and which questions fit around it. |
| `patterns/00-question-formats.html` | When writing questions: the five `LX.ask` types and `LX.gate`. |
| `examples/ssh-chapter.html` | A full Chapter: text, math, three widgets, questions. |
| `examples/bcs-gap-explainer.html` | A short Explainer: one confusion, one widget. |

## Workflow

1. **Check scope.** Is it an established result? If not, see Scope above.
2. **Find the knowledge.** If the user provided a knowledge base or notes, read the relevant parts and adopt their notation (`references/knowledge-sources.md`). Otherwise use model knowledge and standard textbook conventions.
3. **Diagnose.** Ask 1–3 short questions about what the learner knows and where they are stuck, unless the conversation already tells you. Skip what they clearly know.
4. **Write the insight map.** List what changes with respect to what. Choose the 2–4 relationships that carry the insight. Decide which need a widget and which are better as prose, an equation or a derivation.
5. **Choose the hook.** Find the misconception or surprising consequence that opens the text (`writing.md`, part 1).
6. **Select patterns.** Match each widget relationship to a concept shape using `references/widget-selection.md`. Read those pattern files' header comments and `PATTERN` scripts.
7. **Outline the text.** Follow the arc in `writing.md`. For each part, note the prose, which widget appears (and in which state), and which question if any. Keep early questions sparse and put more at the end.
8. **Build.** Copy `assets/base.html` and keep the `LX:` blocks unchanged.
   - Write the text in the `<article>`.
   - Adapt the selected patterns into widgets between the paragraphs. Each widget has an honest badge, a fitting layout and a "What you are looking at" guide.
   - Add questions with `LX.ask`, and gate only results that would give an answer away.
   - Add `LX.check` self-tests for every physics fact the page relies on.
9. **Check.** Before delivering, verify:
   - limits behave as the physics says, and the self-tests pass;
   - schematic plots have no numeric ticks;
   - every control changes something, and every gate opens;
   - every TeX string renders, and the page works at phone width.

   If the repo's `tests/run.mjs` harness is available, run it on the file.
10. **Deliver.** Publish the fragment as an Artifact when the session supports it. Otherwise give the user a standalone `.html` file: the fragment wrapped in a doctype skeleton (see the comment at the top of `base.html`). Keep the unwrapped fragment for testing. Give it a short name as title.
11. **Follow up in chat.** Ask the learner what they took away, correct any gap, and suggest the next concept.

## Modes

- **Explainer:** one confusion, about one screen of text, one widget, one or two questions. Use it in the middle of a conversation when the learner is stuck on one relationship ("why does the gap close like a square root?").
- **Chapter:** one topic, the full arc of `writing.md`, two to four widgets, questions that get denser towards the end. Use it when the learner asks to learn or review a topic ("teach me the SSH model").

When unsure, build the Explainer and offer to extend it into a Chapter.

## Non-negotiables

- The text carries the argument; widgets support it. No page is just a widget.
- Never take access away: once a control or result has been usable or visible, it stays so. Gate results, not controls.
- At least one moment in every page challenges a plausible belief, usually the hook.
- Every widget explains itself (`LX.guide`), and every control visibly does something.
- The badge is true. Schematic means no numeric tick labels. Physics shown is exact for the stated model, a small checked computation, or explicitly schematic. Never draw a feature you cannot justify.
- Sources: the user's notes, or "model knowledge" plus textbook references you are sure of. No invented citations.
- Colors only through theme tokens. The page works in light and dark mode and at 400 px width.
