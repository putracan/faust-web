/**
 * Script untuk memastikan semua file HTML di folder EN menggunakan global-enhancements.css
 * Script ini mengambil referensi dari global-enhancements.css dan memastikan
 * semua file HTML di folder EN sudah terhubung dengan benar
 *
 * Usage: node apply-global-css-en.js
 */

const fs = require('fs');

// Paths - gunakan path relatif dari current directory
const enDir = 'en';
const globalCSSPath = 'src/global-enhancements.css';
const tailwindCSSPath = 'src/tailwind-build.css';

console.log('\n🎨 Global CSS Analyzer & Applier (EN Folder)');
console.log('==============================================\n');

// Validasi file CSS global
if (!fs.existsSync(globalCSSPath)) {
    console.error('❌ File global-enhancements.css tidak ditemukan:', globalCSSPath);
    process.exit(1);
}

if (!fs.existsSync(tailwindCSSPath)) {
    console.error('❌ File tailwind-build.css tidak ditemukan:', tailwindCSSPath);
    process.exit(1);
}

// Baca informasi dari global-enhancements.css
const globalCSSContent = fs.readFileSync(globalCSSPath, 'utf8');
const cssSize = (fs.statSync(globalCSSPath).size / 1024).toFixed(2);
const cssLines = globalCSSContent.split('\n').length;

