/**
 * quiz.js
 * ---------------------------------------------------------------------------
 * Reusable, config-driven, GENUINELY GRADING quiz component. Exposed as
 * `window.Quiz`.
 *
 * Usage:
 *   Quiz.render(document.getElementById("quiz-mount"), {
 *     topicId: "1-1",        // optional — enables auto Progress.markComplete
 *     passPercent: 70,       // optional, default 70 (percent, 0-100)
 *     questions: [
 *       {
 *         q: "Which of these is deep learning?",
 *         options: ["A rule-based chess engine", "A layered neural network", "A spreadsheet formula", "A thermostat"],
 *         answer: 1,                 // index into options[] OR array of indices for multi-answer
 *         explanation: "Deep learning specifically refers to neural nets with many layers."
 *       }
 *     ]
 *   });
 *
 * Supports single-answer (radio) questions by default. If `answer` is an
 * array, the question is rendered with checkboxes and grades as correct
 * only when the learner's selected set exactly matches the answer set.
 *
 * On "Check answers": grades every question, marks each option
 * correct/incorrect, reveals the explanation, shows "N / M correct", and
 * shows a "Try again" button that resets the quiz. If `topicId` is provided
 * and the score meets `passPercent`, calls `Progress.markComplete(topicId)`
 * automatically (only if `window.Progress` exists) and shows a short note.
 * ---------------------------------------------------------------------------
 */
