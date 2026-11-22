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

---

*End of Level 3-4 syllabus. 16 topics total (7 in Level 3, 9 in Level 4).*
