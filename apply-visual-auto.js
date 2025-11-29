/**
 * Script Otomatis - Apply Visual Enhancements
 * Run: node apply-visual-auto.js
 */

const fs = require('fs');

const folders = ['id', 'en'];
const exclude = ['sidebar', 'header', 'footer', 'right-sidebar'];
const visualCSS = '../src/visual-enhancements.css';

let stats = { total: 0, updated: 0, skipped: 0, errors: 0, animations: 0 };

console.log('\n🚀 Auto Apply Visual Enhancements\n');

folders.forEach(folder => {
    if (!fs.existsSync(folder)) {
        console.error(`❌ ${folder} tidak ditemukan`);
        return;
    }

    const files = fs.readdirSync(folder)
        .filter(f => f.endsWith('.html'))
        .filter(f => !exclude.some(e => f.includes(e)));

    console.log(`\n📁 ${folder.toUpperCase()}/ (${files.length} files)\n`);

    files.forEach(file => {
        const filePath = folder + '/' + file;

        try {
            let content = fs.readFileSync(filePath, 'utf8');
            let changed = false;
            let anims = 0;

            stats.total++;

            // Add CSS
            if (!content.includes('visual-enhancements.css')) {
                if (content.includes('global-enhancements.css')) {
                    content = content.replace(
                        /<link[^>]*global-enhancements\.css[^>]*>/i,
                        m => m + '\n<link rel="stylesheet" href="' + visualCSS + '"/>'
                    );
                } else {
                    content = content.replace('</head>',
                        '<link rel="stylesheet" href="' + visualCSS + '"/>\n</head>');
                }
                changed = true;
            }

            // Add animations
            content = content.replace(
                /<article[^>]*class="([^"]*service-card[^"]*)"[^>]*>/gi,
                (m, cls) => {
                    if (!cls.includes('fade-in') && !cls.includes('animate-in')) {
                        anims++;
                        changed = true;
                        return m.replace('class="' + cls + '"', 'class="' + cls + ' fade-in"');
                    }
                    return m;
                }
            );

            if (changed) {
                fs.writeFileSync(filePath, content, 'utf8');
                const msg = anims > 0 ? ` (+${anims} animations)` : '';
                console.log(`✅ ${file}${msg}`);
                stats.updated++;
                stats.animations += anims;
            } else {
                console.log(`⏭️  ${file}`);
                stats.skipped++;
            }
        } catch (err) {
            console.error(`❌ ${file}: ${err.message}`);
            stats.errors++;
        }
    });
});

console.log('\n📊 Summary');
console.log(`   Total: ${stats.total}`);
console.log(`   ✅ Updated: ${stats.updated}`);
console.log(`   ⏭️  Skipped: ${stats.skipped}`);
console.log(`   ❌ Errors: ${stats.errors}`);
console.log(`   🎨 Animations: ${stats.animations}\n`);
