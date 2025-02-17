document.addEventListener('DOMContentLoaded', () => {
  /* ----- Element Selectors ----- */
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const toggleDarkModeBtn = document.getElementById('toggle-dark-mode');
  const typedElement = document.getElementById('typed');
  const testimonials = document.querySelectorAll('.testimonial');
  const sections = document.querySelectorAll('.section');

  /* ----- Mobile Menu Toggle ----- */
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
  });

  /* ----- Smooth Scrolling ----- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - header.offsetHeight,
          behavior: 'smooth'
        });
        // Close mobile menu
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  /* ----- Sticky Header & Scroll-to-Top Button ----- */
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
    scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
  });
  
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ----- Intersection Observer for Section Reveal ----- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  sections.forEach(section => observer.observe(section));

  /* ----- Typed Text Effect ----- */
  const phrases = [
    "Expert Appliance Repair",
    "Reliable Sales & Service",
    "Quality You Can Trust"
  ];
  let phraseIndex = 0, letterIndex = 0, isDeleting = false;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    if (!isDeleting) {
      // Typing forward
      if (letterIndex < currentPhrase.length) {
        typedElement.textContent = currentPhrase.substring(0, letterIndex + 1);
        letterIndex++;
        setTimeout(type, 100);
      } else {
        isDeleting = true;
        setTimeout(type, 1500);
      }
    } else {
      // Deleting
      if (letterIndex > 0) {
        typedElement.textContent = currentPhrase.substring(0, letterIndex - 1);
        letterIndex--;
        setTimeout(type, 50);
      } else {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 100);
      }
    }
  }
  type();

  /* ----- Testimonial Slider ----- */
  let testimonialIndex = 0;
  function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
      testimonial.classList.toggle('active', i === index);
    });
  }
  setInterval(() => {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    showTestimonial(testimonialIndex);
  }, 5000);

  /* ----- Dark Mode Toggle ----- */
  function updateDarkModeIcon() {
    toggleDarkModeBtn.innerHTML = document.body.classList.contains('dark-mode')
      ? '☀️'
      : '<i class="fas fa-moon"></i>';
  }

  toggleDarkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    updateDarkModeIcon();
  });

  // Load saved theme
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
  }
  updateDarkModeIcon();
});
