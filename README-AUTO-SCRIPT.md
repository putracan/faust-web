# 🤖 Script Otomatis - Visual Enhancements

Panduan penggunaan script otomatis untuk menerapkan visual enhancements ke semua file HTML.

## 📋 Script yang Tersedia

### 1. `apply-visual-auto.js` (Node.js)
Script Node.js untuk apply visual-enhancements.css ke semua file HTML.

**Cara menggunakan:**
```bash
cd c:\ProjectProgram\website\faust.co.id
node apply-visual-auto.js
```

### 2. `apply-visual-auto.ps1` (PowerShell)
Script PowerShell alternatif untuk Windows.

**Cara menggunakan:**
```powershell
cd c:\ProjectProgram\website\faust.co.id
.\apply-visual-auto.ps1
```

### 3. `auto-apply-visual-enhancements.js` (Full Version)
Versi lengkap dengan fitur lebih banyak.

**Cara menggunakan:**
```bash
node auto-apply-visual-enhancements.js
```

## 🎯 Fitur Script

Script akan secara otomatis:

1. ✅ **Menambahkan visual-enhancements.css** ke semua file HTML
2. ✅ **Menambahkan class animations** (fade-in) ke service-card
3. ✅ **Memastikan urutan CSS** yang benar
4. ✅ **Skip file yang sudah diupdate**
5. ✅ **Generate statistics** dan progress report

## 📊 Output Script

Script akan menampilkan:

```
🚀 Auto Apply Visual Enhancements

📁 ID/ (72 files)

✅ index.html
✅ cctv.html - CSS added (+2 animations)
✅ fingerprint.html - CSS added
⏭️  promo.html - Already has visual-enhancements.css
...

📊 Summary
   Total: 144
   ✅ Updated: 135
   ⏭️  Skipped: 9
   ❌ Errors: 0
   🎨 Animations: 45
```

## ⚙️ Configuration

Script dapat dikonfigurasi dengan mengubah variabel di awal file:

```javascript
const FOLDERS = ['id', 'en'];  // Folders to process
const EXCLUDE_FILES = ['sidebar.html', 'header.html', 'footer.html', 'right-sidebar.html'];
const VISUAL_CSS = '../src/visual-enhancements.css';
```

## 🔧 Troubleshooting

### Error: "path argument must be of type string"

**Solusi:**
1. Pastikan Anda berada di project root:
   ```bash
   cd c:\ProjectProgram\website\faust.co.id
   ```

2. Pastikan folder `id/` dan `en/` ada

3. Gunakan PowerShell script sebagai alternatif:
   ```powershell
   .\apply-visual-auto.ps1
   ```

### Script tidak berjalan

**Alternatif:**
1. Gunakan PowerShell script
2. Atau update manual menggunakan template di `QUICK-APPLY-VISUAL-ENHANCEMENTS.md`

## 📝 Manual Update (Jika Script Tidak Berjalan)

Jika script tidak berjalan, gunakan template berikut untuk update manual:

### Template Head Section:
```html
<link rel="stylesheet" href="../src/tailwind-build.css"/>
<link rel="stylesheet" href="../src/global-enhancements.css"/>
<link rel="stylesheet" href="../src/visual-enhancements.css"/>  <!-- Tambahkan ini -->
```

### Template untuk Animations:
```html
<!-- Sebelum -->
<article class="service-card">Content</article>

<!-- Sesudah -->
<article class="service-card fade-in">Content</article>
```

## ✅ Status

- ✅ Script dibuat dan siap digunakan
- ✅ PowerShell script sebagai alternatif
- ✅ Dokumentasi lengkap tersedia
- ⏳ Menunggu eksekusi untuk hasil

## 🚀 Quick Start

1. **Buka terminal** di project root
2. **Jalankan script:**
   ```bash
   node apply-visual-auto.js
   ```
   atau
   ```powershell
   .\apply-visual-auto.ps1
   ```
3. **Tunggu proses selesai**
4. **Test beberapa halaman** di browser
5. **Verify visual effects** bekerja

## 📚 Related Files

- `apply-visual-auto.js` - Main script
- `apply-visual-auto.ps1` - PowerShell alternative
- `auto-apply-visual-enhancements.js` - Full version
- `QUICK-APPLY-VISUAL-ENHANCEMENTS.md` - Manual guide
- `VISUAL-ENHANCEMENTS-PROGRESS.md` - Progress tracking

---

*Last Updated: $(date)*
