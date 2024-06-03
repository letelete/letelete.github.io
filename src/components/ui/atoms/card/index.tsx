import { Slot } from '@radix-ui/react-slot';
import { ComponentPropsWithoutRef } from 'react';

import { cn } from '~utils/style';

export interface CardProps extends ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
  disablePadding?: boolean;
}

const Card = ({ asChild, className, disablePadding, ...rest }: CardProps) => {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      className={cn(
        'overflow-hidden rounded-2xl border border-ctx-primary-fg-hint bg-ctx-primary',
        !disablePadding && 'p-4 sm:p-6',
        className
      )}
      {...rest}
    />
  );
};

Card.displayName = 'Card';

export { Card };
