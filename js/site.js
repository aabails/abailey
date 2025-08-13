// Mobile menu: accessible toggle with link-close
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-menu]');
  if (!btn || !nav) return;

  const open = () => {
    document.body.classList.add('nav-open');
    nav.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', 'Close menu');
  };
  const close = () => {
    document.body.classList.remove('nav-open');
    nav.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Open menu');
  };

  btn.addEventListener('click', () => {
    if (nav.classList.contains('open')) close();
    else open();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  // Close when any nav link is clicked
  nav.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (a) close();
  });
});
