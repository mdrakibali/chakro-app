module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],

  theme: {
    extend: {
      colors: {
        // Brand & Reference Palette
        primary: {
          DEFAULT: '#F07828',
          dark: '#D9651D',
          light: '#FFF2E8',
        },
        secondary: {
          DEFAULT: '#07151E',
          surface: '#0E2331',
        },
        'accent-blue': '#88AEC3',
        'accent-coral': '#FF765A',
        'accent-yellow': '#FECC32',

        // Dynamic theme variables (light/dark)
        background: 'rgb(var(--color-background) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        heading: 'rgb(var(--color-heading) / <alpha-value>)',
        foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
      },
      fontFamily: {
        outfit: ['Outfit-Regular'],
        'outfit-thin': ['Outfit-Thin'],
        'outfit-extralight': ['Outfit-ExtraLight'],
        'outfit-light': ['Outfit-Light'],
        'outfit-regular': ['Outfit-Regular'],
        'outfit-medium': ['Outfit-Medium'],
        'outfit-semibold': ['Outfit-SemiBold'],
        'outfit-bold': ['Outfit-Bold'],
        'outfit-extrabold': ['Outfit-ExtraBold'],
        'outfit-black': ['Outfit-Black'],
      },
    },
  },

  plugins: [],
};
