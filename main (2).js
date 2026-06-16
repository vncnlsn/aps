/* ═══════════════════════════════════════════
   APS — Allstate Permit Services
   main.js v4
   ══════════════════════════════════════════ */

'use strict';

/* ── Year ──────────────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ── Nav: transparent over hero, navy after ── */
const nav = document.getElementById('site-nav');
const hero = document.querySelector('.hero');
let ticking = false;

function updateNav() {
  const heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
  if (heroBottom <= nav.offsetHeight) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateNav);
    ticking = true;
  }
}, { passive: true });

updateNav();

/* ── Mobile nav toggle ──────────────────── */
const toggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    });
  });
}

/* ── Scroll fade-up animations ──────────── */
const fadeTargets = document.querySelectorAll(
  '.mission-statement, .btn-mission, .stat-card, ' +
  '.client-logo-item, .service-card, .value-item, ' +
  '.states-list span, .cta-headline, .cta-sub'
);

fadeTargets.forEach((el, i) => {
  el.classList.add('fade-up');
  el.style.transitionDelay = (i % 4) * 75 + 'ms';
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });

fadeTargets.forEach(el => observer.observe(el));
