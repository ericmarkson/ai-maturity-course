# Syllabus — Levels 5-6 (Intermediate+ / Advanced)

Source seed topics: `research/topics-seed.md`, Level 5 and Level 6 blocks. Verified against 2026 web search for current terminology (fine-tuning variants like DoRA, MLOps/LLMOps distinction, deployment patterns).

---

## Level 5 — Intermediate+

### Transformer architecture and attention

**Definition:** The transformer is a neural network design that processes entire sequences at once using "attention" to weigh how much each word/token should influence every other token, instead of reading one word at a time like older models.

**Subtopics:**
- Self-attention and the query/key/value mechanism
- Multi-head attention (why multiple attention "views" help)
- Encoder vs. decoder blocks and encoder-decoder vs. decoder-only designs
- Why transformers parallelize better than RNNs (no sequential bottleneck)

**Learning objective:** Learner can explain, in plain language and with a diagram, how a transformer decides which earlier words matter most when producing the next word, and why this replaced RNNs for most large-scale NLP.

**Hands-on exercise idea:** An interactive attention heatmap widget — the learner types a short sentence, and clicking any word highlights a simulated (pre-scripted or toy-computed) attention-weight overlay on the other words, showing which ones it "attends to" most, with a slider to switch between simulated attention heads.

---

### Pretrained language models (BERT/GPT-style)

**Definition:** Pretrained language models are transformers trained once on huge amounts of general text so they already "know" language patterns, then reused for many different tasks instead of training from scratch each time.

**Subtopics:**
- Masked language modeling (BERT-style, bidirectional understanding) vs. next-token prediction (GPT-style, autoregressive generation)
- Pretraining vs. downstream task adaptation
- Model families and scale (small/base/large variants, why parameter count matters)
- Why "pretrained + adapt" beat training every model from scratch

**Learning objective:** Learner can correctly classify a given model or task ("classify sentiment," "autocomplete an email") as better suited to a BERT-style vs. GPT-style pretraining objective, and explain why.

**Hands-on exercise idea:** A side-by-side simulator where the learner types a sentence with one word blanked out; one panel shows a canned "BERT-style" prediction using both left and right context, the other shows a "GPT-style" prediction using only left-to-right context, illustrating the directional difference with pre-baked example data.

---

### Fine-tuning vs. prompting

**Definition:** Fine-tuning changes a model's internal weights to specialize it for a task, while prompting just changes the instructions/examples you feed a frozen model at inference time.

**Subtopics:**
- When prompting is enough vs. when fine-tuning is worth the cost
- Few-shot prompting as a lightweight alternative to fine-tuning
- Cost, latency, and maintenance trade-offs (data needs, retraining, versioning)
- Risk of overfitting or catastrophic forgetting when fine-tuning

**Learning objective:** Given a scenario (budget, data volume, task specificity), learner can recommend prompting, few-shot prompting, or fine-tuning and justify the trade-off.

**Hands-on exercise idea:** A decision-tree quiz/flowchart widget where the learner answers questions about a hypothetical project (how much labeled data, how often does the task change, latency budget) and the app animates a path through a flowchart to a recommended approach, then explains why.

---

### Embeddings and vector search

**Definition:** Embeddings turn words, sentences, or documents into lists of numbers (vectors) positioned so that similar meanings end up close together in that number-space, enabling "search by meaning" instead of exact keyword match.

