import { state } from '../state/store.js';
import { updatePreview } from './preview.js';

export function addExperience() {
  const index = state.experience.length;
  state.experience.push({
    role: '',
    company: '',
    period: '',
    description: '',
    keyAchievements: [],
    techStack: [],
    tools: []
  });

  const container = document.getElementById('experienceContainer');
  if (!container) return;

  const div = document.createElement('div');
  div.className = 'p-4 bg-white rounded-lg border border-stone-100 space-y-4';
  div.dataset.index = String(index);
  div.innerHTML = `
    <div class="flex justify-between items-center">
      <span class="text-sm font-medium text-stone-500">Experiencia #${index + 1}</span>
      ${index > 0 ? `<button type="button" data-action="remove-experience" data-index="${index}" class="text-rose-500 hover:text-rose-600 text-sm">Eliminar</button>` : ''}
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="space-y-2">
        <label class="text-sm font-medium text-stone-600">Cargo *</label>
        <input type="text" name="exp-role-${index}" placeholder="Ej: Desarrollador Full Stack" class="w-full px-3 py-2 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-300" data-action="exp-input" data-index="${index}" data-field="role">
      </div>
      <div class="space-y-2">
        <label class="text-sm font-medium text-stone-600">Empresa *</label>
        <input type="text" name="exp-company-${index}" placeholder="Ej: Tech Solutions S.A." class="w-full px-3 py-2 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-300" data-action="exp-input" data-index="${index}" data-field="company">
      </div>
      <div class="space-y-2 md:col-span-2">
        <label class="text-sm font-medium text-stone-600">Período *</label>
        <input type="text" name="exp-period-${index}" placeholder="Ej: Enero 2021 - Presente" class="w-full px-3 py-2 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-300" data-action="exp-input" data-index="${index}" data-field="period">
      </div>
      <div class="space-y-2 md:col-span-2">
        <label class="text-sm font-medium text-stone-600">Descripción *</label>
        <textarea name="exp-desc-${index}" rows="3" placeholder="Describe tus responsabilidades..." class="w-full px-3 py-2 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-300 resize-none" data-action="exp-input" data-index="${index}" data-field="description"></textarea>
      </div>
    </div>
    <div class="space-y-2">
      <label class="text-sm font-medium text-stone-600">Logros Clave</label>
      <div class="flex gap-2">
        <input type="text" id="exp-achievement-${index}" placeholder="Ej: Incrementé eficiencia 30%" class="flex-1 px-3 py-2 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-300" data-action="exp-array-input" data-exp-index="${index}" data-field="keyAchievements">
        <button type="button" data-action="add-exp-item" data-exp-index="${index}" data-field="keyAchievements" data-input-id="exp-achievement-${index}" class="px-3 py-2 border border-stone-200 rounded-md hover:bg-stone-100">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        </button>
      </div>
      <div id="exp-achievements-${index}" class="flex flex-wrap gap-2"></div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="space-y-2">
        <label class="text-sm font-medium text-stone-600">Tech Stack</label>
        <div class="flex gap-2">
          <input type="text" id="exp-tech-${index}" placeholder="Ej: React, Node.js" class="flex-1 px-3 py-2 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-300" data-action="exp-array-input" data-exp-index="${index}" data-field="techStack">
          <button type="button" data-action="add-exp-item" data-exp-index="${index}" data-field="techStack" data-input-id="exp-tech-${index}" class="px-3 py-2 border border-stone-200 rounded-md hover:bg-stone-100">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
          </button>
        </div>
        <div id="exp-techs-${index}" class="flex flex-wrap gap-2"></div>
      </div>
      <div class="space-y-2">
        <label class="text-sm font-medium text-stone-600">Herramientas</label>
        <div class="flex gap-2">
          <input type="text" id="exp-tool-${index}" placeholder="Ej: Git, Docker" class="flex-1 px-3 py-2 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-300" data-action="exp-array-input" data-exp-index="${index}" data-field="tools">
          <button type="button" data-action="add-exp-item" data-exp-index="${index}" data-field="tools" data-input-id="exp-tool-${index}" class="px-3 py-2 border border-stone-200 rounded-md hover:bg-stone-100">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
          </button>
        </div>
        <div id="exp-tools-${index}" class="flex flex-wrap gap-2"></div>
      </div>
    </div>
  `;

  container.appendChild(div);
}

