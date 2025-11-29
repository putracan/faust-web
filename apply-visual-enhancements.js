/**
 * Script untuk menerapkan visual-enhancements.css ke semua file HTML
 *
 * Usage: node apply-visual-enhancements.js
 */

const fs = require('fs');

const folders = ['id', 'en'];
const excludeFiles = ['sidebar.html', 'header.html', 'footer.html', 'right-sidebar.html'];

const VISUAL_CSS = '../src/visual-enhancements.css';

function processFile(folder, fileName) {
    const filePath = folder + '/' + fileName;

    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        // Skip component files
        if (excludeFiles.some(ex => fileName.includes(ex))) {
            return null;
        }

        // Check if visual-enhancements.css already exists
        if (content.includes('visual-enhancements.css')) {
            return { fileName, status: 'skipped', reason: 'Already has visual-enhancements.css' };
        }

        // Add visual-enhancements.css after global-enhancements.css
        if (content.includes('global-enhancements.css')) {
            content = content.replace(
                /<link[^>]*global-enhancements\.css[^>]*>/i,
                match => match + '\n<link rel="stylesheet" href="' + VISUAL_CSS + '"/>'
            );
            modified = true;
        } else {
            // Add before closing head
            content = content.replace('</head>',
                '<link rel="stylesheet" href="' + VISUAL_CSS + '"/>\n</head>');
            modified = true;
        }

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            return { fileName, status: 'updated' };
        }

        return { fileName, status: 'skipped' };
    } catch (error) {
        return { fileName, status: 'error', error: error.message };
    }
}

function main() {
    console.log('\n🎨 Applying Visual Enhancements');
    console.log('================================\n');

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
            .filter(f => f.endsWith('.html'));

        console.log(`\n📁 Processing ${folder}/ folder (${files.length} files)...\n`);

        files.forEach(fileName => {
            const result = processFile(folder, fileName);

            if (!result) {
                return;
            }

            if (result.status === 'updated') {
                console.log(`✅ ${fileName}`);
                results[folder].updated++;
            } else if (result.status === 'skipped') {
                if (result.reason) {
                    console.log(`⏭️  ${fileName} - ${result.reason}`);
                } else {
                    console.log(`⏭️  ${fileName}`);
                }
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
        console.log('   2. Add animation classes to elements');
        console.log('   3. Verify visual effects');
        console.log('   4. Run Lighthouse audit\n');
    }
}

main();
