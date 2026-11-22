# Status

Last updated: 2026-07-14

## Progress

| # | Phase | Status | Notes |
|---|-------|--------|-------|
| 1a-1e | Syllabus Agents 1-5 (Sonnet) | **Done** | All 5 wrote `research/syllabus/level-*.md`, each grounded with 2026 web search. |
| — | Merge into curriculum.md | **Done** | `research/curriculum.md` written — 80 topics across 10 levels, TOC + all 5 files concatenated. |
| 2a | Scaffold Builder (Sonnet) | **Done — verified** | Shared scaffold built + personally spot-checked by Coordinator (read 8 files inc. all JS logic). All components genuinely function. See "Scaffold verification" below. |
| 2b-2k | Content Builders (Sonnet x10) | **DONE — Phase 2 fully complete** | All 80 topic files across all 10 levels exist on disk and are spot-verified genuinely interactive. Split was 10 builders (one per level). See "Resume session (2026-07-14, 3rd Opus coordinator)" for final verification. |
| 3 | QA pass (Sonnet) | **DONE** | Fresh-context Sonnet QA agent audited all 80 topics via code reading. Punch list: `research/qa-punchlist.md`. 0 blockers, 4 major (all same class: drag-and-drop exercises with no keyboard/click fallback), 0 minor. See "QA pass (Phase 3)" below. |
| 3b | Fix pass | **DONE** | All 4 major QA items fixed (keyboard/click-to-place fallback added to L1 t1, L1 t3, L5 t8, L7 t2). Done directly by the top-level orchestrator via one Sonnet fix agent. See "Fix pass (Phase 3b)" below. |
| 3c | Hands-on LIVE BROWSER QA (5 Sonnet agents) | **DONE** | User explicitly requested real browser testing (not just code reading) before deploy. Served `site/` via `python -m http.server 8000` (user-run; Chrome extension can't touch file:// URLs). 5 agents, one per level-pair, each in its own tab, actually clicked/dragged/typed through every one of the 80 topics + quizzes. Result: 78/80 clean, 2 real FAILs + 5 minor accuracy issues found. See "Hands-on live browser QA (Phase 3c)" below. |
| 3d | Fix pass for hands-on QA findings | **DONE** | All 7 issues (2 FAILs + 5 minor) fixed by 2 parallel Sonnet agents. See "Fix pass (Phase 3d)" below. |
| 4 | Deploy to Cloudflare | **NEXT** | Orchestrator's job, not a subagent's. Not yet started. Site has now been verified twice (code-level QA + live hands-on QA) and both fix passes are complete. |

## Scaffold verification (2a) — 2026-07-13
Coordinator read and confirmed genuinely functional (not just trusting builder self-report):
- `site/assets/js/course-data.js` — `window.COURSE`, all 80 topics in order with canonical `levels/level-{L}/topic-{T}.html` paths.
- `site/assets/js/progress.js` — real localStorage tracker (`aimc:progress:v1`), onChange events, level/overall counts.
- `site/assets/js/quiz.js` — config-driven, genuinely grades (radio/checkbox, per-question explanations, score, retry, optional auto-mark-complete).
- `site/assets/js/exercise.js` — reusable shell + reset contract for dropping in real widgets.
- `site/assets/js/site.js` — nav/header/footer/prev-next rendered from COURSE, accessible (aria-current, progressbar roles), completion checks.
- `site/example-topic.html` — gold-standard reference page with a REAL working slider+canvas widget and a real graded quiz.
- `site/levels/level-1/index.html` — real level index (renders topic list + progress from COURSE).
- `site/COMPONENTS.md` — thorough content-builder manual (copy-pasteable skeleton, path-prefix warnings, component APIs, restated interactivity bar).
- Home page + all 10 level index pages present (19 files total).

### Deviation 1 — 80 topics but curriculum.md body only spec'd 76
The scaffold builder discovered (and the Coordinator independently re-counted and confirmed) that curriculum.md's TOC promises 80 topics but its written body only contains 76 `###` sections: L1 has 6 (not 7), L4 has 8 (not 9), L5 has 8 (not 9), L6 has 7 (not 8). To honor the authoritative 80-topic bar the user emphasized, 4 bridging topics were added to course-data.js (flagged `added: true`), filling genuine gaps:
- `1-7` A Brief History of AI
- `4-9` Data Augmentation and Class Imbalance Handling
- `5-9` Generative Models: GANs, VAEs, and Diffusion Models
- `6-8` Content Moderation and Guardrails for LLM Applications
These 4 have no curriculum.md section; their owning builders (L1, L4, L5, L6) were told to author original lesson content + a real exercise at the same bar.

### Deviation 2 — builder split changed from 5 to 10
PLAN default was 5 builders (level-pairs, ~16 topics each). Coordinator changed to **10 builders, one per single level (~8 topics each)**. Reasoning: the #1 quality bar is that every one of ~80 hands-on exercises be a REAL functioning widget. ~16 bespoke widgets per agent risks quality decay / corner-cutting on later topics as a single agent's context fills. Halving each agent's scope to ~8 topics materially improves the odds every widget is genuinely interactive. Builders write to disjoint `levels/level-N/` folders, so 10-way parallelism has no file collisions.

## Resume session (2026-07-13, 2nd Opus coordinator)
The 1st coordinator was cut off mid-build. A fresh Opus coordinator resumed. Verified the 37 pre-existing topic files are genuinely complete (full-read L1/topic-5 + L7/topic-1 exercise cores = real widgets; all 37 contain both `addEventListener` and the skeleton's final `renderPrevNext` call = not truncated). No broken files found. Now filling the 43 missing topics, one Sonnet builder per level, batched small (parallel-5 caused an API stall + cascade interrupts; using batches of ~3).

Per-level content-build completion (existing topics were already done by 1st coordinator's builders unless noted):
- Level 1: **7/7 DONE** — topic-6 (bias/fairness threshold sim), topic-7 (clickable AI-history timeline) built + spot-verified real this session
- Level 2: **8/8 DONE** — topic-8 built + verified real (interactive prompt builder) this session
- Level 3: **7/7 DONE** — topic-6 (gradient-descent canvas ball roll), topic-7 (MSE/MAE/cross-entropy live loss chart) built + spot-verified real this session
- Level 4: **9/9 DONE** — topic-4..9 built (tokenizer+embedding scatter, confusion-matrix/ROC, ridge-regression overfit demo, training-loop assembler, transfer-learning freeze sim, imbalance/augmentation bar chart); topic-5 spot-verified real this session
- Level 5: **9/9 DONE** — topic-5..9 built (Q-learning grid-world, hyperparam search landscape, /predict API playground, drag-drop MLOps pipeline, GAN/VAE/diffusion canvas); all 5 have real listeners, spot-verified this session
- Level 6: **8/8 DONE** — topic-5..8 built (eval-builder pass-rate, SHAP feature-attribution sliders, distributed-training SVG sim, guardrail routing playground); all 4 have real listeners
- Level 7: **8/8 DONE** — topic-2..8 built (multi-agent drag-drop, memory overflow sim, advanced-RAG pipeline, trace waterfall, RLHF preference game, quantization sliders, scaling-laws log-log canvas); topic-8 spot-verified real this session
- Level 8: **8/8 DONE** (topic-3..8 confirmed present + real this session — see 2026-07-14 note; STATUS was stale)
- Level 9: **8/8 DONE** (topic-4..8 confirmed present + real this session — see 2026-07-14 note; STATUS was stale)
- Level 10: **8/8 DONE** (topic-4..8 confirmed present + real this session — see 2026-07-14 note; STATUS was stale)

## Resume session (2026-07-14, 3rd Opus coordinator) — PHASE 2 CONFIRMED COMPLETE
The 2nd coordinator was cut off before updating STATUS.md. A fresh Opus coordinator resumed and found the on-disk state was **further along than STATUS.md claimed**: all 16 topics that STATUS listed as "REBUILD PENDING" (L8 topic-3..8, L9 topic-4..8, L10 topic-4..8) already existed on disk — the 2nd coordinator (or its builders) had finished them but the run was cut off before the STATUS write. (Note: an initial per-directory Glob returned "No files found" transiently — a Google Drive sync hiccup; a recursive Glob immediately found all 88 files. Don't trust a single empty Glob on this G: drive path — retry.)

**No new agents were spawned this session** — the work was already done; the job became verification + checkpointing rather than building.

Verification performed on the 16 previously-"missing" files:
- Structural greps across ALL 24 files in levels 8/9/10: every file has exactly 1 `Exercise.create` + 1 `Quiz.render`, at least 1 `addEventListener`, and exactly 1 `Site.renderPrevNext` (proves none are truncated — all reach the final scaffold call). No placeholder/fake-widget language ("would show", "imagine this", "coming soon", "not yet implemented") anywhere. Real `textarea.placeholder` attributes present where reflective-worksheet exercises are used.
- Deep full-read spot-checks (one+ per level), reading the actual exercise JS:
  - L8 topic-6 (Multi-Modal Models) — clickable canvas embedding-space inspector; buttons drive distance computation + canvas redraw. REAL.
  - L8 topic-3 (Model Safety / Red-Teaming) — attack/defense checkbox matrix + "Launch attack" button + live attack-success-rate readout. REAL.
  - L9 topic-6 (Reward Model Design) — 3 weight sliders drive a live canvas bar chart showing proxy-vs-true-quality divergence (reward hacking). REAL.
  - L10 topic-6 (Advising Policy/Governance) — 4 governance-lever sliders drive 3 live meters + dynamic tension readout. REAL.
- Note: the "1 addEventListener" grep count on some files is misleading — the listener is attached inside a `forEach` loop across many buttons/sliders, so it's genuinely multi-element interactivity, not a single dead control.

Conclusion: **all 80 topics across all 10 levels exist and are genuinely interactive.** Levels 1-7 were verified by prior coordinators; levels 8-10 verified this session. **Phase 2 (content build) is fully complete.** Phase 3 (QA) is the next step and is a separate follow-up — NOT started this session (per scope, the coordinator does not spawn QA itself here; it is flagged as the next action).

## QA pass (Phase 3) — 2026-07-14 (4th Opus coordinator)
Spawned ONE fresh-context Sonnet QA agent (general-purpose) with only the `site/` dir, `site/COMPONENTS.md`, and `research/curriculum.md` (NOT the builders' reasoning) so it verified independently. Deliverable written to **`research/qa-punchlist.md`**.

**Result: unusually clean. 0 blockers / 4 major / 0 minor.**
- All 80 topic pages passed structural checks (exactly one `Exercise.create` + one `Quiz.render` + one `Site.renderPrevNext`, real `addEventListener`, no placeholder language, no `<img>` so no alt-text gap, correct `../../` path prefixes). 34 of 80 topic files were fully read end-to-end (every level covered, first + last topic, all 4 curriculum-gap "added" topics); shared scaffold (course-data/progress/quiz/exercise/site.js + styles.css) read in full and matches `COMPONENTS.md` contract exactly.
- **The 4 major issues are all one class:** drag-and-drop exercises implemented with HTML5 dragstart/drop only, no keyboard or click-to-place fallback (keyboard-only users can't complete the exercise; quiz + completion tracking still work). Affected files:
  - `site/levels/level-1/topic-1.html` (AI/ML/DL sorter)
  - `site/levels/level-1/topic-3.html` (pipeline labeling)
  - `site/levels/level-5/topic-8.html` (MLOps stage reorder)
  - `site/levels/level-7/topic-2.html` (multi-agent pipeline builder)
- **Levels affected: 1 (2 topics), 5 (1), 7 (1).** Levels 2, 3, 4, 6, 8, 9, 10 + shared scaffold + nav are all explicitly marked clean in the punch list — a fix pass should NOT touch them.
- Reference pattern for the fix already exists in-repo: `site/levels/level-2/topic-1.html` and `site/levels/level-9/topic-8.html` implement the same widget correctly (drag AND click-to-select + `tabindex` + Enter/Space keydown).

**Coordinator sanity-check of the punch list (did not trust it blindly):** independently verified 3 claims against the actual files — L1/topic-1 confirmed drag-only, L9/topic-8 confirmed fully keyboard-accessible (the cited clean reference), L7/topic-2 confirmed chips are drag-only (dragstart only, no click/keydown/tabindex). One minor imprecision noted: the punch list says L7/topic-2's on-page instructions "falsely claim a click fallback that isn't implemented" — actually the instructions only promise "click a filled slot to clear it," which IS implemented; they never promise click-to-place. The core issue (no keyboard path to PLACE chips) and its Major severity are still valid. Does not change the fix needed.

**Phase 3b (fix pass) is the next step and was deliberately NOT done in this session** (scope was QA-only; prior coordinators hit session limits from over-scoping). A separate coordinator invocation should route the 4 major items back to the owning builders (levels 1, 5, 7) — prefer `SendMessage` to continue those builders — and re-verify. Then Phase 4 (deploy) stays with the top-level orchestrator.

## Fix pass (Phase 3b) — 2026-07-14
Handled directly by the top-level orchestrator (not an Opus coordinator invocation) — the fix was narrow, mechanical, and well-specified by QA, so a single Sonnet agent was sufficient. Spawned one Sonnet agent scoped to exactly the 4 files QA flagged, told to match the existing accessible pattern in `level-2/topic-1.html` and `level-9/topic-8.html` rather than invent a new one.

All 4 fixed and verified (mouse drag behavior confirmed untouched, new keyboard/click paths confirmed to be real event listeners mutating the same state, `Site.renderPrevNext` scaffold call confirmed intact in all 4):
- `level-1/topic-1.html` — chips get tabindex/role/aria-label/click-to-select + keydown; drop zones get click-to-place + keydown.
- `level-1/topic-3.html` — same pattern for vocabulary-term-onto-pipeline-box sorting.
- `level-5/topic-8.html` — reorder-list exercise (not bin-sort), so pattern adapted: click-to-pick-up + click-to-move-to-position, reusing the existing `order.splice` logic; focus restored after each keyboard action since the list re-renders via `innerHTML`.
- `level-7/topic-2.html` — role chips get click-to-pick-up (reusable, doesn't remove from palette, matching drag semantics); slots refactored into shared `fillSlot()`/`clearSlot()` helpers used by both drag and keyboard paths so behavior can't drift between the two.

QA's 0-blocker/4-major/0-minor result means no other files needed touching. Phase 3 (QA) + Phase 3b (fix) are both now fully complete.

## Hands-on live browser QA (Phase 3c) — 2026-07-14
User explicitly asked for a "team of sonnet agents" to verify the site "hands on, visual, and accurate" — a live browser pass, not the code-reading QA already done in Phase 3. Blocked initially: the Claude in Chrome extension refuses to touch local `file://` pages, and neither Terminal nor a driven Chrome window can be used from computer-use (terminals are click-only, browsers are view-only for computer-use). Resolved by having the user run `python -m http.server 8000` from `site/` themselves; Chrome was then pointed at `http://localhost:8000`.

5 Sonnet agents, same level-pair split as the syllabus phase (1-2, 3-4, 5-6, 7-8, 9-10), each given its own browser tab via `tabs_create_mcp` (parallel-safe since every Claude-in-Chrome tool call takes an explicit `tabId`). Each agent actually navigated to every one of its topic pages, drove sliders/canvases/drag-and-drop/text inputs with real clicks and `javascript_tool`-dispatched events, screenshotted before/after to visually confirm state changes, answered and graded quizzes, cross-checked live page text against `research/curriculum.md`, and checked nav links. Reports: `research/hands-on-qa/level-*-report.md`.

**Session-limit lesson repeated:** the first 5-way-parallel launch hit the account session limit before any agent had written its report file (all work lost — reports were only meant to be written at the end). Restarted in 2 waves (3 agents, then 2) with an explicit instruction to APPEND to the report file after every single topic, not batch at the end — this held up: a second cutoff on the levels 7-8 agent left 10 of 16 topics safely checkpointed on disk, and a small follow-up agent finished only the missing 6.

**Result: 78/80 topics fully clean. 2 real FAILs + 5 minor-but-real issues found** (all fixed in Phase 3d, see below):
- Level 1-2 (15/15 PASS) — 0 bugs. 1 non-blocking note: curriculum.md's Level 1 section body only documents 6 topics but the site correctly has 7 (topic-7 is the known "added" bridging topic).
- Level 3-4 (14/16 PASS, 2 FAIL) — **FAIL: L4 topic-2 (CNNs)**, feature-map visualization rendered certain cells (including the boundary column — exactly the teaching point) completely blank. **FAIL: L4 topic-8 (Transfer Learning)**, the live "accuracy" heuristic increased monotonically even when unfreezing early layers, contradicting the lesson and the page's own quiz.
- Level 5-6 (17/17 PASS) — 1 confirmed bug: **L6 topic-1** quiz claimed "cat" stays a single BPE token but the page's own tokenizer widget splits it into 2. 1 minor content note: **L5 topic-2**'s fill-in-the-blank candidate word list was a fixed 4 words regardless of typed sentence, producing nonsensical predictions off the two suggested examples.
- Level 7-8 (16/16 PASS) — 0 bugs. Explicitly re-verified the Phase 3d/3b drag-and-drop keyboard fallback on L7 topic-2 — both mouse drag and keyboard-accessible pick-up/place confirmed working.
- Level 9-10 (16/16 PASS) — 3 minor bugs: **L9 topic-1**, the three architecture compute bars were each normalized to their own max so they always converged to 100% together, visually hiding that SSMs are supposed to look cheaper at long context. **L9 topic-3**, the "weak judge" debate exercise had the true argument in slot A in all 6 hardcoded rounds, so always picking A scored 6/6 without evaluating any content — defeating the exercise's purpose. **L10 topic-4**, the benchmark-design "weakness flags" list only recolored (red→green) rather than actually changing which flags applied to the learner's configuration.

## Fix pass (Phase 3d) — 2026-07-14
2 parallel Sonnet agents (not an Opus coordinator — well-specified, mechanical-enough fixes). Agent A: L4 CNN blank-cell rendering (was a signed-value color scale producing literal white-on-white for certain values; switched to magnitude-based scale clamped away from pure white/black), L4 Transfer Learning heuristic (was `+0.05*n - 0.04*earlyUnfrozen` which always nets positive; replaced with separate late/early layer terms so early-layer unfreezing now genuinely penalizes accuracy), L6 tokenizer/quiz mismatch (changed the quiz's example word from "cat" to "the", hand-verified "the" resolves to 1 token under the existing merge-rule table), L5 fill-in-the-blank candidate list (added 6 new candidate words with real contextual neighbor matches, verified the QA report's own example sentence now scores sensibly). Agent B: L9 compute-bar normalization (now shared-scale against Transformer's cost at the current sequence length, so SSM's bar correctly shrinks toward the floor at long context), L9 debate exercise (swapped which slot holds the true argument for 3 of 6 rounds so position no longer signals the answer), L10 weakness flags (rewired each flag to a real `check(cfg)` predicate tied to a specific configuration control instead of a static list that only recolored). All files re-read post-edit to confirm the scaffold (`Site.renderPrevNext`) and quiz blocks were untouched.

## Confirmed decisions (do not re-ask)
- Scope: full 10-level (beginner->master) AI topics — 80 topics total. See `research/topics-seed.md` and `research/curriculum.md`.
- Full static multi-page site
- Both conceptual + simulated hands-on exercises (every one of the 80 topics already has an exercise idea spec'd in curriculum.md)
- Concepts-first, tool-agnostic curriculum
- Deploy live via Cloudflare
- QA bugs trigger automatic fix passes
- Content-builder split mirrors the syllabus split: 5 builders, one per level-pair

## Next action
**Phase 4 — Deploy to Cloudflare.** Phases 1 through 3d are all complete: 80/80 topics built, verified interactive via code-level QA AND live hands-on browser QA, and every issue found by either pass (4 accessibility majors + 2 FAILs + 5 minor accuracy issues = 11 total) has been fixed. No known outstanding issues. This is the top-level orchestrator's job per PLAN.md (credential-sensitive, not delegated to a subagent). Check for `wrangler` + a Cloudflare API token in the bash sandbox; if available, deploy the `site/` directory and capture the live URL; if not, package deploy-ready files (wrangler.toml) and give the user the exact one-line command to run themselves. Write `deployment-notes.md` when done. Note: the user has a local server running at `http://localhost:8000` (`python -m http.server 8000` from `site/`) for hands-on testing — that's separate from and doesn't need to stay running for the Cloudflare deploy.

## Session log
- 2026-07-13: Plan agreed with user via clarifying questions. Task list created. CLAUDE.md / PLAN.md / STATUS.md written. No agents spawned yet.
- 2026-07-13: User generated a 10-level (beginner->master) full-AI topic list and asked to use it as the syllabus basis instead of the original narrower 3-track scope. PLAN.md/CLAUDE.md revised. Saved `research/topics-seed.md`.
- 2026-07-13: Spawned 5 parallel Sonnet syllabus agents (one per 2 levels). All 5 completed successfully, each doing its own web research for currency. Output: `research/syllabus/level-1-2.md` through `level-9-10.md`. Merged into `research/curriculum.md` (80 topics, all with definitions/subtopics/learning objectives/exercise specs). Decided content-builder split will mirror the same 5 level-pairs.
- 2026-07-14: 3rd Opus coordinator resumed after 2nd was cut off. Found all 80 topic files already on disk (2nd coordinator finished L8-10 but was cut off before the STATUS write). Verified the 16 previously-"missing" files (L8 t3-8, L9 t4-8, L10 t4-8) are genuinely complete + interactive via structural greps across all 24 L8/9/10 files + deep full-reads of L8-6, L8-3, L9-6, L10-6. No agents spawned (nothing left to build). **Phase 2 marked fully complete.** Phase 3 (QA) flagged as next follow-up.
- 2026-07-14: 4th Opus coordinator ran the Phase 3 QA pass (scope: QA only, no fixes). Spawned ONE fresh-context Sonnet QA agent; it wrote `research/qa-punchlist.md`. Result: 0 blockers / 4 major / 0 minor — 4 drag-and-drop exercises (L1 t1, L1 t3, L5 t8, L7 t2) lack a keyboard/click fallback; everything else clean. Coordinator independently sanity-checked 3 of the report's claims against the real files (all held up; one minor imprecision in the L7/topic-2 justification noted, doesn't change the fix). STATUS updated; **Phase 3b (fix pass) deliberately left for a separate coordinator invocation.**
- 2026-07-14: Top-level orchestrator handled the fix pass directly (one Sonnet agent, no Opus coordinator — scope was small/mechanical/well-specified). All 4 QA-flagged files fixed and verified. **Phases 1 through 3b are now fully complete.** Phase 4 (Cloudflare deployment) is next.
