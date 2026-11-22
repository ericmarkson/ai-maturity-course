# Syllabus — Levels 1-2

Source topics: `research/topics-seed.md`, Level 1 (Beginner) and Level 2 (Novice). Terminology checked against current (2026) usage; core definitions here are stable / not subject to fast-moving field drift.

---

## Level 1 — Beginner

### What AI, ML, and Deep Learning Actually Are (and How They Differ)

**Definition:** AI is the broad goal of making machines act intelligently; machine learning (ML) is the subset that learns patterns from data instead of following hand-written rules; deep learning is the subset of ML that uses layered neural networks to learn those patterns.

**Subtopics:**
- The nesting relationship: AI ⊃ ML ⊃ Deep Learning (three concentric circles)
- Rule-based / symbolic AI (pre-ML era) vs. learning-based AI
- Why "deep" refers to having many layers, not to sophistication
- Common confusions: "AI" used loosely in marketing vs. the technical term

**Learning objective:** Learner can correctly place a given real-world system (e.g., a spam filter, a spreadsheet formula, ChatGPT) into the right layer of the AI/ML/DL nesting diagram and explain why.

**Hands-on exercise idea:** An interactive drag-and-drop widget where the learner sorts 8-10 example systems (thermostat, chess-playing rule engine, spam filter, image recognizer, GPT chatbot, etc.) into three nested circles (AI/ML/DL); instant color-coded feedback with a one-line explanation per item.

---

### Narrow AI vs. General AI

**Definition:** Narrow AI (what exists today) is built to do one specific task well; general AI (AGI, still hypothetical) would match human-level reasoning and adaptability across any task.

**Subtopics:**
- Artificial Narrow Intelligence (ANI) — task-specific systems (voice assistants, recommendation engines, image classifiers)
- Artificial General Intelligence (AGI) — theoretical, human-level breadth and transfer
- Why today's large language models are still considered narrow despite feeling general
- Brief mention of "artificial superintelligence" (ASI) as a further hypothetical stage, without dwelling on speculation

**Learning objective:** Learner can explain, in one or two sentences, why a system like a chess engine or a chatbot is narrow AI even if it seems very capable in its domain.

**Hands-on exercise idea:** A simple quiz/slider widget showing 6 AI systems; the learner places each on a "narrow ↔ general" spectrum slider, then compares their answer against a reference position with a brief rationale revealed on submit.

---

### Core Vocabulary (Model, Training, Inference, Dataset, Parameters)

**Definition:** The five basic building-block terms used to describe any ML system: the dataset it learns from, the training process that adjusts it, the resulting model, the parameters inside that model, and inference (using the trained model to make predictions).

**Subtopics:**
- Dataset (examples the system learns from) vs. a single data point
- Training (the fitting process) vs. inference (the "using it" step)
- Model as the artifact that results from training
- Parameters as the adjustable internal numbers a model learns (intro only — no math yet)

**Learning objective:** Learner can correctly label each step of a simple pipeline diagram (raw data → training → model → inference → prediction) using the five core terms.

**Hands-on exercise idea:** A fill-in-the-blank / labeling diagram where the learner drags the five vocabulary terms onto the correct boxes of a simple pipeline flowchart, with immediate right/wrong highlighting.

---

### Everyday AI Applications

**Definition:** AI already runs quietly inside many daily tools — recommendation feeds, voice assistants, chatbots, spam filters, navigation apps, and photo tagging.

**Subtopics:**
- Recommendation systems (streaming, shopping, social feeds)
- Voice assistants and speech recognition
- Conversational chatbots / assistants
- Behind-the-scenes AI (fraud detection, spam filtering, autocomplete, navigation ETAs)

**Learning objective:** Learner can identify at least 5 AI-powered features they personally use in a typical day and name the category each falls into.

**Hands-on exercise idea:** A checklist-style interactive "day in the life" timeline (wake up, check phone, commute, work, shop, stream video) where clicking each scene reveals which AI systems are silently involved, and the learner checks off ones they recognize from their own life.

---

### What a Neural Network Is, Conceptually

**Definition:** A neural network is a system of simple, interconnected "neurons" arranged in layers that loosely mimics how brain cells pass signals, allowing the system to learn complex patterns from examples.

