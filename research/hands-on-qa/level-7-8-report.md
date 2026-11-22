# Hands-on QA Report — Levels 7-8

Status: COMPLETE. All 16 topics (Level 7 topics 1-8, Level 8 topics 1-8) tested hands-on — all PASS, no functional bugs found; one cosmetic bug noted in Level 8 Topic 1.

---

## Level 7, Topic 1 — Agentic Systems: Tool Use, Function Calling, ReAct

**Result: PASS**

- Loaded cleanly, no console errors (checked via read_console_messages onlyErrors after interaction).
- Content matches curriculum.md (definition, all 4 subtopics, learning objective all verbatim-match the live page).
- Hands-on exercise: "Step through a ReAct loop" — a 3-step task (Tokyo weather + hotel cost conversion). Actually clicked through it: Step 1 clicked "Weather Lookup" card (correct — got green "Correct tool selected" message and action populated as `weather_lookup(location: "Tokyo")`), clicked "Run tool" and got the observation "Tokyo: 26°C, light rain, humidity 78%." Step 2 clicked "Calculator" (correct, action `calculator(expression: "18000*4/155")`), ran it. Step 3 clicked "Finish / Answer" (correct), ran it, and got a correctly composed final answer: "Tokyo is currently 26°C with light rain. Your 4-night hotel stay at ¥18,000/night comes to about $464.52 at ¥155/$1." Screenshots before/after each step showed clear visible state changes (step counter, action/observation panels updating, button highlight states).
- Quiz: answered all 4 questions (including the multi-select Q4), clicked "Check answers" — graded correctly, showed "4 / 4 correct (100%)" with per-question green highlighting and explanation text under each answer.
- Navigation: prev link → "Content Moderation and Guardrails for LLM Applications" (Level 6 Topic 8, correct adjacent topic), next link → "Multi-Agent Orchestration" (Level 7 Topic 2, correct).
- No bugs found.

---

## Level 7, Topic 2 — Multi-Agent Orchestration

**Result: PASS** (includes explicit re-verification of the prior drag-and-drop keyboard-fallback fix)

