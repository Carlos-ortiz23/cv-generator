export function initTabs() {
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;

      // Update button states
      document.querySelectorAll('.tab-btn').forEach((b) => {
        b.classList.remove('bg-white', 'dark:bg-slate-600', 'text-stone-700', 'dark:text-white', 'shadow-sm');
        b.classList.add('text-stone-600', 'dark:text-stone-300', 'hover:bg-stone-50', 'dark:hover:bg-slate-600');
      });
      
      btn.classList.remove('text-stone-600', 'dark:text-stone-300', 'hover:bg-stone-50', 'dark:hover:bg-slate-600');
      btn.classList.add('bg-white', 'dark:bg-slate-600', 'text-stone-700', 'dark:text-white', 'shadow-sm');

      // Update content visibility
      document.querySelectorAll('.tab-content').forEach((content) => {
        content.classList.add('hidden');
      });
      document.getElementById(`tab-${tab}`)?.classList.remove('hidden');
    });
  });
}

export function initThemeToggle() {
  // Load saved theme
  const savedTheme = localStorage.getItem('cv-theme') || 'light';
  const body = document.body;
  
  // Apply theme
  if (savedTheme === 'dark') {
    body.classList.add('dark');
  } else {
    body.classList.remove('dark');
  }
  body.setAttribute('data-theme', savedTheme);
  
  // Handle theme toggle
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = body.classList.contains('dark');
      
      if (isDark) {
        body.classList.remove('dark');
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('cv-theme', 'light');
      } else {
        body.classList.add('dark');
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('cv-theme', 'dark');
      }
    });
  }
}
