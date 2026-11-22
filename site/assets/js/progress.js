/**
 * progress.js
 * ---------------------------------------------------------------------------
 * localStorage-backed progress tracker, exposed as `window.Progress`.
 * Depends on `window.COURSE` (course-data.js) being loaded first for total
 * counts. Safe to load on any page; does nothing destructive if COURSE is
 * missing (falls back to total = 0 rather than throwing).
 *
 * Storage: a single localStorage key holding a JSON array of completed
 * topic id strings, e.g. ["1-1", "1-3", "2-7"].
 *
 * Change notification: every mutating call fires a
 * `document.dispatchEvent(new CustomEvent("progress:change", { detail }))`
 * AND calls any callbacks registered via `Progress.onChange(fn)`, so nav /
 * home page / level pages can re-render live. `detail` is
 * `{ completed: number, total: number }`.
 * ---------------------------------------------------------------------------
 */
(function () {
  "use strict";

  var STORAGE_KEY = "aimc:progress:v1";
  var listeners = [];

  function readSet() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return {};
      var arr = JSON.parse(raw);
      if (!Array.isArray(arr)) return {};
      var set = {};
      for (var i = 0; i < arr.length; i++) {
        set[arr[i]] = true;
      }
      return set;
    } catch (e) {
      return {};
    }
  }

  function writeSet(set) {
    try {
      var arr = Object.keys(set);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    } catch (e) {
      /* localStorage unavailable (private mode / quota) — fail silently,
         in-memory state for this page load still works via `cache`. */
    }
  }

  // In-memory cache, kept in sync with localStorage on every mutation and
  // re-read on init so multiple tabs mostly behave, though we don't listen
  // for the storage event (out of scope for this simple tracker).
  var cache = readSet();

  function allTopicIds() {
    var ids = [];
    if (window.COURSE && Array.isArray(window.COURSE.levels)) {
      window.COURSE.levels.forEach(function (level) {
        (level.topics || []).forEach(function (t) {
          ids.push(t.id);
        });
      });
    }
    return ids;
  }

  function getTotalCount() {
    if (window.COURSE && Array.isArray(window.COURSE.levels)) {
      var total = 0;
      window.COURSE.levels.forEach(function (level) {
        total += (level.topics || []).length;
      });
      return total;
    }
    return 0;
  }

  function getCompletedCount() {
    // Only count ids that still exist in COURSE, so stale localStorage
    // entries (e.g. from a renamed topic) don't inflate the count.
    var valid = allTopicIds();
    var count = 0;
    for (var i = 0; i < valid.length; i++) {
      if (cache[valid[i]]) count++;
    }
    return count;
  }

  function notify() {
    var detail = { completed: getCompletedCount(), total: getTotalCount() };
    listeners.forEach(function (fn) {
      try {
        fn(detail);
      } catch (e) {
        /* one bad listener shouldn't break the others */
      }
    });
    try {
      document.dispatchEvent(new CustomEvent("progress:change", { detail: detail }));
    } catch (e) {
      /* CustomEvent unsupported in extremely old browsers — ignore */
    }
  }

  var Progress = {
    STORAGE_KEY: STORAGE_KEY,

    isComplete: function (topicId) {
      return !!cache[topicId];
    },

    markComplete: function (topicId) {
      if (!topicId) return;
      if (!cache[topicId]) {
        cache[topicId] = true;
        writeSet(cache);
        notify();
      }
    },

    markIncomplete: function (topicId) {
      if (!topicId) return;
      if (cache[topicId]) {
        delete cache[topicId];
        writeSet(cache);
        notify();
      }
    },

    toggle: function (topicId) {
      if (!topicId) return;
      if (cache[topicId]) {
        Progress.markIncomplete(topicId);
      } else {
        Progress.markComplete(topicId);
      }
    },

    getCompletedCount: getCompletedCount,
    getTotalCount: getTotalCount,

    getCompletedIds: function () {
      return Object.keys(cache);
    },

    getLevelProgress: function (levelNum) {
      var result = { completed: 0, total: 0 };
      if (!window.COURSE || !Array.isArray(window.COURSE.levels)) return result;
      var level = window.COURSE.levels.find(function (l) {
        return l.num === levelNum;
      });
      if (!level) return result;
      result.total = level.topics.length;
      result.completed = level.topics.filter(function (t) {
        return !!cache[t.id];
      }).length;
      return result;
    },

    reset: function () {
      cache = {};
      writeSet(cache);
      notify();
    },

    /** Register a callback fired on every progress mutation. Returns an
     * unsubscribe function. */
    onChange: function (fn) {
      if (typeof fn !== "function") return function () {};
      listeners.push(fn);
      return function unsubscribe() {
        var idx = listeners.indexOf(fn);
        if (idx !== -1) listeners.splice(idx, 1);
      };
    }
  };

  window.Progress = Progress;
})();
