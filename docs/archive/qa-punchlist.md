# QA Punch List — AI Maturity Course

Audit date: 2026-07-14
Scope: `site/` — 80 topic pages (`levels/level-{1..10}/topic-{T}.html`), 11 index pages, shared scaffold
(`assets/js/*.js`, `assets/css/styles.css`), `site/example-topic.html`, content cross-checked against
`research/curriculum.md`.

## Summary

- **Blocker issues found: 0**
- **Major issues found: 4** (all the same class of bug: drag-and-drop exercises with no keyboard/click
  fallback)
- **Minor issues found: 0**

**Levels affected:** Level 1 (2 topics), Level 5 (1 topic), Level 7 (1 topic). **Levels 2, 3, 4, 6, 8, 9,
10, the shared scaffold (`assets/js/*`, `assets/css/styles.css`), and global nav are all clean** — no
issues found in the sampling performed (see method note below).

### Method note (read before treating "clean" as exhaustive)

Every one of the 80 topic files was scanned structurally (via grep) for: exactly one `Exercise.create`,
exactly one `Quiz.render`, exactly one `Site.renderPrevNext`, presence of `addEventListener`, absence of
placeholder language ("would show", "coming soon", "TODO", "placeholder", etc.), absence of `<img>` tags,
and absence of inline `onclick=`/`oninput=` handlers. All 80 files passed every one of these structural
checks with no exceptions. On top of that, **34 of the 80 topic files were fully read end-to-end**
(JS included), spanning all 10 levels, the first and last topic in the course, at least one topic per
level, and all 4 curriculum-gap "added" topics (`1-7`, `4-9`, `5-9`, `6-8`). Every fully-read file had a
genuinely real, working exercise with correctly wired event listeners, a real graded quiz with a
non-empty `questions` array, and content matching `research/curriculum.md` closely (in several cases
matched almost word-for-word, e.g. "Scaling Laws" and "Novel Architectures"). Given that consistency, and
that the same content-builder process/template produced all 80 pages, the risk of an undetected blocker
in an unread file is low, but the 46 topic files that were not individually opened were only verified
structurally, not read line-by-line.

---

## Shared scaffold (`site/assets/js/*.js`, `site/assets/css/styles.css`)

**Clean.** Read in full.

- `course-data.js` — `window.COURSE` matches the documented shape exactly; all 80 topics present with
  correct `num`/`id`/`title`/`file`, correct per-level counts (7/8/7/9/9/8/8/8/8/8 = 80), and the 4
  `added: true` topics flagged as documented.
- `progress.js` — uses `localStorage` key `aimc:progress:v1` as documented; `isComplete`,
  `markComplete`, `markIncomplete`, `toggle`, `getCompletedCount`, `getTotalCount`, `getLevelProgress`,
  `reset`, `onChange` all present and behave as specified; `getCompletedCount`/`getLevelProgress` only
  count ids present in `window.COURSE`, matching the documented anti-inflation guarantee.
- `quiz.js` — `Quiz.render` builds real `<input type="radio">`/`<checkbox">` inputs wrapped in
  `<label>`, grades client-side via `arraysEqual`/`normalizeAnswer` against the `answer` field (index or
  array of indices), shows a real "N / M correct" score line, reveals per-question explanations, has a
  working "Try again" (`retryBtn`) that resets and re-enables the form, and auto-calls
  `Progress.markComplete(topicId)` on a passing score when `topicId` is set — all exactly as documented.
- `exercise.js` — `Exercise.create` builds the shell (title, instructions, mount div, Reset button,
  conditional "I did it" button), and the Reset contract (`doMount()` clears `root` and re-invokes
  `config.mount(root, ctx)`) is implemented correctly. `ctx.markComplete()` and `ctx.reset()` both work
  as documented.
- `site.js` — `Site.renderPrevNext` correctly returns `{prev: null, ...}` at the first topic (`1-1`) and
  `{next: null, ...}` at the last topic (`10-8`) via `flattenTopics()`/`getPrevNext()`; header/footer
  auto-render on `DOMContentLoaded`; `window.SITE_ROOT` convention is honored throughout (empty string
  at root, `"../../"` two folders deep).
- `styles.css` — design tokens use plausible WCAG-AA-range contrast (e.g. `--color-text: #1a2033` on
  `--color-bg: #ffffff`/`--color-bg-alt: #f5f7fb`, `--color-text-muted: #4c5470` on white — all comfortably
  above 4.5:1). Global `:focus-visible` outline (`3px solid var(--color-focus)`) is defined and not
  suppressed for keyboard users (`:focus:not(:focus-visible) { outline: none; }` only removes it for
  mouse clicks). `@media (prefers-reduced-motion: reduce)` is honored. No fork/override files found.

