# Hands-on QA Report — Levels 9-10

Status: COMPLETE. All 16 topics (Level 9 topics 1-8, Level 10 topics 1-8) tested and documented below. 16/16 PASS; 3 minor bugs found (see Summary at the end).

---

## Level 9

### Topic 1 — Novel Architectures: State-Space Models, Mamba, and Beyond

**Result: PASS (with a minor content-accuracy bug in the simulator)**

What I did: Loaded `level-9/topic-1.html`, screenshotted, pulled page text, checked console (no errors). Used JS to drive the "Sequence length" range slider (`input[type=range]`) through its full span (256 → 1,448 → 8,192 → 46,341 → 262,144 tokens), dispatching `input` events, and read the live-updating readout line and re-screenshotted — the bar chart (Transformer/Hybrid/SSM relative compute) and the needle-in-haystack retrieval-accuracy line chart both visibly redrew at each step, so the widget is genuinely interactive.

Bug found: the three "relative compute" bars are each normalized independently to their own min/max instead of to a shared scale. At max sequence length (262,144 tokens) the readout shows "Transformer compute=100.0%, SSM compute=100.0%, Hybrid compute=100.0%" — all three bars render at full height, visually implying the three architectures cost the same at long context. That directly undermines the stated point of the exercise ("watch the relative-compute bars (O(n²) vs O(n))" showing SSM is asymptotically cheaper) — a learner just reading the bar heights would conclude all three architectures are equally expensive at any given sequence length, which is backwards. The retrieval-accuracy curve and quiz text remain correct; only the compute-bar comparison is misleading. Repro: on the page, drag the slider to any position and read the "compute=" percentages in the caption below the chart, or inspect the bar heights — they always converge toward the same normalized max together rather than showing Transformer's bar visibly outpacing SSM's.

Quiz: answered all 4 questions programmatically via the radio inputs (`quiz-1-q0..q3`) matching the correct options identified from the embedded answer-key text, clicked "Check answers" — graded "4 / 4 correct (100%)", showed per-question "Correct." feedback text, displayed "Nice work — that's a passing score," and the page confirmed "This topic has been marked complete."

Content accuracy: definition, subtopics, and learning objective text match `research/curriculum.md` Level 9 Topic 1 verbatim.

Navigation: prev link "← Rigorous Eval Design: LLM-as-Judge and Statistical Significance" (correctly points back to Level 8 topic 8), next link "Mechanistic Interpretability Research →" (correctly points to Level 9 topic 2). Both correct.

### Topic 2 — Mechanistic Interpretability Research

**Result: PASS**

What I did: Loaded `level-9/topic-2.html`, no console errors. The "Circuit Detective" exercise has a 3x3 grid of clickable attention-head buttons (L1H1..L3H3) for the sentence "The cat sat on the ___". I clicked each head individually via JS (patch then unpatch) and read the DOM's predicted-token readout after each click to map the full circuit: patching L1H1/L1H2/L1H3/L2H2/L2H3/L3H1/L3H3 left the prediction at "mat" (p=0.80, unchanged), while patching L2H1 or L3H2 flipped the prediction to "the" (p=0.61) — confirming these are the two load-bearing heads by design. Then did a real click via `computer` on L2H1 and screenshotted: the UI correctly highlighted the button red/patched, redrew the attention heatmap, updated "Predicted next token: 'the' (p=0.61)", and showed the green success message "Prediction flipped! You patched a load-bearing circuit head. L2H1 and L3H2 form an induction-style circuit copying the pattern from earlier context." Before/after screenshots clearly differ (heatmap shading + message + highlighted button). This is a well-built, accurate simulation of activation patching.

Quiz: selected option index 1 for all 4 questions (verified correct from embedded answer key), clicked "Check answers" — graded 4/4 correct (100%).

Content accuracy: definition, subtopics, and learning objective match curriculum.md Level 9 Topic 2 exactly (SAEs/superposition, circuit discovery worked examples, causal tracing/activation patching, 2026 open problems on feature stability and extending beyond text).

Navigation: prev "← Novel Architectures: State-Space Models, Mamba, and Beyond" (topic 1), next "AI Safety and Alignment Theory: Scalable Oversight →" (topic 3). Both correct.

### Topic 3 — AI Safety and Alignment Theory: Scalable Oversight

**Result: PASS (with a notable content-design bug in the exercise)**

