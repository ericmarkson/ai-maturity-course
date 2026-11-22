# Hands-on QA Report — Levels 1-2

Status: COMPLETE. All 15 assigned topics tested (Level 1 Topics 1-7, Level 2 Topics 1-8). Result: 15/15 PASS. No functional bugs found. One non-blocking documentation discrepancy: curriculum.md's Level 1 section lists only 6 topics, but the live site has 7 (Topic 7, "A Brief History of AI," is not documented in curriculum.md — see that topic's section below for detail). Section order below is non-sequential (topics were appended as tested, not renumbered) but every topic's content is complete and accurate.

## Level 1, Topic 1 — What AI, ML, and Deep Learning Actually Are

**Result: PASS**

- Loaded `levels/level-1/topic-1.html`. No console errors (checked with `read_console_messages onlyErrors:true`).
- Content (definition, subtopics, gut-check paragraph) matches `curriculum.md` Level 1 Topic 1 text closely, including the AI ⊃ ML ⊃ Deep Learning framing.
- Exercise: drag-and-drop sort of 9 system chips into 4 nested zones (Not AI / AI rule-based / ML not deep / Deep Learning), using click-to-pick-up then click-to-place interaction (no real drag needed).
  - Confirmed a **wrong placement bounces back**: clicked "1970s rule-based chess program" then clicked the "Deep Learning" zone — chip returned to the tray, not placed, live counter stayed at 1/9.
  - Placed all 9 chips in their correct zones one at a time; each correct drop turned green, locked in place, and showed a one-line explanation (e.g. "Single-hidden-layer digit recognizer — Technically a tiny neural network, but with only one shallow layer it doesn't count as 'deep' — still just ML."). Live counter updated correctly at each step (1/9 → 2/9 → ... → 9/9) and a final "All 9 systems sorted correctly! Nice work." message appeared.
- Quiz: 4 multiple-choice questions. Answered Q1–Q3 correctly and Q4 deliberately wrong ("Not AI" instead of "ML, but not deep enough") to test grading. Clicking "Check answers" correctly highlighted Q1–Q3 green with rationale text, and Q4 red with the correct answer ("ML, but not deep enough to be called deep learning") also highlighted and an explanatory rationale shown. Grading works correctly for both right and wrong answers.
- Navigation: prev link reads "← Start of course" (correct, this is the very first topic), next link reads "Narrow AI vs. General AI →" (correct per curriculum order).
- No bugs found.

## Level 2, Topic 8 — Basic Prompt Engineering

**Result: PASS**

