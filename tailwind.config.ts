import type { Config } from 'tailwindcss';

const defaultTheme = require('tailwindcss/defaultTheme');

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
      gray: {
        100: '#f5f5f7',
        400: '#86868b',
        700: '#101010',
      },
      accent: {
        DEFAULT: '#ff5151',
      },
    },
    extend: {},
  },
  plugins: [],
};
export default config;
