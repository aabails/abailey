/* Replaced by mobile overlay implementation 2025-08-12 */
// Mobile overlay menu — robust across pages (2025-08-12)
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.topbar .wrap') || document.querySelector('.topbar') || document.body;
  const desktopNav = document.querySelector('.nav');
  let btn = document.querySelector('.hamburger');

  // Ensure hamburger exists
  if (!btn) {
    btn = document.createElement('button');
    btn.className = 'hamburger';
    btn.setAttribute('aria-label', 'Open menu');
    btn.textContent = '☰';
    if (header && header.appendChild) header.appendChild(btn);
  }

  // Build overlay
  let overlay = document.querySelector('.mobile-nav');
  if (!overlay) {
    overlay = document.createElement('nav');
    overlay.className = 'mobile-nav';
    overlay.setAttribute('hidden', '');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = '<button class="menu-close" aria-label="Close menu">×</button><ul class="mobile-links"></ul>';
    document.body.appendChild(overlay);
  }
  const list = overlay.querySelector('.mobile-links');
  const closeBtn = overlay.querySelector('.menu-close');

  // Clone desktop nav links into overlay
  if (desktopNav && list && list.children.length === 0) {
    const anchors = Array.from(desktopNav.querySelectorAll('a'));
    anchors.forEach(a => {
      const li = document.createElement('li');
      const clone = a.cloneNode(true);
      li.appendChild(clone);
      list.appendChild(li);
    });
  }

  function openMenu() {
    overlay.hidden = false;
    document.body.classList.add('nav-open');
    btn.setAttribute('aria-expanded', 'true');
    overlay.setAttribute('aria-hidden', 'false');
  }
  function closeMenu() {
    document.body.classList.remove('nav-open');
    btn.setAttribute('aria-expanded', 'false');
    overlay.setAttribute('aria-hidden', 'true');
    // Delay hiding until animation completes
    setTimeout(() => { overlay.hidden = true; }, 250);
  }

  btn.addEventListener('click', (e) => {
    // Inline onclick may toggle .nav-open too; that's fine.
    e.preventDefault();
    if (document.body.classList.contains('nav-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeMenu(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
});
