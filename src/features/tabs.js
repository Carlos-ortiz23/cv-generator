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
