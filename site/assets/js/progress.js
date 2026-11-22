/**
 * progress.js
 * ---------------------------------------------------------------------------
 * localStorage-backed progress tracker, exposed as `window.Progress`.
 * Compatible with `aimc:progress:v1`, plus last-visited tracking and JSON
 * export/import helpers.
 * ---------------------------------------------------------------------------
 */
(function () {
  "use strict";

  var STORAGE_KEY = "aimc:progress:v1";
  var LAST_VISITED_KEY = "aimc:lastVisited:v1";
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
      /* localStorage unavailable — fail silently */
    }
  }

  var cache = readSet();

  function allTopics() {
    var list = [];
    if (window.COURSE && Array.isArray(window.COURSE.levels)) {
      window.COURSE.levels.forEach(function (level) {
        (level.topics || []).forEach(function (t) {
          list.push({
            id: t.id,
            num: t.num,
            title: t.title,
            file: t.file,
            levelNum: level.num,
            levelName: level.name,
            tier: level.tier || "",
            tierSlug: level.tierSlug || ""
          });
        });
      });
    }
    return list;
  }

  function allTopicIds() {
    return allTopics().map(function (t) { return t.id; });
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
        /* isolate listener failures */
      }
    });
    try {
      document.dispatchEvent(new CustomEvent("progress:change", { detail: detail }));
    } catch (e) {
      /* ignore */
    }
  }

  function setLastVisited(topicId) {
    if (!topicId) return;
    try {
      localStorage.setItem(LAST_VISITED_KEY, String(topicId));
    } catch (e) {
      /* ignore */
    }
  }

  function getLastVisited() {
    try {
      return localStorage.getItem(LAST_VISITED_KEY) || null;
    } catch (e) {
      return null;
    }
  }

  function getNextRecommended() {
    var topics = allTopics();
    if (!topics.length) return null;

    var lastId = getLastVisited();
    if (lastId) {
      for (var i = 0; i < topics.length; i++) {
        if (topics[i].id === lastId && !cache[lastId]) {
          return { topic: topics[i], reason: "resume" };
        }
      }
      // If last visited is complete, recommend the very next incomplete topic after it
      var lastIdx = -1;
      for (var j = 0; j < topics.length; j++) {
        if (topics[j].id === lastId) {
          lastIdx = j;
          break;
        }
      }
      if (lastIdx !== -1) {
        for (var k = lastIdx + 1; k < topics.length; k++) {
          if (!cache[topics[k].id]) {
            return { topic: topics[k], reason: "next" };
          }
        }
      }
    }

    for (var m = 0; m < topics.length; m++) {
      if (!cache[topics[m].id]) {
        return {
          topic: topics[m],
          reason: getCompletedCount() > 0 ? "next" : "start"
        };
      }
    }

    return { topic: topics[0], reason: "review" };
  }

  function exportJSON() {
    var validSet = {};
    allTopicIds().forEach(function (id) { validSet[id] = true; });
    var completed = Object.keys(cache).filter(function (id) { return !!validSet[id]; });
    return JSON.stringify({
      version: 1,
      exportedAt: new Date().toISOString(),
      completed: completed,
      lastVisited: getLastVisited()
    }, null, 2);
  }

  function importJSON(jsonStr) {
    try {
      var parsed = JSON.parse(String(jsonStr || ""));
      var arr = Array.isArray(parsed) ? parsed : (parsed && Array.isArray(parsed.completed) ? parsed.completed : null);
      if (!arr) {
        return { ok: false, error: "Expected a JSON array or an object with a `completed` array." };
      }
      var validSet = {};
      allTopicIds().forEach(function (id) { validSet[id] = true; });
      var next = {};
      var count = 0;
      arr.forEach(function (id) {
        if (typeof id === "string" && validSet[id]) {
          if (!next[id]) count++;
          next[id] = true;
        }
      });
      cache = next;
      writeSet(cache);
      if (parsed && typeof parsed.lastVisited === "string" && validSet[parsed.lastVisited]) {
        setLastVisited(parsed.lastVisited);
      }
      notify();
      return { ok: true, count: count };
    } catch (e) {
      return { ok: false, error: "Invalid JSON file." };
    }
  }

  var Progress = {
    STORAGE_KEY: STORAGE_KEY,
    LAST_VISITED_KEY: LAST_VISITED_KEY,

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

    setLastVisited: setLastVisited,
    getLastVisited: getLastVisited,
    getNextRecommended: getNextRecommended,
    exportJSON: exportJSON,
    importJSON: importJSON,

    reset: function () {
      cache = {};
      writeSet(cache);
      try {
        localStorage.removeItem(LAST_VISITED_KEY);
      } catch (e) {
        /* ignore */
      }
      notify();
    },

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
