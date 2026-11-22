# Syllabus — Level 9 (Expert+ / Research-Adjacent) & Level 10 (Master)

Source seed: `research/topics-seed.md`, "Level 9" and "Level 10" sections. Grounded against 2026 web search (see notes inline where terminology/trends were verified) so the framing reflects where frontier research actually is in mid-2026, not stale training-data snapshots.

---

## Level 9 — Expert+ / Research-Adjacent

At this level the learner stops being a consumer of established techniques and starts reading/evaluating primary research: papers, architecture reports, alignment agendas. Exercises shift from "build a toy version" to "reason about a research tradeoff like a reviewer would."

### Novel Architectures (State-Space Models, Mamba, and Beyond)

**Definition:** Architectures that try to beat or complement the Transformer by processing sequences with linear-time recurrence instead of quadratic-cost attention.

**Subtopics:**
- Selective state-space models (Mamba/Mamba-2) and the structured state-space duality (SSD) that connects them mathematically to linear attention
- Mamba-3 and complex-valued state transitions for better state-tracking (2026 development)
- Hybrid architectures (Jamba, Zamba-style) that interleave SSM layers with a few attention layers to keep long-range retrieval strong
- The core tradeoff: linear-cost compute and cheap long-context inference vs. weaker exact in-context retrieval than full attention

**Learning objective:** Explain, in your own words, why an SSM layer is asymptotically cheaper than self-attention, and identify which class of tasks (e.g., "find token 12,000 in the context") exposes an SSM's weakness relative to a Transformer.

**Hands-on exercise idea:** A browser-based side-by-side "cost simulator" where a slider sets sequence length and the page animates/computes relative compute (O(n²) vs O(n)) and a mocked "needle in haystack" retrieval accuracy curve for a Transformer vs. an SSM vs. a hybrid, all from pre-baked/approximated formulas — no real model calls.

---

### Mechanistic Interpretability Research

**Definition:** Reverse-engineering a trained model's internal computation into human-understandable algorithms ("circuits"), rather than just observing input/output behavior.

**Subtopics:**
- Sparse autoencoders (SAEs) for decomposing polysemantic activations into monosemantic features, and the superposition hypothesis they're built to address
- Circuit discovery (induction heads, indirect-object-identification circuits, greater-than circuits) as worked examples of "solved" mini-circuits
- Causal tracing / activation patching as the core experimental method for testing a circuit hypothesis
- Open problems in 2026: feature consistency/stability across SAE training runs, and extending interpretability beyond text to code, audio, and vision-language models

**Learning objective:** Given a simple pattern a toy model exhibits, design a causal-intervention experiment (what activation would you patch, and what output change would confirm your hypothesis) that could confirm or falsify a proposed mechanism for it.

**Hands-on exercise idea:** An interactive "circuit detective" game: a small fixed toy transformer's attention pattern (precomputed, visualized as a heatmap grid) is shown for a handful of synthetic sentences, and the learner clicks attention heads to "patch" them and observes a precomputed before/after prediction change, building intuition for activation patching without running a real model in-browser.

---

### AI Safety / Alignment Theory and Scalable Oversight

**Definition:** The research problem of how humans (or weaker AI systems) can reliably supervise and correct AI systems that are as capable as, or more capable than, the supervisor.

**Subtopics:**
- Weak-to-strong generalization: training a strong model on labels from a weaker overseer and studying whether/how it generalizes beyond the overseer's own accuracy
- Debate as an oversight mechanism: two capable models argue opposing sides in front of a weaker judge, testing whether the judge's accuracy improves as debater capability increases
- Iterative amplification and recursive reward modeling as alternative scalable-oversight paradigms
- Known failure modes: confirmation bias in the overseer, sycophancy, and evaluators that reward persuasion over correctness

**Learning objective:** Compare debate-based oversight and weak-to-strong generalization as two different bets on how to supervise a superhuman system, and articulate one concrete failure mode each approach is vulnerable to.

