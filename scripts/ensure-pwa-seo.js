const fs = require('fs');
const path = require('path');

// Template PWA + SEO meta tags lengkap
const PWASEOHead = `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>
<meta name="description" content="DESCRIPTION_PLACEHOLDER"/>
<meta name="keywords" content="KEYWORDS_PLACEHOLDER"/>
<meta name="author" content="Solusi Teknologi Batam"/>
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>
<meta name="theme-color" content="#6366f1"/>
<meta name="color-scheme" content="light"/>
<meta name="mobile-web-app-capable" content="yes"/>
<meta name="apple-mobile-web-app-capable" content="yes"/>
<meta name="apple-mobile-web-app-status-bar-style" content="default"/>
<meta name="apple-mobile-web-app-title" content="Solusi Teknologi Batam"/>
<meta name="format-detection" content="telephone=no"/>
<link rel="canonical" href="CANONICAL_PLACEHOLDER"/>
<link rel="alternate" href="CANONICAL_PLACEHOLDER" hreflang="id"/>
<link rel="alternate" href="CANONICAL_PLACEHOLDER_EN" hreflang="en"/>
<meta property="og:type" content="website"/>
<meta property="og:url" content="CANONICAL_PLACEHOLDER"/>
<meta property="og:title" content="TITLE_PLACEHOLDER"/>
<meta property="og:description" content="DESCRIPTION_PLACEHOLDER"/>
<meta property="og:image" content="https://faust.co.id/src/logo-solusi-teknologi-BATAM.png"/>
<meta property="og:locale" content="id_ID"/>
<meta property="og:site_name" content="Solusi Teknologi Batam"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:url" content="CANONICAL_PLACEHOLDER"/>
<meta name="twitter:title" content="TITLE_PLACEHOLDER"/>
<meta name="twitter:description" content="DESCRIPTION_PLACEHOLDER"/>
<meta name="twitter:image" content="https://faust.co.id/src/logo-solusi-teknologi-BATAM.png"/>
<meta name="geo.region" content="ID-KR"/>
<meta name="geo.placename" content="Batam"/>
<meta name="geo.position" content="1.047383;104.029522"/>
<meta name="ICBM" content="1.047383, 104.029522"/>
<title>TITLE_PLACEHOLDER</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600&display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer"/>
<link rel="icon" type="image/x-icon" href="../src/itbatam.ico"/>
<link rel="apple-touch-icon" sizes="180x180" href="../src/logo-solusi-teknologi-BATAM.png"/>
<link rel="manifest" href="../manifest.webmanifest"/>
<link rel="stylesheet" href="../src/tailwind-build.css"/>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Solusi Teknologi Batam",
  "url": "https://faust.co.id/id/",
  "logo": "https://faust.co.id/src/logo-solusi-teknologi-BATAM.png",
  "description": "Penyedia IT Solution terpercaya di Batam untuk CCTV, sistem keamanan, software development, automation, dan jaringan berbasis PWA.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Batam",
    "addressRegion": "Kepulauan Riau",
    "addressCountry": "ID"
  },
  "contactPoint": [{
    "@type": "ContactPoint",
    "telephone": "+62-811-1262-260",
    "contactType": "customer service",
    "areaServed": "ID",
    "availableLanguage": ["Indonesian", "English"]
  }],
  "sameAs": [
    "https://www.tiktok.com/@itbatam",
    "https://www.linkedin.com/company/itbatam"
  ]
}
</script>`;

