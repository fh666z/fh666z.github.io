// ============================================
// Main JavaScript for FrontierHub Website
// ============================================

(function() {
    'use strict';

    // ============================================
    // Navigation
    // ============================================

    const navbar = document.querySelector('.navbar');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');
            mobileMenuToggle.setAttribute('aria-expanded', isExpanded);

            const spans = mobileMenuToggle.querySelectorAll('span');
            if (isExpanded) {
                spans[0].style.transform = 'rotate(45deg) translateY(8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ============================================
    // Animate On Scroll (AOS)
    // ============================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });

    // ============================================
    // Animated Statistics Counter
    // ============================================

    function animateCounter(element, target, duration = 2000) {
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                if (!entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    animateCounter(entry.target, target);
                }
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // ============================================
    // Contact Form Validation
    // ============================================

    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const formSuccess = document.querySelector('.form-success');

        function validateField(field, validator) {
            const errorMessage = field.parentElement.querySelector('.error-message');
            const isValid = validator(field.value);

            if (field.value && !isValid) {
                field.style.borderColor = '#ef4444';
                errorMessage.textContent = getErrorMessage(field.name);
                return false;
            } else {
                field.style.borderColor = '';
                errorMessage.textContent = '';
                return true;
            }
        }

        function getErrorMessage(fieldName) {
            const messages = {
                name: 'Name must be at least 2 characters',
                email: 'Please enter a valid email address',
                message: 'Message must be at least 10 characters'
            };
            return messages[fieldName] || 'Invalid input';
        }

        const validators = {
            name: (value) => value.trim().length >= 2,
            email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: (value) => value.trim().length >= 10
        };

        nameInput.addEventListener('blur', () => validateField(nameInput, validators.name));
        emailInput.addEventListener('blur', () => validateField(emailInput, validators.email));
        messageInput.addEventListener('blur', () => validateField(messageInput, validators.message));

        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const isNameValid = validateField(nameInput, validators.name);
            const isEmailValid = validateField(emailInput, validators.email);
            const isMessageValid = validateField(messageInput, validators.message);

            if (!isNameValid || !isEmailValid || !isMessageValid) {
                if (!isNameValid) nameInput.focus();
                else if (!isEmailValid) emailInput.focus();
                else if (!isMessageValid) messageInput.focus();
                return;
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            try {
                const response = await fetch('https://formsubmit.co/ajax/info@frontierhub.tech', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify({
                        name: nameInput.value,
                        email: emailInput.value,
                        message: messageInput.value,
                        _subject: 'New message from FrontierHub website',
                        _captcha: 'false',
                        _template: 'table'
                    })
                });

                if (response.ok) {
                    formSuccess.textContent = 'Thank you! Your message has been sent successfully.';
                    formSuccess.classList.add('show');
                    contactForm.reset();
                    setTimeout(() => formSuccess.classList.remove('show'), 5000);
                } else {
                    formSuccess.textContent = 'Something went wrong. Please try emailing us directly at info@frontierhub.tech.';
                    formSuccess.classList.add('show');
                    setTimeout(() => formSuccess.classList.remove('show'), 7000);
                }
            } catch {
                formSuccess.textContent = 'Something went wrong. Please try emailing us directly at info@frontierhub.tech.';
                formSuccess.classList.add('show');
                setTimeout(() => formSuccess.classList.remove('show'), 7000);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }

    // ============================================
    // Hero Parallax
    // ============================================

    const heroSection = document.querySelector('.hero');
    let parallaxTicking = false;

    function handleHeroParallax() {
        if (!heroSection) {
            parallaxTicking = false;
            return;
        }

        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
            heroSection.style.setProperty('--hero-parallax-y', `${scrolled * 0.35}px`);
        }

        parallaxTicking = false;
    }

    function requestHeroParallax() {
        if (!parallaxTicking) {
            window.requestAnimationFrame(handleHeroParallax);
            parallaxTicking = true;
        }
    }

    window.addEventListener('scroll', requestHeroParallax, { passive: true });
    handleHeroParallax();

    // ============================================
    // Hero Background Video (respect reduced motion)
    // ============================================

    const heroVideo = document.querySelector('.hero-video');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    function syncHeroVideoPlayback() {
        if (!heroVideo) return;
        if (reducedMotionQuery.matches) {
            heroVideo.pause();
        } else {
            heroVideo.play().catch(() => {});
        }
    }

    reducedMotionQuery.addEventListener('change', syncHeroVideoPlayback);
    syncHeroVideoPlayback();

    // ============================================
    // Active Navigation Link Highlighting
    // ============================================

    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink();

    // ============================================
    // Lazy Loading
    // ============================================

    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }

    // ============================================
    // Console Welcome
    // ============================================

    console.log('%cFrontierHub', 'font-size: 24px; font-weight: 300; color: #2997FF; letter-spacing: 0.1em;');
    console.log('%cFrontier Software Technologies', 'font-size: 12px; color: #86868B; letter-spacing: 0.2em;');

})();
