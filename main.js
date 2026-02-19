// ═══ RUDHRA SPACES — Shared JS ═══

document.addEventListener('DOMContentLoaded', () => {

  // ─── CUSTOM CURSOR ───
  const cursor = document.createElement('div');
  const ring   = document.createElement('div');
  cursor.className = 'cursor';
  ring.className   = 'cursor-ring';
  document.body.appendChild(cursor);
  document.body.appendChild(ring);

  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; ring.style.opacity = '.5'; });

  cursor.style.left  = cursor.style.top  = '-100px';
  ring.style.left    = ring.style.top    = '-100px';

  (function animCursor() {
    cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
    rx += (mx - rx) * .12; ry += (my - ry) * .12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animCursor);
  })();

  document.querySelectorAll('a, button, .service-card, .project-thumb, .pillar, .team-card').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); ring.classList.add('hover'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); ring.classList.remove('hover'); });
  });

  // ─── NAV SCROLL ───
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  // ─── MOBILE MENU ───
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuClose  = document.getElementById('menuClose');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
    if (menuClose) menuClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));
  }

  // ─── SCROLL REVEAL ───
  const reveals = document.querySelectorAll('.reveal');
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: .1, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => ro.observe(el));

  // ─── COUNTER ───
  document.querySelectorAll('[data-count]').forEach(el => {
    const co = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      let cur = 0;
      const step = target / (1800 / 16);
      const timer = setInterval(() => {
        cur = Math.min(cur + step, target);
        el.textContent = prefix + (Number.isInteger(target) ? Math.floor(cur) : cur.toFixed(1)) + suffix;
        if (cur >= target) clearInterval(timer);
      }, 16);
      co.unobserve(el);
    }, { threshold: .5 });
    co.observe(el);
  });

  // ─── SMOOTH SCROLL ───
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  // ─── ACTIVE NAV ───
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) a.classList.add('active');
  });

});
