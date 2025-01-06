import type { Config } from 'tailwindcss';
import defaultColors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

const baseForeground = {
  solid: 'hsl(var(--base-fg-solid))',
  primary: 'hsla(var(--base-fg-primary))',
  secondary: 'hsla(var(--base-fg-secondary))',
  hint: 'hsla(var(--base-fg-hint))',
  decorative: 'hsla(var(--base-fg-decorative))',
  destructive: 'hsl(var(--base-fg-destructive))',
};

const baseForegroundInverse = {
  solid: 'hsl(var(--base-fg-inv-solid))',
  primary: 'hsla(var(--base-fg-inv-primary))',
  secondary: 'hsla(var(--base-fg-inv-secondary))',
  hint: 'hsla(var(--base-fg-inv-hint))',
  decorative: 'hsla(var(--base-fg-inv-decorative))',
  destructive: 'hsl(var(--base-fg-inv-destructive))',
};

export type Foreground = keyof typeof baseForeground;

export interface Background {
  DEFAULT: string;
  fg: Record<Foreground, string>;
  inverse?: Omit<Background, 'inverse'>;
}

const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    colors: {
      transparent: defaultColors.transparent,
      ctx: {
        primary: {
          DEFAULT: 'hsl(var(--ctx-primary))',
          fg: baseForeground,
          inverse: {
            DEFAULT: 'hsl(var(--ctx-primary-inv))',
            fg: baseForegroundInverse,
          },
        },
        secondary: {
          DEFAULT: 'hsl(var(--ctx-secondary))',
          fg: baseForeground,
        },
        'accent-primary': {
          DEFAULT: 'hsl(var(--ctx-accent-primary))',
          fg: {
            ...baseForeground,
            primary: 'hsl(var(--ctx-accent-primary-fg))',
          },
        },
        'accent-secondary': {
          DEFAULT: 'hsl(var(--ctx-accent-secondary))',
          fg: {
            ...baseForegroundInverse,
            primary: 'hsl(var(--ctx-accent-secondary-fg))',
            secondary: 'hsl(var(--ctx-accent-secondary-fg-secondary))',
            hint: 'hsl(var(--ctx-accent-secondary-fg-hint))',
          },
        },
        destructive: {
          DEFAULT: 'hsl(var(--ctx-destructive))',
          fg: baseForeground,
        },
        button: {
          DEFAULT: 'hsl(var(--ctx-button))',
          fg: baseForegroundInverse,
          inverse: {
            DEFAULT: 'hsl(var(--ctx-button-inv))',
            fg: baseForeground,
          },
        },
      } as const satisfies Record<string, Background>,
      socials: {
        youtube: 'hsl(var(--socials-youtube))',
        stackoverflow: 'hsl(var(--socials-stackoverflow))',
        reddit: 'hsl(var(--socials-reddit))',
      },
      heart: {
        0: 'hsla(var(--heart-0))',
        1: 'hsl(var(--heart-1))',
        2: 'hsl(var(--heart-2))',
        3: 'hsl(var(--heart-3))',
        4: 'hsl(var(--heart-4))',
        5: 'hsl(var(--heart-5))',
        6: 'hsl(var(--heart-6))',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(----font-sans)', ...defaultTheme.fontFamily.sans],
        mono: ['var(----font-mono)', ...defaultTheme.fontFamily.mono],
      },
      spacing: {
        section: '8rem',
        'section-sm': '6rem',
        content: '6rem',
        'content-sm': '4rem',
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
