/**
 * site.js
 * ---------------------------------------------------------------------------
 * Shared site chrome: header/nav + footer, driven by `window.COURSE`
 * (course-data.js) and `window.Progress` (progress.js). Exposes helpers as
 * `window.Site`.
 *
 * PATH CONVENTION — read this first:
 * Every page must set `window.SITE_ROOT` to the relative path prefix that
 * gets you from that page back to the site root (where index.html and
 * assets/ live), BEFORE this script runs:
 *   - site/index.html                        -> window.SITE_ROOT = "";
 *   - site/example-topic.html                -> window.SITE_ROOT = "";
 *   - site/levels/level-N/index.html         -> window.SITE_ROOT = "../../";
 *   - site/levels/level-N/topic-T.html       -> window.SITE_ROOT = "../../";
 * If a page forgets to set it, this file defaults to "" (root-relative),
 * which is correct for root-level pages only.
 *
 * CURRENT TOPIC CONVENTION:
 * Topic pages should set `window.CURRENT_TOPIC_ID = "3-4";` (their own
 * course-data.js id) before this script runs. This powers:
 *   - highlighting the current topic in the nav menu
 *   - `Site.getPrevNext()` convenience (no id argument needed)
 *   - `Site.renderPrevNext(container)` convenience (no id argument needed)
 *
 * Placeholders this script fills in (both optional — guarded, won't throw
 * if missing):
 *   <div id="site-header"></div>
 *   <div id="site-footer"></div>
 * ---------------------------------------------------------------------------
 */
