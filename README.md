# CV Generator (AlmeiraStore)

Generador de hoja de vida (CV) con previsualización estilo Harvard y exportación a PDF.

## Objetivo

- Permitir al usuario diligenciar su información (personal, perfil, competencias, educación, idiomas y experiencia).
- Ver una previsualización en tiempo real.
- Exportar el CV a PDF.

## Stack

- Vite
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- jsPDF

## Estructura del proyecto

```txt
cv-app/
  index.html
  src/
    main.js
    styles.css
    app/
      app.js
      index.js
    state/
      store.js
    features/
      tabs.js
      photo.js
      skills.js
      education.js
      languages.js
      experience.js
      preview.js
      pdf.js
  tailwind.config.js
  vite.config.js
  Dockerfile
  nginx.conf
```

## Licencia

MIT

