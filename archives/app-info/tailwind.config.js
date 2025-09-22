/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Keep existing primary/secondary for compatibility
        primary: {
          50: '#fff8f1',
          100: '#feefdc',
          200: '#fedeb6',
          300: '#fcc989',
          400: '#faac57',
          500: '#f89634',
          600: '#f47b25',
          700: '#c95c1a',
          800: '#a1471b',
          900: '#823b1a',
          950: '#461c0b',
        },
        secondary: {
          50: '#fcfaf8',
          100: '#f4ece7',
          200: '#e8d9ce',
          300: '#d8beac',
          400: '#c49d84',
          500: '#b58364',
          600: '#a56f51',
          700: '#8c5a43',
          800: '#734839',
          900: '#603d31',
          950: '#331e19',
        },
        // Add neutral palette for clean UI
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        // Subtle brand accent
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
      },
      fontFamily: {
        sans: ['var(--font-plus-jakarta)', 'var(--font-noto-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 16px -8px rgba(0, 0, 0, 0.1)',
        'softer': '0 2px 8px -4px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1400px',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