**Subtopics:**
- What a vector embedding represents geometrically (distance = similarity)
- Cosine similarity / dot product as a similarity measure
- Vector databases/indexes at a conceptual level (why brute-force search doesn't scale)
- Semantic search vs. keyword search

**Learning objective:** Learner can explain why two differently-worded sentences with the same meaning end up near each other in embedding space, and can manually compute/compare similarity between simple toy vectors.

**Hands-on exercise idea:** A 2D scatter-plot playground where preset short phrases are plotted as points (using precomputed toy 2D "embeddings"); the learner types a new query, the app places it on the plot and draws lines to the nearest neighbors, visually demonstrating semantic search versus a literal keyword-match baseline shown side by side.

---

### Intro reinforcement learning (Q-learning, policy gradients)

**Definition:** Reinforcement learning trains an agent to make decisions by trial and error, rewarding good outcomes and penalizing bad ones, rather than learning from a fixed labeled dataset.

**Subtopics:**
- Agent, environment, state, action, reward loop
- Q-learning: learning the value of actions in states (Q-table)
- Policy gradients: directly learning a strategy instead of action-values
- Exploration vs. exploitation trade-off

**Learning objective:** Learner can trace one full agent-environment interaction loop (state -> action -> reward -> updated state) for a simple grid-world example and explain how a Q-table entry gets updated.

**Hands-on exercise idea:** A simple grid-world game (e.g., 5x5 maze with a goal square and obstacles) rendered in HTML/canvas where the learner watches a Q-learning agent take steps and a live Q-table/heatmap updates each episode, with a slider to speed up training and see the policy converge over ~50-100 simulated episodes.

---

### Hyperparameter tuning

**Definition:** Hyperparameters are the settings you choose before training (like learning rate or batch size) rather than values the model learns itself, and tuning them means systematically searching for the combination that produces the best model.

**Subtopics:**
- Common hyperparameters (learning rate, batch size, number of epochs, network depth/width)
- Grid search vs. random search vs. Bayesian/automated search
- Validation-set-driven tuning and the risk of tuning-set overfitting
- Learning rate schedules and early stopping

**Learning objective:** Learner can explain why tuning on the validation set (not the test set) matters, and can describe the difference between grid search and random search in terms of cost vs. coverage.

**Hands-on exercise idea:** A "training run simulator" where the learner picks a learning rate and batch size via sliders, clicks Run, and the app plots a simulated loss curve (generated from a formula that rewards near-optimal values and shows divergence/plateau for bad ones), letting the learner iterate toward a low-loss configuration like a mini grid search.

---

### Basic model deployment/serving

**Definition:** Deployment/serving is the process of taking a trained model and making it available so real applications can send it input and get predictions back, reliably and at scale.

**Subtopics:**
- Batch inference vs. real-time/online inference
- Wrapping a model behind an API endpoint
- Latency, throughput, and cost considerations
- Versioning and rollback of deployed models

**Learning objective:** Learner can distinguish batch vs. real-time serving scenarios from a description of a use case, and can describe the basic request/response path from client to a served model.

**Hands-on exercise idea:** A simulated "API playground" where the learner sends a mock request (typed text) to a fake `/predict` endpoint implemented purely in client-side JS, sees a simulated latency delay and JSON response, and can toggle between "batch mode" (queue of 5 requests processed together) and "real-time mode" (one at a time) to see the throughput/latency trade-off visualized in a small chart.

---

### MLOps fundamentals

**Definition:** MLOps is the set of practices for managing the full lifecycle of a machine learning model in production — versioning data and models, automating retraining, and monitoring for problems — borrowed from software DevOps but adapted for ML's extra moving parts (data and models, not just code).

**Subtopics:**
- Versioning: code, data, and model artifacts together
- CI/CD for ML pipelines (automated retrain/test/deploy)
- Monitoring for data drift and model performance decay
- Reproducibility and rollback

**Learning objective:** Learner can list the extra components MLOps must version/monitor beyond traditional software DevOps (data, model weights, feature pipelines) and explain what "data drift" means and why it matters.

**Hands-on exercise idea:** A dashboard mockup where a simulated live-data stream (randomly generated but drifting over time) feeds a chart of "model accuracy over time"; as the underlying data distribution silently shifts (controlled by a slider the learner can pull), accuracy visibly degrades, and an alert banner fires once it crosses a threshold, teaching the drift-detection concept interactively.

---

## Level 6 — Advanced

### LLM architecture in depth (self-attention, positional encoding, tokenizers)

**Definition:** This is a deeper look under the hood of large language models — how they break text into pieces, keep track of word order, and compute attention efficiently at scale.

**Subtopics:**
- Tokenization (subword tokenizers like BPE — how "unfriendliness" becomes multiple tokens)
- Positional encoding (how transformers know word order despite processing in parallel)
- Self-attention computation in more mathematical detail (scaled dot-product attention)
- Layer stacking, residual connections, and layer normalization at a conceptual level

**Learning objective:** Learner can tokenize a sample sentence using BPE-style rules by hand (or trace through a shown example) and explain why positional encoding is necessary given that attention itself is order-agnostic.

**Hands-on exercise idea:** An interactive tokenizer visualizer — the learner types any text into a box and a simulated BPE tokenizer (implemented with a small preset merge-rule table in JS) splits it into colored subword token chunks in real time, showing token counts and how unusual/rare words get split into more pieces.

---

### Advanced prompting (few-shot, chain-of-thought)

**Definition:** Advanced prompting techniques are structured ways of writing prompts — showing examples or asking the model to "think step by step" — that reliably improve output quality without changing the model itself.

**Subtopics:**
- Zero-shot vs. few-shot prompting (providing example input/output pairs)
- Chain-of-thought prompting (asking for reasoning steps before the final answer)
- Prompt structure: system/instruction vs. context vs. examples vs. query
- Self-consistency and other reasoning-boosting variants

**Learning objective:** Learner can rewrite a poorly-performing zero-shot prompt into a few-shot and/or chain-of-thought version, and predict which technique is likely to help for a given task type (e.g., arithmetic reasoning vs. simple classification).

**Hands-on exercise idea:** A side-by-side prompt lab where the learner edits a prompt template (toggle "add examples," toggle "ask for step-by-step reasoning") against a fixed toy question, and a rule-based mock "model" (simple JS logic, not a real LLM call) returns canned better/worse answers depending on which techniques are enabled, illustrating the effect without needing an API.

---

### Retrieval-augmented generation (RAG)

**Definition:** RAG is a technique where a language model's answer is grounded by first retrieving relevant documents/snippets from an external knowledge source and feeding them into the prompt, rather than relying purely on what the model memorized during training.

**Subtopics:**
- The retrieve-then-generate pipeline (query -> embed -> search -> retrieve -> augment prompt -> generate)
- Why RAG reduces hallucination and enables up-to-date/private knowledge
- Chunking documents for retrieval
- Basic evaluation of retrieval quality (are the right documents coming back?)

**Learning objective:** Learner can diagram the full RAG pipeline from a raw user question to a grounded answer, and explain one concrete failure mode (e.g., irrelevant chunk retrieved) and its effect on the final answer.

**Hands-on exercise idea:** A mini RAG simulator with a small fixed set of ~10 toy "documents" (short text snippets) the learner can browse; when the learner types a question, the app computes simple keyword/word-overlap "relevance scores" against each document, shows the top-matching chunks being retrieved, then displays a canned answer that visibly quotes/cites the retrieved chunk versus a "no-RAG" baseline answer that's generic or wrong.

---

### Fine-tuning methods (LoRA, QLoRA, full fine-tune)

**Definition:** These are different techniques for adapting a pretrained model's weights to a new task, ranging from updating every parameter (full fine-tune) to updating only a small number of added parameters (LoRA/QLoRA) to save memory and cost.

**Subtopics:**
- Full fine-tuning: updating all model weights (most expressive, most expensive)
- LoRA (Low-Rank Adaptation): freezing original weights and training small added low-rank matrices
- QLoRA: combining LoRA with quantization (compressed weights) to fine-tune large models on limited hardware
- Trade-offs: compute/memory cost vs. quality vs. flexibility (as of 2026, variants like DoRA further refine LoRA by decomposing weight updates into magnitude and direction)

**Learning objective:** Learner can explain why LoRA/QLoRA drastically reduce the memory needed to fine-tune a large model compared to full fine-tuning, and can describe the rough quality/cost trade-off between the three approaches.

**Hands-on exercise idea:** A resource-cost comparison widget — the learner picks a model size (small/medium/large) and a fine-tuning method (full, LoRA, QLoRA) from dropdowns, and the app instantly renders a simulated bar chart of relative GPU memory, training time, and trainable-parameter-count for that combination, using precomputed illustrative ratios rather than live computation.

---

### Intro to evals for ML/LLM systems

**Definition:** Evals are systematic tests that measure how well an ML or LLM system performs on tasks that matter, going beyond a single accuracy number to catch failure modes before real users do.

**Subtopics:**
- Why evals matter more for LLMs (open-ended, non-deterministic outputs vs. fixed-label classification)
- Reference-based metrics (exact match, similarity to a gold answer) vs. rubric/criteria-based grading
- Building a small eval set (representative test cases, edge cases)
- Automated eval runs as regression tests (catching quality drops when a prompt or model changes)

**Learning objective:** Learner can design a minimal eval set (5-10 test cases with expected criteria) for a simple task (e.g., a summarization prompt) and explain what "regression" means in an eval context.

**Hands-on exercise idea:** An eval-runner mockup where the learner edits a prompt template in a text box, clicks "Run Eval Suite," and the app runs the prompt (via simple JS string-matching/rule logic, not a real model) against a fixed set of 5 test cases, showing pass/fail per case and an overall score, so the learner can see how editing the prompt changes the pass rate.

---

### Interpretability tools (SHAP, LIME)

**Definition:** Interpretability tools like SHAP and LIME explain why a model made a specific prediction by estimating how much each input feature contributed, turning a "black box" decision into a human-readable breakdown.

**Subtopics:**
- The black-box problem: why complex models are hard to explain by default
- LIME: approximating a model locally with a simpler, interpretable model around one prediction
- SHAP: using game-theoretic "Shapley values" to fairly attribute a prediction to each feature
- Global interpretability (overall feature importance) vs. local interpretability (why this one prediction)

**Learning objective:** Learner can read a SHAP-style feature-contribution chart for a single prediction and correctly state which features pushed the prediction up vs. down and by roughly how much.

**Hands-on exercise idea:** A loan-approval (or similar) toy classifier widget where the learner adjusts sliders for 4-5 input features (income, credit score, etc.) feeding a simple hardcoded scoring formula, and the app renders a live horizontal bar chart of each feature's simulated SHAP-style contribution to the final approve/deny score, updating as the sliders move.

---

### Distributed training basics

**Definition:** Distributed training splits the work of training a large model across multiple machines/GPUs so models and datasets too large for one device can still be trained in reasonable time.

**Subtopics:**
- Data parallelism (same model, different data shards, on each device)
- Model parallelism (splitting a single model's layers/parameters across devices)
- Synchronizing gradients/weights across devices (why communication overhead matters)
- When distributed training becomes necessary (model/dataset size thresholds)

**Learning objective:** Learner can distinguish data parallelism from model parallelism using a diagram and explain, in one sentence, why communication between devices becomes the bottleneck as you add more of them.

**Hands-on exercise idea:** An animated diagram widget where the learner picks "data parallel" or "model parallel" from a toggle and clicks "Run Training Step"; an SVG animation shows 4 simulated GPU boxes either (a) each processing a different data batch then syncing gradients to a central point, or (b) each holding a different slice of the model and passing activations between them in sequence, illustrating the communication pattern difference.

---
