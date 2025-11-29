/**
 * Script untuk mengecek status semua file HTML
 * Memverifikasi apakah semua file sudah menggunakan global-enhancements.css
 *
 * Usage: node check-all-html-status.js
 */

const fs = require('fs');

// Folders to check
const folders = ['id', 'en'];
const excludeFiles = ['sidebar.html', 'header.html', 'footer.html', 'right-sidebar.html'];

// Required elements
const REQUIRED = {
    css: {
        tailwind: 'tailwind-build.css',
        global: 'global-enhancements.css'
    },
    js: {
        global: 'global-enhancements.js',
        main: 'main.js',
        sidebar: 'load-right-sidebar.js'
    },
    meta: {
        viewport: 'viewport-fit=cover',
        themeColor: 'theme-color',
        manifest: 'manifest.webmanifest'
    }
};

/**
 * Check single HTML file
 */
function checkFile(folder, fileName) {
    const filePath = folder + '/' + fileName;

    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const issues = [];
        const warnings = [];

        // Check CSS
        const hasTailwind = content.includes(REQUIRED.css.tailwind);
        const hasGlobalCSS = content.includes(REQUIRED.css.global);
        const hasOldStyle = content.includes('style.css');

        if (!hasTailwind) issues.push('Missing tailwind-build.css');
        if (!hasGlobalCSS) issues.push('Missing global-enhancements.css');
        if (hasOldStyle) warnings.push('Still using old style.css');

        // Check JS
        const hasGlobalJS = content.includes(REQUIRED.js.global);
        const hasMainJS = content.includes(REQUIRED.js.main);
        const hasSidebarJS = content.includes(REQUIRED.js.sidebar);

        if (!hasGlobalJS) issues.push('Missing global-enhancements.js');
        if (!hasMainJS) warnings.push('Missing main.js');
        if (!hasSidebarJS) warnings.push('Missing load-right-sidebar.js');

        // Check PWA Meta
        const hasViewportFit = content.includes(REQUIRED.meta.viewport);
        const hasThemeColor = content.includes(REQUIRED.meta.themeColor);
        const hasManifest = content.includes(REQUIRED.meta.manifest);

        if (!hasViewportFit) issues.push('Missing viewport-fit=cover');
        if (!hasThemeColor) issues.push('Missing theme-color meta');
        if (!hasManifest) issues.push('Missing manifest link');

        // Check other optimizations
        const hasPreconnect = content.includes('preconnect');
        const hasIcons = content.includes('itbatam.ico');
        const hasSkipLink = content.includes('skip-link');
        const hasMainContent = content.includes('id="main-content"');
        const hasLazyImages = content.includes('loading="lazy"');
        const hasDeferScripts = content.match(/<script[^>]*src="[^"]*\.js"[^>]*defer[^>]*>/i);

        if (!hasPreconnect) warnings.push('Missing preconnect links');
        if (!hasIcons) warnings.push('Missing icon links');
        if (!hasSkipLink) warnings.push('Missing skip link');
        if (!hasMainContent && content.includes('<main')) warnings.push('Missing id="main-content"');
        if (!hasLazyImages && content.includes('<img')) warnings.push('Images missing lazy loading');
        if (!hasDeferScripts && content.includes('<script')) warnings.push('Scripts missing defer');

        return {
            fileName,
            folder,
            status: issues.length === 0 ? 'ok' : 'needs-fix',
            issues,
            warnings,
            hasTailwind,
            hasGlobalCSS,
            hasGlobalJS,
            hasOldStyle
        };
    } catch (error) {
        return {
            fileName,
            folder,
            status: 'error',
            error: error.message,
            issues: ['File read error'],
            warnings: []
        };
    }
}

/**
 * Main function
 */
