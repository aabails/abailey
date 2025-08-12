
// --- NAV PORTAL: move nav to <body> when open so it escapes ancestor stacking contexts ---
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.hamburger');
  let nav = document.querySelector('#site-menu');
  if (!btn || !nav) return;

  const closeBtn = nav.querySelector('.nav-close');
  const links = nav.querySelectorAll('a');

  // Placeholder to restore original position
  const placeholder = document.createComment('nav-placeholder');
  if (nav.parentNode) {
    nav.parentNode.insertBefore(placeholder, nav);
  }

  let inOverlay = false;

  function openMenu(){
    if (!inOverlay) {
      document.body.appendChild(nav); // move to <body>
      inOverlay = true;
    }
    document.body.classList.add('nav-open');
    btn.setAttribute('aria-expanded', 'true');
  }

  function closeMenu(){
    document.body.classList.remove('nav-open');
    btn.setAttribute('aria-expanded', 'false');
    if (inOverlay && placeholder.parentNode) {
      placeholder.parentNode.insertBefore(nav, placeholder); // restore
      inOverlay = false;
    }
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

  // Close on viewport resize to desktop
  const mq = window.matchMedia('(min-width: 901px)');
  mq.addEventListener('change', (e)=>{ if (e.matches) closeMenu(); });
});
