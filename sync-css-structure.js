/**
 * Script untuk menyamakan struktur CSS semua halaman dengan index.html
 * Memastikan urutan dan struktur CSS konsisten di semua file
 *
 * Usage: node sync-css-structure.js
 */

const fs = require('fs');

// Struktur CSS yang benar (berdasarkan index.html)
const CSS_STRUCTURE = {
    id: {
        // Urutan yang benar untuk folder id/
        preconnect: [
            '<link rel="preconnect" href="https://fonts.googleapis.com"/>',
            '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>'
        ],
        fonts: '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600&display=swap" rel="stylesheet"/>',
        fontAwesome: '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer"/>',
        icons: [
            '<link rel="icon" type="image/x-icon" href="../src/itbatam.ico"/>',
            '<link rel="apple-touch-icon" sizes="180x180" href="../src/logo-solusi-teknologi-BATAM.png"/>'
        ],
        manifest: '<link rel="manifest" href="../manifest.webmanifest"/>',
        tailwind: '<link rel="stylesheet" href="../src/tailwind-build.css"/>',
        global: '<link rel="stylesheet" href="../src/global-enhancements.css"/>'
    },
    en: {
        // Urutan yang benar untuk folder en/
        preconnect: [
            '<link rel="preconnect" href="https://fonts.googleapis.com"/>',
            '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>',
            '<link rel="dns-prefetch" href="https://cdnjs.cloudflare.com"/>'
        ],
        fonts: '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>',
        fontAwesome: '<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet"/>',
        icons: [
            '<link rel="icon" type="image/x-icon" href="../src/itbatam.ico"/>',
            '<link rel="apple-touch-icon" sizes="180x180" href="../src/logo-solusi-teknologi-BATAM.png"/>'
        ],
        manifest: '<link rel="manifest" href="../manifest.webmanifest"/>',
        tailwind: '<link rel="stylesheet" href="../src/tailwind-build.css"/>',
        global: '<link rel="stylesheet" href="../src/global-enhancements.css"/>'
    }
};

/**
 * Extract CSS links from content
 */
function extractCSSLinks(content) {
    const links = {
        preconnect: [],
        fonts: null,
        fontAwesome: null,
        icons: [],
        manifest: null,
        tailwind: null,
        global: null,
        other: []
    };

    // Extract all link tags
    const linkRegex = /<link[^>]*>/gi;
    const matches = content.match(linkRegex) || [];

    matches.forEach(link => {
        if (link.includes('preconnect')) {
            links.preconnect.push(link);
        } else if (link.includes('fonts.googleapis.com/css2')) {
            links.fonts = link;
        } else if (link.includes('font-awesome') || link.includes('fontawesome')) {
            links.fontAwesome = link;
        } else if (link.includes('itbatam.ico') || link.includes('apple-touch-icon')) {
            links.icons.push(link);
        } else if (link.includes('manifest.webmanifest')) {
            links.manifest = link;
        } else if (link.includes('tailwind-build.css')) {
            links.tailwind = link;
        } else if (link.includes('global-enhancements.css')) {
            links.global = link;
        } else if (link.includes('stylesheet')) {
            links.other.push(link);
        }
    });

    return links;
}

/**
 * Remove all CSS/icon/manifest links from content
 */
function removeAllLinks(content) {
    // Remove preconnect
    content = content.replace(/<link[^>]*preconnect[^>]*>/gi, '');
    // Remove dns-prefetch
    content = content.replace(/<link[^>]*dns-prefetch[^>]*>/gi, '');
    // Remove fonts
    content = content.replace(/<link[^>]*fonts\.googleapis\.com[^>]*>/gi, '');
    // Remove font-awesome
    content = content.replace(/<link[^>]*font-awesome[^>]*>/gi, '');
    // Remove icons
    content = content.replace(/<link[^>]*(?:icon|apple-touch-icon)[^>]*>/gi, '');
    // Remove manifest
    content = content.replace(/<link[^>]*manifest[^>]*>/gi, '');
    // Remove tailwind
    content = content.replace(/<link[^>]*tailwind-build\.css[^>]*>/gi, '');
    // Remove global-enhancements
    content = content.replace(/<link[^>]*global-enhancements\.css[^>]*>/gi, '');
    // Remove old style.css
    content = content.replace(/<link[^>]*style\.css[^>]*>/gi, '');

    return content;
}

/**
 * Insert CSS structure in correct order
 */
function insertCSSStructure(content, folder) {
    const structure = CSS_STRUCTURE[folder];

    // Find title tag
    const titleMatch = content.match(/<title>.*?<\/title>/i);
    if (!titleMatch) return content;

    const titleEnd = content.indexOf(titleMatch[0]) + titleMatch[0].length;

    // Build CSS structure
    let cssBlock = '\n';

    // 1. Preconnect
    structure.preconnect.forEach(link => {
        cssBlock += link + '\n';
    });

    // 2. Fonts
    cssBlock += structure.fonts + '\n';

    // 3. Font Awesome
    cssBlock += structure.fontAwesome + '\n';

    // 4. Icons
    structure.icons.forEach(icon => {
        cssBlock += icon + '\n';
    });

    // 5. Manifest
    cssBlock += structure.manifest + '\n';

    // 6. Tailwind CSS
    cssBlock += structure.tailwind + '\n';

    // 7. Global Enhancements CSS
    cssBlock += structure.global + '\n';

    // Insert after title
    content = content.slice(0, titleEnd) + cssBlock + content.slice(titleEnd);

    return content;
}