function main() {
    console.log('\n🔍 HTML Files Status Checker');
    console.log('=============================\n');

    const results = {
        id: { ok: [], needsFix: [], errors: [], total: 0 },
        en: { ok: [], needsFix: [], errors: [], total: 0 }
    };

    folders.forEach(folder => {
        if (!fs.existsSync(folder)) {
            console.error(`❌ Folder tidak ditemukan: ${folder}`);
            return;
        }

        const files = fs.readdirSync(folder)
            .filter(f => f.endsWith('.html'))
            .filter(f => !excludeFiles.some(ex => f.includes(ex)));

        console.log(`\n📁 Checking ${folder}/ folder (${files.length} files)...\n`);

        files.forEach(fileName => {
            const result = checkFile(folder, fileName);
            results[folder].total++;

            if (result.status === 'error') {
                results[folder].errors.push(result);
                console.log(`❌ ${fileName} - ${result.error}`);
            } else if (result.status === 'needs-fix') {
                results[folder].needsFix.push(result);
                const issueCount = result.issues.length;
                const warnCount = result.warnings.length;
                console.log(`⚠️  ${fileName} - ${issueCount} issue(s), ${warnCount} warning(s)`);
            } else {
                results[folder].ok.push(result);
                if (result.warnings.length > 0) {
                    console.log(`✅ ${fileName} - OK (${result.warnings.length} warning(s))`);
                } else {
                    console.log(`✅ ${fileName} - OK`);
                }
            }
        });
    });

    // Summary
    console.log('\n\n📊 Summary');
    console.log('==========\n');

    folders.forEach(folder => {
        const r = results[folder];
        const okPercent = r.total > 0 ? ((r.ok.length / r.total) * 100).toFixed(1) : '0.0';
        const needsFixPercent = r.total > 0 ? ((r.needsFix.length / r.total) * 100).toFixed(1) : '0.0';
        const errorPercent = r.total > 0 ? ((r.errors.length / r.total) * 100).toFixed(1) : '0.0';

        console.log(`📂 ${folder.toUpperCase()}/ folder:`);
        console.log(`   ✅ OK:              ${r.ok.length} (${okPercent}%)`);
        console.log(`   ⚠️  Needs Fix:       ${r.needsFix.length} (${needsFixPercent}%)`);
        console.log(`   ❌ Errors:          ${r.errors.length} (${errorPercent}%)`);
        console.log(`   📄 Total:           ${r.total}`);
        console.log('');
    });

    // Detailed issues
    const totalNeedsFix = results.id.needsFix.length + results.en.needsFix.length;
    if (totalNeedsFix > 0) {
        console.log('\n⚠️  Top 10 Files that need fixing:\n');

        folders.forEach(folder => {
            if (results[folder].needsFix.length > 0) {
                console.log(`\n📂 ${folder.toUpperCase()}/ folder:`);
                results[folder].needsFix.slice(0, 10).forEach(result => {
                    console.log(`\n   📄 ${result.fileName}`);
                    if (result.issues.length > 0) {
                        result.issues.slice(0, 3).forEach(issue => console.log(`      ❌ ${issue}`));
                        if (result.issues.length > 3) console.log(`      ... and ${result.issues.length - 3} more`);
                    }
                });
            }
        });
    }

    // Common issues summary
    console.log('\n\n📋 Common Issues Summary');
    console.log('=======================\n');

    const allNeedsFix = [...results.id.needsFix, ...results.en.needsFix];
    const issueCounts = {};

    allNeedsFix.forEach(result => {
        result.issues.forEach(issue => {
            issueCounts[issue] = (issueCounts[issue] || 0) + 1;
        });
    });

    const sortedIssues = Object.entries(issueCounts)
        .sort((a, b) => b[1] - a[1]);

    if (sortedIssues.length > 0) {
        sortedIssues.forEach(([issue, count]) => {
            console.log(`   ${issue}: ${count} file(s)`);
        });
    } else {
        console.log('   No common issues found!');
    }

    // Final status
    const totalFiles = results.id.total + results.en.total;
    const totalOk = results.id.ok.length + results.en.ok.length;
    const totalOkPercent = totalFiles > 0 ? ((totalOk / totalFiles) * 100).toFixed(1) : '0.0';
    const totalNeedsFix = results.id.needsFix.length + results.en.needsFix.length;

    console.log('\n\n✨ Final Status');
    console.log('==============\n');
    console.log(`   Total Files:     ${totalFiles}`);
    console.log(`   ✅ OK:           ${totalOk} (${totalOkPercent}%)`);
    console.log(`   ⚠️  Needs Fix:    ${totalNeedsFix}`);
    console.log(`   ❌ Errors:       ${results.id.errors.length + results.en.errors.length}\n`);

    if (totalOkPercent === '100.0') {
        console.log('🎉 All files are optimized!\n');
    } else {
        console.log(`📝 ${totalNeedsFix} file(s) need attention.\n`);
        console.log('💡 Run optimization scripts:');
        console.log('   - node apply-global-css.js (for id/ folder)');
        console.log('   - node apply-global-css-en.js (for en/ folder)\n');
    }
}

// Run
main();
