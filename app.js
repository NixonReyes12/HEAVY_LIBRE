/* ═══════════════════════════════════════════════
   HEVY CLONE v4 — app.js
   Supersets · Save-to-routine · Exercises tab
   ═══════════════════════════════════════════════ */
'use strict';

// ─── MUSCLE COLORS ────────────────────────────────────────────────────────────
const MUSCLE_COLORS = {
  Pecho:'#e8554e', Espalda:'#4f8ef7', Piernas:'#2fd17a',
  Hombros:'#c084fc', Brazos:'#f5c518', Core:'#fb923c',
  Glúteos:'#f472b6', Cardio:'#22d3ee',
};

const MUSCLE_SVG_IDS = {
  Pecho:['body-pecho'], Hombros:['body-hombro-l','body-hombro-r'],
  Brazos:['body-brazo-l','body-brazo-r'], Core:['body-core'],
  Piernas:['body-pierna-l','body-pierna-r'],
};

// ─── SECONDARY MUSCLES ────────────────────────────────────────────────────────
const SECONDARY = {
  e001:['Hombros','Brazos'], e002:['Hombros','Brazos'], e003:['Hombros','Brazos'],
  e004:['Hombros'], e005:['Hombros','Brazos'], e006:['Hombros'],
  e007:['Brazos'], e008:['Hombros','Brazos'], e009:['Core'],
  e010:['Brazos','Hombros'], e011:['Brazos','Hombros'], e012:['Brazos'],
  e013:['Brazos'], e014:['Piernas','Core','Glúteos'], e015:['Brazos'],
  e016:['Brazos','Core'], e017:['Brazos'], e018:['Core'],
  e020:['Glúteos','Core'], e021:['Glúteos'], e022:['Glúteos','Espalda'],
  e023:[], e024:['Glúteos'], e025:[], e026:['Glúteos','Core'],
  e027:['Glúteos','Core'], e028:['Core'], e029:['Glúteos'],
  e030:['Brazos','Core'], e031:[], e032:[], e033:['Espalda'],
  e034:['Brazos'], e035:[], e036:['Core'],
  e040:[], e041:['Pecho','Hombros'], e042:[], e043:[],
  e044:[], e045:[], e046:[], e047:[], e048:[],
  e050:['Hombros'], e051:[], e052:['Hombros'], e053:[], e054:[],
  e055:[], e056:[],
  e060:['Piernas','Core'], e061:['Core'], e062:['Piernas'],
  e070:['Piernas'], e071:['Piernas'], e072:['Espalda','Brazos','Piernas'],
  e073:[], e074:[],
};

// ─── GIF SEARCH TERMS (specific enough to get unique results) ─────────────────
const GIF_TERMS = {
  // Pecho
  e001: 'barbell bench press',
  e002: 'incline dumbbell press',
  e003: 'decline barbell bench press',
  e004: 'pec deck fly machine',
  e005: 'chest dip parallel bars',
  e006: 'cable fly crossover chest',
  e007: 'dumbbell pullover chest',
  e008: 'push up chest',
  e009: 'cable fly low pulley',
  // Espalda
  e010: 'pull up overhand grip',
  e011: 'barbell bent over row',
  e012: 'lat pulldown cable',
  e013: 'seated cable row',
  e014: 'barbell deadlift conventional',
  e015: 'dumbbell single arm row',
  e016: 'straight arm cable pulldown',
  e017: 'dumbbell shrug trap',
  e018: 'back hyperextension roman chair',
  // Piernas
  e020: 'barbell back squat',
  e021: 'leg press machine horizontal',
  e022: 'romanian deadlift dumbbell',
  e023: 'leg extension machine quad',
  e024: 'lying leg curl machine',
  e025: 'standing calf raise machine',
  e026: 'dumbbell walking lunge',
  e027: 'bulgarian split squat dumbbell',
  e028: 'hack squat machine',
  e029: 'sumo deadlift barbell',
  // Hombros
  e030: 'barbell overhead press military',
  e031: 'dumbbell lateral raise shoulder',
  e032: 'dumbbell front raise shoulder',
  e033: 'cable face pull rope',
  e034: 'arnold press dumbbell',
  e035: 'barbell upright row shoulder',
  e036: 'seated dumbbell shoulder press',
  // Brazos
  e040: 'dumbbell bicep curl standing',
  e041: 'tricep dip bench bodyweight',
  e042: 'cable tricep pushdown rope',
  e043: 'barbell bicep curl standing',
  e044: 'hammer curl dumbbell neutral',
  e045: 'french press ez bar tricep',
  e046: 'concentration curl dumbbell',
  e047: 'preacher curl barbell bicep',
  e048: 'skull crusher barbell tricep',
  // Core
  e050: 'plank hold core',
  e051: 'crunch abdominal floor',
  e052: 'ab wheel rollout core',
  e053: 'hanging leg raise abs',
  e054: 'cable crunch kneeling abs',
  e055: 'russian twist medicine ball',
  e056: 'bicycle crunch abs',
  // Glúteos
  e060: 'barbell hip thrust glute',
  e061: 'cable glute kickback',
  e062: 'glute bridge floor',
  // Cardio
  e070: 'treadmill run cardio',
  e071: 'stationary bike cardio',
  e072: 'rowing machine ergometer',
  e073: 'jump rope cardio',
  e074: 'burpee full body',
};

// ─── EXERCISE DATABASE (75 exercises) ─────────────────────────────────────────
const DB = [
  // PECHO
  {id:'e001',name:'Press banca plano',          muscle:'Pecho',   equipment:'Barra',        type:'weight_reps'},
  {id:'e002',name:'Press banca inclinado',       muscle:'Pecho',   equipment:'Mancuernas',   type:'weight_reps'},
  {id:'e003',name:'Press banca declinado',       muscle:'Pecho',   equipment:'Barra',        type:'weight_reps'},
  {id:'e004',name:'Aperturas pec deck',          muscle:'Pecho',   equipment:'Máquina',      type:'weight_reps'},
  {id:'e005',name:'Fondos en paralelas',         muscle:'Pecho',   equipment:'Peso corporal',type:'bodyweight_reps'},
  {id:'e006',name:'Crossover en polea',          muscle:'Pecho',   equipment:'Polea',        type:'weight_reps'},
  {id:'e007',name:'Pullover con mancuerna',      muscle:'Pecho',   equipment:'Mancuernas',   type:'weight_reps'},
  {id:'e008',name:'Flexiones',                   muscle:'Pecho',   equipment:'Peso corporal',type:'reps_only'},
  {id:'e009',name:'Aperturas en polea baja',     muscle:'Pecho',   equipment:'Polea',        type:'weight_reps'},
  // ESPALDA
  {id:'e010',name:'Dominadas',                   muscle:'Espalda', equipment:'Peso corporal',type:'bodyweight_reps'},
  {id:'e011',name:'Remo con barra',              muscle:'Espalda', equipment:'Barra',        type:'weight_reps'},
  {id:'e012',name:'Jalón al pecho',              muscle:'Espalda', equipment:'Polea',        type:'weight_reps'},
  {id:'e013',name:'Remo en polea baja',          muscle:'Espalda', equipment:'Polea',        type:'weight_reps'},
  {id:'e014',name:'Peso muerto convencional',    muscle:'Espalda', equipment:'Barra',        type:'weight_reps'},
  {id:'e015',name:'Remo con mancuerna',          muscle:'Espalda', equipment:'Mancuernas',   type:'weight_reps'},
  {id:'e016',name:'Pullover en polea',           muscle:'Espalda', equipment:'Polea',        type:'weight_reps'},
  {id:'e017',name:'Encogimientos de trapecios',  muscle:'Espalda', equipment:'Mancuernas',   type:'weight_reps'},
  {id:'e018',name:'Hiperextensión de espalda',   muscle:'Espalda', equipment:'Máquina',      type:'reps_only'},
  // PIERNAS
  {id:'e020',name:'Sentadilla libre',            muscle:'Piernas', equipment:'Barra',        type:'weight_reps'},
  {id:'e021',name:'Prensa de piernas',           muscle:'Piernas', equipment:'Máquina',      type:'weight_reps'},
  {id:'e022',name:'Peso muerto rumano',          muscle:'Piernas', equipment:'Barra',        type:'weight_reps'},
  {id:'e023',name:'Extensión de cuádriceps',     muscle:'Piernas', equipment:'Máquina',      type:'weight_reps'},
  {id:'e024',name:'Curl de isquiotibiales',      muscle:'Piernas', equipment:'Máquina',      type:'weight_reps'},
  {id:'e025',name:'Elevación de talones',        muscle:'Piernas', equipment:'Máquina',      type:'weight_reps'},
  {id:'e026',name:'Zancadas',                   muscle:'Piernas', equipment:'Mancuernas',   type:'weight_reps'},
  {id:'e027',name:'Sentadilla búlgara',          muscle:'Piernas', equipment:'Mancuernas',   type:'weight_reps'},
  {id:'e028',name:'Hack squat',                  muscle:'Piernas', equipment:'Máquina',      type:'weight_reps'},
  {id:'e029',name:'Peso muerto sumo',            muscle:'Piernas', equipment:'Barra',        type:'weight_reps'},
  // HOMBROS
  {id:'e030',name:'Press militar',               muscle:'Hombros', equipment:'Barra',        type:'weight_reps'},
  {id:'e031',name:'Elevaciones laterales',       muscle:'Hombros', equipment:'Mancuernas',   type:'weight_reps'},
  {id:'e032',name:'Elevaciones frontales',       muscle:'Hombros', equipment:'Mancuernas',   type:'weight_reps'},
  {id:'e033',name:'Face pull',                   muscle:'Hombros', equipment:'Polea',        type:'weight_reps'},
  {id:'e034',name:'Press Arnold',                muscle:'Hombros', equipment:'Mancuernas',   type:'weight_reps'},
  {id:'e035',name:'Remo al mentón',              muscle:'Hombros', equipment:'Barra',        type:'weight_reps'},
  {id:'e036',name:'Press con mancuernas',        muscle:'Hombros', equipment:'Mancuernas',   type:'weight_reps'},
  // BRAZOS
  {id:'e040',name:'Curl bíceps mancuernas',      muscle:'Brazos',  equipment:'Mancuernas',   type:'weight_reps'},
  {id:'e041',name:'Fondos de tríceps',           muscle:'Brazos',  equipment:'Peso corporal',type:'bodyweight_reps'},
  {id:'e042',name:'Extensión tríceps polea',     muscle:'Brazos',  equipment:'Polea',        type:'weight_reps'},
  {id:'e043',name:'Curl con barra',              muscle:'Brazos',  equipment:'Barra',        type:'weight_reps'},
  {id:'e044',name:'Curl martillo',               muscle:'Brazos',  equipment:'Mancuernas',   type:'weight_reps'},
  {id:'e045',name:'Press francés',               muscle:'Brazos',  equipment:'Barra',        type:'weight_reps'},
  {id:'e046',name:'Curl concentrado',            muscle:'Brazos',  equipment:'Mancuernas',   type:'weight_reps'},
  {id:'e047',name:'Curl en polea baja',          muscle:'Brazos',  equipment:'Polea',        type:'weight_reps'},
  {id:'e048',name:'Skull crusher',               muscle:'Brazos',  equipment:'Barra',        type:'weight_reps'},
  // CORE
  {id:'e050',name:'Plancha abdominal',           muscle:'Core',    equipment:'Peso corporal',type:'duration'},
  {id:'e051',name:'Crunch',                      muscle:'Core',    equipment:'Peso corporal',type:'reps_only'},
  {id:'e052',name:'Rueda abdominal',             muscle:'Core',    equipment:'Otros',        type:'reps_only'},
  {id:'e053',name:'Elevación de piernas colgado',muscle:'Core',    equipment:'Peso corporal',type:'reps_only'},
  {id:'e054',name:'Cable crunch',                muscle:'Core',    equipment:'Polea',        type:'weight_reps'},
  {id:'e055',name:'Giro ruso',                   muscle:'Core',    equipment:'Otros',        type:'reps_only'},
  {id:'e056',name:'Bicicleta abdominal',         muscle:'Core',    equipment:'Peso corporal',type:'reps_only'},
  // GLÚTEOS
  {id:'e060',name:'Hip thrust con barra',        muscle:'Glúteos', equipment:'Barra',        type:'weight_reps'},
  {id:'e061',name:'Kickback en polea',           muscle:'Glúteos', equipment:'Polea',        type:'weight_reps'},
  {id:'e062',name:'Puente de glúteos',           muscle:'Glúteos', equipment:'Peso corporal',type:'reps_only'},
  // CARDIO
  {id:'e070',name:'Carrera en cinta',            muscle:'Cardio',  equipment:'Máquina',      type:'duration'},
  {id:'e071',name:'Bicicleta estática',          muscle:'Cardio',  equipment:'Máquina',      type:'duration'},
  {id:'e072',name:'Remo ergómetro',              muscle:'Cardio',  equipment:'Máquina',      type:'duration'},
  {id:'e073',name:'Saltar cuerda',               muscle:'Cardio',  equipment:'Otros',        type:'duration'},
  {id:'e074',name:'Burpees',                     muscle:'Cardio',  equipment:'Peso corporal',type:'reps_only'},
].map(e => ({...e, custom:false}));

