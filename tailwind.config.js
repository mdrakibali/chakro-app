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
      fontSize: {
        xs: ['13px', { lineHeight: '18px' }],
        sm: ['15px', { lineHeight: '22px' }],
        base: ['17px', { lineHeight: '24px' }],
        lg: ['19px', { lineHeight: '26px' }],
        xl: ['22px', { lineHeight: '28px' }],
        '2xl': ['26px', { lineHeight: '32px' }],
        '3xl': ['32px', { lineHeight: '38px' }],
        '4xl': ['38px', { lineHeight: '44px' }],
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
