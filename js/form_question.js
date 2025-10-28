// Footer year
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// DOM references
const landing = document.getElementById('landing');
const flow = document.getElementById('flow');
const startBtn = document.getElementById('startBtn');
const backBtn = document.getElementById('backBtn');
const nextBtn = document.getElementById('nextBtn');

const panel = document.querySelector('.panel');
const formView = document.getElementById('formView');

const optionsWrap = document.getElementById('options');
const qTitle = document.getElementById('qTitle');
const stepBadge = document.getElementById('stepBadge');
const visualInner = document.getElementById('visualInner');

const resultsEl = document.getElementById('results');
const resultGrid = document.getElementById('resultGrid');

const progressDashes = [
  document.getElementById('pg0'),
  document.getElementById('pg1'),
  document.getElementById('pg2'),
  document.getElementById('pg3')
];

// Steps (4-step flow → results after step 4)
const steps = [
  {
    id: 'style',
    title: 'What style of vehicle are you looking for?',
    type: 'single',
    options: ['Sedan','SUV','Truck',"I’m flexible"],
    visual: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=80'
  },
  {
    id: 'distance',
    title: 'How far do you drive each day?',
    type: 'single',
    options: ['0–40 miles','40–100 miles','100+ miles'],
    visual: 'https://images.unsplash.com/photo-1519751138087-5acb0d27c03c?auto=format&fit=crop&w=1400&q=80'
  },
  {
    id: 'use',
    title: 'How will you use your new vehicle? (Select all that apply)',
    type: 'multi',
    options: ['Road trips','Errands','Family driving','Commuting','Performance driving','Technology','Car camping','Winter driving'],
    visual: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80'
  },
  {
    id: 'priority',
    title: 'What do you want most from your next vehicle?',
    type: 'single',
    options: ['Range','Speed','Luxury','Utility','Affordability'],
    visual: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=1400&q=80'
  }
];

const answers = { style:null, distance:null, use:[], priority:null };
let stepIndex = 0;

/* -------- View helpers -------- */
function enterFormMode(){
  panel.classList.remove('show-results');
  formView.style.display = 'block';
  resultsEl.hidden = true;
  qTitle.hidden = false;
  optionsWrap.hidden = false;
  const foot = panel.querySelector('.panel-foot');
  if (foot) foot.style.display = '';
}

function enterResultsMode(){
  panel.classList.add('show-results');
  formView.style.display = 'none';
  qTitle.hidden = true;
  optionsWrap.hidden = true;
  const foot = panel.querySelector('.panel-foot');
  if (foot) foot.style.display = 'none';
  resultsEl.hidden = false;
}

/* -------- Navigation -------- */
startBtn?.addEventListener('click', (e)=>{
  e.preventDefault();
  landing.style.display='none';
  flow.classList.add('show');
  renderStep();
});

backBtn.addEventListener('click', ()=>{
  // If in results, return to step 4
  if (!resultsEl.hidden || panel.classList.contains('show-results')){
    enterFormMode();
    stepIndex = steps.length - 1; // step 4
    renderStep();
    return;
  }
  if (stepIndex === 0){
    flow.classList.remove('show');
    landing.style.display = 'grid';
    return;
  }
  stepIndex--;
  renderStep();
});

nextBtn.addEventListener('click', ()=>{
  if (!isStepValid()) return;
  if (stepIndex < steps.length - 1){
    stepIndex++;
    renderStep();
  } else {
    showResults();
  }
});

/* -------- Render -------- */
function renderStep(){
  enterFormMode(); // ensure question UI is visible

  const step = steps[stepIndex];

  // Visual + badge
  visualInner.style.backgroundImage = `url('${step.visual}')`;
  stepBadge.textContent = `Step ${stepIndex+1} of ${steps.length}`;

  // Progress
  progressDashes.forEach((d,i)=> d.classList.toggle('active', i <= stepIndex));

  // Question
  qTitle.textContent = step.title;

  // Build options
  optionsWrap.innerHTML = '';
  optionsWrap.className = step.type === 'multi' ? 'chips' : 'opts';

  if (step.type === 'single'){
    step.options.forEach((label,idx)=>{
      const id = `${step.id}-${idx}`;
      const row = document.createElement('label');
      row.className = 'opt';
      row.innerHTML = `
        <input type="radio" name="${step.id}" id="${id}" value="${label}" aria-label="${label}">
        <span>${label}</span>
      `;
      optionsWrap.appendChild(row);
    });
    // restore selection
    if (answers[step.id]){
      [...optionsWrap.querySelectorAll('input')].forEach(i=>{
        if (i.value === answers[step.id]) i.checked = true;
      });
    }
    optionsWrap.addEventListener('change', onChangeSingle, {once:true});
  } else {
    step.options.forEach((label,idx)=>{
      const id = `${step.id}-${idx}`;
      const chip = document.createElement('label');
      chip.className = 'chip';
      chip.setAttribute('for', id);
      chip.innerHTML = `<input type="checkbox" id="${id}" value="${label}"><span>${label}</span>`;
      optionsWrap.appendChild(chip);
    });
    // restore multiselect
    const selected = new Set(answers[step.id]);
    [...optionsWrap.querySelectorAll('input')].forEach(i=>{
      if (selected.has(i.value)) { i.checked = true; i.parentElement.classList.add('active'); }
      i.addEventListener('change', (e)=>{
        e.target.parentElement.classList.toggle('active', e.target.checked);
        const vals = [...optionsWrap.querySelectorAll('input:checked')].map(x=>x.value);
        answers[step.id] = vals;
        nextBtn.disabled = vals.length === 0;
      });
    });
  }

  // Next CTA
  nextBtn.disabled = !isStepValid();
  nextBtn.textContent = stepIndex === steps.length-1 ? 'See my matches →' : 'Next →';
}

