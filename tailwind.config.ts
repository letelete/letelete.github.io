import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      primary: ['Inter', ...defaultTheme.fontFamily.sans],
    },
    colors: {
      background: '#101010',
      white: '#fff',
      black: '#000',
      primary: {
        DEFAULT: '#86868b',
        highlighted: '#f5f5f7',
        foreground: {
          DEFAULT: '#f5f5f7',
          highlighted: '#101010',
        },
      },
      accent: {
        DEFAULT: '#ff5151',
      },
      card: {
        intense: '#000000',
        light: '#000000',
      },
    },
    extend: {
      boxShadow: {
        'inner-glass': 'inset 0 1px 1px 1px rgba(255, 255, 255, 0.1)',
      },
    },
  },
  plugins: [],
} as const satisfies Config;
export default config;
