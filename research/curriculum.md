# Curriculum — AI Maturity Course (Levels 1-10)

Merged from `research/syllabus/level-1-2.md`, `level-3-4.md`, `level-5-6.md`, `level-7-8.md`, and `level-9-10.md`, written in parallel by 5 Sonnet agents on 2026-07-13 from the seed topics in `research/topics-seed.md`. This is the single source of truth the site-building agents (Phase 2) should read.

## Table of contents

- Level 1 — Beginner (7 topics)
- Level 2 — Novice (8 topics)
- Level 3 — Advanced Beginner (7 topics)
- Level 4 — Intermediate (9 topics)
- Level 5 — Intermediate+ (9 topics)
- Level 6 — Advanced (8 topics)
- Level 7 — Advanced+ (8 topics)
- Level 8 — Expert (8 topics)
- Level 9 — Expert+ / Research-Adjacent (8 topics)
- Level 10 — Master (8 topics)

Total: 80 topics across 10 levels. Every topic includes a plain-language definition, subtopics, a specific learning objective, and a spec for a hands-on browser-simulated exercise (no backend required — this drives Phase 2 build work).

---

<!-- BEGIN level-1-2.md -->

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

<!-- END level-1-2.md -->

---

<!-- BEGIN level-3-4.md -->

# Syllabus — Levels 3-4

Source topics: `research/topics-seed.md`, Level 3 (Advanced Beginner) and Level 4 (Intermediate). Written by Syllabus Agent 2. Concepts-first, tool-agnostic per `CLAUDE.md` key decisions — named libraries (numpy, pandas, PyTorch, TensorFlow) appear only as illustrative examples of the underlying concept, not as the organizing structure.

---

## Level 3 — Advanced Beginner

Level 3 moves the learner from "I can use AI tools" (Level 2) to "I can get my hands dirty with real data and classic ML algorithms." Focus: data wrangling and the first family of trainable models that aren't neural networks, plus the two mathematical ideas (gradient descent, loss functions) that underlie almost everything from here on.

### Python for ML (numpy, pandas)

**Definition:** The two foundational Python libraries that let you store, reshape, and crunch numerical data efficiently instead of writing raw loops.

**Subtopics:**
- Arrays and vectorized operations (numpy) vs. Python lists — why vectorization is faster
- DataFrames, rows/columns, indexing and filtering (pandas)
- Basic aggregation and grouping (mean, sum, groupby)
- Reading/writing tabular data (CSV-like structures)

**Learning objective:** The learner should be able to look at a small tabular dataset and describe, in plain language, how they'd select a subset of rows, compute a column-wise statistic, and reshape the data into the form a model expects — without writing actual Python (this is a concepts course, not a coding bootcamp).

**Hands-on exercise idea:** An in-browser "spreadsheet playground" — render a small JSON dataset as an interactive table where clicking column headers sorts/filters and a sidebar shows live-updating aggregate stats (mean, count, min/max), so the learner feels what `pandas.groupby` does without writing code.

### Decision trees, random forests

**Definition:** A decision tree is a flowchart of yes/no questions that splits data into groups to make a prediction; a random forest is many slightly-different trees voting together for a more reliable answer.

**Subtopics:**
- How a tree picks its splits (impurity/information gain, intuitively)
- Overfitting in a single deep tree vs. pruning
- Ensembles: bagging and why averaging many trees reduces variance
- Feature importance as a byproduct of tree-based models

**Learning objective:** The learner should be able to trace a small decision tree by hand given a set of yes/no questions and a data point, predict its output, and explain in one sentence why a forest of trees tends to generalize better than any single tree.

**Hands-on exercise idea:** An interactive tree-builder where the learner clicks to add split questions (e.g., "age > 30?") over a scattered 2D point cloud of two classes, and the browser shades the resulting decision regions live so they can see how splits carve up space.

### k-NN, k-means clustering

**Definition:** k-NN classifies a new point by looking at its k closest neighbors and taking a majority vote; k-means groups unlabeled points into k clusters by repeatedly assigning points to the nearest cluster center and recomputing centers.

**Subtopics:**
- Distance metrics (Euclidean distance, intuitively) as "closeness"
- Choosing k and the bias/variance tradeoff it creates
- k-means initialization, assignment, and update loop
- Supervised (k-NN) vs. unsupervised (k-means) — tying back to Level 2's supervised/unsupervised distinction

