# To do

Ideas we decided to postpone. Each item says why it waits.

## Slim pattern files for the model (context size)

About 45 KB of every pattern and example file is the shared `LX` library (`LX:HEAD`, `LX:STYLE`, `LX:LIB`), identical to `assets/base.html`. The model reads whole files, so a Chapter that reads base.html, three patterns and an example takes in the library five times (roughly 50k tokens of duplicate code). Removing the blocks would cut each pattern file by about 75%.

Waiting because: the full files must stay openable in a browser, since patterns are reviewed and debugged by opening them directly. Any change has to keep that.

Options that would keep the files checkable:
- Keep the full files in the repo as they are, and have `tests/sync-base.mjs` also write slim copies (header comment + page CSS + `PATTERN` script) that SKILL.md points the model to.
- Or store slim files and have a script (e.g. `node tests/preview.mjs`) write browsable full versions to a git-ignored `preview/` folder, so opening a pattern means opening its preview.

## Stabilizer-code showcase

A worked page on stabilizer codes / the surface code (click to place errors, syndromes light up, logical operators as non-contractible loops). Meant as a showcase of good use of the skill, kept outside `skills/` (e.g. a repo-level `gallery/`) so it costs the model no context. Jakob will build it separately.

## Possible later pattern variants (not new files)

- Noise and stochastic signals (time trace ↔ power spectral density ↔ filter function; dynamical decoupling, T₂, 1/f): add as a mode of pattern 18 (response and spectra), linked by the fluctuation–dissipation theorem.
- Keep the library at about 21 patterns; add new shapes as variants of existing patterns rather than new files.
