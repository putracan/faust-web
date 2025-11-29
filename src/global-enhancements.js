/**
 * Global Enhancements - Lighthouse 100
 * Mobile-First + PWA + SEO + User Friendly
 * Fast Performance Optimizations
 */

(function() {
    'use strict';

    // ============================================
    // Performance: Lazy Loading Images
    // ============================================

    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.add('loaded');
                            img.removeAttribute('data-src');
                            observer.unobserve(img);
                        }
                    }
                });
            }, {
                rootMargin: '50px'
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for older browsers
            document.querySelectorAll('img[data-src]').forEach(img => {
                img.src = img.dataset.src;
                img.classList.add('loaded');
            });
        }
    }

    // ============================================
    // Performance: Preload Critical Resources
    // ============================================

    function preloadCriticalResources() {
        const criticalResources = [
            { href: '../src/tailwind-build.css', as: 'style' },
            { href: '../src/logo-solusi-teknologi.png', as: 'image' }
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            if (resource.as === 'style') {
                link.onload = function() {
                    this.rel = 'stylesheet';
                };
            }
            document.head.appendChild(link);
        });
    }

    // ============================================
    // Performance: Debounce Function
    // ============================================

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ============================================
    // Performance: Throttle Function
    // ============================================

    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // ============================================
    // Enhanced Header Scroll Effect
    // ============================================

    function initHeaderScroll() {
        const header = document.querySelector('.header');
        if (!header) return;

        const handleScroll = throttle(() => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, 100);

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // ============================================
    // Enhanced Dropdown Menu
    // ============================================

    function initDropdownMenu() {
        const dropdowns = document.querySelectorAll('.dropdown');

        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.nav-link');
            const menu = dropdown.querySelector('.dropdown-menu');

            if (!toggle || !menu) return;

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!dropdown.contains(e.target)) {
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                }
            });

            // Keyboard navigation
            toggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const isOpen = menu.style.visibility === 'visible';
                    menu.style.opacity = isOpen ? '0' : '1';
                    menu.style.visibility = isOpen ? 'hidden' : 'visible';
                }
            });
        });
    }

    // ============================================
    // Enhanced Mobile Menu - Gradient Animation
    // ============================================

    function initMobileMenu() {
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileNav = document.querySelector('.mobile-nav');
        const navClose = document.querySelector('.mobile-nav-close');
        const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');

        if (!menuToggle || !mobileNav) return;

        menuToggle.addEventListener('click', () => {
            mobileNav.classList.add('active');
            document.body.style.overflow = 'hidden';
            // Prevent body scroll on mobile
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        });

        if (navClose) {
            navClose.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
            });
        }

        // Close on outside click
        mobileNav.addEventListener('click', (e) => {
            if (e.target === mobileNav) {
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
            }
        });

        // Mobile dropdown toggle
        mobileDropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.mobile-dropdown-toggle');
            if (toggle) {
                toggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    dropdown.classList.toggle('active');

                    // Close other dropdowns
                    mobileDropdowns.forEach(other => {
                        if (other !== dropdown) {
                            other.classList.remove('active');
                        }
                    });
                });
            }
        });
    }

    // ============================================
    // Enhanced Smooth Scroll
    // ============================================

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '#!') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    const mobileNav = document.querySelector('.mobile-nav');
                    if (mobileNav && mobileNav.classList.contains('active')) {
                        mobileNav.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                }
            });
        });
    }

    // ============================================
    // Enhanced Form Validation
    // ============================================

    function initFormValidation() {
        const forms = document.querySelectorAll('form');

        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                if (!this.checkValidity()) {
                    e.preventDefault();
                    e.stopPropagation();

                    // Focus first invalid field
                    const firstInvalid = this.querySelector(':invalid');
                    if (firstInvalid) {
                        firstInvalid.focus();
                        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }

                this.classList.add('was-validated');
            }, false);
        });
    }

    // ============================================
    // Enhanced Animations on Scroll
    // ============================================

    function initScrollAnimations() {
        if ('IntersectionObserver' in window) {
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in');
                        animationObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            document.querySelectorAll('.card, .section').forEach(el => {
                animationObserver.observe(el);
            });
        }
    }

    // ============================================
    // Enhanced Touch Interactions
    // ============================================

    function initTouchInteractions() {
        // Add touch class for mobile-specific styles
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            document.documentElement.classList.add('touch-device');
        }

        // Prevent double-tap zoom on buttons
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(e) {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }

    // ============================================
    // Enhanced Performance Monitoring
    // ============================================

    function initPerformanceMonitoring() {
        if ('PerformanceObserver' in window) {
            try {
                const perfObserver = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (entry.entryType === 'largest-contentful-paint') {
                            console.log('LCP:', entry.renderTime || entry.loadTime);
                        }
                        if (entry.entryType === 'first-input') {
                            console.log('FID:', entry.processingStart - entry.startTime);
                        }
                    }
                });

                perfObserver.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
            } catch (e) {
                // PerformanceObserver not supported
            }
        }
    }

    // ============================================
    // Enhanced Accessibility
    // ============================================

    function initAccessibility() {
        // Skip link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Add main content landmark if not exists
        const main = document.querySelector('main');
        if (main && !main.id) {
            main.id = 'main-content';
        }

        // Enhanced keyboard navigation
        document.addEventListener('keydown', (e) => {
            // Close modals/dropdowns on ESC
            if (e.key === 'Escape') {
                const activeDropdown = document.querySelector('.dropdown-menu.active');
                if (activeDropdown) {
                    activeDropdown.classList.remove('active');
                }
            }
        });
    }

    // ============================================
    // Enhanced SEO: Structured Data
    // ============================================

    function enhanceStructuredData() {
        // Ensure all images have alt text
        document.querySelectorAll('img:not([alt])').forEach(img => {
            if (!img.alt) {
                img.alt = img.getAttribute('title') || 'Solusi Teknologi Batam';
            }
        });

        // Ensure all links have descriptive text
        document.querySelectorAll('a[href]:not([aria-label])').forEach(link => {
            if (!link.textContent.trim() && !link.querySelector('img')) {
                link.setAttribute('aria-label', link.href);
            }
        });
    }

    // ============================================
    // Enhanced PWA: Install Prompt
    // ============================================

    function initPWAInstall() {
        let deferredPrompt;

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;

            // Show custom install button if needed
            const installButton = document.querySelector('.pwa-install-button');
            if (installButton) {
                installButton.style.display = 'block';
                installButton.addEventListener('click', () => {
                    deferredPrompt.prompt();
                    deferredPrompt.userChoice.then((choiceResult) => {
                        if (choiceResult.outcome === 'accepted') {
                            console.log('User accepted the install prompt');
                        }
                        deferredPrompt = null;
                        installButton.style.display = 'none';
                    });
                });
            }
        });
    }

    // ============================================
    // Enhanced Error Handling
    // ============================================

    function initErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('Global error:', e.error);
            // Could send to error tracking service
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            // Could send to error tracking service
        });
    }

    // ============================================
    // Scroll Animations
    // ============================================

    function initScrollAnimations() {
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            // Observe all animation elements
            document.querySelectorAll('.fade-in, .fade-in-on-scroll, .slide-in-left, .slide-in-right, .scale-in, .stagger-item').forEach(el => {
                observer.observe(el);
            });
        } else {
            // Fallback: show all elements immediately
            document.querySelectorAll('.fade-in, .fade-in-on-scroll, .slide-in-left, .slide-in-right, .scale-in, .stagger-item').forEach(el => {
                el.classList.add('visible');
            });
        }
    }

    // ============================================
    // Initialize All Enhancements
    // ============================================

    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        // Initialize all features
        initLazyLoading();
        preloadCriticalResources();
        initHeaderScroll();
        initMobileMenu();
        initDropdownMenu();
        initSmoothScroll();
        initFormValidation();
        initScrollAnimations();
        initTouchInteractions();
        initAccessibility();
        enhanceStructuredData();
        initPWAInstall();
        initErrorHandling();

        // Performance monitoring (only in development)
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            initPerformanceMonitoring();
        }

        console.log('✅ Global enhancements initialized');
    }

    // Start initialization
    init();

})();