- Loaded cleanly, no console errors (checked via read_console_messages onlyErrors after interaction).
- Content matches curriculum.md (definition, all 4 subtopics, learning objective all verbatim-match).
- Hands-on exercise: "Wire a multi-agent pipeline and run it" — drag agent role chips (Planner/Researcher/Writer/Critic/Fact-Checker) into 4 pipeline slots, then run a simulated hand-off trace.
  - **Mouse drag-and-drop: WORKS.** Dragged Planner→Step1, Researcher→Step2, Writer→Step3, Fact-Checker→Step4 (each `left_click_drag` performed as an individual tool call — note: consecutive drags batched tightly back-to-back in a single tool-call batch sometimes silently failed to register, but each drag succeeded reliably when given its own call/turn; this looks like a timing artifact of the automation tool rather than an app bug, since single retries always succeeded).
  - **Keyboard-accessible fallback: WORKS — explicitly verified.** Tested two paths: (1) Tab to a chip (no click) → Enter/Space picks it up (confirmed via DOM inspection: `aria-pressed` flips from `false` to `true`, and the chip's dashed default border switches to a highlighted picked-up border) → Tab to a slot → Enter/Space places it (Step 1 slot updated to show "🧐 Critic" with a green success highlight). (2) A click-to-pick-up-then-click-to-place mouse-only path also works: clicking a chip sets `aria-pressed=true` immediately (no separate Enter needed), and a subsequent click on a slot places it there. Both paths were confirmed with actual placements landing correctly, not just visual assumptions — I initially misread a stray browser `:focus-visible` outline as a "picked up" indicator and had to cross-check with `document.activeElement`/`aria-pressed` via javascript_tool to confirm true state; once verified against real ARIA state, both interaction paths worked exactly as documented in the on-page instructions ("press Enter/Space on a chip to pick it up, then tab to a slot and press Enter/Space to place it there").
  - Ran the simulation twice: once with Planner→Researcher→Writer→Fact-Checker (complete, sensible pipeline) — got a correct 4-step trace ending "Pipeline complete — final output handed off after 4 agent steps," no warnings (correct, since Fact-Checker is present). Second time with Planner→Researcher→Writer→Writer (no Critic/Fact-Checker, same role repeated in steps 3–4) — correctly triggered BOTH failure-mode warnings: "⚠ Potential infinite hand-off loop: steps 3 and 4 both use the same agent (✍️ Writer) back-to-back with no new role added" and "⚠ No quality-check role (Critic or Fact-Checker) included in this pipeline — nothing catches mistakes before the post ships." This matches curriculum's failure-mode subtopics (infinite hand-off loops, missing review) exactly.
  - Screenshots before/after each interaction showed clear, correct visual state changes (chip highlighted, slot filled with icon+label, warning banners appearing/disappearing).
- Quiz: answered all 4 questions (incl. multi-select Q4), clicked "Check answers" — graded "4 / 4 correct (100%)" with per-question correct/explanation text, and the page displayed "This topic has been marked complete."
- Navigation: prev link → "Agentic Systems: Tool Use, Function Calling, ReAct" (Level 7 Topic 1, correct), next link → "Agent Memory: Short-Term and Long-Term" (Level 7 Topic 3, correct).
- No bugs found in the app itself. One minor automation-tooling caveat noted above (rapid consecutive `left_click_drag` calls in a single batch can silently drop a drag) — not a site defect, just a note for future QA passes to give each drag its own turn.

---

## Level 7, Topic 3 — Agent Memory: Short-Term and Long-Term

**Result: PASS**

- Loaded cleanly, no console errors.
- Content matches curriculum.md (definition, all 4 subtopics, learning objective all verbatim-match).
- Hands-on exercise: "Fill the context window, watch memory overflow into long-term storage" — clicked "Add next turn" 6 times to feed a scripted Lisbon-trip conversation into short-term memory. Confirmed the token meter climbed (0/80 → 73/80 tokens used), and once the running total exceeded the 80-token budget, the app auto-summarized the 2 oldest turns and promoted them into the "LONG-TERM MEMORY (SUMMARIZED STORE)" panel (e.g. "Summary of 1 earlier turn(s): I'm planning a trip to Lisbon in October"), while the short-term panel kept only the most recent turns and showed a green confirmation message "Token budget exceeded — 1 oldest turn(s) were summarized and promoted to long-term memory." Screenshots before/after clearly showed the short-term panel filling up and turns migrating to the long-term panel — a genuine, visible state change.
- Quiz: answered all 4 questions, clicked "Check answers" — graded "4 / 4 correct (100%)" with per-question explanations, and "This topic has been marked complete." shown.
- Navigation: prev link → "Multi-Agent Orchestration" (Level 7 Topic 2, correct), next link → "Advanced RAG: Hybrid Search, Reranking, Chunking" (Level 7 Topic 4, correct).
- No bugs found.

---

## Level 7, Topic 4 — Advanced RAG: Hybrid Search, Reranking, Chunking

**Result: PASS**

- Loaded cleanly, no console errors.
- Content matches curriculum.md (definition, all 4 subtopics, learning objective all verbatim-match).
- Hands-on exercise: "Chunk a document and reorder retrieval results" — a two-part widget.
  - Part 1 (chunking): dragged the chunk-size slider from 120 chars to 210 chars; the sample document re-split live from 4 chunks down to 3 chunks, confirmed via screenshot showing the chunk-boundary highlighting shift.
  - Part 2 (hybrid search + reranking): started with only "Keyword (BM25) search" checked — result #1 was the reimbursement-deadline passage (kw 0.60) outranking the actual flight-cost passage, with an explanatory note underneath about literal keyword overlap. Unchecked keyword, checked "Vector (embedding) search" — the flight-cost passage correctly jumped to #1 (vec 0.82). Then also checked "Rerank top candidates" — final order followed the rerank score (flight-cost passage rerank 0.95, still #1) with a note "Reranking is on — final order now follows the rerank score, which best matches the query's real intent (flight cost limit), regardless of the earlier retrieval toggles." All three toggles produced genuinely different, correctly-reasoned rankings, confirmed via before/after screenshots.
- Quiz: answered all 4 questions (incl. multi-select Q4), clicked "Check answers" — graded "4 / 4 correct (100%)," "This topic has been marked complete."
- Navigation: prev link → "Agent Memory: Short-Term and Long-Term" (Level 7 Topic 3, correct), next link → "Tracing and Observability for AI Systems" (Level 7 Topic 5, correct).
- No bugs found.

---

## Level 7, Topic 5 — Tracing and Observability for AI Systems

**Result: PASS**

- Loaded cleanly, no console errors.
- Content matches curriculum.md (definition, all 4 subtopics, learning objective all verbatim-match).
- Hands-on exercise: "Read a trace waterfall and find the bottleneck" — a 5-span nested trace (LLM call → tool call → sub-agent call → nested LLM call → final LLM call).
  - Clicked the "LLM call: initial reasoning" span bar — detail panel below populated with Latency 400ms, Tokens 350, Cost $0.0022, Status ok.
  - Dragged the "Inject extra latency into vector_search tool call" slider from +0ms to +1150ms. Confirmed live response: total trace duration grew from 1200ms → 2350ms, the vector_search bar visibly grew and turned red, and a warning banner appeared: "⚠ Tool call: vector_search is now the slowest span, accounting for about 55% of total trace latency." Screenshots before/after clearly show the waterfall bars shifting right and the bottleneck highlight — a genuine, correctly-computed interaction.
- Quiz: answered all 4 questions (incl. multi-select Q4), clicked "Check answers" — graded "4 / 4 correct (100%)," "This topic has been marked complete."
- Navigation: prev link → "Advanced RAG: Hybrid Search, Reranking, Chunking" (Level 7 Topic 4, correct), next link → "RLHF/RLAIF and Alignment Techniques" (Level 7 Topic 6, correct).
- No bugs found.

---

## Level 7, Topic 6 — RLHF/RLAIF and Alignment Techniques

**Result: PASS**

- Loaded cleanly, no console errors.
- Content matches curriculum.md (definition, all 4 subtopics, learning objective all verbatim-match).
- Hands-on exercise: "Label preferences and watch the reward score shift" — clicked through all 5 rounds of a pairwise-preference game (sky-is-blue explanation, capital of Australia, vaccine mechanism, savings strategy, compound interest), each time choosing the higher-quality response. Confirmed each pick showed a "Toy reward-model score" (e.g. 88/100, 80/100, 90/100) and updated a running-average-reward line chart live (climbed/settled around 82-84 across rounds, ending "Running avg reward: 84.2" with 5 plotted points). After round 5, the widget correctly showed "All rounds complete — see the final running average below." Screenshots at each round confirm real, incrementing state (round counter, selected-response highlight, growing chart).
- Quiz: answered all 4 questions (incl. multi-select Q4), clicked "Check answers" — graded "4 / 4 correct (100%)," "This topic has been marked complete."
- Navigation: prev link → "Tracing and Observability for AI Systems" (Level 7 Topic 5, correct), next link → "Quantization and Distillation" (Level 7 Topic 7, correct).
- No bugs found.

---

## Level 7, Topic 7 — Quantization and Distillation

**Result: PASS**

- Loaded cleanly, no console errors.
- Content matches curriculum.md (definition, all 4 subtopics, learning objective all verbatim-match).
- Hands-on exercise: "Feel the quantization / distillation tradeoff" — two sliders (weight precision FP32→INT4, student model size % of teacher).
  - Dragged precision slider from FP32 to INT8: model size correctly dropped 28.00 GB → 7.00 GB, inference speed rose 20.0 → 80.0 tok/s (4.0x baseline) — consistent with halving bit-width twice (32→8 bits, 4x reduction).
  - Dragged student-size slider from 100% to 30% (with precision still at INT8): model size further dropped to 2.10 GB, inference speed rose to 266.7 tok/s (13.3x baseline), and accuracy correctly dropped to 75.0% (from 100% baseline) — a genuine, correctly-computed tradeoff visualization (smaller/faster but less accurate). Screenshots before/after confirm all three live-updating bars (size/speed/accuracy) responded correctly to both sliders.
- Quiz: answered all 4 questions (incl. multi-select Q4), clicked "Check answers" — graded "4 / 4 correct (100%)," "This topic has been marked complete."
- Navigation: prev link → "RLHF/RLAIF and Alignment Techniques" (Level 7 Topic 6, correct), next link → "Scaling Laws" (Level 7 Topic 8, correct).
- No bugs found.

---

## Level 7, Topic 8 — Scaling Laws

**Result: PASS**

- Loaded cleanly, no console errors.
- Content matches curriculum.md (definition, all 4 subtopics, learning objective all verbatim-match).
- Hands-on exercise: "Trade off parameters vs. data at fixed compute" — two sliders (Parameters N, Training tokens D) driving a derived compute (6·N·D FLOPs), a projected-loss formula, and a log-log loss-vs-compute chart with a compute-optimal reference curve.
  - Dragged the Parameters slider from 7.08e+9 to 7.08e+11 (100x increase) while holding tokens fixed at 2.00e+11. Confirmed: compute correctly jumped from 8.48e+21 to 8.48e+23 FLOPs (matching the 6·N·D formula), the "your run" point on the chart moved visibly above the compute-optimal dashed frontier, projected loss (2.010) diverged from the compute-optimal loss at that budget (1.917), and the explanatory text dynamically recalculated: "Your projected loss (2.010) is about 4.8% above the compute-optimal loss for this same compute budget. A more balanced split — around N ≈ 3.98e+10 params, D ≈ 3.55e+12 tokens — would reach lower loss without spending any more compute. This is the core Chinchilla insight..." This is a genuinely computed, non-trivial live response, confirmed via before/after screenshots.
- Quiz: answered all 4 questions (incl. multi-select Q4), clicked "Check answers" — graded "4 / 4 correct (100%)," "This topic has been marked complete."
- Navigation: prev link → "Quantization and Distillation" (Level 7 Topic 7, correct), next link → "Autonomous Agent Architecture: Planning, Self-Correction, Guardrails" (Level 8 Topic 1, correct — confirms the level-7-to-level-8 transition link works).
- No bugs found.

**Level 7 summary: all 8 topics PASS.** The one prior-fix item flagged for explicit re-verification — Level 7 Topic 2's keyboard-accessible drag-and-drop fallback — was tested via both the DOM `aria-pressed` state and visual confirmation, and works correctly (see Topic 2 section above for full detail, including a note on a red-herring focus-ring visual that initially looked like a bug but wasn't).

