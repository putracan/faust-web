/**
 * Script untuk memastikan semua file HTML menggunakan global-enhancements.css
 * Script ini mengambil referensi dari global-enhancements.css dan memastikan
 * semua file HTML sudah terhubung dengan benar
 *
 * Usage: node apply-global-css.js
 */

const fs = require('fs');

// Paths - gunakan path relatif dari current directory
const idDir = 'id';
const globalCSSPath = 'src/global-enhancements.css';
const tailwindCSSPath = 'src/tailwind-build.css';

console.log('\n🎨 Global CSS Analyzer & Applier');
console.log('==================================\n');

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

// CSS Links yang harus ada
const REQUIRED_CSS = {
    tailwind: '../src/tailwind-build.css',
    global: '../src/global-enhancements.css'
};

// Script Links yang harus ada
const REQUIRED_JS = {
    global: '../src/global-enhancements.js',
    main: '../src/main.js',
    sidebar: '../src/load-right-sidebar.js'
};

/**
 * Process single HTML file
 */
function processFile(fileName) {
    const filePath = idDir + '/' + fileName;

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
    if (!fs.existsSync(idDir)) {
        console.error('❌ Directory tidak ditemukan:', idDir);
        console.error('   Current directory:', process.cwd());
        process.exit(1);
    }

    // Get all HTML files
    let files;
    try {
        files = fs.readdirSync(idDir)
            .filter(f => f.endsWith('.html'));
    } catch (error) {
        console.error('❌ Error reading directory:', error.message);
        process.exit(1);
    }

    if (files.length === 0) {
        console.error('❌ No HTML files found');
        process.exit(1);
    }

    console.log(`📁 Found ${files.length} HTML files\n`);
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
        console.log('   4. Run Lighthouse audit\n');
    }
}

// Run
main();
