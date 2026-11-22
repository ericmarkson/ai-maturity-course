# Syllabus — Levels 7-8 (Advanced+ / Expert)

Source topics: `research/topics-seed.md`, "Level 7" and "Level 8" blocks. Written concept-first and tool-agnostic per project convention — named tools (LangSmith, Langfuse, OpenTelemetry, promptfoo, DeepEval, LangGraph, CrewAI, AutoGen, PPO, DPO, etc.) appear only as brief illustrative examples, never as the organizing structure.

---

## Level 7 — Advanced+

### Agentic Systems (Tool Use, Function Calling, ReAct)

**Definition:** Agentic systems are LLM-based programs that can decide to call external tools or functions and use the results to keep reasoning, instead of producing an answer in one single pass.

**Subtopics:**
- Function/tool calling — structured schemas (name, description, parameters) the model can invoke
- The ReAct pattern: reason → act → observe → repeat
- Tool selection and argument construction from natural-language intent
- Handling tool errors, unexpected outputs, and retries

**Learning objective:** The learner can trace a ReAct-style transcript and correctly label each step as "reasoning," "acting," or "observing," and can design a minimal tool schema for a given task.

**Hands-on exercise idea:** A scripted chat interface where a canned "LLM" (JSON responses keyed to conversation state) picks from a small set of fake tools (calculator, weather lookup, search) shown as clickable tool-call cards, letting the learner step through a full ReAct loop turn by turn and watch reasoning/action/observation panes update.

---

### Multi-Agent Orchestration

**Definition:** Multi-agent orchestration is coordinating several specialized AI agents that each own part of a task, communicating and handing off work to one another to complete something none could do well alone.

**Subtopics:**
- Orchestration patterns: supervisor/manager, peer-to-peer handoff, and linear pipeline
- Role specialization (e.g. planner, researcher, critic agents)
- Shared state and message passing between agents
- Failure modes: infinite hand-off loops, conflicting goals, runaway cost

**Learning objective:** The learner can diagram a multi-agent workflow for a sample task, correctly labeling each agent's role and where hand-offs occur, and can identify at least one failure mode in a flawed design.

**Hands-on exercise idea:** A drag-and-drop diagram builder where learners wire together 3-4 agent nodes (labeled with roles) and message arrows for a sample task (e.g. "write and fact-check a blog post"), then click "simulate" to play a scripted step-by-step trace through their own wiring — flagging a warning if they've created a cycle.

---

### Agent Memory (Short/Long-Term)

**Definition:** Agent memory is how an AI agent retains information across a single conversation (short-term) or across sessions over time (long-term) so it can act on past context instead of starting fresh each turn.

**Subtopics:**
- The context window as working/short-term memory
- Long-term memory stores (vector databases, structured logs, rolling summaries)
- Memory write policies — what gets saved, summarized, or discarded
- Memory retrieval and re-injection into future prompts

**Learning objective:** The learner can distinguish short-term from long-term memory in a given agent design and propose a summarization/retrieval strategy that keeps memory useful without exceeding context limits.

**Hands-on exercise idea:** A simulated "memory inspector" where the learner chats with a scripted agent over several turns while a side panel shows the context window filling up, then visibly triggers auto-summarization of older turns into a "long-term memory" list once a token budget is exceeded.

---

### Advanced RAG (Hybrid Search, Reranking, Chunking)

**Definition:** Advanced RAG is a set of techniques that improve on basic retrieval-augmented generation by combining multiple search strategies and refining which retrieved chunks actually reach the model.

**Subtopics:**
- Chunking strategies (fixed-size, semantic, overlapping) and their tradeoffs
- Hybrid search — combining keyword/BM25 search with vector/embedding search
- Reranking retrieved candidates before they're passed to the model
- Evaluating retrieval quality separately from final generation quality

**Learning objective:** The learner can explain how chunk size and overlap affect retrieval quality, and can walk through a hybrid-search-plus-reranking pipeline explaining what each stage filters or reorders.

