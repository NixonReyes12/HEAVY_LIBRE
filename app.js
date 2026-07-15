/* ═══════════════════════════════════════════════
   HEVY CLONE v5 — app.js
   Macros · Heatmap · Session notes · Haptics
   ═══════════════════════════════════════════════ */
'use strict';

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const MUSCLE_COLORS = {
  Pecho:'#e8554e', Espalda:'#4f8ef7', Piernas:'#2fd17a',
  Hombros:'#c084fc', Brazos:'#f5c518', Core:'#fb923c',
  Glúteos:'#f472b6', Cardio:'#22d3ee',
};
const MUSCLE_SVG_IDS = {
  Pecho:['body-pecho'], Hombros:['body-hombro-l','body-hombro-r'],
  Brazos:['body-brazo-l','body-brazo-r'], Core:['body-core'],
  Piernas:['body-pierna-l','body-pierna-r'], Glúteos:['body-gluteo'],
};
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
const GIF_TERMS = {
  e001:'barbell bench press', e002:'incline dumbbell press',
  e003:'decline barbell bench press', e004:'pec deck fly machine',
  e005:'chest dip parallel bars', e006:'cable fly crossover chest',
  e007:'dumbbell pullover chest', e008:'push up chest',
  e009:'cable fly low pulley', e010:'pull up overhand grip',
  e011:'barbell bent over row', e012:'lat pulldown cable',
  e013:'seated cable row', e014:'barbell deadlift conventional',
  e015:'dumbbell single arm row', e016:'straight arm cable pulldown',
  e017:'dumbbell shrug trap', e018:'back hyperextension roman chair',
  e020:'barbell back squat', e021:'leg press machine horizontal',
  e022:'romanian deadlift dumbbell', e023:'leg extension machine quad',
  e024:'lying leg curl machine', e025:'standing calf raise machine',
  e026:'dumbbell walking lunge', e027:'bulgarian split squat dumbbell',
  e028:'hack squat machine', e029:'sumo deadlift barbell',
  e030:'barbell overhead press military', e031:'dumbbell lateral raise shoulder',
  e032:'dumbbell front raise shoulder', e033:'cable face pull rope',
  e034:'arnold press dumbbell', e035:'barbell upright row shoulder',
  e036:'seated dumbbell shoulder press',
  e040:'dumbbell bicep curl standing', e041:'tricep dip bench bodyweight',
  e042:'cable tricep pushdown rope', e043:'barbell bicep curl standing',
  e044:'hammer curl dumbbell neutral', e045:'french press ez bar tricep',
  e046:'concentration curl dumbbell', e047:'preacher curl barbell bicep',
  e048:'skull crusher barbell tricep',
  e050:'plank hold core', e051:'crunch abdominal floor',
  e052:'ab wheel rollout core', e053:'hanging leg raise abs',
  e054:'cable crunch kneeling abs', e055:'russian twist medicine ball',
  e056:'bicycle crunch abs',
  e060:'barbell hip thrust glute', e061:'cable glute kickback',
  e062:'glute bridge floor',
  e070:'treadmill run cardio', e071:'stationary bike cardio',
  e072:'rowing machine ergometer', e073:'jump rope cardio', e074:'burpee full body',
};

// ─── EXERCISE DATABASE ────────────────────────────────────────────────────────
const DB = [
  {id:'e001',name:'Press banca plano',           muscle:'Pecho',   equipment:'Barra',        type:'weight_reps'},
  {id:'e002',name:'Press banca inclinado',        muscle:'Pecho',   equipment:'Mancuernas',   type:'weight_reps'},
  {id:'e003',name:'Press banca declinado',        muscle:'Pecho',   equipment:'Barra',        type:'weight_reps'},
  {id:'e004',name:'Aperturas pec deck',           muscle:'Pecho',   equipment:'Máquina',      type:'weight_reps'},
  {id:'e005',name:'Fondos en paralelas',          muscle:'Pecho',   equipment:'Peso corporal',type:'bodyweight_reps'},
  {id:'e006',name:'Crossover en polea',           muscle:'Pecho',   equipment:'Polea',        type:'weight_reps'},
  {id:'e007',name:'Pullover con mancuerna',       muscle:'Pecho',   equipment:'Mancuernas',   type:'weight_reps'},
  {id:'e008',name:'Flexiones',                    muscle:'Pecho',   equipment:'Peso corporal',type:'reps_only'},
  {id:'e009',name:'Aperturas en polea baja',      muscle:'Pecho',   equipment:'Polea',        type:'weight_reps'},
  {id:'e010',name:'Dominadas',                    muscle:'Espalda', equipment:'Peso corporal',type:'bodyweight_reps'},
  {id:'e011',name:'Remo con barra',               muscle:'Espalda', equipment:'Barra',        type:'weight_reps'},
  {id:'e012',name:'Jalón al pecho',               muscle:'Espalda', equipment:'Polea',        type:'weight_reps'},
  {id:'e013',name:'Remo en polea baja',           muscle:'Espalda', equipment:'Polea',        type:'weight_reps'},
  {id:'e014',name:'Peso muerto convencional',     muscle:'Espalda', equipment:'Barra',        type:'weight_reps'},
  {id:'e015',name:'Remo con mancuerna',           muscle:'Espalda', equipment:'Mancuernas',   type:'weight_reps'},
  {id:'e016',name:'Pullover en polea',            muscle:'Espalda', equipment:'Polea',        type:'weight_reps'},
  {id:'e017',name:'Encogimientos de trapecios',   muscle:'Espalda', equipment:'Mancuernas',   type:'weight_reps'},
  {id:'e018',name:'Hiperextensión de espalda',    muscle:'Espalda', equipment:'Máquina',      type:'reps_only'},
  {id:'e020',name:'Sentadilla libre',             muscle:'Piernas', equipment:'Barra',        type:'weight_reps'},
  {id:'e021',name:'Prensa de piernas',            muscle:'Piernas', equipment:'Máquina',      type:'weight_reps'},
  {id:'e022',name:'Peso muerto rumano',           muscle:'Piernas', equipment:'Barra',        type:'weight_reps'},
  {id:'e023',name:'Extensión de cuádriceps',      muscle:'Piernas', equipment:'Máquina',      type:'weight_reps'},
  {id:'e024',name:'Curl de isquiotibiales',       muscle:'Piernas', equipment:'Máquina',      type:'weight_reps'},
  {id:'e025',name:'Elevación de talones',         muscle:'Piernas', equipment:'Máquina',      type:'weight_reps'},
  {id:'e026',name:'Zancadas',                    muscle:'Piernas', equipment:'Mancuernas',   type:'weight_reps'},
  {id:'e027',name:'Sentadilla búlgara',           muscle:'Piernas', equipment:'Mancuernas',   type:'weight_reps'},
  {id:'e028',name:'Hack squat',                   muscle:'Piernas', equipment:'Máquina',      type:'weight_reps'},
  {id:'e029',name:'Peso muerto sumo',             muscle:'Piernas', equipment:'Barra',        type:'weight_reps'},
  {id:'e030',name:'Press militar',                muscle:'Hombros', equipment:'Barra',        type:'weight_reps'},
  {id:'e031',name:'Elevaciones laterales',        muscle:'Hombros', equipment:'Mancuernas',   type:'weight_reps'},
  {id:'e032',name:'Elevaciones frontales',        muscle:'Hombros', equipment:'Mancuernas',   type:'weight_reps'},
  {id:'e033',name:'Face pull',                    muscle:'Hombros', equipment:'Polea',        type:'weight_reps'},
  {id:'e034',name:'Press Arnold',                 muscle:'Hombros', equipment:'Mancuernas',   type:'weight_reps'},
  {id:'e035',name:'Remo al mentón',               muscle:'Hombros', equipment:'Barra',        type:'weight_reps'},
  {id:'e036',name:'Press con mancuernas sentado', muscle:'Hombros', equipment:'Mancuernas',   type:'weight_reps'},
  {id:'e040',name:'Curl bíceps mancuernas',       muscle:'Brazos',  equipment:'Mancuernas',   type:'weight_reps'},
  {id:'e041',name:'Fondos de tríceps',            muscle:'Brazos',  equipment:'Peso corporal',type:'bodyweight_reps'},
  {id:'e042',name:'Extensión tríceps polea',      muscle:'Brazos',  equipment:'Polea',        type:'weight_reps'},
  {id:'e043',name:'Curl con barra',               muscle:'Brazos',  equipment:'Barra',        type:'weight_reps'},
  {id:'e044',name:'Curl martillo',                muscle:'Brazos',  equipment:'Mancuernas',   type:'weight_reps'},
  {id:'e045',name:'Press francés',                muscle:'Brazos',  equipment:'Barra',        type:'weight_reps'},
  {id:'e046',name:'Curl concentrado',             muscle:'Brazos',  equipment:'Mancuernas',   type:'weight_reps'},
  {id:'e047',name:'Curl en polea baja',           muscle:'Brazos',  equipment:'Polea',        type:'weight_reps'},
  {id:'e048',name:'Skull crusher',                muscle:'Brazos',  equipment:'Barra',        type:'weight_reps'},
  {id:'e050',name:'Plancha abdominal',            muscle:'Core',    equipment:'Peso corporal',type:'duration'},
  {id:'e051',name:'Crunch',                       muscle:'Core',    equipment:'Peso corporal',type:'reps_only'},
  {id:'e052',name:'Rueda abdominal',              muscle:'Core',    equipment:'Otros',        type:'reps_only'},
  {id:'e053',name:'Elevación de piernas colgado', muscle:'Core',    equipment:'Peso corporal',type:'reps_only'},
  {id:'e054',name:'Cable crunch',                 muscle:'Core',    equipment:'Polea',        type:'weight_reps'},
  {id:'e055',name:'Giro ruso',                    muscle:'Core',    equipment:'Otros',        type:'reps_only'},
  {id:'e056',name:'Bicicleta abdominal',          muscle:'Core',    equipment:'Peso corporal',type:'reps_only'},
  {id:'e060',name:'Hip thrust con barra',         muscle:'Glúteos', equipment:'Barra',        type:'weight_reps'},
  {id:'e061',name:'Kickback en polea',            muscle:'Glúteos', equipment:'Polea',        type:'weight_reps'},
  {id:'e062',name:'Puente de glúteos',            muscle:'Glúteos', equipment:'Peso corporal',type:'reps_only'},
  {id:'e070',name:'Carrera en cinta',             muscle:'Cardio',  equipment:'Máquina',      type:'duration'},
  {id:'e071',name:'Bicicleta estática',           muscle:'Cardio',  equipment:'Máquina',      type:'duration'},
  {id:'e072',name:'Remo ergómetro',               muscle:'Cardio',  equipment:'Máquina',      type:'duration'},
  {id:'e073',name:'Saltar cuerda',                muscle:'Cardio',  equipment:'Otros',        type:'duration'},
  {id:'e074',name:'Burpees',                      muscle:'Cardio',  equipment:'Peso corporal',type:'reps_only'},
].map(e => ({...e, custom:false}));