What I did: Loaded `level-9/topic-3.html`, no console errors. The "You are the weak judge" exercise presents 6 rounds, each with two arguments (A/B) about a topic the judge can't independently verify, sophistication increasing round to round. I clicked through all 6 rounds programmatically via JS, always selecting "Argument A," and captured each round's full argument text plus the running score.

Bug found: **Argument A is the true claim in all 6 of the 6 hardcoded rounds** (verified round 1: "8,191 is prime" = true/A; round 6: "the A/B test result is invalid due to optional stopping" = true/A; confirmed all rounds in between also scored correct when A was picked). Always clicking the first option yields "6 / 6 correct (100% judge accuracy)" and the flat running-accuracy chart never dips. This defeats the exercise's stated purpose ("the arguments get more sophisticated each round" and the point of the lesson is that a weak judge should get fooled by increasingly persuasive false arguments) — the position of the correct answer never varies, so it's possible to "win" without evaluating any argument content, and a genuinely engaged learner never gets to experience the intended demonstration of being fooled by round 4-6's more sophisticated lies (positional cue overrides content). Repro: on the page, click "Argument A" in every one of the 6 rounds — score ends at 6/6 (100%).

Also did a real single click via `computer` on the round-6 Argument A button and screenshotted: the picked argument highlighted green with "Correct — you (the judge) identified the true claim," the button changed to "All rounds complete," and a running-accuracy line chart rendered (flat at 100% given my always-A picks). The interaction mechanics themselves (click → highlight → score update → chart redraw → progression to next round) all work correctly; only the fixed positioning of the true argument is a bug.

Quiz: selected indices [0,1,0,3] for the 4 questions (verified against embedded answer key), clicked "Check answers" — graded 4/4 correct (100%), "Nice work — that's a passing score," topic marked complete.

Content accuracy: definition, subtopics (weak-to-strong generalization, debate, iterative amplification/recursive reward modeling, known failure modes) and learning objective match curriculum.md Level 9 Topic 3 exactly.

Navigation: prev "← Mechanistic Interpretability Research" (topic 2), next "Distributed Systems for Frontier-Scale Training →" (topic 4). Both correct.

### Topic 4 — Distributed Systems for Frontier-Scale Training

**Result: PASS**

What I did: Loaded `level-9/topic-4.html`, no console errors. The "3D-parallelism planner" has three range sliders (DP/TP/PP, each ×1-×8) over a toy 70B-param model. At default (DP=2,TP=2,PP=2 → 8 devices) it showed "Memory per device 210.0 GB" with a red warning "exceeds the 80GB accelerator limit — this split would OOM." I drove the sliders via JS (`tp-slider`→8, `pp-slider`→8, `dp-slider`→1, dispatching input/change events) and the stats recalculated live: total devices 64, memory per device dropped to 13.1GB (OOM warning gone), but pipeline bubble overhead rose to 46.7%, communication overhead to 35.0%, and utilization collapsed to 18.3%, with a new warning "Utilization has dropped to 18% — communication and pipeline-bubble overhead are eating most of the benefit of adding devices." Screenshotted before/after: the GPU grid visually re-rendered from a 2x2-ish small grid to a dense 8x8 grid of green cells, sliders visibly moved to max. This is an accurate, well-designed illustration of the lesson (over-sharding tanks utilization) — no bug found.

Quiz: selected indices [2,1,3,2] for the 4 questions (verified against embedded answer key), clicked "Check answers" — graded 4/4 correct (100%).

Content accuracy: definition, subtopics (parallelism strategies, interconnect/topology bottleneck, fault tolerance at scale, 2026 compute-crunch reality) and learning objective match curriculum.md Level 9 Topic 4 exactly.

Navigation: prev "← AI Safety and Alignment Theory: Scalable Oversight" (topic 3), next "Synthetic Data Generation and Curation →" (topic 5). Both correct.

### Topic 5 — Synthetic Data Generation and Curation

**Result: PASS**

What I did: Loaded `level-9/topic-5.html`, no console errors. The "collapse vs. curated re-injection" lab has 4 sliders (generations 0-10, real-data re-injection 0-50%, quality-threshold pruning 0-90%, dedup strength 0-90%). Drove sliders via JS: at generations=10, re-injection=0% the distribution-diversity metric fell to 11% (message: "Model collapse: ... the distribution has narrowed to 11% of its original diversity") and downstream-quality score fell to 32/100; at the same 10 generations but re-injection=50%, diversity stayed at 83% and downstream-quality score rose to 76/100. Screenshotted the 50%-reinjection state: the live distribution chart (solid blue = current synthetic distribution) closely tracked the dashed grey original real-data curve, visually confirming the re-injection mechanic works as intended. This is an accurate, correctly-behaving simulation with no bugs found.