**Hands-on exercise idea:** A simulated "debate oversight" browser game where the learner plays the weak judge choosing between two pre-scripted competing arguments (one true, one a plausible-sounding lie) of increasing sophistication across rounds, tracking the judge's (the learner's) accuracy over time to illustrate how persuasive-but-wrong arguments can fool a weaker evaluator.

---

### Distributed Systems for Frontier-Scale Training

**Definition:** The systems engineering discipline of coordinating tens of thousands of accelerators (GPUs/TPUs) to train a single model without communication overhead dominating compute time.

**Subtopics:**
- Parallelism strategies: data, tensor, pipeline, and expert parallelism, and why frontier runs combine several simultaneously (3D/4D parallelism)
- Interconnect and topology: why network bandwidth/latency (InfiniBand/RoCE, all-reduce patterns) becomes the bottleneck, not raw FLOPs, at frontier scale
- Fault tolerance at scale: checkpointing cadence and straggler/failure handling when a training run spans 10,000+ devices for weeks
- The 2026 reality: compute-crunch dynamics (multi-month GPU lead times), and clusters scaling toward hundreds of thousands of accelerators across sites

**Learning objective:** Given a hypothetical cluster size and model size, reason about which parallelism strategy (or combination) is appropriate and why communication topology, not just device count, determines effective training throughput.

**Hands-on exercise idea:** A visual "cluster simulator" where the learner drags sliders for model size, number of devices, and interconnect bandwidth, and a diagram + computed estimate shows how training throughput degrades as communication overhead grows, illustrating why naive scaling doesn't linearly speed up training.

---

### Synthetic Data Generation and Curation

**Definition:** Using AI models to generate (and then filter/curate) training data, instead of relying solely on human-produced or scraped data.

**Subtopics:**
- Why synthetic data matters now: high-quality generation is cheap while real, high-quality human-annotated data is scarce and often proprietary
- Generation pathways: direct frontier-model prompting with quality filtering, self-instruct/self-questioning pipelines, and distillation from a stronger "teacher" model
- Curation and quality control: deduplication, diversity filtering, human-in-the-loop down-selection, and the risk of "model collapse" from training on unfiltered self-generated data
- The hybrid consensus: synthetic data augments but does not replace real data as the anchor of quality and grounding

**Learning objective:** Explain the tradeoff between synthetic-data scale and synthetic-data quality/diversity, and describe at least one concrete failure mode (e.g., model collapse, distributional narrowing) that unchecked synthetic-data reliance produces.

**Hands-on exercise idea:** An in-browser toy simulation where a small synthetic "dataset" (a tiny distribution of sample values/words) is repeatedly "regenerated" by resampling from its own outputs across simulated generations, visually showing distributional collapse/narrowing over iterations versus a version where a fixed fraction of real data is re-injected each round.

---

### Reward Model Design

**Definition:** Building the learned "scoring function" that tells an RL-trained model which outputs are better, and defending that scoring function against being gamed.

**Subtopics:**
- How preference-based reward models are trained from pairwise human/AI comparisons (Bradley-Terry style preference modeling)
- Reward hacking: models exploiting spurious correlations (length, formatting, sycophancy) that correlate with reward but not true quality
- Mitigations: reward ensembles, reward shaping (bounded rewards with rapid-then-diminishing growth), and adversarial reward auditing
- RLHF vs. RLAIF vs. RLVR (verifiable rewards) as different sources of the reward signal, each with distinct hacking surfaces

**Learning objective:** Given a described reward model and a model behavior that scores unexpectedly high, diagnose the likely spurious correlation being exploited and propose one concrete mitigation.

**Hands-on exercise idea:** A browser "reward hacking lab": the learner sees a fixed toy reward function (e.g., a formula that scores text by length + keyword presence) and a set of candidate model outputs; they must identify which outputs are gaming the formula versus genuinely good, then adjust the formula's weights via sliders and see which gamed outputs stop scoring highly.

---

