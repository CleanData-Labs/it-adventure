# 🚀 IT Adventure – The Learning Platform

An interactive, bilingual (Română / English) IT learning website for children aged ~7–14.
Children enter their name, pick an avatar, choose a course on the adventure map, complete lessons,
play educational games, take a final quiz and earn a printable / downloadable certificate.

**Pure static site** (HTML + CSS + vanilla JS, no build step, no backend). Progress is stored in the
browser's `localStorage`, so it can be hosted for free anywhere (GitHub Pages, Netlify, etc.).

## Courses (4 courses × 4 lessons + final quiz each)
| Course | Lessons → game |
|---|---|
| 💻 Calculatorul pe înțelese / Computer Basics | Parts of a computer → drag-and-drop matching · Mouse & keyboard → typing game · Files & folders → sort files into folders · Inside the computer → memory cards |
| 🛡️ Siguranța pe internet / Internet Safety | Strong passwords → password strength workshop · Strangers online → safe/unsafe sorting · Personal info → keep secret / OK to share · Fake news & scams → phishing "red flag" detective |
| 🤖 Logica programării / Coding Logic | Sequences → robot grid programming · Loops → robot with repeat blocks & block limits · Conditions → IF/THEN sorting machine · Debugging → fix buggy robot programs |
| 🧩 Algoritmi și creativitate / Algorithms & Creativity | What is an algorithm → put steps in order · Sorting → bubble-sort swap game · Binary → binary cards · Pixel art → decode run-length pixel images |

Plus: stars (1–3 per lesson), XP & levels, 12 badges, sequential unlocking, confetti, Web-Audio sound effects (toggle),
parents/teachers area (math gate, progress table, reset/delete, JSON export), multiple player profiles,
certificate via print-to-PDF (A4 landscape) or PNG download.

## Run locally
```
python3 -m http.server 8000   # then open http://localhost:8000
```

## Structure
- `index.html` – shell
- `css/style.css` – all styles (responsive, print styles for the certificate)
- `js/content.js` – all course content, UI strings and badges (RO + EN)
- `js/games.js` – game engines (match, sort, memory, typing, password, flags, ifthen, order, swap, binary, pixel, robot, quiz)
- `js/app.js` – state, routing (hash based), views, certificate, parents area

To add a lesson, add an object to a course's `lessons` array in `js/content.js` with `slides` and an `activity` using one of the game types.
