<div align="center">

# `>_` Surya's Cyber Notes

**A personal cybersecurity study-notes platform — my TryHackMe & Google Cybersecurity journey, turned into an interactive, gamified learning site.**

[**🌐 Live Demo →**](https://YOUR-DEPLOY-URL.vercel.app) &nbsp;·&nbsp; *(URL added after deploy)*

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6-CA4245?logo=reactrouter&logoColor=white)

</div>

---

## 📸 Screenshots

<!-- Recommended size: 1280×800 (16:10), PNG. Drop images in a /screenshots folder and update the paths. -->

<!-- Landing page -->
<!-- ![Landing page](screenshots/landing.png) -->

<!-- Course map (isometric room path) -->
<!-- ![Course map](screenshots/course-map.png) -->

<!-- Room / notes page (notes + mindmap + sidebar) -->
<!-- ![Room page](screenshots/room.png) -->

> _Screenshots coming soon — landing page, a course map, and a room page._

---

## 🧠 About

This is my personal collection of cybersecurity study notes from the **TryHackMe Pre Security path** and the **Google Cybersecurity Professional Certificate**, rebuilt as an interactive, gamified learning site.

Instead of a folder of markdown files, every topic is a "room" on a course map — with notes, diagrams, an interactive mindmap, and practice questions — all wrapped in a terminal/hacker aesthetic.

---

## ✨ Features

- 🗺️ **Gamified course maps** — TryHackMe-style learning paths with unique isometric 3D room icons
- 📝 **Full study notes** — styled dark tables, syntax-highlighted code, and atomic ASCII/monospace diagrams
- 🌳 **Interactive SVG mindmaps** — auto-laid-out concept trees with a clickable explorer panel
- 🎯 **Practice questions with hints**, key takeaways, and real-world scenario case studies
- 💻 **Terminal/hacker dark theme** — neon-green accents, animated details, ligature-free code
- 🔗 **Real URL routing** — deep-linkable rooms, refresh-safe, with scroll-position restore
- 📚 **79 rooms total** — **7 TryHackMe modules** (38 rooms) + **8 Google Cybersecurity courses** (41 rooms)

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| Framework | **React 19** + **TypeScript** |
| Build tool | **Vite 6** |
| Styling | **Tailwind CSS 4** |
| Routing | **React Router 6** (deep links + SPA fallback) |
| Markdown | **react-markdown** + `remark-gfm` + `remark-breaks` |
| Animation | **motion** (Framer Motion) |
| Icons | **lucide-react** + hand-built isometric SVG scenes |
| Mindmap | Custom **tidy-tree layout** (self-contained — no external graph library) |

---

## 🚀 Run Locally

**Prerequisite:** Node.js

```bash
# 1. Clone
git clone https://github.com/YOUR-USERNAME/surya-cyber-notes.git
cd surya-cyber-notes

# 2. Install dependencies
npm install

# 3. Start the dev server (http://localhost:3000)
npm run dev
```

**Build & preview the production bundle:**

```bash
npm run build     # outputs to /dist
npm run preview   # serves the production build locally
```

---

## 📂 Project Structure

```
src/
├── App.tsx              # Routes, layout, landing/home, footer
├── main.tsx            # Entry point
├── index.css           # Theme + animations (Tailwind)
├── data.ts             # TryHackMe course/module/room data
├── dataGoogleCyber.ts  # Google Cybersecurity course data
├── types.ts            # Shared types (Topic, MindmapNode, ...)
├── components/
│   ├── Header.tsx          # Brand header
│   ├── ModuleMap.tsx       # Course map + isometric 3D room icons
│   ├── NotesView.tsx       # Notes renderer, mindmap, sidebar
│   ├── BinaryBackground.tsx
│   └── ErrorBoundary.tsx
├── notes/
│   ├── index.ts            # Maps every room id → its markdown notes
│   ├── module1 … module7*  # TryHackMe notes (.md)
│   └── google-course-1…8/  # Google Cybersecurity notes (.md)
└── assets/source-notes/    # Original raw source notes (reference)
```

---

## ⚠️ Disclaimer

These notes are my **personal study material**. **TryHackMe** and the **Google Cybersecurity Professional Certificate** content, names, and trademarks belong to their respective owners. This is a **non-commercial, educational project** built for learning and revision — not affiliated with or endorsed by either organization.

---

## 👤 Author

**Surya Pratap Singh**

> _"I will not quit because it's hard. I will continue because my future is worth it."_

<div align="center">

`Learning. Building. Securing.`

</div>
