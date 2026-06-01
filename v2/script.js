(() => {
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav__toggle');
  const navMenu = document.querySelector('.nav__menu');
  const revealEls = document.querySelectorAll('.reveal');
  const dropdownButtons = document.querySelectorAll('[data-dropdown-btn]');
  const footprintMaps = document.querySelectorAll('[data-footprint-map]');

  const setNavState = () => {
    if (!nav) return;
    nav.classList.toggle('is-scrolled', window.scrollY > 10);
  };

  const closeMenu = () => {
    if (navMenu) navMenu.classList.remove('is-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    dropdownButtons.forEach((btn) => {
      btn.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    });
  };

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
      if (!open) closeMenu();
    });
  }

  dropdownButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      if (!window.matchMedia('(max-width: 820px)').matches) return;
      e.preventDefault();
      const wasOpen = btn.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(wasOpen));
      const dropdown = btn.nextElementSibling;
      if (dropdown && dropdown.classList.contains('nav__dropdown')) {
        dropdown.dataset.open = wasOpen ? 'true' : 'false';
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!nav) return;
    if (!nav.contains(e.target)) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__menu a').forEach((a) => {
    if (a.getAttribute('href') === current) a.classList.add('active');
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
    }, { threshold: 0.14, rootMargin: '0px 0px -70px 0px' });

    revealEls.forEach((el, index) => {
      if (!el.dataset.delay) el.dataset.delay = String(Math.min(index * 70, 280));
      observer.observe(el);
    });
  }

  const footprintData = {
    TX: { label: 'Texas', projects: '118', counties: '31', parcels: '2,400+', copy: 'Large, multi-county work with route planning, landowner communication, and project coordination.' },
    OK: { label: 'Oklahoma', projects: '64', counties: '18', parcels: '1,100+', copy: 'Mid-size coordination work with consistent permit tracking and clean documentation.' },
    CO: { label: 'Colorado', projects: '41', counties: '12', parcels: '730+', copy: 'Mountain-region permitting and access support that rewards careful planning.' },
    KS: { label: 'Kansas', projects: '53', counties: '15', parcels: '920+', copy: 'Open-range project support with an emphasis on timing, communication, and access.' },
    NM: { label: 'New Mexico', projects: '37', counties: '9', parcels: '680+', copy: 'Land and permitting work that benefits from quiet coordination and strong follow-through.' },
    UT: { label: 'Utah', projects: '29', counties: '8', parcels: '510+', copy: 'Terrain-aware coordination with a focus on clear handoffs and route awareness.' },
    WY: { label: 'Wyoming', projects: '22', counties: '6', parcels: '390+', copy: 'Wide-open territory work where practical scheduling and direct communication matter.' },
    NE: { label: 'Nebraska', projects: '25', counties: '7', parcels: '430+', copy: 'Parcel-level organization and steady relationship management across rural work.' },
    ND: { label: 'North Dakota', projects: '18', counties: '5', parcels: '280+', copy: 'Smaller-volume, detail-heavy work that rewards disciplined tracking.' },
    SD: { label: 'South Dakota', projects: '14', counties: '4', parcels: '220+', copy: 'Straightforward but important land work that still needs polished coordination.' },
    LA: { label: 'Louisiana', projects: '31', counties: '10', parcels: '610+', copy: 'Project support where legal detail, timing, and stakeholder communication stay front and center.' },
    AR: { label: 'Arkansas', projects: '19', counties: '6', parcels: '340+', copy: 'Balanced field support with attention to local relationships and recordkeeping.' },
    MS: { label: 'Mississippi', projects: '16', counties: '5', parcels: '270+', copy: 'Relationship-oriented work that benefits from calm, clear coordination.' },
    PA: { label: 'Pennsylvania', projects: '27', counties: '9', parcels: '520+', copy: 'Tighter regulatory contexts where clarity and documentation are especially important.' },
    WV: { label: 'West Virginia', projects: '21', counties: '7', parcels: '410+', copy: 'Terrain-sensitive project coordination with close attention to access and field communication.' },
    OH: { label: 'Ohio', projects: '24', counties: '6', parcels: '450+', copy: 'Process-driven permitting and land support with repeatable systems and clean follow-up.' },
    MO: { label: 'Missouri', projects: '23', counties: '7', parcels: '360+', copy: 'Balanced project support with a strong emphasis on communication and clear documentation.' },
    TN: { label: 'Tennessee', projects: '20', counties: '5', parcels: '310+', copy: 'Compact but important permitting work with close coordination and dependable follow-up.' }
  };

  footprintMaps.forEach((map) => {
    const detail = map.closest('.footprint__grid, .footprint')?.querySelector('[data-footprint-detail]');
    const buttons = map.querySelectorAll('.state-pill');

    const activate = (stateCode) => {
      const data = footprintData[stateCode];
      if (!data || !detail) return;
      detail.querySelector('h3').textContent = data.label;
      detail.querySelector('.panel-copy').textContent = data.copy;
      const dd = detail.querySelectorAll('dd');
      if (dd[0]) dd[0].textContent = data.projects;
      if (dd[1]) dd[1].textContent = data.counties;
      if (dd[2]) dd[2].textContent = data.parcels;
      buttons.forEach((btn) => btn.classList.toggle('is-active', btn.dataset.state === stateCode));
    };

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => activate(btn.dataset.state));
    });

    const initial = Array.from(buttons).find((btn) => btn.classList.contains('state-pill--active')) || buttons[0];
    if (initial) activate(initial.dataset.state);
  });

  setNavState();
  window.addEventListener('scroll', setNavState, { passive: true });
})();
