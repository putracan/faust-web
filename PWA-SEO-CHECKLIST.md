# Checklist PWA + SEO + Mobile-First + Warna Lembut

## ✅ Requirements untuk Lighthouse 100

### 1. PWA (Progressive Web App)
- [x] Manifest.webmanifest dengan warna lembut (#6366f1)
- [x] Service Worker (sw.js) terdaftar
- [x] Meta tags PWA lengkap:
  - `mobile-web-app-capable`
  - `apple-mobile-web-app-capable`
  - `apple-mobile-web-app-status-bar-style`
  - `apple-mobile-web-app-title`
  - `theme-color` (#6366f1 - warna lembut)
- [x] Apple touch icon
- [x] Manifest link di semua HTML

### 2. Mobile-First Design
- [x] Viewport: `width=device-width, initial-scale=1, viewport-fit=cover`
- [x] Responsive design dengan Tailwind CSS
- [x] Touch-friendly buttons (min 44x44px)
- [x] Mobile navigation menu
- [x] Optimized images dengan `loading="lazy"`

### 3. SEO Optimization
- [x] Meta description unik per halaman
- [x] Meta keywords relevan
- [x] Canonical URL
- [x] Open Graph tags lengkap
- [x] Twitter Card tags
- [x] Schema.org JSON-LD
- [x] Semantic HTML5
- [x] Alt text untuk semua images
- [x] Heading hierarchy (H1 → H2 → H3)

### 4. Warna Lembut (Soft Colors)
- Primary: `#6366f1` (indigo soft)
- Background: `#f8fafc` (slate-50)
- Text: `#334155` (slate-700)
- Borders: `#e2e8f0` (slate-200)

### 5. User-Friendly Features
- [x] Loading states
- [x] Error handling
- [x] Accessibility (ARIA labels)
- [x] Keyboard navigation
- [x] Focus indicators
- [x] Skip to content link
- [x] Language switcher

### 6. Performance
- [x] Lazy loading images
- [x] Defer scripts
- [x] Preconnect untuk fonts
- [x] Service worker caching
- [x] Minified CSS/JS
- [x] Optimized images

## Template Head Section

```html
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>
<meta name="description" content="DESCRIPTION"/>
<meta name="keywords" content="KEYWORDS"/>
<meta name="author" content="Solusi Teknologi Batam"/>
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>
<meta name="theme-color" content="#6366f1"/>
<meta name="color-scheme" content="light"/>
<meta name="mobile-web-app-capable" content="yes"/>
<meta name="apple-mobile-web-app-capable" content="yes"/>
<meta name="apple-mobile-web-app-status-bar-style" content="default"/>
<meta name="apple-mobile-web-app-title" content="Solusi Teknologi Batam"/>
<meta name="format-detection" content="telephone=no"/>
<link rel="canonical" href="CANONICAL_URL"/>
<link rel="alternate" href="CANONICAL_URL" hreflang="id"/>
<link rel="alternate" href="CANONICAL_URL_EN" hreflang="en"/>
<meta property="og:type" content="website"/>
<meta property="og:url" content="CANONICAL_URL"/>
<meta property="og:title" content="TITLE"/>
<meta property="og:description" content="DESCRIPTION"/>
<meta property="og:image" content="https://faust.co.id/src/logo-solusi-teknologi-BATAM.png"/>
<meta property="og:locale" content="id_ID"/>
<meta property="og:site_name" content="Solusi Teknologi Batam"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:url" content="CANONICAL_URL"/>
<meta name="twitter:title" content="TITLE"/>
<meta name="twitter:description" content="DESCRIPTION"/>
<meta name="twitter:image" content="https://faust.co.id/src/logo-solusi-teknologi-BATAM.png"/>
<title>TITLE</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600&display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer"/>
<link rel="icon" type="image/x-icon" href="../src/itbatam.ico"/>
<link rel="apple-touch-icon" sizes="180x180" href="../src/logo-solusi-teknologi-BATAM.png"/>
<link rel="manifest" href="../manifest.webmanifest"/>
<link rel="stylesheet" href="../src/tailwind-build.css"/>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "TITLE",
  "description": "DESCRIPTION",
  "url": "CANONICAL_URL",
  "inLanguage": "id-ID"
}
</script>
</head>
```

## Template Body Section

```html
<body class="page-theme-blue page-service bg-background text-foreground antialiased">
<div class="relative flex min-h-screen flex-col">
<!-- Header -->
<!-- Main Content -->
<!-- Footer -->
<script src="../src/main.js" defer></script>
<script src="../src/load-right-sidebar.js" defer></script>
</div>
</body>
</html>
```

## Warna Lembut yang Digunakan

- Primary: `#6366f1` (Indigo soft)
- Primary Dark: `#4f46e5`
- Primary Light: `#818cf8`
- Background: `#f8fafc` (Slate-50)
- Text: `#334155` (Slate-700)
- Border: `#e2e8f0` (Slate-200)
- Success: `#34d399` (Emerald soft)
- Warning: `#fbbf24` (Amber soft)
- Error: `#f87171` (Red soft)
