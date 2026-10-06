# Writing the text

A lesson is a **text with widgets in it**, not a widget with captions. The text carries the argument: it motivates, defines, derives and concludes. Widgets carry the relationships that words and static figures cannot show well. Questions are placed in the text where committing to an answer helps.

This file says how to structure that text. Every structural choice below has a reason and a source. Use the structure as a default, not as a form to fill in.

## The arc

A **Chapter** (one topic) follows all eight parts. An **Explainer** (one confusion) compresses them to: hook, short exploration, resolution, one or two checks.

| # | Part | What it does | Typical length |
|---|---|---|---|
| 1 | Hook | A concrete puzzle that the reader's current intuition gets wrong. They commit to an answer. | 1 paragraph + 1 question |
| 2 | Orient | Name the model, its parts and its parameters. Say what the reader will be able to do at the end. | 1–3 paragraphs, 1 equation |
| 3 | Explore | A first widget, ungated, with 2–4 concrete "try this" suggestions. | 1 widget + a short list |
| 4 | Build | Segments of prose → widget or figure → light check. Each segment adds one idea. | 2–4 segments |
| 5 | Formalise | The derivation or the general statement, after the reader has seen the behaviour. | as long as the physics needs |
| 6 | Resolve | Return to the hook: answer it with what was built. | 1–2 paragraphs |
| 7 | Practise | Denser questions in varied formats, including transfer and explanation. | 3–6 questions |
| 8 | Close | A short summary, conventions or caveats, and what to learn next. | 3–5 bullets |

### 1. Hook: challenge a prior belief

Open with a specific situation and a question whose intuitive answer is wrong, or at least incomplete. Ask the reader to commit: an `LX.ask` of type `choice` (with `grade: false`, so the choice is only acknowledged), `number` or `sketch`. Do not give the answer yet; the rest of the text earns it. Section 6 can quote the reader's choice back (`onAnswer`).

Good hooks are concrete and slightly surprising:
- "A chain of identical atoms, alternating only in bond strength. Can its ends host states that its bulk does not?"
- "A spin is driven at resonance for twice as long. Does it end up twice as far from where it started?"
- "Mean-field theory predicts \(\beta = 1/2\). In 2D Ising, how far off is that?"

**Why.**
- Derek Muller (the creator of Veritasium) tested this in his physics-education PhD work. Multimedia that stated and refuted the common misconception produced much larger learning gains than a clear exposition of the same physics (effect sizes about 0.8). Students rated the clear expositions as easier and clearer anyway [1, 2].
- In the conceptual-change model, a learner replaces an idea only after becoming dissatisfied with it. The new idea must then be intelligible, plausible and fruitful [3]. The hook creates the dissatisfaction.
- Predicting before seeing makes demonstrations work. Students who only watched a physics demonstration understood it no better than students who never saw it. Students who predicted the outcome first did significantly better [4].

### 2. Orient: name the parts before the behaviour

State the model: the Hamiltonian or equation, what each parameter means physically, the conventions and units. Keep it short; define only what the next sections use. Say in one sentence what the reader will be able to do at the end.

**Why.** Mayer's *pre-training* principle: people learn more from a dynamic presentation when they already know the names and characteristics of its parts. Otherwise they must learn the components and their interplay at the same time, which overloads working memory [5].

### 3. Explore: let them play before telling

Give the reader the main widget **ungated** and a short list of concrete things to try. Each suggestion is one action and one thing to watch: "Set \(v = 0\) and look at the end sites." Ask nothing yet, or one open question at most. Contrasting cases are the best suggestions: two settings that differ in one parameter and look very different.

**Why.** Students who first explored contrasting cases learned and transferred more from a later explanation than students who read a summary first [6]. Exploring prepares the reader to see what the formalism is about. Struggling with a problem before being taught how to solve it improves later conceptual understanding, even when the first attempts fail [7].

### 4. Build: short segments, words next to pictures

Each segment introduces **one** idea:
1. a paragraph that sets up what to look at;
2. a widget or a view of the main widget (often the same widget in another state, or a second linked widget);
3. a light check: one question, or a pointer to what the reader should see.

Keep the text that explains a figure directly above or below it, refer to visible things by their colour and name, and remove decoration that carries no information.

**Why.** These are the *segmenting*, *spatial contiguity*, *signalling* and *coherence* principles of multimedia learning. Learner-paced segments, words placed next to the corresponding graphics, cues that highlight the essential parts, and no extraneous material all reduce cognitive load and improve transfer [5, 8].

### 5. Formalise: equations after intuition

Now derive or state the general result. Link symbols to what the reader has manipulated ("the slider was \(v/w\)"). Number the key equations (`\begin{equation} … \label{eq:x} \end{equation}`, refer with `\eqref{eq:x}`). Long derivations can go in a collapsible `<details>` block, with the result kept in the main text.

**Why.** This is the "time for telling" [6]. Exposition is effective once the reader has differentiated prior knowledge to attach it to. Before that, it is easily read without being understood.

