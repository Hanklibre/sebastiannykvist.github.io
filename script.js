// ===================================
// SMOOTH SCROLL
// ===================================

document.documentElement.classList.add('smooth-scroll');

// ===================================
// SPLIT TEXT - character stagger
// ===================================

document.querySelectorAll('.split-text').forEach(el => {
  const text = el.textContent;
  el.innerHTML = '';
  let delay = 0.8; // initial delay for page load
  for (let i = 0; i < text.length; i++) {
    if (text[i] === ' ') {
      const space = document.createElement('span');
      space.className = 'char-space';
      el.appendChild(space);
    } else {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = text[i];
      span.style.animationDelay = delay + 's';
      el.appendChild(span);
      delay += 0.04;
    }
  }
});

// ===================================
// CURSOR GLOW
// ===================================

const glow = document.querySelector('.cursor-glow');

if (glow && window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

// ===================================
// NAVIGATION TOGGLE
// ===================================

const toggle = document.querySelector('.nav-toggle');
const overlay = document.querySelector('.nav-overlay');
const navLinks = document.querySelectorAll('.nav-overlay a');

toggle.addEventListener('click', () => {
  toggle.classList.toggle('active');
  overlay.classList.toggle('open');
  document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    toggle.classList.remove('active');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===================================
// SCROLL PROGRESS BAR
// ===================================

const progressBar = document.querySelector('.progress-bar');

function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (progressBar) progressBar.style.width = progress + '%';
}

// ===================================
// SCROLL REVEAL
// ===================================

const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

reveals.forEach(el => revealObserver.observe(el));

// ===================================
// SECTION BORDER DRAW
// ===================================

const sections = document.querySelectorAll('.section');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      sectionObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.05
});

sections.forEach(s => sectionObserver.observe(s));

// ===================================
// PARALLAX
// ===================================

const parallaxElements = document.querySelectorAll('[data-parallax]');

function updateParallax() {
  const scrollY = window.scrollY;
  parallaxElements.forEach(el => {
    const speed = parseFloat(el.dataset.parallax);
    const rect = el.getBoundingClientRect();
    const center = rect.top + rect.height / 2;
    const offset = (center - window.innerHeight / 2) * speed;
    el.style.transform = `translateY(${offset}px)`;
  });
}

// ===================================
// HIDE SCROLL HINT
// ===================================

const scrollHint = document.querySelector('.scroll-hint');

function handleScroll() {
  if (window.scrollY > 100 && scrollHint) {
    scrollHint.style.opacity = '0';
    scrollHint.style.transition = 'opacity 0.5s ease';
  }
}

// ===================================
// SCROLL HANDLER (single rAF loop)
// ===================================

let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateProgress();
      updateParallax();
      handleScroll();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

// ===================================
// SMOOTH ANCHOR SCROLL
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
