# 📱 Mobile-First PWA Optimization Checklist

## ✅ Struktur HTML Optimal

### Head Section (Urutan Penting!)

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <!-- 1. CRITICAL: Character & Viewport -->
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>

    <!-- 2. PWA Meta Tags -->
    <meta name="mobile-web-app-capable" content="yes"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
    <meta name="apple-mobile-web-app-title" content="Solusi Teknologi Batam"/>
    <meta name="format-detection" content="telephone=no"/>
    <meta name="theme-color" content="#6366f1"/>
    <meta name="color-scheme" content="light"/>

    <!-- 3. SEO Meta Tags -->
    <meta name="description" content="[Deskripsi 150-160 karakter]"/>
    <meta name="keywords" content="[keyword1, keyword2, ...]"/>
    <meta name="author" content="Solusi Teknologi Batam"/>
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large"/>
    <link rel="canonical" href="https://faust.co.id/id/[page].html"/>

    <!-- 4. Open Graph -->
    <meta property="og:type" content="website"/>
    <meta property="og:url" content="https://faust.co.id/id/[page].html"/>
    <meta property="og:title" content="[Judul Halaman]"/>
    <meta property="og:description" content="[Deskripsi]"/>
    <meta property="og:image" content="https://faust.co.id/src/logo-solusi-teknologi-BATAM.png"/>
    <meta property="og:locale" content="id_ID"/>

    <!-- 5. Twitter Card -->
    <meta name="twitter:card" content="summary_large_image"/>
    <meta name="twitter:title" content="[Judul]"/>
    <meta name="twitter:description" content="[Deskripsi]"/>
    <meta name="twitter:image" content="https://faust.co.id/src/logo-solusi-teknologi-BATAM.png"/>

    <!-- 6. Title -->
    <title>[Judul Halaman] - Solusi Teknologi Batam</title>

    <!-- 7. Preconnect (SEBELUM resource loading) -->
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
    <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com"/>

    <!-- 8. CSS (Critical inline, rest deferred) -->
    <link rel="stylesheet" href="../src/tailwind-build.css"/>
    <link rel="stylesheet" href="../src/global-enhancements.css"/>

    <!-- 9. Fonts (with display=swap) -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>

    <!-- 10. Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"/>
    <link rel="icon" type="image/x-icon" href="../src/itbatam.ico"/>
    <link rel="apple-touch-icon" sizes="180x180" href="../src/logo-solusi-teknologi-BATAM.png"/>

    <!-- 11. Manifest -->
    <link rel="manifest" href="../manifest.webmanifest"/>

    <!-- 12. Structured Data (Schema.org) -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "[Nama Halaman]",
        ...
    }
    </script>
</head>
```

### Body Section

```html
<body class="page-theme-blue page-[type] bg-background text-foreground antialiased">
    <!-- Skip Link for Accessibility -->
    <a href="#main-content" class="skip-link">Skip to content</a>

    <div class="relative flex min-h-screen flex-col">
        <!-- Header -->
        <header class="header">...</header>

        <!-- Mobile Navigation -->
        <div class="mobile-nav">...</div>

        <!-- Main Content -->
        <main id="main-content" class="flex-1">
            <!-- Page Content -->
        </main>

        <!-- Footer -->
        <footer class="footer">...</footer>

        <!-- Floating Actions -->
        <div class="floating-actions">...</div>
    </div>

    <!-- Scripts (defer untuk non-blocking) -->
    <script src="../src/global-enhancements.js" defer></script>
    <script src="../src/main.js" defer></script>
    <script src="../src/load-right-sidebar.js" defer></script>
</body>
</html>
```

---

## 📊 Lighthouse Score Target

| Metric | Target | Cara Mencapai |
|--------|--------|---------------|
| **Performance** | 90+ | Lazy loading, code splitting, image optimization |
| **Accessibility** | 95+ | ARIA labels, color contrast, keyboard navigation |
| **Best Practices** | 95+ | HTTPS, no deprecated APIs, secure headers |
| **SEO** | 100 | Meta tags lengkap, structured data, sitemap |
| **PWA** | 100 | Manifest valid, SW registered, installable |

---

## 🔧 Optimasi Performance

### 1. Images
```html
<!-- Lazy loading dengan placeholder -->
<img
    src="placeholder.svg"
    data-src="actual-image.jpg"
    alt="Deskripsi gambar"
    loading="lazy"
    decoding="async"
    width="800"
    height="600"
