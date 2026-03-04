import { initTabs, initThemeToggle } from '../features/tabs.js';
import { initSkills } from '../features/skills.js';
import { initEducation, addEducation } from '../features/education.js';
import { initLanguages, addLanguage } from '../features/languages.js';
import { initExperience, addExperience } from '../features/experience.js';
import { handlePhotoUpload, removePhoto } from '../features/photo.js';
import { togglePreview, showPreview, updatePreview } from '../features/preview.js';
import { generatePDF } from '../features/pdf.js';
import { showPreviewModal, showClearFormModal } from '../features/modals.js';
import { clearForm } from '../features/clearForm.js';

function initDefaultData() {
  addEducation();
  addLanguage();
  addExperience();
}

function initStaticListeners() {
  document.querySelectorAll('input, textarea').forEach((input) => {
    if (input.type !== 'file') {
      input.addEventListener('input', updatePreview);
    }
  });

  document.getElementById('togglePreview')?.addEventListener('click', togglePreview);

  const photoInput = document.getElementById('profilePhoto');
  photoInput?.addEventListener('change', handlePhotoUpload);

  document.getElementById('removePhotoBtn')?.addEventListener('click', removePhoto);

  document.getElementById('previewBtn')?.addEventListener('click', showPreviewModal);

  document.getElementById('downloadBtn')?.addEventListener('click', generatePDF);

  document.getElementById('clearBtn')?.addEventListener('click', () => {
    showClearFormModal(clearForm);
  });
}

export function initApp() {
  initThemeToggle();
  initTabs();
  initDefaultData();
  initStaticListeners();
  initSkills();
  initEducation();
  initLanguages();
  initExperience();
  updatePreview();
}
