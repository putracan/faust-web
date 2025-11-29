# 📝 Panduan Optimasi PWA untuk Semua HTML Files

## Script yang Tersedia

### 1. `optimize-pwa.js` (Root directory)
Script utama untuk mengoptimasi semua file HTML dengan PWA enhancements.

**Cara menggunakan:**
```bash
cd c:\ProjectProgram\website\faust.co.id
node optimize-pwa.js
```

### 2. `scripts/optimize-all-html.js`
Script alternatif dengan fitur lebih lengkap.

**Cara menggunakan:**
```bash
cd c:\ProjectProgram\website\faust.co.id
node scripts/optimize-all-html.js
```

## Optimasi yang Diterapkan

Script akan menerapkan optimasi berikut ke semua file HTML:

### 1. ✅ Viewport Optimization
- Menambahkan `viewport-fit=cover` untuk notch support
- Memastikan `width=device-width, initial-scale=1`

### 2. ✅ PWA Meta Tags
- `theme-color`: #6366f1
- `color-scheme`: light
- `mobile-web-app-capable`: yes
- `apple-mobile-web-app-capable`: yes
- `apple-mobile-web-app-status-bar-style`: default
- `apple-mobile-web-app-title`: Solusi Teknologi Batam
- `format-detection`: telephone=no

### 3. ✅ Resource Preloading
- Preconnect ke fonts.googleapis.com
- Preconnect ke fonts.gstatic.com
- DNS prefetch ke cdnjs.cloudflare.com

### 4. ✅ CSS Optimization
- Mengganti `style.css` dengan `tailwind-build.css` + `global-enhancements.css`
- Menambahkan `global-enhancements.css` jika belum ada

### 5. ✅ JavaScript Optimization
- Menambahkan `global-enhancements.js`
- Memastikan semua script menggunakan `defer`
- Urutan: global-enhancements.js → main.js → load-right-sidebar.js

### 6. ✅ Manifest & Icons
- Menambahkan link ke `manifest.webmanifest`
- Menambahkan favicon (`itbatam.ico`)
- Menambahkan Apple touch icon (180x180)

### 7. ✅ Font Optimization
- Menambahkan Google Fonts (Inter + Space Grotesk)

### 8. ✅ Accessibility
- Menambahkan skip link untuk keyboard navigation
- Menambahkan `id="main-content"` pada main element

### 9. ✅ Image Optimization
- Menambahkan `loading="lazy"` pada semua images
- Menambahkan `decoding="async"` untuk performance

## File yang Akan Diupdate

Script akan memproses semua file HTML di folder `id/` kecuali:
- `sidebar.html`
- `header.html`
- `footer.html`
- `right-sidebar.html`

## Output

Script akan menampilkan:
- ✅ File yang berhasil diupdate
- ⏭️ File yang sudah dioptimasi (skipped)
- ❌ File yang error (jika ada)

## Troubleshooting

### Error: "path argument must be of type string"
Jika terjadi error ini, pastikan:
1. Anda berada di directory project root (`c:\ProjectProgram\website\faust.co.id`)
2. Folder `id/` ada di project root
3. Node.js versi terbaru terinstall

### Manual Update
Jika script tidak berjalan, Anda bisa update manual menggunakan template di `OPTIMIZATION-APPLIED.md`.

## Template Manual Update

Jika perlu update manual, gunakan template berikut:

### Head Section
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

## Status Update

- ✅ **11 file utama** sudah dioptimasi (index, cctv, fingerprint, automation, software, jaringan, hubungi-kami, promo, portfolio, news, produk-dan-layanan)
- ⏳ **~65 file lainnya** menunggu batch update

## Next Steps

Setelah script berjalan:
1. Test beberapa halaman di browser
2. Run Lighthouse audit
3. Check PWA installability
4. Verify service worker registration
5. Test di mobile device

---

*Last Updated: $(date)*
