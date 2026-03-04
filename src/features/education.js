import { state } from '../state/store.js';
import { updatePreview } from './preview.js';

export function addEducation() {
  const index = state.education.length;
  state.education.push({ degree: '', institution: '', location: '', period: '' });

  const container = document.getElementById('educationContainer');
  if (!container) return;

  const div = document.createElement('div');
  div.className = 'p-4 bg-white dark:bg-slate-700 rounded-lg border border-blue-100 dark:border-slate-600 space-y-4';
  div.dataset.index = String(index);
  div.innerHTML = `
    <div class="flex justify-between items-center">
      <span class="text-sm font-medium text-blue-500 dark:text-blue-400">Educación #${index + 1}</span>
      ${index > 0 ? `<button type="button" data-action="remove-education" data-index="${index}" class="text-rose-500 hover:text-rose-600 text-sm">Eliminar</button>` : ''}
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="space-y-2">
        <label class="text-sm font-medium text-blue-600 dark:text-blue-300">Título / Grado *</label>
        <input type="text" name="edu-degree-${index}" placeholder="Ej: Licenciatura en Informática" class="w-full px-3 py-2 border border-blue-200 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-slate-500 bg-white dark:bg-slate-700 text-blue-900 dark:text-white" data-action="edu-input" data-index="${index}" data-field="degree">
      </div>
      <div class="space-y-2">
        <label class="text-sm font-medium text-blue-600 dark:text-blue-300">Institución *</label>
        <input type="text" name="edu-institution-${index}" placeholder="Ej: Universidad Complutense" class="w-full px-3 py-2 border border-blue-200 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-slate-500 bg-white dark:bg-slate-700 text-blue-900 dark:text-white" data-action="edu-input" data-index="${index}" data-field="institution">
      </div>
      <div class="space-y-2">
        <label class="text-sm font-medium text-blue-600 dark:text-blue-300">Ubicación *</label>
        <input type="text" name="edu-location-${index}" placeholder="Ej: Madrid, España" class="w-full px-3 py-2 border border-blue-200 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-slate-500 bg-white dark:bg-slate-700 text-blue-900 dark:text-white" data-action="edu-input" data-index="${index}" data-field="location">
      </div>
      <div class="space-y-2">
        <label class="text-sm font-medium text-blue-600 dark:text-blue-300">Período *</label>
        <input type="text" name="edu-period-${index}" placeholder="Ej: 2018 - 2022" class="w-full px-3 py-2 border border-blue-200 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-slate-500 bg-white dark:bg-slate-700 text-blue-900 dark:text-white" data-action="edu-input" data-index="${index}" data-field="period">
      </div>
    </div>
  `;
  container.appendChild(div);
}

export function removeEducation(index) {
  state.education.splice(index, 1);
  document.querySelector(`#educationContainer [data-index="${index}"]`)?.remove();

  const container = document.getElementById('educationContainer');
  if (!container) return;

  container.innerHTML = '';
  const oldEducation = [...state.education];
  state.education = [];

  oldEducation.forEach((edu) => {
    addEducation();
    const newIndex = state.education.length - 1;
    state.education[newIndex] = { ...edu };

    const inputs = document.querySelectorAll(`#educationContainer [data-index="${newIndex}"] input`);
    if (inputs[0]) inputs[0].value = edu.degree;
    if (inputs[1]) inputs[1].value = edu.institution;
    if (inputs[2]) inputs[2].value = edu.location;
    if (inputs[3]) inputs[3].value = edu.period;
  });

  updatePreview();
}

export function updateEducation(index, field, value) {
  state.education[index][field] = value;
  updatePreview();
}

export function initEducation() {
  document.querySelectorAll('[data-action="add-education"]').forEach((btn) => {
    btn.addEventListener('click', addEducation);
  });

  const educationContainer = document.getElementById('educationContainer');
  if (!educationContainer) return;

  educationContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action="remove-education"]');
    if (!btn) return;
    removeEducation(Number(btn.dataset.index));
  });

  educationContainer.addEventListener('input', (e) => {
    const input = e.target.closest('input[data-action="edu-input"]');
    if (!input) return;
    updateEducation(Number(input.dataset.index), input.dataset.field, input.value);
  });
}
