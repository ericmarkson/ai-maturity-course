# Hands-on QA Report — Levels 5-6

Status: IN PROGRESS. Append one topic section below as you finish testing it — do not wait until the end to write this file, a previous attempt was cut off by a session limit before writing anything and all its work was lost.

## Level 5, Topic 1: Transformer Architecture and Attention

**PASS**

- Loaded `level-5/topic-1.html`. No console errors. Page matches curriculum.md's "Transformer architecture and attention" section closely: definition, all 4 subtopics (self-attention/QKV, multi-head attention, encoder/decoder blocks, parallelization vs RNNs) all present verbatim in spirit.
- Exercise: "Attention heatmap: click a word, switch heads" widget with editable sentence "The cat sat on the mat because it was tired", clickable word tokens, an attention-head slider, and a live bar chart.
  - Clicked word "cat" (was "because" by default) — bar chart and "attends most to" text updated live to show cat's distribution (cat 36%, The 26%, sat 17%). Confirmed real DOM update, not static.
  - Dragged the attention-head slider from Head 1 ("local/nearby") to Head 3 ("broad/uniform") by clicking partway along the track — label changed and the bar chart redrew to a much flatter/more uniform distribution (6-14% per token instead of one dominant token). Genuine interaction confirmed with before/after screenshots.
- Quiz: 4 multiple-choice questions. Selected 3 correct answers and 1 deliberately wrong answer (Q3) to verify grading distinguishes right/wrong. Result: "3 / 4 correct (75%)", passing message shown, wrong answer highlighted red with explanation, correct answers highlighted green with explanations, topic auto-marked complete ("This topic has been marked complete.").
- Navigation: prev link → "Data Augmentation and Class Imbalance Handling" (Level 4 topic 9, correct adjacent topic), next link → "Pretrained Language Models (BERT/GPT-style)" (Level 5 topic 2, correct).
- No bugs found.

## Level 5, Topic 4: Embeddings and Vector Search

**PASS**

- Loaded `level-5/topic-4.html`. No console errors. Content matches curriculum.md's "Embeddings and vector search" section: definition, all 4 subtopics present.
- Exercise: "2D embedding scatter playground" with a query text box, "Place Query" button, and an SVG scatter plot with a legend (preset phrase / semantic nearest neighbor / keyword-match baseline / your query).
  - Default query "the famished feline meowed" was pre-placed, showing lines to nearest semantic neighbors ("My kitten chased a ball of yarn" — distance 73.3, etc.) despite zero literal word overlap, correctly demonstrating the core teaching point.
  - Changed query to "he wrote software for the mobile application" and clicked Place Query — the query dot visibly relocated on the scatter plot to a completely different cluster (near the coding/software-related preset phrase P7) and the nearest-neighbor line redrew accordingly. Confirmed genuine reactive recomputation, not a static image.
- Quiz: 4 questions, answered all correctly (embedding closeness = semantic similarity, synonym mapping explaining the zero-overlap example, why brute-force doesn't scale, keyword search's blind spot vs semantic search). All 4 marked correct with explanations.
- Navigation: prev → "Fine-Tuning vs. Prompting" (topic-3.html, correct), next → "Intro to Reinforcement Learning: Q-Learning and Policy Gradients" (topic-5.html, correct).
- No bugs found.

## Level 5, Topic 2: Pretrained Language Models (BERT/GPT-style)

**PASS** (with one minor content quality note)

- Loaded `level-5/topic-2.html`. No console errors. Content matches curriculum.md closely: definition covers masked LM (BERT) vs next-token prediction (GPT), all 4 subtopics present.
- Exercise: "Fill the blank: BERT-style (both sides) vs. GPT-style (left only)". Default sentence "I drank a hot ____ this morning" predicts coffee/tea/pizza/mat with context-match counts, BERT side showing more matches than GPT side (3 vs 2 for "coffee") since BERT can see "this morning" after the blank too.
  - Changed sentence to "The ____ barked loudly at the mailman in the park" and clicked Predict — panel updated live to new context-match counts.
  - Minor content-quality note: the candidate word list appears to be a fixed set (coffee, tea, pizza, mat) regardless of the sentence typed. For the "barked" sentence, the obviously-correct word would be something like "dog," but the widget could only pick among coffee/tea/pizza/mat and both BERT and GPT top-predicted "mat" (1 context match each) — a nonsensical answer for that sentence. This doesn't break the widget's actual teaching point (bidirectional vs. left-only context counts, which did differ correctly on the default sentence), but the demo looks odd if a learner strays from the two suggested example sentences. Not a functional bug — worth a content polish (either broaden the candidate vocabulary or hide/disable candidates that never appear in context).
