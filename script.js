/* ═══════════════════════════════════════════════════════════════
   IMPERIAL TOPAZ PORTFOLIO — script.js
   ───────────────────────────────────────────────────────────────
   You generally do NOT need to edit this file.
   All content customization is done in index.html and style.css.

   This file handles:
   1. Custom cursor movement and hover effects
   2. Navigation bar shrink on scroll
   3. Scroll-reveal fade-in animations
   4. Skill bar fill animations
   5. Hero text reveal on page load
═══════════════════════════════════════════════════════════════ */


/* ───────────────────────────────────────────
   1. CUSTOM CURSOR
   Tracks mouse position; dot follows instantly,
   ring follows with a smooth lag effect.
   The ring expands and becomes visible when
   hovering over interactive elements.
─────────────────────────────────────────── */
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top  = my + 'px';
});

// Smooth ring lag animation using requestAnimationFrame
(function animateRing() {
  rx += (mx - rx) * 0.15;
  ry += (my - ry) * 0.15;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
})();

// Elements that trigger the hover ring expansion
// TO ADD MORE HOVER TARGETS: add selectors to this querySelectorAll list
document.querySelectorAll('a, button, .skill-pillar, .empire-card, .project-card, input, textarea, select')
  .forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
  });


/* ───────────────────────────────────────────
   2. NAVIGATION SCROLL SHRINK
   Adds the "scrolled" class to <nav> once
   the user scrolls past 60px — this reduces
   the nav padding (defined in style.css).
   TO CHANGE TRIGGER POINT: change 60 to any pixel value.
─────────────────────────────────────────── */
window.addEventListener('scroll', () => {
  document.getElementById('main-nav')
    .classList.toggle('scrolled', window.scrollY > 60);
});


/* ───────────────────────────────────────────
   3. SCROLL REVEAL ANIMATIONS
   Any element with class="reveal" starts
   invisible (opacity:0, shifted down 30px)
   and transitions in when it enters the viewport.
   Add class="reveal reveal-delay-1" through
   reveal-delay-5 to stagger multiple elements.
─────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });  // 0.12 = trigger when 12% of element is visible

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ───────────────────────────────────────────
   4. SKILL BAR ANIMATIONS
   Skill bars start at 0 width and animate
   to their target width (set via data-width
   attribute on .bar-fill elements) when the
   Skills section scrolls into view.
─────────────────────────────────────────── */
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.bar-fill').forEach(bar => {
        bar.style.transform = `scaleX(${bar.dataset.width})`;
        bar.classList.add('animate');
      });
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('#skills').forEach(el => barObserver.observe(el));


/* ───────────────────────────────────────────
   5. HERO TEXT REVEAL ON PAGE LOAD
   Staggers the hero elements in on first load
   with a short delay per element.
   TO CHANGE SPEED: adjust the 120 (ms) delay multiplier.
─────────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelectorAll('#hero .reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 120);
    });
  }, 200);
});
