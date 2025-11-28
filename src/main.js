// Main JavaScript file for Solusi Teknologi Batam website

const PHONE_DETECT_REGEX = /((?:\+?62|0)[0-9\s\-()]{7,}[0-9])/;

// Load includes from separate files
async function loadIncludes() {
    try {
        console.log('Loading includes...');

        // Load header
        const headerResponse = await fetch('header.html');
        if (headerResponse.ok) {
            const headerHTML = await headerResponse.text();
            const headerElement = document.querySelector('header#header');
            if (headerElement) {
                headerElement.outerHTML = headerHTML;
                console.log('Header loaded successfully');
            }
        } else {
            console.error('Failed to load header.html');
        }

        // Load sidebar
        const sidebarResponse = await fetch('sidebar.html');
        if (sidebarResponse.ok) {
            const sidebarHTML = await sidebarResponse.text();
            const sidebarElement = document.querySelector('aside#sidebar');
            if (sidebarElement) {
                sidebarElement.outerHTML = sidebarHTML;
                console.log('Sidebar loaded successfully');
            }
        } else {
            console.error('Failed to load sidebar.html');
        }

        // Load footer
        const footerResponse = await fetch('footer.html');
        if (footerResponse.ok) {
            const footerHTML = await footerResponse.text();
            const footerElement = document.querySelector('footer#footer');
            if (footerElement) {
                footerElement.outerHTML = footerHTML;
                console.log('Footer loaded successfully');
            }
        } else {
            console.error('Failed to load footer.html');
        }

        // Initialize components after includes are loaded
        setTimeout(() => {
            console.log('Initializing components...');
            initMobileMenu();
            initSidebar();
            initScrollEffects();
            initFormHandlers();
            initAnimations();
            initSmoothScroll();
            initPortfolioFilter();
            setActiveNavigation();
            console.log('All components initialized');
        }, 200);

    } catch (error) {
        console.error('Error loading includes:', error);
        // Fallback: initialize components even if includes fail to load
        console.log('Using fallback initialization...');
        initMobileMenu();
        initSidebar();
        initScrollEffects();
        initFormHandlers();
        initAnimations();
        initSmoothScroll();
        initPortfolioFilter();
        setActiveNavigation();
    }
}

// Set active navigation based on current page
function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    const navLinks = document.querySelectorAll('.nav-link[data-page]');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('data-page');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Portfolio filtering functionality
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

// Language Switcher Functionality
function initLanguageSwitcher() {
    const langDropdowns = document.querySelectorAll('.lang-dropdown');
    const langOptions = document.querySelectorAll('.lang-option');

    // Detect current language from URL
    function getCurrentLang() {
        const path = window.location.pathname;
        return path.includes('/en/') || path.includes('/en') ? 'en' : 'id';
    }

    const currentLang = getCurrentLang();
    const currentLangSpans = document.querySelectorAll('.current-lang');

    // Update all current language displays
    currentLangSpans.forEach(span => {
        span.textContent = currentLang.toUpperCase();
    });

    // Mark active option
    langOptions.forEach(option => {
        option.classList.toggle('active', option.dataset.lang === currentLang);
    });

    // Setup each dropdown toggle
    langDropdowns.forEach(langDropdown => {
        const langToggle = langDropdown.querySelector('.lang-toggle');

        if (langToggle) {
            // Toggle dropdown on click
            langToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                langDropdown.classList.toggle('active');
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        langDropdowns.forEach(langDropdown => {
            if (!langDropdown.contains(e.target)) {
                langDropdown.classList.remove('active');
            }
        });
    });

    // Handle language selection
    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const targetLang = option.dataset.lang;

            if (targetLang === currentLang) {
                // Close dropdown if same language
                option.closest('.lang-dropdown')?.classList.remove('active');
                return;
            }

            // Get current page filename
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';

            // Build new URL
            const baseUrl = targetLang === 'id'
                ? 'https://faust.co.id/id/'
                : 'https://faust.co.id/en/';

            const newUrl = baseUrl + currentPage;

            // Redirect to new language version
            window.location.href = newUrl;
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components directly (header is now inlined)
    initLanguageSwitcher();
    initMobileMenu();
    initSidebar();
    initScrollEffects();
    initFormHandlers();
    initAnimations();
    initSmoothScroll();
    initPortfolioFilter();
    setActiveNavigation();
    initWhatsAppLinks();
    setTimeout(initWhatsAppLinks, 1500);
});

// Note: Header, sidebar, and footer are now inlined directly in HTML files
// No need for async loading which was causing issues

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileNav.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileNav && mobileNav.classList.contains('active')) {
            if (!mobileNav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    // Mobile dropdown functionality
    mobileDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = this.parentElement.querySelector('.mobile-dropdown-menu');
            const icon = this.querySelector('.fa-chevron-down');

            if (dropdown) {
                dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                icon.style.transform = icon.style.transform === 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)';
            }
        });
    });
}

// Sidebar Functionality
function initSidebar() {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            sidebarOverlay.classList.toggle('active');
            document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
        });
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
}

// Scroll Effects
function initScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Header background on scroll
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    });
}

// Form Handlers
function initFormHandlers() {
    // Contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactForm(this);
        });
    }

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterForm(this);
        });
    }
}

