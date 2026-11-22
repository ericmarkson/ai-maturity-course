/**
 * course-data.js
 * ---------------------------------------------------------------------------
 * Canonical source of truth for the entire course structure: 4 tiers,
 * 10 levels, and 83 topics with display titles, summaries, and canonical file
 * paths relative to the site root (`site/index.html`).
 *
 * NOTE: Topic `id` and `file` paths remain stable across curriculum revisions
 * so URLs and localStorage progress entries (`aimc:progress:v1`) never break.
 * ---------------------------------------------------------------------------
 */
window.COURSE = {
  tiers: [
    { slug: "foundations", name: "Foundations", levels: [1, 2], desc: "Core concepts, terminology, classical intuition, and practical prompting." },
    { slug: "core-ml", name: "Core ML & Deep Learning", levels: [3, 4], desc: "Tabular ML, optimization, neural nets, CNNs, sequences, and evaluation." },
    { slug: "llms-agents", name: "LLMs, RAG & Agents", levels: [5, 6, 7], desc: "Transformers, structured tool use, RAG, evals, tracing, alignment, and scaling." },
    { slug: "frontier", name: "Production, Safety & Frontier", levels: [8, 9, 10], desc: "Autonomous systems, reasoning, inference optimization, interpretability, and capstones." }
  ],
  levels: [
    {
      num: 1,
      name: "Beginner",
      tier: "Foundations",
      tierSlug: "foundations",
      summary: "Build a practical mental model of what happens behind the scenes when you use AI — using everyday analogies, core vocabulary, and real tool behavior.",
      topics: [
        { num: 1, id: "1-7", title: "How AI Actually Works Behind the Scenes (Through Everyday Analogies)", file: "levels/level-1/topic-7.html", added: true },
        { num: 2, id: "1-1", title: "Rules vs. Pattern Learning vs. Deep Networks: How Modern AI Tools Differ", file: "levels/level-1/topic-1.html" },
        { num: 3, id: "1-2", title: "Narrow AI vs. General AI", file: "levels/level-1/topic-2.html" },
        { num: 4, id: "1-3", title: "Core Vocabulary: Model, Training, Inference, Dataset, Parameters", file: "levels/level-1/topic-3.html" },
        { num: 5, id: "1-4", title: "Everyday AI Applications", file: "levels/level-1/topic-4.html" },
        { num: 6, id: "1-5", title: "What a Neural Network Is, Conceptually", file: "levels/level-1/topic-5.html" },
        { num: 7, id: "1-6", title: "Basic AI Ethics: Bias and Privacy", file: "levels/level-1/topic-6.html" }
      ]
    },
    {
      num: 2,
      name: "Novice",
      tier: "Foundations",
      tierSlug: "foundations",
      summary: "Learn how models learn from data, validate without overfitting, prompt AI APIs, and structure Prompts, Rules, Tools (MCP), Skills, Workflows, and AI Teams.",
      topics: [
        { num: 1, id: "2-1", title: "Supervised vs. Unsupervised vs. Reinforcement Learning", file: "levels/level-2/topic-1.html" },
        { num: 2, id: "2-2", title: "Basic Probability and Statistics for ML", file: "levels/level-2/topic-2.html" },
        { num: 3, id: "2-4", title: "Classification vs. Regression", file: "levels/level-2/topic-4.html" },
        { num: 4, id: "2-3", title: "Linear and Logistic Regression", file: "levels/level-2/topic-3.html" },
        { num: 5, id: "2-5", title: "Train/Validation/Test Splits", file: "levels/level-2/topic-5.html" },
        { num: 6, id: "2-6", title: "Overfitting vs. Underfitting", file: "levels/level-2/topic-6.html" },
        { num: 7, id: "2-7", title: "Using AI Tools and APIs (ChatGPT, Claude, etc.)", file: "levels/level-2/topic-7.html" },
        { num: 8, id: "2-8", title: "Basic Prompt Engineering", file: "levels/level-2/topic-8.html" },
        { num: 9, id: "2-9", title: "Chatbots vs. Workflows vs. Agents: The Spectrum of AI Autonomy", file: "levels/level-2/topic-9.html" },
        { num: 10, id: "2-10", title: "The Modern AI Stack: Prompts, Rules, Tools (MCP), Skills & Memory", file: "levels/level-2/topic-10.html" },
        { num: 11, id: "2-11", title: "Designing an AI Team: Roles, Handoffs & Structured Processes", file: "levels/level-2/topic-11.html" }
      ]
    },
    {
      num: 3,
      name: "Advanced Beginner",
      tier: "Core ML & Deep Learning",
      tierSlug: "core-ml",
      summary: "Work with tabular data in NumPy/Pandas, train classical trees and clustering models, engineer features, and grasp gradient descent and loss.",
      topics: [
        { num: 1, id: "3-1", title: "Python for ML: NumPy and Pandas", file: "levels/level-3/topic-1.html" },
        { num: 2, id: "3-2", title: "Decision Trees and Random Forests", file: "levels/level-3/topic-2.html" },
        { num: 3, id: "3-3", title: "k-NN and k-Means Clustering", file: "levels/level-3/topic-3.html" },
        { num: 4, id: "3-4", title: "Feature Engineering and Data Cleaning", file: "levels/level-3/topic-4.html" },
        { num: 5, id: "3-5", title: "Perceptrons and Basic Network Architecture", file: "levels/level-3/topic-5.html" },
        { num: 6, id: "3-6", title: "Gradient Descent", file: "levels/level-3/topic-6.html" },
        { num: 7, id: "3-7", title: "Loss Functions", file: "levels/level-3/topic-7.html" }
      ]
    },
    {
      num: 4,
      name: "Intermediate",
      tier: "Core ML & Deep Learning",
      tierSlug: "core-ml",
      summary: "Build deep neural nets across vision and text, evaluate models rigorously with precision/recall/ROC-AUC, and prevent overfitting with regularization.",
      topics: [
        { num: 1, id: "4-1", title: "Backpropagation and Activation Functions", file: "levels/level-4/topic-1.html" },
        { num: 2, id: "4-2", title: "CNNs for Images", file: "levels/level-4/topic-2.html" },
        { num: 3, id: "4-3", title: "RNNs and LSTMs for Sequences", file: "levels/level-4/topic-3.html" },
        { num: 4, id: "4-4", title: "Intro to NLP: Tokenization, Embeddings, word2vec", file: "levels/level-4/topic-4.html" },
        { num: 5, id: "4-5", title: "Evaluation Metrics: Precision, Recall, F1, ROC-AUC", file: "levels/level-4/topic-5.html" },
        { num: 6, id: "4-6", title: "Regularization: Dropout, L1/L2", file: "levels/level-4/topic-6.html" },
        { num: 7, id: "4-7", title: "PyTorch/TensorFlow Basics", file: "levels/level-4/topic-7.html" },
        { num: 8, id: "4-8", title: "Transfer Learning", file: "levels/level-4/topic-8.html" },
        { num: 9, id: "4-9", title: "Data Augmentation and Class Imbalance Handling", file: "levels/level-4/topic-9.html", added: true }
      ]
    },
    {
      num: 5,
      name: "Intermediate+",
      tier: "LLMs, RAG & Agents",
      tierSlug: "llms-agents",
      summary: "Master the Transformer attention mechanism, embeddings and vector search, reinforcement learning basics, generative models, and MLOps serving.",
      topics: [
        { num: 1, id: "5-1", title: "Transformer Architecture and Attention", file: "levels/level-5/topic-1.html" },
        { num: 2, id: "5-2", title: "Pretrained Language Models (BERT/GPT-style)", file: "levels/level-5/topic-2.html" },
        { num: 3, id: "5-3", title: "Fine-Tuning vs. Prompting", file: "levels/level-5/topic-3.html" },
        { num: 4, id: "5-4", title: "Embeddings and Vector Search", file: "levels/level-5/topic-4.html" },
        { num: 5, id: "5-5", title: "Intro to Reinforcement Learning: Q-Learning and Policy Gradients", file: "levels/level-5/topic-5.html" },
        { num: 6, id: "5-6", title: "Hyperparameter Tuning", file: "levels/level-5/topic-6.html" },
        { num: 7, id: "5-7", title: "Basic Model Deployment and Serving", file: "levels/level-5/topic-7.html" },
        { num: 8, id: "5-8", title: "MLOps Fundamentals", file: "levels/level-5/topic-8.html" },
        { num: 9, id: "5-9", title: "Generative Models: GANs, VAEs, and Diffusion Models", file: "levels/level-5/topic-9.html", added: true }
      ]
    },
    {
      num: 6,
      name: "Advanced",
      tier: "LLMs, RAG & Agents",
      tierSlug: "llms-agents",
      summary: "Dive inside LLM architecture, structured tool protocols (MCP), RAG pipelines, LoRA fine-tuning, systematic evals, interpretability, and guardrails.",
      topics: [
        { num: 1, id: "6-1", title: "LLM Architecture in Depth: Self-Attention, Positional Encoding, Tokenizers", file: "levels/level-6/topic-1.html" },
        { num: 2, id: "6-2", title: "Structured Outputs, Constrained Decoding & Tool Protocols (MCP)", file: "levels/level-6/topic-2.html" },
        { num: 3, id: "6-3", title: "Retrieval-Augmented Generation (RAG)", file: "levels/level-6/topic-3.html" },
        { num: 4, id: "6-4", title: "Fine-Tuning Methods: LoRA, QLoRA, Full Fine-Tune", file: "levels/level-6/topic-4.html" },
        { num: 5, id: "6-5", title: "Intro to Evals for ML/LLM Systems", file: "levels/level-6/topic-5.html" },
        { num: 6, id: "6-6", title: "Interpretability Tools: SHAP and LIME", file: "levels/level-6/topic-6.html" },
        { num: 7, id: "6-7", title: "Distributed Training Basics", file: "levels/level-6/topic-7.html" },
        { num: 8, id: "6-8", title: "Content Moderation and Guardrails for LLM Applications", file: "levels/level-6/topic-8.html", added: true }
      ]
    },
    {
      num: 7,
      name: "Advanced+",
      tier: "LLMs, RAG & Agents",
      tierSlug: "llms-agents",
      summary: "Architect tool-using and multi-agent systems, hybrid RAG, OpenTelemetry-style tracing, RLHF/RLAIF/Constitutional AI, quantization, and scaling laws.",
      topics: [
        { num: 1, id: "7-1", title: "Agentic Systems: Tool Use, Function Calling, ReAct", file: "levels/level-7/topic-1.html" },
        { num: 2, id: "7-2", title: "Multi-Agent Orchestration", file: "levels/level-7/topic-2.html" },
        { num: 3, id: "7-3", title: "Agent Memory: Short-Term and Long-Term", file: "levels/level-7/topic-3.html" },
        { num: 4, id: "7-4", title: "Advanced RAG: Hybrid Search, Reranking, Chunking", file: "levels/level-7/topic-4.html" },
        { num: 5, id: "7-5", title: "Tracing and Observability for AI Systems", file: "levels/level-7/topic-5.html" },
        { num: 6, id: "7-6", title: "RLHF, RLAIF, Constitutional AI & Alignment Techniques", file: "levels/level-7/topic-6.html" },
        { num: 7, id: "7-7", title: "Quantization and Distillation", file: "levels/level-7/topic-7.html" },
        { num: 8, id: "7-8", title: "Scaling Laws", file: "levels/level-7/topic-8.html" }
      ]
    },
    {
      num: 8,
      name: "Expert",
      tier: "Production, Safety & Frontier",
      tierSlug: "frontier",
      summary: "Engineer autonomous loops, production inference optimization, reasoning/RLVR models, MoE, multimodal architectures, red-teaming, and statistical evals.",
      topics: [
        { num: 1, id: "8-1", title: "Autonomous Agent Architecture: Planning, Self-Correction, Guardrails", file: "levels/level-8/topic-1.html" },
        { num: 2, id: "8-2", title: "Production ML Systems at Scale", file: "levels/level-8/topic-2.html" },
        { num: 3, id: "8-3", title: "Model Safety and Red-Teaming", file: "levels/level-8/topic-3.html" },
        { num: 4, id: "8-4", title: "Reasoning Models, Test-Time Compute & RLVR (GRPO)", file: "levels/level-8/topic-4.html" },
        { num: 5, id: "8-5", title: "Mixture-of-Experts Architectures", file: "levels/level-8/topic-5.html" },
        { num: 6, id: "8-6", title: "Multi-Modal Models: Vision-Language and Audio", file: "levels/level-8/topic-6.html" },
        { num: 7, id: "8-7", title: "LLM Inference Optimization: KV-Cache, Speculative Decoding & Serving", file: "levels/level-8/topic-7.html" },
        { num: 8, id: "8-8", title: "Rigorous Eval Design: LLM-as-Judge and Statistical Significance", file: "levels/level-8/topic-8.html" }
      ]
    },
    {
      num: 9,
      name: "Expert+ / Research-Adjacent",
      tier: "Production, Safety & Frontier",
      tierSlug: "frontier",
      summary: "Explore state-space models, mechanistic interpretability, scalable oversight, 3D parallelism, synthetic data pipelines, reward modeling, and long context.",
      topics: [
        { num: 1, id: "9-1", title: "Novel Architectures: State-Space Models, Mamba, and Beyond", file: "levels/level-9/topic-1.html" },
        { num: 2, id: "9-2", title: "Mechanistic Interpretability Research", file: "levels/level-9/topic-2.html" },
        { num: 3, id: "9-3", title: "AI Safety and Alignment Theory: Scalable Oversight", file: "levels/level-9/topic-3.html" },
        { num: 4, id: "9-4", title: "Distributed Systems for Frontier-Scale Training", file: "levels/level-9/topic-4.html" },
        { num: 5, id: "9-5", title: "Synthetic Data Generation and Curation", file: "levels/level-9/topic-5.html" },
        { num: 6, id: "9-6", title: "Reward Model Design", file: "levels/level-9/topic-6.html" },
        { num: 7, id: "9-7", title: "Long-Context Architectures", file: "levels/level-9/topic-7.html" },
        { num: 8, id: "9-8", title: "Cross-Disciplinary AI: Biology, Robotics, Science", file: "levels/level-9/topic-8.html" }
      ]
    },
    {
      num: 10,
      name: "Master",
      tier: "Production, Safety & Frontier",
      tierSlug: "frontier",
      summary: "Synthesize Chinchilla pretraining tradeoffs, frontier safety cases, experimental rigor, benchmark design, sandboxed coding agents, and production capstones.",
      topics: [
        { num: 1, id: "10-1", title: "Frontier Model Pretraining and Research", file: "levels/level-10/topic-1.html" },
        { num: 2, id: "10-2", title: "Frontier Safety Cases, Threat Modeling & Alignment Evaluation", file: "levels/level-10/topic-2.html" },
        { num: 3, id: "10-3", title: "Experimental Rigor: Ablations, Baselines & Reproducible ML Research", file: "levels/level-10/topic-3.html" },
        { num: 4, id: "10-4", title: "Designing Eval and Safety Benchmarks for the Field", file: "levels/level-10/topic-4.html" },
        { num: 5, id: "10-5", title: "Coding Agents, Self-Improvement & Sandboxed Verification Loops", file: "levels/level-10/topic-5.html" },
        { num: 6, id: "10-6", title: "Advising Policy and Governance on Frontier AI", file: "levels/level-10/topic-6.html" },
        { num: 7, id: "10-7", title: "End-to-End Frontier Systems Capstone: Architecture, Evals & Production Tradeoffs", file: "levels/level-10/topic-7.html" },
        { num: 8, id: "10-8", title: "Defining State of the Art in a Subfield", file: "levels/level-10/topic-8.html" }
      ]
    }
  ]
};
