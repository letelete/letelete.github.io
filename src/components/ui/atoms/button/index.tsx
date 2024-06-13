import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import { HTMLMotionProps, isMotionComponent } from 'framer-motion';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

import { cn } from '~utils/style';

/* -------------------------------------------------------------------------------------------------
 * Button
 * -----------------------------------------------------------------------------------------------*/

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full font-sans text-sm font-normal leading-none tracking-tighter transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        outline: 'bg-transparent outline outline-1',
        ghost: 'bg-transparent',
        link: 'hover:underline-ctx-accent-secondary-fg-solid bg-transparent tracking-normal underline underline-offset-4',
      },
      size: {
        default: 'px-4 py-3',
        icon: 'aspect-square p-2',
        inline: '',
      },
      inverse: {
        true: 'ring-offset-ctx-button-fg-primary',
        false: 'ring-offset-ctx-button-inverse-fg-primary',
      },
    },
    compoundVariants: [
      {
        inverse: false,
        variant: 'default',
        className:
          'border-ctx-button bg-ctx-button text-ctx-button-fg-solid hover:bg-ctx-button/50',
      },
      {
        inverse: true,
        variant: 'default',
        className:
          'border-ctx-button-inverse bg-ctx-button-inverse text-ctx-button-inverse-fg-solid hover:bg-ctx-button-inverse/50',
      },

      {
        inverse: false,
        variant: 'outline',
        className: 'text-ctx-button outline-ctx-button hover:bg-ctx-button/10',
      },
      {
        inverse: true,
        variant: 'outline',
        className:
          'text-ctx-button-inverse outline-ctx-button-inverse hover:bg-ctx-button-inverse/10',
      },

      {
        inverse: false,
        variant: 'ghost',
        className: 'text-ctx-button-inverse-fg-solid hover:bg-ctx-button/10',
      },
      {
        inverse: true,
        variant: 'ghost',
        className: 'text-ctx-button-fg-solid hover:bg-ctx-button-inverse/10',
      },

      {
        inverse: false,
        variant: 'link',
        className:
          'text-ctx-button-inverse-fg-solid hover:text-ctx-button-inverse-fg-solid/50',
      },
      {
        inverse: true,
        variant: 'link',
        className: 'text-ctx-button-fg-solid hover:text-ctx-button-fg-solid/50',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      inverse: false,
    },
  }
);

interface ButtonProps
  extends ComponentPropsWithoutRef<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, inverse, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, inverse, className }))}
        ref={ref}
        {...(isMotionComponent(typeof Comp) ? buttonMotionProps : null)}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

/* -----------------------------------------------------------------------------------------------*/

const buttonMotionProps = {
  whileTap: { scale: 0.9 },
} as const satisfies HTMLMotionProps<'button'>;

/* -----------------------------------------------------------------------------------------------*/

export { Button, buttonMotionProps };
export type { ButtonProps };
