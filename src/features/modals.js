import { showPreview } from './preview.js';
import { state } from '../state/store.js';
import { generatePDF } from './pdf.js';

// Función para generar el contenido del CV en formato PDF
function generateCVPreviewContent() {
  const form = document.getElementById('cvForm');
  if (!form) return '<p>Error: No se encontró el formulario</p>';

  const formData = new FormData(form);

  const personalInfo = {
    fullName: formData.get('fullName') || 'Tu Nombre',
    title: formData.get('title') || 'Tu Título Profesional',
    location: formData.get('location') || '',
    phone: formData.get('phone') || '',
    email: formData.get('email') || '',
    linkedin: formData.get('linkedin') || '',
    github: formData.get('github') || ''
  };

  const profile = formData.get('profile') || '';

  // Debug: Verificar el estado de experiencia
  console.log('Estado de experiencia:', state.experience);

  // Generar contenido del CV con el mismo estilo que el PDF
  let cvContent = `
    <div class="bg-white p-8" style="font-family: Arial, sans-serif; color: #333; line-height: 1.4;">
  `;

  // Header con foto a la derecha e información personal en el área del documento
  if (state.profilePhoto) {
    cvContent += `
      <div style="display: flex; align-items: flex-start; gap: 24px; margin-bottom: 24px; border-bottom: 1px solid #ccc; padding-bottom: 24px;">
        <div style="flex: 1;">
          <h1 style="font-size: 24px; font-weight: bold; margin: 0 0 8px 0; color: #282828;">${personalInfo.fullName}</h1>
          <p style="font-size: 16px; margin: 0 0 8px 0; color: #505050; font-weight: normal;">${personalInfo.title}</p>
    `;
  } else {
    cvContent += `
      <div style="display: flex; align-items: flex-start; gap: 24px; margin-bottom: 24px; border-bottom: 1px solid #ccc; padding-bottom: 24px;">
        <div style="flex: 1;">
          <h1 style="font-size: 24px; font-weight: bold; margin: 0 0 8px 0; color: #282828;">${personalInfo.fullName}</h1>
          <p style="font-size: 16px; margin: 0 0 8px 0; color: #505050; font-weight: normal;">${personalInfo.title}</p>
    `;
  }

  // Información de contacto
  const contactParts = [];
  if (personalInfo.location) contactParts.push(personalInfo.location);
  if (personalInfo.phone) contactParts.push(personalInfo.phone);
  if (personalInfo.email) contactParts.push(personalInfo.email);

  if (contactParts.length > 0) {
    cvContent += `<p style="font-size: 12px; margin: 0 0 4px 0; color: #505050;">${contactParts.join(' | ')}</p>`;
  }

  // Links
  const linkParts = [];
  if (personalInfo.linkedin) linkParts.push(`<a href="${personalInfo.linkedin}" style="color: #0064c8;">LinkedIn</a>`);
  if (personalInfo.github) linkParts.push(`<a href="${personalInfo.github}" style="color: #0064c8;">GitHub</a>`);

  if (linkParts.length > 0) {
    cvContent += `<p style="font-size: 12px; margin: 0; color: #0064c8;">${linkParts.join(' | ')}</p>`;
  }

  // Foto a la derecha
  if (state.profilePhoto) {
    cvContent += `
        </div>
        <div style="width: 140px; display: flex; justify-content: flex-end;">
          <img src="${state.profilePhoto}" style="width: 140px; height: 140px; object-fit: cover; border-radius: 8px; border: 1px solid #ddd;">
        </div>
      </div>
    `;
  } else {
    cvContent += `
        </div>
      </div>
    `;
  }

  // Perfil Profesional
  if (profile) {
    cvContent += `
      <div style="margin-bottom: 24px;">
        <h2 style="font-size: 14px; font-weight: bold; margin: 0 0 4px 0; color: #3c3c3c; text-transform: uppercase;">PERFIL PROFESIONAL</h2>
        <div style="border-top: 1px solid #ccc; margin-bottom: 5px;"></div>
        <p style="font-size: 12px; margin: 0; color: #505050; line-height: 1.5; text-align: justify;">${profile}</p>
      </div>
    `;
  }

  // Competencias
  if (state.technicalSkills.length > 0 || state.softSkills.length > 0) {
    cvContent += `
      <div style="margin-bottom: 24px;">
        <h2 style="font-size: 14px; font-weight: bold; margin: 0 0 4px 0; color: #3c3c3c; text-transform: uppercase;">COMPETENCIAS</h2>
        <div style="border-top: 1px solid #ccc; margin-bottom: 5px;"></div>
    `;

    if (state.technicalSkills.length > 0) {
      cvContent += `
        <div style="margin-bottom: 3px;">
          <span style="font-size: 11px; font-weight: bold; color: #646464;">Técnicas:</span>
          <span style="font-size: 11px; color: #505050; margin-left: 18px;">${state.technicalSkills.join(' • ')}</span>
        </div>
      `;
    }

    if (state.softSkills.length > 0) {
      cvContent += `
        <div style="margin-bottom: 5px;">
          <span style="font-size: 11px; font-weight: bold; color: #646464;">Blandas:</span>
          <span style="font-size: 11px; color: #505050; margin-left: 18px;">${state.softSkills.join(' • ')}</span>
        </div>
      `;
    }

    cvContent += `</div>`;
  }

  // Experiencia Profesional - Obtener datos del estado (ya que el formulario no está sincronizado)
  const experienceData = state.experience;
  
  console.log('Experience data desde estado:', experienceData);

  const validExperience = experienceData.filter((exp) => exp.role || exp.company);
  if (validExperience.length > 0) {
    cvContent += `
      <div style="margin-bottom: 24px;">
        <h2 style="font-size: 14px; font-weight: bold; margin: 0 0 4px 0; color: #3c3c3c; text-transform: uppercase;">EXPERIENCIA PROFESIONAL</h2>
        <div style="border-top: 1px solid #ccc; margin-bottom: 5px;"></div>
    `;

    validExperience.forEach((exp) => {
      cvContent += `
        <div style="margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
            <div>
              <h3 style="font-size: 12px; font-weight: bold; margin: 0; color: #323232;">${exp.role}</h3>
              <p style="font-size: 12px; margin: 0; color: #505050; font-style: italic;">${exp.company}</p>
            </div>
            <span style="font-size: 12px; color: #787878; font-style: italic;">${exp.period}</span>
          </div>
      `;

      if (exp.description) {
        cvContent += `<p style="font-size: 11px; margin: 0 0 2px 0; color: #505050; line-height: 1.4;">${exp.description}</p>`;
      }

      if (exp.keyAchievements.length > 0) {
        cvContent += `
          <div style="margin-bottom: 2px;">
            <h4 style="font-size: 10px; font-weight: bold; margin: 0 0 1px 0; color: #646464;">Logros Clave:</h4>
            <ul style="font-size: 10px; margin: 0; padding-left: 12px; color: #505050;">
              ${exp.keyAchievements.map(achievement => `<li style="margin-bottom: 1px;">${achievement}</li>`).join('')}
            </ul>
          </div>
        `;
      }

      const techParts = [];
      if (exp.techStack.length > 0) techParts.push(exp.techStack.join(', '));
      if (exp.tools.length > 0) techParts.push(exp.tools.join(', '));

      if (techParts.length > 0) {
        cvContent += `<p style="font-size: 10px; margin: 4px 0 0 0; color: #787878;">${techParts.join(' | ')}</p>`;
      }

      cvContent += `</div>`;
    });

    cvContent += `</div>`;
  }

  // Educación - Obtener datos del estado
  const educationData = state.education;
  
  console.log('Education data desde estado:', educationData);

  const validEducation = educationData.filter((edu) => edu.degree || edu.institution);
  if (validEducation.length > 0) {
    cvContent += `
      <div style="margin-bottom: 24px;">
        <h2 style="font-size: 14px; font-weight: bold; margin: 0 0 4px 0; color: #3c3c3c; text-transform: uppercase;">EDUCACIÓN</h2>
        <div style="border-top: 1px solid #ccc; margin-bottom: 5px;"></div>
    `;

    validEducation.forEach((edu) => {
      cvContent += `
        <div style="margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 3px;">
            <div>
              <h3 style="font-size: 12px; font-weight: bold; margin: 0; color: #323232;">${edu.degree}</h3>
              <p style="font-size: 12px; margin: 0; color: #505050;">${edu.institution}</p>
              <p style="font-size: 11px; margin: 0; color: #787878;">${edu.location}</p>
            </div>
            <span style="font-size: 12px; color: #787878; font-style: italic;">${edu.period}</span>
          </div>
        </div>
      `;
    });

    cvContent += `</div>`;
  }

  // Idiomas - Obtener datos del estado
  const languagesData = state.languages;
  
  console.log('Languages data desde estado:', languagesData);

  const validLanguages = languagesData.filter((lang) => lang.language);
  if (validLanguages.length > 0) {
    cvContent += `
      <div>
        <h2 style="font-size: 14px; font-weight: bold; margin: 0 0 4px 0; color: #3c3c3c; text-transform: uppercase;">IDIOMAS</h2>
        <div style="border-top: 1px solid #ccc; margin-bottom: 5px;"></div>
        <p style="font-size: 12px; margin: 0; color: #505050;">
          ${validLanguages.map(lang => `${lang.language} — ${lang.level}`).join('    ')}
        </p>
      </div>
    `;
  }

  cvContent += `</div>`;
  return cvContent;
}

