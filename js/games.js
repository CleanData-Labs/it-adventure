/* IT Adventure – interactive games */
'use strict';
const GAMES = {};
const shuffle = a => { const r = a.slice(); for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };
const html = s => { const t = document.createElement('template'); t.innerHTML = s.trim(); return t.content.firstElementChild; };
const starsFrom = (m, a, b) => (m <= a ? 3 : m <= b ? 2 : 1);
function shake(el) { el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake'); }
function pop(el) { el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop'); }

/* Generic drag-and-drop (pointer events, works with touch) + tap-to-select fallback */
function enableDrag(root, onDrop) {
  let selected = null, justDragged = 0;
  const select = it => { if (selected) selected.classList.remove('selected'); selected = it; if (it) it.classList.add('selected'); };
  root.addEventListener('pointerdown', e => {
    const it = e.target.closest('[data-drag]');
    if (!it || it.classList.contains('placed') || !root.contains(it)) return;
    const start = { x: e.clientX, y: e.clientY }, rect = it.getBoundingClientRect();
    let ghost = null, over = null;
    const move = ev => {
      const dx = ev.clientX - start.x, dy = ev.clientY - start.y;
      if (!ghost && Math.hypot(dx, dy) > 8) {
        ghost = it.cloneNode(true); ghost.classList.add('ghost'); ghost.classList.remove('selected');
        ghost.style.width = rect.width + 'px'; document.body.appendChild(ghost); it.classList.add('dragging');
      }
      if (ghost) {
        ev.preventDefault();
        ghost.style.left = (rect.left + dx) + 'px'; ghost.style.top = (rect.top + dy) + 'px';
        const t = document.elementFromPoint(ev.clientX, ev.clientY);
        const d = t && t.closest('[data-drop]');
        if (over && over !== d) over.classList.remove('over');
        over = d && root.contains(d) ? d : null; if (over) over.classList.add('over');
      }
    };
    const up = ev => {
      window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up);
      if (over) over.classList.remove('over');
      if (ghost) {
        ghost.remove(); it.classList.remove('dragging'); justDragged = Date.now();
        const t = document.elementFromPoint(ev.clientX, ev.clientY); const d = t && t.closest('[data-drop]');
        if (d && root.contains(d)) { select(null); onDrop(it, d); }
      }
    };
    window.addEventListener('pointermove', move, { passive: false }); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
  });
  root.addEventListener('click', e => {
    if (Date.now() - justDragged < 300) return;
    const it = e.target.closest('[data-drag]');
    if (it && !it.classList.contains('placed')) { select(selected === it ? null : it); return; }
    const d = e.target.closest('[data-drop]');
    if (d && selected) { const s = selected; select(null); onDrop(s, d); }
  });
}

/* ---------- MATCH ---------- */
GAMES.match = (box, cfg, ctx) => {
  let mistakes = 0, placed = 0;
  const pairs = cfg.pairs.map((p, i) => ({ ...p, i }));
  box.innerHTML = `<p class="hint">${ctx.t(UI.dragHint)}</p><div class="match"><div class="pool"></div><div class="targets"></div></div>`;
  const pool = box.querySelector('.pool'), tg = box.querySelector('.targets');
  shuffle(pairs).forEach(p => pool.appendChild(html(`<button class="chip" data-drag data-i="${p.i}">${ctx.t(p.item)}</button>`)));
  shuffle(pairs).forEach(p => tg.appendChild(html(`<div class="target" data-drop data-i="${p.i}"><span class="slot"></span><span class="tlabel">${ctx.t(p.target)}</span></div>`)));
  enableDrag(box, (it, d) => {
    if (d.classList.contains('done')) return;
    if (it.dataset.i === d.dataset.i) {
      it.classList.add('placed'); d.querySelector('.slot').appendChild(it); d.classList.add('done'); pop(d); ctx.sfx('good');
      if (++placed === pairs.length) ctx.done(starsFrom(mistakes, 0, 2));
    } else { mistakes++; shake(d); shake(it); ctx.sfx('bad'); }
  });
};

/* ---------- SORT INTO BINS ---------- */
GAMES.sort = (box, cfg, ctx) => {
  let mistakes = 0, left = cfg.items.length;
  box.innerHTML = `<p class="hint">${ctx.t(UI.dragHint)}</p><div class="pool sortpool"></div><div class="bins bins-${cfg.bins.length}"></div>`;
  const pool = box.querySelector('.pool'), bins = box.querySelector('.bins');
  shuffle(cfg.items).forEach(it => pool.appendChild(html(`<button class="chip" data-drag data-bin="${it.bin}">${ctx.t(it.label)}</button>`)));
  cfg.bins.forEach(b => bins.appendChild(html(`<div class="bin bin-${b.id}" data-drop data-bin="${b.id}"><div class="binlabel">${ctx.t(b.label)}</div><div class="binitems"></div></div>`)));
  enableDrag(box, (it, d) => {
    if (it.dataset.bin === d.dataset.bin) {
      it.classList.add('placed'); d.querySelector('.binitems').appendChild(it); pop(d); ctx.sfx('good');
      if (--left === 0) ctx.done(starsFrom(mistakes, 0, 2));
    } else { mistakes++; shake(d); shake(it); ctx.sfx('bad'); }
  });
};

/* ---------- MEMORY ---------- */
GAMES.memory = (box, cfg, ctx) => {
  let moves = 0, found = 0, open = [], lock = false;
  const cards = shuffle(cfg.pairs.flatMap((p, i) => [{ i, txt: ctx.t(p[0]), k: 'a' }, { i, txt: ctx.t(p[1]), k: 'b' }]));
  box.innerHTML = `<p class="hint">${ctx.t(UI.memoryHint)}</p><div class="stat">${ctx.t(UI.moves)}: <b class="mv">0</b></div><div class="memory"></div>`;
  const grid = box.querySelector('.memory'), mv = box.querySelector('.mv');
  cards.forEach((c, n) => {
    const b = html(`<button class="mcard ${c.k}" aria-label="card ${n + 1}"><span class="mfront">❓</span><span class="mback">${c.txt}</span></button>`);
    b.onclick = () => {
      if (lock || b.classList.contains('flip')) return;
      b.classList.add('flip'); ctx.sfx('click'); open.push([b, c]);
      if (open.length === 2) {
        moves++; mv.textContent = moves; lock = true;
        const [[b1, c1], [b2, c2]] = open;
        if (c1.i === c2.i) {
          setTimeout(() => { b1.classList.add('matched'); b2.classList.add('matched'); ctx.sfx('good'); open = []; lock = false;
            if (++found === cfg.pairs.length) ctx.done(starsFrom(moves - cfg.pairs.length, 4, 9)); }, 350);
        } else setTimeout(() => { b1.classList.remove('flip'); b2.classList.remove('flip'); open = []; lock = false; }, 1000);
      }
    };
    grid.appendChild(b);
  });
};

/* ---------- TYPING ---------- */
GAMES.typing = (box, cfg, ctx) => {
  const words = cfg.words[ctx.lang]; let idx = 0, errors = 0, t0 = null, timer;
  box.innerHTML = `<p class="hint">${ctx.t(UI.typeHint)}</p>
    <div class="typing"><div class="tprog"></div><div class="tword" aria-live="polite"></div>
    <input class="tinput" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="${ctx.t(UI.typeHere)}" aria-label="${ctx.t(UI.typeHere)}">
    <div class="stat">⏱️ <b class="ttime">0</b>s · ❌ <b class="terr">0</b></div>
    <div class="kbd">${['qwertyuiop', 'asdfghjkl', 'zxcvbnm'].map(r => `<div>${[...r].map(k => `<span data-k="${k}">${k}</span>`).join('')}</div>`).join('')}</div></div>`;
  const W = box.querySelector('.tword'), I = box.querySelector('.tinput'), P = box.querySelector('.tprog');
  const show = () => {
    const w = words[idx], v = I.value.toLowerCase();
    W.innerHTML = [...w].map((ch, i) => `<span class="${i < v.length ? (v[i] === ch ? 'ok' : 'no') : i === v.length ? 'cur' : ''}">${ch}</span>`).join('');
    P.innerHTML = words.map((_, i) => `<i class="${i < idx ? 'd' : i === idx ? 'c' : ''}"></i>`).join('');
    box.querySelectorAll('.kbd span').forEach(s => s.classList.toggle('next', s.dataset.k === w[v.length]));
  };
  let prevLen = 0;
  I.addEventListener('input', () => {
    if (!t0) { t0 = Date.now(); timer = setInterval(() => { const tt = box.querySelector('.ttime'); if (!tt) return clearInterval(timer); tt.textContent = Math.round((Date.now() - t0) / 1000); }, 500); }
    const w = words[idx], v = I.value.toLowerCase().trim();
    if (v.length > prevLen && v[v.length - 1] !== w[v.length - 1]) { errors++; box.querySelector('.terr').textContent = errors; shake(W); ctx.sfx('bad'); }
    else if (v.length > prevLen) ctx.sfx('key');
    prevLen = v.length;
    if (v === w) {
      idx++; I.value = ''; prevLen = 0; ctx.sfx('good'); pop(W);
      if (idx === words.length) { clearInterval(timer); I.disabled = true; P.innerHTML = words.map(() => '<i class="d"></i>').join(''); W.textContent = '🏁'; return ctx.done(starsFrom(errors, 3, 8)); }
    }
    show();
  });
  show(); setTimeout(() => I.focus(), 100);
};

/* ---------- PASSWORD ---------- */
function pwCheck(pw, name) {
  const low = pw.toLowerCase(); const n = (name || '').toLowerCase();
  const bad = ['parola', 'password', '1234', 'qwerty', 'abc', '0000', '1111'].some(b => low.includes(b)) || (n.length >= 3 && low.includes(n));
  const r = { len: pw.length >= 12, upper: /[A-Z]/.test(pw), lower: /[a-z]/.test(pw), digit: /\d/.test(pw), symbol: /[^A-Za-z0-9]/.test(pw), common: pw.length > 0 && !bad };
  const met = Object.values(r).filter(Boolean).length;
  let level = pw.length === 0 ? 0 : met <= 2 ? 0 : met === 3 ? 1 : met === 4 ? 2 : met === 5 ? 3 : 4;
  if (!r.common || pw.length < 6) level = Math.min(level, 1);
  let cs = (r.lower ? 26 : 0) + (r.upper ? 26 : 0) + (r.digit ? 10 : 0) + (r.symbol ? 33 : 0); if (!cs) cs = 1;
  let secs = Math.pow(cs, pw.length) / 1e10 / 2; if (!r.common) secs = Math.min(secs, 1);
  return { r, level, secs, bits: pw.length * Math.log2(cs) - (r.common ? 0 : 40) };
}
function humanTime(s, lang) {
  const U = lang === 'ro' ? [['o clipă', ''], ['secunde', 1], ['minute', 60], ['ore', 3600], ['zile', 86400], ['ani', 31536000], ['secole', 3153600000]] : [['an instant', ''], ['seconds', 1], ['minutes', 60], ['hours', 3600], ['days', 86400], ['years', 31536000], ['centuries', 3153600000]];
  if (s < 1) return U[0][0];
  if (s > 3153600000 * 1e6) return lang === 'ro' ? 'milioane de secole 🦕' : 'millions of centuries 🦕';
  let u = U[1]; for (let i = 1; i < U.length; i++) if (s >= U[i][1]) u = U[i];
  return `${Math.round(s / u[1]).toLocaleString(lang === 'ro' ? 'ro-RO' : 'en-GB')} ${u[0]}`;
}
GAMES.password = (box, cfg, ctx) => {
  let r = 0, mistakes = 0;
  const which = () => {
    const pair = cfg.rounds[r].map(p => ctx.t(p));
    const scores = pair.map(p => pwCheck(p, '').bits);
    const best = scores[0] > scores[1] ? 0 : 1;
    box.innerHTML = `<p class="hint">${ctx.t(UI.round)} ${r + 1}/${cfg.rounds.length}: ${ctx.t(UI.pwWhich)}</p><div class="pwpair">${pair.map((p, i) => `<button class="pwopt" data-i="${i}"><code>${p.replace(/</g, '&lt;')}</code></button>`).join('<span class="vs">VS</span>')}</div><div class="feedback"></div>`;
    box.querySelectorAll('.pwopt').forEach(b => b.onclick = () => {
      const i = +b.dataset.i, fb = box.querySelector('.feedback');
      if (i === best) {
        ctx.sfx('good'); b.classList.add('right');
        const c = pwCheck(pair[best], '');
        fb.innerHTML = `✅ ${ctx.t(UI.correct)} ${ctx.t(UI.pwCrack)} <b>${humanTime(c.secs, ctx.lang)}</b>`;
        box.querySelectorAll('.pwopt').forEach(x => x.disabled = true);
        setTimeout(() => { r++; r < cfg.rounds.length ? which() : build(); }, 1600);
      } else { mistakes++; ctx.sfx('bad'); shake(b); b.classList.add('wrongopt'); fb.textContent = '❌ ' + ctx.t(UI.tryAgain); }
    });
  };
  const build = () => {
    box.innerHTML = `<p class="hint">${ctx.t(UI.pwHint)}</p><p class="note">⚠️ ${ctx.lang === 'ro' ? 'Nu scrie aici o parolă pe care o folosești cu adevărat!' : 'Don\'t type a password you really use!'}</p>
      <div class="pwbuild"><input class="pwin" type="text" autocomplete="off" spellcheck="false" maxlength="40" placeholder="${ctx.lang === 'ro' ? 'ex: Girafa!Verde7Nori' : 'e.g. Giraffe!Green7Cloud'}" aria-label="password">
      <div class="meter"><div class="bar"></div></div><div class="pwlevel"></div><div class="pwtime"></div>
      <ul class="rules">${Object.keys(UI.pwRules).map(k => `<li data-k="${k}">${ctx.t(UI.pwRules[k])}</li>`).join('')}</ul>
      <button class="btn big pwgo" disabled>${ctx.t(UI.check)} ✔</button></div>`;
    const I = box.querySelector('.pwin'), go = box.querySelector('.pwgo');
    const upd = () => {
      const c = pwCheck(I.value, ctx.name);
      box.querySelectorAll('.rules li').forEach(li => li.classList.toggle('ok', !!c.r[li.dataset.k] && I.value.length > 0));
      const bar = box.querySelector('.bar'); bar.style.width = (I.value ? (c.level + 1) * 20 : 0) + '%'; bar.dataset.l = c.level;
      box.querySelector('.pwlevel').textContent = I.value ? ctx.t(UI.pwLevels[c.level]) : '';
      box.querySelector('.pwtime').innerHTML = I.value ? `${ctx.t(UI.pwCrack)} <b>${humanTime(c.secs, ctx.lang)}</b>` : '';
      go.disabled = c.level < 4;
    };
    I.addEventListener('input', upd); upd();
    go.onclick = () => { ctx.sfx('good'); box.querySelector('.pwbuild').insertAdjacentHTML('beforeend', `<p class="feedback">🎉 ${ctx.t(UI.pwDone)}</p>`); go.disabled = true; I.disabled = true; setTimeout(() => ctx.done(starsFrom(mistakes, 0, 1)), 1200); };
  };
  which();
};

/* ---------- RED FLAGS (phishing detective) ---------- */
GAMES.flags = (box, cfg, ctx) => {
  let m = 0, mistakes = 0;
  const show = () => {
    const msg = cfg.messages[m], total = msg.parts.filter(p => p.f).length; let found = 0;
    box.innerHTML = `<p class="hint">${ctx.t(UI.flagsHint).replace('{n}', total)}</p>
      <div class="stat">${ctx.t(UI.found)}: <b class="fc">0</b>/${total}</div>
      <div class="email"><div class="efrom">📧 ${ctx.t(msg.from)}</div><div class="ebody">${msg.parts.map((p, i) => `<span class="part" data-i="${i}" tabindex="0" role="button">${ctx.t(p.t)}</span>`).join('')}</div></div>
      <ul class="whys"></ul>`;
    box.querySelectorAll('.part').forEach(s => {
      const act = () => {
        const p = msg.parts[+s.dataset.i]; if (s.classList.contains('flagged')) return;
        if (p.f) {
          s.classList.add('flagged'); found++; ctx.sfx('good'); box.querySelector('.fc').textContent = found;
          box.querySelector('.whys').insertAdjacentHTML('beforeend', `<li>🚩 <b>${ctx.t(p.t)}</b> – ${ctx.t(p.why)}</li>`);
          if (found === total) {
            setTimeout(() => {
              m++;
              if (m < cfg.messages.length) { box.insertAdjacentHTML('beforeend', `<button class="btn big nextmsg">${ctx.t(UI.next)}</button>`); box.querySelector('.nextmsg').onclick = show; }
              else ctx.done(starsFrom(mistakes, 1, 3), mistakes <= 1 ? ['detective'] : []);
            }, 500);
          }
        } else { mistakes++; s.classList.add('safe'); shake(s); ctx.sfx('bad'); setTimeout(() => s.classList.remove('safe'), 900); }
      };
      s.onclick = act; s.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); act(); } };
    });
  };
  show();
};

