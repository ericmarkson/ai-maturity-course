# COMPONENTS.md — Content Builder's Manual

This is the plug-in manual for the shared scaffold under `site/`. You (a content
builder) will NOT see the reasoning behind these files — only what's written
here and in the code itself. Read this fully before writing any topic pages.

Everything is plain HTML + vanilla JS + one shared CSS file. No build step,
no framework, no npm. Every page must work by opening the `.html` file
directly in a browser.

---

## 1. Directory layout & canonical filenames

```
site/
  index.html                     home page
  example-topic.html             REFERENCE / gold-standard template page (read this!)
  COMPONENTS.md                  this file
  assets/
    css/styles.css               shared stylesheet — do not fork, add to it
    js/course-data.js            window.COURSE — the single source of truth
    js/progress.js               window.Progress — localStorage tracker
    js/quiz.js                   window.Quiz — grading quiz component
    js/exercise.js               window.Exercise — exercise chrome/shell
    js/site.js                   window.Site — header/footer/nav rendering
  levels/
    level-1/index.html           level 1 overview (already built — don't touch)
    level-1/topic-1.html         <-- YOU create these
    level-1/topic-2.html
    ... up to level-1/topic-7.html
    level-2/topic-1.html ... topic-8.html
    level-3/topic-1.html ... topic-7.html
    level-4/topic-1.html ... topic-9.html
    level-5/topic-1.html ... topic-9.html
    level-6/topic-1.html ... topic-8.html
    level-7/topic-1.html ... topic-8.html
    level-8/topic-1.html ... topic-8.html
    level-9/topic-1.html ... topic-8.html
    level-10/topic-1.html ... topic-8.html
```

**Canonical filename rule:** every topic file lives at
`levels/level-{L}/topic-{T}.html`, where `T` is the topic's 1-based position
within level `L`. **`site/assets/js/course-data.js` is the authoritative list**
of all 80 topics — it gives you, for every topic, the exact `file` path to
create and the exact `title` to use as your `<h1>`/page title. Do not rename,
renumber, or invent your own paths. Do not edit `course-data.js`,
`progress.js`, `quiz.js`, `exercise.js`, `site.js`, or `styles.css` — those
are locked scaffold files shared by all 80 pages.

