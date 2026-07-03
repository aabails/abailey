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
/* ==========================================
   FAQ Accordion
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const button = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");
        const icon = item.querySelector(".faq-icon");

        // Start closed
        answer.style.maxHeight = null;
        icon.textContent = "+";

        button.addEventListener("click", () => {

            const isOpen = item.classList.contains("active");

            // Close all FAQs
            faqItems.forEach(other => {

                other.classList.remove("active");

                other.querySelector(".faq-answer").style.maxHeight = null;

                other.querySelector(".faq-icon").textContent = "+";

            });

            // If this one wasn't already open, open it
            if (!isOpen) {

                item.classList.add("active");

                answer.style.maxHeight = answer.scrollHeight + "px";

                icon.textContent = "×";

            }

        });

    });

});
document.addEventListener("DOMContentLoaded", () => {

    const items = document.querySelectorAll(".teen-faq .faq-item");

    items.forEach(item => {

        item.querySelector(".faq-question").addEventListener("click", () => {

            const answer = item.querySelector(".faq-answer");
            const open = item.classList.contains("active");

            items.forEach(i => {

                i.classList.remove("active");

                const a = i.querySelector(".faq-answer");

                a.style.maxHeight = null;

            });

            if(!open){

                item.classList.add("active");

                answer.style.maxHeight = answer.scrollHeight + "px";

            }

        });

    });

});