/* ---------- IF / THEN sorter ---------- */
GAMES.ifthen = (box, cfg, ctx) => {
  let r = 0, i = 0, mistakes = 0, items;
  const round = () => { items = shuffle(cfg.rounds[r].items); i = 0; render(); };
  const render = () => {
    const R = cfg.rounds[r], it = items[i];
    box.innerHTML = `<p class="hint">${ctx.t(UI.ifHint)}</p><div class="stat">${ctx.t(UI.round)} ${r + 1}/${cfg.rounds.length} · ${i + 1}/${items.length}</div>
      <div class="rule"><b>${ctx.t(UI.ifRule)}:</b> ${ctx.t(R.rule)}</div>
      <div class="machine"><div class="conv"><span class="obj">${it[0]}</span></div>
      <div class="ifbtns"><button class="btn ifb" data-v="1"><span>${R.yes}</span><small>${ctx.lang === 'ro' ? 'ATUNCI (adevărat)' : 'THEN (true)'}</small></button><button class="btn ifb alt" data-v="0"><span>${R.no}</span><small>${ctx.lang === 'ro' ? 'ALTFEL (fals)' : 'ELSE (false)'}</small></button></div></div>`;
    box.querySelectorAll('.ifb').forEach(b => b.onclick = () => {
      if (+b.dataset.v === it[1]) {
        ctx.sfx('good'); const o = box.querySelector('.obj'); o.classList.add(it[1] ? 'flyL' : 'flyR');
        box.querySelectorAll('.ifb').forEach(x => x.disabled = true);
        setTimeout(() => { i++; if (i < items.length) render(); else { r++; r < cfg.rounds.length ? round() : ctx.done(starsFrom(mistakes, 0, 2)); } }, 550);
      } else { mistakes++; ctx.sfx('bad'); shake(b); shake(box.querySelector('.rule')); }
    });
  };
  round();
};