**Content source:** for 76 of the 80 topics, `research/curriculum.md` has a
full spec (definition, subtopics, learning objective, hands-on exercise
idea) under a `###` heading matching the topic title — use it directly. **Four
topics were added to course-data.js to satisfy the required per-level topic
counts and do NOT have a matching section in curriculum.md** (they were
short by one topic each in the source syllabus): topic id `1-7` ("A Brief
History of AI"), `4-9` ("Data Augmentation and Class Imbalance Handling"),
`5-9` ("Generative Models: GANs, VAEs, and Diffusion Models"), and `6-8`
("Content Moderation and Guardrails for LLM Applications"). If you're
assigned one of these, write original lesson content and a real exercise at
the same quality bar as every other topic — there's no curriculum.md section
to crib from for just those four.

---

## 2. Path prefix — READ THIS BEFORE COPYING ANYTHING

`site/example-topic.html` sits at the **site root**, so its asset links look
like `assets/css/styles.css`. Your real topic pages sit **two folders deep**
at `levels/level-N/topic-T.html`, so every asset link and every nav-root
reference must be prefixed `../../` instead. Don't copy example-topic.html's
paths literally — copy the pattern below, which already has the correct
`../../` prefix baked in.

### Copy-pasteable skeleton for `levels/level-N/topic-T.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>EXACT TOPIC TITLE FROM course-data.js — AI Maturity Course</title>
<meta name="description" content="One-sentence summary of this topic.">
<link rel="stylesheet" href="../../assets/css/styles.css">
<script>
  window.SITE_ROOT = "../../";
  window.CURRENT_TOPIC_ID = "N-T";  <!-- e.g. "3-4" — YOUR topic's real id from course-data.js -->
</script>
</head>
<body>

<div id="site-header"></div>

<main class="page-main" id="main-content">

  <p class="card-eyebrow">Level N — LEVEL NAME</p>
  <h1>EXACT TOPIC TITLE</h1>

  <div class="lesson-content">
    <div class="lesson-objective">
      <strong>Learning objective:</strong> ...from curriculum.md...
    </div>
    <section>
      <h2>Definition</h2>
      <div class="definition-box"><p>...</p></div>
    </section>
    <section>
      <h2>Subtopics</h2>
      <ul><li>...</li></ul>
    </section>
  </div>

  <section aria-labelledby="exercise-heading">
    <h2 id="exercise-heading">Hands-On Exercise</h2>
    <div id="exercise-mount"></div>
  </section>

  <section aria-labelledby="quiz-heading">
    <h2 id="quiz-heading">Check Your Understanding</h2>
    <div id="quiz-mount"></div>
  </section>

  <div id="prev-next-mount"></div>

</main>

<div id="site-footer"></div>

<!-- Script load order matters: course-data -> progress -> quiz/exercise -> site -->
<script src="../../assets/js/course-data.js"></script>
<script src="../../assets/js/progress.js"></script>
<script src="../../assets/js/quiz.js"></script>
<script src="../../assets/js/exercise.js"></script>
<script src="../../assets/js/site.js"></script>
<script>
  (function () {
    var TOPIC_ID = window.CURRENT_TOPIC_ID; // "N-T" — use this everywhere below

    Exercise.create(document.getElementById("exercise-mount"), {
      title: "...",
      instructions: "...",
      topicId: TOPIC_ID, // optional — shows an "I did it" button
      mount: function (root, ctx) {
        // Build a REAL, working interactive widget here. See rule #4 below.
      }
    });

    Quiz.render(document.getElementById("quiz-mount"), {
      topicId: TOPIC_ID,       // optional — auto-marks complete on a passing score
      passPercent: 70,         // optional, default 70
      questions: [
        { q: "...", options: ["...", "...", "...", "..."], answer: 0, explanation: "..." }
      ]
    });

    Site.renderPrevNext(document.getElementById("prev-next-mount"));
  })();
</script>
</body>
</html>
```

Set `window.CURRENT_TOPIC_ID` to **your own topic's real id** (e.g. `"3-4"`)
before `site.js` runs. This single line drives: prev/next nav targets, the
"current page" highlight in the Levels menu, and is the conventional
`topicId` you should pass into `Quiz.render`/`Exercise.create` so a passing
quiz or a clicked "I did it" button marks *this* topic complete.

---

## 3. `window.COURSE` (course-data.js)

Read-only reference data. Shape:

```js
window.COURSE.levels[0] === {
  num: 1, name: "Beginner",
  topics: [
    { num: 1, id: "1-1", title: "...", file: "levels/level-1/topic-1.html" },
    ...
  ]
}
```

Use it to confirm your topic's exact title and file path. Don't mutate it.

---

## 4. `window.Progress` (progress.js) — localStorage progress tracker

```js
Progress.isComplete("3-4")          // -> boolean
Progress.markComplete("3-4")
Progress.markIncomplete("3-4")
Progress.toggle("3-4")
Progress.getCompletedCount()        // -> number, across all 80
Progress.getTotalCount()            // -> 80
Progress.getLevelProgress(3)        // -> { completed, total }
Progress.reset()                    // clears everything
Progress.onChange(function (detail) {
  // detail = { completed, total } — fires after every mutation
})
```

Real localStorage under the hood, namespaced key `aimc:progress:v1`. Survives
reload. `getCompletedCount`/level progress only count ids that exist in
`window.COURSE`, so you can't accidentally inflate real progress with a
made-up id (useful if you ever build a demo/sandbox topic id).

---

## 5. `window.Quiz` (quiz.js) — config-driven, REAL grading

```js
Quiz.render(document.getElementById("quiz-mount"), {
  topicId: "3-4",        // optional. If set AND the score passes, auto-calls
                          // Progress.markComplete(topicId) after grading.
  passPercent: 70,        // optional, default 70 (percent, 0-100)
  questions: [
    {
      q: "Question text",
      options: ["Option A", "Option B", "Option C", "Option D"],
      answer: 1,                      // index of correct option
      explanation: "Shown after grading, for both right and wrong answers."
    },
    {
      q: "Multi-select question",
      options: ["A", "B", "C"],
      answer: [0, 2],                 // array -> renders as checkboxes, must match exactly
      explanation: "..."
    }
  ]
});
```

Renders native `<input type="radio">`/`<checkbox">` with `<label>` wrapping
(keyboard operable out of the box, no extra ARIA needed), a "Check answers"
button that grades every question client-side, shows per-question
correct/incorrect state + explanation, a total score line, and a "Try again"
button that resets and re-enables the form. 1 question or many are both
supported. This is real grading — there is no server, no LLM call, just
straightforward JS comparison against your `answer` field.

---

## 6. `window.Exercise` (exercise.js) — the widget shell

```js
Exercise.create(document.getElementById("exercise-mount"), {
  title: "Widget title shown in the shell header",
  instructions: "One or two sentences telling the learner what to do.",
  topicId: "3-4",   // optional — shows an "I did it — mark complete" button
  mount: function (root, ctx) {
    // `root` is an empty <div>. Build your ENTIRE widget as real DOM here:
    // sliders, canvas, drag-and-drop, buttons — with REAL event listeners
    // that make something on screen actually move/update/respond.
    //
    // ctx.topicId       -> same string passed above, or null
    // ctx.markComplete() -> convenience: calls Progress.markComplete(ctx.topicId)
    // ctx.reset()        -> same as clicking the shell's Reset button
  }
});
```

**Reset contract:** clicking the shell's "Reset" button (or calling
`ctx.reset()`) clears `root`'s contents and calls your `mount(root, ctx)`
again from scratch. Your widget must be able to fully rebuild itself from
nothing every time `mount` runs — don't assume any state survives a reset.
That's the entire contract; it's designed so you can't get it wrong.

