/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        // Signature palette — "Academic Ledger" direction.
        ink:      { DEFAULT: '#12183B', 50:'#EEEFF6', 100:'#DADCEC', 300:'#7A81B5', 500:'#2A3170', 700:'#171D45', 900:'#0B0E24' },
        parchment:{ DEFAULT: '#FBF9F4', 100:'#F5F1E8', 200:'#EDE6D6' },
        brass:    { DEFAULT: '#C9A227', 100:'#F3E8C8', 300:'#D9B94E', 700:'#8F701A' },
        teal:     { DEFAULT: '#0F7A78', 100:'#DFF0EE', 300:'#4FA6A2', 700:'#0A5250' },
        clay:     { DEFAULT: '#B5502F' },
        ok:       '#1E8E5A',
        warn:     '#B8791A',
        bad:      '#B5402F',
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        body: ['"Inter"', '-apple-system', 'sans-serif'],
        'display-ar': ['"Noto Serif Arabic"', 'serif'],
        'body-ar': ['"Noto Sans Arabic"', 'sans-serif'],
      },
      boxShadow: {
        ledger: '0 1px 0 0 rgba(18,24,59,0.06), 0 8px 24px -12px rgba(18,24,59,0.18)',
      },
      borderRadius: { xl2: '1.25rem' },
    },
  },
  plugins: [],
}