**Hands-on exercise idea:** An interactive pipeline visualizer where a chunk-size slider re-splits a sample document in real time, and separate toggles for "keyword," "vector," and "rerank" stages show how the ranked result list shifts at each stage against a fixed query, using a small hardcoded document/query set (no real embeddings needed).

---

### Tracing/Observability for AI Systems

**Definition:** Tracing/observability means capturing structured records of every step an AI system takes — prompts, tool calls, latencies, costs, errors — so the system can be debugged and monitored in production.

**Subtopics:**
- Spans and traces — representing one LLM/agent run as a tree of nested steps
- Key signals to capture: inputs/outputs, token usage, latency, cost, errors
- Aggregating traces into dashboards and metrics (error rate, p95 latency, cost per run)
- Standardization efforts (e.g. OpenTelemetry's GenAI semantic conventions) and vendor tools (LangSmith, Langfuse) as illustrative examples only

**Learning objective:** The learner can read a nested trace of an agent run, identify which span caused a slowdown or error, and list the minimum fields a useful LLM trace should capture.

**Hands-on exercise idea:** A simulated trace viewer (a mini flame-graph / waterfall chart) built from a hardcoded JSON trace with nested spans (LLM call, tool call, sub-agent call); clicking a span expands its details (latency, tokens, status), and one deliberately slow or failing span is visually highlighted for the learner to spot.

---

### RLHF/RLAIF and Alignment Techniques

**Definition:** RLHF (reinforcement learning from human feedback) and RLAIF (from AI feedback) are training techniques that steer a model's behavior toward preferred outputs using a reward signal built from human or AI preference judgments.

**Subtopics:**
- The RLHF pipeline: supervised fine-tuning → reward model → RL optimization (e.g. PPO)
- RLAIF — substituting AI-generated preference labels for human ones
- Reward-model-free alternatives such as Direct Preference Optimization (DPO)
- Reward hacking and over-optimization risk

**Learning objective:** The learner can outline the stages of an RLHF pipeline in order, explain in plain terms what a reward model is scoring, and give one example of reward hacking.

**Hands-on exercise idea:** A simulated "preference labeling" mini-game where the learner picks the better of two canned model responses across several prompts, watches a toy "reward model score" update, and sees a chart showing how a simulated policy's outputs shift toward the preferred style over several rounds.

---

### Quantization and Distillation

**Definition:** Quantization shrinks a model by storing its weights with fewer bits; distillation trains a smaller "student" model to mimic a larger "teacher" model — both trade some accuracy for speed, size, or cost.

**Subtopics:**
- Numeric precision basics (FP32/FP16/INT8/INT4) and why lower precision saves memory and compute
- Post-training quantization vs. quantization-aware training
- Knowledge distillation — teacher/student training and soft labels
- The accuracy vs. latency vs. cost tradeoff curve

**Learning objective:** The learner can explain why reducing precision from FP16 to INT8 shrinks model size, and can describe in one sentence what a distillation training loop optimizes for.

**Hands-on exercise idea:** An interactive tool with a "bit width" slider (32/16/8/4) and a "student model size" percentage slider that update a simulated chart of model size, inference speed, and accuracy — driven by a simple hardcoded formula/lookup table, not a real model — so learners can feel the shape of the tradeoff.

---

### Scaling Laws

**Definition:** Scaling laws are empirical relationships showing how model performance improves in a predictable way as model size, dataset size, and compute all increase together.

**Subtopics:**
- The core scaling variables: parameters, data (tokens), and compute (FLOPs)
- Compute-optimal training (e.g. the Chinchilla finding that many early models were undertrained relative to their size)
- Diminishing returns and the log-linear shape of scaling curves
- How scaling laws inform tradeoff decisions: bigger model vs. more data vs. more training steps

**Learning objective:** The learner can read a loss-vs-compute scaling chart and explain what it implies about whether to add more parameters or more training data for a fixed compute budget.

**Hands-on exercise idea:** An interactive chart where dragging two of three sliders (parameters, data size, compute budget) drives a scripted formula approximating a scaling-law curve, updating a projected "loss" value and plotting the resulting point on a log-log chart next to reference points.

---

## Level 8 — Expert

### Autonomous Agent Architecture (Planning, Self-Correction, Guardrails)

**Definition:** Autonomous agent architecture is the overall design of how an agent breaks a goal into steps, checks its own work, and stays within safe operating bounds without constant human input.

**Subtopics:**
- Planning strategies — task decomposition, plan-and-execute vs. purely reactive loops
- Self-correction/reflection — the agent critiquing and revising its own output
- Guardrails — input/output filters, permission scopes, human-in-the-loop checkpoints
- Termination conditions — recognizing "done," or when to stop and escalate to a human

**Learning objective:** The learner can design a plan → execute → reflect loop for a sample autonomous task and specify at least two guardrails that would prevent it from taking a harmful or costly action unsupervised.

**Hands-on exercise idea:** A simulated autonomous-agent console where the learner sets a goal, watches a scripted agent generate a step-by-step plan and execute it one step at a time, and must click approve/deny at a "guardrail check" whenever a step is tagged risky before the simulation continues.

---

### Production ML Systems at Scale

**Definition:** This is the engineering discipline of running ML/LLM systems reliably for real users — serving infrastructure, load, cost, and failure handling — not just model quality.

**Subtopics:**
- Serving patterns: batching, caching, streaming responses, load balancing across model instances
- Latency vs. throughput vs. cost tradeoffs
- Rollout strategies: canary releases, shadow deployment, A/B testing model versions
- Graceful failure handling: fallback models, timeouts, rate limiting, circuit breakers

**Learning objective:** The learner can explain the difference between optimizing for latency and optimizing for throughput, and can choose an appropriate rollout strategy (canary, shadow, or full) for a given risk scenario.

**Hands-on exercise idea:** A simulated traffic dashboard where sliders for batch size and cache-hit rate update live simulated latency/throughput/cost numbers, plus a toggle that routes a percentage of simulated traffic to a "canary" model version and shows a live error-rate comparison against the control version.

---

### Model Safety and Red-Teaming

**Definition:** Model safety and red-teaming is the practice of deliberately trying to make an AI system fail, misbehave, or be misused, in order to find and fix weaknesses before real users do.

**Subtopics:**
- Attack categories: prompt injection, jailbreaks, data exfiltration, goal hijacking
- Manual vs. automated red-teaming (scripted adversarial probes, other models used as attackers)
- Turning findings into fixes: guardrails, filters, policy/prompt changes, regression tests
- Responsible disclosure and safety evaluation reporting

**Learning objective:** The learner can classify a given adversarial prompt example into an attack category and propose a concrete mitigation (input filter, permission scope, output check) for it.

**Hands-on exercise idea:** A "red-team the chatbot" mini-game where learners select and combine canned adversarial prompt fragments against a scripted toy chatbot to see which combinations "break" it (per a hardcoded ruleset), then are shown which guardrail would have blocked that specific attack.

---

### Constitutional AI and Alignment Methods

**Definition:** Constitutional AI is an alignment approach where a model is trained to critique and revise its own outputs against a written set of principles ("constitution"), reducing reliance on large-scale human-labeled preferences.

**Subtopics:**
- The idea of a "constitution" — explicit written principles guiding model behavior
- Self-critique and revision loops, where the model checks its own draft against the principles
- How this reduces (but doesn't eliminate) the need for human preference labeling
- Constitutional AI as complementary to, not a replacement for, RLHF/RLAIF

**Learning objective:** Given a sample constitution (a short list of principles) and a draft model response, the learner can identify which principle the response violates and describe what a revised response should look like.

**Hands-on exercise idea:** An interactive exercise displaying a fixed 3-4-principle "constitution" alongside a series of canned draft responses; the learner clicks which principle each draft violates, then reveals a scripted "revised" response to compare against their own answer.

---

### Mixture-of-Experts Architectures

**Definition:** Mixture-of-experts (MoE) is a model architecture with many specialized "expert" sub-networks, where only a small subset is activated for any given input — keeping compute cost low while total model capacity stays high.

**Subtopics:**
- Experts and the gating/router network that decides which experts run per token
- Sparse activation — why activating only a few experts is cheaper than a dense model of the same total size
- Load balancing across experts, and the failure mode of a few experts dominating all routing
- Tradeoffs: more total parameters/knowledge vs. routing complexity and memory footprint

**Learning objective:** The learner can explain why an MoE model with N total parameters can be cheaper to run than a dense model with N parameters, and describe what the router/gating network does.

**Hands-on exercise idea:** A simulated token-routing visualizer where a typed sentence has each token "routed" (via a simple hardcoded or randomized rule) to 1-2 of 6 visible "expert" boxes, with a running tally showing how evenly load is spread across experts.

---

### Multi-Modal Models (Vision-Language, Audio)

**Definition:** Multi-modal models are AI systems that can process and/or generate more than one type of data — such as text, images, and audio — within a single model.

**Subtopics:**
- How different modalities get encoded into a shared representation space
- Vision-language models — image understanding, captioning, visual question answering
- Audio modalities — speech-to-text, text-to-speech, and native audio understanding
- Fusion strategies: early vs. late fusion of modalities, and cross-modal attention

**Learning objective:** The learner can describe, at a conceptual level, how an image and a text prompt both end up as inputs a transformer can process, and give one example use case each for vision-language and audio-language models.

**Hands-on exercise idea:** A simulated "multi-modal input inspector" where a learner picks a sample image and types a question, and the UI shows a mocked step-by-step breakdown (image split into patches, text split into tokens, both projected into a shared embedding list) followed by a canned model answer — illustrating the pipeline without a real model.

---

### Pretraining Considerations

**Definition:** Pretraining considerations are the major design decisions made before training a foundation model from scratch, covering what data to use, how to prepare it, and what objective to train against.

**Subtopics:**
- Data curation and mixture — sourcing, deduplication, filtering, and balancing domains/languages
- Data contamination and quality control (avoiding test-set leakage, toxic or low-quality content)
- Pretraining objectives (e.g. next-token prediction) and tokenizer design choices
- Compute/infrastructure planning tied to pretraining decisions (checkpointing, data pipeline throughput)

**Learning objective:** The learner can list at least three data-quality decisions that must be made before pretraining begins, and explain why the data mixture (e.g. percentage of code vs. web text vs. books) affects downstream model behavior.

**Hands-on exercise idea:** An interactive "data mixture" tool with sliders for different data-source percentages (web text, code, books, conversational data) that updates a simulated bar chart of predicted downstream capability scores (coding, reasoning, chat quality) using a simple hardcoded weighting formula, letting learners see the effect of over- or under-weighting a source.

---

### Rigorous Eval Design (LLM-as-Judge, Statistical Significance)

**Definition:** Rigorous eval design is the practice of building AI system evaluations that produce trustworthy, reproducible results — including using another LLM as an automated judge and applying statistical rigor to the resulting scores.

**Subtopics:**
- LLM-as-judge — using a model to score or compare outputs, and its known biases (position bias, verbosity bias, self-preference bias)
- Calibrating judges against human ratings, and rubric design
- Statistical significance basics for evals — sample size, confidence intervals, avoiding false conclusions from small eval sets
- Building regression test suites so eval scores are tracked over time (tools like promptfoo, DeepEval as illustrative examples)

**Learning objective:** The learner can identify at least one bias risk in an LLM-as-judge setup and explain why a 2-percentage-point difference on a 20-example eval set may not be statistically meaningful.

**Hands-on exercise idea:** A simulated eval dashboard where clicking "run eval" repeatedly on a small fixed set of test cases (with randomized pass/fail outcomes weighted to a hidden true rate) shows the reported pass rate jumping around run to run, contrasted with a second version using a much larger simulated sample size to visually demonstrate why sample size matters for trustworthy conclusions.