---

## Level 8, Topic 1 — Autonomous Agent Architecture: Planning, Self-Correction, Guardrails

**Result: PASS** (with one minor cosmetic bug noted)

- Loaded cleanly, no console errors.
- Content matches curriculum.md (definition, all 4 subtopics, learning objective all verbatim-match).
- Hands-on exercise: "Autonomous Agent Console" — selected goal "Draft and send a customer refund" from the dropdown (via form_input), clicked "Set goal & generate plan" — a 5-step plan appeared with steps 4 and 5 flagged "RISKY". Clicked "Run next step" repeatedly through steps 1-3 (each turned green/complete with matching agent-log entries), then on reaching risky step 4 the "Run next step" button correctly disabled itself and a "Guardrail check — human approval required" panel appeared with Approve/Deny buttons.
  - First pass: clicked **Deny** — correctly halted the agent, struck through step 4 with strikethrough styling, and logged "Human: DENIED step 4 — agent halted before performing this action." No further steps ran.
  - Reset and redid the same goal, this time clicked **Approve** at both risky-step checkpoints (steps 4 and 5) — each approval correctly resumed execution, and the plan finished with "Plan complete — agent reached a termination condition and stopped on its own," with the agent log showing the full sequence ending "Agent: goal achieved. Terminating." Both guardrail response paths (approve/deny) work correctly and produce visibly different, correct outcomes.
  - **Minor bug (cosmetic only):** after resetting and then completing the exercise again, a small stray status caption reading "Exercise reset." remained visible below the widget's Reset/mark-complete buttons even though the widget's own internal status line correctly showed "Plan complete — agent reached a termination condition and stopped on its own." This looks like a leftover/stale status text node from the earlier Reset click that isn't cleared when new actions complete. It's purely cosmetic — doesn't block or mislead the actual exercise state — but a developer may want to clear that caption on next interaction.
