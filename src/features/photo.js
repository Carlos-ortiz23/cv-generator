import { state } from '../state/store.js';
import { updatePreview } from './preview.js';

export function handlePhotoUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    alert('Por favor selecciona una imagen válida');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    state.profilePhoto = e.target?.result ?? null;

    const previewImg = document.getElementById('photoPreview');
    const placeholder = document.getElementById('photoPlaceholder');
    const removeBtn = document.getElementById('removePhotoBtn');

    if (previewImg) {
      previewImg.src = String(state.profilePhoto ?? '');
      previewImg.classList.remove('hidden');
    }
    placeholder?.classList.add('hidden');
    removeBtn?.classList.remove('hidden');

    updatePreview();
  };
  reader.readAsDataURL(file);
}

export function removePhoto() {
  state.profilePhoto = null;

  const fileInput = document.getElementById('profilePhoto');
  const previewImg = document.getElementById('photoPreview');
  const placeholder = document.getElementById('photoPlaceholder');
  const removeBtn = document.getElementById('removePhotoBtn');

  if (fileInput) fileInput.value = '';
  if (previewImg) {
    previewImg.src = '';
    previewImg.classList.add('hidden');
  }
  placeholder?.classList.remove('hidden');
  removeBtn?.classList.add('hidden');

  updatePreview();
}
