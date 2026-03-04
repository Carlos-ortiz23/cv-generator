# CV Generator (AlmeiraStore)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS](https://img.shields.io/badge/CSS-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)

🚀 **Generador de hoja de vida (CV) moderno y responsive con previsualización en tiempo real y exportación a PDF.**

Una aplicación web open source diseñada para crear currículums profesionales de manera sencilla y rápida, con una interfaz intuitiva y moderna.

## ✨ Características

- 📱 **Diseño Responsive**: Funciona perfectamente en desktop, tablet y móviles
- 🎨 **Interfaz Moderna**: Diseño limpio con Tailwind CSS y soporte para modo oscuro
- 👁️ **Previsualización en Tiempo Real**: Ve cómo se ve tu CV mientras lo editas
- 📄 **Exportación a PDF**: Genera PDFs profesionales con jsPDF
- 🖼️ **Soporte de Foto**: Agrega tu foto de perfil profesional
- 📋 **Validación Inteligente**: Sistema de validación para asegurar datos completos
- 🌙 **Modo Oscuro**: Interfaz adaptable al tema del sistema
- ⚡ **Rendimiento Optimizado**: Construido con Vite para desarrollo rápido

## 🎯 Objetivo

- Permitir al usuario diligenciar su información (personal, perfil, competencias, educación, idiomas y experiencia)
- Ver una previsualización profesional en tiempo real
- Exportar el CV a PDF con diseño optimizado
- Proporcionar una experiencia de usuario intuitiva y moderna

## 🛠️ Stack Tecnológico

- **Frontend**: Vanilla JavaScript (ES6+)
- **Estilos**: Tailwind CSS v4
- **Build Tool**: Vite
- **PDF Generation**: jsPDF
- **Icons**: Heroicons (SVG)

## 📁 Estructura del Proyecto

```txt
cv-generator/
├── index.html                 # Página principal
├── src/
│   ├── main.js               # Entry point
│   ├── app/
│   │   ├── index.js          # Inicialización de la aplicación
│   │   └── app.js            # Configuración principal
│   ├── state/
│   │   └── store.js          # Gestión de estado global
│   └── features/
│       ├── tabs.js           # Sistema de pestañas
│       ├── photo.js          # Manejo de fotos
│       ├── skills.js         # Gestión de habilidades
│       ├── education.js      # Gestión de educación
│       ├── languages.js      # Gestión de idiomas
│       ├── experience.js     # Gestión de experiencia
│       ├── preview.js        # Sistema de previsualización
│       ├── pdf.js            # Generación de PDF
│       ├── validation.js     # Validación de formularios
│       ├── modals.js         # Sistema de modales
│       └── clearForm.js      # Limpieza de formularios
├── package.json              # Dependencias y scripts
├── tailwind.config.js        # Configuración de Tailwind
├── vite.config.js            # Configuración de Vite
└── README.md                 # Este archivo
```

## 🚀 Empezando

### Prerrequisitos

- Node.js 16+ 
- npm o yarn

### Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/Carlos-ortiz23/cv-generator.git
cd cv-generator
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador y navega a `http://localhost:5173`

### Construcción para Producción

```bash
npm run build
```

Los archivos optimizados estarán en la carpeta `dist/`.

## 📖 Uso

1. **Información Personal**: Completa tus datos básicos (nombre, título, contacto)
2. **Foto de Perfil**: Sube tu foto profesional (opcional)
3. **Perfil Profesional**: Describe tu experiencia y objetivos
4. **Competencias**: Agrega tus habilidades técnicas y blandas
5. **Educación**: Registra tu formación académica
6. **Idiomas**: Especifica los idiomas que dominas
7. **Experiencia**: Detalla tu experiencia laboral con logros
8. **Previsualización**: Revisa tu CV en tiempo real
9. **Exportación**: Descarga tu CV en formato PDF

## 🎨 Características de la Interfaz

- **Diseño Responsive**: Adaptado para todos los dispositivos
- **Modo Oscuro**: Se ajusta automáticamente a las preferencias del sistema
- **Animaciones Suaves**: Transiciones y micro-interacciones elegantes
- **Validación en Tiempo Real**: Feedback instantáneo sobre los datos ingresados
- **Modales Informativos**: Guía paso a paso para cada acción

## 🔧 Configuración

### Personalización

Puedes personalizar los colores y estilos editando:

- `tailwind.config.js`: Configuración de Tailwind CSS
- `src/features/pdf.js`: Estilos del PDF generado
- `index.html`: Estructura y metadatos

### Variables de Entorno

No se requieren variables de entorno para esta aplicación.

## 🚀 Roadmap

### Próximamente 🤖

- **🤖 Integración con IA**: Asistente inteligente para optimizar tu CV
  - **Sugerencias de contenido**: Recomendaciones basadas en tu perfil
  - **Optimización de descripciones**: Mejora de texto con IA
  - **Análisis de keywords**: Optimización para ATS (Applicant Tracking Systems)
  - **Generación de resúmenes**: Creación automática de perfiles profesionales
  - **Traducción inteligente**: Soporte multiidioma con IA
  - **Feedback de diseño**: Recomendaciones visuales para mejorar el CV

### Features Futuros

- 📊 **Análisis de Mercado**: Comparación con CVs similares en tu industria
- 🎯 **Personalización de Plantillas**: Más diseños y layouts profesionales
- 📱 **App Móvil Nativa**: Versión móvil para iOS y Android
- ☁️ **Cloud Storage**: Guardado en la nube de tus CVs
- 🔗 **Integración LinkedIn**: Importación directa desde tu perfil
- 📈 **Analytics**: Estadísticas de visualización y descarga

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Reporte de Issues

Si encuentras un bug o tienes una sugerencia, por favor abre un issue en [GitHub Issues](https://github.com/Carlos-ortiz23/cv-generator/issues).

## 📝 Licencia

Este proyecto está licenciado bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- [Tailwind CSS](https://tailwindcss.com/) - Framework de CSS utilitario
- [jsPDF](https://github.com/parallax/jsPDF) - Generación de PDF en JavaScript
- [Heroicons](https://heroicons.com/) - Iconos SVG
- [Vite](https://vitejs.dev/) - Herramienta de build moderna

## 📊 Estadísticas del Proyecto

![GitHub stars](https://img.shields.io/github/stars/Carlos-ortiz23/cv-generator?style=social)
![GitHub forks](https://img.shields.io/github/forks/Carlos-ortiz23/cv-generator?style=social)
![GitHub issues](https://img.shields.io/github/issues/Carlos-ortiz23/cv-generator)
![GitHub license](https://img.shields.io/github/license/Carlos-ortiz23/cv-generator)

---

**Desarrollado con ❤️ por [Carlos Ortiz](https://github.com/Carlos-ortiz23)**

Si este proyecto te ha sido útil, considera darle una ⭐ en GitHub!

