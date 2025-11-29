/**
 * Script Optimasi PWA untuk Semua HTML Files
 * Run: node optimize-pwa.js
 */

const fs = require('fs');
const path = require('path');

// Paths - gunakan process.cwd() saja
const cwd = process.cwd();
const idDir = path.join(cwd, 'id');

console.log('\n🚀 PWA Optimization Script');
console.log('============================\n');
console.log('📂 Working directory:', cwd);
console.log('📂 ID directory:', idDir);

if (!fs.existsSync(idDir)) {
    console.error('❌ Directory tidak ditemukan:', idDir);
    process.exit(1);
}

// Get all HTML files
let htmlFiles;
try {
    const allFiles = fs.readdirSync(idDir);
    htmlFiles = allFiles
        .filter(f => f.endsWith('.html'))
        .filter(f => !f.includes('sidebar') && !f.includes('header') && !f.includes('footer'));
} catch (error) {
    console.error('❌ Error reading directory:', error.message);
    process.exit(1);
}

console.log(`📁 Ditemukan ${htmlFiles.length} file HTML\n`);
console.log('🔄 Processing...\n');

let updated = 0;
let skipped = 0;
let errors = 0;

htmlFiles.forEach(fileName => {
    const filePath = path.join(idDir, fileName);

    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        // 1. Viewport dengan viewport-fit=cover
        if (!content.includes('viewport-fit=cover')) {
            content = content.replace(
                /<meta\s+[^>]*name\s*=\s*["']viewport["'][^>]*>/i,
                '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>'
            );
            modified = true;
        }

        // 2. PWA Meta Tags
        if (!content.includes('theme-color')) {
            const viewportMatch = content.match(/<meta\s+name\s*=\s*["']viewport["'][^>]*>/i);
            if (viewportMatch) {
                content = content.replace(
                    viewportMatch[0],
                    viewportMatch[0] + '\n    <meta name="theme-color" content="#6366f1"/>\n    <meta name="color-scheme" content="light"/>\n    <meta name="mobile-web-app-capable" content="yes"/>\n    <meta name="apple-mobile-web-app-capable" content="yes"/>\n    <meta name="apple-mobile-web-app-status-bar-style" content="default"/>\n    <meta name="apple-mobile-web-app-title" content="Solusi Teknologi Batam"/>\n    <meta name="format-detection" content="telephone=no"/>'
                );
                modified = true;
            }
        }

        // 3. Preconnect
        if (!content.includes('preconnect')) {
            const titleMatch = content.match(/<title>.*?<\/title>/i);
            if (titleMatch) {
                content = content.replace(
                    titleMatch[0],
                    titleMatch[0] + '\n    <link rel="preconnect" href="https://fonts.googleapis.com"/>\n    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>\n    <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com"/>'
                );
                modified = true;
            }
        }

        // 4. CSS - Replace style.css atau tambahkan global-enhancements.css
        if (!content.includes('global-enhancements.css')) {
            if (content.includes('style.css')) {
                content = content.replace(
                    /<link[^>]*style\.css[^>]*>/i,
                    '<link rel="stylesheet" href="../src/tailwind-build.css"/>\n    <link rel="stylesheet" href="../src/global-enhancements.css"/>'
                );
                modified = true;
            } else if (content.includes('tailwind-build.css')) {
                content = content.replace(
                    /<link[^>]*tailwind-build\.css[^>]*>/i,
                    '<link rel="stylesheet" href="../src/tailwind-build.css"/>\n    <link rel="stylesheet" href="../src/global-enhancements.css"/>'
                );
                modified = true;
            }
        }

        // 5. Scripts - Tambahkan global-enhancements.js
        if (!content.includes('global-enhancements.js')) {
            if (content.includes('main.js')) {
                content = content.replace(
                    /<script[^>]*main\.js[^>]*><\/script>/i,
                    '<script src="../src/global-enhancements.js" defer></script>\n    <script src="../src/main.js" defer></script>\n    <script src="../src/load-right-sidebar.js" defer></script>'
                );
                modified = true;
            } else if (content.includes('</body>')) {
                content = content.replace(
                    '</body>',
                    '    <script src="../src/global-enhancements.js" defer></script>\n    <script src="../src/main.js" defer></script>\n    <script src="../src/load-right-sidebar.js" defer></script>\n</body>'
                );
                modified = true;
            }
        }

        // 6. Manifest
        if (!content.includes('manifest.webmanifest')) {
            content = content.replace('</head>', '    <link rel="manifest" href="../manifest.webmanifest"/>\n</head>');
            modified = true;
        }

        // 7. Icons
        if (!content.includes('itbatam.ico')) {
            const manifestMatch = content.match(/<link[^>]*manifest[^>]*>/i);
            if (manifestMatch) {
                content = content.replace(
                    manifestMatch[0],
                    '    <link rel="icon" type="image/x-icon" href="../src/itbatam.ico"/>\n    <link rel="apple-touch-icon" sizes="180x180" href="../src/logo-solusi-teknologi-BATAM.png"/>\n    ' + manifestMatch[0]
                );
                modified = true;
            } else {
                content = content.replace('</head>', '    <link rel="icon" type="image/x-icon" href="../src/itbatam.ico"/>\n    <link rel="apple-touch-icon" sizes="180x180" href="../src/logo-solusi-teknologi-BATAM.png"/>\n</head>');
                modified = true;
            }
        }

        // 8. Fonts
        if (!content.includes('fonts.googleapis.com/css2')) {
            const preconnectMatch = content.match(/<link[^>]*preconnect[^>]*>/i);
            if (preconnectMatch) {
                const lastPreconnect = content.lastIndexOf(preconnectMatch[0]) + preconnectMatch[0].length;
                content = content.slice(0, lastPreconnect) +
                    '\n    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600&display=swap" rel="stylesheet"/>' +
                    content.slice(lastPreconnect);
                modified = true;
            }
        }

        // 9. Skip link
        if (!content.includes('skip-link') && content.includes('<body')) {
            content = content.replace(
                /<body([^>]*)>/i,
                '<body$1>\n    <a href="#main-content" class="skip-link" style="position:absolute;left:-9999px;z-index:9999;padding:1em;background:#6366f1;color:#fff;text-decoration:none" onfocus="this.style.left=\'0\'" onblur="this.style.left=\'-9999px\'">Skip to content</a>'
            );
            modified = true;
        }

        // 10. Main content ID
        if (content.includes('<main') && !content.includes('id="main-content"')) {
            content = content.replace(/<main([^>]*)>/i, '<main$1 id="main-content">');
            modified = true;
        }

        // 11. Image optimization
        content = content.replace(
            /<img((?![^>]*loading=)[^>]*)>/gi,
            (match, attrs) => {
                modified = true;
                return `<img${attrs} loading="lazy" decoding="async">`;
            }
        );

        // 12. Script defer
        content = content.replace(
            /<script([^>]*src="[^"]*\.js"[^>]*)(?!.*defer)([^>]*)>/gi,
            (match, p1, p2) => {
                modified = true;
                return `<script${p1} defer${p2}>`;
            }
        );

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ ${fileName}`);
            updated++;
        } else {
            console.log(`⏭️  ${fileName}`);
            skipped++;
        }
    } catch (error) {
        console.error(`❌ ${fileName}: ${error.message}`);
        errors++;
    }
});

console.log('\n📊 Summary');
console.log('==========');
console.log(`   ✅ Updated:  ${updated}`);
console.log(`   ⏭️  Skipped:  ${skipped}`);
console.log(`   ❌ Errors:   ${errors}`);
console.log(`   📄 Total:    ${htmlFiles.length}`);
console.log('\n✨ Complete!\n');