**Subtopics:**
- Neurons, layers (input/hidden/output), and connections — conceptual only, no math
- The brain-inspired metaphor and its limits (it's inspired by, not identical to, biological neurons)
- Why more layers/neurons can capture more complex patterns
- A simple mental model: pattern recognition through adjustable connection strengths

**Learning objective:** Learner can describe, in plain language and without equations, how a neural network takes an input (e.g., a photo) and produces an output (e.g., "cat") by passing signals through layers.

**Hands-on exercise idea:** A clickable animated diagram of a tiny 3-layer network (input/hidden/output nodes) where clicking "run" visually animates a signal lighting up nodes layer by layer for a toy example like classifying a picture as "cat" vs "dog," with a slider to change input values and watch which output lights up.

---

### Basic AI Ethics (Bias, Privacy)

**Definition:** AI systems can inherit unfairness from their training data (bias) and can raise concerns about how personal data is collected and used (privacy) — two of the most immediate real-world consequences of AI to be aware of.

**Subtopics:**
- Where bias comes from: skewed or unrepresentative training data
- Real-world examples of biased outcomes (hiring tools, facial recognition, lending)
- Privacy: what data AI systems collect and how it may be used/retained
- Why "the AI decided it" doesn't remove human responsibility for outcomes

**Learning objective:** Learner can give one concrete example of how biased training data could lead to an unfair AI outcome, and one example of a privacy trade-off in an everyday AI tool.

**Hands-on exercise idea:** A simulated "biased hiring dataset" mini-game: the learner sees a small toy dataset of past hiring decisions (visibly skewed toward one group), trains a mock classifier with one click, then sees it perpetuate the skew on new candidates — illustrating garbage-in/garbage-out without any real ML running under the hood (just pre-scripted outcomes).

---

## Level 2 — Novice

### Supervised vs. Unsupervised vs. Reinforcement Learning

**Definition:** The three main ways ML systems learn: supervised learning uses labeled examples with known answers, unsupervised learning finds patterns in unlabeled data, and reinforcement learning learns by trial-and-error through rewards and penalties.

**Subtopics:**
- Supervised learning: labeled data, learning input→output mappings (e.g., email → spam/not spam)
- Unsupervised learning: no labels, finding structure (e.g., grouping similar customers)
- Reinforcement learning: agent, environment, reward signal, trial and error (e.g., a game-playing agent)
- Quick comparison table: what kind of data/feedback each needs

**Learning objective:** Given a short description of a new ML problem, learner can correctly classify it as supervised, unsupervised, or reinforcement learning and justify why.

**Hands-on exercise idea:** A sorting game with 9 short scenario cards (e.g., "group customers by shopping habits with no prior labels," "teach a robot to walk via trial and error," "predict house prices from labeled sales data") that the learner drags into three labeled bins, with instant feedback and a rationale per card.

---

### Basic Probability/Statistics for ML

**Definition:** ML relies on a handful of core statistics ideas — probability, mean/average, variance, and correlation — to describe data and quantify uncertainty in predictions.

**Subtopics:**
- Probability basics: likelihood of an event, expressed 0-1 or as a percentage
- Mean, median, and variance/spread of a dataset
- Correlation (two variables moving together) vs. causation
- Why ML predictions are often probabilities/confidence scores, not certainties

**Learning objective:** Learner can read a model's output like "87% confidence this is spam" and correctly explain what that percentage represents and why it isn't a guarantee.

**Hands-on exercise idea:** An interactive histogram builder: the learner adjusts a slider that shifts a data distribution and watches the mean/variance numbers update live, plus a simple scatter-plot toggle showing correlated vs. uncorrelated vs. "correlated but not causal" example pairs they can click through.

---

### Linear and Logistic Regression

**Definition:** Linear regression predicts a continuous number (like a price) by fitting a straight line to data; logistic regression predicts a category (like yes/no) by fitting an S-shaped probability curve.

**Subtopics:**
- Linear regression: fitting a line to predict a numeric value
- Logistic regression: converting a line into a probability curve for classification
- Coefficients/weights as "how much each input matters" (conceptual, no calculus)
- Simple real-world examples for each (house price prediction vs. pass/fail prediction)

**Learning objective:** Learner can look at a scatter plot and correctly decide whether linear or logistic regression is the appropriate tool for the prediction task shown.

**Hands-on exercise idea:** A draggable-line widget over a scatter plot of toy data points where the learner manually drags a line to "fit" the data and sees a live-updating error score, followed by a second toggle mode where the same widget switches to fitting an S-curve for a yes/no-labeled scatter plot.

---

### Classification vs. Regression

**Definition:** Classification predicts which category something belongs to (e.g., spam or not spam); regression predicts a continuous numeric value (e.g., tomorrow's temperature).

**Subtopics:**
- Discrete categories vs. continuous numbers as the output type
- Binary classification (two classes) vs. multi-class classification
- Examples spanning both: image labeling (classification), sales forecasting (regression)
- Why the output type determines which techniques/metrics apply later

**Learning objective:** Given a new prediction task description, learner can correctly label it as classification or regression and identify what the output would look like.

**Hands-on exercise idea:** A rapid-fire flashcard quiz (10-12 cards) with task descriptions (e.g., "predict a customer's age," "predict whether an email is spam," "predict a house's sale price," "predict a movie's genre") where the learner taps "classification" or "regression" and gets instant scoring plus a running accuracy tally.

---

### Train/Validation/Test Splits

**Definition:** ML data is typically split into three parts — training data to fit the model, validation data to tune it, and test data (kept fully separate) to honestly measure how well it will perform on new, unseen examples.

**Subtopics:**
- Why you can't fairly evaluate a model on the same data it learned from
- Role of the training set, validation set, and test set
- Typical split ratios as a rule of thumb (e.g., 70/15/15 or 80/10/10)
- Data leakage as the key failure mode to avoid (test data accidentally influencing training)

**Learning objective:** Learner can explain why evaluating a model on its own training data gives a misleadingly optimistic result, using the train/validation/test framework correctly.

**Hands-on exercise idea:** An interactive slider/pie-chart widget where the learner splits a toy dataset (represented as 100 colored dots) into train/validation/test buckets by dragging divider handles, then clicks "evaluate" to see a simulated (pre-scripted) accuracy score that looks artificially high if they cheat by testing on training data, and honest if they split correctly.

---

### Overfitting vs. Underfitting

**Definition:** Overfitting is when a model memorizes the training data too closely and fails on new data; underfitting is when a model is too simple to capture the real pattern, performing poorly even on the training data.

**Subtopics:**
- The "just right" fit vs. an overly wiggly curve (overfitting) vs. an overly flat/simple curve (underfitting)
- Symptoms: overfitting shows great training accuracy but poor test accuracy; underfitting shows poor accuracy everywhere
- Common causes: too little data, too complex a model, or training too long (overfitting); too simple a model or insufficient training (underfitting)
- Basic intuition for the fix direction (simplify vs. add capacity/data) without going into regularization mechanics yet

**Learning objective:** Learner can look at a plotted curve fit to sample data points and correctly diagnose it as overfit, underfit, or well-fit.

**Hands-on exercise idea:** A slider-controlled curve-fitting visualizer: the learner drags a "model complexity" slider over a fixed scatter of noisy data points and watches the fitted curve go from underfit (straight line) through well-fit to overfit (wildly wiggly), with live training-accuracy and test-accuracy numbers that diverge as complexity increases.

---

### Using AI Tools/APIs (ChatGPT, Claude, etc.)

**Definition:** Modern AI assistants like ChatGPT and Claude are pretrained models made accessible through a chat interface or a programmatic API, letting anyone use powerful AI without building or training anything themselves.

**Subtopics:**
- Chat interface usage vs. API usage (same underlying model, different access method)
- Context window: what it is and why conversations have a length limit
- System prompts / instructions vs. user messages (conceptual introduction)
- Practical limitations to know: hallucination risk, knowledge cutoffs, no guaranteed factual accuracy

**Learning objective:** Learner can explain the difference between chatting with an AI assistant through its web app versus calling it through an API, and can name two practical limitations to keep in mind when using either.

**Hands-on exercise idea:** A simulated chat-vs-API side-by-side widget: the left pane is a mock chat UI where the learner types a message and gets a canned response bubble; the right pane shows the "equivalent" API request/response JSON for the same message, highlighting that both hit the same underlying model.

---

### Basic Prompt Engineering

**Definition:** Prompt engineering is the skill of writing clear instructions to an AI model — specifying role, context, task, and format — to reliably get better, more useful outputs.

**Subtopics:**
- The four core elements of a good prompt: role, context, task, and desired output format
- Being specific: vague prompts produce vague answers
- Few-shot examples: showing the model 1-3 examples of the desired output style
- Iterating: treating a first response as a draft to refine, not a final answer

**Learning objective:** Learner can take a vague, underspecified prompt and rewrite it into a well-structured prompt that includes role, context, task, and format, and can explain why the rewrite should produce a better result.

**Hands-on exercise idea:** A "prompt improver" sandbox: the learner is given a weak sample prompt (e.g., "write about dogs") and a checklist of the four elements; as they add role/context/task/format text to fill in the checklist, a pre-scripted mock AI response panel updates to show progressively more useful/specific canned output, rewarding good prompt structure without calling a real model.

---

*Sources consulted for terminology currency (2026): [Claude by Anthropic — Prompt engineering best practices for 2026](https://claude.com/blog/best-practices-for-prompt-engineering); [DataCamp — Types of AI](https://www.datacamp.com/blog/types-of-ai); [IBM — The 2026 Guide to Prompt Engineering](https://www.ibm.com/think/prompt-engineering).*