The shell provides the title, instructions text, the mount box styling,
the Reset button, and (if `topicId` is set) an explicit "mark complete"
button. You are only responsible for what happens inside `root`.

---

## 7. `window.Site` (site.js) — nav/header/footer, prev/next

You don't need to call most of this directly — header/footer render
themselves automatically into `#site-header`/`#site-footer` on page load, as
long as `window.SITE_ROOT` is set correctly first (see section 2). The one
thing topic pages should call explicitly:

```js
Site.renderPrevNext(document.getElementById("prev-next-mount"));
// Uses window.CURRENT_TOPIC_ID automatically. Renders a "← previous topic"
// / "next topic →" nav pair, correctly disabled at the very first/last
// topic in the whole 80-topic course.
```

---

## 8. NON-NEGOTIABLE: every exercise must be REAL

This is the single most important quality bar for this entire project, and
it will be QA-audited by someone reading your JavaScript, not just clicking
around.

- A slider must actually move something and update a live readout/canvas.
- A canvas must actually render and respond to real input (drag, click, slider).
- A drag-and-drop widget must actually accept drops and react to them.
- A "quiz" must actually grade (use `Quiz.render`, don't roll your own static one).
- Pure vanilla JS/HTML/CSS, client-side only — no backend, no external API calls.

**Not acceptable:** static text describing what an exercise "would" show;
a slider with no `input`/`change` listener; a canvas that's just a static
image; a button that does nothing when clicked; a quiz that displays
questions but never scores them.

`site/example-topic.html` is a complete, working demonstration of this bar
(a slider that moves a canvas marker and flips a live classification label,
plus a quiz that actually grades) — open it in a browser and try it before
you start. Copy its *pattern*, not its literal content (it uses a made-up
"confidence dial" example, not a real curriculum topic).
