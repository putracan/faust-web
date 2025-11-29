# 📐 Template Struktur CSS Konsisten

Dokumentasi struktur CSS yang benar untuk semua halaman HTML, berdasarkan `index.html`.

## 🎯 Struktur CSS yang Benar

### Folder ID/ (Indonesian)

Urutan yang benar untuk folder `id/`:

```html
<title>Page Title</title>
<!-- 1. Preconnect -->
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>

<!-- 2. Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600&display=swap" rel="stylesheet"/>

<!-- 3. Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer"/>

<!-- 4. Icons -->
<link rel="icon" type="image/x-icon" href="../src/itbatam.ico"/>
<link rel="apple-touch-icon" sizes="180x180" href="../src/logo-solusi-teknologi-BATAM.png"/>

<!-- 5. Manifest -->
<link rel="manifest" href="../manifest.webmanifest"/>

<!-- 6. Tailwind CSS -->
<link rel="stylesheet" href="../src/tailwind-build.css"/>

<!-- 7. Global Enhancements CSS -->
<link rel="stylesheet" href="../src/global-enhancements.css"/>

<!-- 8. PWA Meta Tags (setelah CSS) -->
<meta name="theme-color" content="#6366f1"/>
<meta name="color-scheme" content="light"/>
```

### Folder EN/ (English)

Urutan yang benar untuk folder `en/`:

```html
<title>Page Title</title>
<!-- 1. Preconnect -->
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link rel="dns-prefetch" href="https://cdnjs.cloudflare.com"/>

<!-- 2. Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>

<!-- 3. Font Awesome -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet"/>

<!-- 4. Icons -->
<link rel="icon" type="image/x-icon" href="../src/itbatam.ico"/>
<link rel="apple-touch-icon" sizes="180x180" href="../src/logo-solusi-teknologi-BATAM.png"/>

<!-- 5. Manifest -->
<link rel="manifest" href="../manifest.webmanifest"/>

<!-- 6. Tailwind CSS -->
<link rel="stylesheet" href="../src/tailwind-build.css"/>

<!-- 7. Global Enhancements CSS -->
<link rel="stylesheet" href="../src/global-enhancements.css"/>

<!-- 8. PWA Meta Tags (setelah CSS) -->
<meta name="theme-color" content="#6366f1"/>
<meta name="color-scheme" content="light"/>
```

## 📋 Urutan yang Benar

### 1. Preconnect Links (Paling Awal)
- `fonts.googleapis.com`
- `fonts.gstatic.com` (dengan crossorigin)
- `cdnjs.cloudflare.com` (hanya untuk EN)

**Alasan:** Preconnect harus dideklarasikan sebelum resource yang akan digunakan.

### 2. Google Fonts
- ID: `Inter` (400,500,600,700) + `Space Grotesk` (500,600)
- EN: `Inter` (300,400,500,600,700)

**Alasan:** Font harus di-load setelah preconnect.

### 3. Font Awesome
- CDN dengan integrity hash untuk security

**Alasan:** Icon library, load setelah fonts.

### 4. Icons
- Favicon (`itbatam.ico`)
- Apple touch icon (180x180)

**Alasan:** Icons untuk browser/app, load sebelum manifest.

### 5. Manifest
- PWA manifest file

**Alasan:** Manifest harus ada sebelum CSS untuk PWA detection.

### 6. Tailwind CSS
- Base Tailwind styles

**Alasan:** Base CSS harus di-load sebelum custom CSS.

### 7. Global Enhancements CSS
- Custom global styles

**Alasan:** Custom CSS harus di-load setelah base CSS untuk override.

### 8. PWA Meta Tags
- `theme-color`
- `color-scheme`
- dll

**Alasan:** Meta tags bisa diletakkan setelah CSS.

## ⚠️ Kesalahan Umum

### ❌ SALAH: CSS sebelum Preconnect
```html
<link rel="stylesheet" href="../src/tailwind-build.css"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
```

### ✅ BENAR: Preconnect sebelum CSS
```html
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="stylesheet" href="../src/tailwind-build.css"/>
```

### ❌ SALAH: Global CSS sebelum Tailwind
```html
<link rel="stylesheet" href="../src/global-enhancements.css"/>
<link rel="stylesheet" href="../src/tailwind-build.css"/>
```

### ✅ BENAR: Tailwind sebelum Global
```html
<link rel="stylesheet" href="../src/tailwind-build.css"/>
<link rel="stylesheet" href="../src/global-enhancements.css"/>
```

### ❌ SALAH: Manifest setelah CSS
```html
<link rel="stylesheet" href="../src/tailwind-build.css"/>
<link rel="manifest" href="../manifest.webmanifest"/>
```

### ✅ BENAR: Manifest sebelum CSS
```html
<link rel="manifest" href="../manifest.webmanifest"/>
<link rel="stylesheet" href="../src/tailwind-build.css"/>
```

## 🔧 Script untuk Sync

Gunakan script `sync-css-structure.js` untuk menyamakan struktur semua file:

```bash
node sync-css-structure.js
```

Script akan:
1. Membaca struktur dari `index.html`
2. Menghapus semua CSS/icon/manifest links yang ada
3. Menyisipkan struktur CSS yang benar sesuai urutan
4. Memastikan konsistensi di semua file

## 📊 Status

### File yang Sudah Konsisten
- ✅ `id/index.html` - Template reference
- ✅ `en/index.html` - Template reference
- ✅ `id/cctv.html` - Sudah disesuaikan
- ✅ `en/cctv.html` - Sudah disesuaikan

### File yang Perlu Disesuaikan
- ⏳ Semua file HTML lainnya (144 files)

## 💡 Best Practices

1. **Preconnect First**: Selalu letakkan preconnect sebelum resource
2. **Fonts Before CSS**: Load fonts sebelum CSS untuk menghindari FOUT
3. **Base Before Custom**: Tailwind sebelum global-enhancements
4. **Manifest Before CSS**: Manifest harus ada untuk PWA detection
5. **Icons Before Manifest**: Icons load lebih cepat, letakkan sebelum manifest

## 🎯 Tujuan

Struktur CSS yang konsisten akan:
- ✅ Meningkatkan performance (critical rendering path)
- ✅ Mengurangi FOUT (Flash of Unstyled Text)
- ✅ Memastikan PWA detection yang benar
- ✅ Memudahkan maintenance
- ✅ Konsistensi di semua halaman

---

*Last Updated: $(date)*
*Template based on: id/index.html and en/index.html*
