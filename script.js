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

    function getSlidesPerView() {
      return window.innerWidth >= 768 ? 2 : 1;
    }

    function getTotalSlides() {
      return Math.ceil(cards.length / getSlidesPerView());
    }

    function getSlideWidth() {
      const containerWidth = track.parentElement.offsetWidth;
      return containerWidth / getSlidesPerView();
    }

    function createDots() {
      dotsContainer.innerHTML = '';
      const total = getTotalSlides();
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
    }

    function goToSlide(index) {
      const total = getTotalSlides();
      if (index >= total) index = 0;
      if (index < 0) index = total - 1;
      currentIndex = index;

      const slideWidth = getSlideWidth();
      const offset = currentIndex * getSlidesPerView() * slideWidth;
      track.style.transform = `translateX(-${offset}px)`;

      dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    prevBtn.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
    });

    // Auto-play
    let autoPlay = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 5000);

    // Pause on hover
    track.addEventListener('mouseenter', () => clearInterval(autoPlay));
    track.addEventListener('mouseleave', () => {
      autoPlay = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 5000);
    });

    // Responsive: recalculate on resize
    window.addEventListener('resize', () => {
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
    const targetPrice = 14;
    let animated = false;

    const priceObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          let current = 0;
          const duration = 1000;
          const step = targetPrice / (duration / 16);
          const counter = setInterval(() => {
            current += step;
            if (current >= targetPrice) {
              current = targetPrice;
              clearInterval(counter);
            }
            priceEl.textContent = Math.round(current);
          }, 16);
          priceObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    priceObserver.observe(priceEl);
  }

});
