---
name: interactive-learning
description: Teach established graduate- and PhD-level physics (quantum mechanics, quantum information and computing, condensed matter, many-body and statistical physics) with Brilliant-style interactive pages, written like a textbook section with embedded widgets and questions in which the learner explores, predicts, manipulates and explains. Use when someone wants to understand, learn, build intuition for, or "see" a physics concept, asks for an interactive explanation, explorable, simulation-style figure or visual lesson, or is stuck on how quantities depend on each other. Works with or without material the user provides (papers, notes, data).
---

# Interactive learning

Turn a piece of established physics into an interactive page: a **text** with math, written like a good textbook section, that embeds a few widgets (linked figures with controls) and questions where committing to an answer helps. The skill decides how to teach, how to structure the text and which widgets to build. The physics comes from material the user provides (a paper, notes, data), otherwise from model knowledge.

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
| `references/knowledge-sources.md` | When the user provides material (a paper, notes, data, a link), or when citing sources. |
| `slim/assets/base.html` | Starting point for every page: the skeleton (header comment, page CSS slot, `<main>`, `PATTERN` script) with the three shared blocks as one-line markers. |
| `slim/assets/layouts.html` | When arranging a widget: five layout recipes with code. |
| `slim/patterns/NN-*.html` | The 1–4 patterns you selected. Each is one working widget for one concept shape; its header comment says how to adapt it and which questions fit around it. |
| `slim/patterns/00-question-formats.html` | When writing questions: the five `LX.ask` types and `LX.gate`. |
| `slim/examples/ssh-chapter.html` | When writing a Chapter. A full Chapter: text, math, four linked widgets, questions. Read the header comment and the `<article>`; skip the scripts, except the shared-state block at the top of the last script when you link widgets. |
| `slim/examples/bcs-gap-explainer.html` | When writing an Explainer. One confusion, one widget. Read the header comment and the `<article>`; skip the scripts. |
| `references/lx-api.md` | Before building: the one-screen summary of the `LX` helper library (generated from `base.html`). |
| `assets/base.html` | Only when you must paste the shared blocks by hand (no shell). Do not read it otherwise. |

Read the `slim/` copies, never the full pages under `assets/`, `patterns/` and `examples/`: each of those carries the same 45 KB of shared blocks and is for opening in a browser. A slim page is the same file with the shared blocks replaced by the markers `<!-- LX:HEAD -->`, `/* LX:STYLE */` and `/* LX:LIB */`; `node scripts/lx.mjs expand page.html` (path relative to this skill folder) turns it back into a full page.

## Workflow

1. **Check scope.** Is it an established result? If not, see Scope above.
2. **Find the knowledge.** If the user provided material (a paper, notes, data, a link), read the relevant parts and adopt its notation (`references/knowledge-sources.md`). Otherwise use model knowledge and standard textbook conventions.
3. **Diagnose.** Ask 1–3 short questions about what the learner knows and where they are stuck, unless the conversation already tells you. Skip what they clearly know.
4. **Write the insight map.** List what changes with respect to what. Choose the 2–4 relationships that carry the insight. Decide which need a widget and which are better as prose, an equation or a derivation.
5. **Choose the hook.** Find the misconception or surprising consequence that opens the text (`writing.md`, part 1).
6. **Select patterns.** Match each widget relationship to a concept shape using `references/widget-selection.md`. Read those pattern files' header comments and `PATTERN` scripts.
7. **Outline the text.** Follow the arc in `writing.md`. For each part, note the prose, which widget appears (and in which state), and which question if any. Keep early questions sparse and put more at the end.
8. **Build.** Copy `slim/assets/base.html` and write the page in slim form, keeping the three marker lines exactly as they are.
   - Write the text in the `<article>`.
   - Adapt the selected patterns into widgets between the paragraphs. Each widget has an honest badge, a fitting layout and a "What you are looking at" guide.
   - Add questions with `LX.ask`, and gate only results that would give an answer away.
   - Add `LX.check` self-tests for every physics fact the page relies on.
9. **Check.** Before delivering, verify:
   - limits behave as the physics says, and the self-tests pass;
   - schematic plots have no numeric ticks;
   - every control changes something, and every gate opens;
   - every TeX string renders, and the page works at phone width: one or two primary controls are pinned, and nothing interesting is transient (`widget-craft.md`, "Seeing it on a phone").

   If the repo's `tests/run.mjs` harness is available, run it on the file (it accepts slim pages).
10. **Deliver.** Expand the page: `node scripts/lx.mjs expand page.html page.full.html` (the script is in the skill folder; without a shell, paste the three blocks from `assets/base.html` over the markers). Publish the full page as an Artifact when the session supports it. Otherwise give the user a standalone `.html` file: the full page wrapped in a doctype skeleton (see the comment at the top of `base.html`). Keep the slim page as the source for later edits. Give it a short name as title.
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
- Sources: the material the user provided, or "model knowledge" plus textbook references you are sure of. No invented citations.
- Colors only through theme tokens. The page works in light and dark mode and at 400 px width.
