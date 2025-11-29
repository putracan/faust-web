# 🌐 Optimasi PWA untuk Folder EN (English)

Script untuk memastikan semua file HTML di folder `en/` menggunakan `global-enhancements.css` dengan benar.

## 📋 Script yang Tersedia

### `apply-global-css-en.js`
Script khusus untuk folder `en/` yang akan:
- Memastikan semua file HTML menggunakan `global-enhancements.css`
- Memastikan semua file HTML menggunakan `tailwind-build.css`
- Menghapus `style.css` lama jika ada
- Menambahkan PWA meta tags
- Menambahkan manifest link
- Menambahkan icon links
- Menambahkan preconnect links
- Menambahkan font links
- Menambahkan script `global-enhancements.js`
- Optimasi images (lazy loading)
- Menambahkan skip link untuk accessibility

## 🚀 Cara Menggunakan

```bash
cd c:\ProjectProgram\website\faust.co.id
node apply-global-css-en.js
```

## 📊 Status Update

### File yang Sudah Diupdate
- ✅ `en/index.html` - Homepage (English)

### File yang Perlu Diupdate
- ⏳ `en/cctv.html`
- ⏳ `en/fingerprint.html`
- ⏳ `en/automation.html`
- ⏳ `en/software.html`
- ⏳ `en/jaringan.html`
- ⏳ `en/hubungi-kami.html`
- ⏳ `en/promo.html`
- ⏳ `en/portfolio.html`
- ⏳ `en/news.html`
- ⏳ `en/produk-dan-layanan.html`
- ⏳ Dan ~70 file lainnya

## 📝 Template Manual Update

Jika script tidak berjalan, gunakan template berikut untuk update manual:

### Head Section (CSS & Meta)
```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>
<meta name="theme-color" content="#6366f1"/>
<meta name="color-scheme" content="light"/>
<meta name="mobile-web-app-capable" content="yes"/>
<meta name="apple-mobile-web-app-capable" content="yes"/>
<meta name="apple-mobile-web-app-status-bar-style" content="default"/>
<meta name="apple-mobile-web-app-title" content="Solusi Teknologi Batam"/>
<meta name="format-detection" content="telephone=no"/>

<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link rel="dns-prefetch" href="https://cdnjs.cloudflare.com"/>

<link rel="stylesheet" href="../src/tailwind-build.css"/>
<link rel="stylesheet" href="../src/global-enhancements.css"/>

<link rel="icon" type="image/x-icon" href="../src/itbatam.ico"/>
<link rel="apple-touch-icon" sizes="180x180" href="../src/logo-solusi-teknologi-BATAM.png"/>
<link rel="manifest" href="../manifest.webmanifest"/>
```

### Body Section (Scripts)
```html
<script src="../src/global-enhancements.js" defer></script>
<script src="../src/main.js" defer></script>
<script src="../src/load-right-sidebar.js" defer></script>
```

## 🔍 Perbedaan dengan Folder ID

Folder `en/` menggunakan path yang sama dengan folder `id/`:
- CSS: `../src/global-enhancements.css` (relatif dari `en/`)
- JS: `../src/global-enhancements.js` (relatif dari `en/`)
- Manifest: `../manifest.webmanifest` (relatif dari `en/`)

## ✅ Checklist

Setelah script berjalan, pastikan:

- [ ] Semua file HTML di `en/` memiliki link ke `global-enhancements.css`
- [ ] Semua file HTML di `en/` memiliki link ke `tailwind-build.css`
- [ ] Tidak ada lagi link ke `style.css` lama
- [ ] Semua file HTML memiliki script `global-enhancements.js`
- [ ] PWA meta tags sudah ditambahkan
- [ ] Manifest link sudah ditambahkan
- [ ] Test beberapa halaman di browser
- [ ] Verify CSS loading di browser console
- [ ] Run Lighthouse audit untuk EN version
- [ ] Test language switcher berfungsi dengan baik

## 🌐 Multi-Language Support

Pastikan:
- Language switcher berfungsi dengan baik
- Hreflang tags sudah benar
- Canonical URLs sudah benar untuk setiap bahasa
- Content tetap konsisten antara ID dan EN

## 📚 Related Files

- `apply-global-css.js` - Script untuk folder `id/`
- `apply-global-css-en.js` - Script untuk folder `en/`
- `src/global-enhancements.css` - Global CSS file (shared)
- `src/global-enhancements.js` - Global JS file (shared)
- `README-OPTIMIZE.md` - Dokumentasi optimasi PWA
- `README-GLOBAL-CSS-SCRIPT.md` - Dokumentasi script global CSS

---

*Last Updated: $(date)*
