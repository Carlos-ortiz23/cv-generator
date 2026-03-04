import { jsPDF } from 'jspdf';
import { state } from '../state/store.js';

export async function generatePDF() {
  const btn = document.getElementById('downloadBtn');
  if (btn) {
    btn.textContent = 'Generando...';
    btn.disabled = true;
  }

  try {
    if (!state.profilePhoto) {
      alert('La foto de perfil es obligatoria para generar el PDF.');
      return;
    }

    const pdf = new jsPDF({
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait'
    });

    const form = document.getElementById('cvForm');
    if (!form) throw new Error('Missing form');

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

    pdf.setFont('helvetica');

    let yPos = 15;
    const pageWidth = 210;
    const margin = 15;
    const contentWidth = pageWidth - margin * 2;

    const renderWrappedLine = ({ text, x, y, maxWidth, fontSize = 9, color = [100, 100, 100], lineHeight = 4 }) => {
      if (!text) return y;
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(fontSize);
      pdf.setTextColor(color[0], color[1], color[2]);

      const lines = pdf.splitTextToSize(text, maxWidth);
      lines.forEach((line) => {
        pdf.text(line, x, y);
        y += lineHeight;
      });
      return y;
    };

    const renderLinkLine = ({ segments, x, y, maxWidth, fontSize = 9, textColor = [100, 100, 100], linkColor = [0, 100, 200], lineHeight = 4 }) => {
      if (!segments || segments.length === 0) return y;

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(fontSize);

      const sep = ' | ';
      let xCursor = x;
      let isFirst = true;

      segments.forEach((seg) => {
        if (!seg || !seg.label || !seg.url) return;

        const sepW = isFirst ? 0 : pdf.getTextWidth(sep);
        const labelW = pdf.getTextWidth(seg.label);
        const remaining = x + maxWidth - xCursor;

        if (sepW + labelW > remaining) {
          y += lineHeight;
          xCursor = x;
          isFirst = true;
        }

        if (!isFirst) {
          pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
          pdf.text(sep, xCursor, y);
          xCursor += sepW;
        }

        pdf.setTextColor(linkColor[0], linkColor[1], linkColor[2]);
        pdf.textWithLink(seg.label, xCursor, y, { url: seg.url });
        xCursor += labelW;
        isFirst = false;
      });

      return y + lineHeight;
    };

    // Header
    const imgData = state.profilePhoto;
    const imgWidth = 40;
    const imgHeight = 50;
    const textX = margin + imgWidth + 6;
    const textWidth = pageWidth - margin - textX;

    try {
      pdf.addImage(imgData, 'JPEG', margin, yPos, imgWidth, imgHeight);
    } catch (e) {
      console.log('Error loading image:', e);
    }

    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(40, 40, 40);
    const nameLines = pdf.splitTextToSize(personalInfo.fullName, textWidth);
    pdf.text(nameLines, textX, yPos + 8);

    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(80, 80, 80);
    const titleLines = pdf.splitTextToSize(personalInfo.title, textWidth);
    const titleY = yPos + 8 + nameLines.length * 6;
    pdf.text(titleLines, textX, titleY);

    const headerHeight = Math.max(imgHeight, 8 + nameLines.length * 6 + titleLines.length * 4);

    // Contacto + links alineados a la columna
    let infoY = titleY + titleLines.length * 4 + 6;
    const contactParts = [];
    if (personalInfo.location) contactParts.push(personalInfo.location);
    if (personalInfo.phone) contactParts.push(personalInfo.phone);
    if (personalInfo.email) contactParts.push(personalInfo.email);

    if (contactParts.length > 0) {
      infoY = renderWrappedLine({
        text: contactParts.join(' | '),
        x: textX,
        y: infoY,
        maxWidth: textWidth
      });
    }

    const linkSegments = [];
    if (personalInfo.linkedin) linkSegments.push({ label: 'LinkedIn', url: personalInfo.linkedin });
    if (personalInfo.github) linkSegments.push({ label: 'GitHub', url: personalInfo.github });
    if (linkSegments.length > 0) {
      infoY = renderLinkLine({
        segments: linkSegments,
        x: textX,
        y: infoY,
        maxWidth: textWidth
      });
    }

    yPos += Math.max(headerHeight, infoY - 15);
    yPos += 6;

    // Línea separadora
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 8;

    // Perfil Profesional
    if (profile) {
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(60, 60, 60);
      pdf.text('PERFIL PROFESIONAL', margin, yPos);
      yPos += 4;

      pdf.setDrawColor(200, 200, 200);
      pdf.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 5;

      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(80, 80, 80);
      const profileLines = pdf.splitTextToSize(profile, contentWidth);
      pdf.text(profileLines, margin, yPos);
      yPos += profileLines.length * 4 + 6;
    }

    // Competencias
    if (state.technicalSkills.length > 0 || state.softSkills.length > 0) {
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(60, 60, 60);
      pdf.text('COMPETENCIAS', margin, yPos);
      yPos += 4;

      pdf.setDrawColor(200, 200, 200);
      pdf.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 5;

      if (state.technicalSkills.length > 0) {
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(100, 100, 100);
        pdf.text('Técnicas:', margin, yPos);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(80, 80, 80);
        const techText = state.technicalSkills.join(' • ');
        const techLines = pdf.splitTextToSize(techText, contentWidth - 20);
        pdf.text(techLines, margin + 18, yPos);
        yPos += techLines.length * 3.5 + 3;
      }

      if (state.softSkills.length > 0) {
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(100, 100, 100);
        pdf.text('Blandas:', margin, yPos);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(80, 80, 80);
        const softText = state.softSkills.join(' • ');
        const softLines = pdf.splitTextToSize(softText, contentWidth - 20);
        pdf.text(softLines, margin + 18, yPos);
        yPos += softLines.length * 3.5 + 5;
      }
    }

    // Experiencia Profesional
    const validExperience = state.experience.filter((exp) => exp.role || exp.company);
    if (validExperience.length > 0) {
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(60, 60, 60);
      pdf.text('EXPERIENCIA PROFESIONAL', margin, yPos);
      yPos += 4;

      pdf.setDrawColor(200, 200, 200);
      pdf.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 5;

      validExperience.forEach((exp) => {
        if (yPos > 270) {
          pdf.addPage();
          yPos = 15;
        }

        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(50, 50, 50);
        pdf.text(exp.role, margin, yPos);

        pdf.setFont('helvetica', 'italic');
        pdf.setTextColor(120, 120, 120);
        const periodWidth = pdf.getTextWidth(exp.period);
        pdf.text(exp.period, pageWidth - margin - periodWidth, yPos);
        yPos += 4;

        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(80, 80, 80);
        pdf.text(exp.company, margin, yPos);
        yPos += 4;

        if (exp.description) {
          pdf.setFontSize(8);
          const descLines = pdf.splitTextToSize(exp.description, contentWidth);
          pdf.text(descLines, margin, yPos);
          yPos += descLines.length * 3.5 + 2;
        }

        if (exp.keyAchievements.length > 0) {
          pdf.setFontSize(7);
          pdf.setFont('helvetica', 'bold');
          pdf.setTextColor(100, 100, 100);
          pdf.text('Logros Clave:', margin, yPos);
          yPos += 3;

          pdf.setFont('helvetica', 'normal');
          pdf.setTextColor(80, 80, 80);
          exp.keyAchievements.forEach((achievement) => {
            const achLines = pdf.splitTextToSize('• ' + achievement, contentWidth - 5);
            pdf.text(achLines, margin + 3, yPos);
            yPos += achLines.length * 3;
          });
          yPos += 2;
        }

        if (exp.techStack.length > 0 || exp.tools.length > 0) {
          pdf.setFontSize(7);
          pdf.setTextColor(120, 120, 120);
          const techParts = [];
          if (exp.techStack.length > 0) techParts.push(exp.techStack.join(', '));
          if (exp.tools.length > 0) techParts.push(exp.tools.join(', '));
          const techText = techParts.join(' | ');
          const techLines = pdf.splitTextToSize(techText, contentWidth);
          pdf.text(techLines, margin, yPos);
          yPos += techLines.length * 3 + 4;
        } else {
          yPos += 3;
        }
      });
    }

    // Educación
    const validEducation = state.education.filter((edu) => edu.degree || edu.institution);
    if (validEducation.length > 0) {
      if (yPos > 250) {
        pdf.addPage();
        yPos = 15;
      }

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(60, 60, 60);
      pdf.text('EDUCACIÓN', margin, yPos);
      yPos += 4;

      pdf.setDrawColor(200, 200, 200);
      pdf.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 5;

      validEducation.forEach((edu) => {
        if (yPos > 270) {
          pdf.addPage();
          yPos = 15;
        }

        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(50, 50, 50);
        pdf.text(edu.degree, margin, yPos);

        pdf.setFont('helvetica', 'italic');
        pdf.setTextColor(120, 120, 120);
        const periodWidth = pdf.getTextWidth(edu.period);
        pdf.text(edu.period, pageWidth - margin - periodWidth, yPos);
        yPos += 4;

        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(80, 80, 80);
        pdf.text(edu.institution, margin, yPos);
        yPos += 3;

        pdf.setFontSize(8);
        pdf.setTextColor(120, 120, 120);
        pdf.text(edu.location, margin, yPos);
        yPos += 5;
      });
    }

    // Idiomas
    const validLanguages = state.languages.filter((lang) => lang.language);
    if (validLanguages.length > 0) {
      if (yPos > 260) {
        pdf.addPage();
        yPos = 15;
      }

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(60, 60, 60);
      pdf.text('IDIOMAS', margin, yPos);
      yPos += 4;

      pdf.setDrawColor(200, 200, 200);
      pdf.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 5;

      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(80, 80, 80);

      const langText = validLanguages.map((lang) => `${lang.language} — ${lang.level}`).join('    ');
      const langLines = pdf.splitTextToSize(langText, contentWidth);
      pdf.text(langLines, margin, yPos);
    }

    const fileName = String(personalInfo.fullName).replace(/\s+/g, '_') + '_CV.pdf';
    pdf.save(fileName);
  } catch (err) {
    console.error('Error generating PDF:', err);
    alert('Error al generar el PDF. Por favor intenta de nuevo.');
  } finally {
    if (btn) {
      btn.textContent = 'Descargar CV (PDF)';
      btn.disabled = false;
    }
  }
}