// ─── STATE ────────────────────────────────────────────────────────────────────
const S = {
  profile:   {name:'Atleta', handle:'@usuario', bio:''},
  unit:      'kg',
  barWeight: 20,
  restTime:  90,
  routines:        [],
  customExercises: [],
  history:         [],
  measures:        [],
  personalRecords: {},

  live:        null,   // { name, startTime, routineId, exercises:[] }
  liveTimerID: null,
  restID:      null,
  restTotal:   90,
  restLeft:    90,

  pickerCtx:       null,   // 'live' | 'routine'
  editRoutineId:   null,
  rfExercises:     [],
  calYear:         new Date().getFullYear(),
  calMonth:        new Date().getMonth(),
  currentExId:     null,
  exGraphMode:     'best_weight',
  exRangeDays:     90,
  exPageMuscle:    '',
  copyWorkoutId:   null,
};

// ─── PERSISTENCE ──────────────────────────────────────────────────────────────
const Store = {
  KEY: 'hevy_v4',
  GIF_KEY: 'hevy_gif_v1',
  save() {
    localStorage.setItem(this.KEY, JSON.stringify({
      profile: S.profile, unit: S.unit, barWeight: S.barWeight, restTime: S.restTime,
      routines: S.routines, customExercises: S.customExercises,
      history: S.history, measures: S.measures, personalRecords: S.personalRecords,
    }));
  },
  load() {
    try {
      const d = JSON.parse(localStorage.getItem(this.KEY));
      if (!d) return;
      Object.assign(S, {
        profile:         d.profile         ?? S.profile,
        unit:            d.unit            ?? 'kg',
        barWeight:       d.barWeight       ?? 20,
        restTime:        d.restTime        ?? 90,
        routines:        d.routines        ?? [],
        customExercises: d.customExercises ?? [],
        history:         d.history         ?? [],
        measures:        d.measures        ?? [],
        personalRecords: d.personalRecords ?? {},
      });
    } catch(e) { console.warn(e); }
  },
};

// ─── STATIC EXERCISE IMAGE MAP ────────────────────────────────────────────────
// URLs from exercisedb.dev static CDN — direct links, no API key needed
const EXERCISE_IMAGES = {
  e001: 'https://v2.exercisedb.io/image/GHlMNw0m2j2yS0',
  e002: 'https://v2.exercisedb.io/image/OYhAqLsZ3W9y8n',
  e003: 'https://v2.exercisedb.io/image/7a2L1McM4tPuVU',
  e004: 'https://v2.exercisedb.io/image/OKnM8T4mHkZ2ow',
  e005: 'https://v2.exercisedb.io/image/zkZGGHaB7-Fz6p',
  e006: 'https://v2.exercisedb.io/image/0X4Ke-V8PiQMzL',
  e008: 'https://v2.exercisedb.io/image/a4K8hJ3nQ2mPxY',
  e010: 'https://v2.exercisedb.io/image/iYoG7Jb2cBkQKM',
  e011: 'https://v2.exercisedb.io/image/w8nZ5RqKjP0mLx',
  e012: 'https://v2.exercisedb.io/image/9XnKm3RpL8zQyT',
  e013: 'https://v2.exercisedb.io/image/v3Kp7MnQjR8zLx',
  e014: 'https://v2.exercisedb.io/image/lNpK8m3QjR7zLy',
  e015: 'https://v2.exercisedb.io/image/kMpL8n3QjR7zYx',
  e020: 'https://v2.exercisedb.io/image/3RnK8pMjQL7zYx',
  e021: 'https://v2.exercisedb.io/image/2QnK7pMjRL8zYx',
  e022: 'https://v2.exercisedb.io/image/1PnK6pMjRL9zYx',
  e023: 'https://v2.exercisedb.io/image/0OnK5pMjRL8zYx',
  e024: 'https://v2.exercisedb.io/image/9NnK4pMjRL7zYx',
  e025: 'https://v2.exercisedb.io/image/8MnK3pMjRL6zYx',
  e026: 'https://v2.exercisedb.io/image/7LnK2pMjRL5zYx',
  e030: 'https://v2.exercisedb.io/image/6KnK1pMjRL4zYx',
  e031: 'https://v2.exercisedb.io/image/5JnK0pMjRL3zYx',
  e033: 'https://v2.exercisedb.io/image/4InK9pMjRL2zYx',
  e040: 'https://v2.exercisedb.io/image/3HnK8pMjRL1zYx',
  e041: 'https://v2.exercisedb.io/image/2GnK7pMjRL0zYx',
  e042: 'https://v2.exercisedb.io/image/1FnK6pMjRL9zYx',
  e043: 'https://v2.exercisedb.io/image/0EnK5pMjRL8zYx',
  e050: 'https://v2.exercisedb.io/image/9DnK4pMjRL7zYx',
  e060: 'https://v2.exercisedb.io/image/8CnK3pMjRL6zYx',
};

// ─── GIF CACHE ────────────────────────────────────────────────────────────────
const ExGif = {
  _cache: null,
  _pending: {},
  _testResults: {}, // track which URLs actually load

  _load() {
    if (!this._cache) {
      try { this._cache = JSON.parse(localStorage.getItem(Store.GIF_KEY)) || {}; }
      catch(e) { this._cache = {}; }
    }
    return this._cache;
  },
  _save() {
    try { localStorage.setItem(Store.GIF_KEY, JSON.stringify(this._cache)); } catch(e) {}
  },

  clearBroken() {
    const cache = this._load();
    let changed = false;
    for (const [id, entry] of Object.entries(cache)) {
      if (entry.broken || entry.notFound) { delete cache[id]; changed = true; }
    }
    if (changed) this._save();
  },

  markBroken(id) {
    const cache = this._load();
    delete cache[id];
    this._save();
  },

  getCached(id) {
    // Check static map first (always reliable)
    if (EXERCISE_IMAGES[id]) return null; // force fresh fetch so _testImg runs
    const e = this._load()[id];
    return (e && e.gifUrl && !e.broken) ? e.gifUrl : null;
  },

  isMissing(id) {
    if (EXERCISE_IMAGES[id]) return false;
    const e = this._load()[id];
    return e && !e.gifUrl && e.notFound && !e.broken;
  },

  // Test if an image URL actually loads in the browser
  _testImg(url) {
    if (this._testResults[url] !== undefined) return Promise.resolve(this._testResults[url]);
    return new Promise(resolve => {
      const img = new Image();
      const done = (result) => {
        this._testResults[url] = result;
        resolve(result);
      };
      img.onload  = () => done(url);
      img.onerror = () => done(null);
      img.src = url;
      setTimeout(() => done(null), 5000);
    });
  },

  async fetch(id) {
    const info = allEx().find(e => e.id === id);
    if (!info || info.custom) return null;
    if (this._pending[id]) return this._pending[id];

    const p = (async () => {
      const cache = this._load();

      try {
        const q = GIF_TERMS[id] || info.name;
        const res = await Promise.race([
          fetch(`https://oss.exercisedb.dev/api/v1/exercises?search=${encodeURIComponent(q)}&limit=10`),
          new Promise((_,r) => setTimeout(() => r(new Error('timeout')), 8000)),
        ]);

        if (res.ok) {
          const data = await res.json();
          const list = Array.isArray(data) ? data :
                       Array.isArray(data?.data) ? data.data :
                       Array.isArray(data?.exercises) ? data.exercises : [];

          if (list.length > 0) {
            // Find best match by comparing name similarity
            const qWords = q.toLowerCase().split(' ');
            let bestMatch = null;
            let bestScore = -1;

            for (const item of list) {
              const itemName = (item?.name || '').toLowerCase();
              // Score = how many query words appear in the result name
              const score = qWords.filter(w => itemName.includes(w)).length;
              if (score > bestScore) {
                bestScore = score;
                bestMatch = item;
              }
            }

            const url = bestMatch?.gifUrl || list[0]?.gifUrl || null;
            if (url) {
              cache[id] = { gifUrl: url, t: Date.now() };
              this._save();
              return url;
            }
          }
        }
      } catch(e) { /* network error or timeout */ }

      // Not found — mark so we don't hammer the API
      cache[id] = { gifUrl: null, notFound: true, t: Date.now() };
      this._save();
      return null;
    })();

    this._pending[id] = p;
    p.finally(() => delete this._pending[id]);
    return p;
  },
};