// ─── STATE ────────────────────────────────────────────────────────────────────
const S = {
  profile:   {name:'Atleta', handle:'@usuario', bio:''},
  unit:      'kg', barWeight:20, restTime:90,
  routines:[], customExercises:[], history:[], measures:[],
  personalRecords:{},
  live:null, liveTimerID:null,
  restID:null, restTotal:90, restLeft:90,
  pickerCtx:null, editRoutineId:null, rfExercises:[],
  calYear:new Date().getFullYear(), calMonth:new Date().getMonth(),
  currentExId:null, exGraphMode:'best_weight', exRangeDays:90,
  exPageMuscle:'', copyWorkoutId:null, supersetBi:null,
  calcGoal:'maintain',
};

// ─── STORE ────────────────────────────────────────────────────────────────────
const Store = {
  KEY:'hevy_v5', GIF_KEY:'hevy_gif_v2',
  save() {
    localStorage.setItem(this.KEY, JSON.stringify({
      profile:S.profile, unit:S.unit, barWeight:S.barWeight, restTime:S.restTime,
      routines:S.routines, customExercises:S.customExercises,
      history:S.history, measures:S.measures, personalRecords:S.personalRecords,
    }));
  },
  load() {
    try {
      const d = JSON.parse(localStorage.getItem(this.KEY));
      if (!d) return;
      Object.assign(S, {
        profile:d.profile??S.profile, unit:d.unit??'kg',
        barWeight:d.barWeight??20, restTime:d.restTime??90,
        routines:d.routines??[], customExercises:d.customExercises??[],
        history:d.history??[], measures:d.measures??[],
        personalRecords:d.personalRecords??{},
      });
    } catch(e){console.warn(e);}
  },
};

// ─── GIF MODULE ───────────────────────────────────────────────────────────────
const ExGif = {
  _cache:null, _pending:{}, _tested:{},
  _load() {
    if (!this._cache) {
      try { this._cache=JSON.parse(localStorage.getItem(Store.GIF_KEY))||{}; }
      catch(e){this._cache={};}
    }
    return this._cache;
  },
  _save(){try{localStorage.setItem(Store.GIF_KEY,JSON.stringify(this._cache));}catch(e){}},
  clearBroken(){
    const c=this._load(); let ch=false;
    for (const [id,e] of Object.entries(c)) if(e.broken||e.notFound){delete c[id];ch=true;}
    if(ch)this._save();
  },
  markBroken(id){const c=this._load();delete c[id];this._save();},
  getCached(id){const e=this._load()[id];return(e&&e.gifUrl&&!e.broken)?e.gifUrl:null;},
  isMissing(id){const e=this._load()[id];return e&&!e.gifUrl&&e.notFound&&!e.broken;},
  async fetch(id){
    const info=allEx().find(e=>e.id===id);
    if(!info||info.custom) return null;
    if(this._pending[id]) return this._pending[id];
    const cache=this._load();
    const cached=this.getCached(id);
    if(cached) return cached;
    const p=(async()=>{
      try {
        const q=GIF_TERMS[id]||info.name;
        const res=await Promise.race([
          fetch(`https://oss.exercisedb.dev/api/v1/exercises?search=${encodeURIComponent(q)}&limit=10`),
          new Promise((_,r)=>setTimeout(()=>r(new Error('timeout')),8000)),
        ]);
        if(res.ok){
          const data=await res.json();
          const list=Array.isArray(data)?data:Array.isArray(data?.data)?data.data:Array.isArray(data?.exercises)?data.exercises:[];
          const qWords=q.toLowerCase().split(' ');
          let best=null, bestScore=-1;
          for(const item of list){
            const name=(item?.name||'').toLowerCase();
            const score=qWords.filter(w=>name.includes(w)).length;
            if(score>bestScore){bestScore=score;best=item;}
          }
          const url=best?.gifUrl||list[0]?.gifUrl||null;
          if(url){cache[id]={gifUrl:url,t:Date.now()};this._save();return url;}
        }
      } catch(e){}
      cache[id]={gifUrl:null,notFound:true,t:Date.now()};
      this._save(); return null;
    })();
    this._pending[id]=p;
    p.finally(()=>delete this._pending[id]);
    return p;
  },
};