function onChangeSingle(){
  const step = steps[stepIndex];
  const val = optionsWrap.querySelector('input:checked')?.value || null;
  answers[step.id] = val;
  nextBtn.disabled = !val;
  // keep listening if changed again
  optionsWrap.addEventListener('change', onChangeSingle);
}

function isStepValid(){
  const step = steps[stepIndex];
  if (step.type === 'single') return !!answers[step.id];
  return Array.isArray(answers[step.id]) && answers[step.id].length > 0;
}

/* -------- Results -------- */
function showResults(){
  enterResultsMode();

  stepBadge.textContent = 'Matches ready';
  progressDashes.forEach(d=>d.classList.add('active'));

  const picks = pickCars(answers);
  resultGrid.innerHTML = '';
  picks.forEach(c => resultGrid.appendChild(renderCard(c)));
}

function pickCars(a){
  const cars = [
    {name:'Astra SUV', type:'SUV', powertrain:'Hybrid', range:'560 km', price:'₹14.9L', focus:['Utility','Family','Comfort']},
    {name:'Veloce Sedan', type:'Sedan', powertrain:'Petrol', range:'650 km', price:'₹12.5L', focus:['Luxury','Comfort','Tech']},
    {name:'Terra Truck', type:'Truck', powertrain:'Diesel', range:'720 km', price:'₹18.4L', focus:['Utility','Performance']},
    {name:'Flux E-Sedan', type:'Sedan', powertrain:'Electric', range:'420 km', price:'₹19.2L', focus:['Range','Tech','Speed']},
    {name:'TrailX SUV', type:'SUV', powertrain:'AWD Petrol', range:'600 km', price:'₹16.8L', focus:['Winter','Road trips','Utility']},
  ];

  const wantType = a.style && a.style !== "I’m flexible" ? a.style : null;
  const wantSpeed = a.priority === 'Speed';
  const wantRange = a.priority === 'Range';
  const family = a.use.includes('Family driving');
  const winter = a.use.includes('Winter driving');
  const road = a.use.includes('Road trips');
  const tech = a.use.includes('Technology');
  const utility = a.priority === 'Utility' || a.use.includes('Errands') || a.use.includes('Car camping');

  const scored = cars.map(car=>{
    let score = 0;
    if (wantType && car.type === wantType) score += 3;
    if (!wantType) score += 1;
    if (family && car.type === 'SUV') score += 2;
    if (utility && (car.type === 'SUV' || car.type === 'Truck')) score += 2;
    if (winter && (car.type === 'SUV' || car.powertrain.includes('AWD'))) score += 1;
    if (wantRange && (car.powertrain === 'Hybrid' || car.powertrain === 'Diesel' || car.powertrain === 'Electric')) score += 2;
    if (wantSpeed && (car.name.includes('Veloce') || car.name.includes('Flux'))) score += 2;
    if (tech && (car.name.includes('Flux') || car.powertrain === 'Electric')) score += 1;
    if (a.distance === '100+ miles' && (car.powertrain === 'Hybrid' || car.powertrain === 'Diesel')) score += 1;
    return {...car, score};
  }).sort((a,b)=>b.score-a.score);

  return scored.slice(0,2);
}

function renderCard(c){
  const card = document.createElement('div');
  card.className = 'car-card';
  card.innerHTML = `
    <div class="car-media"><div class="ph" aria-hidden="true"></div></div>
    <div class="car-body">
      <div style="display:flex;align-items:center;gap:8px;justify-content:space-between">
        <div>
          <div style="font-weight:800;font-size:18px">${c.name}</div>
          <div style="color:#b8c6e3;font-size:13px">${c.type} • ${c.powertrain} • ${c.range} • ${c.price}</div>
        </div>
        <button class="save" aria-pressed="false">Save ☆</button>
      </div>
      <div class="badges">
        ${c.focus.map(f=>`<span class="badge">${f}</span>`).join('')}
      </div>
      <div class="cta-row">
        <button class="ghost">Demo drive</button>
        <button class="primary">Design yours</button>
      </div>
    </div>
  `;
  const saveBtn = card.querySelector('.save');
  saveBtn.addEventListener('click', ()=>{
    const active = saveBtn.getAttribute('aria-pressed') === 'true';
    saveBtn.setAttribute('aria-pressed', String(!active));
    saveBtn.textContent = !active ? 'Saved ★' : 'Save ☆';
  });
  return card;
}