- Loaded `levels/level-2/topic-8.html`. No console errors (`read_console_messages onlyErrors:true` returned none).
- Content matches curriculum.md Level 2 Topic 8 exactly: definition covers role/context/task/format as the four core prompt elements, subtopics list the same four elements plus "being specific," few-shot examples, and iterating on a first response as a draft.
- Exercise: "Prompt Builder" widget starting from a weak base prompt ("Write about dogs.") with a Specificity score starting at 5/100 ("Vague"). Toggled on all five optional elements one at a time and confirmed live updates after each:
  - Checked "Role" and typed "You are an experienced veterinarian who writes for a general audience." → Assembled prompt gained the role line, Specificity score rose 5 → 25, Simulated AI response changed to "Speaking as someone in that role: ...".
  - Checked "Context" and typed the children's-blog audience line, then checked "Output format" (dropdown left at placeholder for this step) → Assembled prompt gained a Context line, score rose 25 → 45 ("Basic — some direction, but still room to be specific"), Simulated AI response added a "(tailored for: ...)" clause.
  - Set the Output format dropdown to "A bulleted list of 5 facts" via direct DOM manipulation (native `<select>` element; confirmed the placeholder option's literal value is the string "(choose a format)", not empty, so a naive first attempt to select "any non-empty value" incorrectly reselected the placeholder — fixed by explicitly setting value to the real option text). Then checked "Few-shot example" and typed the suggested cat example, and checked "Constraints" and typed the 60-word/no-jargon line.
  - Final state: Assembled prompt showed all 6 lines (role, context, task, format, example, constraints) concatenated correctly in order; Specificity score jumped to 95/100 ("Excellent — role, context, format, and an example all guide the model."); Simulated AI response became a genuinely different 5-bullet-point response about dogs, restyled to match the example's "shorter, punchier sentences" and noting it was "Trimmed and adjusted to respect" the stated constraints. Before/after screenshots clearly show all three outputs (assembled prompt, score, simulated response) changing at each step — this is a real, working live-update exercise, not a static widget.
- Quiz: 4 questions. Answered Q1 ("Role, context, task, and desired output format"), Q2 ("the model has to guess the audience, purpose, and format..."), and Q3 ("It shows the model the specific style, tone, or structure you want...") correctly; deliberately answered Q4 ("True or false: you should treat an AI's first response as the final, correct answer") wrong by selecting "True". Clicking "Check answers" correctly highlighted Q1–Q3 green with rationale text, Q4 red on both the "True" option and revealing "False" as correct, with rationale "prompt engineering is iterative...". Score summary showed "3 / 4 correct (75%)", "Nice work — that's a passing score.", and "This topic has been marked complete." — consistent with the score-summary/auto-complete pattern confirmed universal across all topics tested in this report.
- Navigation: prev link reads "← Using AI Tools and APIs (ChatGPT, Claude, etc.)" (correct), next link reads "Python for ML: NumPy and Pandas →" (correct — this is Level 3 Topic 1, confirming Level 2 has exactly 8 topics as expected).
- No bugs found.

## Level 1, Topic 3 — Core Vocabulary: Model, Training, Inference, Dataset, Parameters

**Result: PASS**

- Loaded `levels/level-1/topic-3.html`. No console errors.
- Content matches curriculum.md exactly (dataset/training/model/parameters/inference definitions, "training happens once, inference happens every time" framing).
- Exercise: label a 5-step pipeline (raw data → training → model → parameters → inference/prediction) by dragging 5 vocabulary chips onto 5 boxes via click-to-pick-up/click-to-place.
  - Confirmed wrong placement bounces back: placed "Model" onto Step 1 ("the raw examples") — box flashed red/pink and chip returned to tray, counter stayed 0/5.
  - Placed all 5 terms correctly one at a time (Dataset→Step1, Training→Step2, Model→Step3, Parameters→Step4, Inference→Step5); each correct drop turned the box green and locked the label in; live counter went 1/5 → 2/5 → ... and finished with "Pipeline fully labeled correctly! 5 / 5."
- Quiz: 4 questions. Answered Q1–Q3 correctly, Q4 (pipeline ordering) deliberately wrong by picking "Inference" instead of "Training". "Check answers" correctly marked Q1–Q3 green with rationale and Q4 red with rationale ("Not quite. Training must happen first to produce a model...").
- Navigation: prev "← Narrow AI vs. General AI" (correct), next "Everyday AI Applications →" (correct per curriculum order).
- No bugs found.

## Level 1, Topic 5 — What a Neural Network Is, Conceptually

**Result: PASS**

- Loaded `levels/level-1/topic-5.html`. No console errors.
- Content matches curriculum.md (neurons/layers/connections, brain metaphor and its limits, "more layers capture more complex patterns", cat-vs-dog toy example).
- Exercise: 3 input sliders (ear pointiness, vocal pitch, tail wag speed) feed a tiny animated 3-layer network (3 input nodes → 4 hidden → 2 output CAT/DOG) with a live prediction readout.
  - Dragged all 3 sliders to extreme cat-like values (ear pointiness 100, vocal pitch 100, tail wag speed 0). Prediction updated live from the default "CAT — cat 57% vs dog 39%" to "CAT — cat 79% vs dog 17%" purely from slider movement, confirming live reactivity.
  - Clicked "Run (animate)": button disabled and status text read "Signal entering input layer..."; after ~3s the full network diagram showed all connections lit up blue from input through hidden to output layer, with the CAT output node highlighted (green, ringed) matching the 79%/17% prediction — a clear, genuine before/after visual difference from the animation.
- Quiz: 4 questions. Answered Q1, Q3, Q4 correctly and Q2 deliberately wrong (picked "the term neuron was invented for computers first" instead of "artificial neurons are simplified mathematical functions"). "Check answers" scored 3/4 (75%), correctly marked Q2 as the wrong one with rationale, showed "Nice work — that's a passing score." and "This topic has been marked complete."
- Navigation: prev "← Everyday AI Applications" (correct), next "Basic AI Ethics: Bias and Privacy →" (correct per curriculum order).
- No bugs found.

## Level 1, Topic 6 — Basic AI Ethics: Bias and Privacy

**Result: PASS**

- Loaded `levels/level-1/topic-6.html`. No console errors.
- Content matches curriculum.md's "Basic AI Ethics (Bias, Privacy)" section closely (bias-from-training-data framing, hiring/facial-recognition/lending examples, privacy trade-off, "the algorithm did it" accountability point).
- Exercise: hiring-threshold bias simulator with 20 toy candidates per group, a decision-threshold slider, and a bias-correction slider applied to Group B.
  - Dragged the bias-correction slider to +30: the scatter plot visibly re-colored — Group B's dots flipped from mostly red (rejected) to mostly green (accepted), and the stats line updated live from "Group A: 18/20 (90%), Group B: 4/20 (20%), Gap: 70pp" to "Group A: 18/20 (90%), Group B: 20/20 (100%), Gap: 10pp."
  - Dragged the decision-threshold slider to 100 (max): both groups' accept counts dropped to near zero live ("Group A: 0/20 (0%), Group B: 1/20 (5%), Gap: 5pp"), correctly demonstrating that the same threshold rule applied to both groups still produces a gap driven by the underlying (biased) scores, not the rule.
- Quiz: 4 questions. Answered Q1, Q3, Q4 correctly and Q2 deliberately wrong (picked "the slider secretly applies a stricter threshold to Group B only" instead of the correct "Group B's underlying scores are lower because of historically skewed training data"). "Check answers" scored 3/4 (75%), correctly flagged Q2, showed passing-score message and "This topic has been marked complete."
- Navigation: prev "← What a Neural Network Is, Conceptually" (correct). Next link reads "A Brief History of AI: From Symbolic Systems to Deep Learning →" — **note**: this is a 7th Level-1 topic that does not appear in the `research/curriculum.md` file I was given as the reference (that file's "Level 1 — Beginner" section lists only 6 topics: AI/ML/DL, Narrow vs General AI, Core Vocabulary, Everyday AI Applications, Neural Networks Conceptually, Basic AI Ethics). Since the task brief says Level 1 has 7 topics and the site does serve `topic-7.html`, this is very likely just curriculum.md being an older/incomplete snapshot rather than a site bug — flagging for awareness, not marking as a failure. Topic 7 is tested separately below against the live page content only (no curriculum.md section to compare against).
- No bugs found in this topic's own functionality.

## Level 1, Topic 7 — A Brief History of AI: From Symbolic Systems to Deep Learning

**Result: PASS**

- Loaded `levels/level-1/topic-7.html`. No console errors. As noted in the Topic 6 entry above, this topic is NOT present in `research/curriculum.md`'s Level 1 section (that doc lists only 6 Level-1 topics), so content was checked for internal accuracy and coherence rather than against a reference spec. Content is factually solid: 1956 Dartmouth workshop (correctly described as where the term "artificial intelligence" was coined), GOFAI/symbolic AI, expert systems (MYCIN, XCON with a plausible $40M/year DEC savings figure), AI winters, the 2006-2012 deep learning re-emergence (AlexNet/ImageNet correctly cited), and the 2017 Transformer paper "Attention Is All You Need." No factual errors spotted.
- Exercise: interactive timeline ("Scrub through AI history") with a year slider and 8 clickable era markers (1950, 1956, 1974, 1980, 1987, 1993, 2006, 2012).
  - Clicked the 2006 marker: slider jumped to 2006, that marker filled in solid blue, and the detail panel below swapped to "Deep Learning Re-emerges" text (AlexNet/ImageNet key fact) — confirmed via screenshot diff.
  - Clicked the 1980 marker: same live update to "Expert Systems Boom" (MYCIN/XCON text). Confirms genuine interactivity across multiple markers, not just a static default state.
- Quiz: 4 questions. Answered Q1, Q2, Q4 correctly and Q3 deliberately wrong (picked "The invention of the internet and the first personal computer" instead of "Better training techniques + GPU hardware"). "Check answers" scored 3/4 (75%), correctly flagged Q3 red with rationale, showed passing message and "This topic has been marked complete."
- Navigation: prev "← Basic AI Ethics: Bias and Privacy" (correct), next "Supervised vs. Unsupervised vs. Reinforcement Learning →" (correct — this is Level 2 Topic 1, confirming Level 1 has 7 topics total on the live site as the task brief states).
- No functional bugs found. Only note carried over from Topic 6: curriculum.md's Level 1 section appears to be missing this topic's spec (likely a stale/incomplete doc, not a site defect).

## Level 2, Topic 1 — Supervised vs. Unsupervised vs. Reinforcement Learning

**Result: PASS**

- Loaded `levels/level-2/topic-1.html`. No console errors.
- Content matches curriculum.md's Level 2 Topic 1 section closely (three-way definition, labeled/unlabeled/reward-based framing, email spam and customer-grouping examples).
- Exercise: 9 scenario cards sorted into 3 bins (Supervised / Unsupervised / Reinforcement Learning). **Different interaction pattern from every Level 1 exercise**: instead of bouncing a wrong drop back to the tray, this widget accepts the placement into whichever bin you chose, shows inline "✓ Correct" or "✗ Not quite" feedback with the right-answer rationale directly in that bin, and locks the card there permanently (no retry for that card). Confirmed by deliberately placing "Group customers into segments..." into the wrong bin (Reinforcement Learning) — it landed there with a red "✗ Not quite" box and the correct-answer rationale, and the live counter read "Placed 1/9 — 0 correct so far." Placed the remaining 8 cards correctly one at a time; counter tracked correctly through "9/9 — 8 correct so far" (matching my 1 deliberate miss + 8 correct). This is a legitimate alternate UX pattern (quiz-style, not retry-until-right), not a bug — but worth the build team knowing the two widget styles coexist across the site.
- Quiz: 4 questions. Answered Q1, Q3, Q4 correctly and Q2 deliberately wrong (picked "Supervised learning" instead of "Unsupervised learning" for the news-clustering scenario). "Check answers" scored 3/4 (75%), correctly flagged Q2, showed passing message and "This topic has been marked complete."
- Navigation: prev "← A Brief History of AI: From Symbolic Systems to Deep Learning" (correct, confirms Level 1→2 transition), next "Basic Probability and Statistics for ML →" (correct per curriculum order).
- No bugs found.

## Level 2, Topic 2 — Basic Probability and Statistics for ML

**Result: PASS**

- Loaded `levels/level-2/topic-2.html`. No console errors.
- Content matches curriculum.md's Level 2 Topic 2 section (probability, mean/variance, correlation-vs-causation, "87% confident" framing).
- Exercise has two parts:
  - Histogram builder: dragged Shift (mean) slider to +1.5 and Spread (variance) slider to ×2.0. Histogram bars visibly re-shaped (widened and shifted right) and the Mean/Variance readouts updated live from 4.50/2.23 to 5.43/5.35, confirming genuine reactivity.
  - Correlation explorer: clicked through all 3 toggle buttons (Correlated / Uncorrelated / Correlated-not-causal). Each swapped the scatter plot to a different dataset with different axis labels and a different explanatory caption — "Correlated" showed study-hours-vs-exam-score trending up; "Uncorrelated" showed a random scatter labeled "Typing speed"; "Correlated, not causal" showed the classic ice-cream-sales-vs-drowning-incidents example with the caption "these move together too — but ice cream doesn't cause drownings. A hidden third factor (hot summer weather) drives both."
- Quiz: 4 questions. Answered Q1, Q3, Q4 correctly and Q2 deliberately wrong (picked "Both increase" instead of "The mean increases, variance stays the same" for the shift-only scenario). "Check answers" scored 3/4 (75%), correctly flagged Q2, showed passing message and "This topic has been marked complete."
- Navigation: prev "← Supervised vs. Unsupervised vs. Reinforcement Learning" (correct), next "Linear and Logistic Regression →" (correct per curriculum order).
- No bugs found.

## Level 2, Topic 3 — Linear and Logistic Regression

**Result: PASS**

- Loaded `levels/level-2/topic-3.html`. No console errors.
- Content matches curriculum.md's Level 2 Topic 3 section (line-fitting vs. S-curve, weights-as-importance, house price vs. pass/fail examples).
- Exercise has two modes toggled by buttons:
  - Linear regression mode: dragged the left handle up (worse fit) — Mean squared error visibly rose live from 1.109 to 2.202, with the on-screen hint text changing from "(getting closer)" to "(try dragging the handles)". Dragged both handles back to a better fit — MSE dropped to 1.025, confirming bidirectional live feedback tied to actual line position.
  - Logistic regression mode: toggled to it and saw an S-curve over red/green (no/yes) labeled points with "Classification accuracy at 0.5 threshold: 100%". Dragged the curve's midpoint handle left — accuracy dropped live to 67%, correctly reflecting that the shifted threshold now misclassifies some points. A "Curve steepness" slider was also present (not required to test further given the midpoint-drag result already proved live reactivity).
- Quiz: 4 questions. Answered Q1, Q3, Q4 correctly and Q2 deliberately wrong (picked "Linear regression" instead of "Logistic regression" for the loan-default yes/no scenario). "Check answers" scored 3/4 (75%), correctly flagged Q2 red with rationale, and the other three green with rationale.
- Navigation: prev "← Basic Probability and Statistics for ML" (correct), next "Classification vs. Regression →" (correct per curriculum order).
- No bugs found.

## Level 2, Topic 4 — Classification vs. Regression

**Result: PASS**

- Loaded `levels/level-2/topic-4.html`. No console errors.
- Content matches curriculum.md's Level 2 Topic 4 section (discrete categories vs. continuous numbers, binary vs. multi-class, image-labeling vs. sales-forecasting examples).
- Exercise: 12-card rapid-fire flashcard quiz tapping "Classification" or "Regression" per task description. Played through all 12 cards (movie genre, fraud detection, product category, customer age, spam filter, language ID, revenue forecast, house price, temperature, tumor diagnosis, exam score, fuel efficiency), answering 11 correctly and 1 deliberately wrong (spam/not-spam misclassified as Regression) to test both feedback paths.
  - Correct taps: card flashed green with "Correct — that's [type]." and the running "Accuracy: X% (n/n)" counter in the header updated live and correctly after every single card (verified via zoomed screenshots at each step: 0%→100%(1/1)→100%(2/2)→...→92%(11/12)).
  - Wrong tap: card flashed red/pink with "Not quite — that's actually classification." — confirmed inline wrong-answer feedback works, distinct from (and consistent with) the Level 2 Topic 1 card-sort widget's feedback style.
  - After card 12, a "Deck complete! Final accuracy: 92% (11/12)" summary screen appeared with a "Restart deck" button, correctly matching the 11/12 I actually got right.
- Quiz: 4 questions. Answered Q1, Q3, Q4 correctly and Q2 deliberately wrong (picked "Classification" instead of "Regression" for the 3.4-day delivery estimate). "Check answers" correctly flagged Q2 red with rationale ("Not quite. A continuous numeric output (3.4 days) is a regression task.") and the rest green.
- Navigation: prev "← Linear and Logistic Regression" (correct), next "Train/Validation/Test Splits →" (correct per curriculum order).
- No bugs found.

## Level 2, Topic 5 — Train/Validation/Test Splits

**Result: PASS**

- Loaded `levels/level-2/topic-5.html`. No console errors.
- Content matches curriculum.md's Level 2 Topic 5 section (train/val/test roles, 70/15/15 rule of thumb, data leakage).
- Exercise: 100-dot split visualizer with two sliders (train/val boundary, val/test boundary) and a "cheat" checkbox, plus an "Evaluate model" button.
  - Clicked "Evaluate model" with cheat unchecked: got "Reported accuracy: 75%. This is measured on the 15 held-out test points the model never saw during training — an honest estimate of real-world performance" (green box).
  - Checked the "Cheat: evaluate on training data instead of the test set" box and re-evaluated: got "Reported accuracy: 99%. Suspiciously high — that's because you evaluated the model on the same data it memorized during training. This number tells you almost nothing about how it'll perform on new, unseen data" (red warning box) — this is exactly the intended pedagogical contrast and it worked correctly.
  - Dragged the Train/Val boundary slider: dot counts and the "Train: X, Validation: Y, Test: Z" legend updated live and correctly (verified change from 70/15/15 to 33/52/15).
- Quiz: 4 questions. Answered Q1, Q3, Q4 correctly and Q2 deliberately wrong (picked "Replacing the test set entirely" instead of "Tuning choices during development" for what the validation set is for). "Check answers" scored 3/4 (75%), correctly flagged Q2, showed passing message and "This topic has been marked complete."
- Navigation: prev "← Classification vs. Regression" (correct), next "Overfitting vs. Underfitting →" (correct per curriculum order).
- No bugs found.

## Level 2, Topic 6 — Overfitting vs. Underfitting

**Result: PASS**

- Loaded `levels/level-2/topic-6.html`. No console errors.
- Content matches curriculum.md's Level 2 Topic 6 section (overfit/underfit definitions, symptoms, causes, fix direction).
- Exercise: model-complexity slider (polynomial degree 1-9) over a fixed noisy scatter of train/test points, with live train-error/test-error readouts and a diagnosis banner.
  - At degree 1 (default): "Train error 14.1, Test error 11.0" with green "Good fit: training and test error are both low and close together."
  - Dragged slider to max (degree 9): curve visibly became wildly wiggly, chasing individual points; Train error dropped to 0.0 while Test error spiked to 94.6, and the banner correctly switched to red "Overfit: training error is low but test error is much higher — the curve is chasing noise, not the true pattern." Clear, correct before/after contrast.
- Quiz: 4 questions. Answered Q1, Q2, Q4 correctly and Q3 deliberately wrong (picked "It became a perfectly flat line" instead of "increasingly wiggly, chasing individual training points"). "Check answers" scored 3/4 (75%), correctly flagged Q3 with rationale, showed passing message and "This topic has been marked complete."
- Navigation: prev "← Train/Validation/Test Splits" (correct), next "Using AI Tools and APIs (ChatGPT, Claude, etc.) →" (correct per curriculum order).
- No bugs found.

## Level 2, Topic 7 — Using AI Tools and APIs (ChatGPT, Claude, etc.)

**Result: PASS**

- Loaded `levels/level-2/topic-7.html`. No console errors.
- Content matches curriculum.md's Level 2 Topic 7 section (chat vs. API framing, context window, system prompt vs. user message, hallucination/knowledge-cutoff limitations).
- Exercise: side-by-side "Chat interface" and "Equivalent API call" panels. Typed "What is the capital of France?" into the chat box and clicked Send.
  - Left pane: my message appeared as a user bubble, and after ~2s an assistant reply bubble appeared: "Here's a canned demo reply to: 'What is the capital of France?'. A real assistant would generate this live from the model."
  - Right pane: simultaneously populated with a realistic `POST /v1/messages` JSON request (system message "You are a helpful assistant.", user message matching exactly what I typed, `max_tokens: 256`) and a response body containing the identical canned reply text plus a plausible `usage: {input_tokens, output_tokens}` block — clearly demonstrating "same message, same model, two different access surfaces."
- Quiz: 4 questions. Answered Q1, Q3, Q4 correctly and Q2 deliberately wrong (picked "A setting that controls response speed" instead of "The limited amount of conversation/text the model can consider at once" for context window). "Check answers" scored 3/4 (75%), correctly flagged Q2, showed passing message and "This topic has been marked complete."
- Navigation: prev "← Overfitting vs. Underfitting" (correct), next "Basic Prompt Engineering →" (correct per curriculum order).
- No bugs found.

## Level 1, Topic 2 — Narrow AI vs. General AI

**Result: PASS**

- Loaded `levels/level-1/topic-2.html`. No console errors.
- Content matches curriculum.md Level 1 Topic 2 (ANI/AGI definitions, ASI mention, "broad within a lane vs. adaptable across any lane" framing) verbatim.
- Exercise: 6 sliders (0=narrow, 100=general) for FAQ bot, chess engine, recommendation algorithm, self-driving stack, GPT chatbot, hypothetical AGI. Clicked directly on each slider track to set values (7, 13, 7, 24, 39, 100) — value readout updated live next to each slider and a position marker moved on the narrow↔general bar below it, confirming genuine before/after visual change.
  - Clicked "Check my placements": a red reference-position triangle marker appeared on each bar plus a per-item rationale ("✓ Close! Reference: 5. Follows a fixed decision tree..." etc.), and a summary "5 / 6 placements were close to the reference position" appeared (my GPT-chatbot guess of 39 was marked "Somewhat off" vs. reference 55 — correctly detected as not close).
- Quiz: 4 questions. Answered Q1, Q2, Q4 correctly and Q3 (true/false chess-engine question) deliberately wrong. "Check answers" correctly marked Q1/Q2/Q4 green with rationale and Q3 red with rationale ("Not quite. False — being superhuman at one narrow task is the definition of narrow AI...").
- Navigation: prev "← What AI, ML, and Deep Learning Actually Are (and How They Differ)" (correct), next "Core Vocabulary: Model, Training, Inference, Dataset, Parameters →" (correct per curriculum order).
- No bugs found.

## Level 1, Topic 4 — Everyday AI Applications

**Result: PASS**

- Loaded `levels/level-1/topic-4.html`. No console errors.
- Content matches curriculum.md (recommendation systems, voice assistants, chatbots, behind-the-scenes AI categories; "act on your behalf" vs "explicit request" framing).
- Exercise: 7-scene "day in the life" timeline (7:00am wake up ... 8:30pm stream a show). Clicked each timeline tab in turn — the detail panel below correctly swapped to show that scene's 2 AI features (e.g. 9:00am → Spam filter / Smart-reply suggestions; 1:00pm → "You might also like" recommendations / Card fraud detection), each tagged with its category chip (Behind-the-scenes AI / Recommendation system / Voice assistant / Conversational chatbot). Checked both checkboxes for every one of the 7 scenes (14 items total); the live counter incremented correctly each time (0→2→4→6→8→10→12→14) and checkboxes visibly turned blue/checked. Final state: "You've recognized 14 of 14 AI-powered moments in your day."
- Quiz: 4 questions. Answered Q1, Q3, Q4 correctly and Q2 deliberately wrong (picked "Typing a question directly into a chatbot" instead of "Card fraud detection running silently"). Clicking "Check answers" showed per-question color coding and rationale, plus an overall score summary below the questions: "3 / 4 correct (75%)", "Nice work — that's a passing score.", "This topic has been marked complete." (Re-verified on topic 1 with a fresh 4/4 run — this score-summary-plus-auto-complete behavior is present on every topic; I'd simply scrolled away before seeing it on topics 1-3. Not a bug.)
- Navigation: prev "← Core Vocabulary: Model, Training, Inference, Dataset, Parameters" (correct), next "What a Neural Network Is, Conceptually →" (correct per curriculum order).
- No bugs found.

