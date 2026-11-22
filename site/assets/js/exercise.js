/**
 * exercise.js
 * ---------------------------------------------------------------------------
 * Consistent chrome-wrapper for every topic's hands-on interactive widget.
 * Exposed as `window.Exercise`. The shell itself has NO domain logic — it
 * just gives every one of the 80 exercises the same look/structure. The
 * REAL interactivity is entirely the content builder's `mount()` function.
 *
 * Usage:
 *   Exercise.create(document.getElementById("exercise-mount"), {
 *     title: "Sort the Systems",
 *     instructions: "Drag each example into the AI, ML, or DL circle.",
 *     topicId: "1-1",              // optional — shows an "I did it" button
 *     mount: function (root, ctx) {
 *       // Build your ENTIRE interactive widget as real DOM inside `root`.
 *       // `root` is a plain, empty <div> — build sliders, canvas, drag/drop,
 *       // whatever the exercise needs, with real event listeners.
 *       //
 *       // ctx.topicId    -> same topicId passed above (or null)
 *       // ctx.markComplete() -> convenience call to Progress.markComplete
 *       // ctx.reset()    -> programmatically trigger the same reset the
 *       //                    Reset button performs (clears root + re-mounts)
 *     }
 *   });
 *
 * Reset contract: clicking "Reset" (or calling ctx.reset()) clears `root`'s
 * contents and calls your `mount(root, ctx)` function again from scratch.
 * This means your widget MUST be able to fully (re)build its own state from
 * nothing every time `mount` runs — don't rely on state surviving a reset.
 * That's it. That's the entire contract.
 * ---------------------------------------------------------------------------
 */
(function () {
  "use strict";

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    attrs = attrs || {};
    Object.keys(attrs).forEach(function (key) {
      if (key === "class") node.className = attrs[key];
      else if (key === "text") node.textContent = attrs[key];
      else node.setAttribute(key, attrs[key]);
    });
    (children || []).forEach(function (child) {
      if (child) node.appendChild(child);
    });
    return node;
  }

  var Exercise = {
    create: function (container, config) {
      if (!container) return;
      config = config || {};
      if (typeof config.mount !== "function") {
        container.innerHTML = "<p class=\"exercise-empty\">No exercise widget configured.</p>";
        return;
      }

      container.innerHTML = "";
      container.classList.add("exercise-shell");

      var header = el("div", { class: "exercise-header" });
      if (config.title) {
        header.appendChild(el("h3", { class: "exercise-title", text: config.title }));
      }
      if (config.instructions) {
        header.appendChild(el("p", { class: "exercise-instructions", text: config.instructions }));
      }
      container.appendChild(header);

      var root = el("div", { class: "exercise-mount" });
      container.appendChild(root);

      var toolbar = el("div", { class: "exercise-toolbar" });
      var resetBtn = el("button", { type: "button", class: "btn btn-secondary exercise-reset" });
      resetBtn.textContent = "Reset";
      toolbar.appendChild(resetBtn);

      var doneBtn = null;
      if (config.topicId) {
        doneBtn = el("button", { type: "button", class: "btn btn-primary exercise-done" });
        doneBtn.textContent = "I did it — mark complete";
        toolbar.appendChild(doneBtn);
      }
      container.appendChild(toolbar);

      var statusRegion = el("p", { class: "exercise-status", role: "status", "aria-live": "polite" });
      container.appendChild(statusRegion);

      var ctx = {
        topicId: config.topicId || null,
        markComplete: function () {
          if (ctx.topicId && window.Progress && typeof window.Progress.markComplete === "function") {
            window.Progress.markComplete(ctx.topicId);
            statusRegion.textContent = "Marked complete.";
          }
        },
        reset: function () {
          doMount();
        }
      };

      function doMount() {
        root.innerHTML = "";
        config.mount(root, ctx);
      }

      resetBtn.addEventListener("click", function () {
        doMount();
        statusRegion.textContent = "Exercise reset.";
      });

      if (doneBtn) {
        doneBtn.addEventListener("click", function () {
          ctx.markComplete();
        });
      }

      doMount();
    }
  };

  window.Exercise = Exercise;
})();
