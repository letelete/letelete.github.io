import type { Config } from 'tailwindcss';
import defaultColors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';

const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent: defaultColors.transparent,
      background: {
        DEFAULT: '#101010',
        contrast: '#282828',
      },
      white: '#fff',
      black: '#000',
      primary: {
        DEFAULT: '#9e9ea3',
        highlighted: '#f5f5f7',
        hint: {
          DEFAULT: '#666666',
        },
        foreground: {
          DEFAULT: '#f5f5f7',
          highlighted: '#101010',
        },
      },
      accent: {
        DEFAULT: '#eddd5d',
        from: '#f0991a',
        to: '#eddd5d',
        foreground: '#111',
      },
      card: {
        intense: '#000000',
        light: '#000000',
        hovered: '#ffffff',
      },
      destructive: {
        DEFAULT: '#ff5151',
      },
      socials: {
        youtube: '#ff0000',
      },
      heart: {
        0: 'transparent',
        1: 'black',
        2: '#F5F0C9',
        3: 'white',
        4: '#ECDF78',
        5: '#F1CC4A',
        6: '#F4BC38',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-roboto-mono)', ...defaultTheme.fontFamily.mono],
      },
      boxShadow: {
        'inner-glass': 'inset 0 1px 1px 1px rgba(255, 255, 255, 0.1)',
      },
    },
  },
  plugins: [],
} as const satisfies Config;
export default config;
