/** Colour tokens live as RGB channels in app/globals.css so opacity modifiers (bg-mint/10) keep working. */
const c = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: c('void'),         // #080E0B  page background
        surface: c('surface'),   // #101A15  cards
        line: c('line'),         // #1C2B23  grid lines
        mint: c('mint'),         // #00FF87  primary accent
        'mint-deep': c('mint-deep'), // #00E676
        moss: c('moss'),         // #7C9186  muted gray-green text
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'ring-spin': { to: { transform: 'rotate(360deg)' } },
        'ping-soft': {
          '0%': { transform: 'scale(1)', opacity: '0.7' },
          '80%, 100%': { transform: 'scale(2.6)', opacity: '0' },
        },
      },
      animation: {
        'ring-spin': 'ring-spin 24s linear infinite',
        'ping-soft': 'ping-soft 1.8s cubic-bezier(0,0,.2,1) infinite',
      },
    },
  },
  plugins: [],
};
