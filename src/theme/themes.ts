import { vars } from 'nativewind';

export const themes = {
  light: vars({
    '--color-background': '244 247 249', // #F4F7F9 (Soft cool ice-slate)
    '--color-surface': '255 255 255',    // #FFFFFF (Pure White)
    '--color-heading': '17 24 39',       // #111827 (Neutral dark slate heading)
    '--color-foreground': '55 65 81',    // #374151 (Clean neutral gray body text)
    '--color-muted': '107 114 128',      // #6B7280 (Neutral gray secondary text)
    '--color-border': '229 231 235',     // #E5E7EB (Neutral border)
  }),

  dark: vars({
    '--color-background': '7 21 30',     // #07151E (Deep midnight navy background)
    '--color-surface': '14 35 49',       // #0E2331 (Elevated navy surface)
    '--color-heading': '255 255 255',    // #FFFFFF (Pure crisp white)
    '--color-foreground': '241 245 249', // #F1F5F9 (Clean bright off-white body text)
    '--color-muted': '156 163 175',      // #9CA3AF (Clean neutral gray secondary text)
    '--color-border': '31 41 55',        // #1F2937 (Neutral dark border)
  }),
};