function ensurePWAandSEO(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.basename(filePath);

    // Skip component files
    if (fileName.includes('header') || fileName.includes('footer') || fileName.includes('sidebar')) {
      return false;
    }

    let modified = false;

    // 1. Ensure PWA meta tags
    if (!content.includes('mobile-web-app-capable')) {
      // Add PWA meta tags after viewport
      content = content.replace(
        /<meta\s+name="viewport"[^>]*>/,
        `$&\n<meta name="mobile-web-app-capable" content="yes"/>\n<meta name="apple-mobile-web-app-capable" content="yes"/>\n<meta name="apple-mobile-web-app-status-bar-style" content="default"/>\n<meta name="apple-mobile-web-app-title" content="Solusi Teknologi Batam"/>\n<meta name="format-detection" content="telephone=no"/>`
      );
      modified = true;
    }

    // 2. Ensure theme-color is soft color
    content = content.replace(/<meta\s+name="theme-color"\s+content="[^"]*"/, '<meta name="theme-color" content="#6366f1"');
    if (!content.includes('name="theme-color"')) {
      content = content.replace(
        /<meta\s+name="viewport"[^>]*>/,
        `$&\n<meta name="theme-color" content="#6366f1"/>`
      );
      modified = true;
    }

    // 3. Ensure manifest link
    if (!content.includes('rel="manifest"')) {
      content = content.replace(
        /<link\s+rel="icon"[^>]*>/,
        `$&\n<link rel="manifest" href="../manifest.webmanifest"/>`
      );
      modified = true;
    }

    // 4. Ensure apple-touch-icon
    if (!content.includes('apple-touch-icon')) {
      content = content.replace(
        /<link\s+rel="icon"[^>]*>/,
        `$&\n<link rel="apple-touch-icon" sizes="180x180" href="../src/logo-solusi-teknologi-BATAM.png"/>`
      );
      modified = true;
    }

    // 5. Ensure canonical URL
    if (!content.includes('rel="canonical"')) {
      const canonicalUrl = `https://faust.co.id/id/${fileName}`;
      content = content.replace(
        /<meta\s+name="robots"[^>]*>/,
        `$&\n<link rel="canonical" href="${canonicalUrl}"/>`
      );
      modified = true;
    }

    // 6. Ensure Open Graph tags
    if (!content.includes('property="og:type"')) {
      const ogTitle = content.match(/<title>([^<]*)<\/title>/)?.[1] || fileName.replace('.html', '');
      const ogDesc = content.match(/<meta\s+name="description"\s+content="([^"]*)"/)?.[1] || '';
      const canonicalUrl = `https://faust.co.id/id/${fileName}`;

      const ogTags = `
<meta property="og:type" content="website"/>
<meta property="og:url" content="${canonicalUrl}"/>
<meta property="og:title" content="${ogTitle}"/>
<meta property="og:description" content="${ogDesc}"/>
<meta property="og:image" content="https://faust.co.id/src/logo-solusi-teknologi-BATAM.png"/>
<meta property="og:locale" content="id_ID"/>
<meta property="og:site_name" content="Solusi Teknologi Batam"/>`;

      content = content.replace(
        /<link\s+rel="canonical"[^>]*>/,
        `$&${ogTags}`
      );
      modified = true;
    }

    // 7. Ensure Twitter Card
    if (!content.includes('name="twitter:card"')) {
      const twitterTitle = content.match(/<meta\s+property="og:title"\s+content="([^"]*)"/)?.[1] || '';
      const twitterDesc = content.match(/<meta\s+property="og:description"\s+content="([^"]*)"/)?.[1] || '';
      const canonicalUrl = `https://faust.co.id/id/${fileName}`;

      const twitterTags = `
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:url" content="${canonicalUrl}"/>
<meta name="twitter:title" content="${twitterTitle}"/>
<meta name="twitter:description" content="${twitterDesc}"/>
<meta name="twitter:image" content="https://faust.co.id/src/logo-solusi-teknologi-BATAM.png"/>`;

      content = content.replace(
        /<meta\s+property="og:site_name"[^>]*>/,
        `$&${twitterTags}`
      );
      modified = true;
    }

    // 8. Ensure Schema.org JSON-LD
    if (!content.includes('@type') && !content.includes('application/ld+json')) {
      const schema = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "${content.match(/<title>([^<]*)<\/title>/)?.[1] || fileName}",
  "description": "${content.match(/<meta\s+name="description"\s+content="([^"]*)"/)?.[1] || ''}",
  "url": "https://faust.co.id/id/${fileName}",
  "inLanguage": "id-ID",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Solusi Teknologi Batam",
    "url": "https://faust.co.id/"
  }
}
</script>`;

      content = content.replace('</head>', `${schema}\n</head>`);
      modified = true;
    }

    // 9. Ensure mobile-first viewport
    content = content.replace(
      /<meta\s+name="viewport"\s+content="[^"]*"/,
      '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"'
    );
    if (!content.includes('viewport-fit=cover')) {
      modified = true;
    }

    // 10. Ensure service worker registration
    if (!content.includes('serviceWorker') && content.includes('main.js')) {
      const swScript = `
<script>
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('SW registered:', reg))
      .catch(err => console.log('SW registration failed:', err));
  });
}
</script>`;

      content = content.replace('</body>', `${swScript}\n</body>`);
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated PWA+SEO: ${fileName}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`❌ Error: ${filePath} - ${error.message}`);
    return false;
  }
}

// Main
try {
  const idDir = path.resolve('id');
  if (!fs.existsSync(idDir)) {
    console.error('❌ Directory id/ not found!');
    process.exit(1);
  }
  const allFiles = fs.readdirSync(idDir);
  const files = allFiles.filter(f => f && typeof f === 'string' && f.endsWith('.html'));

console.log(`📁 Processing ${files.length} files for PWA + SEO optimization...\n`);

let count = 0;
files.forEach(file => {
  const filePath = path.join(idDir, file);
  if (ensurePWAandSEO(filePath)) count++;
});

console.log(`\n✨ Done! Updated ${count} files with PWA + SEO optimizations.`);
