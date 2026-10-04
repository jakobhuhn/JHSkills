# Pedagogy

How to turn a piece of established physics into a lesson that changes what the learner can *do*, not just what they have read. The learner is a graduate student or researcher: fluent in linear algebra, calculus and quantum mechanics, short on time, and often stuck on intuition rather than on formalism.

## The learning loop

Every lesson, and every step inside it, runs some part of this loop:

| Stage | What happens | What it looks like in a widget |
|---|---|---|
| **Diagnose** | Find out what the learner already has. | 1–3 short questions in chat before building, or infer from the conversation. Skip what they clearly know. |
| **Predict** | The learner commits to an expectation *before* seeing the answer. | A `predict` block with 2–4 options; the controls that would give it away are locked until they answer. |
| **Manipulate** | They change one thing. | One slider, one drag, one button. |
| **Observe** | They see the consequence, in linked views. | The figures update together; readouts show the key numbers. |
| **Explain** | They put it in words. | An `explain` box: write first, then compare with a model answer. |
| **Formalize** | The equation names what they already saw. | The formula appears in the `after` text or feedback, with symbols matched to the controls. |
| **Transfer** | They apply it somewhere the widget does not show. | A transfer question at the end of the model answer. |

Prediction is the step that matters most. A wrong prediction followed by the reveal is where the learning happens. A widget without predictions is a toy: fiddling feels like understanding and isn't.

## Writing predictions

- Ask about the **next observable consequence**, not about vocabulary. "What happens to the gap as \(v \to w\)?" not "What is this transition called?"
- Make the wrong options the **real misconceptions** of the topic, the ones a smart student actually holds. A distractor nobody would pick teaches nothing.
- 2–4 options. Three is usually right.
- Feedback teaches in both branches. The `right` text adds the reason or the formula; the `wrong` text tells them what to look at in the widget to see why. Never just "Correct!".
- Lock the controls that would reveal the answer (`lock: [...]`) and unlock them with the answer, so the next thing they do is check their prediction.

## Sequencing a lesson

- **Concrete before abstract.** Start in a limit where the answer is obvious (a fully dimerised chain, \(U = 0\), a single spin), then move away from it.
- **One idea per step.** If a step needs two predictions, split it.
- **Fade the scaffolding.** Early steps set the widget state for them (`onEnter`); later steps say "set it up yourself so that…".
- **Limits are anchors.** Experts reason from limits and interpolate. Give a limit button for every regime the topic's literature talks about, and use them in the steps.
- **Small systems first, then scaling.** Two sites, then four, then the size-dependence. Many-body physics cannot be pictured directly; a minimal toy model that keeps the key mechanism almost always can.
- **End with explain + transfer.** The last step asks for a verbal explanation, then poses a question the widget cannot answer directly.

Typical lesson length: 4–6 steps for an explorable, 6–10 for a full lesson.

## Misconceptions to target

Each topic has a few predictable wrong mental models. Name them while planning and build at least one prediction around each. Examples:

- "A gap closing always means a phase transition." (Only if it cannot be avoided; symmetry decides.)
- "Entanglement is just correlation."
- "Measurement in any basis gives the same statistics."
- "Mean-field exponents are exact."
- "Degenerate levels can always be split by a small perturbation." (Not if a symmetry protects them.)
- "Higher order in perturbation theory is always better."

## When not to build a widget

Interactivity is for **relationships that change with a parameter**. Use prose or a derivation when:

- the point is a chain of algebraic steps (do the derivation, maybe with a widget at the end that checks the result);
- the content is a definition or a classification with no continuous structure;
- nothing the learner can vary changes anything they can see.

A good lesson often mixes them: a derivation in the chat, a widget for the one relationship that the derivation hides, and back to the derivation.

## Tone of the lesson text

Plain, concrete, short. Write like a good textbook author talking to a PhD student. Use the field's standard notation and name conventions explicitly (units, sign conventions, which lattice). No hype, no exclamation marks, no filler such as "Let's dive in".
