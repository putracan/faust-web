# 🎨 Script Apply Global CSS

Script untuk memastikan semua file HTML menggunakan `global-enhancements.css` dengan benar.

## 📋 Fitur Script

Script ini akan:

1. **Analisis Global CSS**
   - Membaca file `global-enhancements.css`
   - Mendeteksi fitur CSS yang tersedia (variables, gradients, animations, dll)
   - Menampilkan statistik (size, lines)

2. **Validasi & Update HTML Files**
   - Memastikan semua file HTML menggunakan `tailwind-build.css`
   - Memastikan semua file HTML menggunakan `global-enhancements.css`
   - Menghapus `style.css` lama jika ada
   - Memastikan semua file HTML menggunakan `global-enhancements.js`

3. **Reporting**
   - Menampilkan file yang diupdate
   - Menampilkan file yang sudah benar (skipped)
   - Menampilkan error jika ada

## 🚀 Cara Menggunakan

### Method 1: Node.js Script (Recommended)

```bash
cd c:\ProjectProgram\website\faust.co.id
node apply-global-css.js
```

### Method 2: Manual Update

Jika script tidak berjalan, gunakan template berikut:

#### Head Section (CSS)
```html
<link rel="stylesheet" href="../src/tailwind-build.css"/>
<link rel="stylesheet" href="../src/global-enhancements.css"/>
```

#### Body Section (Scripts)
```html
<script src="../src/global-enhancements.js" defer></script>
<script src="../src/main.js" defer></script>
<script src="../src/load-right-sidebar.js" defer></script>
```

## 📊 Output Script

Script akan menampilkan:

```
🎨 Global CSS Analyzer & Applier
==================================

📄 File: global-enhancements.css
   Size: XXX KB
   Lines: XXXX

✨ Features detected:
   ✅ CSS Variables
   ✅ Gradients
   ✅ Animations
   ✅ Media Queries
   ✅ PWA Styles
   ✅ Accessibility

📁 Found XX HTML files

🔄 Processing files...

✅ index.html
✅ cctv.html
⏭️  fingerprint.html (already has global CSS)
...

📊 Summary
==========
   ✅ Updated:     XX
   ⏭️  Skipped:     XX
   🚫 Excluded:    XX
   ❌ Errors:      XX
   📄 Total:       XX
```

## 🔍 Fitur yang Dideteksi

Script akan mendeteksi fitur berikut dari `global-enhancements.css`:

- ✅ **CSS Variables** (`:root`)
- ✅ **Gradients** (gradient patterns)
- ✅ **Animations** (`@keyframes`)
- ✅ **Media Queries** (`@media`)
- ✅ **PWA Styles** (theme-color, mobile-web-app)
- ✅ **Accessibility** (skip-link, aria-, focus-visible)

## 📝 Yang Akan Diupdate

Script akan:

1. ✅ Menghapus link ke `style.css` (jika ada)
2. ✅ Menambahkan link ke `tailwind-build.css` (jika belum ada)
3. ✅ Menambahkan link ke `global-enhancements.css` (jika belum ada)
4. ✅ Menambahkan script `global-enhancements.js` (jika belum ada)
5. ✅ Memastikan urutan script: global-enhancements.js → main.js → load-right-sidebar.js

## 🚫 File yang Di-exclude

Script akan melewati file berikut:
- `sidebar.html`
- `header.html`
- `footer.html`
- `right-sidebar.html`

## ⚠️ Troubleshooting

### Error: "path argument must be of type string"

**Solusi:**
1. Pastikan Anda berada di directory project root:
   ```bash
   cd c:\ProjectProgram\website\faust.co.id
   ```

2. Pastikan folder `id/` dan `src/` ada di project root

3. Pastikan file `global-enhancements.css` ada di `src/global-enhancements.css`

### Error: "Directory tidak ditemukan"

**Solusi:**
1. Pastikan struktur folder:
   ```
   project-root/
   ├── id/
   │   └── *.html
   ├── src/
   │   ├── global-enhancements.css
   │   └── tailwind-build.css
   └── apply-global-css.js
   ```

2. Jalankan script dari project root

## 📋 Checklist

Setelah script berjalan, pastikan:

- [ ] Semua file HTML memiliki link ke `global-enhancements.css`
- [ ] Semua file HTML memiliki link ke `tailwind-build.css`
- [ ] Tidak ada lagi link ke `style.css` lama
- [ ] Semua file HTML memiliki script `global-enhancements.js`
- [ ] Test beberapa halaman di browser
- [ ] Verify CSS loading di browser console
- [ ] Run Lighthouse audit

## 💡 Tips

1. **Backup dulu** sebelum menjalankan script (opsional)
2. **Test beberapa file** setelah update
3. **Check browser console** untuk error CSS/JS
4. **Run Lighthouse** untuk validasi performance

## 📚 Related Files

- `src/global-enhancements.css` - Global CSS file
- `src/global-enhancements.js` - Global JS file
- `src/tailwind-build.css` - Tailwind CSS
- `optimize-pwa.js` - Script optimasi PWA lengkap
- `README-OPTIMIZE.md` - Dokumentasi optimasi PWA

---

*Last Updated: $(date)*