/* ---------- ORDER steps ---------- */
GAMES.order = (box, cfg, ctx) => {
  let r = 0, mistakes = 0, cur;
  const round = () => {
    const n = cfg.rounds[r].steps.length; do { cur = shuffle([...Array(n).keys()]); } while (cur.every((v, k) => v === k)); render();
  };
  const render = (checked) => {
    const R = cfg.rounds[r];
    box.innerHTML = `<p class="hint">${ctx.t(UI.orderHint)}</p><h3 class="gtitle">${ctx.t(R.name)}</h3><ol class="order">${cur.map((s, k) => `<li class="${checked ? (s === k ? 'ok' : 'no') : ''}"><span class="num">${k + 1}</span><span class="otxt">${ctx.t(R.steps[s])}</span><span class="obtns"><button class="ob" data-k="${k}" data-d="-1" aria-label="up" ${k === 0 ? 'disabled' : ''}>▲</button><button class="ob" data-k="${k}" data-d="1" aria-label="down" ${k === cur.length - 1 ? 'disabled' : ''}>▼</button></span></li>`).join('')}</ol><button class="btn big ocheck">${ctx.t(UI.check)} ✔</button>`;
    box.querySelectorAll('.ob').forEach(b => b.onclick = () => { const k = +b.dataset.k, d = +b.dataset.d; [cur[k], cur[k + d]] = [cur[k + d], cur[k]]; ctx.sfx('click'); render(); });
    box.querySelector('.ocheck').onclick = () => {
      if (cur.every((v, k) => v === k)) { ctx.sfx('good'); render(true); box.querySelector('.ocheck').disabled = true; setTimeout(() => { r++; r < cfg.rounds.length ? round() : ctx.done(starsFrom(mistakes, 0, 2)); }, 1000); }
      else { mistakes++; ctx.sfx('bad'); render(true); shake(box.querySelector('.order')); }
    };
  };
  round();
};

