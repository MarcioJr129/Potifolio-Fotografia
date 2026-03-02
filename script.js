/* ============================================
   script.js — Portfólio Fotógrafo / Filmmaker / Drone
============================================ */
document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. HEADER — adiciona sombra ao rolar
  // ==========================================
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // ==========================================
  // 2. MENU LATERAL
  // ==========================================
  const menuBtn   = document.getElementById('menuBtn');
  const closeBtn  = document.getElementById('closeBtn');
  const sideMenu  = document.getElementById('sideMenu');
  const overlay   = document.getElementById('menuOverlay');
  const menuLinks = document.querySelectorAll('.menu-link');

  function openMenu()  {
    sideMenu.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    sideMenu.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);
  menuLinks.forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeMenu(); closeModal(); closePhotoModal(); } });

  // ==========================================
  // 3. FADE IN AO ROLAR
  // ==========================================
  const fadeEls = document.querySelectorAll(
    '.video-card, .photo-card, .section-header, .about-grid, .contact-section .container > *'
  );
  fadeEls.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach(el => observer.observe(el));

  // ==========================================
  // 4. VÍDEO CARD — preview ao hover (desktop)
  // ==========================================
  const videoCards = document.querySelectorAll('.video-card');
  videoCards.forEach(card => {
    const video = card.querySelector('video');
    if (!video) return;
    card.addEventListener('mouseenter', () => video.play().catch(() => {}));
    card.addEventListener('mouseleave', () => { video.pause(); video.currentTime = 0; });
  });

  // ==========================================
  // 5. MODAL DE VÍDEO
  // ==========================================
  const modal      = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  const modalClose = document.getElementById('modalClose');
  const backdrop   = document.getElementById('modalBackdrop');

  function openModal(src) {
    modalVideo.src = src;
    modalVideo.load();
    modalVideo.play().catch(() => {});
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.classList.remove('active');
    modalVideo.pause();
    modalVideo.src = '';
    document.body.style.overflow = '';
  }

  videoCards.forEach(card => {
    card.addEventListener('click', () => {
      const src = card.getAttribute('data-src');
      if (src) openModal(src);
    });
  });
  modalClose.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);

  // ==========================================
  // 6. MODAL DE FOTO
  // ==========================================
  const photoModal   = document.getElementById('photoModal');
  const modalPhoto   = document.getElementById('modalPhoto');
  const photoClose   = document.getElementById('photoClose');
  const photoBackdrop = document.getElementById('photoBackdrop');

  function openPhotoModal(src) {
    modalPhoto.src = src;
    photoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closePhotoModal() {
    photoModal.classList.remove('active');
    modalPhoto.src = '';
    document.body.style.overflow = '';
  }

  const photoCards = document.querySelectorAll('.photo-card');
  photoCards.forEach(card => {
    card.addEventListener('click', () => {
      const src = card.getAttribute('data-src');
      if (src) openPhotoModal(src);
    });
  });
  photoClose.addEventListener('click', closePhotoModal);
  photoBackdrop.addEventListener('click', closePhotoModal);

  // ==========================================
  // 7. SMOOTH SCROLL para links âncora
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ==========================================
  // 8. ACTIVE LINK no menu conforme seção visível
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        menuLinks.forEach(link => {
          link.style.opacity = link.getAttribute('href') === `#${id}` ? '1' : '0.5';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(sec => sectionObserver.observe(sec));

});
