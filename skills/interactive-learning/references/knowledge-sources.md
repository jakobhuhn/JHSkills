# Knowledge sources

The skill decides *how* to teach. *What* is true comes from one of two places.

## 1. A knowledge base the user provides

The user may point to a knowledge base: a folder of markdown notes (for example an "LLM wiki" or an Obsidian vault), lecture notes, a textbook chapter, a PDF, or files in the current project. There is **no required format**.

How to use it:

1. **Find it.** Use the path the user gives. If they mention one without a path, ask. Do not search their disk for it uninvited.
2. **Read only what the lesson needs.** Look for an index or links first; follow links to prerequisites only when the lesson depends on them.
3. **Follow it.** Use its notation, sign conventions, units and terminology in the widget and the lesson text, even where you would choose differently. If it contradicts the standard textbook treatment, say so in chat once and ask which to follow.
4. **Cite it.** The footer source line names the notes used (file names or titles).
5. **Do not write to it** unless the user asks. If the lesson produced something worth keeping (a clean explanation, a summary of the misconceptions), offer to add a note in their format.

## 2. No knowledge base: model knowledge

The skill works without a knowledge base. Then:

- Teach only **established, textbook-level results** (see the scope rule in `SKILL.md`).
- Use the standard conventions of the field's main textbooks and state them in the widget's meta line.
- The footer says `Source: model knowledge.` followed by one or two standard textbook references you are confident about (book and chapter). Do not invent section numbers, page numbers, equation numbers or papers. When unsure of a chapter, cite the book alone.
- If a detail is method-dependent or not settled (a critical value that differs between approximations, for instance), either leave it out or draw it schematic and say so.

## Outside the intended scope

Open research questions, contested interpretations and recent results are outside the scope. If the user asks for one:

1. Say once, briefly, that the skill is designed for established results and that the widget will be less reliable here.
2. If they want to continue, build it, mark it in the footer as "Outside textbook scope: unreviewed", and prefer schematic badges.