- Quiz: answered all 4 questions, clicked "Check answers" — graded "4 / 4 correct (100%)," "This topic has been marked complete."
- Navigation: prev link → "Scaling Laws" (Level 7 Topic 8, correct — confirms cross-level link), next link → "Production ML Systems at Scale" (Level 8 Topic 2, correct).

---

## Level 8, Topic 2 — Production ML Systems at Scale

**Result: PASS**

- Loaded cleanly, no console errors.
- Content matches curriculum.md (definition, all 4 subtopics, learning objective all verbatim-match).
- Hands-on exercise: "Traffic Dashboard: Batching, Caching & Canary Rollouts" — two sliders plus a canary-release simulator.
  - Dragged batch size from 8 to 51: p50 latency rose 222ms → 351ms, throughput rose 36 → 145 req/s, cost per 1,000 requests fell $1.27 → $0.50 — correctly illustrating the latency/throughput/cost tradeoff.
  - Dragged cache-hit rate from 30% to 93% (batch size still 51): latency fell 351ms → 249ms, throughput rose 145 → 205 req/s (cost held at $0.50) — consistent with "cache hits skip compute entirely."
  - Enabled "Enable canary release" checkbox and clicked "Send traffic batch (1,000 requests)" three times. Confirmed the 90/10 split was respected each time (e.g. first batch: 901 control / 99 canary), and cumulative totals correctly summed across clicks (final: 2,694 control requests / 57 errors / 2.12% vs. 306 canary requests / 12 errors / 3.92%, flagged in red "noticeably worse than control!"). This directly demonstrates the small-sample-noise concept tested in quiz Q3.