// Modal System
export function createModal(title, content, actions = [], size = 'md') {
  // Remove existing modals
  const existingModal = document.getElementById('modalOverlay');
  if (existingModal) {
    existingModal.remove();
  }

  // Size classes
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md', 
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    full: 'max-w-full mx-4'
  };

  // Create modal overlay
  const modalOverlay = document.createElement('div');
  modalOverlay.id = 'modalOverlay';
  modalOverlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
  
  // Create modal container
  const modalContainer = document.createElement('div');
  modalContainer.className = `bg-white dark:bg-slate-800 rounded-xl shadow-xl ${sizeClasses[size]} w-full max-h-[90vh] overflow-y-auto border border-blue-200 dark:border-slate-700`;
  
  // Create modal header
  const modalHeader = document.createElement('div');
  modalHeader.className = 'border-b border-blue-200 dark:border-slate-700 px-6 py-4 sticky top-0 bg-white dark:bg-slate-800 z-10';
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
  modalFooter.className = 'border-t border-blue-200 dark:border-slate-700 px-6 py-4 flex gap-3 justify-end sticky bottom-0 bg-white dark:bg-slate-800';
  
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
  const cvContent = generateCVPreviewContent();
  
  return createModal(
    'Vista Previa del CV',
    cvContent,
    [
      {
        text: 'Cerrar',
        className: 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300',
        onClick: () => {
          document.getElementById('modalOverlay')?.remove();
        }
      },
      {
        text: 'Descargar PDF',
        className: 'bg-blue-700 dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-700 text-white',
        onClick: () => {
          // Cerrar modal y generar PDF
          document.getElementById('modalOverlay')?.remove();
          generatePDF();
        }
      }
    ],
    '4xl' // Tamaño grande para mostrar el CV completo
  );
}
