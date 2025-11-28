# Instruksi Sync dengan GitHub

## Perubahan yang Perlu di-Sync:

### File yang Dihapus:
- ✅ `requirements.txt` → dipindah ke `requirements.firebase.txt`
- ✅ `firebase.json` → dihapus (karena sekarang pakai Vercel)
- ✅ `update_references.py` → dihapus
- ✅ `update_all.py` → dihapus

### File yang Diperbarui:
- ✅ `vercel.json` → konfigurasi lengkap untuk Vercel
- ✅ File HTML di folder `id/` dan `en/` → semua referensi diubah ke folder `src/`

### File Baru:
- ✅ `.gitignore` → untuk mengabaikan file yang tidak perlu
- ✅ `requirements.firebase.txt` → backup requirements untuk Firebase

## Langkah Sync:

### 1. Cek Status Git:
```bash
git status
```

### 2. Tambahkan Semua Perubahan:
```bash
git add .
```

### 3. Commit Perubahan:
```bash
git commit -m "Fix Vercel deployment: remove Python triggers, update file references to src folder"
```

### 4. Pull dari GitHub (jika ada perubahan remote):
```bash
git pull origin main
```
atau
```bash
git pull origin master
```

### 5. Push ke GitHub:
```bash
git push origin main
```
atau
```bash
git push origin master
```

## Setelah Push:
Vercel akan otomatis melakukan deployment baru dari GitHub. Pastikan:
- ✅ Tidak ada error di log deployment
- ✅ File `/src/itbatam.ico` bisa diakses (tidak 500)
- ✅ Halaman `/id/index.html` bisa diakses dengan benar