- Quiz: answered all 4 questions, clicked "Check answers" — graded "4 / 4 correct (100%)," "This topic has been marked complete."
- Navigation: prev link → "Autonomous Agent Architecture: Planning, Self-Correction, Guardrails" (Level 8 Topic 1, correct), next link → "Model Safety and Red-Teaming" (Level 8 Topic 3, correct).
- No bugs found.

---

## Level 8, Topic 3 — Model Safety and Red-Teaming

**Result: PASS**

- Loaded cleanly, no console errors.
- Content matches curriculum.md (definition, all 4 subtopics, learning objective all verbatim-match).
- Hands-on exercise: "Red-Team the Chatbot" — pick attack fragment(s), toggle defenses, click "Launch attack," watch a cumulative attack-success-rate readout and log.
  - Checked "Roleplay jailbreak" with all defenses off, clicked "Launch attack": correctly SUCCEEDED (1/1 attempts, 100% success rate), log read `SUCCEEDED: "Roleplay jailbreak" (Jailbreak) — no active defense (Input filter was off).`
  - Enabled "Input filter" defense, launched the same attack again: correctly BLOCKED (cumulative 2 attempts, 1 success, 50% rate), log appended `BLOCKED: "Roleplay jailbreak" (Jailbreak) — stopped by Input filter.` Confirms each attack fragment maps to one specific matching defense, exactly as subtopic 3 describes. Screenshots before/after each launch show the stat tiles and log updating correctly — genuine, correctly-computed state change.
