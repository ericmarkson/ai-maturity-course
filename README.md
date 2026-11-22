# AI Maturity Course

A free, self-paced, zero-build interactive curriculum covering AI from foundational concepts, practical AI workflows/skills/agents, and prompt engineering (Levels 1–3) to frontier systems, safety, and research engineering (Level 11). All **89 topics** include structured lessons, hands-on browser simulations, and scenario-based quizzes with local progress tracking.

## Repository Structure

```text
ai-maturity-course/
├── site/                    # Deploy-ready static website (HTML/CSS/vanilla JS)
│   ├── index.html           # Course homepage, search/filter, resume CTA, progress export/import
│   ├── assets/
│   │   ├── css/styles.css   # Shared design system (light + dark mode, responsive components)
│   │   └── js/              # course-data.js, progress.js, site.js, exercise.js, quiz.js
│   └── levels/
│       ├── level-1..10/         # Level overviews and topic pages
│       └── prompt-engineering/  # Level 3: Prompt Engineering module & topics
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

- **11 Levels / 4 Tiers / 89 Topics:** Foundations (L1–3, including practical Prompt/Rules/Tools/Skills/Agents/Teams and a full Prompt Engineering module), Core ML & Deep Learning (L4–5), LLMs, RAG & Agents (L6–8), and Production, Safety & Frontier (L9–11).
- **Hands-On Browser Widgets:** Every topic includes a genuine vanilla-JS interactive simulation, visualizer, or debugging exercise.
- **Scenario Quizzes & Progress Tracking:** Client-side graded quizzes with explanations, `localStorage` persistence (`aimc:progress:v1`), resume-where-you-left-off, and JSON progress export/import.
- **Search, Navigation Drawer & Dark Mode:** Instant cross-course search (`/` or `Ctrl+K`), slide-over course drawer, breadcrumbs, and accessible light/dark themes.
