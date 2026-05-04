/* ========================================
   CURA PELO REIKI – INTERATIVIDADE
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ----------------------------------------
  // 1. PARTÍCULAS FLUTUANTES NO HERO
  // ----------------------------------------
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      const size = Math.random() * 6 + 2;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 8 + 6) + 's';
      particle.style.animationDelay = (Math.random() * 5) + 's';
      particle.style.opacity = Math.random() * 0.5 + 0.2;
      particlesContainer.appendChild(particle);
    }
  }

  // ----------------------------------------
  // 2. SCROLL ANIMATIONS (AOS-like)
  // ----------------------------------------
  const animatedElements = document.querySelectorAll('[data-aos]');

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('aos-animate');
        }, parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => observer.observe(el));

  // ----------------------------------------
  // 3. FAQ ACCORDION
  // ----------------------------------------
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const isOpen = question.getAttribute('aria-expanded') === 'true';
      const answer = question.nextElementSibling;

      // Fecha todos
      faqQuestions.forEach(q => {
        q.setAttribute('aria-expanded', 'false');
        q.nextElementSibling.classList.remove('open');
      });

      // Abre o clicado (se estava fechado)
      if (!isOpen) {
        question.setAttribute('aria-expanded', 'true');
        answer.classList.add('open');
      }
    });
  });

  // ----------------------------------------
  // 4. TESTIMONIALS CAROUSEL
  // ----------------------------------------
  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('carouselDots');

  if (track && prevBtn && nextBtn && dotsContainer) {
    const cards = track.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    let slidesPerView = window.innerWidth >= 768 ? 2 : 1;
    let totalSlides = Math.ceil(cards.length / slidesPerView);

    function createDots() {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
    }

    function goToSlide(index) {
      currentIndex = index;
      const cardWidth = cards[0].offsetWidth + parseFloat(getComputedStyle(cards[0]).marginLeft) + parseFloat(getComputedStyle(cards[0]).marginRight);
      const offset = currentIndex * slidesPerView * cardWidth;
      track.style.transform = `translateX(-${offset}px)`;

      dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    prevBtn.addEventListener('click', () => {
      currentIndex = currentIndex > 0 ? currentIndex - 1 : totalSlides - 1;
      goToSlide(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0;
      goToSlide(currentIndex);
    });

    // Auto-play
    let autoPlay = setInterval(() => {
      currentIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0;
      goToSlide(currentIndex);
    }, 5000);

    // Pause on hover
    track.addEventListener('mouseenter', () => clearInterval(autoPlay));
    track.addEventListener('mouseleave', () => {
      autoPlay = setInterval(() => {
        currentIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0;
        goToSlide(currentIndex);
      }, 5000);
    });

    // Responsive
    window.addEventListener('resize', () => {
      slidesPerView = window.innerWidth >= 768 ? 2 : 1;
      totalSlides = Math.ceil(cards.length / slidesPerView);
      createDots();
      goToSlide(0);
    });

    createDots();
  }

  // ----------------------------------------
  // 5. FLOATING CTA (aparece após scroll)
  // ----------------------------------------
  const floatingCta = document.getElementById('floatingCta');

  if (floatingCta) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 600) {
        floatingCta.classList.add('visible');
      } else {
        floatingCta.classList.remove('visible');
      }
    });
  }

  // ----------------------------------------
  // 6. SMOOTH SCROLL para links internos
  // ----------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ----------------------------------------
  // 7. COUNTER ANIMATION no preço
  // ----------------------------------------
  const priceEl = document.getElementById('priceValue');
  if (priceEl) {
    const priceObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Placeholder: quando definir o preço, trocar o valor aqui
          priceEl.textContent = '--';
          priceObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    priceObserver.observe(priceEl);
  }

});
