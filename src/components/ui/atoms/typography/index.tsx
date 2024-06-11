import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import { type HTMLAttributes, forwardRef } from 'react';

import { cn } from '~utils/style';

const typographyVariants = cva('tracking-normal', {
  variants: {
    variant: {
      hero: 'font-sans text-xl leading-6 sm:text-4xl sm:leading-10',
      heading: 'font-sans text-lg leading-7',
      subheading: 'font-sans text-base leading-7',
      body: 'font-sans text-base leading-6',
      'body-sm': 'font-sans text-sm leading-6',
      sm: 'font-sans text-xs leading-4',
    },
    weight: {
      bold: 'font-bold',
      medium: 'font-medium',
      normal: 'font-normal',
      light: 'font-light',
    },
    color: {
      primary: 'text-ctx-primary-fg-primary',
      secondary: 'text-ctx-primary-fg-secondary',
      accent: 'text-ctx-accent-secondary',
      hint: 'text-ctx-primary-fg-hint',
      destructive: 'text-ctx-primary-fg-destructive',
    },
    prose: {
      true: 'max-w-prose',
      false: '',
    },
    italic: {
      true: 'italic',
      false: 'not-italic',
    },
    inverse: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    {
      inverse: true,
      color: 'primary',
      className: 'text-ctx-primary-inverse-fg-primary',
    },

    {
      inverse: true,
      color: 'secondary',
      className: 'text-ctx-primary-inverse-fg-secondary',
    },

    {
      inverse: true,
      color: 'hint',
      className: 'text-ctx-primary-inverse-fg-hint',
    },

    {
      inverse: true,
      color: 'destructive',
      className: 'text-ctx-primary-inverse-fg-destructive',
    },
  ],
  defaultVariants: {
    variant: 'body',
    color: 'primary',
    weight: 'normal',
    prose: true,
    italic: false,
    inverse: false,
  },
});

export interface TypographyProps
  extends Omit<HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof typographyVariants> {
  asChild?: boolean;
  balance?: boolean;
}

const Typography = forwardRef<HTMLParagraphElement, TypographyProps>(
  (
    {
      asChild,
      balance,
      color,
      weight,
      variant,
      prose,
      italic,
      inverse,
      className,
      ...rest
    },
    ref
  ) => {
    const PolymorphicComponent = asChild ? Slot : 'p';

    return (
      <PolymorphicComponent
        ref={ref}
        className={cn(
          typographyVariants({
            color,
            weight,
            variant,
            prose,
            italic,
            inverse,
          }),
          balance && 'text-balance',
          className
        )}
        {...rest}
      />
    );
  }
);

Typography.displayName = 'Typography';

export { Typography };
