import { state } from '../state/store.js';
import { updatePreview } from './preview.js';

export function addLanguage() {
  const index = state.languages.length;
  state.languages.push({ language: '', level: '' });

  const container = document.getElementById('languagesContainer');
  if (!container) return;

  const div = document.createElement('div');
  div.className = 'p-4 bg-white dark:bg-slate-700 rounded-lg border border-blue-100 dark:border-slate-600';
  div.dataset.index = String(index);
  div.innerHTML = `
    <div class="flex justify-between items-center mb-3">
      <span class="text-sm font-medium text-blue-500 dark:text-blue-400">Idioma #${index + 1}</span>
      ${index > 0 ? `<button type="button" data-action="remove-language" data-index="${index}" class="text-rose-500 hover:text-rose-600 text-sm">Eliminar</button>` : ''}
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="space-y-2">
        <label class="text-sm font-medium text-blue-600 dark:text-blue-300">Idioma *</label>
        <input type="text" name="lang-name-${index}" placeholder="Ej: Español, Inglés..." class="w-full px-3 py-2 border border-blue-200 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-slate-500 bg-white dark:bg-slate-700 text-blue-900 dark:text-white" data-action="lang-input" data-index="${index}" data-field="language">
      </div>
      <div class="space-y-2">
        <label class="text-sm font-medium text-blue-600 dark:text-blue-300">Nivel *</label>
        <input type="text" name="lang-level-${index}" placeholder="Ej: Nativo, B2, C1..." class="w-full px-3 py-2 border border-blue-200 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-slate-500 bg-white dark:bg-slate-700 text-blue-900 dark:text-white" data-action="lang-input" data-index="${index}" data-field="level">
      </div>
    </div>
  `;
  container.appendChild(div);
}

export function removeLanguage(index) {
  state.languages.splice(index, 1);
  document.querySelector(`#languagesContainer [data-index="${index}"]`)?.remove();

  const container = document.getElementById('languagesContainer');
  if (!container) return;

  container.innerHTML = '';
  const oldLanguages = [...state.languages];
  state.languages = [];

  oldLanguages.forEach((lang) => {
    addLanguage();
    const newIndex = state.languages.length - 1;
    state.languages[newIndex] = { ...lang };

    const inputs = document.querySelectorAll(`#languagesContainer [data-index="${newIndex}"] input`);
    if (inputs[0]) inputs[0].value = lang.language;
    if (inputs[1]) inputs[1].value = lang.level;
  });

  updatePreview();
}

export function updateLanguage(index, field, value) {
  state.languages[index][field] = value;
  updatePreview();
}

export function initLanguages() {
  document.querySelectorAll('[data-action="add-language"]').forEach((btn) => {
    btn.addEventListener('click', addLanguage);
  });

  const languagesContainer = document.getElementById('languagesContainer');
  if (!languagesContainer) return;

  languagesContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action="remove-language"]');
    if (!btn) return;
    removeLanguage(Number(btn.dataset.index));
  });

  languagesContainer.addEventListener('input', (e) => {
    const input = e.target.closest('input[data-action="lang-input"]');
    if (!input) return;
    updateLanguage(Number(input.dataset.index), input.dataset.field, input.value);
  });
}
