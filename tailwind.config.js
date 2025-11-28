/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './*.html',
    './id/**/*.html',
    './en/**/*.html',
    './src/**/*.{js,css}',
    './sw.js',
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      display: ['Space Grotesk', 'Inter', 'sans-serif'],
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#0f172a',
          foreground: '#f8fafc',
        },
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          300: '#c4b5fd',
          500: '#7c3aed',
          600: '#6d28d9',
          900: '#4c1d95',
        },
      },
      boxShadow: {
        glow: '0 35px 120px rgba(15, 23, 42, 0.35)',
      },
      backgroundImage: {
        'grid-slate':
          'radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.25) 1px, transparent 0)',
        'hero-noise':
          "radial-gradient(circle at 20% 20%, rgba(124, 58, 237, 0.25), transparent 45%), radial-gradient(circle at 80% 0%, rgba(14, 165, 233, 0.3), transparent 35%)",
      },
      borderRadius: {
        brand: '1.5rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};