/* ---------- SWAP sort (bubble sort) ---------- */
GAMES.swap = (box, cfg, ctx) => {
  let r = 0, extra = 0, arr, swaps, inv;
  const inversions = a => { let c = 0; for (let i = 0; i < a.length; i++) for (let j = i + 1; j < a.length; j++) if (a[i] > a[j]) c++; return c; };
  const round = () => { arr = cfg.rounds[r].slice(); swaps = 0; inv = inversions(arr); render(); };
  const render = () => {
    const max = Math.max(...arr);
    box.innerHTML = `<p class="hint">${ctx.t(UI.sortHint)}</p><div class="stat">${ctx.t(UI.round)} ${r + 1}/${cfg.rounds.length} · ${ctx.t(UI.swaps)}: <b>${swaps}</b> (${ctx.lang === 'ro' ? 'minim' : 'best'}: ${inv})</div>
      <div class="bars">${arr.map((v, k) => `<div class="barw"><div class="vbar" style="height:${30 + v / max * 120}px"><span>${v}</span></div></div>${k < arr.length - 1 ? `<button class="sw" data-k="${k}" aria-label="swap ${k + 1}">⇄</button>` : ''}`).join('')}</div>`;
    box.querySelectorAll('.sw').forEach(b => b.onclick = () => {
      const k = +b.dataset.k; [arr[k], arr[k + 1]] = [arr[k + 1], arr[k]]; swaps++; ctx.sfx('click'); render();
      if (arr.every((v, i) => i === 0 || arr[i - 1] <= v)) {
        extra += swaps - inv; ctx.sfx('good'); box.querySelectorAll('.vbar').forEach(x => x.classList.add('sorted')); box.querySelectorAll('.sw').forEach(x => x.disabled = true);
        setTimeout(() => { r++; r < cfg.rounds.length ? round() : ctx.done(starsFrom(extra, 0, 4)); }, 1100);
      }
    });
  };
  round();
};

