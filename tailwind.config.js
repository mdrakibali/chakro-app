const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],

  theme: {
    extend: {
      colors: {
        // Brand Palette
        primary: {
          DEFAULT: '#F07828',
          dark: '#D9651D',
          light: '#FFF2E8',
        },
        secondary: {
          DEFAULT: '#07151E',
          surface: '#0E2331',
        },

        // Accents
        'accent-blue': '#88AEC3',
        'accent-coral': '#FF765A',
        'accent-yellow': '#FECC32',

        // Theme variables (Light Mode)
        background: 'rgb(var(--color-background) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        heading: 'rgb(var(--color-heading) / <alpha-value>)',
        foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
      },
      fontFamily: {
        outfit: ['Outfit', 'Outfit-Regular', 'sans-serif'],
      },
    },
  },

  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.font-normal': {
          fontFamily: 'Outfit-Regular',
        },
        '.font-medium': {
          fontFamily: 'Outfit-Medium',
        },
        '.font-semibold': {
          fontFamily: 'Outfit-SemiBold',
        },
        '.font-bold': {
          fontFamily: 'Outfit-Bold',
        },
        '.font-extrabold': {
          fontFamily: 'Outfit-ExtraBold',
        },
      });
    }),
  ],
};
