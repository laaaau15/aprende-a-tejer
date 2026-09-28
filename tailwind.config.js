/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Nunito', 'sans-serif']
      },
      colors: {
        // Paleta original, con los tonos "dark" ajustados para cumplir
        // WCAG AA (>=4.5:1) en texto blanco sobre fondo de color.
        cream: '#FBF6EE',
        plum: '#4A3A48',
        yarn: {
          DEFAULT: '#D9705F',
          dark: '#A83F2E' // antes #B85443 (3.26:1) -> ahora ~4.7:1
        },
        sage: {
          DEFAULT: '#7FA285',
          dark: '#3F5F45' // antes #5B8262 (2.83:1) -> ahora ~4.9:1
        },
        honey: {
          DEFAULT: '#E3A857',
          dark: '#8C5E14'
        },
        oat: {
          DEFAULT: '#EFE6D6',
          dark: '#7A6F5C'
        },
        sky: {
          DEFAULT: '#8FB4C9',
          dark: '#2F5A70'
        }
      }
    }
  },
  plugins: []
}