/* ---------- BINARY cards ---------- */
GAMES.binary = (box, cfg, ctx) => {
  let r = 0, mistakes = 0, on;
  const round = () => { on = Array(cfg.rounds[r].bits).fill(0); render(); };
  const render = () => {
    const R = cfg.rounds[r], vals = on.map((_, k) => 2 ** (on.length - 1 - k)), sum = on.reduce((s, b, k) => s + b * vals[k], 0);
    box.innerHTML = `<p class="hint">${ctx.t(UI.binaryHint)}</p><div class="stat">${ctx.t(UI.round)} ${r + 1}/${cfg.rounds.length}</div>
      <div class="btarget">${ctx.t(UI.target)}: <b>${R.n}</b></div>
      <div class="bcards">${vals.map((v, k) => `<button class="bcard ${on[k] ? 'on' : ''}" data-k="${k}"><span class="dots">${'●'.repeat(Math.min(v, 16))}</span><b>${v}</b><i>${on[k]}</i></button>`).join('')}</div>
      <div class="bsum">${on.join('')} = <b>${sum}</b></div><button class="btn big bcheck">${ctx.t(UI.check)} ✔</button>`;
    box.querySelectorAll('.bcard').forEach(b => b.onclick = () => { on[+b.dataset.k] ^= 1; ctx.sfx('click'); render(); });
    box.querySelector('.bcheck').onclick = () => {
      if (sum === R.n) { ctx.sfx('good'); box.querySelector('.bsum').classList.add('okk'); box.querySelector('.bcheck').disabled = true; setTimeout(() => { r++; r < cfg.rounds.length ? round() : ctx.done(starsFrom(mistakes, 0, 2)); }, 900); }
      else { mistakes++; ctx.sfx('bad'); shake(box.querySelector('.bsum')); }
    };
  };
  round();
};