/>

<!-- Responsive images -->
<picture>
    <source media="(max-width: 640px)" srcset="image-mobile.webp"/>
    <source media="(max-width: 1024px)" srcset="image-tablet.webp"/>
    <img src="image-desktop.webp" alt="Deskripsi"/>
</picture>
```

### 2. Fonts
```html
<!-- Preload critical font -->
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin/>

<!-- Font display swap -->
<link href="...&display=swap" rel="stylesheet"/>
```

### 3. Scripts
```html
<!-- Defer non-critical scripts -->
<script src="script.js" defer></script>

<!-- Async for analytics -->
<script src="analytics.js" async></script>

<!-- Module for modern browsers -->
<script type="module" src="modern.js"></script>
<script nomodule src="legacy.js"></script>
```

---

## ♿ Accessibility Checklist

- [ ] Skip link untuk keyboard navigation
- [ ] ARIA labels pada semua interactive elements
- [ ] Color contrast ratio minimal 4.5:1
- [ ] Focus visible pada semua focusable elements
- [ ] Alt text pada semua images
- [ ] Heading hierarchy yang benar (h1 → h2 → h3)
- [ ] Touch target minimal 44x44px
- [ ] Reduced motion support
- [ ] Screen reader friendly

---

## 📱 Mobile-First Checklist

- [ ] Viewport meta tag dengan viewport-fit=cover
- [ ] Touch-friendly buttons (min 44px)
- [ ] No horizontal scroll
- [ ] Readable font sizes (min 16px untuk body)
- [ ] Appropriate tap targets spacing
- [ ] Fast tap response (no 300ms delay)
- [ ] Swipe gestures support
- [ ] Portrait dan landscape support

---

## 🔒 PWA Requirements

### Manifest.webmanifest
- [ ] name dan short_name
- [ ] start_url dengan query parameter tracking
- [ ] display: standalone
- [ ] theme_color dan background_color
- [ ] Icons: 192x192 dan 512x512 (maskable)
- [ ] shortcuts untuk quick actions
- [ ] screenshots untuk install prompt

### Service Worker
- [ ] Register di semua halaman
- [ ] Cache app shell
- [ ] Offline fallback page
- [ ] Background sync untuk forms
- [ ] Push notifications ready

### HTTPS
- [ ] Semua resources via HTTPS
- [ ] No mixed content
- [ ] Valid SSL certificate

---

## 🎯 Core Web Vitals Target

| Metric | Target | Deskripsi |
|--------|--------|-----------|
| **LCP** | < 2.5s | Largest Contentful Paint |
| **FID** | < 100ms | First Input Delay |
| **CLS** | < 0.1 | Cumulative Layout Shift |
| **FCP** | < 1.8s | First Contentful Paint |
| **TTFB** | < 800ms | Time to First Byte |

---

## 📁 File Structure Recommended

```
project/
├── id/                      # Indonesian pages
│   ├── index.html
│   ├── cctv.html
│   ├── fingerprint.html
│   └── ...
├── en/                      # English pages
├── src/
│   ├── tailwind-build.css   # Compiled Tailwind
│   ├── global-enhancements.css
│   ├── global-enhancements.js
│   ├── main.js
│   └── images/
│       ├── icons/           # PWA icons
│       └── ...
├── manifest.webmanifest
├── sw.js                    # Service Worker
├── robots.txt
├── sitemap.xml
└── .htaccess               # Server config
```

---

## 🚀 Deployment Checklist

- [ ] Minify HTML, CSS, JS
- [ ] Compress images (WebP format)
- [ ] Enable Gzip/Brotli compression
- [ ] Set proper cache headers
- [ ] Enable HTTP/2
- [ ] Configure CDN
- [ ] Setup SSL certificate
- [ ] Test on real devices
- [ ] Run Lighthouse audit
- [ ] Submit sitemap to Google Search Console

---

## 📝 Quick Commands

```bash
# Build Tailwind CSS
npx tailwindcss -i src/input.css -o src/tailwind-build.css --minify

# Test locally dengan HTTPS
npx serve -s . --ssl-cert cert.pem --ssl-key key.pem

# Lighthouse CLI
npx lighthouse https://faust.co.id --view

# PWA Check
npx pwa-asset-generator logo.png icons --background "#6366f1"
```

---

*Dokumen ini adalah panduan untuk mencapai Lighthouse Score 100 dan PWA compliance.*