No `<img>` tags exist anywhere in the site (confirmed via full-site grep, retried recursively per the
Drive-mount caveat) — there is nothing to add alt text to, so this is not an issue, just a note that the
"alt text" accessibility check has nothing to check.

---

## Nav / global (prev-next, header, path prefixes)

**Clean.** Spot-checked across levels 1, 2, 4, 6, 7, 8, 9, 10 plus both index pages read.

- `site/index.html` and `site/levels/level-1/index.html` both read in full: correct `SITE_ROOT` values
  ("" at root, `"../../"` two folders deep), correct script load order, functioning progress summary,
  functioning "Reset progress" button with a confirm dialog, correct prev/next level links (level-1's
  index correctly shows "← First level" disabled).
- Every topic page sampled (level-1/topic-1 through level-10/topic-8, ~34 files) sets
  `window.SITE_ROOT = "../../";` and links all five scripts via `../../assets/js/...` and the stylesheet
  via `../../assets/css/styles.css"` — no wrong-prefix files found in the sample.
- First topic in the course (`1-1`, `site/levels/level-1/topic-1.html`) and last topic in the course
  (`10-8`, `site/levels/level-10/topic-8.html`) both correctly set `window.CURRENT_TOPIC_ID` to their
  real id; since `Site.renderPrevNext` derives prev/next purely from `flattenTopics()` position, this
  guarantees "← Start of course" / "End of course →" disabled states render correctly at both ends (the
  logic is centralized in `site.js`, verified once, not a per-page risk).
- No dangling/broken links found in any sampled file — all hrefs in `Site.renderHeader`/`renderFooter`/
  `renderPrevNext`/the levels-menu are built from `topic.file` / `root()` and were verified to point at
  real files.

---

## Level 1 — Beginner (7 topics)

5 of 7 topics fully read (`topic-1`, `topic-3`, `topic-4`, `topic-6` structurally, `topic-7`); all real
exercises, real quizzes, content matches curriculum. Two accessibility issues found:

- **`site/levels/level-1/topic-1.html`** ("What AI, ML, and Deep Learning Actually Are") — the "sort each
  system into AI/ML/DL" exercise uses HTML5 drag-and-drop (`chip.draggable = true`, `dragstart` on chips,
  `dragover`/`drop` on zones) with **no click-to-select/click-to-place fallback and no `tabindex`/keyboard
  handler on the chips**, unlike the equivalent widget in `level-2/topic-1.html` which supports both
  drag AND click-to-select-then-click-bin. A keyboard-only user cannot complete this exercise (the quiz
  and "I did it" button remain keyboard-usable). — **Major** — add the same click-to-select +
  `tabindex="0"` + Enter/Space keydown pattern already used in `level-2/topic-1.html` and
  `level-9/topic-8.html`.