(function () {
  "use strict";

  var uidCounter = 0;
  function uid(prefix) {
    uidCounter += 1;
    return prefix + "-" + uidCounter;
  }

  function isMulti(question) {
    return Array.isArray(question.answer);
  }

  function normalizeAnswer(question) {
    return isMulti(question) ? question.answer.slice().sort() : [question.answer];
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    attrs = attrs || {};
    Object.keys(attrs).forEach(function (key) {
      if (key === "class") node.className = attrs[key];
      else if (key === "text") node.textContent = attrs[key];
      else if (key === "html") node.innerHTML = attrs[key];
      else node.setAttribute(key, attrs[key]);
    });
    (children || []).forEach(function (child) {
      if (child) node.appendChild(child);
    });
    return node;
  }

  function renderQuestion(question, qIndex, groupName) {
    var multi = isMulti(question);
    var fieldset = el("fieldset", { class: "quiz-question", "data-qindex": String(qIndex) });
    var legend = el("legend", { class: "quiz-question-text" });
    legend.textContent = (qIndex + 1) + ". " + question.q;
    fieldset.appendChild(legend);

    var list = el("div", { class: "quiz-options" });
    question.options.forEach(function (optText, optIndex) {
      var inputId = uid(groupName + "-opt");
      var inputType = multi ? "checkbox" : "radio";
      var label = el("label", { class: "quiz-option", for: inputId });
      var input = el("input", {
        type: inputType,
        name: groupName,
        id: inputId,
        value: String(optIndex)
      });
      var span = el("span", { text: optText });
      label.appendChild(input);
      label.appendChild(span);
      list.appendChild(label);
    });
    fieldset.appendChild(list);

    var feedback = el("p", { class: "quiz-explanation visually-hidden", "data-role": "explanation" });
    feedback.textContent = question.explanation || "";
    fieldset.appendChild(feedback);

    return fieldset;
  }

  function getSelected(fieldset) {
    var inputs = fieldset.querySelectorAll("input");
    var selected = [];
    inputs.forEach(function (input) {
      if (input.checked) selected.push(parseInt(input.value, 10));
    });
    return selected.sort();
  }

  function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  var Quiz = {
    render: function (container, config) {
      if (!container) return;
      if (!config || !Array.isArray(config.questions) || config.questions.length === 0) {
        container.innerHTML = "<p class=\"quiz-empty\">No quiz questions configured.</p>";
        return;
      }

      var questions = config.questions;
      var topicId = config.topicId || null;
      var passPercent = typeof config.passPercent === "number" ? config.passPercent : 70;
      var groupPrefix = uid("quiz");

      container.innerHTML = "";
      container.classList.add("quiz");

      var form = el("form", { class: "quiz-form", novalidate: "novalidate" });
      var fieldsets = questions.map(function (q, i) {
        return renderQuestion(q, i, groupPrefix + "-q" + i);
      });
      fieldsets.forEach(function (fs) {
        form.appendChild(fs);
      });

      var actions = el("div", { class: "quiz-actions" });
      var submitBtn = el("button", { type: "submit", class: "btn btn-primary" });
      submitBtn.textContent = "Check answers";
      var retryBtn = el("button", { type: "button", class: "btn btn-secondary quiz-retry" });
      retryBtn.textContent = "Try again";
      retryBtn.hidden = true;
      actions.appendChild(submitBtn);
      actions.appendChild(retryBtn);
      form.appendChild(actions);

      var resultRegion = el("div", { class: "quiz-result", role: "status", "aria-live": "polite" });

      container.appendChild(form);
      container.appendChild(resultRegion);

      function setDisabled(disabled) {
        form.querySelectorAll("input").forEach(function (input) {
          input.disabled = disabled;
        });
      }

      function grade() {
        var correctCount = 0;
        fieldsets.forEach(function (fieldset, i) {
          var question = questions[i];
          var expected = normalizeAnswer(question);
          var selected = getSelected(fieldset);
          var correct = arraysEqual(expected, selected) && selected.length > 0;
          if (correct) correctCount++;

          fieldset.classList.remove("is-correct", "is-incorrect");
          fieldset.classList.add(correct ? "is-correct" : "is-incorrect");

          // Mark individual options
          var labels = fieldset.querySelectorAll(".quiz-option");
          labels.forEach(function (label) {
            var input = label.querySelector("input");
            var optIndex = parseInt(input.value, 10);
            label.classList.remove("is-correct-option", "is-wrong-option");
            var isExpected = expected.indexOf(optIndex) !== -1;
            var isSelected = input.checked;
            if (isExpected) label.classList.add("is-correct-option");
            if (isSelected && !isExpected) label.classList.add("is-wrong-option");
          });

          var explanation = fieldset.querySelector('[data-role="explanation"]');
          if (explanation) {
            explanation.classList.remove("visually-hidden");
            var statusText = correct ? "Correct. " : "Not quite. ";
            explanation.textContent = statusText + (question.explanation || "");
          }
        });

        var total = questions.length;
        var percent = Math.round((correctCount / total) * 100);
        var passed = percent >= passPercent;

        resultRegion.innerHTML = "";
        var scoreLine = el("p", { class: "quiz-score" });
        scoreLine.textContent = correctCount + " / " + total + " correct (" + percent + "%).";
        resultRegion.appendChild(scoreLine);

        if (passed) {
          var passLine = el("p", { class: "quiz-pass-note" });
          passLine.textContent = "Nice work — that's a passing score.";
          resultRegion.appendChild(passLine);
          if (topicId && window.Progress && typeof window.Progress.markComplete === "function") {
            window.Progress.markComplete(topicId);
            var completeLine = el("p", { class: "quiz-pass-note" });
            completeLine.textContent = "This topic has been marked complete.";
            resultRegion.appendChild(completeLine);
          }
        } else {
          var retryLine = el("p", { class: "quiz-fail-note" });
          retryLine.textContent = "Review the explanations above, then try again.";
          resultRegion.appendChild(retryLine);
        }

        setDisabled(true);
        submitBtn.hidden = true;
        retryBtn.hidden = false;
        retryBtn.focus();
      }

      form.addEventListener("submit", function (evt) {
        evt.preventDefault();
        grade();
      });

      retryBtn.addEventListener("click", function () {
        form.reset();
        setDisabled(false);
        submitBtn.hidden = false;
        retryBtn.hidden = true;
        resultRegion.innerHTML = "";
        fieldsets.forEach(function (fieldset) {
          fieldset.classList.remove("is-correct", "is-incorrect");
          fieldset.querySelectorAll(".quiz-option").forEach(function (label) {
            label.classList.remove("is-correct-option", "is-wrong-option");
          });
          var explanation = fieldset.querySelector('[data-role="explanation"]');
          if (explanation) explanation.classList.add("visually-hidden");
        });
        var firstInput = form.querySelector("input");
        if (firstInput) firstInput.focus();
      });
    }
  };

  window.Quiz = Quiz;
})();
