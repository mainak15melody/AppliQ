document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70, // Offset for fixed header
          behavior: 'smooth'
        });
      }
      // Close mobile menu if open
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
      }
    });
  });

  // Sticky Header & Scroll-to-Top Button
  const header = document.getElementById('header');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
    scrollTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });

  // Scroll-to-Top Button Click
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Intersection Observer for Section Animations
  const sections = document.querySelectorAll('.section');
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  sections.forEach(section => observer.observe(section));

  // Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }
    // Simulate form submission (backend integration can be added)
    alert(`Thank you, ${name}! Your message has been sent.`);
    contactForm.reset();
  });

  // Typed Text Effect in Hero Section (Revised)
  const typedElement = document.getElementById('typed');
  const phrases = [
    "Expert Appliance Repair",
    "Reliable Sales & Service",
    "Quality You Can Trust"
  ];
  let phraseIndex = 0;
  let letterIndex = 0;
  let isDeleting = false;
  
  function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (!isDeleting) {
      // Typing effect
      if (letterIndex < currentPhrase.length) {
        typedElement.textContent = currentPhrase.substring(0, letterIndex + 1);
        letterIndex++;
        setTimeout(type, 100);
      } else {
        // Pause at end of word
        isDeleting = true;
        setTimeout(type, 1500);
      }
    } else {
      // Deleting effect
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

  // Testimonial Slider
  const testimonials = document.querySelectorAll('.testimonial');
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

  // Dark Mode Toggle
  const toggleDarkModeBtn = document.getElementById('toggle-dark-mode');
  toggleDarkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
      toggleDarkModeBtn.textContent = "☀️";
    } else {
      localStorage.setItem('theme', 'light');
      toggleDarkModeBtn.textContent = "🌙";
    }
  });
  // Load saved theme on page load
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    toggleDarkModeBtn.textContent = "☀️";
  } else {
    toggleDarkModeBtn.textContent = "🌙";
  }
});