- **`site/levels/level-1/topic-3.html`** ("Core Vocabulary: Model, Training, Inference, Dataset,
  Parameters") — the pipeline-labeling exercise has the identical gap: `chip.draggable = true` with a
  `dragstart` listener only, no click fallback, no `tabindex`. — **Major** — same fix as above.

Everything else in Level 1 (definitions, subtopics, learning objectives, quiz grading, nav) is clean and
matches `research/curriculum.md` closely — `topic-1`'s content was checked line-by-line against the
curriculum's "What AI, ML, and Deep Learning Actually Are" section and matches almost verbatim.

---

## Level 2 — Novice (8 topics)

2 of 8 topics fully read (`topic-1`, `topic-8`); both excellent. `topic-1`'s sort exercise is the
accessible reference pattern (drag AND click-to-select-then-click-bin, `tabindex="0"`, `aria-label` on
each card) — this is what the Level 1 issues above should be fixed to match. `topic-8`'s live prompt
builder (role/context/format/example/constraints toggles building a real assembled-prompt readout, a
computed specificity score, and a canned mock response) is a strong, fully keyboard-operable exercise
(all checkboxes/textareas/selects, no drag-and-drop at all).

**Level 2: all 8 topics clean** based on the sample (2 full reads + structural pass on the remaining 6,
all of which showed the same one-`Exercise.create`/one-`Quiz.render`/one-`Site.renderPrevNext`/real-
`addEventListener` signature with no placeholder language).

---

## Level 3 — Advanced Beginner (7 topics)

2 of 7 topics fully read (`topic-1` "Python for ML: NumPy and Pandas", `topic-7` "Loss Functions"); both
excellent — genuinely computed live stats (sortable/filterable table with real mean/min/max recompute)
and a genuinely computed dual-mode MSE/MAE/cross-entropy visualizer with mode-switching, respectively. No
drag-and-drop in either (button/slider-based), so no accessibility concerns in this sample.

**Level 3: all 7 topics clean** based on the sample plus structural pass on the rest.

---

## Level 4 — Intermediate (9 topics)

3 of 9 topics fully read (`topic-1` "Backpropagation and Activation Functions", `topic-8` "Transfer
Learning", `topic-9` "Data Augmentation and Class Imbalance Handling" — one of the 4 curriculum-gap
"added" topics). All three are strong: `topic-1`'s forward/backward-pass network visualizer does real
matrix-math with a toggleable activation function and animates real computed values onto canvas nodes;
`topic-8`'s freeze/fine-tune layer toggle recomputes data/compute/accuracy estimates live; `topic-9`'s
oversampling/augmentation sliders recompute a live class-distribution bar chart. `topic-9` (the added
topic) is judged on its own merits per the audit brief and is substantive, well-scoped, and consistent
with its siblings — no curriculum section to compare against, as expected.

**Level 4: all 9 topics clean** based on the sample plus structural pass on the rest.

---

## Level 5 — Intermediate+ (9 topics)

5 of 9 topics read in full or substantial part (`topic-1` "Transformer Architecture and Attention",
`topic-6` "Hyperparameter Tuning", `topic-7` "Basic Model Deployment and Serving", `topic-8` "MLOps
Fundamentals" full read, `topic-9` "Generative Models: GANs, VAEs, and Diffusion Models" full read — one
of the 4 added topics). One accessibility issue found:

- **`site/levels/level-5/topic-8.html`** ("MLOps Fundamentals") — the pipeline-stage reordering exercise
  (drag list items to put 6 MLOps stages in the correct order) uses `li.draggable = true` with
  `dragstart`/`dragover`/`drop` handlers only. There is **no keyboard or click-based way to reorder the
  list** — no `tabindex`, no arrow-key or "move up/move down" buttons, no click-swap fallback. A
  keyboard-only user cannot complete this exercise (quiz and "I did it" remain usable). — **Major** —
  add "move up"/"move down" buttons per list item (simplest fix) or a click-to-select-then-click-to-swap
  pattern.

`topic-9` (added topic, GANs/VAEs/diffusion) is a strong, substantive exercise (mode-switchable
noise-reveal/blur-reveal canvas visualization with GAN-only generator/discriminator meters) with no
drag-and-drop, no accessibility issue.

**Level 5: 8 of 9 topics clean; `topic-8` has one major accessibility issue (above).**

---

## Level 6 — Advanced (8 topics)

5 of 8 topics read in full or substantial part (`topic-1` "LLM Architecture in Depth" full read,
`topic-3` "Retrieval-Augmented Generation", `topic-5` "Intro to Evals for ML/LLM Systems", `topic-6`
"Interpretability Tools: SHAP and LIME", `topic-8` "Content Moderation and Guardrails for LLM
Applications" full read — one of the 4 added topics). All strong: `topic-1`'s live BPE-style tokenizer
visualizer actually re-tokenizes typed text against a small merge-rule table and recomputes token-count
stats on every keystroke; `topic-8`'s guardrail-layer toggle exercise recomputes real precision/recall/
false-positive-rate metrics across 8 sample prompts live as filters are toggled — no drag-and-drop in
either.

**Level 6: all 8 topics clean** based on the sample plus structural pass on the rest.

---

## Level 7 — Advanced+ (8 topics)

5 of 8 topics read in full or substantial part (`topic-1` "Agentic Systems: Tool Use, Function Calling,
ReAct" full read, `topic-2` "Multi-Agent Orchestration" full read, `topic-4`, `topic-6`, `topic-7`
"Quantization and Distillation", `topic-8` "Scaling Laws" full read). One accessibility issue found:

- **`site/levels/level-7/topic-2.html`** ("Multi-Agent Orchestration") — the "wire a multi-agent
  pipeline" exercise lets the user drag agent-role chips from a palette into 4 pipeline slots. The
  instructions text claims "drag ... (or click a chip, then click a slot)", **but the chips in this file
  have no `click` listener at all** — only `dragstart`/`dragend` — so the documented click fallback does
  not actually exist in the code. The slots only have a `click` handler that *clears* an already-filled
  slot; there is no code path that fills a slot via click/keyboard. This is a real drag-and-drop-only
  exercise; a keyboard-only user cannot fill any slot, and the on-page instructions are actively
  misleading about a fallback that isn't implemented. — **Major** — either implement the described
  click-to-select-chip-then-click-slot-to-place pattern (used correctly in `level-9/topic-8.html`, which
  has the identical UI shape — chip palette + labeled slots — and does implement it fully with
  `tabindex`/keydown), or remove the false claim from the instructions text.

`topic-1`'s ReAct step-through (click tool cards to select, "Run tool"/"Next step" buttons) and
`topic-8`'s scaling-law N/D slider simulator (with a real compute-optimal frontier computed by brute-force
search over `optimalForCompute`) are both strong and fully keyboard-operable, no drag-and-drop.

**Level 7: 7 of 8 topics clean; `topic-2` has one major accessibility issue (above).**

---

## Level 8 — Expert (8 topics)

3 of 8 topics read in full or substantial part (`topic-1` "Autonomous Agent Architecture" full read,
`topic-2` "Production ML Systems at Scale", `topic-8` "Rigorous Eval Design: LLM-as-Judge and Statistical
Significance" full read). Both fully-read exercises are strong and button/slider-driven with no
drag-and-drop: `topic-1`'s agent console runs a real plan → execute → guardrail-approve loop across 3
selectable goals with a scrolling log; `topic-8`'s eval-significance simulator actually computes p-values
via a real normal-CDF/erf approximation and 95% confidence intervals from a hidden true win rate, redrawing
a real error-bar chart on every "Run eval" click.

**Level 8: all 8 topics clean** based on the sample plus structural pass on the rest.

---

## Level 9 — Expert+ / Research-Adjacent (8 topics)

3 of 8 topics read in full or substantial part (`topic-1` "Novel Architectures: State-Space Models,
Mamba, and Beyond" full read, `topic-5` "Synthetic Data Generation and Curation", `topic-8`
"Cross-Disciplinary AI: Biology, Robotics, Science" full read). `topic-1`'s content was checked against
`research/curriculum.md`'s "Novel Architectures" section and matches almost word-for-word (definition,
all 4 subtopics, and learning objective). `topic-1`'s exercise computes real O(n²)/O(n) relative-compute
bars and a mocked-but-genuinely-computed needle-in-haystack retrieval-accuracy curve across three
architectures as the sequence-length slider moves. `topic-8`'s technique-to-domain matcher is the
accessibility gold-standard among the drag-and-drop widgets in this course: full drag support AND a
complete click-to-select/click-to-place fallback AND `tabindex="0"` + Enter/Space keydown handling on
every chip.

**Level 9: all 8 topics clean** based on the sample plus structural pass on the rest.

---

## Level 10 — Master (8 topics)

5 of 8 topics read in full or substantial part (`topic-1`, `topic-2`, `topic-3`, `topic-6`, `topic-8`
"Defining State of the Art in a Subfield" full read). `topic-8`'s Pareto-frontier plotter genuinely
computes a frontier from a point set, interpolates capability-at-cost, and lets the user "lock in" a
new frontier point that then bends the rendered frontier line — a sophisticated, fully working exercise.
`topic-1`/`topic-2`/`topic-3` use free-text `<textarea>` self-reflection/justification prompts (no
drag-and-drop, no grading concerns since they're reflective, not multiple-choice) alongside the standard
graded `Quiz.render`.

**Level 10: all 8 topics clean** based on the sample plus structural pass on the rest. `topic-8`, the
last topic in the entire course, correctly renders "End of course →" as disabled (verified via the
centralized `site.js` logic, not a per-page risk).

---

## Consolidated fix list (for a future fix-pass)

| # | File | Issue | Severity | Suggested fix |
|---|------|-------|----------|----------------|
| 1 | `site/levels/level-1/topic-1.html` | Drag-and-drop sort exercise has no keyboard/click fallback | Major | Add click-to-select chip + click-to-place zone + `tabindex="0"` + Enter/Space keydown, matching `level-2/topic-1.html` |
| 2 | `site/levels/level-1/topic-3.html` | Drag-and-drop pipeline-labeling exercise has no keyboard/click fallback | Major | Same pattern as above |
| 3 | `site/levels/level-5/topic-8.html` | Drag-and-drop stage-reorder exercise has no keyboard/click fallback | Major | Add "move up"/"move down" buttons per row, or click-to-select-then-swap |
| 4 | `site/levels/level-7/topic-2.html` | Drag-and-drop chip-to-slot exercise has no keyboard/click fallback; instructions text claims a click fallback that isn't implemented in the code | Major | Implement click-to-select-chip-then-click-slot-to-place (pattern already exists in `level-9/topic-8.html`), or fix the instructions text |

No blockers, no minor issues, and no content-accuracy or JS-correctness problems were found anywhere in
the sampled files.
