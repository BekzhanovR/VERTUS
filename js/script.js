/**
 * VERTUS GAMING CENTER — script.js
 * Advanced interactions, animations, and UI logic
 */

'use strict';

/* ============================================================
   LOADER
   ============================================================ */
(function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
      // Trigger hero animations after load
      triggerHeroAnimations();
    }, 2200);
  });
  document.body.style.overflow = 'hidden';
})();

/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const trail = document.getElementById('cursorTrail');
  if (!cursor || !trail) return;

  let mouseX = 0, mouseY = 0;
  let trailX = 0, trailY = 0;
  let isHovering = false;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  // Smooth trail animation
  function animateTrail() {
    trailX += (mouseX - trailX) * 0.12;
    trailY += (mouseY - trailY) * 0.12;
    trail.style.transform = `translate(${trailX}px, ${trailY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateTrail);
  }
  animateTrail();

  // Hover state
  const interactables = document.querySelectorAll('a, button, .adv-card, .game-logo, .gallery__item, .tab-btn, .testimonials__btn, .testimonials__dot');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform += ' scale(2)';
      cursor.style.background = 'transparent';
      cursor.style.border = '1px solid var(--gold)';
      trail.style.width = '50px';
      trail.style.height = '50px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.border = 'none';
      cursor.style.background = 'var(--gold)';
      trail.style.width = '32px';
      trail.style.height = '32px';
    });
  });

  document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; trail.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; trail.style.opacity = '0.5'; });
})();

/* ============================================================
   PARTICLE CANVAS
   ============================================================ */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.3,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.4 + 0.05,
      gold: Math.random() > 0.6
    };
  }

  for (let i = 0; i < 80; i++) particles.push(createParticle());

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.gold
        ? `rgba(201, 168, 76, ${p.opacity})`
        : `rgba(255, 255, 255, ${p.opacity * 0.4})`;
      ctx.fill();

      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
    });

    // Draw subtle connections
    particles.forEach((p1, i) => {
      particles.slice(i + 1, i + 6).forEach(p2 => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(201, 168, 76, ${0.04 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      });
    });

    animId = requestAnimationFrame(drawParticles);
  }
  drawParticles();
})();

/* ============================================================
   NAVBAR SCROLL BEHAVIOR
   ============================================================ */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = y;
  }, { passive: true });
})();

/* ============================================================
   MOBILE BURGER MENU
   ============================================================ */
(function initBurger() {
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!burger || !mobileMenu) return;

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      mobileMenu.classList.remove('open');
    });
  });
})();

/* ============================================================
   HERO ANIMATIONS (triggered after loader)
   ============================================================ */
function triggerHeroAnimations() {
  const subtitles = document.querySelectorAll('.hero .reveal-text');
  subtitles.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 150);
  });
}

/* ============================================================
   COUNTER ANIMATION
   ============================================================ */
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
}

/* ============================================================
   INTERSECTION OBSERVER — SCROLL ANIMATIONS
   ============================================================ */
(function initScrollAnimations() {
  // Reveal elements
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay) || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal-up, .reveal-text').forEach(el => {
    revealObserver.observe(el);
  });

  // Counter animation
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const nums = entry.target.querySelectorAll('[data-count]');
        nums.forEach(num => {
          const target = parseInt(num.dataset.count);
          animateCounter(num, target);
        });
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const heroStats = document.querySelector('.hero__stats');
  if (heroStats) counterObserver.observe(heroStats);
})();

/* ============================================================
   SERVICES TABS
   ============================================================ */
(function initServicesTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.services__panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('tab-btn--active'));
      panels.forEach(p => {
        p.classList.remove('services__panel--active');
        p.style.opacity = '0';
      });

      btn.classList.add('tab-btn--active');
      const targetPanel = document.querySelector(`[data-panel="${tabId}"]`);
      if (targetPanel) {
        targetPanel.classList.add('services__panel--active');
        setTimeout(() => { targetPanel.style.opacity = '1'; }, 30);
      }
    });
  });

  // Set initial opacity
  panels.forEach((p, i) => {
    p.style.opacity = i === 0 ? '1' : '0';
    p.style.transition = 'opacity 0.4s ease';
  });
})();

/* ============================================================
   TESTIMONIALS SLIDER
   ============================================================ */
(function initTestimonials() {
  const track = document.getElementById('testimonialTrack');
  const dotsContainer = document.getElementById('testimDots');
  const prevBtn = document.getElementById('testimPrev');
  const nextBtn = document.getElementById('testimNext');

  if (!track) return;

  const cards = track.querySelectorAll('.testimonial-card');
  let current = 0;
  let autoTimer;

  // Responsive slides per view
  function getSlidesPerView() {
    return window.innerWidth < 768 ? 1 : window.innerWidth < 1100 ? 2 : 3;
  }

  // Create dots
  const totalDots = Math.ceil(cards.length / getSlidesPerView());
  for (let i = 0; i < cards.length; i++) {
    const dot = document.createElement('div');
    dot.className = `testimonials__dot${i === 0 ? ' testimonials__dot--active' : ''}`;
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  }

  function updateDots() {
    dotsContainer.querySelectorAll('.testimonials__dot').forEach((d, i) => {
      d.classList.toggle('testimonials__dot--active', i === current);
    });
  }

  function goTo(index) {
    const perView = getSlidesPerView();
    const max = cards.length - perView;
    current = Math.max(0, Math.min(index, max));
    const cardWidth = track.parentElement.offsetWidth;
    const gap = 32;
    const offset = current * (cardWidth / perView + gap / perView);
    track.style.transform = `translateX(-${offset}px)`;
    updateDots();
  }

  prevBtn && prevBtn.addEventListener('click', () => {
    goTo(current - 1);
    resetAuto();
  });
  nextBtn && nextBtn.addEventListener('click', () => {
    goTo(current + 1);
    resetAuto();
  });

  function startAuto() {
    autoTimer = setInterval(() => {
      const perView = getSlidesPerView();
      const max = cards.length - perView;
      goTo(current >= max ? 0 : current + 1);
    }, 4000);
  }

  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  startAuto();
  window.addEventListener('resize', () => goTo(0));
})();

/* ============================================================
   CONTACT FORM
   ============================================================ */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.querySelector('.btn__text').textContent;
    btn.querySelector('.btn__text').textContent = 'MESSAGE SENT ✓';
    btn.style.background = 'linear-gradient(135deg, #1a5a20, #2a8a30)';

    setTimeout(() => {
      btn.querySelector('.btn__text').textContent = originalText;
      btn.style.background = '';
      form.reset();
    }, 3000);
  });

  // Input focus effects
  form.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.querySelector('.form-label').style.color = 'var(--gold-light)';
    });
    input.addEventListener('blur', () => {
      input.parentElement.querySelector('.form-label').style.color = 'var(--gold)';
    });
  });
})();

/* ============================================================
   SMOOTH SCROLL FOR NAV LINKS
   ============================================================ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ============================================================
   PARALLAX SUBTLE EFFECT ON HERO
   ============================================================ */
(function initParallax() {
  const heroGlows = document.querySelectorAll('.hero__glow');
  const heroGrid = document.querySelector('.hero__grid');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      heroGlows.forEach((g, i) => {
        g.style.transform = `translateY(${y * (0.15 + i * 0.05)}px)`;
      });
      if (heroGrid) heroGrid.style.transform = `translateY(${y * 0.05}px)`;
    }
  }, { passive: true });

  // Mouse parallax on hero
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (clientX - cx) / cx;
      const dy = (clientY - cy) / cy;

      heroGlows.forEach((g, i) => {
        const factor = (i + 1) * 15;
        g.style.transform += ` translate(${dx * factor}px, ${dy * factor}px)`;
      });
    });
  }
})();

/* ============================================================
   BUTTON RIPPLE EFFECTS
   ============================================================ */
(function initRipple() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ripple.style.cssText = `
        position:absolute;
        width:4px;height:4px;
        border-radius:50%;
        background:rgba(255,255,255,0.3);
        left:${x}px;top:${y}px;
        transform:translate(-50%,-50%) scale(0);
        animation:rippleEffect 0.6s ease-out forwards;
        pointer-events:none;z-index:10;
      `;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  // Inject ripple keyframe
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rippleEffect {
      to { transform: translate(-50%,-50%) scale(80); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
})();

/* ============================================================
   ANIMATED SECTION BACKGROUNDS (glow scan effect)
   ============================================================ */
(function initScanline() {
  const style = document.createElement('style');
  style.textContent = `
    .hero::before {
      content: '';
      position: absolute;
      top: -100%;
      left: 0;
      width: 100%;
      height: 200px;
      background: linear-gradient(to bottom, transparent, rgba(201,168,76,0.03), transparent);
      animation: scanline 8s linear infinite;
      pointer-events: none;
      z-index: 0;
    }
    @keyframes scanline {
      0% { top: -200px; }
      100% { top: 100%; }
    }
  `;
  document.head.appendChild(style);
})();

/* ============================================================
   GALLERY LIGHTBOX (basic)
   ============================================================ */
(function initGalleryLightbox() {
  const items = document.querySelectorAll('.gallery__item:not(.gallery__item--see-more)');
  items.forEach(item => {
    item.addEventListener('click', () => {
      // Simple flash effect as placeholder (real implementation would show image)
      item.style.boxShadow = '0 0 60px rgba(201,168,76,0.4)';
      setTimeout(() => { item.style.boxShadow = ''; }, 500);
    });
  });
})();

/* ============================================================
   ACTIVE NAV LINK HIGHLIGHT ON SCROLL
   ============================================================ */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar__link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.style.color = 'var(--gold)';
          }
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => observer.observe(s));
})();

/* ============================================================
   STAGGERED CARD ANIMATION
   ============================================================ */
(function initStaggerCards() {
  const advcards = document.querySelectorAll('.adv-card');
  advcards.forEach((card, i) => {
    if (!card.dataset.delay) {
      card.dataset.delay = i * 100;
    }
  });
})();

/* ============================================================
   PRICING TABLE ROW HIGHLIGHT
   ============================================================ */
(function initPricingHighlight() {
  const rows = document.querySelectorAll('.pricing__table tbody tr');
  rows.forEach(row => {
    row.addEventListener('mouseenter', () => {
      row.style.transition = 'background 0.2s';
    });
  });
})();

/* ============================================================
   FLOATING LABEL EFFECT FOR HERO STATS
   ============================================================ */
(function initStatFloating() {
  const stats = document.querySelectorAll('.hero__stat');
  stats.forEach((stat, i) => {
    stat.style.animation = `statFloat ${3 + i * 0.5}s ease-in-out ${i * 0.2}s infinite`;
  });

  const style = document.createElement('style');
  style.textContent = `
    @keyframes statFloat {
      0%,100% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
    }
  `;
  document.head.appendChild(style);
})();

/* ============================================================
   PAGE READY LOG
   ============================================================ */
console.log('%cVERTUS GAMING CENTER', 'color:#c9a84c;font-family:monospace;font-size:24px;font-weight:bold;');
console.log('%cElite Gaming · Nukus, Uzbekistan', 'color:#888;font-family:monospace;font-size:12px;');