/**
 * Process single file
 */
function processFile(folder, fileName) {
    const filePath = folder + '/' + fileName;

    try {
        let content = fs.readFileSync(filePath, 'utf8');

        // Skip component files
        if (fileName.includes('sidebar') || fileName.includes('header') || fileName.includes('footer')) {
            return null;
        }

        // Check if file already has correct structure
        const hasTailwind = content.includes('tailwind-build.css');
        const hasGlobal = content.includes('global-enhancements.css');
        const hasPreconnect = content.includes('preconnect');
        const hasFonts = content.includes('fonts.googleapis.com/css2');
        const hasIcons = content.includes('itbatam.ico');
        const hasManifest = content.includes('manifest.webmanifest');

        // If all required elements exist, check order
        if (hasTailwind && hasGlobal && hasPreconnect && hasFonts && hasIcons && hasManifest) {
            // Check if order is correct (tailwind and global should be after manifest)
            const tailwindIndex = content.indexOf('tailwind-build.css');
            const globalIndex = content.indexOf('global-enhancements.css');
            const manifestIndex = content.indexOf('manifest.webmanifest');

            if (tailwindIndex > manifestIndex && globalIndex > tailwindIndex) {
                // Order seems correct, but let's verify structure matches index.html
                const titleIndex = content.indexOf('<title>');
                const preconnectAfterTitle = content.indexOf('preconnect', titleIndex);
                const tailwindAfterPreconnect = tailwindIndex > preconnectAfterTitle;

                if (tailwindAfterPreconnect) {
                    // Structure seems correct, skip
                    return { fileName, status: 'skipped', reason: 'Structure already correct' };
                }
            }
        }

        // Remove all existing CSS/icon/manifest links
        content = removeAllLinks(content);

        // Insert CSS structure in correct order
        content = insertCSSStructure(content, folder);

        // Save file
        fs.writeFileSync(filePath, content, 'utf8');

        return { fileName, status: 'updated' };
    } catch (error) {
        return { fileName, status: 'error', error: error.message };
    }
}

/**
 * Main function
 */
function main() {
    console.log('\n🔄 CSS Structure Synchronization');
    console.log('================================\n');

    const folders = ['id', 'en'];
    const results = {
        id: { updated: 0, skipped: 0, errors: 0 },
        en: { updated: 0, skipped: 0, errors: 0 }
    };

    folders.forEach(folder => {
        if (!fs.existsSync(folder)) {
            console.error(`❌ Folder tidak ditemukan: ${folder}`);
            return;
        }

        const files = fs.readdirSync(folder)
            .filter(f => f.endsWith('.html'))
            .filter(f => !f.includes('sidebar') && !f.includes('header') && !f.includes('footer'));

        console.log(`\n📁 Processing ${folder}/ folder (${files.length} files)...\n`);

        files.forEach(fileName => {
            const result = processFile(folder, fileName);

            if (!result) {
                // Component file, skip
                return;
            }

            if (result.status === 'updated') {
                console.log(`✅ ${fileName}`);
                results[folder].updated++;
            } else if (result.status === 'skipped') {
                console.log(`⏭️  ${fileName} - ${result.reason}`);
                results[folder].skipped++;
            } else {
                console.log(`❌ ${fileName} - ${result.error}`);
                results[folder].errors++;
            }
        });
    });

    // Summary
    console.log('\n\n📊 Summary');
    console.log('==========\n');

    folders.forEach(folder => {
        const r = results[folder];
        console.log(`📂 ${folder.toUpperCase()}/ folder:`);
        console.log(`   ✅ Updated:  ${r.updated}`);
        console.log(`   ⏭️  Skipped:  ${r.skipped}`);
        console.log(`   ❌ Errors:   ${r.errors}`);
        console.log('');
    });

    const totalUpdated = results.id.updated + results.en.updated;
    const totalSkipped = results.id.skipped + results.en.skipped;
    const totalErrors = results.id.errors + results.en.errors;

    console.log('✨ Final Status');
    console.log('==============\n');
    console.log(`   ✅ Updated:  ${totalUpdated}`);
    console.log(`   ⏭️  Skipped:  ${totalSkipped}`);
    console.log(`   ❌ Errors:   ${totalErrors}\n`);

    if (totalUpdated > 0) {
        console.log('💡 Next Steps:');
        console.log('   1. Test updated pages in browser');
        console.log('   2. Verify CSS loading order');
        console.log('   3. Check browser console for errors');
        console.log('   4. Run Lighthouse audit\n');
    }
}

// Run
main();
