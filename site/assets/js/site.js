/**
 * site.js
 * ---------------------------------------------------------------------------
 * Shared site chrome: sticky header, slide-over course drawer, keyboard-ready
 * cross-course search modal (`/` or `Ctrl+K`), light/dark theme toggle,
 * topic breadcrumbs + completion toggle, prev/next topic nav, and level
 * overview renderer.
 * ---------------------------------------------------------------------------
 */
(function () {
  "use strict";

  var THEME_KEY = "aimc:theme:v1";

  function applyTheme(theme) {
    var t = theme === "dark" ? "dark" : "light";
    if (t === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    return t;
  }

  function getSavedTheme() {
    try {
      return localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light";
    } catch (e) {
      return "light";
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      /* ignore */
    }
  }

  // Apply saved theme immediately to minimize flash
  applyTheme(getSavedTheme());

  function root() {
    return typeof window.SITE_ROOT === "string" ? window.SITE_ROOT : "";
  }

  function levelIndexUrl(level) {
    if (!level) return root() + "index.html";
    return root() + (level.indexFile || ("levels/level-" + level.num + "/index.html"));
  }

  function flattenTopics() {
    var out = [];
    if (window.COURSE && Array.isArray(window.COURSE.levels)) {
      window.COURSE.levels.forEach(function (level) {
        var lvlIdx = level.indexFile || ("levels/level-" + level.num + "/index.html");
        (level.topics || []).forEach(function (topic) {
          out.push({
            id: topic.id,
            num: topic.num,
            title: topic.title,
            file: topic.file,
            levelNum: level.num,
            levelName: level.name,
            levelIndexFile: lvlIdx,
            tier: level.tier || "",
            tierSlug: level.tierSlug || "",
            levelTopicCount: (level.topics || []).length
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
    if (idx === -1) return { prev: null, next: null, current: null };
    return {
      current: all[idx],
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

  // ---- Slide-over Course Drawer -------------------------------------------

  var drawerState = {
    backdrop: null,
    drawer: null,
    open: false,
    filterQuery: ""
  };

  function closeDrawer() {
    if (!drawerState.drawer) return;
    drawerState.open = false;
    drawerState.drawer.hidden = true;
    drawerState.backdrop.hidden = true;
    document.body.classList.remove("has-modal-open");
    var toggleBtn = document.querySelector(".levels-toggle");
    if (toggleBtn) {
      toggleBtn.setAttribute("aria-expanded", "false");
    }
  }

  function openDrawer() {
    ensureDrawer();
    renderDrawerContent();
    drawerState.open = true;
    drawerState.backdrop.hidden = false;
    drawerState.drawer.hidden = false;
    document.body.classList.add("has-modal-open");
    var toggleBtn = document.querySelector(".levels-toggle");
    if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "true");
    var input = document.getElementById("drawer-filter-input");
    if (input) input.focus();
  }

  function renderDrawerContent() {
    var listWrap = document.getElementById("drawer-levels-list");
    if (!listWrap || !window.COURSE) return;
    listWrap.innerHTML = "";

    var q = drawerState.filterQuery.trim().toLowerCase();
    var currentTopic = window.CURRENT_TOPIC_ID ? findTopic(window.CURRENT_TOPIC_ID) : null;
    var activeLevelNum = window.CURRENT_LEVEL || (currentTopic ? currentTopic.levelNum : 1);

    var anyMatch = false;

    window.COURSE.levels.forEach(function (level) {
      var matchingTopics = (level.topics || []).filter(function (topic) {
        if (!q) return true;
        var hay = (topic.title + " " + topic.id + " level " + level.num + " " + level.name + " " + (level.tier || "")).toLowerCase();
        return hay.indexOf(q) !== -1;
      });

      if (q && matchingTopics.length === 0) return;
      anyMatch = true;

      var lp = window.Progress ? window.Progress.getLevelProgress(level.num) : { completed: 0, total: level.topics.length };
      var details = el("details", { class: "drawer-level" });
      if (q || level.num === activeLevelNum) {
        details.open = true;
      }

      var summary = el("summary", { class: "drawer-level-summary" });
      var titleGroup = el("div", { class: "drawer-level-title-group" });
      titleGroup.appendChild(el("span", { class: "tier-dot tier-dot--" + (level.tierSlug || "foundations"), "aria-hidden": "true" }));
      titleGroup.appendChild(el("span", { class: "drawer-level-name", text: "L" + level.num + ": " + level.name }));
      summary.appendChild(titleGroup);
      summary.appendChild(el("span", { class: "drawer-level-badge", text: lp.completed + "/" + lp.total }));
      details.appendChild(summary);

      var body = el("div", { class: "drawer-level-body" });
      var overviewLink = el("a", {
        class: "drawer-overview-link",
        href: levelIndexUrl(level),
        text: "Level " + level.num + " overview →"
      });
      body.appendChild(overviewLink);

      var ul = el("ul", { class: "drawer-topic-list" });
      matchingTopics.forEach(function (topic) {
        var isCurrent = window.CURRENT_TOPIC_ID && window.CURRENT_TOPIC_ID === topic.id;
        var isDone = window.Progress && window.Progress.isComplete(topic.id);
        var li = el("li");
        var a = el("a", {
          class: "drawer-topic-link" + (isCurrent ? " is-current" : "") + (isDone ? " is-complete" : ""),
          href: root() + topic.file
        });
        if (isCurrent) a.setAttribute("aria-current", "page");
        var check = el("span", { class: "topic-check", "aria-hidden": "true", text: isDone ? "✓" : "○" });
        var label = el("span", { text: topic.num + ". " + topic.title });
        a.appendChild(check);
        a.appendChild(label);
        li.appendChild(a);
        ul.appendChild(li);
      });

      body.appendChild(ul);
      details.appendChild(body);
      listWrap.appendChild(details);
    });

    if (!anyMatch) {
      listWrap.appendChild(el("p", { class: "drawer-empty", text: "No matching topics found." }));
    }
  }

  function ensureDrawer() {
    if (drawerState.drawer) return;

    var backdrop = el("div", { class: "drawer-backdrop", id: "course-drawer-backdrop" });
    backdrop.hidden = true;

    var drawer = el("aside", {
      class: "course-drawer",
      id: "course-drawer",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "Course navigation"
    });
    drawer.hidden = true;

    var head = el("div", { class: "drawer-header" });
    var levelTotal = (window.COURSE && window.COURSE.levels) ? window.COURSE.levels.length : 11;
    head.appendChild(el("h2", { class: "drawer-title", text: "Curriculum (" + levelTotal + " Levels)" }));
    var closeBtn = el("button", { type: "button", class: "icon-btn", "aria-label": "Close navigation drawer", text: "✕" });
    closeBtn.addEventListener("click", closeDrawer);
    head.appendChild(closeBtn);
    drawer.appendChild(head);

    var filterWrap = el("div", { class: "drawer-filter-wrap" });
    var filterInput = el("input", {
      type: "search",
      id: "drawer-filter-input",
      class: "drawer-filter-input",
      placeholder: "Filter " + progressSummary().total + " topics...",
      "aria-label": "Filter topics"
    });
    filterInput.addEventListener("input", function () {
      drawerState.filterQuery = filterInput.value;
      renderDrawerContent();
    });
    filterWrap.appendChild(filterInput);
    drawer.appendChild(filterWrap);

    var listWrap = el("div", { class: "drawer-levels-list", id: "drawer-levels-list" });
    drawer.appendChild(listWrap);

    backdrop.addEventListener("click", closeDrawer);

    document.body.appendChild(backdrop);
    document.body.appendChild(drawer);

    drawerState.backdrop = backdrop;
    drawerState.drawer = drawer;
  }

  // ---- Cross-Course Search Modal ------------------------------------------

  var searchState = {
    backdrop: null,
    modal: null,
    open: false,
    activeIndex: 0,
    matches: []
  };

  function closeSearch() {
    if (!searchState.modal) return;
    searchState.open = false;
    searchState.modal.hidden = true;
    searchState.backdrop.hidden = true;
    document.body.classList.remove("has-modal-open");
  }

  function openSearch() {
    if (drawerState.open) closeDrawer();
    ensureSearchModal();
    searchState.open = true;
    searchState.backdrop.hidden = false;
    searchState.modal.hidden = false;
    document.body.classList.add("has-modal-open");
    var input = document.getElementById("global-search-input");
    if (input) {
      input.value = "";
      renderSearchResults("");
      input.focus();
    }
  }

  function renderSearchResults(query) {
    var list = document.getElementById("global-search-results");
    if (!list) return;
    list.innerHTML = "";
    var q = (query || "").trim().toLowerCase();
    var all = flattenTopics();

    var matches = all.filter(function (t) {
      if (!q) return true;
      var hay = (t.title + " " + t.id + " level " + t.levelNum + " " + t.levelName + " " + t.tier).toLowerCase();
      return hay.indexOf(q) !== -1;
    }).slice(0, 18);

    searchState.matches = matches;
    searchState.activeIndex = 0;

    if (!matches.length) {
      list.appendChild(el("p", { class: "search-empty", text: "No topics match \"" + query + "\"." }));
      return;
    }

    matches.forEach(function (t, idx) {
      var isDone = window.Progress && window.Progress.isComplete(t.id);
      var item = el("a", {
        class: "search-result-item" + (idx === 0 ? " is-active" : ""),
        href: root() + t.file
      });
      var topRow = el("div", { class: "search-result-meta" });
      topRow.appendChild(el("span", { class: "tier-pill tier-pill--" + t.tierSlug, text: "Level " + t.levelNum + " · " + t.levelName }));
      if (isDone) {
        topRow.appendChild(el("span", { class: "search-result-done", text: "✓ Complete" }));
      }
      item.appendChild(topRow);
      item.appendChild(el("div", { class: "search-result-title", text: t.num + ". " + t.title }));
      list.appendChild(item);
    });
  }

  function updateActiveSearchRow() {
    var rows = document.querySelectorAll("#global-search-results .search-result-item");
    rows.forEach(function (row, idx) {
      if (idx === searchState.activeIndex) {
        row.classList.add("is-active");
        row.scrollIntoView({ block: "nearest" });
      } else {
        row.classList.remove("is-active");
      }
    });
  }

  function ensureSearchModal() {
    if (searchState.modal) return;

    var backdrop = el("div", { class: "search-backdrop", id: "course-search-backdrop" });
    backdrop.hidden = true;
    backdrop.addEventListener("click", closeSearch);

    var modal = el("div", {
      class: "search-modal",
      id: "course-search-modal",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "Search course topics"
    });
    modal.hidden = true;

    var inputBar = el("div", { class: "search-input-bar" });
    var input = el("input", {
      type: "search",
      id: "global-search-input",
      class: "search-modal-input",
      placeholder: "Search topics, concepts, or levels (e.g. LoRA, RAG, KV-cache, 8-4)...",
      "aria-label": "Search course topics"
    });
    var closeBtn = el("button", { type: "button", class: "icon-btn", "aria-label": "Close search", text: "Esc" });
    closeBtn.addEventListener("click", closeSearch);
    inputBar.appendChild(input);
    inputBar.appendChild(closeBtn);
    modal.appendChild(inputBar);

    var results = el("div", { class: "search-modal-results", id: "global-search-results" });
    modal.appendChild(results);

    input.addEventListener("input", function () {
      renderSearchResults(input.value);
    });

    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (searchState.matches.length) {
          searchState.activeIndex = (searchState.activeIndex + 1) % searchState.matches.length;
          updateActiveSearchRow();
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (searchState.matches.length) {
          searchState.activeIndex = (searchState.activeIndex - 1 + searchState.matches.length) % searchState.matches.length;
          updateActiveSearchRow();
        }
      } else if (e.key === "Enter") {
        var target = searchState.matches[searchState.activeIndex];
        if (target) {
          e.preventDefault();
          window.location.href = root() + target.file;
        }
      }
    });

    document.body.appendChild(backdrop);
    document.body.appendChild(modal);

    searchState.backdrop = backdrop;
    searchState.modal = modal;
  }

  // ---- Header & Footer ----------------------------------------------------

  function renderHeader(container) {
    if (!container) return;
    container.innerHTML = "";

    var header = el("header", { class: "site-header" });
    var bar = el("div", { class: "site-header-bar" });

    var brand = el("a", { class: "site-brand", href: root() + "index.html" });
    brand.appendChild(el("span", { class: "brand-mark", "aria-hidden": "true", text: "AI" }));
    brand.appendChild(el("span", { text: "AI Maturity Course" }));
    bar.appendChild(brand);

    var navActions = el("div", { class: "header-actions" });

    var toggleBtn = el("button", {
      type: "button",
      class: "levels-toggle",
      "aria-expanded": drawerState.open ? "true" : "false",
      "aria-controls": "course-drawer"
    });
    toggleBtn.textContent = "Curriculum";
    toggleBtn.addEventListener("click", function () {
      if (drawerState.open) closeDrawer();
      else openDrawer();
    });
    navActions.appendChild(toggleBtn);

    var searchBtn = el("button", {
      type: "button",
      class: "header-search-btn",
      "aria-label": "Search topics (press slash)"
    });
    searchBtn.appendChild(el("span", { text: "Search" }));
    searchBtn.appendChild(el("kbd", { class: "kbd-hint", text: "/" }));
    searchBtn.addEventListener("click", openSearch);
    navActions.appendChild(searchBtn);

    var currentTheme = getSavedTheme();
    var themeBtn = el("button", {
      type: "button",
      class: "theme-toggle-btn",
      "aria-label": currentTheme === "dark" ? "Switch to light mode" : "Switch to dark mode",
      "aria-pressed": currentTheme === "dark" ? "true" : "false",
      text: currentTheme === "dark" ? "☀ Light" : "☾ Dark"
    });
    themeBtn.addEventListener("click", function () {
      var next = getSavedTheme() === "dark" ? "light" : "dark";
      applyTheme(next);
      saveTheme(next);
      themeBtn.setAttribute("aria-pressed", next === "dark" ? "true" : "false");
      themeBtn.setAttribute("aria-label", next === "dark" ? "Switch to light mode" : "Switch to dark mode");
      themeBtn.textContent = next === "dark" ? "☀ Light" : "☾ Dark";
    });
    navActions.appendChild(themeBtn);

    bar.appendChild(navActions);

    var progress = progressSummary();
    var progressWrap = el("div", { class: "site-progress", "aria-label": "Overall course progress" });
    var progressText = el("span", { class: "site-progress-text" });
    progressText.textContent = progress.completed + " / " + progress.total + " complete";
    var progressBarOuter = el("div", {
      class: "progress-bar",
      role: "progressbar",
      "aria-valuemin": "0",
      "aria-valuemax": String(progress.total),
      "aria-valuenow": String(progress.completed)
    });
    var pct = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;
    var progressBarInner = el("div", { class: "progress-bar-fill" });
    progressBarInner.style.width = pct + "%";
    progressBarOuter.appendChild(progressBarInner);
    progressWrap.appendChild(progressText);
    progressWrap.appendChild(progressBarOuter);
    bar.appendChild(progressWrap);

    header.appendChild(bar);
    container.appendChild(header);

    if (drawerState.open) {
      renderDrawerContent();
    }
  }

  function renderFooter(container) {
    if (!container) return;
    container.innerHTML = "";

    var footer = el("footer", { class: "site-footer" });
    var inner = el("div", { class: "site-footer-inner" });

    var levelTotal = (window.COURSE && window.COURSE.levels) ? window.COURSE.levels.length : 11;
    var text = el("p", {
      class: "site-footer-text",
      text: "AI Maturity Course — 4 tiers, " + levelTotal + " levels, " + progressSummary().total + " interactive topics. Progress saved locally in your browser."
    });
    inner.appendChild(text);

    var links = el("nav", { class: "site-footer-links", "aria-label": "Footer" });
    links.appendChild(el("a", { href: root() + "index.html", text: "Course Home" }));
    var searchFooterBtn = el("button", { type: "button", class: "footer-link-btn", text: "Search Topics" });
    searchFooterBtn.addEventListener("click", openSearch);
    links.appendChild(searchFooterBtn);
    inner.appendChild(links);

    footer.appendChild(inner);
    container.appendChild(footer);
  }

  // ---- Topic Page Enhancements (Breadcrumbs + Completion Toggle) ----------

  function injectTopicChrome() {
    if (!window.CURRENT_TOPIC_ID) return;
    var topic = findTopic(window.CURRENT_TOPIC_ID);
    if (!topic) return;

    if (window.Progress && typeof window.Progress.setLastVisited === "function") {
      window.Progress.setLastVisited(topic.id);
    }

    var main = document.getElementById("main-content");
    if (!main || document.getElementById("topic-meta-bar")) return;

    var bar = el("div", { class: "topic-meta-bar", id: "topic-meta-bar" });

    var crumbs = el("nav", { class: "breadcrumbs", "aria-label": "Breadcrumb" });
    crumbs.appendChild(el("a", { href: root() + "index.html", text: "Home" }));
    crumbs.appendChild(el("span", { class: "breadcrumb-sep", "aria-hidden": "true", text: "/" }));
    crumbs.appendChild(el("a", {
      href: root() + topic.levelIndexFile,
      text: "Level " + topic.levelNum + ": " + topic.levelName
    }));
    crumbs.appendChild(el("span", { class: "breadcrumb-sep", "aria-hidden": "true", text: "/" }));
    crumbs.appendChild(el("span", { class: "breadcrumb-current", text: "Topic " + topic.num + " of " + topic.levelTopicCount }));
    bar.appendChild(crumbs);

    var rightGroup = el("div", { class: "topic-meta-actions" });
    if (topic.tier) {
      rightGroup.appendChild(el("span", { class: "tier-pill tier-pill--" + topic.tierSlug, text: topic.tier }));
    }

    if (window.Progress) {
      var toggleBtn = el("button", { type: "button", class: "topic-complete-toggle", id: "topic-complete-toggle" });
      function syncToggle() {
        var done = window.Progress.isComplete(topic.id);
        toggleBtn.setAttribute("aria-pressed", done ? "true" : "false");
        toggleBtn.className = "topic-complete-toggle" + (done ? " is-complete" : "");
        toggleBtn.textContent = done ? "✓ Completed" : "Mark complete";
      }
      syncToggle();
      toggleBtn.addEventListener("click", function () {
        window.Progress.toggle(topic.id);
      });
      window.Progress.onChange(syncToggle);
      rightGroup.appendChild(toggleBtn);
    }

    bar.appendChild(rightGroup);

    var eyebrow = main.querySelector(".card-eyebrow");
    if (eyebrow) {
      eyebrow.textContent = "Level " + topic.levelNum + " — " + topic.levelName + " · Topic " + topic.num + " of " + topic.levelTopicCount;
      main.insertBefore(bar, eyebrow);
    } else {
      main.insertBefore(bar, main.firstChild);
    }

    var h1 = main.querySelector("h1");
    if (h1 && h1.textContent.trim() !== topic.title) {
      h1.textContent = topic.title;
      document.title = topic.title + " — AI Maturity Course";
    }
  }

  // ---- Prev / Next Topic Navigation ---------------------------------------

  function renderPrevNext(container, topicId) {
    if (!container) return;
    container.innerHTML = "";
    var pair = getPrevNext(topicId);
    var nav = el("nav", { class: "topic-prev-next", "aria-label": "Topic navigation" });

    if (pair.prev) {
      var prevCross = pair.current && pair.prev.levelNum !== pair.current.levelNum;
      var prevLink = el("a", { class: "btn btn-secondary prev-link", href: root() + pair.prev.file });
      prevLink.appendChild(el("span", {
        class: "prev-next-kicker",
        text: prevCross ? "← Previous Level (L" + pair.prev.levelNum + ")" : "← Previous Topic"
      }));
      prevLink.appendChild(el("span", { class: "prev-next-title", text: pair.prev.title }));
      nav.appendChild(prevLink);
    } else {
      nav.appendChild(el("span", { class: "prev-link is-disabled", text: "← Start of course" }));
    }

    if (pair.next) {
      var nextCross = pair.current && pair.next.levelNum !== pair.current.levelNum;
      var nextLink = el("a", { class: "btn btn-primary next-link", href: root() + pair.next.file });
      nextLink.appendChild(el("span", {
        class: "prev-next-kicker",
        text: nextCross ? "Next Level (L" + pair.next.levelNum + ") →" : "Next Topic →"
      }));
      nextLink.appendChild(el("span", { class: "prev-next-title", text: pair.next.title }));
      nav.appendChild(nextLink);
    } else {
      nav.appendChild(el("span", { class: "next-link is-disabled", text: "End of course →" }));
    }

    container.appendChild(nav);
  }

  // ---- Level Overview Renderer --------------------------------------------

  function renderLevelOverview(levelNum) {
    var num = typeof levelNum === "number" ? levelNum : window.CURRENT_LEVEL;
    if (!num || !window.COURSE) return;
    var level = window.COURSE.levels.find(function (l) { return l.num === num; });
    if (!level) return;

    document.title = "Level " + level.num + " — " + level.name + " | AI Maturity Course";

    var main = document.getElementById("main-content");
    if (main && !document.getElementById("level-breadcrumbs")) {
      var bar = el("div", { class: "topic-meta-bar", id: "level-breadcrumbs" });
      var crumbs = el("nav", { class: "breadcrumbs", "aria-label": "Breadcrumb" });
      crumbs.appendChild(el("a", { href: root() + "index.html", text: "Home" }));
      crumbs.appendChild(el("span", { class: "breadcrumb-sep", "aria-hidden": "true", text: "/" }));
      crumbs.appendChild(el("span", { class: "breadcrumb-current", text: "Level " + level.num + " — " + level.name }));
      bar.appendChild(crumbs);
      if (level.tier) {
        bar.appendChild(el("span", { class: "tier-pill tier-pill--" + (level.tierSlug || "foundations"), text: level.tier }));
      }
      main.insertBefore(bar, main.firstChild);
    }

    var eyebrow = document.getElementById("level-eyebrow");
    if (eyebrow) eyebrow.textContent = "Level " + level.num + " of " + window.COURSE.levels.length;
    var titleEl = document.getElementById("level-title");
    if (titleEl) titleEl.textContent = level.name;
    var subtitleEl = document.getElementById("level-subtitle");
    if (subtitleEl) {
      subtitleEl.textContent = level.summary || (level.topics.length + " topics in this level.");
    }

    function drawProgressAndList() {
      var lp = window.Progress ? window.Progress.getLevelProgress(level.num) : { completed: 0, total: level.topics.length };
      var pct = lp.total > 0 ? Math.round((lp.completed / lp.total) * 100) : 0;

      var fig = document.getElementById("level-progress-figure");
      if (fig) fig.textContent = lp.completed + " / " + lp.total;
      var bar = document.getElementById("level-progress-bar");
      if (bar) {
        bar.setAttribute("aria-valuemax", String(lp.total));
        bar.setAttribute("aria-valuenow", String(lp.completed));
      }
      var fill = document.getElementById("level-progress-fill");
      if (fill) fill.style.width = pct + "%";

      var list = document.getElementById("topic-list");
      if (list) {
        list.innerHTML = "";
        level.topics.forEach(function (topic) {
          var isDone = window.Progress && window.Progress.isComplete(topic.id);
          var li = el("li");
          var a = el("a", {
            class: "topic-list-item topic-list-card" + (isDone ? " is-complete" : ""),
            href: root() + topic.file
          });
          var left = el("div", { class: "topic-list-main" });
          left.appendChild(el("span", { class: "topic-list-num", text: String(topic.num).padStart(2, "0") }));
          left.appendChild(el("span", { class: "topic-list-title", text: topic.title }));
          a.appendChild(left);

          var status = el("span", {
            class: "topic-status " + (isDone ? "is-complete" : "is-incomplete"),
            text: isDone ? "✓ Complete" : "Start →"
          });
          a.appendChild(status);
          li.appendChild(a);
          list.appendChild(li);
        });
      }
    }

    drawProgressAndList();

    var prevNext = document.getElementById("level-prev-next");
    if (prevNext) {
      prevNext.innerHTML = "";
      var prevLevel = window.COURSE.levels.find(function (l) { return l.num === level.num - 1; });
      var nextLevel = window.COURSE.levels.find(function (l) { return l.num === level.num + 1; });

      if (prevLevel) {
        prevNext.appendChild(el("a", {
          class: "btn btn-secondary",
          href: levelIndexUrl(prevLevel),
          text: "← Level " + prevLevel.num + " — " + prevLevel.name
        }));
      } else {
        prevNext.appendChild(el("span", { class: "is-disabled", text: "← First level" }));
      }

      if (nextLevel) {
        prevNext.appendChild(el("a", {
          class: "btn btn-primary",
          href: levelIndexUrl(nextLevel),
          text: "Level " + nextLevel.num + " — " + nextLevel.name + " →"
        }));
      } else {
        prevNext.appendChild(el("span", { class: "is-disabled", text: "Last level →" }));
      }
    }

    if (window.Progress && typeof window.Progress.onChange === "function") {
      window.Progress.onChange(drawProgressAndList);
    }
  }

  // ---- Global Keyboard Shortcuts ------------------------------------------

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (searchState.open) closeSearch();
      if (drawerState.open) closeDrawer();
      return;
    }

    var tag = e.target && e.target.tagName ? e.target.tagName.toLowerCase() : "";
    var typing = tag === "input" || tag === "textarea" || tag === "select" || (e.target && e.target.isContentEditable);

    if ((e.key === "k" || e.key === "K") && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (searchState.open) closeSearch();
      else openSearch();
    } else if (e.key === "/" && !typing && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      openSearch();
    }
  });

  // ---- Init ---------------------------------------------------------------

  function initChrome() {
    var headerEl = document.getElementById("site-header");
    var footerEl = document.getElementById("site-footer");
    renderHeader(headerEl);
    renderFooter(footerEl);
    injectTopicChrome();

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
    renderLevelOverview: renderLevelOverview,
    openSearch: openSearch,
    openDrawer: openDrawer,
    root: root
  };
})();
