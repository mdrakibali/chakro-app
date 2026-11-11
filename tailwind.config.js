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
          DEFAULT: '#585858',
          surface: '#0E2331',
        },

        // Accents
        'accent-blue': '#88AEC3',
        'accent-coral': '#FF765A',
        'accent-yellow': '#FECC32',

        // Light Theme
        background: '#FFFFFF',
        surface: '#F4F4F4',
        card: '#FFFFFF',
        heading: '#111827',
        foreground: '#374151',
        muted: '#6B7280',
        border: '#E5E7EB',
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
