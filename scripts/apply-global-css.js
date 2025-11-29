/**
 * Script untuk memastikan semua file HTML menggunakan global-enhancements.css
 * Script ini mengambil referensi dari global-enhancements.css dan memastikan
 * semua file HTML sudah terhubung dengan benar
 *
 * Usage: node scripts/apply-global-css.js
 */

const fs = require('fs');
const path = require('path');

// Paths
const cwd = process.cwd();
const idDir = path.join(cwd, 'id');
const globalCSSPath = path.join(cwd, 'src', 'global-enhancements.css');
const tailwindCSSPath = path.join(cwd, 'src', 'tailwind-build.css');

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

console.log('\n🎨 Global CSS Analyzer & Applier');
console.log('==================================\n');
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
 * Check if file has required CSS links
 */
function checkCSSLinks(content) {
    const hasTailwind = content.includes('tailwind-build.css');
    const hasGlobal = content.includes('global-enhancements.css');
    const hasOldStyle = content.includes('style.css');

    return {
        hasTailwind,
        hasGlobal,
        hasOldStyle,
        isValid: hasTailwind && hasGlobal && !hasOldStyle
    };
}

/**
 * Check if file has required JS links
 */
function checkJSLinks(content) {
    const hasGlobalJS = content.includes('global-enhancements.js');
    const hasMainJS = content.includes('main.js');
    const hasSidebarJS = content.includes('load-right-sidebar.js');

    return {
        hasGlobalJS,
        hasMainJS,
        hasSidebarJS,
        isValid: hasGlobalJS && hasMainJS && hasSidebarJS
    };
}

/**
 * Fix CSS links in content
 */
function fixCSSLinks(content) {
    let modified = false;

    // Remove old style.css
    if (content.includes('style.css')) {
        content = content.replace(/<link[^>]*style\.css[^>]*>/gi, '');
        modified = true;
    }

    // Ensure tailwind-build.css exists
    if (!content.includes('tailwind-build.css')) {
        // Try to add before closing head
        content = content.replace('</head>',
            `    <link rel="stylesheet" href="${REQUIRED_CSS.tailwind}"/>\n</head>`);
        modified = true;
    }

    // Ensure global-enhancements.css exists
    if (!content.includes('global-enhancements.css')) {
        // Add after tailwind-build.css
        if (content.includes('tailwind-build.css')) {
            content = content.replace(
                /<link[^>]*tailwind-build\.css[^>]*>/i,
                `<link rel="stylesheet" href="${REQUIRED_CSS.tailwind}"/>\n    <link rel="stylesheet" href="${REQUIRED_CSS.global}"/>`
            );
        } else {
            // Add before closing head
            content = content.replace('</head>',
                `    <link rel="stylesheet" href="${REQUIRED_CSS.global}"/>\n</head>`);
        }
        modified = true;
    }

    return { content, modified };
}

/**
 * Fix JS links in content
 */
function fixJSLinks(content) {
    let modified = false;

    // Ensure global-enhancements.js exists
    if (!content.includes('global-enhancements.js')) {
        if (content.includes('main.js')) {
            content = content.replace(
                /<script[^>]*main\.js[^>]*><\/script>/i,
                `<script src="${REQUIRED_JS.global}" defer></script>\n    <script src="${REQUIRED_JS.main}" defer></script>\n    <script src="${REQUIRED_JS.sidebar}" defer></script>`
            );
        } else {
            // Add before closing body
            content = content.replace('</body>',
                `    <script src="${REQUIRED_JS.global}" defer></script>\n    <script src="${REQUIRED_JS.main}" defer></script>\n    <script src="${REQUIRED_JS.sidebar}" defer></script>\n</body>`);
        }
        modified = true;
    }

    return { content, modified };
}

/**
 * Process single HTML file
 */
function processFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const fileName = path.basename(filePath);
        let totalModified = false;

        // Skip component files
        if (fileName.includes('sidebar') || fileName.includes('header') || fileName.includes('footer')) {
            return null;
        }

        // Check current state
        const cssState = checkCSSLinks(content);
        const jsState = checkJSLinks(content);

        // Fix CSS
        const cssResult = fixCSSLinks(content);
        content = cssResult.content;
        if (cssResult.modified) totalModified = true;

        // Fix JS
        const jsResult = fixJSLinks(content);
        content = jsResult.content;
        if (jsResult.modified) totalModified = true;

        // Save if modified
        if (totalModified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ ${fileName}`);
            return {
                fileName,
                status: 'updated',
                css: cssState,
                js: jsState
            };
        } else {
            console.log(`⏭️  ${fileName} (already has global CSS)`);
            return {
                fileName,
                status: 'skipped',
                css: cssState,
                js: jsState
            };
        }
    } catch (error) {
        console.error(`❌ ${path.basename(filePath)}: ${error.message}`);
        return {
            fileName: path.basename(filePath),
            status: 'error',
            error: error.message
        };
    }
}

/**
 * Main function
 */
function main() {
    if (!fs.existsSync(idDir)) {
        console.error('❌ Directory tidak ditemukan:', idDir);
        process.exit(1);
    }

    // Get all HTML files
    const files = fs.readdirSync(idDir)
        .filter(f => f.endsWith('.html'))
        .map(f => path.join(idDir, f));

    if (files.length === 0) {
        console.error('❌ No HTML files found');
        process.exit(1);
    }

    console.log(`\n📁 Found ${files.length} HTML files\n`);
    console.log('🔄 Processing files...\n');

    const results = {
        updated: [],
        skipped: [],
        errors: [],
        excluded: []
    };

    files.forEach(file => {
        const result = processFile(file);
        if (!result) {
            results.excluded.push(path.basename(file));
        } else if (result.status === 'updated') {
            results.updated.push(result);
        } else if (result.status === 'skipped') {
            results.skipped.push(result);
        } else {
            results.errors.push(result);
        }
    });

    // Summary
    console.log('\n📊 Summary');
    console.log('==========');
    console.log(`   ✅ Updated:     ${results.updated.length}`);
    console.log(`   ⏭️  Skipped:     ${results.skipped.length}`);
    console.log(`   🚫 Excluded:    ${results.excluded.length}`);
    console.log(`   ❌ Errors:      ${results.errors.length}`);
    console.log(`   📄 Total:       ${files.length}`);

    // Detailed report
    if (results.updated.length > 0) {
        console.log('\n📝 Updated Files:');
        results.updated.forEach(r => {
            console.log(`   ✅ ${r.fileName}`);
            if (!r.css.hasGlobal) console.log(`      ⚠️  Missing global-enhancements.css`);
            if (!r.js.hasGlobalJS) console.log(`      ⚠️  Missing global-enhancements.js`);
        });
    }

    if (results.skipped.length > 0 && results.skipped.some(r => !r.css.isValid || !r.js.isValid)) {
        console.log('\n⚠️  Files with issues (skipped but need attention):');
        results.skipped.forEach(r => {
            if (!r.css.isValid || !r.js.isValid) {
                console.log(`   ⚠️  ${r.fileName}`);
                if (!r.css.hasTailwind) console.log(`      Missing tailwind-build.css`);
                if (!r.css.hasGlobal) console.log(`      Missing global-enhancements.css`);
                if (r.css.hasOldStyle) console.log(`      Still using old style.css`);
                if (!r.js.hasGlobalJS) console.log(`      Missing global-enhancements.js`);
            }
        });
    }

    console.log('\n✨ Complete!\n');

    // Recommendations
    if (results.updated.length > 0) {
        console.log('💡 Recommendations:');
        console.log('   1. Test updated pages in browser');
        console.log('   2. Verify CSS is loading correctly');
        console.log('   3. Check browser console for errors');
        console.log('   4. Run Lighthouse audit\n');
    }
}

// Run
main();
