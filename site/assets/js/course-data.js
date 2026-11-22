/**
 * course-data.js
 * ---------------------------------------------------------------------------
 * THE canonical source of truth for the entire course structure: every
 * level, every topic (80 total), its display title, and its canonical file
 * path (relative to the site root, i.e. relative to `site/index.html`).
 *
 * Content builders: create your topic HTML files at EXACTLY the `file` path
 * listed for each topic below. Do not rename, do not renumber. See
 * site/COMPONENTS.md for the full page skeleton and conventions.
 *
 * NOTE ON 4 TOPICS FLAGGED "added": research/curriculum.md's table of
 * contents promises 80 topics (L1=7, L4=9, L5=9, L6=8 among them), but the
 * actual written syllabus content in that file only contains 76 fully
 * spec'd topics (L1=6, L4=8, L5=8, L6=7 documented). To honor the
 * authoritative 80-topic/10-level structure, one plausible bridging topic
 * was added to each of those four levels (marked `added: true` below).
 * These 4 do NOT have a matching ### section in curriculum.md with a
 * ready-made definition/subtopics/exercise spec — whichever content builder
 * is assigned that level should write original (but consistent-with-
 * neighbors) lesson content and a real interactive exercise for them, same
 * quality bar as every other topic.
 * ---------------------------------------------------------------------------
 */
window.COURSE = {
  levels: [
    {
      num: 1,
      name: "Beginner",
      topics: [
        { num: 1, id: "1-1", title: "What AI, ML, and Deep Learning Actually Are (and How They Differ)", file: "levels/level-1/topic-1.html" },
        { num: 2, id: "1-2", title: "Narrow AI vs. General AI", file: "levels/level-1/topic-2.html" },
        { num: 3, id: "1-3", title: "Core Vocabulary: Model, Training, Inference, Dataset, Parameters", file: "levels/level-1/topic-3.html" },
        { num: 4, id: "1-4", title: "Everyday AI Applications", file: "levels/level-1/topic-4.html" },
        { num: 5, id: "1-5", title: "What a Neural Network Is, Conceptually", file: "levels/level-1/topic-5.html" },
        { num: 6, id: "1-6", title: "Basic AI Ethics: Bias and Privacy", file: "levels/level-1/topic-6.html" },
        { num: 7, id: "1-7", title: "A Brief History of AI: From Symbolic Systems to Deep Learning", file: "levels/level-1/topic-7.html", added: true }
      ]
    },
    {
      num: 2,
      name: "Novice",
      topics: [
        { num: 1, id: "2-1", title: "Supervised vs. Unsupervised vs. Reinforcement Learning", file: "levels/level-2/topic-1.html" },
        { num: 2, id: "2-2", title: "Basic Probability and Statistics for ML", file: "levels/level-2/topic-2.html" },
        { num: 3, id: "2-3", title: "Linear and Logistic Regression", file: "levels/level-2/topic-3.html" },
        { num: 4, id: "2-4", title: "Classification vs. Regression", file: "levels/level-2/topic-4.html" },
        { num: 5, id: "2-5", title: "Train/Validation/Test Splits", file: "levels/level-2/topic-5.html" },
        { num: 6, id: "2-6", title: "Overfitting vs. Underfitting", file: "levels/level-2/topic-6.html" },
        { num: 7, id: "2-7", title: "Using AI Tools and APIs (ChatGPT, Claude, etc.)", file: "levels/level-2/topic-7.html" },
        { num: 8, id: "2-8", title: "Basic Prompt Engineering", file: "levels/level-2/topic-8.html" }
      ]
    },
    {
      num: 3,
      name: "Advanced Beginner",
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
      topics: [
        { num: 1, id: "6-1", title: "LLM Architecture in Depth: Self-Attention, Positional Encoding, Tokenizers", file: "levels/level-6/topic-1.html" },
        { num: 2, id: "6-2", title: "Advanced Prompting: Few-Shot and Chain-of-Thought", file: "levels/level-6/topic-2.html" },
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
      topics: [
        { num: 1, id: "7-1", title: "Agentic Systems: Tool Use, Function Calling, ReAct", file: "levels/level-7/topic-1.html" },
        { num: 2, id: "7-2", title: "Multi-Agent Orchestration", file: "levels/level-7/topic-2.html" },
        { num: 3, id: "7-3", title: "Agent Memory: Short-Term and Long-Term", file: "levels/level-7/topic-3.html" },
        { num: 4, id: "7-4", title: "Advanced RAG: Hybrid Search, Reranking, Chunking", file: "levels/level-7/topic-4.html" },
        { num: 5, id: "7-5", title: "Tracing and Observability for AI Systems", file: "levels/level-7/topic-5.html" },
        { num: 6, id: "7-6", title: "RLHF/RLAIF and Alignment Techniques", file: "levels/level-7/topic-6.html" },
        { num: 7, id: "7-7", title: "Quantization and Distillation", file: "levels/level-7/topic-7.html" },
        { num: 8, id: "7-8", title: "Scaling Laws", file: "levels/level-7/topic-8.html" }
      ]
    },
    {
      num: 8,
      name: "Expert",
      topics: [
        { num: 1, id: "8-1", title: "Autonomous Agent Architecture: Planning, Self-Correction, Guardrails", file: "levels/level-8/topic-1.html" },
        { num: 2, id: "8-2", title: "Production ML Systems at Scale", file: "levels/level-8/topic-2.html" },
        { num: 3, id: "8-3", title: "Model Safety and Red-Teaming", file: "levels/level-8/topic-3.html" },
        { num: 4, id: "8-4", title: "Constitutional AI and Alignment Methods", file: "levels/level-8/topic-4.html" },
        { num: 5, id: "8-5", title: "Mixture-of-Experts Architectures", file: "levels/level-8/topic-5.html" },
        { num: 6, id: "8-6", title: "Multi-Modal Models: Vision-Language and Audio", file: "levels/level-8/topic-6.html" },
        { num: 7, id: "8-7", title: "Pretraining Considerations", file: "levels/level-8/topic-7.html" },
        { num: 8, id: "8-8", title: "Rigorous Eval Design: LLM-as-Judge and Statistical Significance", file: "levels/level-8/topic-8.html" }
      ]
    },
    {
      num: 9,
      name: "Expert+ / Research-Adjacent",
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
      topics: [
        { num: 1, id: "10-1", title: "Frontier Model Pretraining and Research", file: "levels/level-10/topic-1.html" },
        { num: 2, id: "10-2", title: "Original Contributions to Alignment/Safety Paradigms", file: "levels/level-10/topic-2.html" },
        { num: 3, id: "10-3", title: "Novel Theoretical Contributions: Papers and Architectures", file: "levels/level-10/topic-3.html" },
        { num: 4, id: "10-4", title: "Designing Eval and Safety Benchmarks for the Field", file: "levels/level-10/topic-4.html" },
        { num: 5, id: "10-5", title: "AGI-Adjacent Research Directions", file: "levels/level-10/topic-5.html" },
        { num: 6, id: "10-6", title: "Advising Policy and Governance on Frontier AI", file: "levels/level-10/topic-6.html" },
        { num: 7, id: "10-7", title: "Leading Research Organizations or Labs", file: "levels/level-10/topic-7.html" },
        { num: 8, id: "10-8", title: "Defining State of the Art in a Subfield", file: "levels/level-10/topic-8.html" }
      ]
    }
  ]
};
