// Main JavaScript file for Solusi Teknologi Batam website

const PHONE_DETECT_REGEX = /((?:\+?62|0)[0-9\s\-()]{7,}[0-9])/;

const MODERN_SHELL = {
    header: `<!-- Header -->
<header class="header">
  <div class="container flex items-center justify-between gap-4 py-4">
    <div class="flex items-center gap-3">
      <a href="index.html" class="logo inline-flex items-center gap-3" aria-label="Solusi Teknologi Batam">
        <img src="../src/logo-solusi-teknologi.png" alt="Solusi Teknologi Batam" class="brand-logo h-8 w-auto" loading="lazy"/>
        <span class="font-display text-lg font-semibold text-slate-900">Solusi Teknologi Batam</span>
      </a>
    </div>
    <nav class="nav hidden items-center gap-6 lg:flex" aria-label="Navigasi utama">
      <ul class="nav-list">
        <li class="nav-item dropdown group relative">
          <a href="#" class="nav-link" aria-haspopup="true" aria-expanded="false">
            <i class="fas fa-cogs text-slate-500"></i>
            <span>Layanan</span>
            <i class="fas fa-chevron-down text-xs"></i>
          </a>
          <ul class="dropdown-menu">
            <li><a href="cctv.html"><i class="fas fa-video"></i>CCTV &amp; Sistem Keamanan</a></li>
            <li><a href="fingerprint.html"><i class="fas fa-fingerprint"></i>Fingerprint &amp; Access Control</a></li>
            <li><a href="automation.html"><i class="fas fa-robot"></i>Automation &amp; IoT</a></li>
            <li><a href="software.html"><i class="fas fa-code"></i>Software Development</a></li>
            <li><a href="jaringan.html"><i class="fas fa-network-wired"></i>Jaringan &amp; Server</a></li>
            <li><a href="business-development.html"><i class="fas fa-chart-line"></i>Business Development</a></li>
          </ul>
        </li>
        <li class="nav-item"><a class="nav-link" href="promo.html" data-page="promo"><i class="fas fa-gift"></i><span>Promo</span></a></li>
        <li class="nav-item"><a class="nav-link" href="news.html" data-page="news"><i class="fas fa-newspaper"></i><span>Berita</span></a></li>
        <li class="nav-item"><a class="nav-link" href="portfolio.html" data-page="portfolio"><i class="fas fa-briefcase"></i><span>Portfolio</span></a></li>
      </ul>
    </nav>
    <div class="flex items-center gap-3">
      <div class="lang-dropdown relative">
        <button class="lang-toggle inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold tracking-[0.3em] text-slate-500">
          <span class="current-lang">ID</span>
          <i class="fas fa-chevron-down text-[10px]"></i>
        </button>
        <div class="lang-menu">
          <a href="#" class="lang-option block rounded-xl px-3 py-2 text-center" data-lang="id">ID</a>
          <a href="#" class="lang-option block rounded-xl px-3 py-2 text-center" data-lang="en">EN</a>
        </div>
      </div>
      <div class="hidden items-center gap-2 md:flex">
        <a class="social-link flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:-translate-y-0.5 hover:text-slate-900" href="https://www.tiktok.com/@itbatam" target="_blank" rel="noopener" aria-label="TikTok"><i class="fab fa-tiktok"></i></a>
        <a class="social-link flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:-translate-y-0.5 hover:text-slate-900" href="https://www.linkedin.com/company/itbatam" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
        <a class="social-link flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:-translate-y-0.5 hover:text-slate-900" href="https://wa.me/6281363783738" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
      </div>
      <a class="btn btn-primary hidden lg:inline-flex" href="hubungi-kami.html">
        <i class="fas fa-headset"></i>
        <span>Konsultasi Gratis</span>
      </a>
      <button class="mobile-menu-toggle inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-700 lg:hidden" aria-label="Buka menu">
        <i class="fas fa-bars text-lg"></i>
      </button>
    </div>
  </div>
</header>`.trim(),
    mobileNav: `<div class="mobile-nav" aria-hidden="true">
  <div class="mobile-nav-content">
    <div class="mobile-nav-header flex items-center justify-between">
      <div class="flex items-center gap-3">
        <img src="../src/logo-solusi-teknologi.png" alt="Solusi Teknologi" class="h-8 w-auto"/>
        <span class="font-semibold text-slate-900">Solusi Teknologi Batam</span>
      </div>
      <button class="mobile-nav-close inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200" aria-label="Tutup menu">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <nav class="mobile-nav-menu" aria-label="Navigasi mobile">
      <ul>
        <li class="mobile-dropdown">
          <a class="mobile-dropdown-toggle flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3" href="#">
            <span><i class="fas fa-cogs mr-2"></i>Layanan</span>
            <i class="fas fa-chevron-down text-xs"></i>
          </a>
          <ul class="mobile-dropdown-menu">
            <li><a href="cctv.html" class="block rounded-2xl px-3 py-2">CCTV &amp; Monitoring</a></li>
            <li><a href="fingerprint.html" class="block rounded-2xl px-3 py-2">Fingerprint &amp; Access</a></li>
            <li><a href="automation.html" class="block rounded-2xl px-3 py-2">Automation &amp; IoT</a></li>
            <li><a href="software.html" class="block rounded-2xl px-3 py-2">Software Development</a></li>
            <li><a href="jaringan.html" class="block rounded-2xl px-3 py-2">Jaringan &amp; Server</a></li>
          </ul>
        </li>
        <li><a href="news.html" class="block rounded-2xl border border-slate-200 px-4 py-3"><i class="fas fa-newspaper mr-2"></i>Berita</a></li>
        <li><a href="portfolio.html" class="block rounded-2xl border border-slate-200 px-4 py-3"><i class="fas fa-briefcase mr-2"></i>Portfolio</a></li>
        <li><a href="#contact" class="block rounded-2xl border border-slate-200 px-4 py-3"><i class="fas fa-headset mr-2"></i>Hubungi Kami</a></li>
      </ul>
    </nav>
    <div class="grid gap-3">
      <a class="btn btn-primary w-full justify-center" href="hubungi-kami.html"><i class="fas fa-phone"></i> Konsultasi Gratis</a>
      <a class="btn btn-tertiary w-full justify-center" href="https://wa.me/6281363783738" target="_blank" rel="noopener"><i class="fab fa-whatsapp"></i> Chat WhatsApp</a>
    </div>
  </div>
</div>`.trim(),
    footer: `<!-- Footer -->
<footer class="footer bg-slate-950 text-slate-200">
  <div class="container">
    <div class="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
      <div class="space-y-4">
        <div class="footer-logo flex items-center gap-3">
          <img src="../src/logo-solusi-teknologi.png" alt="Solusi Teknologi" class="h-8 w-auto"/>
          <span class="font-semibold">Solusi Teknologi Batam</span>
        </div>
        <p class="text-sm text-slate-400">Penyedia IT Solution Batam terpercaya dengan spesialisasi CCTV, Fingerprint, Access Door, Automation, Software Development, dan sistem keamanan modern.</p>
        <div class="flex gap-3">
          <a class="social-link flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white" href="https://www.tiktok.com/@itbatam" target="_blank" rel="noopener" aria-label="TikTok"><i class="fab fa-tiktok"></i></a>
          <a class="social-link flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white" href="https://www.linkedin.com/company/itbatam" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
          <a class="social-link flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white" href="https://share.google/exfpqXuWsLvxFWOCk" target="_blank" rel="noopener" aria-label="Google"><i class="fab fa-google"></i></a>
          <a class="social-link flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white" href="https://wa.me/6281363783738" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
        </div>
      </div>
      <div>
        <h3 class="text-lg font-semibold text-white">Menu Cepat</h3>
        <ul class="mt-4 space-y-2 text-sm text-slate-400">
          <li><a href="index.html">Beranda</a></li>
          <li><a href="produk-dan-layanan.html">Produk &amp; Layanan</a></li>
          <li><a href="news.html">Berita Teknologi</a></li>
          <li><a href="portfolio.html">Portfolio</a></li>
          <li><a href="hubungi-kami.html">Hubungi Kami</a></li>
          <li><a href="hubungi-kami.html">Kebijakan Privasi</a></li>
          <li><a href="produk-dan-layanan.html">Syarat &amp; Ketentuan</a></li>
        </ul>
      </div>
      <div>
        <h3 class="text-lg font-semibold text-white">Layanan Kami</h3>
        <ul class="mt-4 space-y-2 text-sm text-slate-400">
          <li><a href="cctv.html">CCTV &amp; Sistem Keamanan</a></li>
          <li><a href="fingerprint.html">Fingerprint &amp; Access Control</a></li>
          <li><a href="automation.html">Automation System</a></li>
          <li><a href="software.html">Software Development</a></li>
          <li><a href="jaringan.html">Jaringan &amp; Server</a></li>
          <li><a href="business-development.html">Business Development</a></li>
        </ul>
      </div>
      <div>
        <h3 class="text-lg font-semibold text-white">Kontak Kami</h3>
        <ul class="mt-4 space-y-3 text-sm text-slate-400">
          <li><i class="fas fa-map-marker-alt mr-2"></i>Batam, Kepulauan Riau</li>
          <li><i class="fas fa-phone mr-2"></i>0811 1262 260</li>
          <li><i class="fas fa-envelope mr-2"></i>putra@faust.co.id</li>
          <li><i class="fab fa-whatsapp mr-2"></i>0813 6378 3738</li>
          <li><i class="fas fa-clock mr-2"></i>Senin - Jumat: 08:00 - 17:00 · Sabtu: 08:00 - 12:00</li>
        </ul>
      </div>
    </div>
    <div class="border-t border-white/10 py-6 text-sm text-slate-500">
      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p>© 2025 Solusi Teknologi Batam. Semua hak dilindungi.</p>
        <div class="flex flex-wrap gap-4">
          <a href="hubungi-kami.html">Kebijakan Privasi</a>
          <a href="produk-dan-layanan.html">Syarat &amp; Ketentuan</a>
          <a href="index.html">Sitemap</a>
        </div>
      </div>
    </div>
  </div>
</footer>`.trim(),
    floatingActions: `<div class="floating-actions" aria-label="Kontak cepat">
  <a href="https://wa.me/6281363783738" target="_blank" rel="noopener" aria-label="WhatsApp">
    <i class="fab fa-whatsapp"></i>
  </a>
  <a href="tel:08111262260" aria-label="Telepon">
    <i class="fas fa-phone"></i>
  </a>
</div>`.trim()
};

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