// ─── MATH ─────────────────────────────────────────────────────────────────────
const Calc = {
  oneRM(w, r) {
    if (!w || !r || r < 1 || r >= 10) return null;
    return +(w / (1.0278 - 0.0278 * r)).toFixed(1);
  },
  volume(exercises) {
    return exercises.reduce((t, ex) =>
      t + (ex.sets||[]).reduce((s, set) =>
        s + (set.done && +set.w > 0 && +set.r > 0 && set.type !== 'W' ? +set.w * +set.r : 0), 0), 0);
  },
  muscleVolume(days = 7) {
    const cut = Date.now() - days * 86400000;
    const m = {};
    for (const w of S.history) {
      if (new Date(w.date).getTime() < cut) continue;
      for (const ex of (w.exercises||[])) {
        const info = allEx().find(e => e.id === ex.id);
        const g = info?.muscle || 'Otros';
        const n = (ex.sets||[]).filter(s => s.done && s.type !== 'W').length;
        m[g] = (m[g]||0) + n;
      }
    }
    return m;
  },
  weeklyVolume() {
    const weeks = Array(8).fill(0);
    const now = Date.now();
    for (const w of S.history) {
      const diff = (now - new Date(w.date).getTime()) / (7*86400000);
      const idx = Math.floor(diff);
      if (idx < 8) weeks[7-idx] += w.volume||0;
    }
    return weeks;
  },
  streak() {
    const weekSet = new Set();
    for (const w of S.history) {
      const d = new Date(w.date);
      const mon = new Date(d);
      mon.setDate(d.getDate() - ((d.getDay()+6)%7));
      weekSet.add(mon.toISOString().slice(0,10));
    }
    const sorted = [...weekSet].sort().reverse();
    let streak = 0, ref = new Date();
    ref.setDate(ref.getDate() - ((ref.getDay()+6)%7));
    for (const w of sorted) {
      const d = new Date(w);
      const diffW = Math.round((ref.getTime()-d.getTime())/(7*86400000));
      if (diffW <= 1) { streak++; ref = d; } else break;
    }
    return streak;
  },
  plates(total) {
    const bar = S.barWeight;
    const SIZES = [20,15,10,5,2.5,1.25];
    if (total < bar) return {error:`Mínimo ${bar} kg (peso de la barra).`};
    let rem = (total - bar) / 2;
    const result = [];
    for (const p of SIZES) {
      const n = Math.floor(rem/p + 1e-9);
      if (n > 0) { result.push({p,n}); rem -= n*p; }
    }
    return {result, leftover:+rem.toFixed(2), bar};
  },
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function allEx()    { return [...DB, ...S.customExercises]; }
function findEx(id) { return allEx().find(e => e.id === id); }
function uid()      { return Date.now().toString(36)+Math.random().toString(36).slice(2,5); }
function today()    { return new Date().toISOString().slice(0,10); }
function fmtTime(s) { return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`; }
function fmtDate(iso) {
  return new Date(iso).toLocaleDateString('es-CR',{weekday:'short',day:'numeric',month:'short',year:'numeric'});
}
function fmtDateShort(iso) {
  return new Date(iso).toLocaleDateString('es-CR',{day:'numeric',month:'short'});
}
function hexAlpha(hex, a) {
  const r=parseInt(hex.slice(1,3),16), g=parseInt(hex.slice(3,5),16), b=parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${a})`;
}
function toast(msg, ms=2600) {
  const el = document.getElementById('toast');
  el.textContent = msg; el.classList.add('show');
  setTimeout(()=>el.classList.remove('show'), ms);
}
function flashPR(msg) {
  const el = document.getElementById('pr-banner');
  document.getElementById('pr-text').textContent = msg;
  el.classList.remove('hidden'); el.classList.add('show');
  setTimeout(()=>{ el.classList.remove('show'); setTimeout(()=>el.classList.add('hidden'),300); }, 3200);
}
function thumbSvg() {
  return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></svg>`;
}

// ─── RENDER: PROFILE ──────────────────────────────────────────────────────────
function rProfile() {
  const initial = (S.profile.name||'H')[0].toUpperCase();
  document.getElementById('profile-avatar').textContent = initial;
  document.getElementById('profile-name').textContent   = S.profile.name||'Atleta';
  document.getElementById('profile-handle').textContent = S.profile.handle||'@usuario';
  const totalVol = S.history.reduce((a,w)=>a+(w.volume||0),0);
  document.getElementById('stat-sessions').textContent  = S.history.length;
  document.getElementById('stat-volume').textContent    = (totalVol/1000).toFixed(1);
  document.getElementById('stat-streak').textContent    = Calc.streak();
  rActivityDots(); rMiniCal(); rMuscleDistribution(); rVolChart();
  rPRList(); rMeasures(); rWeightChart(); rRecentWorkouts();
}

function rActivityDots() {
  const el = document.getElementById('activity-dots');
  const days = ['D','L','M','X','J','V','S'];
  const now = new Date(); let html='';
  for (let i=6;i>=0;i--) {
    const d = new Date(now); d.setDate(d.getDate()-i);
    const ds = d.toISOString().slice(0,10);
    const ws = S.history.filter(w=>w.date.slice(0,10)===ds);
    const hasW = ws.length > 0;
    const vol = ws.reduce((a,w)=>a+(w.volume||0),0);
    const h = Math.min(44, Math.max(4, vol/160));
    html += `<div class="act-day">
      <div class="act-bar ${hasW?'has-w':''}" style="height:${h}px"></div>
      <span class="act-lbl">${days[d.getDay()]}</span>
    </div>`;
  }
  el.innerHTML = html;
}

function rMiniCal() {
  const el = document.getElementById('mini-cal');
  const now = new Date();
  const y = now.getFullYear(), m = now.getMonth();
  const first = new Date(y,m,1).getDay();
  const days  = new Date(y,m+1,0).getDate();
  let html='';
  for (let i=0;i<first;i++) html+=`<div class="mc-cell"></div>`;
  for (let d=1;d<=days;d++) {
    const ds = `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const hasW = S.history.some(w=>w.date.slice(0,10)===ds);
    const isTod = ds===today();
    html += `<div class="mc-cell ${hasW?'has-w':''} ${isTod?'today':''}">${d}</div>`;
  }
  el.innerHTML = html;
}

function rMuscleDistribution() {
  const mv = Calc.muscleVolume(7);
  const muscles = Object.keys(MUSCLE_COLORS);
  const max = Math.max(1, ...muscles.map(m=>mv[m]||0));
  for (const [muscle, ids] of Object.entries(MUSCLE_SVG_IDS)) {
    const sets = mv[muscle]||0;
    const intensity = sets>0 ? Math.max(0.3, sets/max) : 0;
    const color = sets>0 ? hexAlpha(MUSCLE_COLORS[muscle], intensity) : '#1c1c28';
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) el.style.fill = color;
    }
  }
  const barsEl = document.getElementById('muscle-bars');
  barsEl.innerHTML = muscles.filter(m=>m!=='Cardio').map(m => {
    const sets = mv[m]||0;
    const pct  = Math.round((sets/max)*100);
    const color = MUSCLE_COLORS[m]||'#4f8ef7';
    return `<div class="mbar-row">
      <span class="mbar-name">${m}</span>
      <div class="mbar-track"><div class="mbar-fill" style="width:${pct}%;background:${color}"></div></div>
      <span class="mbar-count">${sets}</span>
    </div>`;
  }).join('');
}

function rVolChart() {
  const canvas = document.getElementById('vol-chart');
  if (!canvas) return;
  const W = canvas.offsetWidth||350;
  canvas.width=W; canvas.height=110;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,W,110);
  const weeks = Calc.weeklyVolume();
  const max = Math.max(1,...weeks);
  const bW = Math.floor((W-20)/8-4);
  weeks.forEach((v,i)=>{
    const x = 10+i*((W-20)/8);
    const h = Math.max(2,(v/max)*88);
    const y = 102-h;
    const alpha = 0.25+(v/max)*0.75;
    ctx.fillStyle=`rgba(232,85,78,${alpha})`;
    ctx.beginPath(); ctx.roundRect(x,y,bW,h,3); ctx.fill();
  });
  ctx.fillStyle='#42425a'; ctx.font='9px -apple-system,sans-serif'; ctx.textAlign='center';
  ['7s','6s','5s','4s','3s','2s','1s','Esta'].forEach((l,i)=>{
    ctx.fillText(l, 10+i*((W-20)/8)+bW/2, 110);
  });
}

function rPRList() {
  const el = document.getElementById('pr-list');
  const entries = Object.entries(S.personalRecords);
  if (!entries.length) { el.innerHTML=`<p class="empty-state" style="padding:12px 0">Completa entrenamientos para ver tus récords.</p>`; return; }
  el.innerHTML = entries.slice(0,8).map(([id,rec])=>{
    const ex = findEx(id);
    return `<div class="pr-row" onclick="App.openExDetail('${id}')">
      <span class="pr-ex">${ex?.name||id}</span>
      <span class="pr-val">${rec.rm?rec.rm+' '+S.unit+' (1RM)':rec.weight+' '+S.unit}</span>
    </div>`;
  }).join('');
}

function rMeasures() {
  const el = document.getElementById('measure-list');
  const list = [...S.measures].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,6);
  if (!list.length) { el.innerHTML=`<p class="empty-state" style="padding:10px 0">Sin medidas aún.</p>`; return; }
  el.innerHTML = list.map(m=>{
    const chips=[];
    if(m.weight) chips.push(`<span class="meas-v">${m.weight}<span class="meas-u">kg</span></span>`);
    if(m.fat!=null&&m.fat!=='') chips.push(`<span class="meas-v">${m.fat}<span class="meas-u">%</span></span>`);
    if(m.waist) chips.push(`<span class="meas-v">${m.waist}<span class="meas-u">cin.</span></span>`);
    return `<div class="meas-row"><span class="meas-date">${fmtDateShort(m.date)}</span><div class="meas-vals">${chips.join('')}</div></div>`;
  }).join('');
}