// Handle Contact Form Submission
function handleContactForm(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Basic validation
    const requiredFields = ['name', 'email', 'message'];
    let isValid = true;

    requiredFields.forEach(field => {
        const input = form.querySelector(`[name="${field}"]`) || form.querySelector(`input[placeholder*="${field}"]`);
        if (input && !input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else if (input) {
            input.classList.remove('error');
        }
    });

    if (!isValid) {
        showNotification('Mohon lengkapi semua field yang wajib diisi', 'error');
        return;
    }

    // Email validation
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput && !isValidEmail(emailInput.value)) {
        showNotification('Format email tidak valid', 'error');
        emailInput.classList.add('error');
        return;
    }

    // Simulate form submission
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    submitBtn.disabled = true;

    setTimeout(() => {
        showNotification('Pesan berhasil dikirim! Kami akan menghubungi Anda segera.', 'success');
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Handle Newsletter Form Submission
function handleNewsletterForm(form) {
    const emailInput = form.querySelector('input[type="email"]');

    if (!emailInput.value.trim()) {
        showNotification('Mohon masukkan email Anda', 'error');
        return;
    }

    if (!isValidEmail(emailInput.value)) {
        showNotification('Format email tidak valid', 'error');
        return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;

    setTimeout(() => {
        showNotification('Terima kasih! Anda telah berhasil berlangganan newsletter.', 'success');
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" aria-label="Close notification">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
}

// Animations
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .stat, .feature, .contact-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();

                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
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

function initWhatsAppLinks() {
    convertTelAnchorsToWhatsApp();
    convertTextNodesToWhatsApp(document.body);
}

function sanitizePhoneNumber(value) {
    if (!value) return null;
    const digits = value.replace(/\D+/g, '');
    if (!digits) return null;

    let formatted = digits;
    if (formatted.startsWith('62')) {
        formatted = formatted;
    } else if (formatted.startsWith('0')) {
        formatted = '62' + formatted.slice(1);
    } else if (formatted.startsWith('8')) {
        formatted = '62' + formatted;
    }

    if (formatted.length < 10 || formatted.length > 16) {
        return null;
    }

    return formatted;
}

function createWhatsAppAnchor(rawNumber, displayText) {
    const sanitized = sanitizePhoneNumber(rawNumber);
    if (!sanitized) return null;

    const anchor = document.createElement('a');
    anchor.href = `https://wa.me/${sanitized}`;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.classList.add('wa-link');
    anchor.dataset.waSource = 'auto';
    anchor.textContent = displayText || rawNumber.trim();
    return anchor;
}

function convertTelAnchorsToWhatsApp() {
    const telLinks = document.querySelectorAll('a[href^="tel:"]');
    telLinks.forEach(link => {
        const rawValue = link.getAttribute('href').replace('tel:', '');
        const waAnchor = createWhatsAppAnchor(rawValue, link.textContent.trim() || rawValue);
        if (!waAnchor) return;

        link.href = waAnchor.href;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.classList.add('wa-link');
    });
}

function convertTextNodesToWhatsApp(root) {
    if (!root) return;

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            if (!node.nodeValue || !PHONE_DETECT_REGEX.test(node.nodeValue)) {
                return NodeFilter.FILTER_REJECT;
            }

            const parentElement = node.parentElement;
            if (!parentElement) {
                return NodeFilter.FILTER_REJECT;
            }

            if (parentElement.closest('a')) {
                return NodeFilter.FILTER_REJECT;
            }

            if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parentElement.tagName)) {
                return NodeFilter.FILTER_REJECT;
            }

            return NodeFilter.FILTER_ACCEPT;
        }
    });

    let currentNode;
    while ((currentNode = walker.nextNode())) {
        replaceTextNodeWithWaLinks(currentNode);
    }
}

function replaceTextNodeWithWaLinks(textNode) {
    const content = textNode.nodeValue;
    if (!content) return;

    const phoneRegex = /((?:\+?62|0)[0-9\s\-()]{7,}[0-9])/g;
    let lastIndex = 0;
    let hasReplacement = false;
    const fragment = document.createDocumentFragment();
    let match;

    while ((match = phoneRegex.exec(content)) !== null) {
        const preceding = content.slice(lastIndex, match.index);
        if (preceding) {
            fragment.appendChild(document.createTextNode(preceding));
        }

        const waAnchor = createWhatsAppAnchor(match[0], match[0]);
        if (waAnchor) {
            fragment.appendChild(waAnchor);
            hasReplacement = true;
        } else {
            fragment.appendChild(document.createTextNode(match[0]));
        }

        lastIndex = phoneRegex.lastIndex;
    }

    if (!hasReplacement) {
        return;
    }

    const trailing = content.slice(lastIndex);
    if (trailing) {
        fragment.appendChild(document.createTextNode(trailing));
    }

    textNode.parentNode.replaceChild(fragment, textNode);
}

function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) {
        return;
    }

    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service worker terdaftar:', registration.scope);
            })
            .catch(error => {
                console.error('Gagal mendaftarkan service worker:', error);
            });
    });
}

// Utility functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Add CSS for animations
const animationCSS = `
    .service-card,
    .stat,
    .feature,
    .contact-item {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .service-card.animate-in,
    .stat.animate-in,
    .feature.animate-in,
    .contact-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    .header {
        transition: transform 0.3s ease, background-color 0.3s ease;
    }

    .header.scrolled {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
    }

    .error {
        border-color: #ef4444 !important;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        margin-left: auto;
    }
`;

// Inject animation CSS
const style = document.createElement('style');
style.textContent = animationCSS;
document.head.appendChild(style);

// Export functions for global access
window.SolusiTech = {
    showNotification,
    isValidEmail,
    debounce,
    throttle
};

registerServiceWorker();