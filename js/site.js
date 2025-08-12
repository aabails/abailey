// Mobile menu: robust toggle with ARIA, ESC-to-close, and link-click close
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.hamburger');
  const nav = document.querySelector('#site-menu');
  if (!btn || !nav) return;

  const closeBtn = nav.querySelector('.nav-close');
  const links = nav.querySelectorAll('a');

  function openMenu(){
    document.body.classList.add('nav-open');
    btn.setAttribute('aria-expanded', 'true');
  }
  function closeMenu(){
    document.body.classList.remove('nav-open');
    btn.setAttribute('aria-expanded', 'false');
  }
  function toggleMenu(){
    if (document.body.classList.contains('nav-open')) closeMenu();
    else openMenu();
  }

  btn.addEventListener('click', toggleMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  links.forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
});