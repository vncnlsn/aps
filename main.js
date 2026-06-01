/* ============================================================
   ALLSTATE PERMIT SERVICES — Main JS
   ============================================================ */

// ── Navbar scroll behavior ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Scroll reveal ──
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

// ── Staggered reveal for grid children ──
document.querySelectorAll('.stagger-children').forEach(parent => {
  [...parent.children].forEach((child, i) => {
    child.classList.add('reveal');
    child.style.transitionDelay = `${i * 0.1}s`;
    observer.observe(child);
  });
});

// ── Animated stat counters ──
function animateCounter(el, target, duration = 1800) {
  const isDecimal = target % 1 !== 0;
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = ease * target;
    el.textContent = isDecimal
      ? current.toFixed(1)
      : Math.floor(current).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = isDecimal ? target.toFixed(1) : target.toLocaleString();
  };
  requestAnimationFrame(update);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = 'true';
      const target = parseFloat(entry.target.dataset.target);
      animateCounter(entry.target, target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-target]').forEach(el => {
  el.textContent = '0';
  statObserver.observe(el);
});

// ── US Map: states APS has worked in ──
const workedStates = [
  'TX', 'OK', 'KS', 'NE', 'CO', 'WY', 'MT', 'ND', 'SD', 'MN',
  'IA', 'MO', 'AR', 'LA', 'MS', 'AL', 'GA', 'TN', 'KY', 'IL',
  'IN', 'OH', 'WV', 'VA', 'PA', 'NY', 'UT', 'NM', 'AZ', 'CA',
  'NV', 'ID', 'WA', 'OR', 'MI', 'WI'
];

// Color worked states after map loads
function colorStates() {
  workedStates.forEach(abbr => {
    // Try both data-state and title attributes
    const els = document.querySelectorAll(`[data-state="${abbr}"], path[title="${abbr}"]`);
    els.forEach(el => el.classList.add('worked'));
  });
}

// Run on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  colorStates();
});

// State tooltip
const mapEl = document.getElementById('us-map');
if (mapEl) {
  const tooltip = document.createElement('div');
  tooltip.id = 'map-tooltip';
  tooltip.style.cssText = `
    position: fixed; pointer-events: none; opacity: 0;
    background: #0d1b2a; border: 1px solid #c9a84c;
    color: #f4f1ec; padding: 8px 14px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase;
    transition: opacity 0.2s;
    z-index: 999;
  `;
  document.body.appendChild(tooltip);

  mapEl.addEventListener('mousemove', e => {
    const state = e.target.closest('[data-state]');
    if (state) {
      const abbr = state.dataset.state;
      const name = state.dataset.name || abbr;
      const worked = workedStates.includes(abbr);
      tooltip.textContent = `${name}${worked ? ' — Operations Completed' : ''}`;
      tooltip.style.opacity = '1';
      tooltip.style.left = (e.clientX + 12) + 'px';
      tooltip.style.top = (e.clientY - 28) + 'px';
    } else {
      tooltip.style.opacity = '0';
    }
  });

  mapEl.addEventListener('mouseleave', () => {
    tooltip.style.opacity = '0';
  });
}
