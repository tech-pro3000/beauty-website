const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navLinkItems = Array.from(document.querySelectorAll('.nav-links a'));
const backToTop = document.getElementById('backToTop');
const yearEl = document.getElementById('year');
const hero = document.getElementById('hero');

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxItems = document.querySelectorAll('.lightbox-item');

if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 800,
    once: true,
    offset: 80
  });
}

if (typeof Swiper !== 'undefined') {
  new Swiper('.testimonial-swiper', {
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    slidesPerView: 1,
    spaceBetween: 18,
    breakpoints: {
      768: { slidesPerView: 2 },
      1200: { slidesPerView: 3 }
    }
  });
}

function updateStickyUI() {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 20);
  backToTop.classList.toggle('show', y > 300);

  // Subtle hero parallax for premium depth
  if (hero) {
    const shift = Math.min(y * 0.25, 90);
    hero.style.backgroundPosition = `center calc(50% + ${shift}px)`;
  }
}

window.addEventListener('scroll', updateStickyUI, { passive: true });
updateStickyUI();

menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  menuToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinkItems.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Active nav state by section visibility
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    navLinkItems.forEach((item) => {
      item.classList.toggle('active', item.getAttribute('href') === `#${id}`);
    });
  });
}, { threshold: 0.55 });

document.querySelectorAll('section[id], header[id]').forEach((section) => sectionObserver.observe(section));

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Gallery lightbox
lightboxItems.forEach((img) => {
  img.addEventListener('click', () => {
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox.classList.contains('open')) {
    closeLightbox();
  }
});

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}
