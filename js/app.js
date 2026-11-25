/* IT Adventure – app shell, state, routing, views */
'use strict';
const KEY = 'itAdventure.v1';
const S = (() => { try { return Object.assign({ lang: 'ro', sound: true, current: null, players: {} }, JSON.parse(localStorage.getItem(KEY)) || {}); } catch (e) { return { lang: 'ro', sound: true, current: null, players: {} }; } })();
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
const t = o => (o && typeof o === 'object' ? (o[S.lang] ?? o.ro) : o);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = (o, v) => t(o).replace(/\{(\w+)\}/g, (_, k) => v[k]);
const P = () => S.players[S.current];
const $ = (s, r = document) => r.querySelector(s);
const app = () => $('#app');
const course = id => COURSES.find(c => c.id === id);
const lkey = (c, l) => c.id + '/' + l.id;
const lessonStars = (p, c, i) => p.lessons[lkey(c, c.lessons[i])] || 0;
const unlocked = (p, c, i) => i === 0 || lessonStars(p, c, i - 1) > 0;
const allLessons = (p, c) => c.lessons.every((_, i) => lessonStars(p, c, i) > 0);
const quizPassed = (p, c) => !!(p.quiz[c.id] && p.quiz[c.id].passed);
const courseProgress = (p, c) => (c.lessons.filter((_, i) => lessonStars(p, c, i) > 0).length + (quizPassed(p, c) ? 1 : 0)) / (c.lessons.length + 1);
const totalStars = p => Object.values(p.lessons).reduce((a, b) => a + b, 0);
const levelOf = xp => { const lv = Math.floor(xp / 200) + 1; return { lv, name: UI.levelNames[Math.min(lv - 1, UI.levelNames.length - 1)], pct: (xp % 200) / 2 }; };
const fmtDate = d => new Date(d).toLocaleDateString(S.lang === 'ro' ? 'ro-RO' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

/* ---------- Sound (Web Audio, no files) ---------- */
let AC;
function sfx(kind) {
  if (!S.sound) return;
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    const seq = { good: [[660, .08], [880, .12]], bad: [[200, .18, 'sawtooth']], click: [[520, .04]], key: [[750, .025]], step: [[430, .05, 'triangle']], win: [[523, .1], [659, .1], [784, .1], [1047, .25]] }[kind] || [[500, .05]];
    let at = AC.currentTime;
    seq.forEach(([f, d, type]) => { const o = AC.createOscillator(), g = AC.createGain(); o.type = type || 'sine'; o.frequency.value = f; g.gain.setValueAtTime(.18, at); g.gain.exponentialRampToValueAtTime(.001, at + d); o.connect(g).connect(AC.destination); o.start(at); o.stop(at + d + .02); at += d * .9; });
  } catch (e) {}
}
function confetti() {
  const box = document.createElement('div'); box.className = 'confetti'; document.body.appendChild(box);
  const cols = ['#f43f5e', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7', '#06b6d4'];
  for (let i = 0; i < 90; i++) { const c = document.createElement('i'); c.style.left = Math.random() * 100 + '%'; c.style.background = cols[i % cols.length]; c.style.animationDelay = Math.random() * .6 + 's'; c.style.animationDuration = 1.8 + Math.random() * 1.5 + 's'; c.style.transform = `rotate(${Math.random() * 360}deg)`; box.appendChild(c); }
  setTimeout(() => box.remove(), 4000);
}

/* ---------- Badges ---------- */
function checkBadges(p, extra = []) {
  const has = id => p.badges.includes(id), earned = [];
  const give = id => { if (!has(id)) { p.badges.push(id); earned.push(id); } };
  if (Object.keys(p.lessons).length) give('first');
  if (totalStars(p) >= 25) give('stars25');
  if (p.lessons['computer/mouse']) give('typist');
  if (p.lessons['safety/passwords'] === 3) give('pwpro');
  if (['sequence', 'loops', 'debug'].every(l => p.lessons['logic/' + l])) give('robot');
  extra.forEach(give);
  COURSES.forEach(c => { if (quizPassed(p, c)) give('grad_' + c.id); });
  if (COURSES.every(c => quizPassed(p, c))) give('champion');
  return earned;
}

/* ---------- Top bar ---------- */
function topbar() {
  const p = P();
  $('#topbar').innerHTML = `
    <a class="logo" href="#/${p ? 'map' : ''}" aria-label="IT Adventure"><span class="logo-ico">🚀</span><span>IT&nbsp;Adventure</span></a>
    <div class="tb-right">
      ${p ? `<a class="pchip" href="#/badges" title="${t(UI.badges)}"><span class="av">${p.avatar}</span><span class="pn">${esc(p.name)}</span><span class="pst">⭐ ${totalStars(p)}</span><span class="pst">⚡ ${p.xp}</span></a>` : ''}
      <div class="lang" role="group" aria-label="Language"><button data-l="ro" class="${S.lang === 'ro' ? 'on' : ''}">RO</button><button data-l="en" class="${S.lang === 'en' ? 'on' : ''}">EN</button></div>
      <button class="iconbtn snd" aria-label="${t(UI.sound)}" title="${t(UI.sound)}">${S.sound ? '🔊' : '🔇'}</button>
      <a class="iconbtn" href="#/parents" title="${t(UI.parents)}" aria-label="${t(UI.parents)}">👪</a>
    </div>`;
  document.querySelectorAll('.lang button').forEach(b => b.onclick = () => { S.lang = b.dataset.l; document.documentElement.lang = S.lang; save(); route(); });
  $('.snd').onclick = () => { S.sound = !S.sound; save(); topbar(); sfx('click'); };
}

/* ---------- Views ---------- */
function viewWelcome() {
  let av = AVATARS[0];
  const players = Object.values(S.players).sort((a, b) => b.last - a.last);
  app().innerHTML = `<section class="welcome">
    <div class="hero"><div class="hero-art" aria-hidden="true"><span>💻</span><span>🤖</span><span>🛡️</span><span>🧩</span></div>
      <h1>IT Adventure</h1><p class="tag">${t(UI.tagline)}</p><h2>${t(UI.welcome)}</h2><p>${t(UI.welcomeText)}</p></div>
    ${players.length ? `<div class="card"><h3>${t(UI.continueAs)}</h3><div class="plist">${players.map(p => `<button class="pbtn" data-id="${p.id}"><span class="av">${p.avatar}</span>${esc(p.name)}<small>⭐ ${totalStars(p)}</small></button>`).join('')}</div><p class="muted">${t(UI.orNew)}</p></div>` : ''}
    <form class="card newp" autocomplete="off">
      <label for="nm"><h3>${t(UI.enterName)}</h3></label>
      <input id="nm" maxlength="20" placeholder="${t(UI.namePh)}" required>
      <h3>${t(UI.pickAvatar)}</h3>
      <div class="avatars">${AVATARS.map((a, i) => `<button type="button" class="avbtn ${i === 0 ? 'on' : ''}" data-a="${a}" aria-label="avatar ${i + 1}">${a}</button>`).join('')}</div>
      <p class="err" aria-live="polite"></p>
      <button class="btn big primary" type="submit">${t(UI.start)}</button>
    </form></section>`;
  document.querySelectorAll('.pbtn').forEach(b => b.onclick = () => { S.current = b.dataset.id; S.players[S.current].last = Date.now(); save(); sfx('good'); location.hash = '#/map'; });
  document.querySelectorAll('.avbtn').forEach(b => b.onclick = () => { av = b.dataset.a; document.querySelectorAll('.avbtn').forEach(x => x.classList.toggle('on', x === b)); sfx('click'); });
  $('.newp').onsubmit = e => {
    e.preventDefault(); const name = $('#nm').value.trim().replace(/\s+/g, ' ');
    if (name.length < 2) { $('.err').textContent = t(UI.needName); sfx('bad'); return; }
    const id = 'p' + Date.now().toString(36);
    S.players[id] = { id, name, avatar: av, created: Date.now(), last: Date.now(), xp: 0, lessons: {}, quiz: {}, badges: [] };
    S.current = id; save(); sfx('win'); location.hash = '#/map';
  };
}

function viewMap() {
  const p = P(), L = levelOf(p.xp);
  const tip = UI.mascotTips[Math.floor(Math.random() * UI.mascotTips.length)];
  app().innerHTML = `<section class="map">
    <div class="profile card">
      <div class="bigav">${p.avatar}</div>
      <div class="pinfo"><h1>${fmt(UI.hello, { name: esc(p.name) })}</h1>
        <div class="lvl">${t(UI.level)} ${L.lv} · <b>${t(L.name)}</b></div>
        <div class="xpbar" title="XP"><div style="width:${L.pct}%"></div></div>
        <div class="pstats"><span>⚡ ${p.xp} XP</span><span>⭐ ${totalStars(p)} ${t(UI.stars).toLowerCase()}</span><a href="#/badges">🏅 ${p.badges.length}/${BADGES.length} ${t(UI.badges).toLowerCase()}</a></div>
      </div>
      <div class="mascot"><div class="bubble">${t(tip)}</div><div class="bit" aria-hidden="true">🤖</div></div>
    </div>
    <h2 class="sec">🗺️ ${t(UI.mapTitle)}</h2><p class="muted">${t(UI.mapSub)}</p>
    <div class="courses">${COURSES.map((c, n) => { const pr = Math.round(courseProgress(p, c) * 100); const done = quizPassed(p, c);
      return `<a class="course-card" href="#/course/${c.id}" style="--c:${c.color};--c2:${c.color2}">
        <div class="cc-top"><span class="cc-num">${n + 1}</span><span class="cc-emoji">${c.emoji}</span>${done ? '<span class="cc-cert" title="' + t(UI.certificate) + '">🎓</span>' : ''}</div>
        <h3>${t(c.title)}</h3><p>${t(c.desc)}</p>
        <div class="cc-lessons">${c.lessons.map((l, i) => `<span class="dot ${lessonStars(p, c, i) ? 'd' : ''}" title="${t(l.title)}">${l.emoji}</span>`).join('')}<span class="dot ${done ? 'd' : ''}">📝</span></div>
        <div class="pbar"><div style="width:${pr}%"></div></div><div class="cc-foot"><span>${pr}%</span><span class="go">${pr ? (done ? t(UI.completed) + ' ✔' : t(UI.continue) + ' ➜') : t(UI.startBtn) + ' ➜'}</span></div></a>`; }).join('')}</div>
    <div class="map-foot"><button class="btn ghostbtn swp">🔄 ${t(UI.switchPlayer)}</button></div></section>`;
  $('.swp').onclick = () => { S.current = null; save(); location.hash = '#/'; };
}

function viewCourse(c) {
  const p = P();
  const all = allLessons(p, c), qp = quizPassed(p, c);
  app().innerHTML = `<section class="course" style="--c:${c.color};--c2:${c.color2}">
    <a class="back" href="#/map">${t(UI.backMap)}</a>
    <div class="chead"><span class="ch-emoji">${c.emoji}</span><div><h1>${t(c.title)}</h1><p>${t(c.desc)}</p>
      <div class="pbar light"><div style="width:${Math.round(courseProgress(p, c) * 100)}%"></div></div></div></div>
    <ol class="path">${c.lessons.map((l, i) => { const st = lessonStars(p, c, i), un = unlocked(p, c, i);
      return `<li class="node ${st ? 'done' : un ? 'open' : 'locked'}">${un ? `<a href="#/lesson/${c.id}/${i}">` : `<div title="${t(UI.lockedMsg)}">`}
        <span class="nico">${un ? l.emoji : '🔒'}</span><span class="ntxt"><small>${t(UI.lesson)} ${i + 1}</small><b>${t(l.title)}</b><span class="nstars">${[1, 2, 3].map(k => `<i class="${k <= st ? 'on' : ''}">★</i>`).join('')}</span></span>
        <span class="nbtn">${un ? (st ? t(UI.replay) : t(UI.startBtn)) : t(UI.locked)}</span>${un ? '</a>' : '</div>'}</li>`; }).join('')}
      <li class="node quiz ${qp ? 'done' : all ? 'open' : 'locked'}">${all ? `<a href="#/quiz/${c.id}">` : `<div title="${t(UI.quizLocked)}">`}<span class="nico">${all ? '📝' : '🔒'}</span><span class="ntxt"><small>${t(UI.finalQuiz)}</small><b>${all ? (qp ? `${t(UI.score)}: ${p.quiz[c.id].best}/${c.quiz.length}` : t(UI.finalQuiz)) : t(UI.quizLocked)}</b></span><span class="nbtn">${all ? (qp ? t(UI.replay) : t(UI.startBtn)) : t(UI.locked)}</span>${all ? '</a>' : '</div>'}</li>
      <li class="node cert ${qp ? 'done open' : 'locked'}">${qp ? `<a href="#/cert/${c.id}">` : '<div>'}<span class="nico">${qp ? '🎓' : '🔒'}</span><span class="ntxt"><small>${t(UI.certificate)}</small><b>${qp ? t(UI.getCert) : t(UI.certLocked)}</b></span>${qp ? `<span class="nbtn">🎓</span></a>` : '</div>'}</li>
    </ol></section>`;
}

function viewLesson(c, i) {
  const p = P(), l = c.lessons[i]; let s = 0;
  const show = () => {
    const sl = l.slides[s];
    app().innerHTML = `<section class="lesson" style="--c:${c.color};--c2:${c.color2}">
      <div class="lhead"><a class="back" href="#/course/${c.id}">${t(UI.backCourse)}</a><span class="ltitle">${l.emoji} ${t(UI.lesson)} ${i + 1}: ${t(l.title)}</span></div>
      <div class="dots">${l.slides.map((_, k) => `<i class="${k <= s ? 'on' : ''}"></i>`).join('')}<i class="game">🎮</i></div>
      <article class="slide card"><div class="sl-art" aria-hidden="true">${sl.e}</div><h2>${t(sl.title)}</h2><p class="sl-text">${t(sl.text)}</p>
        ${sl.fact ? `<div class="fact"><b>💡 ${t(UI.funFact)}</b> ${t(sl.fact)}</div>` : ''}</article>
      <div class="navbtns"><button class="btn ghostbtn prev" ${s === 0 ? 'disabled' : ''}>${t(UI.prev)}</button>
        <button class="btn big primary nxt">${s < l.slides.length - 1 ? t(UI.next) : t(UI.play)}</button></div></section>`;
    $('.prev').onclick = () => { s--; sfx('click'); show(); };
    $('.nxt').onclick = () => { sfx('click'); if (s < l.slides.length - 1) { s++; show(); } else activity(); };
    window.scrollTo(0, 0);
  };
  const activity = () => {
    const a = l.activity;
    app().innerHTML = `<section class="lesson game-view" style="--c:${c.color};--c2:${c.color2}">
      <div class="lhead"><a class="back" href="#/course/${c.id}">${t(UI.backCourse)}</a><span class="ltitle">🎮 ${t(a.title)}</span></div>
      <div class="dots">${l.slides.map(() => '<i class="on"></i>').join('')}<i class="game on">🎮</i></div>
      <div class="gamebox card" data-game="${a.type}"></div></section>`;
    window.scrollTo(0, 0);
    GAMES[a.type]($('.gamebox'), a, { lang: S.lang, t, sfx, name: p.name, done: (stars, extra = []) => finishLesson(c, i, stars, extra) });
  };
  show();
}

function finishLesson(c, i, stars, extra) {
  const p = P(), k = lkey(c, c.lessons[i]), old = p.lessons[k] || 0;
  let xp = 0;
  if (!old) xp += 30;
  if (stars > old) { xp += 10 * (stars - old); p.lessons[k] = stars; }
  p.xp += xp; p.last = Date.now();
  const nb = checkBadges(p, extra); save(); topbar();
  sfx('win'); confetti();
  const next = i + 1 < c.lessons.length ? `#/lesson/${c.id}/${i + 1}` : `#/quiz/${c.id}`;
  modal(`<div class="result"><div class="rstars">${[1, 2, 3].map(n => `<span class="${n <= stars ? 'on' : ''}" style="animation-delay:${n * .2}s">★</span>`).join('')}</div>
    <h2>${fmt(UI.wellDone, { name: esc(p.name) })}</h2><p>${t(UI.lessonDone)}</p>
    ${xp ? `<p class="earn">${t(UI.earned)} <b>+${xp} XP</b> ⚡</p>` : ''}
    ${badgeHtml(nb)}
    <div class="mbtns"><a class="btn ghostbtn" href="#/course/${c.id}">${t(UI.backToCourse)}</a><a class="btn primary big" href="${next}">${i + 1 < c.lessons.length ? t(UI.nextLesson) : t(UI.finalQuiz) + ' ➜'}</a></div></div>`);
}
const badgeHtml = ids => ids.length ? `<div class="newbadges"><b>${t(UI.newBadge)}</b>${ids.map(id => { const b = BADGES.find(x => x.id === id); return `<div class="nb"><span>${b.e}</span>${t(b.name)}</div>`; }).join('')}</div>` : '';

function modal(inner) {
  closeModal();
  const m = document.createElement('div'); m.className = 'modal'; m.innerHTML = `<div class="mdlg card" role="dialog" aria-modal="true">${inner}</div>`;
  document.body.appendChild(m); m.querySelectorAll('a').forEach(a => a.addEventListener('click', closeModal));
  const f = m.querySelector('.primary') || m.querySelector('a,button'); if (f) f.focus();
}
const closeModal = () => document.querySelectorAll('.modal').forEach(m => m.remove());

function viewQuiz(c) {
  const p = P();
  app().innerHTML = `<section class="lesson" style="--c:${c.color};--c2:${c.color2}">
    <div class="lhead"><a class="back" href="#/course/${c.id}">${t(UI.backCourse)}</a><span class="ltitle">📝 ${t(UI.finalQuiz)}: ${t(c.title)}</span></div>
    <div class="gamebox card quizbox"></div></section>`;
  GAMES.quiz($('.quizbox'), c.quiz, { lang: S.lang, t, sfx, done: (score, n) => {
    const need = Math.ceil(n * 0.75), pass = score >= need;
    const q = p.quiz[c.id] || { best: 0, passed: false }; const first = pass && !q.passed;
    q.best = Math.max(q.best, score); if (pass) { q.passed = true; q.date = q.date || Date.now(); }
    p.quiz[c.id] = q; if (first) p.xp += 100; p.last = Date.now();
    const nb = checkBadges(p, score === n ? ['perfect'] : []); save(); topbar();
    if (pass) { sfx('win'); confetti(); }
    modal(`<div class="result"><div class="bigscore ${pass ? 'ok' : ''}">${score}/${n}</div>
      <h2>${pass ? t(UI.quizPassed) : t(UI.wrong)}</h2>${pass ? '' : `<p>${fmt(UI.quizFailed, { need })}</p>`}
      ${first ? `<p class="earn">${t(UI.earned)} <b>+100 XP</b> ⚡</p>` : ''}${badgeHtml(nb)}
      <div class="mbtns">${pass ? `<a class="btn ghostbtn" href="#/course/${c.id}">${t(UI.backToCourse)}</a><a class="btn primary big" href="#/cert/${c.id}">${t(UI.getCert)}</a>`
        : `<a class="btn ghostbtn" href="#/course/${c.id}">${t(UI.backToCourse)}</a><button class="btn primary big retry">${t(UI.retry)}</button>`}</div></div>`);
    const r = $('.modal .retry'); if (r) r.onclick = () => { closeModal(); viewQuiz(c); };
  } });
}

function viewCert(c) {
  const p = P(), q = p.quiz[c.id];
  const stars = c.lessons.reduce((s, _, i) => s + lessonStars(p, c, i), 0);
  app().innerHTML = `<section class="certpage">
    <a class="back noprint" href="#/course/${c.id}">${t(UI.backCourse)}</a>
    <div class="certificate" style="--c:${c.color};--c2:${c.color2}">
      <div class="cert-in">
        <div class="cert-top">🚀 IT Adventure</div>
        <h1>${t(UI.certTitle)}</h1><div class="cert-sub">${t(UI.certOf)}</div>
        <p>${t(UI.certGiven)}</p>
        <div class="cert-name">${p.avatar} ${esc(p.name)}</div>
        <p>${t(UI.certFor)}</p>
        <div class="cert-course">${c.emoji} ${t(c.title)}</div>
        <div class="cert-stars">${'★'.repeat(stars)}<span>${'★'.repeat(c.lessons.length * 3 - stars)}</span> · 📝 ${q.best}/${c.quiz.length}</div>
        <div class="cert-foot"><div><b>${fmtDate(q.date)}</b><small>${t(UI.certDate)}</small></div><div class="seal">🏅</div><div><b class="sig">Bit 🤖</b><small>${t(UI.certSign)}</small></div></div>
      </div></div>
    <div class="certbtns noprint"><button class="btn primary big pr">${t(UI.print)}</button><button class="btn big dl">${t(UI.download)}</button></div></section>`;
  $('.pr').onclick = () => window.print();
  $('.dl').onclick = () => downloadCert(p, c, q, stars);
}

async function downloadCert(p, c, q, stars) {
  try { await document.fonts.ready; } catch (e) {}
  const W = 1600, H = 1131, cv = document.createElement('canvas'); cv.width = W; cv.height = H; const g = cv.getContext('2d');
  const grd = g.createLinearGradient(0, 0, W, H); grd.addColorStop(0, c.color); grd.addColorStop(1, c.color2); g.fillStyle = grd; g.fillRect(0, 0, W, H);
  g.fillStyle = '#fffdf5'; roundRect(g, 50, 50, W - 100, H - 100, 40); g.fill();
  g.strokeStyle = c.color; g.lineWidth = 6; g.setLineDash([18, 12]); roundRect(g, 80, 80, W - 160, H - 160, 30); g.stroke(); g.setLineDash([]);
  g.textAlign = 'center'; g.fillStyle = '#334155';
  const F = (w, s, f = 'Nunito') => `${w} ${s}px "${f}", "Segoe UI", sans-serif`;
  g.font = F(800, 38, 'Baloo 2'); g.fillText('🚀 IT Adventure', W / 2, 175);
  g.fillStyle = c.color; g.font = F(800, 120, 'Baloo 2'); g.fillText(t(UI.certTitle), W / 2, 310);
  g.fillStyle = '#475569'; g.font = F(700, 40); g.fillText(t(UI.certOf), W / 2, 365);
  g.font = F(600, 34); g.fillText(t(UI.certGiven), W / 2, 450);
  g.fillStyle = '#0f172a'; g.font = F(800, 96, 'Baloo 2'); g.fillText(`${p.avatar} ${p.name}`, W / 2, 570);
  g.strokeStyle = '#cbd5e1'; g.lineWidth = 3; g.beginPath(); g.moveTo(400, 600); g.lineTo(1200, 600); g.stroke();
  g.fillStyle = '#475569'; g.font = F(600, 34); g.fillText(t(UI.certFor), W / 2, 665);
  g.fillStyle = c.color; g.font = F(800, 62, 'Baloo 2'); g.fillText(`${c.emoji} ${t(c.title)}`, W / 2, 750);
  g.fillStyle = '#f59e0b'; g.font = F(800, 44); g.fillText('★'.repeat(stars) + '  ·  📝 ' + q.best + '/' + c.quiz.length, W / 2, 830);
  g.fillStyle = '#334155'; g.font = F(800, 36); g.fillText(fmtDate(q.date), 400, 960); g.fillText('Bit 🤖', 1200, 960);
  g.font = F(600, 24); g.fillStyle = '#64748b'; g.fillText(t(UI.certDate), 400, 1000); g.fillText(t(UI.certSign), 1200, 1000);
  g.font = '110px serif'; g.fillText('🏅', W / 2, 1000);
  const a = document.createElement('a'); a.download = `IT-Adventure-${c.id}-${p.name.replace(/[^\p{L}\p{N}]+/gu, '_')}.png`; a.href = cv.toDataURL('image/png'); document.body.appendChild(a); a.click(); a.remove();
}
function roundRect(g, x, y, w, h, r) { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }

function viewBadges() {
  const p = P();
  app().innerHTML = `<section><a class="back" href="#/map">${t(UI.backMap)}</a><h1 class="sec">🏅 ${t(UI.badgesTitle)}</h1>
    <div class="badges">${BADGES.map(b => { const on = p.badges.includes(b.id); return `<div class="badge card ${on ? 'on' : ''}"><span class="be">${on ? b.e : '🔒'}</span><b>${t(b.name)}</b><small>${t(b.desc)}</small>${on ? '' : `<em>${t(UI.lockedBadge)}</em>`}</div>`; }).join('')}</div>
    <h2 class="sec">🎓 ${t(UI.certificate)}</h2><div class="certlist">${COURSES.map(c => quizPassed(p, c) ? `<a class="btn" href="#/cert/${c.id}">${c.emoji} ${t(c.title)}</a>` : `<span class="btn ghostbtn disabled">🔒 ${t(c.title)}</span>`).join('')}</div></section>`;
}

let gateOk = false;
function viewParents() {
  if (!gateOk) {
    const a = 3 + Math.floor(Math.random() * 7), b = 4 + Math.floor(Math.random() * 6);
    app().innerHTML = `<section class="gate card"><h1>👪 ${t(UI.parentsTitle)}</h1><form><label for="ga">${fmt(UI.parentsGate, { a, b })}</label><input id="ga" inputmode="numeric" autocomplete="off"><button class="btn primary">${t(UI.enter)}</button><p class="err" aria-live="polite"></p></form></section>`;
    $('.gate form').onsubmit = e => { e.preventDefault(); if (+$('#ga').value === a * b) { gateOk = true; viewParents(); } else { $('.gate .err').textContent = t(UI.wrongAnswer); sfx('bad'); } };
    return;
  }
  const ps = Object.values(S.players);
  app().innerHTML = `<section class="parents"><a class="back" href="#/${P() ? 'map' : ''}">⟵</a><h1>👪 ${t(UI.parentsTitle)}</h1><p class="muted">${t(UI.parentsInfo)}</p>
    ${ps.length ? ps.map(p => `<div class="card prow-card"><div class="prh"><span class="av">${p.avatar}</span><b>${esc(p.name)}</b><span class="muted">${t(UI.level)} ${levelOf(p.xp).lv} · ⚡ ${p.xp} XP · ⭐ ${totalStars(p)} · 🏅 ${p.badges.length} · ${t(UI.lastActive)}: ${new Date(p.last).toLocaleString(S.lang === 'ro' ? 'ro-RO' : 'en-GB')}</span></div>
      <table class="ptable"><thead><tr><th></th>${[1, 2, 3, 4].map(n => `<th>${t(UI.lesson)} ${n}</th>`).join('')}<th>${t(UI.finalQuiz)}</th><th>${t(UI.certificate)}</th></tr></thead><tbody>
      ${COURSES.map(c => `<tr><th>${c.emoji} ${t(c.title)}</th>${c.lessons.map((l, i) => `<td title="${t(l.title)}">${lessonStars(p, c, i) ? '★'.repeat(lessonStars(p, c, i)) : '–'}</td>`).join('')}<td>${p.quiz[c.id] ? p.quiz[c.id].best + '/' + c.quiz.length : '–'}</td><td>${quizPassed(p, c) ? '🎓 ' + fmtDate(p.quiz[c.id].date) : '–'}</td></tr>`).join('')}</tbody></table>
      <div class="pact"><button class="btn ghostbtn rs" data-id="${p.id}">♻️ ${t(UI.reset)}</button><button class="btn ghostbtn danger dl" data-id="${p.id}">🗑️ ${t(UI.del)}</button></div></div>`).join('') : `<p>${t(UI.noPlayers)}</p>`}
    <button class="btn ghostbtn ex">💾 ${t(UI.export)}</button></section>`;
  document.querySelectorAll('.rs').forEach(b => b.onclick = () => { const p = S.players[b.dataset.id]; if (confirm(fmt(UI.confirmReset, { name: p.name }))) { Object.assign(p, { xp: 0, lessons: {}, quiz: {}, badges: [] }); save(); topbar(); viewParents(); } });
  document.querySelectorAll('.pact .dl').forEach(b => b.onclick = () => { const p = S.players[b.dataset.id]; if (confirm(fmt(UI.confirmDel, { name: p.name }))) { delete S.players[p.id]; if (S.current === p.id) S.current = null; save(); topbar(); viewParents(); } });
  $('.ex').onclick = () => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' })); a.download = 'it-adventure-progress.json'; a.click(); };
}

/* ---------- Router ---------- */
function route() {
  closeModal(); document.querySelectorAll('.confetti').forEach(x => x.remove()); document.documentElement.lang = S.lang;
  if (S.current && !S.players[S.current]) S.current = null;
  topbar();
  const parts = location.hash.replace(/^#\/?/, '').split('/');
  const [r, a, b] = parts; const p = P();
  if (r === 'parents') return viewParents();
  if (!p) return viewWelcome();
  const c = a && course(a);
  switch (r) {
    case 'map': return viewMap();
    case 'badges': return viewBadges();
    case 'course': return c ? viewCourse(c) : viewMap();
    case 'lesson': { const i = +b; if (c && c.lessons[i] && unlocked(p, c, i)) return viewLesson(c, i); return c ? viewCourse(c) : viewMap(); }
    case 'quiz': return c && allLessons(p, c) ? viewQuiz(c) : (c ? viewCourse(c) : viewMap());
    case 'cert': return c && quizPassed(p, c) ? viewCert(c) : (c ? viewCourse(c) : viewMap());
    default: return viewMap();
  }
}
window.addEventListener('hashchange', () => { route(); window.scrollTo(0, 0); });
window.addEventListener('DOMContentLoaded', route);