// ─── MATH ─────────────────────────────────────────────────────────────────────
const Calc = {
  oneRM(w,r){if(!w||!r||r<1||r>=10)return null;return+(w/(1.0278-0.0278*r)).toFixed(1);},
  volume(exercises){
    return exercises.reduce((t,ex)=>t+(ex.sets||[]).reduce((s,set)=>
      s+(set.done&&+set.w>0&&+set.r>0&&set.type!=='W'?+set.w*+set.r:0),0),0);
  },
  muscleVolume(days=7){
    const cut=Date.now()-days*86400000, m={};
    for(const w of S.history){
      if(new Date(w.date).getTime()<cut) continue;
      for(const ex of(w.exercises||[])){
        const info=allEx().find(e=>e.id===ex.id);
        const g=info?.muscle||'Otros';
        const n=(ex.sets||[]).filter(s=>s.done&&s.type!=='W').length;
        m[g]=(m[g]||0)+n;
      }
    }
    return m;
  },
  weeklyVolume(){
    const weeks=Array(8).fill(0), now=Date.now();
    for(const w of S.history){
      const diff=(now-new Date(w.date).getTime())/(7*86400000);
      const idx=Math.floor(diff);
      if(idx<8) weeks[7-idx]+=w.volume||0;
    }
    return weeks;
  },
  streak(){
    const ws=new Set();
    for(const w of S.history){
      const d=new Date(w.date), mon=new Date(d);
      mon.setDate(d.getDate()-((d.getDay()+6)%7));
      ws.add(mon.toISOString().slice(0,10));
    }
    const sorted=[...ws].sort().reverse();
    let streak=0,ref=new Date();
    ref.setDate(ref.getDate()-((ref.getDay()+6)%7));
    for(const w of sorted){
      const d=new Date(w);
      const diffW=Math.round((ref.getTime()-d.getTime())/(7*86400000));
      if(diffW<=1){streak++;ref=d;}else break;
    }
    return streak;
  },
  plates(total){
    const bar=S.barWeight, SIZES=[20,15,10,5,2.5,1.25];
    if(total<bar) return{error:`Mínimo ${bar} kg (peso de la barra).`};
    let rem=(total-bar)/2; const result=[];
    for(const p of SIZES){const n=Math.floor(rem/p+1e-9);if(n>0){result.push({p,n});rem-=n*p;}}
    return{result,leftover:+rem.toFixed(2),bar};
  },
  /** Mifflin-St Jeor BMR → TDEE → Macros */
  macros(age, weight, height, sex, activity, goal) {
    const bmr = sex==='m'
      ? 10*weight + 6.25*height - 5*age + 5
      : 10*weight + 6.25*height - 5*age - 161;
    let tdee = bmr * parseFloat(activity);
    let label = 'Mantenimiento';
    if(goal==='cut')  {tdee -= 400; label='Déficit calórico (-400 kcal)';}
    if(goal==='bulk') {tdee += 300; label='Superávit calórico (+300 kcal)';}
    const protein = Math.round(weight * 2.0);
    const fat     = Math.round(tdee * 0.25 / 9);
    const carbs   = Math.round((tdee - protein*4 - fat*9) / 4);
    return {tdee:Math.round(tdee), protein, fat, carbs, label};
  },
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function allEx(){return[...DB,...S.customExercises];}
function findEx(id){return allEx().find(e=>e.id===id);}
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,5);}
function today(){return new Date().toISOString().slice(0,10);}
function fmtTime(s){return`${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;}
function fmtDate(iso){return new Date(iso).toLocaleDateString('es-CR',{weekday:'short',day:'numeric',month:'short',year:'numeric'});}
function fmtDateShort(iso){return new Date(iso).toLocaleDateString('es-CR',{day:'numeric',month:'short'});}
function hexAlpha(hex,a){const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);return`rgba(${r},${g},${b},${a})`;}
function vibrate(ms=10){try{navigator.vibrate?.(ms);}catch(e){}}
function toast(msg,ms=2600){
  const el=document.getElementById('toast');
  el.textContent=msg; el.classList.add('show');
  setTimeout(()=>el.classList.remove('show'),ms);
}
function flashPR(msg){
  const el=document.getElementById('pr-banner');
  document.getElementById('pr-text').textContent=msg;
  el.classList.remove('hidden'); el.classList.add('show');
  setTimeout(()=>{el.classList.remove('show');setTimeout(()=>el.classList.add('hidden'),300);},3500);
  vibrate(50);
}
function thumbSvg(){return`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></svg>`;}

// ─── RENDER: PROFILE ──────────────────────────────────────────────────────────
function rProfile(){
  document.getElementById('profile-avatar').textContent=(S.profile.name||'H')[0].toUpperCase();
  document.getElementById('profile-name').textContent=S.profile.name||'Atleta';
  document.getElementById('profile-handle').textContent=S.profile.handle||'@usuario';
  document.getElementById('profile-bio').textContent=S.profile.bio||'';
  const totalVol=S.history.reduce((a,w)=>a+(w.volume||0),0);
  document.getElementById('stat-sessions').textContent=S.history.length;
  document.getElementById('stat-volume').textContent=(totalVol/1000).toFixed(1);
  document.getElementById('stat-streak').textContent=Calc.streak();
  rActivityDots(); rHeatmap(); rMiniCal(); rMuscleDist();
  rVolChart(); rPRList(); rMeasures(); rWeightChart(); rRecent();
}

function rActivityDots(){
  const el=document.getElementById('activity-dots');
  const days=['D','L','M','X','J','V','S']; const now=new Date(); let html='';
  for(let i=6;i>=0;i--){
    const d=new Date(now); d.setDate(d.getDate()-i);
    const ds=d.toISOString().slice(0,10);
    const ws=S.history.filter(w=>w.date.slice(0,10)===ds);
    const vol=ws.reduce((a,w)=>a+(w.volume||0),0);
    const h=Math.min(48,Math.max(4,vol/150));
    html+=`<div class="act-day">
      <div class="act-bar ${ws.length?'has-w':''}" style="height:${h}px"></div>
      <span class="act-lbl">${days[d.getDay()]}</span>
    </div>`;
  }
  el.innerHTML=html;
}

function rHeatmap(){
  const el=document.getElementById('heatmap'); if(!el) return;
  const today_d=new Date(); const cells=[];
  // 26 weeks × 7 days = 182 days back
  for(let i=181;i>=0;i--){
    const d=new Date(today_d); d.setDate(d.getDate()-i);
    const ds=d.toISOString().slice(0,10);
    const count=S.history.filter(w=>w.date.slice(0,10)===ds).length;
    const isToday=ds===today();
    let cls='hm-cell';
    if(count===1)cls+=' w1';
    else if(count===2)cls+=' w2';
    else if(count>=3)cls+=' w3';
    if(isToday)cls+=' today';
    cells.push(`<div class="${cls}" title="${ds}"></div>`);
  }
  el.innerHTML=cells.join('');
}

function rMiniCal(){
  const el=document.getElementById('mini-cal'); if(!el) return;
  const now=new Date(), y=now.getFullYear(), m=now.getMonth();
  const first=new Date(y,m,1).getDay(), days=new Date(y,m+1,0).getDate();
  let html='';
  for(let i=0;i<first;i++) html+=`<div class="mc-cell"></div>`;
  for(let d=1;d<=days;d++){
    const ds=`${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const hasW=S.history.some(w=>w.date.slice(0,10)===ds);
    const isTod=ds===today();
    html+=`<div class="mc-cell ${hasW?'has-w':''} ${isTod?'today':''}">${d}</div>`;
  }
  el.innerHTML=html;
}

function rMuscleDist(){
  const mv=Calc.muscleVolume(7);
  const muscles=Object.keys(MUSCLE_COLORS);
  const max=Math.max(1,...muscles.map(m=>mv[m]||0));
  for(const[muscle,ids]of Object.entries(MUSCLE_SVG_IDS)){
    const sets=mv[muscle]||0;
    const intensity=sets>0?Math.max(0.3,sets/max):0;
    const color=sets>0?hexAlpha(MUSCLE_COLORS[muscle],intensity):'#1a1a2e';
    for(const id of ids){const el=document.getElementById(id);if(el)el.style.fill=color;}
  }
  const bEl=document.getElementById('muscle-bars'); if(!bEl) return;
  bEl.innerHTML=muscles.filter(m=>m!=='Cardio').map(m=>{
    const sets=mv[m]||0, pct=Math.round((sets/max)*100);
    return`<div class="mbar-row">
      <span class="mbar-name">${m}</span>
      <div class="mbar-track"><div class="mbar-fill" style="width:${pct}%;background:${MUSCLE_COLORS[m]||'#4f8ef7'}"></div></div>
      <span class="mbar-count">${sets}</span>
    </div>`;
  }).join('');
}

function rVolChart(){
  const canvas=document.getElementById('vol-chart'); if(!canvas) return;
  const W=canvas.offsetWidth||350; canvas.width=W; canvas.height=110;
  const ctx=canvas.getContext('2d'); ctx.clearRect(0,0,W,110);
  const weeks=Calc.weeklyVolume(), max=Math.max(1,...weeks);
  const bW=Math.floor((W-20)/8-4);
  weeks.forEach((v,i)=>{
    const x=10+i*((W-20)/8), h=Math.max(2,(v/max)*88), y=102-h;
    const alpha=0.2+(v/max)*0.8;
    ctx.fillStyle=`rgba(232,85,78,${alpha})`;
    ctx.beginPath(); ctx.roundRect?.(x,y,bW,h,3)??ctx.fillRect(x,y,bW,h); ctx.fill();
  });
  ctx.fillStyle='#3a3a58'; ctx.font='9px -apple-system,sans-serif'; ctx.textAlign='center';
  ['7s','6s','5s','4s','3s','2s','1s','Esta'].forEach((l,i)=>{
    ctx.fillText(l,10+i*((W-20)/8)+bW/2,110);
  });
}

function rPRList(){
  const el=document.getElementById('pr-list'); if(!el) return;
  const entries=Object.entries(S.personalRecords);
  if(!entries.length){el.innerHTML=`<p class="empty-state" style="padding:12px 0">Completa entrenamientos para ver tus récords.</p>`;return;}
  el.innerHTML=entries.slice(0,8).map(([id,rec])=>{
    const ex=findEx(id);
    return`<div class="pr-row" onclick="App.openExDetail('${id}')">
      <span class="pr-ex">${ex?.name||id}</span>
      <span class="pr-val">${rec.rm?rec.rm+' '+S.unit+' (1RM)':rec.weight+' '+S.unit}</span>
    </div>`;
  }).join('');
}

function rMeasures(){
  const el=document.getElementById('measure-list'); if(!el) return;
  const list=[...S.measures].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,6);
  if(!list.length){el.innerHTML=`<p class="empty-state" style="padding:10px 0">Sin medidas aún.</p>`;return;}
  el.innerHTML=list.map(m=>{
    const chips=[];
    if(m.weight)chips.push(`<span class="meas-v">${m.weight}<span class="meas-u">kg</span></span>`);
    if(m.fat!=null&&m.fat!=='')chips.push(`<span class="meas-v">${m.fat}<span class="meas-u">%</span></span>`);
    if(m.waist)chips.push(`<span class="meas-v">${m.waist}<span class="meas-u">cin.</span></span>`);
    return`<div class="meas-row"><span class="meas-date">${fmtDateShort(m.date)}</span><div class="meas-vals">${chips.join('')}</div></div>`;
  }).join('');
}

function rWeightChart(){
  const canvas=document.getElementById('weight-chart'); if(!canvas) return;
  const pts=[...S.measures].filter(m=>m.weight).sort((a,b)=>a.date.localeCompare(b.date)).slice(-14);
  const W=canvas.offsetWidth||340; canvas.width=W; canvas.height=100;
  const ctx=canvas.getContext('2d'); ctx.clearRect(0,0,W,100);
  if(pts.length<2){
    ctx.fillStyle='#3a3a58';ctx.font='12px sans-serif';ctx.textAlign='center';
    ctx.fillText('Registra al menos 2 medidas para ver la gráfica',W/2,54);return;
  }
  const vals=pts.map(p=>+p.weight);
  const lo=Math.min(...vals)-0.5, hi=Math.max(...vals)+0.5;
  const X=i=>14+i*(W-28)/(pts.length-1);
  const Y=v=>84-((v-lo)/(hi-lo||1))*72;
  const grad=ctx.createLinearGradient(0,0,0,100);
  grad.addColorStop(0,'rgba(232,85,78,.22)');grad.addColorStop(1,'rgba(232,85,78,0)');
  ctx.beginPath();ctx.moveTo(X(0),Y(vals[0]));
  for(let i=1;i<pts.length;i++)ctx.lineTo(X(i),Y(vals[i]));
  ctx.lineTo(X(pts.length-1),100);ctx.lineTo(X(0),100);ctx.closePath();
  ctx.fillStyle=grad;ctx.fill();
  ctx.beginPath();ctx.moveTo(X(0),Y(vals[0]));
  for(let i=1;i<pts.length;i++)ctx.lineTo(X(i),Y(vals[i]));
  ctx.strokeStyle='#e8554e';ctx.lineWidth=2;ctx.lineJoin='round';ctx.stroke();
  vals.forEach((v,i)=>{
    ctx.beginPath();ctx.arc(X(i),Y(v),3.5,0,Math.PI*2);
    ctx.fillStyle='#e8554e';ctx.fill();
  });
}

