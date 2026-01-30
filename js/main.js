// ============================================
// Main JavaScript for NovaRegis Website
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

    // Sticky navbar on scroll
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);

    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');
            mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
            
            // Animate hamburger icon
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

    // Close mobile menu when clicking on a link
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

    // Smooth scroll for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
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
                // Optional: Unobserve after animation to improve performance
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });

    // ============================================
    // Animated Statistics Counter
    // ============================================

    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16); // 60fps
        let current = start;

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

        // Real-time validation
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

        // Validators
        const validators = {
            name: (value) => value.trim().length >= 2,
            email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: (value) => value.trim().length >= 10
        };

        // Add event listeners for real-time validation
        nameInput.addEventListener('blur', () => validateField(nameInput, validators.name));
        emailInput.addEventListener('blur', () => validateField(emailInput, validators.email));
        messageInput.addEventListener('blur', () => validateField(messageInput, validators.message));

        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validate all fields
            const isNameValid = validateField(nameInput, validators.name);
            const isEmailValid = validateField(emailInput, validators.email);
            const isMessageValid = validateField(messageInput, validators.message);

            if (isNameValid && isEmailValid && isMessageValid) {
                // Simulate form submission (replace with actual form handling)
                formSuccess.textContent = 'Thank you! Your message has been sent successfully.';
                formSuccess.classList.add('show');
                
                // Reset form
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.classList.remove('show');
                }, 5000);

                // In a real implementation, you would send the data to a server:
                // fetch('/api/contact', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify({
                //         name: nameInput.value,
                //         email: emailInput.value,
                //         message: messageInput.value
                //     })
                // })
                // .then(response => response.json())
                // .then(data => {
                //     formSuccess.textContent = 'Thank you! Your message has been sent.';
                //     formSuccess.classList.add('show');
                //     contactForm.reset();
                // })
                // .catch(error => {
                //     formSuccess.textContent = 'Sorry, there was an error. Please try again.';
                //     formSuccess.style.background = 'rgba(239, 68, 68, 0.2)';
                //     formSuccess.style.borderColor = '#ef4444';
                //     formSuccess.style.color = '#ef4444';
                //     formSuccess.classList.add('show');
                // });
            } else {
                // Focus on first invalid field
                if (!isNameValid) nameInput.focus();
                else if (!isEmailValid) emailInput.focus();
                else if (!isMessageValid) messageInput.focus();
            }
        });
    }

    // ============================================
    // Parallax Effect (Subtle)
    // ============================================

    function handleParallax() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground && scrolled < window.innerHeight) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }

    window.addEventListener('scroll', handleParallax);

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
    updateActiveNavLink(); // Initial call

    // ============================================
    // Performance Optimization: Lazy Loading
    // ============================================

    // Add loading="lazy" to images if any are added in the future
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }

    // ============================================
    // Console Welcome Message
    // ============================================

    console.log('%cNovaRegis', 'font-size: 24px; font-weight: bold; color: #6366f1;');
    console.log('%cAI and Software Service Agency', 'font-size: 14px; color: #06b6d4;');
    console.log('%cInterested in working together? Visit our contact section!', 'font-size: 12px; color: #a1a1aa;');

})();
