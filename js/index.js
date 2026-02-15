// ========================================
// KWELLAA MODERN INTERACTIVE SCRIPT
// ========================================

// ==========================================
// 1. NAVIGATION
// ==========================================

class Navigation {
    constructor() {
        this.nav = document.querySelector('.modern-nav');
        this.toggle = document.getElementById('navToggle');
        this.menu = document.getElementById('navMenu');
        this.links = document.querySelectorAll('.nav-link');
        this.lastScroll = 0;
        this.init();
    }

    init() {
        this.setupScrollHandler();
        this.setupToggle();
        this.setupSmoothScroll();
        this.setupActiveLink();
    }

    setupScrollHandler() {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Add scrolled class
            if (currentScroll > 50) {
                this.nav.classList.add('scrolled');
            } else {
                this.nav.classList.remove('scrolled');
            }

            this.lastScroll = currentScroll;
        });
    }

    setupToggle() {
        if (!this.toggle) return;

        this.toggle.addEventListener('click', () => {
            this.menu.classList.toggle('active');
            this.toggle.classList.toggle('active');
            document.body.style.overflow = this.menu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.nav.contains(e.target) && this.menu.classList.contains('active')) {
                this.menu.classList.remove('active');
                this.toggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    setupSmoothScroll() {
        this.links.forEach(link => {
            if (link.getAttribute('href')?.startsWith('#')) {
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href');
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
                        this.menu.classList.remove('active');
                        this.toggle?.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                });
            }
        });
    }

    setupActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            const scrollPos = window.pageYOffset + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    this.links.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }
}

// ==========================================
// 2. COUNTDOWN TIMER
// ==========================================

class CountdownTimer {
    constructor() {
        // Calculate launch date: 6 years ago from February 15, 2026
        const launchDate = new Date('2019-02-13T10:02:53Z');
        const now = new Date();
        this.targetDate = new Date(launchDate.getTime() + (now - launchDate));
        
        this.elements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };
        
        this.init();
    }

    init() {
        if (!this.elements.days) return;
        this.updateCountdown();
        setInterval(() => this.updateCountdown(), 1000);
    }

    updateCountdown() {
        const now = new Date().getTime();
        const distance = now - this.targetDate;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (this.elements.days) this.elements.days.textContent = String(days).padStart(2, '0');
        if (this.elements.hours) this.elements.hours.textContent = String(hours).padStart(2, '0');
        if (this.elements.minutes) this.elements.minutes.textContent = String(minutes).padStart(2, '0');
        if (this.elements.seconds) this.elements.seconds.textContent = String(seconds).padStart(2, '0');
    }
}

// ==========================================
// 3. STATS COUNTER
// ==========================================

class StatsCounter {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
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
        const text = element.textContent;
        const target = parseInt(text.replace(/[^0-9]/g, ''));
        const suffix = text.replace(/[0-9]/g, '');
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                const value = Math.floor(current);
                element.textContent = value + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = text;
            }
        };

        updateCounter();
    }
}

// ==========================================
// 4. TABS FUNCTIONALITY
// ==========================================

class TabsManager {
    constructor() {
        this.tabButtons = document.querySelectorAll('.tab-button');
        this.tabContents = document.querySelectorAll('.tab-content');
        
        // How To tabs
        this.howToTabButtons = document.querySelectorAll('.how-to-tab-button');
        this.howToTabContents = document.querySelectorAll('.how-to-content');
        
        this.init();
    }

    init() {
        // Services tabs
        if (this.tabButtons.length > 0) {
            this.tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const targetTab = button.getAttribute('data-tab');
                    this.switchTab(targetTab, button);
                });
            });
        }
        
        // How To tabs
        if (this.howToTabButtons.length > 0) {
            this.howToTabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const targetTab = button.getAttribute('data-howtab');
                    this.switchHowToTab(targetTab, button);
                });
            });
        }
    }

    switchTab(targetId, button) {
        // Remove active from all buttons and contents
        this.tabButtons.forEach(btn => btn.classList.remove('active'));
        this.tabContents.forEach(content => content.classList.remove('active'));

        // Add active to clicked button and target content
        button.classList.add('active');
        const targetContent = document.getElementById(`tab-${targetId}`);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    }
    
    switchHowToTab(targetId, button) {
        // Remove active from all how-to buttons and contents
        this.howToTabButtons.forEach(btn => btn.classList.remove('active'));
        this.howToTabContents.forEach(content => content.classList.remove('active'));

        // Add active to clicked button and target content
        button.classList.add('active');
        const targetContent = document.getElementById(`howtab-${targetId}`);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    }
}