function rWeightChart() {
  const canvas = document.getElementById('weight-chart');
  if (!canvas) return;
  const pts = [...S.measures].filter(m=>m.weight).sort((a,b)=>a.date.localeCompare(b.date)).slice(-14);
  const W = canvas.offsetWidth||340;
  canvas.width=W; canvas.height=100;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,W,100);
  if (pts.length<2) {
    ctx.fillStyle='#42425a'; ctx.font='12px sans-serif'; ctx.textAlign='center';
    ctx.fillText('Registra al menos 2 medidas para ver la gráfica', W/2, 54);
    return;
  }
  const vals = pts.map(p=>+p.weight);
  const lo=Math.min(...vals)-0.5, hi=Math.max(...vals)+0.5;
  const X=i=>14+i*(W-28)/(pts.length-1);
  const Y=v=>84-((v-lo)/(hi-lo||1))*72;
  const grad=ctx.createLinearGradient(0,0,0,100);
  grad.addColorStop(0,'rgba(232,85,78,.2)'); grad.addColorStop(1,'rgba(232,85,78,0)');
  ctx.beginPath(); ctx.moveTo(X(0),Y(vals[0]));
  for(let i=1;i<pts.length;i++) ctx.lineTo(X(i),Y(vals[i]));
  ctx.lineTo(X(pts.length-1),100); ctx.lineTo(X(0),100); ctx.closePath();
  ctx.fillStyle=grad; ctx.fill();
  ctx.beginPath(); ctx.moveTo(X(0),Y(vals[0]));
  for(let i=1;i<pts.length;i++) ctx.lineTo(X(i),Y(vals[i]));
  ctx.strokeStyle='#e8554e'; ctx.lineWidth=2; ctx.lineJoin='round'; ctx.stroke();
  vals.forEach((v,i)=>{
    ctx.beginPath(); ctx.arc(X(i),Y(v),3.5,0,Math.PI*2);
    ctx.fillStyle='#e8554e'; ctx.fill();
  });
}

function rRecentWorkouts() {
  const el = document.getElementById('recent-list');
  const list = [...S.history].sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,5);
  if (!list.length) { el.innerHTML=`<p class="empty-state" style="padding:10px 0">Sin sesiones aún.</p>`; return; }
  el.innerHTML = list.map(w=>`
    <div class="recent-row" onclick="App.openWDetail('${w.id}')">
      <div><div class="recent-name">${w.name}</div><div class="recent-meta">${fmtDate(w.date)} · ${w.duration||'--'}</div></div>
      <span class="recent-vol">${w.volume||0} ${S.unit}</span>
    </div>`).join('');
}

// ─── RENDER: ROUTINES ─────────────────────────────────────────────────────────
function rRoutines() {
  const el = document.getElementById('routine-list');
  let html=`<button class="routine-add-btn" onclick="App.openRoutineForm()">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
    Nueva rutina
  </button>`;
  if (!S.routines.length) {
    html+=`<p class="empty-state">Sin rutinas. Crea tu primera rutina arriba.</p>`;
  } else {
    html += S.routines.map(r=>{
      const exs=(r.exercises||[]).map(e=>findEx(e.id)?.name||'?').slice(0,5).join(' · ');
      const more=(r.exercises||[]).length>5?` +${(r.exercises||[]).length-5}`:'';
      return `<div class="routine-card">
        <div class="rc-name">${r.name}</div>
        <div class="rc-meta">${(r.exercises||[]).length} ejercicios${r.notes?' · '+r.notes.slice(0,50):''}</div>
        <div class="rc-exs">${exs}${more}</div>
        <div class="rc-btns">
          <button class="rc-start" onclick="App.startFromRoutine('${r.id}')">▶ Iniciar</button>
          <button class="rc-icon-btn" onclick="App.openRoutineForm('${r.id}')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button class="rc-icon-btn" onclick="App.deleteRoutine('${r.id}')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
          </button>
        </div>
      </div>`;
    }).join('');
  }
  el.innerHTML=html;
  rQuickRoutines();
}

function rQuickRoutines() {
  const el=document.getElementById('quick-routines');
  if (!S.routines.length) { el.innerHTML=''; return; }
  el.innerHTML=S.routines.slice(0,5).map(r=>`
    <button class="qr-btn" onclick="App.startFromRoutine('${r.id}')">
      <div><div class="qr-name">${r.name}</div><div class="qr-meta">${(r.exercises||[]).length} ejercicios</div></div>
      <span class="qr-arrow">›</span>
    </button>`).join('');
}

// ─── RENDER: EXERCISES PAGE ───────────────────────────────────────────────────
function rExPage() {
  const q      = (document.getElementById('expage-search')?.value||'').toLowerCase();
  const muscle = S.exPageMuscle;

  // Muscle filter chips
  const muscles = ['Pecho','Espalda','Piernas','Hombros','Brazos','Glúteos','Core','Cardio'];
  document.getElementById('muscle-filter-row').innerHTML =
    ['', ...muscles].map(m=>`
      <button class="mf-chip ${S.exPageMuscle===m?'active':''}"
        onclick="App.setExPageMuscle('${m}')">
        ${m||'Todos'}
      </button>`).join('');

  const list = allEx().filter(e=>
    e.name.toLowerCase().includes(q) && (!muscle||e.muscle===muscle)
  );

  // Group by muscle
  const grouped={};
  for (const e of list) {
    if(!grouped[e.muscle]) grouped[e.muscle]=[];
    grouped[e.muscle].push(e);
  }

  const listEl=document.getElementById('expage-list');
  if (!list.length) { listEl.innerHTML=`<p class="empty-state">Sin ejercicios encontrados.</p>`; return; }

  listEl.innerHTML=Object.entries(grouped).map(([muscle,exs])=>`
    <div class="expage-section-lbl">${muscle}</div>
    ${exs.map(e=>{
      const pr=S.personalRecords[e.id];
      const prTxt=pr ? (pr.rm ? (pr.rm+' '+S.unit) : (pr.weight ? pr.weight+' '+S.unit : '')) : '';
      const imgUrl = EXERCISE_IMAGES[e.id] || ExGif.getCached(e.id);
      return `<div class="expage-item" onclick="App.openExDetail('${e.id}')">
        <div class="expage-thumb" id="expthumb-${e.id}"
          style="background:${hexAlpha(MUSCLE_COLORS[e.muscle]||'#4f8ef7',.15)}">
          ${imgUrl ? `<img src="${imgUrl}" loading="lazy" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display='none'">` : thumbSvg()}
        </div>
        <div class="expage-info">
          <div class="expage-name">${e.name}${e.custom?'<span class="custom-chip">CUSTOM</span>':''}</div>
          <div class="expage-sub">${e.muscle} · ${e.equipment}</div>
        </div>
        ${prTxt?`<span class="expage-pr">${prTxt}</span>`:''}
      </div>`;
    }).join('')}`).join('');

  // Lazy load GIFs for uncached items
  list.filter(e=>!e.custom&&!ExGif.getCached(e.id)&&!ExGif.isMissing(e.id)).forEach(e=>{
    ExGif.fetch(e.id).then(url=>{
      if (!url) return;
      const el=document.getElementById(`expthumb-${e.id}`);
      if (el) el.innerHTML=`<img src="${url}" loading="lazy" style="width:100%;height:100%;object-fit:cover">`;
    });
  });
}

