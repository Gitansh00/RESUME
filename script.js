// script.js

// --- CUSTOM CURSOR ---
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  if (!dot || !ring) return;
  dot.style.left = e.clientX + 'px';
  dot.style.top = e.clientY + 'px';
  rx += (e.clientX - rx) * 0.12;
  ry += (e.clientY - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
});
document.querySelectorAll('a, button, .menu-icon').forEach(el => {
  el.addEventListener('mouseenter', () => { if (ring) ring.style.transform = 'translate(-50%,-50%) scale(2)' });
  el.addEventListener('mouseleave', () => { if (ring) ring.style.transform = 'translate(-50%,-50%) scale(1)' });
});

// --- PRELOADER ---
window.addEventListener('load', () => {
  setTimeout(() => {
    const p = document.getElementById('preloader');
    if (p) {
        p.style.opacity = '0';
        setTimeout(() => p.remove(), 1500);
    }
  }, 1200);
});

// --- HERO BACKGROUND (Gradient + Three.js + Lenis) ---
// Lenis smooth scroll
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js';
script.onload = () => {
  const lenis = new Lenis({ duration: 1.6, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);
  
  // Preserve smooth scroll for nav links
  document.querySelectorAll('.nav-links a, .footer-links a, .menu-link').forEach(link => {
      link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');
          if (href.startsWith('#')) {
              e.preventDefault();
              const target = document.querySelector(href);
              if (target) {
                  lenis.scrollTo(target);
              }
          }
      });
  });
};
document.head.appendChild(script);

// Mouse-tracking gradient
const hero = document.querySelector('.hero');
let cx = 50, cy = 50, tx = 50, ty = 50;
document.addEventListener('mousemove', e => {
  tx = (e.clientX / innerWidth) * 100;
  ty = (e.clientY / innerHeight) * 100;
});
(function lerp() {
  cx += (tx - cx) * 0.05;
  cy += (ty - cy) * 0.05;
  if (hero) hero.style.background = `
    radial-gradient(ellipse 55% 55% at ${cx}% ${cy}%, rgba(30,60,160,0.3) 0%, transparent 60%),
    radial-gradient(ellipse 70% 60% at ${100-cx}% ${100-cy}%, rgba(15,35,100,0.2) 0%, transparent 55%),
    #05080f
  `;
  requestAnimationFrame(lerp);
})();

// Three.js particle field
const s = document.createElement('script');
s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
s.onload = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;';
  document.body.prepend(canvas);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(2500 * 3);
  for (let i = 0; i < pos.length; i++) pos[i] = (Math.random() - 0.5) * 25;
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({ size: 0.015, color: 0x4466bb, transparent: true, opacity: 0.5 });
  const stars = new THREE.Points(geo, mat);
  scene.add(stars);
  camera.position.z = 6;

  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => {
    mx = (e.clientX/innerWidth - 0.5) * 0.4;
    my = (e.clientY/innerHeight - 0.5) * 0.4;
  });
  (function tick() {
    requestAnimationFrame(tick);
    stars.rotation.y += 0.0006;
    stars.rotation.x += 0.0002;
    camera.position.x += (mx - camera.position.x) * 0.03;
    camera.position.y += (-my - camera.position.y) * 0.03;
    renderer.render(scene, camera);
  })();

  window.addEventListener('resize', () => {
    camera.aspect = innerWidth/innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });
};
document.head.appendChild(s);

// --- ALL SECTIONS REVEAL ---
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('section, .reveal, .reveal-line, .service-item').forEach(el => observer.observe(el));

// --- NAV SCROLL ---
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (nav) nav.classList.toggle('scrolled', scrollY > 50);
});

// --- HAMBURGER MENU (Preserved) ---
const menuIcon = document.querySelector('.menu-icon');
const menuOverlay = document.querySelector('.menu-overlay');
const menuLinks = document.querySelectorAll('.menu-link');

if (menuIcon && menuOverlay) {
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = menuOverlay.classList.contains('active') ? 'hidden' : '';
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuIcon.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// --- SKILLS ACCORDION ---
document.querySelectorAll('.skill-item').forEach(item => {
  item.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.skill-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// --- PROJECT CARDS PARTICLES ---
document.querySelectorAll('.proj-card').forEach(card => {
  const canvas = card.querySelector('.card-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = 150;
  let height = 150;
  let particles = [];
  
  function init() {
    canvas.width = width;
    canvas.height = height;
    particles = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      });
    }
  }
  
  function animate() {
    ctx.clearRect(0, 0, width, height);
    const isHovered = card.matches(':hover');
    const color = isHovered ? '180, 200, 255' : '30, 60, 140';
    
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, 0.8)`;
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  
  init();
  animate();
});

