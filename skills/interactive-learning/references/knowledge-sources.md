# Knowledge sources

The skill decides *how* to teach. *What* is true comes from material the user provides, or from model knowledge. The skill does not maintain or index a knowledge base; it reads what it is given, for this page.

## 1. Material the user provides

The user may hand over anything: a paper (PDF or link), lecture notes, a textbook chapter, their own markdown notes, a dataset, a figure, a code file, or a folder in the current project. There is **no required format** and no setup.

How to use it:

1. **Take what is given.** Read the files or links the user names. If they mention material without saying where it is, ask once. Do not search their disk or the web for it uninvited.
2. **Read only what the page needs.** For a long document, find the relevant section first; follow references and prerequisites only when the lesson depends on them.
3. **Follow it.** Use its notation, sign conventions, units and terminology in the text and the widgets, even where you would choose differently. If it contradicts the standard textbook treatment, say so in chat once and ask which to follow.
4. **Keep the scope rule.** A paper can supply conventions, a model, a worked case or a figure to reproduce, but the page still teaches established results. Recent or contested findings from it are marked as in the scope section of `SKILL.md`.
5. **Data can drive a widget.** A table or array the user provides may be plotted alongside the model; the badge then says what is computed and the caption says what is measured and where it comes from. Do not smooth, fit or extrapolate data beyond what the user asked for.
6. **Cite it.** The footer source line names the material used: title and authors for a paper, file names for notes or data.
7. **Do not write to it** unless the user asks.

## 2. No material: model knowledge

The skill works without any material. Then:

- Teach only **established, textbook-level results** (see the scope rule in `SKILL.md`).
- Use the standard conventions of the field's main textbooks and state them in the widget's meta line.
- The footer says `Source: model knowledge.` followed by one or two standard textbook references you are confident about (book and chapter). Do not invent section numbers, page numbers, equation numbers or papers. When unsure of a chapter, cite the book alone.
- If a detail is method-dependent or not settled (a critical value that differs between approximations, for instance), either leave it out or draw it schematic and say so.

## Outside the intended scope

Open research questions, contested interpretations and recent results are outside the scope. If the user asks for one:

1. Say once, briefly, that the skill is designed for established results and that the widget will be less reliable here.
2. If they want to continue, build it, mark it in the footer as "Outside textbook scope: unreviewed", and prefer schematic badges.