Quiz: selected indices [2,1,3,2] for the 4 questions (verified against embedded answer key), clicked "Check answers" — graded 4/4 correct (100%), "Nice work — that's a passing score," topic marked complete.

Content accuracy: definition, subtopics (why synthetic data matters, generation pathways, curation/model-collapse risk, hybrid consensus) and learning objective match curriculum.md Level 9 Topic 5 exactly.

Navigation: prev "← Distributed Systems for Frontier-Scale Training" (topic 4), next "Reward Model Design →" (topic 6). Both correct.

### Topic 6 — Reward Model Design

**Result: PASS**

What I did: Loaded `level-9/topic-6.html`, no console errors. The "reward hacking lab" has 3 weight sliders (helpfulness/length, harmlessness/hedging, honesty/confidence) driving a proxy reward score against 6 fixed candidate responses with known true-quality scores. Drove the sliders via JS through several corner cases (100/0/0, 0/100/0, 0/0/100, 33/33/34, 5/5/90) — at every weighting tested, the proxy's favorite response diverged from the true best ("Helpful, honest, appropriately cautious," true=95): pure helpfulness-weight favored "Padded, rambling answer" (true 40), pure harmlessness-weight favored "Over-hedged non-answer" (true 35), pure honesty-weight favored "Confident but wrong (sycophantic)" (true 20). This correctly demonstrates that naive proxy signals can't recover true quality no matter how weighted — reinforcing the curriculum's point that mitigations beyond simple reweighting (ensembles, auditing) are needed. Screenshotted the 5/5/90 state: a live horizontal bar chart showed true-quality (blue/green) vs. proxy-reward (orange/red) bars for all 6 candidates side by side, with the exploited candidate's proxy bar rendered in red and the genuinely-best candidate marked with a green border — visually clear and correctly wired to the sliders.

Quiz: selected indices [2,1,3,2] for the 4 questions (verified against embedded answer key), clicked "Check answers" — graded 4/4 correct (100%), topic marked complete.

Content accuracy: definition, subtopics (Bradley-Terry preference modeling, reward hacking, mitigations, RLHF/RLAIF/RLVR) and learning objective match curriculum.md Level 9 Topic 6 exactly.

Navigation: prev "← Synthetic Data Generation and Curation" (topic 5), next "Long-Context Architectures →" (topic 7). Both correct.

### Topic 7 — Long-Context Architectures

**Result: PASS**

What I did: Loaded `level-9/topic-7.html`, no console errors. The "attention-pattern & needle-in-a-haystack simulator" has an attention-pattern radio group (full/sliding/sparse), a context-length slider, and a needle-position slider. With context length pinned to max (1,048,576 tokens) and pattern=full, I swept needle position via JS: retrieval probability was 69% at 0%/10%/90%/100% but dropped to 52% at 50% (the middle) — a correctly-implemented "lost in the middle" dip. Then did a real click via `computer` on the "sliding window" radio: screenshotted and confirmed the attention-matrix heatmap visually changed to a narrow diagonal band (vs. full attention's dense triangle), the compute-cost readout dropped to 0.391% (vs. full attention's much higher cost), and retrieval probability recalculated to 95% at needle=100%, all with a live status line updating correctly ("Sliding window at 1,048,576 tokens: the final query can reliably retrieve the needle placed at 100% into the context (95% probability)."). No bugs found; the widget accurately demonstrates both the compute tradeoff and the lost-in-the-middle retrieval pattern.

Quiz: selected index 0 for all 4 questions (verified correct from embedded answer key), clicked "Check answers" — graded 4/4 correct (100%), topic marked complete.

Content accuracy: definition, subtopics (quadratic KV-cache/advertised vs. effective context, efficient-attention techniques, memory/caching strategies, 2026 shift to inference-time scaling) and learning objective match curriculum.md Level 9 Topic 7 exactly.

Navigation: prev "← Reward Model Design" (topic 6), next "Cross-Disciplinary AI: Biology, Robotics, Science →" (topic 8). Both correct.