- Quiz: 4 questions, answered all correctly (bidirectional context, open-ended generation suited to GPT, pretrain-then-adapt cost rationale, autoregressive constraint explanation). Result: all 4 marked correct with green highlighting and explanations shown.
- Navigation: prev → "Transformer Architecture and Attention" (topic-1.html, correct), next → "Fine-Tuning vs. Prompting" (topic-3.html, correct).

## Level 5, Topic 3: Fine-Tuning vs. Prompting

**PASS**

- Loaded `level-5/topic-3.html`. No console errors. Content matches curriculum.md's "Fine-tuning vs. prompting" section: definition, all 4 subtopics present.
- Exercise: "Decision-tree recommender" with 3 dropdowns (labeled data volume, change frequency, latency budget) driving an animated SVG flowchart and a text rationale.
  - Default state (low data / often changes / tight latency) showed "Recommendation: Plain Prompting" with matching rationale text.
  - Used JS to set the dropdowns to data=high, change=rarely, latency=flexible (functionally identical to clicking each select option) and confirmed via screenshot: the flowchart path visually rerouted through Data volume → Latency → a highlighted green "Fine-tuning" node, and the recommendation box updated to "Recommendation: Fine-Tuning" with a rationale paragraph correctly reflecting the new inputs ("a large labeled dataset makes fine-tuning worth the investment... task is stable... flexible latency budget makes it fine to include few-shot examples"). Genuine reactive update confirmed.
- Quiz: 4 questions, answered all correctly (weights vs. input distinction, prompting favored by frequent changes, catastrophic forgetting as a fine-tuning risk, large dataset justifying fine-tuning cost). All 4 marked correct with explanations.
- Navigation: prev → "Pretrained Language Models (BERT/GPT-style)" (topic-2.html, correct), next → "Embeddings and Vector Search" (topic-4.html, correct).
- No bugs found.

## Level 5, Topic 5: Intro to Reinforcement Learning: Q-Learning and Policy Gradients

**PASS**

- Loaded `level-5/topic-5.html`. No console errors. Content matches curriculum.md's "Intro reinforcement learning" section closely: definition, all 4 subtopics (agent/environment/state/action/reward loop, Q-learning, policy gradients, exploration vs. exploitation) present.
- Exercise: "Train a Q-learning agent in a 5x5 grid world" with learning-rate and exploration sliders, Step / Run Episode / Train 50 Episodes buttons, and a grid rendering the agent, walls, goal, a value heatmap, and policy arrows.
  - Before training: grid was blank (no heatmap colors, no arrows), agent at START.
  - Clicked "Train 50 Episodes (fast)" — grid transformed to show a colored value heatmap (green near the goal, red/orange for early risky cells) and directional arrows in every open cell forming a coherent path from start toward the goal. Status line updated to "Episode 51 — step 0 in episode — last episode total reward: 8.3". Confirmed genuine simulation, not a static screenshot.