(function () {
  "use strict";

  function root() {
    return typeof window.SITE_ROOT === "string" ? window.SITE_ROOT : "";
  }

  function flattenTopics() {
    var out = [];
    if (window.COURSE && Array.isArray(window.COURSE.levels)) {
      window.COURSE.levels.forEach(function (level) {
        (level.topics || []).forEach(function (topic) {
          out.push({
            id: topic.id,
            num: topic.num,
            title: topic.title,
            file: topic.file,
            levelNum: level.num,
            levelName: level.name
          });
        });
      });
    }
    return out;
  }

  function findTopic(topicId) {
    var all = flattenTopics();
    for (var i = 0; i < all.length; i++) {
      if (all[i].id === topicId) return all[i];
    }
    return null;
  }

  function getPrevNext(topicId) {
    var id = topicId || window.CURRENT_TOPIC_ID;
    var all = flattenTopics();
    var idx = -1;
    for (var i = 0; i < all.length; i++) {
      if (all[i].id === id) {
        idx = i;
        break;
      }
    }
    if (idx === -1) return { prev: null, next: null };
    return {
      prev: idx > 0 ? all[idx - 1] : null,
      next: idx < all.length - 1 ? all[idx + 1] : null
    };
  }

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

  function progressSummary() {
    if (window.Progress) {
      return { completed: window.Progress.getCompletedCount(), total: window.Progress.getTotalCount() };
    }
    var total = 0;
    if (window.COURSE) {
      window.COURSE.levels.forEach(function (l) {
        total += l.topics.length;
      });
    }
    return { completed: 0, total: total };
  }

  function buildLevelsMenu() {
    var nav = el("nav", { class: "levels-menu", "aria-label": "Course levels and topics" });
    var list = el("ul", { class: "levels-menu-list" });

    if (window.COURSE && Array.isArray(window.COURSE.levels)) {
      window.COURSE.levels.forEach(function (level) {
        var levelProgress = window.Progress ? window.Progress.getLevelProgress(level.num) : { completed: 0, total: level.topics.length };
        var li = el("li", { class: "levels-menu-item" });
        var levelLink = el("a", {
          class: "levels-menu-level-link",
          href: root() + "levels/level-" + level.num + "/index.html"
        });
        levelLink.textContent = "Level " + level.num + " — " + level.name;
        var badge = el("span", { class: "levels-menu-badge" });
        badge.textContent = levelProgress.completed + "/" + levelProgress.total;
        levelLink.appendChild(badge);
        li.appendChild(levelLink);

        var topicList = el("ul", { class: "levels-menu-topics" });
        level.topics.forEach(function (topic) {
          var topicLi = el("li");
          var isCurrent = window.CURRENT_TOPIC_ID && window.CURRENT_TOPIC_ID === topic.id;
          var isDone = window.Progress && window.Progress.isComplete(topic.id);
          var a = el("a", {
            class: "levels-menu-topic-link" + (isCurrent ? " is-current" : "") + (isDone ? " is-complete" : ""),
            href: root() + topic.file
          });
          if (isCurrent) a.setAttribute("aria-current", "page");
          var check = el("span", { class: "topic-check", "aria-hidden": "true" });
          check.textContent = isDone ? "✓" : "";
          var label = el("span", { text: topic.num + ". " + topic.title });
          a.appendChild(check);
          a.appendChild(label);
          topicLi.appendChild(a);
          topicList.appendChild(topicLi);
        });
        li.appendChild(topicList);
        list.appendChild(li);
      });
    }

    nav.appendChild(list);
    return nav;
  }

  function renderHeader(container) {
    if (!container) return;
    container.innerHTML = "";

    var header = el("header", { class: "site-header" });
    var bar = el("div", { class: "site-header-bar" });

    var brand = el("a", { class: "site-brand", href: root() + "index.html" });
    brand.textContent = "AI Maturity Course";
    bar.appendChild(brand);

    var toggleBtn = el("button", {
      type: "button",
      class: "levels-toggle",
      "aria-expanded": "false",
      "aria-controls": "levels-menu-panel"
    });
    toggleBtn.textContent = "Levels";
    bar.appendChild(toggleBtn);

    var progress = progressSummary();
    var progressWrap = el("div", { class: "site-progress", "aria-label": "Overall course progress" });
    var progressText = el("span", { class: "site-progress-text" });
    progressText.textContent = progress.completed + " / " + progress.total + " complete";
    var progressBarOuter = el("div", { class: "progress-bar", role: "progressbar", "aria-valuemin": "0", "aria-valuemax": String(progress.total), "aria-valuenow": String(progress.completed) });
    var pct = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;
    var progressBarInner = el("div", { class: "progress-bar-fill" });
    progressBarInner.style.width = pct + "%";
    progressBarOuter.appendChild(progressBarInner);
    progressWrap.appendChild(progressText);
    progressWrap.appendChild(progressBarOuter);
    bar.appendChild(progressWrap);

    header.appendChild(bar);

    var panel = el("div", { class: "levels-menu-panel", id: "levels-menu-panel" });
    panel.hidden = true;
    panel.appendChild(buildLevelsMenu());
    header.appendChild(panel);

    toggleBtn.addEventListener("click", function () {
      var expanded = toggleBtn.getAttribute("aria-expanded") === "true";
      toggleBtn.setAttribute("aria-expanded", String(!expanded));
      panel.hidden = expanded;
    });

    container.appendChild(header);
  }

  function renderFooter(container) {
    if (!container) return;
    container.innerHTML = "";

    var footer = el("footer", { class: "site-footer" });
    var inner = el("div", { class: "site-footer-inner" });

    var text = el("p", { class: "site-footer-text" });
    text.textContent = "AI Maturity Course — a free, self-paced curriculum from beginner to master, 10 levels, 80 topics.";
    inner.appendChild(text);

    var links = el("nav", { class: "site-footer-links", "aria-label": "Footer" });
    var homeLink = el("a", { href: root() + "index.html", text: "Home" });
    links.appendChild(homeLink);
    inner.appendChild(links);

    footer.appendChild(inner);
    container.appendChild(footer);
  }

  function renderPrevNext(container, topicId) {
    if (!container) return;
    container.innerHTML = "";
    var pair = getPrevNext(topicId);
    var nav = el("nav", { class: "topic-prev-next", "aria-label": "Topic navigation" });

    if (pair.prev) {
      var prevLink = el("a", { class: "btn btn-secondary prev-link", href: root() + pair.prev.file });
      prevLink.textContent = "← " + pair.prev.title;
      nav.appendChild(prevLink);
    } else {
      nav.appendChild(el("span", { class: "prev-link is-disabled", text: "← Start of course" }));
    }

    if (pair.next) {
      var nextLink = el("a", { class: "btn btn-primary next-link", href: root() + pair.next.file });
      nextLink.textContent = pair.next.title + " →";
      nav.appendChild(nextLink);
    } else {
      nav.appendChild(el("span", { class: "next-link is-disabled", text: "End of course →" }));
    }

    container.appendChild(nav);
  }

  function initChrome() {
    var headerEl = document.getElementById("site-header");
    var footerEl = document.getElementById("site-footer");
    renderHeader(headerEl);
    renderFooter(footerEl);

    if (window.Progress && typeof window.Progress.onChange === "function") {
      window.Progress.onChange(function () {
        renderHeader(headerEl);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initChrome);
  } else {
    initChrome();
  }

  window.Site = {
    flattenTopics: flattenTopics,
    findTopic: findTopic,
    getPrevNext: getPrevNext,
    renderPrevNext: renderPrevNext,
    renderHeader: renderHeader,
    renderFooter: renderFooter,
    root: root
  };
})();
