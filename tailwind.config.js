const colors = require('tailwindcss/colors');

module.exports = {
    purge: [
      'src/**/*.js',
      'src/**/*.jsx',
      'src/**/*.ts',
      'src/**/*.tsx',
      'public/**/*.html',
    ],
    theme: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: '#0068E2',
        secondary: '#151515',
        success: '#32C000',
        error: '#FF4A4A',
        validation: '#FFE5E5',
        white: colors.white,
        light: '#E4F1FF',
        gray: colors.neutral,
        dark: '#333333',
        black: colors.black,
        green: colors.green,
        yellow: colors.amber,
        red: colors.red,
      },
      extend: {
        fontSize: {
          xxs: '.65rem',
        },
        height: {
          editor: 'calc(-7.25rem + 100vh)',
          resourcePanel: '550px'
        },
        width: {
          resourcePanel: '600px' 
        }
      },
  },
  variants: {
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      opacity: ['disabled'],
    },
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
  }