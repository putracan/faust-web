const fs = require('fs');
const path = require('path');

// File yang sudah diperbarui (skip)
const updatedFiles = [
  'index.html',
  'cctv.html',
  'automation.html',
  'software.html',
  'jaringan.html',
  'business-development.html',
  'access-door.html',
  'alarm.html',
  'hubungi-kami.html',
  'news.html',
  'portfolio.html',
  'promo.html',
  'produk-dan-layanan.html',
  'fingerprint.html', // Sudah modern
  'header.html',
  'footer.html',
  'sidebar.html',
  'right-sidebar.html'
];

// Template header modern
const modernHeader = `<header class="header">
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
</header>
<div class="mobile-nav" aria-hidden="true">
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
</div>`;

// Template footer modern
const modernFooter = `<footer class="footer bg-slate-950 text-slate-200">
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
</footer>

<div class="floating-actions" aria-label="Kontak cepat">
  <a href="https://wa.me/6281363783738" target="_blank" rel="noopener" aria-label="WhatsApp">
    <i class="fab fa-whatsapp"></i>
  </a>
  <a href="tel:08111262260" aria-label="Telepon">
    <i class="fas fa-phone"></i>
  </a>
</div>

<script src="../src/main.js" defer></script>
<script src="../src/load-right-sidebar.js" defer></script>
</div>
</body>
</html>`;

