import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import { type HTMLAttributes, forwardRef } from 'react';

import { cn } from '~utils/style';

const typographyVariants = cva('tracking-normal', {
  variants: {
    variant: {
      hero: 'font-sans text-2xl sm:text-4xl',
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
    },
    color: {
      highlight: 'text-primary-highlighted',
      default: 'text-primary',
      hint: 'text-primary-hint',
      accent: 'text-accent',
    },
    prose: {
      true: 'max-w-prose',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'body',
    color: 'default',
    weight: 'medium',
    prose: true,
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
    { asChild, balance, color, weight, variant, prose, className, ...rest },
    ref
  ) => {
    const PolymorphicComponent = asChild ? Slot : 'p';

    return (
      <PolymorphicComponent
        ref={ref}
        className={cn(
          typographyVariants({ color, weight, variant, prose }),
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
