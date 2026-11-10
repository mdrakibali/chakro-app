import { vars } from 'nativewind';

export const themes = {
  light: vars({
    '--color-background': '244 247 249', // #F4F7F9 (Soft cool ice-slate)
    '--color-surface': '255 255 255',    // #FFFFFF (Pure White for cards)
    '--color-heading': '7 21 30',        // #07151E (Deep Navy text for strong contrast)
    '--color-foreground': '51 78 97',    // #334E61 (Body text)
    '--color-muted': '107 133 153',      // #6B8599 (Secondary/subtitle text)
    '--color-border': '226 232 240',     // #E2E8F0 (Subtle border)
  }),

  dark: vars({
    '--color-background': '7 21 30',     // #07151E (Deep midnight navy background)
    '--color-surface': '14 35 49',       // #0E2331 (Elevated navy for cards and pills)
    '--color-heading': '255 255 255',    // #FFFFFF (Pure white headings)
    '--color-foreground': '213 228 236', // #D5E4EC (Soft white body text)
    '--color-muted': '136 174 195',      // #88AEC3 (Muted blue subtitle text)
    '--color-border': '22 46 64',        // #162E40 (Deep navy border)
  }),
};