### Long-Context Architectures

**Definition:** Techniques that let models effectively use very large context windows (hundreds of thousands to millions of tokens) without cost or accuracy collapsing.

**Subtopics:**
- Why naive attention doesn't scale: quadratic KV-cache growth, and the gap between "advertised" and "effective" context length
- Efficient-attention techniques: sparse/compressed attention (e.g., compressed + heavily-compressed hybrid attention patterns), FlashAttention-style IO-aware kernels, and Ring Attention for distributed sequence parallelism
- Memory and caching strategies: KV-cache compression and prompt caching as complements to raw architectural changes
- The 2026 shift: context windows plateauing as focus moves to inference-time scaling and smarter context management rather than ever-larger windows

**Learning objective:** Distinguish "advertised context length" from "effective context length" and explain two distinct techniques (one algorithmic, one systems-level) used to make long context usable in practice.

**Hands-on exercise idea:** An interactive "needle in a haystack" visualizer where the learner sets context length and needle position via sliders, and a precomputed/approximated accuracy heatmap (based on published patterns of real long-context evals) renders live, showing how retrieval accuracy degrades in the middle of very long contexts ("lost in the middle").

---

### Cross-Disciplinary AI (Biology, Robotics, Science)

**Definition:** Applying foundation-model techniques outside language — to protein structure, molecular design, robotic control, and general scientific discovery.

**Subtopics:**
- Structural biology: AlphaFold 3-class models predicting protein/ligand/nucleic-acid structures, and open-weight alternatives (e.g., ESM-family models) enabling in-house fine-tuning
- Molecular design and drug discovery: models predicting binding affinity jointly with structure, and emerging scaling laws in molecular AI
- Embodied AI/robotics: vision-language-action models that connect perception, language instruction, and physical control
- Scientific reliability: the hallucination/reliability problem when generative AI is used to propose or summarize scientific claims

**Learning objective:** Describe one concrete way a foundation-model technique (e.g., attention, diffusion, self-supervised pretraining) transferred from language into a scientific domain, and one domain-specific reliability risk that doesn't exist in a pure chat setting.

**Hands-on exercise idea:** A simplified in-browser "protein folding toy": a short synthetic amino-acid-letter sequence maps (via a small precomputed lookup/heuristic, not a real model) to a 2D folded-shape animation, letting the learner mutate letters and see the shape prediction change, illustrating structure-from-sequence prediction conceptually without any real biology model.

---

## Level 10 — Master

At this level the learner is evaluated not on understanding existing research but on the judgment to originate, critique, and steer it — the skills of someone leading a lab, defining a subfield, or shaping policy. Exercises become reflective/design exercises: structured decision-making and critique rather than "run a simulation."

### Frontier Model Pretraining and Research

**Definition:** The end-to-end research and engineering discipline of designing, training, and validating the next generation of foundation models from scratch.

**Subtopics:**
- Pretraining data strategy: composition, deduplication, and the frontier-lab trend of using synthetic data to supplement scarce real high-quality data
- Architecture and objective decisions made before a run starts (attention variant, MoE routing, context length target) and how they're validated at small scale before committing to a frontier-scale run
- Scaling-law-informed compute allocation: choosing model size vs. data size vs. training duration under a fixed compute budget
- Post-training pipeline design: how pretraining, RLHF/RLAIF, and safety fine-tuning stages fit together into one coherent model lifecycle

**Learning objective:** Given a fixed compute budget and a target capability profile, produce a defensible high-level pretraining plan (data mix, architecture choice, scaling strategy) and justify each choice against a tradeoff.

**Hands-on exercise idea (design exercise):** A browser "pretraining plan" worksheet/simulator: the learner allocates a fixed compute budget across sliders (model size, dataset size, training steps) and the page shows a precomputed scaling-law-style loss estimate curve, then asks the learner to write a 3-sentence justification for their allocation — the tool visualizes tradeoffs, the reasoning is the actual exercise.

---

