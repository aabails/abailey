// === MOBILE MENU HOTFIX JS ===
document.addEventListener('DOMContentLoaded', () => {
  let nav = document.querySelector('#site-menu') || document.querySelector('.topbar .nav');
  const btn = document.querySelector('.hamburger');
  if (!nav || !btn) return;
  if (!nav.id) nav.id = 'site-menu';

  let closeBtn = nav.querySelector('.nav-close');
  if (!closeBtn){
    closeBtn = document.createElement('button');
    closeBtn.className = 'nav-close';
    closeBtn.type = 'button';
    closeBtn.setAttribute('aria-label','Close menu');
    closeBtn.textContent = '×';
    nav.appendChild(closeBtn);
  }

  let backdrop = document.querySelector('.nav-backdrop');
  if (!backdrop){
    backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    document.body.appendChild(backdrop);
  }

  const placeholder = document.createComment('nav-placeholder');
  if (nav.parentNode && !placeholder.parentNode) nav.parentNode.insertBefore(placeholder, nav);

  function getTopOffset(){
    const bar = document.querySelector('.topbar');
    const r = bar ? bar.getBoundingClientRect() : {bottom:64};
    const top = Math.max(0, Math.round(r.bottom));
    nav.style.setProperty('--menu-top', top + 'px');
    return top;
  }
  function syncTop(){
    if (document.body.classList.contains('nav-open')){
      nav.style.top = getTopOffset() + 'px';
    }
  }

  let inOverlay = false;
  function openMenu(){
    if (!inOverlay){ document.body.appendChild(nav); inOverlay = true; }
    getTopOffset();
    document.body.classList.add('nav-open');
    btn.setAttribute('aria-expanded','true');
  }
  function closeMenu(){
    document.body.classList.remove('nav-open');
    btn.setAttribute('aria-expanded','false');
    if (inOverlay && placeholder.parentNode){
      placeholder.parentNode.insertBefore(nav, placeholder);
      inOverlay = false;
    }
  }
  function toggleMenu(){ document.body.classList.contains('nav-open') ? closeMenu() : openMenu(); }

  btn.addEventListener('click', toggleMenu);
  closeBtn.addEventListener('click', closeMenu);
  backdrop.addEventListener('click', closeMenu);
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e)=>{ if (e.key === 'Escape') closeMenu(); });

  window.addEventListener('scroll', syncTop, { passive:true });
  window.addEventListener('resize', syncTop);

  const mq = window.matchMedia('(min-width: 901px)');
  mq.addEventListener('change', (e)=>{ if (e.matches) closeMenu(); });

  btn.removeAttribute('onclick');
});
// === END MOBILE MENU HOTFIX JS ===