**Learning objective:** The learner should be able to, given a 2D scatterplot and a new point, manually identify its nearest neighbors and predict a k-NN classification, and separately describe what one "round" of k-means does to a set of cluster centers.

**Hands-on exercise idea:** A canvas where the learner clicks to drop colored points (two classes) then drops a new uncolored point — the widget draws circles/lines to the k nearest neighbors and votes a color live as they drag a k-slider; a second tab does the same canvas for k-means, animating centroid movement step by step on a button click.

### Feature engineering and data cleaning

**Definition:** The practice of transforming raw, messy data into the clean, informative inputs a model actually needs to learn well.

**Subtopics:**
- Handling missing values (drop, impute)
- Encoding categorical variables (one-hot, ordinal)
- Scaling/normalizing numeric features
- Creating new features from existing ones (e.g., combining date fields into "day of week")

**Learning objective:** The learner should be able to look at a small messy dataset (missing values, mixed scales, text categories) and propose a specific cleaning/encoding step for each problem they spot, and explain why an un-normalized feature can distort a distance-based model like k-NN.

**Hands-on exercise idea:** A "before/after" data-cleaning game — show a small messy table with visible problems (blank cells, "Y"/"yes"/"1" inconsistently used, wildly different numeric scales) and let the learner click cells/columns to apply fixes (impute, one-hot encode, normalize), scoring them against a checklist of what a clean dataset should look like.

### Perceptrons and basic network architecture

**Definition:** A perceptron is the simplest artificial neuron — it takes weighted inputs, sums them, and fires a decision based on a threshold; stacking many of them in layers is the basic architecture of a neural network.