### Original Contributions to Alignment/Safety Paradigms

**Definition:** Proposing new frameworks or techniques for keeping advanced AI systems safe and aligned, not just applying existing ones.

**Subtopics:**
- The landscape of existing paradigms (RLHF/RLAIF, constitutional AI, debate, weak-to-strong generalization) as a baseline to build on or critique
- What counts as a genuine contribution: a new failure mode identified, a new mitigation technique, or a new theoretical framing (e.g., reward hacking as objective compression + optimization amplification)
- Publishing and stress-testing an idea: red-teaming your own proposal, adversarial review, reproducibility
- The role of model-welfare and superintelligence-governance framing entering mainstream alignment discourse in 2026

**Learning objective:** Draft an original (even if modest) alignment technique or failure-mode hypothesis, and pressure-test it by articulating the strongest counterargument against your own idea.

**Hands-on exercise idea (reflective exercise):** A structured in-browser "red-team your own idea" worksheet: the learner writes a short alignment proposal into a text box, then the page presents a checklist of classic failure-mode lenses (reward hacking, distributional shift, deceptive alignment, Goodhart's law) prompting a written self-critique against each — pure reflection, no backend needed.

---

### Novel Theoretical Contributions (Papers, Architectures)

**Definition:** Producing new, formally or empirically grounded ideas that advance the field's shared body of knowledge — the currency of academic/research AI.

**Subtopics:**
- Anatomy of a strong AI research paper: problem framing, related-work positioning, a falsifiable claim, and evidence proportional to the claim's strength
- Novelty vs. incrementalism: distinguishing a genuinely new contribution from a re-packaging of an existing method
- Peer review norms: what reviewers at top venues (NeurIPS/ICML/ICLR-class) actually scrutinize (reproducibility, ablations, honest limitations sections)
- Open science practices: releasing code/weights/data, and the tension between openness and frontier-safety concerns

**Learning objective:** Given a one-paragraph research idea, structure it into a paper-shaped outline (claim, evidence plan, ablations, limitations) that a rigorous reviewer would find complete.

**Hands-on exercise idea (design exercise):** An in-browser "paper outline builder" where the learner types a research idea into one box and the tool scaffolds it into labeled sections (claim, related work gap, proposed method, expected ablations, limitations) with guiding prompt questions for each — a structured writing aid, not a real paper generator.

---

### Designing Eval and Safety Benchmarks for the Field

**Definition:** Creating the standardized tests the whole field will use to measure capability or safety — shaping what "good" means for everyone downstream.

**Subtopics:**
- What makes a benchmark good: construct validity (does it measure what it claims to), resistance to gaming/contamination, and statistical power
- Capability benchmarks vs. safety/red-team benchmarks, and why the latter needs adversarial, continuously-refreshed design
- LLM-as-judge and process-based evaluation as scalable-oversight-adjacent benchmark techniques, and their known biases
- Benchmark lifecycle: saturation, deprecation, and the "benchmark becomes a target" problem (Goodhart's law applied to eval design)

**Learning objective:** Design a benchmark specification (what it measures, how items are constructed, how gaming is detected/prevented) for a stated capability or safety property, and identify the specific way it could saturate or be gamed.

**Hands-on exercise idea (design exercise):** A browser worksheet where the learner fills in a benchmark spec template (target construct, item-generation method, scoring rubric, anti-gaming safeguard) for a property of their choosing, then the tool runs it through a checklist of common benchmark-design pitfalls (data contamination, spurious cues, judge bias) for self-assessment.

---

### AGI-Adjacent Research Directions

**Definition:** The open research questions clustered around what it would take to build (or safely avoid prematurely building) systems with broad, human-level-or-beyond general capability.

**Subtopics:**
- Why AGI still lacks a consensus technical definition, and the practical proxies the field uses instead (economically valuable task coverage, generality across domains, sample efficiency)
- Capability trajectories: what current scaling/agentic/tool-use trends do and don't predict about generality
- Superintelligence and takeoff-speed debates: fast vs. slow takeoff scenarios and their differing safety implications
- Model welfare as an emerging, contested research question in 2026 discourse (whether advanced models could warrant moral consideration)

**Learning objective:** Articulate your own working definition of "AGI-adjacent progress" with explicit, falsifiable criteria, and explain why at least one commonly cited proxy metric is an imperfect measure of generality.

**Hands-on exercise idea (reflective exercise):** A browser "define your own benchmark for AGI" worksheet: the learner selects/weights candidate criteria (task breadth, sample efficiency, transfer to novel domains, etc.) via sliders, the tool shows how differently weighted definitions would rank a set of illustrative (fictional, pre-described) systems, surfacing how much a definition's criteria shape its conclusion.

---

### Advising Policy/Governance on Frontier AI

**Definition:** Translating technical frontier-AI realities into guidance usable by regulators, legislators, and international bodies.

**Subtopics:**
- The current governance landscape: the EU's risk-tiered prescriptive model, the US's voluntary-standards-plus-state-patchwork model (NIST AI RMF, state laws), and China's centrally administered filing/review model
- Frontier-specific governance tools: capability thresholds/compute thresholds for triggering oversight, frontier safety frameworks, and internal audit functions at AI developers
- The policymaker's information problem: frontier AI is built by a small number of firms, but capabilities and risks are hard for outsiders to verify independently
- International coordination efforts (e.g., global AI governance dialogues, summits) and their limits given competitive dynamics between states/labs

**Learning objective:** Given a specific frontier-AI risk scenario, draft a one-page policy recommendation that names the governance lever (disclosure requirement, compute threshold, audit mandate, etc.) best suited to it and explain why a different lever would be less effective.

**Hands-on exercise idea (reflective/design exercise):** A browser "policy lever matcher": the learner is shown a short risk scenario (randomly drawn from a small pre-written set) and must match it to the most appropriate governance lever from a fixed list, then write a short justification; the tool reveals expert-style reasoning notes for comparison afterward.

---

### Leading Research Organizations or Labs

**Definition:** The organizational and strategic skill of directing a research team or lab toward impactful frontier-AI work, distinct from doing the research yourself.

**Subtopics:**
- Research prioritization under uncertainty: portfolio thinking across capabilities, safety, and infrastructure bets with different risk/timelines
- Building a research culture: incentives for genuine novelty vs. publication-count optimization, and psychological safety for reporting negative results
- Resourcing tradeoffs unique to frontier AI: compute allocation across a lab's competing training runs and research bets (echoing the 2026 GPU compute-crunch reality)
- External responsibilities: safety review processes, responsible disclosure, and engagement with the governance landscape above

**Learning objective:** Given a fixed research team and compute budget, produce a prioritized portfolio of research bets across capability/safety/infrastructure categories and justify the allocation against at least one plausible alternative allocation.

**Hands-on exercise idea (design exercise):** A browser "lab portfolio allocator": the learner distributes a fixed budget of compute + headcount tokens across a set of pre-described candidate research projects (varying in risk/payoff/timeline), and the tool visualizes the resulting portfolio's balance (e.g., a risk/timeline scatter plot) for the learner to critique and adjust.

---

### Defining State of the Art in a Subfield

**Definition:** Being the person or team whose work others cite as the current best-known approach — setting the bar the rest of the field measures itself against.

**Subtopics:**
- How "state of the art" gets established: leaderboards, benchmark suites, and community consensus vs. marketing claims
- The half-life of SOTA claims in fast-moving subfields (e.g., how quickly a new architecture or technique gets surpassed) and what that implies about durable vs. fashionable contributions
- Building durable influence: reproducible results, open benchmarks/tooling that outlive a single paper, and mentorship/citation networks
- Recognizing when a subfield's "state of the art" framing itself is becoming stale (e.g., context-length races giving way to inference-time-scaling framing in 2026)

**Learning objective:** Given a subfield and its current leading approach, assess whether the field's chosen SOTA metric still reflects genuine progress or has become a Goodharted target, and propose what should replace or supplement it.

**Hands-on exercise idea (reflective exercise):** A browser timeline widget preloaded with a short illustrative history of a subfield's "SOTA metric" being surpassed and eventually critiqued/replaced (e.g., context-length leaderboards giving way to effective-context evals); the learner annotates at which point they believe the metric stopped reflecting real progress and writes a one-paragraph justification.

---

## Sources consulted (2026 grounding)

- [Mamba & State-Space Models: Transformer Alternative (2026)](https://localaimaster.com/blog/mamba-state-space-models-guide)
- [Mamba-3: Improved Sequence Modeling using State Space Principles](https://arxiv.org/html/2603.15569v1)
- [Mamba-3 and State-Space Models: The Post-Transformer Race (2026)](https://callsphere.ai/blog/mamba-3-state-space-models-post-transformer-race-2026)
- [Mechanistic Interpretability Explained: Circuits, Sparse Autoencoders, Causal Tracing, and AI Safety](https://medium.com/@adnanmasood/mechanistic-interpretability-explained-circuits-sparse-autoencoders-causal-tracing-and-ai-88ecc8d70b72)
- [Position: Mechanistic Interpretability Should Prioritize Feature Consistency in SAEs](https://arxiv.org/pdf/2505.20254)
- [Recommendations for Technical AI Safety Research Directions — Anthropic Alignment Science](https://alignment.anthropic.com/2025/recommended-directions/)
- [Weak-to-Strong Generalization: Eliciting Strong Capabilities With Weak Supervision](https://arxiv.org/pdf/2312.09390)
- [Confirmation bias: A challenge for scalable oversight](https://arxiv.org/pdf/2507.19486)
- [Efficient training of large language models on distributed infrastructures: a survey](https://link.springer.com/article/10.1007/s44336-026-00038-z)
- [The 2026 GPU Cluster Blueprint: Scaling AI Without Breaking the Bank](https://www.whaleflux.com/blog/the-gpu-cluster-blueprint-scaling-ai-without-breaking-the-bank/)
- [Synthetic Data for LLM Training: Decision Guide 2026](https://www.digitalapplied.com/blog/synthetic-data-generation-llm-training-decision-guide-2026)
- [Foundation model training data: How frontier labs build pre-training datasets at scale](https://toloka.ai/blog/how-frontier-labs-build-pre-training-datasets/)
- [Reward Hacking in the Era of Large Models: Mechanisms, Emergent Misalignment, Challenges](https://huggingface.co/papers/2604.13602)
- [Reward Shaping to Mitigate Reward Hacking in RLHF](https://arxiv.org/html/2502.18770v4)
- [DeepSeek-V4: Towards Highly Efficient Million-Token Context Intelligence](https://puiching-memory.github.io/TAAC_2026/papers/deepseek-v4/)
- [Long-Context LLM Infrastructure — million-token windows guide](https://introl.com/blog/long-context-llm-infrastructure-million-token-windows-guide)
- [Comparing AI Biology Foundation Models: AlphaFold 3 & ESM3](https://intuitionlabs.ai/articles/biology-foundation-models-comparison)
- [The transformative impact of AI-enabled AlphaFold 3](https://www.frontiersin.org/journals/artificial-intelligence/articles/10.3389/frai.2026.1739303/full)
- [Six AI Governance Priorities for 2026 — Partnership on AI](https://partnershiponai.org/resource/six-ai-governance-priorities/)
- [Governing frontier general-purpose AI in the public sector](https://arxiv.org/pdf/2604.06215)
- [How 2026 Could Decide the Future of Artificial Intelligence — Council on Foreign Relations](https://www.cfr.org/articles/how-2026-could-decide-future-artificial-intelligence)
- [Artificial General Intelligence in 2026](https://www.timetrex.com/blog/artificial-general-intelligence-in-2026)