// Deteksi fitur CSS yang tersedia
const cssFeatures = {
    hasVariables: /:root\s*\{/.test(globalCSSContent),
    hasGradients: /gradient/.test(globalCSSContent),
    hasAnimations: /@keyframes/.test(globalCSSContent),
    hasMediaQueries: /@media/.test(globalCSSContent),
    hasPWA: /theme-color|mobile-web-app/.test(globalCSSContent),
    hasAccessibility: /skip-link|aria-|focus-visible/.test(globalCSSContent)
};

console.log('📄 File: global-enhancements.css');
console.log(`   Size: ${cssSize} KB`);
console.log(`   Lines: ${cssLines}`);
console.log('\n✨ Features detected:');
console.log(`   ${cssFeatures.hasVariables ? '✅' : '❌'} CSS Variables`);
console.log(`   ${cssFeatures.hasGradients ? '✅' : '❌'} Gradients`);
console.log(`   ${cssFeatures.hasAnimations ? '✅' : '❌'} Animations`);
console.log(`   ${cssFeatures.hasMediaQueries ? '✅' : '❌'} Media Queries`);
console.log(`   ${cssFeatures.hasPWA ? '✅' : '❌'} PWA Styles`);
console.log(`   ${cssFeatures.hasAccessibility ? '✅' : '❌'} Accessibility\n`);

// CSS Links yang harus ada (path relatif dari folder en/)
const REQUIRED_CSS = {
    tailwind: '../src/tailwind-build.css',
    global: '../src/global-enhancements.css'
};

// Script Links yang harus ada (path relatif dari folder en/)
const REQUIRED_JS = {
    global: '../src/global-enhancements.js',
    main: '../src/main.js',
    sidebar: '../src/load-right-sidebar.js'
};

/**
 * Process single HTML file
 */
function processFile(fileName) {
    const filePath = enDir + '/' + fileName;

    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let totalModified = false;

        // Skip component files
        if (fileName.includes('sidebar') || fileName.includes('header') || fileName.includes('footer')) {
            return null;
        }

        // 1. Remove old style.css
        if (content.includes('style.css')) {
            content = content.replace(/<link[^>]*style\.css[^>]*>/gi, '');
            totalModified = true;
        }

        // 2. Ensure tailwind-build.css exists
        if (!content.includes('tailwind-build.css')) {
            content = content.replace('</head>',
                `    <link rel="stylesheet" href="${REQUIRED_CSS.tailwind}"/>\n</head>`);
            totalModified = true;
        }

        // 3. Ensure global-enhancements.css exists
        if (!content.includes('global-enhancements.css')) {
            if (content.includes('tailwind-build.css')) {
                content = content.replace(
                    /<link[^>]*tailwind-build\.css[^>]*>/i,
                    `<link rel="stylesheet" href="${REQUIRED_CSS.tailwind}"/>\n    <link rel="stylesheet" href="${REQUIRED_CSS.global}"/>`
                );
            } else {
                content = content.replace('</head>',
                    `    <link rel="stylesheet" href="${REQUIRED_CSS.global}"/>\n</head>`);
            }
            totalModified = true;
        }

        // 4. Ensure global-enhancements.js exists
        if (!content.includes('global-enhancements.js')) {
            if (content.includes('main.js')) {
                content = content.replace(
                    /<script[^>]*main\.js[^>]*><\/script>/i,
                    `<script src="${REQUIRED_JS.global}" defer></script>\n    <script src="${REQUIRED_JS.main}" defer></script>\n    <script src="${REQUIRED_JS.sidebar}" defer></script>`
                );
            } else {
                content = content.replace('</body>',
                    `    <script src="${REQUIRED_JS.global}" defer></script>\n    <script src="${REQUIRED_JS.main}" defer></script>\n    <script src="${REQUIRED_JS.sidebar}" defer></script>\n</body>`);
            }
            totalModified = true;
        }

        // 5. Ensure PWA meta tags (optional but recommended)
        if (!content.includes('theme-color')) {
            const viewportMatch = content.match(/<meta\s+name\s*=\s*["']viewport["'][^>]*>/i);
            if (viewportMatch) {
                const pwaMeta = `    <meta name="theme-color" content="#6366f1"/>
    <meta name="color-scheme" content="light"/>
    <meta name="mobile-web-app-capable" content="yes"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
    <meta name="apple-mobile-web-app-title" content="Solusi Teknologi Batam"/>
    <meta name="format-detection" content="telephone=no"/>`;
                content = content.replace(viewportMatch[0], viewportMatch[0] + '\n' + pwaMeta);
                totalModified = true;
            }
        }

        // 6. Ensure manifest link
        if (!content.includes('manifest.webmanifest')) {
            content = content.replace('</head>',
                '    <link rel="manifest" href="../manifest.webmanifest"/>\n</head>');
            totalModified = true;
        }

        // 7. Ensure icons
        if (!content.includes('itbatam.ico')) {
            const manifestMatch = content.match(/<link[^>]*manifest[^>]*>/i);
            if (manifestMatch) {
                content = content.replace(
                    manifestMatch[0],
                    '    <link rel="icon" type="image/x-icon" href="../src/itbatam.ico"/>\n    <link rel="apple-touch-icon" sizes="180x180" href="../src/logo-solusi-teknologi-BATAM.png"/>\n    ' + manifestMatch[0]
                );
            } else {
                content = content.replace('</head>',
                    '    <link rel="icon" type="image/x-icon" href="../src/itbatam.ico"/>\n    <link rel="apple-touch-icon" sizes="180x180" href="../src/logo-solusi-teknologi-BATAM.png"/>\n</head>');
            }
            totalModified = true;
        }

        // 8. Ensure preconnect links
        if (!content.includes('preconnect')) {
            const titleMatch = content.match(/<title>.*?<\/title>/i);
            if (titleMatch) {
                const preconnect = `    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
    <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com"/>`;
                content = content.replace(titleMatch[0], titleMatch[0] + '\n' + preconnect);
                totalModified = true;
            }
        }

        // 9. Ensure fonts
        if (!content.includes('fonts.googleapis.com/css2')) {
            const preconnectMatch = content.match(/<link[^>]*preconnect[^>]*>/i);
            if (preconnectMatch) {
                const lastPreconnect = content.lastIndexOf(preconnectMatch[0]) + preconnectMatch[0].length;
                content = content.slice(0, lastPreconnect) +
                    '\n    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600&display=swap" rel="stylesheet"/>' +
                    content.slice(lastPreconnect);
                totalModified = true;
            }
        }

        // 10. Ensure viewport has viewport-fit=cover
        if (content.includes('viewport') && !content.includes('viewport-fit=cover')) {
            content = content.replace(
                /<meta\s+[^>]*name\s*=\s*["']viewport["'][^>]*>/i,
                '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>'
            );
            totalModified = true;
        }

        // 11. Add skip link for accessibility
        if (!content.includes('skip-link') && content.includes('<body')) {
            content = content.replace(
                /<body([^>]*)>/i,
                '<body$1>\n    <a href="#main-content" class="skip-link" style="position:absolute;left:-9999px;z-index:9999;padding:1em;background:#6366f1;color:#fff;text-decoration:none" onfocus="this.style.left=\'0\'" onblur="this.style.left=\'-9999px\'">Skip to content</a>'
            );
            totalModified = true;
        }

        // 12. Ensure main has id="main-content"
        if (content.includes('<main') && !content.includes('id="main-content"')) {
            content = content.replace(/<main([^>]*)>/i, '<main$1 id="main-content">');
            totalModified = true;
        }

        // 13. Optimize images
        content = content.replace(
            /<img((?![^>]*loading=)[^>]*)>/gi,
            (match, attrs) => {
                totalModified = true;
                return `<img${attrs} loading="lazy" decoding="async">`;
            }
        );

        // 14. Ensure scripts have defer
        content = content.replace(
            /<script([^>]*src="[^"]*\.js"[^>]*)(?!.*defer)([^>]*)>/gi,
            (match, p1, p2) => {
                totalModified = true;
                return `<script${p1} defer${p2}>`;
            }
        );

        if (totalModified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ ${fileName}`);
            return { fileName, status: 'updated' };
        } else {
            console.log(`⏭️  ${fileName} (already has global CSS)`);
            return { fileName, status: 'skipped' };
        }
    } catch (error) {
        console.error(`❌ ${fileName}: ${error.message}`);
        return { fileName, status: 'error', error: error.message };
    }
}

/**
 * Main function
 */
function main() {
    if (!fs.existsSync(enDir)) {
        console.error('❌ Directory tidak ditemukan:', enDir);
        console.error('   Current directory:', process.cwd());
        process.exit(1);
    }

    // Get all HTML files
    let files;
    try {
        files = fs.readdirSync(enDir)
            .filter(f => f.endsWith('.html'));
    } catch (error) {
        console.error('❌ Error reading directory:', error.message);
        process.exit(1);
    }

    if (files.length === 0) {
        console.error('❌ No HTML files found in', enDir);
        process.exit(1);
    }

    console.log(`📁 Found ${files.length} HTML files in EN folder\n`);
    console.log('🔄 Processing files...\n');

    const results = {
        updated: 0,
        skipped: 0,
        errors: 0,
        excluded: 0
    };

    files.forEach(file => {
        const result = processFile(file);
        if (!result) {
            results.excluded++;
        } else if (result.status === 'updated') {
            results.updated++;
        } else if (result.status === 'skipped') {
            results.skipped++;
        } else {
            results.errors++;
        }
    });

    // Summary
    console.log('\n📊 Summary');
    console.log('==========');
    console.log(`   ✅ Updated:     ${results.updated}`);
    console.log(`   ⏭️  Skipped:     ${results.skipped}`);
    console.log(`   🚫 Excluded:    ${results.excluded}`);
    console.log(`   ❌ Errors:      ${results.errors}`);
    console.log(`   📄 Total:       ${files.length}`);
    console.log('\n✨ Complete!\n');

    // Recommendations
    if (results.updated > 0) {
        console.log('💡 Recommendations:');
        console.log('   1. Test updated pages in browser');
        console.log('   2. Verify CSS is loading correctly');
        console.log('   3. Check browser console for errors');
        console.log('   4. Run Lighthouse audit');
        console.log('   5. Test both ID and EN versions\n');
    }
}

// Run
main();