**Subtopics:**
- Inputs, weights, bias, and the weighted sum
- The activation/threshold step (very simplified, full activation functions come in Level 4)
- Single-layer perceptron limits (can't solve non-linearly-separable problems like XOR)
- Why stacking layers (multi-layer perceptrons) overcomes that limit

**Learning objective:** The learner should be able to compute the output of a tiny perceptron by hand given inputs, weights, and a bias, and explain why a single perceptron can't separate a simple non-linear pattern like XOR but a multi-layer network can.

**Hands-on exercise idea:** An interactive perceptron widget with 2-3 draggable weight/bias sliders over a fixed set of 2D input points, where the decision boundary line redraws live as sliders move, plus a toggle that swaps the dataset to an XOR pattern to visually demonstrate the single-layer failure case.

### Gradient descent

**Definition:** The algorithm that trains most ML models by repeatedly nudging parameters in the direction that most reduces the model's error.

**Subtopics:**
- The "loss landscape" as a hilly surface and gradient descent as walking downhill
- Learning rate: too small (slow), too large (overshoots/diverges)
- Local minima vs. global minima (intuitively)
- Iterative updates over many steps ("epochs" preview)

**Learning objective:** The learner should be able to describe, in their own words, what happens at each step of gradient descent, and predict qualitatively what goes wrong if the learning rate is set too high or too low.

**Hands-on exercise idea:** A 2D "ball rolling downhill" simulation on a drawn bowl-shaped (and, as a toggle, a bumpy multi-dip) loss curve, where the learner sets a learning-rate slider, hits "step" or "run," and watches a dot move along the curve toward (or past) the minimum, with a live readout of the current loss value.

### Loss functions

**Definition:** A loss function is a single number that measures how wrong a model's prediction is, which gradient descent then tries to minimize.

**Subtopics:**
- Regression losses (e.g., mean squared error) vs. classification losses (e.g., cross-entropy), at a conceptual level
- Why the choice of loss shapes what "good" means for a model
- Loss on one example vs. average loss over a dataset
- Connecting loss to the "downhill" surface from gradient descent

**Learning objective:** The learner should be able to, given a predicted value and a true value, compute a simple squared-error loss by hand, and explain why classification tasks need a different kind of loss function than regression tasks.

**Hands-on exercise idea:** A slider-driven widget where the learner adjusts a predicted value against a fixed true value and watches a live-updating bar/number show the squared-error loss shrinking to zero as the prediction converges, paired with a second toggle showing how cross-entropy loss behaves for a simple two-class prediction confidence slider.

---

## Level 4 — Intermediate

Level 4 goes inside the neural network: how it actually learns (backpropagation), the two dominant architecture families for images and sequences (CNNs, RNNs/LSTMs), the beginnings of NLP, how to rigorously measure whether a model is any good, how to keep it from memorizing instead of learning, and the practical framework/reuse concepts (PyTorch/TensorFlow basics, transfer learning) that make modern ML tractable without training everything from scratch.

### Backpropagation and activation functions

**Definition:** Backpropagation is the algorithm that figures out how much each weight in a network contributed to the error, so gradient descent knows how to adjust it; activation functions are the non-linear "decision" step inside each neuron that let networks learn complex patterns.

**Subtopics:**
- The chain rule, intuitively: blame flows backward from the output error through each layer
- Forward pass (compute prediction) vs. backward pass (compute blame/gradients)
- Common activation functions (sigmoid, ReLU, tanh) and why non-linearity matters
- Vanishing gradients as a motivating problem for activation function choice

**Learning objective:** The learner should be able to describe the forward-pass/backward-pass cycle in a multi-layer network in their own words, and explain why a network made only of linear operations (no activation functions) would collapse into an equivalent single-layer model.

**Hands-on exercise idea:** An animated 3-layer network diagram where clicking "forward pass" lights up neurons left-to-right with computed values, then clicking "backward pass" lights up the same diagram right-to-left showing error/gradient values flowing back, with a dropdown to swap the activation function and see how the lit-up values change.

### CNNs for images

**Definition:** Convolutional Neural Networks are a network architecture specialized for images, using small sliding filters that detect local patterns like edges and textures, then stacking those patterns into increasingly complex shapes.

**Subtopics:**
- Convolution as a sliding filter/kernel over pixels
- Feature maps and stacking layers to go from edges to shapes to objects
- Pooling (downsampling) to reduce size while keeping important information
- Why CNNs share weights across an image instead of having one weight per pixel

**Learning objective:** The learner should be able to manually apply a small (e.g., 3x3) filter to a toy pixel grid and compute the resulting feature map value at one position, and explain why weight-sharing makes CNNs far more efficient than a fully-connected network for images.

**Hands-on exercise idea:** An interactive grid where the learner picks a small preset filter (e.g., a vertical-edge detector) and drags it across a simplified black/white pixel-grid "image," seeing the convolution output value computed live at each position and building up a small output feature map on screen.

### RNNs/LSTMs for sequences

**Definition:** Recurrent Neural Networks process sequences (like text or time series) one step at a time while carrying a "memory" forward; LSTMs are an improved RNN design that's better at remembering things over long sequences.

**Subtopics:**
- The hidden state as memory passed from one time step to the next
- Why plain RNNs struggle with long sequences (vanishing gradients over time)
- LSTM gates (forget/input/output) at a conceptual "what to keep vs. discard" level
- Sequence-to-sequence intuition (e.g., predicting the next word)

**Learning objective:** The learner should be able to trace, step by step, how a hidden state updates as a short toy sequence (e.g., 4 tokens) is fed through an RNN one item at a time, and explain in plain language what an LSTM's "forget gate" is protecting against.

**Hands-on exercise idea:** A step-through animation of a short word sequence entering an RNN one word at a time, where a visible "memory bar" (a simple numeric/color value) updates after each word, with a toggle comparing a plain-RNN memory bar that fades quickly vs. an LSTM memory bar that selectively retains older information.

### Intro NLP (tokenization, embeddings, word2vec)

**Definition:** The starting toolkit for teaching computers to work with text: breaking text into pieces (tokenization), turning those pieces into meaning-carrying number vectors (embeddings), and one of the classic algorithms for learning those vectors from raw text (word2vec).

**Subtopics:**
- Tokenization: splitting text into words/subwords
- Why raw text needs to become numbers, and why one-hot encoding words is impractical
- Embeddings: representing words as dense vectors where similar meanings end up close together
- word2vec's core idea (predict a word from its neighbors, or vice versa) as the classic historical technique — noting that modern systems use richer, context-aware embeddings built on the transformer ideas covered later in the course

**Learning objective:** The learner should be able to explain why "king - man + woman ≈ queen" is a meaningful demonstration of what an embedding space captures, and describe the difference between a one-hot word representation and a dense embedding.

**Hands-on exercise idea:** A precomputed small 2D embedding-space scatterplot (a handful of hardcoded words placed at fixed coordinates that roughly reflect real relationships) where the learner clicks a word and sees its nearest neighbors highlighted, plus a simple vector-arithmetic demo button that visually shows the king/man/woman/queen analogy as arrows on the plot.

### Evaluation metrics (precision, recall, F1, ROC-AUC)

**Definition:** The standard set of numbers used to judge how good a classification model actually is, beyond just "percent correct."

**Subtopics:**
- The confusion matrix (true/false positives/negatives) as the foundation
- Precision (how many predicted positives were right) vs. recall (how many actual positives were caught)
- F1 score as a balance between precision and recall
- ROC-AUC as a threshold-independent measure of separability

**Learning objective:** The learner should be able to construct a confusion matrix from a small set of predictions vs. true labels and compute precision, recall, and F1 from it by hand, and explain a real-world scenario (e.g., medical screening) where recall matters more than precision, or vice versa.

**Hands-on exercise idea:** An interactive confusion-matrix builder — the learner drags a classification threshold slider over a fixed set of model "scores" for labeled examples, watching the confusion matrix cells and the precision/recall/F1 numbers update live, plus a simultaneously-drawn ROC curve that traces out as the threshold sweeps end to end.

### Regularization (dropout, L1/L2)

**Definition:** A set of techniques that deliberately handicap a model during training so it learns general patterns instead of memorizing the training data.

**Subtopics:**
- Overfitting recap (from Level 2) and regularization as the fix
- L1/L2 penalties: discouraging large weights
- Dropout: randomly disabling neurons during training so the network can't over-rely on any one of them
- The regularization strength tradeoff (too much underfits, too little overfits)

**Learning objective:** The learner should be able to look at a plot of training vs. validation loss and identify signs of overfitting, then explain how adding dropout or an L2 penalty would be expected to change that plot.

**Hands-on exercise idea:** A widget with a regularization-strength slider over a fixed noisy toy dataset and a preset polynomial-fit curve, where dragging the slider redraws the fit curve from wildly overfit (wiggly, hugging every point) to smoothly generalized to underfit (too flat), with live training-loss/validation-loss numbers shown side by side.

### PyTorch/TensorFlow basics

**Definition:** The two dominant software frameworks that provide the building blocks (tensors, automatic differentiation, prebuilt layers) for defining and training neural networks without writing the math from scratch.

**Subtopics:**
- Tensors as the core data structure (generalizing numpy arrays to GPU-friendly, differentiable objects)
- Automatic differentiation: the framework computes backpropagation's gradients for you
- The typical training loop shape: forward pass, compute loss, backward pass, update weights, repeat
- PyTorch's more Python-native/dynamic style vs. TensorFlow/Keras's higher-level, more declarative style (both are covered as illustrative examples, not prescriptively)

**Learning objective:** The learner should be able to describe, in order, the standard steps of one training loop iteration (forward pass, loss computation, backward pass, weight update) and explain what "automatic differentiation" saves a practitioner from having to do manually.

**Hands-on exercise idea:** A "training loop simulator" showing four labeled boxes (Forward Pass, Compute Loss, Backward Pass, Update Weights) that light up in sequence as the learner clicks "Step," with a running loss-value chart that ticks downward over repeated steps on a tiny preset toy problem, making the abstract loop concrete without any real framework code running.

### Transfer learning

**Definition:** Reusing a model that's already been trained on a large, general dataset as the starting point for a new, related task, instead of training from scratch.

**Subtopics:**
- Why training large models from scratch is expensive and often unnecessary
- Freezing early layers (general features) vs. fine-tuning later layers (task-specific features)
- Feature extraction vs. full fine-tuning as two ends of a spectrum
- When transfer learning works well vs. when the source and target domains are too different

**Learning objective:** The learner should be able to explain why a model pretrained on general images can be adapted to a narrow task (e.g., classifying a specific product type) with much less data than training from scratch, and describe the tradeoff between freezing vs. fine-tuning layers.

**Hands-on exercise idea:** A layered-network diagram (input to output) where the learner toggles each layer between "frozen" (locked icon, grayed out) and "fine-tune" (unlocked, highlighted) states, and a sidebar readout estimates (via simple preset heuristics, not real computation) how "data-hungry" and "compute-costly" that configuration would be, showing the tradeoff shift as they change which layers are unlocked.

<!-- END level-3-4.md -->

---

<!-- BEGIN level-5-6.md -->

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

<!-- END level-5-6.md -->

---

<!-- BEGIN level-7-8.md -->

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

<!-- END level-7-8.md -->

---

<!-- BEGIN level-9-10.md -->

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

## Sources consulted (2026 grounding, Level 9-10)

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

<!-- END level-9-10.md -->
