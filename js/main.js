/* ═══════════════════════════════════════════
   APS — Allstate Permit Services
   main.js
   ══════════════════════════════════════════ */

'use strict';

/* ── Year ──────────────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ── Nav: scroll state ──────────────────── */
const nav = document.getElementById('site-nav');
let ticking = false;

function updateNav() {
  if (window.scrollY > 40) {
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

updateNav(); // run once on load

/* ── Mobile nav toggle ──────────────────── */
const toggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    });
  });
}

/* ── Fade-up scroll animations ──────────── */
const fadeEls = document.querySelectorAll(
  '.mission-statement, .mission-sub, .stat-card, .client-logo-item, ' +
  '.service-card, .value-item, .states-list span, .cta-headline, .cta-sub'
);

fadeEls.forEach((el, i) => {
  el.classList.add('fade-up');
  // Stagger siblings in the same grid
  const delay = (i % 4) * 80;
  el.style.transitionDelay = delay + 'ms';
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => observer.observe(el));

/* ── Video: ensure autoplay works ─────── */
const video = document.getElementById('hero-video');
if (video) {
  video.addEventListener('loadeddata', () => {
    video.play().catch(() => {
      // Autoplay blocked — video stays on poster frame, which is fine
    });
  });
}
