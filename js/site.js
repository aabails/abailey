// Mobile menu: Safari-friendly toggle with reflow + accessible labels
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-menu]');
  if (!btn || !nav) return;

  const open = () => {
    // Force reflow so Safari applies transitions
    void nav.offsetHeight;
    document.body.classList.add('nav-open');
    nav.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', 'Close menu');
  };
  const close = () => {
    void nav.offsetHeight;
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
