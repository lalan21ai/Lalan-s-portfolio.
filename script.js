const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.innerHTML = open ? 'CLOSE <span>×</span>' : 'MENU <span>＋</span>';
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = 'MENU <span>＋</span>';
  }));
}
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Scroll reveal that respects reduced-motion preferences.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.project-card, .lab-row, .about-stamp');
if (!reduceMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  revealItems.forEach(item => { item.classList.add('reveal'); observer.observe(item); });
} else revealItems.forEach(item => item.classList.add('is-visible'));

// Custom cursor on mouse/trackpad devices only.
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
if (dot && ring && matchMedia('(hover:hover) and (pointer:fine)').matches && !reduceMotion) {
  let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y;
  document.addEventListener('mousemove', e => {
    x = e.clientX; y = e.clientY;
    dot.style.left = `${x}px`; dot.style.top = `${y}px`;
    document.body.classList.add('cursor-active');
  });
  const animateRing = () => {
    rx += (x - rx) * .18; ry += (y - ry) * .18;
    ring.style.left = `${rx}px`; ring.style.top = `${ry}px`;
    requestAnimationFrame(animateRing);
  };
  animateRing();
  document.querySelectorAll('a,button,.project-visual,.skill-tags span,.lab-row').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
  document.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
  document.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
}

// Gentle pointer parallax on the hero artwork; disabled on touch and reduced-motion.
const art = document.querySelector('.hero-art');
if (art && matchMedia('(hover:hover) and (pointer:fine)').matches && !reduceMotion) {
  art.addEventListener('mousemove', e => {
    const rect = art.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - .5;
    const py = (e.clientY - rect.top) / rect.height - .5;
    art.style.setProperty('--pointer-x', `${px * 10}px`);
    art.style.setProperty('--pointer-y', `${py * 8}px`);
  });
  art.addEventListener('mouseleave', () => {
    art.style.setProperty('--pointer-x', '0px'); art.style.setProperty('--pointer-y', '0px');
  });
}
