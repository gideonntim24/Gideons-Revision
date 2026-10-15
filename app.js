const $ = s => document.querySelector(s);
const app = $("#app");
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch {} };
let user = load("gr:user", "guest");
const key = () => "gr:data:" + user;
const data = () => load(key(), { done: {}, best: {} });
function setTheme(t) { document.documentElement.dataset.theme = t; save("gr:theme", t); }
setTheme(load("gr:theme", matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
function pct(id) { const d = data().done, n = SUBJECTS[id].topics.length; return Math.round(SUBJECTS[id].topics.filter((_, i) => d[id + i]).length / n * 100); }
const bar = p => `<div class="bar"><i style="width:${p}%"></i></div>`;

function home() {
  app.innerHTML = `<div class="hero"><h1>Hi ${user === "guest" ? "there" : user} 👋</h1><p>Pick a subject, tick off topics, then test yourself.</p></div>
  <div class="grid">${Object.entries(SUBJECTS).map(([id, s]) => `<div class="card"><h3>${s.icon} ${s.name}</h3>${bar(pct(id))}<p class="muted">${pct(id)}% complete</p><a class="btn" href="#/subject/${id}">Open</a></div>`).join("")}</div>`;
}
function subject(id) {
  const s = SUBJECTS[id]; if (!s) return home();
  const d = data().done;
  app.innerHTML = `<h2>${s.icon} ${s.name}</h2>${bar(pct(id))}
  <div class="card">${s.topics.map((t, i) => `<label class="t"><input type="checkbox" data-k="${id}${i}" ${d[id + i] ? "checked" : ""}> ${t}</label>`).join("")}</div>
  <a class="btn" href="#/cards/${id}">Flashcards</a> <a class="btn alt" href="#/quiz/${id}">Quiz</a>`;
  app.querySelectorAll("input[type=checkbox]").forEach(c => c.onchange = () => { const x = data(); x.done[c.dataset.k] = c.checked; save(key(), x); subject(id); });
}
function cards(id) {
  const qs = QUESTIONS.filter(q => q.s === id); let i = 0, show = false;
  const draw = () => {
    if (!qs.length) return app.innerHTML = `<p>No questions yet.</p>`;
    const q = qs[i];
    app.innerHTML = `<h2>Flashcards</h2><div class="card flash" id="f">${show ? "✅ " + q.a[q.c] : q.q}</div><p class="muted">Card ${i + 1}/${qs.length} · click card to flip</p><button class="alt" id="p">Prev</button> <button id="n">Next</button>`;
    $("#f").onclick = () => { show = !show; draw(); };
    $("#n").onclick = () => { i = (i + 1) % qs.length; show = false; draw(); };
    $("#p").onclick = () => { i = (i - 1 + qs.length) % qs.length; show = false; draw(); };
  };
  draw();
}
function quiz(id) {
  const qs = QUESTIONS.filter(q => q.s === id).sort(() => Math.random() - .5); let i = 0, score = 0;
  const draw = () => {
    if (i >= qs.length) { const x = data(); x.best[id] = Math.max(x.best[id] || 0, score); save(key(), x); return app.innerHTML = `<div class="card"><h2>Score: ${score}/${qs.length}</h2><p class="muted">Best: ${x.best[id]}</p><a class="btn" href="#/quiz/${id}" onclick="setTimeout(route)">Retry</a></div>`; }
    const q = qs[i];
    app.innerHTML = `<div class="card"><p class="muted">Question ${i + 1}/${qs.length}</p><h3>${q.q}</h3>${q.a.map((o, j) => `<button class="opt" data-j="${j}">${o}</button>`).join("")}</div>`;
    app.querySelectorAll(".opt").forEach(b => b.onclick = () => {
      const j = +b.dataset.j; if (j === q.c) score++;
      app.querySelectorAll(".opt").forEach(o => o.classList.add(+o.dataset.j === q.c ? "ok" : +o.dataset.j === j ? "bad" : "x"));
      setTimeout(() => { i++; draw(); }, 900);
    });
  };
  draw();
}
function settings() {
  app.innerHTML = `<h2>Settings</h2>
  <div class="card"><h3>Theme</h3><select id="th"><option value="light">Light</option><option value="dark">Dark</option></select></div>
  <div class="card"><h3>Profile</h3><p class="muted">Signed in as <b>${user}</b>. Progress is stored per name on this device.</p><input id="u" placeholder="Your name"> <button id="s">Switch</button></div>
  <div class="card"><button class="alt" id="r">Reset my progress</button></div>`;
  $("#th").value = document.documentElement.dataset.theme; $("#th").onchange = e => setTheme(e.target.value);
  $("#s").onclick = () => { const n = $("#u").value.trim(); if (n) { user = n; save("gr:user", n); settings(); } };
  $("#r").onclick = () => { if (confirm("Reset all progress for " + user + "?")) { save(key(), { done: {}, best: {} }); settings(); } };
}
function route() {
  const [, p, id] = location.hash.slice(1).split("/");
  ({ subject, cards, quiz, settings }[p] || home)(id);
  scrollTo(0, 0);
}
addEventListener("hashchange", route); route();
