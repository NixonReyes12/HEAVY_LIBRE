/* ══════════════════════════════════════════
   HEVY CLONE — app.js
   Full feature parity · No restrictions
   ══════════════════════════════════════════ */
'use strict';

// ─── EXERCISE DATABASE ────────────────────────────────────────────────────────
const DB_EXERCISES = [
  // Pecho
  {id:'e001',name:'Press banca plano',       muscle:'Pecho',    equipment:'Barra',        type:'weight_reps', custom:false},
  {id:'e002',name:'Press banca inclinado',   muscle:'Pecho',    equipment:'Mancuernas',   type:'weight_reps', custom:false},
  {id:'e003',name:'Press banca declinado',   muscle:'Pecho',    equipment:'Barra',        type:'weight_reps', custom:false},
  {id:'e004',name:'Aperturas pec deck',      muscle:'Pecho',    equipment:'Máquina',      type:'weight_reps', custom:false},
  {id:'e005',name:'Fondos en paralelas',     muscle:'Pecho',    equipment:'Peso corporal',type:'bodyweight_reps',custom:false},
  {id:'e006',name:'Crossover en polea',      muscle:'Pecho',    equipment:'Polea',        type:'weight_reps', custom:false},
  // Espalda
  {id:'e010',name:'Dominadas',               muscle:'Espalda',  equipment:'Peso corporal',type:'bodyweight_reps',custom:false},
  {id:'e011',name:'Remo con barra',          muscle:'Espalda',  equipment:'Barra',        type:'weight_reps', custom:false},
  {id:'e012',name:'Jalón al pecho',          muscle:'Espalda',  equipment:'Polea',        type:'weight_reps', custom:false},
  {id:'e013',name:'Remo en polea baja',      muscle:'Espalda',  equipment:'Polea',        type:'weight_reps', custom:false},
  {id:'e014',name:'Peso muerto convencional',muscle:'Espalda',  equipment:'Barra',        type:'weight_reps', custom:false},
  {id:'e015',name:'Remo con mancuerna',      muscle:'Espalda',  equipment:'Mancuernas',   type:'weight_reps', custom:false},
  {id:'e016',name:'Pullover en polea',       muscle:'Espalda',  equipment:'Polea',        type:'weight_reps', custom:false},
  // Piernas
  {id:'e020',name:'Sentadilla libre',        muscle:'Piernas',  equipment:'Barra',        type:'weight_reps', custom:false},
  {id:'e021',name:'Prensa de piernas',       muscle:'Piernas',  equipment:'Máquina',      type:'weight_reps', custom:false},
  {id:'e022',name:'Peso muerto rumano',      muscle:'Piernas',  equipment:'Barra',        type:'weight_reps', custom:false},
  {id:'e023',name:'Extensión de cuádriceps', muscle:'Piernas',  equipment:'Máquina',      type:'weight_reps', custom:false},
  {id:'e024',name:'Curl de isquiotibiales',  muscle:'Piernas',  equipment:'Máquina',      type:'weight_reps', custom:false},
  {id:'e025',name:'Elevación de talones',    muscle:'Piernas',  equipment:'Máquina',      type:'weight_reps', custom:false},
  {id:'e026',name:'Zancadas',               muscle:'Piernas',  equipment:'Mancuernas',   type:'weight_reps', custom:false},
  {id:'e027',name:'Sentadilla búlgara',      muscle:'Piernas',  equipment:'Mancuernas',   type:'weight_reps', custom:false},
  // Hombros
  {id:'e030',name:'Press militar',           muscle:'Hombros',  equipment:'Barra',        type:'weight_reps', custom:false},
  {id:'e031',name:'Elevaciones laterales',   muscle:'Hombros',  equipment:'Mancuernas',   type:'weight_reps', custom:false},
  {id:'e032',name:'Elevaciones frontales',   muscle:'Hombros',  equipment:'Mancuernas',   type:'weight_reps', custom:false},
  {id:'e033',name:'Face pull',               muscle:'Hombros',  equipment:'Polea',        type:'weight_reps', custom:false},
  {id:'e034',name:'Press Arnold',            muscle:'Hombros',  equipment:'Mancuernas',   type:'weight_reps', custom:false},
  // Brazos
  {id:'e040',name:'Curl bíceps mancuernas',  muscle:'Brazos',   equipment:'Mancuernas',   type:'weight_reps', custom:false},
  {id:'e041',name:'Fondos de tríceps',       muscle:'Brazos',   equipment:'Peso corporal',type:'bodyweight_reps',custom:false},
  {id:'e042',name:'Extensión tríceps polea', muscle:'Brazos',   equipment:'Polea',        type:'weight_reps', custom:false},
  {id:'e043',name:'Curl con barra',          muscle:'Brazos',   equipment:'Barra',        type:'weight_reps', custom:false},
  {id:'e044',name:'Curl martillo',           muscle:'Brazos',   equipment:'Mancuernas',   type:'weight_reps', custom:false},
  {id:'e045',name:'Press francés',           muscle:'Brazos',   equipment:'Barra',        type:'weight_reps', custom:false},
  {id:'e046',name:'Curl concentrado',        muscle:'Brazos',   equipment:'Mancuernas',   type:'weight_reps', custom:false},
  // Core
  {id:'e050',name:'Plancha abdominal',       muscle:'Core',     equipment:'Peso corporal',type:'duration',    custom:false},
  {id:'e051',name:'Crunch',                  muscle:'Core',     equipment:'Peso corporal',type:'reps_only',   custom:false},
  {id:'e052',name:'Rueda abdominal',         muscle:'Core',     equipment:'Otros',        type:'reps_only',   custom:false},
  {id:'e053',name:'Elevación de piernas',    muscle:'Core',     equipment:'Peso corporal',type:'reps_only',   custom:false},
  {id:'e054',name:'Cable crunch',            muscle:'Core',     equipment:'Polea',        type:'weight_reps', custom:false},
  // Glúteos
  {id:'e060',name:'Hip thrust',              muscle:'Glúteos',  equipment:'Barra',        type:'weight_reps', custom:false},
  {id:'e061',name:'Kickback en polea',       muscle:'Glúteos',  equipment:'Polea',        type:'weight_reps', custom:false},
  // Cardio
  {id:'e070',name:'Carrera en cinta',        muscle:'Cardio',   equipment:'Máquina',      type:'duration',    custom:false},
  {id:'e071',name:'Bicicleta estática',      muscle:'Cardio',   equipment:'Máquina',      type:'duration',    custom:false},
  {id:'e072',name:'Remo ergómetro',          muscle:'Cardio',   equipment:'Máquina',      type:'duration',    custom:false},
];

// Muscle colors for SVG body
const MUSCLE_COLORS = {
  Pecho:   '#e8554e',
  Espalda: '#4a90e2',
  Piernas: '#30d158',
  Hombros: '#bf5af2',
  Brazos:  '#ffd60a',
  Core:    '#ff9f0a',
  Glúteos: '#ff6b9d',
  Cardio:  '#5ac8fa',
};

// Muscle → SVG element IDs
const MUSCLE_SVG_IDS = {
  Pecho:   ['body-pecho'],
  Hombros: ['body-hombro-l','body-hombro-r'],
  Brazos:  ['body-brazo-l','body-brazo-r'],
  Core:    ['body-core'],
  Piernas: ['body-pierna-l','body-pierna-r'],
};

