/**
 * Script untuk menerapkan optimasi Mobile-First PWA ke semua halaman HTML
 */

const fs = require('fs');
const path = require('path');

// Get the project root directory
const PROJECT_ROOT = process.cwd();
const ID_DIR = path.join(PROJECT_ROOT, 'id');

// Check if directory exists
if (!fs.existsSync(ID_DIR)) {
    console.error(`❌ Directory not found: ${ID_DIR}`);
    process.exit(1);
}

const GLOBAL_CSS = '../src/global-enhancements.css';
const GLOBAL_JS = '../src/global-enhancements.js';
const TAILWIND_CSS = '../src/tailwind-build.css';
const MAIN_JS = '../src/main.js';
const LOAD_SIDEBAR_JS = '../src/load-right-sidebar.js';
const MANIFEST = '../manifest.webmanifest';

// PWA Meta Tags Template
const PWA_META_TAGS = `    <meta name="theme-color" content="#6366f1"/>
    <meta name="color-scheme" content="light"/>
    <meta name="mobile-web-app-capable" content="yes"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
    <meta name="apple-mobile-web-app-title" content="Solusi Teknologi Batam"/>
    <meta name="format-detection" content="telephone=no"/>`;

// Preconnect Links
const PRECONNECT_LINKS = `    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
    <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com"/>`;

// Font Links
const FONT_LINKS = `    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600&display=swap" rel="stylesheet"/>`;

// Icon Links
const ICON_LINKS = `    <link rel="icon" type="image/x-icon" href="../src/itbatam.ico"/>
    <link rel="apple-touch-icon" sizes="180x180" href="../src/logo-solusi-teknologi-BATAM.png"/>`;

// CSS Links
const CSS_LINKS = `    <link rel="stylesheet" href="${TAILWIND_CSS}"/>
    <link rel="stylesheet" href="${GLOBAL_CSS}"/>`;

// Script Links
const SCRIPT_LINKS = `    <script src="${GLOBAL_JS}" defer></script>
    <script src="${MAIN_JS}" defer></script>
    <script src="${LOAD_SIDEBAR_JS}" defer></script>`;

function updateHTMLFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const fileName = path.basename(filePath);
        let modified = false;

        // Skip if it's a component file
        if (fileName.includes('sidebar') || fileName.includes('header') || fileName.includes('footer')) {
            return null;
        }

        // 1. Ensure viewport meta tag is correct
        const viewportRegex = /<meta\s+name="viewport"[^>]*>/i;
        if (viewportRegex.test(content)) {
            if (!content.match(viewportRegex)[0].includes('viewport-fit=cover')) {
                content = content.replace(
                    viewportRegex,
                    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>'
                );
                modified = true;
            }
        } else {
            // Add viewport if missing
            const charsetMatch = content.match(/<meta\s+charset="utf-8"[^>]*>/i);
            if (charsetMatch) {
                content = content.replace(
                    charsetMatch[0],
                    charsetMatch[0] + '\n    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>'
                );
                modified = true;
            }
        }

        // 2. Add PWA meta tags if missing
        if (!content.includes('theme-color')) {
            const viewportMatch = content.match(/<meta\s+name="viewport"[^>]*>/i);
            if (viewportMatch) {
                content = content.replace(
                    viewportMatch[0],
                    viewportMatch[0] + '\n' + PWA_META_TAGS
                );
                modified = true;
            }
        }

        // 3. Ensure manifest link exists
        if (!content.includes('manifest.webmanifest')) {
            const iconMatch = content.match(/<link[^>]*rel="(?:icon|apple-touch-icon)"[^>]*>/i);
            if (iconMatch) {
                const lastIconIndex = content.lastIndexOf(iconMatch[0]) + iconMatch[0].length;
                content = content.slice(0, lastIconIndex) +
                    '\n    <link rel="manifest" href="' + MANIFEST + '"/>' +
                    content.slice(lastIconIndex);
                modified = true;
            } else {
                // Add before closing head
                content = content.replace('</head>', `    <link rel="manifest" href="${MANIFEST}"/>\n</head>`);
                modified = true;
            }
        }

        // 4. Add preconnect links if missing
        if (!content.includes('preconnect')) {
            const titleMatch = content.match(/<title>.*?<\/title>/i);
            if (titleMatch) {
                content = content.replace(
                    titleMatch[0],
                    titleMatch[0] + '\n' + PRECONNECT_LINKS
                );
                modified = true;
            }
        }

        // 5. Ensure global CSS is included
        if (!content.includes('global-enhancements.css')) {
            if (content.includes('tailwind-build.css')) {
                content = content.replace(
                    /<link[^>]*tailwind-build\.css[^>]*>/i,
                    CSS_LINKS.trim()
                );
                modified = true;
            } else {
                // Add CSS links before closing head
                content = content.replace(
                    '</head>',
                    CSS_LINKS + '\n</head>'
                );
                modified = true;
            }
        }

        // 6. Ensure global JS is included
        if (!content.includes('global-enhancements.js')) {
            // Check if main.js exists
            if (content.includes('main.js')) {
                const mainJsRegex = /<script[^>]*main\.js[^>]*><\/script>/i;
                if (mainJsRegex.test(content)) {
                    content = content.replace(mainJsRegex, SCRIPT_LINKS.trim());
                } else {
                    // Add before closing body
                    content = content.replace('</body>', SCRIPT_LINKS + '\n</body>');
                }
                modified = true;
            } else {
                // Add scripts before closing body
                content = content.replace('</body>', SCRIPT_LINKS + '\n</body>');
                modified = true;
            }
        }

        // 7. Ensure font links exist
        if (!content.includes('fonts.googleapis.com')) {
            const preconnectMatch = content.match(/<link[^>]*preconnect[^>]*>/i);
            if (preconnectMatch) {
                const lastPreconnectIndex = content.lastIndexOf(preconnectMatch[0]) + preconnectMatch[0].length;
                content = content.slice(0, lastPreconnectIndex) +
                    '\n' + FONT_LINKS +
                    content.slice(lastPreconnectIndex);
                modified = true;
            }
        }

        // 8. Ensure icon links exist
        if (!content.includes('itbatam.ico')) {
            const manifestMatch = content.match(/<link[^>]*manifest[^>]*>/i);
            if (manifestMatch) {
                content = content.replace(
                    manifestMatch[0],
                    ICON_LINKS.trim() + '\n    ' + manifestMatch[0]
                );
                modified = true;
            }
        }

        // 9. Add skip link for accessibility
        if (!content.includes('skip-link') && content.includes('<body')) {
            content = content.replace(
                /<body([^>]*)>/i,
                '<body$1>\n    <a href="#main-content" class="skip-link" style="position:absolute;left:-9999px;z-index:9999;padding:1em;background:#6366f1;color:#fff;text-decoration:none" onfocus="this.style.left=\'0\'" onblur="this.style.left=\'-9999px\'">Skip to content</a>'
            );
            modified = true;
        }

        // 10. Ensure main has id="main-content"
        if (content.includes('<main') && !content.includes('id="main-content"')) {
            content = content.replace(
                /<main([^>]*)>/i,
                '<main$1 id="main-content">'
            );
            modified = true;
        }

        // 11. Ensure all scripts have defer attribute (except inline)
        content = content.replace(
            /<script([^>]*src="[^"]*\.js"[^>]*)(?!.*defer)([^>]*)>/gi,
            '<script$1 defer$2>'
        );

        // 12. Ensure all images have loading="lazy" and decoding="async" (if not already present)
        content = content.replace(
            /<img((?![^>]*loading=)[^>]*)>/gi,
            '<img$1 loading="lazy" decoding="async">'
        );

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Updated: ${fileName}`);
            return true;
        } else {
            console.log(`⏭️  Skipped (already optimized): ${fileName}`);
            return false;
        }
    } catch (error) {
        console.error(`❌ Error updating ${filePath}:`, error.message);
        return false;
    }
}

function processAllHTMLFiles() {
    try {
        const files = fs.readdirSync(ID_DIR)
            .filter(file => file.endsWith('.html'))
            .filter(file => !file.includes('sidebar') && !file.includes('header') && !file.includes('footer'))
            .map(file => path.join(ID_DIR, file));

        console.log(`\n🚀 Starting PWA optimization for ${files.length} HTML files...\n`);

        let updated = 0;
        let skipped = 0;
        let errors = 0;

        files.forEach(file => {
            const result = updateHTMLFile(file);
            if (result === true) updated++;
            else if (result === false) skipped++;
            else if (result === null) {
                // Component file, skip silently
            } else errors++;
        });

        console.log(`\n📊 Summary:`);
        console.log(`   ✅ Updated: ${updated}`);
        console.log(`   ⏭️  Skipped: ${skipped}`);
        console.log(`   ❌ Errors: ${errors}`);
        console.log(`\n✨ PWA optimization complete!\n`);
    } catch (error) {
        console.error('❌ Fatal error:', error.message);
        process.exit(1);
    }
}

// Run the script
processAllHTMLFiles();
