import { showPreview } from './preview.js';

// Modal System
export function createModal(title, content, actions = []) {
  // Remove existing modals
  const existingModal = document.getElementById('modalOverlay');
  if (existingModal) {
    existingModal.remove();
  }

  // Create modal overlay
  const modalOverlay = document.createElement('div');
  modalOverlay.id = 'modalOverlay';
  modalOverlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
  
  // Create modal container
  const modalContainer = document.createElement('div');
  modalContainer.className = 'bg-white dark:bg-slate-800 rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-blue-200 dark:border-slate-700';
  
  // Create modal header
  const modalHeader = document.createElement('div');
  modalHeader.className = 'border-b border-blue-200 dark:border-slate-700 px-6 py-4';
  modalHeader.innerHTML = `
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-semibold text-blue-900 dark:text-white">${title}</h3>
      <button type="button" class="close-modal text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  `;
  
  // Create modal body
  const modalBody = document.createElement('div');
  modalBody.className = 'px-6 py-4';
  modalBody.innerHTML = content;
  
  // Create modal footer with actions
  const modalFooter = document.createElement('div');
  modalFooter.className = 'border-t border-blue-200 dark:border-slate-700 px-6 py-4 flex gap-3 justify-end';
  
  actions.forEach(action => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `px-4 py-2 rounded-md font-medium transition-colors duration-300 ${action.className}`;
    button.textContent = action.text;
    
    // Agregar event listener correctamente
    button.addEventListener('click', (e) => {
      e.preventDefault();
      action.onClick();
    });
    
    modalFooter.appendChild(button);
  });
  
  // Assemble modal
  modalContainer.appendChild(modalHeader);
  modalContainer.appendChild(modalBody);
  modalContainer.appendChild(modalFooter);
  modalOverlay.appendChild(modalContainer);
  
  // Add to body
  document.body.appendChild(modalOverlay);
  
  // Add close functionality
  const closeModal = () => {
    modalOverlay.remove();
  };
  
  modalOverlay.querySelector('.close-modal').addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });
  
  // Cerrar con tecla ESC
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', handleEscape);
    }
  };
  document.addEventListener('keydown', handleEscape);
  
  return closeModal;
}

export function showValidationErrorModal(title, message) {
  return createModal(
    title,
    `
      <div class="flex items-start gap-3">
        <div class="flex-shrink-0">
          <svg class="h-6 w-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
        </div>
        <div class="flex-1">
          <p class="text-gray-700 dark:text-gray-300">${message}</p>
        </div>
      </div>
    `,
    [
      {
        text: 'Entendido',
        className: 'bg-blue-700 dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-700 text-white',
        onClick: () => {
          document.getElementById('modalOverlay')?.remove();
        }
      }
    ]
  );
}