/* ---------- PIXEL decode ---------- */
GAMES.pixel = (box, cfg, ctx) => {
  let r = 0, mistakes = 0, g;
  const rle = row => { const out = []; let c = row[0], n = 0; for (const ch of row) { if (ch === c) n++; else { out.push([n, c]); c = ch; n = 1; } } out.push([n, c]); return out; };
  const round = () => { const im = cfg.images[r]; g = im.rows.map(rw => Array(rw.length).fill(0)); render(); };
  const render = () => {
    const im = cfg.images[r];
    box.innerHTML = `<p class="hint">${ctx.t(UI.pixelHint)}</p><div class="stat">${ctx.t(UI.round)} ${r + 1}/${cfg.images.length}</div>
      <div class="pixwrap"><div class="pixgrid" style="--cols:${im.rows[0].length};--c:${im.color}">${g.map((row, y) => `<div class="prow">${row.map((v, x) => `<button class="px ${v ? 'on' : ''}" data-x="${x}" data-y="${y}" aria-label="pixel ${y + 1}-${x + 1}"></button>`).join('')}<span class="pcode">${rle(im.rows[y]).map(([n, c]) => `${n}${c === '1' ? im.sym : '⬜'}`).join(' ')}</span></div>`).join('')}</div></div>
      <button class="btn big pcheck">${ctx.t(UI.check)} ✔</button>`;
    let painting = null;
    const grid = box.querySelector('.pixgrid');
    const paint = b => { const x = +b.dataset.x, y = +b.dataset.y; if (g[y][x] === painting) return; g[y][x] = painting; b.classList.toggle('on', !!painting); };
    grid.addEventListener('pointerdown', e => { const b = e.target.closest('.px'); if (!b) return; e.preventDefault(); painting = g[+b.dataset.y][+b.dataset.x] ? 0 : 1; paint(b); ctx.sfx('key'); });
    grid.addEventListener('pointermove', e => { if (painting === null) return; const t = document.elementFromPoint(e.clientX, e.clientY); const b = t && t.closest('.px'); if (b && grid.contains(b)) paint(b); });
    window.addEventListener('pointerup', () => painting = null);
    grid.addEventListener('keydown', e => { const b = e.target.closest('.px'); if (b && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); painting = g[+b.dataset.y][+b.dataset.x] ? 0 : 1; paint(b); painting = null; } });
    box.querySelector('.pcheck').onclick = () => {
      let bad = 0;
      box.querySelectorAll('.px').forEach(b => { const x = +b.dataset.x, y = +b.dataset.y; const want = im.rows[y][x] === '1' ? 1 : 0; if (g[y][x] !== want) { bad++; b.classList.add('err'); setTimeout(() => b.classList.remove('err'), 1200); } });
      if (!bad) { ctx.sfx('good'); grid.classList.add('done'); box.querySelector('.pcheck').disabled = true; box.insertAdjacentHTML('beforeend', `<p class="feedback">🎉 ${ctx.lang === 'ro' ? 'Ai desenat' : 'You drew'}: <b>${ctx.t(im.name)}</b>!</p>`); setTimeout(() => { r++; r < cfg.images.length ? round() : ctx.done(starsFrom(mistakes, 0, 2)); }, 1500); }
      else { mistakes++; ctx.sfx('bad'); shake(grid); }
    };
  };
  round();
};

