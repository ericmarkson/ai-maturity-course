# Full Plan — AI Maturity Course

Goal: Eric is already proficient with hands-on AI agent looping. This site teaches the "mature" layer he's missing — evals, tracing/observability, and building genuinely autonomous systems — via a visual, hands-on, beginner-to-expert website.

Scoping decisions were confirmed with the user on 2026-07-13 (see CLAUDE.md "Key decisions"). Do not re-ask these.

---

## Phase 1 — Syllabus (5 Sonnet agents, parallel) — REVISED 2026-07-13

Superseded the original single-Opus-research-agent, 3-track (evals/tracing/autonomous-only) approach. The user instead generated a full **10-level, beginner-to-master AI topic list** covering all of AI (evals/tracing/autonomous systems are folded into levels 6-9 naturally). That seed list lives in `research/topics-seed.md` — read it before touching this phase.

**Spawn spec:** 5x `Agent` tool calls in parallel (single message, 5 tool-use blocks), `subagent_type: "general-purpose"`, `model: "sonnet"`. Each agent owns exactly 2 levels and writes exactly one output file — no shared files, so they can run fully in parallel with no merge conflicts.

| Agent | Levels | Output file |
|---|---|---|
| Syllabus Agent 1 | 1-2 | `research/syllabus/level-1-2.md` |
| Syllabus Agent 2 | 3-4 | `research/syllabus/level-3-4.md` |
| Syllabus Agent 3 | 5-6 | `research/syllabus/level-5-6.md` |
| Syllabus Agent 4 | 7-8 | `research/syllabus/level-7-8.md` |
| Syllabus Agent 5 | 9-10 | `research/syllabus/level-9-10.md` |

**Prompt template (fill in LEVELS and the matching block from topics-seed.md):**

> You're contributing to a multi-session project building an interactive website teaching AI from beginner (level 1) to master (level 10). Project root: `G:\My Drive\Learning\AI\ai-maturity-course\`. Read `CLAUDE.md` and `PLAN.md` there first for full context — don't skip this, other agents are working on adjacent parts of this same project.
>
> Your job: produce a detailed syllabus for **levels [X] and [Y] only**. The seed topics for those levels (from `research/topics-seed.md`) are: [paste the level block(s)].
>
> For each topic, expand into: a one-line plain-language definition, 2-4 subtopics/concepts within it, a specific learning objective, and one idea for a hands-on exercise that could be simulated entirely in browser JS/HTML with no backend (spec the idea in 1-2 sentences only — do not build it now, a later build phase does that).
>
> Write the result to `G:\My Drive\Learning\AI\ai-maturity-course\research\syllabus\level-[X]-[Y].md` as markdown, structured by level then topic. Use web search to verify terminology/practices are current as of 2026, especially for higher levels where the field moves fast.
>
> Do not modify CLAUDE.md, PLAN.md, STATUS.md, topics-seed.md, or any other agent's syllabus file — only write your own output file.

**On completion:** orchestrator merges the 5 files into a single `research/curriculum.md` (or the scaffold/content builders can read all 5 directly — decide at merge time based on file sizes). Update STATUS.md.

`exercise-specs.md` as a separate deliverable is dropped — exercise ideas are now inline in each syllabus file per-topic instead of a separate document.

---

## Phase 2+3 — Build & QA (Opus Build Coordinator) — REVISED 2026-07-13

The user explicitly restructured the agent hierarchy: **Opus coordinator, Sonnet researcher (done), Sonnet builders, Sonnet QA.** One Opus agent now owns everything from "scaffold doesn't exist yet" through "QA-clean site ready to deploy." It does not write site code itself — it designs prompts, spawns Sonnet sub-agents, quality-gates their output, routes fixes, and keeps STATUS.md current throughout (critical: if the Coordinator's own run gets cut off partway, STATUS.md must already reflect true progress).

**Spawn spec:** ONE `Agent` call, `subagent_type: "general-purpose"`, `model: "opus"`, no isolation (needs to write to the shared workspace folder directly — note `G:\My Drive\Learning\AI` is not reachable from bash, only via Read/Write/Edit/Glob/Grep).

**Coordinator responsibilities, in order:**

1. Read `CLAUDE.md`, `PLAN.md`, `STATUS.md`, `research/curriculum.md` for full context.
2. Design the exact scaffold-builder prompt (nav for all 10 levels, localStorage progress tracker, reusable quiz component, reusable interactive-exercise component shell) and spawn one Sonnet agent for it. Hard requirement to bake into every prompt: exercises must be REAL functioning widgets (sliders/canvas/drag-drop/live charts that actually respond to input), never static placeholder text — this is the top priority quality bar, stated twice by the user.
3. Spot-check the scaffold output personally (read `site/COMPONENTS.md` and at least one generated file) before greenlighting content builders. Do not just trust the builder's self-report.
4. Design content-builder prompts and spawn them (parallel where possible). Default split: 5 builders mirroring the syllabus level-pairs (1-2, 3-4, 5-6, 7-8, 9-10). May split further (e.g., 10 builders, one per level) if that yields better interactivity quality — Coordinator's judgment call, document it in STATUS.md.
5. Spot-check content-builder output the same way before QA.
6. Spawn a Sonnet QA agent with fresh context (site dir + curriculum.md, not the builders' reasoning). QA must explicitly click-test/verify every exercise actually functions, not just visually exists. Deliverable: a punch list.
7. Route punch-list items back to the owning builder — prefer `SendMessage` to continue that same agent (it already has context) over spawning a fresh one. Re-verify fixes.
8. Update `STATUS.md` after every milestone in this list (not just at the end), and update `PLAN.md` if the builder split or architecture changes from what's written here.
9. Report back to the top-level session when Phase 2+3 are fully done. Do NOT attempt Phase 4 (deployment) — that stays with the orchestrator.

---

## Phase 4 — Deployment

Done directly by the orchestrator, not a subagent (small, credential-sensitive step).

1. Check for `wrangler` in the bash sandbox and whether a Cloudflare API token is available.
2. If available: `wrangler deploy` (or Pages equivalent) the `site/` directory, capture the live URL.
3. If not available: package `site/` as deploy-ready (wrangler.toml included), tell the user the exact one-line command to run themselves, and still copy the source to the workspace folder.
4. Write `deployment-notes.md` with the URL (or the manual command), and the redeploy command for future updates.
5. Copy final `site/` source into the workspace folder's `ai-maturity-course/site/` if not already there (should already be, since builders write directly there).
