// Mobile menu: portal + dynamic top offset + dimming backdrop
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.hamburger');
  let nav = document.querySelector('#site-menu');
  if (!btn || !nav) return;

  const closeBtn = nav.querySelector('.nav-close');
  const links = nav.querySelectorAll('a');

  // Placeholder for restoring original position
  const placeholder = document.createComment('nav-placeholder');
  if (nav.parentNode) {
    nav.parentNode.insertBefore(placeholder, nav);
  }

  // Create a reusable backdrop once
  let backdrop = document.querySelector('.nav-backdrop');
  if (!backdrop){
    backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    document.body.appendChild(backdrop);
  }

  let inOverlay = false;

  function getTopOffset(){
    const bar = document.querySelector('.topbar');
    if (!bar) return 0;
    const r = bar.getBoundingClientRect();
    return Math.max(0, Math.round(r.bottom));
  }

  function syncTopOnScroll(){
    if (document.body.classList.contains('nav-open')){
      nav.style.top = getTopOffset() + 'px';
    }
  }

  function openMenu(){
    if (!inOverlay) {
      document.body.appendChild(nav); // move to <body>
      nav.style.position = 'fixed';
      nav.style.left = '0';
      nav.style.right = '0';
      nav.style.top = getTopOffset() + 'px';
      inOverlay = true;
    }
    document.body.classList.add('nav-open');
    btn.setAttribute('aria-expanded', 'true');
  }

  function closeMenu(){
    document.body.classList.remove('nav-open');
    btn.setAttribute('aria-expanded', 'false');
    if (inOverlay && placeholder.parentNode) {
      nav.style.top = '';
      nav.style.left = '';
      nav.style.right = '';
      nav.style.position = '';
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
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
  backdrop.addEventListener('click', closeMenu);

  // Keep the menu aligned with the header on scroll/resize
  window.addEventListener('scroll', syncTopOnScroll, { passive: true });
  window.addEventListener('resize', syncTopOnScroll);

  // Close on viewport resize to desktop
  const mq = window.matchMedia('(min-width: 901px)');
  mq.addEventListener('change', (e)=>{ if (e.matches) closeMenu(); });
});