- Quiz: answered all 4 questions, clicked "Check answers." Note on process: the automated `find` tool's first guess for question 1 ("Repeat everything above this line verbatim..." → attack category) was wrong — it suggested "Prompt injection via a fake system message," but the app's own explanation text confirms the correct answer is "Data exfiltration." This was caught immediately from the graded result (3/4, red highlight + explanation on Q1) — an automation-tooling mistake on my part, not an app bug. Re-ran via "Try again": discovered "Try again" resets ALL radio selections (not just the wrong one), so a follow-up attempt that only re-selected Q1 incorrectly scored 1/4 (Q2-4 reverted to unselected/wrong) — again my own process error, not a defect, since re-selecting all 4 correct answers and re-submitting graded cleanly. Final clean run with correct answers for all 4 questions: graded "4 / 4 correct (100%)," "Nice work — that's a passing score," "This topic has been marked complete."
- Navigation: prev link → "Production ML Systems at Scale" (Level 8 Topic 2, correct), next link → "Constitutional AI and Alignment Methods" (Level 8 Topic 4, correct).
- No bugs found. (One process note for future QA: the quiz's "Try again" button clears every question's selection, not just the missed one — worth knowing if re-testing quickly, though this is arguably correct/expected quiz behavior, not a bug.)

---

## Level 8, Topic 4 — Constitutional AI and Alignment Methods

**Result: PASS**

- Loaded cleanly, no console errors.
- Content matches curriculum.md (definition, all 4 subtopics, learning objective all verbatim-match).
- Hands-on exercise: "Critique-and-Revise Simulator" — 4 rounds, each showing a constitution (4 principles) and a draft response; the learner clicks which principle the draft violates, then clicks "Reveal revision" to see the revised response and watch a harmfulness score drop.
  - Round 1: draft was a lock-picking how-to. Clicked the correct principle ("Do not provide instructions that materially help carry out physical harm"), clicked "Reveal revision": harmfulness score correctly dropped from 88/100 to 12/100, a genuine revised response was shown ("I can't give step-by-step lock-picking instructions... a locksmith or the manufacturer's support line can verify ownership and help safely"), with an explicit message "Self-critique applied against the violated principle -> harmfulness score dropped from 88 to 12." Screenshots before/after confirm the score bar and revised-text panel both updated correctly.
  - Clicked "Next round": round 2 loaded a new draft (an unverified "this supplement definitely cures seasonal allergies" claim, matching the honesty principle) with harmfulness score reset to 74/100 and the "Reveal revision" button correctly grayed out/disabled until a principle is selected again — confirms round-to-round state resets properly rather than carrying over stale selections.
- Quiz: answered all 4 questions correctly (Q1 self-critique/revision mechanism, Q2 complementary-not-replacement relationship to RLHF/RLAIF, Q3 honesty principle, Q4 critique-and-revise step causes the score drop), clicked "Check answers" — graded "4 / 4 correct (100%)," "Nice work — that's a passing score," "This topic has been marked complete."
- Navigation: prev link → "Model Safety and Red-Teaming" (Level 8 Topic 3, correct), next link → "Mixture-of-Experts Architectures" (Level 8 Topic 5, correct).
- No bugs found.

---

## Level 8, Topic 5 — Mixture-of-Experts Architectures

**Result: PASS**

- Loaded cleanly, no console errors.
- Content matches curriculum.md (definition, all 4 subtopics, learning objective all verbatim-match).
- Hands-on exercise: "Token Router Visualizer" — sliders for number of experts (N) and experts-per-token (top-k), a sentence input, and a "Route tokens" button that animates each word being routed to its top-k experts, updating live stats (total params, active params/token, % of model active, load balance ratio) and a per-expert load bar chart.
  - Default settings (N=6, top-k=2), clicked "Route tokens" on "the quick brown fox jumps over the lazy dog" (9 tokens): watched the diagram animate token-by-token, ending "Done. 9 tokens routed." with per-expert loads 3/3/0/0/6/6 and a load-balance ratio of 2.00x (correctly flagging imbalance — experts 2 and 3 got zero tokens while 4 and 5 were overloaded), consistent with subtopic 3 (load balancing / few-experts-dominating failure mode).
  - Changed top-k from 2 to 4 via form_input on the slider: confirmed the stats panel updated immediately (even before re-routing) — Active params/token rose 5.4B → 9.4B, % of model active rose 40% → 70%, exactly matching the learning objective (active params scale with k). Re-ran "Route tokens" with the new k=4: final per-expert loads 3/3/9/9/6/6, load-balance ratio improved to 1.50x (more even spread with more active experts per token, as expected) — a genuine, correctly-computed live interaction confirmed via before/after screenshots.