### 6. Resolve the hook

Answer the opening question explicitly, with the reasoning built in the text. If the reader's committed answer was wrong, the text says what made it plausible and where it fails.

**Why.** The refutation step in [1, 2] is what turned the misconception into learning. Leaving the hook unresolved wastes the dissatisfaction it created.

### 7. Practise: denser testing towards the end

The end of the text has the most questions. Vary the format:
- **`number`:** estimate a scale.
- **`sketch`:** predict a curve.
- **`set`:** put the widget into a given state.
- **`choice`:** a misconception check.
- **`explain`:** state the mechanism in your own words.
- **Transfer:** at least one question the widgets do not answer directly.

**Why.**
- Retrieving information from memory strengthens long-term retention more than restudying it, even though restudying feels more effective [9].
- Guidance that helps novices can hinder more advanced learners (the *expertise reversal effect*) [10]. Early sections can therefore be guided and lightly tested. By the end the reader is ready for less support and more demanding retrieval.

### 8. Close

Three to five bullet points: the result, the condition under which it holds, a common pitfall, and the next concept. Name the sources.

## Using questions well

Questions are tools, not a ritual. Use one when committing to an answer will make the next observation meaningful, or when retrieval is the goal.

- **Early: few questions.** The hook question, plus at most one light check per Build segment. Let the reader get used to the model first.
- **Late: more questions.** Practise has the most questions and the hardest ones.
- **Match the format to the thought:**

| You want the reader to… | Format |
|---|---|
| confront one specific wrong idea | `choice` with the misconception as a distractor |
| estimate a scale or an exponent | `number` with a tolerance |
| predict a whole functional shape | `sketch` on the figure, then compare |
| show they can produce a state, not just recognise it | `set`: "put the widget into…", then Check |
| articulate the mechanism | `explain`, then a model answer |

- **Gate results, not controls.** If seeing a figure would give away the answer, hide that figure with `LX.gate` and list it in the question's `reveal`. Never disable a control the reader has already used. Once something is shown, it stays shown.
- **Feedback teaches in both branches.** The right answer gets the reason. The wrong answer gets a pointer to what to look at in the widget.
- **Do not ask vocabulary questions.** Ask about the next observable consequence.

## Writing style

- Write like a good textbook author talking to a PhD student: plain, concrete, precise. No hype, no exclamation marks, no "Let's dive in".
- One idea per paragraph. Short paragraphs around widgets.
- Name conventions explicitly: units, signs, lattice, basis.
- Refer to the widget by what is visible: "the orange curve", "the left panel", "the slider \(v\)".
- Every claim the widget shows must be true for the stated model (see the badge rules in `widget-craft.md`).

## A note for the author

Active formats can feel less effective to learners than a smooth lecture, even when they teach more [11]. This is not a reason to drop them. It is a reason to keep the text clear and the questions fair, and to state the goal of each widget, so the effort is visibly purposeful.

## Sources

1. D. A. Muller, J. Bewes, M. D. Sharma, P. Reimann, "Saying the wrong thing: improving learning with multimedia by including misconceptions", *J. Comput. Assist. Learn.* **24**, 144–155 (2008).
2. D. A. Muller, M. D. Sharma, P. Reimann, "Raising cognitive load with linear multimedia to promote conceptual change", *Science Education* **92**, 278–296 (2008).
3. G. J. Posner, K. A. Strike, P. W. Hewson, W. A. Gertzog, "Accommodation of a scientific conception: toward a theory of conceptual change", *Science Education* **66**, 211–227 (1982).
4. C. H. Crouch, A. P. Fagen, J. P. Callan, E. Mazur, "Classroom demonstrations: learning tools or entertainment?", *Am. J. Phys.* **72**, 835–838 (2004).
5. R. E. Mayer, *Multimedia Learning* (Cambridge University Press, 2nd ed. 2009; 3rd ed. 2020): pre-training, segmenting, signalling, contiguity and coherence principles.
6. D. L. Schwartz, J. D. Bransford, "A time for telling", *Cognition and Instruction* **16**, 475–522 (1998).
7. M. Kapur, "Productive failure", *Cognition and Instruction* **26**, 379–424 (2008).
8. R. E. Mayer, R. Moreno, "Nine ways to reduce cognitive load in multimedia learning", *Educational Psychologist* **38**, 43–52 (2003).
9. H. L. Roediger, J. D. Karpicke, "Test-enhanced learning: taking memory tests improves long-term retention", *Psychological Science* **17**, 249–255 (2006).
10. S. Kalyuga, P. Ayres, P. Chandler, J. Sweller, "The expertise reversal effect", *Educational Psychologist* **38**, 23–31 (2003).
11. L. Deslauriers, L. S. McCarty, K. Miller, K. Callaghan, G. Kestin, "Measuring actual learning versus feeling of learning in response to being actively engaged in the classroom", *PNAS* **116**, 19251–19257 (2019).
