import { Slot } from '@radix-ui/react-slot';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

import { cn } from '~utils/style';

/* -------------------------------------------------------------------------------------------------
 * Card
 * -----------------------------------------------------------------------------------------------*/

interface CardProps extends ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
  disablePadding?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ asChild, className, disablePadding, ...rest }, ref) => {
    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        ref={ref}
        className={cn(
          'overflow-hidden rounded-2xl border border-ctx-primary-fg-hint bg-ctx-primary',
          !disablePadding && 'p-4 sm:p-6',
          className
        )}
        {...rest}
      />
    );
  }
);

Card.displayName = 'Card';

/* -----------------------------------------------------------------------------------------------*/

export { Card };
export type { CardProps };
