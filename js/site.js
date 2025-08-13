// Mobile menu: accessible toggle
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-menu]');
  if (!btn || !nav) return;

  const open = () => {
    document.body.classList.add('nav-open');
    nav.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  };
  const close = () => {
    document.body.classList.remove('nav-open');
    nav.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  };

  btn.addEventListener('click', () => {
    if (nav.classList.contains('open')) close();
    else open();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
});
