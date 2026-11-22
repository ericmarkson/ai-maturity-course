# AI Maturity Course

A free, self-paced, zero-build interactive curriculum covering AI from foundational concepts (Level 1) to frontier systems, safety, and research engineering (Level 10). All **80 topics** include structured lessons, hands-on browser simulations, and scenario-based quizzes with local progress tracking.

## Repository Structure

```text
ai-maturity-course/
├── site/                    # Deploy-ready static website (HTML/CSS/vanilla JS)
│   ├── index.html           # Course homepage, search/filter, resume CTA, progress export/import
│   ├── assets/
│   │   ├── css/styles.css   # Shared design system (light + dark mode, responsive components)
│   │   └── js/              # course-data.js, progress.js, site.js, exercise.js, quiz.js
│   └── levels/
│       └── level-1..10/     # Level overviews (index.html) and 80 interactive topic pages
├── research/                # Source curriculum specs and per-level syllabi
│   ├── curriculum.md
│   ├── topics-seed.md
│   └── syllabus/
└── docs/                    # Component docs and archived build/QA history
    ├── COMPONENTS.md
    ├── example-topic.html
    └── archive/
```

## Local Preview

Serve the `site/` directory with any static file server:

```bash
python -m http.server 8000 --directory site
```

Then open `http://localhost:8000` in your browser.

## Deployment (Cloudflare Pages)

- **Live URL:** https://ai-maturity-course.pages.dev/

The `site/` folder is completely self-contained with zero build steps or external runtime dependencies. To redeploy updates:

```bash
wrangler pages deploy site --project-name ai-maturity-course --branch main
```

## Features

- **10 Levels / 4 Tiers / 80 Topics:** Foundations (L1–2), Core ML & Deep Learning (L3–4), LLMs, RAG & Agents (L5–7), and Production, Safety & Frontier (L8–10).
- **Hands-On Browser Widgets:** Every topic includes a genuine vanilla-JS interactive simulation, visualizer, or debugging exercise.
- **Scenario Quizzes & Progress Tracking:** Client-side graded quizzes with explanations, `localStorage` persistence (`aimc:progress:v1`), resume-where-you-left-off, and JSON progress export/import.
- **Search, Navigation Drawer & Dark Mode:** Instant cross-course search (`/` or `Ctrl+K`), slide-over course drawer, breadcrumbs, and accessible light/dark themes.