// ==========================================
// 5. SCROLL ANIMATIONS (AOS)
// ==========================================

class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('[data-aos]');
        this.init();
    }

    init() {
        if (this.elements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        this.elements.forEach(el => observer.observe(el));
    }
}

// ==========================================
// 6. MODAL FUNCTIONALITY
// ==========================================

class ModalManager {
    constructor() {
        this.modal = document.getElementById('contactModal');
        this.openBtn = document.getElementById('contactBtn');
        this.closeBtn = document.getElementById('closeModal');
        this.form = document.querySelector('.contact-form');
        this.init();
    }

    init() {
        if (!this.modal) return;

        // Open modal
        if (this.openBtn) {
            this.openBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openModal();
            });
        }

        // Close modal
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.closeModal());
        }

        // Close on backdrop click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });

        // Form submission
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit();
            });
        }
    }

    openModal() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    handleFormSubmit() {
        // Show success message
        alert('Mensagem enviada com sucesso! Entraremos em contacto em breve.');
        this.closeModal();
        this.form.reset();
    }
}

// ==========================================
// 7. DROPDOWN MENUS
// ==========================================

class DropdownManager {
    constructor() {
        this.dropdowns = document.querySelectorAll('.nav-dropdown');
        this.init();
    }

    init() {
        // For mobile - toggle on click
        if (window.innerWidth <= 768) {
            this.dropdowns.forEach(dropdown => {
                const link = dropdown.querySelector('.nav-link');
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                });
            });
        }
    }
}

// ==========================================
// 8. LAZY LOADING
// ==========================================

class LazyLoader {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.init();
    }

    init() {
        if (this.images.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        this.images.forEach(img => observer.observe(img));
    }
}

// ==========================================
// 9. BUTTON RIPPLE EFFECT
// ==========================================

class RippleEffect {
    constructor() {
        this.buttons = document.querySelectorAll('.btn-modern');
        this.init();
    }

    init() {
        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRipple(e, button);
            });
        });
    }

    createRipple(event, button) {
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

        // Add ripple CSS if not exists
        if (!document.querySelector('#ripple-style')) {
            const style = document.createElement('style');
            style.id = 'ripple-style';
            style.textContent = `
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    transform: scale(0);
                    animation: ripple-animation 0.6s ease-out;
                    pointer-events: none;
                }
                @keyframes ripple-animation {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        setTimeout(() => circle.remove(), 600);
    }
}

// ==========================================
// 10. BACK TO TOP BUTTON
// ==========================================

class BackToTop {
    constructor() {
        this.createButton();
        this.setupListeners();
    }

    createButton() {
        this.button = document.createElement('button');
        this.button.className = 'back-to-top';
        this.button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        this.button.setAttribute('aria-label', 'Voltar ao topo');
        document.body.appendChild(this.button);

        // Add CSS
        if (!document.querySelector('#back-to-top-style')) {
            const style = document.createElement('style');
            style.id = 'back-to-top-style';
            style.textContent = `
                .back-to-top {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    width: 50px;
                    height: 50px;
                    background: var(--primary);
                    color: white;
                    border: none;
                    border-radius: 50%;
                    cursor: pointer;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 4px 12px rgba(237, 28, 36, 0.4);
                    z-index: 999;
                }
                .back-to-top.visible {
                    opacity: 1;
                    visibility: visible;
                }
                .back-to-top:hover {
                    background: var(--primary-dark);
                    transform: translateY(-4px);
                    box-shadow: 0 8px 20px rgba(237, 28, 36, 0.5);
                }
            `;
            document.head.appendChild(style);
        }
    }

    setupListeners() {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                this.button.classList.add('visible');
            } else {
                this.button.classList.remove('visible');
            }
        });

        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ==========================================
// 11. PRELOADER
// ==========================================

class Preloader {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
        });
    }
}

// ==========================================
// 12. MAIN APP INITIALIZATION
// ==========================================

class KwellaaApp {
    constructor() {
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        // Initialize all components
        new Navigation();
        new CountdownTimer();
        new StatsCounter();
        new TabsManager();
        new ScrollAnimations();
        new ModalManager();
        new DropdownManager();
        new LazyLoader();
        new RippleEffect();
        new BackToTop();
        new Preloader();

        console.log('✅ Kwellaa App Initialized');
    }
}

// ==========================================
// START APPLICATION
// ==========================================

new KwellaaApp();