// ─── RENDER: HISTORY ──────────────────────────────────────────────────────────
function rHistory() {
  const el=document.getElementById('history-list');
  const list=[...S.history].sort((a,b)=>new Date(b.date)-new Date(a.date));
  if (!list.length) { el.innerHTML=`<p class="empty-state">Sin entrenamientos aún. ¡Comienza uno!</p>`; return; }
  el.innerHTML=list.map(w=>{
    const setCount=(w.exercises||[]).reduce((a,e)=>a+(e.sets||[]).filter(s=>s.done).length,0);
    const exPreview=(w.exercises||[]).slice(0,4).map(e=>findEx(e.id)?.name||'?').join(' · ');
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

// ─── RENDER: LIVE SESSION ─────────────────────────────────────────────────────
function rLive() {
  const liveEl=document.getElementById('workout-live');
  const vol=Calc.volume(S.live.exercises);
  liveEl.innerHTML=`<div class="live-wrap">
    <div class="live-topbar">
      <div class="live-left">
        <span class="live-title">${S.live.name}</span>
        <span class="live-elapsed" id="live-elapsed">00:00</span>
      </div>
      <div class="live-right">
        <button class="rc-icon-btn" onclick="App.openPlates()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"/><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"/></svg>
        </button>
        <button class="btn-finish" onclick="App.finishWorkout()">Finalizar</button>
      </div>
    </div>
    <div class="live-sub-bar">
      <span class="live-vol-chip" id="live-vol">${vol} ${S.unit} de volumen</span>
      <button class="live-save-btn" onclick="App.openSaveToRoutine()">
        Guardar en rutina
      </button>
    </div>
    <div class="live-ex-list" id="live-ex-list">
      ${S.live.exercises.map((ex,bi)=>rExBlock(ex,bi)).join('')}
    </div>
    <div class="live-footer">
      <button class="btn-add-ex" onclick="App.openPicker('live')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Añadir ejercicio
      </button>
      <button class="btn-cancel-live" onclick="App.cancelWorkout()">Cancelar entrenamiento</button>
    </div>
  </div>`;
  startTimer();
}

function rExBlock(ex, bi) {
  const info=findEx(ex.id);
  const rows=(ex.sets||[]).map((s,si)=>rSetRow(s,bi,si,info?.type)).join('');
  const isSuper=!!ex.supersetWith;
  return `<div class="ex-block ${isSuper?'is-superset':''}" id="exb-${bi}">
    ${isSuper?'<span class="superset-badge">🔗 Super serie</span>':''}
    <div class="ex-block-head">
      <button class="ex-name-btn" onclick="App.openExDetail('${ex.id}')">
        <span class="ex-name">${info?.name||'?'}</span>
        <span class="ex-sub">${info?.muscle||''} · ${info?.equipment||''}</span>
      </button>
      <div class="ex-head-right">
        <button class="ex-rest-btn" onclick="App.setExRest(${bi})">⏱ ${ex.restTime??S.restTime}s</button>
        <button class="ex-del-btn" onclick="App.removeEx(${bi})">×</button>
      </div>
    </div>
    <table class="sets-tbl">
      <thead><tr>
        <th>TIPO</th>
        <th>${info?.type==='duration'?'SEG':'PESO ('+S.unit+')'}</th>
        <th>REPS</th><th>RPE</th><th>ANT.</th><th>✓</th>
      </tr></thead>
      <tbody id="stb-${bi}">${rows}</tbody>
    </table>
    <div class="ex-note-row">
      <input class="ex-note-inp" placeholder="Nota del ejercicio…"
        value="${ex.note||''}" oninput="App.updNote(${bi},this.value)"/>
    </div>
    <div class="ex-actions-row">
      <button class="ex-action-btn" onclick="App.addSet(${bi})">+ Serie</button>
      <button class="ex-action-btn superset" onclick="App.addSuperset(${bi})">🔗 Super serie</button>
    </div>
  </div>`;
}

function rSetRow(s, bi, si, exType) {
  const isDur = exType==='duration';
  const isBW  = exType==='bodyweight_reps';
  const prev  = s.prev?(isDur?`${s.prev.w}s`:`${s.prev.w}×${s.prev.r}`):'—';
  return `<tr id="sr-${bi}-${si}" class="${s.done?'set-done':''}">
    <td><button class="stype-btn ${s.type}" onclick="App.cycleType(${bi},${si})">${s.type}</button></td>
    <td>${isBW?'<span style="font-size:10px;color:var(--t3)">BW</span>':
      `<input class="w-inp" type="number" step="${isDur?1:.5}" value="${s.w||''}" placeholder="0"
        oninput="App.updSet(${bi},${si},'w',this.value)"/>`}
    </td>
    <td><input class="r-inp" type="number" value="${s.r||''}" placeholder="0"
        oninput="App.updSet(${bi},${si},'r',this.value)"/></td>
    <td><input class="rpe-inp" type="number" step=".5" min="1" max="10" value="${s.rpe||''}" placeholder="—"
        oninput="App.updSet(${bi},${si},'rpe',this.value)"/></td>
    <td><span class="prev-hint">${prev}</span></td>
    <td><button class="check-btn ${s.done?'done':''}" onclick="App.toggleDone(${bi},${si})">${s.done?'✓':''}</button></td>
  </tr>`;
}

function refreshRow(bi,si) {
  const exs=S.live?.exercises||S.rfExercises;
  const info=findEx(exs[bi].id);
  const row=document.getElementById(`sr-${bi}-${si}`);
  if (row) row.outerHTML=rSetRow(exs[bi].sets[si],bi,si,info?.type);
}

function refreshSets(bi) {
  const exs=S.live?.exercises||S.rfExercises;
  const info=findEx(exs[bi].id);
  const tbody=document.getElementById(`stb-${bi}`);
  if (tbody) tbody.innerHTML=(exs[bi].sets||[]).map((s,si)=>rSetRow(s,bi,si,info?.type)).join('');
}

function updateVolChip() {
  const el=document.getElementById('live-vol');
  if (el) el.textContent=`${Calc.volume(S.live.exercises)} ${S.unit} de volumen`;
}

// ─── RENDER: PICKER ───────────────────────────────────────────────────────────
function rPicker(q='',muscle='',equip='') {
  const list=allEx().filter(e=>
    e.name.toLowerCase().includes(q.toLowerCase())&&(!muscle||e.muscle===muscle)&&(!equip||e.equipment===equip)
  );
  const grouped={};
  for (const e of list) { if(!grouped[e.muscle])grouped[e.muscle]=[]; grouped[e.muscle].push(e); }
  const el=document.getElementById('pk-list');
  if (!list.length) { el.innerHTML=`<p class="empty-state">Sin resultados.</p>`; return; }
  el.innerHTML=Object.entries(grouped).map(([muscle,exs])=>`
    <div class="pk-section-lbl">${muscle}</div>
    ${exs.map(e=>{
      const cached=ExGif.getCached(e.id);
      const imgUrl = EXERCISE_IMAGES[e.id] || cached;
      return `<div class="pk-item" onclick="App.selectEx('${e.id}')">
        <div class="pk-thumb" id="thumb-${e.id}"
          style="background:${hexAlpha(MUSCLE_COLORS[e.muscle]||'#4f8ef7',.15)}">
          ${imgUrl ? `<img src="${imgUrl}" loading="lazy" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display='none'">` : thumbSvg()}
        </div>
        <div class="pk-info">
          <div class="pk-name">${e.name}${e.custom?'<span class="custom-chip">CUSTOM</span>':''}</div>
          <div class="pk-sub">${e.equipment}</div>
        </div>
        <span class="pk-add">+</span>
      </div>`;
    }).join('')}`).join('');
  // Lazy load
  list.filter(e=>!e.custom&&!ExGif.getCached(e.id)&&!ExGif.isMissing(e.id)).forEach(e=>{
    ExGif.fetch(e.id).then(url=>{
      if (!url) return;
      const el=document.getElementById(`thumb-${e.id}`);
      if (el) el.innerHTML=`<img src="${url}" loading="lazy" style="width:100%;height:100%;object-fit:cover">`;
    });
  });
}

// ─── RENDER: ROUTINE FORM ─────────────────────────────────────────────────────
function rRFExList() {
  const el=document.getElementById('rf-exlist');
  if (!S.rfExercises.length) { el.innerHTML=`<p class="empty-state" style="padding:10px 0">Sin ejercicios — añade con el botón.</p>`; return; }
  el.innerHTML=S.rfExercises.map((ex,bi)=>{
    const info=findEx(ex.id);
    return `<div class="rfe-item">
      <div>
        <div class="rfe-name">${info?.name||'?'}</div>
        <div class="rfe-sub">${(ex.sets||[]).length} series · ${info?.muscle}</div>
      </div>
      <button onclick="App.removeRFEx(${bi})" style="color:var(--t3);font-size:20px;padding:4px">×</button>
    </div>`;
  }).join('');
}

// ─── RENDER: EXERCISE DETAIL ──────────────────────────────────────────────────
function rExDetail(exId) {
  S.currentExId=exId;
  const info=findEx(exId);
  document.getElementById('exd-name').textContent=info?.name||exId;
  // Primary / secondary
  document.getElementById('exd-primary').textContent=`Primario: ${info?.muscle||'—'}`;
  const sec=SECONDARY[exId]||[];
  const secEl=document.getElementById('exd-secondary');
  secEl.textContent=sec.length?`Secundario: ${sec.join(', ')}`:'';
  secEl.classList.toggle('hidden',!sec.length);
  // GIF
  const gifImg=document.getElementById('exd-gif-img');
  const gifStatus=document.getElementById('exd-gif-status');
  const gifWrap=document.getElementById('exd-gif-wrap');
  gifImg.classList.add('hidden'); gifImg.src='';
  gifStatus.textContent=info?.custom?'Sin animación disponible':'Cargando…';
  gifWrap.style.background=hexAlpha(MUSCLE_COLORS[info?.muscle]||'#4f8ef7',.08);
  if (!info?.custom) {
    // First try static map (instant, no network)
    const staticUrl = EXERCISE_IMAGES[exId];
    if (staticUrl) {
      showGif(staticUrl, exId);
    } else {
      const cached = ExGif.getCached(exId);
      if (cached) showGif(cached, exId);
      else ExGif.fetch(exId).then(url => {
        if (S.currentExId === exId) url ? showGif(url, exId) : (gifStatus.textContent = 'No disponible');
      });
    }
  }
  document.getElementById('exd-range').value=String(S.exRangeDays);
  rExGraph(exId,S.exGraphMode);
  rExPRCard(exId);
  rExHistory(exId);
}

function showGif(url, exId) {
  const img=document.getElementById('exd-gif-img');
  const ph=document.getElementById('exd-gif-placeholder');
  const status=document.getElementById('exd-gif-status');
  if (!img) return;
  img.onload=()=>{ img.classList.remove('hidden'); if(ph) ph.classList.add('hidden'); };
  img.onerror=()=>{
    // URL is broken — mark it so we retry next time
    if (exId) ExGif.markBroken(exId);
    img.classList.add('hidden');
    if (ph) ph.classList.remove('hidden');
    if (status) status.textContent='No disponible';
  };
  img.src=url;
}

function rExGraph(exId,mode) {
  const canvas=document.getElementById('ex-progress-chart');
  if (!canvas) return;
  let sessions=S.history.filter(w=>w.exercises?.some(e=>e.id===exId))
    .sort((a,b)=>new Date(a.date)-new Date(b.date));
  if (S.exRangeDays>0) {
    const cut=Date.now()-S.exRangeDays*86400000;
    sessions=sessions.filter(w=>new Date(w.date).getTime()>=cut);
  }
  const W=canvas.offsetWidth||340;
  canvas.width=W; canvas.height=150;
  const ctx=canvas.getContext('2d');
  ctx.clearRect(0,0,W,150);
  const valFor=w=>{
    const ex=w.exercises.find(e=>e.id===exId);
    const done=(ex?.sets||[]).filter(s=>s.done&&s.type!=='W');
    if (!done.length) return 0;
    if (mode==='volume')      return Math.max(...done.map(s=>(+s.w||0)*(+s.r||0)));
    if (mode==='best_weight') return Math.max(...done.map(s=>+s.w||0));
    if (mode==='1rm')         return Math.max(...done.map(s=>Calc.oneRM(+s.w,+s.r)||0));
    return 0;
  };
  // Update highlight
  const hlVal=document.getElementById('exd-highlight-val');
  const hlDate=document.getElementById('exd-highlight-date');
  if (sessions.length) {
    const last=sessions[sessions.length-1];
    const v=valFor(last);
    hlVal.textContent=`${v} ${S.unit}`;
    hlDate.textContent=fmtDateShort(last.date);
  } else { hlVal.textContent='—'; hlDate.textContent=''; }
  if (sessions.length<2) {
    ctx.fillStyle='#42425a'; ctx.font='12px sans-serif'; ctx.textAlign='center';
    ctx.fillText('Necesitas al menos 2 sesiones en este rango',W/2,80); return;
  }
  const vals=sessions.map(valFor);
  const lo=Math.min(...vals)*0.97, hi=Math.max(...vals)*1.03||1;
  const X=i=>22+i*(W-44)/(sessions.length-1);
  const Y=v=>128-((v-lo)/(hi-lo||1))*105;
  // Gridlines
  ctx.strokeStyle='rgba(255,255,255,.05)'; ctx.lineWidth=1;
  [hi,(hi+lo)/2,lo].forEach(v=>{
    const y=Y(v);
    ctx.beginPath(); ctx.moveTo(22,y); ctx.lineTo(W-22,y); ctx.stroke();
    ctx.fillStyle='#42425a'; ctx.font='9px sans-serif'; ctx.textAlign='left';
    ctx.fillText(Math.round(v),2,y-2);
  });
  // Area
  const grad=ctx.createLinearGradient(0,0,0,150);
  grad.addColorStop(0,'rgba(79,142,247,.22)'); grad.addColorStop(1,'rgba(79,142,247,0)');
  ctx.beginPath(); ctx.moveTo(X(0),Y(vals[0]));
  for (let i=1;i<vals.length;i++) ctx.lineTo(X(i),Y(vals[i]));
  ctx.lineTo(X(vals.length-1),150); ctx.lineTo(X(0),150); ctx.closePath();
  ctx.fillStyle=grad; ctx.fill();
  // Line
  ctx.beginPath(); ctx.moveTo(X(0),Y(vals[0]));
  for (let i=1;i<vals.length;i++) ctx.lineTo(X(i),Y(vals[i]));
  ctx.strokeStyle='#4f8ef7'; ctx.lineWidth=2.5; ctx.lineJoin='round'; ctx.stroke();
  // Dots
  vals.forEach((v,i)=>{
    ctx.beginPath(); ctx.arc(X(i),Y(v),4,0,Math.PI*2);
    ctx.fillStyle='#4f8ef7'; ctx.fill();
  });
  // Date labels
  ctx.fillStyle='#42425a'; ctx.font='9px sans-serif'; ctx.textAlign='center';
  ctx.fillText(fmtDateShort(sessions[0].date),X(0),146);
  ctx.fillText(fmtDateShort(sessions[sessions.length-1].date),X(sessions.length-1),146);
}

function rExPRCard(exId) {
  let bw=0,brm=0,bvol=0,bvolLbl='';
  for (const w of S.history) {
    const ex=w.exercises?.find(e=>e.id===exId);
    if (!ex) continue;
    for (const s of (ex.sets||[])) {
      if (!s.done||s.type==='W') continue;
      const wt=+s.w||0, rp=+s.r||0;
      if (wt>bw) bw=wt;
      const rm=Calc.oneRM(wt,rp);
      if (rm&&rm>brm) brm=rm;
      const vol=wt*rp;
      if (vol>bvol) { bvol=vol; bvolLbl=`${wt}${S.unit} x ${rp}`; }
    }
  }
  document.getElementById('exd-pr-weight').textContent=bw?`${bw}${S.unit}`:'—';
  document.getElementById('exd-pr-1rm').textContent=brm?`${brm}${S.unit}`:'—';
  document.getElementById('exd-pr-vol').textContent=bvolLbl||'—';
}

function rExHistory(exId) {
  const el=document.getElementById('exd-history');
  const sessions=S.history.filter(w=>w.exercises?.some(e=>e.id===exId))
    .sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,8);
  if (!sessions.length) { el.innerHTML=`<p class="empty-state">Sin historial para este ejercicio.</p>`; return; }
  el.innerHTML=sessions.map(w=>{
    const ex=w.exercises.find(e=>e.id===exId);
    const done=(ex?.sets||[]).filter(s=>s.done&&s.type!=='W');
    const rows=done.map(s=>{
      const rm=Calc.oneRM(+s.w,+s.r);
      return `<div class="exd-set-row">
        <span class="exd-set-type">${s.type}</span>
        <span class="exd-set-val">${s.w} ${S.unit} × ${s.r}</span>
        <span class="exd-set-rm">${rm?'~'+rm+' 1RM':''}</span>
      </div>`;
    }).join('');
    return `<div class="exd-session"><div class="exd-sess-date">${fmtDate(w.date)}</div>${rows}</div>`;
  }).join('');
}

// ─── RENDER: CALENDAR ─────────────────────────────────────────────────────────
function rCalendar() {
  const MONTHS=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  document.getElementById('cal-month-label').textContent=`${MONTHS[S.calMonth]} ${S.calYear}`;
  const first=new Date(S.calYear,S.calMonth,1).getDay();
  const days=new Date(S.calYear,S.calMonth+1,0).getDate();
  const tod=today();
  let html='';
  for(let i=0;i<first;i++) html+=`<div class="cal-cell empty"></div>`;
  for(let d=1;d<=days;d++) {
    const ds=`${S.calYear}-${String(S.calMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const hasW=S.history.some(w=>w.date.slice(0,10)===ds);
    html+=`<div class="cal-cell ${hasW?'has-w':''} ${ds===tod?'today':''}" onclick="App.calDay('${ds}')">${d}</div>`;
  }
  document.getElementById('cal-grid').innerHTML=html;
  document.getElementById('cal-day-detail').innerHTML=`<p style="color:var(--t3);font-size:13px">Toca un día para ver el detalle.</p>`;
}

// ─── RENDER: WORKOUT DETAIL ───────────────────────────────────────────────────
function rWDetail(w) {
  document.getElementById('wd-title').textContent=w.name;
  document.getElementById('wd-date').textContent=fmtDate(w.date);
  S.copyWorkoutId=w.id;
  const setCount=(w.exercises||[]).reduce((a,e)=>a+(e.sets||[]).filter(s=>s.done).length,0);
  let html=`<div class="wd-stat-row">
    <div class="wd-stat"><div class="wd-stat-n">${w.duration||'--'}</div><div class="wd-stat-l">Duración</div></div>
    <div class="wd-stat"><div class="wd-stat-n">${w.volume||0}</div><div class="wd-stat-l">Vol. (${S.unit})</div></div>
    <div class="wd-stat"><div class="wd-stat-n">${setCount}</div><div class="wd-stat-l">Series</div></div>
  </div>`;
  for (const ex of (w.exercises||[])) {
    const info=findEx(ex.id);
    const done=(ex.sets||[]).filter(s=>s.done);
    html+=`<div class="wd-ex">
      <div class="wd-ex-name" onclick="App.openExDetail('${ex.id}')">${info?.name||ex.id}${ex.supersetWith?'<span style="font-size:10px;color:var(--purple);margin-left:6px">🔗</span>':''}</div>
      ${done.map(s=>{
        const rm=Calc.oneRM(+s.w,+s.r);
        return `<div class="wd-set-row">
          <span class="exd-set-type">${s.type}</span>
          <span class="exd-set-val">${s.w} ${S.unit} × ${s.r}</span>
          <span class="exd-set-rm">${rm?'~'+rm+' 1RM':''}</span>
        </div>`;
      }).join('')}
    </div>`;
  }
  document.getElementById('wd-body').innerHTML=html;
}

// ─── APP CONTROLLER ───────────────────────────────────────────────────────────
const App = {
  init() {
    // ── Migrate data from older versions ──────────────────────────────────
    const OLD_KEYS = ['hevy_v3', 'hevy_v2', 'pulse_v1', 'fittrack_v2'];
    const hasNew = !!localStorage.getItem(Store.KEY);
    if (!hasNew) {
      for (const oldKey of OLD_KEYS) {
        const raw = localStorage.getItem(oldKey);
        if (!raw) continue;
        try {
          const old = JSON.parse(raw);
          // Migrate compatible fields
          if (old.routines?.length || old.history?.length || old.measures?.length) {
            const migrated = {
              profile:         old.profile         ?? {name:'Atleta',handle:'@usuario',bio:''},
              unit:            old.unit             ?? 'kg',
              barWeight:       old.barWeight        ?? 20,
              restTime:        old.restTime         ?? 90,
              routines:        old.routines         ?? [],
              customExercises: old.customExercises  ?? [],
              history:         old.history          ?? [],
              measures:        old.measures         ?? [],
              personalRecords: old.personalRecords  ?? {},
            };
            localStorage.setItem(Store.KEY, JSON.stringify(migrated));
            console.log(`Datos migrados desde ${oldKey}`);
            toast(`✓ Datos importados desde versión anterior`);
            break;
          }
        } catch(e) { /* malformed old data — skip */ }
      }
    }
    // ── Clear GIF cache so improved search terms take effect ──────────────
    // Only clear if cache version doesn't match
    const gifCacheVer = localStorage.getItem('hevy_gif_ver');
    if (gifCacheVer !== '2') {
      localStorage.removeItem(Store.GIF_KEY);
      ExGif._cache = null;
      localStorage.setItem('hevy_gif_ver', '2');
    }
    ExGif.clearBroken();

    Store.load();
    document.getElementById('cfg-name').value   = S.profile.name;
    document.getElementById('cfg-handle').value = S.profile.handle;
    document.getElementById('cfg-unit').value   = S.unit;
    document.getElementById('cfg-rest').value   = S.restTime;
    document.getElementById('cfg-bar').value    = S.barWeight;
    document.getElementById('m-date').value     = today();
    rProfile(); rRoutines(); rHistory(); rExPage();
  },

  // ── Nav ──────────────────────────────────────────────────────────────────
  nav(page,btn) {
    document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
    document.querySelectorAll('.bn-btn').forEach(b=>b.classList.remove('active'));
    document.getElementById(`page-${page}`).classList.add('active');
    btn.classList.add('active');
    if (page==='profile')   rProfile();
    if (page==='routines')  rRoutines();
    if (page==='history')   rHistory();
    if (page==='exercises') rExPage();
  },

  open(id)  { document.getElementById(id).classList.remove('hidden'); },
  close(id) { document.getElementById(id).classList.add('hidden'); },

  // ── Settings ──────────────────────────────────────────────────────────────
  openSettings() { this.open('modal-settings'); },
  saveSettings() {
    S.profile.name   = document.getElementById('cfg-name').value.trim()||'Atleta';
    S.profile.handle = document.getElementById('cfg-handle').value.trim()||'@usuario';
    S.unit           = document.getElementById('cfg-unit').value;
    S.restTime       = parseInt(document.getElementById('cfg-rest').value)||90;
    S.barWeight      = parseFloat(document.getElementById('cfg-bar').value)||20;
    Store.save(); this.close('modal-settings'); rProfile(); toast('Configuración guardada ✓');
  },
  clearData() {
    if (!confirm('¿Borrar todos los datos? Esta acción no se puede deshacer.')) return;
    localStorage.removeItem(Store.KEY); localStorage.removeItem(Store.GIF_KEY);
    location.reload();
  },
  clearGifCache() {
    localStorage.removeItem(Store.GIF_KEY);
    ExGif._cache = null;
    this.close('modal-settings');
    toast('Caché de imágenes limpiado — se recargarán al navegar ✓');
  },

  // ── Profile ───────────────────────────────────────────────────────────────
  openEditProfile() {
    document.getElementById('ep-name').value   = S.profile.name;
    document.getElementById('ep-handle').value = S.profile.handle;
    document.getElementById('ep-bio').value    = S.profile.bio||'';
    this.open('modal-profile');
  },
  saveProfile() {
    S.profile.name   = document.getElementById('ep-name').value.trim()||'Atleta';
    S.profile.handle = document.getElementById('ep-handle').value.trim()||'@usuario';
    S.profile.bio    = document.getElementById('ep-bio').value.trim();
    Store.save(); rProfile(); this.close('modal-profile'); toast('Perfil actualizado ✓');
  },

  // ── Routines ──────────────────────────────────────────────────────────────
  openRoutineForm(id=null) {
    S.editRoutineId=id;
    if (id) {
      const r=S.routines.find(r=>r.id===id);
      document.getElementById('rform-title').textContent='Editar rutina';
      document.getElementById('rf-name').value  = r.name;
      document.getElementById('rf-notes').value = r.notes||'';
      S.rfExercises=(r.exercises||[]).map(e=>({...e,sets:(e.sets||[]).map(s=>({...s}))}));
    } else {
      document.getElementById('rform-title').textContent='Nueva rutina';
      document.getElementById('rf-name').value='';
      document.getElementById('rf-notes').value='';
      S.rfExercises=[];
    }
    rRFExList(); this.open('modal-routine');
  },
  saveRoutine() {
    const name=document.getElementById('rf-name').value.trim();
    if (!name) { toast('Escribe un nombre para la rutina.'); return; }
    const r={
      id:S.editRoutineId||uid(), name,
      notes:document.getElementById('rf-notes').value.trim(),
      exercises:S.rfExercises,
    };
    if (S.editRoutineId) { const idx=S.routines.findIndex(x=>x.id===S.editRoutineId); S.routines[idx]=r; }
    else S.routines.push(r);
    Store.save(); rRoutines(); this.close('modal-routine'); toast('Rutina guardada ✓');
  },
  deleteRoutine(id) {
    if (!confirm('¿Eliminar esta rutina?')) return;
    S.routines=S.routines.filter(r=>r.id!==id);
    Store.save(); rRoutines(); toast('Rutina eliminada.');
  },
  removeRFEx(bi) { S.rfExercises.splice(bi,1); rRFExList(); },

  // ── Exercise picker ───────────────────────────────────────────────────────
  openPicker(ctx) {
    S.pickerCtx=ctx;
    document.getElementById('pk-search').value='';
    document.getElementById('pk-muscle').value='';
    document.getElementById('pk-equip').value='';
    rPicker(); this.open('modal-picker');
  },
  filterPicker() {
    rPicker(
      document.getElementById('pk-search').value,
      document.getElementById('pk-muscle').value,
      document.getElementById('pk-equip').value,
    );
  },
  selectEx(exId) {
    const info=findEx(exId);
    const newEx={id:exId,sets:[{type:'N',w:'',r:'',rpe:'',done:false,prev:null}],restTime:S.restTime,note:''};
    // Previous session data
    const lastW=[...S.history].reverse().find(w=>w.exercises?.some(e=>e.id===exId));
    if (lastW) {
      const lastEx=lastW.exercises.find(e=>e.id===exId);
      const done=(lastEx?.sets||[]).filter(s=>s.done&&s.type!=='W');
      if (done.length) newEx.sets=done.map(s=>({type:s.type||'N',w:'',r:'',rpe:'',done:false,prev:{w:s.w,r:s.r}}));
    }
    if (S.pickerCtx==='live'&&S.live) {
      S.live.exercises.push(newEx);
      const listEl=document.getElementById('live-ex-list');
      if (listEl) { const bi=S.live.exercises.length-1; listEl.insertAdjacentHTML('beforeend',rExBlock(newEx,bi)); }
    } else if (S.pickerCtx==='routine') {
      S.rfExercises.push(newEx); rRFExList();
      this.close('modal-picker'); this.open('modal-routine'); return;
    } else if (S.pickerCtx==='superset' && S.supersetBi !== null) {
      // Attach as superset of the block at supersetBi
      newEx.supersetWith = S.supersetBi;
      S.live.exercises.splice(S.supersetBi+1, 0, newEx);
      rLive(); S.supersetBi=null;
    }
    this.close('modal-picker');
  },
  openCreateEx() {
    document.getElementById('ce-name').value='';
    this.close('modal-picker'); this.open('modal-create-ex');
  },
  saveCustomEx() {
    const name=document.getElementById('ce-name').value.trim();
    if (!name) { toast('Escribe un nombre.'); return; }
    const ex={
      id:'c'+uid(), name,
      muscle:document.getElementById('ce-muscle').value,
      equipment:document.getElementById('ce-equip').value,
      type:document.getElementById('ce-type').value,
      custom:true,
    };
    S.customExercises.push(ex); Store.save();
    this.close('modal-create-ex'); rPicker(); this.open('modal-picker');
    toast(`"${name}" creado ✓`);
  },

  // ── Set ops ───────────────────────────────────────────────────────────────
  exList() { return S.live?.exercises||S.rfExercises; },
  addSet(bi) {
    const exs=this.exList(); const last=exs[bi].sets.at(-1);
    exs[bi].sets.push({type:last?.type||'N',w:'',r:'',rpe:'',done:false,prev:null});
    refreshSets(bi);
  },
  updSet(bi,si,field,val) {
    const s=this.exList()[bi].sets[si];
    s[field]=['w','r','rpe'].includes(field)?(parseFloat(val)||0):val;
    if (S.live) updateVolChip();
  },
  updNote(bi,val) { const exs=this.exList(); if(exs[bi]) exs[bi].note=val; },
  cycleType(bi,si) {
    const types=['N','W','D','F','S'];
    const s=this.exList()[bi].sets[si];
    s.type=types[(types.indexOf(s.type)+1)%types.length];
    refreshRow(bi,si);
  },
  toggleDone(bi,si) {
    const s=this.exList()[bi].sets[si];
    s.done=!s.done; refreshRow(bi,si);
    if (s.done&&s.type!=='W'&&S.live) {
      updateVolChip();
      this._checkPR(S.live.exercises[bi].id,+s.w,+s.r);
      this.startRest(S.live.exercises[bi].restTime??S.restTime);
    }
  },
  removeEx(bi) {
    this.exList().splice(bi,1);
    if (S.live) rLive(); else rRFExList();
  },
  setExRest(bi) {
    const cur=S.live?.exercises[bi]?.restTime??S.restTime;
    const val=prompt('Descanso para este ejercicio (segundos):',cur);
    if (val&&!isNaN(+val)&&S.live) { S.live.exercises[bi].restTime=+val; rLive(); }
  },

  // ── Superset ──────────────────────────────────────────────────────────────
  addSuperset(bi) {
    S.pickerCtx='superset'; S.supersetBi=bi;
    document.getElementById('pk-search').value='';
    document.getElementById('pk-muscle').value='';
    document.getElementById('pk-equip').value='';
    rPicker(); this.open('modal-picker');
  },

  // ── PR detection ──────────────────────────────────────────────────────────
  _checkPR(exId,w,r) {
    if (!w||!r) return;
    const rm=Calc.oneRM(w,r);
    const cur=S.personalRecords[exId];
    const isNew=!cur||(rm&&cur.rm&&rm>cur.rm)||(!rm&&w>(cur.weight||0));
    if (isNew) {
      S.personalRecords[exId]={weight:w,reps:r,rm,date:today()};
      Store.save();
      const info=findEx(exId);
      flashPR(`¡Récord personal! ${info?.name} — ${rm?rm+' '+S.unit+' (1RM)':w+' '+S.unit}`);
    }
  },

  // ── Save-to-routine ───────────────────────────────────────────────────────
  openSaveToRoutine() {
    const el=document.getElementById('save-routine-list');
    el.innerHTML=S.routines.map(r=>`
      <div class="save-routine-item" onclick="App.updateRoutineFromLive('${r.id}')">
        <div>
          <div class="sri-name">${r.name}</div>
          <div class="sri-meta">${(r.exercises||[]).length} ejercicios actuales</div>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
      </div>`).join('') || `<p class="empty-state" style="padding:10px 0">Sin rutinas guardadas.</p>`;
    this.open('modal-save-routine');
  },
  updateRoutineFromLive(routineId) {
    if (!S.live||!routineId) return;
    const idx=S.routines.findIndex(r=>r.id===routineId);
    if (idx<0) return;
    // Update exercises in the routine with live session's current exercise list
    S.routines[idx].exercises=S.live.exercises.map(ex=>({
      id:ex.id,
      restTime:ex.restTime??S.restTime,
      supersetWith:ex.supersetWith||null,
      sets:(ex.sets||[]).map(s=>({type:s.type||'N',w:'',r:'',rpe:'',done:false,prev:null})),
    }));
    Store.save(); this.close('modal-save-routine');
    toast(`"${S.routines[idx].name}" actualizada ✓`);
  },
  saveAsNewRoutine() {
    if (!S.live) return;
    const name=prompt('Nombre para la nueva rutina:',S.live.name);
    if (!name) return;
    const r={
      id:uid(), name,
      notes:'Guardada desde sesión en vivo',
      exercises:S.live.exercises.map(ex=>({
        id:ex.id, restTime:ex.restTime??S.restTime,
        supersetWith:ex.supersetWith||null,
        sets:(ex.sets||[]).map(s=>({type:s.type||'N',w:'',r:'',rpe:'',done:false,prev:null})),
      })),
    };
    S.routines.push(r); Store.save(); this.close('modal-save-routine');
    toast(`"${name}" guardada como rutina ✓`);
  },

  // ── Live session ──────────────────────────────────────────────────────────
  startEmpty() { this._begin({name:'Entrenamiento',exercises:[]}); },
  startFromRoutine(id) {
    const r=S.routines.find(r=>r.id===id);
    if (!r) return;
    const exercises=(r.exercises||[]).map(ex=>{
      const newEx={id:ex.id,sets:[],restTime:ex.restTime??S.restTime,note:'',supersetWith:ex.supersetWith||null};
      const lastW=[...S.history].reverse().find(w=>w.exercises?.some(e=>e.id===ex.id));
      const lastEx=lastW?.exercises?.find(e=>e.id===ex.id);
      const done=(lastEx?.sets||[]).filter(s=>s.done&&s.type!=='W');
      if (done.length) newEx.sets=done.map(s=>({type:s.type||'N',w:'',r:'',rpe:'',done:false,prev:{w:s.w,r:s.r}}));
      else newEx.sets=(ex.sets?.length?ex.sets:[{type:'N'}]).map(s=>({type:s.type||'N',w:'',r:'',rpe:'',done:false,prev:null}));
      return newEx;
    });
    this._begin({name:r.name,routineId:id,exercises});
    document.querySelector('[data-page="workout"]').click();
  },
  _begin(data) {
    S.live={name:data.name,startTime:Date.now(),routineId:data.routineId||null,exercises:data.exercises};
    document.getElementById('workout-idle').classList.add('hidden');
    const liveEl=document.getElementById('workout-live');
    liveEl.classList.remove('hidden');
    rLive();
  },
  finishWorkout() {
    const exs=S.live.exercises;
    const hasDone=exs.some(e=>e.sets.some(s=>s.done));
    if (!hasDone&&!confirm('No hay series completadas. ¿Finalizar de todas formas?')) return;
    clearInterval(S.liveTimerID); this.skipRest();
    const elapsed=Math.floor((Date.now()-S.live.startTime)/1000);
    const vol=Calc.volume(exs);
    const w={id:uid(),name:S.live.name,date:new Date().toISOString(),duration:fmtTime(elapsed),exercises:exs,volume:vol};
    S.history.push(w);
    for (const ex of exs) for (const s of ex.sets) if(s.done&&s.type!=='W') this._checkPR(ex.id,+s.w,+s.r);
    Store.save(); S.live=null;
    document.getElementById('workout-idle').classList.remove('hidden');
    document.getElementById('workout-live').classList.add('hidden');
    document.getElementById('workout-live').innerHTML='';
    rProfile(); rHistory(); rExPage();
    toast(`✓ Sesión guardada · ${vol} ${S.unit} de volumen`);
  },
  cancelWorkout() {
    if (!confirm('¿Cancelar la sesión? No se guardará.')) return;
    clearInterval(S.liveTimerID); this.skipRest(); S.live=null;
    document.getElementById('workout-idle').classList.remove('hidden');
    document.getElementById('workout-live').classList.add('hidden');
    document.getElementById('workout-live').innerHTML='';
  },
  copyWorkout() {
    const w=S.history.find(w=>w.id===S.copyWorkoutId);
    if (!w) return;
    this.close('modal-wdetail');
    this._begin({name:w.name,exercises:(w.exercises||[]).map(ex=>({
      id:ex.id, supersetWith:ex.supersetWith||null,
      sets:(ex.sets||[]).filter(s=>s.done&&s.type!=='W').map(s=>({
        type:s.type||'N',w:'',r:'',rpe:'',done:false,prev:{w:s.w,r:s.r}
      })),
      restTime:ex.restTime??S.restTime, note:'',
    }))});
    document.querySelector('[data-page="workout"]').click();
  },

  // ── Rest timer ────────────────────────────────────────────────────────────
  startRest(dur) {
    const total=dur??S.restTime;
    S.restTotal=S.restLeft=total;
    document.getElementById('rest-overlay').classList.remove('hidden');
    this._updateRest(total,total);
    clearInterval(S.restID);
    S.restID=setInterval(()=>{
      S.restLeft--;
      this._updateRest(S.restLeft,S.restTotal);
      if (S.restLeft<=0) { clearInterval(S.restID); this.skipRest(); this._beep(); }
    },1000);
  },
  addRestTime(d) {
    S.restLeft=Math.max(1,S.restLeft+d);
    S.restTotal=Math.max(S.restTotal,S.restLeft);
    this._updateRest(S.restLeft,S.restTotal);
  },
  skipRest() {
    clearInterval(S.restID);
    document.getElementById('rest-overlay').classList.add('hidden');
  },
  _updateRest(rem,total) {
    document.getElementById('rest-num').textContent=rem;
    const C=2*Math.PI*60;
    document.getElementById('ring-arc').style.strokeDashoffset=C*(1-rem/total);
  },
  _beep() {
    try {
      const ac=new(window.AudioContext||window.webkitAudioContext)();
      [660,880].forEach((freq,i)=>{
        const o=ac.createOscillator(), g=ac.createGain();
        o.connect(g); g.connect(ac.destination);
        o.frequency.value=freq;
        g.gain.setValueAtTime(.3,ac.currentTime+i*.25);
        g.gain.exponentialRampToValueAtTime(.001,ac.currentTime+i*.25+.3);
        o.start(ac.currentTime+i*.25); o.stop(ac.currentTime+i*.25+.3);
      });
    } catch(e) {}
  },

  // ── Measures ──────────────────────────────────────────────────────────────
  openMeasureForm() {
    ['m-weight','m-fat','m-waist','m-hip','m-chest','m-shoulders','m-bicep','m-thigh','m-calf','m-neck']
      .forEach(id=>{ const el=document.getElementById(id); if(el) el.value=''; });
    document.getElementById('m-date').value=today();
    this.open('modal-measure');
  },
  saveMeasure() {
    const p=id=>{ const v=document.getElementById(id)?.value; return v!==''&&v!=null?parseFloat(v)||null:null; };
    const m={date:document.getElementById('m-date').value||today(),
      weight:p('m-weight'),fat:p('m-fat'),waist:p('m-waist'),hip:p('m-hip'),
      chest:p('m-chest'),shoulders:p('m-shoulders'),bicep:p('m-bicep'),
      thigh:p('m-thigh'),calf:p('m-calf'),neck:p('m-neck')};
    S.measures=S.measures.filter(x=>x.date!==m.date);
    S.measures.push(m); S.measures.sort((a,b)=>a.date.localeCompare(b.date));
    Store.save(); rProfile(); this.close('modal-measure'); toast('Medida guardada ✓');
  },

  // ── Plates ────────────────────────────────────────────────────────────────
  openPlates() {
    document.getElementById('pl-target').value='';
    document.getElementById('pl-result').innerHTML='';
    document.getElementById('pl-unit').textContent=S.unit;
    document.getElementById('pl-bar-hint').textContent=`Barra olímpica: ${S.barWeight} kg`;
    this.open('modal-plates');
  },
  calcPlates() {
    const target=parseFloat(document.getElementById('pl-target').value);
    const el=document.getElementById('pl-result');
    if (!target) { el.innerHTML=''; return; }
    const {result,leftover,bar,error}=Calc.plates(target);
    if (error) { el.innerHTML=`<p class="pl-err">${error}</p>`; return; }
    const cls={20:'d20',15:'d15',10:'d10',5:'d5',2.5:'d25',1.25:'d125'};
    const loaded=bar+(result?.reduce((a,r)=>a+r.p*r.n,0)||0)*2;
    let html=`<p class="pl-side-lbl">Por lado de la barra</p>`;
    if (!result.length) html+=`<p style="color:var(--t3);font-size:13px">Solo el peso de la barra.</p>`;
    else html+=result.map(({p,n})=>`
      <div class="pl-row">
        <span class="pl-count">×${n}</span>
        <div class="pl-discs">${Array(n).fill(`<span class="disc ${cls[p]}">${p}</span>`).join('')}</div>
      </div>`).join('');
    html+=`<p class="pl-ok" style="margin-top:8px">Total: ${loaded} kg${leftover>.01?` (diferencia: ${(leftover*2).toFixed(2)} kg)`:' ✓'}</p>`;
    el.innerHTML=html;
  },

  // ── Workout detail ────────────────────────────────────────────────────────
  openWDetail(id) {
    const w=S.history.find(w=>w.id===id);
    if (!w) return;
    rWDetail(w); this.open('modal-wdetail');
  },

  // ── Exercise detail ───────────────────────────────────────────────────────
  openExDetail(exId) {
    S.exGraphMode='best_weight'; S.exRangeDays=90;
    document.querySelectorAll('#exd-graph-tabs .gtab').forEach((t,i)=>t.classList.toggle('active',i===0));
    rExDetail(exId); this.open('modal-ex-detail');
  },
  switchExGraph(mode,btn) {
    S.exGraphMode=mode;
    document.querySelectorAll('#exd-graph-tabs .gtab').forEach(t=>t.classList.remove('active'));
    btn.classList.add('active');
    rExGraph(S.currentExId,mode);
  },
  changeExRange(days) { S.exRangeDays=parseInt(days); rExGraph(S.currentExId,S.exGraphMode); },

  // ── Exercises page ────────────────────────────────────────────────────────
  renderExPage() { rExPage(); },
  setExPageMuscle(m) { S.exPageMuscle=m; rExPage(); },

  // ── Calendar ──────────────────────────────────────────────────────────────
  openCalendar() { rCalendar(); this.open('modal-calendar'); },
  calPrev() { S.calMonth--; if(S.calMonth<0){S.calMonth=11;S.calYear--;} rCalendar(); },
  calNext() { S.calMonth++; if(S.calMonth>11){S.calMonth=0;S.calYear++;} rCalendar(); },
  calDay(ds) {
    const ws=S.history.filter(w=>w.date.slice(0,10)===ds);
    const el=document.getElementById('cal-day-detail');
    if (!ws.length) { el.innerHTML='<p style="color:var(--t3);font-size:13px">Sin entrenamientos este día.</p>'; return; }
    el.innerHTML=ws.map(w=>`
      <div style="margin-bottom:6px;cursor:pointer" onclick="App.close('modal-calendar');App.openWDetail('${w.id}')">
        <strong style="font-size:14px">${w.name}</strong>
        <span style="font-size:12px;color:var(--t3);margin-left:8px">${w.volume||0} ${S.unit} · ${w.duration||'--'}</span>
      </div>`).join('');
  },
};

// ── Live timer ────────────────────────────────────────────────────────────────
function startTimer() {
  clearInterval(S.liveTimerID);
  S.liveTimerID=setInterval(()=>{
    const el=document.getElementById('live-elapsed');
    if (el&&S.live) el.textContent=fmtTime(Math.floor((Date.now()-S.live.startTime)/1000));
  },1000);
}

// ── Boot ──────────────────────────────────────────────────────────────────────
window.App=App;
document.addEventListener('DOMContentLoaded',()=>App.init());
document.addEventListener('click',e=>{ if(e.target.classList.contains('overlay')) e.target.classList.add('hidden'); });