function applyModernChrome() {
    const pathname = (window.location.pathname || '').toLowerCase();
    if (!pathname.includes('/id/')) {
        return;
    }

    if (document.body.dataset.modernChromeApplied === 'true') {
        return;
    }

    if (document.body.classList.contains('page-home')) {
        return;
    }

    document.body.dataset.modernChromeApplied = 'true';
    document.body.classList.add('page-inner', 'bg-background', 'text-foreground', 'antialiased', 'relative', 'flex', 'flex-col', 'min-h-screen');
    if (!document.body.classList.contains('page-theme-blue')) {
        document.body.classList.add('page-theme-blue');
    }

    document.querySelectorAll('.mobile-nav').forEach((nav) => nav.remove());

    const header = document.querySelector('.header');
    const headerMarkup = `${MODERN_SHELL.header}\n${MODERN_SHELL.mobileNav}`;
    if (header) {
        header.outerHTML = headerMarkup;
    } else {
        document.body.insertAdjacentHTML('afterbegin', headerMarkup);
    }

    const footer = document.querySelector('.footer');
    if (footer) {
        footer.outerHTML = MODERN_SHELL.footer;
    } else {
        document.body.insertAdjacentHTML('beforeend', MODERN_SHELL.footer);
    }

    document.querySelectorAll('.floating-actions').forEach((fab) => fab.remove());
    const mainScript = document.querySelector('script[src*="main.js"]');
    if (mainScript) {
        mainScript.insertAdjacentHTML('beforebegin', MODERN_SHELL.floatingActions);
    } else {
        document.body.insertAdjacentHTML('beforeend', MODERN_SHELL.floatingActions);
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
    applyModernChrome();
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
    // Skip service worker registration for file:// protocol (local development)
    if (window.location.protocol === 'file:') {
        console.log('File protocol detected, skipping service worker registration');
        return;
    }

    if (!('serviceWorker' in navigator)) {
        return;
    }

    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service worker terdaftar:', registration.scope);
            })
            .catch(error => {
                // Only log error if not file:// protocol
                if (window.location.protocol !== 'file:') {
                    console.error('Gagal mendaftarkan service worker:', error);
                }
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