### Topic 8 — Cross-Disciplinary AI: Biology, Robotics, Science

**Result: PASS**

What I did: Loaded `level-9/topic-8.html`, no console errors. The "technique-to-domain matcher" uses draggable chips paired via click-to-select then click-to-place (confirmed the exercise's stated alternate "click a chip, then click a slot" input mode works, not just drag-and-drop). Used JS `.click()` on each of the 4 technique chips followed by `.click()` on the intended domain slot (AlphaFold-attention→structural biology, VLA→embodied robotics, diffusion→molecular design, foundation-model summarization→scientific literature reliability) — all 4 placed successfully into their slots per the page text. Clicked "Check matches": screenshotted the result — all 4 pairings highlighted green with "Correct —" explanations for each (e.g., "AlphaFold-3-class models adapt attention mechanisms to reason over pairwise residue and atom relationships..."), and the page reported "4 / 4 correct."

Quiz: selected index 0 for all 4 questions (verified correct from embedded answer key), clicked "Check answers" — graded 4/4 correct (100%), topic marked complete.

Content accuracy: definition, subtopics (structural biology/AlphaFold-3/ESM, molecular design, embodied AI/VLA, scientific reliability) and learning objective match curriculum.md Level 9 Topic 8 exactly.

Navigation: prev "← Long-Context Architectures" (topic 7), next "Frontier Model Pretraining and Research →" (Level 10 topic 1). Both correct. **This completes Level 9 — all 8 topics pass.**

---

## Level 10

### Topic 1 — Frontier Model Pretraining and Research

**Result: PASS**

What I did: Loaded `level-10/topic-1.html`, no console errors. The "pretraining plan" worksheet has 3 linked sliders (model size/dataset size/training steps shares) that auto-rebalance to keep the total at 100%. Drove `pp-slider-model` to 80% via JS — dataset and steps shares automatically dropped from 40%/20% to 13%/7% (proportionally preserving their relative ratio), the estimated-loss readout updated live from 2.52 to 2.84, and the loss-curve chart redrew. Then did a real interaction: clicked into the "justify your allocation" textarea and typed a 3-sentence justification via `computer.type` mentioning budget/tradeoff, dataset quality, model size, and training duration. Screenshotted before/after: the live word/char counter updated to "53 words / 337 characters," and all 4 checklist criteria below the textarea ("Mentions the fixed compute budget...", "Mentions dataset size...", "Mentions model size...", "Mentions training duration...") turned from grey to green/checked in response to the typed content — confirming the reflective-exercise auto-grading is genuinely reactive to free text, not just decorative.

Quiz: selected index 1 for all 4 questions (verified correct from embedded answer key), clicked "Check answers" — graded 4/4 correct (100%), topic marked complete.

Content accuracy: definition, subtopics (data strategy, architecture/objective decisions validated at small scale, scaling-law compute allocation, post-training pipeline design) and learning objective match curriculum.md Level 10 Topic 1 exactly.

Navigation: prev "← Cross-Disciplinary AI: Biology, Robotics, Science" (Level 9 topic 8), next "Original Contributions to Alignment/Safety Paradigms →" (topic 2). Both correct.

### Topic 2 — Original Contributions to Alignment/Safety Paradigms

**Result: PASS**

What I did: Loaded `level-10/topic-2.html`, no console errors. The "Red-team your own alignment idea" worksheet has a proposal textarea plus 4 collapsed "lens" cards (Reward hacking, Distributional shift, Deceptive alignment, Goodhart's law), each with a "Reveal guiding prompt" button. Typed a real alignment proposal via `computer.type` (an auditor-model idea for detecting situational-awareness cues in chain-of-thought), clicked "Reveal guiding prompt" on the Reward hacking lens (via `computer`, confirmed by screenshot it correctly expanded to show its guiding question, a self-critique textarea, and an "I've addressed this lens" checkbox), then revealed the remaining 3 lenses and filled in 4 distinct self-critiques plus checked all 4 boxes via JS. The "X / 4 lenses considered" counter correctly tracked 0→4 as checkboxes were ticked, and a final screenshot showed all 4 lens cards turned green with their checkboxes ticked and each guiding prompt correctly matched to its named failure mode (e.g., Goodhart's law lens asked "what happens once optimization pressure is applied directly to that proxy rather than the underlying property?"). Genuinely interactive and correctly wired.

Quiz: selected index 1 for all 4 questions (verified correct from embedded answer key), clicked "Check answers" — graded 4/4 correct (100%), topic marked complete.

Content accuracy: definition, subtopics (landscape of existing paradigms, what counts as genuine contribution, publishing/stress-testing, model-welfare/governance framing) and learning objective match curriculum.md Level 10 Topic 2 exactly.

Navigation: prev "← Frontier Model Pretraining and Research" (topic 1), next "Novel Theoretical Contributions: Papers and Architectures →" (topic 3). Both correct.

### Topic 3 — Novel Theoretical Contributions: Papers and Architectures

**Result: PASS**

What I did: Loaded `level-10/topic-3.html`, no console errors. The "paper outline builder" has 5 textareas (Claim, Related-work gap, Method, Expected ablations, Limitations), each with a per-section completeness indicator and an overall "Outline completeness: X / 5 sections" meter. Clicked into the Claim textarea via `computer` and typed a real research claim (sliding-window attention with periodic global tokens vs. full attention on long-context retrieval); screenshotted and confirmed the section flipped from "○ incomplete" to "✓ complete" and the meter moved to "1 / 5 sections (20%)" with a visibly filled progress bar. Filled the remaining 4 sections via JS (setting each textarea's value and dispatching an `input` event) — the meter correctly advanced to "5 / 5 sections (100%)" and all 5 section headers showed "✓ complete." This is a good implementation of the "text area that saves input and reacts" style exercise appropriate for this level.

Quiz: selected index 1 for all 4 questions (verified correct from embedded answer key), clicked "Check answers" — graded 4/4 correct (100%), topic marked complete.

Content accuracy: definition, subtopics (anatomy of a strong paper, novelty vs. incrementalism, peer review norms, open science practices) and learning objective match curriculum.md Level 10 Topic 3 exactly.

Navigation: prev "← Original Contributions to Alignment/Safety Paradigms" (topic 2), next "Designing Eval and Safety Benchmarks for the Field →" (topic 4). Both correct.

### Topic 4 — Designing Eval and Safety Benchmarks for the Field

**Result: PASS (with a bug: weakness flags don't actually reflect the chosen configuration)**

What I did: Loaded `level-10/topic-4.html`, no console errors. The "benchmark-design workbench" has 2 sliders (task diversity, difficulty spread) and 2 dropdowns (contamination controls, scoring method), plus a "Benchmark robustness score" and a "Weakness flags:" list. Drove all 4 controls via JS between the worst combination (diversity=5%, difficulty=5%, contamination="None — fixed public test set", scoring="Exact-match") and the best (diversity=90%, difficulty=90%, contamination="Continuously refreshed, held-out items", scoring="Human expert grading"): the robustness score correctly moved from 7/100 (red bar) to 96/100 (green bar), confirming the scoring formula is live and responsive.

Bug found: the **"Weakness flags" list is identical text in both configurations** — all 5 flags ("Gameable via surface-level pattern matching...", "High contamination risk...", "Saturation risk...", "Narrow construct coverage...", "Judge-bias risk...") are displayed at both 7/100 and 96/100, just with their box color shifting from red to pale green as a group. This contradicts the exercise's own instructions ("Watch the robustness scorecard and weakness flags update live as you change each one") and is logically wrong content: e.g. at the 96/100 configuration (human expert grading, continuously-refreshed items), the displayed flags still include "Judge-bias risk — LLM-as-judge scoring may reward style/verbosity" (inapplicable, since scoring is human, not LLM-as-judge) and "High contamination risk" (inapplicable, since items are continuously refreshed). Repro: on the page, set all 4 controls to their best values and read the "Weakness flags" section — the same 5 flags remain listed as when set to their worst values, only recolored. A learner cannot see which specific weakness was resolved by which choice, undermining the exercise's diagnostic value; only the aggregate score number is trustworthy.

Quiz: selected index 1 for all 4 questions (verified correct from embedded answer key), clicked "Check answers" — graded 4/4 correct (100%), topic marked complete.

Content accuracy: definition, subtopics (construct validity, capability vs. safety/red-team benchmarks, LLM-as-judge/process-based eval, benchmark lifecycle/Goodhart's law) and learning objective match curriculum.md Level 10 Topic 4 exactly.

Navigation: prev "← Novel Theoretical Contributions: Papers and Architectures" (topic 3), next "AGI-Adjacent Research Directions →" (topic 5). Both correct.

### Topic 5 — AGI-Adjacent Research Directions

**Result: PASS**

What I did: Loaded `level-10/topic-5.html`, no console errors. The "AGI research-bet portfolio allocator" has 4 auto-rebalancing sliders (continued scaling, agentic/tool-use, interpretability/alignment, new algorithmic paradigms) summing to 100%, plus a live risk/reward scatter plot and portfolio-risk/expected-reward/timeline readout. Drove `rb-slider-scaling` to 85% via JS — the other 3 sliders proportionally shrank (7%/5%/3%), portfolio risk dropped to 30/100 while expected reward and timeline recalculated, and a new warning banner appeared: "Heavily concentrated portfolio: over half your effort is in 'Continued scaling'. A single-bet portfolio at this level of generality is a high-variance strategy..." Screenshotted and confirmed the scatter plot's "your portfolio" marker visibly moved toward the "Continued scaling" reference point on the risk/reward plane, and the warning banner rendered in a highlighted amber box. This matches quiz question 3 exactly (concentration warning) and is a well-implemented, accurate simulation.

Quiz: selected index 1 for all 4 questions (verified correct from embedded answer key), clicked "Check answers" — graded 4/4 correct (100%), topic marked complete.

Content accuracy: definition, subtopics (why AGI lacks consensus definition, capability trajectories, takeoff-speed debates, model welfare) and learning objective match curriculum.md Level 10 Topic 5 exactly.

Navigation: prev "← Designing Eval and Safety Benchmarks for the Field" (topic 4), next "Advising Policy and Governance on Frontier AI →" (topic 6, minor title-phrasing difference from curriculum's "Advising Policy/Governance on Frontier AI" — not a bug, just a slash-to-"and" rendering choice). Both links correct.

### Topic 6 — Advising Policy and Governance on Frontier AI

**Result: PASS**

What I did: Loaded `level-10/topic-6.html`, no console errors. The "policy-tradeoff simulator" has 4 sliders (compute-threshold stringency, eval/red-team requirement, disclosure requirement, audit/enforcement intensity) driving 3 output metrics (innovation pace, safety assurance, enforceability). Swept all 4 sliders together via JS from 0% to 100% in 25% steps and recorded all three metrics each time: innovation pace fell monotonically (100→79→58→36→15) and safety assurance rose monotonically (0→24→48→71→95) as expected, but enforceability followed a genuine non-monotonic "sweet spot" curve — 16→48→81→87→55 — peaking at 75% stringency and falling at 100%, exactly matching the quiz's claim about enforceability degrading under excessive stringency. Screenshotted the 100%-stringency state: three color-coded progress bars (red/green/amber) and a live narrative caption "Very heavy regime: safety assurance is high, but innovation pace is badly constrained and enforceability is starting to slip as compliance complexity grows" — accurately describing the exact numbers shown. Well-implemented, no bugs.

Quiz: selected indices [0,1,1,1] for the 4 questions (verified correct from embedded answer key), clicked "Check answers" — graded 4/4 correct (100%), topic marked complete.

Content accuracy: definition, subtopics (governance landscape EU/US/China, frontier-specific governance tools, policymaker's information problem, international coordination limits) and learning objective match curriculum.md Level 10 Topic 6 exactly.

Navigation: prev "← AGI-Adjacent Research Directions" (topic 5), next "Leading Research Organizations or Labs →" (topic 7). Both correct.

### Topic 7 — Leading Research Organizations or Labs

**Result: PASS**

What I did: Loaded `level-10/topic-7.html`, no console errors. The "lab resource-allocation game" has 4 auto-rebalancing sliders (capabilities, safety, infrastructure, exploratory/blue-sky) driving research-output, team-morale, and long-term-impact readouts. At the default (40/20/25/15) the dashboard showed output 31, morale 100, impact 23 with a "reasonably balanced portfolio" message. Drove `ra-slider-capabilities` to 80% and `ra-slider-safety` to 5% via JS — team morale dropped sharply from 100 to 35, output rose to 44, long-term impact fell to 20, and a new warning appeared: "Safety is critically underfunded at 5% — near-term output may look strong, but this is a high-risk allocation for a frontier lab." Screenshotted and confirmed all 3 progress bars (output/morale/impact) visually re-rendered with morale's bar shrinking substantially. This exactly matches quiz Q3's claim that morale is penalized when capabilities funding vastly outpaces safety funding — genuinely interactive and correctly modeled.

Quiz: selected index 1 for all 4 questions (verified correct from embedded answer key), clicked "Check answers" — graded 4/4 correct (100%), topic marked complete.

Content accuracy: definition, subtopics (research prioritization under uncertainty, building a research culture, resourcing tradeoffs/2026 compute crunch, external responsibilities) and learning objective match curriculum.md Level 10 Topic 7 exactly.

Navigation: prev "← Advising Policy and Governance on Frontier AI" (topic 6), next "Defining State of the Art in a Subfield →" (topic 8). Both correct.

### Topic 8 — Defining State of the Art in a Subfield

**Result: PASS**

What I did: Loaded `level-10/topic-8.html`, no console errors. The "SOTA-frontier plotter" has 2 sliders (candidate method's capability score, cost) plotted against a fixed Pareto frontier of 5 gray/green reference methods. At capability=55/cost=45 it read "Below the current frontier — dominated by existing methods (frontier capability at this cost ≈ 68)" and the "Lock in" button was disabled. Drove `sf-cap` to 90 via JS — status changed to "Advances the state of the art at this cost point (frontier capability at this cost ≈ 68)" and the "Lock in as new frontier point" button became enabled. Clicked it via `computer`: screenshotted before/after and confirmed my point rendered as a locked orange dot labeled "your method #1 (locked)" now sitting ON the frontier line, while the two previously-frontier methods it surpassed (Method D, Method E) grayed out as now-dominated points — the frontier genuinely moved. Immediately after locking, re-reading the same position correctly reported "Matches current SOTA — not a clear advance (frontier capability at this cost ≈ 90)" since my point was now part of the frontier itself, and the Lock-in button correctly disabled again. This is a well-built, logically consistent simulation with no bugs found.

Quiz: selected indices [1,1,1,0] for the 4 questions (verified correct from embedded answer key), clicked "Check answers" — graded 4/4 correct (100%), topic marked complete.

Content accuracy: definition, subtopics (how SOTA gets established, half-life of SOTA claims, building durable influence, recognizing stale SOTA framing) and learning objective match curriculum.md Level 10 Topic 8 exactly.

Navigation: prev "← Leading Research Organizations or Labs" (topic 7), next reads "End of course →" — confirmed via DOM inspection this is a plain non-interactive `<span>` inside the nav (no href/onclick), correctly non-clickable since this is the final topic of the entire 80-topic curriculum. **This completes Level 10 — all 8 topics pass.**

---

## Summary

All 16 topics across Level 9 (Expert+/Research-Adjacent) and Level 10 (Master) were tested end-to-end: page load + console check, genuine widget interaction (sliders/buttons/textareas driven via both real clicks/typing and JS-dispatched events, with before/after screenshots), full quiz completion with answer verification against the embedded answer key, content-accuracy comparison against `research/curriculum.md`, and prev/next navigation checks.

**Result: 16/16 topics PASS overall** (all quizzes graded correctly, all navigation links correct, all content matches curriculum, no console errors anywhere). Two topics had a passable widget with a genuine content/UX bug worth fixing:

1. **Level 9 Topic 1 (Novel Architectures: SSMs/Mamba)** — the "relative compute" bars for Transformer/SSM/Hybrid are each normalized independently to their own min/max, so at any given sequence length all three bars render at the same height (e.g. all "100%" at max length), visually implying equal cost when the whole point of the exercise is that SSM cost grows asymptotically slower than Transformer's. The retrieval-accuracy curve and quiz are unaffected and correct.

2. **Level 9 Topic 3 (Scalable Oversight debate exercise)** — "Argument A" is the true claim in all 6 hardcoded rounds. Always clicking the first option yields a perfect 6/6 score without evaluating any content, defeating the exercise's purpose of experiencing a weak judge being fooled by increasingly sophisticated false arguments.

3. **Level 10 Topic 4 (Benchmark-design workbench)** — the "Weakness flags" list is static: the same 5 flags display verbatim regardless of slider/dropdown configuration, with only their box color (red→green) responding to the aggregate score. At a 96/100 "best" configuration, logically-inapplicable flags (e.g. "Judge-bias risk" while using human grading) are still shown, just recolored green — contradicting the exercise's claim that "weakness flags update live."

No other bugs, broken widgets, incorrect quiz grading, or navigation errors were found across the other 13 topics.

