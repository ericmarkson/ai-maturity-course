# Hands-on QA Report — Levels 3-4

Status: IN PROGRESS. Append one topic section below as you finish testing it — do not wait until the end to write this file, a previous attempt was cut off by a session limit before writing anything and all its work was lost.

## Level 3

### Topic 1: Python for ML (NumPy and Pandas) — PASS

No console errors on load. Loaded the "Spreadsheet playground" exercise (10-row toy dataset with Name/Category/Score/Hours Studied). Clicked the "Score" column header — table re-sorted ascending by Score (Ivo 58 → Gus 95), confirmed via screenshot diff (before: original order Ava/Ben/Cleo...; after: sorted 58,64,69,71,78,81,85,88,92,95). Then set the category filter dropdown to "NLP" via the select element — table filtered down to exactly 3 rows (Hana 69, Ben 78, Eli 88) and the sidebar "Live aggregate stats" recomputed correctly: count 3, mean 78.3 (=235/3), min 69, max 88 — matches manual calculation, confirming the widget is doing real (not fake) aggregation.

Completed the 4-question quiz by selecting the correct radio option for each question (numpy vectorization, filter recompute, DataFrame definition, sort-doesn't-change-values). Clicked "Check answers" — graded 4/4 correct (100%), showed "Nice work — that's a passing score," and "This topic has been marked complete." Each question showed a green explanation box for the selected correct answer.

Content matches curriculum.md's "Python for ML (numpy, pandas)" section: definition, all 4 subtopics (vectorized ops, DataFrames, aggregation/groupby, CSV-like data), and the learning objective text are present near-verbatim from the syllabus source.

Navigation: "← Basic Prompt Engineering" (correct — last Level 2 topic) and "Decision Trees and Random Forests →" (correct — next Level 3 topic) both present and correctly labeled.

No bugs found.

### Topic 2: Decision Trees and Random Forests — PASS

No console errors on load. Exercise is a 2-slider region-shading widget (Split A = vertical x threshold 0-360, Split B = horizontal y threshold 0-280) over a 30-point 2-class scatter. At default values (Split A=180, Split B=140) it showed "Tree accuracy: 83% (25/30 points correctly classified)". Drove both sliders to their extremes via JS (Split A→0, Split B→280) and dispatched input events — screenshot confirmed the canvas collapsed to a single shaded region (all 4 quadrants merge into one at the boundary) and the accuracy readout live-updated to "50% (15/30 points correctly classified)", proving the widget recomputes majority-vote regions and accuracy in real time rather than being static.

Completed the 4-question quiz (majority-vote region coloring, why deep trees overfit, why forests reduce variance via bagging, boundary-condition question about Split A=0). All 4 selected correct, "Check answers" showed 4/4 correct (100%), "Nice work — that's a passing score," "This topic has been marked complete."

Content matches curriculum.md's "Decision trees, random forests" section: definition, all 4 subtopics (impurity/splits, overfitting/pruning, bagging/ensembles, feature importance), and learning objective all present.

Navigation: "← Python for ML: NumPy and Pandas" and "k-NN and k-Means Clustering →" both correct.

No bugs found.

### Topic 3: k-NN and k-Means Clustering — PASS

No console errors. Two-tab exercise. Tab 1 (k-NN): clicked "Drop query point" then clicked the canvas — widget placed a dark query point and drew lines to its k=3 nearest neighbors (2 blue Class A, 1 orange Class B), correctly reporting "Predicted class: A (votes — A: 2, B: 1, k=3)". Dragged the k-slider to 7 via JS input event — lines redrew to all 7 nearest points live, vote updated to "Predicted class: A (votes — A: 4, B: 3, k=7)" — confirms live recomputation, not a static image. Tab 2 (k-means): switched tabs, saw 3 randomly-placed centroids (green/blue/orange) over ~20 gray unlabeled points, "Iteration: 0". Clicked "Step" once — all points changed color to their nearest centroid's color, centroids visibly moved toward the mean of their assigned points, counter advanced to "Iteration: 1". Both widgets behaved exactly as described in the instructions.

Completed the 4-question quiz (k-NN majority vote arithmetic, k-means round definition, supervised vs. unsupervised distinction, large-k smoothing effect). All 4 correct, 4/4 (100%), "This topic has been marked complete."

Content matches curriculum.md's "k-NN, k-means clustering" section: definition, all 4 subtopics (distance metrics, choosing k/bias-variance, k-means loop, supervised vs unsupervised), and learning objective all present.

Navigation: "← Decision Trees and Random Forests" and "Feature Engineering and Data Cleaning →" both correct.

No bugs found.

### Topic 4: Feature Engineering and Data Cleaning — PASS

No console errors. Exercise is a before/after cleaning game on a 6-row messy table (Ada/Bo/Cy/Dee/Emi/Fen) with 4 real problems: blank Age for Bo/Dee, inconsistent Subscribed labels (yes/Y/0/no/1/N), un-normalized Income, text Category column. Clicked all 4 fix buttons in sequence and screenshotted the result: "Impute missing Age" correctly filled Bo and Dee with 39 (imputed) — verified by hand: mean of 34,41,29,52 = 156/4 = 39, exactly right. "Standardize Subscribed labels" correctly mapped yes/Y/1→Yes and 0/no/N→No. "Normalize Income (0-1 scale)" rescaled the $45,000–$108,000 range to 0.00–1.00 (Cy's $45,000 min → 0.00, Bo's $108,000 max → 1.00). "One-hot encode Category" replaced the single Category column with Category_Retail/Category_Tech/Category_Health 0/1 columns, correctly one-hot per row. The checklist below updated live from all-unchecked to all 4 green checkmarks, and "Checklist score: 4 / 4 fixes applied" appeared — confirms this is real computation on the click, not a static screenshot swap.

Completed the 4-question quiz (why un-normalized features distort k-NN distance, what label standardization does, what one-hot encoding produces, why impute vs. drop). All 4 correct, 4/4 (100%), marked complete.

Content matches curriculum.md's "Feature engineering and data cleaning" section: definition, all 4 subtopics (missing values, categorical encoding, scaling, feature creation), and learning objective all present.

Navigation: "← k-NN and k-Means Clustering" and "Perceptrons and Basic Network Architecture →" both correct.

No bugs found.

### Topic 5: Perceptrons and Basic Network Architecture — PASS

No console errors. Exercise has 3 sliders (w1, w2, bias) over a 12-point 2-class scatter with a live decision-boundary line. At default (w1=1, w2=1, b=0) it showed 100% (12/12). Set w1=-2, w2=2, b=1 via JS input events — boundary line rotated/shifted live and accuracy dropped to "Correctly classified: 5/12 (42%)" with equation text updating to "-2.0x + 2.0y + 1.0 = 0" — confirms live recomputation. Clicked "Switch to XOR dataset (single-layer failure case)" — point layout changed to the classic diagonal-corner XOR arrangement (same weights now scored 4/12, 33%). Tried a different weight combination (w1=3, w2=-3, b=0) on the XOR dataset via JS — still only 4/12 (33%), confirming no linear boundary achieves a perfect score on XOR, exactly as the exercise claims.

Completed the 4-question quiz (hand-computing a weighted sum by hand: 1.5×2 + (-1)×1 + (-1) = 1, why XOR isn't linearly separable, what multi-layer stacking gains, role of the bias term). All 4 correct, 4/4 (100%), marked complete.

Content matches curriculum.md's "Perceptrons and basic network architecture" section: definition, all 4 subtopics (weighted sum, activation/threshold, single-layer limits, multi-layer benefit), and learning objective all present.

Navigation: "← Feature Engineering and Data Cleaning" and "Gradient Descent →" both correct.

No bugs found.

### Topic 6: Gradient Descent — PASS

No console errors. Exercise shows a ball on a loss curve with Learning-rate and Steps-per-Run sliders, Step/Run/Reset buttons. At default (lr=0.1) clicked "Run" — ball moved from x=5.000 (loss=12.500) to x=1.743 (loss=1.520) after 10 steps, with "steps taken: 10" counter incrementing and "Rolling toward lower loss..." status text — confirms real live simulation. Set learning rate to 1.05 via JS, reset ball, ran again — ball converged to x=-0.000 in only 5 steps and the widget printed "Settled — the gradient is nearly zero here, so further steps barely move the ball," disabling Step/Run (buttons visibly grayed). Clicked "Switch to bumpy multi-dip surface" — curve changed to a genuinely multi-dip shape with a labeled "global min" dashed line; ran gradient descent from the starting position (x=5) and watched it settle at x≈2.957 in a shallow local dip (gradient≈0.068) rather than reaching the labeled global minimum near x=0 — this is exactly the local-minimum trapping behavior the topic describes.

Completed the 4-question quiz (what the learning rate controls, overshoot/divergence at high LR, slow convergence at low LR, why local minima trap gradient descent). All 4 correct, 4/4 (100%), marked complete.

Content matches curriculum.md's "Gradient descent" section: definition, all 4 subtopics (loss landscape, learning rate too small/large, local vs global minima, iterative updates/epochs), and learning objective all present.

Navigation: "← Perceptrons and Basic Network Architecture" and "Loss Functions →" both correct.

No bugs found.

### Topic 7: Loss Functions (last topic of Level 3) — PASS

No console errors. Regression mode: dragged the predicted-value slider from 2 to 9 (true value fixed at 6) — live numbers updated correctly each time (pred=2: error=-4.00, MSE=16.00, MAE=4.00; pred=9: error=3.00, MSE=9.00, MAE=3.00 — both hand-verified correct), and the blue MSE parabola vs. orange MAE V-curve rendered distinctly, showing MSE punishing large errors harder. Clicked "Switch to classification (cross-entropy) mode" — UI swapped to a predicted-probability slider and true-label toggle. Set predicted probability to 0.02 — cross-entropy = 3.912 (hand-check: −log(0.02) = 3.912, correct), and the plotted point moved high up the steep left side of the curve. Clicked "True label: positive (flip to negative)" — curve visibly mirrored from −log(p) to −log(1−p) and the point at p=0.02 dropped to near-zero loss (correctly predicting "negative" when probability of positive is low is now the right answer). One minor implementation note (not a user-facing bug): the page keeps a hidden `pred-slider` (regression mode) in the DOM at the same time as the visible `prob-slider` (classification mode) — irrelevant to a real user since only the visible slider is interactive, but worth noting for anyone scripting against the DOM.

Completed the 4-question quiz (hand-computing squared error for true=10/pred=7 → 9, why MSE grows faster than MAE, why classification needs cross-entropy not MSE, cross-entropy behavior as p→0). All 4 correct, 4/4 (100%), marked complete.

Content matches curriculum.md's "Loss functions" section: definition, all 4 subtopics (regression vs classification losses, why loss choice matters, per-example vs average loss, connection to gradient descent's downhill surface), and learning objective all present.

Navigation: "← Gradient Descent" and "Backpropagation and Activation Functions →" (correctly crossing into Level 4) both correct.

No bugs found. **This closes out Level 3 — all 7 topics PASS.**

## Level 4

### Topic 1: Backpropagation and Activation Functions — PASS

No console errors. Exercise is an animated 3-4-2 toy network diagram. Clicked "Run forward pass" — watched status text step through "Forward pass: computing input layer..." then all 9 neurons lit up blue with computed values (e.g. input 0.80, -0.30, 0.50 → output layer prediction [0.61, 0.53]), status read "Forward pass: output layer computed — prediction = [0.61, 0.53]." Clicked "Run backward pass" (only enabled after forward pass completed) — hidden and output neurons turned red with gradient values (input layer correctly stayed blue/unchanged, since gradients w.r.t. inputs aren't computed/shown), status read "Backward pass: hidden-layer blame computed via the chain rule." Swapped the activation-function dropdown from Sigmoid to ReLU and re-ran forward pass — values changed substantially and some hidden neurons showed exactly 0.00, consistent with ReLU's clipping of negative pre-activations, confirming the recomputation is real math tied to the selected activation function, not decorative.

Completed the 4-question quiz (what backprop computes per weight, why all-linear networks collapse to one layer, backward pass direction, vanishing gradients motivating activation choice). All 4 correct, 4/4 (100%), marked complete.

Content matches curriculum.md's "Backpropagation and activation functions" section: definition, all 4 subtopics (chain rule, forward/backward pass, common activations, vanishing gradients), and learning objective all present.

Navigation: "← Loss Functions" (correctly crossing back into Level 3) and "CNNs for Images →" both correct.

No bugs found.

### Topic 2: CNNs for Images — FAIL (rendering bug in the core exercise)

No console errors from normal navigation. Quiz and content are fine (see below), but the hands-on exercise itself has a reproducible visual bug that undermines its pedagogical point.

**Bug — feature-map cells at the strongest-signal position render blank.** Steps to reproduce: load the page (default filter = Vertical-edge detector, default image = left-half-black/right-half-white 8×8 grid). Click a cell in the input image at row 1, col 2 — status text correctly reports "Filter placed at row 1, col 2 → convolution output = -3.00," and a blue selection box appears over the corresponding output cell, but that output cell itself shows no shading and no visible number (confirmed via zoomed screenshot: the cell is empty/white inside the blue outline, unlike neighboring computed cells). Clicking "Sweep entire image" to fill the full 6×6 output feature map reproduces this at scale: columns 2 and 3 (the boundary columns where the image transitions from black to white — precisely the "strongest response" location the exercise and Quiz Question 1 are built around) render completely blank across all 6 rows, while columns 0, 1, 4, 5 (uniform image regions, value 0.00) render correctly with dark-navy shading and white "0.0" text. The bug is not limited to one filter: repeated with the "Sharpen" filter, one specific cell (row 0, col 2, value presumably a local extremum) also rendered blank mid-sweep while adjacent cells with value 2.00 rendered fine. The "Horizontal-edge detector" filter (whose output is uniformly 0.00 for this particular image, since there are no horizontal edges) rendered all 36 cells correctly with no blanks — suggesting the bug is triggered by certain non-zero/extreme computed values rather than being column-position-specific. Net effect: a learner using "Sweep entire image" to visually confirm "the strongest response happens at the boundary column" (exactly what Quiz Q1 asks them to internalize) will see that column rendered empty — the one part of the visualization that matters most is invisible. Underlying computation is correct throughout (verified via the text status readout each time); this is purely a canvas rendering/coloring defect, not a math error.

Secondary, unconfirmed observation: driving the filter `<select>` via a synthetic JS `dispatchEvent(new Event('change'))` twice threw a console TypeError ("Cannot read properties of undefined (reading 'name')" at topic-2.html:311:78). Re-tested the same filter switches using the extension's native `form_input` tool (which drives the select the way a real user's click/keyboard selection would) and got no console errors both directions (vedge→sharpen, sharpen→vedge) — so this specific exception did not reproduce under realistic user interaction and is noted only for awareness, not counted against the pass/fail verdict.

Completed the 4-question quiz (strongest response at boundary column, why weight-sharing is efficient, feature-map definition, what pooling achieves). All 4 correct, 4/4 (100%), marked complete — quiz content and grading work fine independent of the rendering bug above.

Content matches curriculum.md's "CNNs for images" section: definition, all 4 subtopics (convolution as sliding filter, feature maps/stacking, pooling, weight-sharing), and learning objective all present.

Navigation: "← Backpropagation and Activation Functions" and "RNNs and LSTMs for Sequences →" both correct.

**Verdict: FAIL** — quiz and content are solid, but the hands-on exercise's core visual (the feature map) fails to render at exactly the values it's meant to teach the learner to notice.

### Topic 3: RNNs and LSTMs for Sequences — PASS

No console errors. Exercise steps a 7-word sentence ("The movie was surprisingly great but forgettable") through a Plain-RNN memory bar and, with "Also run LSTM comparison" checked, a gated LSTM memory bar side by side. Checked the comparison checkbox, then clicked "Step →" repeatedly. At word 5 ("great," signal 0.90) Plain RNN memory = 0.69 and LSTM memory = 1.00. Continued stepping through "but" and "forgettable" (signal -0.85) to sequence completion (7/7): Plain RNN memory dropped to -0.38 (fully flipped sign, i.e. the earlier positive "great" signal was completely overwritten), while LSTM memory only dropped to -0.22 (partially retaining more of the earlier positive signal) — exactly the intended demonstration that the gated LSTM fades less aggressively than the plain RNN. Word chips highlighted blue as each was consumed, and the Step button correctly disabled itself once the 7-word sequence completed ("Step 7/7: fed word "forgettable" (signal -0.85) into the network. Sequence complete.").

Completed the 4-question quiz (what the hidden-state bar tracks, why plain-RNN memory fades fast, what the LSTM forget gate protects against, sequence-to-sequence intuition). All 4 correct, 4/4 (100%), marked complete.

Content matches curriculum.md's "RNNs/LSTMs for sequences" section: definition, all 4 subtopics (hidden state, vanishing gradients over time, LSTM gates, sequence-to-sequence intuition), and learning objective all present.

Navigation: "← CNNs for Images" and "Intro to NLP: Tokenization, Embeddings, word2vec →" both correct.

No bugs found.

### Topic 4: Intro to NLP (Tokenization, Embeddings, word2vec) — PASS

No console errors. Two-part exercise. Part 1 (live tokenizer): default text "The cat sat on the mat, didn't it?" showed 10 colored token chips with the note "10 tokens (whitespace-separated words would give 8)." Replaced the text with "I can't believe it's already Wednesday!" via triple-click + type — token chips updated live to 7 tokens (I / can't / believe / it's / already / Wednesday / !), correctly keeping contractions like "can't" and "it's" as single tokens rather than splitting on the apostrophe. Part 2 (embedding-space explorer): clicked the word "dog" in the 2D scatter — it turned blue and its 3 nearest neighbors (wolf, puppy, cat) turned green with connecting proximity, and status text read "Nearest neighbors of "dog": wolf, puppy, cat." Clicked "Show king − man + woman ≈ queen" — the plot drew two parallel vector arrows (man→king and woman→queen) and landed a marker exactly on "queen," with caption "king − man + woman lands near "queen" (distance 0.0 units in this toy space) — the same direction that separates man→king also separates woman→queen." This is a well-built, precomputed illustrative demo that clearly delivers the intended "aha."

Completed the 4-question quiz (why one-hot encoding is impractical, what the king/man/woman/queen analogy demonstrates, definition of tokenization, word2vec's core training idea). All 4 correct, 4/4 (100%), marked complete.

Content matches curriculum.md's "Intro NLP (tokenization, embeddings, word2vec)" section: definition, all 4 subtopics (tokenization, why one-hot is impractical, embeddings as dense vectors, word2vec's predict-context idea with the modern-context-aware-embeddings caveat), and learning objective all present.

Navigation: "← RNNs and LSTMs for Sequences" and "Evaluation Metrics: Precision, Recall, F1, ROC-AUC →" both correct.

No bugs found.

### Topic 5: Evaluation Metrics (Precision, Recall, F1, ROC-AUC) — PASS

No console errors. Exercise has a threshold slider over 16 fixed-score examples, a live confusion matrix, precision/recall/F1 readout, and an ROC curve with a moving marker. At default threshold 50: TP=6, FP=3, FN=2, TN=5 → Precision 67% (6/9), Recall 75% (6/8), F1 71% — all hand-verified correct. Dragged the threshold to 90 via JS input event — confusion matrix updated to TP=1, FP=0, FN=7, TN=8 → Precision 100% (1/1), Recall 13% (1/8), F1 22% — hand-verified correct (harmonic mean of 1.0 and 0.125 ≈ 0.222). The ROC curve marker (red dot) moved from mid-curve down toward the origin (low FPR, low TPR) as expected for a high threshold, while "Approx. AUC (this dataset): 0.72" correctly stayed fixed across both threshold settings, demonstrating AUC's threshold-independence exactly as the topic teaches.

Completed the 4-question quiz (false-negative definition, interpreting high-recall/low-precision, why recall is prioritized in disease screening, what distinguishes ROC-AUC from single-threshold metrics). All 4 correct, 4/4 (100%), marked complete.

Content matches curriculum.md's "Evaluation metrics" section: definition, all 4 subtopics (confusion matrix, precision vs recall, F1, ROC-AUC), and learning objective all present.

Navigation: "← Intro to NLP: Tokenization, Embeddings, word2vec" and "Regularization: Dropout, L1/L2 →" both correct.

No bugs found.

### Topic 6: Regularization (Dropout, L1/L2) — PASS

No console errors. Exercise fits a real ridge-regression polynomial live in-browser to a fixed noisy dataset, controlled by an L2-strength slider (0-100 mapped to λ). At default (λ≈0.000001) the curve was wildly wiggly, hugging noise, with "Training loss (MSE): 0.59 | Validation loss (MSE): 1.63" and a red "Overfitting: the curve hugs training noise" message. Set slider to 50 (λ≈0.03) — curve smoothed substantially, losses moved much closer together (Training 1.26, Validation 0.36) with a green "Good balance: the curve follows the underlying trend without chasing noise" message. Pushed slider to 100 (λ≈1000.00) — curve flattened to a near-horizontal line, both losses rose in lockstep to ~39 (Training 39.23, Validation 39.13), with a red "Underfitting: the curve is too constrained — both training and validation loss are high" message. This is a genuinely live-computed regression (not scripted keyframes) and it clearly demonstrates all three regimes (overfit → good fit → underfit) exactly as the topic describes.

Completed the 4-question quiz (recognizing overfitting from a training/validation loss plot, what an L2 penalty adds to the loss, what dropout does, what happens when regularization strength is pushed too high). All 4 correct, 4/4 (100%), marked complete.

Content matches curriculum.md's "Regularization" section: definition, all 4 subtopics (overfitting recap, L1/L2 penalties, dropout, the strength tradeoff), and learning objective all present.

Navigation: "← Evaluation Metrics: Precision, Recall, F1, ROC-AUC" and "PyTorch/TensorFlow Basics →" both correct.

No bugs found.

### Topic 7: PyTorch/TensorFlow Basics — PASS

No console errors. Part 1: page loaded with the 4 training-loop steps scrambled (Backward pass / Update weights / Forward pass / Compute loss). Used the ↑/↓ reorder buttons to sort them into Forward pass → Compute loss → Backward pass → Update weights, clicked "Check order" — got "4/4 correct — that's the real training loop order!" with all rows highlighted green. Part 2: clicked "Step →" 12 times total. Stage highlighting cycled through the 4 labeled boxes (Forward pass/Compute loss/Backward pass/Update weights) as expected, and after every 4th step the status line reported a completed iteration with a dropping loss value ("Completed iteration 1 — loss now 2.213," then "Completed iteration 3 — loss now 1.243" after 12 steps) while a line chart plotted the loss trending monotonically downward — a real, live-updating simulation rather than a static image.

Completed the 4-question quiz (correct training-loop order, what automatic differentiation saves you from, what a tensor is, PyTorch vs TensorFlow style difference). All 4 correct, 4/4 (100%), marked complete.

Content matches curriculum.md's "PyTorch/TensorFlow basics" section: definition, all 4 subtopics (tensors, automatic differentiation, training loop shape, PyTorch vs TensorFlow style), and learning objective all present.

Navigation: "← Regularization: Dropout, L1/L2" and "Transfer Learning →" both correct.

No bugs found.

### Topic 8: Transfer Learning — FAIL (exercise heuristic contradicts the lesson and quiz)

No console errors. Exercise is a 5-layer frozen/fine-tune toggle board with live "estimated labeled data needed / relative compute cost / accuracy with a small (~500-example) dataset" readouts. Interaction itself works correctly — clicking any layer box toggles its Frozen / Fine-tune state and all three estimate numbers update immediately.

**Bug — the "accuracy" heuristic increases monotonically with more layers unfrozen, which is the opposite of what the topic (and this same page's own Quiz Question 3) teaches.** Recorded the "Estimated accuracy with a small (~500-example) dataset" reading at four configurations by clicking layers in sequence:
- Only Layer 5 (task head) fine-tuned, layers 1-4 frozen (pure feature extraction): **70%**
- Default state (Layers 4-5 fine-tuned, 1-3 frozen): **75%**
- Layers 1, 4, 5 fine-tuned (an early layer now unfrozen): **76%**
- All 5 layers fine-tuned (full fine-tune): **78%**

Accuracy rises step by step (70% to 75% to 76% to 78%) every time an additional layer — including early, general-feature layers — is switched to fine-tune. But Quiz Question 3 on this exact page asks "why does unfreezing early layers... tend to hurt accuracy when the new dataset is small?" and the marked-correct answer/explanation states: "With only a small labeled dataset, retraining the general early layers risks overwriting broadly useful features with noise fit to the small new dataset, hurting generalization." A learner who actually plays with the widget (as the instructions explicitly invite them to do — "Watch the estimated data needed, compute cost, and accuracy update live") will observe the opposite of what the quiz demands they conclude: unfreezing early layers here always helps the displayed accuracy number, never hurts it. The "estimated labeled data needed" and "compute cost" numbers do correctly increase with more unfrozen layers (consistent with the lesson), so only the accuracy-vs-small-data heuristic is inverted from the intended teaching point.

Completed the 4-question quiz (why pretrained models need less data, what freezing means, why unfreezing early layers can hurt with small data, when transfer learning works poorly). All 4 correct, 4/4 (100%), marked complete — the quiz's own text is internally correct; it's only the interactive widget's number that contradicts it.

Content (definition, subtopics, learning objective) matches curriculum.md's "Transfer learning" section correctly.

Navigation: "← PyTorch/TensorFlow Basics" and "Data Augmentation and Class Imbalance Handling →" both correct.

**Verdict: FAIL** — the hands-on exercise's live "accuracy" heuristic directly contradicts the lesson's central point about small-dataset fine-tuning risk, which a learner exploring the widget as instructed would notice.

### Topic 9: Data Augmentation and Class Imbalance Handling — PASS

This is the "added" bridging topic not present in curriculum.md's original Level 3-4 body (confirmed: curriculum.md's Level 4 section lists 8 topics — Backpropagation, CNNs, RNNs/LSTMs, Intro NLP, Evaluation Metrics, Regularization, PyTorch/TensorFlow, Transfer Learning — and this is the 9th, on-site-only topic). Judged on internal quality/consistency only, per instructions.

No console errors. Exercise starts at a 9:1 imbalanced toy dataset (900 class A vs. 100 class B) with a "Target minority share (oversampling)" slider and an "Apply data augmentation" checkbox. At baseline (10%): "Simulated minority-class recall: 20%, Simulated overall accuracy: 91%" with message "high overall accuracy, but the model barely detects class B at all" — correctly illustrating the accuracy-paradox this topic teaches. Dragged the slider to 50% via JS input event — bar chart rebalanced live to 900 vs. 900 (50/50), recall rose to 65% but overall accuracy fell to 66% (naive duplication tradeoff). Checked "Apply data augmentation to the added minority examples" — with the same 50/50 split, recall rose further to 80% and accuracy also rose to 76%, with message "Much better minority recall, with a smaller accuracy cost thanks to augmentation adding real variation." Unlike Topic 8's widget, this heuristic is internally consistent with its own lesson: augmentation strictly beats plain duplication on both metrics, matching Quiz Question 3's point about duplication-driven overfitting.

Completed the 4-question quiz (why high accuracy is misleading on imbalanced data, what data augmentation is, the risk of plain-duplication oversampling, class weighting as an alternative). All 4 correct, 4/4 (100%), marked complete.

Content is well-formed and internally consistent: clear definition, 4 relevant subtopics, a learning objective the exercise and quiz both directly support. No inconsistency with the rest of the course's terminology or difficulty level for Level 4.

Navigation: "← Transfer Learning" and "Transformer Architecture and Attention →" (correctly crossing into Level 5) both correct.

No bugs found.

## Summary

16 topics tested (Level 3: 7 topics, Level 4: 9 topics).

- **PASS: 14** — Level 3 topics 1-7 (all 7), Level 4 topics 1, 3, 4, 5, 6, 7, 9 (7 of 9).
- **FAIL: 2** — Level 4 Topic 2 (CNNs for Images) and Level 4 Topic 8 (Transfer Learning).

All 16 topics' quizzes graded correctly (4/4, 100%, "marked complete") and all prev/next navigation links were correct throughout both levels, including the Level 3→4 and Level 4→5 boundary transitions. No console errors were found on any topic during normal use; the one console exception observed (Topic 2, via synthetic JS event dispatch) did not reproduce under realistic native-select interaction and was not counted as a bug.

Bugs found:
1. **Level 4 Topic 2 (CNNs for Images):** The "Sweep entire image" feature-map visualization renders certain non-zero-value cells (including the boundary column — the exercise's whole pedagogical point) completely blank (no shading, no number), even though the underlying convolution math is correct (verified via the text status readout). Reproducible across multiple filters (Vertical-edge, Sharpen); confirmed the Horizontal-edge filter (whose true output is all-zero for this image) renders every cell correctly, suggesting the bug triggers on certain non-zero/extreme values rather than a fixed grid position.
2. **Level 4 Topic 8 (Transfer Learning):** The exercise's live "Estimated accuracy with a small (~500-example) dataset" heuristic increases monotonically as more layers (including early, general-feature layers) are switched from Frozen to Fine-tune (70% → 75% → 76% → 78% across 1, 2, 3, and 5 fine-tuned layers respectively). This directly contradicts the topic's central teaching point and this same page's own Quiz Question 3, which states that unfreezing early layers with a small dataset should hurt accuracy via overfitting/catastrophic forgetting. A learner who explores the widget as instructed will see data that contradicts what the quiz requires them to believe.

