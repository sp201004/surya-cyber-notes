<div align="center">

<img src="public/favicon.svg" alt="Surya's Cyber Notes logo" width="90" height="90" />

# Surya's Cyber Notes

**A personal cybersecurity study-notes platform — my TryHackMe & Google Cybersecurity journey, turned into an interactive, gamified learning site.**

[**🌐 Live → spnotes.vercel.app**](https://spnotes.vercel.app/)

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6-CA4245?logo=reactrouter&logoColor=white)

</div>

---

## 📸 Screenshots

<div align="center">

<img src="https://github.com/user-attachments/assets/928637fb-ca7a-414a-94df-38b87d3e8552" alt="Surya's Cyber Notes — landing page" width="100%" />

</div>

---

## 🧠 About

This is my personal collection of cybersecurity study notes from the **TryHackMe Pre-Security** and **Cyber Security 101** paths, the **Google Cybersecurity Professional Certificate**, and a hands-on **CTF / Challenges** series — all rebuilt as an interactive, gamified learning site.

Instead of a folder of markdown files, every topic is a "room" on a course map — with notes, diagrams, an interactive mindmap, and practice questions — all wrapped in a terminal/hacker aesthetic.

### 🗂️ Learning paths

| Path | Modules / Courses | Rooms |
|------|------|------|
| **TryHackMe · Pre-Security** | 7 modules | 38 |
| **TryHackMe · Cyber Security 101** | 14 modules | 69 |
| **Google Cybersecurity Professional Certificate** | 8 courses | 41 |
| **CTF / Challenges** (Hacker Holidays 2026) | 1 series | 16 |
| **Total** | | **164 rooms** |

The Cyber Security 101 path covers: Start Your Cyber Security Journey, Linux Fundamentals, Windows & AD Fundamentals, Command Line, Networking, Cryptography, Exploitation Basics, Web Hacking, Offensive Security Tooling, Defensive Security, Security Solutions, Defensive Security Tooling, Build Your Cyber Security Career, and OWASP Top 10 (2025).

---

## ✨ Features

- 🗺️ **Gamified course maps** — TryHackMe-style learning paths with unique isometric 3D room icons
- 📝 **Full study notes** — styled dark tables, syntax-highlighted code, and atomic ASCII/monospace diagrams
- 🌳 **Interactive SVG mindmaps** — auto-laid-out concept trees with a clickable explorer panel
- 🎯 **Practice questions with hints**, key takeaways, and real-world scenario case studies
- 💻 **Terminal/hacker dark theme** — neon-green accents, animated details, ligature-free code
- 🔗 **Real URL routing** — deep-linkable rooms, refresh-safe, with scroll-position restore
- 📚 **164 rooms** across four tracks — **TryHackMe Pre-Security** (7 modules) + **TryHackMe Cyber Security 101** (14 modules) + **Google Cybersecurity** (8 courses) + a **CTF / Challenges** series

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
├── App.tsx                 # Routes, layout, landing/home, footer
├── main.tsx                # Entry point
├── index.css               # Theme + animations (Tailwind)
├── types.ts                # Shared types (Topic, MindmapNode, ...)
├── data.ts                 # TryHackMe Pre-Security course/module/room data
├── dataCyberSecurity101.ts # Cyber Security 101 course data (14 modules)
├── dataGoogleCyber.ts      # Google Cybersecurity course data
├── dataHackerHolidays.ts   # CTF / Challenges (Hacker Holidays 2026) data
├── data/
│   └── sharedIntroRooms.ts # Rooms shared across courses
├── components/
│   ├── Header.tsx          # Brand header
│   ├── ModuleMap.tsx       # Course map + isometric 3D room icons
│   ├── NotesView.tsx       # Notes renderer, mindmap, sidebar
│   ├── BinaryBackground.tsx
│   └── ErrorBoundary.tsx
└── notes/
    ├── index.ts                       # Maps every room id → its markdown notes
    ├── tryhackme/pre-security/         # TryHackMe Pre-Security notes (.md)
    ├── tryhackme/cyber-security-101/   # Cyber Security 101 notes (.md)
    ├── tryhackme/hacker-holidays-2026/ # CTF / Challenges notes (.md)
    └── google-cybersecurity/           # Google Cybersecurity notes (.md)
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

---

## 🎨 Credits

- The Module 9 (Offensive Security Tooling) **Gobuster** map icon is a neon-green monochrome silhouette **adapted from the Go Gopher**, the mascot of the Go programming language. The Go Gopher was designed by **Renée French** and is licensed under **[Creative Commons Attribution 3.0](https://creativecommons.org/licenses/by/3.0/)**. This project uses an original hand-drawn adaptation of the gopher's likeness; it is not an official Go asset and is not affiliated with or endorsed by the Go project or Google.
- The **CTF / Challenges → Hacker Holidays 2026 (The Byte Lotus)** room notes are adapted from the **MIT-licensed** [findings log by **Varun Anand Patkar**](https://github.com/Varun-Patkar/HackerHolidays). Commands, payloads, and flag values are reproduced verbatim; prose was restyled to match this site. Full license and attribution are in [`LICENSE-THIRD-PARTY.md`](LICENSE-THIRD-PARTY.md), and each room carries a per-note footer credit.