export function removeExperience(index) {
  state.experience.splice(index, 1);
  document.querySelector(`#experienceContainer [data-index="${index}"]`)?.remove();

  const container = document.getElementById('experienceContainer');
  if (!container) return;

  container.innerHTML = '';
  const oldExp = [...state.experience];
  state.experience = [];

  oldExp.forEach((exp) => {
    addExperience();
    const newIndex = state.experience.length - 1;
    state.experience[newIndex] = JSON.parse(JSON.stringify(exp));

    const el = document.querySelector(`#experienceContainer [data-index="${newIndex}"]`);
    if (!el) return;

    const inputs = el.querySelectorAll('input, textarea');
    if (inputs[0]) inputs[0].value = exp.role;
    if (inputs[1]) inputs[1].value = exp.company;
    if (inputs[2]) inputs[2].value = exp.period;
    if (inputs[3]) inputs[3].value = exp.description;

    renderExpArrayItems(newIndex, 'keyAchievements', 'exp-achievements');
    renderExpArrayItems(newIndex, 'techStack', 'exp-techs');
    renderExpArrayItems(newIndex, 'tools', 'exp-tools');
  });

  updatePreview();
}

export function updateExperience(index, field, value) {
  state.experience[index][field] = value;
  updatePreview();
}

export function addExpArrayItem(expIndex, field, inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;

  const value = input.value.trim();
  if (!value) return;

  state.experience[expIndex][field].push(value);
  input.value = '';
  input.focus();

  const containerMap = {
    keyAchievements: 'exp-achievements',
    techStack: 'exp-techs',
    tools: 'exp-tools'
  };

  renderExpArrayItems(expIndex, field, containerMap[field]);
  updatePreview();
}

export function removeExpArrayItem(expIndex, field, itemIndex) {
  state.experience[expIndex][field].splice(itemIndex, 1);

  const containerMap = {
    keyAchievements: 'exp-achievements',
    techStack: 'exp-techs',
    tools: 'exp-tools'
  };

  renderExpArrayItems(expIndex, field, containerMap[field]);
  updatePreview();
}

export function renderExpArrayItems(expIndex, field, containerPrefix) {
  const container = document.getElementById(`${containerPrefix}-${expIndex}`);
  if (!container) return;

  const items = state.experience[expIndex][field];
  const colors = {
    keyAchievements: 'bg-emerald-50 text-emerald-700',
    techStack: 'bg-slate-100 text-slate-700',
    tools: 'bg-stone-100 text-stone-700'
  };

  container.innerHTML = items
    .map(
      (item, index) => `
    <span class="${colors[field]} px-3 py-1.5 text-sm rounded-full flex items-center gap-1">
      ${item}
      <button type="button" data-action="remove-exp-item" data-exp-index="${expIndex}" data-field="${field}" data-item-index="${index}" class="hover:text-rose-500">
        <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </span>
  `
    )
    .join('');
}

export function initExperience() {
  document.querySelectorAll('[data-action="add-experience"]').forEach((btn) => {
    btn.addEventListener('click', addExperience);
  });

  const experienceContainer = document.getElementById('experienceContainer');
  if (!experienceContainer) return;

  experienceContainer.addEventListener('click', (e) => {
    const removeBtn = e.target.closest('button[data-action="remove-experience"]');
    if (removeBtn) {
      removeExperience(Number(removeBtn.dataset.index));
      return;
    }

    const addItemBtn = e.target.closest('button[data-action="add-exp-item"]');
    if (addItemBtn) {
      addExpArrayItem(Number(addItemBtn.dataset.expIndex), addItemBtn.dataset.field, addItemBtn.dataset.inputId);
      return;
    }

    const removeItemBtn = e.target.closest('button[data-action="remove-exp-item"]');
    if (removeItemBtn) {
      removeExpArrayItem(
        Number(removeItemBtn.dataset.expIndex),
        removeItemBtn.dataset.field,
        Number(removeItemBtn.dataset.itemIndex)
      );
    }
  });

  experienceContainer.addEventListener('input', (e) => {
    const input = e.target.closest('[data-action="exp-input"]');
    if (!input) return;
    updateExperience(Number(input.dataset.index), input.dataset.field, input.value);
  });

  experienceContainer.addEventListener('keydown', (e) => {
    const input = e.target.closest('input[data-action="exp-array-input"]');
    if (!input) return;
    if (e.key !== 'Enter') return;
    e.preventDefault();
    addExpArrayItem(Number(input.dataset.expIndex), input.dataset.field, input.id);
  });
}