export function showConfirmDownloadModal(onConfirm, missingFields = []) {
  const hasMissingFields = missingFields.length > 0;
  
  const content = hasMissingFields 
    ? `
        <div class="space-y-4">
          <div class="flex items-start gap-3">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-gray-700 dark:text-gray-300 mb-3">
                Algunos campos importantes están vacíos. Tu CV se verá más profesional si completas toda la información.
              </p>
              <div class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                <p class="text-sm font-medium text-amber-800 dark:text-amber-200 mb-2">Campos faltantes:</p>
                <ul class="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                  ${missingFields.map(field => `<li>• ${field}</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>
          <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <p class="text-sm text-blue-700 dark:text-blue-300">
              ¿Deseas continuar con la descarga o prefieres completar la información?
            </p>
          </div>
        </div>
      `
    : `
        <div class="flex items-start gap-3">
          <div class="flex-shrink-0">
            <svg class="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="flex-1">
            <p class="text-gray-700 dark:text-gray-300">
              ¡Toda la información requerida está completa! Estás listo para descargar tu CV profesional.
            </p>
          </div>
        </div>
      `;

  return createModal(
    hasMissingFields ? 'Información Incompleta' : 'Confirmar Descarga',
    content,
    [
      {
        text: hasMissingFields ? 'Completar Información' : 'Cancelar',
        className: 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300',
        onClick: () => {
          document.getElementById('modalOverlay')?.remove();
        }
      },
      {
        text: 'Descargar de todos modos',
        className: 'bg-blue-700 dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-700 text-white',
        onClick: () => {
          // Cerrar modal y ejecutar callback
          document.getElementById('modalOverlay')?.remove();
          onConfirm();
        }
      }
    ]
  );
}

export function showSuccessModal() {
  return createModal(
    '¡Descarga Exitosa!',
    `
      <div class="flex items-start gap-3">
        <div class="flex-shrink-0">
          <svg class="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <div class="flex-1">
          <p class="text-gray-700 dark:text-gray-300">
            Tu CV ha sido descargado exitosamente. Revisa tu carpeta de descargas.
          </p>
        </div>
      </div>
    `,
    [
      {
        text: 'Perfecto',
        className: 'bg-green-700 dark:bg-green-600 hover:bg-green-800 dark:hover:bg-green-700 text-white',
        onClick: () => {
          document.getElementById('modalOverlay')?.remove();
        }
      }
    ]
  );
}

export function showClearFormModal(onConfirm) {
  return createModal(
    'Limpiar Formulario',
    `
      <div class="space-y-4">
        <div class="flex items-start gap-3">
          <div class="flex-shrink-0">
            <svg class="h-6 w-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </div>
          <div class="flex-1">
            <p class="text-gray-700 dark:text-gray-300">
              ¿Estás seguro de que deseas limpiar todo el formulario? Esta acción eliminará toda la información ingresada y no se puede deshacer.
            </p>
          </div>
        </div>
        <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
          <p class="text-sm text-red-700 dark:text-red-300">
            <strong>Advertencia:</strong> Se perderán todos los datos ingresados incluyendo información personal, experiencia, educación, habilidades, etc.
          </p>
        </div>
      </div>
    `,
    [
      {
        text: 'Cancelar',
        className: 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300',
        onClick: () => {
          document.getElementById('modalOverlay')?.remove();
        }
      },
      {
        text: 'Sí, Limpiar Todo',
        className: 'bg-red-700 dark:bg-red-600 hover:bg-red-800 dark:hover:bg-red-700 text-white',
        onClick: () => {
          // Cerrar modal y ejecutar callback
          document.getElementById('modalOverlay')?.remove();
          onConfirm();
        }
      }
    ]
  );
}

export function showPreviewModal() {
  return createModal(
    'Vista Previa del CV',
    `
      <div class="space-y-4">
        <div class="flex items-start gap-3">
          <div class="flex-shrink-0">
            <svg class="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 7 12 7c4.477 0 8.268.943 9.542 5-1.274 4.057-5.065 5-9.542 5-4.477 0-8.268-.943-9.542-5z"></path>
            </svg>
          </div>
          <div class="flex-1">
            <p class="text-gray-700 dark:text-gray-300">
              La vista previa te mostrará cómo se verá tu CV antes de descargarlo. Podrás revisar el diseño, formato y contenido.
            </p>
          </div>
        </div>
        <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
          <p class="text-sm text-blue-700 dark:text-blue-300">
            <strong>Tip:</strong> La vista previa se mostrará en formato A4 como aparecerá en el PDF. Verifica que toda la información sea correcta antes de descargar.
          </p>
        </div>
      </div>
    `,
    [
      {
        text: 'Cancelar',
        className: 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300',
        onClick: () => {
          document.getElementById('modalOverlay')?.remove();
        }
      },
      {
        text: 'Ver Vista Previa',
        className: 'bg-blue-700 dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-700 text-white',
        onClick: () => {
          // Cerrar el modal actual primero
          document.getElementById('modalOverlay')?.remove();
          // Mostrar la vista previa real
          showPreview();
        }
      }
    ]
  );
}
