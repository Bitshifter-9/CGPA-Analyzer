export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          600: '#1e3a5f',
          700: '#15283e',
          800: '#0d1929',
          900: '#070f1a',
        }
      }
    },
  },
  plugins: [],
}
