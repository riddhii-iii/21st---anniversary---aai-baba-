export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Cormorant Garamond', 'serif'],
      },
      boxShadow: {
        glow: '0 0 60px rgba(220, 0, 0, 0.24)',
      },
      colors: {
        crimson: {
          950: '#2d0000',
          900: '#5c0000',
          800: '#7b0202',
          700: '#890202',
          600: '#9f0202',
          500: '#bd0000',
          400: '#dc0000',
          300: '#ff0000',
        },
        beige: {
          700: '#c5a67e',
          600: '#d1b996',
          500: '#ddcbb0',
          400: '#eadeca',
          300: '#f8f0e5',
        },
        ebony: '#2d0000',
        smoke: '#f8f0e5',
      },
    },
  },
  plugins: [],
}