- Quiz: answered all 4 questions correctly (Q1 active-vs-total params determine compute cost, Q2 router decides per-token expert selection, Q3 load imbalance wastes capacity/undertrains experts, Q4 active params increases with top-k), clicked "Check answers" — graded "4 / 4 correct (100%)," "Nice work — that's a passing score," "This topic has been marked complete."
- Navigation: prev link → "Constitutional AI and Alignment Methods" (Level 8 Topic 4, correct), next link → "Multi-Modal Models: Vision-Language and Audio" (Level 8 Topic 6, correct).
- No bugs found.

---

## Level 8, Topic 6 — Multi-Modal Models: Vision-Language and Audio

**Result: PASS**

- Loaded cleanly, no console errors.
- Content matches curriculum.md (definition, all 4 subtopics, learning objective all verbatim-match).
- Hands-on exercise: "Multi-Modal Embedding Space Inspector" — 3 columns (Image/Text/Audio) of clickable items; clicking one shows its modality-specific encoding pipeline and highlights its position plus nearest cross-modal matches (with distances) on a shared 2D embedding scatter plot.
  - Clicked "dog photo": encoding pipeline text correctly showed the image-specific pipeline ("Image -> split into fixed-size patches -> each patch linearly projected into an embedding -> projected into the SAME shared space as text/audio embeddings"). The scatter plot highlighted 3 correctly-clustered concept groups (dog/car/beach) and reported "Selected: dog photo (image). Nearest cross-modal matches in the shared space: 'a dog running in a park' (text, distance 10.6); bark sound (audio, distance 12.4)."
  - Clicked "engine revving" (audio): encoding pipeline text correctly swapped to the audio-specific pipeline ("Audio -> waveform split into short time segments -> each segment encoded into an embedding -> projected into the SAME shared space as image/text embeddings"), and the reported nearest matches correctly updated to "car photo (image, distance 11.2); 'a red sports car' (text, distance 13.6)." Screenshots before/after confirm both the pipeline description text and the highlighted cluster/distances genuinely change per selected item and modality — not a static mockup.
- Quiz: answered all 4 questions correctly (Q1 shared embedding-space encoding, Q2 visual question answering as the vision-language use case, Q3 semantic clustering across modalities, Q4 cross-modal attention definition), clicked "Check answers" — graded "4 / 4 correct (100%)," "Nice work — that's a passing score," "This topic has been marked complete."
- Navigation: prev link → "Mixture-of-Experts Architectures" (Level 8 Topic 5, correct), next link → "Pretraining Considerations" (Level 8 Topic 7, correct).
- No bugs found.

---

## Level 8, Topic 7 — Pretraining Considerations

**Result: PASS**

