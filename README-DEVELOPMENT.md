# Development Guide - Solusi Teknologi Batam

## ⚠️ Penting: Jangan Buka File HTML Langsung dari File System

File HTML **TIDAK BOLEH** dibuka langsung dari file system (double-click) karena akan menyebabkan error CORS dan Service Worker tidak akan berfungsi.

## ✅ Cara yang Benar untuk Development

### Opsi 1: Menggunakan Live Server (Recommended)

1. **VS Code dengan Extension Live Server:**
   - Install extension "Live Server" di VS Code
   - Klik kanan pada file `id/index.html`
   - Pilih "Open with Live Server"
   - Browser akan membuka di `http://localhost:5500`

2. **Python HTTP Server:**
   ```bash
   # Di root project (faust.co.id)
   python -m http.server 8000
   # Buka browser: http://localhost:8000/id/
   ```

3. **Node.js HTTP Server:**
   ```bash
   # Install http-server global
   npm install -g http-server

   # Di root project
   http-server -p 8000
   # Buka browser: http://localhost:8000/id/
   ```

4. **PHP Built-in Server:**
   ```bash
   # Di root project
   php -S localhost:8000
   # Buka browser: http://localhost:8000/id/
   ```

### Opsi 2: Menggunakan Browser dengan Flag (Temporary Fix)

**Chrome/Edge:**
```bash
chrome.exe --allow-file-access-from-files --disable-web-security
```

**⚠️ Warning:** Ini hanya untuk testing, jangan gunakan untuk browsing biasa karena menonaktifkan keamanan browser.

## 🔧 Fitur yang Membutuhkan HTTP Server

Fitur berikut **HANYA** berfungsi dengan HTTP/HTTPS protocol:

1. ✅ **Service Worker** - Untuk PWA offline functionality
2. ✅ **Fetch API** - Untuk load right-sidebar.html
3. ✅ **Manifest** - Untuk PWA installation
4. ✅ **CORS** - Untuk cross-origin requests

## 📝 Catatan Development

- Semua file sudah memiliki **fallback** untuk file:// protocol
- Error akan di-suppress saat file:// protocol terdeteksi
- Inline sidebar akan digunakan otomatis jika fetch gagal
- Service worker registration akan di-skip untuk file:// protocol

## 🚀 Production Deployment

Untuk production, pastikan:
- Semua file di-deploy ke web server (Apache, Nginx, dll)
- HTTPS enabled untuk PWA features
- Service worker terdaftar dengan benar
- Manifest accessible di root domain

## 🐛 Troubleshooting

**Error: "Access to fetch blocked by CORS policy"**
- ✅ **Solusi:** Gunakan HTTP server, jangan buka file langsung

**Error: "Service worker registration failed"**
- ✅ **Solusi:** Gunakan HTTP server, service worker hanya bekerja dengan HTTP/HTTPS

**Error: "Manifest not found"**
- ✅ **Solusi:** Pastikan `manifest.webmanifest` ada di root dan accessible via HTTP