/* ---------- ROBOT grid programming ---------- */
const DIRS = { U: [-1, 0, '⬆️'], D: [1, 0, '⬇️'], L: [0, -1, '⬅️'], R: [0, 1, '➡️'] };
const ROT = { R: 'D', D: 'L', L: 'U', U: 'R' };
GAMES.robot = (box, cfg, ctx) => {
  let lv = 0, fails = 0, prog, openLoop, running = false;
  const clone = p => JSON.parse(JSON.stringify(p));
  const count = p => p.reduce((s, b) => s + (typeof b === 'string' ? 1 : 1 + b.body.length), 0);
  const flat = p => p.flatMap(b => typeof b === 'string' ? [[b, b]] : Array.from({ length: b.loop }, () => b.body.map(x => [x, b])).flat());
  const start = () => { const L = cfg.levels[lv]; prog = clone(L.program || []); openLoop = null; render(); };
  const parse = L => { const cells = []; let s, g; const gems = []; L.grid.forEach((row, y) => [...row].forEach((ch, x) => { if (ch === 'S') s = [y, x]; if (ch === 'G') g = [y, x]; if (ch === '*') gems.push(y + ',' + x); })); return { s, g, gems, H: L.grid.length, W: L.grid[0].length }; };
  const render = () => {
    const L = cfg.levels[lv], P = parse(L);
    box.innerHTML = `<p class="hint">${ctx.t(cfg.debug ? UI.debugHint : UI.robotHint)}</p>
      <div class="stat">${ctx.t(UI.levelX).replace('{n}', lv + 1)}/${cfg.levels.length}${L.max ? ' · 🎯 ' + ctx.t(UI.maxBlocks).replace('{n}', L.max) : ''}</div>
      <div class="robot-wrap"><div class="rgrid" style="--w:${P.W};--h:${P.H}">
        ${L.grid.map((row, y) => [...row].map((ch, x) => `<div class="cell ${ch === '#' ? 'rock' : ''}" data-c="${y},${x}">${ch === '#' ? '🪨' : ch === 'G' ? '🚩' : ch === '*' ? '<span class="gem">💎</span>' : ''}</div>`).join('')).join('')}
        <div class="bot" style="--y:${P.s[0]};--x:${P.s[1]}">🤖</div></div>
      <div class="rpanel"><div class="palette">${Object.keys(DIRS).map(k => `<button class="cmd" data-cmd="${k}" aria-label="${k}">${DIRS[k][2]}</button>`).join('')}
        ${cfg.loops ? (openLoop ? `<button class="cmd loopbtn end">${ctx.t(UI.endRepeat)}</button>` : `<button class="cmd loopbtn">${ctx.t(UI.repeat)}</button>`) : ''}</div>
        <div class="proghead">${ctx.t(UI.program)} <span class="cnt ${L.max && count(prog) > L.max ? 'over' : ''}">${count(prog)}${L.max ? '/' + L.max : ''} ${count(prog) === 1 && !L.max ? (ctx.lang === 'ro' ? 'bloc' : 'block') : ctx.t(UI.blocks)}</span></div>
        <div class="prog">${prog.length ? '' : '<span class="empty">…</span>'}${prog.map((b, i) => typeof b === 'string'
          ? `<span class="blk" data-i="${i}"><button class="rot" data-i="${i}">${DIRS[b][2]}</button><button class="x" data-i="${i}" aria-label="delete">×</button></span>`
          : `<span class="blk loop ${b === openLoop ? 'open' : ''}" data-i="${i}"><button class="lcount" data-i="${i}">🔁 ×${b.loop}</button><span class="lbody">${b.body.map((c, j) => `<span class="blk"><button class="rot" data-i="${i}" data-j="${j}">${DIRS[c][2]}</button><button class="x" data-i="${i}" data-j="${j}">×</button></span>`).join('') || '<span class="empty">…</span>'}</span><button class="x" data-i="${i}" aria-label="delete">×</button></span>`).join('')}</div>
        <div class="rbtns"><button class="btn big run">${ctx.t(UI.run)}</button><button class="btn ghostbtn clear">${ctx.t(UI.clear)}</button></div>
        <div class="feedback" aria-live="polite"></div></div></div>`;
    const fb = box.querySelector('.feedback');
    box.querySelectorAll('.cmd[data-cmd]').forEach(b => b.onclick = () => { if (running || count(prog) >= 30) return; ctx.sfx('click'); (openLoop ? openLoop.body : prog).push(b.dataset.cmd); render(); });
    const lb = box.querySelector('.loopbtn');
    if (lb) lb.onclick = () => { if (running) return; ctx.sfx('click'); if (openLoop) openLoop = null; else { openLoop = { loop: 2, body: [] }; prog.push(openLoop); } render(); };
    box.querySelectorAll('.rot').forEach(b => b.onclick = () => { if (running) return; const i = +b.dataset.i; if (b.dataset.j !== undefined) { const lp = prog[i]; lp.body[+b.dataset.j] = ROT[lp.body[+b.dataset.j]]; } else prog[i] = ROT[prog[i]]; ctx.sfx('click'); render(); });
    box.querySelectorAll('.x').forEach(b => b.onclick = () => { if (running) return; const i = +b.dataset.i; if (b.dataset.j !== undefined) prog[i].body.splice(+b.dataset.j, 1); else { if (prog[i] === openLoop) openLoop = null; prog.splice(i, 1); } ctx.sfx('click'); render(); });
    box.querySelectorAll('.lcount').forEach(b => b.onclick = () => { if (running) return; const lp = prog[+b.dataset.i]; lp.loop = lp.loop >= 9 ? 2 : lp.loop + 1; ctx.sfx('click'); render(); });
    box.querySelector('.clear').onclick = () => { if (running) return; prog = []; openLoop = null; render(); };
    box.querySelector('.run').onclick = async () => {
      if (running) return;
      if (!prog.length) return;
      if (L.max && count(prog) > L.max) { fb.textContent = '⚠️ ' + ctx.t(UI.tooMany); fb.className = 'feedback bad'; ctx.sfx('bad'); return; }
      running = true; openLoop = null; box.querySelectorAll('.loopbtn').forEach(x => x.remove());
      const bot = box.querySelector('.bot'); let [y, x] = P.s; const got = new Set();
      const steps = flat(prog); const wait = ms => new Promise(res => setTimeout(res, ms));
      bot.classList.remove('crash');
      let ok = false, msg = UI.notGoal;
      for (const [d, src] of steps) {
        box.querySelectorAll('.blk').forEach(e => e.classList.remove('act'));
        const ny = y + DIRS[d][0], nx = x + DIRS[d][1];
        if (ny < 0 || nx < 0 || ny >= P.H || nx >= P.W || L.grid[ny][nx] === '#') {
          bot.style.setProperty('--y', y + DIRS[d][0] * 0.3); bot.style.setProperty('--x', x + DIRS[d][1] * 0.3); await wait(200);
          bot.style.setProperty('--y', y); bot.style.setProperty('--x', x); bot.classList.add('crash'); msg = UI.hitWall; break;
        }
        y = ny; x = nx; bot.style.setProperty('--y', y); bot.style.setProperty('--x', x); ctx.sfx('step');
        const k = y + ',' + x; if (P.gems.includes(k) && !got.has(k)) { got.add(k); const gc = box.querySelector(`[data-c="${k}"] .gem`); if (gc) gc.classList.add('taken'); ctx.sfx('good'); }
        await wait(380);
        if (y === P.g[0] && x === P.g[1]) { if (got.size === P.gems.length) { ok = true; break; } msg = UI.needGems; }
      }
      running = false;
      if (ok) {
        ctx.sfx('win'); bot.classList.add('happy'); fb.className = 'feedback good'; fb.textContent = ctx.t(UI.levelDone);
        box.querySelector('.run').disabled = true;
        setTimeout(() => { lv++; lv < cfg.levels.length ? start() : ctx.done(starsFrom(fails, 0, 2)); }, 1300);
      } else {
        fails++; ctx.sfx('bad'); fb.className = 'feedback bad'; fb.textContent = ctx.t(msg);
        setTimeout(() => { if (box.querySelector('.bot') === bot) { bot.style.transition = 'none'; bot.style.setProperty('--y', P.s[0]); bot.style.setProperty('--x', P.s[1]); bot.offsetWidth; bot.style.transition = ''; bot.classList.remove('crash'); box.querySelectorAll('.gem').forEach(g => g.classList.remove('taken')); } }, 1400);
      }
    };
  };
  start();
};

