export function initTabs() {
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;

      document.querySelectorAll('.tab-btn').forEach((b) => {
        b.classList.remove('tab-active');
        b.classList.add('tab-inactive');
      });
      btn.classList.remove('tab-inactive');
      btn.classList.add('tab-active');

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
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Handle theme toggle
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      // Apply theme
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('cv-theme', newTheme);
    });
  }
}
