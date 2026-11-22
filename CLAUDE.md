# AI Maturity Course — Project Guide

This project builds an interactive, multi-page website that teaches evals, tracing/observability, and autonomous agent systems, beginner to expert. It's built via a multi-agent pipeline (Opus research -> Sonnet build -> Sonnet QA -> Cloudflare deploy), spanning multiple sessions/usage windows.

**Start here every session:**
1. Read `STATUS.md` — find the first task not marked done. That's the next thing to do.
2. Read `PLAN.md` — find that task's phase for the exact agent role/prompt spec.
3. Spawn the agent per `PLAN.md` (model, subagent_type, isolation as specified).
4. When the agent finishes, update `STATUS.md` immediately — don't batch updates to the end of the session.

Do not re-derive the plan from scratch or re-ask the user the scoping questions below — they're already decided.

## Folder structure
- `PLAN.md` — full plan: phases, agent roles, exact prompt specs, deliverable formats
- `STATUS.md` — live progress tracker, source of truth for "where did we leave off"
- `research/topics-seed.md` — the 10-level (beginner->master) AI topic list the whole syllabus is built from
- `research/syllabus/level-*.md` — 5 files, one per agent, detailed syllabus per level pair
- `research/curriculum.md` — merged version of the 5 syllabus files (created once all 5 land)
- `site/` — site source (Sonnet builder output), deploy-ready
- `deployment-notes.md` — created once deployed (Cloudflare URL, wrangler config, redeploy command)

## Key decisions (locked in — don't re-litigate with the user)
- **Scope (revised 2026-07-13):** covers all of AI across 10 levels (beginner->master), not just the original evals/tracing/autonomous-only scope. Those topics are folded into levels 6-9. See `research/topics-seed.md`.
- **Site format:** full static multi-page site (not a single-file artifact)
- **Interactivity:** both conceptual (diagrams/quizzes) AND simulated hands-on exercises, implemented in pure JS/HTML so no backend is needed
- **Curriculum stance:** concepts-first, tool-agnostic. Name specific tools (LangSmith, Langfuse, OpenTelemetry, promptfoo, DeepEval, LangGraph/CrewAI/AutoGen, etc.) only as illustrative examples, never as the organizing structure
- **Deployment target:** Cloudflare (Workers/Pages). Caveat: available Cloudflare MCP tools are management/read tools (D1, KV, R2, Workers list/get) — no confirmed one-shot "deploy static site" tool. Plan is to attempt `wrangler deploy` via the bash sandbox; if that needs credentials not present, hand the user deploy-ready files + the exact command.
- **QA loop:** bugs found in QA trigger an automatic fix pass routed back to the relevant builder agent — QA does not just report and stop.

## Agent roster (see PLAN.md for full prompts) — revised 2026-07-13
1. **Syllabus Agents 1-5** (Sonnet, parallel, research-only) — **done**. Each owned 2 levels, produced `research/syllabus/level-X-Y.md`, merged into `research/curriculum.md`.
2. **Opus Build Coordinator** (Opus, single agent) — owns Phase 2 (build) and Phase 3 (QA + fix passes) end to end. Does NOT write site code itself — designs the detailed sub-agent prompts, spawns and quality-gates the Sonnet builders/QA below, routes fixes, and keeps STATUS.md current after every milestone (not just at the end, in case its own run gets cut off). Reports back to the orchestrator (top-level session) when Phase 2+3 are done; does not do Phase 4 deployment.
3. **Scaffold Builder** (Sonnet, spawned by the Coordinator) — shared design system: nav, localStorage progress tracker, reusable quiz component, reusable interactive-exercise component shell. Coordinator spot-checks its output before greenlighting content builders.
4. **Content Builders** (Sonnet, spawned by the Coordinator, count flexible) — fill in lesson content + build REAL functioning interactive exercises per topic. Default split mirrors the syllabus: one builder per level-pair (1-2, 3-4, 5-6, 7-8, 9-10) = 5 builders, but the Coordinator may split further (e.g. one per single level = 10 builders) if that produces better-quality interactivity — use judgment, document the choice in STATUS.md.
5. **QA Agent** (Sonnet, spawned by the Coordinator, fresh context) — functional + content-accuracy audit. Must explicitly verify every exercise is a real, clickable/interactive widget (not static text describing what it would do). Produces a punch list.
6. Fix pass(es) — Coordinator routes bugs back to whichever builder owns the broken piece, preferably via `SendMessage` to continue that same agent rather than spawning fresh ones.
7. **Deployment** — orchestrator (top-level session, not a subagent) runs this directly, after Coordinator reports Phase 2+3 complete.

## Hard requirement: genuine interactivity (user emphasized this twice, 2026-07-13)
Every one of the 80 topics in `research/curriculum.md` has a spec'd hands-on exercise. These must be built as **actually functioning** browser widgets (sliders, canvas drawing, drag-and-drop, live-updating charts/tables, clickable simulations) using vanilla JS/HTML/CSS — not placeholder text, not "imagine this would..." descriptions, not disabled/mocked UI that doesn't respond to input. This is the single most important quality bar for this project. Both the Coordinator and QA agent must actively verify this, not just trust builder self-reports.

## Known environment limitation
The bash/shell sandbox cannot mount `G:\My Drive\Learning\AI` — all file work on this project must use Read/Write/Edit/Glob/Grep, never bash/shell commands, when touching anything under this path.
