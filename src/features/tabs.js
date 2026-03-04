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

export function initThemeSelector() {
  // Load saved theme
  const savedTheme = localStorage.getItem('cv-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Set active button
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.theme === savedTheme) {
      btn.classList.add('active');
    }
  });

  // Handle theme changes
  document.querySelectorAll('.theme-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      
      // Update active state
      document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Apply theme
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('cv-theme', theme);
    });
  });
}
