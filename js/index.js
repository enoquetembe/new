// ========================================
// KWELLAA BOLT-INSPIRED INTERACTIVE SCRIPT
// ========================================

// ==========================================
// 1. NAVIGATION & SCROLL EFFECTS
// ==========================================

class NavigationManager {
    constructor() {
        this.nav = document.querySelector('.bolt-nav');
        this.hamburger = document.querySelector('.bolt-hamburger');
        this.navMenu = document.querySelector('.bolt-nav-menu');
        this.lastScroll = 0;
        this.init();
    }

    init() {
        this.setupScrollListener();
        this.setupHamburger();
        this.setupSmoothScroll();
        this.setupMobileMenu();
    }

    setupScrollListener() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    handleScroll() {
        const currentScroll = window.pageYOffset;

        // Add shadow on scroll
        if (currentScroll > 50) {
            this.nav.classList.add('scrolled');
        } else {
            this.nav.classList.remove('scrolled');
        }

        // Hide/show nav on scroll
        if (currentScroll > this.lastScroll && currentScroll > 100) {
            this.nav.style.transform = 'translateY(-100%)';
        } else {
            this.nav.style.transform = 'translateY(0)';
        }

        this.lastScroll = currentScroll;
    }

    setupHamburger() {
        if (!this.hamburger) return;

        this.hamburger.addEventListener('click', () => {
            this.navMenu.classList.toggle('active');
            this.hamburger.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offset = 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu
                    this.navMenu?.classList.remove('active');
                    this.hamburger?.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });
        });
    }

    setupMobileMenu() {
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.nav?.contains(e.target) && this.navMenu?.classList.contains('active')) {
                this.navMenu.classList.remove('active');
                this.hamburger?.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
}

// ==========================================
// 2. ANIMATE ON SCROLL (AOS) SYSTEM
// ==========================================

class ScrollAnimations {
    constructor() {
        this.elements = [];
        this.init();
    }

    init() {
        this.observeElements();
        this.setupObserver();
    }

    observeElements() {
        const selectors = [
            '[data-aos]',
            '.bolt-stat',
            '.bolt-service-card',
            '.bolt-feature-item'
        ];

        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                this.elements.push(el);
            });
        });
    }

    setupObserver() {
        const options = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, options);

        this.elements.forEach(el => observer.observe(el));
    }
}

// ==========================================
// 3. STATISTICS COUNTER ANIMATION
// ==========================================

class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.bolt-stat-number');
        this.animated = new Set();
        this.init();
    }

    init() {
        if (this.counters.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated.has(entry.target)) {
                    this.animateCounter(entry.target);
                    this.animated.add(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target') || element.textContent.replace(/[^0-9]/g, ''));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        };

        updateCounter();
    }
}

// ==========================================
// 4. CARD HOVER EFFECTS
// ==========================================

class CardEffects {
    constructor() {
        this.cards = document.querySelectorAll('.bolt-service-card');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => this.handleMouseEnter(e));
            card.addEventListener('mousemove', (e) => this.handleMouseMove(e));
            card.addEventListener('mouseleave', (e) => this.handleMouseLeave(e));
        });
    }

    handleMouseEnter(e) {
        const card = e.currentTarget;
        card.style.transition = 'none';
    }

    handleMouseMove(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    }

    handleMouseLeave(e) {
        const card = e.currentTarget;
        card.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    }
}

// ==========================================
// 5. PARALLAX EFFECTS
// ==========================================

class ParallaxEffects {
    constructor() {
        this.elements = document.querySelectorAll('.bolt-float-shape');
        this.init();
    }

    init() {
        if (this.elements.length === 0) return;

        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.updateParallax();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    updateParallax() {
        const scrolled = window.pageYOffset;

        this.elements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
}

// ==========================================
// 6. FORM INTERACTIONS
// ==========================================

class FormEnhancements {
    constructor() {
        this.forms = document.querySelectorAll('form');
        this.init();
    }

    init() {
        this.setupFloatingLabels();
        this.setupValidation();
    }

    setupFloatingLabels() {
        document.querySelectorAll('.bolt-input, .bolt-textarea').forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });

            // Check initial state
            if (input.value) {
                input.parentElement.classList.add('focused');
            }
        });
    }

    setupValidation() {
        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                if (!form.checkValidity()) {
                    e.preventDefault();
                    this.showValidationErrors(form);
                }
            });
        });
    }

    showValidationErrors(form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            if (!input.validity.valid) {
                input.classList.add('error');
                this.showErrorMessage(input);
            } else {
                input.classList.remove('error');
            }
        });
    }

    showErrorMessage(input) {
        const existingError = input.parentElement.querySelector('.error-message');
        if (existingError) return;

        const error = document.createElement('span');
        error.className = 'error-message';
        error.textContent = input.validationMessage;
        input.parentElement.appendChild(error);

        setTimeout(() => error.remove(), 3000);
    }
}