- Quiz: 4 questions, answered all correctly (reward+new-state after an action, Q-table entry = long-term value estimate, policy gradients learn a direct policy vs. Q-learning's action-values, exploration needed to avoid getting stuck on a mediocre action). All 4 marked correct with explanations.
- Navigation: prev → "Embeddings and Vector Search" (topic-4.html, correct), next → "Hyperparameter Tuning" (topic-6.html, correct).
- No bugs found.

## Level 5, Topic 6: Hyperparameter Tuning

**PASS**

- Loaded `level-5/topic-6.html`. No console errors. Content matches curriculum.md's "Hyperparameter tuning" section: definition, all 4 subtopics (common hyperparameters, grid/random/Bayesian search, validation-set-driven tuning, LR schedules/early stopping) present.
- Exercise: "Search a simulated loss landscape" — learning rate and batch size sliders, a heatmap of simulated validation loss, and three action buttons (Run this configuration, Run Grid Search, Run Random Search) plus a loss-vs-epoch curve.
  - Clicked "Run Grid Search (9 trials)" — 9 evenly-spaced square markers appeared on the heatmap in a regular 3x3 pattern, and text below reported "Grid search (9 trials) best: loss=0.180 at lr=0.0100, batch=32".
  - Clicked "Run Random Search (9 trials)" — 9 triangle markers appeared scattered irregularly (not on a grid), and the summary text updated to show both results side by side: "Grid search... best: loss=0.180... Random search... best: loss=0.426 at lr=0.0267, batch=16. For this budget, grid search found a lower loss than random search." Visually and textually confirms the grid-vs-random distinction taught in the subtopics.
  - Dragged the learning rate slider to its maximum (1.0) and clicked "Run this configuration" — result text turned red: "Run result: lr=1.0000, batch=64 → simulated validation loss = 3.849", and the loss-vs-epoch curve visibly trended upward/diverged instead of converging, directly matching Q4's correct answer about divergence at high learning rates.
- Quiz: 4 questions, answered all correctly (learning rate = hyperparameter, validation vs. test set tuning rationale, grid vs. random search trade-off, high-LR divergence). All 4 marked correct with explanations.
- Navigation: prev → "Intro to Reinforcement Learning: Q-Learning and Policy Gradients" (topic-5.html, correct), next → "Basic Model Deployment and Serving" (topic-7.html, correct).
- No bugs found.

## Level 5, Topic 7: Basic Model Deployment and Serving

**PASS**

- Loaded `level-5/topic-7.html`. No console errors. Content matches curriculum.md's "Basic model deployment/serving" section: definition, all 4 subtopics (batch vs real-time, API endpoint wrapping, latency/throughput/cost, versioning/rollback) present.
- Exercise: "Send requests to a simulated /predict endpoint" with a request-body textarea, a simulated-compute-time slider, single "Send request" button, and a burst-of-10 comparison (real-time vs batch radio, batch-size slider).
  - Clicked "Send request" with default text "The new laptop screen is amazing." — a realistic JSON response appeared after a simulated delay: `HTTP 200 OK (round-trip: 799ms)` with `model_version: "sentiment-v3"`, `prediction: "positive"`, `confidence: 0.98`, `server_latency_ms: 150`. Confirmed genuine simulated round trip, not static text.
  - Real-time burst-of-10 (default state) showed a bar chart of steadily increasing per-request latency (queueing effect) with "Mode: real-time — average latency: 645ms — throughput: ~6.67 requests/sec".
  - Switched to Batch mode (batch size 5) and sent another burst — bar chart changed shape entirely: latency spikes at requests #1 and #6 (the first request of each 5-request batch) with lower latency for the rest, and summary updated to "Mode: batch — average latency: 253ms — throughput: ~18.78 requests/sec". This correctly illustrates both the batch-first-request-wait effect (tested directly in quiz Q3) and the overall throughput gain from batching.
- Quiz: 4 questions, answered all correctly (real-time fits per-swipe fraud scoring, batch fits weekly churn re-scoring, first-in-batch latency explanation, versioning/rollback rationale). All 4 marked correct with explanations.
- Navigation: prev → "Hyperparameter Tuning" (topic-6.html, correct), next → "MLOps Fundamentals" (topic-8.html, correct).
- No bugs found.

## Level 5, Topic 8: MLOps Fundamentals

**PASS**

- Loaded `level-5/topic-8.html`. No console errors. Content matches curriculum.md's "MLOps fundamentals" section: definition, all 4 subtopics (versioning, CI/CD for ML, drift/decay monitoring, reproducibility/rollback) present.
- Exercise: "Drag the MLOps pipeline stages into the correct order" — 6 shuffled cards (Retrain or roll back, Deploy to production, Monitor for data drift, Version data & code, Validate/test model, Train model), each a keyboard-accessible button ("pick up" then "activate destination to move it there").
  - Used the pick-up/place click mechanism (not raw pixel drag) three times to reorder the cards into: Version data & code → Train model → Validate/test model → Deploy to production → Monitor for data drift → Retrain or roll back. Screenshots after each move confirmed the list re-rendered with the moved card correctly repositioned and the rest shifting.
  - Clicked "Check Order" — all 6 cards turned green with the message "Correct! That's the standard MLOps sequence: version -> train -> validate -> deploy -> monitor -> retrain/roll back." Confirmed real validation logic, not just decorative reordering.
- Quiz: 4 questions, answered all correctly (versioning data+model artifacts beyond code, data drift definition, CI/CD validation catching model-quality regressions, rollback rationale). All 4 marked correct with explanations.
- Navigation: prev → "Basic Model Deployment and Serving" (topic-7.html, correct), next → "Generative Models: GANs, VAEs, and Diffusion Models" (topic-9.html, correct — this is the "added" bridging topic noted in the task, not in curriculum.md's original Level 5 body; will judge it on internal quality only).
- No bugs found.

## Level 5, Topic 9: Generative Models: GANs, VAEs, and Diffusion Models

**PASS** (this is the "added" bridging topic not in curriculum.md's original body — judged on internal quality/consistency only, per task instructions)

- Loaded `level-5/topic-9.html`. No console errors. Page is internally well-structured: clear definition distinguishing GANs/VAEs/diffusion, 4 subtopics (one per mechanism plus a trade-offs summary), and a learning objective that matches the content taught.
- Exercise: "Compare how GANs, VAEs, and diffusion models generate a sample" — a model-type dropdown (GAN/VAE/Diffusion model) and a single slider whose label and behavior change per model type, rendering a pixel-grid visualization plus explanatory text and (for GAN) two meters.
  - GAN mode: dragged "Training iterations" slider to 98% — the pixel grid visibly resolved from random noise into a sharp, clean circle shape; "Generator sample quality" meter read 98% and "Discriminator accuracy (real vs. fake)" dropped to 53% (near coin-flip), exactly matching the exercise's own explanatory text about the discriminator being fooled as training progresses.
  - Switched to VAE mode (via JS-triggered select change, equivalent to a manual dropdown selection) — slider relabeled to "Reconstruction fidelity", meters disappeared, and explanatory text changed to describe the decoder reconstructing from a latent distribution; shape rendered as a smoother/blurrier blob than the GAN's sharp circle.
  - Switched to Diffusion mode — slider relabeled to "Denoising steps completed", visualization showed a mostly-clean circle with scattered noise-speck artifacts at 98% (residual noise), and text correctly described starting from pure noise and iteratively denoising. All three modes are visually and textually distinct, confirming genuine per-model-type logic rather than a shared generic slider.
- Quiz: 4 questions, answered all correctly (discriminator's real-vs-fake job, VAE encoder producing a latent distribution, diffusion's iterative denoising process, GAN's sharp-but-unstable trade-off). All 4 marked correct with explanations.
- Navigation: prev → "MLOps Fundamentals" (topic-8.html, correct), next → "LLM Architecture in Depth: Self-Attention, Positional Encoding, Tokenizers" (level-6/topic-1.html, correct — this is the Level 5→6 boundary).
- No bugs found. This bridging topic is high quality and fits naturally between Level 5's MLOps topic and Level 6's deep-dive LLM architecture topic.

## Level 6, Topic 1: LLM Architecture in Depth: Self-Attention, Positional Encoding, Tokenizers

**PASS** (with one content inconsistency bug)

- Loaded `level-6/topic-1.html`. No console errors. Content matches curriculum.md's "LLM architecture in depth" section: definition, all 4 subtopics (BPE tokenization, positional encoding, scaled dot-product attention, residual connections/layer norm) present.
- Exercise: "Tokenizer visualizer" — a textarea where typed text is live-split into colored subword chunks by a simulated BPE merge-rule table, with total-tokens/words/tokens-per-word stats and a "split into multiple tokens" breakdown.
  - Default text "The unfriendliness of the tokenizer was unexpectedly disheartening." showed 44 tokens across 8 words (5.50 tokens/word), with rare words like "unfriendliness" (10 tokens) and "disheartening." (10 tokens) split far more than common words like "the" (1 token).
  - Replaced the text with "The cat sat on the mat and ate a big fish today." — stats live-updated to 26 tokens / 12 words / 2.17 tokens per word, with a full breakdown ("cat (2 tokens), sat (2 tokens), mat (2 tokens)..."). Confirmed genuine live re-tokenization on every keystroke, not static.
  - **Bug (content inconsistency):** Quiz Q4 asks "why might 'cat' stay as one token while 'disheartening' splits into several?" and marks "Common short words are more likely to have been merged into single tokens..." as correct. I typed "cat" alone into the actual exercise and it split into 2 tokens ("c" + "at"), not 1 — directly contradicting the quiz's premise. The teaching point (short/common words merge more than rare/long words) is still valid in spirit, but the specific example word chosen by the quiz ("cat") does not behave as the quiz question claims when tested in the widget itself. This is a reproducible mismatch between the quiz text and the actual simulated tokenizer's merge-rule table — worth fixing by either changing the quiz's example word to one that truly stays a single token in the widget (e.g. "the" or "was"), or expanding the merge-rule table so "cat" resolves to one token.
- Quiz: 4 questions, answered all correctly per the app's own grading (BPE splitting rare words due to fixed vocabulary, positional encoding needed because attention is order-agnostic, residual connections aiding gradient flow, and the cat/disheartening merge-rule question above). All 4 marked correct with explanations, despite the content inconsistency noted above.
- Navigation: prev → "Generative Models: GANs, VAEs, and Diffusion Models" (level-5/topic-9.html, correct — confirms the Level 5→6 boundary), next → "Advanced Prompting: Few-Shot and Chain-of-Thought" (topic-2.html, correct).

## Level 6, Topic 2: Advanced Prompting: Few-Shot and Chain-of-Thought

**PASS**

- Loaded `level-6/topic-2.html`. No console errors. Content matches curriculum.md's "Advanced prompting" section: definition, all 4 subtopics (zero/few-shot, chain-of-thought, prompt structure, self-consistency) present.
- Exercise: "Prompt lab: few-shot vs. chain-of-thought" — two checkboxes ("Add examples," "Ask for step-by-step reasoning") over a fixed arithmetic word problem, with an assembled-prompt panel and a mock-model-output panel that update live.
  - Default (both unchecked): mock output was "38" marked wrong, with explanation "terse zero-shot guess, arithmetic slip (added instead of tracking order correctly)" (correct answer is 23-8+15=30).
  - Checked both boxes — assembled prompt panel updated to include two full worked examples (bakery/garage arithmetic) plus "Think through this step by step before giving the final answer," and the mock output changed to show step-by-step work ("Start: 23. Sold 8 -> 23-8=15. Received 15 -> 15+15=30. A: 30") marked green: "Correct, well-formatted, and shows its work — the two techniques combine well here." Confirmed genuine reactive logic keyed to both toggles, not a static example.
- Quiz: 4 questions, answered all correctly (few-shot adds example pairs, CoT helps multi-step reasoning tasks most, the widget uses canned JS not a real API, examples vs. system/instruction distinction). All 4 marked correct with explanations.
- Navigation: prev → "LLM Architecture in Depth..." (topic-1.html, correct), next → "Retrieval-Augmented Generation (RAG)" (topic-3.html, correct).
- No bugs found.

## Level 6, Topic 3: Retrieval-Augmented Generation (RAG)

**PASS**

- Loaded `level-6/topic-3.html`. No console errors. Content matches curriculum.md's "Retrieval-augmented generation (RAG)" section: definition, all 4 subtopics (retrieve-then-generate pipeline, hallucination reduction, chunking, retrieval-quality evaluation) present.
- Exercise: "Mini RAG simulator" — 10 toy knowledge-base documents about a fictional "Nimbus" cloud storage product, a question textbox, an "Ask" button, and panels for retrieved chunks (with relevance scores and highlighted keyword overlaps), a grounded RAG answer, and a generic no-RAG baseline answer.
  - Default question "How long are deleted files recoverable?" correctly retrieved "Deletion Policy" (score 3, matched words "Deleted/files/recoverable" highlighted) as top hit, with a grounded answer quoting it directly, versus a deliberately vague no-RAG baseline.
  - Replaced the question with "How many requests per minute does the API allow?" and clicked Ask — retrieval re-ran live, correctly surfacing "API Rate Limits" (score 4, highlighted "API/requests/per/minute/requests") as the top match ahead of "Pricing" (score 1) and "Uptime SLA" (score 0), and the RAG answer correctly quoted the 1000-requests-per-minute figure. Confirmed genuine keyword-overlap computation, not a canned response, since the retrieved documents and answer both changed correctly for the new question.
- Quiz: 4 questions, answered all correctly (RAG pipeline order query->embed->search->retrieve->augment->generate, hallucination reduction via grounding, real keyword-overlap scoring in the simulator, irrelevant-chunk-retrieved failure mode). All 4 marked correct with explanations.
- Navigation: prev → "Advanced Prompting: Few-Shot and Chain-of-Thought" (topic-2.html, correct), next → "Fine-Tuning Methods: LoRA, QLoRA, Full Fine-Tune" (topic-4.html, correct).
- No bugs found.

## Level 6, Topic 4: Fine-Tuning Methods: LoRA, QLoRA, Full Fine-Tune

**PASS**

- Loaded `level-6/topic-4.html`. No console errors. Content matches curriculum.md's "Fine-tuning methods" section: definition, all 4 subtopics (full fine-tune, LoRA, QLoRA, trade-offs including a DoRA mention) present.
- Exercise: "Resource-cost comparison" — two dropdowns (model size: small/medium/large; method: full/LoRA/QLoRA) driving a bar chart (GPU memory, training time, trainable-param %) plus three summary stat cards.
  - Default (Small + LoRA): 6 GB GPU memory, 4 hrs training, 0.5% params trained.
  - Switched to Large + Full fine-tune: bars jumped dramatically to 1400 GB, 400 hrs, 100% params — all three bars fully filled.
  - Switched to Large + QLoRA (same model size): dropped to 48 GB, 170 hrs, 0.2% params — a ~29x memory reduction vs. full fine-tune at the same model size, correctly illustrating the widget's core teaching point. Confirmed genuine reactive recalculation across both dropdowns.
  - Note: during quiz testing, an initial click on Q4's correct radio button did not visually register before I clicked "Check answers" (likely a stale element reference after a page scroll during my own test sequence, not an app defect) — the app correctly graded the apparent "no selection" as wrong. I re-selected the same answer explicitly via a direct DOM interaction and resubmitted; the app then correctly graded it as right with matching explanation text. This confirms the grading logic itself is correct — my first attempt was a testing artifact, not a real bug. Flagging only for transparency, not as a defect.
- Quiz: 4 questions, answered all correctly on verified resubmission (LoRA's frozen-weights memory savings, QLoRA's added quantization, the widening memory gap at larger model sizes, and the full-fine-tune-vs-parameter-efficient trade-off). All 4 marked correct with explanations.
- Navigation: prev → "Retrieval-Augmented Generation (RAG)" (topic-3.html, correct), next → "Intro to Evals for ML/LLM Systems" (topic-5.html, correct).
- No bugs found.

## Level 6, Topic 5: Intro to Evals for ML/LLM Systems

**PASS**

- Loaded `level-6/topic-5.html`. No console errors. Content matches curriculum.md's "Intro to evals for ML/LLM systems" section: definition, all 4 subtopics (why LLM evals differ, reference vs rubric grading, building a small eval set, regression testing) present.
- Exercise: "Build a mini eval suite for a summarization prompt" — editable prompt template, 6 selectable test cases (product reviews), 4 selectable rubric criteria, Run/baseline buttons, and a per-case result table.
  - Default prompt "Summarize this product review." scored 0/6 (0%) — every simulated output was the generic "Summary: A review of a product," failing all rubric criteria.
  - Edited the prompt to "Summarize this product review in one sentence. Mention the product name, the sentiment, and the star rating if present." and re-ran — score jumped to 6/6 (100%), with each simulated output now correctly naming the product, sentiment, and star rating (e.g. "UltraBlend 3000 Blender, positive review, 5 stars.").
  - Clicked "Set current score as baseline" (now shows "Baseline set at 100%").
  - Weakened the prompt by removing the sentiment instruction ("Summarize this product review, mentioning the product name and star rating.") and re-ran — score dropped to 0/6 (0%), and the app correctly displayed a red regression banner: "Regression detected: score dropped from 100% to 0%." Every case failed because the output stopped mentioning sentiment while the rubric still required it. This is an excellent, accurate demonstration of the exact regression-testing concept the topic teaches, and matches quiz Q3 exactly.
- Quiz: 4 questions (Q4 is multi-select checkboxes, correctly implemented as checkboxes rather than radios). Answered all correctly (open-ended/non-deterministic outputs need more than accuracy, regression = performance drop after a change, removing the sentiment instruction lowers the sentiment-criterion pass rate, and the 3 valid eval-set properties selected while correctly leaving "at least one test case, total" unchecked). All correct with explanations, including proper credit for the multi-select question.
- Navigation: prev → "Fine-Tuning Methods: LoRA, QLoRA, Full Fine-Tune" (topic-4.html, correct), next → "Interpretability Tools: SHAP and LIME" (topic-6.html, correct).
- No bugs found.

## Level 6, Topic 6: Interpretability Tools: SHAP and LIME

**PASS**

- Loaded `level-6/topic-6.html`. No console errors. Content matches curriculum.md's "Interpretability tools (SHAP, LIME)" section: definition, all 4 subtopics (black-box problem, LIME local surrogate, SHAP Shapley values, global vs local interpretability) present.
- Exercise: "Loan-approval feature attribution (SHAP-style)" — 5 sliders (Annual Income, Credit Score, Debt-to-Income Ratio, Years Employed, Requested Loan Amount) each with a live horizontal green/red contribution bar, plus a running predicted approval score and APPROVED/DENIED decision.
  - Default profile: score 53.6/100, Decision APPROVED, with Credit Score contributing +5.6 pts (green) and Annual Income -3.6 pts (red).
  - Dragged the Credit Score slider from 652 down to 317 — its contribution bar flipped from +5.6 pts green to -18.8 pts red (a large bar), and the overall predicted score dropped to 29.3/100 with the decision flipping to DENIED. Confirmed genuine, correctly-signed live recalculation tied to slider position, matching the SHAP-style teaching point exactly.
- Quiz: 4 questions (Q4 multi-select checkboxes). Answered all correctly (positive bar = pushed prediction up, LIME local-surrogate vs SHAP Shapley-value distinction, global vs local interpretability, and the 3 true SHAP/LIME statements while correctly excluding "guarantees fairness"). Note: during my first pass I had two answer-registration mishaps (Q3 radio and Q4 checkboxes) caused by clicking stale element references from an earlier `read_page` call after the page had scrolled/re-rendered — not app defects. Reset via "Try again" and re-selected all answers directly by screen coordinates; the app then graded correctly: 4/4 correct (100%), "Nice work — that's a passing score," topic marked complete.
- Navigation: prev → "Intro to Evals for ML/LLM Systems" (topic-5.html, correct), next → "Distributed Training Basics" (topic-7.html, correct).
- No bugs found.

## Level 6, Topic 7: Distributed Training Basics

**PASS**

- Loaded `level-6/topic-7.html`. No console errors. Content matches curriculum.md's "Distributed training basics" section (the last topic of the original Level 6 curriculum): definition, all 4 subtopics (data parallelism, model parallelism, gradient sync overhead, when distributed training is needed) present.
- Exercise: "Distributed training simulator" — data/model parallelism radio toggle, GPU-count and batch-size sliders, "Run Training Step" button, an animated diagram, and live throughput/memory/communication-overhead stats.
  - Data parallelism (default, 4 GPUs): diagram showed 4 GPU boxes each connected to a central "Gradient sync" node; throughput 440 samples/sec.
  - Switched to Model parallelism — diagram changed completely to a sequential chain "Layers 1 -> Layers 2 -> Layers 3 -> Layers 4" with caption "Activations pass forward through each layer group in sequence"; throughput changed to 387 samples/sec and per-GPU memory dropped to 9.4 GB (vs. data parallelism's higher per-GPU usage), with explanatory text: "The model is split across GPUs, so per-GPU memory drops as you add GPUs, but passing activations between stages adds overhead."
  - Clicked "Run Training Step" in model-parallel mode — captured a mid-animation screenshot showing an orange dot (representing an activation) positioned between "Layers 1" and "Layers 2," confirming the sequential-pass animation actually runs rather than being a static diagram.
- Quiz: 4 questions (Q4 multi-select). Answered all correctly (data parallelism = full model copy + data shard, model parallelism = split layers/params with passed activations, communication overhead limiting linear speedup, and the 3 true statements about distributed training while correctly excluding "communication overhead is irrelevant"). All 4 marked correct with explanations.
- Navigation: prev → "Interpretability Tools: SHAP and LIME" (topic-6.html, correct), next → "Content Moderation and Guardrails for LLM Applications" (topic-8.html, correct — this is the Level 6 "added" bridging topic, curriculum.md's Level 6 body only has 7 topics ending here).
- No bugs found.

## Level 6, Topic 8: Content Moderation and Guardrails for LLM Applications

**PASS** (this is the "added" bridging topic — curriculum.md's Level 6 body lists only 7 topics ending at "Distributed training basics," so this is judged on internal quality/consistency, same treatment as Level 5's GANs/VAEs/diffusion topic)

- Loaded `level-6/topic-8.html`. No console errors. Internally well-structured: definition, 4 subtopics (why moderation is needed, input vs. output filters, contextual policy rules, precision/recall tradeoff), and a learning objective that matches the content.
- Exercise: "Guardrail routing playground" — 3 checkboxes (Input filter, Output filter, Policy rule) controlling live re-routing of 8 sample prompts, with precision/recall/false-positive-rate stats and a per-prompt result table (ground truth, decision, what triggered it, correct/incorrect).
  - Default (Input filter only): precision 40%, recall 67%, false-positive rate 60% — 3 benign prompts incorrectly blocked (e.g., "How do I pick the lock on my own front door?") because they matched keyword triggers.
  - Added Policy rule (input filter still on): precision rose to 50%, recall rose to 100% (caught a previously-missed harmful prompt), but false-positive rate stayed at 60% since the same 3 benign prompts still tripped the keyword-based input filter (OR-combined, so a stricter check on top doesn't undo the blunt filter's false positives).
  - Turned OFF the input filter, leaving only the Policy rule active: precision 100%, recall 100%, false-positive rate 0% — all 8 prompts correctly classified. This is a genuinely instructive result: it concretely demonstrates that the blunt keyword filter was the source of all false positives, and a contextual policy check alone outperforms it, directly supporting the subtopic "contextual policy rules... reduce false positives while still catching harmful requests." Confirmed all three toggle combinations produce live, correctly-computed, distinct results.
- Quiz: 4 questions (Q4 multi-select). Answered all correctly (input vs. output filter timing, keyword filters producing false positives from context-blind matching, the recall/precision tradeoff under stricter filtering, and the 3 valid guardrail-design best practices while excluding "single static keyword list forever"). All 4 marked correct with explanations.
- Navigation: prev → "Distributed Training Basics" (topic-7.html, correct), next → "Agentic Systems: Tool Use, Function Calling, ReAct" (level-7/topic-1.html, correct — confirms the Level 6→7 boundary).
- No bugs found. This is a strong, well-designed bridging topic; the guardrail playground is one of the more pedagogically effective widgets encountered in this QA pass.