function updateHTMLFile(filePath) {
  try {
    if (!filePath || typeof filePath !== 'string') {
      console.error(`❌ Invalid file path: ${filePath}`);
      return false;
    }

    if (!fs.existsSync(filePath)) {
      console.error(`❌ File not found: ${filePath}`);
      return false;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.basename(filePath);

    // Skip file yang sudah diperbarui
    if (updatedFiles.includes(fileName)) {
      console.log(`⏭️  Skipping ${fileName} (already updated)`);
      return;
    }

    // Skip file yang bukan HTML utama (header, footer, sidebar)
    if (fileName.includes('header') || fileName.includes('footer') || fileName.includes('sidebar')) {
      console.log(`⏭️  Skipping ${fileName} (component file)`);
      return;
    }

    let modified = false;

    // 1. Update body tag dengan wrapper div dan class modern
    if (content.includes('<body class="') && !content.includes('bg-background text-foreground antialiased')) {
      const bodyMatch = content.match(/<body\s+class="([^"]*)">/);
      if (bodyMatch) {
        const oldBody = bodyMatch[0];
        const bodyClass = bodyMatch[1];
        // Tentukan page type berdasarkan class atau filename
        let pageType = 'page-service';
        if (bodyClass.includes('home') || fileName === 'index.html') {
          pageType = 'page-home';
        } else if (bodyClass.includes('contact')) {
          pageType = 'page-contact';
        } else if (bodyClass.includes('news')) {
          pageType = 'page-news';
        } else if (bodyClass.includes('portfolio')) {
          pageType = 'page-portfolio';
        }

        const newBody = `<body class="${bodyClass} ${pageType} bg-background text-foreground antialiased">
<div class="relative flex min-h-screen flex-col">`;
        content = content.replace(oldBody, newBody);
        modified = true;
      }
    }

    // 2. Replace header lama dengan header modern
    const oldHeaderRegex = /<!-- Header -->[\s\S]*?<\/header>/;
    if (oldHeaderRegex.test(content) && !content.includes('font-display text-lg font-semibold text-slate-900')) {
      content = content.replace(oldHeaderRegex, modernHeader);
      modified = true;
    }

    // 3. Replace mobile nav lama dengan mobile nav modern
    const oldMobileNavRegex = /<!-- Mobile Navigation -->[\s\S]*?<\/div>\s*<\/div>\s*<\/header>/;
    if (oldMobileNavRegex.test(content) && !content.includes('mobile-nav-header flex items-center justify-between')) {
      // Header sudah diganti, jadi mobile nav juga sudah termasuk
      // Tapi kalau masih ada mobile nav terpisah, hapus
      const separateMobileNav = /<!-- Mobile Navigation -->[\s\S]*?<\/div>\s*<\/div>/;
      if (separateMobileNav.test(content) && !content.includes('mobile-nav-header flex')) {
        content = content.replace(separateMobileNav, '');
        modified = true;
      }
    }

    // 4. Hapus sidebar
    const sidebarRegex = /<!-- Sidebar -->[\s\S]*?<\/aside>[\s\S]*?<!-- Sidebar Overlay -->[\s\S]*?<div class="sidebar-overlay"[^>]*><\/div>/;
    if (sidebarRegex.test(content)) {
      content = content.replace(sidebarRegex, '');
      modified = true;
    }

    // 5. Replace main-content dengan flex-1
    content = content.replace(/<main class="main-content">/g, '<main class="flex-1">');
    if (content.includes('main-content')) {
      modified = true;
    }

    // 6. Replace footer lama dengan footer modern
    const oldFooterRegex = /<!-- Footer -->[\s\S]*?<\/footer>/;
    if (oldFooterRegex.test(content) && !content.includes('footer bg-slate-950 text-slate-200')) {
      // Simpan script tags sebelum footer
      const scriptBeforeFooter = content.match(/<script[^>]*>[\s\S]*?<\/script>\s*(?=<!-- Footer -->|<\/footer>)/g);
      let scriptsToKeep = '';
      if (scriptBeforeFooter) {
        scriptsToKeep = scriptBeforeFooter.join('\n');
        content = content.replace(scriptsToKeep, '');
      }

      // Replace footer
      content = content.replace(oldFooterRegex, modernFooter);

      // Jika ada script yang perlu dipindah, tambahkan sebelum </main>
      if (scriptsToKeep && !scriptsToKeep.includes('main.js') && !scriptsToKeep.includes('load-right-sidebar.js')) {
        content = content.replace('</main>', scriptsToKeep + '\n</main>');
      }

      modified = true;
    }

    // 7. Pastikan script tags ada dengan defer
    if (!content.includes('<script src="../src/main.js" defer></script>')) {
      // Cari posisi sebelum </body>
      const bodyEnd = content.lastIndexOf('</body>');
      if (bodyEnd > 0) {
        const beforeBodyEnd = content.substring(0, bodyEnd);
        const afterBodyEnd = content.substring(bodyEnd);

        // Hapus script tags lama jika ada
        const oldScripts = beforeBodyEnd.match(/<script[^>]*src="\.\.\/src\/(main|load-right-sidebar)\.js"[^>]*><\/script>/g);
        if (oldScripts) {
          oldScripts.forEach(script => {
            beforeBodyEnd.replace(script, '');
          });
        }

        // Tambahkan script tags baru sebelum </div> sebelum </body>
        const newContent = beforeBodyEnd.replace(/<\/div>\s*(?=\s*<\/body>)/,
          '\n<script src="../src/main.js" defer></script>\n<script src="../src/load-right-sidebar.js" defer></script>\n</div>');
        content = newContent + afterBodyEnd;
        modified = true;
      }
    }

    // 8. Pastikan ada closing div untuk wrapper
    if (content.includes('<div class="relative flex min-h-screen flex-col">') && !content.includes('</div>\n</body>')) {
      const bodyEnd = content.lastIndexOf('</body>');
      if (bodyEnd > 0) {
        content = content.substring(0, bodyEnd) + '\n</div>\n' + content.substring(bodyEnd);
        modified = true;
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated ${fileName}`);
      return true;
    } else {
      console.log(`⏭️  No changes needed for ${fileName}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
    return false;
  }
}

// Main execution
// Use relative path from current working directory
const idDir = './id';

console.log(`📂 Working directory: ${process.cwd()}`);
console.log(`📂 Target directory: ${idDir}`);

if (!fs.existsSync(idDir)) {
  console.error(`❌ Directory ${idDir} not found!`);
  console.error(`Current working directory: ${process.cwd()}`);
  process.exit(1);
}

const files = fs.readdirSync(idDir).filter(file => file.endsWith('.html'));

console.log(`📁 Found ${files.length} HTML files in id/ directory\n`);

let updatedCount = 0;
files.forEach(file => {
  if (!file || typeof file !== 'string') {
    console.error(`❌ Invalid filename: ${file}`);
    return;
  }
  const filePath = path.join(idDir, file);
  if (updateHTMLFile(filePath)) {
    updatedCount++;
  }
});

console.log(`\n✨ Done! Updated ${updatedCount} files.`);