// ─── STATE ────────────────────────────────────────────────────────────────────
const S = {
  // Persisted
  profile:   { name:'Atleta', handle:'@usuario', bio:'' },
  unit:      'kg',
  barWeight: 20,
  restTime:  90,
  routines:        [],
  customExercises: [],
  history:         [],
  measures:        [],
  personalRecords: {}, // { exId: { weight, reps, rm, date } }

  // Session
  live:        null,
  liveTimerID: null,
  restID:      null,
  restTotal:   90,
  restLeft:    90,

  // UI
  pickerCtx:       null,
  editRoutineId:   null,
  rfExercises:     [],
  calYear:         new Date().getFullYear(),
  calMonth:        new Date().getMonth(),
  currentExId:     null,
  exGraphMode:     'volume',
  copyingWorkoutId:null,
};

// ─── PERSISTENCE ──────────────────────────────────────────────────────────────
const Store = {
  KEY: 'hevy_v3',
  save() {
    localStorage.setItem(this.KEY, JSON.stringify({
      profile:   S.profile,
      unit:      S.unit,
      barWeight: S.barWeight,
      restTime:  S.restTime,
      routines:        S.routines,
      customExercises: S.customExercises,
      history:         S.history,
      measures:        S.measures,
      personalRecords: S.personalRecords,
    }));
  },
  load() {
    try {
      const d = JSON.parse(localStorage.getItem(this.KEY));
      if (!d) return;
      Object.assign(S, {
        profile:   d.profile   ?? S.profile,
        unit:      d.unit      ?? 'kg',
        barWeight: d.barWeight ?? 20,
        restTime:  d.restTime  ?? 90,
        routines:        d.routines        ?? [],
        customExercises: d.customExercises ?? [],
        history:         d.history         ?? [],
        measures:        d.measures        ?? [],
        personalRecords: d.personalRecords ?? {},
      });
    } catch(e) { console.warn(e); }
  },
};

