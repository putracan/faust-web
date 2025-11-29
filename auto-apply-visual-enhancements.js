/**
 * Script Otomatis untuk Menerapkan Visual Enhancements ke Semua File HTML
 *
 * Usage: node auto-apply-visual-enhancements.js
 */

const fs = require('fs');

// Configuration
const FOLDERS = ['id', 'en'];
const EXCLUDE_FILES = ['sidebar.html', 'header.html', 'footer.html', 'right-sidebar.html'];
const VISUAL_CSS = '../src/visual-enhancements.css';

// Statistics
const stats = {
    total: 0,
    updated: 0,
    skipped: 0,
    errors: 0,
    animationsAdded: 0
};

/**
 * Add visual-enhancements.css link to HTML
 */
function addVisualCSS(content) {
    if (content.includes('visual-enhancements.css')) {
        return { content, added: false };
    }

    if (content.includes('global-enhancements.css')) {
        content = content.replace(
            /<link[^>]*global-enhancements\.css[^>]*>/i,
            match => match + '\n<link rel="stylesheet" href="' + VISUAL_CSS + '"/>'
        );
        return { content, added: true };
    }

    if (content.includes('</head>')) {
        content = content.replace(
            '</head>',
            '<link rel="stylesheet" href="' + VISUAL_CSS + '"/>\n</head>'
        );
        return { content, added: true };
    }

    return { content, added: false };
}

/**
 * Add animation classes to elements
 */
function addAnimationClasses(content) {
    let modified = false;
    let animationsCount = 0;

    // Add fade-in to service-card
    content = content.replace(
        /<article[^>]*class="([^"]*service-card[^"]*)"[^>]*>/gi,
        (match, classes) => {
            if (!classes.includes('fade-in') && !classes.includes('animate-in') && !classes.includes('slide-in')) {
                animationsCount++;
                modified = true;
                return match.replace('class="' + classes + '"', 'class="' + classes + ' fade-in"');
            }
            return match;
        }
    );

    // Add fade-in to sections
    content = content.replace(
        /<section[^>]*class="([^"]*)"[^>]*>/gi,
        (match, classes) => {
            if (!classes.includes('fade-in') && !classes.includes('animate-in') && !classes.includes('hero')) {
                animationsCount++;
                modified = true;
                return match.replace('class="' + classes + '"', 'class="' + classes + ' fade-in"');
            }
            return match;
        }
    );

    return { content, modified, animationsCount };
}

/**
 * Process single HTML file
 */
function processFile(folder, fileName) {
    const filePath = folder + '/' + fileName;

    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let fileModified = false;
        let fileAnimations = 0;

        // Skip component files
        if (EXCLUDE_FILES.some(ex => fileName.includes(ex))) {
            return null;
        }

        stats.total++;

        // Add visual-enhancements.css
        const cssResult = addVisualCSS(content);
        content = cssResult.content;
        if (cssResult.added) {
            fileModified = true;
        }

        // Add animation classes
        const animResult = addAnimationClasses(content);
        content = animResult.content;
        if (animResult.modified) {
            fileModified = true;
            fileAnimations = animResult.animationsCount;
            stats.animationsAdded += fileAnimations;
        }

        // Save if modified
        if (fileModified) {
            fs.writeFileSync(filePath, content, 'utf8');
            const status = cssResult.added ? 'CSS added' : 'Animations added';
            const animInfo = fileAnimations > 0 ? ` (+${fileAnimations} animations)` : '';
            return {
                fileName,
                status: 'updated',
                message: `${status}${animInfo}`
            };
        } else {
            return {
                fileName,
                status: 'skipped',
                message: 'Already has visual-enhancements.css'
            };
        }
    } catch (error) {
        stats.errors++;
        return {
            fileName,
            status: 'error',
            message: error.message
        };
    }
}

/**
 * Main function
 */
function main() {
    console.log('\n🚀 Auto Apply Visual Enhancements');
    console.log('===================================\n');

    FOLDERS.forEach(folder => {
        if (!fs.existsSync(folder)) {
            console.error(`❌ Folder tidak ditemukan: ${folder}`);
            return;
        }

        const files = fs.readdirSync(folder)
            .filter(f => f.endsWith('.html'))
            .filter(f => !EXCLUDE_FILES.some(ex => f.includes(ex)));

        console.log(`\n📁 Processing ${folder.toUpperCase()}/ folder (${files.length} files)...\n`);

        files.forEach(fileName => {
            const result = processFile(folder, fileName);

            if (!result) {
                return;
            }

            if (result.status === 'updated') {
                console.log(`✅ ${fileName} - ${result.message}`);
                stats.updated++;
            } else if (result.status === 'skipped') {
                console.log(`⏭️  ${fileName} - ${result.message}`);
                stats.skipped++;
            } else {
                console.log(`❌ ${fileName} - ${result.message}`);
            }
        });
    });

    // Summary
    console.log('\n\n📊 Summary');
    console.log('==========\n');
    console.log(`   📄 Total Files:      ${stats.total}`);
    console.log(`   ✅ Updated:          ${stats.updated}`);
    console.log(`   ⏭️  Skipped:          ${stats.skipped}`);
    console.log(`   ❌ Errors:           ${stats.errors}`);
    console.log(`   🎨 Animations Added: ${stats.animationsAdded}`);

    const successRate = stats.total > 0
        ? ((stats.updated / stats.total) * 100).toFixed(1)
        : '0.0';

    console.log(`\n   📈 Success Rate:    ${successRate}%`);

    if (stats.updated > 0) {
        console.log('\n\n💡 Next Steps:');
        console.log('   1. Test updated pages in browser');
        console.log('   2. Verify visual-enhancements.css is loading');
        console.log('   3. Check animations are working');
        console.log('   4. Run Lighthouse audit\n');
    }

    console.log('✨ Process complete!\n');
}

// Run script
main();
