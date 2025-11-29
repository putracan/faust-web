/**
 * Script Optimasi PWA untuk Semua HTML Files
 * Run: node scripts/optimize-html.js
 */

const fs = require('fs');
const path = require('path');

// Paths
const cwd = process.cwd();
const idDir = path.resolve(cwd, 'id');

console.log('📂 Working directory:', cwd);
console.log('📂 ID directory:', idDir);

if (!fs.existsSync(idDir)) {
    console.error('❌ Directory tidak ditemukan:', idDir);
    process.exit(1);
}

// Get all HTML files
const files = fs.readdirSync(idDir)
    .filter(f => f.endsWith('.html'))
    .filter(f => !f.includes('sidebar') && !f.includes('header') && !f.includes('footer'))
    .map(f => path.join(idDir, f));

console.log(`\n📁 Ditemukan ${files.length} file HTML\n`);

let updated = 0;
let skipped = 0;

files.forEach(filePath => {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const fileName = path.basename(filePath);
        let modified = false;

        // 1. Viewport
        if (!content.includes('viewport-fit=cover')) {
            content = content.replace(
                /<meta\s+[^>]*name\s*=\s*["']viewport["'][^>]*>/i,
                '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>'
            );
            modified = true;
        }

        // 2. PWA Meta
        if (!content.includes('theme-color')) {
            content = content.replace(
                /<meta\s+name\s*=\s*["']viewport["'][^>]*>/i,
                match => match + '\n    <meta name="theme-color" content="#6366f1"/>\n    <meta name="color-scheme" content="light"/>\n    <meta name="mobile-web-app-capable" content="yes"/>\n    <meta name="apple-mobile-web-app-capable" content="yes"/>\n    <meta name="apple-mobile-web-app-status-bar-style" content="default"/>\n    <meta name="apple-mobile-web-app-title" content="Solusi Teknologi Batam"/>\n    <meta name="format-detection" content="telephone=no"/>'
            );
            modified = true;
        }

        // 3. CSS
        if (!content.includes('global-enhancements.css')) {
            if (content.includes('style.css')) {
                content = content.replace(
                    /<link[^>]*style\.css[^>]*>/i,
                    '<link rel="stylesheet" href="../src/tailwind-build.css"/>\n    <link rel="stylesheet" href="../src/global-enhancements.css"/>'
                );
                modified = true;
            } else if (content.includes('tailwind-build.css') && !content.includes('global-enhancements.css')) {
                content = content.replace(
                    /<link[^>]*tailwind-build\.css[^>]*>/i,
                    '<link rel="stylesheet" href="../src/tailwind-build.css"/>\n    <link rel="stylesheet" href="../src/global-enhancements.css"/>'
                );
                modified = true;
            }
        }

        // 4. Scripts
        if (!content.includes('global-enhancements.js')) {
            if (content.includes('main.js')) {
                content = content.replace(
                    /<script[^>]*main\.js[^>]*><\/script>/i,
                    '<script src="../src/global-enhancements.js" defer></script>\n    <script src="../src/main.js" defer></script>\n    <script src="../src/load-right-sidebar.js" defer></script>'
                );
                modified = true;
            }
        }

        // 5. Manifest
        if (!content.includes('manifest.webmanifest')) {
            content = content.replace('</head>', '    <link rel="manifest" href="../manifest.webmanifest"/>\n</head>');
            modified = true;
        }

        // 6. Icons
        if (!content.includes('itbatam.ico')) {
            content = content.replace('</head>', '    <link rel="icon" type="image/x-icon" href="../src/itbatam.ico"/>\n    <link rel="apple-touch-icon" sizes="180x180" href="../src/logo-solusi-teknologi-BATAM.png"/>\n</head>');
            modified = true;
        }

        // 7. Preconnect
        if (!content.includes('preconnect')) {
            content = content.replace(
                /<title>.*?<\/title>/i,
                match => match + '\n    <link rel="preconnect" href="https://fonts.googleapis.com"/>\n    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>\n    <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com"/>'
            );
            modified = true;
        }

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ ${fileName}`);
            updated++;
        } else {
            console.log(`⏭️  ${fileName}`);
            skipped++;
        }
    } catch (error) {
        console.error(`❌ ${path.basename(filePath)}: ${error.message}`);
    }
});

console.log(`\n📊 Updated: ${updated}, Skipped: ${skipped}\n`);