// ─── MATH ─────────────────────────────────────────────────────────────────────
const Calc = {
  /** Brzycki 1RM — reps 1–9 only */
  oneRM(w, r) {
    if (!w || !r || r < 1 || r >= 10) return null;
    return +(w / (1.0278 - 0.0278 * r)).toFixed(1);
  },
  /** Session total volume */
  volume(exercises) {
    return exercises.reduce((t, ex) =>
      t + ex.sets.reduce((s, set) =>
        s + (set.done && +set.w > 0 && +set.r > 0 && set.type !== 'W'
          ? +set.w * +set.r : 0), 0), 0);
  },
  /** Best RM per exercise in a session */
  sessionBestRM(exercises) {
    const out = {};
    for (const ex of exercises) {
      for (const s of ex.sets) {
        if (!s.done || s.type === 'W') continue;
        const rm = this.oneRM(+s.w, +s.r);
        if (rm && (!out[ex.id] || rm > out[ex.id])) out[ex.id] = rm;
      }
    }
    return out;
  },
  /** Sets per muscle in last N days */
  muscleVolume(days = 7) {
    const cut = Date.now() - days * 86400000;
    const m = {};
    for (const w of S.history) {
      if (new Date(w.date).getTime() < cut) continue;
      for (const ex of (w.exercises || [])) {
        const info = allEx().find(e => e.id === ex.id);
        const g = info?.muscle || 'Otros';
        const n = (ex.sets || []).filter(s => s.done && s.type !== 'W').length;
        m[g] = (m[g] || 0) + n;
      }
    }
    return m;
  },
  /** Weekly volume array (last 8 weeks) */
  weeklyVolume() {
    const weeks = Array(8).fill(0);
    const now = Date.now();
    for (const w of S.history) {
      const diff = (now - new Date(w.date).getTime()) / (7 * 86400000);
      const idx = Math.floor(diff);
      if (idx < 8) weeks[7 - idx] += w.volume || 0;
    }
    return weeks;
  },
  /** Consecutive weeks streak */
  streak() {
    const weekSet = new Set();
    for (const w of S.history) {
      const d = new Date(w.date);
      const monday = new Date(d);
      monday.setDate(d.getDate() - ((d.getDay() + 6) % 7));
      weekSet.add(monday.toISOString().slice(0, 10));
    }
    const sorted = [...weekSet].sort().reverse();
    let streak = 0;
    let ref = new Date(); ref.setDate(ref.getDate() - ((ref.getDay() + 6) % 7));
    for (const w of sorted) {
      const d = new Date(w);
      const diffW = Math.round((ref.getTime() - d.getTime()) / (7 * 86400000));
      if (diffW <= 1) { streak++; ref = d; } else break;
    }
    return streak;
  },
  /** Plate calc */
  plates(total) {
    const bar = S.barWeight;
    const SIZES = [20, 15, 10, 5, 2.5, 1.25];
    if (total < bar) return { error: `Mínimo ${bar} kg (peso de la barra).` };
    let rem = (total - bar) / 2;
    const result = [];
    for (const p of SIZES) {
      const n = Math.floor(rem / p + 1e-9);
      if (n > 0) { result.push({ p, n }); rem -= n * p; }
    }
    return { result, leftover: +rem.toFixed(2), bar };
  },
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function allEx()    { return [...DB_EXERCISES, ...S.customExercises]; }
function findEx(id) { return allEx().find(e => e.id === id); }
function uid()      { return Date.now().toString(36) + Math.random().toString(36).slice(2,5); }
function today()    { return new Date().toISOString().slice(0, 10); }
function fmtTime(s) { return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`; }
function fmtDate(iso) {
  return new Date(iso).toLocaleDateString('es-CR', { weekday:'short', day:'numeric', month:'short', year:'numeric' });
}
function fmtDateShort(iso) {
  return new Date(iso).toLocaleDateString('es-CR', { day:'numeric', month:'short' });
}

function toast(msg, ms = 2600) {
  const el = document.getElementById('toast');
  el.textContent = msg; el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), ms);
}
function flashPR(msg) {
  const el = document.getElementById('pr-banner');
  document.getElementById('pr-text').textContent = msg;
  el.classList.remove('hidden'); el.classList.add('show');
  setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.classList.add('hidden'), 300); }, 3000);
}

// ─── RENDER ───────────────────────────────────────────────────────────────────

/* ── Profile ── */
function renderProfile() {
  // Avatar / name
  const initial = (S.profile.name || 'H')[0].toUpperCase();
  document.getElementById('profile-avatar').textContent = initial;
  document.getElementById('profile-name').textContent   = S.profile.name || 'Atleta';
  document.getElementById('profile-handle').textContent = S.profile.handle || '@usuario';

  // Stats
  const totalVol = S.history.reduce((a, w) => a + (w.volume || 0), 0);
  document.getElementById('stat-sessions').textContent = S.history.length;
  document.getElementById('stat-volume').textContent   = (totalVol / 1000).toFixed(1);
  document.getElementById('stat-streak').textContent   = Calc.streak();

  renderActivityDots();
  renderMiniCal();
  renderMuscleDistribution();
  renderVolChart();
  renderPRList();
  renderMeasures();
  renderWeightChart();
  renderRecentWorkouts();
}

function renderActivityDots() {
  const el = document.getElementById('activity-dots');
  const days = ['D','L','M','X','J','V','S'];
  const now = new Date();
  let html = '';
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now); d.setDate(d.getDate() - i);
    const dstr = d.toISOString().slice(0, 10);
    const hasW = S.history.some(w => w.date.slice(0, 10) === dstr);
    const vol  = S.history.filter(w => w.date.slice(0,10) === dstr)
                          .reduce((a,w) => a + (w.volume||0), 0);
    const h = Math.min(40, Math.max(4, vol / 200));
    html += `<div class="act-day">
      <div class="act-bar ${hasW ? 'has-workout' : ''}" style="height:${h}px"></div>
      <span class="act-lbl">${days[d.getDay()]}</span>
    </div>`;
  }
  el.innerHTML = html;
}

function renderMiniCal() {
  const el = document.getElementById('mini-cal');
  const now = new Date();
  const year = now.getFullYear(), month = now.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let html = '';
  for (let i = 0; i < firstDay; i++) html += `<div class="mc-cell"></div>`;
  for (let d = 1; d <= daysInMonth; d++) {
    const dstr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const hasW = S.history.some(w => w.date.slice(0,10) === dstr);
    const isToday = dstr === today();
    html += `<div class="mc-cell ${hasW ? 'has-w' : ''} ${isToday ? 'today' : ''}">${d}</div>`;
  }
  el.innerHTML = html;
}

function renderMuscleDistribution() {
  const mv = Calc.muscleVolume(7);
  const muscles = Object.keys(MUSCLE_COLORS);
  const maxSets = Math.max(1, ...muscles.map(m => mv[m] || 0));

  // Color SVG regions
  for (const [muscle, ids] of Object.entries(MUSCLE_SVG_IDS)) {
    const sets = mv[muscle] || 0;
    const intensity = sets > 0 ? Math.max(0.25, sets / maxSets) : 0;
    const color = sets > 0 ? MUSCLE_COLORS[muscle] : '#1e1e2e';
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) el.style.fill = sets > 0 ? hexAlpha(color, intensity) : color;
    }
  }

  // Bars
  const barsEl = document.getElementById('muscle-bars');
  barsEl.innerHTML = muscles.filter(m => m !== 'Cardio').map(m => {
    const sets = mv[m] || 0;
    const pct  = Math.round((sets / maxSets) * 100);
    const color = MUSCLE_COLORS[m] || '#4a90e2';
    return `<div class="mbar-row">
      <span class="mbar-name">${m}</span>
      <div class="mbar-track"><div class="mbar-fill" style="width:${pct}%;background:${color}"></div></div>
      <span class="mbar-count">${sets}</span>
    </div>`;
  }).join('');
}

function hexAlpha(hex, alpha) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function renderVolChart() {
  const canvas = document.getElementById('vol-chart');
  if (!canvas) return;
  const W = canvas.offsetWidth || 350;
  canvas.width = W; canvas.height = 120;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,W,120);
  const weeks = Calc.weeklyVolume();
  const max = Math.max(1, ...weeks);
  const barW = Math.floor((W - 20) / 8 - 4);
  weeks.forEach((v, i) => {
    const x = 10 + i * ((W-20)/8);
    const h = Math.max(2, (v/max) * 90);
    const y = 110 - h;
    const alpha = 0.3 + (v/max)*0.7;
    ctx.fillStyle = `rgba(232,85,78,${alpha})`;
    ctx.beginPath();
    ctx.roundRect(x, y, barW, h, 3);
    ctx.fill();
  });
  // Week labels
  ctx.fillStyle = '#48484f';
  ctx.font = '9px -apple-system,sans-serif';
  ctx.textAlign = 'center';
  const lbls = ['7s','6s','5s','4s','3s','2s','1s','Esta'];
  lbls.forEach((l, i) => {
    const x = 10 + i * ((W-20)/8) + barW/2;
    ctx.fillText(l, x, 118);
  });
}

function renderPRList() {
  const el = document.getElementById('pr-list');
  const entries = Object.entries(S.personalRecords);
  if (!entries.length) {
    el.innerHTML = `<p class="empty-state" style="padding:12px 0">Completa entrenamientos para ver tus récords.</p>`;
    return;
  }
  el.innerHTML = entries.slice(0,8).map(([id, rec]) => {
    const ex = findEx(id);
    return `<div class="pr-row" onclick="App.openExDetail('${id}')">
      <span class="pr-ex">${ex?.name || id}</span>
      <span class="pr-val">${rec.rm ? rec.rm+' '+S.unit+' (1RM)' : rec.weight+' '+S.unit}</span>
    </div>`;
  }).join('');
}

function renderMeasures() {
  const el = document.getElementById('measure-list');
  const list = [...S.measures].sort((a,b) => b.date.localeCompare(a.date)).slice(0,6);
  if (!list.length) { el.innerHTML = `<p class="empty-state" style="padding:12px 0">Sin medidas aún.</p>`; return; }
  el.innerHTML = list.map(m => {
    const chips = [];
    if (m.weight)     chips.push(`<span class="meas-v">${m.weight}<span class="meas-u">kg</span></span>`);
    if (m.fat != null && m.fat !== '') chips.push(`<span class="meas-v">${m.fat}<span class="meas-u">%</span></span>`);
    if (m.waist)      chips.push(`<span class="meas-v">${m.waist}<span class="meas-u">cin.</span></span>`);
    if (m.bicep)      chips.push(`<span class="meas-v">${m.bicep}<span class="meas-u">bíc.</span></span>`);
    return `<div class="meas-row">
      <span class="meas-date">${fmtDateShort(m.date)}</span>
      <div class="meas-vals">${chips.join('')}</div>
    </div>`;
  }).join('');
}

function renderWeightChart() {
  const canvas = document.getElementById('weight-chart');
  if (!canvas) return;
  const pts = [...S.measures].filter(m => m.weight).sort((a,b) => a.date.localeCompare(b.date)).slice(-14);
  const W = canvas.offsetWidth || 340;
  canvas.width = W; canvas.height = 110;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,W,110);
  if (pts.length < 2) {
    ctx.fillStyle = '#48484f'; ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Registra al menos 2 medidas para ver la gráfica', W/2, 58);
    return;
  }
  const vals = pts.map(p => +p.weight);
  const lo = Math.min(...vals)-1, hi = Math.max(...vals)+1;
  const X = i => 16 + i*(W-32)/(pts.length-1);
  const Y = v => 95 - ((v-lo)/(hi-lo))*80;
  const grad = ctx.createLinearGradient(0,0,0,110);
  grad.addColorStop(0,'rgba(232,85,78,.25)'); grad.addColorStop(1,'rgba(232,85,78,0)');
  ctx.beginPath();
  ctx.moveTo(X(0), Y(vals[0]));
  for (let i=1;i<pts.length;i++) ctx.lineTo(X(i), Y(vals[i]));
  ctx.lineTo(X(pts.length-1), 110); ctx.lineTo(X(0), 110); ctx.closePath();
  ctx.fillStyle = grad; ctx.fill();
  ctx.beginPath(); ctx.moveTo(X(0), Y(vals[0]));
  for (let i=1;i<pts.length;i++) ctx.lineTo(X(i), Y(vals[i]));
  ctx.strokeStyle = '#e8554e'; ctx.lineWidth = 2; ctx.lineJoin = 'round'; ctx.stroke();
  vals.forEach((v,i) => {
    ctx.beginPath(); ctx.arc(X(i), Y(v), 3.5, 0, Math.PI*2);
    ctx.fillStyle = '#e8554e'; ctx.fill();
  });
}

function renderRecentWorkouts() {
  const el = document.getElementById('recent-list');
  const list = [...S.history].sort((a,b) => new Date(b.date)-new Date(a.date)).slice(0,5);
  if (!list.length) { el.innerHTML = `<p class="empty-state" style="padding:12px 0">Sin sesiones aún.</p>`; return; }
  el.innerHTML = list.map(w => `
    <div class="recent-row" onclick="App.openWDetail('${w.id}')">
      <div>
        <div class="recent-name">${w.name}</div>
        <div class="recent-meta">${fmtDate(w.date)} · ${w.duration||'--'}</div>
      </div>
      <span class="recent-vol">${w.volume||0} ${S.unit}</span>
    </div>`).join('');
}

/* ── Routines ── */
function renderRoutines() {
  const el = document.getElementById('routine-list');
  // Add button always on top
  let html = `<button class="routine-add-btn" onclick="App.openRoutineForm()">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
    Nueva rutina
  </button>`;
  if (!S.routines.length) {
    html += `<p class="empty-state">Sin rutinas. Crea tu primera rutina arriba.</p>`;
  } else {
    html += S.routines.map(r => {
      const exs = (r.exercises||[]).map(e => findEx(e.id)?.name||'?').slice(0,5).join(' · ');
      const more = (r.exercises||[]).length > 5 ? ` +${(r.exercises||[]).length-5}` : '';
      return `<div class="routine-card">
        <div class="rc-name">${r.name}</div>
        <div class="rc-meta">${(r.exercises||[]).length} ejercicios${r.notes ? ' · '+r.notes.slice(0,50) : ''}</div>
        <div class="rc-exs">${exs}${more}</div>
        <div class="rc-btns">
          <button class="rc-start" onclick="App.startFromRoutine('${r.id}')">▶ Iniciar</button>
          <button class="rc-edit" onclick="App.openRoutineForm('${r.id}')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button class="rc-del" onclick="App.deleteRoutine('${r.id}')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
          </button>
        </div>
      </div>`;
    }).join('');
  }
  el.innerHTML = html;
  renderQuickRoutines();
}

function renderQuickRoutines() {
  const el = document.getElementById('quick-routines');
  if (!S.routines.length) { el.innerHTML = ''; return; }
  el.innerHTML = S.routines.slice(0,5).map(r => `
    <button class="qr-btn" onclick="App.startFromRoutine('${r.id}')">
      <div>
        <div class="qr-name">${r.name}</div>
        <div class="qr-meta">${(r.exercises||[]).length} ejercicios</div>
      </div>
      <span class="qr-arrow">›</span>
    </button>`).join('');
}

/* ── History ── */
function renderHistory() {
  const el = document.getElementById('history-list');
  const list = [...S.history].sort((a,b) => new Date(b.date)-new Date(a.date));
  if (!list.length) { el.innerHTML = `<p class="empty-state">Sin entrenamientos aún. ¡Comienza uno!</p>`; return; }
  el.innerHTML = list.map(w => {
    const setCount = (w.exercises||[]).reduce((a,e) => a+(e.sets||[]).filter(s=>s.done).length, 0);
    const exPreview = (w.exercises||[]).slice(0,4).map(e => findEx(e.id)?.name||'?').join(' · ');
    return `<div class="history-card" onclick="App.openWDetail('${w.id}')">
      <div class="hc-date">${fmtDate(w.date)}</div>
      <div class="hc-name">${w.name}</div>
      <div class="hc-chips">
        <span class="hc-chip">⏱ <strong>${w.duration||'--'}</strong></span>
        <span class="hc-chip">🏋️ <strong>${w.volume||0} ${S.unit}</strong></span>
        <span class="hc-chip">📋 <strong>${setCount} series</strong></span>
      </div>
      <div class="hc-exs">${exPreview}${(w.exercises||[]).length>4?' …':''}</div>
    </div>`;
  }).join('');
}

/* ── Live session ── */
function renderLive() {
  const live = document.getElementById('workout-live');
  const exs = S.live.exercises;
  const liveVol = Calc.volume(exs);

  live.innerHTML = `<div class="live-wrap">
    <div class="live-topbar">
      <div class="live-left">
        <span class="live-title">${S.live.name}</span>
        <span class="live-elapsed" id="live-elapsed">00:00</span>
      </div>
      <div class="live-right">
        <button class="rc-edit" style="background:var(--bg2)" onclick="App.openPlates()" title="Calculadora de discos">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"/><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"/></svg>
        </button>
        <button class="btn-finish" onclick="App.finishWorkout()">Finalizar</button>
      </div>
    </div>
    <span class="live-vol-chip" id="live-vol-chip">Volumen: ${liveVol} ${S.unit}</span>
    <div class="live-ex-list" id="live-ex-list">${exs.map((ex,bi) => renderExBlock(ex,bi)).join('')}</div>
    <div class="live-footer">
      <button class="btn-add-ex" onclick="App.openPicker('live')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Añadir ejercicio
      </button>
      <button class="btn-cancel-session" onclick="App.cancelWorkout()">Cancelar entrenamiento</button>
    </div>
  </div>`;
  startLiveTimer();
}

function renderExBlock(ex, bi) {
  const info = findEx(ex.id);
  const rows = (ex.sets||[]).map((s,si) => renderSetRow(s, bi, si, info?.type)).join('');
  const restSec = ex.restTime ?? S.restTime;
  return `<div class="ex-block" id="exb-${bi}">
    <div class="ex-block-head">
      <button class="ex-name-btn" onclick="App.openExDetail('${ex.id}')">
        <span class="ex-name">${info?.name||'?'}</span>
        <span class="ex-sub">${info?.muscle||''} · ${info?.equipment||''}</span>
      </button>
      <div class="ex-head-right">
        <button class="ex-timer-btn" onclick="App.setExRest(${bi})" title="Tiempo de descanso">⏱ ${restSec}s</button>
        <button class="ex-more-btn" onclick="App.removeExBlock(${bi})">×</button>
      </div>
    </div>
    <table class="sets-tbl">
      <thead><tr>
        <th>TIPO</th>
        <th>${info?.type==='duration'?'DURACIÓN':'PESO ('+S.unit+')'}</th>
        <th>REPS</th>
        <th>RPE</th>
        <th>ANTERIOR</th>
        <th>✓</th>
      </tr></thead>
      <tbody id="stb-${bi}">${rows}</tbody>
    </table>
    <div class="ex-note-row">
      <input type="text" class="ex-note-inp" placeholder="Añadir nota…"
        value="${ex.note||''}" oninput="App.updNote(${bi},this.value)"/>
    </div>
    <div class="ex-add-set-row">
      <button class="btn-add-set" onclick="App.addSet(${bi})">+ Añadir serie</button>
    </div>
  </div>`;
}

function renderSetRow(s, bi, si, exType) {
  const isDuration = exType === 'duration';
  const isBodyweight = exType === 'bodyweight_reps';
  const wLabel = isDuration ? 'seg' : '';
  const prev = s.prev ? (isDuration ? `${s.prev.w}s` : `${s.prev.w}×${s.prev.r}`) : '—';
  return `<tr id="sr-${bi}-${si}" class="${s.done?'set-done':''}">
    <td><button class="stype-btn ${s.type}" onclick="App.cycleType(${bi},${si})">${s.type}</button></td>
    <td>${isBodyweight ? '<span style="font-size:11px;color:var(--t3)">BW</span>' :
      `<input class="w-inp" type="number" step="${isDuration?1:0.5}" value="${s.w||''}" placeholder="0"
        oninput="App.updSet(${bi},${si},'w',this.value)" />`}
    </td>
    <td><input class="r-inp" type="number" value="${s.r||''}" placeholder="0"
        oninput="App.updSet(${bi},${si},'r',this.value)" /></td>
    <td><input class="rpe-inp" type="number" step=".5" min="1" max="10" value="${s.rpe||''}" placeholder="—"
        oninput="App.updSet(${bi},${si},'rpe',this.value)" /></td>
    <td><span class="prev-hint">${prev}</span></td>
    <td><button class="check-btn ${s.done?'done':''}" onclick="App.toggleDone(${bi},${si})">${s.done?'✓':''}</button></td>
  </tr>`;
}

function refreshSetRow(bi, si) {
  const ex = (S.live?.exercises || S.rfExercises)[bi];
  const info = findEx(ex.id);
  const row = document.getElementById(`sr-${bi}-${si}`);
  if (row) row.outerHTML = renderSetRow(ex.sets[si], bi, si, info?.type);
}

function refreshSetsBody(bi) {
  const ex = (S.live?.exercises || S.rfExercises)[bi];
  const info = findEx(ex.id);
  const tbody = document.getElementById(`stb-${bi}`);
  if (tbody) tbody.innerHTML = ex.sets.map((s,si) => renderSetRow(s, bi, si, info?.type)).join('');
}

function updateLiveVolChip() {
  const chip = document.getElementById('live-vol-chip');
  if (chip) chip.textContent = `Volumen: ${Calc.volume(S.live.exercises)} ${S.unit}`;
}

/* ── Exercise picker ── */
function renderPicker(q='', muscle='', equip='') {
  const list = allEx().filter(e =>
    e.name.toLowerCase().includes(q.toLowerCase()) &&
    (!muscle || e.muscle === muscle) &&
    (!equip  || e.equipment === equip)
  );
  const grouped = {};
  for (const e of list) {
    if (!grouped[e.muscle]) grouped[e.muscle] = [];
    grouped[e.muscle].push(e);
  }
  const el = document.getElementById('pk-list');
  if (!list.length) { el.innerHTML = `<p class="empty-state">Sin resultados.</p>`; return; }
  el.innerHTML = Object.entries(grouped).map(([muscle, exs]) => `
    <div style="padding:6px 4px 2px;font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.5px">${muscle}</div>
    ${exs.map(e => `
      <div class="pk-item" onclick="App.selectEx('${e.id}')">
        <div>
          <div class="pk-name">${e.name}${e.custom?'<span class="custom-chip">CUSTOM</span>':''}</div>
          <div class="pk-sub">${e.equipment}</div>
        </div>
        <span class="pk-add">+</span>
      </div>`).join('')}
  `).join('');
}

/* ── Routine form exercises ── */
function renderRFExList() {
  const el = document.getElementById('rf-exlist');
  if (!S.rfExercises.length) {
    el.innerHTML = `<p class="empty-state" style="padding:10px 0">Sin ejercicios. Añade con el botón.</p>`; return;
  }
  el.innerHTML = S.rfExercises.map((ex, bi) => {
    const info = findEx(ex.id);
    return `<div class="rfe-item">
      <div>
        <div class="rfe-name">${info?.name||'?'}</div>
        <div class="rfe-sub">${(ex.sets||[]).length} series · ${info?.muscle}</div>
      </div>
      <button onclick="App.removeRFEx(${bi})" style="color:var(--t3);font-size:18px;padding:4px">×</button>
    </div>`;
  }).join('');
}

/* ── Exercise detail / progress ── */
function renderExDetail(exId) {
  S.currentExId = exId;
  const info = findEx(exId);
  document.getElementById('exd-name').textContent = info?.name || exId;
  document.getElementById('exd-meta').textContent = `${info?.muscle} · ${info?.equipment}`;
  renderExGraph(exId, S.exGraphMode);
  renderExHistory(exId);
}

function renderExGraph(exId, mode) {
  const canvas = document.getElementById('ex-progress-chart');
  if (!canvas) return;
  const sessions = S.history
    .filter(w => w.exercises?.some(e => e.id === exId))
    .sort((a,b) => new Date(a.date)-new Date(b.date))
    .slice(-12);
  const W = canvas.offsetWidth || 340;
  canvas.width = W; canvas.height = 140;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,W,140);
  if (sessions.length < 2) {
    ctx.fillStyle='#48484f'; ctx.font='12px sans-serif'; ctx.textAlign='center';
    ctx.fillText('Necesitas al menos 2 sesiones con este ejercicio', W/2, 74); return;
  }
  const vals = sessions.map(w => {
    const ex = w.exercises.find(e => e.id === exId);
    const done = (ex?.sets||[]).filter(s => s.done && s.type !== 'W');
    if (!done.length) return 0;
    if (mode === 'volume')      return done.reduce((a,s) => a + (+s.w||0)*(+s.r||1), 0);
    if (mode === 'best_weight') return Math.max(...done.map(s => +s.w||0));
    if (mode === 'reps')        return Math.max(...done.map(s => +s.r||0));
    if (mode === '1rm')         return Math.max(...done.map(s => Calc.oneRM(+s.w,+s.r)||0));
    return 0;
  });
  const lo = 0, hi = Math.max(1, ...vals);
  const X = i => 20 + i*(W-40)/(sessions.length-1);
  const Y = v => 115 - ((v-lo)/(hi-lo))*95;
  const grad = ctx.createLinearGradient(0,0,0,140);
  grad.addColorStop(0,'rgba(232,85,78,.25)'); grad.addColorStop(1,'rgba(232,85,78,0)');
  ctx.beginPath(); ctx.moveTo(X(0),Y(vals[0]));
  for (let i=1;i<vals.length;i++) ctx.lineTo(X(i),Y(vals[i]));
  ctx.lineTo(X(vals.length-1),140); ctx.lineTo(X(0),140); ctx.closePath();
  ctx.fillStyle=grad; ctx.fill();
  ctx.beginPath(); ctx.moveTo(X(0),Y(vals[0]));
  for (let i=1;i<vals.length;i++) ctx.lineTo(X(i),Y(vals[i]));
  ctx.strokeStyle='#e8554e'; ctx.lineWidth=2; ctx.lineJoin='round'; ctx.stroke();
  vals.forEach((v,i) => {
    ctx.beginPath(); ctx.arc(X(i),Y(v),4,0,Math.PI*2);
    ctx.fillStyle='#e8554e'; ctx.fill();
  });
  // Date labels
  ctx.fillStyle='#48484f'; ctx.font='9px sans-serif'; ctx.textAlign='center';
  sessions.forEach((w,i) => {
    const d = new Date(w.date);
    ctx.fillText(`${d.getDate()}/${d.getMonth()+1}`, X(i), 136);
  });
}

function renderExHistory(exId) {
  const el = document.getElementById('exd-history');
  const sessions = S.history
    .filter(w => w.exercises?.some(e => e.id === exId))
    .sort((a,b) => new Date(b.date)-new Date(a.date))
    .slice(0,8);
  if (!sessions.length) { el.innerHTML = `<p class="empty-state">Sin historial para este ejercicio.</p>`; return; }
  el.innerHTML = sessions.map(w => {
    const ex = w.exercises.find(e => e.id === exId);
    const done = (ex?.sets||[]).filter(s => s.done && s.type !== 'W');
    const rows = done.map(s => {
      const rm = Calc.oneRM(+s.w, +s.r);
      return `<div class="exd-set-row">
        <span class="exd-set-type">${s.type}</span>
        <span class="exd-set-val">${s.w} ${S.unit} × ${s.r}</span>
        <span class="exd-set-rm">${rm ? '~'+rm+' 1RM' : ''}</span>
      </div>`;
    }).join('');
    return `<div class="exd-session">
      <div class="exd-sess-date">${fmtDate(w.date)}</div>
      ${rows}
    </div>`;
  }).join('');
}

/* ── Calendar ── */
function renderCalendar() {
  const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  document.getElementById('cal-month-label').textContent = `${months[S.calMonth]} ${S.calYear}`;
  const first = new Date(S.calYear, S.calMonth, 1).getDay();
  const days  = new Date(S.calYear, S.calMonth+1, 0).getDate();
  const tod   = today();
  let html = '';
  for (let i=0;i<first;i++) html += `<div class="cal-cell empty"></div>`;
  for (let d=1;d<=days;d++) {
    const dstr = `${S.calYear}-${String(S.calMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const hasW  = S.history.some(w => w.date.slice(0,10)===dstr);
    const isTod = dstr===tod;
    html += `<div class="cal-cell ${hasW?'has-w':''} ${isTod?'today':''}" onclick="App.calSelectDay('${dstr}')">${d}</div>`;
  }
  document.getElementById('cal-grid').innerHTML = html;
  document.getElementById('cal-day-detail').innerHTML = '<p style="color:var(--t3);font-size:13px">Toca un día para ver el detalle.</p>';
}

/* ── Workout detail ── */
function renderWDetail(w) {
  document.getElementById('wd-title').textContent = w.name;
  document.getElementById('wd-date').textContent  = fmtDate(w.date);
  S.copyingWorkoutId = w.id;
  const setCount = (w.exercises||[]).reduce((a,e) => a+(e.sets||[]).filter(s=>s.done).length,0);
  let html = `<div class="wd-stat-row">
    <div class="wd-stat"><div class="wd-stat-n">${w.duration||'--'}</div><div class="wd-stat-l">Duración</div></div>
    <div class="wd-stat"><div class="wd-stat-n">${w.volume||0}</div><div class="wd-stat-l">Vol. (${S.unit})</div></div>
    <div class="wd-stat"><div class="wd-stat-n">${setCount}</div><div class="wd-stat-l">Series</div></div>
  </div>`;
  for (const ex of (w.exercises||[])) {
    const info = findEx(ex.id);
    const doneSets = (ex.sets||[]).filter(s => s.done);
    html += `<div class="wd-ex">
      <div class="wd-ex-name" onclick="App.openExDetail('${ex.id}')">${info?.name||ex.id}</div>
      ${doneSets.map(s => {
        const rm = Calc.oneRM(+s.w, +s.r);
        return `<div class="wd-set-row">
          <span class="exd-set-type">${s.type}</span>
          <span class="exd-set-val">${s.type!=='W'?`${s.w} ${S.unit} × ${s.r}`:`${s.w} ${S.unit} × ${s.r} (calentamiento)`}</span>
          <span class="exd-set-rm">${rm?'~'+rm+' 1RM':''}</span>
        </div>`;
      }).join('')}
    </div>`;
  }
  document.getElementById('wd-body').innerHTML = html;
}

// ─── APP CONTROLLER ───────────────────────────────────────────────────────────
const App = {
  // ── Init ──────────────────────────────────────────────────────────────────
  init() {
    Store.load();
    this._applySettings();
    renderProfile();
    renderRoutines();
    renderHistory();
    document.getElementById('m-date').value = today();
  },

  _applySettings() {
    document.getElementById('cfg-name').value   = S.profile.name;
    document.getElementById('cfg-handle').value = S.profile.handle;
    document.getElementById('cfg-unit').value   = S.unit;
    document.getElementById('cfg-rest').value   = S.restTime;
    document.getElementById('cfg-bar').value    = S.barWeight;
    document.getElementById('pl-unit').textContent = S.unit;
    document.getElementById('pl-bar-hint').textContent = `Barra olímpica: ${S.barWeight} kg`;
  },

  // ── Navigation ────────────────────────────────────────────────────────────
  nav(page, btn) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.bn-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`page-${page}`).classList.add('active');
    btn.classList.add('active');
    const titles = { profile:'Hevy', routines:'Rutinas', workout:'Entrenar', history:'Historial', social:'Social' };
    document.getElementById('topbar-title').textContent = titles[page];
    if (page==='profile')  renderProfile();
    if (page==='routines') renderRoutines();
    if (page==='history')  renderHistory();
  },

  // ── Modals ────────────────────────────────────────────────────────────────
  open(id) { document.getElementById(id).classList.remove('hidden'); },
  close(id) { document.getElementById(id).classList.add('hidden'); },

  // ── Settings ──────────────────────────────────────────────────────────────
  openSettings() { this._applySettings(); this.open('modal-settings'); },
  saveSettings() {
    S.profile.name   = document.getElementById('cfg-name').value.trim() || 'Atleta';
    S.profile.handle = document.getElementById('cfg-handle').value.trim() || '@usuario';
    S.unit     = document.getElementById('cfg-unit').value;
    S.restTime = parseInt(document.getElementById('cfg-rest').value)||90;
    S.barWeight= parseFloat(document.getElementById('cfg-bar').value)||20;
    Store.save();
    this.close('modal-settings');
    renderProfile();
    toast('Configuración guardada ✓');
  },
  setUnit(v) { S.unit=v; },
  clearData() {
    if (!confirm('¿Borrar todos los datos? Esta acción no se puede deshacer.')) return;
    localStorage.removeItem(Store.KEY);
    location.reload();
  },

  // ── Profile ───────────────────────────────────────────────────────────────
  openEditProfile() {
    document.getElementById('ep-name').value   = S.profile.name;
    document.getElementById('ep-handle').value = S.profile.handle;
    document.getElementById('ep-bio').value    = S.profile.bio||'';
    this.open('modal-profile');
  },
  saveProfile() {
    S.profile.name   = document.getElementById('ep-name').value.trim() || 'Atleta';
    S.profile.handle = document.getElementById('ep-handle').value.trim() || '@usuario';
    S.profile.bio    = document.getElementById('ep-bio').value.trim();
    Store.save(); renderProfile();
    this.close('modal-profile');
    toast('Perfil actualizado ✓');
  },

  // ── Routines ──────────────────────────────────────────────────────────────
  openRoutineForm(id=null) {
    S.editRoutineId = id;
    if (id) {
      const r = S.routines.find(r=>r.id===id);
      document.getElementById('routine-modal-h').textContent = 'Editar rutina';
      document.getElementById('rf-name').value  = r.name;
      document.getElementById('rf-notes').value = r.notes||'';
      S.rfExercises = (r.exercises||[]).map(e => ({...e, sets:(e.sets||[]).map(s=>({...s}))}));
    } else {
      document.getElementById('routine-modal-h').textContent = 'Nueva rutina';
      document.getElementById('rf-name').value  = '';
      document.getElementById('rf-notes').value = '';
      S.rfExercises = [];
    }
    renderRFExList();
    this.open('modal-routine');
  },
  saveRoutine() {
    const name = document.getElementById('rf-name').value.trim();
    if (!name) { toast('Escribe un nombre para la rutina.'); return; }
    const r = {
      id: S.editRoutineId || uid(),
      name,
      notes: document.getElementById('rf-notes').value.trim(),
      exercises: S.rfExercises,
    };
    if (S.editRoutineId) {
      const idx = S.routines.findIndex(x=>x.id===S.editRoutineId);
      S.routines[idx] = r;
    } else {
      S.routines.push(r);
    }
    Store.save(); renderRoutines();
    this.close('modal-routine');
    toast('Rutina guardada ✓');
  },
  deleteRoutine(id) {
    if (!confirm('¿Eliminar esta rutina?')) return;
    S.routines = S.routines.filter(r=>r.id!==id);
    Store.save(); renderRoutines();
    toast('Rutina eliminada.');
  },
  removeRFEx(bi) {
    S.rfExercises.splice(bi,1);
    renderRFExList();
  },

  // ── Exercise picker ───────────────────────────────────────────────────────
  openPicker(ctx) {
    S.pickerCtx = ctx;
    document.getElementById('pk-search').value = '';
    document.getElementById('pk-muscle').value = '';
    document.getElementById('pk-equip').value  = '';
    renderPicker();
    this.open('modal-picker');
  },
  filterPicker() {
    renderPicker(
      document.getElementById('pk-search').value,
      document.getElementById('pk-muscle').value,
      document.getElementById('pk-equip').value,
    );
  },
  selectEx(exId) {
    const info = findEx(exId);
    const newEx = {
      id: exId,
      sets: [{ type:'N', w:'', r:'', rpe:'', done:false, prev:null }],
      restTime: S.restTime,
      note: '',
    };
    // Inject previous session data
    const lastW = [...S.history].reverse().find(w => w.exercises?.some(e=>e.id===exId));
    if (lastW) {
      const lastEx = lastW.exercises.find(e=>e.id===exId);
      const done   = (lastEx?.sets||[]).filter(s=>s.done && s.type!=='W');
      if (done.length) {
        newEx.sets = done.map(s => ({ type:s.type||'N', w:'', r:'', rpe:'', done:false, prev:{w:s.w,r:s.r} }));
      }
    }
    if (S.pickerCtx === 'live' && S.live) {
      S.live.exercises.push(newEx);
      const listEl = document.getElementById('live-ex-list');
      const bi = S.live.exercises.length-1;
      listEl.insertAdjacentHTML('beforeend', renderExBlock(newEx, bi));
    } else if (S.pickerCtx === 'routine') {
      S.rfExercises.push(newEx);
      renderRFExList();
      this.close('modal-picker');
      this.open('modal-routine');
      return;
    }
    this.close('modal-picker');
  },

  openCreateEx() {
    document.getElementById('ce-name').value = '';
    this.close('modal-picker');
    this.open('modal-create-ex');
  },
  saveCustomEx() {
    const name = document.getElementById('ce-name').value.trim();
    if (!name) { toast('Escribe un nombre.'); return; }
    const ex = {
      id:        'c'+uid(),
      name,
      muscle:    document.getElementById('ce-muscle').value,
      equipment: document.getElementById('ce-equip').value,
      type:      document.getElementById('ce-type').value,
      custom:    true,
    };
    S.customExercises.push(ex);
    Store.save();
    this.close('modal-create-ex');
    renderPicker();
    this.open('modal-picker');
    toast(`"${name}" creado ✓`);
  },

  // ── Set operations ────────────────────────────────────────────────────────
  _exList() { return S.live?.exercises || S.rfExercises; },
  addSet(bi) {
    const exs = this._exList();
    const last = exs[bi].sets.at(-1);
    exs[bi].sets.push({ type:last?.type||'N', w:'', r:'', rpe:'', done:false, prev:null });
    refreshSetsBody(bi);
  },
  updSet(bi, si, field, val) {
    const s = this._exList()[bi].sets[si];
    s[field] = (['w','r','rpe'].includes(field)) ? (parseFloat(val)||0) : val;
    if (S.live) updateLiveVolChip();
  },
  updNote(bi, val) {
    const exs = this._exList();
    if (exs[bi]) exs[bi].note = val;
  },
  cycleType(bi, si) {
    const types = ['N','W','D','F','S'];
    const s = this._exList()[bi].sets[si];
    s.type = types[(types.indexOf(s.type)+1) % types.length];
    refreshSetRow(bi, si);
  },
  toggleDone(bi, si) {
    const s = this._exList()[bi].sets[si];
    s.done = !s.done;
    refreshSetRow(bi, si);
    if (s.done && s.type !== 'W' && S.live) {
      updateLiveVolChip();
      this._checkPR(S.live.exercises[bi].id, +s.w, +s.r);
      const restTime = S.live.exercises[bi].restTime ?? S.restTime;
      this.startRest(restTime);
    }
  },
  removeExBlock(bi) {
    if (S.live) {
      S.live.exercises.splice(bi,1);
      renderLive();
    } else {
      S.rfExercises.splice(bi,1);
      renderRFExList();
    }
  },
  setExRest(bi) {
    const cur = S.live?.exercises[bi]?.restTime ?? S.restTime;
    const val = prompt('Tiempo de descanso para este ejercicio (segundos):', cur);
    if (val && !isNaN(+val) && S.live) {
      S.live.exercises[bi].restTime = +val;
      renderLive();
    }
  },

  // ── PR detection ──────────────────────────────────────────────────────────
  _checkPR(exId, w, r) {
    if (!w || !r) return;
    const rm = Calc.oneRM(w, r);
    const cur = S.personalRecords[exId];
    let isNew = false;
    if (!cur) {
      isNew = true;
    } else if (rm && cur.rm && rm > cur.rm) {
      isNew = true;
    } else if (!rm && w > (cur.weight||0)) {
      isNew = true;
    }
    if (isNew) {
      S.personalRecords[exId] = { weight:w, reps:r, rm, date:today() };
      Store.save();
      const info = findEx(exId);
      flashPR(`¡Récord personal! ${info?.name} — ${rm ? rm+' '+S.unit+' (1RM est.)' : w+' '+S.unit}`);
    }
  },

  // ── Live session ──────────────────────────────────────────────────────────
  startEmpty() {
    this._beginSession({ name:'Entrenamiento', exercises:[] });
  },
  startFromRoutine(id) {
    const r = S.routines.find(r=>r.id===id);
    if (!r) return;
    const exercises = (r.exercises||[]).map(ex => {
      const newEx = { id:ex.id, sets:[], restTime:ex.restTime??S.restTime, note:'' };
      const lastW = [...S.history].reverse().find(w => w.exercises?.some(e=>e.id===ex.id));
      const lastEx= lastW?.exercises?.find(e=>e.id===ex.id);
      const done  = (lastEx?.sets||[]).filter(s=>s.done && s.type!=='W');
      if (done.length) {
        newEx.sets = done.map(s => ({ type:s.type||'N', w:'', r:'', rpe:'', done:false, prev:{w:s.w,r:s.r} }));
      } else {
        const srcSets = ex.sets?.length ? ex.sets : [{ type:'N' }];
        newEx.sets = srcSets.map(s => ({ type:s.type||'N', w:'', r:'', rpe:'', done:false, prev:null }));
      }
      return newEx;
    });
    this._beginSession({ name:r.name, exercises });
    document.querySelector('[data-page="workout"]').click();
  },
  _beginSession(data) {
    S.live = { name:data.name, startTime:Date.now(), exercises:data.exercises };
    document.getElementById('workout-idle').classList.add('hidden');
    const liveEl = document.getElementById('workout-live');
    liveEl.classList.remove('hidden');
    renderLive();
  },
  finishWorkout() {
    const exs = S.live.exercises;
    const hasDone = exs.some(e => e.sets.some(s=>s.done));
    if (!hasDone && !confirm('No hay series completadas. ¿Finalizar de todas formas?')) return;
    clearInterval(S.liveTimerID);
    this.skipRest();
    const elapsed = Math.floor((Date.now() - S.live.startTime) / 1000);
    const volume  = Calc.volume(exs);
    const w = {
      id:        uid(),
      name:      document.getElementById('live-elapsed') ? S.live.name : S.live.name,
      date:      new Date().toISOString(),
      duration:  fmtTime(elapsed),
      exercises: exs,
      volume,
    };
    S.history.push(w);
    // Update PRs for all sets
    for (const ex of exs) {
      for (const s of ex.sets) {
        if (s.done && s.type !== 'W') this._checkPR(ex.id, +s.w, +s.r);
      }
    }
    Store.save();
    S.live = null;
    document.getElementById('workout-idle').classList.remove('hidden');
    document.getElementById('workout-live').classList.add('hidden');
    document.getElementById('workout-live').innerHTML = '';
    renderProfile(); renderHistory();
    toast(`✓ Sesión guardada · ${volume} ${S.unit} de volumen`);
  },
  cancelWorkout() {
    if (!confirm('¿Cancelar la sesión? Los datos no se guardarán.')) return;
    clearInterval(S.liveTimerID);
    this.skipRest();
    S.live = null;
    document.getElementById('workout-idle').classList.remove('hidden');
    document.getElementById('workout-live').classList.add('hidden');
    document.getElementById('workout-live').innerHTML = '';
  },
  copyWorkout() {
    const w = S.history.find(w=>w.id===S.copyingWorkoutId);
    if (!w) return;
    this.close('modal-wdetail');
    this._beginSession({ name:w.name, exercises: w.exercises.map(ex => ({
      id: ex.id,
      sets: (ex.sets||[]).filter(s=>s.done && s.type!=='W').map(s => ({
        type:s.type||'N', w:'', r:'', rpe:'', done:false, prev:{w:s.w,r:s.r}
      })),
      restTime: ex.restTime ?? S.restTime,
      note: '',
    }))});
    document.querySelector('[data-page="workout"]').click();
  },

  // ── Live timer ────────────────────────────────────────────────────────────
  _liveTimer: null,
  _startLiveTimer: function() {}, // defined below

  // ── Rest timer ────────────────────────────────────────────────────────────
  startRest(duration) {
    const total = duration ?? S.restTime;
    S.restTotal = S.restLeft = total;
    document.getElementById('rest-overlay').classList.remove('hidden');
    this._updateRest(total, total);
    clearInterval(S.restID);
    S.restID = setInterval(() => {
      S.restLeft--;
      this._updateRest(S.restLeft, S.restTotal);
      if (S.restLeft <= 0) { clearInterval(S.restID); this.skipRest(); this._beep(); }
    }, 1000);
  },
  addRestTime(delta) {
    S.restLeft = Math.max(1, S.restLeft + delta);
    S.restTotal = Math.max(S.restTotal, S.restLeft);
    this._updateRest(S.restLeft, S.restTotal);
  },
  skipRest() {
    clearInterval(S.restID);
    document.getElementById('rest-overlay').classList.add('hidden');
  },
  _updateRest(rem, total) {
    document.getElementById('rest-num').textContent = rem;
    const C   = 2 * Math.PI * 60;
    const off = C * (1 - rem/total);
    document.getElementById('ring-arc').style.strokeDashoffset = off;
  },
  _beep() {
    try {
      const ac = new (window.AudioContext||window.webkitAudioContext)();
      [660, 880].forEach((freq, i) => {
        const o = ac.createOscillator(), g = ac.createGain();
        o.connect(g); g.connect(ac.destination);
        o.frequency.value = freq;
        g.gain.setValueAtTime(.35, ac.currentTime + i*.25);
        g.gain.exponentialRampToValueAtTime(.001, ac.currentTime + i*.25 + .3);
        o.start(ac.currentTime + i*.25);
        o.stop(ac.currentTime + i*.25 + .3);
      });
    } catch(e){}
  },

  // ── Measures ──────────────────────────────────────────────────────────────
  openMeasureForm() {
    ['m-weight','m-fat','m-waist','m-hip','m-chest','m-shoulders','m-bicep','m-forearm','m-thigh','m-calf','m-neck']
      .forEach(id => { const el=document.getElementById(id); if(el) el.value=''; });
    document.getElementById('m-date').value = today();
    this.open('modal-measure');
  },
  saveMeasure() {
    const p = id => { const v=document.getElementById(id)?.value; return v!==''&&v!=null ? parseFloat(v)||null : null; };
    const m = {
      date:      document.getElementById('m-date').value || today(),
      weight:    p('m-weight'), fat:       p('m-fat'),
      waist:     p('m-waist'),  hip:       p('m-hip'),
      chest:     p('m-chest'),  shoulders: p('m-shoulders'),
      bicep:     p('m-bicep'),  forearm:   p('m-forearm'),
      thigh:     p('m-thigh'),  calf:      p('m-calf'),
      neck:      p('m-neck'),
    };
    S.measures = S.measures.filter(x => x.date !== m.date);
    S.measures.push(m);
    S.measures.sort((a,b) => a.date.localeCompare(b.date));
    Store.save(); renderProfile();
    this.close('modal-measure');
    toast('Medida guardada ✓');
  },

  // ── Plates ────────────────────────────────────────────────────────────────
  openPlates() {
    document.getElementById('pl-target').value = '';
    document.getElementById('pl-result').innerHTML = '';
    this.open('modal-plates');
  },
  calcPlates() {
    const target = parseFloat(document.getElementById('pl-target').value);
    const el = document.getElementById('pl-result');
    if (!target) { el.innerHTML=''; return; }
    const { result, leftover, bar, error } = Calc.plates(target);
    if (error) { el.innerHTML=`<p class="pl-err">${error}</p>`; return; }
    const cls = {20:'d20',15:'d15',10:'d10',5:'d5',2.5:'d25',1.25:'d125'};
    const loaded = bar + (result?.reduce((a,r)=>a+r.p*r.n,0)||0)*2;
    let html = `<p class="pl-side-lbl">Por lado de la barra</p>`;
    if (!result.length) html += `<p style="color:var(--t3);font-size:13px">Solo el peso de la barra.</p>`;
    else html += result.map(({p,n}) =>
      `<div class="pl-row">
        <span class="pl-count">×${n}</span>
        <div class="pl-discs">${Array(n).fill(`<span class="disc ${cls[p]}">${p}</span>`).join('')}</div>
      </div>`).join('');
    html += `<p class="pl-ok" style="margin-top:8px">Total: ${loaded} kg${leftover>.01?` (${(leftover*2).toFixed(2)} kg restante)`:'  ✓'}</p>`;
    el.innerHTML = html;
  },

  // ── Workout detail ────────────────────────────────────────────────────────
  openWDetail(id) {
    const w = S.history.find(w=>w.id===id);
    if (!w) return;
    renderWDetail(w);
    this.open('modal-wdetail');
  },

  // ── Exercise detail ───────────────────────────────────────────────────────
  openExDetail(exId) {
    S.exGraphMode = 'volume';
    document.querySelectorAll('.gtab').forEach((t,i) => t.classList.toggle('active', i===0));
    renderExDetail(exId);
    this.open('modal-ex-detail');
  },
  switchExGraph(mode, btn) {
    S.exGraphMode = mode;
    document.querySelectorAll('.gtab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    renderExGraph(S.currentExId, mode);
  },

  // ── Calendar ──────────────────────────────────────────────────────────────
  openCalendar() { renderCalendar(); this.open('modal-calendar'); },
  calPrev() { S.calMonth--; if(S.calMonth<0){S.calMonth=11;S.calYear--;} renderCalendar(); },
  calNext() { S.calMonth++; if(S.calMonth>11){S.calMonth=0;S.calYear++;} renderCalendar(); },
  calSelectDay(dstr) {
    const ws = S.history.filter(w => w.date.slice(0,10)===dstr);
    const el = document.getElementById('cal-day-detail');
    if (!ws.length) { el.innerHTML='<p style="color:var(--t3);font-size:13px">Sin entrenamientos este día.</p>'; return; }
    el.innerHTML = ws.map(w => `<div style="margin-bottom:6px">
      <strong style="font-size:14px">${w.name}</strong>
      <span style="font-size:12px;color:var(--t3);margin-left:8px">${w.volume||0} ${S.unit} · ${w.duration||'--'}</span>
    </div>`).join('');
  },
};

// ── Live timer (defined after App) ────────────────────────────────────────────
function startLiveTimer() {
  clearInterval(S.liveTimerID);
  S.liveTimerID = setInterval(() => {
    const el = document.getElementById('live-elapsed');
    if (el && S.live) el.textContent = fmtTime(Math.floor((Date.now()-S.live.startTime)/1000));
  }, 1000);
}

// ── Bootstrap ─────────────────────────────────────────────────────────────────
window.App = App;
document.addEventListener('DOMContentLoaded', () => App.init());
document.addEventListener('click', e => {
  if (e.target.classList.contains('overlay')) e.target.classList.add('hidden');
});
