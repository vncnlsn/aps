
(() => {
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav__toggle');
  const navLinks = document.querySelector('.nav__links');
  const dropdownItems = document.querySelectorAll('.nav__item--dropdown');
  const revealEls = document.querySelectorAll('.reveal');

  const setNavState = () => {
    if (!nav) return;
    nav.classList.toggle('is-scrolled', window.scrollY > 8);
  };

  const closeAllDropdowns = () => {
    dropdownItems.forEach((item) => {
      item.classList.remove('is-open');
      const button = item.querySelector('.nav__dropdown-toggle');
      if (button) button.setAttribute('aria-expanded', 'false');
    });
  };

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
      if (!open) closeAllDropdowns();
    });
  }

  dropdownItems.forEach((item) => {
    const button = item.querySelector('.nav__dropdown-toggle');
    if (!button) return;
    button.addEventListener('click', (e) => {
      if (window.matchMedia('(max-width: 820px)').matches) {
        e.preventDefault();
        const isOpen = item.classList.toggle('is-open');
        button.setAttribute('aria-expanded', String(isOpen));
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!nav) return;
    if (!nav.contains(e.target)) {
      if (navLinks) navLinks.classList.remove('is-open');
      if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
      closeAllDropdowns();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (navLinks) navLinks.classList.remove('is-open');
      if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
      closeAllDropdowns();
    }
  });

  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a').forEach((a) => {
    const href = a.getAttribute('href');
    if (href === current) a.classList.add('active');
  });

  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = Number(entry.target.dataset.delay || 0);
          setTimeout(() => entry.target.classList.add('is-visible'), delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach((el, index) => {
      if (!el.dataset.delay) el.dataset.delay = String(Math.min(index * 60, 260));
      observer.observe(el);
    });
  }

  setNavState();
  window.addEventListener('scroll', setNavState, { passive: true });
})();