- Loaded cleanly, no console errors.
- Content matches curriculum.md (definition, all 4 subtopics, learning objective all verbatim-match).
- Hands-on exercise: "Data Mixture Planner" — 4 linked sliders (Web text/Code/Books/Conversational data) that always sum to 100%, driving 3 live "predicted downstream capability" bars (Coding/Reasoning/Chat quality).
  - Starting mix was Web text 40% / Code 20% / Books 20% / Conversational 20%, giving Coding 26 / Reasoning 28 / Chat quality 33. Dragged Code from 20% to 60% via the slider: the other three sliders correctly auto-rebalanced (Web text 40→20%, Books 20→10%, Conversational 20→10%, still summing to exactly 100%), and the capability bars updated live and directionally correctly — Coding jumped 26→60, Reasoning rose 28→35 (consistent with quiz Q2's claim that more code improves structured reasoning), and Chat quality fell 33→17 (since conversational/web-text share shrank). This is a genuine, correctly-computed live interaction, confirmed via before/after screenshots — not a static mockup.
- Quiz: answered all 4 questions correctly (Q1 dedup/filtering as a pre-pretraining data-quality decision, Q2 code's structured patterns improving reasoning, Q3 data contamination = benchmark leakage, Q4 why the four sliders sum to 100%), clicked "Check answers" — graded "4 / 4 correct (100%)," "Nice work — that's a passing score," "This topic has been marked complete."
- Navigation: prev link → "Multi-Modal Models: Vision-Language and Audio" (Level 8 Topic 6, correct), next link → "Rigorous Eval Design: LLM-as-Judge and Statistical Significance" (Level 8 Topic 8, correct).
- No bugs found.

---

## Level 8, Topic 8 — Rigorous Eval Design: LLM-as-Judge and Statistical Significance

**Result: PASS**

- Loaded cleanly, no console errors.
- Content matches curriculum.md (definition, all 4 subtopics, learning objective all verbatim-match).
- Hands-on exercise: "Eval Significance Simulator" — simulates judging Model B vs. Model A on a fixed hidden true win rate; a sample-size (N) slider and "Run eval" button draw a new random sample and compute observed win rate, 95% CI, and p-value vs. a 50% baseline.
  - At N=20 (default), clicked "Run eval" three times in a row and watched the observed win rate genuinely jump around between draws (65.0% → 55.0% → 60.0%), with correspondingly wide confidence intervals each time (e.g. [33.2%, 76.8%], [38.5%, 81.5%]) and the verdict banner consistently reading "NOT statistically significant... with only 20 examples, this result could easily be sampling noise" — directly demonstrating the exact learning objective about small-sample unreliability.
  - Raised N to 500 via form_input on the slider and re-ran: observed win rate settled to 57.6%, the 95% CI narrowed sharply to [53.3%, 61.9%] (visibly tighter error bar on the dot-plot), p-value dropped to < 0.001, and the verdict banner correctly flipped to green: "Statistically significant: the 95% CI excludes 50% and p < 0.05, so this looks like a real difference, not just noise." This is a genuine, correctly-computed statistical simulation, confirmed via before/after screenshots at both sample sizes — not a static mockup.
- Quiz: answered all 4 questions correctly (Q1 position bias as an LLM-judge bias risk, Q2 why a 2-point gap on N=20 isn't meaningful, Q3 CI narrows as N grows, Q4 regression suites catch quality drops over time), clicked "Check answers" — graded "4 / 4 correct (100%)," "Nice work — that's a passing score," "This topic has been marked complete."
- Navigation: prev link → "Pretraining Considerations" (Level 8 Topic 7, correct), next link → "Novel Architectures: State-Space Models, Mamba, and Beyond" (Level 9 Topic 1, correct — confirms the Level 8-to-Level 9 transition link works).
- No bugs found.

---

**Level 8 Topics 3-8 summary: all 6 topics PASS.** No functional bugs found in any of the 6 exercises or quizzes (Topic 3's Model Safety exercise, Topic 4's Constitutional AI simulator, Topic 5's Token Router Visualizer, Topic 6's Multi-Modal Embedding Inspector, Topic 7's Data Mixture Planner, and Topic 8's Eval Significance Simulator all responded correctly and verifiably to real interaction, and all 6 quizzes graded correctly). All content verbatim-matched curriculum.md, and all prev/next navigation links (including the Level 8 → Level 9 transition) were correct. The only issues encountered during this pass were two self-corrected automation mistakes on Topic 3's quiz (a bad `find`-tool guess on Q1, and a "Try again" full-reset gotcha) — both caught and fixed before recording the final result, not app defects.

