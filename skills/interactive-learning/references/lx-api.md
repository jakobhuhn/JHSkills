<!-- GENERATED from assets/base.html (the comment at the top of its LX:LIB block) by tests/sync-base.mjs; edit base.html, then run the script. -->
# LX helper library

The `LX` object every page gets from the shared `LX:LIB` block. One line per helper; read the call sites in the slim patterns for usage.

```
LX — small helper library for interactive-learning widgets. API summary:
DOM      LX.h(tag, attrs, parent) · LX.fig(parent, caption) · LX.typeset(el)
Numbers  LX.linspace · LX.clamp · LX.sample(f,a,b,n) · LX.C (complex) · LX.eigSym(A) · LX.niceTicks · LX.rng(seed)
Plots    LX.plot(parent, {xlim, ylim, ticks, frame, xlabel, ylabel, width, height}) → path/fn/dot/line/vline/hline/
         area/text/tex/arrow/clear/clearAll/ghost/setLim/setLabels/X/Y/inv/svg/g · P.hud(key, text, {at: ne|nw|se|sw}) readout in a corner
         layers: grid, axes, ghost, fill, main, top, handles, hud (handles and hud are never cleared by clearAll)
         LX.drag(plot, node, {get, set, step, start, end}) · LX.fig(parent, caption, {below}) · LX.setHTML(el, html)
3D       LX.camera({yaw, pitch, scale}) → project([x,y,z]) · rotate by dragging an element
Widget   LX.widget(mount, {layout: stack|split|grid2|aside|hero, left, title, badge}) → body element
         LX.guide(widgetOrBody, [[term, description], ...]) — the "What you are looking at" block
         LX.legend(parent, [[label, colorVar, "line"|"dash"|"dot"], ...])
Controls LX.controls(parent) · LX.slider · LX.segmented · LX.button · LX.limits · LX.readout
         LX.player(parent, {slider, speed, loop} | {onFrame}) — Play drives a slider, so everything is scrubbable
         {primary: true} on a slider/segmented/limits/player, or LX.pin(parent, el): on a phone it sticks to the
         bottom of the screen while the widget is in view (one or two per widget: the control the reader moves most)
Text     LX.ask(parent, {type: choice|number|set|sketch|explain, prompt, ..., reveal}) — inline question
         LX.gate(el, message) — hide a result until a question that lists it in `reveal` is answered
Checks   LX.check(name, fn) → window.__lxTests
```
