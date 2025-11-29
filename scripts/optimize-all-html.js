/**
 * Script untuk menerapkan optimasi Mobile-First PWA ke SEMUA halaman HTML
 *
 * Usage:
 *   cd c:\ProjectProgram\website\faust.co.id
 *   node scripts/optimize-all-html.js
 */

const fs = require('fs');
const path = require('path');

// Use current working directory as project root
const PROJECT_ROOT = process.cwd();
const ID_DIR = path.resolve(PROJECT_ROOT, 'id');

// Validate paths
if (!PROJECT_ROOT || typeof PROJECT_ROOT !== 'string') {
    console.error('❌ Invalid project root');
    process.exit(1);
}
const EXCLUDE_FILES = ['sidebar.html', 'header.html', 'footer.html', 'right-sidebar.html'];

// Resources paths
const RESOURCES = {
    tailwindCSS: '../src/tailwind-build.css',
    globalCSS: '../src/global-enhancements.css',
    globalJS: '../src/global-enhancements.js',
    mainJS: '../src/main.js',
    sidebarJS: '../src/load-right-sidebar.js',
    manifest: '../manifest.webmanifest',
    favicon: '../src/itbatam.ico',
    appleIcon: '../src/logo-solusi-teknologi-BATAM.png'
};

// PWA Meta Tags
const PWA_META = `    <meta name="theme-color" content="#6366f1"/>
    <meta name="color-scheme" content="light"/>
    <meta name="mobile-web-app-capable" content="yes"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
    <meta name="apple-mobile-web-app-title" content="Solusi Teknologi Batam"/>
    <meta name="format-detection" content="telephone=no"/>`;

// Preconnect Links
const PRECONNECT = `    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
    <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com"/>`;

// Font Links
const FONTS = `    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600&display=swap" rel="stylesheet"/>`;

// Icon Links
const ICONS = `    <link rel="icon" type="image/x-icon" href="${RESOURCES.favicon}"/>
    <link rel="apple-touch-icon" sizes="180x180" href="${RESOURCES.appleIcon}"/>`;

// CSS Links
const CSS = `    <link rel="stylesheet" href="${RESOURCES.tailwindCSS}"/>
    <link rel="stylesheet" href="${RESOURCES.globalCSS}"/>`;

// Script Links
const SCRIPTS = `    <script src="${RESOURCES.globalJS}" defer></script>
    <script src="${RESOURCES.mainJS}" defer></script>
    <script src="${RESOURCES.sidebarJS}" defer></script>`;

// Skip Link HTML
const SKIP_LINK = `    <a href="#main-content" class="skip-link" style="position:absolute;left:-9999px;z-index:9999;padding:1em;background:#6366f1;color:#fff;text-decoration:none" onfocus="this.style.left='0'" onblur="this.style.left='-9999px'">Skip to content</a>`;

/**
 * Process single HTML file
 */
function processFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const fileName = path.basename(filePath);
        let totalModified = false;

        // Skip component files
        if (EXCLUDE_FILES.some(exclude => fileName.includes(exclude))) {
            return null;
        }

        // 1. Update viewport
        const viewportRegex = /<meta\s+[^>]*name\s*=\s*["']viewport["'][^>]*>/i;
        if (viewportRegex.test(content)) {
            if (!content.match(viewportRegex)[0].includes('viewport-fit=cover')) {
                content = content.replace(
                    viewportRegex,
                    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>'
                );
                totalModified = true;
            }
        } else {
            const charsetMatch = content.match(/<meta\s+charset\s*=\s*["']utf-8["'][^>]*>/i);
            if (charsetMatch) {
                content = content.replace(
                    charsetMatch[0],
                    charsetMatch[0] + '\n    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>'
                );
                totalModified = true;
            }
        }

        // 2. Add PWA meta tags
        if (!content.includes('theme-color')) {
            const viewportMatch = content.match(/<meta\s+name\s*=\s*["']viewport["'][^>]*>/i);
            if (viewportMatch) {
                content = content.replace(viewportMatch[0], viewportMatch[0] + '\n' + PWA_META);
                totalModified = true;
            }
        }

        // 3. Add preconnect
        if (!content.includes('preconnect')) {
            const titleMatch = content.match(/<title>.*?<\/title>/i);
            if (titleMatch) {
                content = content.replace(titleMatch[0], titleMatch[0] + '\n' + PRECONNECT);
                totalModified = true;
            }
        }

        // 4. Update CSS
        if (!content.includes('global-enhancements.css')) {
            if (content.includes('style.css')) {
                content = content.replace(/<link[^>]*style\.css[^>]*>/i, CSS.trim());
                totalModified = true;
            } else if (content.includes('tailwind-build.css')) {
                content = content.replace(/<link[^>]*tailwind-build\.css[^>]*>/i, CSS.trim());
                totalModified = true;
            } else {
                content = content.replace('</head>', CSS + '\n</head>');
                totalModified = true;
            }
        }

        // 5. Update scripts
        if (!content.includes('global-enhancements.js')) {
            if (content.includes('main.js')) {
                const mainJsRegex = /<script[^>]*main\.js[^>]*><\/script>/i;
                if (mainJsRegex.test(content)) {
                    content = content.replace(mainJsRegex, SCRIPTS.trim());
                    totalModified = true;
                } else {
                    content = content.replace('</body>', SCRIPTS + '\n</body>');
                    totalModified = true;
                }
            } else {
                content = content.replace('</body>', SCRIPTS + '\n</body>');
                totalModified = true;
            }
        }

        // 6. Add manifest
        if (!content.includes('manifest.webmanifest')) {
            const iconMatch = content.match(/<link[^>]*rel\s*=\s*["'](?:icon|apple-touch-icon)["'][^>]*>/i);
            if (iconMatch) {
                const lastIconIndex = content.lastIndexOf(iconMatch[0]) + iconMatch[0].length;
                content = content.slice(0, lastIconIndex) +
                    '\n    <link rel="manifest" href="' + RESOURCES.manifest + '"/>' +
                    content.slice(lastIconIndex);
                totalModified = true;
            } else {
                content = content.replace('</head>', `    <link rel="manifest" href="${RESOURCES.manifest}"/>\n</head>`);
                totalModified = true;
            }
        }

        // 7. Add icons
        if (!content.includes('itbatam.ico')) {
            const manifestMatch = content.match(/<link[^>]*manifest[^>]*>/i);
            if (manifestMatch) {
                content = content.replace(manifestMatch[0], ICONS.trim() + '\n    ' + manifestMatch[0]);
                totalModified = true;
            } else {
                content = content.replace('</head>', ICONS + '\n</head>');
                totalModified = true;
            }
        }

        // 8. Add fonts
        if (!content.includes('fonts.googleapis.com/css2')) {
            const preconnectMatch = content.match(/<link[^>]*preconnect[^>]*>/i);
            if (preconnectMatch) {
                const lastPreconnectIndex = content.lastIndexOf(preconnectMatch[0]) + preconnectMatch[0].length;
                content = content.slice(0, lastPreconnectIndex) + '\n' + FONTS + content.slice(lastPreconnectIndex);
                totalModified = true;
            }
        }

        // 9. Add skip link
        if (!content.includes('skip-link') && content.includes('<body')) {
            content = content.replace(/<body([^>]*)>/i, '<body$1>\n' + SKIP_LINK);
            totalModified = true;
        }

        // 10. Add main-content id
        if (content.includes('<main') && !content.includes('id="main-content"')) {
            content = content.replace(/<main([^>]*)>/i, '<main$1 id="main-content">');
            totalModified = true;
        }

        // 11. Optimize images
        content = content.replace(
            /<img((?![^>]*loading=)[^>]*)>/gi,
            (match, attrs) => {
                totalModified = true;
                return `<img${attrs} loading="lazy" decoding="async">`;
            }
        );

        // 12. Ensure scripts have defer
        content = content.replace(
            /<script([^>]*src="[^"]*\.js"[^>]*)(?!.*defer)([^>]*)>/gi,
            (match, p1, p2) => {
                totalModified = true;
                return `<script${p1} defer${p2}>`;
            }
        );

        if (totalModified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Updated: ${fileName}`);
            return true;
        } else {
            console.log(`⏭️  Skipped (already optimized): ${fileName}`);
            return false;
        }
    } catch (error) {
        console.error(`❌ Error processing ${path.basename(filePath)}:`, error.message);
        return false;
    }
}

/**
 * Main function
 */
function main() {
    console.log('\n🚀 PWA Optimization Script');
    console.log('============================\n');

    // Check if directory exists
    if (!fs.existsSync(ID_DIR)) {
        console.error(`❌ Directory not found: ${ID_DIR}`);
        console.error(`   Current working directory: ${process.cwd()}`);
        console.error('   Please run: cd c:\\ProjectProgram\\website\\faust.co.id');
        process.exit(1);
    }

    // Get all HTML files
    let files;
    try {
        files = fs.readdirSync(ID_DIR)
            .filter(file => file.endsWith('.html'))
            .map(file => path.join(ID_DIR, file));
    } catch (error) {
        console.error(`❌ Error reading directory: ${error.message}`);
        process.exit(1);
    }

    if (files.length === 0) {
        console.error('❌ No HTML files found in', ID_DIR);
        process.exit(1);
    }

    console.log(`📁 Found ${files.length} HTML files`);
    console.log(`📂 Directory: ${ID_DIR}\n`);
    console.log('🔄 Processing files...\n');

    let stats = {
        updated: 0,
        skipped: 0,
        errors: 0,
        excluded: 0
    };

    files.forEach(file => {
        const result = processFile(file);
        if (result === true) {
            stats.updated++;
        } else if (result === false) {
            stats.skipped++;
        } else if (result === null) {
            stats.excluded++;
        } else {
            stats.errors++;
        }
    });

    // Summary
    console.log('\n📊 Summary');
    console.log('==========');
    console.log(`   ✅ Updated:     ${stats.updated}`);
    console.log(`   ⏭️  Skipped:     ${stats.skipped}`);
    console.log(`   🚫 Excluded:    ${stats.excluded}`);
    console.log(`   ❌ Errors:      ${stats.errors}`);
    console.log(`   📄 Total:       ${files.length}`);
    console.log('\n✨ Optimization complete!\n');

    // Next steps
    if (stats.updated > 0) {
        console.log('📝 Next Steps:');
        console.log('   1. Test updated pages in browser');
        console.log('   2. Run Lighthouse audit');
        console.log('   3. Check PWA installability');
        console.log('   4. Verify service worker registration\n');
    }
}

// Run script
main();