/* ---------- QUIZ (final test) ---------- */
GAMES.quiz = (box, questions, ctx) => {
  const qs = shuffle(questions.map(q => ({ ...q, order: shuffle(q.a.map((_, i) => i)) })));
  let i = 0, score = 0;
  const show = () => {
    const q = qs[i];
    box.innerHTML = `<div class="qprog"><div style="width:${i / qs.length * 100}%"></div></div><div class="stat">${ctx.t(UI.question)} ${i + 1} ${ctx.t(UI.of)} ${qs.length}</div>
      <h3 class="qtext">${ctx.t(q.q)}</h3><div class="answers">${q.order.map(k => `<button class="ans" data-k="${k}">${ctx.t(q.a[k])}</button>`).join('')}</div><div class="feedback"></div>`;
    box.querySelectorAll('.ans').forEach(b => b.onclick = () => {
      const k = +b.dataset.k; box.querySelectorAll('.ans').forEach(x => { x.disabled = true; if (+x.dataset.k === q.c) x.classList.add('right'); });
      const fb = box.querySelector('.feedback');
      if (k === q.c) { score++; ctx.sfx('good'); fb.textContent = ctx.t(UI.correct); fb.className = 'feedback good'; }
      else { b.classList.add('wrongopt'); ctx.sfx('bad'); fb.textContent = ctx.t(UI.wrong); fb.className = 'feedback bad'; }
      box.insertAdjacentHTML('beforeend', `<button class="btn big qnext">${ctx.t(UI.next)}</button>`);
      box.querySelector('.qnext').onclick = () => { i++; i < qs.length ? show() : ctx.done(score, qs.length); };
      box.querySelector('.qnext').focus();
    });
  };
  show();
};
