import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
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
      white: '#fff',
      black: '#000',
      gray: {
        100: '#f5f5f7',
        400: '#86868b',
        700: '#101010',
      },
      accent: {
        DEFAULT: '#ff5151',
      },
    },
    extend: {
      boxShadow: {
        'inner-glass': 'inset 0 1px 1px 1px rgba(255, 255, 255, 0.1)',
      },
    },
  },
  plugins: [],
};
export default config;
