# Gideons Revision

Free A-Level revision website: Religious Studies (AQA), Economics (Pearson Edexcel A), Media Studies (OCR).
Plain HTML + CSS + JavaScript. No framework, no build step, no dependencies. Progress is saved in the browser (localStorage).

## Structure
- `index.html`   page shell, links the CSS and JS
- `css/styles.css`  all styling (layout, colours, dark mode, animations, mobile)
- `js/app.js`    all data (subjects, topics, summaries, questions, flashcards) and app logic (quizzes, marking, progress, streaks, timer, search, backup)
- `vercel.json`, `package.json`  deploy/run config

## Run locally
Double-click `index.html`, or run `npx serve .` and open the printed address.

## Deploy
1. Push this folder to a GitHub repo.
2. vercel.com > Add New > Project > import the repo.
3. Framework Preset: Other. Build Command: empty. Output Directory: empty (root). Deploy.