function rRecent(){
  const el=document.getElementById('recent-list'); if(!el) return;
  const list=[...S.history].sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,5);
  if(!list.length){el.innerHTML=`<p class="empty-state" style="padding:10px 0">Sin sesiones aún.</p>`;return;}
  el.innerHTML=list.map(w=>`
    <div class="recent-row" onclick="App.openWDetail('${w.id}')">
      <div><div class="recent-name">${w.name}</div><div class="recent-meta">${fmtDate(w.date)} · ${w.duration||'--'}</div></div>
      <span class="recent-vol">${w.volume||0} ${S.unit}</span>
    </div>`).join('');
}

// ─── RENDER: ROUTINES ─────────────────────────────────────────────────────────
function rRoutines(){
  const el=document.getElementById('routine-list'); if(!el) return;
  let html=`<button class="routine-add-btn" onclick="App.openRoutineForm()">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
    Nueva rutina
  </button>`;
  if(!S.routines.length) html+=`<p class="empty-state">Sin rutinas. Crea tu primera rutina arriba.</p>`;
  else html+=S.routines.map(r=>{
    const exs=(r.exercises||[]).map(e=>findEx(e.id)?.name||'?').slice(0,5).join(' · ');
    const more=(r.exercises||[]).length>5?` +${(r.exercises||[]).length-5}`:'';
    return`<div class="routine-card">
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
  el.innerHTML=html;
  rQuickRoutines();
}

function rQuickRoutines(){
  const el=document.getElementById('quick-routines'); if(!el) return;
  el.innerHTML=S.routines.slice(0,5).map(r=>`
    <button class="qr-btn" onclick="App.startFromRoutine('${r.id}')">
      <div><div class="qr-name">${r.name}</div><div class="qr-meta">${(r.exercises||[]).length} ejercicios</div></div>
      <span class="qr-arrow">›</span>
    </button>`).join('');
}

// ─── RENDER: EXERCISES PAGE ───────────────────────────────────────────────────
function rExPage(){
  const q=(document.getElementById('expage-search')?.value||'').toLowerCase();
  const muscle=S.exPageMuscle;
  const muscles=['Pecho','Espalda','Piernas','Hombros','Brazos','Glúteos','Core','Cardio'];
  document.getElementById('muscle-chips').innerHTML=
    ['', ...muscles].map(m=>`
      <button class="mf-chip ${S.exPageMuscle===m?'active':''}" onclick="App.setExPageMuscle('${m}')">
        ${m||'Todos'}
      </button>`).join('');
  const list=allEx().filter(e=>e.name.toLowerCase().includes(q)&&(!muscle||e.muscle===muscle));
  const grouped={};
  for(const e of list){if(!grouped[e.muscle])grouped[e.muscle]=[];grouped[e.muscle].push(e);}
  const listEl=document.getElementById('expage-list'); if(!listEl) return;
  if(!list.length){listEl.innerHTML=`<p class="empty-state">Sin ejercicios encontrados.</p>`;return;}
  listEl.innerHTML=Object.entries(grouped).map(([muscle,exs])=>`
    <div class="expage-section-lbl">${muscle}</div>
    ${exs.map(e=>{
      const pr=S.personalRecords[e.id];
      const prTxt=pr?(pr.rm?(pr.rm+' '+S.unit):(pr.weight?pr.weight+' '+S.unit:'')):'';
      const imgUrl=ExGif.getCached(e.id);
      return`<div class="expage-item" onclick="App.openExDetail('${e.id}')">
        <div class="expage-thumb" id="expth-${e.id}"
          style="background:${hexAlpha(MUSCLE_COLORS[e.muscle]||'#4f8ef7',.15)}">
          ${imgUrl?`<img src="${imgUrl}" loading="lazy" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display='none'">`:''}
          ${!imgUrl?thumbSvg():''}
        </div>
        <div class="expage-info">
          <div class="expage-name">${e.name}${e.custom?'<span class="custom-chip">CUSTOM</span>':''}</div>
          <div class="expage-sub">${e.muscle} · ${e.equipment}</div>
        </div>
        ${prTxt?`<span class="expage-pr">${prTxt}</span>`:''}
      </div>`;
    }).join('')}`).join('');
  // Lazy load GIFs
  list.filter(e=>!e.custom&&!ExGif.getCached(e.id)&&!ExGif.isMissing(e.id)).forEach(e=>{
    ExGif.fetch(e.id).then(url=>{
      if(!url) return;
      const el=document.getElementById(`expth-${e.id}`);
      if(el) el.innerHTML=`<img src="${url}" loading="lazy" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display='none'">`;
    });
  });
}

// ─── RENDER: HISTORY ──────────────────────────────────────────────────────────
function rHistory(){
  const el=document.getElementById('history-list'); if(!el) return;
  const list=[...S.history].sort((a,b)=>new Date(b.date)-new Date(a.date));
  if(!list.length){el.innerHTML=`<p class="empty-state">Sin entrenamientos aún.</p>`;return;}
  el.innerHTML=list.map(w=>{
    const sc=(w.exercises||[]).reduce((a,e)=>a+(e.sets||[]).filter(s=>s.done).length,0);
    const prev=(w.exercises||[]).slice(0,4).map(e=>findEx(e.id)?.name||'?').join(' · ');
    return`<div class="history-card" onclick="App.openWDetail('${w.id}')">
      <div class="hc-date">${fmtDate(w.date)}</div>
      <div class="hc-name">${w.name}</div>
      <div class="hc-chips">
        <span class="hc-chip">⏱ <strong>${w.duration||'--'}</strong></span>
        <span class="hc-chip">🏋️ <strong>${w.volume||0} ${S.unit}</strong></span>
        <span class="hc-chip">📋 <strong>${sc} series</strong></span>
      </div>
      <div class="hc-exs">${prev}${(w.exercises||[]).length>4?' …':''}</div>
      ${w.sessionNote?`<div style="font-size:12px;color:var(--t3);margin-top:6px;font-style:italic">"${w.sessionNote.slice(0,80)}"</div>`:''}
    </div>`;
  }).join('');
}

// ─── RENDER: LIVE ─────────────────────────────────────────────────────────────
function rLive(){
  const lEl=document.getElementById('workout-live'); if(!lEl) return;
  const vol=Calc.volume(S.live.exercises);
  lEl.innerHTML=`<div class="live-wrap">
    <div class="live-topbar">
      <div class="live-left">
        <span class="live-title">${S.live.name}</span>
        <span class="live-elapsed" id="live-elapsed">00:00</span>
      </div>
      <div class="live-right">
        <button class="rc-icon-btn" onclick="App.openCalcPage()" title="Calculadora">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/></svg>
        </button>
        <button class="btn-finish" onclick="App.finishWorkout()">Finalizar</button>
      </div>
    </div>
    <div class="live-sub-bar">
      <span class="live-vol-chip" id="live-vol">${vol} ${S.unit} de volumen</span>
      <button class="live-save-btn" onclick="App.openSaveToRoutine()">Guardar en rutina</button>
    </div>
    <div class="session-note-wrap">
      <textarea class="session-note-inp" placeholder="Nota de la sesión (cómo te sientes, observaciones…)" rows="2"
        oninput="App.updSessionNote(this.value)">${S.live.sessionNote||''}</textarea>
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

function rExBlock(ex,bi){
  const info=findEx(ex.id);
  const rows=(ex.sets||[]).map((s,si)=>rSetRow(s,bi,si,info?.type)).join('');
  const isSuper=!!ex.supersetWith;
  return`<div class="ex-block ${isSuper?'is-superset':''}" id="exb-${bi}">
    ${isSuper?'<div class="superset-badge">🔗 Super serie</div>':''}
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
        <th>TIPO</th><th>${info?.type==='duration'?'SEG':'PESO ('+S.unit+')'}</th>
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

function rSetRow(s,bi,si,exType){
  const isDur=exType==='duration', isBW=exType==='bodyweight_reps';
  const prev=s.prev?(isDur?`${s.prev.w}s`:`${s.prev.w}×${s.prev.r}`):'—';
  return`<tr id="sr-${bi}-${si}" class="${s.done?'set-done':''}">
    <td><button class="stype-btn ${s.type}" onclick="App.cycleType(${bi},${si})">${s.type}</button></td>
    <td>${isBW?'<span style="font-size:10px;color:var(--t3)">BW</span>':`<input class="w-inp" type="number" step="${isDur?1:.5}" value="${s.w||''}" placeholder="0" oninput="App.updSet(${bi},${si},'w',this.value)"/>`}</td>
    <td><input class="r-inp" type="number" value="${s.r||''}" placeholder="0" oninput="App.updSet(${bi},${si},'r',this.value)"/></td>
    <td><input class="rpe-inp" type="number" step=".5" min="1" max="10" value="${s.rpe||''}" placeholder="—" oninput="App.updSet(${bi},${si},'rpe',this.value)"/></td>
    <td><span class="prev-hint">${prev}</span></td>
    <td><button class="check-btn ${s.done?'done':''}" onclick="App.toggleDone(${bi},${si})">${s.done?'✓':''}</button></td>
  </tr>`;
}

function refreshRow(bi,si){
  const exs=S.live?.exercises||S.rfExercises;
  const info=findEx(exs[bi].id);
  const row=document.getElementById(`sr-${bi}-${si}`);
  if(row) row.outerHTML=rSetRow(exs[bi].sets[si],bi,si,info?.type);
}
function refreshSets(bi){
  const exs=S.live?.exercises||S.rfExercises;
  const info=findEx(exs[bi].id);
  const tbody=document.getElementById(`stb-${bi}`);
  if(tbody) tbody.innerHTML=(exs[bi].sets||[]).map((s,si)=>rSetRow(s,si,bi,info?.type)).join('');
}
function updVolChip(){
  const el=document.getElementById('live-vol');
  if(el) el.textContent=`${Calc.volume(S.live.exercises)} ${S.unit} de volumen`;
}

// ─── RENDER: PICKER ───────────────────────────────────────────────────────────
function rPicker(q='',muscle=''){
  const list=allEx().filter(e=>e.name.toLowerCase().includes(q.toLowerCase())&&(!muscle||e.muscle===muscle));
  const grouped={};
  for(const e of list){if(!grouped[e.muscle])grouped[e.muscle]=[];grouped[e.muscle].push(e);}
  const el=document.getElementById('pk-list'); if(!el) return;
  if(!list.length){el.innerHTML=`<p class="empty-state">Sin resultados.</p>`;return;}
  el.innerHTML=Object.entries(grouped).map(([m,exs])=>`
    <div class="pk-section-lbl">${m}</div>
    ${exs.map(e=>{
      const url=ExGif.getCached(e.id);
      return`<div class="pk-item" onclick="App.selectEx('${e.id}')">
        <div class="pk-thumb" id="pkth-${e.id}" style="background:${hexAlpha(MUSCLE_COLORS[e.muscle]||'#4f8ef7',.15)}">
          ${url?`<img src="${url}" loading="lazy" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display='none'">`:''}
          ${!url?thumbSvg():''}
        </div>
        <div class="pk-info">
          <div class="pk-name">${e.name}${e.custom?'<span class="custom-chip">CUSTOM</span>':''}</div>
          <div class="pk-sub">${e.equipment}</div>
        </div>
        <span class="pk-add">+</span>
      </div>`;
    }).join('')}`).join('');
  list.filter(e=>!e.custom&&!ExGif.getCached(e.id)&&!ExGif.isMissing(e.id)).forEach(e=>{
    ExGif.fetch(e.id).then(url=>{
      if(!url) return;
      const el=document.getElementById(`pkth-${e.id}`);
      if(el) el.innerHTML=`<img src="${url}" loading="lazy" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display='none'">`;
    });
  });
}

function rRFExList(){
  const el=document.getElementById('rf-exlist'); if(!el) return;
  if(!S.rfExercises.length){el.innerHTML=`<p class="empty-state" style="padding:10px 0">Sin ejercicios — añade con el botón.</p>`;return;}
  el.innerHTML=S.rfExercises.map((ex,bi)=>{
    const info=findEx(ex.id);
    return`<div class="rfe-item">
      <div><div class="rfe-name">${info?.name||'?'}</div><div class="rfe-sub">${(ex.sets||[]).length} series · ${info?.muscle}</div></div>
      <button onclick="App.removeRFEx(${bi})" style="color:var(--t3);font-size:20px;padding:4px">×</button>
    </div>`;
  }).join('');
}

// ─── RENDER: EXERCISE DETAIL ──────────────────────────────────────────────────
function rExDetail(exId){
  S.currentExId=exId;
  const info=findEx(exId);
  document.getElementById('exd-name').textContent=info?.name||exId;
  document.getElementById('exd-primary').textContent=`Primario: ${info?.muscle||'—'}`;
  const sec=SECONDARY[exId]||[];
  const secEl=document.getElementById('exd-secondary');
  secEl.textContent=sec.length?`Secundario: ${sec.join(', ')}`:'';
  secEl.classList.toggle('hidden',!sec.length);
  // GIF
  const gifImg=document.getElementById('exd-gif-img');
  const gifStatus=document.getElementById('exd-gif-status');
  const gifPh=document.getElementById('exd-gif-ph');
  const gifWrap=document.getElementById('exd-gif-wrap');
  gifImg.classList.add('hidden');gifImg.src='';
  if(gifPh)gifPh.classList.remove('hidden');
  if(gifStatus)gifStatus.textContent=info?.custom?'Sin animación disponible':'Cargando…';
  if(gifWrap)gifWrap.style.background=hexAlpha(MUSCLE_COLORS[info?.muscle]||'#4f8ef7',.08);
  if(!info?.custom){
    const cached=ExGif.getCached(exId);
    if(cached)showGif(cached,exId);
    else ExGif.fetch(exId).then(url=>{
      if(S.currentExId===exId){
        if(url)showGif(url,exId);
        else if(gifStatus)gifStatus.textContent='No disponible';
      }
    });
  }
  document.getElementById('exd-range').value=String(S.exRangeDays);
  rExGraph(exId,S.exGraphMode);
  rExPRCard(exId);
  rExHistory(exId);
}

function showGif(url,exId){
  const img=document.getElementById('exd-gif-img');
  const ph=document.getElementById('exd-gif-ph');
  if(!img) return;
  img.onload=()=>{img.classList.remove('hidden');if(ph)ph.classList.add('hidden');};
  img.onerror=()=>{if(exId)ExGif.markBroken(exId);img.classList.add('hidden');if(ph)ph.classList.remove('hidden');};
  img.src=url;
}

function rExGraph(exId,mode){
  const canvas=document.getElementById('ex-chart'); if(!canvas) return;
  let sessions=S.history.filter(w=>w.exercises?.some(e=>e.id===exId))
    .sort((a,b)=>new Date(a.date)-new Date(b.date));
  if(S.exRangeDays>0){const cut=Date.now()-S.exRangeDays*86400000;sessions=sessions.filter(w=>new Date(w.date).getTime()>=cut);}
  const W=canvas.offsetWidth||340; canvas.width=W; canvas.height=150;
  const ctx=canvas.getContext('2d'); ctx.clearRect(0,0,W,150);
  const valFor=w=>{
    const ex=w.exercises.find(e=>e.id===exId);
    const done=(ex?.sets||[]).filter(s=>s.done&&s.type!=='W');
    if(!done.length) return 0;
    if(mode==='volume') return Math.max(...done.map(s=>(+s.w||0)*(+s.r||0)));
    if(mode==='best_weight') return Math.max(...done.map(s=>+s.w||0));
    if(mode==='1rm') return Math.max(...done.map(s=>Calc.oneRM(+s.w,+s.r)||0));
    return 0;
  };
  const hlVal=document.getElementById('exd-hl-val'), hlDate=document.getElementById('exd-hl-date');
  if(sessions.length){const last=sessions[sessions.length-1];const v=valFor(last);hlVal.textContent=`${v} ${S.unit}`;hlDate.textContent=fmtDateShort(last.date);}
  else{hlVal.textContent='—';hlDate.textContent='';}
  if(sessions.length<2){ctx.fillStyle='#3a3a58';ctx.font='12px sans-serif';ctx.textAlign='center';ctx.fillText('Necesitas al menos 2 sesiones en este rango',W/2,80);return;}
  const vals=sessions.map(valFor);
  const lo=Math.min(...vals)*0.97, hi=Math.max(...vals)*1.03||1;
  const X=i=>22+i*(W-44)/(sessions.length-1);
  const Y=v=>128-((v-lo)/(hi-lo||1))*105;
  ctx.strokeStyle='rgba(255,255,255,.05)';ctx.lineWidth=1;
  [hi,(hi+lo)/2,lo].forEach(v=>{const y=Y(v);ctx.beginPath();ctx.moveTo(22,y);ctx.lineTo(W-22,y);ctx.stroke();ctx.fillStyle='#3a3a58';ctx.font='9px sans-serif';ctx.textAlign='left';ctx.fillText(Math.round(v),2,y-2);});
  const grad=ctx.createLinearGradient(0,0,0,150);
  grad.addColorStop(0,'rgba(79,142,247,.2)');grad.addColorStop(1,'rgba(79,142,247,0)');
  ctx.beginPath();ctx.moveTo(X(0),Y(vals[0]));
  for(let i=1;i<vals.length;i++)ctx.lineTo(X(i),Y(vals[i]));
  ctx.lineTo(X(vals.length-1),150);ctx.lineTo(X(0),150);ctx.closePath();ctx.fillStyle=grad;ctx.fill();
  ctx.beginPath();ctx.moveTo(X(0),Y(vals[0]));
  for(let i=1;i<vals.length;i++)ctx.lineTo(X(i),Y(vals[i]));
  ctx.strokeStyle='#4f8ef7';ctx.lineWidth=2.5;ctx.lineJoin='round';ctx.stroke();
  vals.forEach((v,i)=>{ctx.beginPath();ctx.arc(X(i),Y(v),4,0,Math.PI*2);ctx.fillStyle='#4f8ef7';ctx.fill();});
  ctx.fillStyle='#3a3a58';ctx.font='9px sans-serif';ctx.textAlign='center';
  ctx.fillText(fmtDateShort(sessions[0].date),X(0),146);
  ctx.fillText(fmtDateShort(sessions[sessions.length-1].date),X(sessions.length-1),146);
}

function rExPRCard(exId){
  let bw=0,brm=0,bvol=0,bvolLbl='';
  for(const w of S.history){
    const ex=w.exercises?.find(e=>e.id===exId);if(!ex)continue;
    for(const s of(ex.sets||[])){if(!s.done||s.type==='W')continue;
      const wt=+s.w||0,rp=+s.r||0;if(wt>bw)bw=wt;
      const rm=Calc.oneRM(wt,rp);if(rm&&rm>brm)brm=rm;
      const vol=wt*rp;if(vol>bvol){bvol=vol;bvolLbl=`${wt}${S.unit} x ${rp}`;}
    }
  }
  document.getElementById('exd-pr-w').textContent=bw?`${bw}${S.unit}`:'—';
  document.getElementById('exd-pr-rm').textContent=brm?`${brm}${S.unit}`:'—';
  document.getElementById('exd-pr-vol').textContent=bvolLbl||'—';
}

function rExHistory(exId){
  const el=document.getElementById('exd-history'); if(!el) return;
  const sessions=S.history.filter(w=>w.exercises?.some(e=>e.id===exId))
    .sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,8);
  if(!sessions.length){el.innerHTML=`<p class="empty-state">Sin historial para este ejercicio.</p>`;return;}
  el.innerHTML=sessions.map(w=>{
    const ex=w.exercises.find(e=>e.id===exId);
    const done=(ex?.sets||[]).filter(s=>s.done&&s.type!=='W');
    return`<div class="exd-session"><div class="exd-sess-date">${fmtDate(w.date)}</div>
      ${done.map(s=>{const rm=Calc.oneRM(+s.w,+s.r);return`<div class="exd-set-row">
        <span class="exd-set-type">${s.type}</span>
        <span class="exd-set-val">${s.w} ${S.unit} × ${s.r}</span>
        <span class="exd-set-rm">${rm?'~'+rm+' 1RM':''}</span>
      </div>`;}).join('')}
    </div>`;
  }).join('');
}

// ─── RENDER: CALENDAR ─────────────────────────────────────────────────────────
function rCalendar(){
  const MONTHS=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  document.getElementById('cal-month-label').textContent=`${MONTHS[S.calMonth]} ${S.calYear}`;
  const first=new Date(S.calYear,S.calMonth,1).getDay(), days=new Date(S.calYear,S.calMonth+1,0).getDate();
  let html='';
  for(let i=0;i<first;i++) html+=`<div class="cal-cell empty"></div>`;
  for(let d=1;d<=days;d++){
    const ds=`${S.calYear}-${String(S.calMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const hasW=S.history.some(w=>w.date.slice(0,10)===ds);
    html+=`<div class="cal-cell ${hasW?'has-w':''} ${ds===today()?'today':''}" onclick="App.calDay('${ds}')">${d}</div>`;
  }
  document.getElementById('cal-grid').innerHTML=html;
  document.getElementById('cal-day-detail').innerHTML=`<p style="color:var(--t3);font-size:13px">Toca un día para ver el detalle.</p>`;
}

// ─── RENDER: WORKOUT DETAIL ───────────────────────────────────────────────────
function rWDetail(w){
  document.getElementById('wd-title').textContent=w.name;
  document.getElementById('wd-date').textContent=fmtDate(w.date);
  S.copyWorkoutId=w.id;
  const sc=(w.exercises||[]).reduce((a,e)=>a+(e.sets||[]).filter(s=>s.done).length,0);
  let html=`<div class="wd-stat-row">
    <div class="wd-stat"><div class="wd-stat-n">${w.duration||'--'}</div><div class="wd-stat-l">Duración</div></div>
    <div class="wd-stat"><div class="wd-stat-n">${w.volume||0}</div><div class="wd-stat-l">Vol. (${S.unit})</div></div>
    <div class="wd-stat"><div class="wd-stat-n">${sc}</div><div class="wd-stat-l">Series</div></div>
  </div>`;
  if(w.sessionNote) html+=`<div style="background:var(--bg3);border:1px solid var(--border);border-radius:var(--r);padding:10px 13px;margin-bottom:14px;font-size:13px;color:var(--t2);font-style:italic">"${w.sessionNote}"</div>`;
  for(const ex of(w.exercises||[])){
    const info=findEx(ex.id);
    const done=(ex.sets||[]).filter(s=>s.done);
    html+=`<div class="wd-ex">
      <div class="wd-ex-name" onclick="App.openExDetail('${ex.id}')">${info?.name||ex.id}${ex.supersetWith!==undefined&&ex.supersetWith!==null?'<span style="font-size:10px;color:var(--purple);margin-left:6px">🔗</span>':''}</div>
      ${done.map(s=>{const rm=Calc.oneRM(+s.w,+s.r);return`<div class="wd-set-row">
        <span class="exd-set-type">${s.type}</span>
        <span class="exd-set-val">${s.w} ${S.unit} × ${s.r}</span>
        <span class="exd-set-rm">${rm?'~'+rm+' 1RM':''}</span>
      </div>`;}).join('')}
      ${ex.note?`<div class="wd-note">${ex.note}</div>`:''}
    </div>`;
  }
  document.getElementById('wd-body').innerHTML=html;
}

// ─── APP CONTROLLER ───────────────────────────────────────────────────────────
const App = {
  init(){
    // Migrate old data
    const OLD=['hevy_v4','hevy_v3','hevy_v2','pulse_v1','fittrack_v2'];
    if(!localStorage.getItem(Store.KEY)){
      for(const k of OLD){
        const raw=localStorage.getItem(k);if(!raw)continue;
        try{
          const old=JSON.parse(raw);
          if(old.routines?.length||old.history?.length||old.measures?.length){
            localStorage.setItem(Store.KEY,JSON.stringify({
              profile:old.profile??{name:'Atleta',handle:'@usuario',bio:''},
              unit:old.unit??'kg', barWeight:old.barWeight??20, restTime:old.restTime??90,
              routines:old.routines??[], customExercises:old.customExercises??[],
              history:old.history??[], measures:old.measures??[],
              personalRecords:old.personalRecords??{},
            }));
            setTimeout(()=>toast('✓ Datos importados desde versión anterior'),800);
            break;
          }
        }catch(e){}
      }
    }
    // Clear GIF cache if version changed
    if(localStorage.getItem('hevy_gif_ver')!=='3'){
      localStorage.removeItem(Store.GIF_KEY);
      ExGif._cache=null;
      localStorage.setItem('hevy_gif_ver','3');
    }
    ExGif.clearBroken();
    Store.load();
    document.getElementById('cfg-name').value=S.profile.name;
    document.getElementById('cfg-handle').value=S.profile.handle;
    document.getElementById('cfg-unit').value=S.unit;
    document.getElementById('cfg-rest').value=S.restTime;
    document.getElementById('cfg-bar').value=S.barWeight;
    document.getElementById('m-date').value=today();
    document.getElementById('pl-unit').textContent=S.unit;
    document.getElementById('pl-bar-hint').textContent=`Barra olímpica: ${S.barWeight} kg`;
    rProfile();rRoutines();rHistory();rExPage();
  },

  nav(page,btn){
    document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
    document.querySelectorAll('.bn-btn').forEach(b=>b.classList.remove('active'));
    document.getElementById(`page-${page}`).classList.add('active');
    btn.classList.add('active');
    if(page==='profile')rProfile();
    if(page==='routines')rRoutines();
    if(page==='history')rHistory();
    if(page==='exercises')rExPage();
  },

  open(id){document.getElementById(id)?.classList.remove('hidden');},
  close(id){document.getElementById(id)?.classList.add('hidden');},

  // Settings
  openSettings(){this.open('modal-settings');},
  saveSettings(){
    S.profile.name=document.getElementById('cfg-name').value.trim()||'Atleta';
    S.profile.handle=document.getElementById('cfg-handle').value.trim()||'@usuario';
    S.unit=document.getElementById('cfg-unit').value;
    S.restTime=parseInt(document.getElementById('cfg-rest').value)||90;
    S.barWeight=parseFloat(document.getElementById('cfg-bar').value)||20;
    Store.save();this.close('modal-settings');rProfile();toast('Configuración guardada ✓');
  },
  clearData(){if(!confirm('¿Borrar todos los datos?'))return;localStorage.removeItem(Store.KEY);localStorage.removeItem(Store.GIF_KEY);localStorage.removeItem('hevy_gif_ver');location.reload();},
  clearGifCache(){localStorage.removeItem(Store.GIF_KEY);ExGif._cache=null;this.close('modal-settings');toast('Caché de imágenes limpiado ✓');},

  // Profile
  openEditProfile(){document.getElementById('ep-name').value=S.profile.name;document.getElementById('ep-handle').value=S.profile.handle;document.getElementById('ep-bio').value=S.profile.bio||'';this.open('modal-profile');},
  saveProfile(){S.profile.name=document.getElementById('ep-name').value.trim()||'Atleta';S.profile.handle=document.getElementById('ep-handle').value.trim()||'@usuario';S.profile.bio=document.getElementById('ep-bio').value.trim();Store.save();rProfile();this.close('modal-profile');toast('Perfil actualizado ✓');},

  // Routines
  openRoutineForm(id=null){
    S.editRoutineId=id;
    if(id){const r=S.routines.find(r=>r.id===id);document.getElementById('rform-title').textContent='Editar rutina';document.getElementById('rf-name').value=r.name;document.getElementById('rf-notes').value=r.notes||'';S.rfExercises=(r.exercises||[]).map(e=>({...e,sets:(e.sets||[]).map(s=>({...s}))}));}
    else{document.getElementById('rform-title').textContent='Nueva rutina';document.getElementById('rf-name').value='';document.getElementById('rf-notes').value='';S.rfExercises=[];}
    rRFExList();this.open('modal-routine');
  },
  saveRoutine(){
    const name=document.getElementById('rf-name').value.trim();
    if(!name){toast('Escribe un nombre.');return;}
    const r={id:S.editRoutineId||uid(),name,notes:document.getElementById('rf-notes').value.trim(),exercises:S.rfExercises};
    if(S.editRoutineId){const idx=S.routines.findIndex(x=>x.id===S.editRoutineId);S.routines[idx]=r;}else S.routines.push(r);
    Store.save();rRoutines();this.close('modal-routine');toast('Rutina guardada ✓');
  },
  deleteRoutine(id){if(!confirm('¿Eliminar?'))return;S.routines=S.routines.filter(r=>r.id!==id);Store.save();rRoutines();},
  removeRFEx(bi){S.rfExercises.splice(bi,1);rRFExList();},

  // Picker
  openPicker(ctx){
    S.pickerCtx=ctx;
    document.getElementById('pk-search').value='';
    document.getElementById('pk-muscle').value='';
    rPicker();this.open('modal-picker');
  },
  filterPicker(){rPicker(document.getElementById('pk-search').value,document.getElementById('pk-muscle').value);},
  selectEx(exId){
    const info=findEx(exId);
    const newEx={id:exId,sets:[{type:'N',w:'',r:'',rpe:'',done:false,prev:null}],restTime:S.restTime,note:''};
    const lastW=[...S.history].reverse().find(w=>w.exercises?.some(e=>e.id===exId));
    if(lastW){const lastEx=lastW.exercises.find(e=>e.id===exId);const done=(lastEx?.sets||[]).filter(s=>s.done&&s.type!=='W');if(done.length)newEx.sets=done.map(s=>({type:s.type||'N',w:'',r:'',rpe:'',done:false,prev:{w:s.w,r:s.r}}));}
    if(S.pickerCtx==='live'&&S.live){
      S.live.exercises.push(newEx);
      const lEl=document.getElementById('live-ex-list');
      if(lEl){const bi=S.live.exercises.length-1;lEl.insertAdjacentHTML('beforeend',rExBlock(newEx,bi));}
    } else if(S.pickerCtx==='routine'){
      S.rfExercises.push(newEx);rRFExList();this.close('modal-picker');this.open('modal-routine');return;
    } else if(S.pickerCtx==='superset'&&S.supersetBi!==null){
      newEx.supersetWith=S.supersetBi;
      S.live.exercises.splice(S.supersetBi+1,0,newEx);
      rLive();S.supersetBi=null;
    }
    this.close('modal-picker');
  },
  openCreateEx(){document.getElementById('ce-name').value='';this.close('modal-picker');this.open('modal-create-ex');},
  saveCustomEx(){
    const name=document.getElementById('ce-name').value.trim();if(!name){toast('Escribe un nombre.');return;}
    const ex={id:'c'+uid(),name,muscle:document.getElementById('ce-muscle').value,equipment:document.getElementById('ce-equip').value,type:document.getElementById('ce-type').value,custom:true};
    S.customExercises.push(ex);Store.save();this.close('modal-create-ex');rPicker();this.open('modal-picker');toast(`"${name}" creado ✓`);
  },

  // Set ops
  exList(){return S.live?.exercises||S.rfExercises;},
  addSet(bi){const exs=this.exList();const last=exs[bi].sets.at(-1);exs[bi].sets.push({type:last?.type||'N',w:'',r:'',rpe:'',done:false,prev:null});refreshSets(bi);},
  updSet(bi,si,field,val){const s=this.exList()[bi].sets[si];s[field]=['w','r','rpe'].includes(field)?(parseFloat(val)||0):val;if(S.live)updVolChip();},
  updNote(bi,val){const exs=this.exList();if(exs[bi])exs[bi].note=val;},
  updSessionNote(val){if(S.live)S.live.sessionNote=val;},
  cycleType(bi,si){const types=['N','W','D','F','S'];const s=this.exList()[bi].sets[si];s.type=types[(types.indexOf(s.type)+1)%types.length];refreshRow(bi,si);},
  toggleDone(bi,si){
    const s=this.exList()[bi].sets[si];s.done=!s.done;refreshRow(bi,si);
    if(s.done&&s.type!=='W'&&S.live){
      updVolChip();vibrate(12);
      this._checkPR(S.live.exercises[bi].id,+s.w,+s.r);
      this.startRest(S.live.exercises[bi].restTime??S.restTime);
    }
  },
  removeEx(bi){this.exList().splice(bi,1);if(S.live)rLive();else rRFExList();},
  setExRest(bi){const cur=S.live?.exercises[bi]?.restTime??S.restTime;const val=prompt('Descanso (segundos):',cur);if(val&&!isNaN(+val)&&S.live){S.live.exercises[bi].restTime=+val;rLive();}},
  addSuperset(bi){S.pickerCtx='superset';S.supersetBi=bi;document.getElementById('pk-search').value='';document.getElementById('pk-muscle').value='';rPicker();this.open('modal-picker');},

  // PR
  _checkPR(exId,w,r){
    if(!w||!r)return;
    const rm=Calc.oneRM(w,r);const cur=S.personalRecords[exId];
    const isNew=!cur||(rm&&cur.rm&&rm>cur.rm)||(!rm&&w>(cur.weight||0));
    if(isNew){S.personalRecords[exId]={weight:w,reps:r,rm,date:today()};Store.save();flashPR(`¡Récord personal! ${findEx(exId)?.name} — ${rm?rm+' '+S.unit+' (1RM)':w+' '+S.unit}`);}
  },

  // Save to routine
  openSaveToRoutine(){
    const el=document.getElementById('save-routine-list'); if(!el) return;
    el.innerHTML=S.routines.map(r=>`
      <div class="save-routine-item" onclick="App.updateRoutineFromLive('${r.id}')">
        <div><div class="sri-name">${r.name}</div><div class="sri-meta">${(r.exercises||[]).length} ejercicios</div></div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
      </div>`).join('')||`<p class="empty-state" style="padding:10px 0">Sin rutinas guardadas.</p>`;
    this.open('modal-save-routine');
  },
  updateRoutineFromLive(routineId){
    const idx=S.routines.findIndex(r=>r.id===routineId);if(idx<0)return;
    S.routines[idx].exercises=S.live.exercises.map(ex=>({id:ex.id,restTime:ex.restTime??S.restTime,supersetWith:ex.supersetWith||null,sets:(ex.sets||[]).map(s=>({type:s.type||'N',w:'',r:'',rpe:'',done:false,prev:null}))}));
    Store.save();this.close('modal-save-routine');toast(`"${S.routines[idx].name}" actualizada ✓`);
  },
  saveAsNewRoutine(){
    const name=prompt('Nombre para la nueva rutina:',S.live?.name||'Mi rutina');if(!name)return;
    S.routines.push({id:uid(),name,notes:'Guardada desde sesión en vivo',exercises:S.live.exercises.map(ex=>({id:ex.id,restTime:ex.restTime??S.restTime,supersetWith:ex.supersetWith||null,sets:(ex.sets||[]).map(s=>({type:s.type||'N',w:'',r:'',rpe:'',done:false,prev:null}))}))});
    Store.save();this.close('modal-save-routine');toast(`"${name}" guardada ✓`);
  },

  // Live session
  startEmpty(){this._begin({name:'Entrenamiento',exercises:[]});},
  startFromRoutine(id){
    const r=S.routines.find(r=>r.id===id);if(!r)return;
    const exercises=(r.exercises||[]).map(ex=>{
      const newEx={id:ex.id,sets:[],restTime:ex.restTime??S.restTime,note:'',supersetWith:ex.supersetWith||null};
      const lastW=[...S.history].reverse().find(w=>w.exercises?.some(e=>e.id===ex.id));
      const lastEx=lastW?.exercises?.find(e=>e.id===ex.id);
      const done=(lastEx?.sets||[]).filter(s=>s.done&&s.type!=='W');
      if(done.length)newEx.sets=done.map(s=>({type:s.type||'N',w:'',r:'',rpe:'',done:false,prev:{w:s.w,r:s.r}}));
      else newEx.sets=(ex.sets?.length?ex.sets:[{type:'N'}]).map(s=>({type:s.type||'N',w:'',r:'',rpe:'',done:false,prev:null}));
      return newEx;
    });
    this._begin({name:r.name,routineId:id,exercises});
    document.querySelector('[data-page="workout"]').click();
  },
  _begin(data){
    S.live={name:data.name,startTime:Date.now(),routineId:data.routineId||null,exercises:data.exercises,sessionNote:''};
    document.getElementById('workout-idle').classList.add('hidden');
    const lEl=document.getElementById('workout-live');
    lEl.classList.remove('hidden');rLive();
  },
  finishWorkout(){
    const exs=S.live.exercises;
    const hasDone=exs.some(e=>e.sets.some(s=>s.done));
    if(!hasDone&&!confirm('No hay series completadas. ¿Finalizar?'))return;
    clearInterval(S.liveTimerID);this.skipRest();
    const elapsed=Math.floor((Date.now()-S.live.startTime)/1000);
    const vol=Calc.volume(exs);
    S.history.push({id:uid(),name:S.live.name,date:new Date().toISOString(),duration:fmtTime(elapsed),exercises:exs,volume:vol,sessionNote:S.live.sessionNote||''});
    for(const ex of exs)for(const s of ex.sets)if(s.done&&s.type!=='W')this._checkPR(ex.id,+s.w,+s.r);
    Store.save();S.live=null;
    document.getElementById('workout-idle').classList.remove('hidden');
    document.getElementById('workout-live').classList.add('hidden');
    document.getElementById('workout-live').innerHTML='';
    rProfile();rHistory();rExPage();
    toast(`✓ Sesión guardada · ${vol} ${S.unit} de volumen`);vibrate(30);
  },
  cancelWorkout(){
    if(!confirm('¿Cancelar la sesión? No se guardará.'))return;
    clearInterval(S.liveTimerID);this.skipRest();S.live=null;
    document.getElementById('workout-idle').classList.remove('hidden');
    document.getElementById('workout-live').classList.add('hidden');
    document.getElementById('workout-live').innerHTML='';
  },
  copyWorkout(){
    const w=S.history.find(w=>w.id===S.copyWorkoutId);if(!w)return;
    this.close('modal-wdetail');
    this._begin({name:w.name,exercises:(w.exercises||[]).map(ex=>({id:ex.id,supersetWith:ex.supersetWith||null,sets:(ex.sets||[]).filter(s=>s.done&&s.type!=='W').map(s=>({type:s.type||'N',w:'',r:'',rpe:'',done:false,prev:{w:s.w,r:s.r}})),restTime:ex.restTime??S.restTime,note:''}))});
    document.querySelector('[data-page="workout"]').click();
  },

  // Rest timer
  startRest(dur){
    const total=dur??S.restTime;S.restTotal=S.restLeft=total;
    document.getElementById('rest-overlay').classList.remove('hidden');
    this._updateRest(total,total);clearInterval(S.restID);
    S.restID=setInterval(()=>{S.restLeft--;this._updateRest(S.restLeft,S.restTotal);if(S.restLeft<=0){clearInterval(S.restID);this.skipRest();this._beep();}},1000);
  },
  addRestTime(d){S.restLeft=Math.max(1,S.restLeft+d);S.restTotal=Math.max(S.restTotal,S.restLeft);this._updateRest(S.restLeft,S.restTotal);},
  skipRest(){clearInterval(S.restID);document.getElementById('rest-overlay').classList.add('hidden');},
  _updateRest(rem,total){
    document.getElementById('rest-num').textContent=rem;
    const C=2*Math.PI*68;
    document.getElementById('ring-arc').style.strokeDashoffset=C*(1-rem/total);
  },
  _beep(){
    try{
      const ac=new(window.AudioContext||window.webkitAudioContext)();
      [660,880].forEach((freq,i)=>{
        const o=ac.createOscillator(),g=ac.createGain();
        o.connect(g);g.connect(ac.destination);o.frequency.value=freq;
        g.gain.setValueAtTime(.3,ac.currentTime+i*.25);
        g.gain.exponentialRampToValueAtTime(.001,ac.currentTime+i*.25+.3);
        o.start(ac.currentTime+i*.25);o.stop(ac.currentTime+i*.25+.3);
      });
      vibrate([100,50,100]);
    }catch(e){}
  },

  // Measures
  openMeasureForm(){['m-weight','m-fat','m-waist','m-hip','m-chest','m-shoulders','m-bicep','m-thigh','m-calf','m-neck'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});document.getElementById('m-date').value=today();this.open('modal-measure');},
  saveMeasure(){
    const p=id=>{const v=document.getElementById(id)?.value;return v!==''&&v!=null?parseFloat(v)||null:null;};
    const m={date:document.getElementById('m-date').value||today(),weight:p('m-weight'),fat:p('m-fat'),waist:p('m-waist'),hip:p('m-hip'),chest:p('m-chest'),shoulders:p('m-shoulders'),bicep:p('m-bicep'),thigh:p('m-thigh'),calf:p('m-calf'),neck:p('m-neck')};
    S.measures=S.measures.filter(x=>x.date!==m.date);S.measures.push(m);S.measures.sort((a,b)=>a.date.localeCompare(b.date));
    Store.save();rProfile();this.close('modal-measure');toast('Medida guardada ✓');
  },

  // Plates
  calcPlates(){
    const target=parseFloat(document.getElementById('pl-target').value);
    const el=document.getElementById('pl-result');if(!target){el.innerHTML='';return;}
    const{result,leftover,bar,error}=Calc.plates(target);
    if(error){el.innerHTML=`<p class="pl-err">${error}</p>`;return;}
    const cls={20:'d20',15:'d15',10:'d10',5:'d5',2.5:'d25',1.25:'d125'};
    const loaded=bar+(result?.reduce((a,r)=>a+r.p*r.n,0)||0)*2;
    let html=`<p class="pl-side-lbl">Por lado de la barra</p>`;
    if(!result.length)html+=`<p style="color:var(--t3);font-size:13px">Solo el peso de la barra.</p>`;
    else html+=result.map(({p,n})=>`<div class="pl-row"><span class="pl-count">×${n}</span><div class="pl-discs">${Array(n).fill(`<span class="disc ${cls[p]}">${p}</span>`).join('')}</div></div>`).join('');
    html+=`<p class="pl-ok" style="margin-top:8px">Total: ${loaded} kg${leftover>.01?` (diff: ${(leftover*2).toFixed(2)} kg)`:' ✓'}</p>`;
    el.innerHTML=html;
  },

  // Macros calc
  setGoal(goal,btn){
    S.calcGoal=goal;
    document.querySelectorAll('.goal-chip').forEach(c=>c.classList.remove('active'));
    btn.classList.add('active');
  },
  calcMacros(){
    const age=parseInt(document.getElementById('calc-age').value);
    const weight=parseFloat(document.getElementById('calc-weight').value);
    const height=parseFloat(document.getElementById('calc-height').value);
    const sex=document.getElementById('calc-sex').value;
    const activity=document.getElementById('calc-activity').value;
    if(!age||!weight||!height){toast('Completa todos los campos.');return;}
    const{tdee,protein,fat,carbs,label}=Calc.macros(age,weight,height,sex,activity,S.calcGoal);
    const el=document.getElementById('macro-result');
    el.innerHTML=`
      <div class="macro-row"><span class="macro-lbl">${label}</span><span class="macro-val highlight">${tdee} kcal</span></div>
      <div class="macro-row"><span class="macro-lbl">🥩 Proteína</span><span class="macro-val">${protein}g</span></div>
      <div class="macro-row"><span class="macro-lbl">🍚 Carbohidratos</span><span class="macro-val">${carbs}g</span></div>
      <div class="macro-row"><span class="macro-lbl">🥑 Grasas</span><span class="macro-val">${fat}g</span></div>
    `;
    el.classList.remove('hidden');
  },

  // Workout detail
  openWDetail(id){const w=S.history.find(w=>w.id===id);if(!w)return;rWDetail(w);this.open('modal-wdetail');},

  // Exercise detail
  openExDetail(exId){
    S.exGraphMode='best_weight';S.exRangeDays=90;
    document.querySelectorAll('#exd-tabs .gtab').forEach((t,i)=>t.classList.toggle('active',i===0));
    rExDetail(exId);this.open('modal-ex-detail');
  },
  switchExGraph(mode,btn){S.exGraphMode=mode;document.querySelectorAll('#exd-tabs .gtab').forEach(t=>t.classList.remove('active'));btn.classList.add('active');rExGraph(S.currentExId,mode);},
  changeExRange(days){S.exRangeDays=parseInt(days);rExGraph(S.currentExId,S.exGraphMode);},

  // Exercises page
  renderExPage(){rExPage();},
  setExPageMuscle(m){S.exPageMuscle=m;rExPage();},

  // Calc page
  openCalcPage(){document.querySelector('[data-page="calc"]').click();},

  // Calendar
  openCalendar(){rCalendar();this.open('modal-calendar');},
  calPrev(){S.calMonth--;if(S.calMonth<0){S.calMonth=11;S.calYear--;}rCalendar();},
  calNext(){S.calMonth++;if(S.calMonth>11){S.calMonth=0;S.calYear++;}rCalendar();},
  calDay(ds){
    const ws=S.history.filter(w=>w.date.slice(0,10)===ds);
    const el=document.getElementById('cal-day-detail');
    if(!ws.length){el.innerHTML='<p style="color:var(--t3);font-size:13px">Sin entrenamientos este día.</p>';return;}
    el.innerHTML=ws.map(w=>`<div style="margin-bottom:6px;cursor:pointer" onclick="App.close('modal-calendar');App.openWDetail('${w.id}')"><strong style="font-size:14px">${w.name}</strong><span style="font-size:12px;color:var(--t3);margin-left:8px">${w.volume||0} ${S.unit} · ${w.duration||'--'}</span></div>`).join('');
  },
};

// ── Timer ──────────────────────────────────────────────────────────────────────
function startTimer(){
  clearInterval(S.liveTimerID);
  S.liveTimerID=setInterval(()=>{
    const el=document.getElementById('live-elapsed');
    if(el&&S.live)el.textContent=fmtTime(Math.floor((Date.now()-S.live.startTime)/1000));
  },1000);
}

// ── Boot ───────────────────────────────────────────────────────────────────────
window.App=App;
document.addEventListener('DOMContentLoaded',()=>App.init());
document.addEventListener('click',e=>{if(e.target.classList.contains('overlay'))e.target.classList.add('hidden');});
