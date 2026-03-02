// ================================================
// script.js — Dronear Cariri
// ================================================

document.addEventListener('DOMContentLoaded', () => {

  // ─── HEADER: sombra ao rolar ───
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });


  // ─── MENU LATERAL ───
  const menuBtn  = document.getElementById('menuBtn');
  const closeBtn = document.getElementById('closeBtn');
  const sideMenu = document.getElementById('sideMenu');
  const overlay  = document.getElementById('menuOverlay');

  const openMenu = () => {
    sideMenu.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    sideMenu.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  menuBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);
  document.querySelectorAll('.menu-link').forEach(l => l.addEventListener('click', closeMenu));

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeMenu(); closeModal(); }
  });


  // ─── FADE-IN AO ROLAR (Intersection Observer) ───
  const fadeEls = document.querySelectorAll(
    '.video-card, .section-header, .about-grid, .stats-bar, .contact-section .container > *, .feature-card'
  );

  fadeEls.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

  fadeEls.forEach(el => observer.observe(el));


  // ─── MODAL DE VÍDEO ───
  const modal      = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  const modalClose = document.getElementById('modalClose');
  const backdrop   = document.getElementById('modalBackdrop');

  const openModal = src => {
    modalVideo.src = src;
    modalVideo.load();
    modalVideo.play().catch(() => {});
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    modalVideo.pause();
    modalVideo.src = '';
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('click', () => {
      const src = card.getAttribute('data-src');
      if (src) openModal(src);
    });
  });

  modalClose.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);


  // ─── SMOOTH SCROLL ───
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - 62,
          behavior: 'smooth'
        });
      }
    });
  });

});
