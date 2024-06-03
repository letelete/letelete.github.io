import type { Config } from 'tailwindcss';
import defaultColors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

const baseForeground = {
  solid: 'black',
  primary: 'rgba(0,0,0,0.87)',
  secondary: 'rgba(0,0,0,0.64)',
  hint: 'rgba(0,0,0,0.34)',
  decorative: 'rgba(0,0,0,0.16)',
  destructive: '#ff5151',
};

const baseForegroundInverse = {
  solid: 'white',
  primary: 'rgba(255,255,255,0.87)',
  secondary: 'rgba(255,255,255,0.64)',
  hint: 'rgba(255,255,255,0.34)',
  decorative: 'rgba(255,255,255,0.16)',
  destructive: '#ff5151',
};

export type Foreground = keyof typeof baseForeground;

export interface Background {
  DEFAULT: string;
  fg: Record<Foreground, string>;
  inverse?: Omit<Background, 'inverse'>;
}

const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      transparent: defaultColors.transparent,
      // Context-aware colors
      ctx: {
        primary: {
          DEFAULT: '#fff',
          fg: baseForeground,
          inverse: {
            DEFAULT: '#000',
            fg: baseForegroundInverse,
          },
        },
        secondary: {
          DEFAULT: '#f5f5f5',
          fg: baseForeground,
        },
        'accent-primary': {
          DEFAULT: '#ECFDDE',
          fg: { ...baseForeground, primary: '#2E590D' },
        },
        'accent-secondary': {
          DEFAULT: '#2E590D',
          fg: {
            ...baseForegroundInverse,
            primary: '#fff',
            secondary: 'rgba(0,0,0,0.87)',
            hint: 'rgba(0,0,0,0.64)',
          },
        },
        destructive: {
          DEFAULT: '#ff5151',
          fg: baseForeground,
        },
        button: {
          DEFAULT: '#000',
          fg: baseForegroundInverse,
          inverse: {
            DEFAULT: '#fff',
            fg: baseForeground,
          },
        },
      } as const satisfies Record<string, Background>,
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
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-mono)', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [
    plugin(function ({ matchVariant }) {
      matchVariant(
        'nth',
        (value) => {
          return `&:nth-child(${value})`;
        },
        {
          values: {
            DEFAULT: 'n', // Default value for `nth:`
            '2n': '2n', // `nth-2n:utility` will generate `:nth-child(2n)` CSS selector
            '3n': '3n',
          },
        }
      );
    }),
  ],
} as const satisfies Config;
export default config;
