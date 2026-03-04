import { state } from '../state/store.js';

export function validateForm() {
  const form = document.getElementById('cvForm');
  if (!form) return { isValid: false, missingFields: ['Formulario no encontrado'] };

  const formData = new FormData(form);
  const missingFields = [];

  // Validar campos obligatorios
  const requiredFields = [
    { name: 'fullName', label: 'Nombre Completo' },
    { name: 'title', label: 'Título Profesional' },
    { name: 'location', label: 'Ubicación' },
    { name: 'phone', label: 'Teléfono' },
    { name: 'email', label: 'Correo Electrónico' },
    { name: 'profile', label: 'Descripción Profesional' }
  ];

  requiredFields.forEach(field => {
    const value = formData.get(field.name);
    if (!value || value.trim() === '') {
      missingFields.push(field.label);
    }
  });

  // Validar foto de perfil
  if (!state.profilePhoto) {
    missingFields.push('Foto de Perfil');
  }

  // Validar habilidades
  if (state.technicalSkills.length === 0) {
    missingFields.push('Habilidades Técnicas');
  }

  if (state.softSkills.length === 0) {
    missingFields.push('Habilidades Blandas');
  }

  // Validar experiencia (al menos una)
  const validExperience = state.experience.filter(exp => exp.role && exp.company);
  if (validExperience.length === 0) {
    missingFields.push('Experiencia Laboral (al menos una)');
  }

  // Validar educación (al menos una)
  const validEducation = state.education.filter(edu => edu.degree && edu.institution);
  if (validEducation.length === 0) {
    missingFields.push('Educación (al menos una)');
  }

  // Validar idiomas (al menos uno)
  const validLanguages = state.languages.filter(lang => lang.language && lang.level);
  if (validLanguages.length === 0) {
    missingFields.push('Idiomas (al menos uno)');
  }

  return {
    isValid: missingFields.length === 0,
    missingFields,
    hasCriticalFields: missingFields.filter(field => 
      ['Nombre Completo', 'Título Profesional', 'Ubicación', 'Teléfono', 'Correo Electrónico', 'Foto de Perfil'].includes(field)
    ).length > 0
  };
}

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone) {
  // Validar formato de teléfono (básico)
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 7;
}