// ==========================================
// 7. LOADING ANIMATIONS
// ==========================================

class PageLoader {
    constructor() {
        this.loader = document.querySelector('.page-loader');
        this.init();
    }

    init() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                if (this.loader) {
                    this.loader.classList.add('hidden');
                    setTimeout(() => this.loader.remove(), 500);
                }
                document.body.classList.add('loaded');
            }, 500);
        });
    }
}

// ==========================================
// 8. BUTTON RIPPLE EFFECT
// ==========================================

class RippleEffect {
    constructor() {
        this.buttons = document.querySelectorAll('.bolt-btn-primary, .bolt-btn-secondary');
        this.init();
    }

    init() {
        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => this.createRipple(e));
        });
    }

    createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');

        const ripple = button.querySelector('.ripple');
        if (ripple) ripple.remove();

        button.appendChild(circle);

        setTimeout(() => circle.remove(), 600);
    }
}

// ==========================================
// 9. IMAGE LAZY LOADING
// ==========================================

class LazyLoader {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            });

            this.images.forEach(img => observer.observe(img));
        } else {
            this.images.forEach(img => this.loadImage(img));
        }
    }

    loadImage(img) {
        const src = img.getAttribute('data-src');
        if (!src) return;

        img.src = src;
        img.removeAttribute('data-src');
        img.classList.add('loaded');
    }
}

// ==========================================
// 10. MODAL SYSTEM
// ==========================================

class ModalManager {
    constructor() {
        this.modals = document.querySelectorAll('.bolt-modal');
        this.init();
    }

    init() {
        // Open modal triggers
        document.querySelectorAll('[data-modal-target]').forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = trigger.getAttribute('data-modal-target');
                this.openModal(targetId);
            });
        });

        // Close modal triggers
        document.querySelectorAll('[data-modal-close]').forEach(closer => {
            closer.addEventListener('click', () => this.closeModal());
        });

        // Close on backdrop click
        this.modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.closeModal();
            });
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });
    }

    openModal(id) {
        const modal = document.getElementById(id);
        if (!modal) return;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }
}

// ==========================================
// 11. PERFORMANCE OPTIMIZATIONS
// ==========================================

class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.prefetchLinks();
        this.optimizeImages();
    }

    prefetchLinks() {
        const links = document.querySelectorAll('a[href^="/"]');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                const href = link.getAttribute('href');
                if (href && !document.querySelector(`link[href="${href}"]`)) {
                    const prefetch = document.createElement('link');
                    prefetch.rel = 'prefetch';
                    prefetch.href = href;
                    document.head.appendChild(prefetch);
                }
            }, { once: true });
        });
    }

    optimizeImages() {
        // Add loading="lazy" to images that don't have it
        document.querySelectorAll('img:not([loading])').forEach(img => {
            img.loading = 'lazy';
        });
    }
}

// ==========================================
// 12. INITIALIZATION
// ==========================================

class KwellaaApp {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        // Initialize all components
        new PageLoader();
        new NavigationManager();
        new ScrollAnimations();
        new CounterAnimation();
        new CardEffects();
        new ParallaxEffects();
        new FormEnhancements();
        new RippleEffect();
        new LazyLoader();
        new ModalManager();
        new PerformanceOptimizer();

        // Custom initialization
        this.initCustomFeatures();
    }

    initCustomFeatures() {
        // Add any custom features here
        this.setupBackToTop();
        this.setupThemeToggle();
    }

    setupBackToTop() {
        const backToTop = document.createElement('button');
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = '↑';
        backToTop.setAttribute('aria-label', 'Back to top');
        document.body.appendChild(backToTop);

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    setupThemeToggle() {
        // Future: Add dark mode toggle if needed
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }
}

// ==========================================
// START APPLICATION
// ==========================================

new KwellaaApp();

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { KwellaaApp };
}