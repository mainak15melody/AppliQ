document.addEventListener('DOMContentLoaded', () => {
    /* ----- Element Selectors ----- */
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const toggleDarkModeBtn = document.getElementById('toggle-dark-mode');
    const toggleLanguageBtn = document.getElementById('toggle-language');
    const typedElement = document.getElementById('typed');
    const testimonials = document.querySelectorAll('.testimonial');
    const sections = document.querySelectorAll('.section');
    const prevTestimonial = document.getElementById('prevTestimonial');
    const nextTestimonial = document.getElementById('nextTestimonial');
    const indicators = document.querySelectorAll('.indicator');
    const contactForm = document.getElementById('contactForm');
  
    /* ----- Mobile Menu Toggle with Accessibility ----- */
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', !isExpanded);
    });
  
    /* ----- Smooth Scrolling with Performance Optimization ----- */
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
  
    /* ----- Sticky Header & Scroll-to-Top Button (Debounced) ----- */
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        header.classList.toggle('scrolled', window.scrollY > 50);
        scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
      }, 100); // Debounce delay for performance
    });
    
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  
    /* ----- Intersection Observer for Section Reveal with Performance Optimization ----- */
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px 50px 0px' });
    
    sections.forEach(section => observer.observe(section));
  
    /* ----- Typed Text Effect with Localization ----- */
    const translations = {
      en: {
        phrases: [
          "Expert Appliance Repair in Kolkata",
          "Reliable Sales & Service",
          "Quality You Can Trust"
        ]
      },
      bn: {
        phrases: [
          "কলকাতায় বিশেষজ্ঞ যন্ত্রপাতি মেরামত",
          "নির্ভরযোগ্য বিক্রয় ও সেবা",
          "নির্ভরযোগ্য গুণমান"
        ]
      }
    };
  
    let currentLang = 'en';
    let phraseIndex = 0, letterIndex = 0, isDeleting = false;
  
    function type() {
      const phrases = translations[currentLang].phrases;
      const currentPhrase = phrases[phraseIndex];
      if (!isDeleting) {
        if (letterIndex < currentPhrase.length) {
          typedElement.textContent = currentPhrase.substring(0, letterIndex + 1);
          letterIndex++;
          setTimeout(type, 100);
        } else {
          isDeleting = true;
          setTimeout(type, 1500);
        }
      } else {
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
  
    /* ----- Language Toggle with Dynamic Content Update ----- */
    toggleLanguageBtn.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'bn' : 'en';
      document.documentElement.lang = currentLang;
      toggleLanguageBtn.textContent = currentLang === 'en' ? 'English | বাংলা' : 'English | বাংলা';
      
      // Update navigation links, headings, and other text
      const navLinks = document.querySelectorAll('.nav-links li a');
      const translationsNav = {
        en: ['Home', 'About', 'Services', 'Testimonials', 'Contact', 'Blog', 'FAQ'],
        bn: ['হোম', 'আমাদের সম্পর্কে', 'সেবা', 'প্রশংসা', 'যোগাযোগ', 'ব্লগ', 'প্রশ্নোত্তর']
      };
      navLinks.forEach((link, i) => {
        link.textContent = translationsNav[currentLang][i];
      });
  
      // Update section headers and content
      const headers = document.querySelectorAll('.section-header h2');
      const headerTranslations = {
        en: {
          about: 'About Us',
          services: 'Our Services',
          testimonials: 'Our Customers Love Us',
          contact: 'Contact Us',
          blog: 'Latest Blog Posts'
        },
        bn: {
          about: 'আমাদের সম্পর্কে',
          services: 'আমাদের সেবা',
          testimonials: 'আমাদের গ্রাহকরা আমাদের ভালোবাসেন',
          contact: 'যোগাযোগ করুন',
          blog: 'সাম্প্রতিক ব্লগ পোস্ট'
        }
      };
      headers.forEach(header => {
        const sectionId = header.closest('.section').id;
        header.textContent = headerTranslations[currentLang][sectionId];
      });
  
      // Update feature items, service descriptions, and other content
      const features = document.querySelectorAll('.feature-item p');
      const featuresTranslations = {
        en: {
          expert: 'Quick diagnosis and professional repairs for Kolkata homes',
          warranty: 'All repairs come with a 90-day warranty, guaranteed',
          sameDay: 'Available for emergencies across Kolkata',
          prices: 'Competitive and transparent pricing in Kolkata'
        },
        bn: {
          expert: 'কলকাতার বাড়িঘরের জন্য দ্রুত নिदান এবং পেশাদার মেরামত',
          warranty: 'সব মেরামতের জন্য ৯০ দিনের ওয়ারেন্টি, গ্যারান্টিযুক্ত',
          sameDay: 'কলকাতার মধ্যে জরুরি পরিস্থিতির জন্য উপলব্ধ',
          prices: 'কলকাতায় প্রতিযোগিতামূলক এবং স্বচ্ছ মূল্য নির্ধারণ'
        }
      };
      features.forEach((feature, i) => {
        const keys = ['expert', 'warranty', 'sameDay', 'prices'];
        feature.textContent = featuresTranslations[currentLang][keys[i]];
      });
  
      // Update service items and other text (simplified for brevity)
      const services = document.querySelectorAll('.service-item p');
      const servicesTranslations = {
        en: {
          refrigerator: 'Efficient repairs for all refrigerator models with precision and care in Kolkata. Our certified technicians diagnose and fix issues like cooling problems, leaks, and noise, ensuring your appliance runs smoothly.',
          washingMachine: 'Get your washing machine back in top shape—fast and reliable in Kolkata. We handle issues like leaks, motor failures, and strange noises, restoring your machine to peak performance.',
          ac: 'Expert repairs to keep you cool, even on Kolkata’s hottest days. We fix cooling issues, compressor problems, and more, ensuring your AC operates efficiently year-round.',
          microwave: 'Swift and accurate maintenance for your kitchen essentials in Kolkata. We handle heating issues, door problems, and more, keeping your microwave in top condition.',
          tv: 'Modern, seamless setups for an immersive entertainment experience in Kolkata. We install and troubleshoot TVs, sound systems, and home theaters for optimal performance.',
          newAppliances: 'Quality home appliances at competitive prices with installation services in Kolkata. We offer a wide range of products and expert setup for your convenience.'
        },
        bn: {
          refrigerator: 'কলকাতায় সব রেফ্রিজারেটর মডেলের জন্য দক্ষ মেরামত, সঠিকতা এবং যত্নের সাথে। আমাদের সার্টিফাইড টেকনিশিয়ানরা শীতলতা সমস্যা, লিকেজ, এবং শব্দের মতো সমস্যা নির্ণয় এবং সমাধান করে, আপনার যন্ত্রপাতি সুষ্ঠুভাবে চলতে নিশ্চিত করে।',
          washingMachine: 'কলকাতায় আপনার ওয়াশিং মেশিনকে শীর্ষ অবস্থায় ফিরিয়ে আনুন—দ্রুত এবং নির্ভরযোগ্য। আমরা লিকেজ, মোটর ব্যর্থতা, এবং অদ্ভুত শব্দের মতো সমস্যা পরিচালনা করি, আপনার মেশিনকে শীর্ষ পারফরম্যান্সে ফিরিয়ে আনি।',
          ac: 'কলকাতার গরম দিনগুলোতে আপনাকে শীতল রাখার জন্য বিশেষজ্ঞ মেরামত। আমরা শীতলতা সমস্যা, কম্প্রেসর সমস্যা, এবং আরও অনেক কিছু সমাধান করি, আপনার AC বছরের মধ্যে দক্ষতার সাথে চলতে নিশ্চিত করে।',
          microwave: 'কলকাতায় আপনার রান্নাঘরের অত্যাবশ্যকীয় জিনিসের জন্য দ্রুত এবং সঠিক রক্ষণাবেক্ষণ। আমরা তাপ সমস্যা, দরজার সমস্যা, এবং আরও অনেক কিছু পরিচালনা করি, আপনার মাইক্রোওভেন শীর্ষ অবস্থায় রাখি।',
          tv: 'কলকাতায় একটি আচ্ছন্ন বিনোদন অভিজ্ঞতার জন্য আধুনিক, সুষ্ঠু সেটআপ। আমরা টিভি, সাউন্ড সিস্টেম, এবং হোম থিয়েটার ইনস্টল এবং সমস্যা সমাধান করি শীর্ষ পারফরম্যান্সের জন্য।',
          newAppliances: 'কলকাতায় প্রতিযোগিতামূলক মূল্যে গুণমানের বাড়ির যন্ত্রপাতি সাথে ইনস্টলেশন সেবা। আমরা বিস্তৃত পণ্যের পরিসর এবং আপনার সুবিধার জন্য বিশেষজ্ঞ সেটআপ অফার করি।'
        }
      };
      services.forEach((service, i) => {
        const keys = ['refrigerator', 'washingMachine', 'ac', 'microwave', 'tv', 'newAppliances'];
        service.textContent = servicesTranslations[currentLang][keys[i]];
      });
  
      // Update testimonials and other content as needed
      const testimonialsText = document.querySelectorAll('.testimonial p');
      const testimonialTranslations = {
        en: [
          "Great service and quick repair! The technician arrived on time and fixed my refrigerator in under an hour. Highly recommended for anyone in Kolkata seeking quality service.",
          "Professional, reliable, and friendly. My washing machine was making strange noises, and they fixed it completely. My appliance works like new again in Kolkata!",
          "I was impressed with their attention to detail and commitment to customer care. They took the time to explain the issue with my AC and provided maintenance tips in Kolkata.",
          "Fantastic service for my microwave repair! Quick, affordable, and the technician was very knowledgeable. Highly recommend AppliQ in Kolkata."
        ],
        bn: [
          "দুর্দান্ত সেবা এবং দ্রুত মেরামত! টেকনিশিয়ন সময়মতো এসে আমার রেফ্রিজারেটর এক ঘন্টার মধ্যে মেরামত করে দিয়েছে। কলকাতায় গুণমান সেবা খুঁজছেন যারা, এটি সুপারিশযোগ্য।",
          "পেশাদার, নির্ভরযোগ্য, এবং বন্ধুত্বপূর্ণ। আমার ওয়াশিং মেশিন অদ্ভুত শব্দ করছিল, এবং তারা এটি সম্পূর্ণভাবে মেরামত করে দিয়েছে। কলকাতায় আমার যন্ত্রপাতি আবার নতুনের মতো কাজ করছে!",
          "তাদের বিস্তারিত দিকে মনোযোগ এবং গ্রাহক সেবার প্রতি প্রতিশ্রুতি আমাকে প্রভাবিত করেছে। তারা আমার AC-এর সমস্যা ব্যাখ্যা করতে সময় নিয়েছে এবং কলকাতায় রক্ষণাবেক্ষণ টিপস দিয়েছে।",
          "আমার মাইক্রোওভেন মেরামতের জন্য দুর্দান্ত সেবা! দ্রুত, সাশ্রয়ী, এবং টেকনিশিয়ন খুব জ্ঞানবান ছিল। কলকাতায় AppliQ-কে আমি সুপারিশ করি।"
        ]
      };
      testimonialsText.forEach((testimonial, i) => {
        testimonial.textContent = testimonialTranslations[currentLang][i];
      });
  
      // Reinitialize typed effect with new language
      phraseIndex = 0;
      letterIndex = 0;
      isDeleting = false;
      type();
    });
  
    /* ----- Testimonial Slider with Manual Controls and Accessibility ----- */
    let testimonialIndex = 0;
  
    function showTestimonial(index) {
      testimonials.forEach((testimonial, i) => {
        testimonial.classList.toggle('active', i === index);
      });
      indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
      });
    }
  
    // Auto-slide every 5 seconds with pause on hover
    let slideInterval = setInterval(() => {
      testimonialIndex = (testimonialIndex + 1) % testimonials.length;
      showTestimonial(testimonialIndex);
    }, 5000);
  
    const testimonialSlider = document.getElementById('testimonialSlider');
    testimonialSlider.addEventListener('mouseover', () => clearInterval(slideInterval));
    testimonialSlider.addEventListener('mouseout', () => {
      slideInterval = setInterval(() => {
        testimonialIndex = (testimonialIndex + 1) % testimonials.length;
        showTestimonial(testimonialIndex);
      }, 5000);
    });
  
    // Manual controls
    prevTestimonial.addEventListener('click', () => {
      testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
      showTestimonial(testimonialIndex);
    });
  
    nextTestimonial.addEventListener('click', () => {
      testimonialIndex = (testimonialIndex + 1) % testimonials.length;
      showTestimonial(testimonialIndex);
    });
  
    indicators.forEach((indicator, i) => {
      indicator.addEventListener('click', () => {
        testimonialIndex = i;
        showTestimonial(testimonialIndex);
      });
    });
  
    /* ----- Dark Mode Toggle with Persistence and Accessibility ----- */
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
  
    /* ----- Contact Form Validation and AJAX Submission ----- */
    if (contactForm) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value.trim();
  
        if (!name || !email || !service || !message) {
          alert(currentLang === 'en' ? 'Please fill in all required fields.' : 'দয়া করে সমস্ত প্রয়োজনীয় ক্ষেত্র পূরণ করুন।');
          return;
        }
  
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          alert(currentLang === 'en' ? 'Please enter a valid email address.' : 'দয়া করে একটি বৈধ ইমেল ঠিকানা প্রবেশ করুন।');
          return;
        }
  
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = currentLang === 'en' ? 'Sending...' : 'পাঠানো হচ্ছে...';
  
        try {
          // Example AJAX submission (replace with your backend endpoint)
          const response = await fetch('https://your-backend-endpoint.com/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({ name, email, phone, service, message })
          });
  
          if (!response.ok) throw new Error('Network response was not ok');
  
          const result = await response.json();
          alert(currentLang === 'en' ? 'Thank you for your inquiry! We’ll get back to you soon at your Kolkata location.' : 'আপনার জিজ্ঞাসার জন্য ধন্যবাদ! আমরা শীঘ্রই আপনার কলকাতার অবস্থানে যোগাযোগ করব।');
          contactForm.reset();
        } catch (error) {
          alert(currentLang === 'en' ? 'Sorry, there was an error submitting your form. Please try again later.' : 'দুঃখিত, আপনার ফর্ম জমা দেওয়ার সময় একটি ত্রুটি হয়েছে। পরে আবার চেষ্টা করুন।');
        } finally {
          submitButton.disabled = false;
          submitButton.textContent = currentLang === 'en' ? 'Send Message' : 'বার্তা পাঠান';
        }
      });
    }
  
    /* ----- Performance Optimization: Lazy Load Images Dynamically ----- */
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src; // Fallback for already loaded images
          observer.unobserve(img);
        }
      });
    }, { threshold: 0.1, rootMargin: '50px 0px' });
  
    images.forEach(img => {
      if (!img.complete) {
        img.dataset.src = img.src;
        img.src = ''; // Clear source to trigger lazy loading
        imageObserver.observe(img);
      }
    });
  
    /* ----- Trust Signals: Load Dynamic Reviews (Optional) ----- */
    function fetchReviews() {
      // Example: Fetch reviews from an API (replace with your endpoint)
      fetch('https://your-api-endpoint.com/reviews')
        .then(response => response.json())
        .then(data => {
          const testimonialSlider = document.getElementById('testimonialSlider');
          data.slice(0, 4).forEach(review => {
            const testimonial = document.createElement('div');
            testimonial.className = 'testimonial';
            testimonial.innerHTML = `
              <div class="testimonial-content">
                <div class="testimonial-rating">
                  ${'★'.repeat(review.rating || 5)}
                </div>
                <p>${review.reviewBody}</p>
                <div class="testimonial-author">
                  <img src="${review.authorImage || 'default-customer.jpg'}" alt="${review.author}" class="author-image" loading="lazy">
                  <div class="author-info">
                    <h3>${review.author}</h3>
                    <p>${review.location || 'Kolkata'}</p>
                  </div>
                </div>
              </div>
            `;
            testimonialSlider.appendChild(testimonial);
          });
          // Reinitialize testimonial slider if new content is added
          initTestimonialSlider();
        })
        .catch(error => console.error('Error fetching reviews:', error));
    }
  
    function initTestimonialSlider() {
      // Reinitialize testimonials array and controls
      const newTestimonials = document.querySelectorAll('.testimonial');
      testimonials.length = 0;
      newTestimonials.forEach(testimonial => testimonials.push(testimonial));
      testimonialIndex = 0;
      showTestimonial(testimonialIndex);
    }
  
    // Call fetchReviews on page load (optional, enable if you have a backend)
    // fetchReviews();
  
    /* ----- SEO Optimization: Dynamic Meta Tags Update on Language Change ----- */
    function updateMetaTags() {
      const metaDescription = document.querySelector('meta[name="description"]');
      const ogDescription = document.querySelector('meta[property="og:description"]');
      const twitterDescription = document.querySelector('meta[name="twitter:description"]');
      const metaKeywords = document.querySelector('meta[name="keywords"]');
  
      if (currentLang === 'en') {
        metaDescription.content = "AppliQ - Top-rated home appliance repair and sales in Kolkata. Expert solutions for refrigerators, washing machines, ACs, and more with same-day service.";
        ogDescription.content = "Trust AppliQ for expert appliance repair and sales in Kolkata. Fast, reliable, and affordable services for all your home needs.";
        twitterDescription.content = "Trust AppliQ for expert appliance repair and sales in Kolkata. Fast, reliable, and affordable services for all your home needs.";
        metaKeywords.content = "appliance repair Kolkata, washing machine repair Kolkata, AC repair Kolkata, refrigerator repair Kolkata, best appliance service Kolkata, same-day appliance repair Kolkata";
      } else {
        metaDescription.content = "AppliQ - কলকাতায় শীর্ষ-রেটেড হোম যন্ত্রপাতি মেরামত এবং বিক্রয়। রেফ্রিজারেটর, ওয়াশিং মেশিন, AC, এবং আরও অনেক কিছুর জন্য বিশেষজ্ঞ সমাধান সম-দিন সেবার সাথে।";
        ogDescription.content = "কলকাতায় বিশেষজ্ঞ যন্ত্রপাতি মেরামত এবং বিক্রয়ের জন্য AppliQ-এ বিশ্বাস করুন। দ্রুত, নির্ভরযোগ্য, এবং সাশ্রয়ী সেবা আপনার সমস্ত বাড়ির প্রয়োজনের জন্য।";
        twitterDescription.content = "কলকাতায় বিশেষজ্ঞ যন্ত্রপাতি মেরামত এবং বিক্রয়ের জন্য AppliQ-এ বিশ্বাস করুন। দ্রুত, নির্ভরযোগ্য, এবং সাশ্রয়ী সেবা আপনার সমস্ত বাড়ির প্রয়োজনের জন্য।";
        metaKeywords.content = "যন্ত্রপাতি মেরামত কলকাতা, ওয়াশিং মেশিন মেরামত কলকাতা, AC মেরামত কলকাতা, রেফ্রিজারেটর মেরামত কলকাতা, সেরা যন্ত্রপাতি সেবা কলকাতা, সম-দিন যন্ত্রপাতি মেরামত কলকাতা";
      }
    }
  
    toggleLanguageBtn.addEventListener('click', () => {
      // ... (existing language toggle code from above) ...
      updateMetaTags();
    });
  
    // Initialize meta tags
    updateMetaTags();
  });
